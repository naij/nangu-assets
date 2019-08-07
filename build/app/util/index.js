define('app/util/index',['jquery','underscore','app/util/format/format'],function(require,exports,module){
/*$ ,_ ,format */
var $ = require('jquery')
var _ = require('underscore')
var format = require('app/util/format/format')
var exp = {}

_.extend(exp, format)

module.exports = exp
});