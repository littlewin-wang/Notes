// xhr合法属性
var reqfields = [
  'responseType', 'withCredentials', 'timeout', 'onprogress'
]

function getRequest (cors) {
  // IE 8 and 9 polifill
  if (cors && window.XDomainRequest && !/MSIE 1/.test(navigator.userAgent))
    return new XDomainRequest
  if (window.XMLHttpRequest)
    return new XMLHttpRequest
}

function setDefault (obj, key, value) {
  obj[key] = obj[key] || value
}

export default function (params, callback) {
  var headers = params.headers || {}
    , body = params.body
    , method = params.method || (body ? 'POST' : 'GET')
    , called = false

  // xhr对象generate
  var req = getRequest(params.cors)

  // 回调函数规范输出
  function cb (statusCode, responseText) {
    return function () {
      if (!called) {
        callback(req.status === undefined ? statusCode : req.status,
          req.status === 0 ? "Error" : (req.response || req.responseText || responseText),
          req)
        called = true
      }
    }
  }

  req.open(method, params.url, true)

  var success = req.onload = cb(200)
  req.onreadystatechange = function () {
    if (req.readyState === 4) success()
  }
  req.onerror = cb(null, 'Error')
  req.ontimeout = cb(null, 'Timeout')
  req.onabort = cb(null, 'Abort')

  if (body) {
    // 却省设置 FormData => 'application/x-www-form-urlencoded' 
    if (!window.FormData || !(body instanceof window.FormData)) {
      setDefault(headers, 'Content-Type', 'application/x-www-form-urlencoded')
    }
  }

  // xhr对象属性配置
  for (var i = 0, len = reqfields.length, field; i < len; i++) {
    field = reqfields[i]
    if (params[field] !== undefined)
      req[field] = params[field]
  }

  // xhr对象header配置
  for (var field in headers)
    req.setRequestHeader(field, headers[field])

  req.send(body)

  return req
}
