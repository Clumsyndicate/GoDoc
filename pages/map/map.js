import { LOGO_BASE64, HEART_BASE64 } from '../../assets/images'
import { getData } from '../../utils/util'
import { STATES, STATE_LOCATION } from '../../utils/stateAbbr'
const CDN_PATH = 'https://3gimg.qq.com/lightmap/xcx/demoCenter/images';
let app = getApp();

const INIT_MARKER = {
  id: 0,
	callout: {
		content: '腾讯总部大楼',
		padding: 10,
		borderRadius: 2,
		display: 'BYCLICK'
  },
  
	latitude: 34.0689,
	longitude: -118.4452,
	// iconPath: '/img/marker_red.png',
	// width: '34px',
	// height: '34px',
	// rotate: 0,
	alpha: 1
};

const setting = {
  skew: 0,
  rotate: 0,
  showLocation: false,
  showScale: true,
  showCompass: true,
  enable3D: true,
  scale: 10
}

const statesChosen = ['CA', 'NY', 'WA', 'TX', 'MA']

function getStateData(data) {
  let result = []
  for (let key in data) {
    if (statesChosen.indexOf(key) !== -1) {
      let stateInfo = data[key]
      result.push({text: stateInfo.name, value: {lat: stateInfo.coordinate.lat, lng: stateInfo.coordinate.lng, text: stateInfo.name, key: key}})
    }
  }
  return result
}

function updateMarkers(state, city=null) {
  // console.log(app.globalData.sites)
  let sites = app.globalData.sites.filter(function(siteInfo) {
    return siteInfo.state === state
  })
  if (city) {
    sites = app.globalData.sites.filter(function(siteInfo) {
      return siteInfo.city.indexOf(city) !== -1
    })
  }
  let result = []
  sites.forEach(function(siteInfo) {
    result.push({
      id: siteInfo.id,
      callout: {
        content: siteInfo.name,
        padding: 10,
        borderRadius: 2,
        display: 'BYCLICK'
      },
      latitude: siteInfo.coordinate.lat,
      longitude: siteInfo.coordinate.lng,
      alpha: 1
    })
  })
  // console.log(result)
  return result
}

function getStatesNames(data) {
  let result = []
  for (let key in data) {
    result.push(data[key].name)
  }
  return result
}

Page({

  data: {
    setting: setting,
    defaultLocation: {lat: 34.0689, lng: -118.4452},
    markers: [{
			...INIT_MARKER
    }],
    tabList: [{
			name: '地图'
		},{
			name: '列表'
    }],
    tabIndex: 0,
    showCityActionSheet: false,
    showStateActionSheet: false,
    imgs: {
			rightArrow: `${CDN_PATH}/iconArrowRight@3x.png`
		},
    cityLocations: [
      { text: '旧金山', value: {lat: 37.7749, lng: -122.4194, text: '旧金山', state: STATE_LOCATION.CA.name, key: 'San Francisco'}},
      { text: '洛杉矶', value: {lat: 34.0689, lng: -118.4452, text: '洛杉矶', state: STATE_LOCATION.CA.name, key: 'Los Angeles'}},
      { text: '纽约', value: {lat: 40.7128, lng: -74.0060, text: '纽约', state: STATE_LOCATION.NY.name, key: 'New York'}}
    ],
    stateLocations: getStateData(STATE_LOCATION),
    // Picker settings
    picker_value: [1,1],
    state_: '加利福尼亚州',
    city_: '洛杉矶',
    states_: getStatesNames(STATE_LOCATION),
    cities_: ['旧金山', '洛杉矶','纽约'],
    showPicker: true,
  },
  pickerChange(e) {
    const val = e.detail.value
    this.setData({
      state_: this.data.states_[val[0]],
      city_: this.data.cities_[val[1]]
    })
  },
  markerTap(e) {
    console.log(e)
  },

  onTapSelectCity() {
    this.setData({
      showCityActionSheet: true
    });
  },
  onSelectCity (event) {
    const { text, value, state } = event.detail;
    console.log(event);
    if (value) {
      this.setData({showCityActionSheet: false, defaultLocation: value, city: value.text, state: value.state, 'setting.scale': 10, markers: updateMarkers('CA', value.key)})
    }
  },

  onTapSelectState() {
    this.setData({
      showStateActionSheet: true
    })
  },
  onSelectState(event) {
    const { value } = event.detail;
    if (value) {
      this.setData({showStateActionSheet: false, defaultLocation: value, state: value.text, 'setting.scale': 7, city: '', markers: updateMarkers(value.key)})
    }
  },

  

  onClickTab (event) {
    this.setData({
      tabIndex: event.detail.current
    });
  },
  onChangeShowCallout (event) {
    const {value} = event.detail;

    let marker_display_settings = {}
      for (let i=0; i < this.data.markers.length; i++){
        marker_display_settings['markers[' + i + '].callout.display'] = value ? 'ALWAYS' : 'BYCLICK'
      }
      this.setData(marker_display_settings);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let that = this;
    // wx.getLocation({
    //   type: 'gcj02',
    //   success(res) {
    //     const latitude = res.latitude;
    //     const longitude = res.longitude;
    //     const markers = [{
    //       id: 1,
    //       longitude: 113.324520, latitude: 23.099994,
    //       title: "hihi",
    //       label: "label"
    //     }];
    //     that.setData({
    //       markers: markers
    //     })
    //   }
    // });
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