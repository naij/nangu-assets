var Service = require('app/models/service')

Service.add([
  // 登录
  {
    name: 'login',
    url: '/api/member/admin/login.json',
    method: 'POST'
  },
  // 登出
  {
    name: 'logout',
    url: '/api/member/admin/logout.json'
  },
  // 基础信息
  {
    name: 'pubinfo',
    url: '/api/member/admin/pubinfo.json'
  },
  // 获取注册用户列表
  {
    name: 'member_list',
    url: '/api/member/member/list.json'
  },
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
  // 获取房券列表
  {
    name: 'roomvoucher_list',
    url: '/api/weixin/roomvoucher/list.json'
  },
  // 获取单个房券
  {
    name: 'roomvoucher_detail',
    url: '/api/weixin/roomvoucher/detail.json'
  },
  // 设置房券上线
  {
    name: 'roomvoucher_online',
    url: '/api/weixin/roomvoucher/online.json',
    method: 'POST'
  },
  // 设置房券下线
  {
    name: 'roomvoucher_offline',
    url: '/api/weixin/roomvoucher/offline.json',
    method: 'POST'
  },
  // 创建房券
  {
    name: 'roomvoucher_create',
    url: '/api/weixin/roomvoucher/create.json',
    method: 'POST'
  },
  // 更新房券
  {
    name: 'roomvoucher_update',
    url: '/api/weixin/roomvoucher/update.json',
    method: 'POST'
  },
  // 删除房券
  {
    name: 'roomvoucher_remove',
    url: '/api/weixin/roomvoucher/remove.json',
    method: 'POST'
  },
  // 彻底删除房券
  {
    name: 'roomvoucher_remove_complete',
    url: '/api/weixin/roomvoucher/remove_complete.json',
    method: 'POST'
  },
  // 获取类目列表
  {
    name: 'category_list',
    url: '/api/weixin/category/list.json'
  },
  // 获取单个类目
  {
    name: 'category_detail',
    url: '/api/weixin/category/detail.json'
  },
  // 创建类目
  {
    name: 'category_create',
    url: '/api/weixin/category/create.json',
    method: 'POST'
  },
  // 更新类目
  {
    name: 'category_update',
    url: '/api/weixin/category/update.json',
    method: 'POST'
  },
  // 删除类目
  {
    name: 'category_remove',
    url: '/api/weixin/category/remove.json',
    method: 'POST'
  },
  // 获取图片列表
  {
    name: 'picture_list',
    url: '/api/tool/pic/list.json'
  },
  // 获取静态资源发布列表
  {
    name: 'assets_list',
    url: '/api/tool/assets/list.json'
  },
  // 获取静态资源发布详情
  {
    name: 'assets_detail',
    url: '/api/tool/assets/detail.json'
  }
])

module.exports = Service
