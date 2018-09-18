// pages/index/index.js
const app = getApp();
const ageArr = [],
  heightArr = [],
  weightArr = []
for (let i = 1; i < 101; i++) {
  ageArr.push(i)
}
for (let i = 100; i < 220; i++) {
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
    step: 0,
    money: 0,
    fourRound: [0, 1, 2, 3],
    week: '',
    friendArr: '',
    goods: '',
    isChange: 1,
    noEnough: true,
    register: true,
    measure: true,
    zanwu: true,
    look: true,
    perMessage: true,
    haveAdd: false,
    isHaveopenid: '',
    openid:'',
    result: '',
    is_new: '',
    page: 1,
    haveMore: true,
    count_day: '',
    goods_detail: '',
    userInfo: '',
    test_log_id: '',
    genderArray: ['男', '女'],
    ageArr: ageArr,
    heightArr: heightArr,
    weightArr: weightArr,
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
    if (options.openid) {
      if (wx.getStorageSync('openid')){
        var openid = options.openid
        wx.request({
          url: app.globalData.base_url + '/invite_friends',
          data: {
            openid: openid,
            hy_openid: wx.getStorageSync('openid')
          },
          success: function (res) {
            
          }
        })
      }else{
        console.log('好友没授权')
      }
    }else{
      console.log('没有好友')
    }
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    if (wx.getStorageSync('openid')) {
      var openid = wx.getStorageSync('openid');
      that.setData({
        isHaveopenid: true
      })
    } else {
      var openid = 0;
      that.setData({
        isHaveopenid: false
      })
    }
    wx.request({
      url: app.globalData.base_url + '/home_content',
      data: {
        openid: openid
      },
      success: function (res) {
        console.log(res)
        that.setData({
          goods: res.data.goods,
          friendArr: res.data.hy_img,
          result: res.data.result,
          money: res.data.currency,
        })
        if (res.data.state_type == 1) {
          that.setData({
            is_new: res.data.is_new,
          })
        }
      }
    })
  },
  // 上拉触底事件，请求记录数据
  onReachBottom: function() {
    const that = this
    let page = that.data.page;
    if (wx.getStorageSync('openid')) {
      if (that.data.haveMore) {
        // 请求下一页数据
        page++;
        that.data.page = page;
        wx.showLoading({
          title: '加载中',
        })
        wx.request({
          url: app.globalData.base_url + '/down_goods_list',
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
            var goods = that.data.goods.concat(res.data.goods);
            that.setData({
              goods: goods,
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
    } else {
      console.log('没授权')
    }
  },
  analysis: function(e) {
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
        success: function(res) {
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
      app.onLogin();
      return;
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
    var that = this;
    if (wx.getStorageSync('openid')) {
      wx.request({
        url: app.globalData.base_url + '/sign',
        data: {
          openid: wx.getStorageSync('openid')
        },
        success: function(res) {
          console.log(res)
          that.setData({
            week: res.data.res,
            count_day: res.data.count_day,
          })
        }
      })
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
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/index?id=' + id,
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
    const that = this
    var step = that.data.step;
    if (wx.getStorageSync('openid')) {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.werun']) {
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
            wx.getWeRunData({
              fail: function(rs) {
                wx.getSetting({
                  success(r) {
                    //console.log(r);
                    wx.showModal({
                      title: '提示',
                      content: '微信运动授权失败，无法统计运动步数，请重新授权！',
                      // showCancel: false,
                      success: function(re) {
                        if (re.confirm) {
                          // console.log('用户点击确定')
                          // 微信运动步数 提示授权
                          wx.openSetting({
                            success: (res) => {
                              if (res.authSetting['scope.werun']) {
                                app.onRun(function(res) {
                                  console.log(22, res)
                                  that.setData({
                                    isOpenWXRun: app.globalData.isOpenWXRun
                                  })
                                  that.getStepRecord(res.data);
                                })
                              }
                            }
                          })
                        }
                      }
                    })
                  }
                })
              },
              success: function(res) {
                wx.getWeRunData({
                  success(res) {
                    app.onRun(function(res) {
                      console.log(11, res)
                      that.setData({
                        isOpenWXRun: app.globalData.isOpenWXRun
                      })

                    })
                  }
                });
              }
            })
          }
        }
      })
    } else {
      app.onLogin();
    }

  },
  lingqu: function(e) {
    const that = this;
    wx.request({
      url: app.globalData.base_url + '/is_new',
      data: {
        openid: wx.getStorageSync('openid')
      },
      success: function(res) {
        wx.showModal({
          title: '提示',
          content: '领取成功',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              that.setData({
                is_new: 1
              })
            }
          }
        })
      }
    })

  },
  goChange: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    if (wx.getStorageSync('openid')) {
      wx.request({
        url: app.globalData.base_url + '/goods_tk',
        data: {
          goods_id: id,
          openid: wx.getStorageSync('openid')
        },
        success: function(res) {
          if (res.data.state == 1) {
            that.setData({
              noEnough: false,
              goods_detail: res.data.goods,
            })
          } else {
            wx.navigateTo({
              url: '/pages/detail/index',
            })
          }
        }
      })

    } else {
      app.onLogin();
    }
  },
  wsMessage: function() {
    this.setData({
      measure: true,
      zanwu: true,
    })
  },
  pickGender: function(e) {
    this.setData({
      [`userInfo.gender`]: Number.parseInt(e.detail.value) + 1
    })
  },
  pickAge: function(e) {
    this.setData({
      [`userInfo.age`]: Number.parseInt(e.detail.value) + 1
    })
  },
  pickHeight: function(e) {
    this.setData({
      [`userInfo.height`]: Number.parseInt(e.detail.value) + 100
    })
  },
  pickWeight: function(e) {
    this.setData({
      [`userInfo.weight`]: Number.parseInt(e.detail.value) + 30
    })
  },
  wsResult: function(e) {
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
        success: function(res) {}
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
        success: function(res) {}
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
        success: function(res) {}
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
        success: function(res) {}
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
      success: function(res) {
        wx.navigateTo({
          url: '/pages/analysis/index?id=' + id,
        })
      }

    })
  },
  hideHandle: function() {
    var that = this;
    that.setData({
      noEnough: true,
      register: true,
      measure: true,
      perMessage: true,
      zanwu: true,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})