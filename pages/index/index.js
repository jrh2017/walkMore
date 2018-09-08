// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 12345,
    money: 998.99,
    fourRound: [0, 1, 2, 3],
    friendArr: ['../../imgs/ava.jpg', '../../imgs/ava.jpg', ],
    wares: [0, 1, 2, 3],
    detail: {
      intro: '24k纯金10kg项链',
      only: 9,
      price: 1999,
      yprice: 998,
    },
    isChange: 1,
    authorize: false,
    noEnough: true,
    enough: true,
    haveAdd: false,
    userInfo: {
      add: "浙江省温州市鹿城区新城街道998号登新公寓100栋100号18楼555号房",
      phone: '8208208820',
      name: '王总监'
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onShow(); // 刷新页面
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (wx.getStorageSync('openid')) {
      this.setData({
        authorize: true,
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  analysis: function(e) {
    if (wx.getStorageSync('openid')) {
      wx.navigateTo({
        url: '/pages/analysis/index',
      })
    } else {
      app.onLogin();
      if (e.detail.errMsg == "getUserInfo:ok") {
        wx.navigateTo({
          url: '/pages/analysis/index',
        })
      }
    }

  },
  authorizeNow: function(e) {
    console.log(e)
    var that = this;
    app.onLogin();
    that.setData({
      authorize: true,
    })
  },
  goSign: function(e) {
    if (wx.getStorageSync('openid')) {
      wx.navigateTo({
        url: '/pages/signIn/index',
      })
    } else {
      app.onLogin();
      if (e.detail.errMsg == "getUserInfo:ok") {
        wx.navigateTo({
          url: '/pages/signIn/index',
        })
      }
    }

  },
  goHeat: function(e) {
    if (wx.getStorageSync('openid')) {
      wx.navigateTo({
        url: '/pages/heatMoney/index',
      })
    } else {
      app.onLogin();
      if (e.detail.errMsg == "getUserInfo:ok") {
        wx.navigateTo({
          url: '/pages/heatMoney/index',
        })
      }
    }

  },
  onGetUserInfo: function(e) {
    if (wx.getStorageSync('openid')) {
      wx.navigateTo({
        url: '/pages/detail/index',
      })
    } else {
      app.onLogin();
      if (e.detail.errMsg == "getUserInfo:ok") {
        wx.navigateTo({
          url: '/pages/detail/index',
        })
      }
    }
  },

  lookFriend: function() {
    wx.navigateTo({
      url: '/pages/friendList/index',
    })
  },
  goAdd: function() {
    wx.navigateTo({
      url: '/pages/address/index',
    })
  },
  exchange: function(e) {
    if (wx.getStorageSync('openid')) {
      var that = this;
      var step = that.data.step;
      wx.showModal({
        title: '提示',
        content: '花费19969步兑换19.67个热力币',
        success: function(res) {
          setTimeout(function() {
            while (step > 0) {
              step -= 100;
              that.setData({
                step: step
              })
              if (step <= 0) {
                that.setData({
                  step: 0
                })
                return
              }
            }
          }, 1000);
        }
      })
    } else {
      app.onLogin();
    }

  },

  goChange: function() {
    var that = this;
    var money = Number(that.data.money);
    var price = Number(that.data.detail.price);
    if (money < price) {
      that.setData({
        noEnough: false,
      })
    } else {
      that.setData({
        enough: false
      })
    }
  },
  confirm: function() {
    var that = this;
    var haveAdd = that.data.haveAdd;
    if (haveAdd) {
      wx.navigateTo({
        url: '/pages/success/index',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '地址未填写',
        showCancel: false,
        confirmText: '去填写',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/address/index',
            })
          }
        }
      })

    }
  },
  hideHandle: function() {
    var that = this;
    that.setData({
      noEnough: true,
      enough: true,
      authorize: true,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})