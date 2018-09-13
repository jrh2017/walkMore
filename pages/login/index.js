// pages/login/index.js
const app=getApp();
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


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  authorizeNow: function (e) {
    app.onLogin();
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },
})