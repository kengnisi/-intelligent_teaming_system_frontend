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
  },
  upAvatar() {
    wx.chooseImage({
      success (res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        // wx.uploadFile({
        //   url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {
        //     'user': 'test'
        //   },
        //   success (res){
        //     const data = res.data
        //     //do something
        //   }
        // })
      }
    })
  }
})