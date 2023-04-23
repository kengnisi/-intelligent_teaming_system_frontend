// pages/addTeam/addTeam.js
import Toast from '@vant/weapp/toast/toast';
import {getTeamById, updateTeam} from "../../services/team-service"
import isJson from "../../utils/isJson"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamId: 0,
    currentTeam: {},
    // 展示时间选项
    showPicker: false,
    selectTime: new Date().getTime(),
    minHour: 0,
    maxHour: 23,
    minDate: new Date().getTime(),
  },
  onLoad(event) {
    this.setData({
      teamId: event.teamId
    })
    this.reqTeamInfo()
  },
  async reqTeamInfo() {
    const res = await getTeamById(this.data.teamId)
    this.setData({
      currentTeam: res.data[0],
      selectTime: new Date(res.data[0].expireTime).getTime()
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  isShowSelectTime() {
    this.setData({
      showPicker: true
    })
  },
  // 选择时间确认按钮
  onConfirm(event){
    const time = event.detail
    this.setData({
      showPicker: false,
      selectTime: time,
      ['currentTeam.expireTime']: JSON.stringify(new Date(time))
    })
  },
  cancelTime() {
    this.setData({
      showPicker: false
    })
  },
  changeTeamInfo(event) {
    const type = event.target.dataset.type
    const value = event.detail
    this.setData({
      [`currentTeam.${type}`]: value
    })
  },
  async submit() {
    const {id, name, description, maxNum, status, password, expireTime, selectTime } = this.data.currentTeam
    if(name.length == 0 || name.length > 20) {
      Toast("队伍名不能为空或超过20字");
      return
    }
    if(description.length > 512) {
      Toast("队伍描述过长");
      return
    }
    if(maxNum < 2 || maxNum > 20) {
      Toast("队伍人数应该2~20");
      return
    }
    if([0, 1, 2].includes(status+'')) {
      Toast("队伍类型错误");
      return
    }
    if(status == "2") {
      if(!password || password.length < 4|| password.length > 15) {
        Toast("密码长度weight4~15");
        return
      }
    }
    if(selectTime <= new Date().getTime()) {
      Toast("过期时间不符合规定")
      return
    }
    console.log(isJson(expireTime))
    const resData = {
      id,
      name,
      description,
      maxNum,
      status: Number(status),
      expireTime: isJson(expireTime)? JSON.parse(expireTime) : expireTime,
    }
    if(status == 2) {
    resData["password"] = password
    }
    console.log(resData)
    const res = await updateTeam(resData)
    console.log(res)
    if(res.code = 200) {
      wx.switchTab({
        url: '/pages/team/team',
      })
    }
  }
})