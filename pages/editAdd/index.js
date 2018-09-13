// pages/editAdd/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:'请输入地址',
    color:'#B3B3B3',
    isHaveAddress:false,
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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
  personHandle:function(e){
    console.log(e)
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
      color:'#333',
    })
  },
  address:function(e){
    console.log(e)
  }
})