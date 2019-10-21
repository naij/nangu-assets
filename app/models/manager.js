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
    url: '/api/wxapp/activity/list.json'
  },
  // 获取房券列表
  {
    name: 'roomvoucher_list',
    url: '/api/wxapp/roomvoucher/list.json'
  },
  // 获取类目列表
  {
    name: 'category_list',
    url: '/api/wxapp/category/list.json'
  },
  // 获取单个类目
  {
    name: 'category_detail',
    url: '/api/wxapp/category/detail.json'
  },
  // 创建类目
  {
    name: 'category_create',
    url: '/api/wxapp/category/create.json',
    method: 'POST'
  },
  // 更新类目
  {
    name: 'category_update',
    url: '/api/wxapp/category/update.json',
    method: 'POST'
  },
  // 删除类目
  {
    name: 'category_remove',
    url: '/api/wxapp/category/remove.json',
    method: 'POST'
  },

  // 获取属性列表
  {
    name: 'attribute_list',
    url: '/api/wxapp/attribute/list.json'
  },
  // 获取单个属性
  {
    name: 'attribute_detail',
    url: '/api/wxapp/attribute/detail.json'
  },
  // 创建属性
  {
    name: 'attribute_create',
    url: '/api/wxapp/attribute/create.json',
    method: 'POST'
  },
  // 更新属性
  {
    name: 'attribute_update',
    url: '/api/wxapp/attribute/update.json',
    method: 'POST'
  },
  // 删除属性
  {
    name: 'attribute_remove',
    url: '/api/wxapp/attribute/remove.json',
    method: 'POST'
  },
  // 获取详情字段列表
  {
    name: 'detailfield_list',
    url: '/api/wxapp/detailfield/list.json'
  },
  // 获取单个详情字段
  {
    name: 'detailfield_detail',
    url: '/api/wxapp/detailfield/detail.json'
  },
  // 创建详情字段
  {
    name: 'detailfield_create',
    url: '/api/wxapp/detailfield/create.json',
    method: 'POST'
  },
  // 更新详情字段
  {
    name: 'detailfield_update',
    url: '/api/wxapp/detailfield/update.json',
    method: 'POST'
  },
  // 删除详情字段
  {
    name: 'detailfield_remove',
    url: '/api/wxapp/detailfield/remove.json',
    method: 'POST'
  },
  // 获取商品列表
  {
    name: 'product_list',
    url: '/api/wxapp/product/list.json'
  },
  // 获取单个商品
  {
    name: 'product_detail',
    url: '/api/wxapp/product/detail.json'
  },
  // 创建商品
  {
    name: 'product_create',
    url: '/api/wxapp/product/create.json',
    method: 'POST'
  },
  // 更新商品
  {
    name: 'product_update',
    url: '/api/wxapp/product/update.json',
    method: 'POST'
  },
  // 设置商品上线
  {
    name: 'product_online',
    url: '/api/wxapp/product/online.json',
    method: 'POST'
  },
  // 设置商品下线
  {
    name: 'product_offline',
    url: '/api/wxapp/product/offline.json',
    method: 'POST'
  },
  // 删除商品
  {
    name: 'product_remove',
    url: '/api/wxapp/product/remove.json',
    method: 'POST'
  },
  // 彻底删除商品
  {
    name: 'product_remove_complete',
    url: '/api/wxapp/product/remove_complete.json',
    method: 'POST'
  },
  // 获取订单列表
  {
    name: 'order_list',
    url: '/api/wxapp/order/list.json'
  },
  // 获取订单详情
  {
    name: 'order_detail',
    url: '/api/wxapp/order/detail.json'
  },
  // 更新订单状态
  {
    name: 'order_update_status',
    url: '/api/wxapp/order/update_status.json',
    method: 'POST'
  },
  // 获取订单退款详情
  {
    name: 'order_refund_detail',
    url: '/api/wxapp/order/refund_detail.json'
  },
  // 提交退款处理
  {
    name: 'order_refund',
    url: '/api/wxapp/payment/refund.json',
    method: 'POST'
  },
  // 退款拒绝
  {
    name: 'order_refund_refuse',
    url: '/api/wxapp/order/refund_refuse.json',
    method: 'POST'
  },


  // 获取图片列表
  {
    name: 'picture_list',
    url: '/api/tool/pic/list.json'
  },
  // 删除图片
  {
    name: 'picture_remove',
    url: '/api/tool/pic/remove.json',
    method: 'POST'
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
