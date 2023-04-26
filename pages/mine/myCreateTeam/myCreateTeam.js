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
  onShow() {
    console.log("我所创建的队伍onshow")
    this.reqMyCreateTeam()
    this.setData({
      userInfo: userStore.getUserInfo()
    })
  },
  async reqMyCreateTeam() {
    const res = await getMyCreateTeam()
    console.log("我创建的队伍", res)
    await userStore.CurrentUser()
    this.setData({
      userInfo: userStore.getUserInfo()
    })
    this.setData({
      myCreateTeamList: res.data
    })
  },
  async renew() {
    this.setData({
      page: 1,
      teamList: []
    })
    await this.reqTeamList()
  },
})