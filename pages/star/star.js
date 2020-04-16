// pages/star/star.js
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
    focus:3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.setNavSize(); 
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
  // setStyle: function() {  
  //   var that = this 
  //   , containerStyle  
  //   , textStyle  
  //   , iconStyle;  
  //   containerStyle = [  
  //   'background:' + that.data.background  
  //   ].join(';');  
  //   textStyle = [  
  //   'color:' + that.data.color,  
  //   'font-size:' + that.data.fontSize + 'px' 
  //   ].join(';');  
  //   iconStyle = [  
  //   'width: ' + that.data.iconWidth + 'px',  
  //   'height: ' + that.data.iconHeight + 'px' 
  //   ].join(';');  
  //   that.setData({  
  //     containerStyle: containerStyle,  
  //     textStyle: textStyle,  
  //     iconStyle: iconStyle  
  //   }) 
// }, 
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