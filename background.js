
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        switch (request.name) {
            case "getWindow":
                chrome.windows.get(sender.tab.windowId, null,
                    function(window) {
                        sendResponse({
                            'window': window
                        });
                    });
                break;
        }
    }
);
