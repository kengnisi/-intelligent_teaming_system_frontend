// pages/searchResultPage/searchResultPage.js
import {searchUserBytags} from "../../services/user-service"
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchUser: [],
    page: 1,
    limit: 10,
    totalPage: 0,
    total: 0,
    // 搜索标签列表
    tagsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      tagsList: options.tags.split(",")
    })
    this.getUserList()
  },
  onReachBottom: async function() {
    console.log("上拉加载")
    await this.getUserList()
  },
  async getUserList() {
    const {page, limit, tagsList} = this.data
    if(page > this.data.totalPage && this.data.totalPage != 0 ) {
      Toast('没有更多了~');
      return
    }
    const res = await searchUserBytags(tagsList, page, limit)
    const {data, total, totalPage} = res.data
    this.setData({
      searchUser: [...this.data.searchUser, ...data],
      page: this.data.page + 1,
      total,
      totalPage
    })
  }
})