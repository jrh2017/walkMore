// pages/address/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHaveAddress:true,
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
  editAddress:function(){
    wx.navigateTo({
      url: '/pages/editAdd/index',
    })
  },
  goEdit:function(){
    wx.navigateTo({
      url: '/pages/editAdd/index',
    })
  }
})