// pages/editAdd/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: '请输入地址',
    color: '#B3B3B3',
    // isHaveAddress:true,
    name:'',
    phone:'',
    detailAddress:'',
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
    wx.request({
      url: app.globalData.base_url + '/address',
      data: {
        openid: wx.getStorageSync('openid')
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res)
        that.setData({
          name: res.data.res.name,
          phone: res.data.res.phone,
          region: res.data.res.address,
          detailAddress: res.data.res.detail_address,
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  personHandle: function(e) {
    console.log(e)
    let address = e.detail.value.region.toString();
    console.log(address)
    let detailAddress = e.detail.value.detailAddress;
    let phone=e.detail.value.phone;
    let name=e.detail.value.name;
    let mes = "";

    if (name === "") {
      mes = "收货人"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function(res) {}
      })
      return
    }
    if (phone === "") {
      mes = "手机号"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function(res) {}
      })
      return
    }
    if (address === "") {
      mes = "地址"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function(res) {}
      })
      return
    }
    if (detailAddress === "") {
      mes = "详细地址"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }
    wx.request({
      url: app.globalData.base_url + '/editor',
      data: {
        name: name,
        detail_address: detailAddress,
        address:address,
        phone:phone,
        openid: wx.getStorageSync('openid')
      },
      success: function(res) {
        console.log(res)
        if (res.statusCode === 200) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 1500,
            mask: true,
          })
        }
      }
    })
  },
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value,
      color: '#333',
    })
  },

})