import { getData } from 'utils/util'

App({
  onLaunch: function () {

    wx.login({
      success: res => {
        console.log(res)
        
      }
    })
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    getData((data) => {
      let result = []
      console.log(data.values)
      for (let i=2; i < data.values.length; i++) {
        if (data.values[i][0] === "x")
          result.push({
            id: i,
            timestamp: data.values[i][5],
            name: data.values[i][6],
            address: data.values[i][7],
            dropOff: data.values[i][8],
            city: data.values[i][9],
            state: data.values[i][10],
            instruction: data.values[i][11],
            need: data.values[i][12],
            openBag: data.values[i][13],
            coordinate: {
              lat: data.values[i][16],
              lng: data.values[i][17]
            }
          })
      }
      this.globalData.sites = result
      // console.log(result[0])
      if (this.mapDataReadyCallback) {
        this.mapDataReadyCallback()
      }
    })
  }, globalData: {
    userInfo: null,
    sites: null
  }
})
