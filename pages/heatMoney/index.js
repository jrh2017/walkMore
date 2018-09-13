// pages/heatMoney/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[0,1,2,],
    detail:{
      content:'兑换商品',
      price:'-99.99',
    },
    day:[0,1,2],
    haveMoney:false,
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


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})