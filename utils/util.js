

const getData = (callback) => {
  wx.request({
    url: 'http://findthemasks.com/data.json',
    //url: 'https://storage.googleapis.com/findthemasks.appspot.com/data-us.json',
    success (res) {
      // let data = res.data;
      console.log(res.data)
      callback(res.data);
    }
  })
};

export { getData };
