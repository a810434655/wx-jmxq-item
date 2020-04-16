 // pages/info/info.js
let that 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperIf:false,
    qqGroup:false,
    wxGroup:false,
    info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.showLoading()
    wx.getStorage({
       key: 'info',
       success: function(res) {
         wx.hideLoading()
         res.data.activityData = JSON.parse(res.data.activityData)
         that.setData({
           info:res.data
         })
       },
     })
  },
  openBanner(e){
    console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
      url:`/pages/img/img?id=${e.currentTarget.dataset.item}`,
    })
  },
  infoQQ:function(e){
    if (that.data.wxGroup == true) {
      return false
    }
    that.setData({
      qqGroup:true
    })
  },
  infoWx:function(e){
    if(that.data.qqGroup == true){
      return false
    }
    that.setData({
      wxGroup: true
    })
  },
  shouye:function(e){
    wx.getStorage({
      key: 'path',
      success: function(res) {
        if(res.data === "search"){
          wx.navigateBack({
            url: `/pages/search/search`,
          })
        } if(res.data === "index"){
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      },
    })
    
  },
  copyText:function(e){
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        console.log(res)
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      },
      fail:function(res){
        console.log(res)
      }
    })
  }, 
  endDele:function(e){
    that.setData({
      qqGroup:false,
      wxGroup:false
    })
  }
})