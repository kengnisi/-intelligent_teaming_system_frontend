// pages/team/team.js
import {getTeamList, joinTeam, getTeamMatch, searchTeam} from "../../services/team-service"
import {getSearchKeyStorage} from "../../utils/storageUtils"
import userStore from "../../store/userInfoStore"
import Toast from '@vant/weapp/toast/toast';
import formatTime from "../../utils/formatTime"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    teamList: [],
    userInfo: {},
    show: false,
    password: "asas",
    joinTeamId: 0,
    // 显示输入密码框
    status: -1,
    contentHeight: 0,
    // 筛选显示框
    optionShow: false,
    maxNum: 20,
    // 队伍类型
    teamStatus: [
      {
        text: "公开",
        status: 0
      },
      {
        text: "加密",
        status: 2
      }
    ],
    // 队伍类型
    activeStatus: -1,
    // 展示时间选项
    startDate: 0,
    time: "09:01",
    date: "2017-09-01",
    // 页面数据
    page: 1,
    limit: 15,
    total: 0,
    totalPage: 0
  },
  onLoad() {
    this.setData({
      contentHeight: app.globalData.contentHeight - 54
    })
    const currentDate = formatTime(new Date()).split(" ")
    
    this.setData({
      userInfo: userStore.getUserInfo(),
      date: currentDate[0],
      time: currentDate[1],
      startDate: currentDate[0]
    })
    this.reqTeamList()
  },
  onShow(event) {

    // const currentDate = formatTime(new Date()).split(" ")
    
    // this.setData({
    //   userInfo: userStore.getUserInfo(),
    //   date: currentDate[0],
    //   time: currentDate[1],
    //   startDate: currentDate[0]
    // })
    // this.reqTeamList()
  },
  async reqTeamList() {
    console.log("获取队伍数据")
    const {page, limit} = this.data
    if(page > this.data.totalPage && this.data.totalPage != 0 ) {
      Toast('没有更多了~');
      return
    }
    // 搜索历史记录
    const searchKey = getSearchKeyStorage('searchKey') ? getSearchKeyStorage('searchKey') : []
    const res = await (this.data.active == 0 ? getTeamList(page, limit) : getTeamMatch(searchKey, page, limit))
    const {data, total, totalPage} = res.data
    console.log(res)
    this.setData({
      teamList: [...this.data.teamList, ...data],
      page: this.data.page + 1,
      total,
      totalPage
    })
  },
  // 推荐类型
  onChange(event) {
    console.log(event.detail.name)
    this.setData({
      teamList: [],
      page: 1,
      totalPage: 0
    })
    this.data.active = event.detail.name
    this.reqTeamList()
  },
  async addTeam(e){
    const {teamId, status} = e.detail
    this.teamItem = this.selectComponent(`#${teamId}`);
    console.log(this.teamItem)
    console.log(teamId, status)
    this.setData({
      joinTeamId: teamId,
      status: status
    })
    this.setData({
      show: true
    })
  },
  onClose() {
    console.log("取消")
    this.setData({ show: false, password: "" });
  },
  // 确实加入
  async confirm() {
    const joinInfo = {
      teamId: this.data.joinTeamId
    }
    if(this.data.status == 2) {
      joinInfo["password"] = this.data.password
    }
    this.setData({
      password: ''
    })
    const res = await joinTeam(joinInfo)
    if(res.code == 200) {
      this.setData({
        page: 1,
        teamList: []
      })
      await this.reqTeamList()
      Toast.success(res.description); 
      this.setData({ show: false });
      return
    }
    Toast.fail(res.description);
  },
  // 输入密码
  onChangePsw(e) {
    this.setData({
      password: e.detail
    })
  },
  async renew() {
    this.setData({
      page: 1,
      teamList: []
    })
    await this.reqTeamList()
  },
  toAddTeam() {
    wx.navigateTo({
      url: '/pages/addTeam/addTeam',
    })
  },
  openOption() {
    this.setData({
      optionShow: true
    })
  },
  // 筛选框关闭时间
  optionClose() {
    this.setData({
      optionShow: false
    })
  },
  //队伍人数选择
  numberChange(event) {
    this.setData({
      maxNum: event.detail
    });
  }, 
  // 时间选择器
  isShowSelectTime() {
    this.setData({
      showPicker: true
    })
  },
  onConfirm(event){
    const time = event.detail
    this.setData({
      showPicker: false,
      selectTime: time,
      expireTime: JSON.stringify(new Date(time))
    })
  },
  cancelTime() {
    this.setData({
      showPicker: false
    })
  },
  // 选择类型
  changeStatus(e) {
    this.setData({
      activeStatus: e.target.dataset.status
    })
  },
  // 确认按钮
  async finish() {
    const {activeStatus, maxNum, date, time} = this.data
    const searchOptine = {}
    if(activeStatus != -1) {
      searchOptine.status = activeStatus
    }
    const selectTime =new Date(date + " " + time).getTime()
    searchOptine.maxNum = maxNum
    searchOptine.expireTime = selectTime
    const res = await searchTeam(searchOptine)
    console.log(res)
    this.setData({
      active: 0,
      optionShow: false,
      teamList: res.data.teamList
    })
  },
  // 重置按钮
  reset() {
      this.setData({
        activeStatus: -1,
        maxNum: 20,
        selectTime: new Date().getTime(),
        expireTime: JSON.stringify(new Date()),
      })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // 监听下来刷新
  onPullDownRefresh: async function() {
    console.log("下拉刷新")
    this.setData({
      page: 1,
      teamList: []
    })
    await this.reqTeamList()
    wx.stopPullDownRefresh()
  },
  // 监听上拉加载更多
  async bindscrolltolower() {
    console.log("上拉加载更多")
    await this.reqTeamList()
  },
  toSearch() {
    wx.navigateTo({
      url: '/pages/teamSearch/teamSearch',
    })
  }
})