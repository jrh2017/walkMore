// pages/my/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:4,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onShow(); // 刷新页面
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  order:function(e){
    if (wx.getStorageSync('openid')) {
      wx.navigateTo({
        url: '/pages/order/index',
      })
    } else {
      app.onLogin();
      if (e.detail.errMsg == "getUserInfo:ok") {
        wx.navigateTo({
          url: '/pages/order/index',
        })
      }
    }
  },
  hotMoney: function (e) {
    if (wx.getStorageSync('openid')) {
      wx.navigateTo({
        url: '/pages/heatMoney/index',
      })
    } else {
      app.onLogin();
      if (e.detail.errMsg == "getUserInfo:ok") {
        wx.navigateTo({
          url: '/pages/heatMoney/index',
        })
      }
    }
  },
  analysis: function (e) {
    if (wx.getStorageSync('openid')) {
      wx.navigateTo({
        url: '/pages/analysis/index',
      })
    } else {
      app.onLogin();
      if (e.detail.errMsg == "getUserInfo:ok") {
        wx.navigateTo({
          url: '/pages/analysis/index',
        })
      }
    }
  },
  address: function(e) {
    if (wx.getStorageSync('openid')) {
      wx.navigateTo({
        url: '/pages/address/index',
      })
    } else {
      app.onLogin();
      if (e.detail.errMsg == "getUserInfo:ok") {
        wx.navigateTo({
          url: '/pages/address/index',
        })
      }
    }
  },
  rule:function(){
    wx.navigateTo({
      url: '/pages/rule/index',
    })
  },
  setting: function () {
    wx.navigateTo({
      url: '/pages/set/index',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})