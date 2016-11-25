/**
 * Created by MyhailoAndrushkiv on 17.10.2016.
 */

$('document').ready(function () {

    // var pageName = $('.container').data('page');
    // if (pageName == 'jobAdList')
    // {
    jobListFilter.init();


    // }

});


var jobListFilter = {

    filters: {
        'filter-city': 'OMRÅDE',
        'filter-category': 'BRANSJE',
        'filter-job-type': 'STILLINGSTYPE',
    },
    selectedIds: [],
    sortType: 'default',

    getJobListCallBack: null,

    // True if it's filtered map.
    isMap: false,

    container: '#jobad_list_view',
    containerMobile: '.mob_container',
    containerSearchInput: '#list_search',
    preloader: '#preloader',
    init: function () {

        // Init multiselect filters.
        $.each(jobListFilter.filters, function (filterId, filterName) {
            var $filter = $('#' + filterId);
            if ($filter.length > 0) {
                $filter.multiselect(
                    {
                        enableFiltering: true,
                        enableCaseInsensitiveFiltering: true,
                        filterPlaceholder: filterName,
                        includeSelectAllOption: true,
                        maxHeight: 280,
                        onFiltering: function (event) {
                            var heightOffset = 71;

                            // set apply button vertical position
                            var height = $(this.$container).find('.multiselect-container').height() + heightOffset;
                            var applyBtnContainer = $(this.$container).parents('.filter-main').find('.filter-btn-container');
                            applyBtnContainer.css("top", height + "px");
                            // set apply button horizontal position
                            var width = $(this.$ul.first()).width();
                            applyBtnContainer.show();
                            applyBtnContainer.width(width + 'px');
                        },
                        buttonTitle: function (options, select) {
                            return filterName;
                        },
                        buttonText: function (options, select) {
                            return filterName;
                        },
                        onDropdownShown: function (event) {
                            var heightOffset = 71;
                            if ($(window).width() <= 768)
                            {
                                heightOffset = 124;
                            }
                            // set apply button vertical position
                            var height = $(this.$container).find('.multiselect-container').height() + heightOffset;
                            var applyBtnContainer = $(this.$container).parents('.filter-main').find('.filter-btn-container');
                            applyBtnContainer.css("top", height + "px");
                            var width = $(this.$ul.first()).width();
                            applyBtnContainer.show();
                            applyBtnContainer.width(width + 'px');
                        },
                        onDropdownHidden: function (event) {
                            $(this.$container).parents('.filter-main').find('.filter-btn-container').hide();
                        },
                        nonSelectedText: filterName,
                        nSelectedText: filterName,
                        allSelectedText: filterName,
                        selectAllText: 'Velg alle',
                        templates: {
                            filter: '<li class="multiselect-item filter"><div class="input-group"><i class="fa fa-search" aria-hidden="true"></i><input class="form-control multiselect-search" type="text"></div></li>',
                            filterClearBtn: '',
                            // ul: '<div class="test"><ul class="dropdown-menu"></ul></div>',
                            // buttonContainer: '<div class="multiselect-container"></div>',
                        }
                    });
            }
            ;
        });
        // Add button Apply and Cancel to each multiselect.
        $('.multiselect-bg').append('<div class="filter-btn-container" style="display: none;"><button class="filterApply"><i class="fa fa-check" aria-hidden="true"></i></button><button class="filterCancel"><i class="fa fa-times" aria-hidden="true"></i></button></<div>');

        jobListFilter.loadFilters();
        jobListSort.init();
        jobListFilter.getjobList();
        jobListFilter.searchInit();
        $('.filterApply').unbind('click');
        $('.filterApply').on('click', function () {
            jobListFilter.filterApply(this);
            jobListFilter.saveFilterValues();
            jobListFilter.getjobList();
        });
        $('.filter-clear').unbind('click');
        $('.filter-clear').on('click', function () {
            jobListFilter.clear();
            window.location.href = location.protocol + '//' + location.host + location.pathname;
            return false;
        });

        // Button "show more" is clicked
        $('.show-more').on("click", function () {
            $('input[name=showIsClicked]').attr('value', 1);
            jobListFilter.getjobList();
            return false;
        });

        jobListFilter.initFilterView();

        $(window).resize(function (event) {
            jobListFilter.initFilterView();
        });
    },
    /**
     * Reinit some js after "getjobList"
     */
    reInit: function () {

        // Allow click on mobile list to go to job details.
        $('.job_description, #jobad_list_view > tr > td').unbind('click');
        $('.job_description, #jobad_list_view > tr > td').on('click', function () {
            var item = $(this);
            var isFavorite = item.hasClass('favorite-icon-block');
            if (isFavorite == false)
            {
                var link = item.parent().find('.job_name').attr('href');
                window.location = link;
            }

        });

        $('.favorite').unbind('click');
        $('.favorite').on('click', function (e) {
            e.preventDefault();
            var favorite = $(this);
            $.ajax(favorite.data('url'), {
                dataType: "json",
                success: function (json) {
                    if (json.message == "bookmarked") {
                        if (favorite.prop('tagName') == 'A') {
                            favorite.find("i").addClass('fa-star active').removeClass('fa-star-o');
                        } else {
                            favorite.addClass('fa-star active').removeClass('fa-star-o');
                        }
                    } else if (json.message == "unbookmarked") {
                        if (favorite.prop('tagName') == 'A') {
                            favorite.find("i").addClass('fa-star-o').removeClass('fa-star active');
                        } else {
                            favorite.addClass('fa-star-o').removeClass('fa-star active');
                        }
                        ;
                    }
                }
            });
        });

        // Draw match circle.
        $('.match-circle').each(function () {
            drawMatchCircle($(this));
        });

    },
    /**
     * Do the ajax request with filters and put it into table.
     * If it's "show more" simply add new data to end of table.
     */
    getjobList: function () {
        var form = $('#filterForm');
        var filterData = form.serialize();
        // filterData = filterData + '&offset=5&count=10';
        var showMore = $('input[name=showIsClicked]').attr('value');
        var sourceType = form.data('source-type');
        $.ajax(form.attr('action'),
            {
                data: filterData,
                type: 'POST',
                dataType: 'json',
                beforeSend: function () {
                    if (showMore == 1) {
                        $(jobListFilter.preloader).append(geoLocation.drawPreloader());
                    } else {
                        $(jobListFilter.container).html('');
                        $(jobListFilter.containerMobile).html('');
                        $(jobListFilter.preloader).html(geoLocation.drawPreloader());
                    }

                },
                success: function (json) {
                    geoLocation.hidePreloader();
                    if (jobListFilter.isMap == true) {
                        jobListFilter.setJobsNumber(json.length);
                        setAjaxDataToMap(json, sourceType);
                        return true;
                    }

                    if (showMore == 1) {
                        $(jobListFilter.container).append(json.res);
                        $(jobListFilter.containerMobile).append(json.resMobile);
                    } else {
                        $(jobListFilter.container).html(json.res);
                        $(jobListFilter.containerMobile).html(json.resMobile);
                    }

                    jobListFilter.setJobsNumber(json.maxAll);

                    if (json.nextPage !== 'undefined') {
                        // if (json.nextPage !== )
                        jobListFilter.setLastItemNumber(json.nextPage);
                    }

                    if (json.numCurrentShow == json.maxAll) {
                        $('.show-more').hide();
                    } else {
                        $('.show-more').show();
                    }
                    jobListFilter.reInit();
                }
            }
        )
    },
    setJobsNumber: function (number) {
        var countContainer = $('.job_number>p');
        countContainer.html(number + ' jobber');
    },
    setLastItemNumber: function (number) {
        var lastItemNumber = $('#filterForm [name=page]');
        if (lastItemNumber.length > 0) {
            lastItemNumber.val(number);
        }
    },
    clearShowMore: function () {
        $('input[name=showIsClicked]').attr('value', 0);
    },
    filterApply: function (self) {
        jobListFilter.clearShowMore();
        var activeItems = $(self).parents('.filter-main').find('li.active');
        var filterPrefix = $(self).parents('.filter-main').data('filter');
        var allItems = $(self).parents('.filter-main').find('li');
        // Remove unselected tags.
        allItems.each(function (item) {
            var itemId = filterPrefix + $(this).find('input').attr('value');
            var index = jobListFilter.selectedIds.indexOf(itemId);
            if (index > -1) {
                jobListFilter.selectedIds.splice(index, 1);
                $('.' + itemId).remove();
            }
        });
        activeItems.each(function (item) {
            if (!$(this).hasClass('multiselect-item')) {
                jobListFilter.addTag(this);
            }
        });
        jobListFilter.initFilterView();
    },
    searchInit: function () {
        // $('.mob-search-triger').unbind('click');
        // $('.mob-search-triger').on('click', function () {
        //
        // });
        var searchInput = $('#job-search');

        // Set focus to search input after show (on mobile)
        $('#list_search').on('shown.bs.collapse', function () {
            searchInput.focus();
        });

        searchInput.unbind('keypress');
        searchInput.on('keypress', function (e) {
            var key = e.which;
            if (key == 13)  // the enter key code
            {
                jobListFilter.saveFilterValues();
                // jobListFilter.addSearchTag(this);
                jobListFilter.clearShowMore();
                jobListFilter.getjobList();
                return false;
            }
        });
        searchInput.unbind('focusout');
        searchInput.on('focusout', function () {
            $(jobListFilter.containerSearchInput).collapse('hide');
        });


    },
    addTag: function (self) {
        var filterPrefix = $(self).parents('.filter-main').data('filter');
        var itemId = filterPrefix + $(self).find('input').attr('value');
        var itemLabel = $(self).find('label').text();

        if (jobListFilter.selectedIds.indexOf(itemId) == -1) {
            jobListFilter.selectedIds.push(itemId);
            var block = $('<div class="filt_block ' + itemId + '" data-filter="' + itemId + '"></div>');
            block.html('<p>' + itemLabel + '</p><button class="fa fa-times filter-delete-item" aria-hidden="true"></button>');
            $('.filter-clear').before(block);
            jobListFilter.removeTagInit();
        }
        $('.filter_selected ').show();
    },
    // addSearchTag: function(self){
    //     var searchInput = $(self);
    //     var filterPrefix = searchInput.parents('.filter-main').data('filter');
    //     var itemId = filterPrefix + 'search'; //$(self).find('input').attr('value');
    //     var itemLabel = searchInput.attr('value'); //$(self).find('label').text();
    //
    //     if (jobListFilter.selectedIds.indexOf(itemId) == -1) {
    //         // jobListFilter.selectedIds.push(itemId);
    //         var block = $('<div class="filt_block ' + itemId + '" data-filter="' + itemId + '"></div>');
    //         block.html('<p>' + itemLabel + '</p><button class="fa fa-times filter-delete-item" aria-hidden="true"></button>');
    //         $('.filter-clear').before(block);
    //         jobListFilter.removeTagInit();
    //     }
    //     $('.filter_selected ').show();
    // },
    removeTag: function (self) {
        var itemId = self.data('filter');
        var index = jobListFilter.selectedIds.indexOf(itemId);
        if (index > -1) {
            jobListFilter.selectedIds.splice(index, 1);
            var option = $('#' + itemId);
            var multiselectObject = option.parent();
            multiselectObject.multiselect('deselect', option.attr('value'));
            $('.' + itemId).remove();
            if (jobListFilter.selectedIds.length == 0) {
                $('.filter_selected').hide();
            }
        }
        ;
        jobListFilter.initFilterView();
    },
    removeTagInit: function () {
        $('.filter-delete-item').unbind('click');
        $('.filter-delete-item').on('click', function () {
            jobListFilter.removeTag($(this).parent());
            jobListFilter.saveFilterValues();
            jobListFilter.clearShowMore();
            jobListFilter.getjobList();
        });
    },
    initFilterView: function () {
        var width = $(window).width();
        var containerSearchInput = $(jobListFilter.containerSearchInput);
        if (width > 769) {
            var height = $('.for_fixed ').height();
            $('.table_list').css("padding-top", height + "px");
        } else {
            $('.table_list').css("padding-top", "0px");
        }

        if (width <= 414) {
            containerSearchInput.addClass('collapse');
        } else {
            containerSearchInput.removeClass('collapse');
        }

    },
    /**
     * * Saving filter values from cookie.
     */
    saveFilterValues: function () {
        $.cookie('jobbOdFilter', JSON.stringify(jobListFilter.selectedIds), {path: '/'});
        $.cookie('jobbOdFilterSearch', $('#job-search').val(), {path: '/'});
    },
    /**
     * Loading filter values from cookie.
     */
    loadFilters: function () {

        var filterSearch = $.cookie('jobbOdFilterSearch');
        if (filterSearch !== undefined) {
            $('#job-search').attr('value', filterSearch);
        }

        var filter = $.cookie('jobbOdFilter');
        if (filter !== undefined) {
            jobListFilter.selectedIds = JSON.parse(filter);

            jobListFilter.selectedIds.forEach(function (item, i) {
                var option = $('#' + item);
                var multiselectObject = option.parent();
                multiselectObject.multiselect('select', option.attr('value'));
            });
            $('.filterApply').each(function (item) {
                jobListFilter.filterApply(this);
            })
        }
    },
    /**
     * Set field and direction to sorting.
     * @param sortType
     */
    setSortType: function (sortType) {
        jobListFilter.sortType = sortType;
        $('input[name=sortType]').attr('value', sortType);
    },
    /**
     * Clear filters values. Refresh page.
     */
    clear: function () {
        $('.filt_block').each(function (i) {
            jobListFilter.removeTag($(this));
        });
        jobListFilter.saveFilterValues();
    }

};

/**
 * Sorting prototype.
 * @type {{ASC: string, DESC: string, activeSort: boolean, init: jobListSort.init, changeSort: jobListSort.changeSort}}
 */
var jobListSort = {
    ASC: 'asc',
    DESC: 'desc',
    activeSort: false,
    init: function () {

        $('.sorting').on('click', function () {
            var element = $(this);
            var field = element.data('field');
            var direction = element.data('direction');

            jobListFilter.setSortType(field + '_' + direction);
            jobListSort.changeSort(element, direction);
            jobListFilter.setLastItemNumber(1);
            jobListFilter.clearShowMore();
            jobListFilter.getjobList();
        });
    },

    changeSort: function (element, direction) {
        if (direction == jobListSort.ASC) {
            element.data('direction', jobListSort.DESC);
            element.find('span').removeClass('caret_up');
            // element.find('span').addClass('caret');
            direction = jobListSort.DESC;
        } else {
            element.data('direction', jobListSort.ASC);
            // element.find('span').removeClass('caret');
            element.find('span').addClass('caret_up');
            direction = jobListSort.ASC;
        }
        $('.active>.sorting').each(function (i) {
            $(this).parent().removeClass('active');
        });

        element.parent().addClass('active');
    }
};

/**
 * Draw Match circle.
 * @param e
 */
function drawMatchCircle(e) {

    var thisId = e.attr('id');
    var canvas = document.getElementById(thisId);
    // hack for IE
    // if($.browser.msie && $.browser.version<9) { G_vmlCanvasManager.initElement(canvas); }

    var context = canvas.getContext("2d");
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    if (e.hasClass('big')) {
        var radius = 24;
    } else {
        radius = 18;
    }
    var startingAngle = 1.5 * Math.PI;
    var endingAngle = 1.5 * Math.PI;
    var percentage = parseInt(e.parent().find('.match-value').text());
    var matchValue = percentage / 100 * Math.PI * 2;
    var endAng = matchValue + endingAngle;

    var counterclockwise = false;
    context.shadowBlur = 2;
    if (e.hasClass('big')) {
        context.shadowColor = "#eef9f9"; //"#ebf9f9"; //"#b0e8ea"; //"#d1d8d8";
    }
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, counterclockwise);
    if (e.hasClass('big')) {
        context.lineWidth = 2;
    } else {
        context.lineWidth = 2;
    }
    context.strokeStyle = "#eef9f9"; //"#ebf9f9"; //"#b0e8ea"; //"#f3f3f3";
    // Set different color if 100% percent.
    // if (percentage == 100) {
    //     context.strokeStyle = "#5097a9";
    // }

    context.stroke();
    if (e.parent().hasClass('disabled')) {
    } else {
        if (percentage >= 50) {
            context.beginPath();

            //alert(endAng);
            // hack ie8
            // if($.browser.msie && $.browser.version<9) {
            //     endAng= endAng-0.00045454548
            // }

            context.arc(centerX, centerY, radius, startingAngle, endAng, counterclockwise);
            if (e.hasClass('big')) {
                context.lineWidth = 2;
            } else {
                context.lineWidth = 2;
            }
            context.strokeStyle = "#5097a9"; //acdfe2"; //"#b0e8ea"; //"#f05734";
            context.stroke();
        } else {
            context.beginPath();
            context.arc(centerX, centerY, radius, startingAngle, endAng, counterclockwise);
            if (e.hasClass('big')) {
                context.lineWidth = 2;
            } else {
                context.lineWidth = 2;
            }
            context.strokeStyle = "#acdfe2"; //"#b0e8ea"; //"#999999";
            context.stroke();
            // e.next().children('.match-value').css('color', '#989898');
        }
    }
}
