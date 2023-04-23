// pages/mine/myCreateTeam/myCreateTeam.js
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
  onLoad() {
    this.reqMyCreateTeam()
    this.setData({
      userInfo: userStore.getUserInfo()
    })
  },
  async reqMyCreateTeam() {
    const res = await getMyJoinTeam()
    console.log(res)
    await userStore.CurrentUser()
    this.setData({
      userInfo: userStore.getUserInfo()
    })
    this.setData({
      myJoinTeamList: res.data
    })
  }
})