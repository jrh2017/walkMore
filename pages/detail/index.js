// pages/detail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    foot: true,
    detail: {
      intro: '24k纯金10kg项链',
      only: 9,
      price: 1999,
      yprice: 998,
    },
    isHaveAdd: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    if (wx.getStorageSync('openid')) {
      that.setData({
        openid: true
      })
    } else {
      that.setData({
        openid: false
      })
    }
  },
  authorizeNow: function(e) {
    app.onLogin();
    if (e.detail.errMsg == "getUserInfo:ok") {
      this.setData({
        openid: true,
      })
    }
  },
  freExchange: function(e) {
    wx.navigateTo({
      url: '/pages/success/index',
    })
  },
  affirm: function(e) {
    var that = this;
    var isHaveAdd = that.data.isHaveAdd;
    if (isHaveAdd) {
      console.log('确认兑换商品')
      that.setData({
        foot:true,
      })
      wx.navigateTo({
        url: '/pages/success/index',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '收货地址未填写',
        showCancel: false,
        success: function(res) {}
      })
    }
  },
  goAdd: function() {
    wx.navigateTo({
      url: '/pages/address/index',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})