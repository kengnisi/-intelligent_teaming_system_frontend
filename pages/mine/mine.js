// pages/mine/mine.js
import userStore from "../../store/userInfoStore"
import {
  userLogin
} from '../../services/user-service'
const app = getApp()
Page({
  data: {
    // 底部确认登陆弹出框
    loginShow: false,
    userInfo: {}
  },
  onShow() {
    // console.log(userStore.getUserInfo())
    if(JSON.stringify(userStore.getUserInfo()) == "[]") {
      console.log("未登录弹出框")
      this.setData({
        loginShow: true
      })
      return
    }
    console.log("mine页面", userStore.getUserInfo())
    this.setData({
      userInfo: userStore.getUserInfo()
    })
  },
  tologin() {
    this.setData({
      loginShow: true
    })
  },
  onClose() {
    this.setData({
      loginShow: false
    })
  },
  async currenTState() {
    const res = await userStore.CurrentUser()
    console.log("获取状态", res)
    this.setData({
      userInfo: userStore.getUserInfo()
    })
  },
  // 微信快速登陆按钮
  loginBtn() {
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        const {userInfo} = res
        const {avatarUrl, nickName} = userInfo
        console.log(avatarUrl)
        console.log(nickName)
        wx.login({
          success: async (res) => {
            console.log(res)
            if (res.code) {
              await userLogin(res.code, avatarUrl, nickName)
              await this.geuCurrentUser()
              this.setData({
                userInfo: userStore.getUserInfo()
              })
            }
          },
          fail(err) {
            console.log(err)
          }
        })
        this.setData({
          userInfo: res.userInfo,
          loginShow: false
        })
      }
    })
  },
  async geuCurrentUser() {
    const res = await userStore.CurrentUser()
    console.log("mine当前用户信息",res)
    if(res.data != null) {
      this.initSocket()
    }
    if(res.code != 200) {
      await this.login()
    }
  },
  initSocket() {
    const userInfo = userStore.getUserInfo()
    let socketOpen = false
    // 建立websocket链接
    var wsApi = `ws://127.0.0.1:8000/?userId=${userInfo.id+""}`;
    app.globalData.socket = wx.connectSocket({
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
