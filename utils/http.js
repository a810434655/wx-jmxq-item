var URL = require("../config/config.js")
var http = require("../utils/request.js")

module.exports = {
  // 信息反馈
  postFeedback: function (content) {
    const data = content
    return http.POST({ url: URL.dreamStarServer + '/user/DsFeedback/insert', data })
  },
  selectPage: function ({ page, size}){
    const data = { page, size}
    return http.GET({ url:'https://api.dreamoncampus.com/dreamstar/index/star/selectPage', data })
  },
  selectByKey:function({key}){
    const data = { key }
    return http.GET({
      url: URL.dreamforum + '/index/keyValue/selectByKey', data })
  },
  
  //记录 type   类型：1、创建活动按钮，2、活动功能按钮，3、前往认证按钮
  visitRecord: function ({ type }) {
    const data = { type }
    return http.POST({ url: URL.dreamActServer + '/user/api/visitRecord/insert', data })
  }
}