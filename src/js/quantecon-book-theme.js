// ScrollSpy Plugin: https://github.com/r3plica/Scrollspy
!function($,window,document,undefined){$.fn.extend({scrollspy:function(options){var defaults={namespace:"scrollspy",activeClass:"active",animate:!1,duration:1e3,offset:0,container:window,replaceState:!1};options=$.extend({},defaults,options);var add=function(ex1,ex2){return parseInt(ex1,10)+parseInt(ex2,10)},findElements=function(links){for(var elements=[],i=0;i<links.length;i++){var link=links[i],hash=$(link).attr("href"),element=$(hash);if(element.length>0){var top=Math.floor(element.offset().top),bottom=top+Math.floor(element.outerHeight());elements.push({element:element,hash:hash,top:top,bottom:bottom})}}return elements},findLink=function(links,hash){for(var i=0;i<links.length;i++){var link=$(links[i]);if(link.attr("href")===hash)return link}},resetClasses=function(links){for(var i=0;i<links.length;i++)$(links[i]).parent().removeClass(options.activeClass)},scrollArea="";return this.each(function(){for(var element=this,container=$(options.container),links=$(element).find("a"),i=0;i<links.length;i++){var link=links[i];$(link).on("click",function(e){var target=$(this).attr("href"),$target=$(target);if($target.length>0){var top=add($target.offset().top,options.offset);options.animate?$("html, body").animate({scrollTop:top},options.duration):window.scrollTo(0,top),e.preventDefault()}})}resetClasses(links);var elements=findElements(links),trackChanged=function(){for(var link,position={top:add($(this).scrollTop(),Math.abs(options.offset)),left:$(this).scrollLeft()},i=0;i<elements.length;i++){var current=elements[i];if(position.top>=current.top&&position.top<current.bottom){var hash=current.hash;if(link=findLink(links,hash)){options.onChange&&scrollArea!==hash&&(options.onChange(current.element,$(element),position),scrollArea=hash),options.replaceState&&history.replaceState({},"","/"+hash),resetClasses(links),link.parent().addClass(options.activeClass);break}}}!link&&"exit"!==scrollArea&&options.onExit&&(options.onExit($(element),position),resetClasses(links),scrollArea="exit",options.replaceState&&history.replaceState({},"","/"))};container.bind("scroll."+options.namespace,function(){trackChanged()}),$(document).ready(function(e){trackChanged()})})}})}(jQuery,window,document);

$(window).on('load', () => {

    // Avoid `console` errors in browsers that lack a console.
    (function() {
        var method;
        var noop = function () {};
        var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
        ];
        var length = methods.length;
        var console = (window.console = window.console || {});

        while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
        }
    }());

    // Place any jQuery/helper plugins in here.

    var $window = $(window),
    $head = $('head'),
    $body = $('body'),
    $sidebar = $('.sidebar'),
    $sidebarToggle = $('.btn__sidebar');

    function setContrast() {
        var setContrast = localStorage.setContrast;
        if (setContrast == 1) {
            $body.addClass('dark-theme');
            $('.btn__contrast').addClass('btn-active');
        }
    }

    setContrast();

    $('.btn__contrast').on('click', function (event) {
        // Prevent default.
        event.preventDefault();
        event.stopPropagation();

        if ($(this).hasClass('btn-active')) {
            $(this).removeClass('btn-active');
            localStorage.setContrast = 0;
            $body.removeClass('dark-theme');
        } else {
            $(this).addClass('btn-active');
            localStorage.setContrast = 1;
            $body.addClass('dark-theme');
        }
    });

    // Sidebar toggles

    function openSidebar() {
        $sidebarToggle.addClass('btn-active');
        $sidebar.removeClass('inactive');
        $(".toolbar svg.feather.feather-menu").replaceWith(feather.icons.x.toSvg());
    }
    function closeSidebar() {
        $sidebarToggle.removeClass('btn-active');
        $sidebar.addClass('inactive');
        $(".toolbar svg.feather.feather-x").replaceWith(feather.icons.menu.toSvg());
    }

    $(document).on('click', '.btn__sidebar', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if ($sidebar.hasClass('inactive')) {
            openSidebar();
        } else {
            closeSidebar();
        }
        if (window.innerWidth <= 1340) {
            $(document.body).on('click', function (e) {
                if (!$(event.target).is('.sidebar *')) {
                    closeSidebar();
                    $body.off('click');
                }
            });
        }
    });

    $('.btn__top').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });

    $('.btn__fullscreen').on('click', function () {
        event.preventDefault();
        event.stopPropagation();
        $(this).toggleClass('btn-active');

        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
            //in fullscreen, so exit it
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        } else {
            //not fullscreen, so enter it
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
        }
    });

    function setFontSize() {
        // Get font size from local storage
        var toolbarFont = localStorage.toolbarFont;
        if (toolbarFont == 1) {
            $('html').addClass('font-plus');
        } else if (toolbarFont == -1) {
            $('html').addClass('font-minus');
        } else {
            $('html').removeClass('font-plus');
            $('html').removeClass('font-minus');
            localStorage.toolbarFont = 0;
        }
    }

    setFontSize();

    $('.btn__plus').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        var toolbarFont = parseInt(localStorage.getItem('toolbarFont')) + 1;
        if (toolbarFont > 0) {
            toolbarFont = 1;
        }
        localStorage.toolbarFont = toolbarFont;
        setFontSize();
    });

    $('.btn__minus').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        var toolbarFont = parseInt(localStorage.getItem('toolbarFont')) - 1;
        if (toolbarFont < 0) {
            toolbarFont = -1;
        }
        localStorage.toolbarFont = toolbarFont;
        setFontSize();
    });

    /* Collapsed code block */

    const collapseAccToHeight = (el, elH) => {
        if(el.includes("tag_collapse")) {
            index = el.indexOf("-")
            height = el.substring(index+1)
            if(height && !isNaN(height)){
                elH.style.height = parseInt(height) + 0.5 + "em" // 0.5 to account for padding
            }
        }
    }
    const collapsableCodeBlocks = document.querySelectorAll("div[class^='cell tag_collapse']");
    for (var i = 0; i < collapsableCodeBlocks.length; i++) {
        const collapsableCodeBlocksH = collapsableCodeBlocks[i].querySelectorAll(".highlight")[0]
        collapsableCodeBlocks[i].classList.forEach(el => {
            collapseAccToHeight(el, collapsableCodeBlocksH)
        })
        const toggleContainer = document.createElement('div');
        toggleContainer.innerHTML = '<a href="#" class="toggle toggle-less" style="display:none;"><span class="icon icon-angle-double-up"></span><em>Show less...</em></a><a href="#" class="toggle toggle-more"><span class="icon icon-angle-double-down"></span><em>Show more...</em></a>';
        collapsableCodeBlocksH.parentNode.insertBefore(toggleContainer, collapsableCodeBlocksH.nextSibling);
    }

    const collapsableCodeToggles = document.querySelectorAll("div[class^='cell tag_collapse'] .toggle");
    for (var i = 0; i < collapsableCodeToggles.length; i++) {
        collapsableCodeToggles[i].addEventListener('click', function (e) {
            e.preventDefault();
            var codeBlock = this.closest('div[class^="cell tag_collapse"]');
            codeBlockH = codeBlock.querySelector('.highlight')
            if (codeBlock.classList.contains('expanded')) {
                codeBlock.classList.remove('expanded');
                this.style.display = 'none';
                this.nextSibling.style.display = 'block';
                codeBlock.classList.forEach(el => {
                    collapseAccToHeight(el, codeBlockH)
                })
            } else {
                codeBlock.classList.add('expanded');
                this.style.display = 'none';
                this.previousSibling.style.display = 'block';
                codeBlockH.style.height = "auto"
            }
        });
    }

    /* Wrap container around all tables allowing hirizontal scroll */

    const contentTables = document.querySelectorAll('.page__content table');
    for (var i = 0; i < contentTables.length; i++) {
        var wrapper = document.createElement('div');
        wrapper.classList.add('table-container');
        contentTables[i].parentNode.insertBefore(wrapper, contentTables[i]);
        wrapper.appendChild(contentTables[i]);
    }

    if ( document.getElementById('downloadButton') ) {
        const template = document.getElementById('downloadPDFModal');
        template.style.display = 'block';
        tippy('#downloadButton', {
            content: template,
            theme: 'light-border',
            animation: 'shift-away',
            inertia: true,
            duration: [200,200],
            arrow: true,
            arrowType: 'round',
            delay: [200, 200],
            interactive: true,
            trigger: "click"
        });
    }

    // Notebook Launcher popup
    if ( document.getElementById('settingsButton') ) {
        const template = document.getElementById('settingsModal');
        template.style.display = 'block';
        tippy('#settingsButton', {
        content: template,
        theme: 'light-border',
        animation: 'shift-away',
        inertia: true,
        duration: [200,200],
        arrow: true,
        arrowType: 'round',
        delay: [200, 200],
        interactive: true,
        trigger: "click"
        });
    }

    // onchangeListener for launcher popup
    window.onChangeListener = () => {
        let private = document.getElementById("launcher-private-input").value
        if ($(this.event.currentTarget)[0].getAttribute("id").indexOf("private") > -1) {
            if (!private.includes("http") && !private.includes("https")) {
                private = "http://" + private
            }
            let pagename = document.getElementsByClassName("page")[0].getAttribute("id")
            let repo = document.getElementById("launcher-private-input").dataset.repourl
            let urlpath = document.getElementById("launcher-private-input").dataset.urlpath
            const repoPrefix = "/jupyter/hub/user-redirect/git-pull?repo=" + repo + "&urlpath=" + urlpath;
            url = private + repoPrefix + pagename + ".ipynb";
            launchButton.getElementsByTagName("a")[0].setAttribute("href", url)
        } else {
            let url = document.getElementById("launcher-public-input").value
            let launchButton = document.getElementById("launchButton")
            launchButton.getElementsByTagName("a")[0].setAttribute("href", url)
        }
    }

    // Tooltips
    tippy('[data-tippy-content]', {
        touch: false,
    });
    feather.replace();

    // Highlight page TOC links as user scrolls
    $(".page__toc-nav ul").scrollspy();

})
