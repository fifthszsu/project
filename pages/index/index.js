//index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleInfo: [
      {
        name: "头发",
        triger: "hair4",
        length:2,
      },
      {
        name: "头冠",
        triger: "crown3",
        length: 2
      },
      {
        name: "肩膀",
        triger: "shoulder7",
        length: 2
      },
      {
        name: "主手",
        triger: "mainhand1",
        length: 2
      },
      {
        name: "副手",
        triger: "lefthand2",
        length: 1,
      },
      {
        name: "脸庞",
        triger: "face5",
        length: 2,
      },
      {
        name: "脸纹",
        triger: "facePic6",
        length: 2,
      },
      {
        name: "辫子",
        triger: "bianzi8",
        length: 1,
      },
      {
        name: "头",
        triger: "head9",
        length: 1,
      },
      {
        name: "衣服",
        triger: "cloth10",
        length: 2,
      },
      {
        name: "身体",
        triger: "body11",
        length: 1,
      },
      {
        name: "背景",
        triger: "background12",
        length: 1,
      },
    ],
    hair4: false,
    crown3: false,
    shoulder7: false,
    mainhand1: false,
    lefthand2: false,
    face5: false,
    facePic6: false,
    bianzi8: false,
    head9: false,
    cloth10: false,
    body11: false,
    background12: false,
    background: '/img/12background/background1.png',
    body: '/img/11body/body1.png',
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
    people: '/img/19.png',
    img: '',
    clickType: '',
    fileList:[],
    Pic1:false,
    Pic2:false,
    cloudPic1:'',
    cloudPic2:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init()
    let that = this;
    wx.getImageInfo({
      src: this.data.background,
      success: function (res) {
        that.setData({ picWith: res.width, })
      }
    });
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

  removeOption: function(){
    this.setData({ hair4: false, crown3: false, shoulder7: false, mainhand1: false, lefthand2: false, face5: false, facePic6: false, bianzi8: false, head9: false, cloth10: false, body11: false, background12: false,}) 
  },

// 点击12个部位，并加载各自选项。功能已经完成
  clickOption: function (event) {
    this.removeOption()
    this.setData({ Pic1: false })
    this.setData({ Pic2: false })
    var type = event.currentTarget.dataset.s
    var typeNoNum = type.replace(/\d/g, '');
//    console.log(typeNoNum)
    this.setData({ [type]: true })
    this.setData({ clickType: type })
    var path = "cloud://wow-fifths.776f-wow-fifths-1300924140/" + type + "/" + typeNoNum
//    console.log(this.data.clickType)
//    console.log(event.currentTarget.dataset.s)
    this.data.fileList.length=0
    for (var i = 1; i < event.currentTarget.dataset.l + 1; i++) {
      var picPath = path + i + ".png"
      //      console.log(picPath)
      this.data.fileList.push(picPath)
    }
    console.log(this.data.fileList)
// 将服务器图片作为按钮背景图，目前只用了两个参数
    wx.cloud.getTempFileURL({    
      fileList: this.data.fileList,    
      success: res => {
        
        var urlList = res.fileList
        console.log(urlList[urlList.length - 1].tempFileURL)
        for (var j = 0; j < urlList.length;j++){
//          var obj = urlList[j].tempFileURL
//          if (obj != "undefined" || obj != null || obj != ""){
            var tempPic = "cloudPic"+String(j+1)  
            var tempFlag = "Pic" + String(j+1)      
            this.setData({ [tempPic]: urlList[j].tempFileURL })
            this.setData({ [tempFlag]: true })
//          }
        }
      },
      fail: console.error
    })
  },

//点击图片素材将素材加载到本地，为画图做准备  
  clickPic: function (e) {
    var imgsrc = e.target.dataset.imgsrc;
    var i = e.target.dataset.s-1
    console.log(this.data.fileList[i])
    var type = this.data.clickType.replace(/\d/g, '');
// 从云上将指定素材下载到本地临时文件
    wx.cloud.downloadFile({
//      fileID: imgsrc, // 文件 ID
      fileID: this.data.fileList[i],
      success: res => {
        console.log("cload download")
        console.log(res.tempFilePath)
        var tempPath = res.tempFilePath;
        this.setData({[type]:tempPath})
      },
      fail: console.error
    })
//    this.setData({ [type]: imgsrc })
//    console.log(this.data.facePic)
  },

  clickHair: function (e) {
    var imgsrc = e.target.dataset.imgsrc;
    this.setData({ hair: imgsrc })
  },
  clickCrown: function (e) {
    var imgsrc = e.target.dataset.imgsrc;
    var type = this.data.clickType.replace(/\d/g, '');
    console.log(type);
    this.setData({crown: imgsrc})
  },
  generatePic: function (event) {
    wx.showLoading({
      title: '努力生成ing',
    })
    let that = this;
    var postersize = this.setCanvasSize(750);//动态设置画布大小
    var sWidth = postersize.w > postersize.h ? postersize.h : postersize.w;
    console.log(sWidth);
    let { pixelRatio } = wx.getSystemInfoSync()
    //var pixelRatio = 1;
    console.log(pixelRatio)
    const ctx = wx.createCanvasContext('shareCanvas');
    ctx.draw()
    //        ctx.drawImage(this.data.background, 0, 0, postersize.w, postersize.h);
    console.log(that.data.picWith)
    var outSizew = that.data.picWith;
    var outSizeh = that.data.picWith;

    var inSizew = 230;
    var inSizeh = 230;
//    ctx.drawImage(this.data.people, 0, 0, outSizew * pixelRatio, outSizeh * pixelRatio, 0, 0, inSizew * pixelRatio, inSizeh * pixelRatio);
    //    ctx.drawImage(this.data.people, 0, 0, outSizew, outSizeh );
    ctx.drawImage(this.data.background, 0, 0, outSizew * pixelRatio, outSizeh * pixelRatio, 0, 0, inSizew * pixelRatio, inSizeh * pixelRatio);
    ctx.drawImage(this.data.body, 0, 0, outSizew * pixelRatio, outSizeh * pixelRatio, 0, 0, inSizew * pixelRatio, inSizeh * pixelRatio);
    ctx.drawImage(this.data.cloth, 0, 0, outSizew * pixelRatio, outSizeh * pixelRatio, 0, 0, inSizew * pixelRatio, inSizeh * pixelRatio);
    ctx.drawImage(this.data.head, 0, 0, outSizew * pixelRatio, outSizeh * pixelRatio, 0, 0, inSizew * pixelRatio, inSizeh * pixelRatio);
    ctx.drawImage(this.data.bianzi, 0, 0, outSizew * pixelRatio, outSizeh * pixelRatio, 0, 0, inSizew * pixelRatio, inSizeh * pixelRatio);
    ctx.drawImage(this.data.shoulder, 0, 0, outSizew * pixelRatio, outSizeh * pixelRatio, 0, 0, inSizew * pixelRatio, inSizeh * pixelRatio);
    ctx.drawImage(this.data.facePic, 0, 0, outSizew * pixelRatio, outSizeh * pixelRatio, 0, 0, inSizew * pixelRatio, inSizeh * pixelRatio);
    ctx.drawImage(this.data.face, 0, 0, outSizew * pixelRatio, outSizeh * pixelRatio, 0, 0, inSizew * pixelRatio, inSizeh * pixelRatio);
    ctx.drawImage(this.data.hair, 0, 0, outSizew * pixelRatio, outSizeh * pixelRatio, 0, 0, inSizew * pixelRatio, inSizeh * pixelRatio);
    ctx.drawImage(this.data.crown, 0, 0, outSizew * pixelRatio, outSizeh * pixelRatio, 0, 0, inSizew * pixelRatio, inSizeh * pixelRatio);
    ctx.drawImage(this.data.lefthand, 0, 0, outSizew * pixelRatio, outSizeh * pixelRatio, 0, 0, inSizew * pixelRatio, inSizeh * pixelRatio);
    ctx.drawImage(this.data.mainhand, 0, 0, outSizew * pixelRatio, outSizeh * pixelRatio, 0, 0, inSizew * pixelRatio, inSizeh * pixelRatio);
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
    ctx.draw(false);
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
        destWidth: inSizew * pixelRatio,
        destHeight: inSizeh * pixelRatio,
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
        },
        complete: () => {
          wx.hideLoading()
        }
      }, this);
    }, 5000);

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
      console.log(size.w + "  " + size.h);
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
  },

  cloud: function (event) {
    wx.cloud.getTempFileURL({
      fileList: ['cloud://wow-fifths.776f-wow-fifths-1300924140/my-image.png'],
      success: res => {
        var urlList = res.fileList
        console.log(urlList[0].tempFileURL)
        this.setData({cloudPic: urlList[0].tempFileURL})
        var gener_index = this.data.cloudButton
        this.removeOption()
        if (gener_index === true) {
          this.setData({ cloudButton: false })
        }
        else {
          this.setData({ cloudButton: true })
        }
      },
      fail: console.error
          })
  },

})
