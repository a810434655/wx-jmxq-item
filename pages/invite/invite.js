// pages/invite/invite.js
var uuid = require("../../utils/uuid.js")
const {
  $Message
} = require('../../resources/dist/base/index')
let http = require("../../utils/invite.js")
let that
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    phone:"",
    code:"",
    verify:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
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
  bindName(e){
    that.setData({
      name:e.detail.value
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
  skip(){
    if(that.data.name == ""){
      $Message({
        content: "请输入真实姓名",
        type: 'warning'
      })
      return false
    }
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
    let uniqueId = uuid.wxuuid()
    console.log(uniqueId)
    http.starUserLogin({uniqueId,phone:that.data.phone,data:that.data.verify,code:that.data.code,name:that.data.name})
    .then(res=>{
      console.log(res)
    })
    .catch(e=>{
      console.log(e)
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
    http.phoneCode({codeType:4,phone:that.data.phone})
    .then(res=>{
      if(res.status == 200){
        $Message({
          content: "验证码发送成功",
          type: 'success'
        })
      }else{
        $Message({
          content: res.data,
          type: 'warning'
        })
      }
    })
    .catch(e=>{
      console.log(res)
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