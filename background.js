
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        switch (request.name) {
            case "getWindowState":
                chrome.windows.get(sender.tab.windowId, null,
                    function(window) {
                        sendResponse({
                            'windowState': window.state
                        });
                    });
                break;
            default:
                break;
        }
    }
);
