// pages/detail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    foot: true,
    goods_id:'',
    button_state:'',
    addinfo_state:'',
    goods:'',
    addinfo:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      goods_id:options.id
    })
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    var goods_id = that.data.goods_id;
    if (wx.getStorageSync('openid')) {
      that.setData({
        openid: true
      })
    } else {
      that.setData({
        openid: false
      })
    }
    wx.request({
      url: app.globalData.base_url + '/goods_detail',
      data: {
        goods_id: goods_id,
        openid: wx.getStorageSync('openid')
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          goods:res.data.goods,
          addinfo:res.data.addinfo,
          addinfo_state:res.data.addinfo_state,
          button_state:res.data.button_state,
        })
      }
    })
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
    var that=this;
    if (that.data.goods.num<=0){
      wx.showModal({
        title: '提示',
        content: '商品已兑换完',
        showCancel: false
      })
      return
    }else{
      that.setData({
        foot:false,
      })
    }
  
  },
  affirm: function(e) {
    var that = this;
    var goods_id = that.data.goods_id;
    var addinfo_state = that.data.addinfo_state;
    wx.request({
      url: app.globalData.base_url + '/duihuan_goods',
      data: {
        goods_id: goods_id,
        openid: wx.getStorageSync('openid')
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        const orderId=res.data.order_id;
        if (addinfo_state == 1) {
          that.setData({
            foot: true,
          })
          wx.navigateTo({
            url: '/pages/success/index?orderId=' + orderId,
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '收货地址未填写',
            showCancel: false,
            success: function (res) { }
          })
        }
      }
    })

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