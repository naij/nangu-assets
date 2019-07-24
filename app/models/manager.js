var Service = require('app/models/service')

Service.add([
  // 获取文章列表
  {
    name: 'article_list',
    url: '/api/article/list.json'
  },
  // 获取文章列表
  {
    name: 'article_detail',
    url: '/api/article/detail.json'
  },
  // 根据标签获取文章列表
  {
    name: 'article_list_by_tag',
    url: '/api/article/bytag.json'
  },
  // 归档
  {
    name: 'archive',
    url: '/api/article/archive.json'
  },
  // 标签集合
  {
    name: 'article_tag_group',
    url: '/api/article/taggroup.json'
  }
])

module.exports = Service
