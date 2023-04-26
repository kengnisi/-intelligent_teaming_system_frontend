// pages/testUserShow/testUserShow.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {getAllPerMessage} from '../../services/message-service'
import {store} from '../../store/store'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAllPerMessage()
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['perAllMsgList'],
      actions: ['reqPerAllMsgList']
    })
    this.reqPerAllMsgList()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
  btnHandler(e){
    this.updateNum1(e.target.dataset.step);
  },
  // 获取聊天记录
  async getAllPerMessage() {
    
  }
})