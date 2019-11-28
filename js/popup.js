

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
