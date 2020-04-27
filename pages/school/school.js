// pages/school/school.js
let that
let home = require("../../utils/http.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
     name:"",
     content:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    
  },
  skip(e){
     console.log(e)
     wx.setStorage({
       key:"schoolName",
       data:e.currentTarget.dataset.name
     })
     wx.setStorage({
      key:"schoolId",
      data:e.currentTarget.dataset.id
    })
    wx.redirectTo({
      url:"/pages/perfect/perfect"
    })
  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  search(e){
    home.getSchoolList({name:e.detail.value})
    .then(res=>{
      if(res.data.records.length != 0){
        that.setData({
          content:res.data.records
        })
      }
      
    })
    .catch(e=>{
      console.log(e)
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