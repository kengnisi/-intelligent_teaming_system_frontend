// pages/addTeam/addTeam.js
import Toast from '@vant/weapp/toast/toast';
import {addTeam} from "../../services/team-service"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 队伍名
    teamName: "",
    // 队伍描述
    description: "",
    // 队伍人数
    maxNum: 2,
    // 队伍类型
    status: "0",
    // 队伍密码
    password: "",
    // 展示时间选项
    showPicker: false,
    selectTime: new Date().getTime(),
    minHour: 0,
    maxHour: 23,
    minDate: new Date().getTime(),
    expireTime: JSON.stringify(new Date()),
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
  changeTeamInfo(event) {
    const type = event.target.dataset.type
    const value = event.detail
    this.setData({
      [type]: value
    })
  },
  async submit() {
    const {teamName, description, maxNum, status, password, expireTime, selectTime } = this.data
    if(teamName.length == 0 || teamName.length > 20) {
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
    if([0, 1, 2].includes(status)) {
      Toast("队伍类型错误");
      return
    }
    if(status == 2) {
      if(password.length < 4|| password.length > 15) {
        Toast("密码长度weight4~15");
        return
      }
    }
    if(selectTime <= new Date().getTime()) {
      Toast("过期时间不符合规定")
      return
    }
    const resData = {
      name: teamName,
      description,
      maxNum,
      status: Number(status),
      expireTime: JSON.parse(expireTime),
    }
    if(status == 2) {
      resData["password"] = password
    }
    const res = await addTeam(resData)
    console.log(res)
  }
})