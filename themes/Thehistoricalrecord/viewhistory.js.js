ViewHistory = function() {
    this.config = {
        limit: 10,
        storageKey: 'viewHistory',
        primaryKey: 'url'
    };
    this.cache = {
        localStorage:  null,
        userData:  null,
        attr:  null
    };
};
ViewHistory.prototype = {
    init: function(config) {
        this.config = config || this.config;
        var _self = this;
        if (!window.localStorage && (this.cache.userData = document.body) && this.cache.userData.addBehavior && this.cache.userData.addBehavior('#default#userdata')) {
            this.cache.userData.load((this.cache.attr = 'localStorage'));
            this.cache.localStorage = {
                'getItem': function(key) {
                    return _self.cache.userData.getAttribute(key);
                },
                'setItem': function(key, value) {
                    _self.cache.userData.setAttribute(key, value);
                    _self.cache.userData.save(_self.cache.attr);
                }
            };
        } else {
            this.cache.localStorage = window.localStorage;
        }
    },
    addHistory: function(item) {
        var items = this.getHistories();
        for(var i=0, len=items.length; i<len; i++) {
            if(item[this.config.primaryKey] && items[i][this.config.primaryKey] && item[this.config.primaryKey] === items[i][this.config.primaryKey]) {
                items.splice(i, 1);
                break;
            }
        }
        items.push(item);
        if(this.config.limit > 0 && items.length > this.config.limit) {
            items.splice(0, 1);
        }
        var json = JSON.stringify(items);
        this.cache.localStorage.setItem(this.config.storageKey, json);
    },
    getHistories: function() {
        var history = this.cache.localStorage.getItem(this.config.storageKey);
        if(history) {
            return JSON.parse(history);
        }
        return [];
    }
};
function jl_viewHistory(config){
    if(typeof localStorage !== 'undefined' && typeof JSON !== 'undefined') {
        var viewHistory = new ViewHistory();
        viewHistory.init({
            limit: config.limit,
            storageKey: config.storageKey,
            primaryKey: config.primaryKey
        });
    }
    // 如果
    var wrap = document.getElementById(config.storageKey);
    if(!viewHistory){
        if(wrap){
            wrap.style.display = 'none';
        }
        return;
    }
    // 如果 ViewHistory 的实例存在，并且外层节点存在，则可显示历史浏览记录
    if(viewHistory && wrap) {
           // 获取浏览记录
        var histories = viewHistory.getHistories();
            // 组装列表
        var list = document.createElement('ul');
        if(histories && histories.length > 0) {
            for(var i=histories.length-1; i>=0; i--) {
                var history = histories[i];
                var item = document.createElement('li');
                var link = document.createElement('a');
                link.href = history.url;
                link.innerHTML = history.title;
                item.appendChild(link);
                list.appendChild(item);
            }
            // 插入页面特定位置
            wrap.appendChild(list);
        }
    }
    if( viewHistory && config.addHistory) {
        var page = {
            "title": document.getElementsByTagName('title')[0].innerHTML.split(config.titleSplit)[0],
            // 这里需要注意把标题的class名替换掉
            "url": location.href // 这是 primaryKey
            // "time": ...
            // "author": ...
            // 这里可以写入更多相关内容作为浏览记录中的信息
        };
        viewHistory.addHistory(page);
    }
}