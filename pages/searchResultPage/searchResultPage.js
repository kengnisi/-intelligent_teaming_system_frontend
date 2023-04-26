// pages/searchResultPage/searchResultPage.js
import {searchUserBytags, searchUserByKey} from "../../services/user-service"
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchUser: [],
    page: 1,
    limit: 4,
    totalPage: 0,
    total: 0,
    // 搜索标签列表
    tagsList: [],
    searchKey: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.key)
    console.log(options.tags)
    if(options.key == undefined) {
      this.setData({
        tagsList: options.tags.split(",")
      })
      this.getUserList()
      return
    }
    this.setData({
      searchKey: options.key
    })
    this.reqUserSearchKey()
  },
  onReachBottom: async function() {
    console.log("上拉加载")
    await !this.data.searchKey ? this.getUserList() : this.reqUserSearchKey()
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
  },
  async reqUserSearchKey() {
    const {page, limit, searchKey} = this.data
    if(page > this.data.totalPage && this.data.totalPage != 0 ) {
      Toast('没有更多了~');
      return
    }
    const res = await searchUserByKey(searchKey, page, limit)
    console.log(res)
    const {data, total, totalPage} = res.data
    this.setData({
      searchUser: [...this.data.searchUser, ...data],
      page: this.data.page + 1,
      total,
      totalPage
    })
  }
})