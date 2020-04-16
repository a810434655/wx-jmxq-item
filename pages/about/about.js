// pages/my/aboutus.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
   
  },
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  openPage: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  ideaTo:function(){
    wx.navigateTo({
      url: '/pages/idea/idea',
    })
  },
  openH5Page: function (e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/webview/webview?url=${e.currentTarget.dataset.url}`
    })
  }
})