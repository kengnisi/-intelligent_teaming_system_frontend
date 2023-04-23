// pages/editPage/editPage.js
import {updataUser} from "../../services/user-service"
import userStore from "../../store/userInfoStore"
Page({

  data: {
    title: '',
    info: '',
    attr: ''
  },

  onLoad(options) {
    console.log(options)
    this.setData({
      ...options
    })
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },
  async onsubmit(value) {
    const res = await updataUser({
      attrName: this.data.attr,
      value: this.data.info
    })
    if(res.code == 200) {
      await userStore.CurrentUser()
      wx.navigateBack()
    }
  }
})