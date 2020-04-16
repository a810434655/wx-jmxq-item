let _special = require("../../utils/spe.js")
let that
const {
  $Message
} = require('../../resources/dist/base/index')
// pages/idea/idea.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     userInfo:{},
     content:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     that = this
     wx.getStorage({
       key: 'userInfo',
       success: function(res) {
         console.log(res.data)
         that.setData({
           userInfo:res.data
         })
       },
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
    
    
  },
  changeInput:function(e){
    that.setData({
      content:e.detail.value
    })
  },
  feedback: function (e) {
    wx.showLoading({
      title: '反馈中...',
      mask: true
    })
    _special.postFeedback({ content: that.data.content, nickname: that.data.userInfo.nickName, avatar:that.data.userInfo.avatarUrl,sex:that.data.userInfo.gender}).then(data => {
      $Message({
        content:"反馈成功",
        type: 'warning'
      })
      setTimeout(function(){
        wx.navigateBack({
          url: `/pages/about/about`,
        })
      },1000)
     
      wx.hideLoading()
    }).catch(e => {
      $Message({
        content: e.message,
        type: 'warning'
      })
      wx.hideLoading()
    })
  }
})