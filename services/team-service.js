import {
  Hrequest
} from './index'
const URL = {
  // 创建队伍
  ADDTEAM: "team/add",
  // 更新队伍信息
  UPDATETEAM: "team/update",
  // 根据id获取队伍
  TEAMBYID: "team/getTeam",
  // 搜索队伍
  SEARCHTEAM: "team/search",
  // 获取队伍列表
  TEAMLIST: "team/list/page",
  // 加入队伍
  JOINTEAM: "team/join",
  // 退出队伍
  QUITTEAM: "team/quit",
  // 我创建的队伍
  MYCREATETEAM: "team/my/create",
  // 我加入的队伍
  MYJOINTEAM: "team/my/join",
  // 解散队伍
  DELETETEAM: "team/delete",
  // 获取推荐队伍
  TEAMMATCH: "team/list/match"
}
/**
 * 创建队伍参数
 * userId?: number;（宣传）
    name: string;
    description: string;
    password?: string;（宣传）
    maxNum: number;
    status: number;
    expireTime: Date;
 */
function addTeam(data) {
  return Hrequest.post({
    url: URL.ADDTEAM,
    data
  })
}

/**
 * 
 * 参数
 *id: number
  name: string
  description: string
  password?: string
  maxNum: number
  status: number
  expireTime: Date
 */
function updateTeam(data) {
  return Hrequest.post({
    url: URL.UPDATETEAM,
    data
  })
}

function getTeamById(teamId) {
  return Hrequest.get({
    url: URL.TEAMBYID,
    data: {
      teamId
    }
  })
}

function getTeamList(page, limit) {
  return Hrequest.get({
    url: URL.TEAMLIST,
    data: {
      page,
      limit
    }
  })
}
/**
 * 参数
 * teamId?: number
  userId?: number
  name?: string
  description?: string
  searchText?: string
  maxNum?: number
  status?: teamStatusEnum 
 */
function searchTeam(data) {
  console.log(data)
  return Hrequest.post({
    url: URL.SEARCHTEAM,
    data
  })
}

/**
 * teamId: number,
  password?: string
 */
function joinTeam(data) {
  return Hrequest.post({
    url: URL.JOINTEAM,
    data
  })
}

function quitTeam(teamId) {
  return Hrequest.post({
    url: URL.QUITTEAM,
    data: {
      teamId
    }
  })
}

function deleteTeam(teamId) {
  return Hrequest.post({
    url: URL.DELETETEAM,
    data: {
      teamId
    }
  })
}

function getMyCreateTeam() {
  return Hrequest.post({
    url: URL.MYCREATETEAM
  })
}

function getMyJoinTeam() {
  return Hrequest.post({
    url: URL.MYJOINTEAM
  })
}
function getTeamMatch(searchKey, page, limit) {
  return Hrequest.get({
    url: URL.TEAMMATCH,
    data: {
      searchKey,
      page,
      limit
    }
  })
}

export {
  addTeam,
  updateTeam,
  deleteTeam,
  searchTeam,
  getTeamById,
  getTeamList,
  getMyCreateTeam,
  getMyJoinTeam,
  quitTeam,
  joinTeam,
  getTeamMatch
}