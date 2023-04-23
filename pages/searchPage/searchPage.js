// pages/searchPage/searchPage.js
import {setSearchKeyStorage} from '../../utils/storageUtils'
import {getTagList} from "../../services/tags-service"
Page({

  data: {
    value: '',
    show: {
      primary: true,
      success: true,
    },
    mainActiveIndex: 0,
    activeId: [],
    max: 3,
    selectedTags: [],
    originalTagsList: [
      {
        text: "生活",
        children: [
          {
            text: '拼车',
            id: '拼车'
          },          
          {
            text: '合租',
            id: '合租'
          },          
          {
            text: '出游',
            id: '出游'
          }
        ]
      },
      {
        text: "学习",
        children: [
          {
            text: '考证',
            id: '考证'
          },          
          {
            text: '期末复习',
            id: '期末复习'
          },          
          {
            text: '考公',
            id: '考公'
          }
        ]
      }
    ],
    showTagsList: [
      {
        text: "生活",
        children: [
          {
            text: '拼车',
            id: '拼车'
          },          
          {
            text: '合租',
            id: '合租'
          },          
          {
            text: '出游',
            id: '出游'
          }
        ]
      },
      {
        text: "学习",
        children: [
          {
            text: '考证',
            id: '考证'
          },          
          {
            text: '期末复习',
            id: '期末复习'
          },          
          {
            text: '考公',
            id: '考公'
          }
        ]
      }
    ]
  },
  onLoad() {
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
      originalTagsList: tagList[0],
      showTagsList: tagList[0]
    })
  },
  onSearch({ detail }) {
    const originalTagsList = JSON.parse(JSON.stringify(this.data.originalTagsList))
    const searchRes = originalTagsList.map((parent) => {
      parent.children = parent.children.filter((item) => {
        if (item.id == detail) {
          return true
        }
        return false
      })
      return parent
    })
    this.setData({
      showTagsList: searchRes
    })

  },
  onCancel() {
    this.setData({
      value: '',
      showTagsList: this.data.originalTagsList
    })
  },
  // 关闭标签数据
  onClose(event) {
    const index = event.currentTarget.id
    const { selectedTags, activeId } = this.data
    selectedTags.splice(index, 1)
    activeId.splice(index, 1)
    this.setData({
      selectedTags,
      activeId
    })
  },

  // 点击右侧栏事件
  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },

  // 点击左侧事件
  onClickItem({ detail = {} }) {
    const { activeId, selectedTags } = this.data;
    const index = activeId.indexOf(detail.id);
    if (index > -1) {
      activeId.splice(index, 1);
      selectedTags.splice(index, 1)
      
    } else {
      activeId.push(detail.id);
      selectedTags.push(detail)
    }

    this.setData({ activeId, selectedTags });
  },
  // 点击确认搜索
  toSearchRes() {
    const { selectedTags } = this.data
    const searchTags = selectedTags.map(item => {
      return item.text
    })
    setSearchKeyStorage(searchTags)
    wx.navigateTo({
      url: `/pages/searchResultPage/searchResultPage?tags=${searchTags}`,
    })
  }
})