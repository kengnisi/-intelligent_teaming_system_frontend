function getSearchKeyStorage(key) {
  return wx.getStorageSync(key)
}
function setSearchKeyStorage(key) {
  let searchKey = !wx.getStorageSync('searchKey') ? []:JSON.parse(wx.getStorageSync('searchKey'))
  const resSearch = key.reduce((pre, cur) => {
    pre.unshift(cur)
    return pre
  }, searchKey)
  wx.setStorageSync('searchKey', JSON.stringify(resSearch.splice(0, 3)))
}

export {
  getSearchKeyStorage,
  setSearchKeyStorage
}