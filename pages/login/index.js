// pages/login/index.js
// const Page = require('../../utils/ald-stat.js').Page;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHaveShow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (app.globalData.scene === 1017) {
      if (wx.getStorageSync('openid') && wx.getStorageSync('open_id')) {
        app.onRefreshs(function(res) {
          if (res) {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        });
      } else {
        that.setData({
          isHaveShow: true,
        })
      }
    } else {
      if (wx.getStorageSync('openid')) {
        app.onRefresh(function(res){
          wx.switchTab({
            url: '/pages/index/index',
          })
        })
      }else{
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
      that.setData({
        isHaveShow: false,
      })
   
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  authorizeNow: function(e) {
    app.onLogins(function(res) {
      if (res) {
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
    });
  },
})