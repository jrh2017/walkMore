// pages/order/index.js
// const Page = require('../../utils/ald-stat.js').Page;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top:'',
    state:'',
    order:'',
    company:'顺丰快递',
    orderNumber: '10235201123132124',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  copyText: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    wx.request({
      url: app.globalData.base_url + '/order_list',
      data: {
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {
        console.log(res)
        that.setData({
          state:res.data.state
        })
        if(res.data.state==1){
          that.setData({
            order:res.data.res,
            top:res.data.top
          })
        }
      }
    })
  },
})