// app.js
import {
  userLogin
} from './services/user-service'
import userStore from "./store/userInfoStore"
App({
  globalData: {
    screenWidth: 375,
    screenHeight: 667,
    statusHeight: 20,
    contentHeight: 500,
    socket: null
  },
  onLaunch() {
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.screenWidth = result.screenWidth
        this.globalData.screenHeight = result.screenHeight
        this.globalData.statusHeight = result.statusBarHeight
        this.globalData.contentHeight = result.screenHeight - result.statusBarHeight - 44 - 50 - 44
      },
    })
    this.geuCurrentUser()
  },
  globalData: {
    userInfo: null
  },
  async geuCurrentUser() {
    const res = await userStore.CurrentUser()
    console.log("当前用户信息",res)
    if(res.code == 200) {
      this.initSocket()
    }
  },
  initSocket() {
    const userInfo = userStore.getUserInfo()
    let socketOpen = false
    // 建立websocket链接
    var wsApi = `ws://127.0.0.1:8000/?userId=${userInfo.id+""}`;
    console.log(this.globalData)
    this.globalData.socket = wx.connectSocket({
      url: wsApi,
      header: {
        'content-type': 'application/json'
      },
      //method:"GET",
      protocols: ['protocol1'],
      success: function () {
        console.log("客户端连接成功！");
        wx.onSocketOpen(function () {
          console.log('webSocket已打开！');
          socketOpen = true;
        })
      }
    })
  }
})