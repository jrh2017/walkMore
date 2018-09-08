// pages/set/index.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  goRun:function(e){
    const that = this
    wx.getWeRunData({
      fail: function (rs) {
        wx.getSetting({
          success(r) {
            //console.log(r);
            wx.showModal({
              title: '提示',
              content: '微信运动授权失败，无法统计运动步数，请重新授权！',
              // showCancel: false,
              success: function (re) {
                if (re.confirm) {
                  // console.log('用户点击确定')
                  // 微信运动步数 提示授权
                  wx.openSetting({
                    success: (res) => {
                      if (res.authSetting['scope.werun']) {
                        app.onRun(function (res) {
                          that.setData({
                            isOpenWXRun: app.globalData.isOpenWXRun
                          })
                        
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
      success: function (res) {
        wx.getWeRunData({
          success(res) {
            app.onRun(function (res) {
              that.setData({
                isOpenWXRun: app.globalData.isOpenWXRun
              })
              wx.navigateTo({
                url: '/pages/step/index',
              })
              that.getStepRecord(res.data);
            })
          }
        });
      }
    })
  }
})