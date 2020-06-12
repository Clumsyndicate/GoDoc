import { LOGO_BASE64 } from '../../assets/images';

// pages/ppe_intro/ppe_intro.js
Page({
  data: {
    logo_img: LOGO_BASE64,
    data: [{
      src: '/assets/n95.jpg',
      title: 'N95口罩',
      description: 'These masks are critical in protecting healthcare workers from infectious droplets and aerosols.'
    }, { 
      src: '/assets/surgical_mask.jpg',
      title: '医用口罩',
      description: 'Although not as secure as N95 masks, surgical masks do offer a significant degree of protection against droplets with SARS-CoV-2.'
    }],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 5000,
    duration: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})