// pages/detail/index.js
// const Page = require('../../utils/ald-stat.js').Page;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    foot: true,
    goods_id: '',
    button_state: 1,
    addinfo_state: '',
    goods: '',
    addinfo: '',
    isHaveopenid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      goods_id: options.id
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
        isHaveopenid: true,
      })
      var openid = wx.getStorageSync('openid')
    } else {
      var openid = 0;
      that.setData({
        isHaveopenid: false
      })
    }
    wx.request({
      url: app.globalData.base_url + '/goods_detail',
      data: {
        goods_id: goods_id,
        openid: openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res)
        that.setData({
          goods: res.data.goods,
          addinfo: res.data.addinfo,
          addinfo_state: res.data.addinfo_state,
          button_state: res.data.button_state,
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
    var that = this;
    if (wx.getStorageSync('openid')) {
      if (that.data.goods.num <= 0) {
        wx.showModal({
          title: '提示',
          content: '商品已兑换完',
          showCancel: false
        })
        return
      } else {
        that.setData({
          foot: false,
        })
      }
    } else {
      app.onLogin();
    }
  },
  editAddress: function(e) {
    wx.navigateTo({
      url: '/pages/editAdd/index',
    })
  },
  affirm: function(e) {
    console.log(e.detail.formId)
    var that = this;
    var goods_id = that.data.goods_id;
    var addinfo_state = that.data.addinfo_state;
    if (addinfo_state == 1) {
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
        success: function(res) {
          const orderId = res.data.order_id;
          wx.navigateTo({
            url: '/pages/success/index?orderId=' + orderId,
          })
          that.setData({
            foot: true,
          })
        }
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
  hideFoot: function() {
    this.setData({
      foot: true,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    var that=this;
    var openid = wx.getStorageSync('openid');
    var title=that.data.goods.title;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: `微信步数，居然可免费兑换${title}，你也来吧！`,
      imageUrl: '../../imgs/share.png',
      path: '/pages/index/index?openid=' + openid
    }
  }
})