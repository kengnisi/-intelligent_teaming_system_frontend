// pages/group/group.js
// {
//   {
//     userId: 13,
//     avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
//     name: "甲",
//     message: "我来发条信息"
//   },
//   {
//     userId: 13,
//     avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
//     name: "甲",
//     message: "我来发条信息我来发条信息我来发条信息我来发条信息我来发条信息我来发条信息我来发条信息我来发条信息我来发条信息我来发条信息我来发条信息"
//   },
//   {
//     userId: 13,
//     avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
//     name: "甲",
//     message: "我来发条信息"
//   },
//   {
//     userId: 13,
//     avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
//     name: "甲",
//     message: "我来发条信息"
//   },
//   {
//     userId: 26,
//     avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
//     name: "已",
//     message: "我来发条信息"
//   },
// }
import userStore from "../../store/userInfoStore"
import {
  getTeamMessage
} from '../../services/message-service'
import {
  getTeamById
} from "../../services/team-service"
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
    userInfo: {
      userId: 26
    },
    chatList: [],
    contentHeight: '',
    message: "",
    socketTask: null,
    scrollTo: "",
    teamId: 0,
    teamInfo: {},
    socketTask: null,
    currentIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 设置消息内容展示高度
    this.setData({
      contentHeight: app.globalData.contentHeight,
      teamId: options.teamId,
      socketTask: app.globalData.socket
    })
    // 获取队伍聊天记录
    this.reqTeamMessage()
    this.reqTeamInfo()
    // 获取用户信息
    this.setData({
      userInfo: userStore.getUserInfo()
    })
    var socketOpen = false
    // 建立websocket链接
    // var wsApi = `ws://127.0.0.1:8000/?userId=${this.data.userInfo.id+""}`;
    // this.data.socketTask = wx.connectSocket({
    //   url: wsApi,
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   //method:"GET",
    //   protocols: ['protocol1'],
    //   success: function () {
    //     console.log("客户端连接成功！");
    //     wx.onSocketOpen(function () {
    //       console.log('webSocket已打开！');
    //       socketOpen = true;

    //     })
    //   }
    // })
    console.log("socket", this.data.socketTask)
    this.data.socketTask.onMessage((msg) => {
      console.log("msg", msg)
      const {
        chatList
      } = this.data
      const message = JSON.parse(msg.data)
      if (!message.userId) {
        return
      }
      this.setData({
        chatList: [...chatList, message]
      })
    })
  },

  // 各种方法
  getValue(event) {
    this.setData({
      message: event.detail
    })
  },

  // 点击发送按钮
  publishChat() {
    const {
      socketTask,
      userInfo,
      teamId
    } = this.data
    socketTask.send({
      data: JSON.stringify({
        type: "group",
        message: {
          userId: userInfo.id,
          teamId: teamId,
          avatarUrl: userInfo.avatarUrl,
          name: userInfo.username,
          message: this.data.message
        },
        teamId: teamId,
      }),
      success: (res) => {
        this.setData({
          message: ""
        })
      }
    })
  },
  // 获取队伍聊天内容
  async reqTeamMessage() {
    const messageList = await getTeamMessage({
      teamId: this.data.teamId
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
  async reqTeamInfo() {
    const teamInfo = await getTeamById(this.data.teamId)
    console.log(teamInfo)
    this.setData({
      teamInfo: teamInfo.data.safeTeamList[0]
    })
  },
  debounceLoaded,
  onSwiperChange(event) {
    this.setData({
      currentIndex: event.detail.current
    })
  },
  onNavTabItemTap(event) {
    const index = event.target.dataset.index
    console.log(event)
    this.setData({ currentIndex: index })
  },
  // 返回
  back() {
    wx.switchTab({
      url: '/pages/message/message',
    })
  }
})