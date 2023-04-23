import {getCurrentUser} from "../services/user-service"
class userStore {
  userInfo
  constructor(userInfo) {
    this.userInfo = userInfo
  }

  setUserInfo(userInfo) {
    this.userInfo = userInfo
  }
  getUserInfo() {
    return this.userInfo
  }
  async CurrentUser() {
    const res = await getCurrentUser()
    this.setUserInfo(res.data)
    return res
  }
}
export default new userStore({})
