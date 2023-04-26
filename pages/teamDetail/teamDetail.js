// pages/teamDetail/teamDetail.js
import {getTeamById} from "../../services/team-service"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamId: 0,
    teamInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      teamId: options.teamId
    })
    this.reqTeamById()
  },
  async reqTeamById() {
    const res = await getTeamById(this.data.teamId)
    console.log(res)
    this.setData({
      teamInfo: res.data[0]
    })
  }
})