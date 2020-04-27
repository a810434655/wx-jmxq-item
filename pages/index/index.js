//index.js
//获取应用实例
const {
  $Message
} = require('../../resources/dist/base/index')
const app = getApp()
var _http = require("../../utils/http.js")
let that
Page({
  data: {
    page:1,
    size:5,
    bannerList:[
      '/resources/image/anomalyBanner.png'
    ],
    content:[
    ],
    searchData:"",
    flag:false
  },
  onLoad: function () {
    wx.showLoading()
    that = this
    that.getBanner()
    that.getStar()
    setTimeout(function(){
      wx.hideLoading()
    },4000)
  },
  onPullDownRefresh: function () {
    that.data.page = 1
    that.getStar()
  },
  onReachBottom: function () {
    that.data.page++
    that.getStar()
  },
  search:function(e){
    that.setData({
      searchData:e.detail.value
    })
  },
  
  searchButton:function(e){
    if (that.data.searchData === "") {
      $Message({
        content: "请输入星球关键字",
        type: 'warning'
      })
      return false
    }
    wx.navigateTo({
      url: `/pages/search/search?keyWord=${that.data.searchData}`
    })
  },
  searchEnter:function(e){
    if(e.detail.value == ""){
      $Message({
        content:"请输入星球关键字",
        type: 'warning'
      })
      return false
    }
    that.setData({
      search: e.detail.value
    })
    wx.navigateTo({
      url: `/pages/search/search?keyWord=${that.data.searchData}`
    })
  },

  getUserInfo: function(e) {
    
  },
  stop:function(e){
    wx.navigateTo({
      url: '/pages/info/info',
    })
  },
  skip:function(e){
    wx.navigateTo({
      url:`/pages/star/star?id=${e.currentTarget.dataset.key}`
    })
  },
  getStar:function(){
    _http.selectPage({page:that.data.page,size:that.data.size})
    .then(res=>{
      if(res.data.records.length === 0){
        if(that.data.page == 1){
          that.setData({
            flag: true
          })
        }
        return false
      }
      res.data.records.forEach(item=>{
        // if (item.detail.substring(0, 4) == "img~"){
        //   item.detail = item.detail.substring(4)
        // }
        that.data.content.push(item)
      })
      that.setData({
        content:that.data.content
      })
    })
    .catch(e=>{
      console.log(e)
      $Message({
        content: "服务器异常",
        type: 'warning'
      })
    })
  },
  getBanner:function(e){
    _http.selectByKey({ key:"starWechat"})
    .then(res=>{
      if (res.data.length === 0){
        wx.hideLoading()
        return false
      }else{
        that.setData({
          bannerList:res.data
        })
      }
     
      wx.hideLoading()
    })
    .catch(e=>{
      $Message({
        content:"服务器异常",
        type: 'warning'
      })
    })
  }
})
