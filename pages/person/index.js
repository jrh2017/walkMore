// pages/person/index.js
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
    userInfo: {
      gender: '',
      age: '',
      height: '',
      weight: '',
    },
    genderArray: ['男', '女'],
    ageArr: ageArr,
    heightArr: heightArr,
    weightArr: weightArr,
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

  },
  personHandle: function (e) {
    console.log(e)
    let gender = Number.parseInt(e.detail.value.gender) + 1;
    let age=e.detail.value.age;
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
      success: function (res) {
        
      }

    })
  },
  pickGender: function (e) {
    this.setData({
      [`userInfo.gender`]: Number.parseInt(e.detail.value) + 1
    })
  },
  pickHeight: function (e) {
    this.setData({
      [`userInfo.height`]: Number.parseInt(e.detail.value) + 100,
    })
  },
  pickWeight: function (e) {
    this.setData({
      [`userInfo.weight`]: Number.parseInt(e.detail.value) + 30,
    })
  },
  pickAge: function (e) {
    this.setData({
      [`userInfo.age`]: Number.parseInt(e.detail.value)+1,
    })
  },

})