//logs.js
const util = require('../../utils/util.js')
const app = getApp()
let that
Page({
  data: {
    userInfo: {},
    flag: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    wx.showLoading()
    that = this
    wx.getStorage({
      key: 'flag',
      success(res) {
        that.setData({
          flag:res.data
        })
      }
    })
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      that.setData({
        userInfo: app.globalData.userInfo,
      })
      wx.setStorage({
        key: 'userInfo',
        data: app.globalData.userInfo,
      })
      wx.hideLoading()
    } else if (that.data.canIUse) {
      console.log("进入第二个")
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
        })
        wx.setStorage({
          key: 'userInfo',
          data: res.userInfo,
        })
        wx.hideLoading()
      }
    } else {
      console.log("进入第三个")
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
          })
          wx.setStorage({
            key: 'userInfo',
            data: res.userInfo,
          })
          wx.hideLoading()
        }
      })
    }
    setTimeout(function(){
      wx.hideLoading()
    },3000)
  },
  aboutTap:function(){
     wx.navigateTo({
       url: '/pages/about/about',
     })
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    that.setData({
      userInfo: e.detail.userInfo,
      flag:false
    })
    wx.setStorage({
      key: 'flag',
      data:false
    })
  },
  onShareAppMessage: function (res) {
    // 来自页面内转发按钮
    var path = `/pages/index/index`
    var title = `聚芒星球`
    return {
      title: title,
      imageUrl: `https://oss.dreamoncampus.com/img/share1234.png`,
      path: path
    }
  },
  
  
})
