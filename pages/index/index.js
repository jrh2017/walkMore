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
    week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', ],
    friendArr: ['../../imgs/ava.jpg', '../../imgs/ava.jpg', '../../imgs/ava.jpg', '../../imgs/ava.jpg', ],
    wares: [0, 1, 2, 3],
    detail: {
      intro: '24k纯金10kg项链',
      only: 9,
      price: 1999,
      yprice: 998,
    },
    isChange: 1,
    noEnough: true,
    register: true,
    result: true,
    look: true,
    perMessage: true,
    haveAdd: false,
    userInfo: {
      add: "浙江省温州市鹿城区新城街道998号登新公寓100栋100号18楼555号房",
      phone: '8208208820',
      name: '王总监'
    },
    openid: '',
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    if (wx.getStorageSync('openid')) {
      that.setData({
        openid: true
      })
    } else {
      that.setData({
        openid: false
      })
    }
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
    this.setData({
      look: false,
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
  goSign: function(e) {
    if (wx.getStorageSync('openid')) {
      this.setData({
        register: false
      })
    } else {
      app.onLogin();
      if (e.detail.errMsg == "getUserInfo:ok") {
        this.setData({
          register: false,
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
  onDetail: function(e) {
    wx.navigateTo({
      url: '/pages/detail/index',
    })
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
          if (res.confirm) {
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
          } else if (res.cancel) {
            return
          }
        }
      })
    } else {
      app.onLogin();
    }

  },
  lingqu: function() {
    wx.showModal({
      title: '提示',
      content: '领取成功',
      showCancel: false
    })
  },
  goChange: function(e) {
    var that = this;
    if (wx.getStorageSync('openid')) {
      var money = Number(that.data.money);
      var price = Number(that.data.detail.price);
      if (money < price) {
        that.setData({
          noEnough: false,
        })
      } else {
        wx.navigateTo({
          url: '/pages/detail/index',
        })
      }
    } else {
      app.onLogin();
    }
  },
  wsMessage: function() {
    this.setData({
      result: true,
      perMessage: false,
    })
  },
  wsResult: function(e) {
    console.log(e);
    let gender = Number.parseInt(e.detail.value.gender) + 1;
    let age = e.detail.value.age;
    let height = e.detail.value.height;
    let weight = e.detail.value.weight;
    wx.request({
      // url: app.globalData.base_url + 'wechat/save_info',
      data: {
        sex: gender,
        age: age,
        height: height,
        weight: weight,
      },
      success: function(res) {

      }

    })
  },
  hideHandle: function() {
    var that = this;
    that.setData({
      noEnough: true,
      register: true,
      result: true,
      perMessage: true,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})