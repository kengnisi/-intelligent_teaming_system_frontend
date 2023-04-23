// pages/mine/mine.js
import userStore from "../../store/userInfoStore"
Page({
  data: {
    // 底部确认登陆弹出框
    loginShow: false,
    userInfo: {}
  },
  onShow() {
    if(JSON.stringify(userStore.getUserInfo()) == "{}") {
      this.currenTState()
      return
    }
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
    this.setData({
      userInfo: userStore.getUserInfo()
    })
  },
})