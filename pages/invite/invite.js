// pages/invite/invite.js
var uuid = require("../../utils/uuid.js")
const {
  $Message
} = require('../../resources/dist/base/index')
let http = require("../../utils/invite.js")
let requi = require("../../utils/http.js")
let that
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone:"", //手机号
    code:"",  //验证码
    verify:"",  
    content:[], //表单内容
    starId:"", //星球ID
    apply:"", //申请理由
    codeText:"发送验证码",   //验证码内容
    user:"",
    jsonData:"",
    phoneTrue:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.setData({
      starId:options.starId
    })
    that.getStarId()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getStarId(){
    requi.selectById({starId:that.data.starId})
    .then(res=>{
      if(res.status == 200){
        if(res.data.joinData){
          res.data.joinData = JSON.parse(res.data.joinData)
          res.data.joinData.forEach((item,key)=>{
            if(item.key == "电话"){
              that.setData({
                phoneTrue:true
              })
              res.data.joinData.splice(key, 1)
            }
          })
          res.data.joinData.forEach((item,key)=>{
             item.data = ""
          })
        }
        that.setData({
          content:res.data.joinData,
          jsonData:res.data
        })
      }else{
        $Message({
          content:res.message,
          type: 'warning'
        })
      }
    })
    .catch(e=>{
      $Message({
        content:e.message,
        type: 'warning'
      })
    })
  },
  bindArr(e){
    that.data.content[e.currentTarget.dataset.id].data = e.detail.value
    that.setData({
      content:that.data.content
    })
  },
  bindPhone(e){
    that.setData({
      phone:e.detail.value
    })
  },
  bindCode(e){
    that.setData({
      code:e.detail.value
    })
  },
  bindapply(e){
    that.setData({
      apply:e.detail.value
    })
  },
  show(){
    if(that.data.phone == ""){
      $Message({
        content: "请输入手机号",
        type: 'warning'
      })
      return false
    }
    if(that.data.code == ""){
      $Message({
        content: "请输入验证码",
        type: 'warning'
      })
      return false
    }
    if(that.data.josnData == 2){
      if(that.data.apply == ""){
        $Message({
          content: "请输入申请理由",
          type: 'warning'
        })
        return false
      } 
    }
    let num = false
    if(that.data.content === null){
    
    }else{
      if(that.data.content.length != 0){
      that.data.content.forEach((item,key)=>{
        if(item.data == ""){
          $Message({
            content: "请输入"+item.key,
            type: 'warning'
          })
          num = true
        }
      })
    }
    }
    
    if(num){
      return false
    }
  },
  skip(){
    that.show()
    let uniqueId = uuid.wxuuid()
    wx.showLoading({
      mask:true,
      title:"正在加入"
    })
    http.phoneLogin({code:that.data.code,phone:that.data.phone,uniqueId})
    .then(res=>{
          wx.setStorage({
            data: res.token,
            key: 'token',
          })
          that.setData({
            user:res
          })
         that.ifShow()
    })
    .catch(e=>{
      wx.hideLoading()
      $Message({
        content:e.message,
        type: 'warning'
      })
    })
  },
  ifShow(){
    http.getSchool({userId:that.data.user.userId})
    .then(res=>{
        if(res.data.schoolId){
          //1是直接加入 2是填写信息加入
          if(that.data.jsonData.joinRule == 1){
            http.insert({starId:that.data.starId})
            .then(res=>{
                wx.hideLoading()
                wx.redirectTo({
                  url: "/pages/down/down?show=true",
                })
            })
            .catch(e=>{
              if(e.message == "您已是该星球成员"){
                wx.redirectTo({
                  url: "/pages/down/down?flag=false",
                })
              }
              wx.hideLoading()
              $Message({
                content:e.message,
                type: 'warning'
              })
            })
          }else if(that.data.jsonData.joinRule == 2){
            // console.log("进入填写信息流程)

            
            let jsonData = that.data.content.map((d,i)=>{
              delete d.maxLength
              delete d.minLength
              delete d.inputType
              return d
            })
            if(that.data.phoneTrue){
              jsonData.push({
                key:"电话",
                data:that.data.phone
              })
              that.setData({
                content:that.data.content
              })
            }
            jsonData = JSON.stringify(jsonData)
            http.submit({starId:that.data.starId,jsonData:jsonData,joinReason:that.data.apply})
            .then(res=>{
                wx.hideLoading()
                wx.redirectTo({
                  url: "/pages/down/down?show=true",
                })
            })
            .catch(e=>{
              if(e.message == "您已是该星球成员"){
                wx.redirectTo({
                  url: "/pages/down/down?flag=false",
                })
              }
              wx.hideLoading()
              $Message({
                content:e.message,
                type: 'warning'
              })
            })
          }
        }else{   //如果学校不存在 新用户去完善信息
          let jsonData = that.data.content.map((d,i)=>{
            delete d.maxLength
            delete d.minLength
            delete d.inputType
            return d
          })
          wx.setStorage({
            key: 'jsonData',
            data:JSON.stringify(jsonData)
          })
          wx.setStorage({
            key: 'joinRule',
            data:that.data.jsonData.joinRule
          })
          wx.setStorage({
            data: that.data.apply,
            key: 'apply',
          })
          wx.setStorage({
            data: that.data.starId,
            key: 'starId',
          })
          wx.hideLoading()
          wx.navigateTo({
            url: "/pages/perfect/perfect"
          })
        } 
    })
    .catch(e=>{
     $Message({
       content:e.message,
       type: 'warning'
     })
    })
  },
  codeIf(){
    if(that.data.phone == ""){
      $Message({
        content: "请输入手机号",
        type: 'warning'
      })
      return false
    }
    http.phoneCode({codeType:1,phone:that.data.phone})
    .then(res=>{
      if(res.status == 200){
        that.setData({
          codeText:60
        })
        let num = setInterval(() => {
          if(that.data.codeText<=0){
            that.setData({
              codeText:"发送验证码"
            })
            clearInterval(num)
          }else{
            that.setData({
              codeText:that.data.codeText - 1
            })
          }
        }, 1000);

        $Message({
          content: "验证码发送成功",
          type: 'success'
        })
      }else{
        $Message({
          content: res.message,
          type: 'warning'
        })
      }
    })
    .catch(e=>{
      $Message({
        content: e.message,
        type: 'warning'
      })
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
   
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})