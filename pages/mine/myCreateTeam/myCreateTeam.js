// pages/mine/myCreateTeam/myCreateTeam.js
import {getMyCreateTeam} from "../../../services/team-service"
import userStore from "../../../store/userInfoStore"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myCreateTeamList: [],
    userInfo: {}
  },
  onLoad() {
    this.reqMyCreateTeam()
    this.setData({
      userInfo: userStore.getUserInfo()
    })
  },
  async reqMyCreateTeam() {
    const res = await getMyCreateTeam()
    await userStore.CurrentUser()
    this.setData({
      userInfo: userStore.getUserInfo()
    })
    this.setData({
      myCreateTeamList: res.data
    })
  }
})