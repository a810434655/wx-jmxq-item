// pages/star/star.js
const {
  $Message
} = require('../../resources/dist/base/index')
var _http = require("../../utils/http.js")
const { $Toast } = require('../../resources/dist/base/index');

let that
Page({
  /**
   * 页面的初始数据
   */
  data: {
    status: "",  
    navHeight: "",
    contentHeight:"",
    height:"",
    focus:2,
    content:[],
    dynamic:[],
    arr:[],
    Volume:[],
    Planet:[],
    page:1,
    size:5,
    starId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.setNavSize(); 
    that.setData({
      starId:options.id
    })
    that.getStarId()
    that.silide()
  },

  /**
   * 生命周期函数--监听页面初次渲染 完成
   */
  onReady: function () {

  },
  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  // 通过获取系统信息计算导航栏高度 
  setNavSize: function() {  
    let that = this 
    , sysinfo = wx.getSystemInfoSync()  
    , statusHeight = sysinfo.statusBarHeight  
    , isiOS = sysinfo.system.indexOf('iOS') > -1  
    , navHeight
    , contentHeight; 

    if (!isiOS) {  
      navHeight = 48;  
      } else {  
      navHeight = 44;  
    }  

    if(sysinfo.model === "iPhone X"){
      that.data.height = 500
      contentHeight = 550
    }
    else if(sysinfo.model === "iPhone XR"){
      that.data.height = 500
      contentHeight = 550
    }else if(sysinfo.model === "iPhone XS Max"){
      that.data.height = 500
      contentHeight = 550
    }else{
      that.data.height = 490
      contentHeight = 490
    }
    contentHeight = contentHeight - (navHeight + statusHeight)*2
    that.setData({  
      status: statusHeight,  
      navHeight: navHeight,
      contentHeight:contentHeight,
      height:that.data.height
    }) 
  }, 
  // 获取星球详情
  getStarId(){
    _http.selectById({starId:that.data.starId})
    .then(res=>{
      // console.log(res)
      if(res.status == 200){
        that.setData({
          content:res.data
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
  getSelectStarPage(){
    _http.selectStarPage({starId:that.data.starId,page:that.data.page,size:that.data.size})
    .then(res=>{
      res.data.records.forEach((item,key)=>{
        // item.ctime
        // console.log(item.ctime)
        let time  = new Date(item.ctime)
        let M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '-';
        let D = (time.getDate()<10?'0'+ time.getDate():time.getDate());
        item.ctime = M + D
        item.jsonData = JSON.parse(item.jsonData)
        that.data.dynamic.push(item)
      })
      that.setData({
        dynamic:res.data.records
      })
    })
    .catch(e=>{
      $Message({
        content:e.message,
        type: 'warning'
      })
    })

  },
  getSelectVolumePage(){
    _http.selectVolumePage({starId:that.data.starId,page:that.data.page,size:that.data.size})
    .then(res=>{
      res.data.records.forEach(item=>{
        that.data.Volume.push(item)
      }) 
      that.setData({
        Volume:that.data.Volume
      })

    })
    .catch(e=>{
      $Message({
        content:e.message,
        type: 'warning'
      })
    })
  },
  getSelectPageByStarId(){
     _http.selectPageByStarId({starId:that.data.starId,page:that.data.page,size:that.data.size})
     .then(res=>{ 
       res.data.records.forEach(item=>{
        that.data.Planet.push(item)
       })
       that.setData({
         Planet:that.data.Planet
       })
      //  console.log(that.data.Planet)
     })
     .catch(e=>{
        $Message({
          content:e.message,
          type: 'warning'
        })
     })
  },
  join(){
    if(that.data.content.joinRule===3){
       $Toast({
            content: '该星球暂时不允许加入',
            type: 'warning'
        });
      return false
    }
    wx.navigateTo({
      url:`/pages/invite/invite?starId=${that.data.starId}`
    })
  },
  //  * 生命周期函数--监听页面隐藏
  //  */
  tab(e){
    
    that.setData({
      page:1,
      dynamic:[],
      Volume:[],
      Planet:[],
      focus:e.currentTarget.dataset.id
    })
    that.silide()
  },
  silide(){
    if(that.data.focus == 1) that.getSelectStarPage()
    if(that.data.focus == 2) that.getSelectVolumePage()
    if(that.data.focus == 3) that.getSelectPageByStarId()
  },
  back(){
    wx.navigateBack({  
      delta: 1  
    })
    this.triggerEvent('back', {back: 1}) 
  },
  
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