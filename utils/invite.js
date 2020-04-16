var URL = require("../config/config.js")
var http = require("../utils/request.js")

module.exports = {
  // 信息反馈
    starUserLogin:function ({uniqueId,phone,data,code}) {
      const num = {
        uniqueId:uniqueId,
        phone:phone,
        data:'xpl08nfPlLqk1cKsUgidPG8UakhurEYvUh31Alw5gTk=',
        code:code
      }
      return http.POST({ url: URL.authServer + 'auth/sso/invite/starUserLogin', num })
    },
    phoneCode({codeType,phone}){
      const data = {
        codeType,
        phone
      }
      return http.GET({url: URL.authServer + "/sso/getCode",data})
    },
}