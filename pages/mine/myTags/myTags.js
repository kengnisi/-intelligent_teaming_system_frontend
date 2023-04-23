// pages/mine/myTags/myTags.js
import userStore  from "../../../store/userInfoStore"
import {getTagList} from "../../../services/tags-service"
import Toast from '@vant/weapp/toast/toast';
import {changeParTags} from "../../../services/user-service"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    tagList: [],
    newTagList: [],
    tagIdList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("mytags")
    this.setData({
      userInfo: userStore.getUserInfo()
    })
    this.setData({
      newTagList: JSON.parse(JSON.stringify(this.data.userInfo.tags))
    })
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
  //选择标签
  changed(option) {
    const {tagname} = option.target.dataset
    const {newTagList} = this.data
    const isHaving = newTagList.indexOf(tagname)
    if(isHaving != -1) {
      newTagList.splice(isHaving, 1)
    }else {
      if(newTagList.length >= 5) {
        Toast('最多选择5个标签');
        return
      } 
      newTagList.push(tagname)
    }
    this.setData({
      newTagList,
    })
  },
  // 确认选择
  async confirm() {
    const res = await changeParTags({tagsList: this.data.newTagList})
    if(res.code != 200) {
      Toast('修改失败');
      return
    }
    await userStore.CurrentUser()
    wx.switchTab({
      url: '/pages/mine/mine',
    })
  }
})