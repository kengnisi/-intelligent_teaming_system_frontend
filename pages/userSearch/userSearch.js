// pages/mine/myTags/myTags.js
import {getTagList} from "../../services/tags-service"
import Toast from '@vant/weapp/toast/toast';
import {setSearchKeyStorage} from '../../utils/storageUtils'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    tagList: [],
    selectedTags: [],
    searchKey: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.reqTagList()
  },
  // 获取tag列表
  async reqTagList() {
    const res = await getTagList()
    const tagList = res.data.reduce((pre, cur) => {
      const item = {}
      if(cur.isParent == 1) {
        item.id = cur.id
        item.text = cur.tagName
        item.children = []
        pre[0].push(item)
      } else {
        item.parentId = cur.parentId
        item.id = cur.id
        item.text = cur.tagName
        pre[1].push(item)
      }
      return pre
    }, [[], []])
    tagList[1].forEach(element => {
      tagList[0].forEach(parTag => {
        if(parTag.id == element.parentId) {
          parTag.children.push(element)
          return
        }
      });
    });
    this.setData({
      tagList: tagList[0],
    })
  },
  change(e) {
    this.setData({
      searchKey: e.detail,
    });
    console.log("搜索框变化", this.data.searchContent)
  },
  //选择标签
  changed(option) {
    const {tagname} = option.target.dataset
    const {selectedTags} = this.data
    const isHaving = selectedTags.indexOf(tagname)
    if(isHaving != -1) {
      selectedTags.splice(isHaving, 1)
    }else {
      if(selectedTags.length >= 5) {
        Toast('最多选择5个标签');
        return
      } 
      selectedTags.push(tagname)
    }
    this.setData({
      selectedTags,
    })
  },
  // 确认选择
  async confirm() {
    const { selectedTags, searchKey } = this.data
    setSearchKeyStorage(selectedTags)
    if(searchKey == "") {
      wx.navigateTo({
        url: `/pages/searchResultPage/searchResultPage?tags=${selectedTags}`,
      })
      return
    }else {
      wx.navigateTo({
        url: `/pages/searchResultPage/searchResultPage?key=${searchKey}`,
      })
    }
    
  }
})