import {Hrequest} from './index'

export function userLogin(code) {
  return Hrequest.post({
    url: 'user/login',
    data: {
      code
    }
  })
}

export function getCurrentUser() {
  return Hrequest.get({
    url: 'user/current'
  })
}

export function getUserInfoById(id) {
  return Hrequest.get({
    url: 'user/search/id',
    data: {
      id
    }
  })
}

export function searchUserBytags(tags = [], page, limit) {
  return Hrequest.get({
    url: 'user/search/tags',
    data: {
      tags,
      page,
      limit
    }
  })
}

export function updataUser(data) {
  return Hrequest.post({
    url: 'user/update',
    data
  })
}

export function getRecommendUsers(page, limit) {
  return Hrequest.get({
    url: 'user/recommend',
    data: {
      page,
      limit
    }
  })
}

export function getMatchUsers(searchKey, page, limit) {
  console.log(searchKey)
  return Hrequest.get({
    url: 'user/match',
    data: {
      searchKey,
      page,
      limit
    }
  })
}

export function changeParTags(tagIdList) {
  console.log(tagIdList)
  return Hrequest.post({
    url: 'user/changeTags',
    data: tagIdList
  })
}