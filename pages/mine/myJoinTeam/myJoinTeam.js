// pages/mine/myJoinTeam/myJoinTeam.js
import {getMyJoinTeam} from "../../../services/team-service"
import userStore from "../../../store/userInfoStore"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myJoinTeamList: [],
    userInfo: {}
  },
  onShow() {
    this.reqMyJoinTeam()
    this.setData({
      userInfo: userStore.getUserInfo()
    })
  },
  async reqMyJoinTeam() {
    const res = await getMyJoinTeam()
    console.log(res)
    await userStore.CurrentUser()
    this.setData({
      userInfo: userStore.getUserInfo()
    })
    this.setData({
      myJoinTeamList: res.data
    })
  },
  async renew() {
    await this.reqMyJoinTeam()
  },
})