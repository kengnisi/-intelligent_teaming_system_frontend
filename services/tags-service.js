import {
  Hrequest
} from './index'

const URL = {
  TAGSLIST: "tags/list"
}

/**
 * 获取队伍信息内容
 * @param {team: number} data 
 */
function getTagList() {
  return Hrequest.get({
    url: URL.TAGSLIST
  })
}

export {
  getTagList
}