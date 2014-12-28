(function(document, window) {

    var content = document.documentElement ? document.documentElement : document.body;

    var hover = false;

    function addClock() {
        var clock = document.createElement("div");
        clock.id = "fullscreen-clock";
        clock.className = "hide";
        document.body.appendChild(clock);
        window.addEventListener("mousemove", function(event) {
            if ((content.clientWidth - event.clientX) < 71 && event.clientY < 22) {
                hover = true;
            } else {
                hover = false;
            }
        });
        return clock;
    }

    var clock = addClock();

    function checkTime(i) {
        return (i < 10) ? ("0" + i) : i;
    }

    function getTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        return h + ":" + m + ":" + s;
    }

    function isFullScreen() {
        return (screen.width == window.outerWidth && screen.height == window.outerHeight);
    }

    function update() {
        if (isFullScreen() && !hover) {
            clock.innerHTML = getTime();
            if (clock.className == "hide") {
                clock.className = "show";
            }
        } else {
            if (clock.className == "show") {
                clock.className = "hide";
            }
        }
    }

    window.setInterval(update, 1000);

})(document, window);
