// pages/order/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top:'',
    state:'',
    order:'',
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
  logistics:function(e){
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/logistics/index?orderId='+orderId,
    })
  },
})