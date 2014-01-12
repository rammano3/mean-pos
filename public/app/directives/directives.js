(function () {
    'use strict';
    angular.module('app')

    .directive('appVersion', ['config', function(config) {
        return function(scope, elm) {
            elm.text(config.version);
        };
    }])



   /**
    *  DOM effects
    *  guess i want them global, will module out when it gets big
    */
    .directive('animateProgressBar', ['$timeout',function($timeout) {
        return function(scope, elm, attrs) {
            $timeout(function(){elm.css('width', attrs.percentage)},100);
        };
    }])

    .directive('scrollUpOnClick', function() {
        return {
            restrict: 'A',
            link: function(scope, $elm) {
                $elm.on('click', function() {
                    $("html, body").animate({ scrollTop: 0 }, 700);
                });
            }
        }
    })

    //this can be more dynamic w/ attributes defining the divs we are scrolling around
    //very specific for one part of the app for now
    .directive('customerTabsScroll', function() {
        return {
            restrict: 'A',
            link: function(scope, $elm) {
                var windowHeight = $(window).height() || document.getElementsByTagName('body')[0].clientHeight;
                var targetCurrentHeight = $elm.height();
                var totalheight = 0;
                                    //test the target
                var thisheight = $( ".footer-widget" ).height();
                totalheight += thisheight;
                                    //test the target
                var thisheight = $( ".customer-window-wrapper .customer-header" ).height();
                totalheight += thisheight;

                var newTargetHeight = windowHeight - (totalheight - targetCurrentHeight) + 30;
                $elm.css('height',newTargetHeight);
            }
        }
    })

    .directive('sideMenuItem', function() {
        return {
            restrict: 'A',
            link: function(scope, $elm) {
                $elm.on('click', function(e) {
                    if ($elm.next().hasClass('sub-menu') == false) {
                        return;
                    }
                    var parent = $elm.parent().parent();

                    parent.children('li.open').children('a').children('.arrow').removeClass('open');
                    parent.children('li.open').children('.sub-menu').slideUp(200);
                    parent.children('li.open').removeClass('open');

                    var sub = $elm.next();
                    if (sub.is(":visible")) {
                        $('.arrow', $elm).removeClass("open");
                        $elm.parent().removeClass("open");
                        console.log("ping");
                        sub.slideUp(200, function () {
                            handleSidenarAndContentHeight();
                        });
                    } else {
                        $('.arrow', $elm).addClass("open");
                        $elm.parent().addClass("open");
                        sub.slideDown(200, function () {
                            handleSidenarAndContentHeight();
                        });
                    }
                    e.preventDefault();
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
            }
        }
    });

})();