var Service = require('app/models/service')

Service.add([
  // 获取活动列表
  {
    name: 'activity_list',
    url: '/api/weixin/activity/list.json'
  },
  // 获取单个活动
  {
    name: 'activity_detail',
    url: '/api/weixin/activity/detail.json'
  },
  // 设置活动上线
  {
    name: 'activity_online',
    url: '/api/weixin/activity/online.json',
    method: 'POST'
  },
  // 设置活动下线
  {
    name: 'activity_offline',
    url: '/api/weixin/activity/offline.json',
    method: 'POST'
  },
  // 获取活动列表
  {
    name: 'activity_create',
    url: '/api/weixin/activity/create.json',
    method: 'POST'
  },
  // 更新活动
  {
    name: 'activity_update',
    url: '/api/weixin/activity/update.json',
    method: 'POST'
  },
  // 删除活动
  {
    name: 'activity_remove',
    url: '/api/weixin/activity/remove.json',
    method: 'POST'
  },
  // 彻底删除活动
  {
    name: 'activity_remove_complete',
    url: '/api/weixin/activity/remove_complete.json',
    method: 'POST'
  },
  // 获取图片列表
  {
    name: 'picture_list',
    url: '/api/tool/pic/list.json'
  }
])

module.exports = Service
