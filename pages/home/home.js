// pages/home/home.js
import { getRecommendUsers, getMatchUsers} from '../../services/user-service'
import {getSearchKeyStorage} from "../../utils/storageUtils"
import loginHook from "../../hooks/loginHook"
import Toast from '@vant/weapp/toast/toast';

const app = getApp()
Page({
  behaviors: [loginHook],
  data: {
    active: 0,
    recommendList: [],
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 0
  },
  onLoad() {
    this.getRecommendUserList()
    this.setData({
      contentHeight: app.globalData.contentHeight - 54
    })
    this.geuCurrentUser()
  },
  // 监听下来刷新
  onPullDownRefresh: async function() {
    console.log("下拉刷新")
    this.setData({
      page: 1,
      recommendList: []
    })
    await this.getRecommendUserList()
    wx.stopPullDownRefresh()
  },
  // 监听上拉加载更多
  async bindscrolltolower() {
    console.log("上拉加载更多")
    await this.getRecommendUserList()
  },
  toSearchPage() {
    wx.navigateTo({
      url: '/pages/userSearch/userSearch',
    })
  },
  async getRecommendUserList() {
    const {page, limit} = this.data
    if(page > this.data.totalPage && this.data.totalPage != 0 ) {
      Toast('没有更多了~');
      return
    }
    // 搜索历史记录
    const searchKey = getSearchKeyStorage('searchKey') ? getSearchKeyStorage('searchKey') : []
    const res = await (this.data.active == 0 ? getRecommendUsers(page, limit) : getMatchUsers(searchKey, page, limit))
    console.log(res)
    const {data, total, totalPage} = res.data
    this.setData({
      recommendList: [...this.data.recommendList, ...data],
      page: this.data.page + 1,
      total,
      totalPage
    })
  },
  onChange(event) {
    console.log("改变")
    this.setData({
      recommendList: [],
      page: 1,
      totalPage: 0
    })
    this.data.active = event.detail.name
    this.getRecommendUserList()
  },
})