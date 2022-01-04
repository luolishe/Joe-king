 
var {
    Query
  } = AV;
  AV.init({
    appId: "NrdHxDIiuY7z9RwlFoh0RQ9x-MdYXbMMI", //修改leancloud appid
    appKey: "njNoO09eAAOFAtFMSRACd9EX",//修改leancloud appkey
    serverURLs: 'https://nrdhxdii.api.lncldglobal.com' //修改api地址 https://开头
  });
 
  var query = new AV.Query('content');
 
  var app = new Vue({
    el: '#app',
    data: {
      page: 0,
      count: 0,
      contents: []
    },
    methods: {
      loadMore: function (event) {
        getData(++this.page);
      }
    }
  })
 
 
  getData(0);
 
 
  query.count().then(function (count) {
    app.count = count;
  }, function (error) { });
 
 
 
 
  //友好地显示时间
  function timeago(dateTimeStamp) { 
      var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示 
      var hour = minute * 60; 
      var day = hour * 24; 
      var week = day * 7; 
      var month = day * 30; 
      var now = new Date().getTime(); //获取当前时间毫秒 
      var diffValue = now - dateTimeStamp; //时间差 
      if (diffValue < 0) { 
          return; 
      } 
      var minC = diffValue / minute; //计算时间差的分，时，天，周，月 
      var hourC = diffValue / hour; 
      var dayC = diffValue / day; 
      var weekC = diffValue / week; 
      var monthC = diffValue / month; 
      if (monthC >= 1 && monthC <= 3) { 
          result = " " + parseInt(monthC) + " 月前" 
      } else if (weekC >= 1 && weekC <= 3) { 
          result = " " + parseInt(weekC) + " 周前" 
      } else if (dayC >= 1 && dayC <= 6) { 
          result = " " + parseInt(dayC) + " 天前" 
      } else if (hourC >= 1 && hourC <= 23) { 
          result = " " + parseInt(hourC) + " 小时前" 
      } else if (minC >= 1 && minC <= 59) { 
          result = " " + parseInt(minC) + " 分钟前" 
      } else if (diffValue >= 0 && diffValue <= minute) { 
          result = "刚刚" 
      } else { 
          var datetime = new Date(); 
          datetime.setTime(dateTimeStamp); 
          var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1; 
          var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate(); 
          result = Nmonth + "-" + Ndate 
      } 
      return result; 
  };
 
 
 
 
 
  function urlToLink(str) {
    // var re = /(http|ftp|https):\/\/[\w-]+(.[\w-]+)+([\w-.,@?^=%&:/~+#]*[\w-\@?^=%&/~+#])?/g; 
    var re = /\bhttps?:\/\/(?!\S+(?:jpe?g|png|bmp|gif|webp|gif))\S+/g;  
    var re_forpic = /\bhttps?:\/\/.*?(\.gif|\.jpeg|\.png|\.jpg|\.bmp|\.webp)/g; 
    var re_forpic_vx = /^http:\/\/mmbiz\.qpic\.cn[^\s]*/g;  
    str = str.replace(re, function (website) {
      return "<a href='" + website + "' target='_blank'> <i class='iconfont icon-lianjie-copy'></i>链接 </a>";
    });
    str = str.replace(re_forpic, function (imgurl) {
      return "<img src='" + imgurl + "'  /> ";
    });
    str = str.replace(re_forpic_vx, function (imgurl) {
      return "<img src='" + imgurl + "'  /> ";
    });
    return str;
  };
 
  function getData(page = 0) {
    query.descending('createdAt').skip(page * 10).limit(10).find().then(function (results) {
      if (results.length == 0) {
        alert('之前没发表过说说了')
      } else {
        let resC = results;
        reqData = false;
        resC.forEach((i) => {
          let dateTmp = new Date(i.createdAt);
          i.attributes.time = timeago(dateTmp);
          i.attributes.content =  urlToLink(i.attributes.content) ;
          app.contents.push(i);
        })
      }
 
    }, function (error) { });
  };
 
 