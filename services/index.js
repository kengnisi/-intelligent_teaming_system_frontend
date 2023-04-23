import { getSession } from "../utils/getSession"
class HLYrequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  request(option) {
    const {
      url
    } = option
    return new Promise((resolve, reject) => {
      // removePendingRequest(option);
      wx.request({
        ...option,
        url: `${this.baseUrl}${url}`,
        header: {
          'content-type': 'application/json',
          'Cookie': wx.getStorageSync("USER_LOGIN_STATE") //读取cookie
        },
        success: (res) => {
          if (res.header["Set-Cookie"]) {
            const session = getSession(res.header["Set-Cookie"])
            wx.setStorageSync('USER_LOGIN_STATE', session)
          }
          resolve(res.data)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
  get(option) {
    return this.request({
      ...option,
      method: "GET"
    })
  }
  post(option) {
    return this.request({
      ...option,
      method: "POST"
    })
  }
}

export const Hrequest = new HLYrequest("http://127.0.0.1:8000/")