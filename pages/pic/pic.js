// pages/pic/pic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clickButton: false,
    hairButton: false,
    eyeButton: false,
    crownButton: false,
    number: 0,
    base64:[],
    background:'/img/12background/background1.png',
    body:'/img/11body/body1.png',
    cloth: '/img/10cloth/cloth1.png',
    head: '/img/9head/head1.png',
    bianzi: '/img/8bianzi/bianzi1.png',
    shoulder: '/img/7shoulder/shoulder1.png',
    facePic: '/img/6facePic/facePic1.png',
    face: '/img/5face/face1.png',
    hair: '/img/4hair/hair1.png',
    crown: '/img/3crown/crown1.png',
    lefthand: '/img/2lefthand/lefthand1.png',
    mainhand: '/img/1mainhand/mainhand1.png',
    people:'/img/19.png',
    img:'',
    picWith:'ab'
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

  },
  tapName: function (event) {
    var gener_index = this.data.clickButton
    if (gener_index===true){
      this.setData({ clickButton: false })
    }
    else{
      this.setData({ clickButton: true })
    }
  },
  tapHair: function (event) {
    var gener_index = this.data.hairButton
    this.setData({ crownButton: false })
    if (gener_index === true) {
      this.setData({ hairButton: false })
    }
    else {
      this.setData({ hairButton: true })
    }
  },
  tapCrown: function (event) {
    var gener_index = this.data.crownButton
    this.setData({ hairButton: false })
    if (gener_index === true) {
      this.setData({ crownButton: false })
    }
    else {
      this.setData({ crownButton: true })
    }
  },

  clickHair: function (e) {
    var imgsrc = e.target.dataset.imgsrc;

    console.log(imgsrc);
    this.setData({ hair: imgsrc })
  },
  clickCrown: function (e) {
    var imgsrc = e.target.dataset.imgsrc;

    console.log(imgsrc);
    this.setData({ crown: imgsrc })
  },
  generatePic: function(event){
        let that = this;
        var postersize = this.setCanvasSize(750);//动态设置画布大小
        var sWidth = postersize.w > postersize.h ? postersize.h : postersize.w;
        console.log(sWidth);
//        let { pixelRatio } = wx.getSystemInfoSync()
        var pixelRatio=1;
        console.log(pixelRatio)
        const ctx = wx.createCanvasContext('shareCanvas');
//        ctx.drawImage(this.data.background, 0, 0, postersize.w, postersize.h);

        wx.getImageInfo({
          src: this.data.people,
          success: function (res) {
            that.setData({picWith:res.width,})
          }
        });
        console.log(this.data.people)
        console.log(that.data.picWith)
    var outSizew = that.data.picWith;
    var outSizeh = that.data.picWith;
        
        var inSizew=100;
        var inSizeh=100;
        ctx.drawImage(this.data.people, 0, 0, outSizew * pixelRatio, outSizeh * pixelRatio, 0, 0, inSizew * pixelRatio, inSizeh * pixelRatio );
//    ctx.drawImage(this.data.people, 0, 0, outSizew, outSizeh );
//        ctx.setFillStyle('red')
//        ctx.fillRect(10,10,150,100)
        var re = wx.getSystemInfoSync();
        var scale = 750 / 180;
        var width = re.windowWidth / scale;
        var height = width;
        var leftscale = 750 / 480;
        var left = re.windowWidth / leftscale;
        var topscale = 750 / 880;
        var top = re.windowWidth / topscale;
        console.log(left + "  " + top + "  " + width + " " + height);
//        ctx.drawImage(this.data.cloth, left, top, width, height);
//       ctx.drawImage(this.data.cloth, 204, 375,76,76);
        ctx.draw(true);
        setTimeout(() => {
          // code_url = this.canvasToTempImage(); 
          //获取临时缓存合成照片路径，存入data中
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: inSizew,
            height: inSizeh,
  //          destWidth: outSizew  / wx.getSystemInfoSync().windowWidth,
  //          destHeight: outSizeh / wx.getSystemInfoSync().windowWidth,
            destWidth: inSizew*3,
            destHeight: inSizeh*3,
            canvasId: 'shareCanvas',
  //          fileType: 'jpg', 
  //          quality: 1,
            success: function (res) {
              var tempFilePath = res.tempFilePath;
              console.log(tempFilePath)
              that.setData({ img: tempFilePath })
              that.previewImg()
            },
            fail: function (res) {
              console.log(res);
            }
          },this);
        }, 3000);

      },

  //适配不同屏幕大小的canvas
  setCanvasSize: function (width) {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / width;
      // var scale = 1
      var width = res.windowWidth / scale;
      var height = res.windowHeight / scale;;
      size.w = width;
      size.h = height;
      console.log(size.w +"  " + size.h);
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.img;
    //保存二维码到相册

    wx.saveImageToPhotosAlbum({
      filePath: img,
      success: function (res) {
        wx.showModal({
          content: '保存成功',
          confirmText: '确认',
          showCancel: false,
          success: function (res) {

          }
        });
      },
      fail: function (res) {
        wx.showModal({
          content: '保存失败',
          confirmText: '确认',
          showCancel: false,
          success: function (res) {

          }
        });
      }
    })
  }

})