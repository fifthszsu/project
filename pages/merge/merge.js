// pages/merge/merge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgSrc: '/img/10.png',
    imgSrc: '/img/9.png',
    img: '',
    imgUrl: "/img/10.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.downloadFile({
      url: '线上图片地址',
      success(res) {
        // 绘制背景海报到canvas
        var postersize = that.setCanvasSize(750);//动态设置画布大小
        const ctx = wx.createCanvasContext('shareCanvas')
        ctx.drawImage(that.data.imgUrl, 0, 0, postersize.w, postersize.h)

        var re = wx.getSystemInfoSync();
        var scale = 750 / 180;
        var width = re.windowWidth / scale;
        var height = width
        var leftscale = 750 / 480;
        var left = re.windowWidth / leftscale;
        var topscale = 750 / 880;
        var top = re.windowWidth / topscale;
        ctx.drawImage(that.data.imgSrc, left, top, width, height)
        ctx.draw()

        setTimeout(() => {
          // code_url = this.canvasToTempImage(); 
          //获取临时缓存合成照片路径，存入data中
          wx.canvasToTempFilePath({
            canvasId: 'shareCanvas',
            success: function (res) {
              var tempFilePath = res.tempFilePath;
              that.setData({
                img: tempFilePath
              })
              console.log(tempFilePath)
            },
            fail: function (res) {
              console.log(res);
            }
          });
        }, 1000);

      }
    })
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