var URL = require("../config/config.js")
var http = require("../utils/request.js")

module.exports = {
  // 信息反馈
  postFeedback: function (content) {
    const data = content
    return http.POST({ url: URL.dreamStarServer + '/user/DsFeedback/insert', data })
  },
  getSchoolList: function ({ name }) {
    const data = {
      page: 1, size: 50, name: name
    }
    return http.GET({
      url: URL.dreamActServer + '/index/school/selectPage',
      data
    })
  },
  // 获取星球动态
  selectPage: function ({page, size}){
    const data = {page, size}
    return http.GET({ url:URL.dreamStarServer + '/index/star/selectPage', data })
  },
  // 获取星球动态
  selectStarPage: function ({starId,page, size}){
    const data = {starId,page, size}
    return http.GET({ url:URL.dreamStarServer + '/index/starTrend/selectPage', data })
  },
  // 获取星球信息
  selectById:function({starId}){
    const data = { starId }
    return http.GET({
      url: URL.dreamStarServer + '/index/star/selectById', data })
  },
  // 获取星球活动列表
  selectPageByStarId:function({starId,page,size}){
    const data = {starId,page,size}
    return http.GET({
      url: URL.dreamActServer + '/index/activity/selectPageByStarId', data })
  },
  // 获取星球声量榜
  selectVolumePage:function({starId,page,size}){
    const data = { starId,page,size }
    return http.GET({
      url: URL.dreamStarServer + '/index/starUser/selectVolumePage', data })
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
  },
  putUpdata: function (data) {
    return http.PUT({
      url: URL.dreamStarServer + '/user/DsUser/update',
      data
    })
  },
}