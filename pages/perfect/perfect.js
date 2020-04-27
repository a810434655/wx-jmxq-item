// pages/perfect/perfect.js
let that
let http = require("../../utils/http.js")
let requi = require("../../utils/invite.js")
const {
  $Message
} = require('../../resources/dist/base/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"", //名字
    date:[],  //学校
    session:"选择您的入学年份",  //入学年份
    schoolId:"",  //学校
    schoolName:"",
    apply:"",
    jsonData:"",
    joinRule:"",
    starId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.getStorage({//获取本地缓存
      key:"jsonData",
      success:function(res){
        that.setData({
          jsonData:res.data
        });
      },
    })
    wx.getStorage({//获取本地缓存
      key:"joinRule",
      success:function(res){
        that.setData({
          joinRule:res.data
        });
      },
    })
    wx.getStorage({//获取本地缓存
      key:"apply",
      success:function(res){
        that.setData({
          apply:res.data
        });
      },
    })
    wx.getStorage({//获取本地缓存
      key:"starId",
      success:function(res){
        that.setData({
          starId:res.data
        });
      },
    })
    wx.getStorage({//获取本地缓存
      key:"schoolName",
      success:function(res){
        that.setData({
          schoolName:res.data
        });
      },
    })
    wx.getStorage({//获取本地缓存
      key:"schoolId",
      success:function(res){
        that.setData({
          schoolId:res.data
        });
      },
    })
    
  },
  bindName(e){
    that.setData({
      name:e.detail.value
    })
  },
  bindsession: function (e) {
    that.setData({
      session: that.data.date[e.detail.value]
    })
  },
  skip(){
    wx.navigateTo({
      url:"/pages/school/school"
    })
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
    let date = new Date().getFullYear()
    for (let i = (date - 10); i <= date; i++) {
      that.data.date.push(i)
    }
    that.setData({
      date: that.data.date
    })
  },
  tap(){
    let data = {
      schoolId: that.data.schoolId,
      enrollYear: that.data.session,
      nickname: that.data.name
    }
    wx.showLoading({
      mask:true,
      title:"正在加入"
    })
    http.putUpdata(data)
      .then(res => {
        if(res == "修改成功"){
          if(that.data.joinRule == 1){
            requi.insert({starId:that.data.starId})
            .then(res=>{
              wx.hideLoading()
              wx.clearStorage()
                wx.navigateTo({
                  url: `/pages/down/down?show=true`,
                })
            })
            .catch(e=>{
              if(e.message == "您已是该星球成员"){
                wx.redirectTo({
                  url: "/pages/down/down?flag=false",
                })
              }
              $Message({
                content:e.message,
                type: 'warning'
              })
            })
          }else if(that.data.joinRule == 2){
            requi.submit({starId:that.data.starId,jsonData:that.data.jsonData,joinReason:that.data.apply})
            .then(res=>{
                wx.clearStorage()
                wx.hideLoading()
                wx.navigateTo({
                  url: `/pages/down/down?show=true`,
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
        }
      })
      .catch(e => {
        wx.hideLoading()
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