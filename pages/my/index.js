// pages/my/index.js
const app = getApp();
const ageArr = [],
  heightArr = [],
  weightArr = []
for (let i = 1; i < 101; i++) {
  ageArr.push(i)
}
for (let i = 120; i < 220; i++) {
  heightArr.push(i)
}
for (let i = 30; i < 180; i++) {
  weightArr.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    days:0,
    perMessage:true,
    genderArray: ['男', '女'],
    ageArr: ageArr,
    heightArr: heightArr,
    weightArr: weightArr,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onShow(); // 刷新页面
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that=this;
    if (wx.getStorageSync('openid')){
      wx.request({
        url: app.globalData.base_url + '/my',
        data: {
          openid: wx.getStorageSync('openid')
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          that.setData({
            days: res.data.res.days,
          })
        }
      })
    }else{
      return
    }
 
  },

  order:function(e){
    if (wx.getStorageSync('openid')) {
      wx.navigateTo({
        url: '/pages/order/index',
      })
    } else {
      app.onLogin(function(res){
        if(res){
          wx.navigateTo({
            url: '/pages/order/index',
          })
        }
      });
    }
  },
  hotMoney: function (e) {
    if (wx.getStorageSync('openid')) {
      wx.navigateTo({
        url: '/pages/heatMoney/index',
      })
    } else {
      app.onLogin(function (res) {
        if (res) {
          wx.navigateTo({
            url: '/pages/heatMoney/index',
          })
        }
      });
    }
  },
  analysis: function (e) {
    var that = this;
    if (wx.getStorageSync('openid')) {
      wx.request({
        url: app.globalData.base_url + '/see_test_info',
        data: {
          openid: wx.getStorageSync('openid')
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          var id = res.data.res.test_log_id;
          that.setData({
            test_log_id: id
          })
          if (res.data.state == 1) {
            wx.navigateTo({
              url: '/pages/analysis/index?id=' + id,
            })
          } else {
            that.setData({
              userInfo: res.data.res,
              perMessage: false,
            })
          }
        }
      })
    } else {
      app.onLogin(function (res) {
        if (res) {
          that.onShow();
        }
      });
      return;
    }
  },
  wsResult: function (e) {
    var that = this;
    var userInfo = that.data.userInfo;
    if (userInfo.gender > 0) {
      var gender = userInfo.gender;
    } else {
      var gender = e.detail.value.gender + 1;
    }
    gender = gender === 1 ? "男" : "女";
    let age = e.detail.value.age;
    let height = e.detail.value.height;
    let weight = e.detail.value.weight;
    let mes = "";
    if (weight === "") {
      mes = "体重"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }
    if (height === "") {
      mes = "身高"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }
    if (gender === "" || gender == null) {
      mes = "性别"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }
    if (age === "") {
      mes = "年龄"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }

    var id = that.data.test_log_id;
    wx.request({
      url: app.globalData.base_url + '/save_info',
      data: {
        gender: gender,
        test_log_id: id,
        age: age,
        height: height,
        weight: weight,
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {
        wx.navigateTo({
          url: '/pages/analysis/index?id=' + id,
        })
        that.setData({
          perMessage: true,
        })
      }
    })
  },
  hideHandle: function () {
    var that = this;
    that.setData({
      perMessage: true,
    })
  },
  address: function(e) {
    if (wx.getStorageSync('openid')) {
      wx.navigateTo({
        url: '/pages/address/index',
      })
    } else {
      app.onLogin(function (res) {
        if (res) {
          wx.navigateTo({
            url: '/pages/address/index',
          })
        }
      });
    }
  },
  pickGender: function (e) {
    this.setData({
      [`userInfo.gender`]: Number.parseInt(e.detail.value) + 1
    })
  },
  pickAge: function (e) {
    this.setData({
      [`userInfo.age`]: Number.parseInt(e.detail.value) + 1
    })
  },
  pickHeight: function (e) {
    this.setData({
      [`userInfo.height`]: Number.parseInt(e.detail.value) + 120
    })
  },
  pickWeight: function (e) {
    this.setData({
      [`userInfo.weight`]: Number.parseInt(e.detail.value) + 30
    })
  },
  rule:function(){
    wx.navigateTo({
      url: '/pages/rule/index',
    })
  },
  setting: function () {
    wx.navigateTo({
      url: '/pages/set/index',
    })
  },
})