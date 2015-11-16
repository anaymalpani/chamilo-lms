(function () {
    "undefined" == typeof Math.sgn && (Math.sgn = function (a) {
        return 0 == a ? 0 : a > 0 ? 1 : -1
    });
    var a = {
        subtract: function (a, b) {
            return {x: a.x - b.x, y: a.y - b.y}
        }, dotProduct: function (a, b) {
            return a.x * b.x + a.y * b.y
        }, square: function (a) {
            return Math.sqrt(a.x * a.x + a.y * a.y)
        }, scale: function (a, b) {
            return {x: a.x * b, y: a.y * b}
        }
    }, b = 64, c = Math.pow(2, -b - 1), d = function (b, c) {
        for (var d = [], e = f(b, c), h = c.length - 1, i = 2 * h - 1, j = g(e, i, d, 0), k = a.subtract(b, c[0]), m = a.square(k), n = 0, o = 0; j > o; o++) {
            k = a.subtract(b, l(c, h, d[o], null, null));
            var p = a.square(k);
            m > p && (m = p, n = d[o])
        }
        return k = a.subtract(b, c[h]), p = a.square(k), m > p && (m = p, n = 1), {
            location: n,
            distance: m
        }
    }, e = function (a, b) {
        var c = d(a, b);
        return {
            point: l(b, b.length - 1, c.location, null, null),
            location: c.location
        }
    }, f = function (b, c) {
        for (var d = c.length - 1, e = 2 * d - 1, f = [], g = [], h = [], i = [], k = [[1, .6, .3, .1], [.4, .6, .6, .4], [.1, .3, .6, 1]], l = 0; d >= l; l++)f[l] = a.subtract(c[l], b);
        for (var l = 0; d - 1 >= l; l++)g[l] = a.subtract(c[l + 1], c[l]), g[l] = a.scale(g[l], 3);
        for (var m = 0; d - 1 >= m; m++)for (var n = 0; d >= n; n++)h[m] || (h[m] = []), h[m][n] = a.dotProduct(g[m], f[n]);
        for (l = 0; e >= l; l++)i[l] || (i[l] = []), i[l].y = 0, i[l].x = parseFloat(l) / e;
        for (var o = d, p = d - 1, q = 0; o + p >= q; q++) {
            var r = Math.max(0, q - p), s = Math.min(q, o);
            for (l = r; s >= l; l++)j = q - l, i[l + j].y += h[j][l] * k[j][l]
        }
        return i
    }, g = function (a, c, d, e) {
        var f, j, m = [], n = [], o = [], p = [];
        switch (h(a, c)) {
            case 0:
                return 0;
            case 1:
                if (e >= b)return d[0] = (a[0].x + a[c].x) / 2, 1;
                if (i(a, c))return d[0] = k(a, c), 1
        }
        l(a, c, .5, m, n), f = g(m, c, o, e + 1), j = g(n, c, p, e + 1);
        for (var q = 0; f > q; q++)d[q] = o[q];
        for (var q = 0; j > q; q++)d[q + f] = p[q];
        return f + j
    }, h = function (a, b) {
        var c, d, e = 0;
        c = d = Math.sgn(a[0].y);
        for (var f = 1; b >= f; f++)c = Math.sgn(a[f].y), c != d && e++, d = c;
        return e
    }, i = function (a, b) {
        var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
        i = a[0].y - a[b].y, j = a[b].x - a[0].x, k = a[0].x * a[b].y - a[b].x * a[0].y;
        for (var t = max_distance_below = 0, u = 1; b > u; u++) {
            var v = i * a[u].x + j * a[u].y + k;
            v > t ? t = v : max_distance_below > v && (max_distance_below = v)
        }
        return n = 0, o = 1, p = 0, q = i, r = j, s = k - t, l = n * r - q * o, m = 1 / l, e = (o * s - r * p) * m, q = i, r = j, s = k - max_distance_below, l = n * r - q * o, m = 1 / l, f = (o * s - r * p) * m, g = Math.min(e, f), h = Math.max(e, f), d = h - g, c > d ? 1 : 0
    }, k = function (a, b) {
        var c = 1, d = 0, e = a[b].x - a[0].x, f = a[b].y - a[0].y, g = a[0].x - 0, h = a[0].y - 0, i = e * d - f * c, j = 1 / i, k = (e * h - f * g) * j;
        return 0 + c * k
    }, l = function (a, b, c, d, e) {
        for (var f = [[]], g = 0; b >= g; g++)f[0][g] = a[g];
        for (var h = 1; b >= h; h++)for (var g = 0; b - h >= g; g++)f[h] || (f[h] = []), f[h][g] || (f[h][g] = {}), f[h][g].x = (1 - c) * f[h - 1][g].x + c * f[h - 1][g + 1].x, f[h][g].y = (1 - c) * f[h - 1][g].y + c * f[h - 1][g + 1].y;
        if (null != d)for (g = 0; b >= g; g++)d[g] = f[g][0];
        if (null != e)for (g = 0; b >= g; g++)e[g] = f[b - g][g];
        return f[b][0]
    }, m = {}, n = function (a) {
        var b = m[a];
        if (!b) {
            b = [];
            var c = function () {
                return function (b) {
                    return Math.pow(b, a)
                }
            }, d = function () {
                return function (b) {
                    return Math.pow(1 - b, a)
                }
            }, e = function (a) {
                return function () {
                    return a
                }
            }, f = function () {
                return function (a) {
                    return a
                }
            }, g = function () {
                return function (a) {
                    return 1 - a
                }
            }, h = function (a) {
                return function (b) {
                    for (var c = 1, d = 0; d < a.length; d++)c *= a[d](b);
                    return c
                }
            };
            b.push(new c);
            for (var i = 1; a > i; i++) {
                for (var j = [new e(a)], k = 0; a - i > k; k++)j.push(new f);
                for (var k = 0; i > k; k++)j.push(new g);
                b.push(new h(j))
            }
            b.push(new d), m[a] = b
        }
        return b
    }, o = function (a, b) {
        for (var c = n(a.length - 1), d = 0, e = 0, f = 0; f < a.length; f++)d += a[f].x * c[f](b), e += a[f].y * c[f](b);
        return {x: d, y: e}
    }, p = function (a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
    }, q = function (a) {
        return a[0].x == a[1].x && a[0].y == a[1].y
    }, r = function (a, b, c) {
        if (q(a))return {point: a[0], location: b};
        for (var d = o(a, b), e = 0, f = b, g = c > 0 ? 1 : -1, h = null; e < Math.abs(c);)f += .005 * g, h = o(a, f), e += p(h, d), d = h;
        return {point: h, location: f}
    }, s = function (a) {
        if (q(a))return 0;
        for (var b = o(a, 0), c = 0, d = 0, e = 1, f = null; 1 > d;)d += .005 * e, f = o(a, d), c += p(f, b), b = f;
        return c
    }, t = function (a, b, c) {
        return r(a, b, c).point
    }, u = function (a, b, c) {
        return r(a, b, c).location
    }, v = function (a, b) {
        var c = o(a, b), d = o(a.slice(0, a.length - 1), b), e = d.y - c.y, f = d.x - c.x;
        return 0 == e ? 1 / 0 : Math.atan(e / f)
    }, w = function (a, b, c) {
        var d = r(a, b, c);
        return d.location > 1 && (d.location = 1), d.location < 0 && (d.location = 0), v(a, d.location)
    }, x = function (a, b, c, d) {
        d = null == d ? 0 : d;
        var e = r(a, b, d), f = v(a, e.location), g = Math.atan(-1 / f), h = c / 2 * Math.sin(g), i = c / 2 * Math.cos(g);
        return [{x: e.point.x + i, y: e.point.y + h}, {
            x: e.point.x - i,
            y: e.point.y - h
        }]
    };
    this.jsBezier = {
        distanceFromCurve: d,
        gradientAtPoint: v,
        gradientAtPointAlongCurveFrom: w,
        nearestPointOnCurve: e,
        pointOnCurve: o,
        pointAlongCurveFrom: t,
        perpendicularToCurveAt: x,
        locationAlongCurveFrom: u,
        getLength: s
    }
}).call(this), function () {
    "use strict";
    var a = this.Biltong = {}, b = function (a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    }, c = function (a, c, d) {
        return a = b(a) ? a : [a.x, a.y], c = b(c) ? c : [c.x, c.y], d(a, c)
    }, d = a.gradient = function (a, b) {
        return c(a, b, function (a, b) {
            return b[0] == a[0] ? b[1] > a[1] ? 1 / 0 : -1 / 0 : b[1] == a[1] ? b[0] > a[0] ? 0 : -0 : (b[1] - a[1]) / (b[0] - a[0])
        })
    }, e = (a.normal = function (a, b) {
        return -1 / d(a, b)
    }, a.lineLength = function (a, b) {
        return c(a, b, function (a, b) {
            return Math.sqrt(Math.pow(b[1] - a[1], 2) + Math.pow(b[0] - a[0], 2))
        })
    }, a.quadrant = function (a, b) {
        return c(a, b, function (a, b) {
            return b[0] > a[0] ? b[1] > a[1] ? 2 : 1 : b[0] == a[0] ? b[1] > a[1] ? 2 : 1 : b[1] > a[1] ? 3 : 4
        })
    }), f = (a.theta = function (a, b) {
        return c(a, b, function (a, b) {
            var c = d(a, b), f = Math.atan(c), g = e(a, b);
            return (4 == g || 3 == g) && (f += Math.PI), 0 > f && (f += 2 * Math.PI), f
        })
    }, a.intersects = function (a, b) {
        var c = a.x, d = a.x + a.w, e = a.y, f = a.y + a.h, g = b.x, h = b.x + b.w, i = b.y, j = b.y + b.h;
        return g >= c && d >= g && i >= e && f >= i || h >= c && d >= h && i >= e && f >= i || g >= c && d >= g && j >= e && f >= j || h >= c && d >= g && j >= e && f >= j || c >= g && h >= c && e >= i && j >= e || d >= g && h >= d && e >= i && j >= e || c >= g && h >= c && f >= i && j >= f || d >= g && h >= c && f >= i && j >= f
    }, a.encloses = function (a, b, c) {
        var d = a.x, e = a.x + a.w, f = a.y, g = a.y + a.h, h = b.x, i = b.x + b.w, j = b.y, k = b.y + b.h, l = function (a, b, d, e) {
            return c ? b >= a && d >= e : b > a && d > e
        };
        return l(d, h, e, i) && l(f, j, g, k)
    }, [null, [1, -1], [1, 1], [-1, 1], [-1, -1]]), g = [null, [-1, -1], [-1, 1], [1, 1], [1, -1]];
    a.pointOnLine = function (a, b, c) {
        var h = d(a, b), i = e(a, b), j = c > 0 ? f[i] : g[i], k = Math.atan(h), l = Math.abs(c * Math.sin(k)) * j[1], m = Math.abs(c * Math.cos(k)) * j[0];
        return {x: a.x + m, y: a.y + l}
    }, a.perpendicularLineTo = function (a, b, c) {
        var e = d(a, b), f = Math.atan(-1 / e), g = c / 2 * Math.sin(f), h = c / 2 * Math.cos(f);
        return [{x: b.x + h, y: b.y + g}, {x: b.x - h, y: b.y - g}]
    }
}.call(this), function () {
    "use strict";
    var a = this, b = {android: navigator.userAgent.toLowerCase().indexOf("android") > -1}, c = function (a, b, c) {
        c = c || a.parentNode;
        for (var d = c.querySelectorAll(b), e = 0; e < d.length; e++)if (d[e] === a)return !0;
        return !1
    }, d = function (a) {
        return "string" == typeof a || a.constructor === String ? document.getElementById(a) : a
    }, e = function (a) {
        return a.srcElement || a.target
    }, f = function (a, b) {
        for (var c = 0, d = a.length; d > c && a[c] != b; c++);
        c < a.length && a.splice(c, 1)
    }, g = 1, h = function (a, b, c) {
        var d = g++;
        return a.__ta = a.__ta || {}, a.__ta[b] = a.__ta[b] || {}, a.__ta[b][d] = c, c.__tauid = d, d
    }, i = function (a, b, c) {
        if (a.__ta && a.__ta[b] && delete a.__ta[b][c.__tauid], c.__taExtra) {
            for (var d = 0; d < c.__taExtra.length; d++)E(a, c.__taExtra[d][0], c.__taExtra[d][1]);
            c.__taExtra.length = 0
        }
        c.__taUnstore && c.__taUnstore()
    }, j = function (a, b, d, f) {
        if (null == a)return d;
        var g = a.split(","), h = function (a) {
            h.__tauid = d.__tauid;
            for (var f = e(a), i = 0; i < g.length; i++)c(f, g[i], b) && d.apply(f, arguments)
        };
        return k(d, f, h), h
    }, k = function (a, b, c) {
        a.__taExtra = a.__taExtra || [], a.__taExtra.push([b, c])
    }, l = function (a, b, c, d) {
        if (r && t[b]) {
            var e = j(d, a, c, t[b]);
            D(a, t[b], e, c)
        }
        "focus" === b && null == a.getAttribute("tabindex") && a.setAttribute("tabindex", "1"), D(a, b, j(d, a, c, b), c)
    }, m = function (a, b, c, d) {
        if (null == a.__taSmartClicks) {
            var g = function (b) {
                a.__tad = x(b)
            }, h = function (b) {
                a.__tau = x(b)
            }, i = function (b) {
                if (a.__tad && a.__tau && a.__tad[0] === a.__tau[0] && a.__tad[1] === a.__tau[1])for (var c = 0; c < a.__taSmartClicks.length; c++)a.__taSmartClicks[c].apply(e(b), [b])
            };
            l(a, "mousedown", g, d), l(a, "mouseup", h, d), l(a, "click", i, d), a.__taSmartClicks = []
        }
        a.__taSmartClicks.push(c), c.__taUnstore = function () {
            f(a.__taSmartClicks, c)
        }
    }, n = {
        tap: {touches: 1, taps: 1},
        dbltap: {touches: 1, taps: 2},
        contextmenu: {touches: 2, taps: 1}
    }, o = function (a, b) {
        return function (d, g, h, i) {
            if ("contextmenu" == g && s)l(d, g, h, i); else {
                if (null == d.__taTapHandler) {
                    var j = d.__taTapHandler = {
                        tap: [],
                        dbltap: [],
                        contextmenu: [],
                        down: !1,
                        taps: 0,
                        downSelectors: []
                    }, k = function (e) {
                        for (var f = e.srcElement || e.target, g = 0; g < j.downSelectors.length; g++)if (null == j.downSelectors[g] || c(f, j.downSelectors[g], d)) {
                            j.down = !0, setTimeout(o, a), setTimeout(p, b);
                            break
                        }
                    }, m = function (a) {
                        if (j.down) {
                            var b = a.srcElement || a.target;
                            j.taps++;
                            var f = C(a);
                            for (var g in n)if (n.hasOwnProperty(g)) {
                                var h = n[g];
                                if (h.touches === f && (1 === h.taps || h.taps === j.taps))for (var i = 0; i < j[g].length; i++)(null == j[g][i][1] || c(b, j[g][i][1], d)) && j[g][i][0].apply(e(a), [a])
                            }
                        }
                    }, o = function () {
                        j.down = !1
                    }, p = function () {
                        j.taps = 0
                    };
                    l(d, "mousedown", k), l(d, "mouseup", m)
                }
                d.__taTapHandler.downSelectors.push(i), d.__taTapHandler[g].push([h, i]), h.__taUnstore = function () {
                    f(d.__taTapHandler[g], h)
                }
            }
        }
    }, p = function (a, b, c, d) {
        for (var e in c.__tamee[a])c.__tamee[a].hasOwnProperty(e) && c.__tamee[a][e].apply(d, [b])
    }, q = function () {
        var a = [];
        return function (b, d, f, g) {
            if (!b.__tamee) {
                b.__tamee = {over: !1, mouseenter: [], mouseexit: []};
                var i = function (d) {
                    var f = e(d);
                    (null == g && f == b && !b.__tamee.over || c(f, g, b) && (null == f.__tamee || !f.__tamee.over)) && (p("mouseenter", d, b, f), f.__tamee = f.__tamee || {}, f.__tamee.over = !0, a.push(f))
                }, k = function (d) {
                    for (var f = e(d), g = 0; g < a.length; g++)f != a[g] || c(d.relatedTarget || d.toElement, "*", f) || (f.__tamee.over = !1, a.splice(g, 1), p("mouseexit", d, b, f))
                };
                D(b, "mouseover", j(g, b, i, "mouseover"), i), D(b, "mouseout", j(g, b, k, "mouseout"), k)
            }
            f.__taUnstore = function () {
                delete b.__tamee[d][f.__tauid]
            }, h(b, d, f), b.__tamee[d][f.__tauid] = f
        }
    }, r = "ontouchstart" in document.documentElement, s = "onmousedown" in document.documentElement, t = {
        mousedown: "touchstart",
        mouseup: "touchend",
        mousemove: "touchmove"
    }, u = function () {
        var a = -1;
        if ("Microsoft Internet Explorer" == navigator.appName) {
            var b = navigator.userAgent, c = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
            null != c.exec(b) && (a = parseFloat(RegExp.$1))
        }
        return a
    }(), v = u > -1 && 9 > u, w = function (a, b) {
        if (null == a)return [0, 0];
        var c = B(a), d = A(c, 0);
        return [d[b + "X"], d[b + "Y"]]
    }, x = function (a) {
        return null == a ? [0, 0] : v ? [a.clientX + document.documentElement.scrollLeft, a.clientY + document.documentElement.scrollTop] : w(a, "page")
    }, y = function (a) {
        return w(a, "screen")
    }, z = function (a) {
        return w(a, "client")
    }, A = function (a, b) {
        return a.item ? a.item(b) : a[b]
    }, B = function (a) {
        return a.touches && a.touches.length > 0 ? a.touches : a.changedTouches && a.changedTouches.length > 0 ? a.changedTouches : a.targetTouches && a.targetTouches.length > 0 ? a.targetTouches : [a]
    }, C = function (a) {
        return B(a).length
    }, D = function (a, b, c, d) {
        if (h(a, b, c), d.__tauid = c.__tauid, a.addEventListener)a.addEventListener(b, c, !1); else if (a.attachEvent) {
            var e = b + c.__tauid;
            a["e" + e] = c, a[e] = function () {
                a["e" + e] && a["e" + e](window.event)
            }, a.attachEvent("on" + b, a[e])
        }
    }, E = function (a, b, c) {
        null != c && F(a, function () {
            var e = d(this);
            if (i(e, b, c), null != c.__tauid)if (e.removeEventListener)e.removeEventListener(b, c, !1), r && t[b] && e.removeEventListener(t[b], c, !1); else if (this.detachEvent) {
                var f = b + c.__tauid;
                e[f] && e.detachEvent("on" + b, e[f]), e[f] = null, e["e" + f] = null
            }
            c.__taTouchProxy && E(a, c.__taTouchProxy[1], c.__taTouchProxy[0])
        })
    }, F = function (a, b) {
        if (null != a) {
            a = "undefined" != typeof Window && "unknown" != typeof a.top && a == a.top ? [a] : "string" != typeof a && null == a.tagName && null != a.length ? a : "string" == typeof a ? document.querySelectorAll(a) : [a];
            for (var c = 0; c < a.length; c++)b.apply(a[c])
        }
    };
    a.Mottle = function (a) {
        a = a || {};
        var c = a.clickThreshold || 150, e = a.dblClickThreshold || 350, f = new q, g = new o(c, e), h = a.smartClicks, i = function (a, b, c, e) {
            null != c && F(a, function () {
                var a = d(this);
                h && "click" === b ? m(a, b, c, e) : "tap" === b || "dbltap" === b || "contextmenu" === b ? g(a, b, c, e) : "mouseenter" === b || "mouseexit" == b ? f(a, b, c, e) : l(a, b, c, e)
            })
        };
        this.remove = function (a) {
            return F(a, function () {
                var a = d(this);
                if (a.__ta)for (var b in a.__ta)if (a.__ta.hasOwnProperty(b))for (var c in a.__ta[b])a.__ta[b].hasOwnProperty(c) && E(a, b, a.__ta[b][c]);
                a.parentNode && a.parentNode.removeChild(a)
            }), this
        }, this.on = function () {
            var a = arguments[0], b = 4 == arguments.length ? arguments[2] : null, c = arguments[1], d = arguments[arguments.length - 1];
            return i(a, c, d, b), this
        }, this.off = function (a, b, c) {
            return E(a, b, c), this
        }, this.trigger = function (a, c, e, f) {
            var g = s && ("undefined" == typeof MouseEvent || null == e || e.constructor === MouseEvent), h = r && !s && t[c] ? t[c] : c, i = !(r && !s && t[c]), j = x(e), k = y(e), l = z(e);
            return F(a, function () {
                var a, m = d(this);
                e = e || {
                        screenX: k[0],
                        screenY: k[1],
                        clientX: l[0],
                        clientY: l[1]
                    };
                var n = function (a) {
                    f && (a.payload = f)
                }, o = {
                    TouchEvent: function (a) {
                        var b = document.createTouch(window, m, 0, j[0], j[1], k[0], k[1], l[0], l[1], 0, 0, 0, 0), c = document.createTouchList(b), d = document.createTouchList(b), e = document.createTouchList(b);
                        a.initTouchEvent(h, !0, !0, window, null, k[0], k[1], l[0], l[1], !1, !1, !1, !1, c, d, e, 1, 0)
                    }, MouseEvents: function (a) {
                        if (a.initMouseEvent(h, !0, !0, window, 0, k[0], k[1], l[0], l[1], !1, !1, !1, !1, 1, m), b.android) {
                            var c = document.createTouch(window, m, 0, j[0], j[1], k[0], k[1], l[0], l[1], 0, 0, 0, 0);
                            a.touches = a.targetTouches = a.changedTouches = document.createTouchList(c)
                        }
                    }
                };
                if (document.createEvent) {
                    var p = !i && !g && r && t[c] && !b.android, q = p ? "TouchEvent" : "MouseEvents";
                    a = document.createEvent(q), o[q](a), n(a), m.dispatchEvent(a)
                } else document.createEventObject && (a = document.createEventObject(), a.eventType = a.eventName = h, a.screenX = k[0], a.screenY = k[1], a.clientX = l[0], a.clientY = l[1], n(a), m.fireEvent("on" + h, a))
            }), this
        }
    }, a.Mottle.consume = function (a, b) {
        a.stopPropagation ? a.stopPropagation() : a.returnValue = !1, !b && a.preventDefault && a.preventDefault()
    }, a.Mottle.pageLocation = x, a.Mottle.setForceTouchEvents = function (a) {
        r = a
    }, a.Mottle.setForceMouseEvents = function (a) {
        s = a
    }
}.call(this), function () {
    "use strict";
    Array.prototype.suggest = function (a, b) {
        -1 === this.indexOf(a) && (b ? this.unshift(a) : this.push(a))
    }, Array.prototype.vanquish = function (a) {
        var b = this.indexOf(a);
        -1 != b && this.splice(b, 1)
    };
    var a = function (a) {
        return null == a ? !1 : "string" == typeof a || a.constructor == String
    }, b = function (a) {
        var b = a.getBoundingClientRect(), c = document.body, d = document.documentElement, e = window.pageYOffset || d.scrollTop || c.scrollTop, f = window.pageXOffset || d.scrollLeft || c.scrollLeft, g = d.clientTop || c.clientTop || 0, h = d.clientLeft || c.clientLeft || 0, i = b.top + e - g, j = b.left + f - h;
        return {top: Math.round(i), left: Math.round(j)}
    }, c = function (a, b, c) {
        c = c || a.parentNode;
        for (var d = c.querySelectorAll(b), e = 0; e < d.length; e++)if (d[e] === a)return !0;
        return !1
    }, d = function () {
        var a = -1;
        if ("Microsoft Internet Explorer" == navigator.appName) {
            var b = navigator.userAgent, c = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
            null != c.exec(b) && (a = parseFloat(RegExp.$1))
        }
        return a
    }(), e = 50, f = 50, g = d > -1 && 9 > d, h = function (a) {
        if (g)return [a.clientX + document.documentElement.scrollLeft, a.clientY + document.documentElement.scrollTop];
        var b = j(a), c = i(b, 0);
        return [c.pageX, c.pageY]
    }, i = function (a, b) {
        return a.item ? a.item(b) : a[b]
    }, j = function (a) {
        return a.touches && a.touches.length > 0 ? a.touches : a.changedTouches && a.changedTouches.length > 0 ? a.changedTouches : a.targetTouches && a.targetTouches.length > 0 ? a.targetTouches : [a]
    }, k = {
        draggable: "katavorio-draggable",
        droppable: "katavorio-droppable",
        drag: "katavorio-drag",
        selected: "katavorio-drag-selected",
        active: "katavorio-drag-active",
        hover: "katavorio-drag-hover",
        noSelect: "katavorio-drag-no-select"
    }, l = "katavorio-drag-scope", m = ["stop", "start", "drag", "drop", "over", "out", "beforeStart"], n = function () {
    }, o = function () {
        return !0
    }, p = function (a, b, c) {
        for (var d = 0; d < a.length; d++)a[d] != c && b(a[d])
    }, q = function (a, b, c, d) {
        p(a, function (a) {
            a.setActive(b), b && a.updatePosition(), c && a.setHover(d, b)
        })
    }, r = function (b, c) {
        if (null != b) {
            b = a(b) || null != b.tagName || null == b.length ? [b] : b;
            for (var d = 0; d < b.length; d++)c.apply(b[d], [b[d]])
        }
    }, s = function (a) {
        a.stopPropagation ? (a.stopPropagation(), a.preventDefault()) : a.returnValue = !1
    }, t = "input,textarea,select,button,option", u = function (a, b, d) {
        var e = a.srcElement || a.target;
        return !c(e, d.getInputFilterSelector(), b)
    }, v = function (a, b, c, d) {
        this.params = b || {}, this.el = a, this.params.addClass(this.el, this._class), this.uuid = y();
        var e = !0;
        return this.setEnabled = function (a) {
            e = a
        }, this.isEnabled = function () {
            return e
        }, this.toggleEnabled = function () {
            e = !e
        }, this.setScope = function (a) {
            this.scopes = a ? a.split(/\s+/) : [d]
        }, this.addScope = function (a) {
            var b = {};
            r(this.scopes, function (a) {
                b[a] = !0
            }), r(a ? a.split(/\s+/) : [], function (a) {
                b[a] = !0
            }), this.scopes = [];
            for (var c in b)this.scopes.push(c)
        }, this.removeScope = function (a) {
            var b = {};
            r(this.scopes, function (a) {
                b[a] = !0
            }), r(a ? a.split(/\s+/) : [], function (a) {
                delete b[a]
            }), this.scopes = [];
            for (var c in b)this.scopes.push(c)
        }, this.toggleScope = function (a) {
            var b = {};
            r(this.scopes, function (a) {
                b[a] = !0
            }), r(a ? a.split(/\s+/) : [], function (a) {
                b[a] ? delete b[a] : b[a] = !0
            }), this.scopes = [];
            for (var c in b)this.scopes.push(c)
        }, this.setScope(b.scope), this.k = b.katavorio, b.katavorio
    }, w = function (d, g, i) {
        this._class = i.draggable;
        var j = v.apply(this, arguments);
        this.rightButtonCanDrag = this.params.rightButtonCanDrag;
        var k = [0, 0], l = null, m = !1, n = this.params.consumeStartEvent !== !1, p = this.el, r = this.params.clone, t = (this.params.scroll, g.multipleDrop !== !1), w = g.snapThreshold || 5, x = function (a, b, c, d, e) {
            d = d || w, e = e || w;
            var f = Math.floor(a[0] / b), g = b * f, h = g + b, i = Math.abs(a[0] - g) <= d ? g : Math.abs(h - a[0]) <= d ? h : a[0], j = Math.floor(a[1] / c), k = c * j, l = k + c, m = Math.abs(a[1] - k) <= e ? k : Math.abs(l - a[1]) <= e ? l : a[1];
            return [i, m]
        };
        this.posses = [], this.posseRoles = {}, this.toGrid = function (a) {
            return null == this.params.grid ? a : x(a, this.params.grid[0], this.params.grid[1])
        }, this.snap = function (a, b) {
            if (null != p) {
                a = a || (this.params.grid ? this.params.grid[0] : e), b = b || (this.params.grid ? this.params.grid[1] : f);
                var c = this.params.getPosition(p);
                this.params.setPosition(p, x(c, a, b, a, b))
            }
        }, this.constrain = "function" == typeof this.params.constrain ? this.params.constrain : this.params.constrain || this.params.containment ? function (a) {
            return [Math.max(0, Math.min(D.w - this.size[0], a[0])), Math.max(0, Math.min(D.h - this.size[1], a[1]))]
        } : function (a) {
            return a
        };
        var z = function (a) {
            return "function" == typeof a ? (a._katavorioId = y(), a._katavorioId) : a
        }, A = {}, B = function (a) {
            for (var b in A) {
                var c = A[b], d = c[0](a);
                if (c[1] && (d = !d), !d)return !1
            }
            return !0
        }, C = this.setFilter = function (b, e) {
            if (b) {
                var f = z(b);
                A[f] = [function (e) {
                    var f, g = e.srcElement || e.target;
                    return a(b) ? f = c(g, b, d) : "function" == typeof b && (f = b(e, d)), f
                }, e !== !1]
            }
        };
        this.addFilter = C, this.removeFilter = function (a) {
            var b = "function" == typeof a ? a._katavorioId : a;
            delete A[b]
        }, this.clearAllFilters = function () {
            A = {}
        }, this.canDrag = this.params.canDrag || o;
        var D, E = [], F = [];
        this.downListener = function (a) {
            var c = this.rightButtonCanDrag || 3 !== a.which && 2 !== a.button;
            if (c && this.isEnabled() && this.canDrag()) {
                var d = B(a) && u(a, this.el, this.k);
                if (d) {
                    if (r) {
                        p = this.el.cloneNode(!0), p.setAttribute("id", null), p.style.position = "absolute";
                        var e = b(this.el);
                        p.style.left = e.left + "px", p.style.top = e.top + "px", document.body.appendChild(p)
                    } else p = this.el;
                    n && s(a), k = h(a), this.params.bind(document, "mousemove", this.moveListener), this.params.bind(document, "mouseup", this.upListener), j.markSelection(this), j.markPosses(this), this.params.addClass(document.body, i.noSelect), H("beforeStart", {
                        el: this.el,
                        pos: l,
                        e: a,
                        drag: this
                    })
                } else this.params.consumeFilteredEvents && s(a)
            }
        }.bind(this), this.moveListener = function (a) {
            if (k) {
                if (!m) {
                    var b = H("start", {el: this.el, pos: l, e: a, drag: this});
                    if (b !== !1) {
                        if (!k)return;
                        this.mark(!0), m = !0
                    }
                }
                if (k) {
                    F.length = 0;
                    var c = h(a), d = c[0] - k[0], e = c[1] - k[1], f = this.params.ignoreZoom ? 1 : j.getZoom();
                    d /= f, e /= f, this.moveBy(d, e, a), j.updateSelection(d, e, this), j.updatePosses(d, e, this)
                }
            }
        }.bind(this), this.upListener = function (a) {
            k && (k = null, this.params.unbind(document, "mousemove", this.moveListener), this.params.unbind(document, "mouseup", this.upListener), this.params.removeClass(document.body, i.noSelect), this.unmark(a), j.unmarkSelection(this, a), j.unmarkPosses(this, a), this.stop(a), j.notifySelectionDragStop(this, a), m = !1, r && (p && p.parentNode && p.parentNode.removeChild(p), p = null))
        }.bind(this), this.getFilters = function () {
            return A
        }, this.abort = function () {
            null != k && this.upListener()
        }, this.getDragElement = function () {
            return p || this.el
        };
        var G = {
            start: [],
            drag: [],
            stop: [],
            over: [],
            out: [],
            beforeStart: []
        };
        g.events.start && G.start.push(g.events.start), g.events.beforeStart && G.beforeStart.push(g.events.beforeStart), g.events.stop && G.stop.push(g.events.stop), g.events.drag && G.drag.push(g.events.drag), this.on = function (a, b) {
            G[a] && G[a].push(b)
        };
        var H = function (a, b) {
            if (G[a])for (var c = 0; c < G[a].length; c++)try {
                G[a][c](b)
            } catch (d) {
            }
        };
        this.notifyStart = function (a) {
            H("start", {
                el: this.el,
                pos: this.params.getPosition(p),
                e: a,
                drag: this
            })
        }, this.stop = function (a, b) {
            if (b || m) {
                var c = [], d = j.getSelection(), e = this.params.getPosition(p);
                if (d.length > 1)for (var f = 0; f < d.length; f++) {
                    var g = this.params.getPosition(d[f].el);
                    c.push([d[f].el, {left: g[0], top: g[1]}, d[f]])
                } else c.push([p, {left: e[0], top: e[1]}, this]);
                H("stop", {el: p, pos: e, e: a, drag: this, selection: c})
            }
        }, this.mark = function (a) {
            if (l = this.params.getPosition(p), this.size = this.params.getSize(p), E = j.getMatchingDroppables(this), q(E, !0, !1, this), this.params.addClass(p, this.params.dragClass || i.drag), this.params.constrain || this.params.containment) {
                var b = this.params.getSize(p.parentNode);
                D = {w: b[0], h: b[1]}
            }
            a && j.notifySelectionDragStart(this)
        }, this.unmark = function (a) {
            q(E, !1, !0, this), this.params.removeClass(p, this.params.dragClass || i.drag), E.length = 0;
            for (var b = 0; b < F.length; b++) {
                var c = F[b].drop(this, a);
                if (c === !0)break
            }
        }, this.moveBy = function (a, b, c) {
            F.length = 0;
            var d = this.constrain(this.toGrid([l[0] + a, l[1] + b]), p), e = {
                x: d[0],
                y: d[1],
                w: this.size[0],
                h: this.size[1]
            }, f = null;
            this.params.setPosition(p, d);
            for (var g = 0; g < E.length; g++) {
                var h = {
                    x: E[g].position[0],
                    y: E[g].position[1],
                    w: E[g].size[0],
                    h: E[g].size[1]
                };
                this.params.intersects(e, h) && (t || null == f || f == E[g].el) && E[g].canDrop(this) ? (f || (f = E[g].el), F.push(E[g]), E[g].setHover(this, !0, c)) : E[g].isHover() && E[g].setHover(this, !1, c)
            }
            H("drag", {el: this.el, pos: d, e: c, drag: this})
        }, this.destroy = function () {
            this.params.unbind(this.el, "mousedown", this.downListener), this.params.unbind(document, "mousemove", this.moveListener), this.params.unbind(document, "mouseup", this.upListener), this.downListener = null, this.upListener = null, this.moveListener = null
        }, this.params.bind(this.el, "mousedown", this.downListener), this.params.handle ? C(this.params.handle, !1) : C(this.params.filter, this.params.filterExclude)
    }, x = function (a, b, c) {
        this._class = c.droppable, this.params = b || {}, this._activeClass = this.params.activeClass || c.active, this._hoverClass = this.params.hoverClass || c.hover, v.apply(this, arguments);
        var d = !1;
        this.allowLoopback = this.params.allowLoopback !== !1, this.setActive = function (a) {
            this.params[a ? "addClass" : "removeClass"](this.el, this._activeClass)
        }, this.updatePosition = function () {
            this.position = this.params.getPosition(this.el), this.size = this.params.getSize(this.el)
        }, this.canDrop = this.params.canDrop || function () {
                return !0
            }, this.isHover = function () {
            return d
        }, this.setHover = function (a, b, c) {
            (b || null == this.el._katavorioDragHover || this.el._katavorioDragHover == a.el._katavorio) && (this.params[b ? "addClass" : "removeClass"](this.el, this._hoverClass), this.el._katavorioDragHover = b ? a.el._katavorio : null, d !== b && this.params.events[b ? "over" : "out"]({
                el: this.el,
                e: c,
                drag: a,
                drop: this
            }), d = b)
        }, this.drop = function (a, b) {
            return this.params.events.drop({drag: a, e: b, drop: this})
        }, this.destroy = function () {
            this._class = null, this._activeClass = null, this._hoverClass = null, d = null
        }
    }, y = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
            var b = 0 | 16 * Math.random(), c = "x" == a ? b : 8 | 3 & b;
            return c.toString(16)
        })
    }, z = function (a) {
        return null == a ? null : (a = "string" == typeof a || a.constructor == String ? document.getElementById(a) : a, null == a ? null : (a._katavorio = a._katavorio || y(), a))
    };
    this.Katavorio = function (b) {
        var c = [], d = {};
        this._dragsByScope = {}, this._dropsByScope = {};
        var e = 1, f = function (a, b) {
            r(a, function (a) {
                for (var c = 0; c < a.scopes.length; c++)b[a.scopes[c]] = b[a.scopes[c]] || [], b[a.scopes[c]].push(a)
            })
        }, g = function (a, c) {
            var d = 0;
            return r(a, function (a) {
                for (var e = 0; e < a.scopes.length; e++)if (c[a.scopes[e]]) {
                    var f = b.indexOf(c[a.scopes[e]], a);
                    -1 != f && (c[a.scopes[e]].splice(f, 1), d++)
                }
            }), d > 0
        }, h = (this.getMatchingDroppables = function (a) {
            for (var b = [], c = {}, d = 0; d < a.scopes.length; d++) {
                var e = this._dropsByScope[a.scopes[d]];
                if (e)for (var f = 0; f < e.length; f++)!e[f].canDrop(a) || c[e[f].uuid] || !e[f].allowLoopback && e[f].el === a.el || (c[e[f].uuid] = !0, b.push(e[f]))
            }
            return b
        }, function (a) {
            a = a || {};
            var c, d = {events: {}};
            for (c in b)d[c] = b[c];
            for (c in a)d[c] = a[c];
            for (c = 0; c < m.length; c++)d.events[m[c]] = a[m[c]] || n;
            return d.katavorio = this, d
        }.bind(this)), i = function (a, b) {
            for (var c = 0; c < m.length; c++)b[m[c]] && a.on(m[c], b[m[c]])
        }.bind(this), j = {}, o = b.css || {}, q = b.scope || l;
        for (var s in k)j[s] = k[s];
        for (var s in o)j[s] = o[s];
        var u = b.inputFilterSelector || t;
        this.getInputFilterSelector = function () {
            return u
        }, this.setInputFilterSelector = function (a) {
            return u = a, this
        }, this.draggable = function (a, c) {
            var d = [];
            return r(a, function (a) {
                if (a = z(a), null != a)if (null == a._katavorioDrag) {
                    var e = h(c);
                    a._katavorioDrag = new w(a, e, j, q), f(a._katavorioDrag, this._dragsByScope), d.push(a._katavorioDrag), b.addClass(a, j.draggable)
                } else i(a._katavorioDrag, c)
            }.bind(this)), d
        }, this.droppable = function (a, c) {
            var d = [];
            return r(a, function (a) {
                if (a = z(a), null != a) {
                    var e = new x(a, h(c), j, q);
                    a._katavorioDrop = a._katavorioDrop || [], a._katavorioDrop.push(e), f(e, this._dropsByScope), d.push(e), b.addClass(a, j.droppable)
                }
            }.bind(this)), d
        }, this.select = function (a) {
            return r(a, function () {
                var a = z(this);
                a && a._katavorioDrag && (d[a._katavorio] || (c.push(a._katavorioDrag), d[a._katavorio] = [a, c.length - 1], b.addClass(a, j.selected)))
            }), this
        }, this.deselect = function (a) {
            return r(a, function () {
                var a = z(this);
                if (a && a._katavorio) {
                    var e = d[a._katavorio];
                    if (e) {
                        for (var f = [], g = 0; g < c.length; g++)c[g].el !== a && f.push(c[g]);
                        c = f, delete d[a._katavorio], b.removeClass(a, j.selected)
                    }
                }
            }), this
        }, this.deselectAll = function () {
            for (var a in d) {
                var e = d[a];
                b.removeClass(e[0], j.selected)
            }
            c.length = 0, d = {}
        }, this.markSelection = function (a) {
            p(c, function (a) {
                a.mark()
            }, a)
        }, this.markPosses = function (a) {
            a.posses && r(a.posses, function (b) {
                a.posseRoles[b] && A[b] && p(A[b].members, function (a) {
                    a.mark()
                }, a)
            })
        }, this.unmarkSelection = function (a, b) {
            p(c, function (a) {
                a.unmark(b)
            }, a)
        }, this.unmarkPosses = function (a, b) {
            a.posses && r(a.posses, function (c) {
                a.posseRoles[c] && A[c] && p(A[c].members, function (a) {
                    a.unmark(b)
                }, a)
            })
        }, this.getSelection = function () {
            return c.slice(0)
        }, this.updateSelection = function (a, b, d) {
            p(c, function (c) {
                c.moveBy(a, b)
            }, d)
        }, this.updatePosses = function (a, b, c) {
            c.posses && r(c.posses, function (d) {
                c.posseRoles[d] && A[d] && p(A[d].members, function (c) {
                    c.moveBy(a, b)
                }, c)
            })
        }, this.notifySelectionDragStop = function (a, b) {
            p(c, function (a) {
                a.stop(b, !0)
            }, a)
        }, this.notifySelectionDragStart = function (a, b) {
            p(c, function (a) {
                a.notifyStart(b)
            }, a)
        }, this.setZoom = function (a) {
            e = a
        }, this.getZoom = function () {
            return e
        };
        var v = function (a, b, c, d) {
            r(a, function (a) {
                g(a, c), a[d](b), f(a, c)
            })
        };
        r(["set", "add", "remove", "toggle"], function (a) {
            this[a + "Scope"] = function (b, c) {
                v(b._katavorioDrag, c, this._dragsByScope, a + "Scope"), v(b._katavorioDrop, c, this._dropsByScope, a + "Scope")
            }.bind(this), this[a + "DragScope"] = function (b, c) {
                v(b._katavorioDrag, c, this._dragsByScope, a + "Scope")
            }.bind(this), this[a + "DropScope"] = function (b, c) {
                v(b._katavorioDrop, c, this._dropsByScope, a + "Scope")
            }.bind(this)
        }.bind(this)), this.snapToGrid = function (a, b) {
            for (var c in this._dragsByScope)p(this._dragsByScope[c], function (c) {
                c.snap(a, b)
            })
        }, this.getDragsForScope = function (a) {
            return this._dragsByScope[a]
        }, this.getDropsForScope = function (a) {
            return this._dropsByScope[a]
        };
        var y = function (a, b, c) {
            a = z(a), a[b] && (g(a[b], c) && r(a[b], function (a) {
                a.destroy()
            }), a[b] = null)
        };
        this.elementRemoved = function (a) {
            this.destroyDraggable(a), this.destroyDroppable(a)
        }, this.destroyDraggable = function (a) {
            y(a, "_katavorioDrag", this._dragsByScope)
        }, this.destroyDroppable = function (a) {
            y(a, "_katavorioDrop", this._dropsByScope)
        }, this.reset = function () {
            this._dragsByScope = {}, this._dropsByScope = {}, c = [], d = {}, A = {}
        };
        var A = {};
        this.addToPosse = function (b) {
            for (var c, d, e = [], f = function (f) {
                c = a(f) ? f : f.id, d = a(f) ? !0 : f.active !== !1;
                var g = A[c] || function () {
                        var a = {name: c, members: []};
                        return A[c] = a, a
                    }();
                r(b, function (a) {
                    a._katavorioDrag && (g.members.suggest(a._katavorioDrag), a._katavorioDrag.posses.suggest(g.name), a._katavorioDrag.posseRoles[g.name] = d)
                }), e.push(g)
            }, g = 1; g < arguments.length; g++)f(arguments[g]);
            return 1 == e.length ? e[0] : e
        }, this.removeFromPosse = function (a, b) {
            if (arguments.length < 2)throw new TypeError("No posse id provided for remove operation");
            for (var c = 1; c < arguments.length; c++)b = arguments[c], r(a, function (a) {
                if (a._katavorioDrag && a._katavorioDrag.posses) {
                    var c = a._katavorioDrag;
                    r(b, function (a) {
                        A[a].members.vanquish(c), c.posses.vanquish(a), delete c.posseRoles[a]
                    })
                }
            })
        }, this.removeFromAllPosses = function (a) {
            r(a, function (a) {
                if (a._katavorioDrag && a._katavorioDrag.posses) {
                    var b = a._katavorioDrag;
                    r(b.posses, function (a) {
                        A[a].members.vanquish(b)
                    }), b.posses.length = 0, b.posseRoles = {}
                }
            })
        }
    }
}.call(this), function () {
    var a = function (a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    }, b = function (a) {
        return "[object Number]" === Object.prototype.toString.call(a)
    }, c = function (a) {
        return "string" == typeof a
    }, d = function (a) {
        return "boolean" == typeof a
    }, e = function (a) {
        return null == a
    }, f = function (a) {
        return null == a ? !1 : "[object Object]" === Object.prototype.toString.call(a)
    }, g = function (a) {
        return "[object Date]" === Object.prototype.toString.call(a)
    }, h = function (a) {
        return "[object Function]" === Object.prototype.toString.call(a)
    }, i = function (a) {
        for (var b in a)if (a.hasOwnProperty(b))return !1;
        return !0
    }, j = this, k = j.jsPlumbUtil = {
        isArray: a,
        isString: c,
        isBoolean: d,
        isNull: e,
        isObject: f,
        isDate: g,
        isFunction: h,
        isEmpty: i,
        isNumber: b,
        clone: function (b) {
            if (c(b))return "" + b;
            if (d(b))return !!b;
            if (g(b))return new Date(b.getTime());
            if (h(b))return b;
            if (a(b)) {
                for (var e = [], i = 0; i < b.length; i++)e.push(this.clone(b[i]));
                return e
            }
            if (f(b)) {
                var j = {};
                for (var k in b)j[k] = this.clone(b[k]);
                return j
            }
            return b
        },
        merge: function (b, e, g) {
            var h, i, j = {};
            for (g = g || [], i = 0; i < g.length; i++)j[g[i]] = !0;
            var k = this.clone(b);
            for (i in e)if (null == k[i])k[i] = e[i]; else if (c(e[i]) || d(e[i]))j[i] ? (h = [], h.push.apply(h, a(k[i]) ? k[i] : [k[i]]), h.push.apply(h, a(e[i]) ? e[i] : [e[i]]), k[i] = h) : k[i] = e[i]; else if (a(e[i]))h = [], a(k[i]) && h.push.apply(h, k[i]), h.push.apply(h, e[i]), k[i] = h; else if (f(e[i])) {
                f(k[i]) || (k[i] = {});
                for (var l in e[i])k[i][l] = e[i][l]
            }
            return k
        },
        replace: function (a, b, c) {
            if (null != a) {
                var d = a, e = d;
                return b.replace(/([^\.])+/g, function (a, b, d, f) {
                    var g = a.match(/([^\[0-9]+){1}(\[)([0-9+])/), h = d + a.length >= f.length, i = function () {
                        return e[g[1]] || function () {
                                return e[g[1]] = [], e[g[1]]
                            }()
                    };
                    if (h)g ? i()[g[3]] = c : e[a] = c; else if (g) {
                        var j = i();
                        e = j[g[3]] || function () {
                                return j[g[3]] = {}, j[g[3]]
                            }()
                    } else e = e[a] || function () {
                            return e[a] = {}, e[a]
                        }()
                }), a
            }
        },
        functionChain: function (a, b, c) {
            for (var d = 0; d < c.length; d++) {
                var e = c[d][0][c[d][1]].apply(c[d][0], c[d][2]);
                if (e === b)return e
            }
            return a
        },
        populate: function (b, d) {
            var e = function (a) {
                var b = a.match(/(\${.*?})/g);
                if (null != b)for (var c = 0; c < b.length; c++) {
                    var e = d[b[c].substring(2, b[c].length - 1)] || "";
                    null != e && (a = a.replace(b[c], e))
                }
                return a
            }, g = function (b) {
                if (null != b) {
                    if (c(b))return e(b);
                    if (a(b)) {
                        for (var d = [], h = 0; h < b.length; h++)d.push(g(b[h]));
                        return d
                    }
                    if (f(b)) {
                        var i = {};
                        for (var j in b)i[j] = g(b[j]);
                        return i
                    }
                    return b
                }
            };
            return g(b)
        },
        findWithFunction: function (a, b) {
            if (a)for (var c = 0; c < a.length; c++)if (b(a[c]))return c;
            return -1
        },
        removeWithFunction: function (a, b) {
            var c = k.findWithFunction(a, b);
            return c > -1 && a.splice(c, 1), -1 != c
        },
        remove: function (a, b) {
            var c = a.indexOf(b);
            return c > -1 && a.splice(c, 1), -1 != c
        },
        addWithFunction: function (a, b, c) {
            -1 == k.findWithFunction(a, c) && a.push(b)
        },
        addToList: function (a, b, c, d) {
            var e = a[b];
            return null == e && (e = [], a[b] = e), e[d ? "unshift" : "push"](c), e
        },
        extend: function (b, c) {
            var d;
            for (c = a(c) ? c : [c], d = 0; d < c.length; d++)for (var e in c[d].prototype)c[d].prototype.hasOwnProperty(e) && (b.prototype[e] = c[d].prototype[e]);
            var f = function (a, b) {
                return function () {
                    for (d = 0; d < c.length; d++)c[d].prototype[a] && c[d].prototype[a].apply(this, arguments);
                    return b.apply(this, arguments)
                }
            }, g = function (a) {
                for (var c in a)b.prototype[c] = f(c, a[c])
            };
            if (arguments.length > 2)for (d = 2; d < arguments.length; d++)g(arguments[d]);
            return b
        },
        uuid: function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
                var b = 0 | 16 * Math.random(), c = "x" == a ? b : 8 | 3 & b;
                return c.toString(16)
            })
        },
        logEnabled: !0,
        log: function () {
            if (k.logEnabled && "undefined" != typeof console)try {
                var a = arguments[arguments.length - 1];
                console.log(a)
            } catch (b) {
            }
        },
        wrap: function (a, b, c) {
            return a = a || function () {
                }, b = b || function () {
                }, function () {
                var d = null;
                try {
                    d = b.apply(this, arguments)
                } catch (e) {
                    k.log("jsPlumb function failed : " + e)
                }
                if (null == c || d !== c)try {
                    d = a.apply(this, arguments)
                } catch (e) {
                    k.log("wrapped function failed : " + e)
                }
                return d
            }
        }
    };
    k.EventGenerator = function () {
        var a = {}, b = !1, c = {ready: !0};
        this.bind = function (b, c, d) {
            var e = function (b) {
                k.addToList(a, b, c, d), c.__jsPlumb = c.__jsPlumb || {}, c.__jsPlumb[jsPlumbUtil.uuid()] = b
            };
            if ("string" == typeof b)e(b); else if (null != b.length)for (var f = 0; f < b.length; f++)e(b[f]);
            return this
        }, this.fire = function (d, e, f) {
            if (!b && a[d]) {
                var g = a[d].length, h = 0, i = !1, j = null;
                if (!this.shouldFireEvent || this.shouldFireEvent(d, e, f))for (; !i && g > h && j !== !1;) {
                    if (c[d])a[d][h].apply(this, [e, f]); else try {
                        j = a[d][h].apply(this, [e, f])
                    } catch (l) {
                        k.log("jsPlumb: fire failed for event " + d + " : " + l)
                    }
                    h++, (null == a || null == a[d]) && (i = !0)
                }
            }
            return this
        }, this.unbind = function (b, c) {
            if (0 === arguments.length)a = {}; else if (1 === arguments.length) {
                if ("string" == typeof b)delete a[b]; else if (b.__jsPlumb) {
                    var d;
                    for (var e in b.__jsPlumb)d = b.__jsPlumb[e], k.remove(a[d] || [], b)
                }
            } else 2 === arguments.length && k.remove(a[b] || [], c);
            return this
        }, this.getListener = function (b) {
            return a[b]
        }, this.setSuspendEvents = function (a) {
            b = a
        }, this.isSuspendEvents = function () {
            return b
        }, this.silently = function (a) {
            this.setSuspendEvents(!0);
            try {
                a()
            } catch (b) {
                jsPlumbUtil.log("Cannot execute silent function " + b)
            }
            this.setSuspendEvents(!1)
        }, this.cleanupListeners = function () {
            for (var b in a)a[b] = null
        }
    }, k.EventGenerator.prototype = {
        cleanup: function () {
            this.cleanupListeners()
        }
    }
}.call(this), function () {
    "use strict";
    var a = this, b = a.jsPlumbUtil;
    b.matchesSelector = function (a, b, c) {
        c = c || a.parentNode;
        for (var d = c.querySelectorAll(b), e = 0; e < d.length; e++)if (d[e] === a)return !0;
        return !1
    }, b.consume = function (a, b) {
        a.stopPropagation ? a.stopPropagation() : a.returnValue = !1, !b && a.preventDefault && a.preventDefault()
    }, b.sizeElement = function (a, b, c, d, e) {
        a && (a.style.height = e + "px", a.height = e, a.style.width = d + "px", a.width = d, a.style.left = b + "px", a.style.top = c + "px")
    }
}.call(this), function () {
    "use strict";
    var a, b = this, c = [], d = b.jsPlumbUtil, e = function () {
        return "" + (new Date).getTime()
    }, f = function (a) {
        if (a._jsPlumb.paintStyle && a._jsPlumb.hoverPaintStyle) {
            var b = {};
            r.extend(b, a._jsPlumb.paintStyle), r.extend(b, a._jsPlumb.hoverPaintStyle), delete a._jsPlumb.hoverPaintStyle, b.gradient && a._jsPlumb.paintStyle.fillStyle && delete b.gradient, a._jsPlumb.hoverPaintStyle = b
        }
    }, g = ["tap", "dbltap", "click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "contextmenu"], h = function (a, b, c, d) {
        var e = a.getAttachedElements();
        if (e)for (var f = 0, g = e.length; g > f; f++)d && d == e[f] || e[f].setHover(b, !0, c)
    }, i = function (a) {
        return null == a ? null : a.split(" ")
    }, j = function (a, b, c) {
        for (var d in b)a[d] = c
    }, k = function (a, b) {
        b = jsPlumbUtil.isArray(b) || null != b.length && !jsPlumbUtil.isString(b) ? b : [b];
        for (var c = 0; c < b.length; c++)try {
            a.apply(b[c], [b[c]])
        } catch (d) {
            jsPlumbUtil.log(".each iteration failed : " + d)
        }
    }, l = function (a, b, c) {
        if (a.getDefaultType) {
            var e = a.getTypeDescriptor(), f = {}, g = a.getDefaultType(), h = d.merge({}, g);
            j(f, g, "__default");
            for (var i = 0, k = a._jsPlumb.types.length; k > i; i++) {
                var l = a._jsPlumb.types[i];
                if ("__default" !== l) {
                    var m = a._jsPlumb.instance.getType(l, e);
                    null != m && (h = d.merge(h, m, ["cssClass"]), j(f, m, l))
                }
            }
            b && (h = d.populate(h, b)), a.applyType(h, c, f), c || a.repaint()
        }
    }, m = window.jsPlumbUIComponent = function (a) {
        jsPlumbUtil.EventGenerator.apply(this, arguments);
        var b = this, c = arguments, e = b.idPrefix, f = e + (new Date).getTime();
        this._jsPlumb = {
            instance: a._jsPlumb,
            parameters: a.parameters || {},
            paintStyle: null,
            hoverPaintStyle: null,
            paintStyleInUse: null,
            hover: !1,
            beforeDetach: a.beforeDetach,
            beforeDrop: a.beforeDrop,
            overlayPlacements: [],
            hoverClass: a.hoverClass || a._jsPlumb.Defaults.HoverClass,
            types: [],
            typeCache: {}
        }, this.cacheTypeItem = function (a, b, c) {
            this._jsPlumb.typeCache[c] = this._jsPlumb.typeCache[c] || {}, this._jsPlumb.typeCache[c][a] = b
        }, this.getCachedTypeItem = function (a, b) {
            return this._jsPlumb.typeCache[b] ? this._jsPlumb.typeCache[b][a] : null
        }, this.getId = function () {
            return f
        };
        var g = a.overlays || [], h = {};
        if (this.defaultOverlayKeys) {
            for (var i = 0; i < this.defaultOverlayKeys.length; i++)Array.prototype.push.apply(g, this._jsPlumb.instance.Defaults[this.defaultOverlayKeys[i]] || []);
            for (i = 0; i < g.length; i++) {
                var j = r.convertToFullOverlaySpec(g[i]);
                h[j[1].id] = j
            }
        }
        var k = {
            overlays: h,
            parameters: a.parameters || {},
            scope: a.scope || this._jsPlumb.instance.getDefaultScope()
        };
        if (this.getDefaultType = function () {
                return k
            }, this.appendToDefaultType = function (a) {
                for (var b in a)k[b] = a[b]
            }, a.events)for (i in a.events)b.bind(i, a.events[i]);
        this.clone = function () {
            var a = {};
            return this.constructor.apply(a, c), a
        }.bind(this), this.isDetachAllowed = function (a) {
            var b = !0;
            if (this._jsPlumb.beforeDetach)try {
                b = this._jsPlumb.beforeDetach(a)
            } catch (c) {
                d.log("jsPlumb: beforeDetach callback failed", c)
            }
            return b
        }, this.isDropAllowed = function (a, b, c, e, f, g, h) {
            var i = this._jsPlumb.instance.checkCondition("beforeDrop", {
                sourceId: a,
                targetId: b,
                scope: c,
                connection: e,
                dropEndpoint: f,
                source: g,
                target: h
            });
            if (this._jsPlumb.beforeDrop)try {
                i = this._jsPlumb.beforeDrop({
                    sourceId: a,
                    targetId: b,
                    scope: c,
                    connection: e,
                    dropEndpoint: f,
                    source: g,
                    target: h
                })
            } catch (j) {
                d.log("jsPlumb: beforeDrop callback failed", j)
            }
            return i
        };
        var l = [];
        this.setListenerComponent = function (a) {
            for (var b = 0; b < l.length; b++)l[b][3] = a
        }
    }, n = function (a, b) {
        var c = a._jsPlumb.types[b], d = a._jsPlumb.instance.getType(c, a.getTypeDescriptor());
        null != d && d.cssClass && a.canvas && a._jsPlumb.instance.removeClass(a.canvas, d.cssClass)
    };
    jsPlumbUtil.extend(m, jsPlumbUtil.EventGenerator, {
        getParameter: function (a) {
            return this._jsPlumb.parameters[a]
        }, setParameter: function (a, b) {
            this._jsPlumb.parameters[a] = b
        }, getParameters: function () {
            return this._jsPlumb.parameters
        }, setParameters: function (a) {
            this._jsPlumb.parameters = a
        }, getClass: function () {
            return r.getClass(this.canvas)
        }, hasClass: function (a) {
            return r.hasClass(this.canvas, a)
        }, addClass: function (a) {
            r.addClass(this.canvas, a)
        }, removeClass: function (a) {
            r.removeClass(this.canvas, a)
        }, updateClasses: function (a, b) {
            r.updateClasses(this.canvas, a, b)
        }, setType: function (a, b, c) {
            this.clearTypes(), this._jsPlumb.types = i(a) || [], l(this, b, c)
        }, getType: function () {
            return this._jsPlumb.types
        }, reapplyTypes: function (a, b) {
            l(this, a, b)
        }, hasType: function (a) {
            return -1 != this._jsPlumb.types.indexOf(a)
        }, addType: function (a, b, c) {
            var d = i(a), e = !1;
            if (null != d) {
                for (var f = 0, g = d.length; g > f; f++)this.hasType(d[f]) || (this._jsPlumb.types.push(d[f]), e = !0);
                e && l(this, b, c)
            }
        }, removeType: function (a, b) {
            var c = i(a), d = !1, e = function (a) {
                var b = this._jsPlumb.types.indexOf(a);
                return -1 != b ? (n(this, b), this._jsPlumb.types.splice(b, 1), !0) : !1
            }.bind(this);
            if (null != c) {
                for (var f = 0, g = c.length; g > f; f++)d = e(c[f]) || d;
                d && l(this, null, b)
            }
        }, clearTypes: function (a) {
            for (var b = this._jsPlumb.types.length, c = 0; b > c; c++)n(this, 0), this._jsPlumb.types.splice(0, 1);
            l(this, {}, a)
        }, toggleType: function (a, b, c) {
            var d = i(a);
            if (null != d) {
                for (var e = 0, f = d.length; f > e; e++) {
                    var g = this._jsPlumb.types.indexOf(d[e]);
                    -1 != g ? (n(this, g), this._jsPlumb.types.splice(g, 1)) : this._jsPlumb.types.push(d[e])
                }
                l(this, b, c)
            }
        }, applyType: function (a, b) {
            if (this.setPaintStyle(a.paintStyle, b), this.setHoverPaintStyle(a.hoverPaintStyle, b), a.parameters)for (var c in a.parameters)this.setParameter(c, a.parameters[c]);
            this._jsPlumb.paintStyleInUse = this.getPaintStyle()
        }, setPaintStyle: function (a, b) {
            this._jsPlumb.paintStyle = a, this._jsPlumb.paintStyleInUse = this._jsPlumb.paintStyle, f(this), b || this.repaint()
        }, getPaintStyle: function () {
            return this._jsPlumb.paintStyle
        }, setHoverPaintStyle: function (a, b) {
            this._jsPlumb.hoverPaintStyle = a, f(this), b || this.repaint()
        }, getHoverPaintStyle: function () {
            return this._jsPlumb.hoverPaintStyle
        }, destroy: function (a) {
            (a || null == this.typeId) && (this.cleanupListeners(), this.clone = null, this._jsPlumb = null)
        }, isHover: function () {
            return this._jsPlumb.hover
        }, setHover: function (a, b, c) {
            if (this._jsPlumb && !this._jsPlumb.instance.currentlyDragging && !this._jsPlumb.instance.isHoverSuspended()) {
                if (this._jsPlumb.hover = a, null != this.canvas) {
                    if (null != this._jsPlumb.instance.hoverClass) {
                        var d = a ? "addClass" : "removeClass";
                        this._jsPlumb.instance[d](this.canvas, this._jsPlumb.instance.hoverClass)
                    }
                    null != this._jsPlumb.hoverClass && this._jsPlumb.instance[d](this.canvas, this._jsPlumb.hoverClass)
                }
                null != this._jsPlumb.hoverPaintStyle && (this._jsPlumb.paintStyleInUse = a ? this._jsPlumb.hoverPaintStyle : this._jsPlumb.paintStyle, this._jsPlumb.instance.isSuspendDrawing() || (c = c || e(), this.repaint({
                    timestamp: c,
                    recalc: !1
                }))), this.getAttachedElements && !b && h(this, a, e(), this)
            }
        }
    });
    var o = 0, p = function () {
        var a = o + 1;
        return o++, a
    }, q = window.jsPlumbInstance = function (b) {
        this.Defaults = {
            Anchor: "Bottom",
            Anchors: [null, null],
            ConnectionsDetachable: !0,
            ConnectionOverlays: [],
            Connector: "Bezier",
            Container: null,
            DoNotThrowErrors: !1,
            DragOptions: {},
            DropOptions: {},
            Endpoint: "Dot",
            EndpointOverlays: [],
            Endpoints: [null, null],
            EndpointStyle: {fillStyle: "#456"},
            EndpointStyles: [null, null],
            EndpointHoverStyle: null,
            EndpointHoverStyles: [null, null],
            HoverPaintStyle: null,
            LabelStyle: {color: "black"},
            LogEnabled: !1,
            Overlays: [],
            MaxConnections: 1,
            PaintStyle: {lineWidth: 4, strokeStyle: "#456"},
            ReattachConnections: !1,
            RenderMode: "svg",
            Scope: "jsPlumb_DefaultScope"
        }, b && r.extend(this.Defaults, b), this.logEnabled = this.Defaults.LogEnabled, this._connectionTypes = {}, this._endpointTypes = {}, jsPlumbUtil.EventGenerator.apply(this);
        var f = this, h = p(), i = f.bind, j = {}, l = 1, n = function (a) {
            if (null == a)return null;
            if (3 == a.nodeType || 8 == a.nodeType)return {el: a, text: !0};
            var b = f.getElement(a);
            return {el: b, id: jsPlumbUtil.isString(a) && null == b ? a : Y(b)}
        };
        this.getInstanceIndex = function () {
            return h
        }, this.setZoom = function (a, b) {
            return l = a, f.fire("zoom", l), b && f.repaintEverything(), !0
        }, this.getZoom = function () {
            return l
        };
        for (var o in this.Defaults)j[o] = this.Defaults[o];
        var q, s = [];
        this.unbindContainer = function () {
            if (null != q && s.length > 0)for (var a = 0; a < s.length; a++)f.off(q, s[a][0], s[a][1])
        }, this.setContainer = function (a) {
            this.unbindContainer(), a = this.getElement(a), this.select().each(function (b) {
                b.moveParent(a)
            }), this.selectEndpoints().each(function (b) {
                b.moveParent(a)
            });
            var b = q;
            q = a, s.length = 0;
            for (var c = function (a, b) {
                var c = b.srcElement || b.target, d = (c && c.parentNode ? c.parentNode._jsPlumb : null) || (c ? c._jsPlumb : null) || (c && c.parentNode && c.parentNode.parentNode ? c.parentNode.parentNode._jsPlumb : null);
                d && (d.fire(a, d, b), f.fire(a, d.component || d, b))
            }, d = function (a, b, c) {
                s.push([a, c]), f.on(q, a, b, c)
            }, e = function (a) {
                d(a, ".jsplumb-connector > *", function (b) {
                    c(a, b)
                }), d(a, ".jsplumb-endpoint, .jsplumb-endpoint > *, .jsplumb-endpoint svg *", function (b) {
                    c(a, b)
                }), d(a, ".jsplumb-overlay, .jsplumb-overlay *", function (b) {
                    c(a, b)
                })
            }, h = 0; h < g.length; h++)e(g[h]);
            for (var i in y) {
                var j = y[i].el;
                j.parentNode === b && (b.removeChild(j), q.appendChild(j))
            }
        }, this.getContainer = function () {
            return q
        }, this.bind = function (a, b) {
            "ready" === a && u ? b() : i.apply(f, [a, b])
        }, f.importDefaults = function (a) {
            for (var b in a)f.Defaults[b] = a[b];
            return a.Container && f.setContainer(a.Container), f
        }, f.restoreDefaults = function () {
            return f.Defaults = r.extend({}, j), f
        };
        var t = null, u = !1, v = [], w = {}, x = {}, y = {}, z = {}, A = {}, B = {}, C = !1, D = [], E = !1, F = null, G = this.Defaults.Scope, H = 1, I = function () {
            return "" + H++
        }, J = function (a, b) {
            q ? q.appendChild(a) : b ? this.getElement(b).appendChild(a) : this.appendToRoot(a)
        }.bind(this), K = function (a, b, c, d) {
            if (!r.headless && !E) {
                var g = Y(a), h = f.getDragManager().getElementsForDraggable(g);
                null == c && (c = e());
                var i = qb({elId: g, offset: b, recalc: !1, timestamp: c});
                if (h)for (var j in h)qb({
                    elId: h[j].id,
                    offset: {
                        left: i.o.left + h[j].offset.left,
                        top: i.o.top + h[j].offset.top
                    },
                    recalc: !1,
                    timestamp: c
                });
                if (f.anchorManager.redraw(g, b, c, null, d), h)for (var k in h)f.anchorManager.redraw(h[k].id, b, c, h[k].offset, d, !0)
            }
        }, L = function (a) {
            return x[a]
        }, M = function (a, b, c, e) {
            if (!r.headless) {
                var g = null == b ? !1 : b;
                if (g && r.isDragSupported(a, f)) {
                    var h = c || f.Defaults.DragOptions;
                    if (h = r.extend({}, h), r.isAlreadyDraggable(a, f))c.force && f.initDraggable(a, h); else {
                        var i = r.dragEvents.drag, j = r.dragEvents.stop, k = r.dragEvents.start, l = f.getElement(a), m = f.getDragManager().getDragAncestor(l), n = {
                            left: 0,
                            top: 0
                        }, o = n, p = !1;
                        pb(e, a), h[k] = d.wrap(h[k], function () {
                            return o = null != m ? f.getOffset(m) : n, f.setHoverSuspended(!0), f.select({source: a}).addClass(f.elementDraggingClass + " " + f.sourceElementDraggingClass, !0), f.select({target: a}).addClass(f.elementDraggingClass + " " + f.targetElementDraggingClass, !0), f.setConnectionBeingDragged(!0), h.canDrag ? c.canDrag() : void 0
                        }, !1), h[i] = d.wrap(h[i], function () {
                            var b = f.getUIPosition(arguments, f.getZoom());
                            b.left += o.left, b.top += o.top, K(a, b, null, !0), p && f.addClass(a, "jsplumb-dragged"), p = !0
                        }), h[j] = d.wrap(h[j], function () {
                            for (var a = arguments[0].selection, b = f.getUIPosition(arguments), c = function (a) {
                                K(a[0], b), f.removeClass(a[0], "jsplumb-dragged"), f.select({source: a[0]}).removeClass(f.elementDraggingClass + " " + f.sourceElementDraggingClass, !0), f.select({target: a[0]}).removeClass(f.elementDraggingClass + " " + f.targetElementDraggingClass, !0), f.getDragManager().dragEnded(a[0])
                            }, d = 0; d < a.length; d++)c(a[d]);
                            p = !1, f.setHoverSuspended(!1), f.setConnectionBeingDragged(!1)
                        });
                        var q = Y(a);
                        B[q] = !0;
                        var s = B[q];
                        h.disabled = null == s ? !1 : !s, f.initDraggable(a, h), f.getDragManager().register(a)
                    }
                }
            }
        }, N = function (a, b) {
            for (var c = a.scope.split(/\s/), d = b.scope.split(/\s/), e = 0; e < c.length; e++)for (var f = 0; f < d.length; f++)if (d[f] == c[e])return !0;
            return !1
        }, O = function (a, b) {
            var c = r.extend({}, a);
            if (b && r.extend(c, b), c.source && (c.source.endpoint ? c.sourceEndpoint = c.source : c.source = f.getElement(c.source)), c.target && (c.target.endpoint ? c.targetEndpoint = c.target : c.target = f.getElement(c.target)), a.uuids && (c.sourceEndpoint = L(a.uuids[0]), c.targetEndpoint = L(a.uuids[1])), c.sourceEndpoint && c.sourceEndpoint.isFull())return d.log(f, "could not add connection; source endpoint is full"), void 0;
            if (c.targetEndpoint && c.targetEndpoint.isFull())return d.log(f, "could not add connection; target endpoint is full"), void 0;
            if (!c.type && c.sourceEndpoint && (c.type = c.sourceEndpoint.connectionType), c.sourceEndpoint && c.sourceEndpoint.connectorOverlays) {
                c.overlays = c.overlays || [];
                for (var e = 0, g = c.sourceEndpoint.connectorOverlays.length; g > e; e++)c.overlays.push(c.sourceEndpoint.connectorOverlays[e])
            }
            !c["pointer-events"] && c.sourceEndpoint && c.sourceEndpoint.connectorPointerEvents && (c["pointer-events"] = c.sourceEndpoint.connectorPointerEvents);
            var h = function (a, b) {
                var c = r.extend({}, a);
                for (var d in b)b[d] && (c[d] = b[d]);
                return c
            }, i = function (a, b, d) {
                return f.addEndpoint(a, h(b, {
                    anchor: c.anchors ? c.anchors[d] : c.anchor,
                    endpoint: c.endpoints ? c.endpoints[d] : c.endpoint,
                    paintStyle: c.endpointStyles ? c.endpointStyles[d] : c.endpointStyle,
                    hoverPaintStyle: c.endpointHoverStyles ? c.endpointHoverStyles[d] : c.endpointHoverStyle
                }))
            }, j = function (a, b, d, e) {
                if (c[a] && !c[a].endpoint && !c[a + "Endpoint"] && !c.newConnection) {
                    var f = Y(c[a]), g = d[f];
                    if (g = g ? g[e] : null) {
                        if (!g.enabled)return !1;
                        var h = null != g.endpoint && g.endpoint._jsPlumb ? g.endpoint : i(c[a], g.def, b);
                        if (h.isFull())return !1;
                        c[a + "Endpoint"] = h, h._doNotDeleteOnDetach = !1, h._deleteOnDetach = !0, g.uniqueEndpoint && (g.endpoint ? h.finalEndpoint = g.endpoint : (g.endpoint = h, h._deleteOnDetach = !1, h._doNotDeleteOnDetach = !0))
                    }
                }
            };
            return j("source", 0, this.sourceEndpointDefinitions, c.type || "default") !== !1 && j("target", 1, this.targetEndpointDefinitions, c.type || "default") !== !1 ? (c.sourceEndpoint && c.targetEndpoint && (N(c.sourceEndpoint, c.targetEndpoint) || (c = null)), c) : void 0
        }.bind(f), P = function (a) {
            var b = f.Defaults.ConnectionType || f.getDefaultConnectionType();
            a._jsPlumb = f, a.newConnection = P, a.newEndpoint = R, a.endpointsByUUID = x, a.endpointsByElement = w, a.finaliseConnection = Q, a.id = "con_" + I();
            var c = new b(a);
            return c.isDetachable() && (c.endpoints[0].initDraggable("_jsPlumbSource"), c.endpoints[1].initDraggable("_jsPlumbTarget")), c
        }, Q = f.finaliseConnection = function (a, b, c, d) {
            if (b = b || {}, a.suspendedEndpoint || v.push(a), a.pending = null, a.endpoints[0].isTemporarySource = !1, d !== !1 && f.anchorManager.newConnection(a), K(a.source), !b.doNotFireConnectionEvent && b.fireEvent !== !1) {
                var e = {
                    connection: a,
                    source: a.source,
                    target: a.target,
                    sourceId: a.sourceId,
                    targetId: a.targetId,
                    sourceEndpoint: a.endpoints[0],
                    targetEndpoint: a.endpoints[1]
                };
                f.fire("connection", e, c)
            }
        }, R = function (a, b) {
            var c = f.Defaults.EndpointType || r.Endpoint, d = r.extend({}, a);
            d._jsPlumb = f, d.newConnection = P, d.newEndpoint = R, d.endpointsByUUID = x, d.endpointsByElement = w, d.fireDetachEvent = _, d.elementId = b || Y(d.source);
            var e = new c(d);
            return e.id = "ep_" + I(), pb(d.elementId, d.source), r.headless || f.getDragManager().endpointAdded(d.source, b), e
        }, S = function (a, b, c) {
            var d = w[a];
            if (d && d.length)for (var e = 0, f = d.length; f > e; e++) {
                for (var g = 0, h = d[e].connections.length; h > g; g++) {
                    var i = b(d[e].connections[g]);
                    if (i)return
                }
                c && c(d[e])
            }
        }, T = function (a, b) {
            return r.each(a, function (a) {
                f.isDragSupported(a) && (B[f.getAttribute(a, "id")] = b, f.setElementDraggable(a, b))
            })
        }, U = function (a, b, c) {
            b = "block" === b;
            var d = null;
            c && (d = b ? function (a) {
                a.setVisible(!0, !0, !0)
            } : function (a) {
                a.setVisible(!1, !0, !0)
            });
            var e = n(a);
            S(e.id, function (a) {
                if (b && c) {
                    var d = a.sourceId === e.id ? 1 : 0;
                    a.endpoints[d].isVisible() && a.setVisible(!0)
                } else a.setVisible(b)
            }, d)
        }, V = function (a) {
            return r.each(a, function (a) {
                var b = f.getAttribute(a, "id"), c = null == B[b] ? !1 : B[b];
                return c = !c, B[b] = c, f.setDraggable(a, c), c
            }.bind(this))
        }, W = function (a, b) {
            var c = null;
            b && (c = function (a) {
                var b = a.isVisible();
                a.setVisible(!b)
            }), S(a, function (a) {
                var b = a.isVisible();
                a.setVisible(!b)
            }, c)
        }, X = function (a) {
            var b = z[a];
            return b ? {o: b, s: D[a]} : qb({elId: a})
        }, Y = function (a, b, c) {
            if (jsPlumbUtil.isString(a))return a;
            if (null == a)return null;
            var d = f.getAttribute(a, "id");
            return d && "undefined" !== d || (2 == arguments.length && void 0 !== arguments[1] ? d = b : (1 == arguments.length || 3 == arguments.length && !arguments[2]) && (d = "jsPlumb_" + h + "_" + I()), c || f.setAttribute(a, "id", d)), d
        };
        this.setConnectionBeingDragged = function (a) {
            C = a
        }, this.isConnectionBeingDragged = function () {
            return C
        }, this.getManagedElements = function () {
            return y
        }, this.getRenderMode = function () {
            return "svg"
        }, this.connectorClass = "jsplumb-connector", this.connectorOutlineClass = "jsplumb-connector-outline", this.connectedClass = "jsplumb-connected", this.hoverClass = "jsplumb-hover", this.endpointClass = "jsplumb-endpoint", this.endpointConnectedClass = "jsplumb-endpoint-connected", this.endpointFullClass = "jsplumb-endpoint-full", this.endpointDropAllowedClass = "jsplumb-endpoint-drop-allowed", this.endpointDropForbiddenClass = "jsplumb-endpoint-drop-forbidden", this.overlayClass = "jsplumb-overlay", this.draggingClass = "jsplumb-dragging", this.elementDraggingClass = "jsplumb-element-dragging", this.sourceElementDraggingClass = "jsplumb-source-element-dragging", this.targetElementDraggingClass = "jsplumb-target-element-dragging", this.endpointAnchorClassPrefix = "jsplumb-endpoint-anchor", this.hoverSourceClass = "jsplumb-source-hover", this.hoverTargetClass = "jsplumb-target-hover", this.dragSelectClass = "jsplumb-drag-select", this.Anchors = {}, this.Connectors = {svg: {}}, this.Endpoints = {svg: {}}, this.Overlays = {svg: {}}, this.ConnectorRenderers = {}, this.SVG = "svg", this.addEndpoint = function (a, b, c) {
            c = c || {};
            var e = r.extend({}, c);
            r.extend(e, b), e.endpoint = e.endpoint || f.Defaults.Endpoint, e.paintStyle = e.paintStyle || f.Defaults.EndpointStyle;
            for (var g = [], h = d.isArray(a) || null != a.length && !d.isString(a) ? a : [a], i = 0, j = h.length; j > i; i++) {
                e.source = f.getElement(h[i]), nb(e.source);
                var k = Y(e.source), l = R(e, k), m = pb(k, e.source).info.o;
                d.addToList(w, k, l), E || l.paint({
                    anchorLoc: l.anchor.compute({
                        xy: [m.left, m.top],
                        wh: D[k],
                        element: l,
                        timestamp: F
                    }), timestamp: F
                }), g.push(l), l._doNotDeleteOnDetach = !0
            }
            return 1 == g.length ? g[0] : g
        }, this.addEndpoints = function (a, b, c) {
            for (var e = [], g = 0, h = b.length; h > g; g++) {
                var i = f.addEndpoint(a, b[g], c);
                d.isArray(i) ? Array.prototype.push.apply(e, i) : e.push(i)
            }
            return e
        }, this.animate = function (a, b, c) {
            if (!this.animationSupported)return !1;
            c = c || {};
            var e = f.getElement(a), g = Y(e), h = r.animEvents.step, i = r.animEvents.complete;
            c[h] = d.wrap(c[h], function () {
                f.revalidate(g)
            }), c[i] = d.wrap(c[i], function () {
                f.revalidate(g)
            }), f.doAnimate(e, b, c)
        }, this.checkCondition = function (a) {
            var b = f.getListener(a), c = !0;
            if (b && b.length > 0) {
                var e = Array.prototype.slice.call(arguments, 1);
                try {
                    for (var g = 0, h = b.length; h > g; g++)c = c && b[g].apply(b[g], e)
                } catch (i) {
                    d.log(f, "cannot check condition [" + a + "]" + i)
                }
            }
            return c
        }, this.connect = function (a, b) {
            var c, d = O(a, b);
            if (d) {
                if (null == d.source && null == d.sourceEndpoint)return jsPlumbUtil.log("Cannot establish connection - source does not exist"), void 0;
                if (null == d.target && null == d.targetEndpoint)return jsPlumbUtil.log("Cannot establish connection - target does not exist"), void 0;
                nb(d.source), c = P(d), Q(c, d)
            }
            return c
        };
        var Z = [{
            el: "source",
            elId: "sourceId",
            epDefs: "sourceEndpointDefinitions"
        }, {
            el: "target",
            elId: "targetId",
            epDefs: "targetEndpointDefinitions"
        }], $ = function (a, b, c, d) {
            var e, f, g, h = Z[c], i = a[h.elId], j = (a[h.el], a.endpoints[c]), k = {
                index: c,
                originalSourceId: 0 === c ? i : a.sourceId,
                newSourceId: a.sourceId,
                originalTargetId: 1 == c ? i : a.targetId,
                newTargetId: a.targetId,
                connection: a
            };
            if (b.constructor == r.Endpoint)e = b, e.addConnection(a); else if (f = Y(b), g = this[h.epDefs][f], f === a[h.elId])e = null; else if (g)for (var l in g) {
                if (!g[l].enabled)return;
                e = null != g[l].endpoint && g[l].endpoint._jsPlumb ? g[l].endpoint : this.addEndpoint(b, g[l].def), g[l].uniqueEndpoint && (g[l].endpoint = e), e._doNotDeleteOnDetach = !1, e._deleteOnDetach = !0, e.addConnection(a)
            } else e = a.makeEndpoint(0 === c, b, f), e._doNotDeleteOnDetach = !1, e._deleteOnDetach = !0;
            return null != e && (j.detachFromConnection(a), a.endpoints[c] = e, a[h.el] = e.element, a[h.elId] = e.elementId, k[0 === c ? "newSourceId" : "newTargetId"] = e.elementId, ab(k), d || a.repaint()), k
        }.bind(this);
        this.setSource = function (a, b, c) {
            var d = $(a, b, 0, c);
            this.anchorManager.sourceChanged(d.originalSourceId, d.newSourceId, a)
        }, this.setTarget = function (a, b, c) {
            var d = $(a, b, 1, c);
            this.anchorManager.updateOtherEndpoint(d.originalSourceId, d.originalTargetId, d.newTargetId, a)
        }, this.deleteEndpoint = function (a, b) {
            var c = "string" == typeof a ? x[a] : a;
            return c && f.deleteObject({endpoint: c, dontUpdateHover: b}), f
        }, this.deleteEveryEndpoint = function () {
            var a = f.setSuspendDrawing(!0);
            for (var b in w) {
                var c = w[b];
                if (c && c.length)for (var d = 0, e = c.length; e > d; d++)f.deleteEndpoint(c[d], !0)
            }
            return w = {}, y = {}, x = {}, z = {}, A = {}, f.anchorManager.reset(), f.getDragManager().reset(), a || f.setSuspendDrawing(!1), f
        };
        var _ = function (a, b, c) {
            var d = f.Defaults.ConnectionType || f.getDefaultConnectionType(), e = a.constructor == d, g = e ? {
                connection: a,
                source: a.source,
                target: a.target,
                sourceId: a.sourceId,
                targetId: a.targetId,
                sourceEndpoint: a.endpoints[0],
                targetEndpoint: a.endpoints[1]
            } : a;
            b && f.fire("connectionDetached", g, c), f.anchorManager.connectionDetached(g)
        }, ab = f.fireMoveEvent = function (a, b) {
            f.fire("connectionMoved", a, b)
        };
        this.unregisterEndpoint = function (a) {
            a._jsPlumb.uuid && (x[a._jsPlumb.uuid] = null), f.anchorManager.deleteEndpoint(a);
            for (var b in w) {
                var c = w[b];
                if (c) {
                    for (var d = [], e = 0, g = c.length; g > e; e++)c[e] != a && d.push(c[e]);
                    w[b] = d
                }
                w[b].length < 1 && delete w[b]
            }
        }, this.detach = function () {
            if (0 !== arguments.length) {
                var a = f.Defaults.ConnectionType || f.getDefaultConnectionType(), b = arguments[0].constructor == a, c = 2 == arguments.length ? b ? arguments[1] || {} : arguments[0] : arguments[0], d = c.fireEvent !== !1, e = c.forceDetach, g = b ? arguments[0] : c.connection;
                if (g)(e || jsPlumbUtil.functionChain(!0, !1, [[g.endpoints[0], "isDetachAllowed", [g]], [g.endpoints[1], "isDetachAllowed", [g]], [g, "isDetachAllowed", [g]], [f, "checkCondition", ["beforeDetach", g]]])) && g.endpoints[0].detach(g, !1, !0, d); else {
                    var h = r.extend({}, c);
                    if (h.uuids)L(h.uuids[0]).detachFrom(L(h.uuids[1]), d); else if (h.sourceEndpoint && h.targetEndpoint)h.sourceEndpoint.detachFrom(h.targetEndpoint); else {
                        var i = Y(f.getElement(h.source)), j = Y(f.getElement(h.target));
                        S(i, function (a) {
                            (a.sourceId == i && a.targetId == j || a.targetId == i && a.sourceId == j) && f.checkCondition("beforeDetach", a) && a.endpoints[0].detach(a, !1, !0, d)
                        })
                    }
                }
            }
        }, this.detachAllConnections = function (a, b) {
            b = b || {}, a = f.getElement(a);
            var c = Y(a), d = w[c];
            if (d && d.length)for (var e = 0, g = d.length; g > e; e++)d[e].detachAll(b.fireEvent !== !1, b.forceDetach);
            return f
        }, this.detachEveryConnection = function (a) {
            return a = a || {}, f.batch(function () {
                for (var b in w) {
                    var c = w[b];
                    if (c && c.length)for (var d = 0, e = c.length; e > d; d++)c[d].detachAll(a.fireEvent !== !1, a.forceDetach)
                }
                v.length = 0
            }), f
        }, this.deleteObject = function (a) {
            var b = {
                endpoints: {},
                connections: {},
                endpointCount: 0,
                connectionCount: 0
            }, c = (a.fireEvent !== !1, a.deleteAttachedObjects !== !1), d = function (d) {
                if (null != d && null == b.connections[d.id] && (a.dontUpdateHover || null == d._jsPlumb || d.setHover(!1), b.connections[d.id] = d, b.connectionCount++, c))for (var f = 0; f < d.endpoints.length; f++)d.endpoints[f]._deleteOnDetach && e(d.endpoints[f])
            }, e = function (e) {
                if (null != e && null == b.endpoints[e.id] && (a.dontUpdateHover || null == e._jsPlumb || e.setHover(!1), b.endpoints[e.id] = e, b.endpointCount++, c))for (var f = 0; f < e.connections.length; f++) {
                    var g = e.connections[f];
                    d(g)
                }
            };
            a.connection ? d(a.connection) : e(a.endpoint);
            for (var g in b.connections) {
                var h = b.connections[g];
                h._jsPlumb && (jsPlumbUtil.removeWithFunction(v, function (a) {
                    return h.id == a.id
                }), _(h, a.fireEvent === !1 ? !1 : !h.pending, a.originalEvent), h.endpoints[0].detachFromConnection(h), h.endpoints[1].detachFromConnection(h), h.cleanup(!0), h.destroy(!0))
            }
            for (var i in b.endpoints) {
                var j = b.endpoints[i];
                j._jsPlumb && (f.unregisterEndpoint(j), j.cleanup(!0), j.destroy(!0))
            }
            return b
        }, this.draggable = function (a, b) {
            var c;
            return k(function (a) {
                c = n(a), c.el && M(c.el, !0, b, c.id)
            }, a), f
        }, this.droppable = function (a, b) {
            var c;
            return b = b || {}, b.allowLoopback = !1, k(function (a) {
                c = n(a), c.el && f.initDroppable(c.el, b)
            }, a), f
        };
        var bb = function (a, b, c, d) {
            for (var e = 0, f = a.length; f > e; e++)a[e][b].apply(a[e], c);
            return d(a)
        }, cb = function (a, b, c) {
            for (var d = [], e = 0, f = a.length; f > e; e++)d.push([a[e][b].apply(a[e], c), a[e]]);
            return d
        }, db = function (a, b, c) {
            return function () {
                return bb(a, b, arguments, c)
            }
        }, eb = function (a, b) {
            return function () {
                return cb(a, b, arguments)
            }
        }, fb = function (a, b) {
            var c = [];
            if (a)if ("string" == typeof a) {
                if ("*" === a)return a;
                c.push(a)
            } else if (b)c = a; else if (a.length)for (var d = 0, e = a.length; e > d; d++)c.push(n(a[d]).id); else c.push(n(a).id);
            return c
        }, gb = function (a, b, c) {
            return "*" === a ? !0 : a.length > 0 ? -1 != a.indexOf(b) : !c
        };
        this.getConnections = function (a, b) {
            a ? a.constructor == String && (a = {scope: a}) : a = {};
            for (var c = a.scope || f.getDefaultScope(), d = fb(c, !0), e = fb(a.source), g = fb(a.target), h = !b && d.length > 1 ? {} : [], i = function (a, c) {
                if (!b && d.length > 1) {
                    var e = h[a];
                    null == e && (e = h[a] = []), e.push(c)
                } else h.push(c)
            }, j = 0, k = v.length; k > j; j++) {
                var l = v[j];
                gb(d, l.scope) && gb(e, l.sourceId) && gb(g, l.targetId) && i(l.scope, l)
            }
            return h
        };
        var hb = function (a, b) {
            return function (c) {
                for (var d = 0, e = a.length; e > d; d++)c(a[d]);
                return b(a)
            }
        }, ib = function (a) {
            return function (b) {
                return a[b]
            }
        }, jb = function (a, b) {
            var c, d, e = {
                length: a.length,
                each: hb(a, b),
                get: ib(a)
            }, f = ["setHover", "removeAllOverlays", "setLabel", "addClass", "addOverlay", "removeOverlay", "removeOverlays", "showOverlay", "hideOverlay", "showOverlays", "hideOverlays", "setPaintStyle", "setHoverPaintStyle", "setSuspendEvents", "setParameter", "setParameters", "setVisible", "repaint", "addType", "toggleType", "removeType", "removeClass", "setType", "bind", "unbind"], g = ["getLabel", "getOverlay", "isHover", "getParameter", "getParameters", "getPaintStyle", "getHoverPaintStyle", "isVisible", "hasType", "getType", "isSuspendEvents"];
            for (c = 0, d = f.length; d > c; c++)e[f[c]] = db(a, f[c], b);
            for (c = 0, d = g.length; d > c; c++)e[g[c]] = eb(a, g[c]);
            return e
        }, kb = function (a) {
            var b = jb(a, kb);
            return r.extend(b, {
                setDetachable: db(a, "setDetachable", kb),
                setReattach: db(a, "setReattach", kb),
                setConnector: db(a, "setConnector", kb),
                detach: function () {
                    for (var b = 0, c = a.length; c > b; b++)f.detach(a[b])
                },
                isDetachable: eb(a, "isDetachable"),
                isReattach: eb(a, "isReattach")
            })
        }, lb = function (a) {
            var b = jb(a, lb);
            return r.extend(b, {
                setEnabled: db(a, "setEnabled", lb),
                setAnchor: db(a, "setAnchor", lb),
                isEnabled: eb(a, "isEnabled"),
                detachAll: function () {
                    for (var b = 0, c = a.length; c > b; b++)a[b].detachAll()
                },
                remove: function () {
                    for (var b = 0, c = a.length; c > b; b++)f.deleteObject({endpoint: a[b]})
                }
            })
        };
        this.select = function (a) {
            return a = a || {}, a.scope = a.scope || "*", kb(a.connections || f.getConnections(a, !0))
        }, this.selectEndpoints = function (a) {
            a = a || {}, a.scope = a.scope || "*";
            var b = !a.element && !a.source && !a.target, c = b ? "*" : fb(a.element), d = b ? "*" : fb(a.source), e = b ? "*" : fb(a.target), f = fb(a.scope, !0), g = [];
            for (var h in w) {
                var i = gb(c, h, !0), j = gb(d, h, !0), k = "*" != d, l = gb(e, h, !0), m = "*" != e;
                if (i || j || l)a:for (var n = 0, o = w[h].length; o > n; n++) {
                    var p = w[h][n];
                    if (gb(f, p.scope, !0)) {
                        var q = k && d.length > 0 && !p.isSource, r = m && e.length > 0 && !p.isTarget;
                        if (q || r)continue a;
                        g.push(p)
                    }
                }
            }
            return lb(g)
        }, this.getAllConnections = function () {
            return v
        }, this.getDefaultScope = function () {
            return G
        }, this.getEndpoint = L, this.getEndpoints = function (a) {
            return w[n(a).id]
        }, this.getDefaultEndpointType = function () {
            return r.Endpoint
        }, this.getDefaultConnectionType = function () {
            return r.Connection
        }, this.getId = Y, this.appendElement = J;
        var mb = !1;
        this.isHoverSuspended = function () {
            return mb
        }, this.setHoverSuspended = function (a) {
            mb = a
        }, this.hide = function (a, b) {
            return U(a, "none", b), f
        }, this.idstamp = I, this.connectorsInitialized = !1, this.registerConnectorType = function (a, b) {
            c.push([a, b])
        };
        var nb = function (a) {
            if (!q && a) {
                var b = f.getElement(a);
                b.offsetParent && f.setContainer(b.offsetParent)
            }
        }, ob = function () {
            f.Defaults.Container && f.setContainer(f.Defaults.Container)
        }, pb = f.manage = function (a, b, c) {
            return y[a] || (y[a] = {
                el: b,
                endpoints: [],
                connections: []
            }, y[a].info = qb({
                elId: a,
                timestamp: F
            }), c || f.fire("manageElement", {
                id: a,
                info: y[a].info,
                el: b
            })), y[a]
        }, qb = this.updateOffset = function (a) {
            var b, c = a.timestamp, d = a.recalc, e = a.offset, g = a.elId;
            return E && !c && (c = F), !d && c && c === A[g] ? {
                o: a.offset || z[g],
                s: D[g]
            } : (d || !e && null == z[g] ? (b = y[g] ? y[g].el : null, null != b && (D[g] = f.getSize(b), z[g] = f.getOffset(b), A[g] = c)) : (z[g] = e || z[g], null == D[g] && (b = y[g].el, null != b && (D[g] = f.getSize(b))), A[g] = c), z[g] && !z[g].right && (z[g].right = z[g].left + D[g][0], z[g].bottom = z[g].top + D[g][1], z[g].width = D[g][0], z[g].height = D[g][1], z[g].centerx = z[g].left + z[g].width / 2, z[g].centery = z[g].top + z[g].height / 2), {
                o: z[g],
                s: D[g]
            })
        };
        this.init = function () {
            a = r.getRenderModes();
            var b = function (a, b, c) {
                r.Connectors[a][b] = function () {
                    c.apply(this, arguments), r.ConnectorRenderers[a].apply(this, arguments)
                }, jsPlumbUtil.extend(r.Connectors[a][b], [c, r.ConnectorRenderers[a]])
            };
            if (!r.connectorsInitialized) {
                for (var d = 0; d < c.length; d++)for (var e = 0; e < a.length; e++)b(a[e], c[d][1], c[d][0]);
                r.connectorsInitialized = !0
            }
            u || (ob(), f.anchorManager = new r.AnchorManager({jsPlumbInstance: f}), u = !0, f.fire("ready", f))
        }.bind(this), this.log = t, this.jsPlumbUIComponent = m, this.makeAnchor = function () {
            var a, b = function (a, b) {
                if (r.Anchors[a])return new r.Anchors[a](b);
                if (!f.Defaults.DoNotThrowErrors)throw{msg: "jsPlumb: unknown anchor type '" + a + "'"}
            };
            if (0 === arguments.length)return null;
            var c = arguments[0], e = arguments[1], g = (arguments[2], null);
            if (c.compute && c.getOrientation)return c;
            if ("string" == typeof c)g = b(arguments[0], {
                elementId: e,
                jsPlumbInstance: f
            }); else if (d.isArray(c))if (d.isArray(c[0]) || d.isString(c[0]))2 == c.length && d.isObject(c[1]) ? d.isString(c[0]) ? (a = r.extend({
                elementId: e,
                jsPlumbInstance: f
            }, c[1]), g = b(c[0], a)) : (a = r.extend({
                elementId: e,
                jsPlumbInstance: f,
                anchors: c[0]
            }, c[1]), g = new r.DynamicAnchor(a)) : g = new r.DynamicAnchor({
                anchors: c,
                selector: null,
                elementId: e,
                jsPlumbInstance: f
            }); else {
                var h = {
                    x: c[0],
                    y: c[1],
                    orientation: c.length >= 4 ? [c[2], c[3]] : [0, 0],
                    offsets: c.length >= 6 ? [c[4], c[5]] : [0, 0],
                    elementId: e,
                    jsPlumbInstance: f,
                    cssClass: 7 == c.length ? c[6] : null
                };
                g = new r.Anchor(h), g.clone = function () {
                    return new r.Anchor(h)
                }
            }
            return g.id || (g.id = "anchor_" + I()), g
        }, this.makeAnchors = function (a, b, c) {
            for (var e = [], g = 0, h = a.length; h > g; g++)"string" == typeof a[g] ? e.push(r.Anchors[a[g]]({
                elementId: b,
                jsPlumbInstance: c
            })) : d.isArray(a[g]) && e.push(f.makeAnchor(a[g], b, c));
            return e
        }, this.makeDynamicAnchor = function (a, b) {
            return new r.DynamicAnchor({
                anchors: a,
                selector: b,
                elementId: null,
                jsPlumbInstance: f
            })
        }, this.targetEndpointDefinitions = {};
        var rb = function () {
        };
        this.sourceEndpointDefinitions = {};
        var sb = function (a, b, c, d, e) {
            for (var f = a.target || a.srcElement, g = !1, h = d.getSelector(b, c), i = 0; i < h.length; i++)if (h[i] == f) {
                g = !0;
                break
            }
            return e ? !g : g
        }, tb = function (a, b, c, e, g) {
            var h = new m(b), i = b._jsPlumb.EndpointDropHandler({
                jsPlumb: f,
                enabled: function () {
                    return a.def.enabled
                },
                isFull: function () {
                    var b = f.select({target: a.id}).length;
                    return a.def.maxConnections > 0 && b >= a.def.maxConnections
                },
                element: a.el,
                elementId: a.id,
                isSource: e,
                isTarget: g,
                addClass: function (b) {
                    f.addClass(a.el, b)
                },
                removeClass: function (b) {
                    f.removeClass(a.el, b)
                },
                onDrop: function (a) {
                    var b = a.endpoints[0];
                    b.anchor.locked = !1
                },
                isDropAllowed: function () {
                    return h.isDropAllowed.apply(h, arguments)
                },
                isRedrop: function (b) {
                    return null != b.suspendedElement && null != b.suspendedEndpoint && b.suspendedEndpoint.element === a.el
                },
                getEndpoint: function (c) {
                    var d = a.def.endpoint;
                    if (null == d || null == d._jsPlumb) {
                        var e = f.deriveEndpointAndAnchorSpec(c.getType().join(" "), !0), g = e.endpoints ? r.extend(b, {endpoint: a.def.def.endpoint || e.endpoints[1]}) : b;
                        e.anchors && (g = r.extend(g, {anchor: a.def.def.anchor || e.anchors[1]})), d = f.addEndpoint(a.el, g), d._mtNew = !0
                    }
                    if (b.uniqueEndpoint && (a.def.endpoint = d), d._doNotDeleteOnDetach = !1, d._deleteOnDetach = !0, c.isDetachable() && d.initDraggable(), null != d.anchor.positionFinder) {
                        var h = f.getUIPosition(arguments, f.getZoom()), i = f.getOffset(a.el), j = f.getSize(a.el), k = d.anchor.positionFinder(h, i, j, d.anchor.constructorParams);
                        d.anchor.x = k[0], d.anchor.y = k[1]
                    }
                    return d
                },
                maybeCleanup: function (a) {
                    a._mtNew && 0 === a.connections.length ? f.deleteObject({endpoint: a}) : delete a._mtNew
                }
            }), j = r.dragEvents.drop;
            return c.scope = c.scope || b.scope || f.Defaults.Scope, c[j] = d.wrap(c[j], i, !0), g && (c[r.dragEvents.over] = function () {
                return !0
            }), b.allowLoopback === !1 && (c.canDrop = function (b) {
                var c = b.getDragElement()._jsPlumbRelatedElement;
                return c != a.el
            }), f.initDroppable(a.el, c, "internal"), i
        };
        this.makeTarget = function (a, b, c) {
            var d = r.extend({_jsPlumb: this}, c);
            r.extend(d, b), rb(d, 1, this);
            for (var e = (!(d.deleteEndpointsOnDetach === !1), d.maxConnections || -1), f = function (a) {
                var b = n(a), c = b.id, f = r.extend({}, d.dropOptions || {}), g = "default";
                this.targetEndpointDefinitions[c] = this.targetEndpointDefinitions[c] || {}, nb(c);
                var h = {
                    def: r.extend({}, d),
                    uniqueEndpoint: d.uniqueEndpoint,
                    maxConnections: e,
                    enabled: !0
                };
                b.def = h, this.targetEndpointDefinitions[c][g] = h, tb(b, d, f, d.isSource === !0, !0)
            }.bind(this), g = a.length && a.constructor != String ? a : [a], h = 0, i = g.length; i > h; h++)f(g[h]);
            return this
        }, this.unmakeTarget = function (a, b) {
            var c = n(a);
            return r.destroyDroppable(c.el), b || delete this.targetEndpointDefinitions[c.id], this
        }, this.makeSource = function (a, b, c) {
            var e = r.extend({_jsPlumb: this}, c);
            r.extend(e, b);
            var g = e.connectionType || "default", h = f.deriveEndpointAndAnchorSpec(g);
            e.endpoint = e.endpoint || h.endpoints[0], e.anchor = e.anchor || h.anchors[0], rb(e, 0, this);
            for (var i = e.maxConnections || -1, j = e.onMaxConnections, k = function (a) {
                var b = a.id, c = this.getElement(a.el);
                this.sourceEndpointDefinitions[b] = this.sourceEndpointDefinitions[b] || {}, nb(b);
                var h = {
                    def: r.extend({}, e),
                    uniqueEndpoint: e.uniqueEndpoint,
                    maxConnections: i,
                    enabled: !0
                };
                this.sourceEndpointDefinitions[b][g] = h, a.def = h;
                var k = r.dragEvents.stop, m = r.dragEvents.drag, n = r.extend({}, e.dragOptions || {}), o = n.drag, p = n.stop, q = null, s = !1;
                n.scope = n.scope || e.scope, n[m] = d.wrap(n[m], function () {
                    o && o.apply(this, arguments), s = !1
                }), n[k] = d.wrap(n[k], function () {
                    if (p && p.apply(this, arguments), this.currentlyDragging = !1, null != q._jsPlumb) {
                        var a = e.anchor || this.Defaults.Anchor, c = q.anchor, d = q.connections[0], g = this.makeAnchor(a, b, this), h = q.element;
                        if (null != g.positionFinder) {
                            var i = f.getOffset(h), j = this.getSize(h), k = {
                                left: i.left + c.x * j[0],
                                top: i.top + c.y * j[1]
                            }, l = g.positionFinder(k, i, j, g.constructorParams);
                            g.x = l[0], g.y = l[1]
                        }
                        q.setAnchor(g, !0), q.repaint(), this.repaint(q.elementId), null != d && this.repaint(d.targetId)
                    }
                }.bind(this));
                var t = function (d) {
                    if (3 !== d.which && 2 !== d.button) {
                        var h = this.sourceEndpointDefinitions[b][g];
                        if (h.enabled) {
                            if (b = this.getId(this.getElement(a.el)), e.filter) {
                                var k = jsPlumbUtil.isString(e.filter) ? sb(d, a.el, e.filter, this, e.filterExclude) : e.filter(d, a.el);
                                if (k === !1)return
                            }
                            var m = this.select({source: b}).length;
                            if (h.maxConnections >= 0 && m >= h.maxConnections)return j && j({
                                element: a.el,
                                maxConnections: i
                            }, d), !1;
                            var o = r.getPositionOnElement(d, c, l), p = {};
                            r.extend(p, e), p.isTemporarySource = !0, p.anchor = [o[0], o[1], 0, 0], p.dragOptions = n, h.def.scope && (p.scope = h.def.scope), q = this.addEndpoint(b, p), s = !0, q._doNotDeleteOnDetach = !1, q._deleteOnDetach = !0, h.uniqueEndpoint && (h.endpoint ? q.finalEndpoint = h.endpoint : (h.endpoint = q, q._deleteOnDetach = !1, q._doNotDeleteOnDetach = !0));
                            var t = function () {
                                f.off(q.canvas, "mouseup", t), f.off(a.el, "mouseup", t), s && (s = !1, f.deleteEndpoint(q))
                            };
                            f.on(q.canvas, "mouseup", t), f.on(a.el, "mouseup", t);
                            var u = {};
                            if (h.def.extract)for (var v in h.def.extract) {
                                var w = d.srcElement.getAttribute(v);
                                w && (u[h.def.extract[v]] = w)
                            }
                            f.trigger(q.canvas, "mousedown", d, u), jsPlumbUtil.consume(d)
                        }
                    }
                }.bind(this);
                this.on(a.el, "mousedown", t), h.trigger = t, e.filter && (jsPlumbUtil.isString(e.filter) || jsPlumbUtil.isFunction(e.filter)) && f.setDragFilter(a.el, e.filter);
                var u = r.extend({}, e.dropOptions || {});
                tb(a, e, u, !0, e.isTarget === !0)
            }.bind(this), m = a.length && a.constructor != String ? a : [a], o = 0, p = m.length; p > o; o++)k(n(m[o]));
            return this
        }, this.unmakeSource = function (a, b, c) {
            var d = n(a), e = this.sourceEndpointDefinitions[d.id];
            if (e)for (var g in e)if (null == b || b === g) {
                var h = e[g].trigger;
                h && f.off(d.el, "mousedown", h), c || delete this.sourceEndpointDefinitions[d.id][g]
            }
            return this
        }, this.unmakeEverySource = function () {
            for (var a in this.sourceEndpointDefinitions)f.unmakeSource(a, null, !0);
            return this.sourceEndpointDefinitions = {}, this
        };
        var ub = function (a, b, c) {
            b = jsPlumbUtil.isArray(b) ? b : [b];
            var d = Y(a);
            c = c || "default";
            for (var e = 0; e < b.length; e++) {
                var f = this[b[e]][d];
                if (f && f[c])return f[c].def.scope || this.Defaults.Scope
            }
        }.bind(this), vb = function (a, b, c, d) {
            c = jsPlumbUtil.isArray(c) ? c : [c];
            var e = Y(a);
            d = d || "default";
            for (var f = 0; f < c.length; f++) {
                var g = this[c[f]][e];
                g && g[d] && (g[d].def.scope = b)
            }
        }.bind(this);
        this.getScope = function (a) {
            return ub(a, ["sourceEndpointDefinitions", "targetEndpointDefinitions"])
        }, this.getSourceScope = function (a) {
            return ub(a, "sourceEndpointDefinitions")
        }, this.getTargetScope = function (a) {
            return ub(a, "targetEndpointDefinitions")
        }, this.setScope = function (a, b, c) {
            this.setSourceScope(a, b, c), this.setTargetScope(a, b, c)
        }, this.setSourceScope = function (a, b, c) {
            vb(a, b, "sourceEndpointDefinitions", c), this.setDragScope(a, b)
        }, this.setTargetScope = function (a, b, c) {
            vb(a, b, "targetEndpointDefinitions", c), this.setDropScope(a, b)
        }, this.unmakeEveryTarget = function () {
            for (var a in this.targetEndpointDefinitions)f.unmakeTarget(a, !0);
            return this.targetEndpointDefinitions = {}, this
        };
        var wb = function (a, b, c, e, f) {
            var g = "source" == a ? this.sourceEndpointDefinitions : this.targetEndpointDefinitions;
            if (f = f || "default", d.isString(b) && g[b] && g[b][f])g[b][f].enabled = e ? !g[b][f].enabled : c; else if (b.length)for (var h = 0, i = b.length; i > h; h++) {
                var j = n(b[h]);
                g[j.id] && g[j.id][f] && (g[j.id][f].enabled = e ? !g[j.id][f].enabled : c)
            } else {
                var k = n(b).id;
                g[k] && g[k][f] && (g[k][f].enabled = e ? !g[k][f].enabled : c)
            }
            return this
        }.bind(this), xb = function (a, b) {
            return d.isString(a) || !a.length ? b.apply(this, [a]) : a.length ? b.apply(this, [a[0]]) : void 0
        }.bind(this);
        this.toggleSourceEnabled = function (a, b) {
            return wb("source", a, null, !0, b), this.isSourceEnabled(a, b)
        }, this.setSourceEnabled = function (a, b, c) {
            return wb("source", a, b, null, c)
        }, this.isSource = function (a, b) {
            return b = b || "default", xb(a, function (a) {
                var c = this.sourceEndpointDefinitions[n(a).id];
                return null != c && null != c[b]
            }.bind(this))
        }, this.isSourceEnabled = function (a, b) {
            return b = b || "default", xb(a, function (a) {
                var c = this.sourceEndpointDefinitions[n(a).id];
                return c && c[b] && c[b].enabled === !0
            }.bind(this))
        }, this.toggleTargetEnabled = function (a, b) {
            return wb("target", a, null, !0, b), this.isTargetEnabled(a, b)
        }, this.isTarget = function (a, b) {
            return b = b || "default", xb(a, function (a) {
                var c = this.targetEndpointDefinitions[n(a).id];
                return null != c && null != c[b]
            }.bind(this))
        }, this.isTargetEnabled = function (a, b) {
            return b = b || "default", xb(a, function (a) {
                var c = this.targetEndpointDefinitions[n(a).id];
                return c && c[b] && c[b].enabled === !0
            }.bind(this))
        }, this.setTargetEnabled = function (a, b, c) {
            return wb("target", a, b, null, c)
        }, this.ready = function (a) {
            f.bind("ready", a)
        };
        var yb = function (a, b) {
            if ("object" == typeof a && a.length)for (var c = 0, d = a.length; d > c; c++)b(a[c]); else b(a);
            return f
        };
        this.repaint = function (a, b, c) {
            return yb(a, function (a) {
                K(a, b, c)
            })
        }, this.revalidate = function (a, b, c) {
            return yb(a, function (a) {
                var d = c ? a : f.getId(a);
                f.updateOffset({
                    elId: d,
                    recalc: !0,
                    timestamp: b
                }), f.repaint(a)
            })
        }, this.repaintEverything = function () {
            var a, b = e();
            for (a in w)f.updateOffset({elId: a, recalc: !0, timestamp: b});
            for (a in w)K(a, null, b);
            return this
        }, this.removeAllEndpoints = function (a, b, c) {
            c = c || [];
            var d = function (a) {
                var e, g, h = n(a), i = w[h.id];
                if (i)for (c.push(h), e = 0, g = i.length; g > e; e++)f.deleteEndpoint(i[e], !1);
                if (delete w[h.id], b && h.el && 3 != h.el.nodeType && 8 != h.el.nodeType)for (e = 0, g = h.el.childNodes.length; g > e; e++)d(h.el.childNodes[e])
            };
            return d(a), this
        };
        var zb = function (a, b) {
            f.removeAllEndpoints(a.id, !0, b);
            for (var c = function (a) {
                f.getDragManager().elementRemoved(a.id), f.anchorManager.clearFor(a.id), f.anchorManager.removeFloatingConnection(a.id), delete f.floatingConnections[a.id], delete y[a.id], delete z[a.id], a.el && (f.removeElement(a.el), a.el._jsPlumb = null)
            }, d = 1; d < b.length; d++)c(b[d]);
            c(a)
        };
        this.remove = function (a, b) {
            var c = n(a), d = [];
            return c.text ? c.el.parentNode.removeChild(c.el) : c.id && f.batch(function () {
                zb(c, d)
            }, b === !1), f
        }, this.empty = function (a, b) {
            var c = [], d = function (a, b) {
                var e = n(a);
                if (e.text)e.el.parentNode.removeChild(e.el); else if (e.el) {
                    for (; e.el.childNodes.length > 0;)d(e.el.childNodes[0]);
                    b || zb(e, c)
                }
            };
            return f.batch(function () {
                d(a, !0)
            }, b === !1), f
        }, this.reset = function () {
            f.silently(function () {
                f.deleteEveryEndpoint(), f.unbind(), this.targetEndpointDefinitions = {}, this.sourceEndpointDefinitions = {}, v.length = 0, this.doReset && this.doReset()
            }.bind(this))
        };
        var Ab = function (a) {
            a.canvas && a.canvas.parentNode && a.canvas.parentNode.removeChild(a.canvas), a.cleanup(), a.destroy()
        };
        this.clear = function () {
            f.select().each(Ab), f.selectEndpoints().each(Ab), w = {}, x = {}
        }, this.setDefaultScope = function (a) {
            return G = a, f
        }, this.setDraggable = T, this.deriveEndpointAndAnchorSpec = function (a, b) {
            for (var c = ((b ? "" : "default ") + a).split(/[\s]/), d = null, e = null, g = null, h = null, i = 0; i < c.length; i++) {
                var j = f.getType(c[i], "connection");
                j && (j.endpoints && (d = j.endpoints), j.endpoint && (e = j.endpoint), j.anchors && (h = j.anchors), j.anchor && (g = j.anchor))
            }
            return {endpoints: d ? d : [e, e], anchors: h ? h : [g, g]}
        }, this.setId = function (a, b, c) {
            var d;
            jsPlumbUtil.isString(a) ? d = a : (a = this.getElement(a), d = this.getId(a));
            var e = this.getConnections({
                source: d,
                scope: "*"
            }, !0), f = this.getConnections({target: d, scope: "*"}, !0);
            b = "" + b, c ? a = this.getElement(b) : (a = this.getElement(d), this.setAttribute(a, "id", b)), w[b] = w[d] || [];
            for (var g = 0, h = w[b].length; h > g; g++)w[b][g].setElementId(b), w[b][g].setReferenceElement(a);
            delete w[d], this.sourceEndpointDefinitions[b] = this.sourceEndpointDefinitions[d], delete this.sourceEndpointDefinitions[d], this.targetEndpointDefinitions[b] = this.targetEndpointDefinitions[d], delete this.targetEndpointDefinitions[d], this.anchorManager.changeId(d, b), this.getDragManager().changeId(d, b), y[b] = y[d], delete y[d];
            var i = function (c, d, e) {
                for (var f = 0, g = c.length; g > f; f++)c[f].endpoints[d].setElementId(b), c[f].endpoints[d].setReferenceElement(a), c[f][e + "Id"] = b, c[f][e] = a
            };
            i(e, 0, "source"), i(f, 1, "target"), this.repaint(b)
        }, this.setDebugLog = function (a) {
            t = a
        }, this.setSuspendDrawing = function (a, b) {
            var c = E;
            return E = a, F = a ? (new Date).getTime() : null, b && this.repaintEverything(), c
        }, this.isSuspendDrawing = function () {
            return E
        }, this.getSuspendedAt = function () {
            return F
        }, this.batch = function (a, b) {
            var c = this.isSuspendDrawing();
            c || this.setSuspendDrawing(!0);
            try {
                a()
            } catch (e) {
                d.log("Function run while suspended failed", e)
            }
            c || this.setSuspendDrawing(!1, !b)
        }, this.doWhileSuspended = this.batch, this.getCachedData = X, this.timestamp = e, this.show = function (a, b) {
            return U(a, "block", b), f
        }, this.toggleVisible = W, this.toggleDraggable = V, this.addListener = this.bind
    };
    jsPlumbUtil.extend(q, jsPlumbUtil.EventGenerator, {
        setAttribute: function (a, b, c) {
            this.setAttribute(a, b, c)
        }, getAttribute: function (a, b) {
            return this.getAttribute(r.getElement(a), b)
        }, convertToFullOverlaySpec: function (a) {
            return jsPlumbUtil.isString(a) && (a = [a, {}]), a[1].id = a[1].id || jsPlumbUtil.uuid(), a
        }, registerConnectionType: function (a, b) {
            if (this._connectionTypes[a] = r.extend({}, b), b.overlays) {
                for (var c = {}, d = 0; d < b.overlays.length; d++) {
                    var e = this.convertToFullOverlaySpec(b.overlays[d]);
                    c[e[1].id] = e
                }
                this._connectionTypes[a].overlays = c
            }
        }, registerConnectionTypes: function (a) {
            for (var b in a)this.registerConnectionType(b, a[b])
        }, registerEndpointType: function (a, b) {
            if (this._endpointTypes[a] = r.extend({}, b), b.overlays) {
                for (var c = {}, d = 0; d < b.overlays.length; d++) {
                    var e = this.convertToFullOverlaySpec(b.overlays[d]);
                    c[e[1].id] = e
                }
                this._endpointTypes[a].overlays = c
            }
        }, registerEndpointTypes: function (a) {
            for (var b in a)this.registerEndpointType(b, a[b])
        }, getType: function (a, b) {
            return "connection" === b ? this._connectionTypes[a] : this._endpointTypes[a]
        }, setIdChanged: function (a, b) {
            this.setId(a, b, !0)
        }, setParent: function (a, b) {
            var c = this.getElement(a), d = this.getId(c), e = this.getElement(b), f = this.getId(e);
            c.parentNode.removeChild(c), e.appendChild(c), this.getDragManager().setParent(c, d, e, f)
        }, extend: function (a, b, c) {
            var d;
            if (c)for (d = 0; d < c.length; d++)a[c[d]] = b[c[d]]; else for (d in b)a[d] = b[d];
            return a
        }, floatingConnections: {}, getFloatingAnchorIndex: function (a) {
            return a.endpoints[0].isFloating() ? 0 : a.endpoints[1].isFloating() ? 1 : -1
        }
    });
    var r = new q;
    "undefined" != typeof window && (window.jsPlumb = r), r.getInstance = function (a) {
        var b = new q(a);
        return b.init(), b
    }, r.each = function (a, b) {
        if (null != a)if ("string" == typeof a)b(r.getElement(a)); else if (null != a.length)for (var c = 0; c < a.length; c++)b(r.getElement(a[c])); else b(a)
    }, "function" == typeof define && (define("jsplumb", [], function () {
        return r
    }), define("jsplumbinstance", [], function () {
        return r.getInstance()
    })), "undefined" != typeof exports && (exports.jsPlumb = r)
}.call(this), function () {
    var a = this;
    a.jsPlumbUtil;
    var b = (!!window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"), function (a, b) {
        if (null == a)return [0, 0];
        var c = g(a), d = f(c, 0);
        return [d[b + "X"], d[b + "Y"]]
    }), c = function (a) {
        return null == a ? [0, 0] : b(a, "page")
    }, d = function (a) {
        return b(a, "screen")
    }, e = function (a) {
        return b(a, "client")
    }, f = function (a, b) {
        return a.item ? a.item(b) : a[b]
    }, g = function (a) {
        return a.touches && a.touches.length > 0 ? a.touches : a.changedTouches && a.changedTouches.length > 0 ? a.changedTouches : a.targetTouches && a.targetTouches.length > 0 ? a.targetTouches : [a]
    }, h = function (a) {
        var b = {}, c = [], d = {}, e = {}, f = {};
        this.register = function (g) {
            var h = a.getId(g), i = a.getOffset(g);
            b[h] || (b[h] = g, c.push(g), d[h] = {});
            var j = function (b) {
                if (b)for (var c = 0; c < b.childNodes.length; c++)if (3 != b.childNodes[c].nodeType && 8 != b.childNodes[c].nodeType) {
                    var g = jsPlumb.getElement(b.childNodes[c]), k = a.getId(b.childNodes[c], null, !0);
                    if (k && e[k] && e[k] > 0) {
                        var l = a.getOffset(g);
                        d[h][k] = {
                            id: k,
                            offset: {left: l.left - i.left, top: l.top - i.top}
                        }, f[k] = h
                    }
                    j(b.childNodes[c])
                }
            };
            j(g)
        }, this.updateOffsets = function (b) {
            if (null != b) {
                var c = jsPlumb.getElement(b), e = a.getId(c), g = d[e], h = a.getOffset(c);
                if (g)for (var i in g)if (g.hasOwnProperty(i)) {
                    var j = jsPlumb.getElement(i), k = a.getOffset(j);
                    d[e][i] = {
                        id: i,
                        offset: {left: k.left - h.left, top: k.top - h.top}
                    }, f[i] = e
                }
            }
        }, this.endpointAdded = function (c, g) {
            g = g || a.getId(c);
            var h = document.body, i = c.parentNode;
            for (e[g] = e[g] ? e[g] + 1 : 1; null != i && i != h;) {
                var j = a.getId(i, null, !0);
                if (j && b[j]) {
                    var k = a.getOffset(i);
                    if (null == d[j][g]) {
                        var l = a.getOffset(c);
                        d[j][g] = {
                            id: g,
                            offset: {left: l.left - k.left, top: l.top - k.top}
                        }, f[g] = j
                    }
                    break
                }
                i = i.parentNode
            }
        }, this.endpointDeleted = function (a) {
            if (e[a.elementId] && (e[a.elementId]--, e[a.elementId] <= 0))for (var b in d)d.hasOwnProperty(b) && d[b] && (delete d[b][a.elementId], delete f[a.elementId])
        }, this.changeId = function (a, b) {
            d[b] = d[a], d[a] = {}, f[b] = f[a], f[a] = null
        }, this.getElementsForDraggable = function (a) {
            return d[a]
        }, this.elementRemoved = function (a) {
            var b = f[a];
            b && (delete d[b][a], delete f[a])
        }, this.reset = function () {
            b = {}, c = [], d = {}, e = {}
        }, this.dragEnded = function (b) {
            var c = a.getId(b), d = f[c];
            d && this.updateOffsets(d)
        }, this.setParent = function (b, c, e, g) {
            var h = f[c];
            if (h) {
                d[g] || (d[g] = {}), d[g][c] = d[h][c], delete d[h][c];
                var i = a.getOffset(e), j = a.getOffset(b);
                d[g][c].offset = {
                    left: j.left - i.left,
                    top: j.top - i.top
                }, f[c] = g
            }
        }, this.getDragAncestor = function (b) {
            var c = jsPlumb.getElement(b), d = a.getId(c), e = f[d];
            return e ? jsPlumb.getElement(e) : null
        }
    }, i = function (a) {
        return null == a ? null : a.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
    }, j = function (a, b) {
        b = i(b), "undefined" != typeof a.className.baseVal ? a.className.baseVal = b : a.className = b
    }, k = function (a) {
        return "undefined" == typeof a.className.baseVal ? a.className : a.className.baseVal
    }, l = function (a, b, c) {
        b = null == b ? [] : jsPlumbUtil.isArray(b) ? b : b.split(/\s+/), c = null == c ? [] : jsPlumbUtil.isArray(c) ? c : c.split(/\s+/);
        var d = k(a), e = d.split(/\s+/), f = function (a, b) {
            for (var c = 0; c < b.length; c++)if (a)-1 == e.indexOf(b[c]) && e.push(b[c]); else {
                var d = e.indexOf(b[c]);
                -1 != d && e.splice(d, 1)
            }
        };
        f(!0, b), f(!1, c), j(a, e.join(" "))
    };
    jsPlumb.extend(jsPlumbInstance.prototype, {
        headless: !1,
        pageLocation: c,
        screenLocation: d,
        clientLocation: e,
        getDragManager: function () {
            return null == this.dragManager && (this.dragManager = new h(this)), this.dragManager
        },
        recalculateOffsets: function (a) {
            this.getDragManager().updateOffsets(a)
        },
        createElement: function (a, b, c, d) {
            return this.createElementNS(null, a, b, c, d)
        },
        createElementNS: function (a, b, c, d, e) {
            var f, g = null == a ? document.createElement(b) : document.createElementNS(a, b);
            c = c || {};
            for (f in c)g.style[f] = c[f];
            d && (g.className = d), e = e || {};
            for (f in e)g.setAttribute(f, "" + e[f]);
            return g
        },
        getAttribute: function (a, b) {
            return null != a.getAttribute ? a.getAttribute(b) : null
        },
        setAttribute: function (a, b, c) {
            null != a.setAttribute && a.setAttribute(b, c)
        },
        setAttributes: function (a, b) {
            for (var c in b)b.hasOwnProperty(c) && a.setAttribute(c, b[c])
        },
        appendToRoot: function (a) {
            document.body.appendChild(a)
        },
        getRenderModes: function () {
            return ["svg"]
        },
        getClass: k,
        addClass: function (a, b) {
            jsPlumb.each(a, function (a) {
                l(a, b)
            })
        },
        hasClass: function (a, b) {
            return a = jsPlumb.getElement(a), a.classList ? a.classList.contains(b) : -1 != k(a).indexOf(b)
        },
        removeClass: function (a, b) {
            jsPlumb.each(a, function (a) {
                l(a, null, b)
            })
        },
        updateClasses: function (a, b, c) {
            jsPlumb.each(a, function (a) {
                l(a, b, c)
            })
        },
        setClass: function (a, b) {
            jsPlumb.each(a, function (a) {
                j(a, b)
            })
        },
        setPosition: function (a, b) {
            a.style.left = b.left + "px", a.style.top = b.top + "px"
        },
        getPosition: function (a) {
            var b = function (b) {
                var c = a.style[b];
                return c ? c.substring(0, c.length - 2) : 0
            };
            return {left: b("left"), top: b("top")}
        },
        getStyle: function (a, b) {
            return "undefined" != typeof window.getComputedStyle ? getComputedStyle(a, null).getPropertyValue(b) : a.currentStyle[b]
        },
        getSelector: function (a, b) {
            var c = null;
            return c = 1 == arguments.length ? null != a.nodeType ? a : document.querySelectorAll(a) : a.querySelectorAll(b)
        },
        getOffset: function (a, b, c) {
            a = jsPlumb.getElement(a), c = c || this.getContainer();
            for (var d = {
                left: a.offsetLeft,
                top: a.offsetTop
            }, e = b || null != c && a != c && a.offsetParent != c ? a.offsetParent : null, f = function (a) {
                null != a && a !== document.body && (a.scrollTop > 0 || a.scrollLeft > 0) && (d.left -= a.scrollLeft, d.top -= a.scrollTop)
            }.bind(this); null != e;)d.left += e.offsetLeft, d.top += e.offsetTop, f(e), e = b ? e.offsetParent : e.offsetParent == c ? null : e.offsetParent;
            if (null != c && !b && (c.scrollTop > 0 || c.scrollLeft > 0)) {
                var g = null != a.offsetParent ? this.getStyle(a.offsetParent, "position") : "static", h = this.getStyle(a, "position");
                "absolute" !== h && "fixed" !== h && "absolute" !== g && "fixed" != g && (d.left -= c.scrollLeft, d.top -= c.scrollTop)
            }
            return d
        },
        getPositionOnElement: function (a, b, c) {
            var d = "undefined" != typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            }, e = document.body, f = document.documentElement, g = window.pageYOffset || f.scrollTop || e.scrollTop, h = window.pageXOffset || f.scrollLeft || e.scrollLeft, i = f.clientTop || e.clientTop || 0, j = f.clientLeft || e.clientLeft || 0, k = 0, l = 0, m = d.top + g - i + k * c, n = d.left + h - j + l * c, o = jsPlumb.pageLocation(a), p = d.width || b.offsetWidth * c, q = d.height || b.offsetHeight * c, r = (o[0] - n) / p, s = (o[1] - m) / q;
            return [r, s]
        },
        getAbsolutePosition: function (a) {
            var b = function (b) {
                var c = a.style[b];
                return c ? parseFloat(c.substring(0, c.length - 2)) : void 0
            };
            return [b("left"), b("top")]
        },
        setAbsolutePosition: function (a, b, c, d) {
            c ? this.animate(a, {
                left: "+=" + (b[0] - c[0]),
                top: "+=" + (b[1] - c[1])
            }, d) : (a.style.left = b[0] + "px", a.style.top = b[1] + "px")
        },
        getSize: function (a) {
            return [a.offsetWidth, a.offsetHeight]
        },
        getWidth: function (a) {
            return a.offsetWidth
        },
        getHeight: function (a) {
            return a.offsetHeight
        }
    })
}.call(this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil, d = "__label", e = function (a, c) {
        var e = {
            cssClass: c.cssClass,
            labelStyle: a.labelStyle,
            id: d,
            component: a,
            _jsPlumb: a._jsPlumb.instance
        }, f = jsPlumb.extend(e, c);
        return new (b.Overlays[a._jsPlumb.instance.getRenderMode()].Label)(f)
    }, f = function (a, d) {
        var e = null;
        if (c.isArray(d)) {
            var f = d[0], g = b.extend({
                component: a,
                _jsPlumb: a._jsPlumb.instance
            }, d[1]);
            3 == d.length && b.extend(g, d[2]), e = new (b.Overlays[a._jsPlumb.instance.getRenderMode()][f])(g)
        } else e = d.constructor == String ? new (b.Overlays[a._jsPlumb.instance.getRenderMode()][d])({
            component: a,
            _jsPlumb: a._jsPlumb.instance
        }) : d;
        return e.id = e.id || c.uuid(), a.cacheTypeItem("overlay", e, e.id), a._jsPlumb.overlays[e.id] = e, e
    };
    b.OverlayCapableJsPlumbUIComponent = function (a) {
        jsPlumbUIComponent.apply(this, arguments), this._jsPlumb.overlays = {}, this._jsPlumb.overlayPositions = {}, a.label && (this.getDefaultType().overlays[d] = ["Label", {
            label: a.label,
            location: a.labelLocation || this.defaultLabelLocation || .5,
            labelStyle: a.labelStyle || this._jsPlumb.instance.Defaults.LabelStyle,
            id: d
        }]), this.setListenerComponent = function (a) {
            if (this._jsPlumb)for (var b in this._jsPlumb.overlays)this._jsPlumb.overlays[b].setListenerComponent(a)
        }
    }, b.OverlayCapableJsPlumbUIComponent.applyType = function (a, b) {
        if (b.overlays) {
            var c, d = {};
            for (c in b.overlays) {
                var e = a._jsPlumb.overlays[b.overlays[c][1].id];
                if (e)e.updateFrom(b.overlays[c][1]), d[b.overlays[c][1].id] = !0; else {
                    var f = a.getCachedTypeItem("overlay", b.overlays[c][1].id);
                    null != f ? (f.reattach(a._jsPlumb.instance), f.updateFrom(b.overlays[c][1]), a._jsPlumb.overlays[f.id] = f) : f = a.addOverlay(b.overlays[c], !0), d[f.id] = !0
                }
            }
            for (c in a._jsPlumb.overlays)null == d[a._jsPlumb.overlays[c].id] && a.removeOverlay(a._jsPlumb.overlays[c].id)
        }
    }, c.extend(b.OverlayCapableJsPlumbUIComponent, jsPlumbUIComponent, {
        setHover: function (a) {
            if (this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged())for (var b in this._jsPlumb.overlays)this._jsPlumb.overlays[b][a ? "addClass" : "removeClass"](this._jsPlumb.instance.hoverClass)
        }, addOverlay: function (a, b) {
            var c = f(this, a);
            return b || this.repaint(), c
        }, getOverlay: function (a) {
            return this._jsPlumb.overlays[a]
        }, getOverlays: function () {
            return this._jsPlumb.overlays
        }, hideOverlay: function (a) {
            var b = this.getOverlay(a);
            b && b.hide()
        }, hideOverlays: function () {
            for (var a in this._jsPlumb.overlays)this._jsPlumb.overlays[a].hide()
        }, showOverlay: function (a) {
            var b = this.getOverlay(a);
            b && b.show()
        }, showOverlays: function () {
            for (var a in this._jsPlumb.overlays)this._jsPlumb.overlays[a].show()
        }, removeAllOverlays: function (a) {
            for (var b in this._jsPlumb.overlays)this._jsPlumb.overlays[b].cleanup && this._jsPlumb.overlays[b].cleanup();
            this._jsPlumb.overlays = {}, this._jsPlumb.overlayPositions = null, a || this.repaint()
        }, removeOverlay: function (a) {
            var b = this._jsPlumb.overlays[a];
            b && (b.cleanup && b.cleanup(), delete this._jsPlumb.overlays[a], this._jsPlumb.overlayPositions && delete this._jsPlumb.overlayPositions[a])
        }, removeOverlays: function () {
            for (var a = 0, b = arguments.length; b > a; a++)this.removeOverlay(arguments[a])
        }, moveParent: function (a) {
            if (this.bgCanvas && (this.bgCanvas.parentNode.removeChild(this.bgCanvas), a.appendChild(this.bgCanvas)), this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas), a.appendChild(this.canvas);
                for (var b in this._jsPlumb.overlays)if (this._jsPlumb.overlays[b].isAppendedAtTopLevel) {
                    var c = this._jsPlumb.overlays[b].getElement();
                    c.parentNode.removeChild(c), a.appendChild(c)
                }
            }
        }, getLabel: function () {
            var a = this.getOverlay(d);
            return null != a ? a.getLabel() : null
        }, getLabelOverlay: function () {
            return this.getOverlay(d)
        }, setLabel: function (a) {
            var b = this.getOverlay(d);
            if (b)a.constructor == String || a.constructor == Function ? b.setLabel(a) : (a.label && b.setLabel(a.label), a.location && b.setLocation(a.location)); else {
                var c = a.constructor == String || a.constructor == Function ? {label: a} : a;
                b = e(this, c), this._jsPlumb.overlays[d] = b
            }
            this._jsPlumb.instance.isSuspendDrawing() || this.repaint()
        }, cleanup: function (a) {
            for (var b in this._jsPlumb.overlays)this._jsPlumb.overlays[b].cleanup(a), this._jsPlumb.overlays[b].destroy(a);
            a && (this._jsPlumb.overlays = {}, this._jsPlumb.overlayPositions = null)
        }, setVisible: function (a) {
            this[a ? "showOverlays" : "hideOverlays"]()
        }, setAbsoluteOverlayPosition: function (a, b) {
            this._jsPlumb.overlayPositions[a.id] = b
        }, getAbsoluteOverlayPosition: function (a) {
            return this._jsPlumb.overlayPositions ? this._jsPlumb.overlayPositions[a.id] : null
        }
    })
}.call(this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil, d = function (a, b, c) {
        var d = !1;
        return {
            drag: function () {
                if (d)return d = !1, !0;
                if (b.element) {
                    var e = c.getUIPosition(arguments, c.getZoom());
                    jsPlumb.setPosition(b.element, e), c.repaint(b.element, e), a.paint({anchorPoint: a.anchor.getCurrentLocation({element: a.element})})
                }
            }, stopDrag: function () {
                d = !0
            }
        }
    }, e = function (a, b, c, d) {
        var e = jsPlumb.createElement("div", {position: "absolute"});
        b.appendElement(e);
        var f = b.getId(e);
        jsPlumb.setPosition(e, c), e.style.width = d[0] + "px", e.style.height = d[1] + "px", b.manage(f, e, !0), a.id = f, a.element = e
    }, f = function (a, c, d, e, f, g, h, i) {
        var j = new b.FloatingAnchor({
            reference: c,
            referenceCanvas: e,
            jsPlumbInstance: g
        });
        return h({paintStyle: a, endpoint: d, anchor: j, source: f, scope: i})
    }, g = ["connectorStyle", "connectorHoverStyle", "connectorOverlays", "connector", "connectionType", "connectorClass", "connectorHoverClass"], h = function (a, b) {
        var c = 0;
        if (null != b)for (var d = 0; d < a.connections.length; d++)if (a.connections[d].sourceId == b || a.connections[d].targetId == b) {
            c = d;
            break
        }
        return a.connections[c]
    };
    b.Endpoint = function (a) {
        var i = a._jsPlumb, j = a.newConnection, k = a.newEndpoint;
        this.idPrefix = "_jsplumb_e_", this.defaultLabelLocation = [.5, .5], this.defaultOverlayKeys = ["Overlays", "EndpointOverlays"], b.OverlayCapableJsPlumbUIComponent.apply(this, arguments), this.appendToDefaultType({
            connectionType: a.connectionType,
            maxConnections: null == a.maxConnections ? this._jsPlumb.instance.Defaults.MaxConnections : a.maxConnections,
            paintStyle: a.endpointStyle || a.paintStyle || a.style || this._jsPlumb.instance.Defaults.EndpointStyle || b.Defaults.EndpointStyle,
            hoverPaintStyle: a.endpointHoverStyle || a.hoverPaintStyle || this._jsPlumb.instance.Defaults.EndpointHoverStyle || b.Defaults.EndpointHoverStyle,
            connectorStyle: a.connectorStyle,
            connectorHoverStyle: a.connectorHoverStyle,
            connectorClass: a.connectorClass,
            connectorHoverClass: a.connectorHoverClass,
            connectorOverlays: a.connectorOverlays,
            connector: a.connector,
            connectorTooltip: a.connectorTooltip
        }), this._jsPlumb.enabled = !(a.enabled === !1), this._jsPlumb.visible = !0, this.element = b.getElement(a.source), this._jsPlumb.uuid = a.uuid, this._jsPlumb.floatingEndpoint = null;
        var l = null;
        this._jsPlumb.uuid && (a.endpointsByUUID[this._jsPlumb.uuid] = this), this.elementId = a.elementId, this.dragProxy = a.dragProxy, this._jsPlumb.connectionCost = a.connectionCost, this._jsPlumb.connectionsDirected = a.connectionsDirected, this._jsPlumb.currentAnchorClass = "", this._jsPlumb.events = {};
        var m = function () {
            var a = i.endpointAnchorClassPrefix + "-" + this._jsPlumb.currentAnchorClass;
            this._jsPlumb.currentAnchorClass = this.anchor.getCssClass();
            var b = i.endpointAnchorClassPrefix + (this._jsPlumb.currentAnchorClass ? "-" + this._jsPlumb.currentAnchorClass : "");
            this.removeClass(a), this.addClass(b), jsPlumb.updateClasses(this.element, b, a)
        }.bind(this);
        this.prepareAnchor = function (a) {
            var b = this._jsPlumb.instance.makeAnchor(a, this.elementId, i);
            return b.bind("anchorChanged", function (a) {
                this.fire("anchorChanged", {endpoint: this, anchor: a}), m()
            }.bind(this)), b
        }, this.setPreparedAnchor = function (a, b) {
            return this._jsPlumb.instance.continuousAnchorFactory.clear(this.elementId), this.anchor = a, m(), b || this._jsPlumb.instance.repaint(this.elementId), this
        }, this.setAnchor = function (a, b) {
            var c = this.prepareAnchor(a);
            return this.setPreparedAnchor(c, b), this
        };
        var n = function (a) {
            if (this.connections.length > 0)for (var b = 0; b < this.connections.length; b++)this.connections[b].setHover(a, !1); else this.setHover(a)
        }.bind(this);
        this.bind("mouseover", function () {
            n(!0)
        }), this.bind("mouseout", function () {
            n(!1)
        }), a._transient || this._jsPlumb.instance.anchorManager.add(this, this.elementId), this.prepareEndpoint = function (d, e) {
            var f, g = function (a, c) {
                var d = i.getRenderMode();
                if (b.Endpoints[d][a])return new b.Endpoints[d][a](c);
                if (!i.Defaults.DoNotThrowErrors)throw{msg: "jsPlumb: unknown endpoint type '" + a + "'"}
            }, h = {
                _jsPlumb: this._jsPlumb.instance,
                cssClass: a.cssClass,
                container: a.container,
                tooltip: a.tooltip,
                connectorTooltip: a.connectorTooltip,
                endpoint: this
            };
            return c.isString(d) ? f = g(d, h) : c.isArray(d) ? (h = c.merge(d[1], h), f = g(d[0], h)) : f = d.clone(), f.clone = function () {
                return c.isString(d) ? g(d, h) : c.isArray(d) ? (h = c.merge(d[1], h), g(d[0], h)) : void 0
            }.bind(this), f.typeId = e, f
        }, this.setEndpoint = function (a) {
            var b = this.prepareEndpoint(a);
            this.setPreparedEndpoint(b, !0)
        }, this.setPreparedEndpoint = function (a) {
            null != this.endpoint && (this.endpoint.cleanup(), this.endpoint.destroy()), this.endpoint = a, this.type = this.endpoint.type, this.canvas = this.endpoint.canvas
        }, b.extend(this, a, g), this.isSource = a.isSource || !1, this.isTemporarySource = a.isTemporarySource || !1, this.isTarget = a.isTarget || !1, this.connections = a.connections || [], this.connectorPointerEvents = a["connector-pointer-events"], this.scope = a.scope || i.getDefaultScope(), this.timestamp = null, this.reattachConnections = a.reattach || i.Defaults.ReattachConnections, this.connectionsDetachable = i.Defaults.ConnectionsDetachable, (a.connectionsDetachable === !1 || a.detachable === !1) && (this.connectionsDetachable = !1), this.dragAllowedWhenFull = a.dragAllowedWhenFull !== !1, a.onMaxConnections && this.bind("maxConnections", a.onMaxConnections), this.addConnection = function (a) {
            this.connections.push(a), this[(this.connections.length > 0 ? "add" : "remove") + "Class"](i.endpointConnectedClass), this[(this.isFull() ? "add" : "remove") + "Class"](i.endpointFullClass)
        }, this.detachFromConnection = function (a, b, c) {
            b = null == b ? this.connections.indexOf(a) : b, b >= 0 && (this.connections.splice(b, 1), this[(this.connections.length > 0 ? "add" : "remove") + "Class"](i.endpointConnectedClass), this[(this.isFull() ? "add" : "remove") + "Class"](i.endpointFullClass)), !c && this._deleteOnDetach && 0 === this.connections.length && i.deleteObject({
                endpoint: this,
                fireEvent: !1,
                deleteAttachedObjects: !1
            })
        }, this.detach = function (a, b, c, d, e, f, g) {
            var h = null == g ? this.connections.indexOf(a) : g, j = !1;
            return d = d !== !1, h >= 0 && (c || a._forceDetach || a.isDetachable() && a.isDetachAllowed(a) && this.isDetachAllowed(a) && i.checkCondition("beforeDetach", a, f)) && (i.deleteObject({
                connection: a,
                fireEvent: !b && d,
                originalEvent: e,
                deleteAttachedObjects: !1
            }), j = !0), j
        }, this.detachAll = function (a, b) {
            for (var c = []; this.connections.length > 0;) {
                var d = this.detach(this.connections[0], !1, b === !0, a !== !1, null, this, 0);
                d || (c.push(this.connections[0]), this.connections.splice(0, 1))
            }
            return this.connections = c, this
        }, this.detachFrom = function (a, b, c) {
            for (var d = [], e = 0; e < this.connections.length; e++)(this.connections[e].endpoints[1] == a || this.connections[e].endpoints[0] == a) && d.push(this.connections[e]);
            for (var f = 0; f < d.length; f++)this.detach(d[f], !1, !0, b, c);
            return this
        }, this.getElement = function () {
            return this.element
        }, this.setElement = function (b) {
            var d = this._jsPlumb.instance.getId(b), e = this.elementId;
            return c.removeWithFunction(a.endpointsByElement[this.elementId], function (a) {
                return a.id == this.id
            }.bind(this)), this.element = jsPlumb.getElement(b), this.elementId = i.getId(this.element), i.anchorManager.rehomeEndpoint(this, e, this.element), i.dragManager.endpointAdded(this.element), c.addToList(a.endpointsByElement, d, this), this
        }, this.makeInPlaceCopy = function () {
            var b = this.anchor.getCurrentLocation({element: this}), c = this.anchor.getOrientation(this), d = this.anchor.getCssClass(), e = {
                bind: function () {
                }, compute: function () {
                    return [b[0], b[1]]
                }, getCurrentLocation: function () {
                    return [b[0], b[1]]
                }, getOrientation: function () {
                    return c
                }, getCssClass: function () {
                    return d
                }
            };
            return k({
                dropOptions: a.dropOptions,
                anchor: e,
                source: this.element,
                paintStyle: this.getPaintStyle(),
                endpoint: a.hideOnDrag ? "Blank" : this.endpoint,
                _transient: !0,
                scope: this.scope,
                reference: this
            })
        }, this.connectorSelector = function () {
            var a = this.connections[0];
            return a ? a : this.connections.length < this._jsPlumb.maxConnections || -1 == this._jsPlumb.maxConnections ? null : a
        }, this.setStyle = this.setPaintStyle, this.paint = function (a) {
            a = a || {};
            var b = a.timestamp, c = !(a.recalc === !1);
            if (!b || this.timestamp !== b) {
                var d = i.updateOffset({
                    elId: this.elementId,
                    timestamp: b
                }), e = a.offset ? a.offset.o : d.o;
                if (null != e) {
                    var f = a.anchorPoint, g = a.connectorPaintStyle;
                    if (null == f) {
                        var j = a.dimensions || d.s, k = {
                            xy: [e.left, e.top],
                            wh: j,
                            element: this,
                            timestamp: b
                        };
                        if (c && this.anchor.isDynamic && this.connections.length > 0) {
                            var l = h(this, a.elementWithPrecedence), m = l.endpoints[0] == this ? 1 : 0, n = 0 === m ? l.sourceId : l.targetId, o = i.getCachedData(n), p = o.o, q = o.s;
                            k.txy = [p.left, p.top], k.twh = q, k.tElement = l.endpoints[m]
                        }
                        f = this.anchor.compute(k)
                    }
                    this.endpoint.compute(f, this.anchor.getOrientation(this), this._jsPlumb.paintStyleInUse, g || this.paintStyleInUse), this.endpoint.paint(this._jsPlumb.paintStyleInUse, this.anchor), this.timestamp = b;
                    for (var r in this._jsPlumb.overlays)if (this._jsPlumb.overlays.hasOwnProperty(r)) {
                        var s = this._jsPlumb.overlays[r];
                        s.isVisible() && (this._jsPlumb.overlayPlacements[r] = s.draw(this.endpoint, this._jsPlumb.paintStyleInUse), s.paint(this._jsPlumb.overlayPlacements[r]))
                    }
                }
            }
        }, this.getTypeDescriptor = function () {
            return "endpoint"
        }, this.isVisible = function () {
            return this._jsPlumb.visible
        }, this.repaint = this.paint;
        var o = !1;
        this.initDraggable = function () {
            if (!o && b.isDragSupported(this.element)) {
                var g, h = {
                    id: null,
                    element: null
                }, m = null, n = !1, p = null, q = d(this, h, i), r = a.dragOptions || {}, s = {}, t = b.dragEvents.start, u = b.dragEvents.stop, v = b.dragEvents.drag, w = b.dragEvents.beforeStart, x = function (a) {
                    g = a.e.payload || {}
                }, y = function () {
                    m = this.connectorSelector();
                    var b = !0;
                    this.isEnabled() || (b = !1), null != m || this.isSource || this.isTemporarySource || (b = !1), !this.isSource || !this.isFull() || null != m && this.dragAllowedWhenFull || (b = !1), null == m || m.isDetachable(this) || (b = !1);
                    var d = i.checkCondition(null == m ? "beforeDrag" : "beforeStartDetach", {
                        endpoint: this,
                        source: this.element,
                        sourceId: this.elementId,
                        connection: m
                    });
                    if (d === !1 ? b = !1 : "object" == typeof d ? jsPlumb.extend(d, g || {}) : d = g || {}, b === !1)return i.stopDrag && i.stopDrag(this.canvas), q.stopDrag(), !1;
                    for (var l = 0; l < this.connections.length; l++)this.connections[l].setHover(!1);
                    this.addClass("endpointDrag"), i.setConnectionBeingDragged(!0), m && !this.isFull() && this.isSource && (m = null), i.updateOffset({elId: this.elementId});
                    var o = this._jsPlumb.instance.getOffset(this.canvas), r = this.canvas, s = this._jsPlumb.instance.getSize(this.canvas);
                    e(h, i, o, s), i.setAttributes(this.canvas, {
                        dragId: h.id,
                        elId: this.elementId
                    });
                    var t = this.dragProxy || this.endpoint;
                    if (null == this.dragProxy && null != this.connectionType) {
                        var u = this._jsPlumb.instance.deriveEndpointAndAnchorSpec(this.connectionType);
                        u.endpoints[1] && (t = u.endpoints[1])
                    }
                    var v = this._jsPlumb.instance.makeAnchor("Center");
                    v.isFloating = !0, this._jsPlumb.floatingEndpoint = f(this.getPaintStyle(), v, t, this.canvas, h.element, i, k, this.scope);
                    var w = this._jsPlumb.floatingEndpoint.anchor;
                    if (null == m)this.setHover(!1, !1), m = j({
                        sourceEndpoint: this,
                        targetEndpoint: this._jsPlumb.floatingEndpoint,
                        source: this.element,
                        target: h.element,
                        anchors: [this.anchor, this._jsPlumb.floatingEndpoint.anchor],
                        paintStyle: a.connectorStyle,
                        hoverPaintStyle: a.connectorHoverStyle,
                        connector: a.connector,
                        overlays: a.connectorOverlays,
                        type: this.connectionType,
                        cssClass: this.connectorClass,
                        hoverClass: this.connectorHoverClass,
                        data: d
                    }), m.pending = !0, m.addClass(i.draggingClass), this._jsPlumb.floatingEndpoint.addClass(i.draggingClass), this._jsPlumb.floatingEndpoint.anchor = w, i.fire("connectionDrag", m), i.anchorManager.newConnection(m); else {
                        n = !0, m.setHover(!1);
                        var x = m.endpoints[0].id == this.id ? 0 : 1;
                        this.detachFromConnection(m, null, !0);
                        var y = i.getDragScope(r);
                        i.setAttribute(this.canvas, "originalScope", y), i.fire("connectionDrag", m), 0 === x ? (p = [m.source, m.sourceId, r, y], m.source = h.element, m.sourceId = h.id, i.anchorManager.sourceChanged(m.endpoints[x].elementId, m.sourceId, m)) : (p = [m.target, m.targetId, r, y], m.target = h.element, m.targetId = h.id, i.anchorManager.updateOtherEndpoint(m.sourceId, m.endpoints[x].elementId, m.targetId, m)), m.suspendedEndpoint = m.endpoints[x], m.suspendedElement = m.endpoints[x].getElement(), m.suspendedElementId = m.endpoints[x].elementId, m.suspendedElementType = 0 === x ? "source" : "target", m.suspendedEndpoint.setHover(!1), this._jsPlumb.floatingEndpoint.referenceEndpoint = m.suspendedEndpoint, m.endpoints[x] = this._jsPlumb.floatingEndpoint, m.addClass(i.draggingClass), this._jsPlumb.floatingEndpoint.addClass(i.draggingClass)
                    }
                    i.floatingConnections[h.id] = m, c.addToList(a.endpointsByElement, h.id, this._jsPlumb.floatingEndpoint), i.currentlyDragging = !0
                }.bind(this), z = function () {
                    if (i.setConnectionBeingDragged(!1), m && null != m.endpoints) {
                        var a = i.getDropEvent(arguments), b = i.getFloatingAnchorIndex(m);
                        if (m.endpoints[0 === b ? 1 : 0].anchor.locked = !1, m.removeClass(i.draggingClass), this._jsPlumb && (m.deleteConnectionNow || m.endpoints[b] == this._jsPlumb.floatingEndpoint) && n && m.suspendedEndpoint) {
                            0 === b ? (m.floatingElement = m.source, m.floatingId = m.sourceId, m.floatingEndpoint = m.endpoints[0], m.floatingIndex = 0, m.source = p[0], m.sourceId = p[1]) : (m.floatingElement = m.target, m.floatingId = m.targetId, m.floatingEndpoint = m.endpoints[1], m.floatingIndex = 1, m.target = p[0], m.targetId = p[1]);
                            var c = this._jsPlumb.floatingEndpoint;
                            i.setDragScope(p[2], p[3]), m.endpoints[b] = m.suspendedEndpoint, m.isReattach() || m._forceReattach || m._forceDetach || !m.endpoints[0 === b ? 1 : 0].detach(m, !1, !1, !0, a, !0) ? (m.setHover(!1), m._forceDetach = null, m._forceReattach = null, this._jsPlumb.floatingEndpoint.detachFromConnection(m), m.suspendedEndpoint.addConnection(m), 1 == b ? i.anchorManager.updateOtherEndpoint(m.sourceId, m.floatingId, m.targetId, m) : i.anchorManager.sourceChanged(m.floatingId, m.sourceId, m), i.repaint(p[1])) : i.deleteObject({endpoint: c})
                        }
                        this.deleteAfterDragStop ? i.deleteObject({endpoint: this}) : this._jsPlumb && this.paint({recalc: !1}), i.fire("connectionDragStop", m, a), i.currentlyDragging = !1, m = null
                    }
                    h && h.element && i.remove(h.element, !1, !1), l && i.deleteObject({endpoint: l}), this._jsPlumb && (this.canvas.style.visibility = "visible", this.anchor.locked = !1, this._jsPlumb.floatingEndpoint = null)
                }.bind(this);
                r = b.extend(s, r), r.scope = this.scope || r.scope, r[w] = c.wrap(r[w], x, !1), r[t] = c.wrap(r[t], y, !1), r[v] = c.wrap(r[v], q.drag), r[u] = c.wrap(r[u], z), r.multipleDrop = !1, r.canDrag = function () {
                    return this.isSource || this.isTemporarySource || this.connections.length > 0
                }.bind(this), i.initDraggable(this.canvas, r, "internal"), this.canvas._jsPlumbRelatedElement = this.element, o = !0
            }
        };
        var p = a.endpoint || this._jsPlumb.instance.Defaults.Endpoint || b.Defaults.Endpoint;
        this.setEndpoint(p, !0);
        var q = a.anchor ? a.anchor : a.anchors ? a.anchors : i.Defaults.Anchor || "Top";
        this.setAnchor(q, !0);
        var r = ["default", a.type || ""].join(" ");
        this.addType(r, a.data, !0), this.canvas = this.endpoint.canvas, this.canvas._jsPlumb = this, this.initDraggable();
        var s = function (d, e, f, g) {
            if (b.isDropSupported(this.element)) {
                var h = a.dropOptions || i.Defaults.DropOptions || b.Defaults.DropOptions;
                h = b.extend({}, h), h.scope = h.scope || this.scope;
                var j = b.dragEvents.drop, k = b.dragEvents.over, l = b.dragEvents.out, m = this, n = i.EndpointDropHandler({
                    getEndpoint: function () {
                        return m
                    },
                    jsPlumb: i,
                    enabled: function () {
                        return null != f ? f.isEnabled() : !0
                    },
                    isFull: function () {
                        return f.isFull()
                    },
                    element: this.element,
                    elementId: this.elementId,
                    isSource: this.isSource,
                    isTarget: this.isTarget,
                    addClass: function (a) {
                        m.addClass(a)
                    },
                    removeClass: function (a) {
                        m.removeClass(a)
                    },
                    isDropAllowed: function () {
                        return m.isDropAllowed.apply(m, arguments)
                    },
                    reference: g,
                    isRedrop: function (a, b) {
                        return a.suspendedEndpoint && b.reference && a.suspendedEndpoint.id === b.reference.id
                    }
                });
                h[j] = c.wrap(h[j], n, !0), h[k] = c.wrap(h[k], function () {
                    var a = b.getDragObject(arguments), c = i.getAttribute(b.getElement(a), "dragId"), d = i.floatingConnections[c];
                    if (null != d) {
                        var e = i.getFloatingAnchorIndex(d), f = this.isTarget && 0 !== e || d.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id == d.suspendedEndpoint.id;
                        if (f) {
                            var g = i.checkCondition("checkDropAllowed", {
                                sourceEndpoint: d.endpoints[e],
                                targetEndpoint: this,
                                connection: d
                            });
                            this[(g ? "add" : "remove") + "Class"](i.endpointDropAllowedClass), this[(g ? "remove" : "add") + "Class"](i.endpointDropForbiddenClass), d.endpoints[e].anchor.over(this.anchor, this)
                        }
                    }
                }.bind(this)), h[l] = c.wrap(h[l], function () {
                    var a = b.getDragObject(arguments), c = null == a ? null : i.getAttribute(b.getElement(a), "dragId"), d = c ? i.floatingConnections[c] : null;
                    if (null != d) {
                        var e = i.getFloatingAnchorIndex(d), f = this.isTarget && 0 !== e || d.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id == d.suspendedEndpoint.id;
                        f && (this.removeClass(i.endpointDropAllowedClass), this.removeClass(i.endpointDropForbiddenClass), d.endpoints[e].anchor.out())
                    }
                }.bind(this)), i.initDroppable(d, h, "internal", e)
            }
        }.bind(this);
        return this.anchor.isFloating || s(this.canvas, !(a._transient || this.anchor.isFloating), this, a.reference), this
    }, c.extend(b.Endpoint, b.OverlayCapableJsPlumbUIComponent, {
        setVisible: function (a, b, c) {
            if (this._jsPlumb.visible = a, this.canvas && (this.canvas.style.display = a ? "block" : "none"), this[a ? "showOverlays" : "hideOverlays"](), !b)for (var d = 0; d < this.connections.length; d++)if (this.connections[d].setVisible(a), !c) {
                var e = this === this.connections[d].endpoints[0] ? 1 : 0;
                1 == this.connections[d].endpoints[e].connections.length && this.connections[d].endpoints[e].setVisible(a, !0, !0)
            }
        }, getAttachedElements: function () {
            return this.connections
        }, applyType: function (a, c) {
            this.setPaintStyle(a.endpointStyle || a.paintStyle, c), this.setHoverPaintStyle(a.endpointHoverStyle || a.hoverPaintStyle, c), null != a.maxConnections && (this._jsPlumb.maxConnections = a.maxConnections), a.scope && (this.scope = a.scope), b.extend(this, a, g), null != a.cssClass && this.canvas && this._jsPlumb.instance.addClass(this.canvas, a.cssClass), b.OverlayCapableJsPlumbUIComponent.applyType(this, a)
        }, isEnabled: function () {
            return this._jsPlumb.enabled
        }, setEnabled: function (a) {
            this._jsPlumb.enabled = a
        }, cleanup: function () {
            var a = this._jsPlumb.instance.endpointAnchorClassPrefix + (this._jsPlumb.currentAnchorClass ? "-" + this._jsPlumb.currentAnchorClass : "");
            jsPlumb.removeClass(this.element, a), this.anchor = null, this.endpoint.cleanup(!0), this.endpoint.destroy(), this.endpoint = null, this._jsPlumb.instance.destroyDraggable(this.canvas, "internal"), this._jsPlumb.instance.destroyDroppable(this.canvas, "internal")
        }, setHover: function (a) {
            this.endpoint && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged() && this.endpoint.setHover(a)
        }, isFull: function () {
            return 0 === this._jsPlumb.maxConnections ? !0 : !(this.isFloating() || this._jsPlumb.maxConnections < 0 || this.connections.length < this._jsPlumb.maxConnections)
        }, isFloating: function () {
            return null != this.anchor && this.anchor.isFloating
        }, isConnectedTo: function (a) {
            var b = !1;
            if (a)for (var c = 0; c < this.connections.length; c++)if (this.connections[c].endpoints[1] == a || this.connections[c].endpoints[0] == a) {
                b = !0;
                break
            }
            return b
        }, getConnectionCost: function () {
            return this._jsPlumb.connectionCost
        }, setConnectionCost: function (a) {
            this._jsPlumb.connectionCost = a
        }, areConnectionsDirected: function () {
            return this._jsPlumb.connectionsDirected
        }, setConnectionsDirected: function (a) {
            this._jsPlumb.connectionsDirected = a
        }, setElementId: function (a) {
            this.elementId = a, this.anchor.elementId = a
        }, setReferenceElement: function (a) {
            this.element = b.getElement(a)
        }, setDragAllowedWhenFull: function (a) {
            this.dragAllowedWhenFull = a
        }, equals: function (a) {
            return this.anchor.equals(a.anchor)
        }, getUuid: function () {
            return this._jsPlumb.uuid
        }, computeAnchor: function (a) {
            return this.anchor.compute(a)
        }
    }), a.jsPlumbInstance.prototype.EndpointDropHandler = function (a) {
        return function (b) {
            var c = a.jsPlumb;
            a.removeClass(c.endpointDropAllowedClass), a.removeClass(c.endpointDropForbiddenClass);
            var d = c.getDropEvent(arguments), e = c.getDragObject(arguments), f = c.getAttribute(e, "dragId"), g = (c.getAttribute(e, "elId"), c.getAttribute(e, "originalScope")), h = c.floatingConnections[f];
            if (null != h) {
                var i = null != h.suspendedEndpoint;
                if (!i || null != h.suspendedEndpoint._jsPlumb) {
                    var j = a.getEndpoint(h);
                    if (null != j) {
                        if (a.isRedrop(h, a))return h._forceReattach = !0, h.setHover(!1), a.maybeCleanup && a.maybeCleanup(j), void 0;
                        var k = c.getFloatingAnchorIndex(h);
                        if (0 === k && !a.isSource || 1 === k && !a.isTarget)return a.maybeCleanup && a.maybeCleanup(j), void 0;
                        a.onDrop && a.onDrop(h), g && c.setDragScope(e, g);
                        var l = a.isFull(b);
                        if (l && j.fire("maxConnections", {
                                endpoint: this,
                                connection: h,
                                maxConnections: j._jsPlumb.maxConnections
                            }, d), !l && a.enabled()) {
                            var m = !0;
                            0 === k ? (h.floatingElement = h.source, h.floatingId = h.sourceId, h.floatingEndpoint = h.endpoints[0], h.floatingIndex = 0, h.source = a.element, h.sourceId = a.elementId) : (h.floatingElement = h.target, h.floatingId = h.targetId, h.floatingEndpoint = h.endpoints[1], h.floatingIndex = 1, h.target = a.element, h.targetId = a.elementId), i && h.suspendedEndpoint.id != j.id && (h.isDetachAllowed(h) && h.endpoints[k].isDetachAllowed(h) && h.suspendedEndpoint.isDetachAllowed(h) && c.checkCondition("beforeDetach", h) || (m = !1));
                            var n = function (a) {
                                h.endpoints[k].detachFromConnection(h), h.suspendedEndpoint && h.suspendedEndpoint.detachFromConnection(h), h.endpoints[k] = j, j.addConnection(h);
                                var b = j.getParameters();
                                for (var e in b)h.setParameter(e, b[e]);
                                if (i) {
                                    var f = h.suspendedEndpoint.elementId;
                                    c.fireMoveEvent({
                                        index: k,
                                        originalSourceId: 0 === k ? f : h.sourceId,
                                        newSourceId: 0 === k ? j.elementId : h.sourceId,
                                        originalTargetId: 1 == k ? f : h.targetId,
                                        newTargetId: 1 == k ? j.elementId : h.targetId,
                                        originalSourceEndpoint: 0 === k ? h.suspendedEndpoint : h.endpoints[0],
                                        newSourceEndpoint: 0 === k ? j : h.endpoints[0],
                                        originalTargetEndpoint: 1 == k ? h.suspendedEndpoint : h.endpoints[1],
                                        newTargetEndpoint: 1 == k ? j : h.endpoints[1],
                                        connection: h
                                    }, d)
                                } else b.draggable && c.initDraggable(this.element, dragOptions, "internal", c);
                                if (1 == k ? c.anchorManager.updateOtherEndpoint(h.sourceId, h.floatingId, h.targetId, h) : c.anchorManager.sourceChanged(h.floatingId, h.sourceId, h), h.endpoints[0].finalEndpoint) {
                                    var g = h.endpoints[0];
                                    g.detachFromConnection(h), h.endpoints[0] = h.endpoints[0].finalEndpoint, h.endpoints[0].addConnection(h)
                                }
                                jsPlumbUtil.isObject(a) && h.mergeData(a), c.finaliseConnection(h, null, d, !1), h.setHover(!1)
                            }.bind(this), o = function () {
                                h.suspendedEndpoint && (h.endpoints[k] = h.suspendedEndpoint, h.setHover(!1), h._forceDetach = !0, 0 === k ? (h.source = h.suspendedEndpoint.element, h.sourceId = h.suspendedEndpoint.elementId) : (h.target = h.suspendedEndpoint.element, h.targetId = h.suspendedEndpoint.elementId), h.suspendedEndpoint.addConnection(h), 1 == k ? c.anchorManager.updateOtherEndpoint(h.sourceId, h.floatingId, h.targetId, h) : c.anchorManager.sourceChanged(h.floatingId, h.sourceId, h), c.repaint(h.sourceId), h._forceDetach = !1)
                            };
                            if (m = m && a.isDropAllowed(h.sourceId, h.targetId, h.scope, h, j))return n(m), !0;
                            o()
                        }
                        a.maybeCleanup && a.maybeCleanup(j), c.currentlyDragging = !1
                    }
                }
            }
        }
    }
}.call(this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil, d = function (a, c, d, e, f) {
        if (!a.Defaults.DoNotThrowErrors && null == jsPlumb.Connectors[c][d])throw{msg: "jsPlumb: unknown connector type '" + d + "'"};
        return new b.Connectors[c][d](e, f)
    }, e = function (a, b, c) {
        return a ? c.makeAnchor(a, b, c) : null
    }, f = function (a, b, d, e) {
        null != b && (b._jsPlumbConnections = b._jsPlumbConnections || {}, e ? delete b._jsPlumbConnections[a.id] : b._jsPlumbConnections[a.id] = !0, c.isEmpty(b._jsPlumbConnections) ? d.removeClass(b, d.connectedClass) : d.addClass(b, d.connectedClass))
    };
    b.Connection = function (a) {
        var d = a.newEndpoint;
        this.id = a.id, this.connector = null, this.idPrefix = "_jsplumb_c_", this.defaultLabelLocation = .5, this.defaultOverlayKeys = ["Overlays", "ConnectionOverlays"], this.previousConnection = a.previousConnection, this.source = b.getElement(a.source), this.target = b.getElement(a.target), a.sourceEndpoint && (this.source = a.sourceEndpoint.getElement()), a.targetEndpoint && (this.target = a.targetEndpoint.getElement()), b.OverlayCapableJsPlumbUIComponent.apply(this, arguments), this.sourceId = this._jsPlumb.instance.getId(this.source), this.targetId = this._jsPlumb.instance.getId(this.target), this.scope = a.scope, this.endpoints = [], this.endpointStyles = [];
        var e = this._jsPlumb.instance;
        e.manage(this.sourceId, this.source), e.manage(this.targetId, this.target), this._jsPlumb.visible = !0, this._jsPlumb.editable = a.editable === !0, this._jsPlumb.params = {
            cssClass: a.cssClass,
            container: a.container,
            "pointer-events": a["pointer-events"],
            editorParams: a.editorParams,
            overlays: a.overlays
        }, this._jsPlumb.lastPaintedAt = null, this.bind("mouseover", function () {
            this.setHover(!0)
        }.bind(this)), this.bind("mouseout", function () {
            this.setHover(!1)
        }.bind(this)), this.makeEndpoint = function (b, c, f, g) {
            return f = f || this._jsPlumb.instance.getId(c), this.prepareEndpoint(e, d, this, g, b ? 0 : 1, a, c, f)
        }, a.type && (a.endpoints = this._jsPlumb.instance.deriveEndpointAndAnchorSpec(a.type).endpoints);
        var f = this.makeEndpoint(!0, this.source, this.sourceId, a.sourceEndpoint), g = this.makeEndpoint(!1, this.target, this.targetId, a.targetEndpoint);
        f && c.addToList(a.endpointsByElement, this.sourceId, f), g && c.addToList(a.endpointsByElement, this.targetId, g), this.scope || (this.scope = this.endpoints[0].scope), null != a.deleteEndpointsOnDetach ? (this.endpoints[0]._deleteOnDetach = a.deleteEndpointsOnDetach, this.endpoints[1]._deleteOnDetach = a.deleteEndpointsOnDetach) : (this.endpoints[0]._doNotDeleteOnDetach || (this.endpoints[0]._deleteOnDetach = !0), this.endpoints[1]._doNotDeleteOnDetach || (this.endpoints[1]._deleteOnDetach = !0));
        var h = e.Defaults.ConnectionsDetachable;
        a.detachable === !1 && (h = !1), this.endpoints[0].connectionsDetachable === !1 && (h = !1), this.endpoints[1].connectionsDetachable === !1 && (h = !1);
        var i = a.reattach || this.endpoints[0].reattachConnections || this.endpoints[1].reattachConnections || e.Defaults.ReattachConnections;
        this.appendToDefaultType({
            detachable: h,
            rettach: i,
            paintStyle: this.endpoints[0].connectorStyle || this.endpoints[1].connectorStyle || a.paintStyle || e.Defaults.PaintStyle || jsPlumb.Defaults.PaintStyle,
            hoverPaintStyle: this.endpoints[0].connectorHoverStyle || this.endpoints[1].connectorHoverStyle || a.hoverPaintStyle || e.Defaults.HoverPaintStyle || jsPlumb.Defaults.HoverPaintStyle
        });
        var j = e.getSuspendedAt();
        if (!e.isSuspendDrawing()) {
            var k = e.getCachedData(this.sourceId), l = k.o, m = k.s, n = e.getCachedData(this.targetId), o = n.o, p = n.s, q = j || e.timestamp(), r = this.endpoints[0].anchor.compute({
                xy: [l.left, l.top],
                wh: m,
                element: this.endpoints[0],
                elementId: this.endpoints[0].elementId,
                txy: [o.left, o.top],
                twh: p,
                tElement: this.endpoints[1],
                timestamp: q
            });
            this.endpoints[0].paint({
                anchorLoc: r,
                timestamp: q
            }), r = this.endpoints[1].anchor.compute({
                xy: [o.left, o.top],
                wh: p,
                element: this.endpoints[1],
                elementId: this.endpoints[1].elementId,
                txy: [l.left, l.top],
                twh: m,
                tElement: this.endpoints[0],
                timestamp: q
            }), this.endpoints[1].paint({anchorLoc: r, timestamp: q})
        }
        this.getTypeDescriptor = function () {
            return "connection"
        }, this.getAttachedElements = function () {
            return this.endpoints
        }, this.isDetachable = function () {
            return this._jsPlumb.detachable === !0
        }, this.setDetachable = function (a) {
            this._jsPlumb.detachable = a === !0
        }, this.isReattach = function () {
            return this._jsPlumb.reattach === !0 || this.endpoints[0].reattachConnections === !0 || this.endpoints[1].reattachConnections === !0
        }, this.setReattach = function (a) {
            this._jsPlumb.reattach = a === !0
        }, this._jsPlumb.cost = a.cost || this.endpoints[0].getConnectionCost(), this._jsPlumb.directed = a.directed, null == a.directed && (this._jsPlumb.directed = this.endpoints[0].areConnectionsDirected());
        var s = jsPlumb.extend({}, this.endpoints[1].getParameters());
        b.extend(s, this.endpoints[0].getParameters()), b.extend(s, this.getParameters()), this.setParameters(s), this.setConnector(this.endpoints[0].connector || this.endpoints[1].connector || a.connector || e.Defaults.Connector || b.Defaults.Connector, !0);
        var t = null != a.data && jsPlumbUtil.isObject(a.data) ? a.data : {};
        this.getData = function () {
            return t
        }, this.setData = function (a) {
            t = a || {}
        }, this.mergeData = function (a) {
            t = jsPlumb.extend(t, a)
        };
        var u = ["default", this.endpoints[0].connectionType, this.endpoints[1].connectionType, a.type].join(" ");
        /[^\s]/.test(u) && this.addType(u, a.data, !0), this.updateConnectedClass()
    }, c.extend(b.Connection, b.OverlayCapableJsPlumbUIComponent, {
        applyType: function (a, c, d) {
            null != a.detachable && this.setDetachable(a.detachable), null != a.reattach && this.setReattach(a.reattach), a.scope && (this.scope = a.scope), null != a.cssClass && this.canvas && this._jsPlumb.instance.addClass(this.canvas, a.cssClass);
            var e = null;
            a.anchor ? (e = this.getCachedTypeItem("anchors", d.anchor), null == e && (e = [this._jsPlumb.instance.makeAnchor(a.anchor), this._jsPlumb.instance.makeAnchor(a.anchor)], this.cacheTypeItem("anchors", e, d.anchor))) : a.anchors && (e = this.getCachedTypeItem("anchors", d.anchors), null == e && (e = [this._jsPlumb.instance.makeAnchor(a.anchors[0]), this._jsPlumb.instance.makeAnchor(a.anchors[1])], this.cacheTypeItem("anchors", e, d.anchors))), null != e && (this.endpoints[0].anchor = e[0], this.endpoints[1].anchor = e[1], this.endpoints[1].anchor.isDynamic && this._jsPlumb.instance.repaint(this.endpoints[1].elementId)), b.OverlayCapableJsPlumbUIComponent.applyType(this, a)
        }, addClass: function (a, b) {
            b && (this.endpoints[0].addClass(a), this.endpoints[1].addClass(a), this.suspendedEndpoint && this.suspendedEndpoint.addClass(a)), this.connector && this.connector.addClass(a)
        }, removeClass: function (a, b) {
            b && (this.endpoints[0].removeClass(a), this.endpoints[1].removeClass(a), this.suspendedEndpoint && this.suspendedEndpoint.removeClass(a)), this.connector && this.connector.removeClass(a)
        }, isVisible: function () {
            return this._jsPlumb.visible
        }, setVisible: function (a) {
            this._jsPlumb.visible = a, this.connector && this.connector.setVisible(a), this.repaint()
        }, cleanup: function () {
            this.updateConnectedClass(!0), this.endpoints = null, this.source = null, this.target = null, null != this.connector && (this.connector.cleanup(!0), this.connector.destroy(!0)), this.connector = null
        }, updateConnectedClass: function (a) {
            f(this, this.source, this._jsPlumb.instance, a), f(this, this.target, this._jsPlumb.instance, a)
        }, setHover: function (b) {
            this.connector && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged() && (this.connector.setHover(b), a.jsPlumb[b ? "addClass" : "removeClass"](this.source, this._jsPlumb.instance.hoverSourceClass), a.jsPlumb[b ? "addClass" : "removeClass"](this.target, this._jsPlumb.instance.hoverTargetClass))
        }, getUuids: function () {
            return [this.endpoints[0].getUuid(), this.endpoints[1].getUuid()]
        }, getCost: function () {
            return this._jsPlumb.cost
        }, setCost: function (a) {
            this._jsPlumb.cost = a
        }, isDirected: function () {
            return this._jsPlumb.directed === !0
        }, getConnector: function () {
            return this.connector
        }, prepareConnector: function (a, b) {
            var e, f = {
                _jsPlumb: this._jsPlumb.instance,
                cssClass: this._jsPlumb.params.cssClass,
                container: this._jsPlumb.params.container,
                "pointer-events": this._jsPlumb.params["pointer-events"]
            }, g = this._jsPlumb.instance.getRenderMode();
            return c.isString(a) ? e = d(this._jsPlumb.instance, g, a, f, this) : c.isArray(a) && (e = 1 == a.length ? d(this._jsPlumb.instance, g, a[0], f, this) : d(this._jsPlumb.instance, g, a[0], c.merge(a[1], f), this)), null != b && (e.typeId = b), e
        }, setPreparedConnector: function (a, b, c, d) {
            var e, f = "";
            if (null != this.connector && (e = this.connector, f = e.getClass(), this.connector.cleanup(), this.connector.destroy()), this.connector = a, d && this.cacheTypeItem("connector", a, d), this.canvas = this.connector.canvas, this.bgCanvas = this.connector.bgCanvas, this.addClass(f), this.canvas && (this.canvas._jsPlumb = this), this.bgCanvas && (this.bgCanvas._jsPlumb = this), null != e)for (var g = this.getOverlays(), h = 0; h < g.length; h++)g[h].transfer && g[h].transfer(this.connector);
            c || this.setListenerComponent(this.connector), b || this.repaint()
        }, setConnector: function (a, b, c, d) {
            var e = this.prepareConnector(a, d);
            this.setPreparedConnector(e, b, c, d)
        }, paint: function (a) {
            if (!this._jsPlumb.instance.isSuspendDrawing() && this._jsPlumb.visible) {
                a = a || {};
                var b = a.timestamp, c = !1, d = c ? this.sourceId : this.targetId, e = c ? this.targetId : this.sourceId, f = c ? 0 : 1, g = c ? 1 : 0;
                if (null == b || b != this._jsPlumb.lastPaintedAt) {
                    var h = this._jsPlumb.instance.updateOffset({elId: e}).o, i = this._jsPlumb.instance.updateOffset({elId: d}).o, j = this.endpoints[g], k = this.endpoints[f], l = j.anchor.getCurrentLocation({
                        xy: [h.left, h.top],
                        wh: [h.width, h.height],
                        element: j,
                        timestamp: b
                    }), m = k.anchor.getCurrentLocation({
                        xy: [i.left, i.top],
                        wh: [i.width, i.height],
                        element: k,
                        timestamp: b
                    });
                    this.connector.resetBounds(), this.connector.compute({
                        sourcePos: l,
                        targetPos: m,
                        sourceEndpoint: this.endpoints[g],
                        targetEndpoint: this.endpoints[f],
                        lineWidth: this._jsPlumb.paintStyleInUse.lineWidth,
                        sourceInfo: h,
                        targetInfo: i
                    });
                    var n = {
                        minX: 1 / 0,
                        minY: 1 / 0,
                        maxX: -1 / 0,
                        maxY: -1 / 0
                    };
                    for (var o in this._jsPlumb.overlays)if (this._jsPlumb.overlays.hasOwnProperty(o)) {
                        var p = this._jsPlumb.overlays[o];
                        p.isVisible() && (this._jsPlumb.overlayPlacements[o] = p.draw(this.connector, this._jsPlumb.paintStyleInUse, this.getAbsoluteOverlayPosition(p)), n.minX = Math.min(n.minX, this._jsPlumb.overlayPlacements[o].minX), n.maxX = Math.max(n.maxX, this._jsPlumb.overlayPlacements[o].maxX), n.minY = Math.min(n.minY, this._jsPlumb.overlayPlacements[o].minY), n.maxY = Math.max(n.maxY, this._jsPlumb.overlayPlacements[o].maxY))
                    }
                    var q = parseFloat(this._jsPlumb.paintStyleInUse.lineWidth || 1) / 2, r = parseFloat(this._jsPlumb.paintStyleInUse.lineWidth || 0), s = {
                        xmin: Math.min(this.connector.bounds.minX - (q + r), n.minX),
                        ymin: Math.min(this.connector.bounds.minY - (q + r), n.minY),
                        xmax: Math.max(this.connector.bounds.maxX + (q + r), n.maxX),
                        ymax: Math.max(this.connector.bounds.maxY + (q + r), n.maxY)
                    };
                    this.connector.paint(this._jsPlumb.paintStyleInUse, null, s);
                    for (var t in this._jsPlumb.overlays)if (this._jsPlumb.overlays.hasOwnProperty(t)) {
                        var u = this._jsPlumb.overlays[t];
                        u.isVisible() && u.paint(this._jsPlumb.overlayPlacements[t], s)
                    }
                }
                this._jsPlumb.lastPaintedAt = b
            }
        }, repaint: function (a) {
            a = a || {}, this.paint({
                elId: this.sourceId,
                recalc: !(a.recalc === !1),
                timestamp: a.timestamp
            })
        }, prepareEndpoint: function (a, c, d, f, g, h, i, j) {
            var k;
            if (f)d.endpoints[g] = f, f.addConnection(d); else {
                h.endpoints || (h.endpoints = [null, null]);
                var l = h.endpoints[g] || h.endpoint || a.Defaults.Endpoints[g] || jsPlumb.Defaults.Endpoints[g] || a.Defaults.Endpoint || jsPlumb.Defaults.Endpoint;
                h.endpointStyles || (h.endpointStyles = [null, null]), h.endpointHoverStyles || (h.endpointHoverStyles = [null, null]);
                var m = h.endpointStyles[g] || h.endpointStyle || a.Defaults.EndpointStyles[g] || jsPlumb.Defaults.EndpointStyles[g] || a.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle;
                null == m.fillStyle && null != h.paintStyle && (m.fillStyle = h.paintStyle.strokeStyle), null == m.outlineColor && null != h.paintStyle && (m.outlineColor = h.paintStyle.outlineColor), null == m.outlineWidth && null != h.paintStyle && (m.outlineWidth = h.paintStyle.outlineWidth);
                var n = h.endpointHoverStyles[g] || h.endpointHoverStyle || a.Defaults.EndpointHoverStyles[g] || jsPlumb.Defaults.EndpointHoverStyles[g] || a.Defaults.EndpointHoverStyle || jsPlumb.Defaults.EndpointHoverStyle;
                null != h.hoverPaintStyle && (null == n && (n = {}), null == n.fillStyle && (n.fillStyle = h.hoverPaintStyle.strokeStyle));
                var o = h.anchors ? h.anchors[g] : h.anchor ? h.anchor : e(a.Defaults.Anchors[g], j, a) || e(b.Defaults.Anchors[g], j, a) || e(a.Defaults.Anchor, j, a) || e(b.Defaults.Anchor, j, a), p = h.uuids ? h.uuids[g] : null;
                k = c({
                    paintStyle: m,
                    hoverPaintStyle: n,
                    endpoint: l,
                    connections: [d],
                    uuid: p,
                    anchor: o,
                    source: i,
                    scope: h.scope,
                    reattach: h.reattach || a.Defaults.ReattachConnections,
                    detachable: h.detachable || a.Defaults.ConnectionsDetachable
                }), d.endpoints[g] = k, h.drawEndpoints === !1 && k.setVisible(!1, !0, !0)
            }
            return k
        }
    })
}.call(this), function () {
    "use strict";
    var a = this, b = a.jsPlumbUtil, c = a.jsPlumb;
    c.AnchorManager = function (a) {
        var d = {}, e = {}, f = {}, g = {}, h = {
            HORIZONTAL: "horizontal",
            VERTICAL: "vertical",
            DIAGONAL: "diagonal",
            IDENTITY: "identity"
        }, i = ["left", "top", "right", "bottom"], j = {}, k = this, l = {}, m = a.jsPlumbInstance, n = {}, o = function (a, b, c, d, e, f) {
            if (a === b)return {orientation: h.IDENTITY, a: ["top", "top"]};
            var g = Math.atan2(d.centery - c.centery, d.centerx - c.centerx), j = Math.atan2(c.centery - d.centery, c.centerx - d.centerx), k = [], l = {};
            !function (a, b) {
                for (var c = 0; c < a.length; c++)l[a[c]] = {
                    left: [b[c].left, b[c].centery],
                    right: [b[c].right, b[c].centery],
                    top: [b[c].centerx, b[c].top],
                    bottom: [b[c].centerx, b[c].bottom]
                }
            }(["source", "target"], [c, d]);
            for (var m = 0; m < i.length; m++)for (var n = 0; n < i.length; n++)m != n && k.push({
                source: i[m],
                target: i[n],
                dist: Biltong.lineLength(l.source[i[m]], l.target[i[n]])
            });
            k.sort(function (a, b) {
                return a.dist < b.dist ? -1 : a.dist > b.dist ? 1 : 0
            });
            for (var o = k[0].source, p = k[0].target, q = 0; q < k.length && (o = !e.isContinuous || e.isEdgeSupported(k[q].source) ? k[q].source : null, p = !f.isContinuous || f.isEdgeSupported(k[q].target) ? k[q].target : null, null == o || null == p); q++);
            return {a: [o, p], theta: g, theta2: j}
        }, p = function (a, b, c, d, e, f, g) {
            for (var h = [], i = b[e ? 0 : 1] / (d.length + 1), j = 0; j < d.length; j++) {
                var k = (j + 1) * i, l = f * b[e ? 1 : 0];
                g && (k = b[e ? 0 : 1] - k);
                var m = e ? k : l, n = c[0] + m, o = m / b[0], p = e ? l : k, q = c[1] + p, r = p / b[1];
                h.push([n, q, o, r, d[j][1], d[j][2]])
            }
            return h
        }, q = function (a) {
            return function (b, c) {
                var d = !0;
                return d = a ? b[0][0] < c[0][0] : b[0][0] > c[0][0], d === !1 ? -1 : 1
            }
        }, r = function (a, b) {
            var c = a[0][0] < 0 ? -Math.PI - a[0][0] : Math.PI - a[0][0], d = b[0][0] < 0 ? -Math.PI - b[0][0] : Math.PI - b[0][0];
            return c > d ? 1 : a[0][1] > b[0][1] ? 1 : -1
        }, s = {
            top: function (a, b) {
                return a[0] > b[0] ? 1 : -1
            }, right: q(!0), bottom: q(!0), left: r
        }, t = function (a, b) {
            return a.sort(b)
        }, u = function (a, b) {
            var c = m.getCachedData(a), d = c.s, f = c.o, h = function (b, c, d, f, h, i, j) {
                if (f.length > 0)for (var k = t(f, s[b]), l = "right" === b || "top" === b, m = p(b, c, d, k, h, i, l), n = function (a, b) {
                    e[a.id] = [b[0], b[1], b[2], b[3]], g[a.id] = j
                }, o = 0; o < m.length; o++) {
                    var q = m[o][4], r = q.endpoints[0].elementId === a, u = q.endpoints[1].elementId === a;
                    r ? n(q.endpoints[0], m[o]) : u && n(q.endpoints[1], m[o])
                }
            };
            h("bottom", d, [f.left, f.top], b.bottom, !0, 1, [0, 1]), h("top", d, [f.left, f.top], b.top, !0, 0, [0, -1]), h("left", d, [f.left, f.top], b.left, !1, 0, [-1, 0]), h("right", d, [f.left, f.top], b.right, !1, 1, [1, 0])
        };
        this.reset = function () {
            d = {}, j = {}, l = {}
        }, this.addFloatingConnection = function (a, b) {
            n[a] = b
        }, this.removeFloatingConnection = function (a) {
            delete n[a]
        }, this.newConnection = function (a) {
            var d = a.sourceId, e = a.targetId, f = a.endpoints, g = !0, h = function (h, i, k, l, m) {
                d == e && k.isContinuous && (a._jsPlumb.instance.removeElement(f[1].canvas), g = !1), b.addToList(j, l, [m, i, k.constructor == c.DynamicAnchor])
            };
            h(0, f[0], f[0].anchor, e, a), g && h(1, f[1], f[1].anchor, d, a)
        };
        var v = function (a) {
            !function (a, c) {
                if (a) {
                    var d = function (a) {
                        return a[4] == c
                    };
                    b.removeWithFunction(a.top, d), b.removeWithFunction(a.left, d), b.removeWithFunction(a.bottom, d), b.removeWithFunction(a.right, d)
                }
            }(l[a.elementId], a.id)
        };
        this.connectionDetached = function (a, c) {
            var d = a.connection || a, e = a.sourceId, f = a.targetId, g = d.endpoints, h = function (a, c, d, e, f) {
                b.removeWithFunction(j[e], function (a) {
                    return a[0].id == f.id
                })
            };
            h(1, g[1], g[1].anchor, e, d), h(0, g[0], g[0].anchor, f, d), d.floatingId && (h(d.floatingIndex, d.floatingEndpoint, d.floatingEndpoint.anchor, d.floatingId, d), v(d.floatingEndpoint)), v(d.endpoints[0]), v(d.endpoints[1]), c || (k.redraw(d.sourceId), d.targetId !== d.sourceId && k.redraw(d.targetId))
        }, this.add = function (a, c) {
            b.addToList(d, c, a)
        }, this.changeId = function (a, b) {
            j[b] = j[a], d[b] = d[a], delete j[a], delete d[a]
        }, this.getConnectionsFor = function (a) {
            return j[a] || []
        }, this.getEndpointsFor = function (a) {
            return d[a] || []
        }, this.deleteEndpoint = function (a) {
            b.removeWithFunction(d[a.elementId], function (b) {
                return b.id == a.id
            }), v(a)
        }, this.clearFor = function (a) {
            delete d[a], d[a] = []
        };
        var w = function (c, d, e, f, g, h, i, j, k, l, m, n) {
            var o, p, q = -1, r = -1, s = f.endpoints[i], t = s.id, u = [1, 0][i], v = [[d, e], f, g, h, t], w = c[k], x = s._continuousAnchorEdge ? c[s._continuousAnchorEdge] : null;
            if (x) {
                var y = b.findWithFunction(x, function (a) {
                    return a[4] == t
                });
                if (-1 != y)for (x.splice(y, 1), o = 0; o < x.length; o++)p = x[o][1], b.addWithFunction(m, p, function (a) {
                    return a.id == p.id
                }), b.addWithFunction(n, x[o][1].endpoints[i], function (a) {
                    return a.id == p.endpoints[i].id
                }), b.addWithFunction(n, x[o][1].endpoints[u], function (a) {
                    return a.id == p.endpoints[u].id
                })
            }
            for (o = 0; o < w.length; o++)p = w[o][1], 1 == a.idx && w[o][3] === h && -1 == r && (r = o), b.addWithFunction(m, p, function (a) {
                return a.id == p.id
            }), b.addWithFunction(n, w[o][1].endpoints[i], function (a) {
                return a.id == p.endpoints[i].id
            }), b.addWithFunction(n, w[o][1].endpoints[u], function (a) {
                return a.id == p.endpoints[u].id
            });
            if (-1 != q)w[q] = v; else {
                var z = j ? -1 != r ? r : 0 : w.length;
                w.splice(z, 0, v)
            }
            s._continuousAnchorEdge = k
        };
        this.updateOtherEndpoint = function (a, d, e, f) {
            var g = b.findWithFunction(j[a], function (a) {
                return a[0].id === f.id
            }), h = b.findWithFunction(j[d], function (a) {
                return a[0].id === f.id
            });
            -1 != g && (j[a][g][0] = f, j[a][g][1] = f.endpoints[1], j[a][g][2] = f.endpoints[1].anchor.constructor == c.DynamicAnchor), h > -1 && (j[d].splice(h, 1), b.addToList(j, e, [f, f.endpoints[0], f.endpoints[0].anchor.constructor == c.DynamicAnchor])), f.updateConnectedClass()
        }, this.sourceChanged = function (a, d, e) {
            if (a !== d) {
                b.removeWithFunction(j[a], function (a) {
                    return a[0].id === e.id
                });
                var f = b.findWithFunction(j[e.targetId], function (a) {
                    return a[0].id === e.id
                });
                f > -1 && (j[e.targetId][f][0] = e, j[e.targetId][f][1] = e.endpoints[0], j[e.targetId][f][2] = e.endpoints[0].anchor.constructor == c.DynamicAnchor), b.addToList(j, d, [e, e.endpoints[1], e.endpoints[1].anchor.constructor == c.DynamicAnchor]), e.endpoints[1].anchor.isContinuous && (e.source === e.target ? e._jsPlumb.instance.removeElement(e.endpoints[1].canvas) : null == e.endpoints[1].canvas.parentNode && e._jsPlumb.instance.appendElement(e.endpoints[1].canvas)), e.updateConnectedClass()
            }
        }, this.rehomeEndpoint = function (a, b, c) {
            var e = d[b] || [], f = m.getId(c);
            if (f !== b) {
                var g = e.indexOf(a);
                if (g > -1) {
                    var h = e.splice(g, 1)[0];
                    k.add(h, f)
                }
            }
            for (var i = 0; i < a.connections.length; i++)a.connections[i].sourceId == b ? (a.connections[i].sourceId = a.elementId, a.connections[i].source = a.element, k.sourceChanged(b, a.elementId, a.connections[i])) : a.connections[i].targetId == b && (a.connections[i].targetId = a.elementId, a.connections[i].target = a.element, k.updateOtherEndpoint(a.connections[i].sourceId, b, a.elementId, a.connections[i]))
        }, this.redraw = function (a, e, f, g, h, i) {
            if (!m.isSuspendDrawing()) {
                var k = d[a] || [], p = j[a] || [], q = [], r = [], s = [];
                f = f || m.timestamp(), g = g || {
                        left: 0,
                        top: 0
                    }, e && (e = {left: e.left + g.left, top: e.top + g.top});
                for (var t = m.updateOffset({
                    elId: a,
                    offset: e,
                    recalc: !1,
                    timestamp: f
                }), v = {}, x = 0; x < p.length; x++) {
                    var y = p[x][0], z = y.sourceId, A = y.targetId, B = y.endpoints[0].anchor.isContinuous, C = y.endpoints[1].anchor.isContinuous;
                    if (B || C) {
                        var D = z + "_" + A, E = v[D], F = y.sourceId == a ? 1 : 0;
                        B && !l[z] && (l[z] = {
                            top: [],
                            right: [],
                            bottom: [],
                            left: []
                        }), C && !l[A] && (l[A] = {
                            top: [],
                            right: [],
                            bottom: [],
                            left: []
                        }), a != A && m.updateOffset({
                            elId: A,
                            timestamp: f
                        }), a != z && m.updateOffset({elId: z, timestamp: f});
                        var G = m.getCachedData(A), H = m.getCachedData(z);
                        A == z && (B || C) ? w(l[z], -Math.PI / 2, 0, y, !1, A, 0, !1, "top", z, q, r) : (E || (E = o(z, A, H.o, G.o, y.endpoints[0].anchor, y.endpoints[1].anchor), v[D] = E), B && w(l[z], E.theta, 0, y, !1, A, 0, !1, E.a[0], z, q, r), C && w(l[A], E.theta2, -1, y, !0, z, 1, !0, E.a[1], A, q, r)), B && b.addWithFunction(s, z, function (a) {
                            return a === z
                        }), C && b.addWithFunction(s, A, function (a) {
                            return a === A
                        }), b.addWithFunction(q, y, function (a) {
                            return a.id == y.id
                        }), (B && 0 === F || C && 1 === F) && b.addWithFunction(r, y.endpoints[F], function (a) {
                            return a.id == y.endpoints[F].id
                        })
                    }
                }
                for (x = 0; x < k.length; x++)0 === k[x].connections.length && k[x].anchor.isContinuous && (l[a] || (l[a] = {
                    top: [],
                    right: [],
                    bottom: [],
                    left: []
                }), w(l[a], -Math.PI / 2, 0, {
                    endpoints: [k[x], k[x]],
                    paint: function () {
                    }
                }, !1, a, 0, !1, k[x].anchor.getDefaultFace(), a, q, r), b.addWithFunction(s, a, function (b) {
                    return b === a
                }));
                for (x = 0; x < s.length; x++)u(s[x], l[s[x]]);
                for (x = 0; x < k.length; x++)k[x].paint({
                    timestamp: f,
                    offset: t,
                    dimensions: t.s,
                    recalc: i !== !0
                });
                for (x = 0; x < r.length; x++) {
                    var I = m.getCachedData(r[x].elementId);
                    r[x].paint({timestamp: f, offset: I, dimensions: I.s})
                }
                for (x = 0; x < p.length; x++) {
                    var J = p[x][1];
                    if (J.anchor.constructor == c.DynamicAnchor) {
                        J.paint({
                            elementWithPrecedence: a,
                            timestamp: f
                        }), b.addWithFunction(q, p[x][0], function (a) {
                            return a.id == p[x][0].id
                        });
                        for (var K = 0; K < J.connections.length; K++)J.connections[K] !== p[x][0] && b.addWithFunction(q, J.connections[K], function (a) {
                            return a.id == J.connections[K].id
                        })
                    } else J.anchor.constructor == c.Anchor && b.addWithFunction(q, p[x][0], function (a) {
                        return a.id == p[x][0].id
                    })
                }
                var L = n[a];
                for (L && L.paint({
                    timestamp: f,
                    recalc: !1,
                    elId: a
                }), x = 0; x < q.length; x++)q[x].paint({
                    elId: a,
                    timestamp: f,
                    recalc: !1,
                    clearEdits: h
                })
            }
        };
        var x = function (a) {
            b.EventGenerator.apply(this), this.type = "Continuous", this.isDynamic = !0, this.isContinuous = !0;
            for (var c = a.faces || ["top", "right", "bottom", "left"], d = !(a.clockwise === !1), h = {}, i = {
                top: "bottom",
                right: "left",
                left: "right",
                bottom: "top"
            }, j = {
                top: "right",
                right: "bottom",
                left: "top",
                bottom: "left"
            }, k = {
                top: "left",
                right: "top",
                left: "bottom",
                bottom: "right"
            }, l = d ? j : k, m = d ? k : j, n = a.cssClass || "", o = 0; o < c.length; o++)h[c[o]] = !0;
            this.getDefaultFace = function () {
                return 0 === c.length ? "top" : c[0]
            }, this.verifyEdge = function (a) {
                return h[a] ? a : h[i[a]] ? i[a] : h[l[a]] ? l[a] : h[m[a]] ? m[a] : a
            }, this.isEdgeSupported = function (a) {
                return h[a] === !0
            }, this.compute = function (a) {
                return f[a.element.id] || e[a.element.id] || [0, 0]
            }, this.getCurrentLocation = function (a) {
                return f[a.element.id] || e[a.element.id] || [0, 0]
            }, this.getOrientation = function (a) {
                return g[a.id] || [0, 0]
            }, this.clearUserDefinedLocation = function () {
                delete f[a.elementId]
            }, this.setUserDefinedLocation = function (b) {
                f[a.elementId] = b
            }, this.getCssClass = function () {
                return n
            }
        };
        m.continuousAnchorFactory = {
            get: function (a) {
                return new x(a)
            }, clear: function (a) {
                delete f[a], delete e[a]
            }
        }
    }, c.Anchor = function (a) {
        this.x = a.x || 0, this.y = a.y || 0, this.elementId = a.elementId, this.cssClass = a.cssClass || "", this.userDefinedLocation = null, this.orientation = a.orientation || [0, 0], this.lastReturnValue = null, this.offsets = a.offsets || [0, 0], this.timestamp = null, b.EventGenerator.apply(this), this.compute = function (a) {
            var b = a.xy, c = a.wh, d = a.timestamp;
            return a.clearUserDefinedLocation && (this.userDefinedLocation = null), d && d === self.timestamp ? this.lastReturnValue : (this.lastReturnValue = null != this.userDefinedLocation ? this.userDefinedLocation : [b[0] + this.x * c[0] + this.offsets[0], b[1] + this.y * c[1] + this.offsets[1]], this.timestamp = d, this.lastReturnValue)
        }, this.getCurrentLocation = function (a) {
            return a = a || {}, null == this.lastReturnValue || null != a.timestamp && this.timestamp != a.timestamp ? this.compute(a) : this.lastReturnValue
        }
    }, b.extend(c.Anchor, b.EventGenerator, {
        equals: function (a) {
            if (!a)return !1;
            var b = a.getOrientation(), c = this.getOrientation();
            return this.x == a.x && this.y == a.y && this.offsets[0] == a.offsets[0] && this.offsets[1] == a.offsets[1] && c[0] == b[0] && c[1] == b[1]
        }, getUserDefinedLocation: function () {
            return this.userDefinedLocation
        }, setUserDefinedLocation: function (a) {
            this.userDefinedLocation = a
        }, clearUserDefinedLocation: function () {
            this.userDefinedLocation = null
        }, getOrientation: function () {
            return this.orientation
        }, getCssClass: function () {
            return this.cssClass
        }
    }), c.FloatingAnchor = function (a) {
        c.Anchor.apply(this, arguments);
        var b = a.reference, d = a.referenceCanvas, e = c.getSize(d), f = 0, g = 0, h = null, i = null;
        this.orientation = null, this.x = 0, this.y = 0, this.isFloating = !0, this.compute = function (a) {
            var b = a.xy, c = [b[0] + e[0] / 2, b[1] + e[1] / 2];
            return i = c, c
        }, this.getOrientation = function (a) {
            if (h)return h;
            var c = b.getOrientation(a);
            return [-1 * Math.abs(c[0]) * f, -1 * Math.abs(c[1]) * g]
        }, this.over = function (a, b) {
            h = a.getOrientation(b)
        }, this.out = function () {
            h = null
        }, this.getCurrentLocation = function (a) {
            return null == i ? this.compute(a) : i
        }
    }, b.extend(c.FloatingAnchor, c.Anchor);
    var d = function (a, b, d) {
        return a.constructor == c.Anchor ? a : b.makeAnchor(a, d, b)
    };
    c.DynamicAnchor = function (a) {
        c.Anchor.apply(this, arguments), this.isDynamic = !0, this.anchors = [], this.elementId = a.elementId, this.jsPlumbInstance = a.jsPlumbInstance;
        for (var b = 0; b < a.anchors.length; b++)this.anchors[b] = d(a.anchors[b], this.jsPlumbInstance, this.elementId);
        this.getAnchors = function () {
            return this.anchors
        }, this.locked = !1;
        var e = this.anchors.length > 0 ? this.anchors[0] : null, f = e, g = this, h = function (a, b, c, d, e) {
            var f = d[0] + a.x * e[0], g = d[1] + a.y * e[1], h = d[0] + e[0] / 2, i = d[1] + e[1] / 2;
            return Math.sqrt(Math.pow(b - f, 2) + Math.pow(c - g, 2)) + Math.sqrt(Math.pow(h - f, 2) + Math.pow(i - g, 2))
        }, i = a.selector || function (a, b, c, d, e) {
                for (var f = c[0] + d[0] / 2, g = c[1] + d[1] / 2, i = -1, j = 1 / 0, k = 0; k < e.length; k++) {
                    var l = h(e[k], f, g, a, b);
                    j > l && (i = k + 0, j = l)
                }
                return e[i]
            };
        this.compute = function (a) {
            var b = a.xy, c = a.wh, d = a.txy, h = a.twh;
            this.timestamp = a.timestamp;
            var j = g.getUserDefinedLocation();
            return null != j ? j : this.locked || null == d || null == h ? e.compute(a) : (a.timestamp = null, e = i(b, c, d, h, this.anchors), this.x = e.x, this.y = e.y, e != f && this.fire("anchorChanged", e), f = e, e.compute(a))
        }, this.getCurrentLocation = function (a) {
            return this.getUserDefinedLocation() || (null != e ? e.getCurrentLocation(a) : null)
        }, this.getOrientation = function (a) {
            return null != e ? e.getOrientation(a) : [0, 0]
        }, this.over = function (a, b) {
            null != e && e.over(a, b)
        }, this.out = function () {
            null != e && e.out()
        }, this.getCssClass = function () {
            return e && e.getCssClass() || ""
        }
    }, b.extend(c.DynamicAnchor, c.Anchor);
    var e = function (a, b, d, e, f, g) {
        c.Anchors[f] = function (c) {
            var h = c.jsPlumbInstance.makeAnchor([a, b, d, e, 0, 0], c.elementId, c.jsPlumbInstance);
            return h.type = f, g && g(h, c), h
        }
    };
    e(.5, 0, 0, -1, "TopCenter"), e(.5, 1, 0, 1, "BottomCenter"), e(0, .5, -1, 0, "LeftMiddle"), e(1, .5, 1, 0, "RightMiddle"), e(.5, 0, 0, -1, "Top"), e(.5, 1, 0, 1, "Bottom"), e(0, .5, -1, 0, "Left"), e(1, .5, 1, 0, "Right"), e(.5, .5, 0, 0, "Center"), e(1, 0, 0, -1, "TopRight"), e(1, 1, 0, 1, "BottomRight"), e(0, 0, 0, -1, "TopLeft"), e(0, 1, 0, 1, "BottomLeft"), c.Defaults.DynamicAnchors = function (a) {
        return a.jsPlumbInstance.makeAnchors(["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"], a.elementId, a.jsPlumbInstance)
    }, c.Anchors.AutoDefault = function (a) {
        var b = a.jsPlumbInstance.makeDynamicAnchor(c.Defaults.DynamicAnchors(a));
        return b.type = "AutoDefault", b
    };
    var f = function (a, b) {
        c.Anchors[a] = function (c) {
            var d = c.jsPlumbInstance.makeAnchor(["Continuous", {faces: b}], c.elementId, c.jsPlumbInstance);
            return d.type = a, d
        }
    };
    c.Anchors.Continuous = function (a) {
        return a.jsPlumbInstance.continuousAnchorFactory.get(a)
    }, f("ContinuousLeft", ["left"]), f("ContinuousTop", ["top"]), f("ContinuousBottom", ["bottom"]), f("ContinuousRight", ["right"]), e(0, 0, 0, 0, "Assign", function (a, b) {
        var c = b.position || "Fixed";
        a.positionFinder = c.constructor == String ? b.jsPlumbInstance.AnchorPositionFinders[c] : c, a.constructorParams = b
    }), jsPlumbInstance.prototype.AnchorPositionFinders = {
        Fixed: function (a, b, c) {
            return [(a.left - b.left) / c[0], (a.top - b.top) / c[1]]
        }, Grid: function (a, b, c, d) {
            var e = a.left - b.left, f = a.top - b.top, g = c[0] / d.grid[0], h = c[1] / d.grid[1], i = Math.floor(e / g), j = Math.floor(f / h);
            return [(i * g + g / 2) / c[0], (j * h + h / 2) / c[1]]
        }
    }, c.Anchors.Perimeter = function (a) {
        a = a || {};
        var b = a.anchorCount || 60, c = a.shape;
        if (!c)throw new Error("no shape supplied to Perimeter Anchor type");
        var d = function () {
            for (var a = .5, c = 2 * Math.PI / b, d = 0, e = [], f = 0; b > f; f++) {
                var g = a + a * Math.sin(d), h = a + a * Math.cos(d);
                e.push([g, h, 0, 0]), d += c
            }
            return e
        }, e = function (a) {
            for (var c = b / a.length, d = [], e = function (a, e, f, g, h) {
                c = b * h;
                for (var i = (f - a) / c, j = (g - e) / c, k = 0; c > k; k++)d.push([a + i * k, e + j * k, 0, 0])
            }, f = 0; f < a.length; f++)e.apply(null, a[f]);
            return d
        }, f = function (a) {
            for (var b = [], c = 0; c < a.length; c++)b.push([a[c][0], a[c][1], a[c][2], a[c][3], 1 / a.length]);
            return e(b)
        }, g = function () {
            return f([[0, 0, 1, 0], [1, 0, 1, 1], [1, 1, 0, 1], [0, 1, 0, 0]])
        }, h = {
            Circle: d, Ellipse: d, Diamond: function () {
                return f([[.5, 0, 1, .5], [1, .5, .5, 1], [.5, 1, 0, .5], [0, .5, .5, 0]])
            }, Rectangle: g, Square: g, Triangle: function () {
                return f([[.5, 0, 1, 1], [1, 1, 0, 1], [0, 1, .5, 0]])
            }, Path: function (a) {
                for (var b = a.points, c = [], d = 0, f = 0; f < b.length - 1; f++) {
                    var g = Math.sqrt(Math.pow(b[f][2] - b[f][0]) + Math.pow(b[f][3] - b[f][1]));
                    d += g, c.push([b[f][0], b[f][1], b[f + 1][0], b[f + 1][1], g])
                }
                for (var h = 0; h < c.length; h++)c[h][4] = c[h][4] / d;
                return e(c)
            }
        }, i = function (a, b) {
            for (var c = [], d = b / 180 * Math.PI, e = 0; e < a.length; e++) {
                var f = a[e][0] - .5, g = a[e][1] - .5;
                c.push([.5 + (f * Math.cos(d) - g * Math.sin(d)), .5 + (f * Math.sin(d) + g * Math.cos(d)), a[e][2], a[e][3]])
            }
            return c
        };
        if (!h[c])throw new Error("Shape [" + c + "] is unknown by Perimeter Anchor type");
        var j = h[c](a);
        a.rotation && (j = i(j, a.rotation));
        var k = a.jsPlumbInstance.makeDynamicAnchor(j);
        return k.type = "Perimeter", k
    }
}.call(this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil, d = a.Biltong;
    b.Segments = {
        AbstractSegment: function (a) {
            this.params = a, this.findClosestPointOnPath = function () {
                return {d: 1 / 0, x: null, y: null, l: null}
            }, this.getBounds = function () {
                return {
                    minX: Math.min(a.x1, a.x2),
                    minY: Math.min(a.y1, a.y2),
                    maxX: Math.max(a.x1, a.x2),
                    maxY: Math.max(a.y1, a.y2)
                }
            }
        }, Straight: function (a) {
            var c, e, f, g, h, i, j, k = (b.Segments.AbstractSegment.apply(this, arguments), function () {
                c = Math.sqrt(Math.pow(h - g, 2) + Math.pow(j - i, 2)), e = d.gradient({
                    x: g,
                    y: i
                }, {x: h, y: j}), f = -1 / e
            });
            this.type = "Straight", this.getLength = function () {
                return c
            }, this.getGradient = function () {
                return e
            }, this.getCoordinates = function () {
                return {x1: g, y1: i, x2: h, y2: j}
            }, this.setCoordinates = function (a) {
                g = a.x1, i = a.y1, h = a.x2, j = a.y2, k()
            }, this.setCoordinates({
                x1: a.x1,
                y1: a.y1,
                x2: a.x2,
                y2: a.y2
            }), this.getBounds = function () {
                return {
                    minX: Math.min(g, h),
                    minY: Math.min(i, j),
                    maxX: Math.max(g, h),
                    maxY: Math.max(i, j)
                }
            }, this.pointOnPath = function (a, b) {
                if (0 !== a || b) {
                    if (1 != a || b) {
                        var e = b ? a > 0 ? a : c + a : a * c;
                        return d.pointOnLine({x: g, y: i}, {x: h, y: j}, e)
                    }
                    return {x: h, y: j}
                }
                return {x: g, y: i}
            }, this.gradientAtPoint = function () {
                return e
            }, this.pointAlongPathFrom = function (a, b, c) {
                var e = this.pointOnPath(a, c), f = 0 >= b ? {x: g, y: i} : {
                    x: h,
                    y: j
                };
                return 0 >= b && Math.abs(b) > 1 && (b *= -1), d.pointOnLine(e, f, b)
            };
            var l = function (a, b, c) {
                return c >= Math.min(a, b) && c <= Math.max(a, b)
            }, m = function (a, b, c) {
                return Math.abs(c - a) < Math.abs(c - b) ? a : b
            };
            this.findClosestPointOnPath = function (a, b) {
                var k = {
                    d: 1 / 0,
                    x: null,
                    y: null,
                    l: null,
                    x1: g,
                    x2: h,
                    y1: i,
                    y2: j
                };
                if (0 === e)k.y = i, k.x = l(g, h, a) ? a : m(g, h, a); else if (1 / 0 == e || e == -1 / 0)k.x = g, k.y = l(i, j, b) ? b : m(i, j, b); else {
                    var n = i - e * g, o = b - f * a, p = (o - n) / (e - f), q = e * p + n;
                    k.x = l(g, h, p) ? p : m(g, h, p), k.y = l(i, j, q) ? q : m(i, j, q)
                }
                var r = d.lineLength([k.x, k.y], [g, i]);
                return k.d = d.lineLength([a, b], [k.x, k.y]), k.l = r / c, k
            }
        }, Arc: function (a) {
            var c = (b.Segments.AbstractSegment.apply(this, arguments), function (b, c) {
                return d.theta([a.cx, a.cy], [b, c])
            }), e = function (a, b) {
                if (a.anticlockwise) {
                    var c = a.startAngle < a.endAngle ? a.startAngle + f : a.startAngle, d = Math.abs(c - a.endAngle);
                    return c - d * b
                }
                var e = a.endAngle < a.startAngle ? a.endAngle + f : a.endAngle, g = Math.abs(e - a.startAngle);
                return a.startAngle + g * b
            }, f = 2 * Math.PI;
            this.radius = a.r, this.anticlockwise = a.ac, this.type = "Arc", a.startAngle && a.endAngle ? (this.startAngle = a.startAngle, this.endAngle = a.endAngle, this.x1 = a.cx + this.radius * Math.cos(a.startAngle), this.y1 = a.cy + this.radius * Math.sin(a.startAngle), this.x2 = a.cx + this.radius * Math.cos(a.endAngle), this.y2 = a.cy + this.radius * Math.sin(a.endAngle)) : (this.startAngle = c(a.x1, a.y1), this.endAngle = c(a.x2, a.y2), this.x1 = a.x1, this.y1 = a.y1, this.x2 = a.x2, this.y2 = a.y2), this.endAngle < 0 && (this.endAngle += f), this.startAngle < 0 && (this.startAngle += f);
            var g = this.endAngle < this.startAngle ? this.endAngle + f : this.endAngle;
            this.sweep = Math.abs(g - this.startAngle), this.anticlockwise && (this.sweep = f - this.sweep);
            var h = 2 * Math.PI * this.radius, i = this.sweep / f, j = h * i;
            this.getLength = function () {
                return j
            }, this.getBounds = function () {
                return {
                    minX: a.cx - a.r,
                    maxX: a.cx + a.r,
                    minY: a.cy - a.r,
                    maxY: a.cy + a.r
                }
            };
            var k = 1e-10, l = function (a) {
                var b = Math.floor(a), c = Math.ceil(a);
                return k > a - b ? b : k > c - a ? c : a
            };
            this.pointOnPath = function (b, c) {
                if (0 === b)return {
                    x: this.x1,
                    y: this.y1,
                    theta: this.startAngle
                };
                if (1 == b)return {
                    x: this.x2,
                    y: this.y2,
                    theta: this.endAngle
                };
                c && (b /= j);
                var d = e(this, b), f = a.cx + a.r * Math.cos(d), g = a.cy + a.r * Math.sin(d);
                return {x: l(f), y: l(g), theta: d}
            }, this.gradientAtPoint = function (b, c) {
                var e = this.pointOnPath(b, c), f = d.normal([a.cx, a.cy], [e.x, e.y]);
                return this.anticlockwise || 1 / 0 != f && f != -1 / 0 || (f *= -1), f
            }, this.pointAlongPathFrom = function (b, c, d) {
                var e = this.pointOnPath(b, d), f = 2 * (c / h) * Math.PI, g = this.anticlockwise ? -1 : 1, i = e.theta + g * f, j = a.cx + this.radius * Math.cos(i), k = a.cy + this.radius * Math.sin(i);
                return {x: j, y: k}
            }
        }, Bezier: function (c) {
            this.curve = [{x: c.x1, y: c.y1}, {x: c.cp1x, y: c.cp1y}, {
                x: c.cp2x,
                y: c.cp2y
            }, {
                x: c.x2,
                y: c.y2
            }], b.Segments.AbstractSegment.apply(this, arguments), this.bounds = {
                minX: Math.min(c.x1, c.x2, c.cp1x, c.cp2x),
                minY: Math.min(c.y1, c.y2, c.cp1y, c.cp2y),
                maxX: Math.max(c.x1, c.x2, c.cp1x, c.cp2x),
                maxY: Math.max(c.y1, c.y2, c.cp1y, c.cp2y)
            }, this.type = "Bezier";
            var d = function (b, c, d) {
                return d && (c = a.jsBezier.locationAlongCurveFrom(b, c > 0 ? 0 : 1, c)), c
            };
            this.pointOnPath = function (b, c) {
                return b = d(this.curve, b, c), a.jsBezier.pointOnCurve(this.curve, b)
            }, this.gradientAtPoint = function (b, c) {
                return b = d(this.curve, b, c), a.jsBezier.gradientAtPoint(this.curve, b)
            }, this.pointAlongPathFrom = function (b, c, e) {
                return b = d(this.curve, b, e), a.jsBezier.pointAlongCurveFrom(this.curve, b, c)
            }, this.getLength = function () {
                return a.jsBezier.getLength(this.curve)
            }, this.getBounds = function () {
                return this.bounds
            }
        }
    };
    var e = function () {
        this.resetBounds = function () {
            this.bounds = {minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0}
        }, this.resetBounds()
    };
    b.Connectors.AbstractConnector = function (a) {
        e.apply(this, arguments);
        var f = [], g = 0, h = [], i = [], j = a.stub || 0, k = c.isArray(j) ? j[0] : j, l = c.isArray(j) ? j[1] : j, m = a.gap || 0, n = c.isArray(m) ? m[0] : m, o = c.isArray(m) ? m[1] : m, p = null, q = !1, r = null;
        this.getPath = function () {
        }, this.setPath = function () {
        }, this.findSegmentForPoint = function (a, b) {
            for (var c = {
                d: 1 / 0,
                s: null,
                x: null,
                y: null,
                l: null
            }, d = 0; d < f.length; d++) {
                var e = f[d].findClosestPointOnPath(a, b);
                e.d < c.d && (c.d = e.d, c.l = e.l, c.x = e.x, c.y = e.y, c.s = f[d], c.x1 = e.x1, c.x2 = e.x2, c.y1 = e.y1, c.y2 = e.y2, c.index = d)
            }
            return c
        };
        var s = function () {
            for (var a = 0, b = 0; b < f.length; b++) {
                var c = f[b].getLength();
                i[b] = c / g, h[b] = [a, a += c / g]
            }
        }, t = function (a, b) {
            b && (a = a > 0 ? a / g : (g + a) / g);
            for (var c = h.length - 1, d = 1, e = 0; e < h.length; e++)if (h[e][1] >= a) {
                c = e, d = 1 == a ? 1 : 0 === a ? 0 : (a - h[e][0]) / i[e];
                break
            }
            return {segment: f[c], proportion: d, index: c}
        }, u = function (a, c, d) {
            if (d.x1 != d.x2 || d.y1 != d.y2) {
                var e = new b.Segments[c](d);
                f.push(e), g += e.getLength(), a.updateBounds(e)
            }
        }, v = function () {
            g = f.length = h.length = i.length = 0
        };
        this.setSegments = function (a) {
            p = [], g = 0;
            for (var b = 0; b < a.length; b++)p.push(a[b]), g += a[b].getLength()
        }, this.getLength = function () {
            return g
        };
        var w = function (a) {
            this.lineWidth = a.lineWidth;
            var b = d.quadrant(a.sourcePos, a.targetPos), c = a.targetPos[0] < a.sourcePos[0], e = a.targetPos[1] < a.sourcePos[1], f = a.lineWidth || 1, g = a.sourceEndpoint.anchor.getOrientation(a.sourceEndpoint), h = a.targetEndpoint.anchor.getOrientation(a.targetEndpoint), i = c ? a.targetPos[0] : a.sourcePos[0], j = e ? a.targetPos[1] : a.sourcePos[1], m = Math.abs(a.targetPos[0] - a.sourcePos[0]), p = Math.abs(a.targetPos[1] - a.sourcePos[1]);
            if (0 === g[0] && 0 === g[1] || 0 === h[0] && 0 === h[1]) {
                var q = m > p ? 0 : 1, r = [1, 0][q];
                g = [], h = [], g[q] = a.sourcePos[q] > a.targetPos[q] ? -1 : 1, h[q] = a.sourcePos[q] > a.targetPos[q] ? 1 : -1, g[r] = 0, h[r] = 0
            }
            var s = c ? m + n * g[0] : n * g[0], t = e ? p + n * g[1] : n * g[1], u = c ? o * h[0] : m + o * h[0], v = e ? o * h[1] : p + o * h[1], w = g[0] * h[0] + g[1] * h[1], x = {
                sx: s,
                sy: t,
                tx: u,
                ty: v,
                lw: f,
                xSpan: Math.abs(u - s),
                ySpan: Math.abs(v - t),
                mx: (s + u) / 2,
                my: (t + v) / 2,
                so: g,
                to: h,
                x: i,
                y: j,
                w: m,
                h: p,
                segment: b,
                startStubX: s + g[0] * k,
                startStubY: t + g[1] * k,
                endStubX: u + h[0] * l,
                endStubY: v + h[1] * l,
                isXGreaterThanStubTimes2: Math.abs(s - u) > k + l,
                isYGreaterThanStubTimes2: Math.abs(t - v) > k + l,
                opposite: -1 == w,
                perpendicular: 0 === w,
                orthogonal: 1 == w,
                sourceAxis: 0 === g[0] ? "y" : "x",
                points: [i, j, m, p, s, t, u, v]
            };
            return x.anchorOrientation = x.opposite ? "opposite" : x.orthogonal ? "orthogonal" : "perpendicular", x
        };
        return this.getSegments = function () {
            return f
        }, this.updateBounds = function (a) {
            var b = a.getBounds();
            this.bounds.minX = Math.min(this.bounds.minX, b.minX), this.bounds.maxX = Math.max(this.bounds.maxX, b.maxX), this.bounds.minY = Math.min(this.bounds.minY, b.minY), this.bounds.maxY = Math.max(this.bounds.maxY, b.maxY)
        }, this.pointOnPath = function (a, b) {
            var c = t(a, b);
            return c.segment && c.segment.pointOnPath(c.proportion, !1) || [0, 0]
        }, this.gradientAtPoint = function (a, b) {
            var c = t(a, b);
            return c.segment && c.segment.gradientAtPoint(c.proportion, !1) || 0
        }, this.pointAlongPathFrom = function (a, b, c) {
            var d = t(a, c);
            return d.segment && d.segment.pointAlongPathFrom(d.proportion, b, !1) || [0, 0]
        }, this.compute = function (a) {
            q || (r = w.call(this, a)), v(), this._compute(r, a), this.x = r.points[0], this.y = r.points[1], this.w = r.points[2], this.h = r.points[3], this.segment = r.segment, s()
        }, {
            addSegment: u,
            prepareCompute: w,
            sourceStub: k,
            targetStub: l,
            maxStub: Math.max(k, l),
            sourceGap: n,
            targetGap: o,
            maxGap: Math.max(n, o)
        }
    }, c.extend(b.Connectors.AbstractConnector, e);
    var f = b.Connectors.Straight = function () {
        this.type = "Straight";
        var a = b.Connectors.AbstractConnector.apply(this, arguments);
        this._compute = function (b) {
            a.addSegment(this, "Straight", {
                x1: b.sx,
                y1: b.sy,
                x2: b.startStubX,
                y2: b.startStubY
            }), a.addSegment(this, "Straight", {
                x1: b.startStubX,
                y1: b.startStubY,
                x2: b.endStubX,
                y2: b.endStubY
            }), a.addSegment(this, "Straight", {
                x1: b.endStubX,
                y1: b.endStubY,
                x2: b.tx,
                y2: b.ty
            })
        }
    };
    c.extend(b.Connectors.Straight, b.Connectors.AbstractConnector), b.registerConnectorType(f, "Straight"), b.Endpoints.AbstractEndpoint = function (a) {
        e.apply(this, arguments);
        var b = this.compute = function () {
            var a = this._compute.apply(this, arguments);
            return this.x = a[0], this.y = a[1], this.w = a[2], this.h = a[3], this.bounds.minX = this.x, this.bounds.minY = this.y, this.bounds.maxX = this.x + this.w, this.bounds.maxY = this.y + this.h, a
        };
        return {compute: b, cssClass: a.cssClass}
    }, c.extend(b.Endpoints.AbstractEndpoint, e), b.Endpoints.Dot = function (a) {
        this.type = "Dot", b.Endpoints.AbstractEndpoint.apply(this, arguments), a = a || {}, this.radius = a.radius || 10, this.defaultOffset = .5 * this.radius, this.defaultInnerRadius = this.radius / 3, this._compute = function (a, b, c) {
            this.radius = c.radius || this.radius;
            var d = a[0] - this.radius, e = a[1] - this.radius, f = 2 * this.radius, g = 2 * this.radius;
            if (c.strokeStyle) {
                var h = c.lineWidth || 1;
                d -= h, e -= h, f += 2 * h, g += 2 * h
            }
            return [d, e, f, g, this.radius]
        }
    }, c.extend(b.Endpoints.Dot, b.Endpoints.AbstractEndpoint), b.Endpoints.Rectangle = function (a) {
        this.type = "Rectangle", b.Endpoints.AbstractEndpoint.apply(this, arguments), a = a || {}, this.width = a.width || 20, this.height = a.height || 20, this._compute = function (a, b, c) {
            var d = c.width || this.width, e = c.height || this.height, f = a[0] - d / 2, g = a[1] - e / 2;
            return [f, g, d, e]
        }
    }, c.extend(b.Endpoints.Rectangle, b.Endpoints.AbstractEndpoint);
    var g = function () {
        b.jsPlumbUIComponent.apply(this, arguments), this._jsPlumb.displayElements = []
    };
    c.extend(g, b.jsPlumbUIComponent, {
        getDisplayElements: function () {
            return this._jsPlumb.displayElements
        }, appendDisplayElement: function (a) {
            this._jsPlumb.displayElements.push(a)
        }
    }), b.Endpoints.Image = function (d) {
        this.type = "Image", g.apply(this, arguments), b.Endpoints.AbstractEndpoint.apply(this, arguments);
        var e = d.onload, f = d.src || d.url, h = d.cssClass ? " " + d.cssClass : "";
        this._jsPlumb.img = new Image, this._jsPlumb.ready = !1, this._jsPlumb.initialized = !1, this._jsPlumb.deleted = !1, this._jsPlumb.widthToUse = d.width, this._jsPlumb.heightToUse = d.height, this._jsPlumb.endpoint = d.endpoint, this._jsPlumb.img.onload = function () {
            null != this._jsPlumb && (this._jsPlumb.ready = !0, this._jsPlumb.widthToUse = this._jsPlumb.widthToUse || this._jsPlumb.img.width, this._jsPlumb.heightToUse = this._jsPlumb.heightToUse || this._jsPlumb.img.height, e && e(this))
        }.bind(this), this._jsPlumb.endpoint.setImage = function (a, b) {
            var c = a.constructor == String ? a : a.src;
            e = b, this._jsPlumb.img.src = c, null != this.canvas && this.canvas.setAttribute("src", this._jsPlumb.img.src)
        }.bind(this), this._jsPlumb.endpoint.setImage(f, e), this._compute = function (a) {
            return this.anchorPoint = a, this._jsPlumb.ready ? [a[0] - this._jsPlumb.widthToUse / 2, a[1] - this._jsPlumb.heightToUse / 2, this._jsPlumb.widthToUse, this._jsPlumb.heightToUse] : [0, 0, 0, 0]
        }, this.canvas = jsPlumb.createElement("img", {
            position: "absolute",
            margin: 0,
            padding: 0,
            outline: 0
        }, this._jsPlumb.instance.endpointClass + h), this._jsPlumb.widthToUse && this.canvas.setAttribute("width", this._jsPlumb.widthToUse), this._jsPlumb.heightToUse && this.canvas.setAttribute("height", this._jsPlumb.heightToUse), this._jsPlumb.instance.appendElement(this.canvas), this.actuallyPaint = function () {
            if (!this._jsPlumb.deleted) {
                this._jsPlumb.initialized || (this.canvas.setAttribute("src", this._jsPlumb.img.src), this.appendDisplayElement(this.canvas), this._jsPlumb.initialized = !0);
                var a = this.anchorPoint[0] - this._jsPlumb.widthToUse / 2, b = this.anchorPoint[1] - this._jsPlumb.heightToUse / 2;
                c.sizeElement(this.canvas, a, b, this._jsPlumb.widthToUse, this._jsPlumb.heightToUse)
            }
        }, this.paint = function (b, c) {
            null != this._jsPlumb && (this._jsPlumb.ready ? this.actuallyPaint(b, c) : a.setTimeout(function () {
                this.paint(b, c)
            }.bind(this), 200))
        }
    }, c.extend(b.Endpoints.Image, [g, b.Endpoints.AbstractEndpoint], {
        cleanup: function (a) {
            a && (this._jsPlumb.deleted = !0, this.canvas && this.canvas.parentNode.removeChild(this.canvas), this.canvas = null)
        }
    }), b.Endpoints.Blank = function (a) {
        b.Endpoints.AbstractEndpoint.apply(this, arguments), this.type = "Blank", g.apply(this, arguments), this._compute = function (a) {
            return [a[0], a[1], 10, 0]
        };
        var d = a.cssClass ? " " + a.cssClass : "";
        this.canvas = jsPlumb.createElement("div", {
            display: "block",
            width: "1px",
            height: "1px",
            background: "transparent",
            position: "absolute"
        }, this._jsPlumb.instance.endpointClass + d), this._jsPlumb.instance.appendElement(this.canvas), this.paint = function () {
            c.sizeElement(this.canvas, this.x, this.y, this.w, this.h)
        }
    }, c.extend(b.Endpoints.Blank, [b.Endpoints.AbstractEndpoint, g], {
        cleanup: function () {
            this.canvas && this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas)
        }
    }), b.Endpoints.Triangle = function (a) {
        this.type = "Triangle", b.Endpoints.AbstractEndpoint.apply(this, arguments), a = a || {}, a.width = a.width || 55, a.height = a.height || 55, this.width = a.width, this.height = a.height, this._compute = function (a, b, c) {
            var d = c.width || self.width, e = c.height || self.height, f = a[0] - d / 2, g = a[1] - e / 2;
            return [f, g, d, e]
        }
    };
    var h = b.Overlays.AbstractOverlay = function (a) {
        this.visible = !0, this.isAppendedAtTopLevel = !0, this.component = a.component, this.loc = null == a.location ? .5 : a.location, this.endpointLoc = null == a.endpointLocation ? [.5, .5] : a.endpointLocation
    };
    h.prototype = {
        cleanup: function (a) {
            a && (this.component = null, this.canvas = null, this.endpointLoc = null)
        }, reattach: function () {
        }, setVisible: function (a) {
            this.visible = a, this.component.repaint()
        }, isVisible: function () {
            return this.visible
        }, hide: function () {
            this.setVisible(!1)
        }, show: function () {
            this.setVisible(!0)
        }, incrementLocation: function (a) {
            this.loc += a, this.component.repaint()
        }, setLocation: function (a) {
            this.loc = a, this.component.repaint()
        }, getLocation: function () {
            return this.loc
        }, updateFrom: function () {
        }
    }, b.Overlays.Arrow = function (a) {
        this.type = "Arrow", h.apply(this, arguments), this.isAppendedAtTopLevel = !1, a = a || {}, this.length = a.length || 20, this.width = a.width || 20, this.id = a.id;
        var b = (a.direction || 1) < 0 ? -1 : 1, e = a.paintStyle || {lineWidth: 1}, f = a.foldback || .623;
        this.computeMaxSize = function () {
            return 1.5 * self.width
        }, this.draw = function (a, g) {
            var h, i, j, k, l;
            if (a.pointAlongPathFrom) {
                if (c.isString(this.loc) || this.loc > 1 || this.loc < 0) {
                    var m = parseInt(this.loc, 10), n = this.loc < 0 ? 1 : 0;
                    h = a.pointAlongPathFrom(n, m, !1), i = a.pointAlongPathFrom(n, m - b * this.length / 2, !1), j = d.pointOnLine(h, i, this.length)
                } else if (1 == this.loc) {
                    if (h = a.pointOnPath(this.loc), i = a.pointAlongPathFrom(this.loc, -this.length), j = d.pointOnLine(h, i, this.length), -1 == b) {
                        var o = j;
                        j = h, h = o
                    }
                } else if (0 === this.loc) {
                    if (j = a.pointOnPath(this.loc), i = a.pointAlongPathFrom(this.loc, this.length), h = d.pointOnLine(j, i, this.length), -1 == b) {
                        var p = j;
                        j = h, h = p
                    }
                } else h = a.pointAlongPathFrom(this.loc, b * this.length / 2), i = a.pointOnPath(this.loc), j = d.pointOnLine(h, i, this.length);
                k = d.perpendicularLineTo(h, j, this.width), l = d.pointOnLine(h, j, f * this.length);
                var q = {
                    hxy: h,
                    tail: k,
                    cxy: l
                }, r = e.strokeStyle || g.strokeStyle, s = e.fillStyle || g.strokeStyle, t = e.lineWidth || g.lineWidth;
                return {
                    component: a,
                    d: q,
                    lineWidth: t,
                    strokeStyle: r,
                    fillStyle: s,
                    minX: Math.min(h.x, k[0].x, k[1].x),
                    maxX: Math.max(h.x, k[0].x, k[1].x),
                    minY: Math.min(h.y, k[0].y, k[1].y),
                    maxY: Math.max(h.y, k[0].y, k[1].y)
                }
            }
            return {component: a, minX: 0, maxX: 0, minY: 0, maxY: 0}
        }
    }, c.extend(b.Overlays.Arrow, h, {
        updateFrom: function (a) {
            this.length = a.length || this.length, this.width = a.width || this.width, this.direction = null != a.direction ? a.direction : this.direction, this.foldback = a.foldback || this.foldback
        }
    }), b.Overlays.PlainArrow = function (a) {
        a = a || {};
        var c = b.extend(a, {foldback: 1});
        b.Overlays.Arrow.call(this, c), this.type = "PlainArrow"
    }, c.extend(b.Overlays.PlainArrow, b.Overlays.Arrow), b.Overlays.Diamond = function (a) {
        a = a || {};
        var c = a.length || 40, d = jsPlumb.extend(a, {
            length: c / 2,
            foldback: 2
        });
        b.Overlays.Arrow.call(this, d), this.type = "Diamond"
    }, c.extend(b.Overlays.Diamond, b.Overlays.Arrow);
    var i = function (a, b) {
        return (null == a._jsPlumb.cachedDimensions || b) && (a._jsPlumb.cachedDimensions = a.getDimensions()), a._jsPlumb.cachedDimensions
    }, j = function (a) {
        b.jsPlumbUIComponent.apply(this, arguments), h.apply(this, arguments);
        var d = this.fire;
        this.fire = function () {
            d.apply(this, arguments), this.component && this.component.fire.apply(this.component, arguments)
        }, this.detached = !1, this.id = a.id, this._jsPlumb.div = null, this._jsPlumb.initialised = !1, this._jsPlumb.component = a.component, this._jsPlumb.cachedDimensions = null, this._jsPlumb.create = a.create, this._jsPlumb.initiallyInvisible = a.visible === !1, this.getElement = function () {
            if (null == this._jsPlumb.div) {
                var b = this._jsPlumb.div = jsPlumb.getElement(this._jsPlumb.create(this._jsPlumb.component));
                b.style.position = "absolute", b.className = this._jsPlumb.instance.overlayClass + " " + (this.cssClass ? this.cssClass : a.cssClass ? a.cssClass : ""), this._jsPlumb.instance.appendElement(b), this._jsPlumb.instance.getId(b), this.canvas = b;
                var c = "translate(-50%, -50%)";
                b.style.webkitTransform = c, b.style.mozTransform = c, b.style.msTransform = c, b.style.oTransform = c, b.style.transform = c, b._jsPlumb = this, a.visible === !1 && (b.style.display = "none")
            }
            return this._jsPlumb.div
        }, this.draw = function (a, b, d) {
            var e = i(this);
            if (null != e && 2 == e.length) {
                var f = {x: 0, y: 0};
                if (d)f = {x: d[0], y: d[1]}; else if (a.pointOnPath) {
                    var g = this.loc, h = !1;
                    (c.isString(this.loc) || this.loc < 0 || this.loc > 1) && (g = parseInt(this.loc, 10), h = !0), f = a.pointOnPath(g, h)
                } else {
                    var j = this.loc.constructor == Array ? this.loc : this.endpointLoc;
                    f = {x: j[0] * a.w, y: j[1] * a.h}
                }
                var k = f.x - e[0] / 2, l = f.y - e[1] / 2;
                return {
                    component: a,
                    d: {minx: k, miny: l, td: e, cxy: f},
                    minX: k,
                    maxX: k + e[0],
                    minY: l,
                    maxY: l + e[1]
                }
            }
            return {minX: 0, maxX: 0, minY: 0, maxY: 0}
        }
    };
    c.extend(j, [b.jsPlumbUIComponent, h], {
        getDimensions: function () {
            return [1, 1]
        }, setVisible: function (a) {
            this._jsPlumb.div && (this._jsPlumb.div.style.display = a ? "block" : "none", a && this._jsPlumb.initiallyInvisible && (i(this, !0), this.component.repaint(), this._jsPlumb.initiallyInvisible = !1))
        }, clearCachedDimensions: function () {
            this._jsPlumb.cachedDimensions = null
        }, cleanup: function (a) {
            a ? null != this._jsPlumb.div && (this._jsPlumb.div._jsPlumb = null, this._jsPlumb.instance.removeElement(this._jsPlumb.div)) : (this._jsPlumb && this._jsPlumb.div && this._jsPlumb.div.parentNode && this._jsPlumb.div.parentNode.removeChild(this._jsPlumb.div), this.detached = !0)
        }, reattach: function (a) {
            null != this._jsPlumb.div && a.getContainer().appendChild(this._jsPlumb.div), this.detached = !1
        }, computeMaxSize: function () {
            var a = i(this);
            return Math.max(a[0], a[1])
        }, paint: function (a) {
            this._jsPlumb.initialised || (this.getElement(), a.component.appendDisplayElement(this._jsPlumb.div), this._jsPlumb.initialised = !0, this.detached && this._jsPlumb.div.parentNode.removeChild(this._jsPlumb.div)), this._jsPlumb.div.style.left = a.component.x + a.d.minx + "px", this._jsPlumb.div.style.top = a.component.y + a.d.miny + "px"
        }
    }), b.Overlays.Custom = function () {
        this.type = "Custom", j.apply(this, arguments)
    }, c.extend(b.Overlays.Custom, j), b.Overlays.GuideLines = function () {
        var a = this;
        a.length = 50, a.lineWidth = 5, this.type = "GuideLines", h.apply(this, arguments), b.jsPlumbUIComponent.apply(this, arguments), this.draw = function (b) {
            var c = b.pointAlongPathFrom(a.loc, a.length / 2), e = b.pointOnPath(a.loc), f = d.pointOnLine(c, e, a.length), g = d.perpendicularLineTo(c, f, 40), h = d.perpendicularLineTo(f, c, 20);
            return {
                connector: b,
                head: c,
                tail: f,
                headLine: h,
                tailLine: g,
                minX: Math.min(c.x, f.x, h[0].x, h[1].x),
                minY: Math.min(c.y, f.y, h[0].y, h[1].y),
                maxX: Math.max(c.x, f.x, h[0].x, h[1].x),
                maxY: Math.max(c.y, f.y, h[0].y, h[1].y)
            }
        }
    }, b.Overlays.Label = function (a) {
        this.labelStyle = a.labelStyle, this.cssClass = null != this.labelStyle ? this.labelStyle.cssClass : null;
        var c = b.extend({
            create: function () {
                return jsPlumb.createElement("div")
            }
        }, a);
        if (b.Overlays.Custom.call(this, c), this.type = "Label", this.label = a.label || "", this.labelText = null, this.labelStyle) {
            var d = this.getElement();
            if (this.labelStyle.font = this.labelStyle.font || "12px sans-serif", d.style.font = this.labelStyle.font, d.style.color = this.labelStyle.color || "black", this.labelStyle.fillStyle && (d.style.background = this.labelStyle.fillStyle), this.labelStyle.borderWidth > 0) {
                var e = this.labelStyle.borderStyle ? this.labelStyle.borderStyle : "black";
                d.style.border = this.labelStyle.borderWidth + "px solid " + e
            }
            this.labelStyle.padding && (d.style.padding = this.labelStyle.padding)
        }
    }, c.extend(b.Overlays.Label, b.Overlays.Custom, {
        cleanup: function (a) {
            a && (this.div = null, this.label = null, this.labelText = null, this.cssClass = null, this.labelStyle = null)
        }, getLabel: function () {
            return this.label
        }, setLabel: function (a) {
            this.label = a, this.labelText = null, this.clearCachedDimensions(), this.update(), this.component.repaint()
        }, getDimensions: function () {
            return this.update(), j.prototype.getDimensions.apply(this, arguments)
        }, update: function () {
            if ("function" == typeof this.label) {
                var a = this.label(this);
                this.getElement().innerHTML = a.replace(/\r\n/g, "<br/>")
            } else null == this.labelText && (this.labelText = this.label, this.getElement().innerHTML = this.labelText.replace(/\r\n/g, "<br/>"))
        }, updateFrom: function (a) {
            a.label && this.setLabel(a.label)
        }
    })
}.call(this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = function (b) {
        var c = b._mottle;
        return c || (c = b._mottle = new a.Mottle), c
    };
    b.extend(a.jsPlumbInstance.prototype, {
        getEventManager: function () {
            return c(this)
        }, on: function () {
            return this.getEventManager().on.apply(this, arguments), this
        }, off: function () {
            return this.getEventManager().off.apply(this, arguments), this
        }
    })
}.call(this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil, d = function (a) {
        this.type = "Flowchart", a = a || {}, a.stub = null == a.stub ? 30 : a.stub;
        var c, d, e = b.Connectors.AbstractConnector.apply(this, arguments), f = null == a.midpoint ? .5 : a.midpoint, g = a.alwaysRespectStubs === !0, h = null, i = null, j = null, k = null != a.cornerRadius ? a.cornerRadius : 0, l = function (a) {
            return 0 > a ? -1 : 0 === a ? 0 : 1
        }, m = function (a, b, c, d) {
            if (i != b || j != c) {
                var e = null == i ? d.sx : i, f = null == j ? d.sy : j, g = e == b ? "v" : "h", h = l(b - e), k = l(c - f);
                i = b, j = c, a.push([e, f, b, c, g, h, k])
            }
        }, n = function (a) {
            return Math.sqrt(Math.pow(a[0] - a[2], 2) + Math.pow(a[1] - a[3], 2))
        }, o = function (a) {
            var b = [];
            return b.push.apply(b, a), b
        }, p = function (a, b, c) {
            for (var d, f = null, g = 0; g < b.length - 1; g++) {
                if (f = f || o(b[g]), d = o(b[g + 1]), k > 0 && f[4] != d[4]) {
                    var h = Math.min(k, n(f), n(d));
                    f[2] -= f[5] * h, f[3] -= f[6] * h, d[0] += d[5] * h, d[1] += d[6] * h;
                    var i = f[6] == d[5] && 1 == d[5] || f[6] == d[5] && 0 === d[5] && f[5] != d[6] || f[6] == d[5] && -1 == d[5], j = d[1] > f[3] ? 1 : -1, l = d[0] > f[2] ? 1 : -1, m = j == l, p = m && i || !m && !i ? d[0] : f[2], q = m && i || !m && !i ? f[3] : d[1];
                    e.addSegment(a, "Straight", {
                        x1: f[0],
                        y1: f[1],
                        x2: f[2],
                        y2: f[3]
                    }), e.addSegment(a, "Arc", {
                        r: h,
                        x1: f[2],
                        y1: f[3],
                        x2: d[0],
                        y2: d[1],
                        cx: p,
                        cy: q,
                        ac: i
                    })
                } else {
                    var r = f[2] == f[0] ? 0 : f[2] > f[0] ? c.lw / 2 : -(c.lw / 2), s = f[3] == f[1] ? 0 : f[3] > f[1] ? c.lw / 2 : -(c.lw / 2);
                    e.addSegment(a, "Straight", {
                        x1: f[0] - r,
                        y1: f[1] - s,
                        x2: f[2] + r,
                        y2: f[3] + s
                    })
                }
                f = d
            }
            null != d && e.addSegment(a, "Straight", {
                x1: d[0],
                y1: d[1],
                x2: d[2],
                y2: d[3]
            })
        };
        this.setSegments = function (a) {
            h = a
        }, this.isEditable = function () {
            return !0
        }, this.getOriginalSegments = function () {
            return h || c
        }, this._compute = function (a, b) {
            if (b.clearEdits && (h = null), null != h)return p(this, h, a), void 0;
            c = [], i = null, j = null, d = null;
            var k = a.startStubX + (a.endStubX - a.startStubX) * f, l = a.startStubY + (a.endStubY - a.startStubY) * f, n = {
                x: [0, 1],
                y: [1, 0]
            }, o = function () {
                return [a.startStubX, a.startStubY, a.endStubX, a.endStubY]
            }, q = {
                perpendicular: o, orthogonal: o, opposite: function (b) {
                    var c = a, d = "x" == b ? 0 : 1, e = {
                        x: function () {
                            return 1 == c.so[d] && (c.startStubX > c.endStubX && c.tx > c.startStubX || c.sx > c.endStubX && c.tx > c.sx) || -1 == c.so[d] && (c.startStubX < c.endStubX && c.tx < c.startStubX || c.sx < c.endStubX && c.tx < c.sx)
                        }, y: function () {
                            return 1 == c.so[d] && (c.startStubY > c.endStubY && c.ty > c.startStubY || c.sy > c.endStubY && c.ty > c.sy) || -1 == c.so[d] && (c.startStubY < c.endStubY && c.ty < c.startStubY || c.sy < c.endStubY && c.ty < c.sy)
                        }
                    };
                    return !g && e[b]() ? {
                        x: [(a.sx + a.tx) / 2, a.startStubY, (a.sx + a.tx) / 2, a.endStubY],
                        y: [a.startStubX, (a.sy + a.ty) / 2, a.endStubX, (a.sy + a.ty) / 2]
                    }[b] : [a.startStubX, a.startStubY, a.endStubX, a.endStubY]
                }
            }, r = {
                perpendicular: function (b) {
                    var c = a, d = {
                        x: [[[1, 2, 3, 4], null, [2, 1, 4, 3]], null, [[4, 3, 2, 1], null, [3, 4, 1, 2]]],
                        y: [[[3, 2, 1, 4], null, [2, 3, 4, 1]], null, [[4, 1, 2, 3], null, [1, 4, 3, 2]]]
                    }, e = {
                        x: [[c.startStubX, c.endStubX], null, [c.endStubX, c.startStubX]],
                        y: [[c.startStubY, c.endStubY], null, [c.endStubY, c.startStubY]]
                    }, f = {
                        x: [[k, c.startStubY], [k, c.endStubY]],
                        y: [[c.startStubX, l], [c.endStubX, l]]
                    }, g = {
                        x: [[c.endStubX, c.startStubY]],
                        y: [[c.startStubX, c.endStubY]]
                    }, h = {
                        x: [[c.startStubX, c.endStubY], [c.endStubX, c.endStubY]],
                        y: [[c.endStubX, c.startStubY], [c.endStubX, c.endStubY]]
                    }, i = {
                        x: [[c.startStubX, l], [c.endStubX, l], [c.endStubX, c.endStubY]],
                        y: [[k, c.startStubY], [k, c.endStubY], [c.endStubX, c.endStubY]]
                    }, j = {
                        x: [c.startStubY, c.endStubY],
                        y: [c.startStubX, c.endStubX]
                    }, m = n[b][0], o = n[b][1], p = c.so[m] + 1, q = c.to[o] + 1, r = -1 == c.to[o] && j[b][1] < j[b][0] || 1 == c.to[o] && j[b][1] > j[b][0], s = e[b][p][0], t = e[b][p][1], u = d[b][p][q];
                    return c.segment == u[3] || c.segment == u[2] && r ? f[b] : c.segment == u[2] && s > t ? g[b] : c.segment == u[2] && t >= s || c.segment == u[1] && !r ? i[b] : c.segment == u[0] || c.segment == u[1] && r ? h[b] : void 0
                }, orthogonal: function (b, c, d, e, f) {
                    var g = a, h = {
                        x: -1 == g.so[0] ? Math.min(c, e) : Math.max(c, e),
                        y: -1 == g.so[1] ? Math.min(c, e) : Math.max(c, e)
                    }[b];
                    return {
                        x: [[h, d], [h, f], [e, f]],
                        y: [[d, h], [f, h], [f, e]]
                    }[b]
                }, opposite: function (c, d, f, g) {
                    var h = a, i = {x: "y", y: "x"}[c], j = {
                        x: "height",
                        y: "width"
                    }[c], m = h["is" + c.toUpperCase() + "GreaterThanStubTimes2"];
                    if (b.sourceEndpoint.elementId == b.targetEndpoint.elementId) {
                        var n = f + (1 - b.sourceEndpoint.anchor[i]) * b.sourceInfo[j] + e.maxStub;
                        return {x: [[d, n], [g, n]], y: [[n, d], [n, g]]}[c]
                    }
                    return !m || 1 == h.so[t] && d > g || -1 == h.so[t] && g > d ? {
                        x: [[d, l], [g, l]],
                        y: [[k, d], [k, g]]
                    }[c] : 1 == h.so[t] && g > d || -1 == h.so[t] && d > g ? {
                        x: [[k, h.sy], [k, h.ty]],
                        y: [[h.sx, l], [h.tx, l]]
                    }[c] : void 0
                }
            }, s = q[a.anchorOrientation](a.sourceAxis), t = "x" == a.sourceAxis ? 0 : 1, u = "x" == a.sourceAxis ? 1 : 0, v = s[t], w = s[u], x = s[t + 2], y = s[u + 2];
            m(c, s[0], s[1], a);
            var z = r[a.anchorOrientation](a.sourceAxis, v, w, x, y);
            if (z)for (var A = 0; A < z.length; A++)m(c, z[A][0], z[A][1], a);
            m(c, s[2], s[3], a), m(c, a.tx, a.ty, a), p(this, c, a)
        }, this.getPath = function () {
            for (var a = null, b = null, d = [], e = h || c, f = 0; f < e.length; f++) {
                var g = e[f], i = g[4], j = "v" == i ? 3 : 2;
                null != a && b === i ? a[j] = g[j] : (g[0] != g[2] || g[1] != g[3]) && (d.push({
                    start: [g[0], g[1]],
                    end: [g[2], g[3]]
                }), a = g, b = g[4])
            }
            return d
        }, this.setPath = function (a) {
            h = [];
            for (var b = 0; b < a.length; b++) {
                var c = a[b].start[0], d = a[b].start[1], e = a[b].end[0], f = a[b].end[1], g = c == e ? "v" : "h", i = l(e - c), j = l(f - d);
                h.push([c, d, e, f, g, i, j])
            }
        }
    };
    c.extend(d, b.Connectors.AbstractConnector), b.registerConnectorType(d, "Flowchart")
}.call(this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil, d = function (a, b, c, d) {
        return c >= a && b >= d ? 1 : c >= a && d >= b ? 2 : a >= c && d >= b ? 3 : 4
    }, e = function (a, b, c, d, e, f, g, h, i) {
        return i >= h ? [a, b] : 1 === c ? d[3] <= 0 && e[3] >= 1 ? [a + (d[2] < .5 ? -1 * f : f), b] : d[2] >= 1 && e[2] <= 0 ? [a, b + (d[3] < .5 ? -1 * g : g)] : [a + -1 * f, b + -1 * g] : 2 === c ? d[3] >= 1 && e[3] <= 0 ? [a + (d[2] < .5 ? -1 * f : f), b] : d[2] >= 1 && e[2] <= 0 ? [a, b + (d[3] < .5 ? -1 * g : g)] : [a + f, b + -1 * g] : 3 === c ? d[3] >= 1 && e[3] <= 0 ? [a + (d[2] < .5 ? -1 * f : f), b] : d[2] <= 0 && e[2] >= 1 ? [a, b + (d[3] < .5 ? -1 * g : g)] : [a + -1 * f, b + -1 * g] : 4 === c ? d[3] <= 0 && e[3] >= 1 ? [a + (d[2] < .5 ? -1 * f : f), b] : d[2] <= 0 && e[2] >= 1 ? [a, b + (d[3] < .5 ? -1 * g : g)] : [a + f, b + -1 * g] : void 0
    }, f = function (a) {
        a = a || {}, this.type = "StateMachine";
        var c = b.Connectors.AbstractConnector.apply(this, arguments), f = a.curviness || 10, g = a.margin || 5, h = a.proximityLimit || 80, i = a.orientation && "clockwise" === a.orientation, j = a.loopbackRadius || 25, k = a.showLoopback !== !1;
        this._compute = function (a, b) {
            var l = Math.abs(b.sourcePos[0] - b.targetPos[0]), m = Math.abs(b.sourcePos[1] - b.targetPos[1]);
            if (k && b.sourceEndpoint.elementId === b.targetEndpoint.elementId) {
                var n = b.sourcePos[0], o = b.sourcePos[1] - g, p = n, q = o - j, r = 2 * j, s = 2 * j, t = p - j, u = q - j;
                a.points[0] = t, a.points[1] = u, a.points[2] = r, a.points[3] = s, c.addSegment(this, "Arc", {
                    loopback: !0,
                    x1: n - t + 4,
                    y1: o - u,
                    startAngle: 0,
                    endAngle: 2 * Math.PI,
                    r: j,
                    ac: !i,
                    x2: n - t - 4,
                    y2: o - u,
                    cx: p - t,
                    cy: q - u
                })
            } else {
                var v = b.sourcePos[0] < b.targetPos[0] ? 0 : l, w = b.sourcePos[1] < b.targetPos[1] ? 0 : m, x = b.sourcePos[0] < b.targetPos[0] ? l : 0, y = b.sourcePos[1] < b.targetPos[1] ? m : 0;
                0 === b.sourcePos[2] && (v -= g), 1 === b.sourcePos[2] && (v += g), 0 === b.sourcePos[3] && (w -= g), 1 === b.sourcePos[3] && (w += g), 0 === b.targetPos[2] && (x -= g), 1 === b.targetPos[2] && (x += g), 0 === b.targetPos[3] && (y -= g), 1 === b.targetPos[3] && (y += g);
                var z = (v + x) / 2, A = (w + y) / 2, B = d(v, w, x, y), C = Math.sqrt(Math.pow(x - v, 2) + Math.pow(y - w, 2)), D = e(z, A, B, b.sourcePos, b.targetPos, f, f, C, h);
                c.addSegment(this, "Bezier", {
                    x1: x,
                    y1: y,
                    x2: v,
                    y2: w,
                    cp1x: D[0],
                    cp1y: D[1],
                    cp2x: D[0],
                    cp2y: D[1]
                })
            }
        }
    };
    c.extend(f, b.Connectors.AbstractConnector), b.registerConnectorType(f, "StateMachine")
}.call(this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil, d = function (a) {
        a = a || {};
        var c = b.Connectors.AbstractConnector.apply(this, arguments), d = a.curviness || 150, e = 10;
        this.type = "Bezier", this.getCurviness = function () {
            return d
        }, this._findControlPoint = function (a, b, c, f, g, h, i) {
            var j = h[0] != i[0] || h[1] == i[1], k = [];
            return j ? (0 === i[0] ? k.push(c[0] < b[0] ? a[0] + e : a[0] - e) : k.push(a[0] + d * i[0]), 0 === i[1] ? k.push(c[1] < b[1] ? a[1] + e : a[1] - e) : k.push(a[1] + d * h[1])) : (0 === h[0] ? k.push(b[0] < c[0] ? a[0] + e : a[0] - e) : k.push(a[0] - d * h[0]), 0 === h[1] ? k.push(b[1] < c[1] ? a[1] + e : a[1] - e) : k.push(a[1] + d * i[1])), k
        }, this._compute = function (a, b) {
            var d = b.sourcePos, e = b.targetPos, f = Math.abs(d[0] - e[0]), g = Math.abs(d[1] - e[1]), h = d[0] < e[0] ? f : 0, i = d[1] < e[1] ? g : 0, j = d[0] < e[0] ? 0 : f, k = d[1] < e[1] ? 0 : g, l = this._findControlPoint([h, i], d, e, b.sourceEndpoint, b.targetEndpoint, a.so, a.to), m = this._findControlPoint([j, k], e, d, b.targetEndpoint, b.sourceEndpoint, a.to, a.so);
            c.addSegment(this, "Bezier", {
                x1: h,
                y1: i,
                x2: j,
                y2: k,
                cp1x: l[0],
                cp1y: l[1],
                cp2x: m[0],
                cp2y: m[1]
            })
        }
    };
    c.extend(d, b.Connectors.AbstractConnector), b.registerConnectorType(d, "Bezier")
}.call(this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil, d = {
        "stroke-linejoin": "stroke-linejoin",
        "stroke-dashoffset": "stroke-dashoffset",
        "stroke-linecap": "stroke-linecap"
    }, e = "stroke-dasharray", f = "dashstyle", g = "linearGradient", h = "radialGradient", i = "defs", j = "fill", k = "stop", l = "stroke", m = "stroke-width", n = "style", o = "none", p = "jsplumb_gradient_", q = "lineWidth", r = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml"
    }, s = function (a, b) {
        for (var c in b)a.setAttribute(c, "" + b[c])
    }, t = function (a, b) {
        return b = b || {}, b.version = "1.1", b.xmlns = r.xhtml, jsPlumb.createElementNS(r.svg, a, null, null, b)
    }, u = function (a) {
        return "position:absolute;left:" + a[0] + "px;top:" + a[1] + "px"
    }, v = function (a) {
        for (var b = a.querySelectorAll(" defs,linearGradient,radialGradient"), c = 0; c < b.length; c++)b[c].parentNode.removeChild(b[c])
    }, w = function (a, b, c, d, e) {
        var f = p + e._jsPlumb.instance.idstamp();
        v(a);
        var m;
        m = c.gradient.offset ? t(h, {id: f}) : t(g, {
            id: f,
            gradientUnits: "userSpaceOnUse"
        });
        var n = t(i);
        a.appendChild(n), n.appendChild(m);
        for (var o = 0; o < c.gradient.stops.length; o++) {
            var q = 1 == e.segment || 2 == e.segment ? o : c.gradient.stops.length - 1 - o, r = c.gradient.stops[q][1], s = t(k, {
                offset: Math.floor(100 * c.gradient.stops[o][0]) + "%",
                "stop-color": r
            });
            m.appendChild(s)
        }
        var u = c.strokeStyle ? l : j;
        b.setAttribute(u, "url(#" + f + ")")
    }, x = function (a, b, c, g, h) {
        if (b.setAttribute(j, c.fillStyle ? c.fillStyle : o), b.setAttribute(l, c.strokeStyle ? c.strokeStyle : o), c.gradient ? w(a, b, c, g, h) : (v(a), b.setAttribute(n, "")), c.lineWidth && b.setAttribute(m, c.lineWidth), c[f] && c[q] && !c[e]) {
            var i = -1 == c[f].indexOf(",") ? " " : ",", k = c[f].split(i), p = "";
            k.forEach(function (a) {
                p += Math.floor(a * c.lineWidth) + i
            }), b.setAttribute(e, p)
        } else c[e] && b.setAttribute(e, c[e]);
        for (var r in d)c[r] && b.setAttribute(d[r], c[r])
    }, y = function (a, b, c) {
        a.childNodes.length > c ? a.insertBefore(b, a.childNodes[c]) : a.appendChild(b)
    };
    c.svg = {node: t, attr: s, pos: u};
    var z = function (a) {
        var d = a.pointerEventsSpec || "all", e = {};
        b.jsPlumbUIComponent.apply(this, a.originalArgs), this.canvas = null, this.path = null, this.svg = null, this.bgCanvas = null;
        var f = a.cssClass + " " + (a.originalArgs[0].cssClass || ""), g = {
            style: "",
            width: 0,
            height: 0,
            "pointer-events": d,
            position: "absolute"
        };
        this.svg = t("svg", g), a.useDivWrapper ? (this.canvas = jsPlumb.createElement("div", {position: "absolute"}), c.sizeElement(this.canvas, 0, 0, 1, 1), this.canvas.className = f) : (s(this.svg, {"class": f}), this.canvas = this.svg), a._jsPlumb.appendElement(this.canvas, a.originalArgs[0].parent), a.useDivWrapper && this.canvas.appendChild(this.svg);
        var h = [this.canvas];
        return this.getDisplayElements = function () {
            return h
        }, this.appendDisplayElement = function (a) {
            h.push(a)
        }, this.paint = function (b, d, f) {
            if (null != b) {
                var g, h = [this.x, this.y], i = [this.w, this.h];
                null != f && (f.xmin < 0 && (h[0] += f.xmin), f.ymin < 0 && (h[1] += f.ymin), i[0] = f.xmax + (f.xmin < 0 ? -f.xmin : 0), i[1] = f.ymax + (f.ymin < 0 ? -f.ymin : 0)), a.useDivWrapper ? (c.sizeElement(this.canvas, h[0], h[1], i[0], i[1]), h[0] = 0, h[1] = 0, g = u([0, 0])) : g = u([h[0], h[1]]), e.paint.apply(this, arguments), s(this.svg, {
                    style: g,
                    width: i[0] || 0,
                    height: i[1] || 0
                })
            }
        }, {renderer: e}
    };
    c.extend(z, b.jsPlumbUIComponent, {
        cleanup: function (a) {
            a || null == this.typeId ? (this.canvas && (this.canvas._jsPlumb = null), this.svg && (this.svg._jsPlumb = null), this.bgCanvas && (this.bgCanvas._jsPlumb = null), this.canvas && this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this.bgCanvas && this.bgCanvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this.svg = null, this.canvas = null, this.path = null, this.group = null) : (this.canvas && this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this.bgCanvas && this.bgCanvas.parentNode && this.bgCanvas.parentNode.removeChild(this.bgCanvas))
        }, reattach: function (a) {
            var b = a.getContainer();
            this.canvas && null == this.canvas.parentNode && b.appendChild(this.canvas), this.bgCanvas && null == this.bgCanvas.parentNode && b.appendChild(this.bgCanvas)
        }, setVisible: function (a) {
            this.canvas && (this.canvas.style.display = a ? "block" : "none")
        }
    }), b.ConnectorRenderers.svg = function (a) {
        var c = this, d = z.apply(this, [{
            cssClass: a._jsPlumb.connectorClass,
            originalArgs: arguments,
            pointerEventsSpec: "none",
            _jsPlumb: a._jsPlumb
        }]);
        d.renderer.paint = function (d, e, f) {
            var g = c.getSegments(), h = "", i = [0, 0];
            if (f.xmin < 0 && (i[0] = -f.xmin), f.ymin < 0 && (i[1] = -f.ymin), g.length > 0) {
                for (var j = 0; j < g.length; j++)h += b.Segments.svg.SegmentRenderer.getPath(g[j]), h += " ";
                var k = {
                    d: h,
                    transform: "translate(" + i[0] + "," + i[1] + ")",
                    "pointer-events": a["pointer-events"] || "visibleStroke"
                }, l = null, m = [c.x, c.y, c.w, c.h];
                if (d.outlineColor) {
                    var n = d.outlineWidth || 1, o = d.lineWidth + 2 * n;
                    l = b.extend({}, d), delete l.gradient, l.strokeStyle = d.outlineColor, l.lineWidth = o, null == c.bgPath ? (c.bgPath = t("path", k), b.addClass(c.bgPath, b.connectorOutlineClass), y(c.svg, c.bgPath, 0)) : s(c.bgPath, k), x(c.svg, c.bgPath, l, m, c)
                }
                null == c.path ? (c.path = t("path", k), y(c.svg, c.path, d.outlineColor ? 1 : 0)) : s(c.path, k), x(c.svg, c.path, d, m, c)
            }
        }
    }, c.extend(b.ConnectorRenderers.svg, z), b.Segments.svg = {
        SegmentRenderer: {
            getPath: function (a) {
                return {
                    Straight: function () {
                        var b = a.getCoordinates();
                        return "M " + b.x1 + " " + b.y1 + " L " + b.x2 + " " + b.y2
                    }, Bezier: function () {
                        var b = a.params;
                        return "M " + b.x1 + " " + b.y1 + " C " + b.cp1x + " " + b.cp1y + " " + b.cp2x + " " + b.cp2y + " " + b.x2 + " " + b.y2
                    }, Arc: function () {
                        var b = a.params, c = a.sweep > Math.PI ? 1 : 0, d = a.anticlockwise ? 0 : 1;
                        return "M" + a.x1 + " " + a.y1 + " A " + a.radius + " " + b.r + " 0 " + c + "," + d + " " + a.x2 + " " + a.y2
                    }
                }[a.type]()
            }
        }
    };
    var A = b.SvgEndpoint = function (a) {
        var c = z.apply(this, [{
            cssClass: a._jsPlumb.endpointClass,
            originalArgs: arguments,
            pointerEventsSpec: "all",
            useDivWrapper: !0,
            _jsPlumb: a._jsPlumb
        }]);
        c.renderer.paint = function (a) {
            var c = b.extend({}, a);
            c.outlineColor && (c.strokeWidth = c.outlineWidth, c.strokeStyle = c.outlineColor), null == this.node ? (this.node = this.makeNode(c), this.svg.appendChild(this.node)) : null != this.updateNode && this.updateNode(this.node), x(this.svg, this.node, c, [this.x, this.y, this.w, this.h], this), u(this.node, [this.x, this.y])
        }.bind(this)
    };
    c.extend(A, z), b.Endpoints.svg.Dot = function () {
        b.Endpoints.Dot.apply(this, arguments), A.apply(this, arguments), this.makeNode = function () {
            return t("circle", {cx: this.w / 2, cy: this.h / 2, r: this.radius})
        }, this.updateNode = function (a) {
            s(a, {cx: this.w / 2, cy: this.h / 2, r: this.radius})
        }
    }, c.extend(b.Endpoints.svg.Dot, [b.Endpoints.Dot, A]), b.Endpoints.svg.Rectangle = function () {
        b.Endpoints.Rectangle.apply(this, arguments), A.apply(this, arguments), this.makeNode = function () {
            return t("rect", {width: this.w, height: this.h})
        }, this.updateNode = function (a) {
            s(a, {width: this.w, height: this.h})
        }
    }, c.extend(b.Endpoints.svg.Rectangle, [b.Endpoints.Rectangle, A]), b.Endpoints.svg.Image = b.Endpoints.Image, b.Endpoints.svg.Blank = b.Endpoints.Blank, b.Overlays.svg.Label = b.Overlays.Label, b.Overlays.svg.Custom = b.Overlays.Custom;
    var B = function (a, c) {
        a.apply(this, c), b.jsPlumbUIComponent.apply(this, c), this.isAppendedAtTopLevel = !1, this.path = null, this.paint = function (a, b) {
            if (a.component.svg && b) {
                null == this.path && (this.path = t("path", {"pointer-events": "all"}), a.component.svg.appendChild(this.path), this.canvas = a.component.svg);
                var e = c && 1 == c.length ? c[0].cssClass || "" : "", f = [0, 0];
                b.xmin < 0 && (f[0] = -b.xmin), b.ymin < 0 && (f[1] = -b.ymin), s(this.path, {
                    d: d(a.d),
                    "class": e,
                    stroke: a.strokeStyle ? a.strokeStyle : null,
                    fill: a.fillStyle ? a.fillStyle : null,
                    transform: "translate(" + f[0] + "," + f[1] + ")"
                })
            }
        };
        var d = function (a) {
            return isNaN(a.cxy.x) || isNaN(a.cxy.y) ? "" : "M" + a.hxy.x + "," + a.hxy.y + " L" + a.tail[0].x + "," + a.tail[0].y + " L" + a.cxy.x + "," + a.cxy.y + " L" + a.tail[1].x + "," + a.tail[1].y + " L" + a.hxy.x + "," + a.hxy.y
        };
        this.transfer = function (a) {
            a.canvas && this.path && this.path.parentNode && (this.path.parentNode.removeChild(this.path), a.canvas.appendChild(this.path))
        }
    };
    c.extend(B, [b.jsPlumbUIComponent, b.Overlays.AbstractOverlay], {
        cleanup: function (a) {
            null != this.path && (a ? this._jsPlumb.instance.removeElement(this.path) : this.path.parentNode && this.path.parentNode.removeChild(this.path))
        }, reattach: function () {
            this.path && this.canvas && null == this.path.parentNode && this.canvas.appendChild(this.path)
        }, setVisible: function (a) {
            null != this.path && (this.path.style.display = a ? "block" : "none")
        }
    }), b.Overlays.svg.Arrow = function () {
        B.apply(this, [b.Overlays.Arrow, arguments])
    }, c.extend(b.Overlays.svg.Arrow, [b.Overlays.Arrow, B]), b.Overlays.svg.PlainArrow = function () {
        B.apply(this, [b.Overlays.PlainArrow, arguments])
    }, c.extend(b.Overlays.svg.PlainArrow, [b.Overlays.PlainArrow, B]), b.Overlays.svg.Diamond = function () {
        B.apply(this, [b.Overlays.Diamond, arguments])
    }, c.extend(b.Overlays.svg.Diamond, [b.Overlays.Diamond, B]), b.Overlays.svg.GuideLines = function () {
        var a, c, d = null, e = this;
        b.Overlays.GuideLines.apply(this, arguments), this.paint = function (b, g) {
            null == d && (d = t("path"), b.connector.svg.appendChild(d), e.attachListeners(d, b.connector), e.attachListeners(d, e), a = t("path"), b.connector.svg.appendChild(a), e.attachListeners(a, b.connector), e.attachListeners(a, e), c = t("path"), b.connector.svg.appendChild(c), e.attachListeners(c, b.connector), e.attachListeners(c, e));
            var h = [0, 0];
            g.xmin < 0 && (h[0] = -g.xmin), g.ymin < 0 && (h[1] = -g.ymin), s(d, {
                d: f(b.head, b.tail),
                stroke: "red",
                fill: null,
                transform: "translate(" + h[0] + "," + h[1] + ")"
            }), s(a, {
                d: f(b.tailLine[0], b.tailLine[1]),
                stroke: "blue",
                fill: null,
                transform: "translate(" + h[0] + "," + h[1] + ")"
            }), s(c, {
                d: f(b.headLine[0], b.headLine[1]),
                stroke: "green",
                fill: null,
                transform: "translate(" + h[0] + "," + h[1] + ")"
            })
        };
        var f = function (a, b) {
            return "M " + a.x + "," + a.y + " L" + b.x + "," + b.y
        }
    }, c.extend(b.Overlays.svg.GuideLines, b.Overlays.GuideLines)
}.call(this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil, d = a.Katavorio, e = a.Biltong, f = function (a, b) {
        b = b || "main";
        var c = "_katavorio_" + b, f = a[c], g = a.getEventManager();
        return f || (f = new d({
            bind: g.on,
            unbind: g.off,
            getSize: jsPlumb.getSize,
            getPosition: function (b) {
                var c = a.getOffset(b, !1, b._katavorioDrag ? b.offsetParent : null);
                return [c.left, c.top]
            },
            setPosition: function (a, b) {
                a.style.left = b[0] + "px", a.style.top = b[1] + "px"
            },
            addClass: jsPlumb.addClass,
            removeClass: jsPlumb.removeClass,
            intersects: e.intersects,
            indexOf: function (a, b) {
                return a.indexOf(b)
            },
            css: {
                noSelect: a.dragSelectClass,
                droppable: "jsplumb-droppable",
                draggable: "jsplumb-draggable",
                drag: "jsplumb-drag",
                selected: "jsplumb-drag-selected",
                active: "jsplumb-drag-active",
                hover: "jsplumb-drag-hover"
            }
        }), a[c] = f, a.bind("zoom", f.setZoom)), f
    }, g = function (a, b) {
        var d = function (d) {
            if (null != b[d]) {
                if (c.isString(b[d])) {
                    var e = b[d].match(/-=/) ? -1 : 1, f = b[d].substring(2);
                    return a[d] + e * f
                }
                return b[d]
            }
            return a[d]
        };
        return [d("left"), d("top")]
    };
    b.extend(a.jsPlumbInstance.prototype, {
        animationSupported: !0,
        getElement: function (a) {
            return null == a ? null : (a = "string" == typeof a ? a : null != a.length && null == a.enctype ? a[0] : a, "string" == typeof a ? document.getElementById(a) : a)
        },
        removeElement: function (a) {
            f(this).elementRemoved(a), this.getEventManager().remove(a)
        },
        doAnimate: function (a, b, c) {
            c = c || {};
            var d = this.getOffset(a), e = g(d, b), f = e[0] - d.left, h = e[1] - d.top, i = c.duration || 250, j = 15, k = i / j, l = j / i * f, m = j / i * h, n = 0, o = setInterval(function () {
                jsPlumb.setPosition(a, {
                    left: d.left + l * (n + 1),
                    top: d.top + m * (n + 1)
                }), null != c.step && c.step(n, Math.ceil(k)), n++, n >= k && (window.clearInterval(o), null != c.complete && c.complete())
            }, j)
        },
        destroyDraggable: function (a, b) {
            f(this, b).destroyDraggable(a)
        },
        destroyDroppable: function (a, b) {
            f(this, b).destroyDroppable(a)
        },
        initDraggable: function (a, b, c) {
            f(this, c).draggable(a, b)
        },
        initDroppable: function (a, b, c) {
            f(this, c).droppable(a, b)
        },
        isAlreadyDraggable: function (a) {
            return null != a._katavorioDrag
        },
        isDragSupported: function () {
            return !0
        },
        isDropSupported: function () {
            return !0
        },
        isElementDraggable: function (a) {
            return a = jsPlumb.getElement(a), a._katavorioDrag && a._katavorioDrag.isEnabled()
        },
        getDragObject: function (a) {
            return a[0].drag.getDragElement()
        },
        getDragScope: function (a) {
            return a._katavorioDrag && a._katavorioDrag.scopes.join(" ") || ""
        },
        getDropEvent: function (a) {
            return a[0].e
        },
        getUIPosition: function (a) {
            var b = a[0].el, c = {left: a[0].pos[0], top: a[0].pos[1]};
            if (b._katavorioDrag && b.offsetParent !== this.getContainer()) {
                var d = this.getOffset(b.offsetParent);
                c.left += d.left, c.top += d.top
            }
            return c
        },
        setDragFilter: function (a, b, c) {
            a._katavorioDrag && a._katavorioDrag.setFilter(b, c)
        },
        setElementDraggable: function (a, b) {
            a = jsPlumb.getElement(a), a._katavorioDrag && a._katavorioDrag.setEnabled(b)
        },
        setDragScope: function (a, b) {
            a._katavorioDrag && a._katavorioDrag.k.setDragScope(a, b)
        },
        setDropScope: function (a, b) {
            a._katavorioDrop && a._katavorioDrop.length > 0 && a._katavorioDrop[0].k.setDropScope(a, b)
        },
        addToPosse: function (a) {
            var b = Array.prototype.slice.call(arguments, 1), c = f(this);
            jsPlumb.each(a, function (a) {
                a = [jsPlumb.getElement(a)], a.push.apply(a, b), c.addToPosse.apply(c, a)
            })
        },
        removeFromPosse: function (a) {
            var b = Array.prototype.slice.call(arguments, 1), c = f(this);
            jsPlumb.each(a, function (a) {
                a = [jsPlumb.getElement(a)], a.push.apply(a, b), c.removeFromPosse.apply(c, a)
            })
        },
        removeFromAllPosses: function (a) {
            var b = f(this);
            jsPlumb.each(a, function (a) {
                b.removeFromAllPosses(jsPlumb.getElement(a))
            })
        },
        dragEvents: {
            start: "start",
            stop: "stop",
            drag: "drag",
            step: "step",
            over: "over",
            out: "out",
            drop: "drop",
            complete: "complete",
            beforeStart: "beforeStart"
        },
        animEvents: {step: "step", complete: "complete"},
        stopDrag: function (a) {
            a._katavorioDrag && a._katavorioDrag.abort()
        },
        addToDragSelection: function (a) {
            f(this).select(a)
        },
        removeFromDragSelection: function (a) {
            f(this).deselect(a)
        },
        clearDragSelection: function () {
            f(this).deselectAll()
        },
        trigger: function (a, b, c, d) {
            this.getEventManager().trigger(a, b, c, d)
        },
        doReset: function () {
            for (var a in this)0 === a.indexOf("_katavorio_") && this[a].reset()
        }
    });
    var h = function (a) {
        var b = function () {
            /complete|loaded|interactive/.test(document.readyState) && "undefined" != typeof document.body && null != document.body ? a() : setTimeout(b, 9)
        };
        b()
    };
    h(b.init)
}.call(this);
