// pages/searchTeamResPage/searchTeamResPage.js
import {searchTeam, joinTeam} from "../../services/team-service"
import userStore from "../../store/userInfoStore"
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchContent: "",
    teamList: [],
    userInfo: {},
    show: false,
    password: "asas",
    // 显示输入密码框
    status: -1,
    joinTeamId: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userInfo: userStore.getUserInfo(),
      searchContent: options.searchText
    })
    this.getTeamList()
  },
  async getTeamList() {
    const res = await searchTeam({searchText: this.data.searchContent})
    console.log(res)
    this.setData({
      teamList: res.data.teamList
    })
  },
  onChange(event) {
    console.log(event.detail.name)
    this.setData({
      teamList: [],
      page: 1,
      totalPage: 0
    })
    this.data.active = event.detail.name
    this.getTeamList()
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
      await this.getTeamList()
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
      teamList: []
    })
    await this.getTeamList()
  },
})