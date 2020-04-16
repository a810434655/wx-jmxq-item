// pages/search/search.js
var _http = require("../../utils/http.js")
let that
const {
  $Message
} = require('../../resources/dist/base/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    size:10,
    starName:"",
    content:[],
    scrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    console.log(options.keyWord)
    that.setData({
      starName:options.keyWord
    })
    if(options.keyWord !== undefined){
      that.to()
    }
  },
  onPullDownRefresh: function () {
    that.data.page = 1
    that.to()
  },
  onReachBottom: function () {
    that.data.page++
    that.to()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  back:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  search:function(e){
    that.setData({
      starName:e.detail.value
    })
  },
  searchEnter:function(e){
    if (e.detail.value == "") {
      $Message({
        content: "请输入关键字",
        type: 'warning'
      })
      return false
    }
    that.setData({
      content: []
    })
    that.to()
  },
  show:function(){
    if (that.data.starName == "") {
      $Message({
        content: "请输入关键字",
        type: 'warning'
      })
      return false
    }
    that.setData({
      content: []
    })
    that.to()
  },
  to:function(){
    _http.selectPage({ page: that.data.page, size: that.data.size, starName: that.data.starName })
      .then(res => {
        res.records.forEach(item => {
          if (item.detail.substring(0, 4) == "img~") {
            item.detail = item.detail.substring(4)
          }

          that.data.content.push(item)
        })
        that.setData({
          content: that.data.content
        })
      })
      .catch(e => {
        $Message({
          content: e.message,
          type: 'warning'
        })
      })
  },
  skip:function(e){
    wx.setStorage({
      key: 'path',
      data: "search",
    })
    wx.setStorage({
      key: 'info',
      data: that.data.content[e.currentTarget.dataset.item],
    })
    wx.navigateTo({
      url: "/pages/info/info"
    })
  }
})