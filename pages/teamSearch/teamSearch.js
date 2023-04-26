// pages/teamSearch/teamSearch.js
import {getSearchKeyStorage} from "../../utils/storageUtils"
import {searchTeam} from "../../services/team-service"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchContent: "",
    searchKey: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const searchKey = getSearchKeyStorage('searchKey') ? JSON.parse(getSearchKeyStorage('searchKey')) : []
    let keySet = new Set()
    searchKey.forEach(item => {
      keySet.add(item)
    })
    this.setData({
      searchKey: Array.from(keySet)
    })
  },
  change(e) {
    this.setData({
      searchContent: e.detail,
    });
    console.log("搜索框变化", this.data.searchContent)
  },
  async onClick() {
    const {searchContent} = this.data
    
    wx.navigateTo({
      url: `/pages/searchTeamResPage/searchTeamResPage?searchText=${searchContent}`,
    })
  },
  changeTag(e) {
    console.log("选择标签", e.target.dataset.tag)
    const {tag} = e.target.dataset
    wx.navigateTo({
      url: `/pages/searchTeamResPage/searchTeamResPage?searchText=${tag}`,
    })
  }
})