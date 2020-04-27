var URL = require("../config/config.js")
var http = require("../utils/request.js")

module.exports = {
  // 信息反馈
    phoneLogin({ code, phone,uniqueId,systemId}){
      const data = {
        code:code,
        phone:phone,
        systemId: 4,
        uniqueId: uniqueId
      }
      return http.POST({
        url: URL.authServer + "/sso/other/login",
        data
      })
    },
    phoneCode({codeType,phone}){
      const data = {
        codeType,
        phone
      }
      return http.GET({url: URL.authServer + "/sso/getCode",data})
    },
    getSchool:function({userId}){
      const data = {
        userId: userId
      }
      return http.GET({
          url: URL.authServer + "/user/AuthUser/selectByUserId",
          data
      })
    },
    insert:function({starId}){
      const data = {
        starId,
        source:0
      }
      return http.POST({
          url: URL.dreamStarServer + "/user/DsStarUser/insert",
          data
      })
    },
    submit:function({starId,jsonData,joinReason}){
      const data = {
        starId,
        jsonData,
        joinReason
      }
      return http.POST({
          url: URL.dreamStarServer + "/user/DsStarUser/submit",
          data
      })
    },
}