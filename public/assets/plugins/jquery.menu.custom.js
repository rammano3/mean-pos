(function($) {
    $.fn.initMenuBar = function() {
        jQuery('.page-sidebar li > a').on('click', function (e) {
            if ($(this).next().hasClass('sub-menu') == false) {
                return;
            }
            var parent = $(this).parent().parent();

            parent.children('li.open').children('a').children('.arrow').removeClass('open');
            parent.children('li.open').children('.sub-menu').slideUp(200);
            parent.children('li.open').removeClass('open');

            var sub = jQuery(this).next();
            if (sub.is(":visible")) {
                jQuery('.arrow', jQuery(this)).removeClass("open");
                jQuery(this).parent().removeClass("open");
                sub.slideUp(200, function () {
                    handleSidenarAndContentHeight();
                });
            } else {
                jQuery('.arrow', jQuery(this)).addClass("open");
                jQuery(this).parent().addClass("open");
                sub.slideDown(200, function () {
                    handleSidenarAndContentHeight();
                });
            }

            e.preventDefault();
        });

        $('.grid .tools a.remove').on('click', function () {
            var removable = jQuery(this).parents(".grid");
            if (removable.next().hasClass('grid') || removable.prev().hasClass('grid')) {
                jQuery(this).parents(".grid").remove();
            } else {
                jQuery(this).parents(".grid").parent().remove();
            }
        });

        $('.grid .tools a.reload').on('click', function () {
            var el =  jQuery(this).parents(".grid");
            blockUI(el);
            window.setTimeout(function () {
                unblockUI(el);
            }, 1000);
        });

        $('.grid .tools .collapse, .grid .tools .expand').on('click', function () {
            var el = jQuery(this).parents(".grid").children(".grid-body");
            if (jQuery(this).hasClass("collapse")) {
                jQuery(this).removeClass("collapse").addClass("expand");
                el.slideUp(200);
            } else {
                jQuery(this).removeClass("expand").addClass("collapse");
                el.slideDown(200);
            }
        });

        $('.user-info .collapse').on('click', function () {
            jQuery(this).parents(".user-info ").slideToggle();
        });

        var handleSidenarAndContentHeight = function () {
            var content = $('.page-content');
            var sidebar = $('.page-sidebar');

            if (!content.attr("data-height")) {
                content.attr("data-height", content.height());
            }

            if (sidebar.height() > content.height()) {
                content.css("min-height", sidebar.height() + 120);
            } else {
                content.css("min-height", content.attr("data-height"));
            }
        }
        $('.panel-group').on('hidden.bs.collapse', function (e) {
            $(this).find('.panel-heading').not($(e.target)).addClass('collapsed');
        })

        $('.panel-group').on('shown.bs.collapse', function (e) {
            // $(e.target).prev('.accordion-heading').find('.accordion-toggle').removeClass('collapsed');
        })
    }
})(jQuery);