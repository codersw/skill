// pages/huangli/huangli.js
let ul = require('../../utils/u1.js')
let drinks = ul.drinks
let directions = ul.directions
let activities = ul.activities
let tools = ul.tools
let varNames = ul.varNames
Page({
  data:{
    date: '2021年03月28日',
    day: '28',
    week: '星期日',
    starttimes: '2021-03-28',
    drinks: [],
    direction: [],
    stars: "",
    goodlists: [],
    splitlists: []
  },
  onLoad (options){
    // 页面初始化 options为页面跳转所带来的参数
    let today = new Date();
    let iday = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    let week = this.getweek(today.getUTCDay())
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate()
    this.setData({
      date: year + '年' + month + '月' + day + '日',
      week,
      day,
      starttimes: year + '-' + month + '-' + day,
      drinks: this.pickRandom(iday,drinks, 2),
      direction: directions[this.random(iday, 2) % directions.length],
      stars: this.star(this.random(iday, 6) % 5 + 1),
      goodlists: this.pickTodaysLuck(today,iday,1),
      splitlists: this.pickTodaysLuck(today,iday,0)
    })
  },
  // 日期选择
  datePickerBindchange (e) {
    console.log(e);
    var today = new Date(e.detail.value)
    var week = this.getweek(today.getUTCDay())
    var year = today.getFullYear()
    var month = today.getMonth() + 1
    var day = today.getDate()
    var iday = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    this.setData({
      date: year + '年' + month + '月' + day + '日',
      week,
      day,
      starttimes: year + '-' + month + '-' + day,
      drinks: this.pickRandom(iday, drinks, 2),
      direction: directions[this.random(iday, 2) % directions.length],
      stars: this.star(this.random(iday, 6) % 5 + 1),
      goodlists: this.pickTodaysLuck(today, iday, 1),
      splitlists: this.pickTodaysLuck(today, iday, 0)
    })
  },
  // 星期几计算
  getweek(week) {
    var iweek;
    switch (week) {
      case 1:
        iweek = "星期一";
        break;
      case 2:
        iweek = "星期二";
        break;
      case 3:
        iweek = "星期三";
        break;
      case 4:
        iweek = "星期四";
        break;
      case 5:
        iweek = "星期五";
        break;
      case 6:
        iweek = "星期六";
        break;
      case 0:
        iweek = "星期日";
    }
    return iweek
  },
  // 星星计算
  star(num) {
    var result = "";
    var i = 0;
    while (i < num) {
      result += "★";
      i++;
    }
    while (i < 5) {
      result += "☆";
      i++;
    }
    return result;
  },
  // 随机
  random(dayseed, indexseed) {
    var n = dayseed % 11117;
    for (var i = 0; i < 100 + indexseed; i++) {
      n = n * n;
      n = n % 11117;   // 11117 是个质数
    }
    return n;
  },
  // 生成运势
  pickTodaysLuck(today,iday,e) {
    var goodlist = [];
    var splitlist = [];
    var _activities = this.filter(today,activities);
  
    var numGood = this.random(iday, 98) % 3 + 2;
    var numBad = this.random(iday, 87) % 3 + 2;
    var eventArr = this.pickRandomActivity(iday,_activities, numGood + numBad);
  
  
    for (var i = 0; i < numGood; i++) {
      goodlist.push(eventArr[i]);
    }
  
    for (var i = 0; i < numBad; i++) {
      splitlist.push(eventArr[numGood + i]);
    }
    if (e == 1) {
      return goodlist
    } else if (e == 0) {
      return splitlist
    }
  },
  // 去掉一些不合今日的事件
  filter(e,activities) {
    var result = [];
  
    // 周末的话，只留下 weekend = true 的事件
    if (this.isWeekend(e)) {
  
      for (var i = 0; i < activities.length; i++) {
        if (activities[i].weekend) {
          result.push(activities[i]);
        }
      }
  
      return result;
    }
    console.log(activities);
    return activities;
  },
  // 是否是周末
  isWeekend(e) {
    return e.getUTCDay() == 0 || e.getUTCDay() == 6;
  },
  // 从 activities 中随机挑选 size 个
  pickRandomActivity(iday,activities, size) {
    var picked_events = this.pickRandom(iday,activities, size);
  
    for (var i = 0; i < picked_events.length; i++) {
      picked_events[i] = this.parse(iday,picked_events[i]);
    }
  
    return picked_events;
  },
  // // 从数组中随机挑选 size 个
  pickRandom(iday,array, size) {
    var result = [];
  
    for (var i = 0; i < array.length; i++) {
      result.push(array[i]);
    }
  
    for (var j = 0; j < array.length - size; j++) {
      var index = this.random(iday, j) % result.length;
      result.splice(index, 1);
    }
  
    return result;
  },
  // 解析占位符并替换成随机内容
  parse(iday,event) {
    var result = { name: event.name, good: event.good, bad: event.bad };  // clone
  
    if (result.name.indexOf('%v') != -1) {
      result.name = result.name.replace('%v', varNames[this.random(iday, 12) % varNames.length]);
    }
  
    if (result.name.indexOf('%t') != -1) {
      result.name = result.name.replace('%t', tools[this.random(iday, 11) % tools.length]);
    }
  
    if (result.name.indexOf('%l') != -1) {
      result.name = result.name.replace('%l', (this.random(iday, 12) % 247 + 30).toString());
    }
  
    return result;
  }  
})