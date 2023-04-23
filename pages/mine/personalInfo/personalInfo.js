// pages/mine/personalInfo.js
import { getCurrentUser } from "../../../services/user-service"
import userStore from "../../../store/userInfoStore"
Page({
  data: {
    userInfo: userStore.getUserInfo()
  },
  // 获取用户信息
  onShow() {
    if(JSON.stringify(userStore.getUserInfo) == "{}") {
      this.currenTState()
    }
    this.setData({
      userInfo: userStore.getUserInfo()
    })
  },
  async currenTState() {
    await userStore.CurrentUser()
    this.setData({
      userInfo: userStore.getUserInfo()
    })
  },
  toEdit(event) {
    console.log(event.currentTarget.dataset)
    const {title, info, attr} = event.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/editPage/editPage?title=${title}&info=${info}&attr=${attr}`,
    })
  }
})