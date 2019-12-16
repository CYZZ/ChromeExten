//-------------------- 右键菜单演示 ------------------------//
chrome.contextMenus.create({
    title: "测试右键菜单",
    onclick: function(){
        alert('你选中了自定义的菜单')
        // chrome.notifications.create(null, {
        //     type: 'basic',
        //     iconUrl: 'img/icon.png',
        //     title: '这是标题',
        //     message: '您刚才点击了自定义右键菜单！'
        // });
    }
});

chrome.contextMenus.create({
    title: '使用百度快捷搜索：%s', // %s表示选中的文字
    contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
    onclick: function(params)
    {
        // 注意不能使用location.href，因为location是属于background的window对象
        chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)});
    }
});


// omnibox 演示
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
    console.log('inputChanged: ' + text);
    if(!text) return;
    if(text == '语言') {
        suggest([
            {content: '中国' + text, description: '汉语'},
            {content: '英国' + text, description: '英语'},
            {content: '德国' + text, description: '德语'},
            {content: '韩国' + text, description: '韩语'}
        ]);
    }
    else if(text == '微博') {
        suggest([
            {content: '新浪' + text, description: '新浪' + text},
            {content: '腾讯' + text, description: '腾讯' + text},
            {content: '搜狐' + text, description: '搜狐' + text},
        ]);
    }
    else {
        suggest([
            {content: '百度搜索 ' + text, description: '百度搜索 ' + text},
            {content: '谷歌搜索 ' + text, description: '谷歌搜索 ' + text},
        ]);
    }
});

// 当用户接收关键字建议时触发
chrome.omnibox.onInputEntered.addListener((text) => {
    console.log('inputEntered: ' + text);
    if(!text) return;
    var href = '';
    if(text.endsWith('语言')) href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text;
    else if(text.startsWith('百度搜索')) href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text.replace('百度搜索 ', '');
    else if(text.startsWith('谷歌搜索')) href = 'https://www.google.com.tw/search?q=' + text.replace('谷歌搜索 ', '');
    else href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text;
    openUrlCurrentTab(href);
});

// 当前标签打开某个链接
function openUrlCurrentTab(url)
{
    getCurrentTabId(tabId => {
        chrome.tabs.update(tabId, {url: url});
    })
}

// 获取当前选项卡ID
function getCurrentTabId(callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        if(callback) callback(tabs.length ? tabs[0].id: null);
    });
}