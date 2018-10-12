//app.js
// const App = require('./utils/ald-stat.js').App;
App({
  onLaunch: function(options) {
    var that = this;
    wx.checkSession({
      success: function(res) {

      },
      fail: function(res) {
        that.onLogin();
      }
    })
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
        } else {
          if (!wx.getStorageSync('session')) {
            that.globalData.isOpenWXRun = false;
          } else {
            wx.getWeRunData({
              success(res) {
                wx.request({
                  url: that.globalData.base_url + '/wxrun',
                  data: {
                    encryptedData: res.encryptedData,
                    iv: res.iv,
                    session: wx.getStorageSync('session'),
                    openid: wx.getStorageSync('openid'),
                  },
                  method: 'GET',
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function(res) {
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
                                  encryptedData: res_user.encryptedData,
                                  iv: res_user.iv
                                },
                                method: 'GET',
                                header: {
                                  'content-type': 'application/json'
                                },
                                success: function(res) {
                                  that.globalData.userInfo = res.data.userinfo;
                                  wx.setStorageSync('session', res.data.hash);
                                  wx.setStorageSync('openid', res.data.openid);
                                  wx.setStorageSync('open_id', res.data.open_id);
                                  typeof cb == "function" && cb(res.data);
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
  onLogins: function(cb) {
    var that = this;
    wx.login({
      success: res => {
        if (res.code) {
          wx.getUserInfo({
            withCredentials: true,
            success: function(res_user) {
              wx.request({
                url: that.globalData.base_url + '/login',
                data: {
                  scene_value: 1,
                  code: res.code,
                  encryptedData: res_user.encryptedData,
                  iv: res_user.iv
                },
                method: 'GET',
                header: {
                  'content-type': 'application/json'
                },
                success: function(res) {
                  that.globalData.userInfo = res.data.userinfo;
                  wx.setStorageSync('nickname', res.data.userinfo.nickname);
                  wx.setStorageSync('session', res.data.hash);
                  wx.setStorageSync('openid', res.data.openid);
                  wx.setStorageSync('open_id', res.data.open_id);
                  typeof cb == "function" && cb(res.data);
                }
              })
            },
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
    })

  },
  onLogin: function(cb) {
    var that = this;
    if (wx.getStorageSync('openid') && wx.getStorageSync('open_id')) {
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
                    scene_value: 0,
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
                    wx.setStorageSync('nickname', res.data.userinfo.nickname);
                    wx.setStorageSync('session', res.data.hash);
                    wx.setStorageSync('openid', res.data.openid);
                    wx.setStorageSync('open_id', res.data.open_id);
                    typeof cb == "function" && cb(res.data);
                  }
                })
              },
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        },
      })
    }
  },
  onRefresh: function(cb) {
    var that = this;
    wx.checkSession({
      success: function(res) {
        if (wx.getStorageSync('openid')) {
          wx.request({
            url: that.globalData.base_url + '/login_info',
            data: {
              scene_value: 0,
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
      },
      fail: function(res) {
        that.onLogin(cb);
      },
    })
  },
  onRefreshs: function(cb) {
    var that = this;
    wx.checkSession({
      success: function(res) {
        if (wx.getStorageSync('openid')) {
          wx.request({
            url: that.globalData.base_url + '/login_info',
            data: {
              scene_value: 1,
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
          that.onLogins(cb);
        }
      },
      fail: function(res) {
        that.onLogins(cb);
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