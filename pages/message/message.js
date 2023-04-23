// pages/message/message.js
import {getMyJoinTeam} from "../../services/team-service"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentHeight: 0,
    teamList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow(options) {
    this.setData({
      contentHeight: app.globalData.contentHeight
    })
    this.reqTeamList()
  },
  toChat(e) {
    const teamId = e.currentTarget.dataset.teamid
    console.log(e.currentTarget.dataset.teamid)
    wx.navigateTo({
      url: `/pages/chat/chat?teamId=${teamId}`,
    })
  },
  async reqTeamList() {
    const teamList = await getMyJoinTeam()
    console.log(teamList.data)
    this.setData({
      teamList: teamList.data.safeTeamList
    })
  }
})