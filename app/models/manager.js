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
  // 获取成员列表
  {
    name: 'admin_list',
    url: '/api/member/admin/list.json'
  },
  // 获取成员详情
  {
    name: 'admin_detail',
    url: '/api/member/admin/detail.json'
  },
  // 创建成员信息
  {
    name: 'admin_create',
    url: '/api/member/admin/create.json',
    method: 'POST'
  },
  // 更新成员信息
  {
    name: 'admin_update',
    url: '/api/member/admin/update.json',
    method: 'POST'
  },
  // 更新成员状态
  {
    name: 'admin_update_status',
    url: '/api/member/admin/update_status.json',
    method: 'POST'
  },
  // 重置成员密码
  {
    name: 'admin_reset_password_to_origin',
    url: '/api/member/admin/reset_password_to_origin.json',
    method: 'POST'
  },
  // 重置成员密码
  {
    name: 'admin_reset_password',
    url: '/api/member/admin/reset_password.json',
    method: 'POST'
  },
  // 获取注册用户列表
  {
    name: 'member_list',
    url: '/api/member/member/list.json'
  },
  // 获取角色列表
  {
    name: 'role_list',
    url: '/api/member/role/list.json'
  },
  // 获取角色详情
  {
    name: 'role_detail',
    url: '/api/member/role/detail.json'
  },
  // 创建角色
  {
    name: 'role_create',
    url: '/api/member/role/create.json',
    method: 'POST'
  },
  // 更新角色
  {
    name: 'role_update',
    url: '/api/member/role/update.json',
    method: 'POST'
  },
  // 更新角色状态
  {
    name: 'role_update_status',
    url: '/api/member/role/update_status.json',
    method: 'POST'
  },
  // 删除角色
  {
    name: 'role_remove',
    url: '/api/member/role/remove.json',
    method: 'POST'
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
  // 获取订单退款原因列表
  {
    name: 'order_refund_reason_list',
    url: '/api/wxapp/order/refund_reason_list.json'
  },
  // 获取订单退款原因详情
  {
    name: 'order_refund_reason_detail',
    url: '/api/wxapp/order/refund_reason_detail.json'
  },
  // 创建订单退款原因
  {
    name: 'order_refund_reason_create',
    url: '/api/wxapp/order/refund_reason_create.json',
    method: 'POST'
  },
  // 更新订单退款原因
  {
    name: 'order_refund_reason_update',
    url: '/api/wxapp/order/refund_reason_update.json',
    method: 'POST'
  },
  // 删除订单退款原因
  {
    name: 'order_refund_reason_remove',
    url: '/api/wxapp/order/refund_reason_remove.json',
    method: 'POST'
  },


  // 获取图片列表
  {
    name: 'picture_list',
    url: '/api/tool/picture/list.json'
  },
  // 删除图片
  {
    name: 'picture_remove',
    url: '/api/tool/picture/remove.json',
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
  },

  // 获取菜单列表
  {
    name: 'menu_list',
    url: '/api/setting/menu/list.json'
  },
  // 获取菜单列表
  {
    name: 'menu_full_list',
    url: '/api/setting/menu/full_list.json'
  },
  // 获取菜单详情
  {
    name: 'menu_detail',
    url: '/api/setting/menu/detail.json'
  },
  // 创建菜单
  {
    name: 'menu_create',
    url: '/api/setting/menu/create.json',
    method: 'POST'
  },
  // 更新菜单
  {
    name: 'menu_update',
    url: '/api/setting/menu/update.json',
    method: 'POST'
  },
  // 删除菜单
  {
    name: 'menu_remove',
    url: '/api/setting/menu/remove.json',
    method: 'POST'
  }
])

module.exports = Service
