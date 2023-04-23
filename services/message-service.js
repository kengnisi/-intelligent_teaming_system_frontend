import {
  Hrequest
} from './index'

const URL = {
  TEAMMESSAGE: "message/teamMessage",
  PERMESSAGE: "message/perMessage"
}

/**
 * 获取队伍信息内容
 * @param {team: number} data 
 */
function getTeamMessage(data) {
  return Hrequest.post({
    url: URL.TEAMMESSAGE,
    data
  })
}
function getPerMessage(data) {
  return Hrequest.post({
    url: URL.PERMESSAGE,
    data
  })
}

export {
  getTeamMessage,
  getPerMessage
}