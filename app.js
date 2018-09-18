//app.js
App({
  onLaunch: function(options) {
    // const updateManager = wx.getUpdateManager()
    // updateManager.onCheckForUpdate(function (res) {
    //   // 请求完新版本信息的回调
    //   console.log(res.hasUpdate)
    // })

    // updateManager.onUpdateReady(function () {
    //   wx.showModal({
    //     title: '更新提示',
    //     content: '新版本已经准备好，是否重启应用？',
    //     success: function (res) {
    //       if (res.confirm) {
    //         // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    //         updateManager.applyUpdate()
    //       }
    //     }
    //   })

    // })

    // updateManager.onUpdateFailed(function () {
    //   // 新的版本下载失败
    //  throw Error("新的版本下载失败");
    // })

    // this.globalData.scene = options.scene;
  },
  onShow: function(options) {
    this.globalData.scene = options.scene;
  },
  onRun: function(cb) {
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.werun']) {
          that.globalData.isOpenWXRun = false;
        } else{
          if (!wx.getStorageSync('session')) {
            that.globalData.isOpenWXRun = false;
          } else {
            wx.getWeRunData({
              success(res) {
                wx.request({
                  url: that.globalData.base_url + '/wxrun',
                  data: {
                    encryptedData: encodeURIComponent(res.encryptedData),
                    iv: encodeURIComponent(res.iv),
                    session: wx.getStorageSync('session')
                  },
                  method: 'GET',
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function(res) {
                    console.log(res)
                    if (res.data.status == 1) {
                      that.globalData.isOpenWXRun = true;
                      that.globalData.wxRunData = res.data;
                      typeof cb == "function" && cb(res.data);
                    } else {
                      that.globalData.isOpenWXRun = false;
                      wx.login({
                        success: res => {
                          wx.getUserInfo({
                            withCredentials: true,
                            success: function(res_user) {
                              wx.request({
                                url: that.globalData.base_url + '/login',
                                data: {
                                  code: res.code,
                                  encryptedData: encodeURIComponent(res_user.encryptedData),
                                  iv: encodeURIComponent(res_user.iv)
                                },
                                method: 'GET',
                                header: {
                                  'content-type': 'application/json'
                                },
                                success: function(res) {
                                  that.globalData.userInfo = res.data.userinfo;
                                  wx.setStorageSync('session', res.data.hash);
                                  wx.setStorageSync('openid', res.data.openid);
                                  typeof cb == "function" && cb(that.globalData.userInfo)
                                  //that.onRun();
                                }
                              })
                            },
                          })

                        },

                      })
                    }
                  }
                })
              }
            })
          }
        }
      }
    })
  },
  onLogin: function(cb) {
    var that = this;
    wx.checkSession({
      success: function(res) {
        if (wx.getStorageSync('openid')) {
          that.onRefresh(cb);
        } else {
          wx.login({
            success: res => {
              if (res.code) {
                wx.getUserInfo({
                  withCredentials: true,
                  success: function(res_user) {
                    wx.request({
                      url: that.globalData.base_url + '/login',
                      data: {
                        code: res.code,
                        encryptedData: res_user.encryptedData,
                        iv: res_user.iv
                      },
                      method: 'GET',
                      header: {
                        'content-type': 'application/json'
                      },
                      success: function(res) {
                        console.log(3, res)
                        that.globalData.userInfo = res.data.userinfo;
                        wx.setStorageSync('session', res.data.hash);
                        wx.setStorageSync('openid', res.data.openid);
                        typeof cb == "function" && cb(that.globalData.userInfo)
                        //that.onRun();
                      }
                    })
                  },
                  fail: function(e) {
                    typeof cb == "function" && cb(false)
                    // wx.showModal({
                    //   title: '警告1',
                    //   content: '您拒绝了授权,将无法正常显示个人信息,点击确定重新获取授权。',
                    //   success: function (res) {
                    //     if (res.confirm) {
                    //       that.toAuthorize(cb);
                    //     } else if (res.cancel) {
                    //       typeof cb == "function" && cb(false)
                    //     }
                    //   }
                    // })
                  }
                })
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            },
            fail: function(e) {
              //  typeof cb == "function" && cb(false)
              //  wx.showModal({
              //    title: '警告',
              //    content: '您拒绝了授权,将无法正常显示个人信息,点击确定重新获取授权。',
              //    success: function (res) {
              //      if (res.confirm) {
              //        that.toAuthorize(cb);
              //      } else if (res.cancel) {
              //        typeof cb == "function" && cb(false)
              //      }
              //    }
              //  })
            }

          })
        }
     
      },
      fail: function() {
        wx.login({
          success: res => {
            if (res.code) {
              wx.getUserInfo({
                withCredentials: true,
                success: function(res_user) {
                  wx.request({
                    url: that.globalData.base_url + '/login',
                    data: {
                      code: res.code,
                      encryptedData: res_user.encryptedData,
                      iv: res_user.iv
                    },
                    method: 'GET',
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function(res) {
                      console.log('fail',res)
                      that.globalData.userInfo = res.data.userinfo;
                      wx.setStorageSync('session', res.data.hash);
                      wx.setStorageSync('openid', res.data.openid);
                      // that.onRun();
                      typeof cb == "function" && cb(that.globalData.userInfo)
                    }
                  })
                },
                fail: function(e) {
                  typeof cb == "function" && cb(false)
                  // wx.showModal({
                  //   title: '警告111111',
                  //   content: '您拒绝了授权,将无法正常显示个人信息,点击确定重新获取授权。',
                  //   success: function (res) {
                  //     if (res.confirm) {
                  //       that.toAuthorize(cb);
                  //     } else if (res.cancel){
                  //       typeof cb == "function" && cb(false)
                  //     }
                  //   }
                  // })
                }
              })
            } else {
              // typeof cb == "function" && cb(false)
              // wx.showModal({
              //   title: '警告',
              //   content: '您拒绝了授权,将无法正常显示个人信息,点击确定重新获取授权。',
              //   success: function (res) {
              //     if (res.confirm) {
              //       that.toAuthorize(cb);
              //     } else if (res.cancel) {
              //       typeof cb == "function" && cb(false)
              //     }
              //   }
              // })
            }
          }
        })
      }
    })


  },
  onRefresh: function(cb) {
    var that = this;
    wx.checkSession({
      success: function(res) {
        //that.onRun();
        if (!that.globalData.userInfo) {
          if (wx.getStorageSync('openid')) {
            wx.request({
              url: that.globalData.base_url + '/login_info',
              data: {
                openid: wx.getStorageSync('openid'),
              },
              method: 'GET',
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                that.globalData.userInfo = res.data.userinfo;
                typeof cb == "function" && cb(that.globalData.userInfo)
              }
            })
          } else {
            that.onLogin(cb);
          }
        } else {
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      },
      fail: function(res) {
        that.onLogin(cb);
      },
    })

  },
  globalData: {
    base_url: "https://www.mnancheng.com/admin/wechat",
    isOpenWXRun: null,
    wxRunData: null,
    userInfo: null,
    scene: null
  },
})