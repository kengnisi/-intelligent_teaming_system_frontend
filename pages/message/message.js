// pages/message/message.js
import {getMyJoinTeam} from "../../services/team-service"
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentHeight: 0,
    teamList: [],
    socketTask: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow(options) {
    this.setData({
      contentHeight: app.globalData.contentHeight,
      socketTask: app.globalData.socket
    })
    this.reqTeamList()
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['perAllMsgList', 'userInfoList'],
      actions: ['reqPerAllMsgList', 'addMessage', 'reqUserInfoList']
    })    
    this.reqPerAllMsgList()
    // this.reqUserInfoList()
    var socketOpen = false
    // console.log("socket", this.data.socketTask)
    this.data.socketTask.onMessage((msg) => {
      console.log("我在消息页面", msg)
      const {
        chatList
      } = this.data
      const message = JSON.parse(msg.data)
      if (!message.sendUserId) {
        return
      }
      this.addMessage(message)
    })
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
      teamList: teamList.data
    })
  },
  toexchange(e) {
    console.log('用户id',e.currentTarget.dataset )
    const {userid} = e.currentTarget.dataset
    console.log(userid)
    wx.navigateTo({
      url: `/pages/userExchange/userExchange?userId=${userid}`,
    })
  }
})