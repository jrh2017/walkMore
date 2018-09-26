// pages/logistics/index.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:'',
    LogisticCode:'',
    top:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var orderId=options.orderId;
    wx.request({
      url: app.globalData.base_url + '/kd_search',
      data: {
        goods_id: orderId
      },
      success: function (res) {
        console.log(res)
        that.setData({
          order:res.data.Traces,
          state:res.data.State,
          LogisticCode: res.data.LogisticCode,
          ShipperCode: res.data.ShipperCode,
          top:res.data.top,
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

})