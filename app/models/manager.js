var Service = require('app/models/service')

Service.add([
  // 获取活动列表
  {
    name: 'activity_list',
    url: '/api/weixin/activity/list.json'
  },
  // 获取图片列表
  {
    name: 'picture_list',
    url: '/api/tool/pic/list.json'
  }
])

module.exports = Service
