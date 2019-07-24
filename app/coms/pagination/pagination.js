var Magix = require('magix')
var $ = require('jquery')
var _ = require('underscore')

module.exports = Magix.View.extend({
  tmpl: '@pagination.html',
  init: function(extra) {
    var me = this
    me.$extra = extra
    var step = extra.step || 7
    var total = (extra.total | 0) || 0
    var size = extra.size || 20
    var pages = Math.ceil((total || 1) / size)
    var page = extra.page || 1

    me.data = {
      step: step,
      page: page,
      pages: pages,
      total: total,
      size: size
    }
  },
  render: function() {
    var me = this
    _.extend(me.data, me.cal())
    me.setView()
  },
  cal: function() {
    var me = this
    var data = me.data
    var page = data.page | 0
    var pages = data.pages | 0
    if (page > pages) page = pages
    var step = data.step | 0
    var middle = step / 2 | 0
    var start = Math.max(1, page - middle)
    var end = Math.min(pages, start + step - 1)
    start = Math.max(1, end - step + 1)
    var offset
    if (start <= 2) { //=2 +1  =1  +2
      offset = 3 - start
      if (end + offset < pages) {
        end += offset
      }
    }
    if (end + 2 > pages) {
      offset = 2 - (pages - end)
      if ((start - offset) > 1) {
        start -= offset
      }
    }
    if (start == 3) {
      start -= 1
    }
    if (end + 2 == pages) {
      end += 1
    }

    var pageNums = []
    for(var i = start; i <= end; i++) {
      pageNums.push(i)
    }

    return {
      offsetStart: (page - 1) * data.size + 1,
      offsetEnd: Math.min(data.total, page * data.size),
      page: page,
      start: start,
      end: end,
      pageNums: pageNums
    }
  },
  fireEvent: function() {
    var me = this
    var node = $('#' + me.id)
    var data = me.data
    node.trigger({
      type: 'change',
      state: {
        page: data.page,
        size: data.size
      }
    })
  },
  'toPage<click>': function(e) {
    e.preventDefault()
    var me = this
    me.data.page = e.params.page
    me.render()
    me.fireEvent()
  },
  'toPrev<click>': function(e) {
    e.preventDefault()
    var me = this
    me.data.page = me.data.page - 1
    me.render()
    me.fireEvent()
  },
  'toNext<click>': function(e) {
    e.preventDefault()
    var me = this
    me.data.page = me.data.page + 1
    me.render()
    me.fireEvent()
  },
  'changeSize<change>': function(e) {
    e.stopPropagation()
    var me = this
    me.data.page = 1
    me.data.size = e.item
    me.render()
    me.fireEvent()
  }
})