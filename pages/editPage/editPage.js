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
    let {title, info, attr} = options
    info = info == 'null' ? '' : info
    this.setData({
      title,
      attr,
      info: info
    })
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },
  editInfoChange(e) {
    console.log(e)
    this.setData({
      info: e.detail
    })
  },
  async onsubmit(value) {
    console.log("修改信息", value)
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