// pages/heatMoney/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveMore:'',
    day: [0, 1, 2],
    page: 1,
    total_currency: '',
    today_currency: '',
    state: '',
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
    var page = that.data.page;
    wx.request({
      url: app.globalData.base_url + '/down_currency_list',
      data: {
        page: page,
        openid: wx.getStorageSync('openid')
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res)
        that.setData({
          total_currency: res.data.total_currency,
          today_currency: res.data.today_currency,
          state: res.data.state,
          day: res.data.res,
          haveMore:res.data.more,
        })
      }
    })
  },

  // 上拉触底事件，请求记录数据
  onReachBottom: function() {
    const that = this
    let page = that.data.page;
    if (that.data.haveMore) {
      // 请求下一页数据
      page++;
      that.data.page = page;
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: app.globalData.base_url + '/down_currency_list',
        data: {
          page: page,
          openid: wx.getStorageSync('openid')
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res)
          var day = that.data.day.concat(res.data.res);
          that.setData({
            day: day,
            haveMore: res.data.more,
          })
        }
      })
    } else {
      wx.showToast({
        title: '数据加载完毕',
        icon: 'success',
        duration: 1500,
      })
    }

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})