import { get, set, observable, action} from "mobx-miniprogram"
import {getAllPerMessage} from "../services/message-service"
import {getUserInfoById} from "../services/user-service"
export const store = observable.object({
  // 需要挂载的数据 -- 数据字段
  perAllMsgList: {},
  userInfoList: {},
  // actions 函数，专门来修改 store 中数据的值
  reqPerAllMsgList: action(async function(){
    const {data} = await getAllPerMessage()
    this.perAllMsgList = data.msgList
    console.log(this.perAllMsgList)
    const test = {}
    for (const key in this.perAllMsgList) {
      const {data} = await getUserInfoById(key)
      test[key] = data
    }
    this.userInfoList = test
    // await this.reqUserInfoList()
  }),
  reqUserInfoList: action(async function(){
    for (let key in this.perAllMsgList) {
      const {data} = await getUserInfoById(key)
      this.userInfoList = data
    }
  }),
  addMessage: action(function(message) {
    for (const key in this.perAllMsgList) {
      if(message.sendUserId == key || message.acceptUserId == key) {
        this.perAllMsgList[key].push(message)
      }
    }
  })
})