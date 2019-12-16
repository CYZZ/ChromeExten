
// 新建空白窗口
$('#open_new_window').click(() => {
    chrome.windows.create({state: 'maximized'});
});

// 显示badge
$('#show_badge').click(() => {
    chrome.browserAction.setBadgeText({text: 'New'});
    chrome.browserAction.setBadgeBackgroundColor({color: [255, 222, 0, 255]});
});

// 隐藏badge
$('#hide_badge').click(() => {
    chrome.browserAction.setBadgeText({text: ''});
    chrome.browserAction.setBadgeBackgroundColor({color: [0, 0, 0, 0]});
});

// 新建百度标签页
$('#open_new_tab_bd').click(() => {
    chrome.tabs.create({url: 'https://www.baidu.com'});
});

// 当前标签打开网页
$('#open_url_current_tab').click(() => {
    getCurrentTabId(tabId => {
        chrome.tabs.update(tabId, {url: 'http://www.so.com'});
    });
});

// 高亮tab
$('#highlight_tab').click(() => {
    chrome.tabs.highlight({tabs: 0});
});

// 关闭全部
$('#close_current_window').click(() => {
    chrome.windows.getCurrent({}, (currentWindow) => {
        chrome.windows.remove(currentWindow.id);
    });
});


// 获取当前选项卡ID
function getCurrentTabId(callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        if(callback) callback(tabs.length ? tabs[0].id: null);
    });
}