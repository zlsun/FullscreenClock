(function(document, window) {

    var content = document.documentElement ? document.documentElement : document.body;

    function getWindowState(callback) {
        chrome.extension.sendRequest({
                name: 'getWindow'
            },
            function(response) {
                if (response && response.window) {
                    if (callback) {
                        callback(response.window.state);
                    }
                }
            }
        );
    }

    var hover = false;

    function addClock() {
        var clock = document.createElement("div");
        clock.id = "fullscreen-clock";
        clock.className = "hide";
        clock.innerHTML = "Time";
        document.body.appendChild(clock);
        window.addEventListener("mousemove", function(event) {
            if ((content.clientWidth - event.clientX) < 71 && event.clientY < 22) {
                hover = true;
            } else {
                hover = false;
            }
        });
    }

    addClock();

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function getTime() {
        var today = new Date()
        var h = today.getHours()
        var m = today.getMinutes()
        var s = today.getSeconds()
        m = checkTime(m)
        s = checkTime(s)
        return h + ":" + m + ":" + s
    }

    setInterval(function() {
        getWindowState(function(window_state) {
            var clock = document.getElementById("fullscreen-clock");
            if (window_state == "fullscreen" && !hover) {
                clock.innerHTML = getTime();
                if (clock.className == "hide") {
                    clock.className = "show";
                }
            } else {
                if (clock.className == "show") {
                    clock.className = "hide";
                }
            }
        });
    }, 500);

})(document, window);
