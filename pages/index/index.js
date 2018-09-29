// pages/index/index.js
// const Page = require('../../utils/ald-stat.js').Page;
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
    look: false,
    perMessage: true,
    isHaveopenid: '',
    openid: '',
    result: '',
    is_new: true,
    is_sign: true,
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
    scene_value: '',
    noMore: true,
    clicked: true,
    clim: true,
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
    var that = this;
    if (options.openid) {
      that.setData({
        openid: options.openid
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    if (wx.getStorageSync('openid')) {
      app.onRun(function(res) {
        if (res.data) {
          that.getStepRecord(res.data);
        }
      })
      var openids = wx.getStorageSync('openid');
      that.setData({
        isHaveopenid: true
      })
      if (that.data.openid) {
        var openid = that.data.openid
        wx.request({
          url: app.globalData.base_url + '/invite_friends',
          data: {
            openid: openid,
            hy_openid: wx.getStorageSync('openid')
          },
          success: function(res) {}
        })
      } else {
        console.log('没有获取到你的openid')
      }
    } else {
      var openids = 0;
      that.setData({
        isHaveopenid: false
      })
    }
    wx.request({
      url: app.globalData.base_url + '/home_content',
      data: {
        openid: openids
      },
      success: function(res) {
        console.log(res)
        that.setData({
          goods: res.data.goods,
          friendArr: res.data.hy_img,
          result: res.data.result,
          money: res.data.currency,
          scene_value: res.data.scene_value,
          haveMore: true,
          noMore: true,
          page: 1,
          is_sign: res.data.is_sign,
        })
        if (res.data.scene_value == 1) {
          if (res.data.result.type_id == 2) {
            that.setData({
              zanwu: false,
            })
          } else {
            that.setData({
              measure: false,
            })
          }
        }
        if (res.data.is_new == 1) {
          that.setData({
            is_new: true,
          })
        } else {
          that.setData({
            is_new: false,
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
        that.data.page = page
        // wx.showLoading({
        //   title: '加载中',
        // })
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
            that.data.goods = that.data.goods.concat(res.data.goods);
            that.setData({
              goods: that.data.goods,
              haveMore: res.data.more,
            })
            if (res.data.more) {
              that.setData({
                noMore: true,
              })
            } else {
              that.setData({
                noMore: false,
              })
            }
          }
        })
      } else {
        // wx.showToast({
        //   title: '数据加载完毕',
        //   icon: 'success',
        //   duration: 1500,
        // })
      }
    } else {
      // console.log('没授权')
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
          var id = res.data.res.test_log_id;
          that.setData({
            test_log_id: id,
            look: false,
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
      app.onLogin(function(res) {
        if (res) {
          that.onShow();
        }
      });
      return;
    }
  },
  authorizeNow: function(e) {
    var that = this;
    app.onLogin(function(res) {
      if (res) {
        that.onShow();
      }
    });
  },
  goSignForm: function(e) {
    var that = this;
    wx.request({
      url: app.globalData.base_url + '/sign',
      data: {
        openid: wx.getStorageSync('openid')
      },
      success: function(res) {
        that.setData({
          register: false,
          week: res.data.res,
          count_day: res.data.count_day,
        })
        that.onShow();
      }
    })
  },
  goHeat: function(e) {
    if (wx.getStorageSync('openid')) {
      wx.navigateTo({
        url: '/pages/heatMoney/index',
      })
    } else {
      app.onLogin(function(res) {
        if (res) {
          wx.navigateTo({
            url: '/pages/heatMoney/index',
          })
        }
      });
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
            var step = that.data.step;
            var money = (step / 1000).toFixed(2);
            if (step < 1000) {
              wx.showModal({
                title: '提示',
                content: '步数低于1000步无法兑换热力币',
                showCancel: false,
              })
            } else {
              wx.showModal({
                title: '兑换提示',
                content: `花费${step}步兑换${money}个热力币`,
                success: function(res) {
                  if (res.confirm) {
                    wx.request({
                      url: app.globalData.base_url + '/exchange',
                      data: {
                        step_num: step,
                        openid: wx.getStorageSync('openid')
                      },
                      method: 'GET',
                      header: {
                        'content-type': 'application/json'
                      },
                      success: function(res) {
                        setTimeout(function() {
                          while (step > 0) {
                            step -= 50;
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
                        }, 1500);
                        that.onShow();
                      }
                    })

                  } else if (res.cancel) {
                    return
                  }
                }
              })
            }

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
                                  that.getStepRecord(res.data);
                                })
                                that.onShow();
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
                      that.getStepRecord(res.data);
                    })
                  }
                });
              }
            })
          }
        }
      })
    } else {
      app.onLogin(function(res) {
        if (res) {
          that.onShow();
        }
      });
    }
  },
  getStepRecord: function(runData) {
    var that = this;
    var runData = app.globalData.wxRunData;
    if (runData == '' ||runData ==null) {
      var count = 0;
    } else {
      var count = runData.data;
    }
    that.setData({
      step: count
    })
  },
  lingqu: function(e) {
    const that = this;
    if (wx.getStorageSync('openid')) {
      wx.request({
        url: app.globalData.base_url + '/is_new',
        data: {
          openid: wx.getStorageSync('openid')
        },
        success: function(res) {
          wx.showModal({
            title: '提示',
            content: '恭喜您成功领取5热力币！',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                that.onShow();
              }
            }
          })
        }
      })
    } else {
      app.onLogin(function(res) {
        if (res) {
          that.onShow();
        }
      })
    }

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
              url: '/pages/detail/index?id=' + id,
            })
          }
        }
      })

    } else {
      app.onLogin(function(res) {
        if (res) {
          that.onShow();
        }
      });
    }
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
      [`userInfo.height`]: Number.parseInt(e.detail.value) + 120
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
    var gender = null;
    if (e.detail.value.gender > 0) {
      gender = e.detail.value.gender + 1;
    } else if (userInfo.gender > 0) {
      gender = userInfo.gender;
    } else {
      gender = ""
    }
    var height = null;
    if (e.detail.value.height > 0) {
      height = e.detail.value.height;
    } else if (userInfo.height > 0) {
      height = userInfo.height;
    } else {
      height = ""
    }
    var weight = null;
    if (e.detail.value.weight > 0) {
      weight = e.detail.value.weight;
    } else if (userInfo.weight > 0) {
      weight = userInfo.weight;
    } else {
      weight = ""
    }
    let age = e.detail.value.age;
    let mes = "";
    if (weight === "" || weight == 0) {
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
    if (height === "" || height == 0) {
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
    if (age === "" || age == 0) {
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
    gender = gender == 1 ? "男" : "女";
    var id = that.data.test_log_id;
    var type_id = that.data.result.type_id;
    wx.request({
      url: app.globalData.base_url + '/save_info',
      data: {
        gender: gender,
        type_id: type_id,
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
        that.setData({
          perMessage: true,
        })
      }
    })
  },
  wsMessage: function() {
    this.setData({
      measure: true,
      zanwu: true,
      look: true,
      clicked: false,
      clim: false,
    })
  },
  hideHandle: function() {
    var that = this;
    that.setData({
      noEnough: true,
      register: true,
      perMessage: true,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    var openid = wx.getStorageSync('openid')
    var nickname = wx.getStorageSync('nickname')
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: `${nickname}邀请你用步数免费换礼物，速来！先到先得！`,
      imageUrl: '../../imgs/share.png',
      path: '/pages/index/index?openid=' + openid
    }
  },
})