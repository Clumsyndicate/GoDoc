import { DOC_BASE64, HEART_BASE64, MASK_BASE64 } from '../../assets/images'

const app = getApp()
const CDN_PATH = 'https://3gimg.qq.com/lightmap/xcx/demoCenter/images';

Page({
  data: {
    image_data: DOC_BASE64,
    message: "hi",
    CDN_PATH,
    imgs: {
      downArrow: `${CDN_PATH}/iconArrowDown@3x.png`,
      upArrow: `${CDN_PATH}/iconArrowUp@3x.png`,
      rightArrow: `${CDN_PATH}/iconArrowRight@3x.png`,
    },
    menuList: [{
      id: 'faq',
      name: `What's PPE?`,
      open: true,
      img: MASK_BASE64,
      pages: [{
        name: 'PPE 简介',
        url: '../ppe_intro/ppe_intro'
      }, {
        name: '美国PPE现状',
        url: '../ppe_now/ppe_now'
      }]
    },{
        id: 'donate',
        name: '我要捐献',
        open: false,
        img: HEART_BASE64,
        pages: [{
          name: '如何捐献',
          url: '../map/show/show',
        }, {
          name: '我的捐献',
          url: '../map/view/view'
        }]
      },
      {
        id: 'sites',
        name: '查看美国捐献点',
        open: false,
        url: '../map/map',
        img: `${CDN_PATH}/iconMap@3x.png`,
        pages: []
      },
      {
        id: 'more',
        name: '更多',
        open: false,
        img: `${CDN_PATH}/iconPort@3x.png`,
        pages: [{
          name: '合作',
          url: '../webservice/reverseGeocoder-form/reverseGeocoder-form'
        }, {
          name: '地点搜索',
          url: '../webservice/search-form/search-form'
        }]
      }
    ],
    dialogShow: false,
    link: 'https://github.com/TencentLBS/TencentMapMiniProgramDemo'
  },
  onListToggle: function (e) {
    const id = e.currentTarget.id,
      list = this.data.menuList;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        if (list[i].url) {
          wx.navigateTo({
            url: list[i].url,
          });
        }
        list[i].open = !list[i].open;
      } 
      // else {
      //   list[i].open = false;
      // }
    }
    this.setData({
      menuList: list
    });
  },
  onDialogClose() {
    this.setData({
      dialogShow: false
    });
  },
  watchCode() {
    this.setData({
      dialogShow: true
    });
  },
  onShareAppMessage: function () {

  },
  goToMap: function () {
    wx.navigateTo({
      url: '../map/map'
    })
  },
  onLoad: function () {
  },
})