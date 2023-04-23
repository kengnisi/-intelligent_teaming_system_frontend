// components/userItem/userItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // userInfo: {
    //   id: 10,
    //   username: "马六",
    //   openId: "c3504ca7658a8f7f6121ad7a72811721",
    //   avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
    //   createTime: "2023-02-20T04:26:44.000Z",
    //   email: null,
    //   gender: null,
    //   id: 10,
    //   openId: "c3504ca7658a8f7f6121ad7a72811721",
    //   phone: null,
    //   profile: "找工作好难",
    //   tags: ["求职"],
    //   userRole: 0,
    //   userStatus: 0,
    //   username: "马六"
    // }
  },
  properties: {
    userInfo: {
      type: Object,
      value: {}
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toexchange(e) {
      const {userId} = e.mark
      wx.navigateTo({
        url: `/pages/userExchange/userExchange?userId=${userId}`,
      })
    },
    toUserDetail(e) {
      const {userId} = e.mark
      wx.navigateTo({
        url: `/pages/userDetail/userDetail?userId=${userId}`,
      })
    }
  }
})
