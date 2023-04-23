import userStore from "../store/userInfoStore"

const loginHook = Behavior({
  data: {
    test: 1
  },
  created: function() {
    console.log("loginHook")
  },
  show() {
    console.log("随便吧")
  },
  methods: {
    async geuCurrentUser() {
      const res = await userStore.CurrentUser()
      console.log(res)
      if(res.code != 200) {
        await this.login()
      }
    },
    login() {
      wx.login({
        success: async (res) => {
          console.log(res)
          if (res.code) {
            await userLogin(res.code)
            await userStore.CurrentUser()
          }
        }
      })
    }
  }
})

export default loginHook