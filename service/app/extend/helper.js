'use strict'

const uuid = require('uuid').v4
const crypto = require('crypto')
const qs = require('querystring')

function formateHost(host) {
  if (!host) {
    return ''
  }
  host = host.trim()
  if (host.indexOf('http') !== 0) {
    host = 'http://' + host
  }
  if (host.lastIndexOf('/') !== host.length - 1) {
    host = host + '/'
  }
  return host
}

exports.REGEXP = {
  username: /^[a-z]{4,}$/,
  mobile: /^1[34578]\d{9}$/,
  mail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

exports.sleep = function sleep(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

exports.generateId = function generateId() {
  return uuid().replace(/-/g, '')
}

const OPERATOR_RE = /[|\\{}()[\]^$+*?.]/g
exports.escapeStringRegExp = function escapeStringRegExp(str = '') {
  return str.replace(OPERATOR_RE, '\\$&')
}

const namePossible = 'abcdefghijklmnopqrstuvwxyzaeiou'
exports.makeName = function makeName(len = 5) {
  let text = ''
  for (let i = 0; i < len; i++) {
    if (i === 0) {
      text += namePossible
        .charAt(Math.floor(Math.random() * namePossible.length))
        .toUpperCase()
    } else {
      text += namePossible.charAt(
        Math.floor(Math.random() * namePossible.length)
      )
    }
  }
  return text
}

exports.md5 = function md5(str, maxLen = 32) {
  return crypto
    .createHash('md5')
    .update(str)
    .digest('hex')
    .slice(0, maxLen)
}

exports.getUsername = function getUsername() {
  return (this.ctx.user && this.ctx.user.username) || ''
}

exports.authFilter = function authFilter(filter) {
  return filter
  // const ctx = this.ctx;
  // if (ctx.user) {
  //   if (ctx.user.role !== 'admin') {
  //     filter.$or = [{
  //       'members.username': ctx.user.username,
  //     }, {
  //       visibility: 'public',
  //     }];
  //     // filter['members.username'] = ctx.user.username;
  //   }
  //   return filter;
  // }
  // return { id: 'xxx-not-exist' };
}

exports.authCheck = function authCheck() {
  return true
  // const ctx = this.ctx;
  // if (ctx.user) {
  //   if (ctx.user.role === 'admin') {
  //     return true;
  //   }
  //   if (model) {
  //     if (model.visibility === 'public') {
  //       return true;
  //     }
  //     if (model.members) {
  //       for (const member of model.members) {
  //         if (member.username === ctx.user.username) {
  //           return true;
  //         }
  //       }
  //     }
  //   }
  // }
  // return false;
}

exports.masterCheck = function masterCheck() {
  return false
  // const ctx = this.ctx;
  // if (ctx.user) {
  //   if (ctx.user.role === 'admin') {
  //     return true;
  //   }
  //   if (model && model.members) {
  //     for (const member of model.members) {
  //       if (member.username === ctx.user.username && member.role === 'master') {
  //         return true;
  //       }
  //     }
  //   }
  // }
  // return false;
}

exports.formateHost = formateHost
exports.toInt = function toInt(str) {
  if (typeof str === 'number') return str
  if (!str) return str
  return parseInt(str, 10) || 0
}
exports.getServerHosts = async function getServerHosts(configType) {
  const ctx = this.ctx
  const doc = await ctx.model.Server.findOne({ configType })
    .lean()
    .exec()
  if (!doc) {
    return []
  }
  return doc.hostList.map(item => formateHost(item.host))
}

exports.getBaiduToken = async function getBaiduToken() {
  const { ctx } = this
  let url = 'https://aip.baidubce.com/oauth/2.0/token'
  const params = {
    grant_type: 'client_credentials',
    client_id: 'wae8ll2ql8kWdenf7xAdb9pn',
    client_secret: 'a1Hu6F3G3i6EkXu6KYwDkDB8PG71lWjg',
  }
  url += `?${qs.stringify(params)}`
  // const res = await axios({
  //   method: 'post',
  //   url,
  //   params
  // })
  // const res = await axios.get(url)
  const res = await ctx.curl(url, {
    method: 'POST',
    contentType: 'json',
    dataType: 'json'
  });
  if (res && res.data) {
    return res.data.access_token
  }
  return null
}

// exports.isAdmin = function isAdmin() {
//   const ctx = this.ctx;
//   if (ctx.user) {
//     if (ctx.user.role === 'admin') {
//       return true;
//     }
//   }
//   return false;
// };

// exports.parseSwarmAddress = async function(swaimApi) {
//   const ctx = this.ctx;
//   const results = await ctx.curl(swaimApi, {
//     dataType: 'json',
//   });

//   return results.data.map(item => {
//     const Port = item.Ports.filter(p => p.IP && p.PublicPort)[0];
//     return Port.IP + ':' + Port.PublicPort;
//   });
// };

// const Excel = require('exceljs');

// exports.excelNew = async function excelNew(headers, name) {
//   let columns = [];
//   let titleRows = headers.length;

//   //????????????
//   for (let i = 0; i < titleRows; i++) {
//       let row = headers[i];
//       for (let j = 0, rlen = row.length; j < rlen; j++) {
//           let col = row[j];
//           let { k, t, w = 15 } = col;
//           if (!k) continue;
//           col.style = { alignment: { vertical: 'middle', horizontal: 'center' } };
//           col.header = t;
//           col.key = k;
//           col.width = w;
//           columns.push(col);
//       }
//   }

//   let result = {
//       data: {data: [{userName:'?????????', deptName: '?????????'}, {userName:'?????????', deptName: '?????????'}]}
//   }

//   let workbook = new Excel.Workbook();
//   let sheet = workbook.addWorksheet('?????????????????????', { views: [{ xSplit: 1, ySplit: 1 }] });
//   sheet.columns = columns;
//   sheet.addRows(result.data.data)

//   //?????????????????????????????????
//   let that = this;
//   sheet.eachRow(function (row, rowNumber) {
//       //????????????
//       row.height = 25;

//       row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
//           //???????????? ?????? ?????????
//           // let top = left = bottom = right = { style: 'thin', color: { argb: '000000' } };
//           // cell.border = { top, left, bottom, right };

//           //???????????????????????????
//           if (rowNumber <= titleRows) { cell.font = { bold: true }; return; }

//           //???????????????????????????????????????
//           let { type, dict } = columns[colNumber - 1];
//           if (type && (cell.value || cell.value == 0)) return;//?????????????????????????????????????????????
//           switch (type) {
//               case 'date': cell.value = that.parseDate(cell.value); break;
//               case 'dict': cell.value = that.parseDict(cell.value.toString(), dict); break;
//           }

//       });
//   });

//   this.ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//   this.ctx.set('Content-Disposition', "attachment;filename*=UTF-8' '" + encodeURIComponent(name) + '.xlsx');
//   this.ctx.body = await workbook.xlsx.writeBuffer();
// }
