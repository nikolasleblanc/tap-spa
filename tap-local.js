!(function(t) {
  var e = {}
  function r(n) {
    if (e[n]) return e[n].exports
    var i = (e[n] = {
      i: n,
      l: !1,
      exports: {},
    })
    return t[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports
  }
  ;(r.m = t),
    (r.c = e),
    (r.d = function(t, e, n) {
      r.o(t, e) ||
        Object.defineProperty(t, e, {
          configurable: !1,
          enumerable: !0,
          get: n,
        })
    }),
    (r.n = function(t) {
      var e =
        t && t.__esModule
          ? function() {
              return t.default
            }
          : function() {
              return t
            }
      return r.d(e, 'a', e), e
    }),
    (r.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }),
    (r.p = ''),
    r((r.s = 30))
})([
  function(t, e, r) {
    'use strict'
    var n = 0
    function i(t) {
      return void 0 !== t && n >= t
    }
    ;(e.LOUD = 3),
      (e.DEBUG = 2),
      (e.LOG = 1),
      (e.USER = 0),
      (e.setPriorityLevel = function(t) {
        n = t
      }),
      (e.log = function(t, e, r) {
        i(r) && (console.log('[Taplytics]', t), e && console.dir(e))
      }),
      (e.time = function(t, r, n, o) {
        if (i(o)) {
          if (n)
            t = t + ', time: ' + (new Date().getTime() - n.getTime()) + 'ms'
          e.log(t, r, o)
        }
      }),
      (e.error = function(t, e, r) {
        i(r) && (console.error('[Taplytics]', t), e && console.dir(e))
      })
  },
  function(t, e, r) {
    'use strict'
    var n =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(t) {
              return typeof t
            }
          : function(t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t
            },
      i = r(4),
      o = r(75),
      s = r(0),
      a = r(5),
      u = r(27),
      c = r(78),
      l = r(8),
      f = r(79),
      p = r(80),
      h = r(9),
      d = r(26),
      v = '_tl_csid',
      m = '_tl_duuid',
      y = '_tl_suuid',
      g = '_tl_uid',
      _ = '_tl_sid',
      b = '_tl_auid',
      w = '_tl_config',
      x = function(t, e) {
        return t && e ? 'tl_sopts_' + t + '_' + e : null
      }
    ;(e.config = null),
      (e.hasLoadedData = !1),
      (e.sessionExpirationMin = 30),
      (e.start = function(t) {
        return e.updateCookieSession().setDeviceUUID(t)
      }),
      (e.get = function(t, r) {
        if (t) {
          e.tick()
          var o = e.getCookieSessionID(),
            a = x(o, t)
          if (a) {
            if (!(r && JSON && JSON.parse)) return i.get(a)
            var u = i.get(a)
            if (u && 'object' === (void 0 === u ? 'undefined' : n(u))) return u
            try {
              return JSON.parse(u)
            } catch (e) {
              return (
                s.error(
                  'Session.get(' + t + ') failed to parse JSON.',
                  e,
                  s.DEBUG
                ),
                u
              )
            }
          }
        }
      }),
      (e.tick = function() {
        return e.updateCookieSession(), e
      }),
      (e.set = function(t, r, n) {
        if (!t || void 0 === r || 0 === ('' + r).length) return !1
        e.tick()
        var i = e.getCookieSessionID(),
          o = x(i, t),
          s = E(),
          a = r
        return (
          !!o &&
          (n && JSON && JSON.stringify && (a = JSON.stringify(r)),
          O(o, a, {
            expires: s,
          }),
          !0)
        )
      }),
      (e.unset = function(t) {
        if (!t) return !1
        e.tick()
        var r = e.getCookieSessionID(),
          n = x(r, t)
        i.expire(n)
      }),
      (e.updateCookieSession = function() {
        var t = e.getCookieSessionID()
        t || ((t = o.v4()), e.deleteSessionID())
        var r = E()
        return (
          O(v, t, {
            expires: r,
          }),
          s.log(
            'Set cookieSessionID to: ' + t,
            {
              expires: r,
            },
            s.LOUD
          ),
          e
        )
      }),
      (e.setDeviceUUID = function(t) {
        return (
          (t = t || e.getDeviceUUID()) || (t = o.v4()),
          O(m, t, {
            expires: new Date(2147483647e3),
          }),
          s.log('Set deviceUUID to: ' + t, null, s.DEBUG),
          e
        )
      }),
      (e.setSessionID = function(t) {
        return (
          O(_, t, {
            expires: E(),
          }),
          s.log('Set sessionID to: ' + t, null, s.DEBUG),
          e
        )
      }),
      (e.deleteSessionID = function() {
        return i.expire(_), e
      }),
      (e.setAppUserID = function(t) {
        return (
          O(b, t, {
            expires: E(),
          }),
          s.log('Set appUserID to: ' + t, null, s.DEBUG),
          e
        )
      }),
      (e.deleteAppUserID = function() {
        return i.expire(b), e
      }),
      (e.deleteSessionUUID = function() {
        i.expire(y)
      }),
      (e.setUserID = function(t) {
        if (u.userBucketing && !t) {
          var r = 'TL_Anon_' + d()
          s.log('setting anon id', r), i.set(g, r)
        } else t && i.set(g, t)
        return e
      }),
      (e.resetUserID = function() {
        return u.userBucketing ? e.setUserID(null) : i.expire(g), e
      }),
      (e.setCachedConfig = function(t) {
        return (
          (function(t, e, r, n) {
            if (h()) return
            i.setJSON(t, e, r, n)
          })(
            w,
            {
              expVarsNamesHistory: t ? t.expVarsNamesHistory : {},
              expVarsNames: t ? t.expVarsNames : {},
              expVarsIds: t ? t.expVarsIds : {},
              dynamicVars: t ? t.dynamicVars : {},
            },
            null,
            !0
          ),
          e
        )
      }),
      (e.getDeviceUUID = function() {
        var t = i.get(y)
        if (t) return t
        var r = i.get(m)
        return t === r && e.deleteSessionUUID(), r
      }),
      (e.getCookieSessionID = function() {
        return i.get(v)
      }),
      (e.getAppUserID = function() {
        return i.get(b)
      }),
      (e.getOrCreateUserID = function() {
        var t = e.getUserID()
        return t || (e.setUserID(null), e.getUserID())
      }),
      (e.getUserID = function() {
        return i.get(g)
      }),
      (e.getSessionID = function() {
        return i.get(_)
      }),
      (e.getCachedConfig = function() {
        return i.getJSON(w, !0)
      }),
      (e.getSessionAttributes = function(t) {
        t = t || {}
        var e = l.toObject(),
          r = c()
        return (
          (t.sid = this.getSessionID()),
          (t.ad = this.getDeviceUUID()),
          (t.adt = 'browser'),
          (t.ct = 'browser'),
          (t.lv = a().production ? '0' : '1'),
          (t.sdk = a().sdkVersion),
          (t.rfr = r.referrer),
          (t.ub = u.userBucketing),
          (t.exm = r.search.utm_medium),
          (t.exs = r.search.utm_source),
          (t.exc = r.search.utm_campaign),
          (t.ext = r.search.utm_term),
          (t.exct = r.search.utm_content),
          (t.prms = {
            search: r.search,
            location: e,
          }),
          navigator &&
            navigator.userAgent &&
            (t.prms.userAgent = navigator.userAgent),
          t
        )
      }),
      (e.saveSessionConfig = function(t, r) {
        r &&
          !t &&
          (s.log('Using cached config because of server error', null, s.DEBUG),
          (t = e.getCachedConfig())),
          (e.config = t),
          (D = !0),
          t &&
            t.app_user_id &&
            t.session_id &&
            ((e.hasLoadedData = !0),
            e.setAppUserID(t.app_user_id),
            e.setSessionID(t.session_id),
            e.tick()),
          t && e.setCachedConfig(t),
          p.applyVisualEditsFromConfig(t),
          S.completePromises(!!t),
          (r || (t && t.app_user_id && t.session_id)) && k.completePromises(!!t)
      })
    var k = new f({
      name: 'sessionConfigPromises',
    })
    e.sessionConfigPromise = function(t) {
      if (t) return e.hasLoadedData && e.config ? t(!0) : void k.push(t)
    }
    var D = !1,
      S = new f({
        name: 'configPromises',
      })
    function O(t, e, r) {
      h() || (r ? i.set(t, e, r) : i.set(t, e))
    }
    function E() {
      return (function(t, e, r) {
        var n = new Date(t)
        switch (e.toLowerCase()) {
          case 'year':
            n.setFullYear(n.getFullYear() + r)
            break
          case 'quarter':
            n.setMonth(n.getMonth() + 3 * r)
            break
          case 'month':
            n.setMonth(n.getMonth() + r)
            break
          case 'week':
            n.setDate(n.getDate() + 7 * r)
            break
          case 'day':
            n.setDate(n.getDate() + r)
            break
          case 'hour':
            n.setTime(n.getTime() + 36e5 * r)
            break
          case 'minute':
            n.setTime(n.getTime() + 6e4 * r)
            break
          case 'second':
            n.setTime(n.getTime() + 1e3 * r)
            break
          default:
            n = void 0
        }
        return n
      })(new Date(), 'minute', e.sessionExpirationMin)
    }
    ;(e.configPromise = function(t) {
      if (t) return D && e.config ? t(!0) : void S.push(t)
    }),
      (e.resetSession = function() {
        e.deleteSessionID(),
          e.deleteAppUserID(),
          e.resetUserID(),
          (e.config = null),
          (e.hasLoadedData = !1)
      })
  },
  function(t, e, r) {
    'use strict'
    Object.defineProperty(e, '__esModule', {
      value: !0,
    }),
      (e.forEach = e.isEqual = e.includes = e.values = e.isObjectLike = e.debounce = e.isString = e.isNumber = void 0)
    var n = f(r(39)),
      i = f(r(40)),
      o = f(r(60)),
      s = f(r(61)),
      a = f(r(7)),
      u = f(r(65)),
      c = f(r(66)),
      l = f(r(67))
    function f(t) {
      return t && t.__esModule
        ? t
        : {
            default: t,
          }
    }
    ;(e.isNumber = c.default),
      (e.isString = u.default),
      (e.debounce = l.default),
      (e.isObjectLike = a.default),
      (e.values = s.default),
      (e.includes = o.default),
      (e.isEqual = i.default),
      (e.forEach = n.default)
  },
  function(t, e, r) {
    'use strict'
    var n = r(31),
      i = r(5),
      o = r(0),
      s = r(16),
      a = r(17),
      u = r(9),
      c = new s(),
      l = !1
    ;(e.publicToken = null),
      (e.setPublicToken = function(t) {
        this.publicToken = t
      }),
      (e.get = p(function(t, r, i) {
        if (u()) return
        var s = v(r),
          a = d(t)
        o.log('GET request: ' + a, s, o.LOUD),
          n
            .get(a)
            .query(s.query)
            .timeout(e.timeout)
            .end(f(a, i))
      })),
      (e.getJSON = p(function(t, r) {
        if (u()) return
        var s = (function(t) {
          return i().cdnAPI + (t || '')
        })(t)
        o.log('GET JSON file request: ' + s, null, o.LOUD),
          n
            .get(s)
            .timeout(e.timeout)
            .end(f(s, r))
      })),
      (e.post = p(function(t, e, r, i) {
        if (u()) return
        var s = v(e, r),
          a = d(t)
        o.log('POST request: ' + a, s, o.LOUD),
          n
            .post(a)
            .query(s.query)
            .set('Content-Type', 'application/json')
            .send(s.payload)
            .end(f(a, i))
      })),
      (e.del = p(function(t, r, i, s) {
        if (u()) return
        var a = v(r, i),
          c = d(t)
        o.log('DELETE request: ' + c, a, o.LOUD),
          n
            .del(c)
            .query(a.query)
            .set('Content-Type', 'application/json')
            .timeout(e.timeout)
            .send(a.payload)
            .end(f(c, s))
      }))
    function f(t, e) {
      return function(r, n) {
        r && o.error('Error: ' + t, r, o.DEBUG),
          e && 'function' == typeof e && e(r, n),
          h()
      }
    }
    function p(t) {
      return function() {
        c.enqueue({
          requestFunction: t,
          args: arguments,
        }),
          l || h()
      }
    }
    function h() {
      if (!c.isEmpty()) {
        l = !0
        var t = c.dequeue()
        return (
          o.log('Processing request', t, o.DEBUG),
          t && t.requestFunction && t.requestFunction.apply(e, t.args)
        )
      }
      l = !1
    }
    function d(t, e) {
      var r = i(),
        n = r.eventsAPI,
        o = r.baseAPI
      return (
        ('events' === t && n ? n : o) +
        (t || '') +
        (function(t) {
          return t ? '?' + a.stringify(t) : ''
        })(e)
      )
    }
    function v(t, r) {
      var n = {},
        i = {}
      return (
        t && 'function' == typeof t ? (n = t()) : t && (n = t),
        r && 'function' == typeof r ? (i = r()) : r && (i = r),
        (n.r_v = '0'),
        e.publicToken && (n.public_token = e.publicToken),
        {
          query: n,
          payload: i,
        }
      )
    }
    ;(e.timeout = 4e3),
      (e.setTimeout = function(t) {
        var r = 1e3 * t
        r > 3e4
          ? (o.error(
              'Timeout is larger then max timeout! timeout: ' +
                t +
                's, max timeout: 30s. Using max timeout value.',
              null,
              o.USER
            ),
            (e.timeout = 3e4))
          : r < 1e3
          ? (o.error(
              'Timeout is smaller then the min timeout! timeout: ' +
                t +
                's, min timeout: 1s. Using min timeout value.',
              null,
              o.USER
            ),
            (e.timeout = 1e3))
          : (o.log('Set timeout: ' + t + 's', null, o.LOUD), (e.timeout = r))
      })
  },
  function(t, e, r) {
    'use strict'
    var n = r(0),
      i = r(2),
      o = r(5),
      s = r(74),
      a = r(11).CookieJar,
      u = r(11).Cookie,
      c = r(11).CookieAccessInfo,
      l = r(12).OPT_OUT_KEY
    s.supported() ||
      (n.log('Local Storage not supported', null, n.DEBUG), (s = null))
    var f = {
      cookieSessionID: '_tl_csid',
      deviceUUID: '_tl_duuid',
      sessionUUID: '_tl_suuid',
      sessionID: '_tl_sid',
      appUserID: '_tl_auid',
      userID: '_tl_uid',
    }
    ;(e.getJSON = function(t, r) {
      var o = e.get(t, r)
      if (!o || !i.isString(o)) return o
      try {
        return JSON.parse(o)
      } catch (t) {
        return n.error('JSON parse cookie value', t, n.DEBUG), null
      }
    }),
      (e.getLS = function(t) {
        if (!s) return null
        var e = s.get(t)
        return (
          n.log(
            'Got local storage key: ' + t + ' with value: ' + e,
            null,
            n.LOUD
          ),
          e
        )
      }),
      (e.get = function(t, r) {
        if (e.getCookieSupport() && !r) {
          var n = h(),
            o = new c(e.getCookieDomain()),
            a = n.getCookie(t, o)
          return (
            a &&
              !i.includes(i.values(f), t) &&
              (a.value = (function(t) {
                try {
                  return decodeURIComponent(atob(t))
                } catch (e) {
                  return t
                }
              })(a.value)),
            a ? a.value : void 0
          )
        }
        return s ? e.getLS(t) : r ? e.get(t) : void 0
      }),
      (e.setJSON = function(t, r, o, s) {
        var a = void 0
        try {
          a = i.isString(r) ? r : JSON.stringify(r)
        } catch (t) {
          n.error('JSON stringify cookie value', t, n.DEBUG)
        }
        e.set(t, a, o, s)
      }),
      (e.set = function(t, r, o, a) {
        if (t)
          if (e.getCookieSupport() && !a) {
            ;(r = r || ''), (o = o || {})
            var c = h(),
              l = (function(t, r, n) {
                i.includes(i.values(f), t) ||
                  ((o = r), (r = btoa(encodeURIComponent(o))))
                var o
                var s = new u(t + '=' + r)
                n && (s.expiration_date = n)
                return (s.domain = e.getCookieDomain()), s
              })(t, r, o.expires).toString()
            ;(document.cookie = l),
              c.setCookie(l),
              n.log('Setting cookies to:', l, n.LOUD)
          } else s ? e.setLS(t, r, o) : a && e.set(t, r, o)
      }),
      (e.setLS = function(t, e, r) {
        if (s) {
          var i = r && r.expires ? 30 : null
          s.set(t, e, i),
            n.log(
              'Setting local storage key: ' + t + ' to value: ' + e,
              null,
              n.LOUD
            )
        }
      }),
      (e.expire = function(t, r) {
        e.getCookieSupport() && !r
          ? e.set(t, '-', {
              expires: new Date(),
            })
          : s
          ? (n.log('Deleting local storage key: ' + t, null, n.LOUD),
            s.remove(t))
          : r && e.expire(t)
      })
    var p = void 0
    function h() {
      return (
        p ||
          ((p = new a()),
          (function() {
            if (p && document.cookie && document.cookie.length)
              for (var t = document.cookie.split(';'), e = 0; e < t.length; e++)
                try {
                  for (var r = t[e]; ' ' === r.charAt(0); ) r = r.substring(1)
                  p.setCookies(r)
                } catch (t) {
                  n.error('Exception setting cookie', t, n.DEBUG)
                }
          })()),
        p
      )
    }
    ;(e.getCookieDomain = function() {
      var t = o().cookieDomain
      if (t) return t
      var e = window.location.hostname,
        r = e ? e.split('.').reverse() : null
      return r &&
        r.length >= 3 &&
        r[1].match(/^(com|edu|gov|net|mil|org|nom|co|ca|name|info|biz)$/i)
        ? '.' + r[2] + '.' + r[1] + '.' + r[0]
        : r && r.length > 1
        ? '.' + r[1] + '.' + r[0]
        : null
    }),
      (e.hasUserOptedOutTracking = function() {
        var t = e.getLS(l)
        return null === t
          ? null != s &&
              (s.set(l, !1, null),
              n.log(
                'Setting local storage key: ' + l + ' to value: ' + !1,
                null,
                n.LOUD
              ),
              !1)
          : t
      }),
      (e.getCookies = function() {
        var t = h(),
          r = new c(e.getCookieDomain())
        return t.getCookies(r)
      }),
      (e.removeAllCookies = function() {
        var t = h(),
          r = new c(e.getCookieDomain())
        t.getCookies(r).forEach(function(t) {
          n.log('expiring tl session cookie ' + t.name, t, n.DEBUG),
            e.expire(t.name, !1)
        }),
          Object.keys(f).forEach(function(t) {
            e.expire(f[t], !1)
          })
      })
    var d = void 0
    e.getCookieSupport = function() {
      if (void 0 !== d) return d
      var t = !0
      do {
        var e = 'gCStest=' + Math.floor(1e8 * Math.random())
        if (
          ((document.cookie = t
            ? e +
              '; expires=' +
              new Date('Tue, 01-Jan-2030 00:00:00').toUTCString()
            : e),
          -1 !== document.cookie.indexOf(e))
        )
          return (
            (document.cookie =
              e +
              '; expires=' +
              new Date('Sat, 01-Jan-2000 00:00:00 GMT').toUTCString()),
            (d = t),
            t
          )
      } while (!(t = !t))
      return (d = null), null
    }
  },
  function(t, e, r) {
    'use strict'
    t.exports = function() {
      var t = r(13),
        e = {
          cdnAPI: 'https://cdn-config.taplytics.com/js/',
        }
      if (
        ('production' === t.env
          ? ((e.baseAPI = 'https://api.taplytics.com/public_api/v1/'),
            (e.eventsAPI = 'https://ping.taplytics.com/public_api/v1/'))
          : 'dev' === t.env || 'development' === t.env
          ? (e.baseAPI = 'https://dev.taplytics.com/public_api/v1/')
          : 'stag' === t.env || 'staging' === t.env
          ? (e.baseAPI = 'https://staging.taplytics.com/public_api/v1/')
          : 'local' === t.env &&
            (e.baseAPI = 'http://localhost:3002/public_api/v1/'),
        t && t.api && t.api.config)
      ) {
        var n = t.api.config,
          i = n.apiAlias,
          o = n.pingAlias
        i && (e.baseAPI = i + '/public_api/v1/'),
          o && (e.eventsAPI = o + '/public_api/v1/')
      }
      return (
        (e.eventsFlushQueueTimeout = 4e3),
        (e.functionFlushQueueTimeout = 500),
        (e.sdkVersion = '2.12.0'),
        (e.cookieDomain =
          t && t.api && t.api.config && t.api.config.cookieDomain
            ? t.api.config.cookieDomain
            : null),
        (e.production = 'production' === t.env),
        e
      )
    }
  },
  function(t, e, r) {
    var n = r(46)
    t.exports = function(t, e) {
      for (var r = t.length; r--; ) if (n(t[r][0], e)) return r
      return -1
    }
  },
  function(t, e) {
    t.exports = function(t) {
      return null != t && 'object' == typeof t
    }
  },
  function(t, e, r) {
    'use strict'
    var n = {}
    function i(t) {
      return n[t]
        ? n[t]
        : 'title' === t
        ? document.title
        : document.location
        ? document.location[t]
        : null
    }
    ;(e.toObject = function() {
      return {
        href: i('href'),
        hash: i('hash'),
        search: i('search'),
        host: i('host'),
        protocol: i('protocol'),
        pathname: i('pathname'),
        title: i('title'),
      }
    }),
      (e.attr = function(t) {
        return i(t)
      }),
      (e.listen = function(t) {})
  },
  function(t, e, r) {
    'use strict'
    var n = r(4)
    t.exports = function() {
      return n.hasUserOptedOutTracking()
    }
  },
  function(t, e) {
    var r = Array.isArray
    t.exports = r
  },
  function(t, e) {
    !(function() {
      'use strict'
      function t(e, r, n, i) {
        return this instanceof t
          ? ((this.domain = e || void 0),
            (this.path = r || '/'),
            (this.secure = !!n),
            (this.script = !!i),
            this)
          : new t(e, r, n, i)
      }
      function r(t, e, n) {
        return t instanceof r
          ? t
          : this instanceof r
          ? ((this.name = null),
            (this.value = null),
            (this.expiration_date = 1 / 0),
            (this.path = String(n || '/')),
            (this.explicit_path = !1),
            (this.domain = e || null),
            (this.explicit_domain = !1),
            (this.secure = !1),
            (this.noscript = !1),
            t && this.parse(t, e, n),
            this)
          : new r(t, e, n)
      }
      ;(t.All = Object.freeze(Object.create(null))),
        (e.CookieAccessInfo = t),
        (e.Cookie = r),
        (r.prototype.toString = function() {
          var t = [this.name + '=' + this.value]
          return (
            this.expiration_date !== 1 / 0 &&
              t.push('expires=' + new Date(this.expiration_date).toGMTString()),
            this.domain && t.push('domain=' + this.domain),
            this.path && t.push('path=' + this.path),
            this.secure && t.push('secure'),
            this.noscript && t.push('httponly'),
            t.join('; ')
          )
        }),
        (r.prototype.toValueString = function() {
          return this.name + '=' + this.value
        })
      var n = /[:](?=\s*[a-zA-Z0-9_\-]+\s*[=])/g
      function i() {
        var t, e
        return this instanceof i
          ? ((t = Object.create(null)),
            (this.setCookie = function(n, i, o) {
              var s, a
              if (
                ((s = (n = new r(n, i, o)).expiration_date <= Date.now()),
                void 0 !== t[n.name])
              ) {
                for (e = t[n.name], a = 0; a < e.length; a += 1)
                  if (e[a].collidesWith(n))
                    return s
                      ? (e.splice(a, 1), 0 === e.length && delete t[n.name], !1)
                      : ((e[a] = n), n)
                return !s && (e.push(n), n)
              }
              return !s && ((t[n.name] = [n]), t[n.name])
            }),
            (this.getCookie = function(r, n) {
              var i, o
              if ((e = t[r]))
                for (o = 0; o < e.length; o += 1)
                  if ((i = e[o]).expiration_date <= Date.now())
                    0 === e.length && delete t[i.name]
                  else if (i.matches(n)) return i
            }),
            (this.getCookies = function(e) {
              var r,
                n,
                i = []
              for (r in t) (n = this.getCookie(r, e)) && i.push(n)
              return (
                (i.toString = function() {
                  return i.join(':')
                }),
                (i.toValueString = function() {
                  return i
                    .map(function(t) {
                      return t.toValueString()
                    })
                    .join(';')
                }),
                i
              )
            }),
            this)
          : new i()
      }
      ;(r.prototype.parse = function(t, e, n) {
        if (this instanceof r) {
          var i,
            o = t.split(';').filter(function(t) {
              return !!t
            }),
            s = o[0].match(/([^=]+)=([\s\S]*)/),
            a = s[1],
            u = s[2]
          for (this.name = a, this.value = u, i = 1; i < o.length; i += 1)
            switch (
              ((a = (s = o[i].match(/([^=]+)(?:=([\s\S]*))?/))[1]
                .trim()
                .toLowerCase()),
              (u = s[2]),
              a)
            ) {
              case 'httponly':
                this.noscript = !0
                break
              case 'expires':
                this.expiration_date = u ? Number(Date.parse(u)) : 1 / 0
                break
              case 'path':
                ;(this.path = u ? u.trim() : ''), (this.explicit_path = !0)
                break
              case 'domain':
                ;(this.domain = u ? u.trim() : ''),
                  (this.explicit_domain = !!this.domain)
                break
              case 'secure':
                this.secure = !0
            }
          return (
            this.explicit_path || (this.path = n || '/'),
            this.explicit_domain || (this.domain = e),
            this
          )
        }
        return new r().parse(t, e, n)
      }),
        (r.prototype.matches = function(e) {
          return (
            e === t.All ||
            !(
              (this.noscript && e.script) ||
              (this.secure && !e.secure) ||
              !this.collidesWith(e)
            )
          )
        }),
        (r.prototype.collidesWith = function(t) {
          if ((this.path && !t.path) || (this.domain && !t.domain)) return !1
          if (this.path && 0 !== t.path.indexOf(this.path)) return !1
          if (this.explicit_path && 0 !== t.path.indexOf(this.path)) return !1
          var e = t.domain && t.domain.replace(/^[\.]/, ''),
            r = this.domain && this.domain.replace(/^[\.]/, '')
          if (r === e) return !0
          if (r) {
            if (!this.explicit_domain) return !1
            var n = e.indexOf(r)
            return -1 !== n && n === e.length - r.length
          }
          return !0
        }),
        (e.CookieJar = i),
        (i.prototype.setCookies = function(t, e, i) {
          var o,
            s,
            a = []
          for (
            t = (t = Array.isArray(t) ? t : t.split(n)).map(function(t) {
              return new r(t, e, i)
            }),
              o = 0;
            o < t.length;
            o += 1
          )
            (s = t[o]), this.setCookie(s, e, i) && a.push(s)
          return a
        })
    })()
  },
  function(t, e, r) {
    'use strict'
    e.OPT_OUT_KEY = '_tl_opt_out_key'
  },
  function(t, e, r) {
    'use strict'
    t.exports = {
      api: r(14),
      init: r(83),
      isReady: r(85),
      identify: r(86),
      track: r(87),
      page: r(88),
      reset: r(89),
      propertiesLoaded: r(90),
      runningExperiments: r(91),
      variable: r(92),
      codeBlock: r(94),
      featureFlagEnabled: r(95),
      runningFeatureFlags: r(96),
      hasUserOptedOutTracking: r(9),
      optOutTracking: r(97),
      optInTracking: r(98),
      startNewSession: r(99),
    }
  },
  function(t, e, r) {
    'use strict'
    ;(e.request = r(3)),
      (e.users = r(23)),
      (e.events = r(28)),
      (e.config = r(27)),
      (e.init = function(t) {
        return (
          !!(t && t._in && t._in.token) &&
          !!this.request.setPublicToken(t._in.token)
        )
      })
  },
  function(t, e, r) {
    'use strict'
    t.exports = function(t) {
      return null !== t && 'object' == typeof t
    }
  },
  function(t, e, r) {
    'use strict'
    t.exports = function() {
      var t = []
      ;(this.length = function() {
        return t.length
      }),
        (this.isEmpty = function() {
          return 0 === t.length
        }),
        (this.enqueue = function(e) {
          t.push(e)
        }),
        (this.enqueueAll = function(t) {
          if (!t || (t && 'array' != typeof t)) return 0
          var e = !0,
            r = !1,
            n = void 0
          try {
            for (
              var i, o = t[Symbol.iterator]();
              !(e = (i = o.next()).done);
              e = !0
            ) {
              var s = i.value
              this.enqueue(s)
            }
          } catch (t) {
            ;(r = !0), (n = t)
          } finally {
            try {
              !e && o.return && o.return()
            } finally {
              if (r) throw n
            }
          }
          return t.length
        }),
        (this.dequeue = function() {
          if (0 !== t.length) return t.shift()
        }),
        (this.flush = function() {
          var e = t.slice()
          return (t = []), e
        }),
        (this.peek = function() {
          return t.length > 0 ? t[0] : void 0
        })
    }
  },
  function(t, e, r) {
    'use strict'
    var n = r(37),
      i = r(38),
      o = r(19)
    t.exports = {
      formats: o,
      parse: i,
      stringify: n,
    }
  },
  function(t, e, r) {
    'use strict'
    var n = Object.prototype.hasOwnProperty,
      i = (function() {
        for (var t = [], e = 0; e < 256; ++e)
          t.push('%' + ((e < 16 ? '0' : '') + e.toString(16)).toUpperCase())
        return t
      })()
    ;(e.arrayToObject = function(t, e) {
      for (
        var r = e && e.plainObjects ? Object.create(null) : {}, n = 0;
        n < t.length;
        ++n
      )
        void 0 !== t[n] && (r[n] = t[n])
      return r
    }),
      (e.merge = function(t, r, i) {
        if (!r) return t
        if ('object' != typeof r) {
          if (Array.isArray(t)) t.push(r)
          else {
            if ('object' != typeof t) return [t, r]
            ;(i.plainObjects ||
              i.allowPrototypes ||
              !n.call(Object.prototype, r)) &&
              (t[r] = !0)
          }
          return t
        }
        if ('object' != typeof t) return [t].concat(r)
        var o = t
        return (
          Array.isArray(t) && !Array.isArray(r) && (o = e.arrayToObject(t, i)),
          Array.isArray(t) && Array.isArray(r)
            ? (r.forEach(function(r, o) {
                n.call(t, o)
                  ? t[o] && 'object' == typeof t[o]
                    ? (t[o] = e.merge(t[o], r, i))
                    : t.push(r)
                  : (t[o] = r)
              }),
              t)
            : Object.keys(r).reduce(function(t, o) {
                var s = r[o]
                return (
                  n.call(t, o) ? (t[o] = e.merge(t[o], s, i)) : (t[o] = s), t
                )
              }, o)
        )
      }),
      (e.assign = function(t, e) {
        return Object.keys(e).reduce(function(t, r) {
          return (t[r] = e[r]), t
        }, t)
      }),
      (e.decode = function(t) {
        try {
          return decodeURIComponent(t.replace(/\+/g, ' '))
        } catch (e) {
          return t
        }
      }),
      (e.encode = function(t) {
        if (0 === t.length) return t
        for (
          var e = 'string' == typeof t ? t : String(t), r = '', n = 0;
          n < e.length;
          ++n
        ) {
          var o = e.charCodeAt(n)
          45 === o ||
          46 === o ||
          95 === o ||
          126 === o ||
          (o >= 48 && o <= 57) ||
          (o >= 65 && o <= 90) ||
          (o >= 97 && o <= 122)
            ? (r += e.charAt(n))
            : o < 128
            ? (r += i[o])
            : o < 2048
            ? (r += i[192 | (o >> 6)] + i[128 | (63 & o)])
            : o < 55296 || o >= 57344
            ? (r +=
                i[224 | (o >> 12)] +
                i[128 | ((o >> 6) & 63)] +
                i[128 | (63 & o)])
            : ((n += 1),
              (o = 65536 + (((1023 & o) << 10) | (1023 & e.charCodeAt(n)))),
              (r +=
                i[240 | (o >> 18)] +
                i[128 | ((o >> 12) & 63)] +
                i[128 | ((o >> 6) & 63)] +
                i[128 | (63 & o)]))
        }
        return r
      }),
      (e.compact = function(t) {
        for (
          var e = [
              {
                obj: {
                  o: t,
                },
                prop: 'o',
              },
            ],
            r = [],
            n = 0;
          n < e.length;
          ++n
        )
          for (
            var i = e[n], o = i.obj[i.prop], s = Object.keys(o), a = 0;
            a < s.length;
            ++a
          ) {
            var u = s[a],
              c = o[u]
            'object' == typeof c &&
              null !== c &&
              -1 === r.indexOf(c) &&
              (e.push({
                obj: o,
                prop: u,
              }),
              r.push(c))
          }
        return (function(t) {
          for (var e; t.length; ) {
            var r = t.pop()
            if (((e = r.obj[r.prop]), Array.isArray(e))) {
              for (var n = [], i = 0; i < e.length; ++i)
                void 0 !== e[i] && n.push(e[i])
              r.obj[r.prop] = n
            }
          }
          return e
        })(e)
      }),
      (e.isRegExp = function(t) {
        return '[object RegExp]' === Object.prototype.toString.call(t)
      }),
      (e.isBuffer = function(t) {
        return (
          null !== t &&
          void 0 !== t &&
          !!(
            t.constructor &&
            t.constructor.isBuffer &&
            t.constructor.isBuffer(t)
          )
        )
      })
  },
  function(t, e, r) {
    'use strict'
    var n = String.prototype.replace,
      i = /%20/g
    t.exports = {
      default: 'RFC3986',
      formatters: {
        RFC1738: function(t) {
          return n.call(t, i, '+')
        },
        RFC3986: function(t) {
          return t
        },
      },
      RFC1738: 'RFC1738',
      RFC3986: 'RFC3986',
    }
  },
  function(t, e) {
    t.exports = function(t, e, r) {
      for (var n = r - 1, i = t.length; ++n < i; ) if (t[n] === e) return n
      return -1
    }
  },
  function(t, e) {
    t.exports = function(t, e) {
      return function(r) {
        return t(e(r))
      }
    }
  },
  function(t, e) {
    var r = Object.prototype.toString
    t.exports = function(t) {
      return r.call(t)
    }
  },
  function(t, e, r) {
    'use strict'
    var n = r(3),
      i = r(0),
      o = r(1)
    ;(e.users_path = 'users'),
      (e.del = function(t) {
        o.sessionConfigPromise(function() {
          var r = o.getAppUserID()
          if (r) {
            var s = {}
            ;(s.sid = o.getSessionID()), (s.ad = o.getDeviceUUID())
            var a = {
              session: s,
            }
            i.log('users_del', a, i.DEBUG),
              n.del(e.users_path + '/' + r, {}, a, function(e, r) {
                return (
                  e
                    ? i.error("Couldn't properly rest user.", r, i.DEBUG)
                    : i.log('Successfully reset the user.', r, i.DEBUG),
                  t && t(e, r)
                )
              })
          }
        })
      }),
      (e.post = function(t, r, s) {
        o.sessionConfigPromise(function() {
          var a = t,
            u = o.getSessionAttributes()
          a || (a = {}), (a.auid = o.getAppUserID())
          var c = new Date(),
            l = {
              session: u,
              app_user: a,
            }
          i.log('users_post', JSON.stringify(l), i.DEBUG),
            n.post(e.users_path, {}, l, function(t, e) {
              if (t) i.error(r, t, i.USER)
              else {
                var n = e.body
                n
                  ? (i.time(
                      'Users.post: successfully created/updated user.',
                      e,
                      c,
                      i.DEBUG
                    ),
                    o.setAppUserID(n.app_user_id),
                    o.setSessionID(n.session_id),
                    o.tick())
                  : i.error(r, null, i.USER)
              }
              return s && s(t, e)
            })
        })
      })
  },
  function(t, e) {
    var r =
      ('undefined' != typeof crypto &&
        crypto.getRandomValues &&
        crypto.getRandomValues.bind(crypto)) ||
      ('undefined' != typeof msCrypto &&
        'function' == typeof window.msCrypto.getRandomValues &&
        msCrypto.getRandomValues.bind(msCrypto))
    if (r) {
      var n = new Uint8Array(16)
      t.exports = function() {
        return r(n), n
      }
    } else {
      var i = new Array(16)
      t.exports = function() {
        for (var t, e = 0; e < 16; e++)
          0 == (3 & e) && (t = 4294967296 * Math.random()),
            (i[e] = (t >>> ((3 & e) << 3)) & 255)
        return i
      }
    }
  },
  function(t, e) {
    for (var r = [], n = 0; n < 256; ++n)
      r[n] = (n + 256).toString(16).substr(1)
    t.exports = function(t, e) {
      var n = e || 0,
        i = r
      return [
        i[t[n++]],
        i[t[n++]],
        i[t[n++]],
        i[t[n++]],
        '-',
        i[t[n++]],
        i[t[n++]],
        '-',
        i[t[n++]],
        i[t[n++]],
        '-',
        i[t[n++]],
        i[t[n++]],
        '-',
        i[t[n++]],
        i[t[n++]],
        i[t[n++]],
        i[t[n++]],
        i[t[n++]],
        i[t[n++]],
      ].join('')
    }
  },
  function(t, e, r) {
    var n = r(24),
      i = r(25)
    t.exports = function(t, e, r) {
      var o = (e && r) || 0
      'string' == typeof t &&
        ((e = 'binary' === t ? new Array(16) : null), (t = null))
      var s = (t = t || {}).random || (t.rng || n)()
      if (((s[6] = (15 & s[6]) | 64), (s[8] = (63 & s[8]) | 128), e))
        for (var a = 0; a < 16; ++a) e[o + a] = s[a]
      return e || i(s)
    }
  },
  function(t, e, r) {
    'use strict'
    var n = r(3),
      i = r(0),
      o = r(1),
      s = r(28),
      a = r(2)
    function u(t) {
      if (!t || !t.winning_variation) return null
      if ('baseline' === t.winning_variation) return 'b'
      var e = !0,
        r = !1,
        n = void 0
      try {
        for (
          var i, o = t.variations[Symbol.iterator]();
          !(e = (i = o.next()).done);
          e = !0
        ) {
          var s = i.value
          if (s && t.winning_variation === s._id) return s
        }
      } catch (t) {
        ;(r = !0), (n = t)
      } finally {
        try {
          !e && o.return && o.return()
        } finally {
          if (r) throw n
        }
      }
      return null
    }
    function c(t) {
      if (0 === t.variations.length) return 'baseline'
      var e = Math.random(),
        r = a.isNumber(t.baseline.distributionPercent)
          ? t.baseline.distributionPercent
          : 0
      if (r && e < r)
        return (
          i.log('Show Baseline For Experiment: ' + t._id, null, i.DEBUG),
          'baseline'
        )
      var n = r,
        o = !0,
        s = !1,
        u = void 0
      try {
        for (
          var c, l = t.variations[Symbol.iterator]();
          !(o = (c = l.next()).done);
          o = !0
        ) {
          var f = c.value
          if (f.distributionPercent && e < (n += f.distributionPercent))
            return (
              i.log(
                'Show Variation: ' + f._id + ', for experiment: ' + t._id,
                null,
                i.DEBUG
              ),
              f
            )
        }
      } catch (t) {
        ;(s = !0), (u = t)
      } finally {
        try {
          !o && l.return && l.return()
        } finally {
          if (s) throw u
        }
      }
      return (
        i.error("Didn't find variation in experiment", null, i.DEBUG),
        'baseline'
      )
    }
    ;(e.fastMode = !1),
      (e.startOptions = null),
      (e.cookieDomain = null),
      (e.userBucketing = !1),
      (e.apiAlias = null),
      (e.pingAlias = null),
      (e.get = function(t) {
        var r = t.skipFastMode,
          a = t.dynamicConfig,
          u = t.user_attributes,
          c = u && u.user_id
        if ((c ? o.setUserID(c) : (c = o.getOrCreateUserID()), a))
          return e.handleDynamicConfig(a)
        if (!r && e.fastMode && !o.test_experiments)
          return e.getFastModeConfig()
        var l = new Date(),
          f = e.buildSessionParams()
        try {
          f.aua = u ? JSON.stringify(u) : void 0
        } catch (t) {
          i.error('config_get: stringify user_attributes JSON', null, i.DEBUG)
        }
        e.userBucketing && (f.uid = c),
          i.log('config_get', f, i.DEBUG),
          n.get('config', f, function(t, e) {
            if (t)
              i.error('Failed to get config', t, i.DEBUG),
                o.saveSessionConfig(null, !0)
            else {
              var r = e.body
              o.saveSessionConfig(r),
                r
                  ? (s.clientConfig(l),
                    i.time(
                      'config.get: successfully got session config data',
                      e,
                      l,
                      i.DEBUG
                    ))
                  : i.error('No config data in response', null, i.DEBUG)
            }
          })
      }),
      (e.handleDynamicConfig = function(t) {
        t &&
          (i.log('handle dynamic config', t, i.DEBUG),
          o.saveSessionConfig(t),
          e.postFastModeConfig())
      }),
      (e.buildSessionParams = function() {
        var t = o.getSessionAttributes()
        return (
          (t.auid = o.getAppUserID()),
          t.prms && (t.prms = JSON.stringify(t.prms)),
          o.test_experiments && (t.uev = JSON.stringify(o.test_experiments)),
          t
        )
      }),
      (e.postFastModeConfig = function() {
        var t = new Date(),
          r = e.buildSessionParams(),
          a = o.config
        if (!a) return i.error('Missing config to POST', null, i.DEBUG)
        e.userBucketing && (r.uid = o.getOrCreateUserID()),
          i.log('config_post', r, i.DEBUG),
          n.post(
            'config',
            r,
            {
              expVarsIds: a.expVarsIds,
            },
            function(e, r) {
              if (e)
                i.error('Failed to post config', e, i.DEBUG),
                  o.saveSessionConfig(a, !0)
              else {
                var n = r.body
                n
                  ? ((a.app_user_id = n.app_user_id),
                    (a.session_id = n.session_id),
                    o.saveSessionConfig(a),
                    s.clientConfig(t),
                    i.time(
                      'config.post: successfully posted session config data',
                      r,
                      t,
                      i.DEBUG
                    ))
                  : (i.error('No config data in post response', null, i.DEBUG),
                    o.saveSessionConfig(a, !0))
              }
            }
          )
      }),
      (e.getFastModeConfig = function() {
        var t = new Date()
        function r() {
          i.log('Skipping fast mode, get server config', null, i.DEBUG),
            e.get({
              skipFastMode: !0,
            })
        }
        i.log('get fastMode config', null, i.DEBUG),
          n.getJSON(n.publicToken + '.json', function(n, a) {
            if (!n && a && a.body) {
              var u = e.buildConfig(a.body)
              u
                ? (o.saveSessionConfig(u),
                  i.time(
                    'config.get: successfully got fast mode config data',
                    a,
                    t,
                    i.DEBUG
                  ),
                  s.fastModeConfig(t),
                  e.postFastModeConfig())
                : (i.error(
                    'No config data in fast mode response',
                    null,
                    i.DEBUG
                  ),
                  r())
            } else i.error('Failed to get config', n, i.DEBUG), r()
          })
      }),
      (e.buildConfig = function(t) {
        var e = o.getCachedConfig(),
          r = (e && e.expVarsNamesHistory && e.expVarsNames) || {},
          n = {},
          s = (e && e.expVarsIds) || {},
          a = {},
          l = {}
        function f(t) {
          if (t && t.length) {
            var e = !0,
              r = !1,
              n = void 0
            try {
              for (
                var o, s = t[Symbol.iterator]();
                !(e = (o = s.next()).done);
                e = !0
              ) {
                var a = o.value
                a.isActive &&
                  (l[a.name]
                    ? i.log(
                        'Warning dynamic variable is used in two experiments, name: ' +
                          a.name,
                        null,
                        i.LOG
                      )
                    : (l[a.name] = a))
              }
            } catch (t) {
              ;(r = !0), (n = t)
            } finally {
              try {
                !e && s.return && s.return()
              } finally {
                if (r) throw n
              }
            }
          }
        }
        function p(t, e) {
          'b' === e || 'baseline' === e
            ? ((a[t.id] = 'b'),
              (r[t.name] = 'baseline'),
              (n[t.name] = 'baseline'),
              f(t.baseline.dynamicVariables))
            : e &&
              ((r[t.name] = e.name),
              (n[t.name] = e.name),
              (a[t.id] = e._id),
              f(e.dynamicVariables))
        }
        function h(t, e) {
          if (!e) return null
          if ('baseline' === e || 'b' === e) return 'b'
          var r = !0,
            n = !1,
            i = void 0
          try {
            for (
              var o, s = t.variations[Symbol.iterator]();
              !(r = (o = s.next()).done);
              r = !0
            ) {
              var a = o.value
              if (a && (a._id === e || a.name === e)) return a
            }
          } catch (t) {
            ;(n = !0), (i = t)
          } finally {
            try {
              !r && s.return && s.return()
            } finally {
              if (n) throw i
            }
          }
        }
        if (t.experiments) {
          var d = !0,
            v = !1,
            m = void 0
          try {
            for (
              var y, g = t.experiments[Symbol.iterator]();
              !(d = (y = g.next()).done);
              d = !0
            ) {
              var _ = y.value,
                b = u(_)
              if (b) p(_, b)
              else {
                if (r[_.name] || s[_.id]) {
                  var w = h(_, s[_.id] || r[_.name])
                  if (w) {
                    p(_, w)
                    continue
                  }
                }
                p(_, c(_))
              }
            }
          } catch (t) {
            ;(v = !0), (m = t)
          } finally {
            try {
              !d && g.return && g.return()
            } finally {
              if (v) throw m
            }
          }
        }
        if (t.variables) {
          var x = !0,
            k = !1,
            D = void 0
          try {
            for (
              var S, O = t.variables[Symbol.iterator]();
              !(x = (S = O.next()).done);
              x = !0
            ) {
              var E = S.value
              l && !l[E.name] && (l[E.name] = E)
            }
          } catch (t) {
            ;(k = !0), (D = t)
          } finally {
            try {
              !x && O.return && O.return()
            } finally {
              if (k) throw D
            }
          }
        }
        return {
          expVarsNamesHistory: r,
          expVarsNames: n,
          cachedExpIds: s,
          expVarsIds: a,
          dynamicVars: l,
        }
      }),
      (e.findWinningVariation = u),
      (e.chooseVariationFromExperiment = c)
  },
  function(t, e, r) {
    'use strict'
    var n = r(3),
      i = r(23),
      o = r(5),
      s = r(0),
      a = r(77),
      u = r(8),
      c = r(16),
      l = r(1),
      f = r(4),
      p = new c(),
      h = {
        active: 'appActive',
        terminate: 'appTerminate',
        config: 'tlClientConfig',
        fastConfig: 'tlFastModeConfig',
        goal: 'goalAchieved',
        pageView: 'viewAppeared',
        pageClose: 'viewDisappeared',
        timeOnPage: 'viewTimeOnPage',
        adobeAnalytics: 'Adobe',
      }
    function d(t, e) {
      var r = new Date()
      return (t.val = (r.getTime() - e.getTime()) / 1e3), p.enqueue(t)
    }
    function v(t) {
      return {
        type: t,
        date: new Date().toISOString(),
        tvKey: u.attr('title'),
        tvCl: u.attr('href'),
        prod: o().production ? 1 : 0,
        data: {
          _tl_view: u.toObject(),
        },
      }
    }
    function m() {
      if (
        (s.log('events.flushQueue: tick.', p, s.LOUD),
        p.isEmpty() || !l.hasLoadedData)
      )
        return e.scheduleTick()
      var t = p.flush(),
        r = l.getSessionID(),
        n = f.getLS(y)
      n &&
        n.length &&
        (s.log(
          'Add ' + n.length + ' events from local storage cache',
          null,
          s.DEBUG
        ),
        (t = t.concat(n)),
        f.expire(y, !0)),
        r ||
          i.post(
            {},
            'Taplytics::events.flushQueue: failed to create sessions. Events will fail to process.'
          ),
        e.post(t, function(r, n) {
          r && p.enqueueAll(t), e.scheduleTick()
        })
    }
    ;(e.types = h),
      (e.watchLifecycleEvents = function() {
        e.appActive()
        m.bind(void 0)
        window.addEventListener('unload', function() {
          s.log('Window on unload', null, s.DEBUG),
            e.appTerminate(),
            (function() {
              if (p.isEmpty() || !l.hasLoadedData) return
              var t = p.flush()
              s.log(
                'save ' + t.length + ' events to local storage',
                p,
                s.DEBUG
              ),
                f.setLS(y, t)
            })()
        })
      }),
      (e.timeOnPage = function(t, e, r, n, i, o) {
        var s = v(h.timeOnPage)
        if (o && o.getTime) {
          var u = new Date().getTime(),
            c = o.getTime()
          s.val = (u - c) / 1e3
        }
        return (
          (s.vKey = e),
          (s.tKey = t),
          (s.tvKey = n),
          (s.tvCl = r),
          i &&
            (s.data = a(s.data || {}, {
              _tl_view: i,
            })),
          p.enqueue(s)
        )
      }),
      (e.scheduleTick = function() {
        var t = m.bind(void 0)
        setTimeout(t, o().eventsFlushQueueTimeout)
      }),
      (e.pageClose = function(t, e, r, n, i) {
        var o = v(h.pageClose)
        return (
          (o.val = new Date().toISOString()),
          (o.vKey = e),
          (o.tKey = t),
          (o.tvKey = n),
          (o.tvCl = r),
          i &&
            (o.data = a(o.data || {}, {
              _tl_view: i,
            })),
          p.enqueue(o)
        )
      }),
      (e.pageView = function(t, e, r) {
        var n = v(h.pageView)
        return (
          r && (n.data = a(n.data, r)),
          (n.val = new Date().toISOString()),
          (n.vKey = e),
          (n.tKey = t),
          p.enqueue(n)
        )
      }),
      (e.goalAchieved = function(t, e, r) {
        var n = v(h.goal)
        return (
          r && (n.data = a(n.data, r)),
          e && (n.val = e),
          (n.gn = t),
          p.enqueue(n)
        )
      }),
      (e.trackAdobeAnalyticsEvents = function(t, e, r) {
        var n = v(h.adobeAnalytics)
        return (
          r && (n.data = a(n.data, r)),
          e && (n.val = e),
          (n.gn = t),
          p.enqueue(n)
        )
      }),
      (e.appActive = function() {
        return p.enqueue(v(h.active))
      }),
      (e.appTerminate = function() {
        return p.enqueue(v(h.terminate))
      }),
      (e.clientConfig = function(t) {
        if (t) return d(v(h.config), t)
      }),
      (e.fastModeConfig = function(t) {
        if (t) return d(v(h.fastConfig), t)
      }),
      (e.post = function(t, e) {
        var r = new Date()
        n.post(
          'events',
          {},
          function(e) {
            var r = {}
            return (
              (r.sid = l.getSessionID()),
              {
                session: r,
                events: t,
              }
            )
          },
          function(t, n) {
            return (
              t
                ? s.error(
                    'Taplytics::events.post: failed to log events',
                    t,
                    s.LOG
                  )
                : s.time(
                    'Taplytics::events.post: succesfully logged events.',
                    n,
                    r,
                    s.DEBUG
                  ),
              e && e(t, n)
            )
          }
        )
      })
    var y = '_tl_eventsQueue'
  },
  function(t, e, r) {
    'use strict'
    var n = r(3),
      i = r(0)
    r(1)
    e.post = function(t, e) {
      if (!t) return i.error('No new variable to post to server', null, i.DEBUG)
      var r = new Date(),
        o = {
          name: t.name,
          createdAt: new Date(),
          variableType: t.defaultType,
          defaultVal: t.stringifyValue
            ? t.stringifyValue(t.defaultValue)
            : t.defaultValue,
        }
      i.log('variable_post', o, i.DEBUG),
        n.post('variable', {}, o, function(t, n) {
          if (t) i.error('Failed to post variable', t, i.DEBUG)
          else {
            var o = n.body
            o &&
              o.name &&
              i.time(
                'Users.post: successfully created new variable.',
                o,
                r,
                i.DEBUG
              )
          }
          return e && e(t)
        })
    }
  },
  function(t, e, r) {
    'use strict'
    var n = r(13),
      i = r(0),
      o = r(5)
    ;(e.Taplytics = window.Taplytics = t.exports = n),
      (e.flushAppQueue = function() {
        if (
          (i.log('flushAppQueue tick', window._tlq, i.LOUD),
          window._tlq && window._tlq instanceof Array)
        ) {
          var t = window._tlq.slice()
          if (
            ((window._tlq = []),
            Array.prototype.sort &&
              t.sort(function(t, e) {
                if (t instanceof Array && e instanceof Array) {
                  if ('init' === t[0] && 'identify' === e[0]) return -1
                  if ('identify' === t[0] && 'init' === e[0]) return 1
                  if ('init' === t[0] || 'identify' === t[0]) return -1
                }
                return 2
              }),
            t.length > 0)
          ) {
            i.log('flushAppQueue: ' + t.length, t, i.LOUD)
            for (var r = 0; r < t.length; r++) {
              var s = t[r],
                a = s.shift(),
                u = s
              if (n[a] && n[a] instanceof Function)
                try {
                  n[a].apply(n, u)
                } catch (t) {
                  i.error(
                    'Attempted to call ' +
                      a +
                      '(' +
                      (u || []).join(',') +
                      '); from the queue but failed!',
                    t,
                    i.USER
                  ),
                    t && t.stack && i.error(t.stack, null, i.DEBUG)
                }
            }
          }
        }
        setTimeout(e.flushAppQueue, o().functionFlushQueueTimeout)
      }),
      e.flushAppQueue()
  },
  function(t, e, r) {
    var n
    'undefined' != typeof window
      ? (n = window)
      : 'undefined' != typeof self
      ? (n = self)
      : (console.warn(
          'Using browser-only version of superagent in non-browser environment'
        ),
        (n = this))
    var i = r(32),
      o = r(33),
      s = r(15),
      a = r(34),
      u = r(36)
    function c() {}
    var l = (e = t.exports = function(t, r) {
      return 'function' == typeof r
        ? new e.Request('GET', t).end(r)
        : 1 == arguments.length
        ? new e.Request('GET', t)
        : new e.Request(t, r)
    })
    ;(e.Request = y),
      (l.getXHR = function() {
        if (
          !(
            !n.XMLHttpRequest ||
            (n.location && 'file:' == n.location.protocol && n.ActiveXObject)
          )
        )
          return new XMLHttpRequest()
        try {
          return new ActiveXObject('Microsoft.XMLHTTP')
        } catch (t) {}
        try {
          return new ActiveXObject('Msxml2.XMLHTTP.6.0')
        } catch (t) {}
        try {
          return new ActiveXObject('Msxml2.XMLHTTP.3.0')
        } catch (t) {}
        try {
          return new ActiveXObject('Msxml2.XMLHTTP')
        } catch (t) {}
        throw Error('Browser-only version of superagent could not find XHR')
      })
    var f = ''.trim
      ? function(t) {
          return t.trim()
        }
      : function(t) {
          return t.replace(/(^\s*|\s*$)/g, '')
        }
    function p(t) {
      if (!s(t)) return t
      var e = []
      for (var r in t) h(e, r, t[r])
      return e.join('&')
    }
    function h(t, e, r) {
      if (null != r)
        if (Array.isArray(r))
          r.forEach(function(r) {
            h(t, e, r)
          })
        else if (s(r)) for (var n in r) h(t, e + '[' + n + ']', r[n])
        else t.push(encodeURIComponent(e) + '=' + encodeURIComponent(r))
      else null === r && t.push(encodeURIComponent(e))
    }
    function d(t) {
      for (var e, r, n = {}, i = t.split('&'), o = 0, s = i.length; o < s; ++o)
        -1 == (r = (e = i[o]).indexOf('='))
          ? (n[decodeURIComponent(e)] = '')
          : (n[decodeURIComponent(e.slice(0, r))] = decodeURIComponent(
              e.slice(r + 1)
            ))
      return n
    }
    function v(t) {
      return /[\/+]json($|[^-\w])/.test(t)
    }
    function m(t) {
      ;(this.req = t),
        (this.xhr = this.req.xhr),
        (this.text =
          ('HEAD' != this.req.method &&
            ('' === this.xhr.responseType ||
              'text' === this.xhr.responseType)) ||
          void 0 === this.xhr.responseType
            ? this.xhr.responseText
            : null),
        (this.statusText = this.req.xhr.statusText)
      var e = this.xhr.status
      1223 === e && (e = 204),
        this._setStatusProperties(e),
        (this.header = this.headers = (function(t) {
          for (
            var e, r, n, i, o = t.split(/\r?\n/), s = {}, a = 0, u = o.length;
            a < u;
            ++a
          )
            -1 !== (e = (r = o[a]).indexOf(':')) &&
              ((n = r.slice(0, e).toLowerCase()),
              (i = f(r.slice(e + 1))),
              (s[n] = i))
          return s
        })(this.xhr.getAllResponseHeaders())),
        (this.header['content-type'] = this.xhr.getResponseHeader(
          'content-type'
        )),
        this._setHeaderProperties(this.header),
        null === this.text && t._responseType
          ? (this.body = this.xhr.response)
          : (this.body =
              'HEAD' != this.req.method
                ? this._parseBody(this.text ? this.text : this.xhr.response)
                : null)
    }
    function y(t, e) {
      var r = this
      ;(this._query = this._query || []),
        (this.method = t),
        (this.url = e),
        (this.header = {}),
        (this._header = {}),
        this.on('end', function() {
          var t,
            e = null,
            n = null
          try {
            n = new m(r)
          } catch (t) {
            return (
              ((e = new Error(
                'Parser is unable to parse the response'
              )).parse = !0),
              (e.original = t),
              r.xhr
                ? ((e.rawResponse =
                    void 0 === r.xhr.responseType
                      ? r.xhr.responseText
                      : r.xhr.response),
                  (e.status = r.xhr.status ? r.xhr.status : null),
                  (e.statusCode = e.status))
                : ((e.rawResponse = null), (e.status = null)),
              r.callback(e)
            )
          }
          r.emit('response', n)
          try {
            r._isResponseOK(n) ||
              (t = new Error(n.statusText || 'Unsuccessful HTTP response'))
          } catch (e) {
            t = e
          }
          t
            ? ((t.original = e),
              (t.response = n),
              (t.status = n.status),
              r.callback(t, n))
            : r.callback(null, n)
        })
    }
    function g(t, e, r) {
      var n = l('DELETE', t)
      return (
        'function' == typeof e && ((r = e), (e = null)),
        e && n.send(e),
        r && n.end(r),
        n
      )
    }
    ;(l.serializeObject = p),
      (l.parseString = d),
      (l.types = {
        html: 'text/html',
        json: 'application/json',
        xml: 'text/xml',
        urlencoded: 'application/x-www-form-urlencoded',
        form: 'application/x-www-form-urlencoded',
        'form-data': 'application/x-www-form-urlencoded',
      }),
      (l.serialize = {
        'application/x-www-form-urlencoded': p,
        'application/json': JSON.stringify,
      }),
      (l.parse = {
        'application/x-www-form-urlencoded': d,
        'application/json': JSON.parse,
      }),
      a(m.prototype),
      (m.prototype._parseBody = function(t) {
        var e = l.parse[this.type]
        return this.req._parser
          ? this.req._parser(this, t)
          : (!e && v(this.type) && (e = l.parse['application/json']),
            e && t && (t.length || t instanceof Object) ? e(t) : null)
      }),
      (m.prototype.toError = function() {
        var t = this.req,
          e = t.method,
          r = t.url,
          n = 'cannot ' + e + ' ' + r + ' (' + this.status + ')',
          i = new Error(n)
        return (i.status = this.status), (i.method = e), (i.url = r), i
      }),
      (l.Response = m),
      i(y.prototype),
      o(y.prototype),
      (y.prototype.type = function(t) {
        return this.set('Content-Type', l.types[t] || t), this
      }),
      (y.prototype.accept = function(t) {
        return this.set('Accept', l.types[t] || t), this
      }),
      (y.prototype.auth = function(t, e, r) {
        1 === arguments.length && (e = ''),
          'object' == typeof e && null !== e && ((r = e), (e = '')),
          r ||
            (r = {
              type: 'function' == typeof btoa ? 'basic' : 'auto',
            })
        return this._auth(t, e, r, function(t) {
          if ('function' == typeof btoa) return btoa(t)
          throw new Error('Cannot use basic auth, btoa is not a function')
        })
      }),
      (y.prototype.query = function(t) {
        return (
          'string' != typeof t && (t = p(t)), t && this._query.push(t), this
        )
      }),
      (y.prototype.attach = function(t, e, r) {
        if (e) {
          if (this._data)
            throw Error("superagent can't mix .send() and .attach()")
          this._getFormData().append(t, e, r || e.name)
        }
        return this
      }),
      (y.prototype._getFormData = function() {
        return (
          this._formData || (this._formData = new n.FormData()), this._formData
        )
      }),
      (y.prototype.callback = function(t, e) {
        if (this._shouldRetry(t, e)) return this._retry()
        var r = this._callback
        this.clearTimeout(),
          t &&
            (this._maxRetries && (t.retries = this._retries - 1),
            this.emit('error', t)),
          r(t, e)
      }),
      (y.prototype.crossDomainError = function() {
        var t = new Error(
          'Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.'
        )
        ;(t.crossDomain = !0),
          (t.status = this.status),
          (t.method = this.method),
          (t.url = this.url),
          this.callback(t)
      }),
      (y.prototype.buffer = y.prototype.ca = y.prototype.agent = function() {
        return (
          console.warn(
            'This is not supported in browser version of superagent'
          ),
          this
        )
      }),
      (y.prototype.pipe = y.prototype.write = function() {
        throw Error(
          'Streaming is not supported in browser version of superagent'
        )
      }),
      (y.prototype._isHost = function(t) {
        return (
          t &&
          'object' == typeof t &&
          !Array.isArray(t) &&
          '[object Object]' !== Object.prototype.toString.call(t)
        )
      }),
      (y.prototype.end = function(t) {
        return (
          this._endCalled &&
            console.warn(
              'Warning: .end() was called twice. This is not supported in superagent'
            ),
          (this._endCalled = !0),
          (this._callback = t || c),
          this._finalizeQueryString(),
          this._end()
        )
      }),
      (y.prototype._end = function() {
        var t = this,
          e = (this.xhr = l.getXHR()),
          r = this._formData || this._data
        this._setTimeouts(),
          (e.onreadystatechange = function() {
            var r = e.readyState
            if (
              (r >= 2 &&
                t._responseTimeoutTimer &&
                clearTimeout(t._responseTimeoutTimer),
              4 == r)
            ) {
              var n
              try {
                n = e.status
              } catch (t) {
                n = 0
              }
              if (!n) {
                if (t.timedout || t._aborted) return
                return t.crossDomainError()
              }
              t.emit('end')
            }
          })
        var n = function(e, r) {
          r.total > 0 && (r.percent = (r.loaded / r.total) * 100),
            (r.direction = e),
            t.emit('progress', r)
        }
        if (this.hasListeners('progress'))
          try {
            ;(e.onprogress = n.bind(null, 'download')),
              e.upload && (e.upload.onprogress = n.bind(null, 'upload'))
          } catch (t) {}
        try {
          this.username && this.password
            ? e.open(this.method, this.url, !0, this.username, this.password)
            : e.open(this.method, this.url, !0)
        } catch (t) {
          return this.callback(t)
        }
        if (
          (this._withCredentials && (e.withCredentials = !0),
          !this._formData &&
            'GET' != this.method &&
            'HEAD' != this.method &&
            'string' != typeof r &&
            !this._isHost(r))
        ) {
          var i = this._header['content-type'],
            o = this._serializer || l.serialize[i ? i.split(';')[0] : '']
          !o && v(i) && (o = l.serialize['application/json']), o && (r = o(r))
        }
        for (var s in this.header)
          null != this.header[s] &&
            this.header.hasOwnProperty(s) &&
            e.setRequestHeader(s, this.header[s])
        return (
          this._responseType && (e.responseType = this._responseType),
          this.emit('request', this),
          e.send(void 0 !== r ? r : null),
          this
        )
      }),
      (l.agent = function() {
        return new u()
      }),
      ['GET', 'POST', 'OPTIONS', 'PATCH', 'PUT', 'DELETE'].forEach(function(t) {
        u.prototype[t.toLowerCase()] = function(e, r) {
          var n = new l.Request(t, e)
          return this._setDefaults(n), r && n.end(r), n
        }
      }),
      (u.prototype.del = u.prototype.delete),
      (l.get = function(t, e, r) {
        var n = l('GET', t)
        return (
          'function' == typeof e && ((r = e), (e = null)),
          e && n.query(e),
          r && n.end(r),
          n
        )
      }),
      (l.head = function(t, e, r) {
        var n = l('HEAD', t)
        return (
          'function' == typeof e && ((r = e), (e = null)),
          e && n.query(e),
          r && n.end(r),
          n
        )
      }),
      (l.options = function(t, e, r) {
        var n = l('OPTIONS', t)
        return (
          'function' == typeof e && ((r = e), (e = null)),
          e && n.send(e),
          r && n.end(r),
          n
        )
      }),
      (l.del = g),
      (l.delete = g),
      (l.patch = function(t, e, r) {
        var n = l('PATCH', t)
        return (
          'function' == typeof e && ((r = e), (e = null)),
          e && n.send(e),
          r && n.end(r),
          n
        )
      }),
      (l.post = function(t, e, r) {
        var n = l('POST', t)
        return (
          'function' == typeof e && ((r = e), (e = null)),
          e && n.send(e),
          r && n.end(r),
          n
        )
      }),
      (l.put = function(t, e, r) {
        var n = l('PUT', t)
        return (
          'function' == typeof e && ((r = e), (e = null)),
          e && n.send(e),
          r && n.end(r),
          n
        )
      })
  },
  function(t, e, r) {
    function n(t) {
      if (t)
        return (function(t) {
          for (var e in n.prototype) t[e] = n.prototype[e]
          return t
        })(t)
    }
    ;(t.exports = n),
      (n.prototype.on = n.prototype.addEventListener = function(t, e) {
        return (
          (this._callbacks = this._callbacks || {}),
          (this._callbacks['$' + t] = this._callbacks['$' + t] || []).push(e),
          this
        )
      }),
      (n.prototype.once = function(t, e) {
        function r() {
          this.off(t, r), e.apply(this, arguments)
        }
        return (r.fn = e), this.on(t, r), this
      }),
      (n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function(
        t,
        e
      ) {
        if (((this._callbacks = this._callbacks || {}), 0 == arguments.length))
          return (this._callbacks = {}), this
        var r,
          n = this._callbacks['$' + t]
        if (!n) return this
        if (1 == arguments.length) return delete this._callbacks['$' + t], this
        for (var i = 0; i < n.length; i++)
          if ((r = n[i]) === e || r.fn === e) {
            n.splice(i, 1)
            break
          }
        return this
      }),
      (n.prototype.emit = function(t) {
        this._callbacks = this._callbacks || {}
        var e = [].slice.call(arguments, 1),
          r = this._callbacks['$' + t]
        if (r)
          for (var n = 0, i = (r = r.slice(0)).length; n < i; ++n)
            r[n].apply(this, e)
        return this
      }),
      (n.prototype.listeners = function(t) {
        return (
          (this._callbacks = this._callbacks || {}),
          this._callbacks['$' + t] || []
        )
      }),
      (n.prototype.hasListeners = function(t) {
        return !!this.listeners(t).length
      })
  },
  function(t, e, r) {
    'use strict'
    var n = r(15)
    function i(t) {
      if (t)
        return (function(t) {
          for (var e in i.prototype) t[e] = i.prototype[e]
          return t
        })(t)
    }
    ;(t.exports = i),
      (i.prototype.clearTimeout = function() {
        return (
          clearTimeout(this._timer),
          clearTimeout(this._responseTimeoutTimer),
          delete this._timer,
          delete this._responseTimeoutTimer,
          this
        )
      }),
      (i.prototype.parse = function(t) {
        return (this._parser = t), this
      }),
      (i.prototype.responseType = function(t) {
        return (this._responseType = t), this
      }),
      (i.prototype.serialize = function(t) {
        return (this._serializer = t), this
      }),
      (i.prototype.timeout = function(t) {
        if (!t || 'object' != typeof t)
          return (this._timeout = t), (this._responseTimeout = 0), this
        for (var e in t)
          switch (e) {
            case 'deadline':
              this._timeout = t.deadline
              break
            case 'response':
              this._responseTimeout = t.response
              break
            default:
              console.warn('Unknown timeout option', e)
          }
        return this
      }),
      (i.prototype.retry = function(t, e) {
        return (
          (0 !== arguments.length && !0 !== t) || (t = 1),
          t <= 0 && (t = 0),
          (this._maxRetries = t),
          (this._retries = 0),
          (this._retryCallback = e),
          this
        )
      })
    var o = ['ECONNRESET', 'ETIMEDOUT', 'EADDRINFO', 'ESOCKETTIMEDOUT']
    ;(i.prototype._shouldRetry = function(t, e) {
      if (!this._maxRetries || this._retries++ >= this._maxRetries) return !1
      if (this._retryCallback)
        try {
          var r = this._retryCallback(t, e)
          if (!0 === r) return !0
          if (!1 === r) return !1
        } catch (t) {
          console.error(t)
        }
      if (e && e.status && e.status >= 500 && 501 != e.status) return !0
      if (t) {
        if (t.code && ~o.indexOf(t.code)) return !0
        if (t.timeout && 'ECONNABORTED' == t.code) return !0
        if (t.crossDomain) return !0
      }
      return !1
    }),
      (i.prototype._retry = function() {
        return (
          this.clearTimeout(),
          this.req && ((this.req = null), (this.req = this.request())),
          (this._aborted = !1),
          (this.timedout = !1),
          this._end()
        )
      }),
      (i.prototype.then = function(t, e) {
        if (!this._fullfilledPromise) {
          var r = this
          this._endCalled &&
            console.warn(
              'Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises'
            ),
            (this._fullfilledPromise = new Promise(function(t, e) {
              r.end(function(r, n) {
                r ? e(r) : t(n)
              })
            }))
        }
        return this._fullfilledPromise.then(t, e)
      }),
      (i.prototype.catch = function(t) {
        return this.then(void 0, t)
      }),
      (i.prototype.use = function(t) {
        return t(this), this
      }),
      (i.prototype.ok = function(t) {
        if ('function' != typeof t) throw Error('Callback required')
        return (this._okCallback = t), this
      }),
      (i.prototype._isResponseOK = function(t) {
        return (
          !!t &&
          (this._okCallback
            ? this._okCallback(t)
            : t.status >= 200 && t.status < 300)
        )
      }),
      (i.prototype.get = function(t) {
        return this._header[t.toLowerCase()]
      }),
      (i.prototype.getHeader = i.prototype.get),
      (i.prototype.set = function(t, e) {
        if (n(t)) {
          for (var r in t) this.set(r, t[r])
          return this
        }
        return (this._header[t.toLowerCase()] = e), (this.header[t] = e), this
      }),
      (i.prototype.unset = function(t) {
        return delete this._header[t.toLowerCase()], delete this.header[t], this
      }),
      (i.prototype.field = function(t, e) {
        if (null === t || void 0 === t)
          throw new Error('.field(name, val) name can not be empty')
        if (
          (this._data &&
            console.error(
              ".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()"
            ),
          n(t))
        ) {
          for (var r in t) this.field(r, t[r])
          return this
        }
        if (Array.isArray(e)) {
          for (var i in e) this.field(t, e[i])
          return this
        }
        if (null === e || void 0 === e)
          throw new Error('.field(name, val) val can not be empty')
        return (
          'boolean' == typeof e && (e = '' + e),
          this._getFormData().append(t, e),
          this
        )
      }),
      (i.prototype.abort = function() {
        return this._aborted
          ? this
          : ((this._aborted = !0),
            this.xhr && this.xhr.abort(),
            this.req && this.req.abort(),
            this.clearTimeout(),
            this.emit('abort'),
            this)
      }),
      (i.prototype._auth = function(t, e, r, n) {
        switch (r.type) {
          case 'basic':
            this.set('Authorization', 'Basic ' + n(t + ':' + e))
            break
          case 'auto':
            ;(this.username = t), (this.password = e)
            break
          case 'bearer':
            this.set('Authorization', 'Bearer ' + t)
        }
        return this
      }),
      (i.prototype.withCredentials = function(t) {
        return void 0 == t && (t = !0), (this._withCredentials = t), this
      }),
      (i.prototype.redirects = function(t) {
        return (this._maxRedirects = t), this
      }),
      (i.prototype.maxResponseSize = function(t) {
        if ('number' != typeof t) throw TypeError('Invalid argument')
        return (this._maxResponseSize = t), this
      }),
      (i.prototype.toJSON = function() {
        return {
          method: this.method,
          url: this.url,
          data: this._data,
          headers: this._header,
        }
      }),
      (i.prototype.send = function(t) {
        var e = n(t),
          r = this._header['content-type']
        if (
          (this._formData &&
            console.error(
              ".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()"
            ),
          e && !this._data)
        )
          Array.isArray(t)
            ? (this._data = [])
            : this._isHost(t) || (this._data = {})
        else if (t && this._data && this._isHost(this._data))
          throw Error("Can't merge these send calls")
        if (e && n(this._data)) for (var i in t) this._data[i] = t[i]
        else
          'string' == typeof t
            ? (r || this.type('form'),
              (r = this._header['content-type']),
              (this._data =
                'application/x-www-form-urlencoded' == r
                  ? this._data
                    ? this._data + '&' + t
                    : t
                  : (this._data || '') + t))
            : (this._data = t)
        return !e || this._isHost(t) ? this : (r || this.type('json'), this)
      }),
      (i.prototype.sortQuery = function(t) {
        return (this._sort = void 0 === t || t), this
      }),
      (i.prototype._finalizeQueryString = function() {
        var t = this._query.join('&')
        if (
          (t && (this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + t),
          (this._query.length = 0),
          this._sort)
        ) {
          var e = this.url.indexOf('?')
          if (e >= 0) {
            var r = this.url.substring(e + 1).split('&')
            'function' == typeof this._sort ? r.sort(this._sort) : r.sort(),
              (this.url = this.url.substring(0, e) + '?' + r.join('&'))
          }
        }
      }),
      (i.prototype._appendQueryString = function() {
        console.trace('Unsupported')
      }),
      (i.prototype._timeoutError = function(t, e, r) {
        if (!this._aborted) {
          var n = new Error(t + e + 'ms exceeded')
          ;(n.timeout = e),
            (n.code = 'ECONNABORTED'),
            (n.errno = r),
            (this.timedout = !0),
            this.abort(),
            this.callback(n)
        }
      }),
      (i.prototype._setTimeouts = function() {
        var t = this
        this._timeout &&
          !this._timer &&
          (this._timer = setTimeout(function() {
            t._timeoutError('Timeout of ', t._timeout, 'ETIME')
          }, this._timeout)),
          this._responseTimeout &&
            !this._responseTimeoutTimer &&
            (this._responseTimeoutTimer = setTimeout(function() {
              t._timeoutError(
                'Response timeout of ',
                t._responseTimeout,
                'ETIMEDOUT'
              )
            }, this._responseTimeout))
      })
  },
  function(t, e, r) {
    'use strict'
    var n = r(35)
    function i(t) {
      if (t)
        return (function(t) {
          for (var e in i.prototype) t[e] = i.prototype[e]
          return t
        })(t)
    }
    ;(t.exports = i),
      (i.prototype.get = function(t) {
        return this.header[t.toLowerCase()]
      }),
      (i.prototype._setHeaderProperties = function(t) {
        var e = t['content-type'] || ''
        this.type = n.type(e)
        var r = n.params(e)
        for (var i in r) this[i] = r[i]
        this.links = {}
        try {
          t.link && (this.links = n.parseLinks(t.link))
        } catch (t) {}
      }),
      (i.prototype._setStatusProperties = function(t) {
        var e = (t / 100) | 0
        ;(this.status = this.statusCode = t),
          (this.statusType = e),
          (this.info = 1 == e),
          (this.ok = 2 == e),
          (this.redirect = 3 == e),
          (this.clientError = 4 == e),
          (this.serverError = 5 == e),
          (this.error = (4 == e || 5 == e) && this.toError()),
          (this.accepted = 202 == t),
          (this.noContent = 204 == t),
          (this.badRequest = 400 == t),
          (this.unauthorized = 401 == t),
          (this.notAcceptable = 406 == t),
          (this.forbidden = 403 == t),
          (this.notFound = 404 == t)
      })
  },
  function(t, e, r) {
    'use strict'
    ;(e.type = function(t) {
      return t.split(/ *; */).shift()
    }),
      (e.params = function(t) {
        return t.split(/ *; */).reduce(function(t, e) {
          var r = e.split(/ *= */),
            n = r.shift(),
            i = r.shift()
          return n && i && (t[n] = i), t
        }, {})
      }),
      (e.parseLinks = function(t) {
        return t.split(/ *, */).reduce(function(t, e) {
          var r = e.split(/ *; */),
            n = r[0].slice(1, -1)
          return (t[r[1].split(/ *= */)[1].slice(1, -1)] = n), t
        }, {})
      }),
      (e.cleanHeader = function(t, e) {
        return (
          delete t['content-type'],
          delete t['content-length'],
          delete t['transfer-encoding'],
          delete t.host,
          e && (delete t.authorization, delete t.cookie),
          t
        )
      })
  },
  function(t, e) {
    function r() {
      this._defaults = []
    }
    ;[
      'use',
      'on',
      'once',
      'set',
      'query',
      'type',
      'accept',
      'auth',
      'withCredentials',
      'sortQuery',
      'retry',
      'ok',
      'redirects',
      'timeout',
      'buffer',
      'serialize',
      'parse',
      'ca',
      'key',
      'pfx',
      'cert',
    ].forEach(function(t) {
      r.prototype[t] = function() {
        return (
          this._defaults.push({
            fn: t,
            arguments: arguments,
          }),
          this
        )
      }
    }),
      (r.prototype._setDefaults = function(t) {
        this._defaults.forEach(function(e) {
          t[e.fn].apply(t, e.arguments)
        })
      }),
      (t.exports = r)
  },
  function(t, e, r) {
    'use strict'
    var n = r(18),
      i = r(19),
      o = {
        brackets: function(t) {
          return t + '[]'
        },
        indices: function(t, e) {
          return t + '[' + e + ']'
        },
        repeat: function(t) {
          return t
        },
      },
      s = Date.prototype.toISOString,
      a = {
        delimiter: '&',
        encode: !0,
        encoder: n.encode,
        encodeValuesOnly: !1,
        serializeDate: function(t) {
          return s.call(t)
        },
        skipNulls: !1,
        strictNullHandling: !1,
      },
      u = function t(e, r, i, o, s, u, c, l, f, p, h, d) {
        var v = e
        if ('function' == typeof c) v = c(r, v)
        else if (v instanceof Date) v = p(v)
        else if (null === v) {
          if (o) return u && !d ? u(r, a.encoder) : r
          v = ''
        }
        if (
          'string' == typeof v ||
          'number' == typeof v ||
          'boolean' == typeof v ||
          n.isBuffer(v)
        )
          return u
            ? [h(d ? r : u(r, a.encoder)) + '=' + h(u(v, a.encoder))]
            : [h(r) + '=' + h(String(v))]
        var m,
          y = []
        if (void 0 === v) return y
        if (Array.isArray(c)) m = c
        else {
          var g = Object.keys(v)
          m = l ? g.sort(l) : g
        }
        for (var _ = 0; _ < m.length; ++_) {
          var b = m[_]
          ;(s && null === v[b]) ||
            (y = Array.isArray(v)
              ? y.concat(t(v[b], i(r, b), i, o, s, u, c, l, f, p, h, d))
              : y.concat(
                  t(
                    v[b],
                    r + (f ? '.' + b : '[' + b + ']'),
                    i,
                    o,
                    s,
                    u,
                    c,
                    l,
                    f,
                    p,
                    h,
                    d
                  )
                ))
        }
        return y
      }
    t.exports = function(t, e) {
      var r = t,
        s = e ? n.assign({}, e) : {}
      if (
        null !== s.encoder &&
        void 0 !== s.encoder &&
        'function' != typeof s.encoder
      )
        throw new TypeError('Encoder has to be a function.')
      var c = void 0 === s.delimiter ? a.delimiter : s.delimiter,
        l =
          'boolean' == typeof s.strictNullHandling
            ? s.strictNullHandling
            : a.strictNullHandling,
        f = 'boolean' == typeof s.skipNulls ? s.skipNulls : a.skipNulls,
        p = 'boolean' == typeof s.encode ? s.encode : a.encode,
        h = 'function' == typeof s.encoder ? s.encoder : a.encoder,
        d = 'function' == typeof s.sort ? s.sort : null,
        v = void 0 !== s.allowDots && s.allowDots,
        m =
          'function' == typeof s.serializeDate
            ? s.serializeDate
            : a.serializeDate,
        y =
          'boolean' == typeof s.encodeValuesOnly
            ? s.encodeValuesOnly
            : a.encodeValuesOnly
      if (void 0 === s.format) s.format = i.default
      else if (!Object.prototype.hasOwnProperty.call(i.formatters, s.format))
        throw new TypeError('Unknown format option provided.')
      var g,
        _,
        b = i.formatters[s.format]
      'function' == typeof s.filter
        ? (r = (_ = s.filter)('', r))
        : Array.isArray(s.filter) && (g = _ = s.filter)
      var w,
        x = []
      if ('object' != typeof r || null === r) return ''
      w =
        s.arrayFormat in o
          ? s.arrayFormat
          : 'indices' in s
          ? s.indices
            ? 'indices'
            : 'repeat'
          : 'indices'
      var k = o[w]
      g || (g = Object.keys(r)), d && g.sort(d)
      for (var D = 0; D < g.length; ++D) {
        var S = g[D]
        ;(f && null === r[S]) ||
          (x = x.concat(u(r[S], S, k, l, f, p ? h : null, _, d, v, m, b, y)))
      }
      var O = x.join(c),
        E = !0 === s.addQueryPrefix ? '?' : ''
      return O.length > 0 ? E + O : ''
    }
  },
  function(t, e, r) {
    'use strict'
    var n = r(18),
      i = Object.prototype.hasOwnProperty,
      o = {
        allowDots: !1,
        allowPrototypes: !1,
        arrayLimit: 20,
        decoder: n.decode,
        delimiter: '&',
        depth: 5,
        parameterLimit: 1e3,
        plainObjects: !1,
        strictNullHandling: !1,
      },
      s = function(t, e, r) {
        if (t) {
          var n = r.allowDots ? t.replace(/\.([^.[]+)/g, '[$1]') : t,
            o = /(\[[^[\]]*])/g,
            s = /(\[[^[\]]*])/.exec(n),
            a = s ? n.slice(0, s.index) : n,
            u = []
          if (a) {
            if (
              !r.plainObjects &&
              i.call(Object.prototype, a) &&
              !r.allowPrototypes
            )
              return
            u.push(a)
          }
          for (var c = 0; null !== (s = o.exec(n)) && c < r.depth; ) {
            if (
              ((c += 1),
              !r.plainObjects &&
                i.call(Object.prototype, s[1].slice(1, -1)) &&
                !r.allowPrototypes)
            )
              return
            u.push(s[1])
          }
          return (
            s && u.push('[' + n.slice(s.index) + ']'),
            (function(t, e, r) {
              for (var n = e, i = t.length - 1; i >= 0; --i) {
                var o,
                  s = t[i]
                if ('[]' === s) o = (o = []).concat(n)
                else {
                  o = r.plainObjects ? Object.create(null) : {}
                  var a =
                      '[' === s.charAt(0) && ']' === s.charAt(s.length - 1)
                        ? s.slice(1, -1)
                        : s,
                    u = parseInt(a, 10)
                  !isNaN(u) &&
                  s !== a &&
                  String(u) === a &&
                  u >= 0 &&
                  r.parseArrays &&
                  u <= r.arrayLimit
                    ? ((o = [])[u] = n)
                    : (o[a] = n)
                }
                n = o
              }
              return n
            })(u, e, r)
          )
        }
      }
    t.exports = function(t, e) {
      var r = e ? n.assign({}, e) : {}
      if (
        null !== r.decoder &&
        void 0 !== r.decoder &&
        'function' != typeof r.decoder
      )
        throw new TypeError('Decoder has to be a function.')
      if (
        ((r.ignoreQueryPrefix = !0 === r.ignoreQueryPrefix),
        (r.delimiter =
          'string' == typeof r.delimiter || n.isRegExp(r.delimiter)
            ? r.delimiter
            : o.delimiter),
        (r.depth = 'number' == typeof r.depth ? r.depth : o.depth),
        (r.arrayLimit =
          'number' == typeof r.arrayLimit ? r.arrayLimit : o.arrayLimit),
        (r.parseArrays = !1 !== r.parseArrays),
        (r.decoder = 'function' == typeof r.decoder ? r.decoder : o.decoder),
        (r.allowDots =
          'boolean' == typeof r.allowDots ? r.allowDots : o.allowDots),
        (r.plainObjects =
          'boolean' == typeof r.plainObjects ? r.plainObjects : o.plainObjects),
        (r.allowPrototypes =
          'boolean' == typeof r.allowPrototypes
            ? r.allowPrototypes
            : o.allowPrototypes),
        (r.parameterLimit =
          'number' == typeof r.parameterLimit
            ? r.parameterLimit
            : o.parameterLimit),
        (r.strictNullHandling =
          'boolean' == typeof r.strictNullHandling
            ? r.strictNullHandling
            : o.strictNullHandling),
        '' === t || null === t || void 0 === t)
      )
        return r.plainObjects ? Object.create(null) : {}
      for (
        var a =
            'string' == typeof t
              ? (function(t, e) {
                  for (
                    var r = {},
                      n = e.ignoreQueryPrefix ? t.replace(/^\?/, '') : t,
                      s =
                        e.parameterLimit === 1 / 0 ? void 0 : e.parameterLimit,
                      a = n.split(e.delimiter, s),
                      u = 0;
                    u < a.length;
                    ++u
                  ) {
                    var c,
                      l,
                      f = a[u],
                      p = f.indexOf(']='),
                      h = -1 === p ? f.indexOf('=') : p + 1
                    ;-1 === h
                      ? ((c = e.decoder(f, o.decoder)),
                        (l = e.strictNullHandling ? null : ''))
                      : ((c = e.decoder(f.slice(0, h), o.decoder)),
                        (l = e.decoder(f.slice(h + 1), o.decoder))),
                      i.call(r, c)
                        ? (r[c] = [].concat(r[c]).concat(l))
                        : (r[c] = l)
                  }
                  return r
                })(t, r)
              : t,
          u = r.plainObjects ? Object.create(null) : {},
          c = Object.keys(a),
          l = 0;
        l < c.length;
        ++l
      ) {
        var f = c[l],
          p = s(f, a[f], r)
        u = n.merge(u, p, r)
      }
      return n.compact(u)
    }
  },
  function(t, e) {
    t.exports = function(t, e) {
      for (
        var r = -1, n = null == t ? 0 : t.length;
        ++r < n && !1 !== e(t[r], r, t);

      );
      return t
    }
  },
  function(t, e, r) {
    var n = r(41)
    t.exports = function(t, e) {
      return n(t, e)
    }
  },
  function(t, e, r) {
    var n = r(42),
      i = r(7)
    t.exports = function t(e, r, o, s, a) {
      return (
        e === r ||
        (null == e || null == r || (!i(e) && !i(r))
          ? e != e && r != r
          : n(e, r, o, s, t, a))
      )
    }
  },
  function(t, e, r) {
    var n = r(43),
      i = r(50),
      o = r(54),
      s = r(55),
      a = r(57),
      u = r(10),
      c = r(58),
      l = r(59),
      f = 1,
      p = '[object Arguments]',
      h = '[object Array]',
      d = '[object Object]',
      v = Object.prototype.hasOwnProperty
    t.exports = function(t, e, r, m, y, g) {
      var _ = u(t),
        b = u(e),
        w = _ ? h : a(t),
        x = b ? h : a(e),
        k = (w = w == p ? d : w) == d,
        D = (x = x == p ? d : x) == d,
        S = w == x
      if (S && c(t)) {
        if (!c(e)) return !1
        ;(_ = !0), (k = !1)
      }
      if (S && !k)
        return (
          g || (g = new n()),
          _ || l(t) ? i(t, e, r, m, y, g) : o(t, e, w, r, m, y, g)
        )
      if (!(r & f)) {
        var O = k && v.call(t, '__wrapped__'),
          E = D && v.call(e, '__wrapped__')
        if (O || E) {
          var T = O ? t.value() : t,
            U = E ? e.value() : e
          return g || (g = new n()), y(T, U, r, m, g)
        }
      }
      return !!S && (g || (g = new n()), s(t, e, r, m, y, g))
    }
  },
  function(t, e, r) {
    var n = r(44),
      i = r(45),
      o = r(47),
      s = r(48),
      a = r(49)
    function u(t) {
      var e = -1,
        r = null == t ? 0 : t.length
      for (this.clear(); ++e < r; ) {
        var n = t[e]
        this.set(n[0], n[1])
      }
    }
    ;(u.prototype.clear = n),
      (u.prototype.delete = i),
      (u.prototype.get = o),
      (u.prototype.has = s),
      (u.prototype.set = a),
      (t.exports = u)
  },
  function(t, e) {
    t.exports = function() {
      ;(this.__data__ = []), (this.size = 0)
    }
  },
  function(t, e, r) {
    var n = r(6),
      i = Array.prototype.splice
    t.exports = function(t) {
      var e = this.__data__,
        r = n(e, t)
      return !(
        r < 0 || (r == e.length - 1 ? e.pop() : i.call(e, r, 1), --this.size, 0)
      )
    }
  },
  function(t, e) {
    t.exports = function(t, e) {
      return t === e || (t != t && e != e)
    }
  },
  function(t, e, r) {
    var n = r(6)
    t.exports = function(t) {
      var e = this.__data__,
        r = n(e, t)
      return r < 0 ? void 0 : e[r][1]
    }
  },
  function(t, e, r) {
    var n = r(6)
    t.exports = function(t) {
      return n(this.__data__, t) > -1
    }
  },
  function(t, e, r) {
    var n = r(6)
    t.exports = function(t, e) {
      var r = this.__data__,
        i = n(r, t)
      return i < 0 ? (++this.size, r.push([t, e])) : (r[i][1] = e), this
    }
  },
  function(t, e, r) {
    var n = r(51),
      i = r(52),
      o = r(53),
      s = 1,
      a = 2
    t.exports = function(t, e, r, u, c, l) {
      var f = r & s,
        p = t.length,
        h = e.length
      if (p != h && !(f && h > p)) return !1
      var d = l.get(t)
      if (d && l.get(e)) return d == e
      var v = -1,
        m = !0,
        y = r & a ? new n() : void 0
      for (l.set(t, e), l.set(e, t); ++v < p; ) {
        var g = t[v],
          _ = e[v]
        if (u) var b = f ? u(_, g, v, e, t, l) : u(g, _, v, t, e, l)
        if (void 0 !== b) {
          if (b) continue
          m = !1
          break
        }
        if (y) {
          if (
            !i(e, function(t, e) {
              if (!o(y, e) && (g === t || c(g, t, r, u, l))) return y.push(e)
            })
          ) {
            m = !1
            break
          }
        } else if (g !== _ && !c(g, _, r, u, l)) {
          m = !1
          break
        }
      }
      return l.delete(t), l.delete(e), m
    }
  },
  function(t, e, r) {
    var n = r(10)
    t.exports = function() {
      if (!arguments.length) return []
      var t = arguments[0]
      return n(t) ? t : [t]
    }
  },
  function(t, e) {
    t.exports = function(t, e) {
      for (var r = -1, n = null == t ? 0 : t.length; ++r < n; )
        if (e(t[r], r, t)) return !0
      return !1
    }
  },
  function(t, e, r) {
    var n = r(20)
    t.exports = function(t, e) {
      return !(null == t || !t.length) && n(t, e, 0) > -1
    }
  },
  function(t, e) {
    t.exports = function(t, e) {
      return t === e || (t != t && e != e)
    }
  },
  function(t, e, r) {
    var n = r(56),
      i = 1,
      o = Object.prototype.hasOwnProperty
    t.exports = function(t, e, r, s, a, u) {
      var c = r & i,
        l = n(t),
        f = l.length
      if (f != n(e).length && !c) return !1
      for (var p = f; p--; ) {
        var h = l[p]
        if (!(c ? h in e : o.call(e, h))) return !1
      }
      var d = u.get(t)
      if (d && u.get(e)) return d == e
      var v = !0
      u.set(t, e), u.set(e, t)
      for (var m = c; ++p < f; ) {
        var y = t[(h = l[p])],
          g = e[h]
        if (s) var _ = c ? s(g, y, h, e, t, u) : s(y, g, h, t, e, u)
        if (!(void 0 === _ ? y === g || a(y, g, r, s, u) : _)) {
          v = !1
          break
        }
        m || (m = 'constructor' == h)
      }
      if (v && !m) {
        var b = t.constructor,
          w = e.constructor
        b != w &&
          'constructor' in t &&
          'constructor' in e &&
          !(
            'function' == typeof b &&
            b instanceof b &&
            'function' == typeof w &&
            w instanceof w
          ) &&
          (v = !1)
      }
      return u.delete(t), u.delete(e), v
    }
  },
  function(t, e, r) {
    var n = r(21)(Object.keys, Object)
    t.exports = n
  },
  function(t, e) {
    var r = Object.prototype.toString
    t.exports = function(t) {
      return r.call(t)
    }
  },
  function(t, e) {
    t.exports = function() {
      return !1
    }
  },
  function(t, e) {
    t.exports = function() {
      return !1
    }
  },
  function(t, e, r) {
    var n = r(20)
    t.exports = function(t, e) {
      return !(null == t || !t.length) && n(t, e, 0) > -1
    }
  },
  function(t, e, r) {
    var n = r(62),
      i = r(64)
    t.exports = function(t) {
      return null == t ? [] : n(t, i(t))
    }
  },
  function(t, e, r) {
    var n = r(63)
    t.exports = function(t, e) {
      return n(e, function(e) {
        return t[e]
      })
    }
  },
  function(t, e) {
    t.exports = function(t, e) {
      for (var r = -1, n = null == t ? 0 : t.length, i = Array(n); ++r < n; )
        i[r] = e(t[r], r, t)
      return i
    }
  },
  function(t, e, r) {
    var n = r(21)(Object.keys, Object)
    t.exports = n
  },
  function(t, e, r) {
    var n = r(22),
      i = r(10),
      o = r(7),
      s = '[object String]'
    t.exports = function(t) {
      return 'string' == typeof t || (!i(t) && o(t) && n(t) == s)
    }
  },
  function(t, e, r) {
    var n = r(22),
      i = r(7),
      o = '[object Number]'
    t.exports = function(t) {
      return 'number' == typeof t || (i(t) && n(t) == o)
    }
  },
  function(t, e, r) {
    var n = r(68),
      i = r(69),
      o = r(73),
      s = 'Expected a function',
      a = Math.max,
      u = Math.min
    t.exports = function(t, e, r) {
      var c,
        l,
        f,
        p,
        h,
        d,
        v = 0,
        m = !1,
        y = !1,
        g = !0
      if ('function' != typeof t) throw new TypeError(s)
      function _(e) {
        var r = c,
          n = l
        return (c = l = void 0), (v = e), (p = t.apply(n, r))
      }
      function b(t) {
        var r = t - d
        return void 0 === d || r >= e || r < 0 || (y && t - v >= f)
      }
      function w() {
        var t = i()
        if (b(t)) return x(t)
        h = setTimeout(
          w,
          (function(t) {
            var r = e - (t - d)
            return y ? u(r, f - (t - v)) : r
          })(t)
        )
      }
      function x(t) {
        return (h = void 0), g && c ? _(t) : ((c = l = void 0), p)
      }
      function k() {
        var t = i(),
          r = b(t)
        if (((c = arguments), (l = this), (d = t), r)) {
          if (void 0 === h)
            return (function(t) {
              return (v = t), (h = setTimeout(w, e)), m ? _(t) : p
            })(d)
          if (y) return (h = setTimeout(w, e)), _(d)
        }
        return void 0 === h && (h = setTimeout(w, e)), p
      }
      return (
        (e = o(e) || 0),
        n(r) &&
          ((m = !!r.leading),
          (f = (y = 'maxWait' in r) ? a(o(r.maxWait) || 0, e) : f),
          (g = 'trailing' in r ? !!r.trailing : g)),
        (k.cancel = function() {
          void 0 !== h && clearTimeout(h), (v = 0), (c = d = l = h = void 0)
        }),
        (k.flush = function() {
          return void 0 === h ? p : x(i())
        }),
        k
      )
    }
  },
  function(t, e) {
    t.exports = function(t) {
      var e = typeof t
      return null != t && ('object' == e || 'function' == e)
    }
  },
  function(t, e, r) {
    var n = r(70)
    t.exports = function() {
      return n.Date.now()
    }
  },
  function(t, e, r) {
    var n = r(71),
      i = 'object' == typeof self && self && self.Object === Object && self,
      o = n || i || Function('return this')()
    t.exports = o
  },
  function(t, e, r) {
    ;(function(e) {
      var r = 'object' == typeof e && e && e.Object === Object && e
      t.exports = r
    }.call(e, r(72)))
  },
  function(t, e) {
    var r
    r = (function() {
      return this
    })()
    try {
      r = r || Function('return this')() || (0, eval)('this')
    } catch (t) {
      'object' == typeof window && (r = window)
    }
    t.exports = r
  },
  function(t, e) {
    t.exports = function(t) {
      return t
    }
  },
  function(t, e) {
    var r, n
    ;(r = this),
      (n = function() {
        var t,
          e,
          r = 'lscache-',
          n = '-cacheexpiration',
          i = 10,
          o = 6e4,
          s = Math.floor(864e13 / o),
          a = '',
          u = !1
        function c() {
          var e = '__lscachetest__'
          if (void 0 !== t) return t
          try {
            if (!localStorage) return !1
          } catch (t) {
            return !1
          }
          try {
            v(e, '__lscachetest__'), m(e), (t = !0)
          } catch (e) {
            t = !(!l(e) || !localStorage.length)
          }
          return t
        }
        function l(t) {
          return !!(
            (t && 'QUOTA_EXCEEDED_ERR' === t.name) ||
            'NS_ERROR_DOM_QUOTA_REACHED' === t.name ||
            'QuotaExceededError' === t.name
          )
        }
        function f() {
          return void 0 === e && (e = null != window.JSON), e
        }
        function p(t) {
          return t + n
        }
        function h() {
          return Math.floor(new Date().getTime() / o)
        }
        function d(t) {
          return localStorage.getItem(r + a + t)
        }
        function v(t, e) {
          localStorage.removeItem(r + a + t), localStorage.setItem(r + a + t, e)
        }
        function m(t) {
          localStorage.removeItem(r + a + t)
        }
        function y(t) {
          for (
            var e = new RegExp(
                '^' + r + a.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&') + '(.*)'
              ),
              i = localStorage.length - 1;
            i >= 0;
            --i
          ) {
            var o = localStorage.key(i)
            ;(o = (o = o && o.match(e)) && o[1]) &&
              o.indexOf(n) < 0 &&
              t(o, p(o))
          }
        }
        function g(t) {
          var e = p(t)
          m(t), m(e)
        }
        function _(t) {
          var e = p(t),
            r = d(e)
          if (r) {
            var n = parseInt(r, i)
            if (h() >= n) return m(t), m(e), !0
          }
        }
        function b(t, e) {
          u &&
            'console' in window &&
            'function' == typeof window.console.warn &&
            (window.console.warn('lscache - ' + t),
            e && window.console.warn('lscache - The error was: ' + e.message))
        }
        return {
          set: function(t, e, r) {
            if (c()) {
              if ('string' != typeof e) {
                if (!f()) return
                try {
                  e = JSON.stringify(e)
                } catch (t) {
                  return
                }
              }
              try {
                v(t, e)
              } catch (r) {
                if (!l(r))
                  return void b("Could not add item with key '" + t + "'", r)
                var n,
                  o = []
                y(function(t, e) {
                  var r = d(e)
                  ;(r = r ? parseInt(r, i) : s),
                    o.push({
                      key: t,
                      size: (d(t) || '').length,
                      expiration: r,
                    })
                }),
                  o.sort(function(t, e) {
                    return e.expiration - t.expiration
                  })
                for (var a = (e || '').length; o.length && a > 0; )
                  (n = o.pop()),
                    b("Cache is full, removing item with key '" + t + "'"),
                    g(n.key),
                    (a -= n.size)
                try {
                  v(t, e)
                } catch (e) {
                  return void b(
                    "Could not add item with key '" +
                      t +
                      "', perhaps it's too big?",
                    e
                  )
                }
              }
              r ? v(p(t), (h() + r).toString(i)) : m(p(t))
            }
          },
          get: function(t) {
            if (!c()) return null
            if (_(t)) return null
            var e = d(t)
            if (!e || !f()) return e
            try {
              return JSON.parse(e)
            } catch (t) {
              return e
            }
          },
          remove: function(t) {
            c() && g(t)
          },
          supported: function() {
            return c()
          },
          flush: function() {
            c() &&
              y(function(t) {
                g(t)
              })
          },
          flushExpired: function() {
            c() &&
              y(function(t) {
                _(t)
              })
          },
          setBucket: function(t) {
            a = t
          },
          resetBucket: function() {
            a = ''
          },
          enableWarnings: function(t) {
            u = t
          },
        }
      }),
      void 0 !== t && t.exports ? (t.exports = n()) : (r.lscache = n())
  },
  function(t, e, r) {
    var n = r(76),
      i = r(26),
      o = i
    ;(o.v1 = n), (o.v4 = i), (t.exports = o)
  },
  function(t, e, r) {
    var n,
      i,
      o = r(24),
      s = r(25),
      a = 0,
      u = 0
    t.exports = function(t, e, r) {
      var c = (e && r) || 0,
        l = e || [],
        f = (t = t || {}).node || n,
        p = void 0 !== t.clockseq ? t.clockseq : i
      if (null == f || null == p) {
        var h = o()
        null == f && (f = n = [1 | h[0], h[1], h[2], h[3], h[4], h[5]]),
          null == p && (p = i = 16383 & ((h[6] << 8) | h[7]))
      }
      var d = void 0 !== t.msecs ? t.msecs : new Date().getTime(),
        v = void 0 !== t.nsecs ? t.nsecs : u + 1,
        m = d - a + (v - u) / 1e4
      if (
        (m < 0 && void 0 === t.clockseq && (p = (p + 1) & 16383),
        (m < 0 || d > a) && void 0 === t.nsecs && (v = 0),
        v >= 1e4)
      )
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec")
      ;(a = d), (u = v), (i = p)
      var y = (1e4 * (268435455 & (d += 122192928e5)) + v) % 4294967296
      ;(l[c++] = (y >>> 24) & 255),
        (l[c++] = (y >>> 16) & 255),
        (l[c++] = (y >>> 8) & 255),
        (l[c++] = 255 & y)
      var g = ((d / 4294967296) * 1e4) & 268435455
      ;(l[c++] = (g >>> 8) & 255),
        (l[c++] = 255 & g),
        (l[c++] = ((g >>> 24) & 15) | 16),
        (l[c++] = (g >>> 16) & 255),
        (l[c++] = (p >>> 8) | 128),
        (l[c++] = 255 & p)
      for (var _ = 0; _ < 6; ++_) l[c + _] = f[_]
      return e || s(l)
    }
  },
  function(t, e, r) {
    'use strict'
    t.exports = function(t, e) {
      for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
      return t
    }
  },
  function(t, e, r) {
    'use strict'
    var n = r(17)
    t.exports = function() {
      var t = {},
        e = null
      return (
        location &&
          location.search &&
          location.search.length &&
          (t = n.parse(location.search.substr(1))),
        document && document.referrer && (e = document.referrer),
        {
          referrer: e,
          search: t,
        }
      )
    }
  },
  function(t, e, r) {
    'use strict'
    var n = r(0),
      i = r(3)
    function o(t) {
      ;(this.promises = []), (this.name = t ? t.name : null)
    }
    ;(o.prototype.push = function(t) {
      var e = !1,
        r = this
      function o(r) {
        e || (t && ((e = !0), t(r)))
      }
      this.promises.push(o),
        setTimeout(function() {
          e || (n.log(r.name + ' promise timed out', null, n.LOG), o())
        }, i.timeout)
    }),
      (o.prototype.completePromises = function(t) {
        var e = !0,
          r = !1,
          n = void 0
        try {
          for (
            var i, o = this.promises[Symbol.iterator]();
            !(e = (i = o.next()).done);
            e = !0
          ) {
            var s = i.value
            s && s(t)
          }
        } catch (t) {
          ;(r = !0), (n = t)
        } finally {
          try {
            !e && o.return && o.return()
          } finally {
            if (r) throw n
          }
        }
        this.promises = []
      }),
      (t.exports = o)
  },
  function(t, e, r) {
    'use strict'
    var n = r(2),
      i = r(0),
      o = r(1),
      s = r(81),
      a = r(82),
      u = void 0,
      c = setInterval(function() {
        document.body && (l(), clearInterval(c), (c = null))
      }, 1)
    function l() {
      if ('undefined' != typeof MutationObserver && !u && document.body) {
        i.log('start DOM Observer', null, i.DEBUG)
        var t = function() {
          i.log('DOM mutation observed', null, i.DEBUG),
            e.applyVisualEditsFromConfig(o.config)
        }
        ;(u = new MutationObserver(
          n.debounce(t, 50, {
            leading: !0,
          })
        )).observe(document.body, {
          attributes: !0,
          childList: !0,
          characterData: !0,
          subtree: !0,
          attributeFilter: [],
          characterDataOldValue: !1,
          attributeOldValue: !1,
        }),
          t()
      }
    }
    e.applyVisualEditsFromConfig = function(t) {
      if (t && t.webModifications && t.webElements) {
        l(), i.log('Apply visual edits from config', null, i.DEBUG)
        var e = s.buildUrlFromLocation(window.location)
        t.webModifications.forEach(function(r) {
          if (r) {
            var n = t.webElements.find(function(t) {
              return t._id === r._element
            })
            if (!n)
              return i.error(
                'No web element found for _id: ' +
                  r._element +
                  ', modification: ' +
                  r._id,
                null,
                i.DEBUG
              )
            console.log('here we go')
            true
              ? a.applyModificationsToDOM({
                  element: n,
                  modification: r,
                })
              : (n.hostnameMatch || s.matchUrlsByPath(n.url, e)) &&
                a.applyModificationsToDOM({
                  element: n,
                  modification: r,
                })
          }
        })
      }
    }
  },
  function(t, e, r) {
    'use strict'
    var n = r(2)
    ;(e.buildUrlFromLocation = function(t) {
      return t && t.origin ? t.origin + (t.pathname ? t.pathname : '') : null
    }),
      (e.matchUrlsByPath = function(t, r) {
        var n = e.getLocationFromUrl(t),
          i = e.getLocationFromUrl(r)
        return n && i && n.origin.length && i.origin.length
          ? n.pathname === i.pathname
          : (t = t.replace(/^(http(s?):\/\/)?((www\.)?)((.*\/)?)/, '')) ===
              (r = r.replace(/^(http(s?):\/\/)?((www\.)?)((.*\/)?)/, ''))
      }),
      (e.matchUrlsByDomain = function(t, e) {
        return (
          (t = t.replace(/^(http(s?):\/\/)?((www\.)?)/, '').split('/')[0]),
          (e = e.replace(/^(http(s?):\/\/)?((www\.)?)/, '').split('/')[0]),
          (t = t.split('.').slice(-2)),
          (e = e.split('.').slice(-2)),
          n.isEqual(t, e)
        )
      }),
      (e.getLocationFromUrl = function(t) {
        var e = document.createElement('a')
        return (
          (e.href = t),
          e.origin.length
            ? {
                origin: e.origin,
                hostname: e.hostname,
                pathname: e.pathname,
                href: e.href,
              }
            : null
        )
      }),
      (e.matchUrlRules = function(t, e) {
        if (!t || !t.length || !e) return !1
        var r = !1
        return (
          n.forEach(t, function(t) {
            var n = t.comparator,
              i = t.value
            if ('is' === n) r = e === i
            else if ('is not' === n) r = e !== i
            else if ('contains' === n) r = e.includes(i)
            else if ('does not contain' === n) r = !e.includes(i)
            else if ('Matches Regex' === n) {
              var o = new RegExp(i)
              r = o.test(e)
            }
            if (r) return !1
          }),
          r
        )
      })
  },
  function(module, exports, __webpack_require__) {
    'use strict'
    var log = __webpack_require__(0)
    ;(exports.applyModificationsToDOM = function(_ref) {
      var element = _ref.element,
        modification = _ref.modification
      if (element && modification) {
        console.log(element.selector)
        if (
          element.selector ===
          'body>div#root:nth-child(2)>div:nth-child(1)>h1:nth-child(2)'
        ) {
          element.selector =
            'body>div#root:nth-child(2)>div:nth-child(1)>div>h1'
          console.log(element.selector)
        }
        var htmlElements = exports.findElementsBySelector(element.selector),
          htmlElement =
            htmlElements && htmlElements.length ? htmlElements[0] : null
        if (htmlElement) {
          console.log(
            'Apply modification for web element: ' +
              htmlElement._id +
              ', modification: ' +
              modification._id,
            null,
            log.LOUD
          )
          var _modification$attribu = modification.attributes,
            outerHTML = _modification$attribu.outerHTML,
            script = _modification$attribu.script
          if (
            (outerHTML &&
              htmlElement.outerHTML !== outerHTML &&
              (htmlElement.outerHTML = outerHTML),
            script)
          )
            try {
              eval(script)
            } catch (t) {
              log.error(
                'Error on modification script for web element: ' +
                  htmlElement._id +
                  ', modification: ' +
                  modification._id,
                t,
                log.DEBUG
              )
            }
        }
      }
    }),
      (exports.findElementsBySelector = function(t) {
        return document.querySelectorAll(t)
      })
  },
  function(t, e, r) {
    'use strict'
    var n = r(0),
      i = (r(8), r(1)),
      o = r(4),
      s = r(84),
      a = r(2),
      u = !0
    t.exports = function(t, e) {
      if (
        (function(t) {
          if (!t || 'string' != typeof t) return !1
          return !!t.length
        })(t)
      ) {
        if (((this.env = 'production'), e)) {
          ;(this.api.config.startOptions = e),
            a.isNumber(e.log_level) && n.setPriorityLevel(e.log_level)
          try {
            if (e.alias_host) {
              var r = a.isString(e.alias_host)
                  ? JSON.parse(e.alias_host)
                  : e.alias_host,
                c = r.api_host,
                l = r.ping_host
              c && (this.api.config.apiAlias = c),
                l && (this.api.config.pingAlias = l)
            }
          } catch (t) {
            n.error('Error trying to convert alias host to JSON', t)
          }
          !1 === e.auto_page_view && (u = !1),
            e.env && (this.env = e.env),
            e.test_experiments && (i.test_experiments = e.test_experiments),
            e.fast_mode && (this.api.config.fastMode = e.fast_mode),
            e.cookie_domain && (this.api.config.cookieDomain = e.cookie_domain),
            e.user_bucketing &&
              (this.api.config.userBucketing = e.user_bucketing),
            a.isNumber(e.timeout) && this.api.request.setTimeout(e.timeout),
            e.anon_user && !i.getUserID() && i.setUserID(e.anon_user),
            e.track_adobe_analytics &&
              s(e.adobe_obj_name, this.api.events.trackAdobeAnalyticsEvents)
        }
        ;(this._in = {}),
          (this._in.token = t),
          (this._in.logger = n),
          (this._in.cookies = o),
          this.api.init(this)
        var f = e && e.config ? e.config : void 0,
          p = f ? f.ad : void 0
        i.start(p)
        var h = null
        try {
          a.isString(e.user_attributes)
            ? (h = e && e.user_attributes && JSON.parse(e.user_attributes))
            : a.isObjectLike(e.user_attributes) && (h = e.user_attributes)
        } catch (t) {
          n.error('Error trying to convert user attributes to JSON', t)
        }
        return (
          this.api.config.get({
            dynamicConfig: f,
            user_attributes: h,
          }),
          u && this.page && this.page(),
          this.api.events.scheduleTick(),
          this.api.events.watchLifecycleEvents(),
          this
        )
      }
      n.error('An SDK token is required.', null, n.USER)
    }
  },
  function(t, e, r) {
    'use strict'
    var n =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(t) {
              return typeof t
            }
          : function(t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t
            },
      i = function(t) {
        return {
          name: t.split('=')[0],
          value: t.split('=')[1] || null,
        }
      },
      o = function(t) {
        return t.events && 'None' !== t.events ? t.events.split(',').map(i) : []
      },
      s = function(t) {
        var e = {}
        return (
          (function(t) {
            return Object.keys(t).filter(function(e) {
              return (
                'function' != typeof t[e] &&
                'object' !== n(t[e]) &&
                'events' !== e &&
                'linkTrackEvents' !== e
              )
            })
          })(t).forEach(function(r) {
            e[r] = t[r]
          }),
          e
        )
      },
      a = 0,
      u = function t(e, r) {
        var n = e ? window[e] : window.s
        a < 50 && void 0 !== n
          ? ((function(t, e) {
              var r = t.t,
                n = t.tl
              ;(t.t = function() {
                return (
                  o(t).forEach(function(r) {
                    e(r.name, r.value, s(t))
                  }),
                  r.bind(t)()
                )
              }),
                (t.tl = function(r, i, a, u, c) {
                  return (
                    o(t).forEach(function(r) {
                      var n = Object.assign({}, s(t), {
                        linkType: i,
                        linkName: a,
                      })
                      t.linkTrackEvents &&
                        t.linkTrackEvents.includes(r.name) &&
                        e(r.name, r.value, n)
                    }),
                    n.bind(t)(r, i, a, u, c)
                  )
                })
            })(n, r),
            (function(t, e) {
              o(t).forEach(function(r) {
                e(r.name, r.value, s(t))
              })
            })(n, r))
          : ((a += 1),
            setTimeout(function() {
              t(e, r)
            }, 200))
      }
    t.exports = function(t, e) {
      u(t, e)
    }
  },
  function(t, e, r) {
    'use strict'
    r(14)
    t.exports = function() {
      return !(!this._in || !this._in.token)
    }
  },
  function(t, e, r) {
    'use strict'
    var n =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(t) {
              return typeof t
            }
          : function(t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t
            },
      i = r(0),
      o = r(1)
    t.exports = function(t) {
      if (!this.isReady())
        return (
          i.error(
            'Taplytics::identify: you have to call Taplytics.init first.',
            null,
            i.USER
          ),
          this
        )
      if (
        !(function(t) {
          return !(
            !t ||
            (t && 'object' !== (void 0 === t ? 'undefined' : n(t)))
          )
        })(t)
      )
        return (
          i.error(
            'Taplytics::identify: you have to pass in an object with user attributes.',
            null,
            i.USER
          ),
          this
        )
      var e = (function(t) {
        var e = {
            customData: {},
          },
          r = !0,
          n = !1,
          i = void 0
        try {
          for (
            var u, c = Object.keys(t)[Symbol.iterator]();
            !(r = (u = c.next()).done);
            r = !0
          ) {
            var l = u.value,
              f = t[l],
              p = s[l]
            p
              ? (a.includes(p) && o.setUserID(f), (e[p] = f))
              : (e.customData[l] = f)
          }
        } catch (t) {
          ;(n = !0), (i = t)
        } finally {
          try {
            !r && c.return && c.return()
          } finally {
            if (n) throw i
          }
        }
        return e
      })(t)
      return (
        this.api.users.post(
          e,
          'Taplytics::identify: failed to save the user attributes properly.'
        ),
        this
      )
    }
    var s = {
        user_id: 'user_id',
        id: 'user_id',
        userID: 'user_id',
        userId: 'user_id',
        customer_id: 'user_id',
        member_id: 'user_id',
        email: 'email',
        email_address: 'email',
        name: 'name',
        fullName: 'name',
        full_name: 'name',
        firstName: 'firstName',
        first_name: 'firstName',
        lastName: 'lastName',
        last_name: 'lastName',
        avatar: 'avatarUrl',
        avatarUrl: 'avatarUrl',
        avatar_url: 'avatarUrl',
        age: 'age',
        gender: 'gender',
      },
      a = ['user_id', 'userID', 'userId']
  },
  function(t, e, r) {
    'use strict'
    var n = r(0),
      i = r(1),
      o = r(2)
    t.exports = function(t, e, r) {
      if (!this.isReady())
        return (
          n.error(
            'track: you have to call Taplytics.init first.',
            null,
            n.USER
          ),
          !1
        )
      if (!t)
        return (
          n.error('track: you have to specify an event name.', null, n.USER), !1
        )
      var s = e,
        a = r
      return (
        o.isObjectLike(e) && !r && ((s = void 0), (a = e)),
        s && !o.isNumber(s)
          ? (n.error(
              "track: if you're passing a value, it has to be a number.",
              null,
              n.USER
            ),
            !1)
          : (i.tick(), this.api.events.goalAchieved(t, s, a), this)
      )
    }
  },
  function(t, e, r) {
    'use strict'
    var n =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(t) {
              return typeof t
            }
          : function(t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t
            },
      i = r(0),
      o = r(8),
      s = r(1),
      a = {
        previous_page_href: 'p_p_l_h',
        previous_page_title: 'p_p_l_t',
        previous_page_location: 'p_p_l',
        previous_page_name: 'p_p_n',
        previous_page_category: 'p_p_c',
        previous_page_view_date: 'p_p_v_d',
      }
    t.exports = function(t, e, r) {
      if (!this.isReady())
        return (
          i.error(
            'track: you have to call Taplytics.init first.',
            null,
            i.USER
          ),
          this
        )
      var u = t,
        c = e,
        l = r
      if (
        ('object' !== (void 0 === e ? 'undefined' : n(e)) || r
          ? t && !e && ((u = void 0), (c = t))
          : ((u = void 0), (c = t), (l = e)),
        s.tick(),
        s.get(a.previous_page_href))
      ) {
        var f = (function() {
          var t = s.get(a.previous_page_view_date)
          t && (t = new Date(t))
          return {
            category: s.get(a.previous_page_category),
            name: s.get(a.previous_page_name),
            href: s.get(a.previous_page_href),
            title: s.get(a.previous_page_title),
            location: s.get(a.previous_page_location, JSON && JSON.parse),
            view_date: t,
          }
        })()
        this.api.events.pageClose(
          f.category,
          f.name,
          f.href,
          f.title,
          f.location
        ),
          this.api.events.timeOnPage(
            f.category,
            f.name,
            f.href,
            f.title,
            f.location,
            f.view_date
          ),
          s.unset(a.previous_page_category),
          s.unset(a.previous_page_name),
          s.unset(a.previous_page_href),
          s.unset(a.previous_page_title),
          s.unset(a.previous_page_location),
          s.unset(a.previous_page_view_date)
      }
      return (
        this.api.events.pageView(u, c, l),
        (function(t, e) {
          s.set(a.previous_page_category, t),
            s.set(a.previous_page_name, e),
            s.set(a.previous_page_href, o.attr('href')),
            s.set(a.previous_page_title, o.attr('title')),
            s.set(
              a.previous_page_location,
              o.toObject(),
              JSON && JSON.stringify
            ),
            s.set(a.previous_page_view_date, new Date().toISOString())
        })(u, c),
        this
      )
    }
  },
  function(t, e, r) {
    'use strict'
    var n = r(0),
      i = r(1)
    t.exports = function() {
      return this.isReady()
        ? (i.tick(),
          this.api.users.del(),
          i.resetSession(),
          this.api.config.get({}),
          this)
        : (n.error(
            'Taplytics::reset: you have to call Taplytics.init first.',
            null,
            n.USER
          ),
          !1)
    }
  },
  function(t, e, r) {
    'use strict'
    var n = r(1)
    t.exports = function(t) {
      n.configPromise(t)
    }
  },
  function(t, e, r) {
    'use strict'
    var n = r(1)
    t.exports = function(t) {
      n.configPromise(function() {
        var e = n.config && n.config.expVarsNames ? n.config.expVarsNames : {}
        return t && t(e)
      })
    }
  },
  function(t, e, r) {
    'use strict'
    r(1)
    var n = r(93)
    t.exports = function(t, e, r) {
      var i = new n(t, e, r)
      return i && i.init ? i : null
    }
  },
  function(t, e, r) {
    'use strict'
    var n =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(t) {
              return typeof t
            }
          : function(t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t
            },
      i = r(0),
      o = r(1),
      s = r(29)
    function a(t, e, r) {
      return (
        (this.init = !1),
        t
          ? ((this.name = t),
            (this.defaultValue = e),
            (this.value = e),
            (this.updatedBlock = r),
            (this.defaultType = this.getValueType(e)),
            this.defaultType
              ? ((this.init = !0), void this.getValueFromConfig())
              : i.log(
                  'Error: Taplytics variables only support Strings, Numbers, and Booleans.',
                  null,
                  i.USER
                ))
          : i.log('Error: Taplytics variable is missing a name', null, i.USER)
      )
    }
    ;(a.prototype.getValueType = function(t) {
      return 'string' == typeof t
        ? 'String'
        : 'number' == typeof t
        ? 'Number'
        : 'boolean' == typeof t
        ? 'Boolean'
        : 'object' === (void 0 === t ? 'undefined' : n(t))
        ? 'JSON'
        : null
    }),
      (a.prototype.stringifyValue = function(t) {
        return 'JSON' === this.defaultType ? JSON.stringify(t) : t
      }),
      (a.prototype.parseValue = function(t) {
        if ('JSON' === this.defaultType) {
          if ('object' === (void 0 === t ? 'undefined' : n(t))) return t
          try {
            return JSON.parse(t)
          } catch (e) {
            i.log('Error parsing JSON variable', t, i.LOG)
          }
          return null
        }
        return t
      }),
      (a.prototype.getValueFromConfig = function() {
        var t = this
        function e() {
          t.updatedBlock && t.updatedBlock(t.value)
        }
        o.configPromise(function() {
          var r = o.config,
            n = r && r.dynamicVars ? r.dynamicVars[t.name] : null
          if (n) {
            if (n.variableType !== t.defaultType)
              return (
                e(),
                i.error(
                  'Taplytics variable ' +
                    t.name +
                    ' default type does not match server: ' +
                    n.variableType,
                  null,
                  i.LOG
                )
              )
            t.value = t.parseValue(n.value)
          } else r && (i.log('New Taplytics Variable: ' + t.name, null, i.DEBUG), s.post(t))
          e()
        })
      }),
      (t.exports = a)
  },
  function(t, e, r) {
    'use strict'
    var n = r(0),
      i = r(1),
      o = r(29)
    t.exports = function(t, e) {
      if (!t) return n.error('No name to run code block', null, n.USER)
      i.configPromise(function() {
        var r = i.config
        if (r) {
          var s = r.dynamicVars ? r.dynamicVars[t] : null
          if (s) {
            if ('Code Block' !== s.variableType)
              return n.error(
                'Taplytics code block ' +
                  t +
                  ' default type does not match server: ' +
                  s.variableType,
                null,
                n.LOG
              )
            e && s.value && e()
          } else
            n.log('New Taplytics Code Block: ' + t, null, n.DEBUG),
              o.post({
                name: t,
                defaultType: 'Code Block',
                defaultValue: !1,
              })
        }
      })
    }
  },
  function(t, e, r) {
    'use strict'
    var n = r(0),
      i = r(1)
    t.exports = function(t) {
      if (!t)
        return (
          n.error('No key to return feature flag enabled', null, n.USER), !1
        )
      var e = i.config
      if (!e || !e.ff) return !1
      var r = e.ff[t]
      return r && r.enabled
    }
  },
  function(t, e, r) {
    'use strict'
    var n = r(1),
      i = r(2)
    t.exports = function(t) {
      n.configPromise(function() {
        var e = n.config && n.config.ff ? n.config.ff : {},
          r = {}
        return (
          i.values(e).forEach(function(t) {
            t.enabled && (r[t.key] = t.name)
          }),
          t && t(r)
        )
      })
    }
  },
  function(t, e, r) {
    'use strict'
    r(0)
    var n = r(4),
      i = r(12).OPT_OUT_KEY
    t.exports = function() {
      return n.setLS(i, !0), n.removeAllCookies(), this
    }
  },
  function(t, e, r) {
    'use strict'
    var n = r(4),
      i = r(12).OPT_OUT_KEY
    t.exports = function() {
      return (
        n.hasUserOptedOutTracking() &&
          (n.setLS(i, !1),
          this.init(this._in.token, this.api.config.startOptions)),
        this
      )
    }
  },
  function(t, e, r) {
    'use strict'
    var n = r(0),
      i = r(1)
    t.exports = function() {
      return this.isReady()
        ? (i.tick(), i.resetSession(), this.api.config.get({}), this)
        : (n.error(
            'Taplytics::startNewSession: you have to call Taplytics.init first.',
            null,
            n.USER
          ),
          this)
    }
  },
])
//# sourceMappingURL=taplytics.min.js.map
Taplytics.init('fd1e0c78e8c041798002726a30d9d4ff', {
  config: {
    expVarsNames: {
      'Show Kitten': 'baseline',
      'Sample Experiment': 'Variation 1',
      'Visual Experiment': 'Variation 1',
    },
    expVarsIds: {
      '5d4b227b5073be0071039bcd': '5d4b227b5073be0071039bd0',
      '5d582b902e8418000ec9d8e1': '5d582b902e8418000ec9d8e4',
      '5d4b1f20a4782c002cc9e991': 'b',
    },
    dynamicVars: {},
    ff: {
      showKitten: {
        name: 'Show Kitten',
        key: 'showKitten',
        _id: '5d4b1f20a4782c002cc9e991',
        status: 'active',
        enabled: true,
      },
    },
    webElements: [
      {
        _id: '5d4b24a1ccd81c00784246e3',
        selector:
          'body>div#root:nth-child(2)>div:nth-child(1)>img:nth-child(3)',
        url: 'https://nikolasleblanc.github.io/tap-spa/',
        __v: 0,
        hostnameMatch: false,
      },
      {
        _id: '5d582ccc9f3fdc000d6d2115',
        selector:
          'nav:nth-child(1)>ul:nth-child(1)>li:nth-child(2)>a:nth-child(1)',
        url: 'https://nikolasleblanc.github.io/tap-spa/about/',
        __v: 0,
        hostnameMatch: false,
      },
      {
        _id: '5d582d679f3fdc000d6d2119',
        selector: 'html>head:nth-child(1)',
        url: 'https://nikolasleblanc.github.io/tap-spa/about/',
        __v: 0,
        hostnameMatch: false,
      },
      {
        _id: '5d582d7d921c0300779b462b',
        selector: 'body>div#root:nth-child(2)>div:nth-child(1)>h1:nth-child(2)',
        url: 'https://nikolasleblanc.github.io/tap-spa/about/',
        __v: 0,
        hostnameMatch: false,
      },
    ],
    webModifications: [
      {
        _id: '5d4b24a1ccd81c00784246e4',
        _element: '5d4b24a1ccd81c00784246e3',
        __v: 0,
        attributes: {
          outerHTML: '<img alt="" src="//placekitten.com/400/300">',
          innerText: '',
          src: 'https://placekitten.com/400/300',
          childSrc: null,
          script: null,
        },
        isBaseline: false,
      },
      {
        _id: '5d582ccc9f3fdc000d6d2116',
        _element: '5d582ccc9f3fdc000d6d2115',
        __v: 0,
        attributes: {
          outerHTML: '<a href="/tap-spa/about/">Aboot</a>',
          innerText: 'Aboot',
          href: 'https://nikolasleblanc.github.io/tap-spa/about/',
          childSrc: null,
          script: null,
        },
        isBaseline: false,
      },
      {
        _id: '5d582d679f3fdc000d6d211a',
        _element: '5d582d679f3fdc000d6d2119',
        __v: 0,
        attributes: {
          outerHTML:
            '<head><meta charset="utf-8"><link rel="shortcut icon" href="/tap-spa/favicon.ico"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#000000"><script type="text/javascript">!function(i){if(i.search){var l={};i.search.slice(1).split("&").forEach(function(i){var a=i.split("=");l[a[0]]=a.slice(1).join("=").replace(/~and~/g,"&")}),void 0!==l.p&&window.history.replaceState(null,null,i.pathname.slice(0,-1)+(l.p||"")+(l.q?"?"+l.q:"")+i.hash)}}(window.location)</script><script type="text/javascript" src="https://js.taplytics.com/jssdk/fd1e0c78e8c041798002726a30d9d4ff.min.js"></script><link rel="manifest" href="/tap-spa/manifest.json"><title>React App</title><link href="/tap-spa/static/css/main.2cce8147.chunk.css" rel="stylesheet"><style data-styled="" data-styled-version="4.1.3">\n/* sc-component-id: TLButton__StyledButton-sc-1qc33nb-0 */\n\n/* sc-component-id: TLInput__StyledInput-hemhkm-0 */\n\n/* sc-component-id: TLInput__StyledTextArea-hemhkm-1 */\n\n/* sc-component-id: TLLink__StyledAnchor-sc-1kpvzwb-0 */\n\n/* sc-component-id: TLColumnRow__Row-sc-5g5gmn-0 */\n\n/* sc-component-id: TLSmallButton__StyledButton-o96zx-0 */\n\n/* sc-component-id: TLTable__StyledTable-sc-1sn67qz-0 */\n\n/* sc-component-id: TLHeading__StyledHeading-gzyeot-0 */\n\n/* sc-component-id: TLHeading__h1-gzyeot-1 */\n\n/* sc-component-id: TLHeading__h2-gzyeot-2 */\n\n/* sc-component-id: styles__Container-dw3ejn-0 */\n\n/* sc-component-id: styles__TagText-dw3ejn-1 */\n\n/* sc-component-id: styles__CloseIcon-dw3ejn-2 */\n\n/* sc-component-id: styles__DeleteAction-dw3ejn-3 */\n\n/* sc-component-id: styles__StyledTLSolidTag-sc-1rtneen-0 */\n\n/* sc-component-id: styles__CloseIcon-klzijm-0 */\n\n/* sc-component-id: styles__ArrowIcon-klzijm-1 */\n\n/* sc-component-id: styles__ColouredBar-klzijm-2 */\n\n/* sc-component-id: styles__Container-klzijm-3 */\n\n/* sc-component-id: styles__Icon-sc-13wahin-0 */\n\n/* sc-component-id: styles__Container-sc-1k766y2-0 */\n\n/* sc-component-id: styles__ArrowRight-sc-1k766y2-1 */\n\n/* sc-component-id: styles__ArrowLeft-sc-1k766y2-2 */\n\n/* sc-component-id: styles__Dot-sc-1k766y2-3 */\n\n/* sc-component-id: styles__TextButton-sc-1k766y2-4 */\n\n/* sc-component-id: styles__ButtonDivider-sc-1k766y2-5 */\n\n/* sc-component-id: styles__DotContainer-sc-1k766y2-6 */\n\n/* sc-component-id: styles__Slider-sc-1tjcutb-0 */\n\n/* sc-component-id: TLRadioButton__RadioButton-sc-6ouwsv-0 */\n\n/* sc-component-id: styles__RadioButtonList-sc-1i7q9uh-0 */\n\n/* sc-component-id: styles__RadioButtonListItem-sc-1i7q9uh-1 */\n\n/* sc-component-id: styles__RadioButtonListEmpty-sc-1i7q9uh-2 */\n\n/* sc-component-id: TLInfoMessage__Container-dsshqw-0 */\n\n/* sc-component-id: TLInfoMessage__Message-dsshqw-1 */\n\n/* sc-component-id: styles__Container-zp8gnq-0 */\n\n/* sc-component-id: styles__DropdownTLButton-zp8gnq-1 */\n\n/* sc-component-id: styles__CaretTLIcon-zp8gnq-2 */\n\n/* sc-component-id: styles__DropdownOption-zp8gnq-3 */\n\n/* sc-component-id: styles__OptionsContainer-zp8gnq-4 */\n\n/* sc-component-id: styles__Container-sc-1mh1eo-0 */\n</style><style data-styled="" data-styled-version="4.1.3">\n/* sc-component-id: styles__Toggle-sc-1mh1eo-1 */\n\n/* sc-component-id: styles__Slider-sc-1mh1eo-2 */\n\n/* sc-component-id: TLHrText__Hr-ho2hu1-0 */\n\n/* sc-component-id: styles__Input-sc-1iq5ll7-0 */\n\n/* sc-component-id: styles__Checkmark-sc-1iq5ll7-1 */\n\n/* sc-component-id: styles__CheckmarkLabel-sc-1iq5ll7-2 */\n</style></head>',
          innerText:
            '!function(i){if(i.search){var l={};i.search.slice(1).split("&").forEach(function(i){var a=i.split("=");l[a[0]]=a.slice(1).join("=").replace(/~and~/g,"&")}),void 0!==l.p&&window.history.replaceState(null,null,i.pathname.slice(0,-1)+(l.p||"")+(l.q?"?"+l.q:"")+i.hash)}}(window.location)React App\n/* sc-component-id: TLButton__StyledButton-sc-1qc33nb-0 */\n\n/* sc-component-id: TLInput__StyledInput-hemhkm-0 */\n\n/* sc-component-id: TLInput__StyledTextArea-hemhkm-1 */\n\n/* sc-component-id: TLLink__StyledAnchor-sc-1kpvzwb-0 */\n\n/* sc-component-id: TLColumnRow__Row-sc-5g5gmn-0 */\n\n/* sc-component-id: TLSmallButton__StyledButton-o96zx-0 */\n\n/* sc-component-id: TLTable__StyledTable-sc-1sn67qz-0 */\n\n/* sc-component-id: TLHeading__StyledHeading-gzyeot-0 */\n\n/* sc-component-id: TLHeading__h1-gzyeot-1 */\n\n/* sc-component-id: TLHeading__h2-gzyeot-2 */\n\n/* sc-component-id: styles__Container-dw3ejn-0 */\n\n/* sc-component-id: styles__TagText-dw3ejn-1 */\n\n/* sc-component-id: styles__CloseIcon-dw3ejn-2 */\n\n/* sc-component-id: styles__DeleteAction-dw3ejn-3 */\n\n/* sc-component-id: styles__StyledTLSolidTag-sc-1rtneen-0 */\n\n/* sc-component-id: styles__CloseIcon-klzijm-0 */\n\n/* sc-component-id: styles__ArrowIcon-klzijm-1 */\n\n/* sc-component-id: styles__ColouredBar-klzijm-2 */\n\n/* sc-component-id: styles__Container-klzijm-3 */\n\n/* sc-component-id: styles__Icon-sc-13wahin-0 */\n\n/* sc-component-id: styles__Container-sc-1k766y2-0 */\n\n/* sc-component-id: styles__ArrowRight-sc-1k766y2-1 */\n\n/* sc-component-id: styles__ArrowLeft-sc-1k766y2-2 */\n\n/* sc-component-id: styles__Dot-sc-1k766y2-3 */\n\n/* sc-component-id: styles__TextButton-sc-1k766y2-4 */\n\n/* sc-component-id: styles__ButtonDivider-sc-1k766y2-5 */\n\n/* sc-component-id: styles__DotContainer-sc-1k766y2-6 */\n\n/* sc-component-id: styles__Slider-sc-1tjcutb-0 */\n\n/* sc-component-id: TLRadioButton__RadioButton-sc-6ouwsv-0 */\n\n/* sc-component-id: styles__RadioButtonList-sc-1i7q9uh-0 */\n\n/* sc-component-id: styles__RadioButtonListItem-sc-1i7q9uh-1 */\n\n/* sc-component-id: styles__RadioButtonListEmpty-sc-1i7q9uh-2 */\n\n/* sc-component-id: TLInfoMessage__Container-dsshqw-0 */\n\n/* sc-component-id: TLInfoMessage__Message-dsshqw-1 */\n\n/* sc-component-id: styles__Container-zp8gnq-0 */\n\n/* sc-component-id: styles__DropdownTLButton-zp8gnq-1 */\n\n/* sc-component-id: styles__CaretTLIcon-zp8gnq-2 */\n\n/* sc-component-id: styles__DropdownOption-zp8gnq-3 */\n\n/* sc-component-id: styles__OptionsContainer-zp8gnq-4 */\n\n/* sc-component-id: styles__Container-sc-1mh1eo-0 */\n\n/* sc-component-id: styles__Toggle-sc-1mh1eo-1 */\n\n/* sc-component-id: styles__Slider-sc-1mh1eo-2 */\n\n/* sc-component-id: TLHrText__Hr-ho2hu1-0 */\n\n/* sc-component-id: styles__Input-sc-1iq5ll7-0 */\n\n/* sc-component-id: styles__Checkmark-sc-1iq5ll7-1 */\n\n/* sc-component-id: styles__CheckmarkLabel-sc-1iq5ll7-2 */\n',
          childSrc: null,
          script: "console.log('hey hey, we got an experiment')",
        },
        isBaseline: false,
      },
      {
        _id: '5d582d7d921c0300779b462c',
        _element: '5d582d7d921c0300779b462b',
        __v: 0,
        attributes: {
          outerHTML: '<h1>Aboot</h1>',
          innerText: 'Aboot',
          childSrc: null,
          script: null,
        },
        isBaseline: false,
      },
    ],
    app_user_id: '5d58282a05143200bb2948af',
  },
})
