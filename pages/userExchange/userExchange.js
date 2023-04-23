// pages/userExchange/userExchange.js
import {getUserInfoById} from "../../services/user-service"
import {getPerMessage} from "../../services/message-service"
import userStore from "../../store/userInfoStore"
import debounce from "../../utils/debounce"
const debounceLoaded = debounce(function() {
  console.log("图片")
  this.setData({
    scrollTo: "scrollTo"
  })
}, 10)
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatList: [],
    contentHeight: '',
    message: "",
    socketTask: null,
    scrollTo: "",
    acceptUserInfo: {},
    acceptUserId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 设置消息内容展示高度
    this.setData({
      contentHeight: app.globalData.contentHeight,
      acceptUserId: options.userId,
      socketTask: app.globalData.socket
    })
    // 获取队伍聊天记录
    this.reqUserMessage()
    this.reqAcceptUser()
    // 获取用户信息
    this.setData({
      userInfo: userStore.getUserInfo()
    })
    var socketOpen = false
    console.log("socket", this.data.socketTask)
    this.data.socketTask.onMessage((msg) => {
      console.log("msg", msg)
      const {
        chatList
      } = this.data
      const message = JSON.parse(msg.data)
      if (!message.sendUserId) {
        return
      }
      this.setData({
        chatList: [...chatList, message]
      })
    })
  },
  // 点击发送按钮
  publishChat() {
    const {
      socketTask,
      userInfo,
      acceptUserInfo
    } = this.data
    socketTask.send({
      data: JSON.stringify({
        type: "personal",
        message: {
          sendUserId: userInfo.id,
          acceptUserId: acceptUserInfo.id,
          avatarUrl: userInfo.avatarUrl,
          name: userInfo.username,
          message: this.data.message
        }
      }),
      success: (res) => {
        this.setData({
          message: ""
        })
      }
    })
  },
  // 获取队伍聊天内容
  async reqUserMessage() {
    console.log("接受方id", this.data.acceptUserId)
    const messageList = await getPerMessage({
      acceptUserId: this.data.acceptUserId
    })
    console.log(messageList)
    const {
      chatList
    } = this.data
    this.setData({
      chatList: [...chatList, ...messageList.data]
    })
  },
  // 获取队伍信息
  async reqAcceptUser() {
    const acceptUserInfo = await getUserInfoById(this.data.acceptUserId)
    console.log(acceptUserInfo)
    this.setData({
      acceptUserInfo: acceptUserInfo.data
    })
  },
  debounceLoaded,
  // 各种方法
  getValue(event) {
    this.setData({
      message: event.detail
    })
  },
  // 返回
  back() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  }
})