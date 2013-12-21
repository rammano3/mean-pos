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

    .directive('sideMenuItem', function() {
        return {
            restrict: 'A',
            link: function(scope, $elm) {
                $elm.on('click', function(e) {
                    if ($elm.next().hasClass('sub-menu') == false) {
                        return;
                    }
                    var parent = $elm.parent().parent();
console.log(parent);
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
                        console.log("pong");
                        sub.slideDown(200, function () {
                            handleSidenarAndContentHeight();
                        });
                    }
                    console.log("dong");
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