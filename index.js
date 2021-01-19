(function() {
    "undefined" == typeof Math.sgn && (Math.sgn = function(a) {
        return 0 == a ? 0 : a > 0 ? 1 : -1
    });
    var a = {
            subtract: function(a, b) {
                return {
                    x: a.x - b.x,
                    y: a.y - b.y
                }
            },
            dotProduct: function(a, b) {
                return a.x * b.x + a.y * b.y
            },
            square: function(a) {
                return Math.sqrt(a.x * a.x + a.y * a.y)
            },
            scale: function(a, b) {
                return {
                    x: a.x * b,
                    y: a.y * b
                }
            }
        },
        b = 64,
        c = Math.pow(2, -b - 1),
        d = function(b, c) {
            for (var d = [], e = f(b, c), h = c.length - 1, i = 2 * h - 1, j = g(e, i, d, 0), k = a.subtract(b, c[0]), m =
                    a.square(k), n = 0, o = 0; j > o; o++) {
                k = a.subtract(b, l(c, h, d[o], null, null));
                var p = a.square(k);
                m > p && (m = p, n = d[o])
            }
            return k = a.subtract(b, c[h]), p = a.square(k), m > p && (m = p, n = 1), {
                location: n,
                distance: m
            }
        },
        e = function(a, b) {
            var c = d(a, b);
            return {
                point: l(b, b.length - 1, c.location, null, null),
                location: c.location
            }
        },
        f = function(b, c) {
            for (var d = c.length - 1, e = 2 * d - 1, f = [], g = [], h = [], i = [], k = [
                    [1, .6, .3, .1],
                    [.4, .6, .6, .4],
                    [.1, .3, .6, 1]
                ], l = 0; d >= l; l++) f[l] = a.subtract(c[l], b);
            for (var l = 0; d - 1 >= l; l++) g[l] = a.subtract(c[l + 1], c[l]), g[l] = a.scale(g[l], 3);
            for (var m = 0; d - 1 >= m; m++)
                for (var n = 0; d >= n; n++) h[m] || (h[m] = []), h[m][n] = a.dotProduct(g[m], f[n]);
            for (l = 0; e >= l; l++) i[l] || (i[l] = []), i[l].y = 0, i[l].x = parseFloat(l) / e;
            for (var o = d, p = d - 1, q = 0; o + p >= q; q++) {
                var r = Math.max(0, q - p),
                    s = Math.min(q, o);
                for (l = r; s >= l; l++) j = q - l, i[l + j].y += h[j][l] * k[j][l]
            }
            return i
        },
        g = function(a, c, d, e) {
            var f, j, m = [],
                n = [],
                o = [],
                p = [];
            switch (h(a, c)) {
                case 0:
                    return 0;
                case 1:
                    if (e >= b) return d[0] = (a[0].x + a[c].x) / 2, 1;
                    if (i(a, c)) return d[0] = k(a, c), 1
            }
            l(a, c, .5, m, n), f = g(m, c, o, e + 1), j = g(n, c, p, e + 1);
            for (var q = 0; f > q; q++) d[q] = o[q];
            for (var q = 0; j > q; q++) d[q + f] = p[q];
            return f + j
        },
        h = function(a, b) {
            var c, d, e = 0;
            c = d = Math.sgn(a[0].y);
            for (var f = 1; b >= f; f++) c = Math.sgn(a[f].y), c != d && e++, d = c;
            return e
        },
        i = function(a, b) {
            var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
            i = a[0].y - a[b].y, j = a[b].x - a[0].x, k = a[0].x * a[b].y - a[b].x * a[0].y;
            for (var t = max_distance_below = 0, u = 1; b > u; u++) {
                var v = i * a[u].x + j * a[u].y + k;
                v > t ? t = v : v < max_distance_below && (max_distance_below = v)
            }
            return n = 0, o = 1, p = 0, q = i, r = j, s = k - t, l = n * r - q * o, m = 1 / l, e = (o * s - r * p) * m, q =
                i, r = j, s = k - max_distance_below, l = n * r - q * o, m = 1 / l, f = (o * s - r * p) * m, g = Math.min(e,
                    f), h = Math.max(e, f), d = h - g, c > d ? 1 : 0
        },
        k = function(a, b) {
            var c = 1,
                d = 0,
                e = a[b].x - a[0].x,
                f = a[b].y - a[0].y,
                g = a[0].x - 0,
                h = a[0].y - 0,
                i = e * d - f * c,
                j = 1 / i,
                k = (e * h - f * g) * j;
            return 0 + c * k
        },
        l = function(a, b, c, d, e) {
            for (var f = [
                    []
                ], g = 0; b >= g; g++) f[0][g] = a[g];
            for (var h = 1; b >= h; h++)
                for (var g = 0; b - h >= g; g++) f[h] || (f[h] = []), f[h][g] || (f[h][g] = {}), f[h][g].x = (1 - c) * f[h -
                    1][g].x + c * f[h - 1][g + 1].x, f[h][g].y = (1 - c) * f[h - 1][g].y + c * f[h - 1][g + 1].y;
            if (null != d)
                for (g = 0; b >= g; g++) d[g] = f[g][0];
            if (null != e)
                for (g = 0; b >= g; g++) e[g] = f[b - g][g];
            return f[b][0]
        },
        m = {},
        n = function(a) {
            var b = m[a];
            if (!b) {
                b = [];
                var c = function() {
                        return function(b) {
                            return Math.pow(b, a)
                        }
                    },
                    d = function() {
                        return function(b) {
                            return Math.pow(1 - b, a)
                        }
                    },
                    e = function(a) {
                        return function(b) {
                            return a
                        }
                    },
                    f = function() {
                        return function(a) {
                            return a
                        }
                    },
                    g = function() {
                        return function(a) {
                            return 1 - a
                        }
                    },
                    h = function(a) {
                        return function(b) {
                            for (var c = 1, d = 0; d < a.length; d++) c *= a[d](b);
                            return c
                        }
                    };
                b.push(new c);
                for (var i = 1; a > i; i++) {
                    for (var j = [new e(a)], k = 0; a - i > k; k++) j.push(new f);
                    for (var k = 0; i > k; k++) j.push(new g);
                    b.push(new h(j))
                }
                b.push(new d), m[a] = b
            }
            return b
        },
        o = function(a, b) {
            for (var c = n(a.length - 1), d = 0, e = 0, f = 0; f < a.length; f++) d += a[f].x * c[f](b), e += a[f].y * c[
                f](b);
            return {
                x: d,
                y: e
            }
        },
        p = function(a, b) {
            return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
        },
        q = function(a) {
            return a[0].x == a[1].x && a[0].y == a[1].y
        },
        r = function(a, b, c) {
            if (q(a)) return {
                point: a[0],
                location: b
            };
            for (var d = o(a, b), e = 0, f = b, g = c > 0 ? 1 : -1, h = null; e < Math.abs(c);) f += .005 * g, h = o(a, f),
                e += p(h, d), d = h;
            return {
                point: h,
                location: f
            }
        },
        s = function(a) {
            if (q(a)) return 0;
            for (var b = o(a, 0), c = 0, d = 0, e = 1, f = null; 1 > d;) d += .005 * e, f = o(a, d), c += p(f, b), b = f;
            return c
        },
        t = function(a, b, c) {
            return r(a, b, c).point
        },
        u = function(a, b, c) {
            return r(a, b, c).location
        },
        v = function(a, b) {
            var c = o(a, b),
                d = o(a.slice(0, a.length - 1), b),
                e = d.y - c.y,
                f = d.x - c.x;
            return 0 == e ? 1 / 0 : Math.atan(e / f)
        },
        w = function(a, b, c) {
            var d = r(a, b, c);
            return d.location > 1 && (d.location = 1), d.location < 0 && (d.location = 0), v(a, d.location)
        },
        x = function(a, b, c, d) {
            d = null == d ? 0 : d;
            var e = r(a, b, d),
                f = v(a, e.location),
                g = Math.atan(-1 / f),
                h = c / 2 * Math.sin(g),
                i = c / 2 * Math.cos(g);
            return [{
                x: e.point.x + i,
                y: e.point.y + h
            }, {
                x: e.point.x - i,
                y: e.point.y - h
            }]
        },
        y = this.jsBezier = {
            distanceFromCurve: d,
            gradientAtPoint: v,
            gradientAtPointAlongCurveFrom: w,
            nearestPointOnCurve: e,
            pointOnCurve: o,
            pointAlongCurveFrom: t,
            perpendicularToCurveAt: x,
            locationAlongCurveFrom: u,
            getLength: s,
            version: "0.9.0"
        };
    "undefined" != typeof exports && (exports.jsBezier = y)
}).call("undefined" != typeof window ? window : this),
    function() {
        "use strict";
        var a = this,
            b = a.Biltong = {
                version: "0.4.0"
            };
        "undefined" != typeof exports && (exports.Biltong = b);
        var c = function(a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            },
            d = function(a, b, d) {
                return a = c(a) ? a : [a.x, a.y], b = c(b) ? b : [b.x, b.y], d(a, b)
            },
            e = b.gradient = function(a, b) {
                return d(a, b, function(a, b) {
                    return b[0] == a[0] ? b[1] > a[1] ? 1 / 0 : -(1 / 0) : b[1] == a[1] ? b[0] > a[0] ? 0 : -0 : (b[1] - a[1]) /
                        (b[0] - a[0])
                })
            },
            f = (b.normal = function(a, b) {
                return -1 / e(a, b)
            }, b.lineLength = function(a, b) {
                return d(a, b, function(a, b) {
                    return Math.sqrt(Math.pow(b[1] - a[1], 2) + Math.pow(b[0] - a[0], 2))
                })
            }, b.quadrant = function(a, b) {
                return d(a, b, function(a, b) {
                    return b[0] > a[0] ? b[1] > a[1] ? 2 : 1 : b[0] == a[0] ? b[1] > a[1] ? 2 : 1 : b[1] > a[1] ? 3 : 4
                })
            }),
            g = (b.theta = function(a, b) {
                return d(a, b, function(a, b) {
                    var c = e(a, b),
                        d = Math.atan(c),
                        g = f(a, b);
                    return (4 == g || 3 == g) && (d += Math.PI), 0 > d && (d += 2 * Math.PI), d
                })
            }, b.intersects = function(a, b) {
                var c = a.x,
                    d = a.x + a.w,
                    e = a.y,
                    f = a.y + a.h,
                    g = b.x,
                    h = b.x + b.w,
                    i = b.y,
                    j = b.y + b.h;
                return g >= c && d >= g && i >= e && f >= i || h >= c && d >= h && i >= e && f >= i || g >= c && d >= g && j >=
                    e && f >= j || h >= c && d >= g && j >= e && f >= j || c >= g && h >= c && e >= i && j >= e || d >= g && h >=
                    d && e >= i && j >= e || c >= g && h >= c && f >= i && j >= f || d >= g && h >= c && f >= i && j >= f
            }, b.encloses = function(a, b, c) {
                var d = a.x,
                    e = a.x + a.w,
                    f = a.y,
                    g = a.y + a.h,
                    h = b.x,
                    i = b.x + b.w,
                    j = b.y,
                    k = b.y + b.h,
                    l = function(a, b, d, e) {
                        return c ? b >= a && d >= e : b > a && d > e
                    };
                return l(d, h, e, i) && l(f, j, g, k)
            }, [null, [1, -1],
                [1, 1],
                [-1, 1],
                [-1, -1]
            ]),
            h = [null, [-1, -1],
                [-1, 1],
                [1, 1],
                [1, -1]
            ];
        b.pointOnLine = function(a, b, c) {
            var d = e(a, b),
                i = f(a, b),
                j = c > 0 ? g[i] : h[i],
                k = Math.atan(d),
                l = Math.abs(c * Math.sin(k)) * j[1],
                m = Math.abs(c * Math.cos(k)) * j[0];
            return {
                x: a.x + m,
                y: a.y + l
            }
        }, b.perpendicularLineTo = function(a, b, c) {
            var d = e(a, b),
                f = Math.atan(-1 / d),
                g = c / 2 * Math.sin(f),
                h = c / 2 * Math.cos(f);
            return [{
                x: b.x + h,
                y: b.y + g
            }, {
                x: b.x - h,
                y: b.y - g
            }]
        }
    }.call("undefined" != typeof window ? window : this),
    function() {
        "use strict";

        function a(a, b, c, d, e, f, g, h) {
            return new Touch({
                target: b,
                identifier: J(),
                pageX: c,
                pageY: d,
                screenX: e,
                screenY: f,
                clientX: g || e,
                clientY: h || f
            })
        }

        function b() {
            var a = [];
            return Array.prototype.push.apply(a, arguments), a.item = function(a) {
                return this[a]
            }, a
        }

        function c(c, d, e, f, g, h, i, j) {
            return b(a.apply(null, arguments))
        }
        var d = this,
            e = function(a, b, c) {
                c = c || a.parentNode;
                for (var d = c.querySelectorAll(b), e = 0; e < d.length; e++)
                    if (d[e] === a) return !0;
                return !1
            },
            f = function(a) {
                return "string" == typeof a || a.constructor === String ? document.getElementById(a) : a
            },
            g = function(a) {
                return a.srcElement || a.target
            },
            h = function(a, b, c, d) {
                if (d) {
                    if ("undefined" != typeof a.path && a.path.indexOf) return {
                        path: a.path,
                        end: a.path.indexOf(c)
                    };
                    var e = {
                            path: [],
                            end: -1
                        },
                        f = function(a) {
                            e.path.push(a), a === c ? e.end = e.path.length - 1 : null != a.parentNode && f(a.parentNode)
                        };
                    return f(b), e
                }
                return {
                    path: [b],
                    end: 1
                }
            },
            i = function(a, b) {
                for (var c = 0, d = a.length; d > c && a[c] != b; c++);
                c < a.length && a.splice(c, 1)
            },
            j = 1,
            k = function(a, b, c) {
                var d = j++;
                return a.__ta = a.__ta || {}, a.__ta[b] = a.__ta[b] || {}, a.__ta[b][d] = c, c.__tauid = d, d
            },
            l = function(a, b, c) {
                if (a.__ta && a.__ta[b] && delete a.__ta[b][c.__tauid], c.__taExtra) {
                    for (var d = 0; d < c.__taExtra.length; d++) H(a, c.__taExtra[d][0], c.__taExtra[d][1]);
                    c.__taExtra.length = 0
                }
                c.__taUnstore && c.__taUnstore()
            },
            m = function(a, b, c, d) {
                if (null == a) return c;
                var f = a.split(","),
                    i = function(d) {
                        i.__tauid = c.__tauid;
                        var j = g(d),
                            k = j,
                            l = h(d, j, b, null != a);
                        if (-1 != l.end)
                            for (var m = 0; m < l.end; m++) {
                                k = l.path[m];
                                for (var n = 0; n < f.length; n++) e(k, f[n], b) && c.apply(k, arguments)
                            }
                    };
                return n(c, d, i), i
            },
            n = function(a, b, c) {
                a.__taExtra = a.__taExtra || [], a.__taExtra.push([b, c])
            },
            o = function(a, b, c, d) {
                if (u && w[b]) {
                    var e = m(d, a, c, w[b]);
                    G(a, w[b], e, c)
                }
                "focus" === b && null == a.getAttribute("tabindex") && a.setAttribute("tabindex", "1"), G(a, b, m(d, a, c, b),
                    c)
            },
            p = function(a, b, c, d) {
                if (null == a.__taSmartClicks) {
                    var e = function(b) {
                            a.__tad = A(b)
                        },
                        f = function(b) {
                            a.__tau = A(b)
                        },
                        h = function(b) {
                            if (a.__tad && a.__tau && a.__tad[0] === a.__tau[0] && a.__tad[1] === a.__tau[1])
                                for (var c = 0; c < a.__taSmartClicks.length; c++) a.__taSmartClicks[c].apply(g(b), [b])
                        };
                    o(a, "mousedown", e, d), o(a, "mouseup", f, d), o(a, "click", h, d), a.__taSmartClicks = []
                }
                a.__taSmartClicks.push(c), c.__taUnstore = function() {
                    i(a.__taSmartClicks, c)
                }
            },
            q = {
                tap: {
                    touches: 1,
                    taps: 1
                },
                dbltap: {
                    touches: 1,
                    taps: 2
                },
                contextmenu: {
                    touches: 2,
                    taps: 1
                }
            },
            r = function(a, b) {
                return function(c, d, f, j) {
                    if ("contextmenu" == d && v) o(c, d, f, j);
                    else {
                        if (null == c.__taTapHandler) {
                            var k = c.__taTapHandler = {
                                    tap: [],
                                    dbltap: [],
                                    contextmenu: [],
                                    down: !1,
                                    taps: 0,
                                    downSelectors: []
                                },
                                l = function(d) {
                                    for (var f = g(d), i = h(d, f, c, null != j), l = !1, m = 0; m < i.end; m++) {
                                        if (l) return;
                                        f = i.path[m];
                                        for (var o = 0; o < k.downSelectors.length; o++)
                                            if (null == k.downSelectors[o] || e(f, k.downSelectors[o], c)) {
                                                k.down = !0, setTimeout(n, a), setTimeout(p, b), l = !0;
                                                break
                                            }
                                    }
                                },
                                m = function(a) {
                                    if (k.down) {
                                        var b, d, f = g(a);
                                        k.taps++;
                                        var i = F(a);
                                        for (var j in q)
                                            if (q.hasOwnProperty(j)) {
                                                var l = q[j];
                                                if (l.touches === i && (1 === l.taps || l.taps === k.taps))
                                                    for (var m = 0; m < k[j].length; m++) {
                                                        d = h(a, f, c, null != k[j][m][1]);
                                                        for (var n = 0; n < d.end; n++)
                                                            if (b = d.path[n], null == k[j][m][1] || e(b, k[j][m][1], c)) {
                                                                k[j][m][0].apply(b, [a]);
                                                                break
                                                            }
                                                    }
                                            }
                                    }
                                },
                                n = function() {
                                    k.down = !1
                                },
                                p = function() {
                                    k.taps = 0
                                };
                            o(c, "mousedown", l), o(c, "mouseup", m)
                        }
                        c.__taTapHandler.downSelectors.push(j), c.__taTapHandler[d].push([f, j]), f.__taUnstore = function() {
                            i(c.__taTapHandler[d], f)
                        }
                    }
                }
            },
            s = function(a, b, c, d) {
                for (var e in c.__tamee[a]) c.__tamee[a].hasOwnProperty(e) && c.__tamee[a][e].apply(d, [b])
            },
            t = function() {
                var a = [];
                return function(b, c, d, f) {
                    if (!b.__tamee) {
                        b.__tamee = {
                            over: !1,
                            mouseenter: [],
                            mouseexit: []
                        };
                        var h = function(c) {
                                var d = g(c);
                                (null == f && d == b && !b.__tamee.over || e(d, f, b) && (null == d.__tamee || !d.__tamee.over)) && (s(
                                    "mouseenter", c, b, d), d.__tamee = d.__tamee || {}, d.__tamee.over = !0, a.push(d))
                            },
                            i = function(c) {
                                for (var d = g(c), f = 0; f < a.length; f++) d != a[f] || e(c.relatedTarget || c.toElement, "*", d) || (
                                    d.__tamee.over = !1, a.splice(f, 1), s("mouseexit", c, b, d))
                            };
                        G(b, "mouseover", m(f, b, h, "mouseover"), h), G(b, "mouseout", m(f, b, i, "mouseout"), i)
                    }
                    d.__taUnstore = function() {
                        delete b.__tamee[c][d.__tauid]
                    }, k(b, c, d), b.__tamee[c][d.__tauid] = d
                }
            },
            u = "ontouchstart" in document.documentElement,
            v = "onmousedown" in document.documentElement,
            w = {
                mousedown: "touchstart",
                mouseup: "touchend",
                mousemove: "touchmove"
            },
            x = function() {
                var a = -1;
                if ("Microsoft Internet Explorer" == navigator.appName) {
                    var b = navigator.userAgent,
                        c = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
                    null != c.exec(b) && (a = parseFloat(RegExp.$1))
                }
                return a
            }(),
            y = x > -1 && 9 > x,
            z = function(a, b) {
                if (null == a) return [0, 0];
                var c = E(a),
                    d = D(c, 0);
                return [d[b + "X"], d[b + "Y"]]
            },
            A = function(a) {
                return null == a ? [0, 0] : y ? [a.clientX + document.documentElement.scrollLeft, a.clientY + document.documentElement
                    .scrollTop
                ] : z(a, "page")
            },
            B = function(a) {
                return z(a, "screen")
            },
            C = function(a) {
                return z(a, "client")
            },
            D = function(a, b) {
                return a.item ? a.item(b) : a[b]
            },
            E = function(a) {
                return a.touches && a.touches.length > 0 ? a.touches : a.changedTouches && a.changedTouches.length > 0 ? a.changedTouches :
                    a.targetTouches && a.targetTouches.length > 0 ? a.targetTouches : [a]
            },
            F = function(a) {
                return E(a).length
            },
            G = function(a, b, c, d) {
                if (k(a, b, c), d.__tauid = c.__tauid, a.addEventListener) a.addEventListener(b, c, !1);
                else if (a.attachEvent) {
                    var e = b + c.__tauid;
                    a["e" + e] = c, a[e] = function() {
                        a["e" + e] && a["e" + e](window.event)
                    }, a.attachEvent("on" + b, a[e])
                }
            },
            H = function(a, b, c) {
                null != c && I(a, function() {
                    var d = f(this);
                    if (l(d, b, c), null != c.__tauid)
                        if (d.removeEventListener) d.removeEventListener(b, c, !1), u && w[b] && d.removeEventListener(w[b], c, !
                            1);
                        else if (this.detachEvent) {
                        var e = b + c.__tauid;
                        d[e] && d.detachEvent("on" + b, d[e]), d[e] = null, d["e" + e] = null
                    }
                    c.__taTouchProxy && H(a, c.__taTouchProxy[1], c.__taTouchProxy[0])
                })
            },
            I = function(a, b) {
                if (null != a) {
                    a = "undefined" != typeof Window && "unknown" != typeof a.top && a == a.top ? [a] : "string" != typeof a &&
                        null == a.tagName && null != a.length ? a : "string" == typeof a ? document.querySelectorAll(a) : [a];
                    for (var c = 0; c < a.length; c++) b.apply(a[c])
                }
            },
            J = function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
                    var b = 16 * Math.random() | 0,
                        c = "x" == a ? b : 3 & b | 8;
                    return c.toString(16)
                })
            };
        d.Mottle = function(a) {
            a = a || {};
            var b = a.clickThreshold || 250,
                d = a.dblClickThreshold || 450,
                e = new t,
                g = new r(b, d),
                h = a.smartClicks,
                i = function(a, b, c, d) {
                    null != c && I(a, function() {
                        var a = f(this);
                        h && "click" === b ? p(a, b, c, d) : "tap" === b || "dbltap" === b || "contextmenu" === b ? g(a, b, c, d) :
                            "mouseenter" === b || "mouseexit" == b ? e(a, b, c, d) : o(a, b, c, d)
                    })
                };
            this.remove = function(a) {
                return I(a, function() {
                    var a = f(this);
                    if (a.__ta)
                        for (var b in a.__ta)
                            if (a.__ta.hasOwnProperty(b))
                                for (var c in a.__ta[b]) a.__ta[b].hasOwnProperty(c) && H(a, b, a.__ta[b][c]);
                    a.parentNode && a.parentNode.removeChild(a)
                }), this
            }, this.on = function(a, b, c, d) {
                var e = arguments[0],
                    f = 4 == arguments.length ? arguments[2] : null,
                    g = arguments[1],
                    h = arguments[arguments.length - 1];
                return i(e, g, h, f), this
            }, this.off = function(a, b, c) {
                return H(a, b, c), this
            }, this.trigger = function(a, b, d, e) {
                var g = v && ("undefined" == typeof MouseEvent || null == d || d.constructor === MouseEvent),
                    h = u && !v && w[b] ? w[b] : b,
                    i = !(u && !v && w[b]),
                    j = A(d),
                    k = B(d),
                    l = C(d);
                return I(a, function() {
                    var a, m = f(this);
                    d = d || {
                        screenX: k[0],
                        screenY: k[1],
                        clientX: l[0],
                        clientY: l[1]
                    };
                    var n = function(a) {
                            e && (a.payload = e)
                        },
                        o = {
                            TouchEvent: function(a) {
                                var b = c(window, m, 0, j[0], j[1], k[0], k[1], l[0], l[1]),
                                    d = a.initTouchEvent || a.initEvent;
                                d(h, !0, !0, window, null, k[0], k[1], l[0], l[1], !1, !1, !1, !1, b, b, b, 1, 0)
                            },
                            MouseEvents: function(a) {
                                a.initMouseEvent(h, !0, !0, window, 0, k[0], k[1], l[0], l[1], !1, !1, !1, !1, 1, m)
                            }
                        };
                    if (document.createEvent) {
                        var p = !i && !g && u && w[b],
                            q = p ? "TouchEvent" : "MouseEvents";
                        a = document.createEvent(q), o[q](a), n(a), m.dispatchEvent(a)
                    } else document.createEventObject && (a = document.createEventObject(), a.eventType = a.eventName = h, a
                        .screenX = k[0], a.screenY = k[1], a.clientX = l[0], a.clientY = l[1], n(a), m.fireEvent("on" + h, a))
                }), this
            }
        }, d.Mottle.consume = function(a, b) {
            a.stopPropagation ? a.stopPropagation() : a.returnValue = !1, !b && a.preventDefault && a.preventDefault()
        }, d.Mottle.pageLocation = A, d.Mottle.setForceTouchEvents = function(a) {
            u = a
        }, d.Mottle.setForceMouseEvents = function(a) {
            v = a
        }, d.Mottle.version = "0.8.0", "undefined" != typeof exports && (exports.Mottle = d.Mottle)
    }.call("undefined" == typeof window ? this : window),
    function() {
        "use strict";
        var a = this,
            b = function(a, b, c) {
                return -1 === a.indexOf(b) ? (c ? a.unshift(b) : a.push(b), !0) : !1
            },
            c = function(a, b) {
                var c = a.indexOf(b); - 1 !== c && a.splice(c, 1)
            },
            d = function(a, b) {
                for (var c = [], d = 0; d < a.length; d++) - 1 === b.indexOf(a[d]) && c.push(a[d]);
                return c
            },
            e = function(a) {
                return null == a ? !1 : "string" == typeof a || a.constructor === String
            },
            f = function(a) {
                var b = a.getBoundingClientRect(),
                    c = document.body,
                    d = document.documentElement,
                    e = window.pageYOffset || d.scrollTop || c.scrollTop,
                    f = window.pageXOffset || d.scrollLeft || c.scrollLeft,
                    g = d.clientTop || c.clientTop || 0,
                    h = d.clientLeft || c.clientLeft || 0,
                    i = b.top + e - g,
                    j = b.left + f - h;
                return {
                    top: Math.round(i),
                    left: Math.round(j)
                }
            },
            g = function(a, b, c) {
                c = c || a.parentNode;
                for (var d = c.querySelectorAll(b), e = 0; e < d.length; e++)
                    if (d[e] === a) return !0;
                return !1
            },
            h = function(a, b, c) {
                if (g(b, c, a)) return b;
                for (var d = b.parentNode; null != d && d !== a;) {
                    if (g(d, c, a)) return d;
                    d = d.parentNode
                }
            },
            i = function() {
                var a = -1;
                if ("Microsoft Internet Explorer" === navigator.appName) {
                    var b = navigator.userAgent,
                        c = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
                    null != c.exec(b) && (a = parseFloat(RegExp.$1))
                }
                return a
            }(),
            j = 10,
            k = 10,
            l = i > -1 && 9 > i,
            m = 9 === i,
            n = function(a) {
                if (l) return [a.clientX + document.documentElement.scrollLeft, a.clientY + document.documentElement.scrollTop];
                var b = p(a),
                    c = o(b, 0);
                return m ? [c.pageX || c.clientX, c.pageY || c.clientY] : [c.pageX, c.pageY]
            },
            o = function(a, b) {
                return a.item ? a.item(b) : a[b]
            },
            p = function(a) {
                return a.touches && a.touches.length > 0 ? a.touches : a.changedTouches && a.changedTouches.length > 0 ? a.changedTouches :
                    a.targetTouches && a.targetTouches.length > 0 ? a.targetTouches : [a]
            },
            q = {
                draggable: "katavorio-draggable",
                droppable: "katavorio-droppable",
                drag: "katavorio-drag",
                selected: "katavorio-drag-selected",
                active: "katavorio-drag-active",
                hover: "katavorio-drag-hover",
                noSelect: "katavorio-drag-no-select",
                ghostProxy: "katavorio-ghost-proxy",
                clonedDrag: "katavorio-clone-drag"
            },
            r = "katavorio-drag-scope",
            s = ["stop", "start", "drag", "drop", "over", "out", "beforeStart"],
            t = function() {},
            u = function() {
                return !0
            },
            v = function(a, b, c) {
                for (var d = 0; d < a.length; d++) a[d] != c && b(a[d])
            },
            w = function(a, b, c, d) {
                v(a, function(a) {
                    a.setActive(b), b && a.updatePosition(), c && a.setHover(d, b)
                })
            },
            x = function(a, b) {
                if (null != a) {
                    a = e(a) || null != a.tagName || null == a.length ? [a] : a;
                    for (var c = 0; c < a.length; c++) b.apply(a[c], [a[c]])
                }
            },
            y = function(a) {
                a.stopPropagation ? (a.stopPropagation(), a.preventDefault()) : a.returnValue = !1
            },
            z = "input,textarea,select,button,option",
            A = function(a, b, c) {
                var d = a.srcElement || a.target;
                return !g(d, c.getInputFilterSelector(), b)
            },
            B = function(a, b, c, d) {
                this.params = b || {}, this.el = a, this.params.addClass(this.el, this._class), this.uuid = G();
                var e = !0;
                return this.setEnabled = function(a) {
                    e = a
                }, this.isEnabled = function() {
                    return e
                }, this.toggleEnabled = function() {
                    e = !e
                }, this.setScope = function(a) {
                    this.scopes = a ? a.split(/\s+/) : [d]
                }, this.addScope = function(a) {
                    var b = {};
                    x(this.scopes, function(a) {
                        b[a] = !0
                    }), x(a ? a.split(/\s+/) : [], function(a) {
                        b[a] = !0
                    }), this.scopes = [];
                    for (var c in b) this.scopes.push(c)
                }, this.removeScope = function(a) {
                    var b = {};
                    x(this.scopes, function(a) {
                        b[a] = !0
                    }), x(a ? a.split(/\s+/) : [], function(a) {
                        delete b[a]
                    }), this.scopes = [];
                    for (var c in b) this.scopes.push(c)
                }, this.toggleScope = function(a) {
                    var b = {};
                    x(this.scopes, function(a) {
                        b[a] = !0
                    }), x(a ? a.split(/\s+/) : [], function(a) {
                        b[a] ? delete b[a] : b[a] = !0
                    }), this.scopes = [];
                    for (var c in b) this.scopes.push(c)
                }, this.setScope(b.scope), this.k = b.katavorio, b.katavorio
            },
            C = function() {
                return !0
            },
            D = function() {
                return !1
            },
            E = function(a, b, c, d) {
                this._class = c.draggable;
                var i = B.apply(this, arguments);
                this.rightButtonCanDrag = this.params.rightButtonCanDrag;
                var l = [0, 0],
                    m = null,
                    o = null,
                    p = [0, 0],
                    r = !1,
                    s = this.params.consumeStartEvent !== !1,
                    t = this.el,
                    v = this.params.clone,
                    x = (this.params.scroll, b.multipleDrop !== !1),
                    z = !1,
                    E = b.ghostProxy === !0 ? C : b.ghostProxy && "function" == typeof b.ghostProxy ? b.ghostProxy : D,
                    F = function(a) {
                        return a.cloneNode(!0)
                    },
                    I = b.selector,
                    J = null,
                    K = b.snapThreshold,
                    L = function(a, b, c, d, e) {
                        var f = Math.floor(a[0] / b),
                            g = b * f,
                            h = g + b,
                            i = Math.abs(a[0] - g) <= d ? g : Math.abs(h - a[0]) <= d ? h : a[0],
                            j = Math.floor(a[1] / c),
                            k = c * j,
                            l = k + c,
                            m = Math.abs(a[1] - k) <= e ? k : Math.abs(l - a[1]) <= e ? l : a[1];
                        return [i, m]
                    };
                this.posses = [], this.posseRoles = {}, this.toGrid = function(a) {
                    if (null == this.params.grid) return a;
                    var b = this.params.grid ? this.params.grid[0] / 2 : K ? K : j / 2,
                        c = this.params.grid ? this.params.grid[1] / 2 : K ? K : k / 2;
                    return L(a, this.params.grid[0], this.params.grid[1], b, c)
                }, this.snap = function(a, b) {
                    if (null != t) {
                        a = a || (this.params.grid ? this.params.grid[0] : j), b = b || (this.params.grid ? this.params.grid[1] :
                            k);
                        var c = this.params.getPosition(t),
                            d = this.params.grid ? this.params.grid[0] / 2 : K,
                            e = this.params.grid ? this.params.grid[1] / 2 : K;
                        this.params.setPosition(t, L(c, a, b, d, e))
                    }
                }, this.setUseGhostProxy = function(a) {
                    E = a ? C : D
                };
                var M, N = function(a) {
                        return b.allowNegative === !1 ? [Math.max(0, a[0]), Math.max(0, a[1])] : a
                    },
                    O = function(a) {
                        M = "function" == typeof a ? a : a ? function(a, b, c, d) {
                            return N([Math.max(0, Math.min(c.w - d[0], a[0])), Math.max(0, Math.min(c.h - d[1], a[1]))])
                        }.bind(this) : function(a) {
                            return N(a)
                        }
                    }.bind(this);
                O("function" == typeof this.params.constrain ? this.params.constrain : this.params.constrain || this.params.containment),
                    this.setConstrain = function(a) {
                        O(a)
                    };
                var P;
                this.setRevert = function(a) {
                    P = a
                };
                var Q = function(a) {
                        return "function" == typeof a ? (a._katavorioId = G(), a._katavorioId) : a
                    },
                    R = {},
                    S = function(a) {
                        for (var b in R) {
                            var c = R[b],
                                d = c[0](a);
                            if (c[1] && (d = !d), !d) return !1
                        }
                        return !0
                    },
                    T = this.setFilter = function(b, c) {
                        if (b) {
                            var d = Q(b);
                            R[d] = [function(c) {
                                var d, f = c.srcElement || c.target;
                                return e(b) ? d = g(f, b, a) : "function" == typeof b && (d = b(c, a)), d
                            }, c !== !1]
                        }
                    };
                this.addFilter = T, this.removeFilter = function(a) {
                    var b = "function" == typeof a ? a._katavorioId : a;
                    delete R[b]
                };
                this.clearAllFilters = function() {
                    R = {}
                }, this.canDrag = this.params.canDrag || u;
                var U, V = [],
                    W = [];
                this.downListener = function(a) {
                    var b = this.rightButtonCanDrag || 3 !== a.which && 2 !== a.button;
                    if (b && this.isEnabled() && this.canDrag()) {
                        var d = S(a) && A(a, this.el, this.k);
                        if (d) {
                            if (I) {
                                if (J = h(this.el, a.target || a.srcElement, I), null == J) return
                            } else J = this.el;
                            if (v)
                                if (t = J.cloneNode(!0), this.params.addClass(t, q.clonedDrag), t.setAttribute("id", null), t.style.position =
                                    "absolute", null != this.params.parent) {
                                    var e = this.params.getPosition(this.el);
                                    t.style.left = e[0] + "px", t.style.top = e[1] + "px", this.params.parent.appendChild(t)
                                } else {
                                    var g = f(J);
                                    t.style.left = g.left + "px", t.style.top = g.top + "px", document.body.appendChild(t)
                                }
                            else t = J;
                            s && y(a), l = n(a), this.params.bind(document, "mousemove", this.moveListener), this.params.bind(
                                document, "mouseup", this.upListener), i.markSelection(this), i.markPosses(this), this.params.addClass(
                                document.body, c.noSelect), Y("beforeStart", {
                                el: this.el,
                                pos: m,
                                e: a,
                                drag: this
                            })
                        } else this.params.consumeFilteredEvents && y(a)
                    }
                }.bind(this), this.moveListener = function(a) {
                    if (l) {
                        if (!r) {
                            var b = Y("start", {
                                el: this.el,
                                pos: m,
                                e: a,
                                drag: this
                            });
                            if (b !== !1) {
                                if (!l) return;
                                this.mark(!0), r = !0
                            } else this.abort()
                        }
                        if (l) {
                            W.length = 0;
                            var c = n(a),
                                d = c[0] - l[0],
                                e = c[1] - l[1],
                                f = this.params.ignoreZoom ? 1 : i.getZoom();
                            d /= f, e /= f, this.moveBy(d, e, a), i.updateSelection(d, e, this), i.updatePosses(d, e, this)
                        }
                    }
                }.bind(this), this.upListener = function(a) {
                    l && (l = null, this.params.unbind(document, "mousemove", this.moveListener), this.params.unbind(document,
                            "mouseup", this.upListener), this.params.removeClass(document.body, c.noSelect), this.unmark(a), i.unmarkSelection(
                            this, a), i.unmarkPosses(this, a), this.stop(a), i.notifySelectionDragStop(this, a), i.notifyPosseDragStop(
                            this, a), r = !1, v && (t && t.parentNode && t.parentNode.removeChild(t), t = null), W.length = 0, P &&
                        P(this.el, this.params.getPosition(this.el)) === !0 && (this.params.setPosition(this.el, m), Y("revert",
                            this.el)))
                }.bind(this), this.getFilters = function() {
                    return R
                }, this.abort = function() {
                    null != l && this.upListener()
                }, this.getDragElement = function(a) {
                    return a ? J || this.el : t || this.el
                };
                var X = {
                    start: [],
                    drag: [],
                    stop: [],
                    over: [],
                    out: [],
                    beforeStart: [],
                    revert: []
                };
                b.events.start && X.start.push(b.events.start), b.events.beforeStart && X.beforeStart.push(b.events.beforeStart),
                    b.events.stop && X.stop.push(b.events.stop), b.events.drag && X.drag.push(b.events.drag), b.events.revert &&
                    X.revert.push(b.events.revert), this.on = function(a, b) {
                        X[a] && X[a].push(b)
                    }, this.off = function(a, b) {
                        if (X[a]) {
                            for (var c = [], d = 0; d < X[a].length; d++) X[a][d] !== b && c.push(X[a][d]);
                            X[a] = c
                        }
                    };
                var Y = function(a, b) {
                    var c = null;
                    if (X[a])
                        for (var d = 0; d < X[a].length; d++) try {
                            var e = X[a][d](b);
                            null != e && (c = e)
                        } catch (f) {}
                    return c
                };
                this.notifyStart = function(a) {
                    Y("start", {
                        el: this.el,
                        pos: this.params.getPosition(t),
                        e: a,
                        drag: this
                    })
                }, this.stop = function(a, b) {
                    if (b || r) {
                        var c = [],
                            d = i.getSelection(),
                            e = this.params.getPosition(t);
                        if (d.length > 1)
                            for (var f = 0; f < d.length; f++) {
                                var g = this.params.getPosition(d[f].el);
                                c.push([d[f].el, {
                                    left: g[0],
                                    top: g[1]
                                }, d[f]])
                            } else c.push([t, {
                                left: e[0],
                                top: e[1]
                            }, this]);
                        Y("stop", {
                            el: t,
                            pos: Z || e,
                            finalPos: e,
                            e: a,
                            drag: this,
                            selection: c
                        })
                    }
                }, this.mark = function(a) {
                    m = this.params.getPosition(t), o = this.params.getPosition(t, !0), p = [o[0] - m[0], o[1] - m[1]], this.size =
                        this.params.getSize(t), V = i.getMatchingDroppables(this), w(V, !0, !1, this), this.params.addClass(t,
                            this.params.dragClass || c.drag);
                    var b;
                    b = this.params.getConstrainingRectangle ? this.params.getConstrainingRectangle(t) : this.params.getSize(t.parentNode),
                        U = {
                            w: b[0],
                            h: b[1]
                        }, a && i.notifySelectionDragStart(this)
                };
                var Z;
                this.unmark = function(a, d) {
                        if (w(V, !1, !0, this), z && E(J) ? (Z = [t.offsetLeft, t.offsetTop], J.parentNode.removeChild(t), t = J) :
                            Z = null, this.params.removeClass(t, this.params.dragClass || c.drag), V.length = 0, z = !1, !d) {
                            W.length > 0 && Z && b.setPosition(J, Z), W.sort(H);
                            for (var e = 0; e < W.length; e++) {
                                var f = W[e].drop(this, a);
                                if (f === !0) break
                            }
                        }
                    }, this.moveBy = function(a, c, d) {
                        W.length = 0;
                        var e = this.toGrid([m[0] + a, m[1] + c]),
                            f = M(e, t, U, this.size);
                        if (E(this.el))
                            if (e[0] !== f[0] || e[1] !== f[1]) {
                                if (!z) {
                                    var g = F(J);
                                    b.addClass(g, q.ghostProxy), J.parentNode.appendChild(g), t = g, z = !0
                                }
                                f = e
                            } else z && (J.parentNode.removeChild(t), t = J, z = !1);
                        var h = {
                                x: f[0],
                                y: f[1],
                                w: this.size[0],
                                h: this.size[1]
                            },
                            i = {
                                x: h.x + p[0],
                                y: h.y + p[1],
                                w: h.w,
                                h: h.h
                            },
                            j = null;
                        this.params.setPosition(t, f);
                        for (var k = 0; k < V.length; k++) {
                            var l = {
                                x: V[k].pagePosition[0],
                                y: V[k].pagePosition[1],
                                w: V[k].size[0],
                                h: V[k].size[1]
                            };
                            this.params.intersects(i, l) && (x || null == j || j === V[k].el) && V[k].canDrop(this) ? (j || (j = V[k].el),
                                W.push(V[k]), V[k].setHover(this, !0, d)) : V[k].isHover() && V[k].setHover(this, !1, d)
                        }
                        Y("drag", {
                            el: this.el,
                            pos: f,
                            e: d,
                            drag: this
                        })
                    }, this.destroy = function() {
                        this.params.unbind(this.el, "mousedown", this.downListener), this.params.unbind(document, "mousemove", this
                                .moveListener), this.params.unbind(document, "mouseup", this.upListener), this.downListener = null, this.upListener =
                            null, this.moveListener = null
                    }, this.params.bind(this.el, "mousedown", this.downListener), this.params.handle ? T(this.params.handle, !1) :
                    T(this.params.filter, this.params.filterExclude)
            },
            F = function(a, b, c, d) {
                this._class = c.droppable, this.params = b || {}, this.rank = b.rank || 0, this._activeClass = this.params.activeClass ||
                    c.active, this._hoverClass = this.params.hoverClass || c.hover, B.apply(this, arguments);
                var e = !1;
                this.allowLoopback = this.params.allowLoopback !== !1, this.setActive = function(a) {
                    this.params[a ? "addClass" : "removeClass"](this.el, this._activeClass)
                }, this.updatePosition = function() {
                    this.position = this.params.getPosition(this.el), this.pagePosition = this.params.getPosition(this.el, !0),
                        this.size = this.params.getSize(this.el)
                }, this.canDrop = this.params.canDrop || function(a) {
                    return !0
                }, this.isHover = function() {
                    return e
                }, this.setHover = function(a, b, c) {
                    (b || null == this.el._katavorioDragHover || this.el._katavorioDragHover === a.el._katavorio) && (this.params[
                            b ? "addClass" : "removeClass"](this.el, this._hoverClass), this.el._katavorioDragHover = b ? a.el._katavorio :
                        null, e !== b && this.params.events[b ? "over" : "out"]({
                            el: this.el,
                            e: c,
                            drag: a,
                            drop: this
                        }), e = b)
                }, this.drop = function(a, b) {
                    return this.params.events.drop({
                        drag: a,
                        e: b,
                        drop: this
                    })
                }, this.destroy = function() {
                    this._class = null, this._activeClass = null, this._hoverClass = null, e = null
                }
            },
            G = function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
                    var b = 16 * Math.random() | 0,
                        c = "x" === a ? b : 3 & b | 8;
                    return c.toString(16)
                })
            },
            H = function(a, b) {
                return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : 0
            },
            I = function(a) {
                return null == a ? null : (a = "string" == typeof a || a.constructor === String ? document.getElementById(a) :
                    a, null == a ? null : (a._katavorio = a._katavorio || G(), a))
            };
        a.Katavorio = function(a) {
                var f = [],
                    g = {};
                this._dragsByScope = {}, this._dropsByScope = {};
                var h = 1,
                    i = function(a, b) {
                        x(a, function(a) {
                            for (var c = 0; c < a.scopes.length; c++) b[a.scopes[c]] = b[a.scopes[c]] || [], b[a.scopes[c]].push(a)
                        })
                    },
                    j = function(b, c) {
                        var d = 0;
                        return x(b, function(b) {
                            for (var e = 0; e < b.scopes.length; e++)
                                if (c[b.scopes[e]]) {
                                    var f = a.indexOf(c[b.scopes[e]], b); - 1 !== f && (c[b.scopes[e]].splice(f, 1), d++)
                                }
                        }), d > 0
                    },
                    k = (this.getMatchingDroppables = function(a) {
                        for (var b = [], c = {}, d = 0; d < a.scopes.length; d++) {
                            var e = this._dropsByScope[a.scopes[d]];
                            if (e)
                                for (var f = 0; f < e.length; f++) !e[f].canDrop(a) || c[e[f].uuid] || !e[f].allowLoopback && e[f].el ===
                                    a.el || (c[e[f].uuid] = !0, b.push(e[f]))
                        }
                        return b.sort(H), b
                    }, function(b) {
                        b = b || {};
                        var c, d = {
                            events: {}
                        };
                        for (c in a) d[c] = a[c];
                        for (c in b) d[c] = b[c];
                        for (c = 0; c < s.length; c++) d.events[s[c]] = b[s[c]] || t;
                        return d.katavorio = this, d
                    }.bind(this)),
                    l = function(a, b) {
                        for (var c = 0; c < s.length; c++) b[s[c]] && a.on(s[c], b[s[c]])
                    }.bind(this),
                    m = {},
                    n = a.css || {},
                    o = a.scope || r;
                for (var p in q) m[p] = q[p];
                for (var p in n) m[p] = n[p];
                var u = a.inputFilterSelector || z;
                this.getInputFilterSelector = function() {
                    return u
                }, this.setInputFilterSelector = function(a) {
                    return u = a, this
                }, this.draggable = function(b, c) {
                    var d = [];
                    return x(b, function(b) {
                        if (b = I(b), null != b)
                            if (null == b._katavorioDrag) {
                                var e = k(c);
                                b._katavorioDrag = new E(b, e, m, o), i(b._katavorioDrag, this._dragsByScope), d.push(b._katavorioDrag),
                                    a.addClass(b, m.draggable)
                            } else l(b._katavorioDrag, c)
                    }.bind(this)), d
                }, this.droppable = function(b, c) {
                    var d = [];
                    return x(b, function(b) {
                        if (b = I(b), null != b) {
                            var e = new F(b, k(c), m, o);
                            b._katavorioDrop = b._katavorioDrop || [], b._katavorioDrop.push(e), i(e, this._dropsByScope), d.push(e),
                                a.addClass(b, m.droppable)
                        }
                    }.bind(this)), d
                }, this.select = function(b) {
                    return x(b, function() {
                        var b = I(this);
                        b && b._katavorioDrag && (g[b._katavorio] || (f.push(b._katavorioDrag), g[b._katavorio] = [b, f.length -
                            1
                        ], a.addClass(b, m.selected)))
                    }), this
                }, this.deselect = function(b) {
                    return x(b, function() {
                        var b = I(this);
                        if (b && b._katavorio) {
                            var c = g[b._katavorio];
                            if (c) {
                                for (var d = [], e = 0; e < f.length; e++) f[e].el !== b && d.push(f[e]);
                                f = d, delete g[b._katavorio], a.removeClass(b, m.selected)
                            }
                        }
                    }), this
                }, this.deselectAll = function() {
                    for (var b in g) {
                        var c = g[b];
                        a.removeClass(c[0], m.selected)
                    }
                    f.length = 0, g = {}
                }, this.markSelection = function(a) {
                    v(f, function(a) {
                        a.mark()
                    }, a)
                }, this.markPosses = function(a) {
                    a.posses && x(a.posses, function(b) {
                        a.posseRoles[b] && C[b] && v(C[b].members, function(a) {
                            a.mark()
                        }, a)
                    })
                }, this.unmarkSelection = function(a, b) {
                    v(f, function(a) {
                        a.unmark(b)
                    }, a)
                }, this.unmarkPosses = function(a, b) {
                    a.posses && x(a.posses, function(c) {
                        a.posseRoles[c] && C[c] && v(C[c].members, function(a) {
                            a.unmark(b, !0)
                        }, a)
                    })
                }, this.getSelection = function() {
                    return f.slice(0)
                }, this.updateSelection = function(a, b, c) {
                    v(f, function(c) {
                        c.moveBy(a, b)
                    }, c)
                };
                var w = function(a, b) {
                    b.posses && x(b.posses, function(c) {
                        b.posseRoles[c] && C[c] && v(C[c].members, function(b) {
                            a(b)
                        }, b)
                    })
                };
                this.updatePosses = function(a, b, c) {
                    w(function(c) {
                        c.moveBy(a, b)
                    }, c)
                }, this.notifyPosseDragStop = function(a, b) {
                    w(function(a) {
                        a.stop(b, !0)
                    }, a)
                }, this.notifySelectionDragStop = function(a, b) {
                    v(f, function(a) {
                        a.stop(b, !0)
                    }, a)
                }, this.notifySelectionDragStart = function(a, b) {
                    v(f, function(a) {
                        a.notifyStart(b)
                    }, a)
                }, this.setZoom = function(a) {
                    h = a
                }, this.getZoom = function() {
                    return h
                };
                var y = function(a, b, c, d) {
                    x(a, function(a) {
                        j(a, c), a[d](b), i(a, c)
                    })
                };
                x(["set", "add", "remove", "toggle"], function(a) {
                    this[a + "Scope"] = function(b, c) {
                        y(b._katavorioDrag, c, this._dragsByScope, a + "Scope"), y(b._katavorioDrop, c, this._dropsByScope, a +
                            "Scope")
                    }.bind(this), this[a + "DragScope"] = function(b, c) {
                        y(b.constructor === E ? b : b._katavorioDrag, c, this._dragsByScope, a + "Scope")
                    }.bind(this), this[a + "DropScope"] = function(b, c) {
                        y(b.constructor === F ? b : b._katavorioDrop, c, this._dropsByScope, a + "Scope")
                    }.bind(this)
                }.bind(this)), this.snapToGrid = function(a, b) {
                    for (var c in this._dragsByScope) v(this._dragsByScope[c], function(c) {
                        c.snap(a, b)
                    })
                }, this.getDragsForScope = function(a) {
                    return this._dragsByScope[a]
                }, this.getDropsForScope = function(a) {
                    return this._dropsByScope[a]
                };
                var A = function(a, b, c) {
                        if (a = I(a), a[b]) {
                            var d = f.indexOf(a[b]);
                            d >= 0 && f.splice(d, 1), j(a[b], c) && x(a[b], function(a) {
                                a.destroy()
                            }), delete a[b]
                        }
                    },
                    B = function(a, b, c, d) {
                        a = I(a), a[b] && a[b].off(c, d)
                    };
                this.elementRemoved = function(a) {
                    this.destroyDraggable(a), this.destroyDroppable(a)
                }, this.destroyDraggable = function(a, b, c) {
                    1 === arguments.length ? A(a, "_katavorioDrag", this._dragsByScope) : B(a, "_katavorioDrag", b, c)
                }, this.destroyDroppable = function(a, b, c) {
                    1 === arguments.length ? A(a, "_katavorioDrop", this._dropsByScope) : B(a, "_katavorioDrop", b, c)
                }, this.reset = function() {
                    this._dragsByScope = {}, this._dropsByScope = {}, f = [], g = {}, C = {}
                };
                var C = {},
                    D = function(a, c, d) {
                        var f = e(c) ? c : c.id,
                            g = e(c) ? !0 : c.active !== !1,
                            h = C[f] || function() {
                                var a = {
                                    name: f,
                                    members: []
                                };
                                return C[f] = a, a
                            }();
                        return x(a, function(a) {
                            if (a._katavorioDrag) {
                                if (d && null != a._katavorioDrag.posseRoles[h.name]) return;
                                b(h.members, a._katavorioDrag), b(a._katavorioDrag.posses, h.name), a._katavorioDrag.posseRoles[h.name] =
                                    g
                            }
                        }), h
                    };
                this.addToPosse = function(a, b) {
                    for (var c = [], d = 1; d < arguments.length; d++) c.push(D(a, arguments[d]));
                    return 1 === c.length ? c[0] : c
                }, this.setPosse = function(a, b) {
                    for (var c = [], e = 1; e < arguments.length; e++) c.push(D(a, arguments[e], !0).name);
                    return x(a, function(a) {
                        if (a._katavorioDrag) {
                            var b = d(a._katavorioDrag.posses, c),
                                e = [];
                            Array.prototype.push.apply(e, a._katavorioDrag.posses);
                            for (var f = 0; f < b.length; f++) this.removeFromPosse(a, b[f])
                        }
                    }.bind(this)), 1 === c.length ? c[0] : c
                }, this.removeFromPosse = function(a, b) {
                    if (arguments.length < 2) throw new TypeError("No posse id provided for remove operation");
                    for (var d = 1; d < arguments.length; d++) b = arguments[d], x(a, function(a) {
                        if (a._katavorioDrag && a._katavorioDrag.posses) {
                            var d = a._katavorioDrag;
                            x(b, function(a) {
                                c(C[a].members, d), c(d.posses, a), delete d.posseRoles[a]
                            })
                        }
                    })
                }, this.removeFromAllPosses = function(a) {
                    x(a, function(a) {
                        if (a._katavorioDrag && a._katavorioDrag.posses) {
                            var b = a._katavorioDrag;
                            x(b.posses, function(a) {
                                c(C[a].members, b)
                            }), b.posses.length = 0, b.posseRoles = {}
                        }
                    })
                }, this.setPosseState = function(a, b, c) {
                    var d = C[b];
                    d && x(a, function(a) {
                        a._katavorioDrag && a._katavorioDrag.posses && (a._katavorioDrag.posseRoles[d.name] = c)
                    })
                }
            },
            a.Katavorio.version = "1.0.0", "undefined" != typeof exports && (exports.Katavorio = a.Katavorio)
    }.call("undefined" != typeof window ? window : this),
    function() {
        "use strict";

        function a(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        }

        function b(a) {
            return "[object Number]" === Object.prototype.toString.call(a)
        }

        function c(a) {
            return "string" == typeof a
        }

        function d(a) {
            return "boolean" == typeof a
        }

        function e(a) {
            return null == a
        }

        function f(a) {
            return null == a ? !1 : "[object Object]" === Object.prototype.toString.call(a)
        }

        function g(a) {
            return "[object Date]" === Object.prototype.toString.call(a)
        }

        function h(a) {
            return "[object Function]" === Object.prototype.toString.call(a)
        }

        function i(a) {
            return h(a) && null != a.name && a.name.length > 0
        }

        function j(a) {
            for (var b in a)
                if (a.hasOwnProperty(b)) return !1;
            return !0
        }

        function k(b) {
            if (c(b)) return "" + b;
            if (d(b)) return !!b;
            if (g(b)) return new Date(b.getTime());
            if (h(b)) return b;
            if (a(b)) {
                for (var e = [], i = 0; i < b.length; i++) e.push(k(b[i]));
                return e
            }
            if (f(b)) {
                var j = {};
                for (var l in b) j[l] = k(b[l]);
                return j
            }
            return b
        }

        function l(b, e, g) {
            var h, i, j = {};
            for (g = g || [], i = 0; i < g.length; i++) j[g[i]] = !0;
            var l = k(b);
            for (i in e)
                if (null == l[i]) l[i] = e[i];
                else if (c(e[i]) || d(e[i])) j[i] ? (h = [], h.push.apply(h, a(l[i]) ? l[i] : [l[i]]), h.push.apply(h, d(e[i]) ?
                e[i] : [e[i]]), l[i] = h) : l[i] = e[i];
            else if (a(e[i])) h = [], a(l[i]) && h.push.apply(h, l[i]), h.push.apply(h, e[i]), l[i] = h;
            else if (f(e[i])) {
                f(l[i]) || (l[i] = {});
                for (var m in e[i]) l[i][m] = e[i][m]
            }
            return l
        }

        function m(a, b, c) {
            if (null != a) {
                var d = a,
                    e = d;
                return b.replace(/([^\.])+/g, function(a, b, d, f) {
                    var g = a.match(/([^\[0-9]+){1}(\[)([0-9+])/),
                        h = d + a.length >= f.length,
                        i = function() {
                            return e[g[1]] || function() {
                                return e[g[1]] = [], e[g[1]]
                            }()
                        };
                    if (h) g ? i()[g[3]] = c : e[a] = c;
                    else if (g) {
                        var j = i();
                        e = j[g[3]] || function() {
                            return j[g[3]] = {}, j[g[3]]
                        }()
                    } else e = e[a] || function() {
                        return e[a] = {}, e[a]
                    }();
                    return ""
                }), a
            }
        }

        function n(a, b, c) {
            for (var d = 0; d < c.length; d++) {
                var e = c[d][0][c[d][1]].apply(c[d][0], c[d][2]);
                if (e === b) return e
            }
            return a
        }

        function o(b, d, e, g) {
            var i = function(a) {
                    var b = a.match(/(\${.*?})/g);
                    if (null != b)
                        for (var c = 0; c < b.length; c++) {
                            var e = d[b[c].substring(2, b[c].length - 1)] || "";
                            null != e && (a = a.replace(b[c], e))
                        }
                    return a
                },
                j = function(b) {
                    if (null != b) {
                        if (c(b)) return i(b);
                        if (!h(b) || g || null != e && 0 !== (b.name || "").indexOf(e)) {
                            if (a(b)) {
                                for (var k = [], l = 0; l < b.length; l++) k.push(j(b[l]));
                                return k
                            }
                            if (f(b)) {
                                var m = {};
                                for (var n in b) m[n] = j(b[n]);
                                return m
                            }
                            return b
                        }
                        return b(d)
                    }
                };
            return j(b)
        }

        function p(a, b) {
            if (a)
                for (var c = 0; c < a.length; c++)
                    if (b(a[c])) return c;
            return -1
        }

        function q(a, b) {
            var c = p(a, b);
            return c > -1 && a.splice(c, 1), -1 !== c
        }

        function r(a, b) {
            var c = a.indexOf(b);
            return c > -1 && a.splice(c, 1), -1 !== c
        }

        function s(a, b, c) {
            -1 === p(a, c) && a.push(b)
        }

        function t(a, b, c, d) {
            var e = a[b];
            return null == e && (e = [], a[b] = e), e[d ? "unshift" : "push"](c), e
        }

        function u(a, b, c) {
            return -1 === a.indexOf(b) ? (c ? a.unshift(b) : a.push(b), !0) : !1
        }

        function v(b, c, d) {
            var e;
            c = a(c) ? c : [c];
            var f = function(a) {
                for (var c = a.__proto__; null != c;)
                    if (null != c.prototype) {
                        for (var d in c.prototype) c.prototype.hasOwnProperty(d) && !b.prototype.hasOwnProperty(d) && (b.prototype[
                            d] = c.prototype[d]);
                        c = c.prototype.__proto__
                    } else c = null
            };
            for (e = 0; e < c.length; e++) {
                for (var g in c[e].prototype) c[e].prototype.hasOwnProperty(g) && !b.prototype.hasOwnProperty(g) && (b.prototype[
                    g] = c[e].prototype[g]);
                f(c[e])
            }
            var h = function(a, b) {
                    return function() {
                        for (e = 0; e < c.length; e++) c[e].prototype[a] && c[e].prototype[a].apply(this, arguments);
                        return b.apply(this, arguments)
                    }
                },
                i = function(a) {
                    for (var c in a) b.prototype[c] = h(c, a[c])
                };
            if (arguments.length > 2)
                for (e = 2; e < arguments.length; e++) i(arguments[e]);
            return b
        }

        function w() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
                var b = 16 * Math.random() | 0,
                    c = "x" === a ? b : 3 & b | 8;
                return c.toString(16)
            })
        }

        function x(a) {
            if (null == a) return null;
            for (var b = a.replace(/^\s\s*/, ""), c = /\s/, d = b.length; c.test(b.charAt(--d)););
            return b.slice(0, d + 1)
        }

        function y(a, b) {
            a = null == a.length || "string" == typeof a ? [a] : a;
            for (var c = 0; c < a.length; c++) b(a[c])
        }

        function z(a, b) {
            for (var c = [], d = 0; d < a.length; d++) c.push(b(a[d]));
            return c
        }

        function A(a, b, c) {
            c = c || "parent";
            var d = function(a) {
                    return a ? b[a] : null
                },
                e = function(a) {
                    return a ? d(a[c]) : null
                },
                f = function(a, b) {
                    if (null == a) return b;
                    var c = l(a, b);
                    return f(e(a), c)
                },
                g = function(a) {
                    if (null == a) return {};
                    if ("string" == typeof a) return d(a);
                    if (a.length) {
                        for (var b = !1, c = 0, e = void 0; !b && c < a.length;) e = g(a[c]), e ? b = !0 : c++;
                        return e
                    }
                },
                h = g(a);
            return h ? f(e(h), h) : {}
        }

        function B() {
            for (var a = [], b = 0; b < arguments.length; b++) a[b] = arguments[b];
            if (F && "undefined" != typeof console) try {
                var c = arguments[arguments.length - 1];
                console.log(c)
            } catch (d) {}
        }

        function C(a, b, c) {
            return function() {
                var d = null;
                try {
                    null != b && (d = b.apply(this, arguments))
                } catch (e) {
                    B("jsPlumb function failed : " + e)
                }
                if (null != a && (null == c || d !== c)) try {
                    d = a.apply(this, arguments)
                } catch (e) {
                    B("wrapped function failed : " + e)
                }
                return d
            }
        }
        var D = this,
            E = D.jsPlumbUtil = {},
            F = !0,
            G = function() {
                function a() {
                    var a = this;
                    this._listeners = {}, this.eventsSuspended = !1, this.tick = !1, this.eventsToDieOn = {
                        ready: !0
                    }, this.queue = [], this.bind = function(b, c, d) {
                        var e = function(b) {
                            t(a._listeners, b, c, d), c.__jsPlumb = c.__jsPlumb || {}, c.__jsPlumb[w()] = b
                        };
                        if ("string" == typeof b) e(b);
                        else if (null != b.length)
                            for (var f = 0; f < b.length; f++) e(b[f]);
                        return a
                    }, this.fire = function(a, b, c) {
                        if (this.tick) this.queue.unshift(arguments);
                        else {
                            if (this.tick = !0, !this.eventsSuspended && this._listeners[a]) {
                                var d = this._listeners[a].length,
                                    e = 0,
                                    f = !1,
                                    g = null;
                                if (!this.shouldFireEvent || this.shouldFireEvent(a, b, c))
                                    for (; !f && d > e && g !== !1;) {
                                        if (this.eventsToDieOn[a]) this._listeners[a][e].apply(this, [b, c]);
                                        else try {
                                            g = this._listeners[a][e].apply(this, [b, c])
                                        } catch (h) {
                                            B("jsPlumb: fire failed for event " + a + " : " + h)
                                        }
                                        e++, (null == this._listeners || null == this._listeners[a]) && (f = !0)
                                    }
                            }
                            this.tick = !1, this._drain()
                        }
                        return this
                    }, this._drain = function() {
                        var b = a.queue.pop();
                        b && a.fire.apply(a, b)
                    }, this.unbind = function(a, b) {
                        if (0 === arguments.length) this._listeners = {};
                        else if (1 === arguments.length) {
                            if ("string" == typeof a) delete this._listeners[a];
                            else if (a.__jsPlumb) {
                                var c = void 0;
                                for (var d in a.__jsPlumb) c = a.__jsPlumb[d], r(this._listeners[c] || [], a)
                            }
                        } else 2 === arguments.length && r(this._listeners[a] || [], b);
                        return this
                    }, this.getListener = function(b) {
                        return a._listeners[b]
                    }, this.setSuspendEvents = function(b) {
                        a.eventsSuspended = b
                    }, this.isSuspendEvents = function() {
                        return a.eventsSuspended
                    }, this.silently = function(b) {
                        a.setSuspendEvents(!0);
                        try {
                            b()
                        } catch (c) {
                            B("Cannot execute silent function " + c)
                        }
                        a.setSuspendEvents(!1)
                    }, this.cleanupListeners = function() {
                        for (var b in a._listeners) a._listeners[b] = null
                    }
                }
                return a
            }();
        E.isArray = a, E.isNumber = b, E.isString = c, E.isBoolean = d, E.isNull = e, E.isObject = f, E.isDate = g, E.isFunction =
            h, E.isNamedFunction = i, E.isEmpty = j, E.clone = k, E.merge = l, E.replace = m, E.functionChain = n, E.populate =
            o, E.findWithFunction = p, E.removeWithFunction = q, E.remove = r, E.addWithFunction = s, E.addToList = t, E.suggest =
            u, E.extend = v, E.uuid = w, E.fastTrim = x, E.each = y, E.map = z, E.mergeWithParents = A, E.logEnabled = F,
            E.log = B, E.wrap = C, E.EventGenerator = G
    }.call("undefined" != typeof window ? window : this),
    function() {
        "use strict";
        var a = this;
        a.jsPlumbUtil.matchesSelector = function(a, b, c) {
            c = c || a.parentNode;
            for (var d = c.querySelectorAll(b), e = 0; e < d.length; e++)
                if (d[e] === a) return !0;
            return !1
        }, a.jsPlumbUtil.consume = function(a, b) {
            a.stopPropagation ? a.stopPropagation() : a.returnValue = !1, !b && a.preventDefault && a.preventDefault()
        }, a.jsPlumbUtil.sizeElement = function(a, b, c, d, e) {
            a && (a.style.height = e + "px", a.height = e, a.style.width = d + "px", a.width = d, a.style.left = b + "px",
                a.style.top = c + "px")
        }
    }.call("undefined" != typeof window ? window : this),
    function() {
        "use strict";
        var a = this,
            b = a.jsPlumbUtil,
            c = function() {
                return "" + (new Date).getTime()
            },
            d = function(a) {
                if (a._jsPlumb.paintStyle && a._jsPlumb.hoverPaintStyle) {
                    var b = {};
                    p.extend(b, a._jsPlumb.paintStyle), p.extend(b, a._jsPlumb.hoverPaintStyle), delete a._jsPlumb.hoverPaintStyle,
                        b.gradient && a._jsPlumb.paintStyle.fill && delete b.gradient, a._jsPlumb.hoverPaintStyle = b
                }
            },
            e = ["tap", "dbltap", "click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup",
                "contextmenu"
            ],
            f = function(a, b, c, d) {
                var e = a.getAttachedElements();
                if (e)
                    for (var f = 0, g = e.length; g > f; f++) d && d === e[f] || e[f].setHover(b, !0, c)
            },
            g = function(a) {
                return null == a ? null : a.split(" ")
            },
            h = function(a, b, c) {
                for (var d in b) a[d] = c
            },
            i = function(a, c) {
                c = b.isArray(c) || null != c.length && !b.isString(c) ? c : [c];
                for (var d = 0; d < c.length; d++) try {
                    a.apply(c[d], [c[d]])
                } catch (e) {
                    b.log(".each iteration failed : " + e)
                }
            },
            j = function(a, c, d) {
                if (a.getDefaultType) {
                    var e = a.getTypeDescriptor(),
                        f = {},
                        g = a.getDefaultType(),
                        i = b.merge({}, g);
                    h(f, g, "__default");
                    for (var j = 0, k = a._jsPlumb.types.length; k > j; j++) {
                        var l = a._jsPlumb.types[j];
                        if ("__default" !== l) {
                            var m = a._jsPlumb.instance.getType(l, e);
                            null != m && (i = b.merge(i, m, ["cssClass"]), h(f, m, l))
                        }
                    }
                    c && (i = b.populate(i, c, "_")), a.applyType(i, d, f), d || a.repaint()
                }
            },
            k = a.jsPlumbUIComponent = function(a) {
                b.EventGenerator.apply(this, arguments);
                var c = this,
                    d = arguments,
                    e = c.idPrefix,
                    f = e + (new Date).getTime();
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
                }, this.cacheTypeItem = function(a, b, c) {
                    this._jsPlumb.typeCache[c] = this._jsPlumb.typeCache[c] || {}, this._jsPlumb.typeCache[c][a] = b
                }, this.getCachedTypeItem = function(a, b) {
                    return this._jsPlumb.typeCache[b] ? this._jsPlumb.typeCache[b][a] : null
                }, this.getId = function() {
                    return f
                };
                var g = a.overlays || [],
                    h = {};
                if (this.defaultOverlayKeys) {
                    for (var i = 0; i < this.defaultOverlayKeys.length; i++) Array.prototype.push.apply(g, this._jsPlumb.instance
                        .Defaults[this.defaultOverlayKeys[i]] || []);
                    for (i = 0; i < g.length; i++) {
                        var j = p.convertToFullOverlaySpec(g[i]);
                        h[j[1].id] = j
                    }
                }
                var k = {
                    overlays: h,
                    parameters: a.parameters || {},
                    scope: a.scope || this._jsPlumb.instance.getDefaultScope()
                };
                if (this.getDefaultType = function() {
                        return k
                    }, this.appendToDefaultType = function(a) {
                        for (var b in a) k[b] = a[b]
                    }, a.events)
                    for (var l in a.events) c.bind(l, a.events[l]);
                this.clone = function() {
                    var a = Object.create(this.constructor.prototype);
                    return this.constructor.apply(a, d), a
                }.bind(this), this.isDetachAllowed = function(a) {
                    var c = !0;
                    if (this._jsPlumb.beforeDetach) try {
                        c = this._jsPlumb.beforeDetach(a)
                    } catch (d) {
                        b.log("jsPlumb: beforeDetach callback failed", d)
                    }
                    return c
                }, this.isDropAllowed = function(a, c, d, e, f, g, h) {
                    var i = this._jsPlumb.instance.checkCondition("beforeDrop", {
                        sourceId: a,
                        targetId: c,
                        scope: d,
                        connection: e,
                        dropEndpoint: f,
                        source: g,
                        target: h
                    });
                    if (this._jsPlumb.beforeDrop) try {
                        i = this._jsPlumb.beforeDrop({
                            sourceId: a,
                            targetId: c,
                            scope: d,
                            connection: e,
                            dropEndpoint: f,
                            source: g,
                            target: h
                        })
                    } catch (j) {
                        b.log("jsPlumb: beforeDrop callback failed", j)
                    }
                    return i
                };
                var m = [];
                this.setListenerComponent = function(a) {
                    for (var b = 0; b < m.length; b++) m[b][3] = a
                }
            },
            l = function(a, b) {
                var c = a._jsPlumb.types[b],
                    d = a._jsPlumb.instance.getType(c, a.getTypeDescriptor());
                null != d && d.cssClass && a.canvas && a._jsPlumb.instance.removeClass(a.canvas, d.cssClass)
            };
        b.extend(a.jsPlumbUIComponent, b.EventGenerator, {
            getParameter: function(a) {
                return this._jsPlumb.parameters[a]
            },
            setParameter: function(a, b) {
                this._jsPlumb.parameters[a] = b
            },
            getParameters: function() {
                return this._jsPlumb.parameters
            },
            setParameters: function(a) {
                this._jsPlumb.parameters = a
            },
            getClass: function() {
                return p.getClass(this.canvas)
            },
            hasClass: function(a) {
                return p.hasClass(this.canvas, a)
            },
            addClass: function(a) {
                p.addClass(this.canvas, a)
            },
            removeClass: function(a) {
                p.removeClass(this.canvas, a)
            },
            updateClasses: function(a, b) {
                p.updateClasses(this.canvas, a, b)
            },
            setType: function(a, b, c) {
                this.clearTypes(), this._jsPlumb.types = g(a) || [], j(this, b, c)
            },
            getType: function() {
                return this._jsPlumb.types
            },
            reapplyTypes: function(a, b) {
                j(this, a, b)
            },
            hasType: function(a) {
                return -1 !== this._jsPlumb.types.indexOf(a)
            },
            addType: function(a, b, c) {
                var d = g(a),
                    e = !1;
                if (null != d) {
                    for (var f = 0, h = d.length; h > f; f++) this.hasType(d[f]) || (this._jsPlumb.types.push(d[f]), e = !0);
                    e && j(this, b, c)
                }
            },
            removeType: function(a, b, c) {
                var d = g(a),
                    e = !1,
                    f = function(a) {
                        var b = this._jsPlumb.types.indexOf(a);
                        return -1 !== b ? (l(this, b), this._jsPlumb.types.splice(b, 1), !0) : !1
                    }.bind(this);
                if (null != d) {
                    for (var h = 0, i = d.length; i > h; h++) e = f(d[h]) || e;
                    e && j(this, b, c)
                }
            },
            clearTypes: function(a, b) {
                for (var c = this._jsPlumb.types.length, d = 0; c > d; d++) l(this, 0), this._jsPlumb.types.splice(0, 1);
                j(this, a, b)
            },
            toggleType: function(a, b, c) {
                var d = g(a);
                if (null != d) {
                    for (var e = 0, f = d.length; f > e; e++) {
                        var h = this._jsPlumb.types.indexOf(d[e]); - 1 !== h ? (l(this, h), this._jsPlumb.types.splice(h, 1)) :
                            this._jsPlumb.types.push(d[e])
                    }
                    j(this, b, c)
                }
            },
            applyType: function(a, b) {
                if (this.setPaintStyle(a.paintStyle, b), this.setHoverPaintStyle(a.hoverPaintStyle, b), a.parameters)
                    for (var c in a.parameters) this.setParameter(c, a.parameters[c]);
                this._jsPlumb.paintStyleInUse = this.getPaintStyle()
            },
            setPaintStyle: function(a, b) {
                this._jsPlumb.paintStyle = a, this._jsPlumb.paintStyleInUse = this._jsPlumb.paintStyle, d(this), b || this
                    .repaint()
            },
            getPaintStyle: function() {
                return this._jsPlumb.paintStyle
            },
            setHoverPaintStyle: function(a, b) {
                this._jsPlumb.hoverPaintStyle = a, d(this), b || this.repaint()
            },
            getHoverPaintStyle: function() {
                return this._jsPlumb.hoverPaintStyle
            },
            destroy: function(a) {
                (a || null == this.typeId) && (this.cleanupListeners(), this.clone = null, this._jsPlumb = null)
            },
            isHover: function() {
                return this._jsPlumb.hover
            },
            setHover: function(a, b, d) {
                if (this._jsPlumb && !this._jsPlumb.instance.currentlyDragging && !this._jsPlumb.instance.isHoverSuspended()) {
                    this._jsPlumb.hover = a;
                    var e = a ? "addClass" : "removeClass";
                    null != this.canvas && (null != this._jsPlumb.instance.hoverClass && this._jsPlumb.instance[e](this.canvas,
                        this._jsPlumb.instance.hoverClass), null != this._jsPlumb.hoverClass && this._jsPlumb.instance[e](this
                        .canvas, this._jsPlumb.hoverClass)), null != this._jsPlumb.hoverPaintStyle && (this._jsPlumb.paintStyleInUse =
                        a ? this._jsPlumb.hoverPaintStyle : this._jsPlumb.paintStyle, this._jsPlumb.instance.isSuspendDrawing() ||
                        (d = d || c(), this.repaint({
                            timestamp: d,
                            recalc: !1
                        }))), this.getAttachedElements && !b && f(this, a, c(), this)
                }
            }
        });
        var m = 0,
            n = function() {
                var a = m + 1;
                return m++, a
            },
            o = a.jsPlumbInstance = function(d) {
                this.version = "2.8.0", this.Defaults = {
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
                        EndpointStyle: {
                            fill: "#456"
                        },
                        EndpointStyles: [null, null],
                        EndpointHoverStyle: null,
                        EndpointHoverStyles: [null, null],
                        HoverPaintStyle: null,
                        LabelStyle: {
                            color: "black"
                        },
                        LogEnabled: !1,
                        Overlays: [],
                        MaxConnections: 1,
                        PaintStyle: {
                            "stroke-width": 4,
                            stroke: "#456"
                        },
                        ReattachConnections: !1,
                        RenderMode: "svg",
                        Scope: "jsPlumb_DefaultScope"
                    }, d && p.extend(this.Defaults, d), this.logEnabled = this.Defaults.LogEnabled, this._connectionTypes = {},
                    this._endpointTypes = {}, b.EventGenerator.apply(this);
                var f = this,
                    g = n(),
                    h = f.bind,
                    j = {},
                    l = 1,
                    m = function(a) {
                        if (null == a) return null;
                        if (3 === a.nodeType || 8 === a.nodeType) return {
                            el: a,
                            text: !0
                        };
                        var c = f.getElement(a);
                        return {
                            el: c,
                            id: b.isString(a) && null == c ? a : Y(c)
                        }
                    };
                this.getInstanceIndex = function() {
                    return g
                }, this.setZoom = function(a, b) {
                    return l = a, f.fire("zoom", l), b && f.repaintEverything(), !0
                }, this.getZoom = function() {
                    return l
                };
                for (var o in this.Defaults) j[o] = this.Defaults[o];
                var q, r = [];
                this.unbindContainer = function() {
                    if (null != q && r.length > 0)
                        for (var a = 0; a < r.length; a++) f.off(q, r[a][0], r[a][1])
                }, this.setContainer = function(a) {
                    this.unbindContainer(), a = this.getElement(a), this.select().each(function(b) {
                        b.moveParent(a)
                    }), this.selectEndpoints().each(function(b) {
                        b.moveParent(a)
                    });
                    var b = q;
                    q = a, r.length = 0;
                    for (var c = {
                            endpointclick: "endpointClick",
                            endpointdblclick: "endpointDblClick"
                        }, d = function(a, b, d) {
                            var e = b.srcElement || b.target,
                                g = (e && e.parentNode ? e.parentNode._jsPlumb : null) || (e ? e._jsPlumb : null) || (e && e.parentNode &&
                                    e.parentNode.parentNode ? e.parentNode.parentNode._jsPlumb : null);
                            if (g) {
                                g.fire(a, g, b);
                                var h = d ? c[d + a] || a : a;
                                f.fire(h, g.component || g, b)
                            }
                        }, g = function(a, b, c) {
                            r.push([a, c]), f.on(q, a, b, c)
                        }, h = function(a) {
                            g(a, ".jtk-connector", function(b) {
                                d(a, b)
                            }), g(a, ".jtk-endpoint", function(b) {
                                d(a, b, "endpoint")
                            }), g(a, ".jtk-overlay", function(b) {
                                d(a, b)
                            })
                        }, i = 0; i < e.length; i++) h(e[i]);
                    for (var j in x) {
                        var k = x[j].el;
                        k.parentNode === b && (b.removeChild(k), q.appendChild(k))
                    }
                }, this.getContainer = function() {
                    return q
                }, this.bind = function(a, b) {
                    "ready" === a && t ? b() : h.apply(f, [a, b])
                }, f.importDefaults = function(a) {
                    for (var b in a) f.Defaults[b] = a[b];
                    return a.Container && f.setContainer(a.Container), f
                }, f.restoreDefaults = function() {
                    return f.Defaults = p.extend({}, j), f
                };
                var s = null,
                    t = !1,
                    u = [],
                    v = {},
                    w = {},
                    x = {},
                    y = {},
                    z = {},
                    A = {},
                    B = !1,
                    C = [],
                    D = !1,
                    E = null,
                    F = this.Defaults.Scope,
                    G = 1,
                    H = function() {
                        return "" + G++
                    },
                    I = function(a, b) {
                        q ? q.appendChild(a) : b ? this.getElement(b).appendChild(a) : this.appendToRoot(a)
                    }.bind(this),
                    J = function(a, b, d, e) {
                        if (!D) {
                            var g, h = Y(a),
                                i = f.getDragManager();
                            i && (g = i.getElementsForDraggable(h)), null == d && (d = c());
                            var j = ta({
                                elId: h,
                                offset: b,
                                recalc: !1,
                                timestamp: d
                            });
                            if (g && j && j.o)
                                for (var k in g) ta({
                                    elId: g[k].id,
                                    offset: {
                                        left: j.o.left + g[k].offset.left,
                                        top: j.o.top + g[k].offset.top
                                    },
                                    recalc: !1,
                                    timestamp: d
                                });
                            if (f.anchorManager.redraw(h, b, d, null, e), g)
                                for (var l in g) f.anchorManager.redraw(g[l].id, b, d, g[l].offset, e, !0)
                        }
                    },
                    K = function(a) {
                        return w[a]
                    },
                    L = function(a, c, d, e, g) {
                        if (!p.headless) {
                            var h = null == c ? !1 : c;
                            if (h && p.isDragSupported(a, f)) {
                                var i = d || f.Defaults.DragOptions;
                                if (i = p.extend({}, i), p.isAlreadyDraggable(a, f)) d.force && f.initDraggable(a, i);
                                else {
                                    var j = p.dragEvents.drag,
                                        k = p.dragEvents.stop,
                                        l = p.dragEvents.start,
                                        m = !1;
                                    sa(e, a), i[l] = b.wrap(i[l], function() {
                                        return f.setHoverSuspended(!0), f.select({
                                            source: a
                                        }).addClass(f.elementDraggingClass + " " + f.sourceElementDraggingClass, !0), f.select({
                                            target: a
                                        }).addClass(f.elementDraggingClass + " " + f.targetElementDraggingClass, !0), f.setConnectionBeingDragged(
                                            !0), i.canDrag ? d.canDrag() : void 0
                                    }, !1), i[j] = b.wrap(i[j], function() {
                                        var b = f.getUIPosition(arguments, f.getZoom());
                                        null != b && (J(a, b, null, !0), m && f.addClass(a, "jtk-dragged"), m = !0)
                                    }), i[k] = b.wrap(i[k], function() {
                                        for (var a, b = arguments[0].selection, c = function(b) {
                                                null != b[1] && (a = f.getUIPosition([{
                                                        el: b[2].el,
                                                        pos: [b[1].left, b[1].top]
                                                    }]), J(b[2].el, a)), f.removeClass(b[0], "jtk-dragged"), f.select({
                                                        source: b[2].el
                                                    }).removeClass(f.elementDraggingClass + " " + f.sourceElementDraggingClass, !0), f.select({
                                                        target: b[2].el
                                                    }).removeClass(f.elementDraggingClass + " " + f.targetElementDraggingClass, !0), f.getDragManager()
                                                    .dragEnded(b[2].el)
                                            }, d = 0; d < b.length; d++) c(b[d]);
                                        m = !1, f.setHoverSuspended(!1), f.setConnectionBeingDragged(!1)
                                    });
                                    var n = Y(a);
                                    A[n] = !0;
                                    var o = A[n];
                                    i.disabled = null == o ? !1 : !o, f.initDraggable(a, i), f.getDragManager().register(a), g && f.fire(
                                        "elementDraggable", {
                                            el: a,
                                            options: i
                                        })
                                }
                            }
                        }
                    },
                    M = function(a, b) {
                        for (var c = a.scope.split(/\s/), d = b.scope.split(/\s/), e = 0; e < c.length; e++)
                            for (var f = 0; f < d.length; f++)
                                if (d[f] === c[e]) return !0;
                        return !1
                    },
                    N = function(a, b) {
                        var c = p.extend({}, a);
                        for (var d in b) b[d] && (c[d] = b[d]);
                        return c
                    },
                    O = function(a, c) {
                        var d = p.extend({}, a);
                        if (c && p.extend(d, c), d.source && (d.source.endpoint ? d.sourceEndpoint = d.source : d.source = f.getElement(
                                d.source)), d.target && (d.target.endpoint ? d.targetEndpoint = d.target : d.target = f.getElement(d.target)),
                            a.uuids && (d.sourceEndpoint = K(a.uuids[0]), d.targetEndpoint = K(a.uuids[1])), d.sourceEndpoint && d.sourceEndpoint
                            .isFull()) return void b.log(f, "could not add connection; source endpoint is full");
                        if (d.targetEndpoint && d.targetEndpoint.isFull()) return void b.log(f,
                            "could not add connection; target endpoint is full");
                        if (!d.type && d.sourceEndpoint && (d.type = d.sourceEndpoint.connectionType), d.sourceEndpoint && d.sourceEndpoint
                            .connectorOverlays) {
                            d.overlays = d.overlays || [];
                            for (var e = 0, g = d.sourceEndpoint.connectorOverlays.length; g > e; e++) d.overlays.push(d.sourceEndpoint
                                .connectorOverlays[e])
                        }
                        d.sourceEndpoint && d.sourceEndpoint.scope && (d.scope = d.sourceEndpoint.scope), !d["pointer-events"] && d
                            .sourceEndpoint && d.sourceEndpoint.connectorPointerEvents && (d["pointer-events"] = d.sourceEndpoint.connectorPointerEvents);
                        var h = function(a, b, c) {
                                return f.addEndpoint(a, N(b, {
                                    anchor: d.anchors ? d.anchors[c] : d.anchor,
                                    endpoint: d.endpoints ? d.endpoints[c] : d.endpoint,
                                    paintStyle: d.endpointStyles ? d.endpointStyles[c] : d.endpointStyle,
                                    hoverPaintStyle: d.endpointHoverStyles ? d.endpointHoverStyles[c] : d.endpointHoverStyle
                                }))
                            },
                            i = function(a, b, c, e) {
                                if (d[a] && !d[a].endpoint && !d[a + "Endpoint"] && !d.newConnection) {
                                    var f = Y(d[a]),
                                        g = c[f];
                                    if (g = g ? g[e] : null) {
                                        if (!g.enabled) return !1;
                                        var i = null != g.endpoint && g.endpoint._jsPlumb ? g.endpoint : h(d[a], g.def, b);
                                        if (i.isFull()) return !1;
                                        d[a + "Endpoint"] = i, !d.scope && g.def.scope && (d.scope = g.def.scope), g.uniqueEndpoint ? g.endpoint ?
                                            i.finalEndpoint = g.endpoint : (g.endpoint = i, i.setDeleteOnEmpty(!1)) : i.setDeleteOnEmpty(!0), 0 ===
                                            b && g.def.connectorOverlays && (d.overlays = d.overlays || [], Array.prototype.push.apply(d.overlays,
                                                g.def.connectorOverlays))
                                    }
                                }
                            };
                        return i("source", 0, this.sourceEndpointDefinitions, d.type || "default") !== !1 && i("target", 1, this.targetEndpointDefinitions,
                            d.type || "default") !== !1 ? (d.sourceEndpoint && d.targetEndpoint && (M(d.sourceEndpoint, d.targetEndpoint) ||
                            (d = null)), d) : void 0
                    }.bind(f),
                    P = function(a) {
                        var b = f.Defaults.ConnectionType || f.getDefaultConnectionType();
                        a._jsPlumb = f, a.newConnection = P, a.newEndpoint = R, a.endpointsByUUID = w, a.endpointsByElement = v, a.finaliseConnection =
                            Q, a.id = "con_" + H();
                        var c = new b(a);
                        return c.isDetachable() && (c.endpoints[0].initDraggable("_jsPlumbSource"), c.endpoints[1].initDraggable(
                            "_jsPlumbTarget")), c
                    },
                    Q = f.finaliseConnection = function(a, b, c, d) {
                        if (b = b || {}, a.suspendedEndpoint || u.push(a), a.pending = null, a.endpoints[0].isTemporarySource = !1,
                            d !== !1 && f.anchorManager.newConnection(a), J(a.source), !b.doNotFireConnectionEvent && b.fireEvent !==
                            !1) {
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
                    },
                    R = function(a, b) {
                        var c = f.Defaults.EndpointType || p.Endpoint,
                            d = p.extend({}, a);
                        d._jsPlumb = f, d.newConnection = P, d.newEndpoint = R, d.endpointsByUUID = w, d.endpointsByElement = v, d.fireDetachEvent =
                            _, d.elementId = b || Y(d.source);
                        var e = new c(d);
                        return e.id = "ep_" + H(), sa(d.elementId, d.source), p.headless || f.getDragManager().endpointAdded(d.source,
                            b), e
                    },
                    S = function(a, b, c) {
                        var d = v[a];
                        if (d && d.length)
                            for (var e = 0, f = d.length; f > e; e++) {
                                for (var g = 0, h = d[e].connections.length; h > g; g++) {
                                    var i = b(d[e].connections[g]);
                                    if (i) return
                                }
                                c && c(d[e])
                            }
                    },
                    T = function(a, b) {
                        return p.each(a, function(a) {
                            f.isDragSupported(a) && (A[f.getAttribute(a, "id")] = b, f.setElementDraggable(a, b))
                        })
                    },
                    U = function(a, b, c) {
                        b = "block" === b;
                        var d = null;
                        c && (d = function(a) {
                            a.setVisible(b, !0, !0)
                        });
                        var e = m(a);
                        S(e.id, function(a) {
                            if (b && c) {
                                var d = a.sourceId === e.id ? 1 : 0;
                                a.endpoints[d].isVisible() && a.setVisible(!0)
                            } else a.setVisible(b)
                        }, d)
                    },
                    V = function(a) {
                        var b;
                        return p.each(a, function(a) {
                            var c = f.getAttribute(a, "id");
                            return b = null == A[c] ? !1 : A[c], b = !b, A[c] = b, f.setDraggable(a, b), b
                        }.bind(this)), b
                    },
                    W = function(a, b) {
                        var c = null;
                        b && (c = function(a) {
                            var b = a.isVisible();
                            a.setVisible(!b)
                        }), S(a, function(a) {
                            var b = a.isVisible();
                            a.setVisible(!b)
                        }, c)
                    },
                    X = function(a) {
                        var b = y[a];
                        return b ? {
                            o: b,
                            s: C[a]
                        } : ta({
                            elId: a
                        })
                    },
                    Y = function(a, c, d) {
                        if (b.isString(a)) return a;
                        if (null == a) return null;
                        var e = f.getAttribute(a, "id");
                        return e && "undefined" !== e || (2 === arguments.length && void 0 !== arguments[1] ? e = c : (1 ===
                                arguments.length || 3 === arguments.length && !arguments[2]) && (e = "jsPlumb_" + g + "_" + H()), d || f
                            .setAttribute(a, "id", e)), e
                    };
                this.setConnectionBeingDragged = function(a) {
                        B = a
                    }, this.isConnectionBeingDragged = function() {
                        return B
                    }, this.getManagedElements = function() {
                        return x
                    }, this.connectorClass = "jtk-connector", this.connectorOutlineClass = "jtk-connector-outline", this.connectedClass =
                    "jtk-connected", this.hoverClass = "jtk-hover", this.endpointClass = "jtk-endpoint", this.endpointConnectedClass =
                    "jtk-endpoint-connected", this.endpointFullClass = "jtk-endpoint-full", this.endpointDropAllowedClass =
                    "jtk-endpoint-drop-allowed", this.endpointDropForbiddenClass = "jtk-endpoint-drop-forbidden", this.overlayClass =
                    "jtk-overlay", this.draggingClass = "jtk-dragging", this.elementDraggingClass = "jtk-element-dragging", this
                    .sourceElementDraggingClass = "jtk-source-element-dragging", this.targetElementDraggingClass =
                    "jtk-target-element-dragging", this.endpointAnchorClassPrefix = "jtk-endpoint-anchor", this.hoverSourceClass =
                    "jtk-source-hover", this.hoverTargetClass = "jtk-target-hover", this.dragSelectClass = "jtk-drag-select",
                    this.Anchors = {}, this.Connectors = {
                        svg: {}
                    }, this.Endpoints = {
                        svg: {}
                    }, this.Overlays = {
                        svg: {}
                    }, this.ConnectorRenderers = {}, this.SVG = "svg", this.addEndpoint = function(a, c, d) {
                        d = d || {};
                        var e = p.extend({}, d);
                        p.extend(e, c), e.endpoint = e.endpoint || f.Defaults.Endpoint, e.paintStyle = e.paintStyle || f.Defaults.EndpointStyle;
                        for (var g = [], h = b.isArray(a) || null != a.length && !b.isString(a) ? a : [a], i = 0, j = h.length; j >
                            i; i++) {
                            e.source = f.getElement(h[i]), qa(e.source);
                            var k = Y(e.source),
                                l = R(e, k),
                                m = sa(k, e.source).info.o;
                            b.addToList(v, k, l), D || l.paint({
                                anchorLoc: l.anchor.compute({
                                    xy: [m.left, m.top],
                                    wh: C[k],
                                    element: l,
                                    timestamp: E
                                }),
                                timestamp: E
                            }), g.push(l)
                        }
                        return 1 === g.length ? g[0] : g
                    }, this.addEndpoints = function(a, c, d) {
                        for (var e = [], g = 0, h = c.length; h > g; g++) {
                            var i = f.addEndpoint(a, c[g], d);
                            b.isArray(i) ? Array.prototype.push.apply(e, i) : e.push(i)
                        }
                        return e
                    }, this.animate = function(a, c, d) {
                        if (!this.animationSupported) return !1;
                        d = d || {};
                        var e = f.getElement(a),
                            g = Y(e),
                            h = p.animEvents.step,
                            i = p.animEvents.complete;
                        d[h] = b.wrap(d[h], function() {
                            f.revalidate(g)
                        }), d[i] = b.wrap(d[i], function() {
                            f.revalidate(g)
                        }), f.doAnimate(e, c, d)
                    }, this.checkCondition = function(a, c) {
                        var d = f.getListener(a),
                            e = !0;
                        if (d && d.length > 0) {
                            var g = Array.prototype.slice.call(arguments, 1);
                            try {
                                for (var h = 0, i = d.length; i > h; h++) e = e && d[h].apply(d[h], g)
                            } catch (j) {
                                b.log(f, "cannot check condition [" + a + "]" + j)
                            }
                        }
                        return e
                    }, this.connect = function(a, c) {
                        var d, e = O(a, c);
                        if (e) {
                            if (null == e.source && null == e.sourceEndpoint) return void b.log(
                                "Cannot establish connection - source does not exist");
                            if (null == e.target && null == e.targetEndpoint) return void b.log(
                                "Cannot establish connection - target does not exist");
                            qa(e.source), d = P(e), Q(d, e)
                        }
                        return d
                    };
                var Z = [{
                        el: "source",
                        elId: "sourceId",
                        epDefs: "sourceEndpointDefinitions"
                    }, {
                        el: "target",
                        elId: "targetId",
                        epDefs: "targetEndpointDefinitions"
                    }],
                    $ = function(a, b, c, d) {
                        var e, f, g, h = Z[c],
                            i = a[h.elId],
                            j = (a[h.el], a.endpoints[c]),
                            k = {
                                index: c,
                                originalSourceId: 0 === c ? i : a.sourceId,
                                newSourceId: a.sourceId,
                                originalTargetId: 1 === c ? i : a.targetId,
                                newTargetId: a.targetId,
                                connection: a
                            };
                        if (b.constructor === p.Endpoint) e = b, e.addConnection(a), b = e.element;
                        else if (f = Y(b), g = this[h.epDefs][f], f === a[h.elId]) e = null;
                        else if (g)
                            for (var l in g) {
                                if (!g[l].enabled) return;
                                e = null != g[l].endpoint && g[l].endpoint._jsPlumb ? g[l].endpoint : this.addEndpoint(b, g[l].def), g[l]
                                    .uniqueEndpoint && (g[l].endpoint = e), e.addConnection(a)
                            } else e = a.makeEndpoint(0 === c, b, f);
                        return null != e && (j.detachFromConnection(a), a.endpoints[c] = e, a[h.el] = e.element, a[h.elId] = e.elementId,
                            k[0 === c ? "newSourceId" : "newTargetId"] = e.elementId, aa(k), d || a.repaint()), k.element = b, k
                    }.bind(this);
                this.setSource = function(a, b, c) {
                    var d = $(a, b, 0, c);
                    this.anchorManager.sourceChanged(d.originalSourceId, d.newSourceId, a, d.el)
                }, this.setTarget = function(a, b, c) {
                    var d = $(a, b, 1, c);
                    this.anchorManager.updateOtherEndpoint(d.originalSourceId, d.originalTargetId, d.newTargetId, a)
                }, this.deleteEndpoint = function(a, b, c) {
                    var d = "string" == typeof a ? w[a] : a;
                    return d && f.deleteObject({
                        endpoint: d,
                        dontUpdateHover: b,
                        deleteAttachedObjects: c
                    }), f
                }, this.deleteEveryEndpoint = function() {
                    var a = f.setSuspendDrawing(!0);
                    for (var b in v) {
                        var c = v[b];
                        if (c && c.length)
                            for (var d = 0, e = c.length; e > d; d++) f.deleteEndpoint(c[d], !0)
                    }
                    v = {}, x = {}, w = {}, y = {}, z = {}, f.anchorManager.reset();
                    var g = f.getDragManager();
                    return g && g.reset(), a || f.setSuspendDrawing(!1), f
                };
                var _ = function(a, b, c) {
                        var d = f.Defaults.ConnectionType || f.getDefaultConnectionType(),
                            e = a.constructor === d,
                            g = e ? {
                                connection: a,
                                source: a.source,
                                target: a.target,
                                sourceId: a.sourceId,
                                targetId: a.targetId,
                                sourceEndpoint: a.endpoints[0],
                                targetEndpoint: a.endpoints[1]
                            } : a;
                        b && f.fire("connectionDetached", g, c), f.fire("internal.connectionDetached", g, c), f.anchorManager.connectionDetached(
                            g)
                    },
                    aa = f.fireMoveEvent = function(a, b) {
                        f.fire("connectionMoved", a, b)
                    };
                this.unregisterEndpoint = function(a) {
                    a._jsPlumb.uuid && (w[a._jsPlumb.uuid] = null), f.anchorManager.deleteEndpoint(a);
                    for (var b in v) {
                        var c = v[b];
                        if (c) {
                            for (var d = [], e = 0, g = c.length; g > e; e++) c[e] !== a && d.push(c[e]);
                            v[b] = d
                        }
                        v[b].length < 1 && delete v[b]
                    }
                };
                var ba = "isDetachAllowed",
                    ca = "beforeDetach",
                    da = "checkCondition";
                this.deleteConnection = function(a, c) {
                    return null != a && (c = c || {}, c.force || b.functionChain(!0, !1, [
                        [a.endpoints[0], ba, [a]],
                        [a.endpoints[1], ba, [a]],
                        [a, ba, [a]],
                        [f, da, [ca, a]]
                    ])) ? (a.setHover(!1), _(a, !a.pending && c.fireEvent !== !1, c.originalEvent), a.endpoints[0].detachFromConnection(
                        a), a.endpoints[1].detachFromConnection(a), b.removeWithFunction(u, function(b) {
                        return a.id === b.id
                    }), a.cleanup(), a.destroy(), !0) : !1
                }, this.deleteEveryConnection = function(a) {
                    a = a || {};
                    var b = u.length,
                        c = 0;
                    return f.batch(function() {
                        for (var d = 0; b > d; d++) c += f.deleteConnection(u[0], a) ? 1 : 0
                    }), c
                }, this.deleteConnectionsForElement = function(a, b) {
                    b = b || {}, a = f.getElement(a);
                    var c = Y(a),
                        d = v[c];
                    if (d && d.length)
                        for (var e = 0, g = d.length; g > e; e++) d[e].deleteEveryConnection(b);
                    return f
                }, this.deleteObject = function(a) {
                    var c = {
                            endpoints: {},
                            connections: {},
                            endpointCount: 0,
                            connectionCount: 0
                        },
                        d = a.deleteAttachedObjects !== !1,
                        e = function(b) {
                            null != b && null == c.connections[b.id] && (a.dontUpdateHover || null == b._jsPlumb || b.setHover(!1), c
                                .connections[b.id] = b, c.connectionCount++)
                        },
                        g = function(b) {
                            if (null != b && null == c.endpoints[b.id] && (a.dontUpdateHover || null == b._jsPlumb || b.setHover(!1),
                                    c.endpoints[b.id] = b, c.endpointCount++, d))
                                for (var f = 0; f < b.connections.length; f++) {
                                    var g = b.connections[f];
                                    e(g)
                                }
                        };
                    a.connection ? e(a.connection) : g(a.endpoint);
                    for (var h in c.connections) {
                        var i = c.connections[h];
                        if (i._jsPlumb) {
                            b.removeWithFunction(u, function(a) {
                                return i.id === a.id
                            }), _(i, a.fireEvent === !1 ? !1 : !i.pending, a.originalEvent);
                            var j = null == a.deleteAttachedObjects ? null : !a.deleteAttachedObjects;
                            i.endpoints[0].detachFromConnection(i, null, j), i.endpoints[1].detachFromConnection(i, null, j), i.cleanup(
                                !0), i.destroy(!0)
                        }
                    }
                    for (var k in c.endpoints) {
                        var l = c.endpoints[k];
                        l._jsPlumb && (f.unregisterEndpoint(l), l.cleanup(!0), l.destroy(!0))
                    }
                    return c
                }, this.draggable = function(a, b) {
                    var c;
                    return i(function(a) {
                        c = m(a), c.el && L(c.el, !0, b, c.id, !0)
                    }, a), f
                }, this.droppable = function(a, b) {
                    var c;
                    return b = b || {}, b.allowLoopback = !1, i(function(a) {
                        c = m(a), c.el && f.initDroppable(c.el, b)
                    }, a), f
                };
                var ea = function(a, b, c, d) {
                        for (var e = 0, f = a.length; f > e; e++) a[e][b].apply(a[e], c);
                        return d(a)
                    },
                    fa = function(a, b, c) {
                        for (var d = [], e = 0, f = a.length; f > e; e++) d.push([a[e][b].apply(a[e], c), a[e]]);
                        return d
                    },
                    ga = function(a, b, c) {
                        return function() {
                            return ea(a, b, arguments, c)
                        }
                    },
                    ha = function(a, b) {
                        return function() {
                            return fa(a, b, arguments)
                        }
                    },
                    ia = function(a, b) {
                        var c = [];
                        if (a)
                            if ("string" == typeof a) {
                                if ("*" === a) return a;
                                c.push(a)
                            } else if (b) c = a;
                        else if (a.length)
                            for (var d = 0, e = a.length; e > d; d++) c.push(m(a[d]).id);
                        else c.push(m(a).id);
                        return c
                    },
                    ja = function(a, b, c) {
                        return "*" === a ? !0 : a.length > 0 ? -1 !== a.indexOf(b) : !c
                    };
                this.getConnections = function(a, b) {
                    a ? a.constructor === String && (a = {
                        scope: a
                    }) : a = {};
                    for (var c = a.scope || f.getDefaultScope(), d = ia(c, !0), e = ia(a.source), g = ia(a.target), h = !b && d
                            .length > 1 ? {} : [], i = function(a, c) {
                                if (!b && d.length > 1) {
                                    var e = h[a];
                                    null == e && (e = h[a] = []), e.push(c)
                                } else h.push(c)
                            }, j = 0, k = u.length; k > j; j++) {
                        var l = u[j],
                            m = l.proxies && l.proxies[0] ? l.proxies[0].originalEp.elementId : l.sourceId,
                            n = l.proxies && l.proxies[1] ? l.proxies[1].originalEp.elementId : l.targetId;
                        ja(d, l.scope) && ja(e, m) && ja(g, n) && i(l.scope, l)
                    }
                    return h
                };
                var ka = function(a, b) {
                        return function(c) {
                            for (var d = 0, e = a.length; e > d; d++) c(a[d]);
                            return b(a)
                        }
                    },
                    la = function(a) {
                        return function(b) {
                            return a[b]
                        }
                    },
                    ma = function(a, b) {
                        var c, d, e = {
                                length: a.length,
                                each: ka(a, b),
                                get: la(a)
                            },
                            f = ["setHover", "removeAllOverlays", "setLabel", "addClass", "addOverlay", "removeOverlay",
                                "removeOverlays", "showOverlay", "hideOverlay", "showOverlays", "hideOverlays", "setPaintStyle",
                                "setHoverPaintStyle", "setSuspendEvents", "setParameter", "setParameters", "setVisible", "repaint",
                                "addType", "toggleType", "removeType", "removeClass", "setType", "bind", "unbind"
                            ],
                            g = ["getLabel", "getOverlay", "isHover", "getParameter", "getParameters", "getPaintStyle",
                                "getHoverPaintStyle", "isVisible", "hasType", "getType", "isSuspendEvents"
                            ];
                        for (c = 0, d = f.length; d > c; c++) e[f[c]] = ga(a, f[c], b);
                        for (c = 0, d = g.length; d > c; c++) e[g[c]] = ha(a, g[c]);
                        return e
                    },
                    na = function(a) {
                        var b = ma(a, na);
                        return p.extend(b, {
                            setDetachable: ga(a, "setDetachable", na),
                            setReattach: ga(a, "setReattach", na),
                            setConnector: ga(a, "setConnector", na),
                            "delete": function() {
                                for (var b = 0, c = a.length; c > b; b++) f.deleteConnection(a[b])
                            },
                            isDetachable: ha(a, "isDetachable"),
                            isReattach: ha(a, "isReattach")
                        })
                    },
                    oa = function(a) {
                        var b = ma(a, oa);
                        return p.extend(b, {
                            setEnabled: ga(a, "setEnabled", oa),
                            setAnchor: ga(a, "setAnchor", oa),
                            isEnabled: ha(a, "isEnabled"),
                            deleteEveryConnection: function() {
                                for (var b = 0, c = a.length; c > b; b++) a[b].deleteEveryConnection()
                            },
                            "delete": function() {
                                for (var b = 0, c = a.length; c > b; b++) f.deleteEndpoint(a[b])
                            }
                        })
                    };
                this.select = function(a) {
                    return a = a || {}, a.scope = a.scope || "*", na(a.connections || f.getConnections(a, !0))
                }, this.selectEndpoints = function(a) {
                    a = a || {}, a.scope = a.scope || "*";
                    var b = !a.element && !a.source && !a.target,
                        c = b ? "*" : ia(a.element),
                        d = b ? "*" : ia(a.source),
                        e = b ? "*" : ia(a.target),
                        f = ia(a.scope, !0),
                        g = [];
                    for (var h in v) {
                        var i = ja(c, h, !0),
                            j = ja(d, h, !0),
                            k = "*" !== d,
                            l = ja(e, h, !0),
                            m = "*" !== e;
                        if (i || j || l) a: for (var n = 0, o = v[h].length; o > n; n++) {
                            var p = v[h][n];
                            if (ja(f, p.scope, !0)) {
                                var q = k && d.length > 0 && !p.isSource,
                                    r = m && e.length > 0 && !p.isTarget;
                                if (q || r) continue a;
                                g.push(p)
                            }
                        }
                    }
                    return oa(g)
                }, this.getAllConnections = function() {
                    return u
                }, this.getDefaultScope = function() {
                    return F
                }, this.getEndpoint = K, this.getEndpoints = function(a) {
                    return v[m(a).id] || []
                }, this.getDefaultEndpointType = function() {
                    return p.Endpoint
                }, this.getDefaultConnectionType = function() {
                    return p.Connection
                }, this.getId = Y, this.appendElement = I;
                var pa = !1;
                this.isHoverSuspended = function() {
                    return pa
                }, this.setHoverSuspended = function(a) {
                    pa = a
                }, this.hide = function(a, b) {
                    return U(a, "none", b), f
                }, this.idstamp = H;
                var qa = function(a) {
                        if (!q && a) {
                            var b = f.getElement(a);
                            b.offsetParent && f.setContainer(b.offsetParent)
                        }
                    },
                    ra = function() {
                        f.Defaults.Container && f.setContainer(f.Defaults.Container)
                    },
                    sa = f.manage = function(a, b, c) {
                        return x[a] || (x[a] = {
                            el: b,
                            endpoints: [],
                            connections: []
                        }, x[a].info = ta({
                            elId: a,
                            timestamp: E
                        }), c || f.fire("manageElement", {
                            id: a,
                            info: x[a].info,
                            el: b
                        })), x[a]
                    },
                    ta = function(a) {
                        var b, c = a.timestamp,
                            d = a.recalc,
                            e = a.offset,
                            g = a.elId;
                        return D && !c && (c = E), !d && c && c === z[g] ? {
                            o: a.offset || y[g],
                            s: C[g]
                        } : (d || !e && null == y[g] ? (b = x[g] ? x[g].el : null, null != b && (C[g] = f.getSize(b), y[g] = f.getOffset(
                            b), z[g] = c)) : (y[g] = e || y[g], null == C[g] && (b = x[g].el, null != b && (C[g] = f.getSize(b))), z[
                            g] = c), y[g] && !y[g].right && (y[g].right = y[g].left + C[g][0], y[g].bottom = y[g].top + C[g][1], y[g]
                            .width = C[g][0], y[g].height = C[g][1], y[g].centerx = y[g].left + y[g].width / 2, y[g].centery = y[g].top +
                            y[g].height / 2), {
                            o: y[g],
                            s: C[g]
                        })
                    };
                this.updateOffset = ta, this.init = function() {
                    t || (ra(), f.anchorManager = new a.jsPlumb.AnchorManager({
                        jsPlumbInstance: f
                    }), t = !0, f.fire("ready", f))
                }.bind(this), this.log = s, this.jsPlumbUIComponent = k, this.makeAnchor = function() {
                    var c, d = function(b, c) {
                        if (a.jsPlumb.Anchors[b]) return new a.jsPlumb.Anchors[b](c);
                        if (!f.Defaults.DoNotThrowErrors) throw {
                            msg: "jsPlumb: unknown anchor type '" + b + "'"
                        }
                    };
                    if (0 === arguments.length) return null;
                    var e = arguments[0],
                        g = arguments[1],
                        h = (arguments[2], null);
                    if (e.compute && e.getOrientation) return e;
                    if ("string" == typeof e) h = d(arguments[0], {
                        elementId: g,
                        jsPlumbInstance: f
                    });
                    else if (b.isArray(e))
                        if (b.isArray(e[0]) || b.isString(e[0])) 2 === e.length && b.isObject(e[1]) ? b.isString(e[0]) ? (c = a.jsPlumb
                            .extend({
                                elementId: g,
                                jsPlumbInstance: f
                            }, e[1]), h = d(e[0], c)) : (c = a.jsPlumb.extend({
                            elementId: g,
                            jsPlumbInstance: f,
                            anchors: e[0]
                        }, e[1]), h = new a.jsPlumb.DynamicAnchor(c)) : h = new p.DynamicAnchor({
                            anchors: e,
                            selector: null,
                            elementId: g,
                            jsPlumbInstance: f
                        });
                        else {
                            var i = {
                                x: e[0],
                                y: e[1],
                                orientation: e.length >= 4 ? [e[2], e[3]] : [0, 0],
                                offsets: e.length >= 6 ? [e[4], e[5]] : [0, 0],
                                elementId: g,
                                jsPlumbInstance: f,
                                cssClass: 7 === e.length ? e[6] : null
                            };
                            h = new a.jsPlumb.Anchor(i), h.clone = function() {
                                return new a.jsPlumb.Anchor(i)
                            }
                        } return h.id || (h.id = "anchor_" + H()), h
                }, this.makeAnchors = function(c, d, e) {
                    for (var g = [], h = 0, i = c.length; i > h; h++) "string" == typeof c[h] ? g.push(a.jsPlumb.Anchors[c[h]]({
                        elementId: d,
                        jsPlumbInstance: e
                    })) : b.isArray(c[h]) && g.push(f.makeAnchor(c[h], d, e));
                    return g
                }, this.makeDynamicAnchor = function(b, c) {
                    return new a.jsPlumb.DynamicAnchor({
                        anchors: b,
                        selector: c,
                        elementId: null,
                        jsPlumbInstance: f
                    })
                }, this.targetEndpointDefinitions = {}, this.sourceEndpointDefinitions = {};
                var ua = function(a, b, c, d, e) {
                        for (var f = a.target || a.srcElement, g = !1, h = d.getSelector(b, c), i = 0; i < h.length; i++)
                            if (h[i] === f) {
                                g = !0;
                                break
                            } return e ? !g : g
                    },
                    va = function(c, d, e, g, h) {
                        var i = new k(d),
                            j = d._jsPlumb.EndpointDropHandler({
                                jsPlumb: f,
                                enabled: function() {
                                    return c.def.enabled
                                },
                                isFull: function() {
                                    var a = f.select({
                                        target: c.id
                                    }).length;
                                    return c.def.maxConnections > 0 && a >= c.def.maxConnections
                                },
                                element: c.el,
                                elementId: c.id,
                                isSource: g,
                                isTarget: h,
                                addClass: function(a) {
                                    f.addClass(c.el, a)
                                },
                                removeClass: function(a) {
                                    f.removeClass(c.el, a)
                                },
                                onDrop: function(a) {
                                    var b = a.endpoints[0];
                                    b.anchor.unlock()
                                },
                                isDropAllowed: function() {
                                    return i.isDropAllowed.apply(i, arguments)
                                },
                                isRedrop: function(a) {
                                    return null != a.suspendedElement && null != a.suspendedEndpoint && a.suspendedEndpoint.element === c.el
                                },
                                getEndpoint: function(b) {
                                    var e = c.def.endpoint;
                                    if (null == e || null == e._jsPlumb) {
                                        var g = f.deriveEndpointAndAnchorSpec(b.getType().join(" "), !0),
                                            h = g.endpoints ? a.jsPlumb.extend(d, {
                                                endpoint: c.def.def.endpoint || g.endpoints[1]
                                            }) : d;
                                        g.anchors && (h = a.jsPlumb.extend(h, {
                                            anchor: c.def.def.anchor || g.anchors[1]
                                        })), e = f.addEndpoint(c.el, h), e._mtNew = !0
                                    }
                                    if (d.uniqueEndpoint && (c.def.endpoint = e), e.setDeleteOnEmpty(!0), b.isDetachable() && e.initDraggable(),
                                        null != e.anchor.positionFinder) {
                                        var i = f.getUIPosition(arguments, f.getZoom()),
                                            j = f.getOffset(c.el),
                                            k = f.getSize(c.el),
                                            l = null == i ? [0, 0] : e.anchor.positionFinder(i, j, k, e.anchor.constructorParams);
                                        e.anchor.x = l[0], e.anchor.y = l[1]
                                    }
                                    return e
                                },
                                maybeCleanup: function(a) {
                                    a._mtNew && 0 === a.connections.length ? f.deleteObject({
                                        endpoint: a
                                    }) : delete a._mtNew
                                }
                            }),
                            l = a.jsPlumb.dragEvents.drop;
                        return e.scope = e.scope || d.scope || f.Defaults.Scope, e[l] = b.wrap(e[l], j, !0), e.rank = d.rank || 0,
                            h && (e[a.jsPlumb.dragEvents.over] = function() {
                                return !0
                            }), d.allowLoopback === !1 && (e.canDrop = function(a) {
                                var b = a.getDragElement()._jsPlumbRelatedElement;
                                return b !== c.el
                            }), f.initDroppable(c.el, e, "internal"), j
                    };
                this.makeTarget = function(b, c, d) {
                    var e = a.jsPlumb.extend({
                        _jsPlumb: this
                    }, d);
                    a.jsPlumb.extend(e, c);
                    for (var g = e.maxConnections || -1, h = function(b) {
                            var c = m(b),
                                d = c.id,
                                h = a.jsPlumb.extend({}, e.dropOptions || {}),
                                i = e.connectionType || "default";
                            this.targetEndpointDefinitions[d] = this.targetEndpointDefinitions[d] || {}, qa(d), c.el._isJsPlumbGroup &&
                                null == h.rank && (h.rank = -1);
                            var j = {
                                def: a.jsPlumb.extend({}, e),
                                uniqueEndpoint: e.uniqueEndpoint,
                                maxConnections: g,
                                enabled: !0
                            };
                            e.createEndpoint && (j.uniqueEndpoint = !0, j.endpoint = f.addEndpoint(b, j.def), j.endpoint.setDeleteOnEmpty(
                                !1)), c.def = j, this.targetEndpointDefinitions[d][i] = j, va(c, e, h, e.isSource === !0, !0), c.el._katavorioDrop[
                                c.el._katavorioDrop.length - 1].targetDef = j
                        }.bind(this), i = b.length && b.constructor !== String ? b : [b], j = 0, k = i.length; k > j; j++) h(i[j]);
                    return this
                }, this.unmakeTarget = function(a, b) {
                    var c = m(a);
                    return f.destroyDroppable(c.el, "internal"), b || delete this.targetEndpointDefinitions[c.id], this
                }, this.makeSource = function(c, d, e) {
                    var g = a.jsPlumb.extend({
                        _jsPlumb: this
                    }, e);
                    a.jsPlumb.extend(g, d);
                    var h = g.connectionType || "default",
                        i = f.deriveEndpointAndAnchorSpec(h);
                    g.endpoint = g.endpoint || i.endpoints[0], g.anchor = g.anchor || i.anchors[0];
                    for (var j = g.maxConnections || -1, k = g.onMaxConnections, n = function(d) {
                            var e = d.id,
                                i = this.getElement(d.el);
                            this.sourceEndpointDefinitions[e] = this.sourceEndpointDefinitions[e] || {}, qa(e);
                            var m = {
                                def: a.jsPlumb.extend({}, g),
                                uniqueEndpoint: g.uniqueEndpoint,
                                maxConnections: j,
                                enabled: !0
                            };
                            g.createEndpoint && (m.uniqueEndpoint = !0, m.endpoint = f.addEndpoint(c, m.def), m.endpoint.setDeleteOnEmpty(
                                !1)), this.sourceEndpointDefinitions[e][h] = m, d.def = m;
                            var n = a.jsPlumb.dragEvents.stop,
                                o = a.jsPlumb.dragEvents.drag,
                                p = a.jsPlumb.extend({}, g.dragOptions || {}),
                                q = p.drag,
                                r = p.stop,
                                s = null,
                                t = !1;
                            p.scope = p.scope || g.scope, p[o] = b.wrap(p[o], function() {
                                q && q.apply(this, arguments), t = !1
                            }), p[n] = b.wrap(p[n], function() {
                                if (r && r.apply(this, arguments), this.currentlyDragging = !1, null != s._jsPlumb) {
                                    var a = g.anchor || this.Defaults.Anchor,
                                        b = s.anchor,
                                        c = s.connections[0],
                                        d = this.makeAnchor(a, e, this),
                                        h = s.element;
                                    if (null != d.positionFinder) {
                                        var i = f.getOffset(h),
                                            j = this.getSize(h),
                                            k = {
                                                left: i.left + b.x * j[0],
                                                top: i.top + b.y * j[1]
                                            },
                                            l = d.positionFinder(k, i, j, d.constructorParams);
                                        d.x = l[0], d.y = l[1]
                                    }
                                    s.setAnchor(d, !0), s.repaint(), this.repaint(s.elementId), null != c && this.repaint(c.targetId)
                                }
                            }.bind(this));
                            var u = function(c) {
                                if (3 !== c.which && 2 !== c.button) {
                                    var m = this.sourceEndpointDefinitions[e][h];
                                    if (m.enabled) {
                                        if (e = this.getId(this.getElement(d.el)), g.filter) {
                                            var n = b.isString(g.filter) ? ua(c, d.el, g.filter, this, g.filterExclude) : g.filter(c, d.el);
                                            if (n === !1) return
                                        }
                                        var o = this.select({
                                            source: e
                                        }).length;
                                        if (m.maxConnections >= 0 && o >= m.maxConnections) return k && k({
                                            element: d.el,
                                            maxConnections: j
                                        }, c), !1;
                                        var q = a.jsPlumb.getPositionOnElement(c, i, l),
                                            r = {};
                                        a.jsPlumb.extend(r, g), r.isTemporarySource = !0, r.anchor = [q[0], q[1], 0, 0], r.dragOptions = p,
                                            m.def.scope && (r.scope = m.def.scope), s = this.addEndpoint(e, r), t = !0, s.setDeleteOnEmpty(!0),
                                            m.uniqueEndpoint && (m.endpoint ? s.finalEndpoint = m.endpoint : (m.endpoint = s, s.setDeleteOnEmpty(
                                                !1)));
                                        var u = function() {
                                            f.off(s.canvas, "mouseup", u), f.off(d.el, "mouseup", u), t && (t = !1, f.deleteEndpoint(s))
                                        };
                                        f.on(s.canvas, "mouseup", u), f.on(d.el, "mouseup", u);
                                        var v = {};
                                        if (m.def.extract)
                                            for (var w in m.def.extract) {
                                                var x = (c.srcElement || c.target).getAttribute(w);
                                                x && (v[m.def.extract[w]] = x)
                                            }
                                        f.trigger(s.canvas, "mousedown", c, v), b.consume(c)
                                    }
                                }
                            }.bind(this);
                            this.on(d.el, "mousedown", u), m.trigger = u, g.filter && (b.isString(g.filter) || b.isFunction(g.filter)) &&
                                f.setDragFilter(d.el, g.filter);
                            var v = a.jsPlumb.extend({}, g.dropOptions || {});
                            va(d, g, v, !0, g.isTarget === !0)
                        }.bind(this), o = c.length && c.constructor !== String ? c : [c], p = 0, q = o.length; q > p; p++) n(m(o[p]));
                    return this
                }, this.unmakeSource = function(a, b, c) {
                    var d = m(a);
                    f.destroyDroppable(d.el, "internal");
                    var e = this.sourceEndpointDefinitions[d.id];
                    if (e)
                        for (var g in e)
                            if (null == b || b === g) {
                                var h = e[g].trigger;
                                h && f.off(d.el, "mousedown", h), c || delete this.sourceEndpointDefinitions[d.id][g]
                            } return this
                }, this.unmakeEverySource = function() {
                    for (var a in this.sourceEndpointDefinitions) f.unmakeSource(a, null, !0);
                    return this.sourceEndpointDefinitions = {}, this
                };
                var wa = function(a, c, d) {
                        c = b.isArray(c) ? c : [c];
                        var e = Y(a);
                        d = d || "default";
                        for (var f = 0; f < c.length; f++) {
                            var g = this[c[f]][e];
                            if (g && g[d]) return g[d].def.scope || this.Defaults.Scope
                        }
                    }.bind(this),
                    xa = function(a, c, d, e) {
                        d = b.isArray(d) ? d : [d];
                        var f = Y(a);
                        e = e || "default";
                        for (var g = 0; g < d.length; g++) {
                            var h = this[d[g]][f];
                            h && h[e] && (h[e].def.scope = c)
                        }
                    }.bind(this);
                this.getScope = function(a, b) {
                    return wa(a, ["sourceEndpointDefinitions", "targetEndpointDefinitions"])
                }, this.getSourceScope = function(a) {
                    return wa(a, "sourceEndpointDefinitions")
                }, this.getTargetScope = function(a) {
                    return wa(a, "targetEndpointDefinitions")
                }, this.setScope = function(a, b, c) {
                    this.setSourceScope(a, b, c), this.setTargetScope(a, b, c)
                }, this.setSourceScope = function(a, b, c) {
                    xa(a, b, "sourceEndpointDefinitions", c), this.setDragScope(a, b)
                }, this.setTargetScope = function(a, b, c) {
                    xa(a, b, "targetEndpointDefinitions", c), this.setDropScope(a, b)
                }, this.unmakeEveryTarget = function() {
                    for (var a in this.targetEndpointDefinitions) f.unmakeTarget(a, !0);
                    return this.targetEndpointDefinitions = {}, this
                };
                var ya = function(a, c, d, e, g) {
                        var h, i, j, k = "source" === a ? this.sourceEndpointDefinitions : this.targetEndpointDefinitions;
                        if (g = g || "default", c.length && !b.isString(c)) {
                            h = [];
                            for (var l = 0, n = c.length; n > l; l++) i = m(c[l]), k[i.id] && k[i.id][g] && (h[l] = k[i.id][g].enabled,
                                j = e ? !h[l] : d, k[i.id][g].enabled = j, f[j ? "removeClass" : "addClass"](i.el, "jtk-" + a +
                                    "-disabled"))
                        } else {
                            i = m(c);
                            var o = i.id;
                            k[o] && k[o][g] && (h = k[o][g].enabled, j = e ? !h : d, k[o][g].enabled = j, f[j ? "removeClass" :
                                "addClass"](i.el, "jtk-" + a + "-disabled"))
                        }
                        return h
                    }.bind(this),
                    za = function(a, c) {
                        return b.isString(a) || !a.length ? c.apply(this, [a]) : a.length ? c.apply(this, [a[0]]) : void 0
                    }.bind(this);
                this.toggleSourceEnabled = function(a, b) {
                    return ya("source", a, null, !0, b), this.isSourceEnabled(a, b)
                }, this.setSourceEnabled = function(a, b, c) {
                    return ya("source", a, b, null, c)
                }, this.isSource = function(a, b) {
                    return b = b || "default", za(a, function(a) {
                        var c = this.sourceEndpointDefinitions[m(a).id];
                        return null != c && null != c[b]
                    }.bind(this))
                }, this.isSourceEnabled = function(a, b) {
                    return b = b || "default", za(a, function(a) {
                        var c = this.sourceEndpointDefinitions[m(a).id];
                        return c && c[b] && c[b].enabled === !0
                    }.bind(this))
                }, this.toggleTargetEnabled = function(a, b) {
                    return ya("target", a, null, !0, b), this.isTargetEnabled(a, b)
                }, this.isTarget = function(a, b) {
                    return b = b || "default", za(a, function(a) {
                        var c = this.targetEndpointDefinitions[m(a).id];
                        return null != c && null != c[b]
                    }.bind(this))
                }, this.isTargetEnabled = function(a, b) {
                    return b = b || "default", za(a, function(a) {
                        var c = this.targetEndpointDefinitions[m(a).id];
                        return c && c[b] && c[b].enabled === !0
                    }.bind(this))
                }, this.setTargetEnabled = function(a, b, c) {
                    return ya("target", a, b, null, c)
                }, this.ready = function(a) {
                    f.bind("ready", a)
                };
                var Aa = function(a, b) {
                    if ("object" == typeof a && a.length)
                        for (var c = 0, d = a.length; d > c; c++) b(a[c]);
                    else b(a);
                    return f
                };
                this.repaint = function(a, b, c) {
                    return Aa(a, function(a) {
                        J(a, b, c)
                    })
                }, this.revalidate = function(a, b, c) {
                    return Aa(a, function(a) {
                        var d = c ? a : f.getId(a);
                        f.updateOffset({
                            elId: d,
                            recalc: !0,
                            timestamp: b
                        });
                        var e = f.getDragManager();
                        e && e.updateOffsets(d), f.repaint(a)
                    })
                }, this.repaintEverything = function() {
                    var a, b = c();
                    for (a in v) f.updateOffset({
                        elId: a,
                        recalc: !0,
                        timestamp: b
                    });
                    for (a in v) J(a, null, b);
                    return this
                }, this.removeAllEndpoints = function(a, b, c) {
                    c = c || [];
                    var d = function(a) {
                        var e, g, h = m(a),
                            i = v[h.id];
                        if (i)
                            for (c.push(h), e = 0, g = i.length; g > e; e++) f.deleteEndpoint(i[e], !1);
                        if (delete v[h.id], b && h.el && 3 !== h.el.nodeType && 8 !== h.el.nodeType)
                            for (e = 0, g = h.el.childNodes.length; g > e; e++) d(h.el.childNodes[e])
                    };
                    return d(a), this
                };
                var Ba = function(a, b) {
                    f.removeAllEndpoints(a.id, !0, b);
                    for (var c = f.getDragManager(), d = function(a) {
                            c && c.elementRemoved(a.id), f.anchorManager.clearFor(a.id), f.anchorManager.removeFloatingConnection(a.id),
                                f.isSource(a.el) && f.unmakeSource(a.el), f.isTarget(a.el) && f.unmakeTarget(a.el), f.destroyDraggable(
                                    a.el), f.destroyDroppable(a.el), delete f.floatingConnections[a.id], delete x[a.id], delete y[a.id], a
                                .el && (f.removeElement(a.el), a.el._jsPlumb = null)
                        }, e = 1; e < b.length; e++) d(b[e]);
                    d(a)
                };
                this.remove = function(a, b) {
                    var c = m(a),
                        d = [];
                    return c.text ? c.el.parentNode.removeChild(c.el) : c.id && f.batch(function() {
                        Ba(c, d)
                    }, b === !0), f
                }, this.empty = function(a, b) {
                    var c = [],
                        d = function(a, b) {
                            var e = m(a);
                            if (e.text) e.el.parentNode.removeChild(e.el);
                            else if (e.el) {
                                for (; e.el.childNodes.length > 0;) d(e.el.childNodes[0]);
                                b || Ba(e, c)
                            }
                        };
                    return f.batch(function() {
                        d(a, !0)
                    }, b === !1), f
                }, this.reset = function(a) {
                    f.silently(function() {
                        pa = !1, f.removeAllGroups(), f.removeGroupManager(), f.deleteEveryEndpoint(), a || f.unbind(), this.targetEndpointDefinitions = {},
                            this.sourceEndpointDefinitions = {}, u.length = 0, this.doReset && this.doReset()
                    }.bind(this))
                };
                var Ca = function(a) {
                    a.canvas && a.canvas.parentNode && a.canvas.parentNode.removeChild(a.canvas), a.cleanup(), a.destroy()
                };
                this.clear = function() {
                    f.select().each(Ca), f.selectEndpoints().each(Ca), v = {}, w = {}
                }, this.setDefaultScope = function(a) {
                    return F = a, f
                }, this.setDraggable = T, this.deriveEndpointAndAnchorSpec = function(a, b) {
                    for (var c = ((b ? "" : "default ") + a).split(/[\s]/), d = null, e = null, g = null, h = null, i = 0; i <
                        c.length; i++) {
                        var j = f.getType(c[i], "connection");
                        j && (j.endpoints && (d = j.endpoints), j.endpoint && (e = j.endpoint), j.anchors && (h = j.anchors), j.anchor &&
                            (g = j.anchor))
                    }
                    return {
                        endpoints: d ? d : [e, e],
                        anchors: h ? h : [g, g]
                    }
                }, this.setId = function(a, c, d) {
                    var e;
                    b.isString(a) ? e = a : (a = this.getElement(a), e = this.getId(a));
                    var f = this.getConnections({
                            source: e,
                            scope: "*"
                        }, !0),
                        g = this.getConnections({
                            target: e,
                            scope: "*"
                        }, !0);
                    c = "" + c, d ? a = this.getElement(c) : (a = this.getElement(e), this.setAttribute(a, "id", c)), v[c] = v[
                        e] || [];
                    for (var h = 0, i = v[c].length; i > h; h++) v[c][h].setElementId(c), v[c][h].setReferenceElement(a);
                    delete v[e], this.sourceEndpointDefinitions[c] = this.sourceEndpointDefinitions[e], delete this.sourceEndpointDefinitions[
                        e], this.targetEndpointDefinitions[c] = this.targetEndpointDefinitions[e], delete this.targetEndpointDefinitions[
                        e], this.anchorManager.changeId(e, c);
                    var j = this.getDragManager();
                    j && j.changeId(e, c), x[c] = x[e], delete x[e];
                    var k = function(b, d, e) {
                        for (var f = 0, g = b.length; g > f; f++) b[f].endpoints[d].setElementId(c), b[f].endpoints[d].setReferenceElement(
                            a), b[f][e + "Id"] = c, b[f][e] = a
                    };
                    k(f, 0, "source"), k(g, 1, "target"), this.repaint(c)
                }, this.setDebugLog = function(a) {
                    s = a
                }, this.setSuspendDrawing = function(a, b) {
                    var c = D;
                    return D = a, E = a ? (new Date).getTime() : null, b && this.repaintEverything(), c
                }, this.isSuspendDrawing = function() {
                    return D
                }, this.getSuspendedAt = function() {
                    return E
                }, this.batch = function(a, c) {
                    var d = this.isSuspendDrawing();
                    d || this.setSuspendDrawing(!0);
                    try {
                        a()
                    } catch (e) {
                        b.log("Function run while suspended failed", e)
                    }
                    d || this.setSuspendDrawing(!1, !c)
                }, this.doWhileSuspended = this.batch, this.getCachedData = X, this.timestamp = c, this.show = function(a, b) {
                    return U(a, "block", b), f
                }, this.toggleVisible = W, this.toggleDraggable = V, this.addListener = this.bind;
                var Da = [];
                this.registerFloatingConnection = function(a, c, d) {
                    Da[a.id] = c, b.addToList(v, a.id, d)
                }, this.getFloatingConnectionFor = function(a) {
                    return Da[a]
                }
            };
        b.extend(a.jsPlumbInstance, b.EventGenerator, {
            setAttribute: function(a, b, c) {
                this.setAttribute(a, b, c)
            },
            getAttribute: function(b, c) {
                return this.getAttribute(a.jsPlumb.getElement(b), c)
            },
            convertToFullOverlaySpec: function(a) {
                return b.isString(a) && (a = [a, {}]), a[1].id = a[1].id || b.uuid(), a
            },
            registerConnectionType: function(b, c) {
                if (this._connectionTypes[b] = a.jsPlumb.extend({}, c), c.overlays) {
                    for (var d = {}, e = 0; e < c.overlays.length; e++) {
                        var f = this.convertToFullOverlaySpec(c.overlays[e]);
                        d[f[1].id] = f
                    }
                    this._connectionTypes[b].overlays = d
                }
            },
            registerConnectionTypes: function(a) {
                for (var b in a) this.registerConnectionType(b, a[b])
            },
            registerEndpointType: function(b, c) {
                if (this._endpointTypes[b] = a.jsPlumb.extend({}, c), c.overlays) {
                    for (var d = {}, e = 0; e < c.overlays.length; e++) {
                        var f = this.convertToFullOverlaySpec(c.overlays[e]);
                        d[f[1].id] = f
                    }
                    this._endpointTypes[b].overlays = d
                }
            },
            registerEndpointTypes: function(a) {
                for (var b in a) this.registerEndpointType(b, a[b])
            },
            getType: function(a, b) {
                return "connection" === b ? this._connectionTypes[a] : this._endpointTypes[a]
            },
            setIdChanged: function(a, b) {
                this.setId(a, b, !0)
            },
            setParent: function(a, b) {
                var c = this.getElement(a),
                    d = this.getId(c),
                    e = this.getElement(b),
                    f = this.getId(e),
                    g = this.getDragManager();
                c.parentNode.removeChild(c), e.appendChild(c), g && g.setParent(c, d, e, f)
            },
            extend: function(a, b, c) {
                var d;
                if (c)
                    for (d = 0; d < c.length; d++) a[c[d]] = b[c[d]];
                else
                    for (d in b) a[d] = b[d];
                return a
            },
            floatingConnections: {},
            getFloatingAnchorIndex: function(a) {
                return a.endpoints[0].isFloating() ? 0 : a.endpoints[1].isFloating() ? 1 : -1
            }
        });
        var p = new o;
        a.jsPlumb = p, p.getInstance = function(a, b) {
            var c = new o(a);
            if (b)
                for (var d in b) c[d] = b[d];
            return c.init(), c
        }, p.each = function(a, b) {
            if (null != a)
                if ("string" == typeof a) b(p.getElement(a));
                else if (null != a.length)
                for (var c = 0; c < a.length; c++) b(p.getElement(a[c]));
            else b(a)
        }, "undefined" != typeof exports && (exports.jsPlumb = p)
    }.call("undefined" != typeof window ? window : this),
    function() {
        var a = this,
            b = a.jsPlumbUtil,
            c = function(a, b) {
                if (null == b) return [0, 0];
                var c = h(b),
                    d = g(c, 0);
                return [d[a + "X"], d[a + "Y"]]
            },
            d = c.bind(this, "page"),
            e = c.bind(this, "screen"),
            f = c.bind(this, "client"),
            g = function(a, b) {
                return a.item ? a.item(b) : a[b]
            },
            h = function(a) {
                return a.touches && a.touches.length > 0 ? a.touches : a.changedTouches && a.changedTouches.length > 0 ? a.changedTouches :
                    a.targetTouches && a.targetTouches.length > 0 ? a.targetTouches : [a]
            },
            i = function(a) {
                var b = {},
                    c = [],
                    d = {},
                    e = {},
                    f = {};
                this.register = function(g) {
                    var h, i = a.getId(g);
                    b[i] || (b[i] = g, c.push(g), d[i] = {});
                    var j = function(b) {
                        if (b)
                            for (var c = 0; c < b.childNodes.length; c++)
                                if (3 !== b.childNodes[c].nodeType && 8 !== b.childNodes[c].nodeType) {
                                    var k = jsPlumb.getElement(b.childNodes[c]),
                                        l = a.getId(b.childNodes[c], null, !0);
                                    if (l && e[l] && e[l] > 0) {
                                        h || (h = a.getOffset(g));
                                        var m = a.getOffset(k);
                                        d[i][l] = {
                                            id: l,
                                            offset: {
                                                left: m.left - h.left,
                                                top: m.top - h.top
                                            }
                                        }, f[l] = i
                                    }
                                    j(b.childNodes[c])
                                }
                    };
                    j(g)
                }, this.updateOffsets = function(b, c) {
                    if (null != b) {
                        c = c || {};
                        var e, g = jsPlumb.getElement(b),
                            h = a.getId(g),
                            i = d[h];
                        if (i)
                            for (var j in i)
                                if (i.hasOwnProperty(j)) {
                                    var k = jsPlumb.getElement(j),
                                        l = c[j] || a.getOffset(k);
                                    if (null == k.offsetParent && null != d[h][j]) continue;
                                    e || (e = a.getOffset(g)), d[h][j] = {
                                        id: j,
                                        offset: {
                                            left: l.left - e.left,
                                            top: l.top - e.top
                                        }
                                    }, f[j] = h
                                }
                    }
                }, this.endpointAdded = function(c, g) {
                    g = g || a.getId(c);
                    var h = document.body,
                        i = c.parentNode;
                    for (e[g] = e[g] ? e[g] + 1 : 1; null != i && i !== h;) {
                        var j = a.getId(i, null, !0);
                        if (j && b[j]) {
                            var k = a.getOffset(i);
                            if (null == d[j][g]) {
                                var l = a.getOffset(c);
                                d[j][g] = {
                                    id: g,
                                    offset: {
                                        left: l.left - k.left,
                                        top: l.top - k.top
                                    }
                                }, f[g] = j
                            }
                            break
                        }
                        i = i.parentNode
                    }
                }, this.endpointDeleted = function(a) {
                    if (e[a.elementId] && (e[a.elementId]--, e[a.elementId] <= 0))
                        for (var b in d) d.hasOwnProperty(b) && d[b] && (delete d[b][a.elementId], delete f[a.elementId])
                }, this.changeId = function(a, b) {
                    d[b] = d[a], d[a] = {}, f[b] = f[a], f[a] = null
                }, this.getElementsForDraggable = function(a) {
                    return d[a]
                }, this.elementRemoved = function(a) {
                    var b = f[a];
                    b && (delete d[b][a], delete f[a])
                }, this.reset = function() {
                    b = {}, c = [], d = {}, e = {}
                }, this.dragEnded = function(b) {
                    if (null != b.offsetParent) {
                        var c = a.getId(b),
                            d = f[c];
                        d && this.updateOffsets(d)
                    }
                }, this.setParent = function(b, c, e, g, h) {
                    var i = f[c];
                    d[g] || (d[g] = {});
                    var j = a.getOffset(e),
                        k = h || a.getOffset(b);
                    i && d[i] && delete d[i][c], d[g][c] = {
                        id: c,
                        offset: {
                            left: k.left - j.left,
                            top: k.top - j.top
                        }
                    }, f[c] = g
                }, this.clearParent = function(a, b) {
                    var c = f[b];
                    c && (delete d[c][b], delete f[b])
                }, this.revalidateParent = function(b, c, d) {
                    var e = f[c];
                    if (e) {
                        var g = {};
                        g[c] = d, this.updateOffsets(e, g), a.revalidate(e)
                    }
                }, this.getDragAncestor = function(b) {
                    var c = jsPlumb.getElement(b),
                        d = a.getId(c),
                        e = f[d];
                    return e ? jsPlumb.getElement(e) : null
                }
            },
            j = function(a) {
                return null == a ? null : a.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            },
            k = function(a, b, c) {
                b = j(b), "undefined" != typeof a.className.baseVal ? a.className.baseVal = b : a.className = b;
                try {
                    var d = a.classList;
                    if (null != d) {
                        for (; d.length > 0;) d.remove(d.item(0));
                        for (var e = 0; e < c.length; e++) c[e] && d.add(c[e])
                    }
                } catch (f) {
                    jsPlumbUtil.log("JSPLUMB: cannot set class list", f)
                }
            },
            l = function(a) {
                return "undefined" == typeof a.className.baseVal ? a.className : a.className.baseVal
            },
            m = function(a, c, d) {
                c = null == c ? [] : b.isArray(c) ? c : c.split(/\s+/), d = null == d ? [] : b.isArray(d) ? d : d.split(/\s+/);
                var e = l(a),
                    f = e.split(/\s+/),
                    g = function(a, b) {
                        for (var c = 0; c < b.length; c++)
                            if (a) - 1 === f.indexOf(b[c]) && f.push(b[c]);
                            else {
                                var d = f.indexOf(b[c]); - 1 !== d && f.splice(d, 1)
                            }
                    };
                g(!0, c), g(!1, d), k(a, f.join(" "), f)
            };
        a.jsPlumb.extend(a.jsPlumbInstance.prototype, {
            headless: !1,
            pageLocation: d,
            screenLocation: e,
            clientLocation: f,
            getDragManager: function() {
                return null == this.dragManager && (this.dragManager = new i(this)), this.dragManager
            },
            recalculateOffsets: function(a) {
                this.getDragManager().updateOffsets(a)
            },
            createElement: function(a, b, c, d) {
                return this.createElementNS(null, a, b, c, d)
            },
            createElementNS: function(a, b, c, d, e) {
                var f, g = null == a ? document.createElement(b) : document.createElementNS(a, b);
                c = c || {};
                for (f in c) g.style[f] = c[f];
                d && (g.className = d), e = e || {};
                for (f in e) g.setAttribute(f, "" + e[f]);
                return g
            },
            getAttribute: function(a, b) {
                return null != a.getAttribute ? a.getAttribute(b) : null
            },
            setAttribute: function(a, b, c) {
                null != a.setAttribute && a.setAttribute(b, c)
            },
            setAttributes: function(a, b) {
                for (var c in b) b.hasOwnProperty(c) && a.setAttribute(c, b[c])
            },
            appendToRoot: function(a) {
                document.body.appendChild(a)
            },
            getRenderModes: function() {
                return ["svg"]
            },
            getClass: l,
            addClass: function(a, b) {
                jsPlumb.each(a, function(a) {
                    m(a, b)
                })
            },
            hasClass: function(a, b) {
                return a = jsPlumb.getElement(a), a.classList ? a.classList.contains(b) : -1 !== l(a).indexOf(b)
            },
            removeClass: function(a, b) {
                jsPlumb.each(a, function(a) {
                    m(a, null, b)
                })
            },
            toggleClass: function(a, b) {
                jsPlumb.hasClass(a, b) ? jsPlumb.removeClass(a, b) : jsPlumb.addClass(a, b)
            },
            updateClasses: function(a, b, c) {
                jsPlumb.each(a, function(a) {
                    m(a, b, c)
                })
            },
            setClass: function(a, b) {
                null != b && jsPlumb.each(a, function(a) {
                    k(a, b, b.split(/\s+/))
                })
            },
            setPosition: function(a, b) {
                a.style.left = b.left + "px", a.style.top = b.top + "px"
            },
            getPosition: function(a) {
                var b = function(b) {
                    var c = a.style[b];
                    return c ? c.substring(0, c.length - 2) : 0
                };
                return {
                    left: b("left"),
                    top: b("top")
                }
            },
            getStyle: function(a, b) {
                return "undefined" != typeof window.getComputedStyle ? getComputedStyle(a, null).getPropertyValue(b) : a.currentStyle[
                    b]
            },
            getSelector: function(a, b) {
                var c = null;
                return c = 1 === arguments.length ? null != a.nodeType ? a : document.querySelectorAll(a) : a.querySelectorAll(
                    b)
            },
            getOffset: function(a, b, c) {
                a = jsPlumb.getElement(a), c = c || this.getContainer();
                for (var d = {
                        left: a.offsetLeft,
                        top: a.offsetTop
                    }, e = b || null != c && a !== c && a.offsetParent !== c ? a.offsetParent : null, f = function(a) {
                        null != a && a !== document.body && (a.scrollTop > 0 || a.scrollLeft > 0) && (d.left -= a.scrollLeft, d
                            .top -= a.scrollTop)
                    }.bind(this); null != e;) d.left += e.offsetLeft, d.top += e.offsetTop, f(e), e = b ? e.offsetParent : e.offsetParent ===
                    c ? null : e.offsetParent;
                if (null != c && !b && (c.scrollTop > 0 || c.scrollLeft > 0)) {
                    var g = null != a.offsetParent ? this.getStyle(a.offsetParent, "position") : "static",
                        h = this.getStyle(a, "position");
                    "absolute" !== h && "fixed" !== h && "absolute" !== g && "fixed" !== g && (d.left -= c.scrollLeft, d.top -=
                        c.scrollTop)
                }
                return d
            },
            getPositionOnElement: function(a, b, c) {
                var d = "undefined" != typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
                        left: 0,
                        top: 0,
                        width: 0,
                        height: 0
                    },
                    e = document.body,
                    f = document.documentElement,
                    g = window.pageYOffset || f.scrollTop || e.scrollTop,
                    h = window.pageXOffset || f.scrollLeft || e.scrollLeft,
                    i = f.clientTop || e.clientTop || 0,
                    j = f.clientLeft || e.clientLeft || 0,
                    k = 0,
                    l = 0,
                    m = d.top + g - i + k * c,
                    n = d.left + h - j + l * c,
                    o = jsPlumb.pageLocation(a),
                    p = d.width || b.offsetWidth * c,
                    q = d.height || b.offsetHeight * c,
                    r = (o[0] - n) / p,
                    s = (o[1] - m) / q;
                return [r, s]
            },
            getAbsolutePosition: function(a) {
                var b = function(b) {
                    var c = a.style[b];
                    return c ? parseFloat(c.substring(0, c.length - 2)) : void 0
                };
                return [b("left"), b("top")]
            },
            setAbsolutePosition: function(a, b, c, d) {
                c ? this.animate(a, {
                    left: "+=" + (b[0] - c[0]),
                    top: "+=" + (b[1] - c[1])
                }, d) : (a.style.left = b[0] + "px", a.style.top = b[1] + "px")
            },
            getSize: function(a) {
                return [a.offsetWidth, a.offsetHeight]
            },
            getWidth: function(a) {
                return a.offsetWidth
            },
            getHeight: function(a) {
                return a.offsetHeight
            },
            getRenderMode: function() {
                return "svg"
            }
        })
    }.call("undefined" != typeof window ? window : this),
    function() {
        "use strict";
        var a = this,
            b = a.jsPlumb,
            c = a.jsPlumbUtil,
            d = "__label",
            e = function(a, c) {
                var e = {
                        cssClass: c.cssClass,
                        labelStyle: a.labelStyle,
                        id: d,
                        component: a,
                        _jsPlumb: a._jsPlumb.instance
                    },
                    f = b.extend(e, c);
                return new(b.Overlays[a._jsPlumb.instance.getRenderMode()].Label)(f)
            },
            f = function(a, d) {
                var e = null;
                if (c.isArray(d)) {
                    var f = d[0],
                        g = b.extend({
                            component: a,
                            _jsPlumb: a._jsPlumb.instance
                        }, d[1]);
                    3 === d.length && b.extend(g, d[2]), e = new(b.Overlays[a._jsPlumb.instance.getRenderMode()][f])(g)
                } else e = d.constructor === String ? new(b.Overlays[a._jsPlumb.instance.getRenderMode()][d])({
                    component: a,
                    _jsPlumb: a._jsPlumb.instance
                }) : d;
                return e.id = e.id || c.uuid(), a.cacheTypeItem("overlay", e, e.id), a._jsPlumb.overlays[e.id] = e, e
            };
        b.OverlayCapableJsPlumbUIComponent = function(b) {
            a.jsPlumbUIComponent.apply(this, arguments), this._jsPlumb.overlays = {}, this._jsPlumb.overlayPositions = {},
                b.label && (this.getDefaultType().overlays[d] = ["Label", {
                    label: b.label,
                    location: b.labelLocation || this.defaultLabelLocation || .5,
                    labelStyle: b.labelStyle || this._jsPlumb.instance.Defaults.LabelStyle,
                    id: d
                }]), this.setListenerComponent = function(a) {
                    if (this._jsPlumb)
                        for (var b in this._jsPlumb.overlays) this._jsPlumb.overlays[b].setListenerComponent(a)
                }
        }, b.OverlayCapableJsPlumbUIComponent.applyType = function(a, b) {
            if (b.overlays) {
                var c, d = {};
                for (c in b.overlays) {
                    var e = a._jsPlumb.overlays[b.overlays[c][1].id];
                    if (e) e.updateFrom(b.overlays[c][1]), d[b.overlays[c][1].id] = !0;
                    else {
                        var f = a.getCachedTypeItem("overlay", b.overlays[c][1].id);
                        null != f ? (f.reattach(a._jsPlumb.instance, a), f.setVisible(!0), f.updateFrom(b.overlays[c][1]), a._jsPlumb
                            .overlays[f.id] = f) : f = a.addOverlay(b.overlays[c], !0), d[f.id] = !0
                    }
                }
                for (c in a._jsPlumb.overlays) null == d[a._jsPlumb.overlays[c].id] && a.removeOverlay(a._jsPlumb.overlays[c]
                    .id, !0)
            }
        }, c.extend(b.OverlayCapableJsPlumbUIComponent, a.jsPlumbUIComponent, {
            setHover: function(a, b) {
                if (this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged())
                    for (var c in this._jsPlumb.overlays) this._jsPlumb.overlays[c][a ? "addClass" : "removeClass"](this._jsPlumb
                        .instance.hoverClass)
            },
            addOverlay: function(a, b) {
                var c = f(this, a);
                return b || this.repaint(), c
            },
            getOverlay: function(a) {
                return this._jsPlumb.overlays[a]
            },
            getOverlays: function() {
                return this._jsPlumb.overlays
            },
            hideOverlay: function(a) {
                var b = this.getOverlay(a);
                b && b.hide()
            },
            hideOverlays: function() {
                for (var a in this._jsPlumb.overlays) this._jsPlumb.overlays[a].hide()
            },
            showOverlay: function(a) {
                var b = this.getOverlay(a);
                b && b.show()
            },
            showOverlays: function() {
                for (var a in this._jsPlumb.overlays) this._jsPlumb.overlays[a].show()
            },
            removeAllOverlays: function(a) {
                for (var b in this._jsPlumb.overlays) this._jsPlumb.overlays[b].cleanup && this._jsPlumb.overlays[b].cleanup();
                this._jsPlumb.overlays = {}, this._jsPlumb.overlayPositions = null, this._jsPlumb.overlayPlacements = {},
                    a || this.repaint()
            },
            removeOverlay: function(a, b) {
                var c = this._jsPlumb.overlays[a];
                c && (c.setVisible(!1), !b && c.cleanup && c.cleanup(), delete this._jsPlumb.overlays[a], this._jsPlumb.overlayPositions &&
                    delete this._jsPlumb.overlayPositions[a], this._jsPlumb.overlayPlacements && delete this._jsPlumb.overlayPlacements[
                        a])
            },
            removeOverlays: function() {
                for (var a = 0, b = arguments.length; b > a; a++) this.removeOverlay(arguments[a])
            },
            moveParent: function(a) {
                if (this.bgCanvas && (this.bgCanvas.parentNode.removeChild(this.bgCanvas), a.appendChild(this.bgCanvas)),
                    this.canvas && this.canvas.parentNode) {
                    this.canvas.parentNode.removeChild(this.canvas), a.appendChild(this.canvas);
                    for (var b in this._jsPlumb.overlays)
                        if (this._jsPlumb.overlays[b].isAppendedAtTopLevel) {
                            var c = this._jsPlumb.overlays[b].getElement();
                            c.parentNode.removeChild(c), a.appendChild(c)
                        }
                }
            },
            getLabel: function() {
                var a = this.getOverlay(d);
                return null != a ? a.getLabel() : null
            },
            getLabelOverlay: function() {
                return this.getOverlay(d)
            },
            setLabel: function(a) {
                var b = this.getOverlay(d);
                if (b) a.constructor === String || a.constructor === Function ? b.setLabel(a) : (a.label && b.setLabel(a.label),
                    a.location && b.setLocation(a.location));
                else {
                    var c = a.constructor === String || a.constructor === Function ? {
                        label: a
                    } : a;
                    b = e(this, c), this._jsPlumb.overlays[d] = b
                }
                this._jsPlumb.instance.isSuspendDrawing() || this.repaint()
            },
            cleanup: function(a) {
                for (var b in this._jsPlumb.overlays) this._jsPlumb.overlays[b].cleanup(a), this._jsPlumb.overlays[b].destroy(
                    a);
                a && (this._jsPlumb.overlays = {}, this._jsPlumb.overlayPositions = null)
            },
            setVisible: function(a) {
                this[a ? "showOverlays" : "hideOverlays"]()
            },
            setAbsoluteOverlayPosition: function(a, b) {
                this._jsPlumb.overlayPositions[a.id] = b
            },
            getAbsoluteOverlayPosition: function(a) {
                return this._jsPlumb.overlayPositions ? this._jsPlumb.overlayPositions[a.id] : null
            },
            _clazzManip: function(a, b, c) {
                if (!c)
                    for (var d in this._jsPlumb.overlays) this._jsPlumb.overlays[d][a + "Class"](b)
            },
            addClass: function(a, b) {
                this._clazzManip("add", a, b)
            },
            removeClass: function(a, b) {
                this._clazzManip("remove", a, b)
            }
        })
    }.call("undefined" != typeof window ? window : this),
    function() {
        "use strict";
        var a = this,
            b = a.jsPlumb,
            c = a.jsPlumbUtil,
            d = function(a, b, c) {
                var d = !1;
                return {
                    drag: function() {
                        if (d) return d = !1, !0;
                        if (b.element) {
                            var e = c.getUIPosition(arguments, c.getZoom());
                            null != e && c.setPosition(b.element, e), c.repaint(b.element, e), a.paint({
                                anchorPoint: a.anchor.getCurrentLocation({
                                    element: a
                                })
                            })
                        }
                    },
                    stopDrag: function() {
                        d = !0
                    }
                }
            },
            e = function(a, b, c, d) {
                var e = b.createElement("div", {
                    position: "absolute"
                });
                b.appendElement(e);
                var f = b.getId(e);
                b.setPosition(e, c), e.style.width = d[0] + "px", e.style.height = d[1] + "px", b.manage(f, e, !0), a.id = f,
                    a.element = e
            },
            f = function(a, c, d, e, f, g, h, i) {
                var j = new b.FloatingAnchor({
                    reference: c,
                    referenceCanvas: e,
                    jsPlumbInstance: g
                });
                return h({
                    paintStyle: a,
                    endpoint: d,
                    anchor: j,
                    source: f,
                    scope: i
                })
            },
            g = ["connectorStyle", "connectorHoverStyle", "connectorOverlays", "connector", "connectionType",
                "connectorClass", "connectorHoverClass"
            ],
            h = function(a, b) {
                var c = 0;
                if (null != b)
                    for (var d = 0; d < a.connections.length; d++)
                        if (a.connections[d].sourceId === b || a.connections[d].targetId === b) {
                            c = d;
                            break
                        } return a.connections[c]
            };
        b.Endpoint = function(a) {
            var i = a._jsPlumb,
                j = a.newConnection,
                k = a.newEndpoint;
            this.idPrefix = "_jsplumb_e_", this.defaultLabelLocation = [.5, .5], this.defaultOverlayKeys = ["Overlays",
                    "EndpointOverlays"
                ], b.OverlayCapableJsPlumbUIComponent.apply(this, arguments), this.appendToDefaultType({
                    connectionType: a.connectionType,
                    maxConnections: null == a.maxConnections ? this._jsPlumb.instance.Defaults.MaxConnections : a.maxConnections,
                    paintStyle: a.endpointStyle || a.paintStyle || a.style || this._jsPlumb.instance.Defaults.EndpointStyle ||
                        b.Defaults.EndpointStyle,
                    hoverPaintStyle: a.endpointHoverStyle || a.hoverPaintStyle || this._jsPlumb.instance.Defaults.EndpointHoverStyle ||
                        b.Defaults.EndpointHoverStyle,
                    connectorStyle: a.connectorStyle,
                    connectorHoverStyle: a.connectorHoverStyle,
                    connectorClass: a.connectorClass,
                    connectorHoverClass: a.connectorHoverClass,
                    connectorOverlays: a.connectorOverlays,
                    connector: a.connector,
                    connectorTooltip: a.connectorTooltip
                }), this._jsPlumb.enabled = !(a.enabled === !1), this._jsPlumb.visible = !0, this.element = b.getElement(a.source),
                this._jsPlumb.uuid = a.uuid, this._jsPlumb.floatingEndpoint = null;
            var l = null;
            this._jsPlumb.uuid && (a.endpointsByUUID[this._jsPlumb.uuid] = this), this.elementId = a.elementId, this.dragProxy =
                a.dragProxy, this._jsPlumb.connectionCost = a.connectionCost, this._jsPlumb.connectionsDirected = a.connectionsDirected,
                this._jsPlumb.currentAnchorClass = "", this._jsPlumb.events = {};
            var m = a.deleteOnEmpty === !0;
            this.setDeleteOnEmpty = function(a) {
                m = a
            };
            var n = function() {
                var a = i.endpointAnchorClassPrefix + "-" + this._jsPlumb.currentAnchorClass;
                this._jsPlumb.currentAnchorClass = this.anchor.getCssClass();
                var c = i.endpointAnchorClassPrefix + (this._jsPlumb.currentAnchorClass ? "-" + this._jsPlumb.currentAnchorClass :
                    "");
                this.removeClass(a), this.addClass(c), b.updateClasses(this.element, c, a)
            }.bind(this);
            this.prepareAnchor = function(a) {
                var b = this._jsPlumb.instance.makeAnchor(a, this.elementId, i);
                return b.bind("anchorChanged", function(a) {
                    this.fire("anchorChanged", {
                        endpoint: this,
                        anchor: a
                    }), n()
                }.bind(this)), b
            }, this.setPreparedAnchor = function(a, b) {
                return this._jsPlumb.instance.continuousAnchorFactory.clear(this.elementId), this.anchor = a, n(), b ||
                    this._jsPlumb.instance.repaint(this.elementId), this
            }, this.setAnchor = function(a, b) {
                var c = this.prepareAnchor(a);
                return this.setPreparedAnchor(c, b), this
            };
            var o = function(a) {
                if (this.connections.length > 0)
                    for (var b = 0; b < this.connections.length; b++) this.connections[b].setHover(a, !1);
                else this.setHover(a)
            }.bind(this);
            this.bind("mouseover", function() {
                    o(!0)
                }), this.bind("mouseout", function() {
                    o(!1)
                }), a._transient || this._jsPlumb.instance.anchorManager.add(this, this.elementId), this.prepareEndpoint =
                function(d, e) {
                    var f, g = function(a, c) {
                            var d = i.getRenderMode();
                            if (b.Endpoints[d][a]) return new b.Endpoints[d][a](c);
                            if (!i.Defaults.DoNotThrowErrors) throw {
                                msg: "jsPlumb: unknown endpoint type '" + a + "'"
                            }
                        },
                        h = {
                            _jsPlumb: this._jsPlumb.instance,
                            cssClass: a.cssClass,
                            container: a.container,
                            tooltip: a.tooltip,
                            connectorTooltip: a.connectorTooltip,
                            endpoint: this
                        };
                    return c.isString(d) ? f = g(d, h) : c.isArray(d) ? (h = c.merge(d[1], h), f = g(d[0], h)) : f = d.clone(),
                        f.clone = function() {
                            return c.isString(d) ? g(d, h) : c.isArray(d) ? (h = c.merge(d[1], h), g(d[0], h)) : void 0
                        }.bind(this), f.typeId = e, f
                }, this.setEndpoint = function(a, b) {
                    var c = this.prepareEndpoint(a);
                    this.setPreparedEndpoint(c, !0)
                }, this.setPreparedEndpoint = function(a, b) {
                    null != this.endpoint && (this.endpoint.cleanup(), this.endpoint.destroy()), this.endpoint = a, this.type =
                        this.endpoint.type, this.canvas = this.endpoint.canvas
                }, b.extend(this, a, g), this.isSource = a.isSource || !1, this.isTemporarySource = a.isTemporarySource || !
                1, this.isTarget = a.isTarget || !1, this.connections = a.connections || [], this.connectorPointerEvents = a[
                    "connector-pointer-events"], this.scope = a.scope || i.getDefaultScope(), this.timestamp = null, this.reattachConnections =
                a.reattach || i.Defaults.ReattachConnections, this.connectionsDetachable = i.Defaults.ConnectionsDetachable,
                (a.connectionsDetachable === !1 || a.detachable === !1) && (this.connectionsDetachable = !1), this.dragAllowedWhenFull =
                a.dragAllowedWhenFull !== !1, a.onMaxConnections && this.bind("maxConnections", a.onMaxConnections), this.addConnection =
                function(a) {
                    this.connections.push(a), this[(this.connections.length > 0 ? "add" : "remove") + "Class"](i.endpointConnectedClass),
                        this[(this.isFull() ? "add" : "remove") + "Class"](i.endpointFullClass)
                }, this.detachFromConnection = function(a, b, c) {
                    b = null == b ? this.connections.indexOf(a) : b, b >= 0 && (this.connections.splice(b, 1), this[(this.connections
                        .length > 0 ? "add" : "remove") + "Class"](i.endpointConnectedClass), this[(this.isFull() ? "add" :
                        "remove") + "Class"](i.endpointFullClass)), !c && m && 0 === this.connections.length && i.deleteObject({
                        endpoint: this,
                        fireEvent: !1,
                        deleteAttachedObjects: c !== !0
                    })
                }, this.deleteEveryConnection = function(a) {
                    for (var b = this.connections.length, c = 0; b > c; c++) i.deleteConnection(this.connections[0], a)
                }, this.detachFrom = function(a, b, c) {
                    for (var d = [], e = 0; e < this.connections.length; e++)(this.connections[e].endpoints[1] === a || this.connections[
                        e].endpoints[0] === a) && d.push(this.connections[e]);
                    for (var f = 0, g = d.length; g > f; f++) i.deleteConnection(d[0]);
                    return this
                }, this.getElement = function() {
                    return this.element
                }, this.setElement = function(d) {
                    var e = this._jsPlumb.instance.getId(d),
                        f = this.elementId;
                    return c.removeWithFunction(a.endpointsByElement[this.elementId], function(a) {
                        return a.id === this.id
                    }.bind(this)), this.element = b.getElement(d), this.elementId = i.getId(this.element), i.anchorManager.rehomeEndpoint(
                        this, f, this.element), i.dragManager.endpointAdded(this.element), c.addToList(a.endpointsByElement, e,
                        this), this
                }, this.makeInPlaceCopy = function() {
                    var b = this.anchor.getCurrentLocation({
                            element: this
                        }),
                        c = this.anchor.getOrientation(this),
                        d = this.anchor.getCssClass(),
                        e = {
                            bind: function() {},
                            compute: function() {
                                return [b[0], b[1]]
                            },
                            getCurrentLocation: function() {
                                return [b[0], b[1]]
                            },
                            getOrientation: function() {
                                return c
                            },
                            getCssClass: function() {
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
                }, this.connectorSelector = function() {
                    return this.connections[0]
                }, this.setStyle = this.setPaintStyle, this.paint = function(a) {
                    a = a || {};
                    var b = a.timestamp,
                        c = !(a.recalc === !1);
                    if (!b || this.timestamp !== b) {
                        var d = i.updateOffset({
                                elId: this.elementId,
                                timestamp: b
                            }),
                            e = a.offset ? a.offset.o : d.o;
                        if (null != e) {
                            var f = a.anchorPoint,
                                g = a.connectorPaintStyle;
                            if (null == f) {
                                var j = a.dimensions || d.s,
                                    k = {
                                        xy: [e.left, e.top],
                                        wh: j,
                                        element: this,
                                        timestamp: b
                                    };
                                if (c && this.anchor.isDynamic && this.connections.length > 0) {
                                    var l = h(this, a.elementWithPrecedence),
                                        m = l.endpoints[0] === this ? 1 : 0,
                                        n = 0 === m ? l.sourceId : l.targetId,
                                        o = i.getCachedData(n),
                                        p = o.o,
                                        q = o.s;
                                    k.index = 0 === m ? 1 : 0, k.connection = l, k.txy = [p.left, p.top], k.twh = q, k.tElement = l.endpoints[
                                        m]
                                } else this.connections.length > 0 && (k.connection = this.connections[0]);
                                f = this.anchor.compute(k)
                            }
                            this.endpoint.compute(f, this.anchor.getOrientation(this), this._jsPlumb.paintStyleInUse, g || this.paintStyleInUse),
                                this.endpoint.paint(this._jsPlumb.paintStyleInUse, this.anchor), this.timestamp = b;
                            for (var r in this._jsPlumb.overlays)
                                if (this._jsPlumb.overlays.hasOwnProperty(r)) {
                                    var s = this._jsPlumb.overlays[r];
                                    s.isVisible() && (this._jsPlumb.overlayPlacements[r] = s.draw(this.endpoint, this._jsPlumb.paintStyleInUse),
                                        s.paint(this._jsPlumb.overlayPlacements[r]))
                                }
                        }
                    }
                }, this.getTypeDescriptor = function() {
                    return "endpoint"
                }, this.isVisible = function() {
                    return this._jsPlumb.visible
                }, this.repaint = this.paint;
            var p = !1;
            this.initDraggable = function() {
                if (!p && b.isDragSupported(this.element)) {
                    var g, h = {
                            id: null,
                            element: null
                        },
                        m = null,
                        n = !1,
                        o = null,
                        q = d(this, h, i),
                        r = a.dragOptions || {},
                        s = {},
                        t = b.dragEvents.start,
                        u = b.dragEvents.stop,
                        v = b.dragEvents.drag,
                        w = b.dragEvents.beforeStart,
                        x = function(a) {
                            g = a.e.payload || {}
                        },
                        y = function(c) {
                            m = this.connectorSelector();
                            var d = !0;
                            this.isEnabled() || (d = !1), null != m || this.isSource || this.isTemporarySource || (d = !1), !this.isSource ||
                                !this.isFull() || null != m && this.dragAllowedWhenFull || (d = !1), null == m || m.isDetachable(this) ||
                                (this.isFull() ? d = !1 : m = null);
                            var l = i.checkCondition(null == m ? "beforeDrag" : "beforeStartDetach", {
                                endpoint: this,
                                source: this.element,
                                sourceId: this.elementId,
                                connection: m
                            });
                            if (l === !1 ? d = !1 : "object" == typeof l ? b.extend(l, g || {}) : l = g || {}, d === !1) return i.stopDrag &&
                                i.stopDrag(this.canvas), q.stopDrag(), !1;
                            for (var p = 0; p < this.connections.length; p++) this.connections[p].setHover(!1);
                            this.addClass("endpointDrag"), i.setConnectionBeingDragged(!0), m && !this.isFull() && this.isSource &&
                                (m = null), i.updateOffset({
                                    elId: this.elementId
                                });
                            var r = this._jsPlumb.instance.getOffset(this.canvas),
                                s = this.canvas,
                                t = this._jsPlumb.instance.getSize(this.canvas);
                            e(h, i, r, t), i.setAttributes(this.canvas, {
                                dragId: h.id,
                                elId: this.elementId
                            });
                            var u = this.dragProxy || this.endpoint;
                            if (null == this.dragProxy && null != this.connectionType) {
                                var v = this._jsPlumb.instance.deriveEndpointAndAnchorSpec(this.connectionType);
                                v.endpoints[1] && (u = v.endpoints[1])
                            }
                            var w = this._jsPlumb.instance.makeAnchor("Center");
                            w.isFloating = !0, this._jsPlumb.floatingEndpoint = f(this.getPaintStyle(), w, u, this.canvas, h.element,
                                i, k, this.scope);
                            var x = this._jsPlumb.floatingEndpoint.anchor;
                            if (null == m) this.setHover(!1, !1), m = j({
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
                                    scope: a.scope,
                                    data: l
                                }), m.pending = !0, m.addClass(i.draggingClass), this._jsPlumb.floatingEndpoint.addClass(i.draggingClass),
                                this._jsPlumb.floatingEndpoint.anchor = x, i.fire("connectionDrag", m), i.anchorManager.newConnection(m);
                            else {
                                n = !0, m.setHover(!1);
                                var y = m.endpoints[0].id === this.id ? 0 : 1;
                                this.detachFromConnection(m, null, !0);
                                var z = i.getDragScope(s);
                                i.setAttribute(this.canvas, "originalScope", z), i.fire("connectionDrag", m), 0 === y ? (o = [m.source,
                                        m.sourceId, s, z
                                    ], i.anchorManager.sourceChanged(m.endpoints[y].elementId, h.id, m, h.element)) : (o = [m.target, m.targetId,
                                        s, z
                                    ], m.target = h.element, m.targetId = h.id, i.anchorManager.updateOtherEndpoint(m.sourceId, m.endpoints[
                                        y].elementId, m.targetId, m)), m.suspendedEndpoint = m.endpoints[y], m.suspendedElement = m.endpoints[
                                        y].getElement(), m.suspendedElementId = m.endpoints[y].elementId, m.suspendedElementType = 0 === y ?
                                    "source" : "target", m.suspendedEndpoint.setHover(!1), this._jsPlumb.floatingEndpoint.referenceEndpoint =
                                    m.suspendedEndpoint, m.endpoints[y] = this._jsPlumb.floatingEndpoint, m.addClass(i.draggingClass),
                                    this._jsPlumb.floatingEndpoint.addClass(i.draggingClass)
                            }
                            i.registerFloatingConnection(h, m, this._jsPlumb.floatingEndpoint), i.currentlyDragging = !0
                        }.bind(this),
                        z = function() {
                            if (i.setConnectionBeingDragged(!1), m && null != m.endpoints) {
                                var a = i.getDropEvent(arguments),
                                    b = i.getFloatingAnchorIndex(m);
                                if (m.endpoints[0 === b ? 1 : 0].anchor.unlock(), m.removeClass(i.draggingClass), this._jsPlumb && (m.deleteConnectionNow ||
                                        m.endpoints[b] === this._jsPlumb.floatingEndpoint) && n && m.suspendedEndpoint) {
                                    0 === b ? (m.floatingElement = m.source, m.floatingId = m.sourceId, m.floatingEndpoint = m.endpoints[0],
                                        m.floatingIndex = 0, m.source = o[0], m.sourceId = o[1]) : (m.floatingElement = m.target, m.floatingId =
                                        m.targetId, m.floatingEndpoint = m.endpoints[1], m.floatingIndex = 1, m.target = o[0], m.targetId =
                                        o[1]);
                                    var c = this._jsPlumb.floatingEndpoint;
                                    i.setDragScope(o[2], o[3]), m.endpoints[b] = m.suspendedEndpoint, m.isReattach() || m._forceReattach ||
                                        m._forceDetach || !i.deleteConnection(m, {
                                            originalEvent: a
                                        }) ? (m.setHover(!1), m._forceDetach = null, m._forceReattach = null, this._jsPlumb.floatingEndpoint.detachFromConnection(
                                                m), m.suspendedEndpoint.addConnection(m), 1 === b ? i.anchorManager.updateOtherEndpoint(m.sourceId,
                                                m.floatingId, m.targetId, m) : i.anchorManager.sourceChanged(m.floatingId, m.sourceId, m, m.source),
                                            i.repaint(o[1])) : i.deleteObject({
                                            endpoint: c
                                        })
                                }
                                this.deleteAfterDragStop ? i.deleteObject({
                                        endpoint: this
                                    }) : this._jsPlumb && this.paint({
                                        recalc: !1
                                    }), i.fire("connectionDragStop", m, a), m.pending && i.fire("connectionAborted", m, a), i.currentlyDragging = !
                                    1, m.suspendedElement = null, m.suspendedEndpoint = null, m = null
                            }
                            h && h.element && i.remove(h.element, !1, !1), l && i.deleteObject({
                                endpoint: l
                            }), this._jsPlumb && (this.canvas.style.visibility = "visible", this.anchor.unlock(), this._jsPlumb.floatingEndpoint =
                                null)
                        }.bind(this);
                    r = b.extend(s, r), r.scope = this.scope || r.scope, r[w] = c.wrap(r[w], x, !1), r[t] = c.wrap(r[t], y, !1),
                        r[v] = c.wrap(r[v], q.drag), r[u] = c.wrap(r[u], z), r.multipleDrop = !1, r.canDrag = function() {
                            return this.isSource || this.isTemporarySource || this.connections.length > 0
                        }.bind(this), i.initDraggable(this.canvas, r, "internal"), this.canvas._jsPlumbRelatedElement = this.element,
                        p = !0
                }
            };
            var q = a.endpoint || this._jsPlumb.instance.Defaults.Endpoint || b.Defaults.Endpoint;
            this.setEndpoint(q, !0);
            var r = a.anchor ? a.anchor : a.anchors ? a.anchors : i.Defaults.Anchor || "Top";
            this.setAnchor(r, !0);
            var s = ["default", a.type || ""].join(" ");
            this.addType(s, a.data, !0), this.canvas = this.endpoint.canvas, this.canvas._jsPlumb = this, this.initDraggable();
            var t = function(d, e, f, g) {
                if (b.isDropSupported(this.element)) {
                    var h = a.dropOptions || i.Defaults.DropOptions || b.Defaults.DropOptions;
                    h = b.extend({}, h), h.scope = h.scope || this.scope;
                    var j = b.dragEvents.drop,
                        k = b.dragEvents.over,
                        l = b.dragEvents.out,
                        m = this,
                        n = i.EndpointDropHandler({
                            getEndpoint: function() {
                                return m
                            },
                            jsPlumb: i,
                            enabled: function() {
                                return null != f ? f.isEnabled() : !0
                            },
                            isFull: function() {
                                return f.isFull()
                            },
                            element: this.element,
                            elementId: this.elementId,
                            isSource: this.isSource,
                            isTarget: this.isTarget,
                            addClass: function(a) {
                                m.addClass(a)
                            },
                            removeClass: function(a) {
                                m.removeClass(a)
                            },
                            isDropAllowed: function() {
                                return m.isDropAllowed.apply(m, arguments)
                            },
                            reference: g,
                            isRedrop: function(a, b) {
                                return a.suspendedEndpoint && b.reference && a.suspendedEndpoint.id === b.reference.id
                            }
                        });
                    h[j] = c.wrap(h[j], n, !0), h[k] = c.wrap(h[k], function() {
                        var a = b.getDragObject(arguments),
                            c = i.getAttribute(b.getElement(a), "dragId"),
                            d = i.getFloatingConnectionFor(c);
                        if (null != d) {
                            var e = i.getFloatingAnchorIndex(d),
                                f = this.isTarget && 0 !== e || d.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint
                                .id === d.suspendedEndpoint.id;
                            if (f) {
                                var g = i.checkCondition("checkDropAllowed", {
                                    sourceEndpoint: d.endpoints[e],
                                    targetEndpoint: this,
                                    connection: d
                                });
                                this[(g ? "add" : "remove") + "Class"](i.endpointDropAllowedClass), this[(g ? "remove" : "add") +
                                    "Class"](i.endpointDropForbiddenClass), d.endpoints[e].anchor.over(this.anchor, this)
                            }
                        }
                    }.bind(this)), h[l] = c.wrap(h[l], function() {
                        var a = b.getDragObject(arguments),
                            c = null == a ? null : i.getAttribute(b.getElement(a), "dragId"),
                            d = c ? i.getFloatingConnectionFor(c) : null;
                        if (null != d) {
                            var e = i.getFloatingAnchorIndex(d),
                                f = this.isTarget && 0 !== e || d.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint
                                .id === d.suspendedEndpoint.id;
                            f && (this.removeClass(i.endpointDropAllowedClass), this.removeClass(i.endpointDropForbiddenClass), d.endpoints[
                                e].anchor.out())
                        }
                    }.bind(this)), i.initDroppable(d, h, "internal", e)
                }
            }.bind(this);
            return this.anchor.isFloating || t(this.canvas, !(a._transient || this.anchor.isFloating), this, a.reference),
                this
        }, c.extend(b.Endpoint, b.OverlayCapableJsPlumbUIComponent, {
            setVisible: function(a, b, c) {
                if (this._jsPlumb.visible = a, this.canvas && (this.canvas.style.display = a ? "block" : "none"), this[a ?
                        "showOverlays" : "hideOverlays"](), !b)
                    for (var d = 0; d < this.connections.length; d++)
                        if (this.connections[d].setVisible(a), !c) {
                            var e = this === this.connections[d].endpoints[0] ? 1 : 0;
                            1 === this.connections[d].endpoints[e].connections.length && this.connections[d].endpoints[e].setVisible(
                                a, !0, !0)
                        }
            },
            getAttachedElements: function() {
                return this.connections
            },
            applyType: function(a, c) {
                this.setPaintStyle(a.endpointStyle || a.paintStyle, c), this.setHoverPaintStyle(a.endpointHoverStyle || a.hoverPaintStyle,
                    c), null != a.maxConnections && (this._jsPlumb.maxConnections = a.maxConnections), a.scope && (this.scope =
                    a.scope), b.extend(this, a, g), null != a.cssClass && this.canvas && this._jsPlumb.instance.addClass(
                    this.canvas, a.cssClass), b.OverlayCapableJsPlumbUIComponent.applyType(this, a)
            },
            isEnabled: function() {
                return this._jsPlumb.enabled
            },
            setEnabled: function(a) {
                this._jsPlumb.enabled = a
            },
            cleanup: function() {
                var a = this._jsPlumb.instance.endpointAnchorClassPrefix + (this._jsPlumb.currentAnchorClass ? "-" + this._jsPlumb
                    .currentAnchorClass : "");
                b.removeClass(this.element, a), this.anchor = null, this.endpoint.cleanup(!0), this.endpoint.destroy(),
                    this.endpoint = null, this._jsPlumb.instance.destroyDraggable(this.canvas, "internal"), this._jsPlumb.instance
                    .destroyDroppable(this.canvas, "internal")
            },
            setHover: function(a) {
                this.endpoint && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged() && this.endpoint.setHover(
                    a)
            },
            isFull: function() {
                return 0 === this._jsPlumb.maxConnections ? !0 : !(this.isFloating() || this._jsPlumb.maxConnections < 0 ||
                    this.connections.length < this._jsPlumb.maxConnections)
            },
            isFloating: function() {
                return null != this.anchor && this.anchor.isFloating
            },
            isConnectedTo: function(a) {
                var b = !1;
                if (a)
                    for (var c = 0; c < this.connections.length; c++)
                        if (this.connections[c].endpoints[1] === a || this.connections[c].endpoints[0] === a) {
                            b = !0;
                            break
                        } return b
            },
            getConnectionCost: function() {
                return this._jsPlumb.connectionCost
            },
            setConnectionCost: function(a) {
                this._jsPlumb.connectionCost = a
            },
            areConnectionsDirected: function() {
                return this._jsPlumb.connectionsDirected
            },
            setConnectionsDirected: function(a) {
                this._jsPlumb.connectionsDirected = a
            },
            setElementId: function(a) {
                this.elementId = a, this.anchor.elementId = a
            },
            setReferenceElement: function(a) {
                this.element = b.getElement(a)
            },
            setDragAllowedWhenFull: function(a) {
                this.dragAllowedWhenFull = a
            },
            equals: function(a) {
                return this.anchor.equals(a.anchor)
            },
            getUuid: function() {
                return this._jsPlumb.uuid
            },
            computeAnchor: function(a) {
                return this.anchor.compute(a)
            }
        }), a.jsPlumbInstance.prototype.EndpointDropHandler = function(a) {
            return function(b) {
                var d = a.jsPlumb;
                a.removeClass(d.endpointDropAllowedClass), a.removeClass(d.endpointDropForbiddenClass);
                var e = d.getDropEvent(arguments),
                    f = d.getDragObject(arguments),
                    g = d.getAttribute(f, "dragId"),
                    h = (d.getAttribute(f, "elId"), d.getAttribute(f, "originalScope")),
                    i = d.getFloatingConnectionFor(g);
                if (null != i) {
                    var j = null != i.suspendedEndpoint;
                    if (!j || null != i.suspendedEndpoint._jsPlumb) {
                        var k = a.getEndpoint(i);
                        if (null != k) {
                            if (a.isRedrop(i, a)) return i._forceReattach = !0, i.setHover(!1), void(a.maybeCleanup && a.maybeCleanup(
                                k));
                            var l = d.getFloatingAnchorIndex(i);
                            if (0 === l && !a.isSource || 1 === l && !a.isTarget) return void(a.maybeCleanup && a.maybeCleanup(k));
                            a.onDrop && a.onDrop(i), h && d.setDragScope(f, h);
                            var m = a.isFull(b);
                            if (m && k.fire("maxConnections", {
                                    endpoint: this,
                                    connection: i,
                                    maxConnections: k._jsPlumb.maxConnections
                                }, e), !m && a.enabled()) {
                                var n = !0;
                                0 === l ? (i.floatingElement = i.source, i.floatingId = i.sourceId, i.floatingEndpoint = i.endpoints[0],
                                    i.floatingIndex = 0, i.source = a.element, i.sourceId = a.elementId) : (i.floatingElement = i.target,
                                    i.floatingId = i.targetId, i.floatingEndpoint = i.endpoints[1], i.floatingIndex = 1, i.target = a.element,
                                    i.targetId = a.elementId), j && i.suspendedEndpoint.id !== k.id && (i.isDetachAllowed(i) && i.endpoints[
                                    l].isDetachAllowed(i) && i.suspendedEndpoint.isDetachAllowed(i) && d.checkCondition("beforeDetach",
                                    i) || (n = !1));
                                var o = function(b) {
                                        i.endpoints[l].detachFromConnection(i), i.suspendedEndpoint && i.suspendedEndpoint.detachFromConnection(
                                            i), i.endpoints[l] = k, k.addConnection(i);
                                        var f = k.getParameters();
                                        for (var g in f) i.setParameter(g, f[g]);
                                        if (j) {
                                            var h = i.suspendedEndpoint.elementId;
                                            d.fireMoveEvent({
                                                index: l,
                                                originalSourceId: 0 === l ? h : i.sourceId,
                                                newSourceId: 0 === l ? k.elementId : i.sourceId,
                                                originalTargetId: 1 === l ? h : i.targetId,
                                                newTargetId: 1 === l ? k.elementId : i.targetId,
                                                originalSourceEndpoint: 0 === l ? i.suspendedEndpoint : i.endpoints[0],
                                                newSourceEndpoint: 0 === l ? k : i.endpoints[0],
                                                originalTargetEndpoint: 1 === l ? i.suspendedEndpoint : i.endpoints[1],
                                                newTargetEndpoint: 1 === l ? k : i.endpoints[1],
                                                connection: i
                                            }, e)
                                        } else f.draggable && d.initDraggable(this.element, a.dragOptions, "internal", d);
                                        if (1 === l ? d.anchorManager.updateOtherEndpoint(i.sourceId, i.floatingId, i.targetId, i) : d.anchorManager
                                            .sourceChanged(i.floatingId, i.sourceId, i, i.source), i.endpoints[0].finalEndpoint) {
                                            var m = i.endpoints[0];
                                            m.detachFromConnection(i), i.endpoints[0] = i.endpoints[0].finalEndpoint, i.endpoints[0].addConnection(
                                                i)
                                        }
                                        c.isObject(b) && i.mergeData(b), d.finaliseConnection(i, null, e, !1), i.setHover(!1)
                                    }.bind(this),
                                    p = function() {
                                        i.suspendedEndpoint && (i.endpoints[l] = i.suspendedEndpoint, i.setHover(!1), i._forceDetach = !0, 0 ===
                                            l ? (i.source = i.suspendedEndpoint.element, i.sourceId = i.suspendedEndpoint.elementId) : (i.target =
                                                i.suspendedEndpoint.element, i.targetId = i.suspendedEndpoint.elementId), i.suspendedEndpoint.addConnection(
                                                i), 1 === l ? d.anchorManager.updateOtherEndpoint(i.sourceId, i.floatingId, i.targetId, i) : d.anchorManager
                                            .sourceChanged(i.floatingId, i.sourceId, i, i.source), d.repaint(i.sourceId), i._forceDetach = !1)
                                    };
                                if (n = n && a.isDropAllowed(i.sourceId, i.targetId, i.scope, i, k)) return o(n), !0;
                                p()
                            }
                            a.maybeCleanup && a.maybeCleanup(k), d.currentlyDragging = !1
                        }
                    }
                }
            }
        }
    }.call("undefined" != typeof window ? window : this),
    function() {
        "use strict";
        var a = this,
            b = a.jsPlumb,
            c = a.jsPlumbUtil,
            d = function(a, d, e, f, g) {
                if (b.Connectors[d] = b.Connectors[d] || {}, null == b.Connectors[d][e]) {
                    if (null == b.Connectors[e]) {
                        if (a.Defaults.DoNotThrowErrors) return null;
                        throw new TypeError("jsPlumb: unknown connector type '" + e + "'")
                    }
                    b.Connectors[d][e] = function() {
                        b.Connectors[e].apply(this, arguments), b.ConnectorRenderers[d].apply(this, arguments)
                    }, c.extend(b.Connectors[d][e], [b.Connectors[e], b.ConnectorRenderers[d]])
                }
                return new b.Connectors[d][e](f, g)
            },
            e = function(a, b, c) {
                return a ? c.makeAnchor(a, b, c) : null
            },
            f = function(a, b, d, e) {
                null != b && (b._jsPlumbConnections = b._jsPlumbConnections || {}, e ? delete b._jsPlumbConnections[a.id] : b
                    ._jsPlumbConnections[a.id] = !0, c.isEmpty(b._jsPlumbConnections) ? d.removeClass(b, d.connectedClass) : d.addClass(
                        b, d.connectedClass))
            };
        b.Connection = function(a) {
            var d = a.newEndpoint;
            this.id = a.id, this.connector = null, this.idPrefix = "_jsplumb_c_", this.defaultLabelLocation = .5, this.defaultOverlayKeys = [
                    "Overlays", "ConnectionOverlays"
                ], this.previousConnection = a.previousConnection, this.source = b.getElement(a.source), this.target = b.getElement(
                    a.target), b.OverlayCapableJsPlumbUIComponent.apply(this, arguments), a.sourceEndpoint ? (this.source = a.sourceEndpoint
                    .getElement(), this.sourceId = a.sourceEndpoint.elementId) : this.sourceId = this._jsPlumb.instance.getId(
                    this.source), a.targetEndpoint ? (this.target = a.targetEndpoint.getElement(), this.targetId = a.targetEndpoint
                    .elementId) : this.targetId = this._jsPlumb.instance.getId(this.target), this.scope = a.scope, this.endpoints = [],
                this.endpointStyles = [];
            var e = this._jsPlumb.instance;
            e.manage(this.sourceId, this.source), e.manage(this.targetId, this.target), this._jsPlumb.visible = !0, this._jsPlumb
                .params = {
                    cssClass: a.cssClass,
                    container: a.container,
                    "pointer-events": a["pointer-events"],
                    editorParams: a.editorParams,
                    overlays: a.overlays
                }, this._jsPlumb.lastPaintedAt = null, this.bind("mouseover", function() {
                    this.setHover(!0)
                }.bind(this)), this.bind("mouseout", function() {
                    this.setHover(!1)
                }.bind(this)), this.makeEndpoint = function(b, c, f, g) {
                    return f = f || this._jsPlumb.instance.getId(c), this.prepareEndpoint(e, d, this, g, b ? 0 : 1, a, c, f)
                }, a.type && (a.endpoints = a.endpoints || this._jsPlumb.instance.deriveEndpointAndAnchorSpec(a.type).endpoints);
            var f = this.makeEndpoint(!0, this.source, this.sourceId, a.sourceEndpoint),
                g = this.makeEndpoint(!1, this.target, this.targetId, a.targetEndpoint);
            f && c.addToList(a.endpointsByElement, this.sourceId, f), g && c.addToList(a.endpointsByElement, this.targetId,
                g), this.scope || (this.scope = this.endpoints[0].scope), null != a.deleteEndpointsOnEmpty && (this.endpoints[
                0].setDeleteOnEmpty(a.deleteEndpointsOnEmpty), this.endpoints[1].setDeleteOnEmpty(a.deleteEndpointsOnEmpty));
            var h = e.Defaults.ConnectionsDetachable;
            a.detachable === !1 && (h = !1), this.endpoints[0].connectionsDetachable === !1 && (h = !1), this.endpoints[1]
                .connectionsDetachable === !1 && (h = !1);
            var i = a.reattach || this.endpoints[0].reattachConnections || this.endpoints[1].reattachConnections || e.Defaults
                .ReattachConnections;
            this.appendToDefaultType({
                detachable: h,
                reattach: i,
                paintStyle: this.endpoints[0].connectorStyle || this.endpoints[1].connectorStyle || a.paintStyle || e.Defaults
                    .PaintStyle || b.Defaults.PaintStyle,
                hoverPaintStyle: this.endpoints[0].connectorHoverStyle || this.endpoints[1].connectorHoverStyle || a.hoverPaintStyle ||
                    e.Defaults.HoverPaintStyle || b.Defaults.HoverPaintStyle
            });
            var j = e.getSuspendedAt();
            if (!e.isSuspendDrawing()) {
                var k = e.getCachedData(this.sourceId),
                    l = k.o,
                    m = k.s,
                    n = e.getCachedData(this.targetId),
                    o = n.o,
                    p = n.s,
                    q = j || e.timestamp(),
                    r = this.endpoints[0].anchor.compute({
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
                }), this.endpoints[1].paint({
                    anchorLoc: r,
                    timestamp: q
                })
            }
            this.getTypeDescriptor = function() {
                    return "connection"
                }, this.getAttachedElements = function() {
                    return this.endpoints
                }, this.isDetachable = function() {
                    return this._jsPlumb.detachable === !0
                }, this.setDetachable = function(a) {
                    this._jsPlumb.detachable = a === !0
                }, this.isReattach = function() {
                    return this._jsPlumb.reattach === !0 || this.endpoints[0].reattachConnections === !0 || this.endpoints[1].reattachConnections ===
                        !0
                }, this.setReattach = function(a) {
                    this._jsPlumb.reattach = a === !0
                }, this._jsPlumb.cost = a.cost || this.endpoints[0].getConnectionCost(), this._jsPlumb.directed = a.directed,
                null == a.directed && (this._jsPlumb.directed = this.endpoints[0].areConnectionsDirected());
            var s = b.extend({}, this.endpoints[1].getParameters());
            b.extend(s, this.endpoints[0].getParameters()), b.extend(s, this.getParameters()), this.setParameters(s),
                this.setConnector(this.endpoints[0].connector || this.endpoints[1].connector || a.connector || e.Defaults.Connector ||
                    b.Defaults.Connector, !0);
            var t = null != a.data && c.isObject(a.data) ? a.data : {};
            this.getData = function() {
                return t
            }, this.setData = function(a) {
                t = a || {}
            }, this.mergeData = function(a) {
                t = b.extend(t, a)
            };
            var u = ["default", this.endpoints[0].connectionType, this.endpoints[1].connectionType, a.type].join(" ");
            /[^\s]/.test(u) && this.addType(u, a.data, !0), this.updateConnectedClass()
        }, c.extend(b.Connection, b.OverlayCapableJsPlumbUIComponent, {
            applyType: function(a, c, d) {
                var e = null;
                null != a.connector && (e = this.getCachedTypeItem("connector", d.connector), null == e && (e = this.prepareConnector(
                        a.connector, d.connector), this.cacheTypeItem("connector", e, d.connector)), this.setPreparedConnector(
                        e)), null != a.detachable && this.setDetachable(a.detachable), null != a.reattach && this.setReattach(a.reattach),
                    a.scope && (this.scope = a.scope), null != a.cssClass && this.canvas && this._jsPlumb.instance.addClass(
                        this.canvas, a.cssClass);
                var f = null;
                a.anchor ? (f = this.getCachedTypeItem("anchors", d.anchor), null == f && (f = [this._jsPlumb.instance.makeAnchor(
                        a.anchor), this._jsPlumb.instance.makeAnchor(a.anchor)], this.cacheTypeItem("anchors", f, d.anchor))) :
                    a.anchors && (f = this.getCachedTypeItem("anchors", d.anchors), null == f && (f = [this._jsPlumb.instance
                        .makeAnchor(a.anchors[0]), this._jsPlumb.instance.makeAnchor(a.anchors[1])
                    ], this.cacheTypeItem("anchors", f, d.anchors))), null != f && (this.endpoints[0].anchor = f[0], this.endpoints[
                        1].anchor = f[1], this.endpoints[1].anchor.isDynamic && this._jsPlumb.instance.repaint(this.endpoints[1]
                        .elementId)), b.OverlayCapableJsPlumbUIComponent.applyType(this, a)
            },
            addClass: function(a, b) {
                b && (this.endpoints[0].addClass(a), this.endpoints[1].addClass(a), this.suspendedEndpoint && this.suspendedEndpoint
                    .addClass(a)), this.connector && this.connector.addClass(a)
            },
            removeClass: function(a, b) {
                b && (this.endpoints[0].removeClass(a), this.endpoints[1].removeClass(a), this.suspendedEndpoint && this.suspendedEndpoint
                    .removeClass(a)), this.connector && this.connector.removeClass(a)
            },
            isVisible: function() {
                return this._jsPlumb.visible
            },
            setVisible: function(a) {
                this._jsPlumb.visible = a, this.connector && this.connector.setVisible(a), this.repaint()
            },
            cleanup: function() {
                this.updateConnectedClass(!0), this.endpoints = null, this.source = null, this.target = null, null != this
                    .connector && (this.connector.cleanup(!0), this.connector.destroy(!0)), this.connector = null
            },
            updateConnectedClass: function(a) {
                this._jsPlumb && (f(this, this.source, this._jsPlumb.instance, a), f(this, this.target, this._jsPlumb.instance,
                    a))
            },
            setHover: function(b) {
                this.connector && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged() && (this.connector.setHover(
                    b), a.jsPlumb[b ? "addClass" : "removeClass"](this.source, this._jsPlumb.instance.hoverSourceClass), a.jsPlumb[
                    b ? "addClass" : "removeClass"](this.target, this._jsPlumb.instance.hoverTargetClass))
            },
            getUuids: function() {
                return [this.endpoints[0].getUuid(), this.endpoints[1].getUuid()]
            },
            getCost: function() {
                return this._jsPlumb ? this._jsPlumb.cost : -(1 / 0)
            },
            setCost: function(a) {
                this._jsPlumb.cost = a
            },
            isDirected: function() {
                return this._jsPlumb.directed
            },
            getConnector: function() {
                return this.connector
            },
            prepareConnector: function(a, b) {
                var e, f = {
                        _jsPlumb: this._jsPlumb.instance,
                        cssClass: this._jsPlumb.params.cssClass,
                        container: this._jsPlumb.params.container,
                        "pointer-events": this._jsPlumb.params["pointer-events"]
                    },
                    g = this._jsPlumb.instance.getRenderMode();
                return c.isString(a) ? e = d(this._jsPlumb.instance, g, a, f, this) : c.isArray(a) && (e = 1 === a.length ?
                    d(this._jsPlumb.instance, g, a[0], f, this) : d(this._jsPlumb.instance, g, a[0], c.merge(a[1], f), this)
                ), null != b && (e.typeId = b), e
            },
            setPreparedConnector: function(a, b, c, d) {
                if (this.connector !== a) {
                    var e, f = "";
                    if (null != this.connector && (e = this.connector, f = e.getClass(), this.connector.cleanup(), this.connector
                            .destroy()), this.connector = a, d && this.cacheTypeItem("connector", a, d), this.canvas = this.connector
                        .canvas, this.bgCanvas = this.connector.bgCanvas, this.addClass(f), this.canvas && (this.canvas._jsPlumb =
                            this), this.bgCanvas && (this.bgCanvas._jsPlumb = this), null != e)
                        for (var g = this.getOverlays(), h = 0; h < g.length; h++) g[h].transfer && g[h].transfer(this.connector);
                    c || this.setListenerComponent(this.connector), b || this.repaint()
                }
            },
            setConnector: function(a, b, c, d) {
                var e = this.prepareConnector(a, d);
                this.setPreparedConnector(e, b, c, d)
            },
            paint: function(a) {
                if (!this._jsPlumb.instance.isSuspendDrawing() && this._jsPlumb.visible) {
                    a = a || {};
                    var b = a.timestamp,
                        c = !1,
                        d = c ? this.sourceId : this.targetId,
                        e = c ? this.targetId : this.sourceId,
                        f = c ? 0 : 1,
                        g = c ? 1 : 0;
                    if (null == b || b !== this._jsPlumb.lastPaintedAt) {
                        var h = this._jsPlumb.instance.updateOffset({
                                elId: e
                            }).o,
                            i = this._jsPlumb.instance.updateOffset({
                                elId: d
                            }).o,
                            j = this.endpoints[g],
                            k = this.endpoints[f],
                            l = j.anchor.getCurrentLocation({
                                xy: [h.left, h.top],
                                wh: [h.width, h.height],
                                element: j,
                                timestamp: b
                            }),
                            m = k.anchor.getCurrentLocation({
                                xy: [i.left, i.top],
                                wh: [i.width, i.height],
                                element: k,
                                timestamp: b
                            });
                        this.connector.resetBounds(), this.connector.compute({
                            sourcePos: l,
                            targetPos: m,
                            sourceOrientation: j.anchor.getOrientation(j),
                            targetOrientation: k.anchor.getOrientation(k),
                            sourceEndpoint: this.endpoints[g],
                            targetEndpoint: this.endpoints[f],
                            "stroke-width": this._jsPlumb.paintStyleInUse.strokeWidth,
                            sourceInfo: h,
                            targetInfo: i
                        });
                        var n = {
                            minX: 1 / 0,
                            minY: 1 / 0,
                            maxX: -(1 / 0),
                            maxY: -(1 / 0)
                        };
                        for (var o in this._jsPlumb.overlays)
                            if (this._jsPlumb.overlays.hasOwnProperty(o)) {
                                var p = this._jsPlumb.overlays[o];
                                p.isVisible() && (this._jsPlumb.overlayPlacements[o] = p.draw(this.connector, this._jsPlumb.paintStyleInUse,
                                        this.getAbsoluteOverlayPosition(p)), n.minX = Math.min(n.minX, this._jsPlumb.overlayPlacements[o].minX),
                                    n.maxX = Math.max(n.maxX, this._jsPlumb.overlayPlacements[o].maxX), n.minY = Math.min(n.minY, this._jsPlumb
                                        .overlayPlacements[o].minY), n.maxY = Math.max(n.maxY, this._jsPlumb.overlayPlacements[o].maxY))
                            } var q = parseFloat(this._jsPlumb.paintStyleInUse.strokeWidth || 1) / 2,
                            r = parseFloat(this._jsPlumb.paintStyleInUse.strokeWidth || 0),
                            s = {
                                xmin: Math.min(this.connector.bounds.minX - (q + r), n.minX),
                                ymin: Math.min(this.connector.bounds.minY - (q + r), n.minY),
                                xmax: Math.max(this.connector.bounds.maxX + (q + r), n.maxX),
                                ymax: Math.max(this.connector.bounds.maxY + (q + r), n.maxY)
                            };
                        this.connector.paint(this._jsPlumb.paintStyleInUse, null, s);
                        for (var t in this._jsPlumb.overlays)
                            if (this._jsPlumb.overlays.hasOwnProperty(t)) {
                                var u = this._jsPlumb.overlays[t];
                                u.isVisible() && u.paint(this._jsPlumb.overlayPlacements[t], s)
                            }
                    }
                    this._jsPlumb.lastPaintedAt = b
                }
            },
            repaint: function(a) {
                var b = jsPlumb.extend(a || {}, {});
                b.elId = this.sourceId, this.paint(b)
            },
            prepareEndpoint: function(a, c, d, f, g, h, i, j) {
                var k;
                if (f) d.endpoints[g] = f, f.addConnection(d);
                else {
                    h.endpoints || (h.endpoints = [null, null]);
                    var l = h.endpoints[g] || h.endpoint || a.Defaults.Endpoints[g] || b.Defaults.Endpoints[g] || a.Defaults.Endpoint ||
                        b.Defaults.Endpoint;
                    h.endpointStyles || (h.endpointStyles = [null, null]), h.endpointHoverStyles || (h.endpointHoverStyles = [
                        null, null
                    ]);
                    var m = h.endpointStyles[g] || h.endpointStyle || a.Defaults.EndpointStyles[g] || b.Defaults.EndpointStyles[
                        g] || a.Defaults.EndpointStyle || b.Defaults.EndpointStyle;
                    null == m.fill && null != h.paintStyle && (m.fill = h.paintStyle.stroke), null == m.outlineStroke && null !=
                        h.paintStyle && (m.outlineStroke = h.paintStyle.outlineStroke), null == m.outlineWidth && null != h.paintStyle &&
                        (m.outlineWidth = h.paintStyle.outlineWidth);
                    var n = h.endpointHoverStyles[g] || h.endpointHoverStyle || a.Defaults.EndpointHoverStyles[g] || b.Defaults
                        .EndpointHoverStyles[g] || a.Defaults.EndpointHoverStyle || b.Defaults.EndpointHoverStyle;
                    null != h.hoverPaintStyle && (null == n && (n = {}), null == n.fill && (n.fill = h.hoverPaintStyle.stroke));
                    var o = h.anchors ? h.anchors[g] : h.anchor ? h.anchor : e(a.Defaults.Anchors[g], j, a) || e(b.Defaults.Anchors[
                            g], j, a) || e(a.Defaults.Anchor, j, a) || e(b.Defaults.Anchor, j, a),
                        p = h.uuids ? h.uuids[g] : null;
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
                    }), null == f && k.setDeleteOnEmpty(!0), d.endpoints[g] = k, h.drawEndpoints === !1 && k.setVisible(!1,
                        !0, !0)
                }
                return k
            }
        })
    }.call("undefined" != typeof window ? window : this),
    function() {
        "use strict";
        var a = this,
            b = a.jsPlumbUtil,
            c = a.jsPlumb;
        c.AnchorManager = function(a) {
            var d = {},
                e = {},
                f = {},
                g = {},
                h = {},
                i = this,
                j = {},
                k = a.jsPlumbInstance,
                l = {},
                m = function(a, b, c, d, e, f, g) {
                    for (var h = [], i = b[e ? 0 : 1] / (d.length + 1), j = 0; j < d.length; j++) {
                        var k = (j + 1) * i,
                            l = f * b[e ? 1 : 0];
                        g && (k = b[e ? 0 : 1] - k);
                        var m = e ? k : l,
                            n = c[0] + m,
                            o = m / b[0],
                            p = e ? l : k,
                            q = c[1] + p,
                            r = p / b[1];
                        h.push([n, q, o, r, d[j][1], d[j][2]])
                    }
                    return h
                },
                n = function(a) {
                    return function(b, c) {
                        var d = !0;
                        return d = a ? b[0][0] < c[0][0] : b[0][0] > c[0][0], d === !1 ? -1 : 1
                    }
                },
                o = function(a, b) {
                    var c = a[0][0] < 0 ? -Math.PI - a[0][0] : Math.PI - a[0][0],
                        d = b[0][0] < 0 ? -Math.PI - b[0][0] : Math.PI - b[0][0];
                    return c > d ? 1 : -1
                },
                p = {
                    top: function(a, b) {
                        return a[0] > b[0] ? 1 : -1
                    },
                    right: n(!0),
                    bottom: n(!0),
                    left: o
                },
                q = function(a, b) {
                    return a.sort(b)
                },
                r = function(a, b) {
                    var c = k.getCachedData(a),
                        d = c.s,
                        f = c.o,
                        h = function(b, c, d, f, h, i, j) {
                            if (f.length > 0)
                                for (var k = q(f, p[b]), l = "right" === b || "top" === b, n = m(b, c, d, k, h, i, l), o = function(a, b) {
                                        e[a.id] = [b[0], b[1], b[2], b[3]], g[a.id] = j
                                    }, r = 0; r < n.length; r++) {
                                    var s = n[r][4],
                                        t = s.endpoints[0].elementId === a,
                                        u = s.endpoints[1].elementId === a;
                                    t && o(s.endpoints[0], n[r]), u && o(s.endpoints[1], n[r])
                                }
                        };
                    h("bottom", d, [f.left, f.top], b.bottom, !0, 1, [0, 1]), h("top", d, [f.left, f.top], b.top, !0, 0, [0, -1]),
                        h("left", d, [f.left, f.top], b.left, !1, 0, [-1, 0]), h("right", d, [f.left, f.top], b.right, !1, 1, [1,
                            0
                        ])
                };
            this.reset = function() {
                d = {}, h = {}, j = {}
            }, this.addFloatingConnection = function(a, b) {
                l[a] = b
            }, this.removeFloatingConnection = function(a) {
                delete l[a]
            }, this.newConnection = function(a) {
                var d = a.sourceId,
                    e = a.targetId,
                    f = a.endpoints,
                    g = !0,
                    i = function(i, j, k, l, m) {
                        d === e && k.isContinuous && (a._jsPlumb.instance.removeElement(f[1].canvas), g = !1), b.addToList(h, l,
                            [m, j, k.constructor === c.DynamicAnchor])
                    };
                i(0, f[0], f[0].anchor, e, a), g && i(1, f[1], f[1].anchor, d, a)
            };
            var s = function(a) {
                ! function(a, c) {
                    if (a) {
                        var d = function(a) {
                            return a[4] === c
                        };
                        b.removeWithFunction(a.top, d), b.removeWithFunction(a.left, d), b.removeWithFunction(a.bottom, d), b.removeWithFunction(
                            a.right, d)
                    }
                }(j[a.elementId], a.id)
            };
            this.connectionDetached = function(a, c) {
                var d = a.connection || a,
                    e = a.sourceId,
                    f = a.targetId,
                    g = d.endpoints,
                    j = function(a, c, d, e, f) {
                        b.removeWithFunction(h[e], function(a) {
                            return a[0].id === f.id
                        })
                    };
                j(1, g[1], g[1].anchor, e, d), j(0, g[0], g[0].anchor, f, d), d.floatingId && (j(d.floatingIndex, d.floatingEndpoint,
                        d.floatingEndpoint.anchor, d.floatingId, d), s(d.floatingEndpoint)), s(d.endpoints[0]), s(d.endpoints[1]),
                    c || (i.redraw(d.sourceId), d.targetId !== d.sourceId && i.redraw(d.targetId))
            }, this.add = function(a, c) {
                b.addToList(d, c, a)
            }, this.changeId = function(a, b) {
                h[b] = h[a], d[b] = d[a], delete h[a], delete d[a]
            }, this.getConnectionsFor = function(a) {
                return h[a] || []
            }, this.getEndpointsFor = function(a) {
                return d[a] || []
            }, this.deleteEndpoint = function(a) {
                b.removeWithFunction(d[a.elementId], function(b) {
                    return b.id === a.id
                }), s(a)
            }, this.clearFor = function(a) {
                delete d[a], d[a] = []
            };
            var t = function(c, d, e, f, g, h, i, j, k, l, m, n) {
                var o, p, q = -1,
                    r = -1,
                    s = f.endpoints[i],
                    t = s.id,
                    u = [1, 0][i],
                    v = [
                        [d, e], f, g, h, t
                    ],
                    w = c[k],
                    x = s._continuousAnchorEdge ? c[s._continuousAnchorEdge] : null;
                if (x) {
                    var y = b.findWithFunction(x, function(a) {
                        return a[4] === t
                    });
                    if (-1 !== y)
                        for (x.splice(y, 1), o = 0; o < x.length; o++) p = x[o][1], b.addWithFunction(m, p, function(a) {
                            return a.id === p.id
                        }), b.addWithFunction(n, x[o][1].endpoints[i], function(a) {
                            return a.id === p.endpoints[i].id
                        }), b.addWithFunction(n, x[o][1].endpoints[u], function(a) {
                            return a.id === p.endpoints[u].id
                        })
                }
                for (o = 0; o < w.length; o++) p = w[o][1], 1 === a.idx && w[o][3] === h && -1 === r && (r = o), b.addWithFunction(
                    m, p,
                    function(a) {
                        return a.id === p.id
                    }), b.addWithFunction(n, w[o][1].endpoints[i], function(a) {
                    return a.id === p.endpoints[i].id
                }), b.addWithFunction(n, w[o][1].endpoints[u], function(a) {
                    return a.id === p.endpoints[u].id
                });
                if (-1 !== q) w[q] = v;
                else {
                    var z = j ? -1 !== r ? r : 0 : w.length;
                    w.splice(z, 0, v)
                }
                s._continuousAnchorEdge = k
            };
            this.updateOtherEndpoint = function(a, d, e, f) {
                var g = b.findWithFunction(h[a], function(a) {
                        return a[0].id === f.id
                    }),
                    i = b.findWithFunction(h[d], function(a) {
                        return a[0].id === f.id
                    }); - 1 !== g && (h[a][g][0] = f, h[a][g][1] = f.endpoints[1], h[a][g][2] = f.endpoints[1].anchor.constructor ===
                    c.DynamicAnchor), i > -1 && (h[d].splice(i, 1), b.addToList(h, e, [f, f.endpoints[0], f.endpoints[0].anchor
                    .constructor === c.DynamicAnchor
                ])), f.updateConnectedClass()
            }, this.sourceChanged = function(a, d, e, f) {
                if (a !== d) {
                    e.sourceId = d, e.source = f, b.removeWithFunction(h[a], function(a) {
                        return a[0].id === e.id
                    });
                    var g = b.findWithFunction(h[e.targetId], function(a) {
                        return a[0].id === e.id
                    });
                    g > -1 && (h[e.targetId][g][0] = e, h[e.targetId][g][1] = e.endpoints[0], h[e.targetId][g][2] = e.endpoints[
                        0].anchor.constructor === c.DynamicAnchor), b.addToList(h, d, [e, e.endpoints[1], e.endpoints[1].anchor.constructor ===
                        c.DynamicAnchor
                    ]), e.endpoints[1].anchor.isContinuous && (e.source === e.target ? e._jsPlumb.instance.removeElement(e.endpoints[
                        1].canvas) : null == e.endpoints[1].canvas.parentNode && e._jsPlumb.instance.appendElement(e.endpoints[
                        1].canvas)), e.updateConnectedClass()
                }
            }, this.rehomeEndpoint = function(a, b, c) {
                var e = d[b] || [],
                    f = k.getId(c);
                if (f !== b) {
                    var g = e.indexOf(a);
                    if (g > -1) {
                        var h = e.splice(g, 1)[0];
                        i.add(h, f)
                    }
                }
                for (var j = 0; j < a.connections.length; j++) a.connections[j].sourceId === b ? i.sourceChanged(b, a.elementId,
                    a.connections[j], a.element) : a.connections[j].targetId === b && (a.connections[j].targetId = a.elementId,
                    a.connections[j].target = a.element, i.updateOtherEndpoint(a.connections[j].sourceId, b, a.elementId, a.connections[
                        j]))
            }, this.redraw = function(a, e, f, g, i, m) {
                if (!k.isSuspendDrawing()) {
                    var n = d[a] || [],
                        o = h[a] || [],
                        p = [],
                        q = [],
                        s = [];
                    f = f || k.timestamp(), g = g || {
                        left: 0,
                        top: 0
                    }, e && (e = {
                        left: e.left + g.left,
                        top: e.top + g.top
                    });
                    for (var u = k.updateOffset({
                            elId: a,
                            offset: e,
                            recalc: !1,
                            timestamp: f
                        }), v = {}, w = 0; w < o.length; w++) {
                        var x = o[w][0],
                            y = x.sourceId,
                            z = x.targetId,
                            A = x.endpoints[0].anchor.isContinuous,
                            B = x.endpoints[1].anchor.isContinuous;
                        if (A || B) {
                            var C = y + "_" + z,
                                D = v[C],
                                E = x.sourceId === a ? 1 : 0;
                            A && !j[y] && (j[y] = {
                                top: [],
                                right: [],
                                bottom: [],
                                left: []
                            }), B && !j[z] && (j[z] = {
                                top: [],
                                right: [],
                                bottom: [],
                                left: []
                            }), a !== z && k.updateOffset({
                                elId: z,
                                timestamp: f
                            }), a !== y && k.updateOffset({
                                elId: y,
                                timestamp: f
                            });
                            var F = k.getCachedData(z),
                                G = k.getCachedData(y);
                            z === y && (A || B) ? (t(j[y], -Math.PI / 2, 0, x, !1, z, 0, !1, "top", y, p, q), t(j[z], -Math.PI / 2,
                                0, x, !1, y, 1, !1, "top", z, p, q)) : (D || (D = this.calculateOrientation(y, z, G.o, F.o, x.endpoints[
                                0].anchor, x.endpoints[1].anchor, x), v[C] = D), A && t(j[y], D.theta, 0, x, !1, z, 0, !1, D.a[0], y,
                                p, q), B && t(j[z], D.theta2, -1, x, !0, y, 1, !0, D.a[1], z, p, q)), A && b.addWithFunction(s, y,
                                function(a) {
                                    return a === y
                                }), B && b.addWithFunction(s, z, function(a) {
                                return a === z
                            }), b.addWithFunction(p, x, function(a) {
                                return a.id === x.id
                            }), (A && 0 === E || B && 1 === E) && b.addWithFunction(q, x.endpoints[E], function(a) {
                                return a.id === x.endpoints[E].id
                            })
                        }
                    }
                    for (w = 0; w < n.length; w++) 0 === n[w].connections.length && n[w].anchor.isContinuous && (j[a] || (j[a] = {
                        top: [],
                        right: [],
                        bottom: [],
                        left: []
                    }), t(j[a], -Math.PI / 2, 0, {
                        endpoints: [n[w], n[w]],
                        paint: function() {}
                    }, !1, a, 0, !1, n[w].anchor.getDefaultFace(), a, p, q), b.addWithFunction(s, a, function(b) {
                        return b === a
                    }));
                    for (w = 0; w < s.length; w++) r(s[w], j[s[w]]);
                    for (w = 0; w < n.length; w++) n[w].paint({
                        timestamp: f,
                        offset: u,
                        dimensions: u.s,
                        recalc: m !== !0
                    });
                    for (w = 0; w < q.length; w++) {
                        var H = k.getCachedData(q[w].elementId);
                        q[w].paint({
                            timestamp: f,
                            offset: H,
                            dimensions: H.s
                        })
                    }
                    for (w = 0; w < o.length; w++) {
                        var I = o[w][1];
                        if (I.anchor.constructor === c.DynamicAnchor) {
                            I.paint({
                                elementWithPrecedence: a,
                                timestamp: f
                            }), b.addWithFunction(p, o[w][0], function(a) {
                                return a.id === o[w][0].id
                            });
                            for (var J = 0; J < I.connections.length; J++) I.connections[J] !== o[w][0] && b.addWithFunction(p, I.connections[
                                J], function(a) {
                                return a.id === I.connections[J].id
                            })
                        } else b.addWithFunction(p, o[w][0], function(a) {
                            return a.id === o[w][0].id
                        })
                    }
                    var K = l[a];
                    for (K && K.paint({
                            timestamp: f,
                            recalc: !1,
                            elId: a
                        }), w = 0; w < p.length; w++) p[w].paint({
                        elId: a,
                        timestamp: f,
                        recalc: !1,
                        clearEdits: i
                    })
                }
            };
            var u = function(a) {
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
                    }, l = d ? j : k, m = d ? k : j, n = a.cssClass || "", o = null, p = null, q = ["left", "right"], r = [
                        "top", "bottom"
                    ], s = null, t = 0; t < c.length; t++) h[c[t]] = !0;
                this.getDefaultFace = function() {
                    return 0 === c.length ? "top" : c[0]
                }, this.isRelocatable = function() {
                    return !0
                }, this.isSnapOnRelocate = function() {
                    return !0
                }, this.verifyEdge = function(a) {
                    return h[a] ? a : h[i[a]] ? i[a] : h[l[a]] ? l[a] : h[m[a]] ? m[a] : a
                }, this.isEdgeSupported = function(a) {
                    return null == s ? null == p ? h[a] === !0 : p === a : -1 !== s.indexOf(a)
                }, this.setCurrentFace = function(a, b) {
                    o = a, b && null != p && (p = o)
                }, this.getCurrentFace = function() {
                    return o
                }, this.getSupportedFaces = function() {
                    var a = [];
                    for (var b in h) h[b] && a.push(b);
                    return a
                }, this.lock = function() {
                    p = o
                }, this.unlock = function() {
                    p = null
                }, this.isLocked = function() {
                    return null != p
                }, this.lockCurrentAxis = function() {
                    null != o && (s = "left" === o || "right" === o ? q : r)
                }, this.unlockCurrentAxis = function() {
                    s = null
                }, this.compute = function(a) {
                    return f[a.element.id] || e[a.element.id] || [0, 0]
                }, this.getCurrentLocation = function(a) {
                    return f[a.element.id] || e[a.element.id] || [0, 0]
                }, this.getOrientation = function(a) {
                    return g[a.id] || [0, 0]
                }, this.clearUserDefinedLocation = function() {
                    delete f[a.elementId]
                }, this.setUserDefinedLocation = function(b) {
                    f[a.elementId] = b
                }, this.getCssClass = function() {
                    return n
                }
            };
            k.continuousAnchorFactory = {
                get: function(a) {
                    return new u(a)
                },
                clear: function(a) {
                    delete f[a], delete e[a]
                }
            }
        }, c.AnchorManager.prototype.calculateOrientation = function(a, b, c, d, e, f) {
            var g = {
                    HORIZONTAL: "horizontal",
                    VERTICAL: "vertical",
                    DIAGONAL: "diagonal",
                    IDENTITY: "identity"
                },
                h = ["left", "top", "right", "bottom"];
            if (a === b) return {
                orientation: g.IDENTITY,
                a: ["top", "top"]
            };
            var i = Math.atan2(d.centery - c.centery, d.centerx - c.centerx),
                j = Math.atan2(c.centery - d.centery, c.centerx - d.centerx),
                k = [],
                l = {};
            ! function(a, b) {
                for (var c = 0; c < a.length; c++) l[a[c]] = {
                    left: [b[c].left, b[c].centery],
                    right: [b[c].right, b[c].centery],
                    top: [b[c].centerx, b[c].top],
                    bottom: [b[c].centerx, b[c].bottom]
                }
            }(["source", "target"], [c, d]);
            for (var m = 0; m < h.length; m++)
                for (var n = 0; n < h.length; n++) k.push({
                    source: h[m],
                    target: h[n],
                    dist: Biltong.lineLength(l.source[h[m]], l.target[h[n]])
                });
            k.sort(function(a, b) {
                return a.dist < b.dist ? -1 : a.dist > b.dist ? 1 : 0
            });
            for (var o = k[0].source, p = k[0].target, q = 0; q < k.length && (o = !e.isContinuous || e.isEdgeSupported(k[
                        q].source) ? k[q].source : null, p = !f.isContinuous || f.isEdgeSupported(k[q].target) ? k[q].target :
                    null, null == o || null == p); q++);
            return e.isContinuous && e.setCurrentFace(o), f.isContinuous && f.setCurrentFace(p), {
                a: [o, p],
                theta: i,
                theta2: j
            }
        }, c.Anchor = function(a) {
            this.x = a.x || 0, this.y = a.y || 0, this.elementId = a.elementId, this.cssClass = a.cssClass || "", this.userDefinedLocation =
                null, this.orientation = a.orientation || [0, 0], this.lastReturnValue = null, this.offsets = a.offsets || [
                    0, 0
                ], this.timestamp = null;
            var c = a.relocatable !== !1;
            this.isRelocatable = function() {
                return c
            }, this.setRelocatable = function(a) {
                c = a
            };
            var d = a.snapOnRelocate !== !1;
            this.isSnapOnRelocate = function() {
                return d
            };
            var e = !1;
            this.lock = function() {
                e = !0
            }, this.unlock = function() {
                e = !1
            }, this.isLocked = function() {
                return e
            }, b.EventGenerator.apply(this), this.compute = function(a) {
                var b = a.xy,
                    c = a.wh,
                    d = a.timestamp;
                return a.clearUserDefinedLocation && (this.userDefinedLocation = null), d && d === this.timestamp ? this.lastReturnValue :
                    (null != this.userDefinedLocation ? this.lastReturnValue = this.userDefinedLocation : this.lastReturnValue = [
                        b[0] + this.x * c[0] + this.offsets[0], b[1] + this.y * c[1] + this.offsets[1], this.x, this.y
                    ], this.timestamp = d, this.lastReturnValue)
            }, this.getCurrentLocation = function(a) {
                return a = a || {}, null == this.lastReturnValue || null != a.timestamp && this.timestamp !== a.timestamp ?
                    this.compute(a) : this.lastReturnValue
            }, this.setPosition = function(a, b, c, d, f) {
                (!e || f) && (this.x = a, this.y = b, this.orientation = [c, d], this.lastReturnValue = null)
            }
        }, b.extend(c.Anchor, b.EventGenerator, {
            equals: function(a) {
                if (!a) return !1;
                var b = a.getOrientation(),
                    c = this.getOrientation();
                return this.x === a.x && this.y === a.y && this.offsets[0] === a.offsets[0] && this.offsets[1] === a.offsets[
                    1] && c[0] === b[0] && c[1] === b[1]
            },
            getUserDefinedLocation: function() {
                return this.userDefinedLocation
            },
            setUserDefinedLocation: function(a) {
                this.userDefinedLocation = a
            },
            clearUserDefinedLocation: function() {
                this.userDefinedLocation = null
            },
            getOrientation: function() {
                return this.orientation
            },
            getCssClass: function() {
                return this.cssClass
            }
        }), c.FloatingAnchor = function(a) {
            c.Anchor.apply(this, arguments);
            var b = a.reference,
                d = a.referenceCanvas,
                e = c.getSize(d),
                f = 0,
                g = 0,
                h = null,
                i = null;
            this.orientation = null, this.x = 0, this.y = 0, this.isFloating = !0, this.compute = function(a) {
                var b = a.xy,
                    c = [b[0] + e[0] / 2, b[1] + e[1] / 2];
                return i = c, c
            }, this.getOrientation = function(a) {
                if (h) return h;
                var c = b.getOrientation(a);
                return [Math.abs(c[0]) * f * -1, Math.abs(c[1]) * g * -1]
            }, this.over = function(a, b) {
                h = a.getOrientation(b)
            }, this.out = function() {
                h = null
            }, this.getCurrentLocation = function(a) {
                return null == i ? this.compute(a) : i
            }
        }, b.extend(c.FloatingAnchor, c.Anchor);
        var d = function(a, b, d) {
            return a.constructor === c.Anchor ? a : b.makeAnchor(a, d, b)
        };
        c.DynamicAnchor = function(a) {
            c.Anchor.apply(this, arguments), this.isDynamic = !0, this.anchors = [], this.elementId = a.elementId, this.jsPlumbInstance =
                a.jsPlumbInstance;
            for (var b = 0; b < a.anchors.length; b++) this.anchors[b] = d(a.anchors[b], this.jsPlumbInstance, this.elementId);
            this.getAnchors = function() {
                return this.anchors
            };
            var e = this.anchors.length > 0 ? this.anchors[0] : null,
                f = e,
                g = this,
                h = function(a, b, c, d, e) {
                    var f = d[0] + a.x * e[0],
                        g = d[1] + a.y * e[1],
                        h = d[0] + e[0] / 2,
                        i = d[1] + e[1] / 2;
                    return Math.sqrt(Math.pow(b - f, 2) + Math.pow(c - g, 2)) + Math.sqrt(Math.pow(h - f, 2) + Math.pow(i - g,
                        2))
                },
                i = a.selector || function(a, b, c, d, e) {
                    for (var f = c[0] + d[0] / 2, g = c[1] + d[1] / 2, i = -1, j = 1 / 0, k = 0; k < e.length; k++) {
                        var l = h(e[k], f, g, a, b);
                        j > l && (i = k + 0, j = l)
                    }
                    return e[i]
                };
            this.compute = function(a) {
                var b = a.xy,
                    c = a.wh,
                    d = a.txy,
                    h = a.twh;
                this.timestamp = a.timestamp;
                var j = g.getUserDefinedLocation();
                return null != j ? j : this.isLocked() || null == d || null == h ? e.compute(a) : (a.timestamp = null, e =
                    i(b, c, d, h, this.anchors), this.x = e.x, this.y = e.y, e !== f && this.fire("anchorChanged", e), f = e,
                    e.compute(a))
            }, this.getCurrentLocation = function(a) {
                return this.getUserDefinedLocation() || (null != e ? e.getCurrentLocation(a) : null)
            }, this.getOrientation = function(a) {
                return null != e ? e.getOrientation(a) : [0, 0]
            }, this.over = function(a, b) {
                null != e && e.over(a, b)
            }, this.out = function() {
                null != e && e.out()
            }, this.setAnchor = function(a) {
                e = a
            }, this.getCssClass = function() {
                return e && e.getCssClass() || ""
            }, this.setAnchorCoordinates = function(a) {
                var b = jsPlumbUtil.findWithFunction(this.anchors, function(b) {
                    return b.x === a[0] && b.y === a[1]
                });
                return -1 !== b ? (this.setAnchor(this.anchors[b]), !0) : !1
            }
        }, b.extend(c.DynamicAnchor, c.Anchor);
        var e = function(a, b, d, e, f, g) {
            c.Anchors[f] = function(c) {
                var h = c.jsPlumbInstance.makeAnchor([a, b, d, e, 0, 0], c.elementId, c.jsPlumbInstance);
                return h.type = f, g && g(h, c), h
            }
        };
        e(.5, 0, 0, -1, "TopCenter"), e(.5, 1, 0, 1, "BottomCenter"), e(0, .5, -1, 0, "LeftMiddle"), e(1, .5, 1, 0,
            "RightMiddle"), e(.5, 0, 0, -1, "Top"), e(.5, 1, 0, 1, "Bottom"), e(0, .5, -1, 0, "Left"), e(1, .5, 1, 0,
            "Right"), e(.5, .5, 0, 0, "Center"), e(1, 0, 0, -1, "TopRight"), e(1, 1, 0, 1, "BottomRight"), e(0, 0, 0, -1,
            "TopLeft"), e(0, 1, 0, 1, "BottomLeft"), c.Defaults.DynamicAnchors = function(a) {
            return a.jsPlumbInstance.makeAnchors(["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"], a.elementId,
                a.jsPlumbInstance)
        }, c.Anchors.AutoDefault = function(a) {
            var b = a.jsPlumbInstance.makeDynamicAnchor(c.Defaults.DynamicAnchors(a));
            return b.type = "AutoDefault", b
        };
        var f = function(a, b) {
            c.Anchors[a] = function(c) {
                var d = c.jsPlumbInstance.makeAnchor(["Continuous", {
                    faces: b
                }], c.elementId, c.jsPlumbInstance);
                return d.type = a, d
            }
        };
        c.Anchors.Continuous = function(a) {
            return a.jsPlumbInstance.continuousAnchorFactory.get(a)
        }, f("ContinuousLeft", ["left"]), f("ContinuousTop", ["top"]), f("ContinuousBottom", ["bottom"]), f(
            "ContinuousRight", ["right"]), e(0, 0, 0, 0, "Assign", function(a, b) {
            var c = b.position || "Fixed";
            a.positionFinder = c.constructor === String ? b.jsPlumbInstance.AnchorPositionFinders[c] : c, a.constructorParams =
                b
        }), a.jsPlumbInstance.prototype.AnchorPositionFinders = {
            Fixed: function(a, b, c) {
                return [(a.left - b.left) / c[0], (a.top - b.top) / c[1]]
            },
            Grid: function(a, b, c, d) {
                var e = a.left - b.left,
                    f = a.top - b.top,
                    g = c[0] / d.grid[0],
                    h = c[1] / d.grid[1],
                    i = Math.floor(e / g),
                    j = Math.floor(f / h);
                return [(i * g + g / 2) / c[0], (j * h + h / 2) / c[1]]
            }
        }, c.Anchors.Perimeter = function(a) {
            a = a || {};
            var b = a.anchorCount || 60,
                c = a.shape;
            if (!c) throw new Error("no shape supplied to Perimeter Anchor type");
            var d = function() {
                    for (var a = .5, c = 2 * Math.PI / b, d = 0, e = [], f = 0; b > f; f++) {
                        var g = a + a * Math.sin(d),
                            h = a + a * Math.cos(d);
                        e.push([g, h, 0, 0]), d += c
                    }
                    return e
                },
                e = function(a) {
                    for (var c = b / a.length, d = [], e = function(a, e, f, g, h) {
                            c = b * h;
                            for (var i = (f - a) / c, j = (g - e) / c, k = 0; c > k; k++) d.push([a + i * k, e + j * k, 0, 0])
                        }, f = 0; f < a.length; f++) e.apply(null, a[f]);
                    return d
                },
                f = function(a) {
                    for (var b = [], c = 0; c < a.length; c++) b.push([a[c][0], a[c][1], a[c][2], a[c][3], 1 / a.length]);
                    return e(b)
                },
                g = function() {
                    return f([
                        [0, 0, 1, 0],
                        [1, 0, 1, 1],
                        [1, 1, 0, 1],
                        [0, 1, 0, 0]
                    ])
                },
                h = {
                    Circle: d,
                    Ellipse: d,
                    Diamond: function() {
                        return f([
                            [.5, 0, 1, .5],
                            [1, .5, .5, 1],
                            [.5, 1, 0, .5],
                            [0, .5, .5, 0]
                        ])
                    },
                    Rectangle: g,
                    Square: g,
                    Triangle: function() {
                        return f([
                            [.5, 0, 1, 1],
                            [1, 1, 0, 1],
                            [0, 1, .5, 0]
                        ])
                    },
                    Path: function(a) {
                        for (var b = a.points, c = [], d = 0, f = 0; f < b.length - 1; f++) {
                            var g = Math.sqrt(Math.pow(b[f][2] - b[f][0]) + Math.pow(b[f][3] - b[f][1]));
                            d += g, c.push([b[f][0], b[f][1], b[f + 1][0], b[f + 1][1], g])
                        }
                        for (var h = 0; h < c.length; h++) c[h][4] = c[h][4] / d;
                        return e(c)
                    }
                },
                i = function(a, b) {
                    for (var c = [], d = b / 180 * Math.PI, e = 0; e < a.length; e++) {
                        var f = a[e][0] - .5,
                            g = a[e][1] - .5;
                        c.push([.5 + (f * Math.cos(d) - g * Math.sin(d)), .5 + (f * Math.sin(d) + g * Math.cos(d)), a[e][2], a[e][
                            3
                        ]])
                    }
                    return c
                };
            if (!h[c]) throw new Error("Shape [" + c + "] is unknown by Perimeter Anchor type");
            var j = h[c](a);
            a.rotation && (j = i(j, a.rotation));
            var k = a.jsPlumbInstance.makeDynamicAnchor(j);
            return k.type = "Perimeter", k
        }
    }.call("undefined" != typeof window ? window : this),
    function() {
        "use strict";
        var a = this,
            b = a.jsPlumb,
            c = a.jsPlumbUtil,
            d = a.Biltong;
        b.Segments = {
            AbstractSegment: function(a) {
                this.params = a, this.findClosestPointOnPath = function(a, b) {
                    return {
                        d: 1 / 0,
                        x: null,
                        y: null,
                        l: null
                    }
                }, this.getBounds = function() {
                    return {
                        minX: Math.min(a.x1, a.x2),
                        minY: Math.min(a.y1, a.y2),
                        maxX: Math.max(a.x1, a.x2),
                        maxY: Math.max(a.y1, a.y2)
                    }
                }
            },
            Straight: function(a) {
                var c, e, f, g, h, i, j, k = (b.Segments.AbstractSegment.apply(this, arguments), function() {
                    c = Math.sqrt(Math.pow(h - g, 2) + Math.pow(j - i, 2)), e = d.gradient({
                        x: g,
                        y: i
                    }, {
                        x: h,
                        y: j
                    }), f = -1 / e
                });
                this.type = "Straight", this.getLength = function() {
                    return c
                }, this.getGradient = function() {
                    return e
                }, this.getCoordinates = function() {
                    return {
                        x1: g,
                        y1: i,
                        x2: h,
                        y2: j
                    }
                }, this.setCoordinates = function(a) {
                    g = a.x1, i = a.y1, h = a.x2, j = a.y2, k()
                }, this.setCoordinates({
                    x1: a.x1,
                    y1: a.y1,
                    x2: a.x2,
                    y2: a.y2
                }), this.getBounds = function() {
                    return {
                        minX: Math.min(g, h),
                        minY: Math.min(i, j),
                        maxX: Math.max(g, h),
                        maxY: Math.max(i, j)
                    }
                }, this.pointOnPath = function(a, b) {
                    if (0 !== a || b) {
                        if (1 !== a || b) {
                            var e = b ? a > 0 ? a : c + a : a * c;
                            return d.pointOnLine({
                                x: g,
                                y: i
                            }, {
                                x: h,
                                y: j
                            }, e)
                        }
                        return {
                            x: h,
                            y: j
                        }
                    }
                    return {
                        x: g,
                        y: i
                    }
                }, this.gradientAtPoint = function(a) {
                    return e
                }, this.pointAlongPathFrom = function(a, b, c) {
                    var e = this.pointOnPath(a, c),
                        f = 0 >= b ? {
                            x: g,
                            y: i
                        } : {
                            x: h,
                            y: j
                        };
                    return 0 >= b && Math.abs(b) > 1 && (b *= -1), d.pointOnLine(e, f, b)
                };
                var l = function(a, b, c) {
                        return c >= Math.min(a, b) && c <= Math.max(a, b)
                    },
                    m = function(a, b, c) {
                        return Math.abs(c - a) < Math.abs(c - b) ? a : b
                    };
                this.findClosestPointOnPath = function(a, b) {
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
                    if (0 === e) k.y = i, k.x = l(g, h, a) ? a : m(g, h, a);
                    else if (e === 1 / 0 || e === -(1 / 0)) k.x = g, k.y = l(i, j, b) ? b : m(i, j, b);
                    else {
                        var n = i - e * g,
                            o = b - f * a,
                            p = (o - n) / (e - f),
                            q = e * p + n;
                        k.x = l(g, h, p) ? p : m(g, h, p), k.y = l(i, j, q) ? q : m(i, j, q)
                    }
                    var r = d.lineLength([k.x, k.y], [g, i]);
                    return k.d = d.lineLength([a, b], [k.x, k.y]), k.l = r / c, k
                }
            },
            Arc: function(a) {
                var c = (b.Segments.AbstractSegment.apply(this, arguments), function(b, c) {
                        return d.theta([a.cx, a.cy], [b, c])
                    }),
                    e = function(a, b) {
                        if (a.anticlockwise) {
                            var c = a.startAngle < a.endAngle ? a.startAngle + f : a.startAngle,
                                d = Math.abs(c - a.endAngle);
                            return c - d * b
                        }
                        var e = a.endAngle < a.startAngle ? a.endAngle + f : a.endAngle,
                            g = Math.abs(e - a.startAngle);
                        return a.startAngle + g * b
                    },
                    f = 2 * Math.PI;
                this.radius = a.r, this.anticlockwise = a.ac, this.type = "Arc", a.startAngle && a.endAngle ? (this.startAngle =
                        a.startAngle, this.endAngle = a.endAngle, this.x1 = a.cx + this.radius * Math.cos(a.startAngle), this.y1 =
                        a.cy + this.radius * Math.sin(a.startAngle), this.x2 = a.cx + this.radius * Math.cos(a.endAngle), this.y2 =
                        a.cy + this.radius * Math.sin(a.endAngle)) : (this.startAngle = c(a.x1, a.y1), this.endAngle = c(a.x2, a.y2),
                        this.x1 = a.x1, this.y1 = a.y1, this.x2 = a.x2, this.y2 = a.y2), this.endAngle < 0 && (this.endAngle += f),
                    this.startAngle < 0 && (this.startAngle += f);
                var g = this.endAngle < this.startAngle ? this.endAngle + f : this.endAngle;
                this.sweep = Math.abs(g - this.startAngle), this.anticlockwise && (this.sweep = f - this.sweep);
                var h = 2 * Math.PI * this.radius,
                    i = this.sweep / f,
                    j = h * i;
                this.getLength = function() {
                    return j
                }, this.getBounds = function() {
                    return {
                        minX: a.cx - a.r,
                        maxX: a.cx + a.r,
                        minY: a.cy - a.r,
                        maxY: a.cy + a.r
                    }
                };
                var k = 1e-10,
                    l = function(a) {
                        var b = Math.floor(a),
                            c = Math.ceil(a);
                        return k > a - b ? b : k > c - a ? c : a
                    };
                this.pointOnPath = function(b, c) {
                    if (0 === b) return {
                        x: this.x1,
                        y: this.y1,
                        theta: this.startAngle
                    };
                    if (1 === b) return {
                        x: this.x2,
                        y: this.y2,
                        theta: this.endAngle
                    };
                    c && (b /= j);
                    var d = e(this, b),
                        f = a.cx + a.r * Math.cos(d),
                        g = a.cy + a.r * Math.sin(d);
                    return {
                        x: l(f),
                        y: l(g),
                        theta: d
                    }
                }, this.gradientAtPoint = function(b, c) {
                    var e = this.pointOnPath(b, c),
                        f = d.normal([a.cx, a.cy], [e.x, e.y]);
                    return this.anticlockwise || f !== 1 / 0 && f !== -(1 / 0) || (f *= -1), f
                }, this.pointAlongPathFrom = function(b, c, d) {
                    var e = this.pointOnPath(b, d),
                        f = c / h * 2 * Math.PI,
                        g = this.anticlockwise ? -1 : 1,
                        i = e.theta + g * f,
                        j = a.cx + this.radius * Math.cos(i),
                        k = a.cy + this.radius * Math.sin(i);
                    return {
                        x: j,
                        y: k
                    }
                }
            },
            Bezier: function(c) {
                this.curve = [{
                    x: c.x1,
                    y: c.y1
                }, {
                    x: c.cp1x,
                    y: c.cp1y
                }, {
                    x: c.cp2x,
                    y: c.cp2y
                }, {
                    x: c.x2,
                    y: c.y2
                }];
                b.Segments.AbstractSegment.apply(this, arguments);
                this.bounds = {
                    minX: Math.min(c.x1, c.x2, c.cp1x, c.cp2x),
                    minY: Math.min(c.y1, c.y2, c.cp1y, c.cp2y),
                    maxX: Math.max(c.x1, c.x2, c.cp1x, c.cp2x),
                    maxY: Math.max(c.y1, c.y2, c.cp1y, c.cp2y)
                }, this.type = "Bezier";
                var d = function(b, c, d) {
                    return d && (c = a.jsBezier.locationAlongCurveFrom(b, c > 0 ? 0 : 1, c)), c
                };
                this.pointOnPath = function(b, c) {
                    return b = d(this.curve, b, c), a.jsBezier.pointOnCurve(this.curve, b)
                }, this.gradientAtPoint = function(b, c) {
                    return b = d(this.curve, b, c), a.jsBezier.gradientAtPoint(this.curve, b)
                }, this.pointAlongPathFrom = function(b, c, e) {
                    return b = d(this.curve, b, e), a.jsBezier.pointAlongCurveFrom(this.curve, b, c)
                }, this.getLength = function() {
                    return a.jsBezier.getLength(this.curve)
                }, this.getBounds = function() {
                    return this.bounds
                }
            }
        }, b.SegmentRenderer = {
            getPath: function(a, b) {
                return {
                    Straight: function(b) {
                        var c = a.getCoordinates();
                        return (b ? "M " + c.x1 + " " + c.y1 + " " : "") + "L " + c.x2 + " " + c.y2
                    },
                    Bezier: function(b) {
                        var c = a.params;
                        return (b ? "M " + c.x2 + " " + c.y2 + " " : "") + "C " + c.cp2x + " " + c.cp2y + " " + c.cp1x + " " + c
                            .cp1y + " " + c.x1 + " " + c.y1
                    },
                    Arc: function(b) {
                        var c = a.params,
                            d = a.sweep > Math.PI ? 1 : 0,
                            e = a.anticlockwise ? 0 : 1;
                        return (b ? "M" + a.x1 + " " + a.y1 + " " : "") + "A " + a.radius + " " + c.r + " 0 " + d + "," + e +
                            " " + a.x2 + " " + a.y2
                    }
                } [a.type](b)
            }
        };
        var e = function() {
            this.resetBounds = function() {
                this.bounds = {
                    minX: 1 / 0,
                    minY: 1 / 0,
                    maxX: -(1 / 0),
                    maxY: -(1 / 0)
                }
            }, this.resetBounds()
        };
        b.Connectors.AbstractConnector = function(a) {
            e.apply(this, arguments);
            var f = [],
                g = 0,
                h = [],
                i = [],
                j = a.stub || 0,
                k = c.isArray(j) ? j[0] : j,
                l = c.isArray(j) ? j[1] : j,
                m = a.gap || 0,
                n = c.isArray(m) ? m[0] : m,
                o = c.isArray(m) ? m[1] : m,
                p = null,
                q = null;
            this.getPathData = function() {
                for (var a = "", c = 0; c < f.length; c++) a += b.SegmentRenderer.getPath(f[c], 0 === c), a += " ";
                return a
            }, this.findSegmentForPoint = function(a, b) {
                for (var c = {
                        d: 1 / 0,
                        s: null,
                        x: null,
                        y: null,
                        l: null
                    }, d = 0; d < f.length; d++) {
                    var e = f[d].findClosestPointOnPath(a, b);
                    e.d < c.d && (c.d = e.d, c.l = e.l, c.x = e.x, c.y = e.y, c.s = f[d], c.x1 = e.x1, c.x2 = e.x2, c.y1 = e.y1,
                        c.y2 = e.y2, c.index = d)
                }
                return c
            };
            var r = function() {
                    for (var a = 0, b = 0; b < f.length; b++) {
                        var c = f[b].getLength();
                        i[b] = c / g, h[b] = [a, a += c / g]
                    }
                },
                s = function(a, b) {
                    b && (a = a > 0 ? a / g : (g + a) / g);
                    for (var c = h.length - 1, d = 1, e = 0; e < h.length; e++)
                        if (h[e][1] >= a) {
                            c = e, d = 1 === a ? 1 : 0 === a ? 0 : (a - h[e][0]) / i[e];
                            break
                        } return {
                        segment: f[c],
                        proportion: d,
                        index: c
                    }
                },
                t = function(a, c, d) {
                    if (d.x1 !== d.x2 || d.y1 !== d.y2) {
                        var e = new b.Segments[c](d);
                        f.push(e), g += e.getLength(), a.updateBounds(e)
                    }
                },
                u = function() {
                    g = f.length = h.length = i.length = 0
                };
            this.setSegments = function(a) {
                p = [], g = 0;
                for (var b = 0; b < a.length; b++) p.push(a[b]), g += a[b].getLength()
            }, this.getLength = function() {
                return g
            };
            var v = function(a) {
                this.strokeWidth = a.strokeWidth;
                var b = d.quadrant(a.sourcePos, a.targetPos),
                    c = a.targetPos[0] < a.sourcePos[0],
                    e = a.targetPos[1] < a.sourcePos[1],
                    f = a.strokeWidth || 1,
                    g = a.sourceEndpoint.anchor.getOrientation(a.sourceEndpoint),
                    h = a.targetEndpoint.anchor.getOrientation(a.targetEndpoint),
                    i = c ? a.targetPos[0] : a.sourcePos[0],
                    j = e ? a.targetPos[1] : a.sourcePos[1],
                    m = Math.abs(a.targetPos[0] - a.sourcePos[0]),
                    p = Math.abs(a.targetPos[1] - a.sourcePos[1]);
                if (0 === g[0] && 0 === g[1] || 0 === h[0] && 0 === h[1]) {
                    var q = m > p ? 0 : 1,
                        r = [1, 0][q];
                    g = [], h = [], g[q] = a.sourcePos[q] > a.targetPos[q] ? -1 : 1, h[q] = a.sourcePos[q] > a.targetPos[q] ?
                        1 : -1, g[r] = 0, h[r] = 0
                }
                var s = c ? m + n * g[0] : n * g[0],
                    t = e ? p + n * g[1] : n * g[1],
                    u = c ? o * h[0] : m + o * h[0],
                    v = e ? o * h[1] : p + o * h[1],
                    w = g[0] * h[0] + g[1] * h[1],
                    x = {
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
                        opposite: -1 === w,
                        perpendicular: 0 === w,
                        orthogonal: 1 === w,
                        sourceAxis: 0 === g[0] ? "y" : "x",
                        points: [i, j, m, p, s, t, u, v],
                        stubs: [k, l]
                    };
                return x.anchorOrientation = x.opposite ? "opposite" : x.orthogonal ? "orthogonal" : "perpendicular", x
            };
            this.getSegments = function() {
                return f
            }, this.updateBounds = function(a) {
                var b = a.getBounds();
                this.bounds.minX = Math.min(this.bounds.minX, b.minX), this.bounds.maxX = Math.max(this.bounds.maxX, b.maxX),
                    this.bounds.minY = Math.min(this.bounds.minY, b.minY), this.bounds.maxY = Math.max(this.bounds.maxY, b.maxY)
            };
            return this.pointOnPath = function(a, b) {
                var c = s(a, b);
                return c.segment && c.segment.pointOnPath(c.proportion, !1) || [0, 0]
            }, this.gradientAtPoint = function(a, b) {
                var c = s(a, b);
                return c.segment && c.segment.gradientAtPoint(c.proportion, !1) || 0
            }, this.pointAlongPathFrom = function(a, b, c) {
                var d = s(a, c);
                return d.segment && d.segment.pointAlongPathFrom(d.proportion, b, !1) || [0, 0]
            }, this.compute = function(a) {
                q = v.call(this, a), u(), this._compute(q, a), this.x = q.points[0], this.y = q.points[1], this.w = q.points[
                    2], this.h = q.points[3], this.segment = q.segment, r()
            }, {
                addSegment: t,
                prepareCompute: v,
                sourceStub: k,
                targetStub: l,
                maxStub: Math.max(k, l),
                sourceGap: n,
                targetGap: o,
                maxGap: Math.max(n, o)
            }
        }, c.extend(b.Connectors.AbstractConnector, e), b.Endpoints.AbstractEndpoint = function(a) {
            e.apply(this, arguments);
            var b = this.compute = function(a, b, c, d) {
                var e = this._compute.apply(this, arguments);
                return this.x = e[0], this.y = e[1], this.w = e[2], this.h = e[3], this.bounds.minX = this.x, this.bounds.minY =
                    this.y, this.bounds.maxX = this.x + this.w, this.bounds.maxY = this.y + this.h, e
            };
            return {
                compute: b,
                cssClass: a.cssClass
            }
        }, c.extend(b.Endpoints.AbstractEndpoint, e), b.Endpoints.Dot = function(a) {
            this.type = "Dot";
            b.Endpoints.AbstractEndpoint.apply(this, arguments);
            a = a || {}, this.radius = a.radius || 10, this.defaultOffset = .5 * this.radius, this.defaultInnerRadius =
                this.radius / 3, this._compute = function(a, b, c, d) {
                    this.radius = c.radius || this.radius;
                    var e = a[0] - this.radius,
                        f = a[1] - this.radius,
                        g = 2 * this.radius,
                        h = 2 * this.radius;
                    if (c.stroke) {
                        var i = c.strokeWidth || 1;
                        e -= i, f -= i, g += 2 * i, h += 2 * i
                    }
                    return [e, f, g, h, this.radius]
                }
        }, c.extend(b.Endpoints.Dot, b.Endpoints.AbstractEndpoint), b.Endpoints.Rectangle = function(a) {
            this.type = "Rectangle";
            b.Endpoints.AbstractEndpoint.apply(this, arguments);
            a = a || {}, this.width = a.width || 20, this.height = a.height || 20, this._compute = function(a, b, c, d) {
                var e = c.width || this.width,
                    f = c.height || this.height,
                    g = a[0] - e / 2,
                    h = a[1] - f / 2;
                return [g, h, e, f]
            }
        }, c.extend(b.Endpoints.Rectangle, b.Endpoints.AbstractEndpoint);
        var f = function(a) {
            b.jsPlumbUIComponent.apply(this, arguments), this._jsPlumb.displayElements = []
        };
        c.extend(f, b.jsPlumbUIComponent, {
            getDisplayElements: function() {
                return this._jsPlumb.displayElements
            },
            appendDisplayElement: function(a) {
                this._jsPlumb.displayElements.push(a)
            }
        }), b.Endpoints.Image = function(d) {
            this.type = "Image", f.apply(this, arguments), b.Endpoints.AbstractEndpoint.apply(this, arguments);
            var e = d.onload,
                g = d.src || d.url,
                h = d.cssClass ? " " + d.cssClass : "";
            this._jsPlumb.img = new Image, this._jsPlumb.ready = !1, this._jsPlumb.initialized = !1, this._jsPlumb.deleted = !
                1, this._jsPlumb.widthToUse = d.width, this._jsPlumb.heightToUse = d.height, this._jsPlumb.endpoint = d.endpoint,
                this._jsPlumb.img.onload = function() {
                    null != this._jsPlumb && (this._jsPlumb.ready = !0, this._jsPlumb.widthToUse = this._jsPlumb.widthToUse ||
                        this._jsPlumb.img.width, this._jsPlumb.heightToUse = this._jsPlumb.heightToUse || this._jsPlumb.img.height,
                        e && e(this))
                }.bind(this), this._jsPlumb.endpoint.setImage = function(a, b) {
                    var c = a.constructor === String ? a : a.src;
                    e = b, this._jsPlumb.img.src = c, null != this.canvas && this.canvas.setAttribute("src", this._jsPlumb.img.src)
                }.bind(this), this._jsPlumb.endpoint.setImage(g, e), this._compute = function(a, b, c, d) {
                    return this.anchorPoint = a, this._jsPlumb.ready ? [a[0] - this._jsPlumb.widthToUse / 2, a[1] - this._jsPlumb
                        .heightToUse / 2, this._jsPlumb.widthToUse, this._jsPlumb.heightToUse
                    ] : [0, 0, 0, 0]
                }, this.canvas = b.createElement("img", {
                    position: "absolute",
                    margin: 0,
                    padding: 0,
                    outline: 0
                }, this._jsPlumb.instance.endpointClass + h), this._jsPlumb.widthToUse && this.canvas.setAttribute("width",
                    this._jsPlumb.widthToUse), this._jsPlumb.heightToUse && this.canvas.setAttribute("height", this._jsPlumb.heightToUse),
                this._jsPlumb.instance.appendElement(this.canvas), this.actuallyPaint = function(a, b, d) {
                    if (!this._jsPlumb.deleted) {
                        this._jsPlumb.initialized || (this.canvas.setAttribute("src", this._jsPlumb.img.src), this.appendDisplayElement(
                            this.canvas), this._jsPlumb.initialized = !0);
                        var e = this.anchorPoint[0] - this._jsPlumb.widthToUse / 2,
                            f = this.anchorPoint[1] - this._jsPlumb.heightToUse / 2;
                        c.sizeElement(this.canvas, e, f, this._jsPlumb.widthToUse, this._jsPlumb.heightToUse)
                    }
                }, this.paint = function(b, c) {
                    null != this._jsPlumb && (this._jsPlumb.ready ? this.actuallyPaint(b, c) : a.setTimeout(function() {
                        this.paint(b, c)
                    }.bind(this), 200))
                }
        }, c.extend(b.Endpoints.Image, [f, b.Endpoints.AbstractEndpoint], {
            cleanup: function(a) {
                a && (this._jsPlumb.deleted = !0, this.canvas && this.canvas.parentNode.removeChild(this.canvas), this.canvas =
                    null)
            }
        }), b.Endpoints.Blank = function(a) {
            b.Endpoints.AbstractEndpoint.apply(this, arguments);
            this.type = "Blank", f.apply(this, arguments), this._compute = function(a, b, c, d) {
                return [a[0], a[1], 10, 0]
            };
            var d = a.cssClass ? " " + a.cssClass : "";
            this.canvas = b.createElement("div", {
                    display: "block",
                    width: "1px",
                    height: "1px",
                    background: "transparent",
                    position: "absolute"
                }, this._jsPlumb.instance.endpointClass + d), this._jsPlumb.instance.appendElement(this.canvas), this.paint =
                function(a, b) {
                    c.sizeElement(this.canvas, this.x, this.y, this.w, this.h)
                }
        }, c.extend(b.Endpoints.Blank, [b.Endpoints.AbstractEndpoint, f], {
            cleanup: function() {
                this.canvas && this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas)
            }
        }), b.Endpoints.Triangle = function(a) {
            this.type = "Triangle", b.Endpoints.AbstractEndpoint.apply(this, arguments);
            var c = this;
            a = a || {}, a.width = a.width || 55, a.height = a.height || 55, this.width = a.width, this.height = a.height,
                this._compute = function(a, b, d, e) {
                    var f = d.width || c.width,
                        g = d.height || c.height,
                        h = a[0] - f / 2,
                        i = a[1] - g / 2;
                    return [h, i, f, g]
                }
        };
        var g = b.Overlays.AbstractOverlay = function(a) {
            this.visible = !0, this.isAppendedAtTopLevel = !0, this.component = a.component, this.loc = null == a.location ?
                .5 : a.location, this.endpointLoc = null == a.endpointLocation ? [.5, .5] : a.endpointLocation, this.visible =
                a.visible !== !1
        };
        g.prototype = {
            cleanup: function(a) {
                a && (this.component = null, this.canvas = null, this.endpointLoc = null)
            },
            reattach: function(a, b) {},
            setVisible: function(a) {
                this.visible = a, this.component.repaint()
            },
            isVisible: function() {
                return this.visible
            },
            hide: function() {
                this.setVisible(!1)
            },
            show: function() {
                this.setVisible(!0)
            },
            incrementLocation: function(a) {
                this.loc += a, this.component.repaint()
            },
            setLocation: function(a) {
                this.loc = a, this.component.repaint()
            },
            getLocation: function() {
                return this.loc
            },
            updateFrom: function() {}
        }, b.Overlays.Arrow = function(a) {
            this.type = "Arrow", g.apply(this, arguments), this.isAppendedAtTopLevel = !1, a = a || {};
            var e = this;
            this.length = a.length || 20, this.width = a.width || 20, this.id = a.id;
            var f = (a.direction || 1) < 0 ? -1 : 1,
                h = a.paintStyle || {
                    "stroke-width": 1
                },
                i = a.foldback || .623;
            this.computeMaxSize = function() {
                return 1.5 * e.width
            }, this.elementCreated = function(c, d) {
                if (this.path = c, a.events)
                    for (var e in a.events) b.on(c, e, a.events[e])
            }, this.draw = function(a, b) {
                var e, g, j, k, l;
                if (a.pointAlongPathFrom) {
                    if (c.isString(this.loc) || this.loc > 1 || this.loc < 0) {
                        var m = parseInt(this.loc, 10),
                            n = this.loc < 0 ? 1 : 0;
                        e = a.pointAlongPathFrom(n, m, !1), g = a.pointAlongPathFrom(n, m - f * this.length / 2, !1), j = d.pointOnLine(
                            e, g, this.length)
                    } else if (1 === this.loc) {
                        if (e = a.pointOnPath(this.loc), g = a.pointAlongPathFrom(this.loc, -this.length), j = d.pointOnLine(e, g,
                                this.length), -1 === f) {
                            var o = j;
                            j = e, e = o
                        }
                    } else if (0 === this.loc) {
                        if (j = a.pointOnPath(this.loc), g = a.pointAlongPathFrom(this.loc, this.length), e = d.pointOnLine(j, g,
                                this.length), -1 === f) {
                            var p = j;
                            j = e, e = p
                        }
                    } else e = a.pointAlongPathFrom(this.loc, f * this.length / 2), g = a.pointOnPath(this.loc), j = d.pointOnLine(
                        e, g, this.length);
                    k = d.perpendicularLineTo(e, j, this.width), l = d.pointOnLine(e, j, i * this.length);
                    var q = {
                            hxy: e,
                            tail: k,
                            cxy: l
                        },
                        r = h.stroke || b.stroke,
                        s = h.fill || b.stroke,
                        t = h.strokeWidth || b.strokeWidth;
                    return {
                        component: a,
                        d: q,
                        "stroke-width": t,
                        stroke: r,
                        fill: s,
                        minX: Math.min(e.x, k[0].x, k[1].x),
                        maxX: Math.max(e.x, k[0].x, k[1].x),
                        minY: Math.min(e.y, k[0].y, k[1].y),
                        maxY: Math.max(e.y, k[0].y, k[1].y)
                    }
                }
                return {
                    component: a,
                    minX: 0,
                    maxX: 0,
                    minY: 0,
                    maxY: 0
                }
            }
        }, c.extend(b.Overlays.Arrow, g, {
            updateFrom: function(a) {
                this.length = a.length || this.length, this.width = a.width || this.width, this.direction = null != a.direction ?
                    a.direction : this.direction, this.foldback = a.foldback || this.foldback
            },
            cleanup: function() {
                this.path && this.canvas && this.canvas.removeChild(this.path)
            }
        }), b.Overlays.PlainArrow = function(a) {
            a = a || {};
            var c = b.extend(a, {
                foldback: 1
            });
            b.Overlays.Arrow.call(this, c), this.type = "PlainArrow"
        }, c.extend(b.Overlays.PlainArrow, b.Overlays.Arrow), b.Overlays.Diamond = function(a) {
            a = a || {};
            var c = a.length || 40,
                d = b.extend(a, {
                    length: c / 2,
                    foldback: 2
                });
            b.Overlays.Arrow.call(this, d), this.type = "Diamond"
        }, c.extend(b.Overlays.Diamond, b.Overlays.Arrow);
        var h = function(a, b) {
                return (null == a._jsPlumb.cachedDimensions || b) && (a._jsPlumb.cachedDimensions = a.getDimensions()), a._jsPlumb
                    .cachedDimensions
            },
            i = function(a) {
                b.jsPlumbUIComponent.apply(this, arguments), g.apply(this, arguments);
                var d = this.fire;
                this.fire = function() {
                        d.apply(this, arguments), this.component && this.component.fire.apply(this.component, arguments)
                    }, this.detached = !1, this.id = a.id, this._jsPlumb.div = null, this._jsPlumb.initialised = !1, this._jsPlumb
                    .component = a.component, this._jsPlumb.cachedDimensions = null, this._jsPlumb.create = a.create, this._jsPlumb
                    .initiallyInvisible = a.visible === !1, this.getElement = function() {
                        if (null == this._jsPlumb.div) {
                            var c = this._jsPlumb.div = b.getElement(this._jsPlumb.create(this._jsPlumb.component));
                            c.style.position = "absolute", c.className = this._jsPlumb.instance.overlayClass + " " + (this.cssClass ?
                                    this.cssClass : a.cssClass ? a.cssClass : ""), this._jsPlumb.instance.appendElement(c), this._jsPlumb.instance
                                .getId(c), this.canvas = c;
                            var d = "translate(-50%, -50%)";
                            c.style.webkitTransform = d, c.style.mozTransform = d, c.style.msTransform = d, c.style.oTransform = d, c.style
                                .transform = d, c._jsPlumb = this, a.visible === !1 && (c.style.display = "none")
                        }
                        return this._jsPlumb.div
                    }, this.draw = function(a, b, d) {
                        var e = h(this);
                        if (null != e && 2 === e.length) {
                            var f = {
                                x: 0,
                                y: 0
                            };
                            if (d) f = {
                                x: d[0],
                                y: d[1]
                            };
                            else if (a.pointOnPath) {
                                var g = this.loc,
                                    i = !1;
                                (c.isString(this.loc) || this.loc < 0 || this.loc > 1) && (g = parseInt(this.loc, 10), i = !0), f = a.pointOnPath(
                                    g, i)
                            } else {
                                var j = this.loc.constructor === Array ? this.loc : this.endpointLoc;
                                f = {
                                    x: j[0] * a.w,
                                    y: j[1] * a.h
                                }
                            }
                            var k = f.x - e[0] / 2,
                                l = f.y - e[1] / 2;
                            return {
                                component: a,
                                d: {
                                    minx: k,
                                    miny: l,
                                    td: e,
                                    cxy: f
                                },
                                minX: k,
                                maxX: k + e[0],
                                minY: l,
                                maxY: l + e[1]
                            }
                        }
                        return {
                            minX: 0,
                            maxX: 0,
                            minY: 0,
                            maxY: 0
                        }
                    }
            };
        c.extend(i, [b.jsPlumbUIComponent, g], {
            getDimensions: function() {
                return [1, 1]
            },
            setVisible: function(a) {
                this._jsPlumb.div && (this._jsPlumb.div.style.display = a ? "block" : "none", a && this._jsPlumb.initiallyInvisible &&
                    (h(this, !0), this.component.repaint(), this._jsPlumb.initiallyInvisible = !1))
            },
            clearCachedDimensions: function() {
                this._jsPlumb.cachedDimensions = null
            },
            cleanup: function(a) {
                a ? null != this._jsPlumb.div && (this._jsPlumb.div._jsPlumb = null, this._jsPlumb.instance.removeElement(
                    this._jsPlumb.div)) : (this._jsPlumb && this._jsPlumb.div && this._jsPlumb.div.parentNode && this._jsPlumb
                    .div.parentNode.removeChild(this._jsPlumb.div), this.detached = !0)
            },
            reattach: function(a, b) {
                null != this._jsPlumb.div && a.getContainer().appendChild(this._jsPlumb.div), this.detached = !1
            },
            computeMaxSize: function() {
                var a = h(this);
                return Math.max(a[0], a[1])
            },
            paint: function(a, b) {
                this._jsPlumb.initialised || (this.getElement(), a.component.appendDisplayElement(this._jsPlumb.div), this
                        ._jsPlumb.initialised = !0, this.detached && this._jsPlumb.div.parentNode.removeChild(this._jsPlumb.div)
                    ), this._jsPlumb.div.style.left = a.component.x + a.d.minx + "px", this._jsPlumb.div.style.top = a.component
                    .y + a.d.miny + "px"
            }
        }), b.Overlays.Custom = function(a) {
            this.type = "Custom", i.apply(this, arguments)
        }, c.extend(b.Overlays.Custom, i), b.Overlays.GuideLines = function() {
            var a = this;
            a.length = 50, a.strokeWidth = 5, this.type = "GuideLines", g.apply(this, arguments), b.jsPlumbUIComponent.apply(
                this, arguments), this.draw = function(b, c) {
                var e = b.pointAlongPathFrom(a.loc, a.length / 2),
                    f = b.pointOnPath(a.loc),
                    g = d.pointOnLine(e, f, a.length),
                    h = d.perpendicularLineTo(e, g, 40),
                    i = d.perpendicularLineTo(g, e, 20);
                return {
                    connector: b,
                    head: e,
                    tail: g,
                    headLine: i,
                    tailLine: h,
                    minX: Math.min(e.x, g.x, i[0].x, i[1].x),
                    minY: Math.min(e.y, g.y, i[0].y, i[1].y),
                    maxX: Math.max(e.x, g.x, i[0].x, i[1].x),
                    maxY: Math.max(e.y, g.y, i[0].y, i[1].y)
                }
            }
        }, b.Overlays.Label = function(a) {
            this.labelStyle = a.labelStyle;
            this.cssClass = null != this.labelStyle ? this.labelStyle.cssClass : null;
            var c = b.extend({
                create: function() {
                    return b.createElement("div")
                }
            }, a);
            if (b.Overlays.Custom.call(this, c), this.type = "Label", this.label = a.label || "", this.labelText = null,
                this.labelStyle) {
                var d = this.getElement();
                if (this.labelStyle.font = this.labelStyle.font || "12px sans-serif", d.style.font = this.labelStyle.font, d
                    .style.color = this.labelStyle.color || "black", this.labelStyle.fill && (d.style.background = this.labelStyle
                        .fill), this.labelStyle.borderWidth > 0) {
                    var e = this.labelStyle.borderStyle ? this.labelStyle.borderStyle : "black";
                    d.style.border = this.labelStyle.borderWidth + "px solid " + e
                }
                this.labelStyle.padding && (d.style.padding = this.labelStyle.padding)
            }
        }, c.extend(b.Overlays.Label, b.Overlays.Custom, {
            cleanup: function(a) {
                a && (this.div = null, this.label = null, this.labelText = null, this.cssClass = null, this.labelStyle =
                    null)
            },
            getLabel: function() {
                return this.label
            },
            setLabel: function(a) {
                this.label = a, this.labelText = null, this.clearCachedDimensions(), this.update(), this.component.repaint()
            },
            getDimensions: function() {
                return this.update(), i.prototype.getDimensions.apply(this, arguments)
            },
            update: function() {
                if ("function" == typeof this.label) {
                    var a = this.label(this);
                    this.getElement().innerHTML = a.replace(/\r\n/g, "<br/>")
                } else null == this.labelText && (this.labelText = this.label, this.getElement().innerHTML = this.labelText
                    .replace(/\r\n/g, "<br/>"))
            },
            updateFrom: function(a) {
                null != a.label && this.setLabel(a.label)
            }
        })
    }.call("undefined" != typeof window ? window : this),
    function() {
        "use strict";
        var a = this,
            b = a.jsPlumb,
            c = function(b) {
                var c = b._mottle;
                return c || (c = b._mottle = new a.Mottle), c
            };
        b.extend(a.jsPlumbInstance.prototype, {
            getEventManager: function() {
                return c(this)
            },
            on: function(a, b, c) {
                return this.getEventManager().on.apply(this, arguments), this
            },
            off: function(a, b, c) {
                return this.getEventManager().off.apply(this, arguments), this
            }
        })
    }.call("undefined" != typeof window ? window : this),
    function() {
        "use strict";
        var a = this,
            b = a.jsPlumbUtil,
            c = a.jsPlumbInstance,
            d = "jtk-group-collapsed",
            e = "jtk-group-expanded",
            f = "[jtk-group-content]",
            g = "elementDraggable",
            h = "stop",
            i = "revert",
            j = "_groupManager",
            k = "_jsPlumbGroup",
            l = "_jsPlumbGroupDrag",
            m = "group:addMember",
            n = "group:removeMember",
            o = "group:add",
            p = "group:remove",
            q = "group:expand",
            r = "group:collapse",
            s = "groupDragStop",
            t = "connectionMoved",
            u = "internal.connectionDetached",
            v = "removeAll",
            w = "orphanAll",
            x = "show",
            y = "hide",
            z = function(a) {
                function c(a) {
                    delete a.proxies;
                    var c, d = i[a.id];
                    null != d && (c = function(b) {
                        return b.id === a.id
                    }, b.removeWithFunction(d.connections.source, c), b.removeWithFunction(d.connections.target, c), delete i[
                        a.id]), d = j[a.id], null != d && (c = function(b) {
                        return b.id === a.id
                    }, b.removeWithFunction(d.connections.source, c), b.removeWithFunction(d.connections.target, c), delete j[
                        a.id])
                }

                function f(b, c) {
                    for (var d = b.getMembers(), e = 0; e < d.length; e++) a[c ? x : y](d[e], !0)
                }

                function g(b) {
                    var c = b.getMembers(),
                        d = a.getConnections({
                            source: c,
                            scope: "*"
                        }, !0),
                        e = a.getConnections({
                            target: c,
                            scope: "*"
                        }, !0),
                        f = {};
                    b.connections.source.length = 0, b.connections.target.length = 0;
                    var g = function(a) {
                        for (var c = 0; c < a.length; c++) f[a[c].id] || (f[a[c].id] = !0, a[c].source._jsPlumbGroup === b ? (a[c]
                                .target._jsPlumbGroup !== b && b.connections.source.push(a[c]), i[a[c].id] = b) : a[c].target._jsPlumbGroup ===
                            b && (b.connections.target.push(a[c]), j[a[c].id] = b))
                    };
                    g(d), g(e)
                }
                var h = {},
                    i = {},
                    j = {},
                    l = this;
                a.bind("connection", function(a) {
                    null != a.source[k] && null != a.target[k] && a.source[k] === a.target[k] ? (i[a.connection.id] = a.source[
                        k], j[a.connection.id] = a.source[k]) : (null != a.source[k] && (b.suggest(a.source[k].connections.source,
                        a.connection), i[a.connection.id] = a.source[k]), null != a.target[k] && (b.suggest(a.target[k].connections
                        .target, a.connection), j[a.connection.id] = a.target[k]))
                }), a.bind(u, function(a) {
                    c(a.connection)
                }), a.bind(t, function(a) {
                    var b = 0 === a.index ? i : j,
                        c = b[a.connection.id];
                    if (c) {
                        var d = c.connections[0 === a.index ? "source" : "target"],
                            e = d.indexOf(a.connection); - 1 !== e && d.splice(e, 1)
                    }
                }), this.addGroup = function(b) {
                    a.addClass(b.getEl(), e), h[b.id] = b, b.manager = this, g(b), a.fire(o, {
                        group: b
                    })
                }, this.addToGroup = function(b, c, d) {
                    if (b = this.getGroup(b)) {
                        var e = b.getEl();
                        if (c._isJsPlumbGroup) return;
                        var f = c._jsPlumbGroup;
                        if (f !== b) {
                            var g = a.getOffset(c, !0),
                                h = b.collapsed ? a.getOffset(e, !0) : a.getOffset(b.getDragArea(), !0);
                            null != f && (f.remove(c, !1, d, !1, b), l.updateConnectionsForGroup(f)), b.add(c, d);
                            var i = function(a, c) {
                                var d = 0 === c ? 1 : 0;
                                a.each(function(a) {
                                    a.setVisible(!1), a.endpoints[d].element._jsPlumbGroup === b ? (a.endpoints[d].setVisible(!1), l.expandConnection(
                                        a, d, b)) : (a.endpoints[c].setVisible(!1), l.collapseConnection(a, c, b))
                                })
                            };
                            b.collapsed && (i(a.select({
                                source: c
                            }), 0), i(a.select({
                                target: c
                            }), 1));
                            var j = a.getId(c);
                            a.dragManager.setParent(c, j, e, a.getId(e), g);
                            var k = {
                                left: g.left - h.left,
                                top: g.top - h.top
                            };
                            if (a.setPosition(c, k), a.dragManager.revalidateParent(c, j, g), l.updateConnectionsForGroup(b), a.revalidate(
                                    j), !d) {
                                var n = {
                                    group: b,
                                    el: c
                                };
                                f && (n.sourceGroup = f), a.fire(m, n)
                            }
                        }
                    }
                }, this.removeFromGroup = function(a, b, c) {
                    a = this.getGroup(a), a && a.remove(b, null, c)
                }, this.getGroup = function(a) {
                    var c = a;
                    if (b.isString(a) && (c = h[a], null == c)) throw new TypeError("No such group [" + a + "]");
                    return c
                }, this.getGroups = function() {
                    var a = [];
                    for (var b in h) a.push(h[b]);
                    return a
                }, this.removeGroup = function(b, c, d, e) {
                    b = this.getGroup(b), this.expandGroup(b, !0);
                    var f = b[c ? v : w](d, e);
                    return a.remove(b.getEl()), delete h[b.id], delete a._groups[b.id], a.fire(p, {
                        group: b
                    }), f
                }, this.removeAllGroups = function(a, b, c) {
                    for (var d in h) this.removeGroup(h[d], a, b, c)
                };
                var n = this.collapseConnection = function(b, c, d) {
                    var e, f = d.getEl(),
                        g = a.getId(f),
                        h = b.endpoints[c].elementId,
                        i = b.endpoints[0 === c ? 1 : 0].element;
                    i[k] && !i[k].shouldProxy() && i[k].collapsed || (b.proxies = b.proxies || [], e = b.proxies[c] ? b.proxies[
                        c].ep : a.addEndpoint(f, {
                        endpoint: d.getEndpoint(b, c),
                        anchor: d.getAnchor(b, c),
                        parameters: {
                            isProxyEndpoint: !0
                        }
                    }), e.setDeleteOnEmpty(!0), b.proxies[c] = {
                        ep: e,
                        originalEp: b.endpoints[c]
                    }, 0 === c ? a.anchorManager.sourceChanged(h, g, b, f) : (a.anchorManager.updateOtherEndpoint(b.endpoints[
                        0].elementId, h, g, b), b.target = f, b.targetId = g), b.proxies[c].originalEp.detachFromConnection(b,
                        null, !0), e.connections = [b], b.endpoints[c] = e, b.setVisible(!0))
                };
                this.collapseGroup = function(b) {
                    if (b = this.getGroup(b), null != b && !b.collapsed) {
                        var c = b.getEl();
                        if (f(b, !1), b.shouldProxy()) {
                            var g = function(a, c) {
                                for (var d = 0; d < a.length; d++) {
                                    var e = a[d];
                                    n(e, c, b)
                                }
                            };
                            g(b.connections.source, 0), g(b.connections.target, 1)
                        }
                        b.collapsed = !0, a.removeClass(c, e), a.addClass(c, d), a.revalidate(c), a.fire(r, {
                            group: b
                        })
                    }
                };
                var s = this.expandConnection = function(b, c, d) {
                    if (null != b.proxies && null != b.proxies[c]) {
                        var e = a.getId(d.getEl()),
                            f = b.proxies[c].originalEp.element,
                            g = b.proxies[c].originalEp.elementId;
                        b.endpoints[c] = b.proxies[c].originalEp, 0 === c ? a.anchorManager.sourceChanged(e, g, b, f) : (a.anchorManager
                            .updateOtherEndpoint(b.endpoints[0].elementId, e, g, b), b.target = f, b.targetId = g), b.proxies[c].ep.detachFromConnection(
                            b, null), b.proxies[c].originalEp.addConnection(b), delete b.proxies[c]
                    }
                };
                this.expandGroup = function(b, c) {
                    if (b = this.getGroup(b), null != b && b.collapsed) {
                        var g = b.getEl();
                        if (f(b, !0), b.shouldProxy()) {
                            var h = function(a, c) {
                                for (var d = 0; d < a.length; d++) {
                                    var e = a[d];
                                    s(e, c, b)
                                }
                            };
                            h(b.connections.source, 0), h(b.connections.target, 1)
                        }
                        b.collapsed = !1, a.addClass(g, e), a.removeClass(g, d), a.revalidate(g), this.repaintGroup(b), c || a.fire(
                            q, {
                                group: b
                            })
                    }
                }, this.repaintGroup = function(b) {
                    b = this.getGroup(b);
                    for (var c = b.getMembers(), d = 0; d < c.length; d++) a.revalidate(c[d])
                }, this.updateConnectionsForGroup = g, this.refreshAllGroups = function() {
                    for (var b in h) g(h[b]), a.dragManager.updateOffsets(a.getId(h[b].getEl()))
                }
            },
            A = function(c, d) {
                function e(a) {
                    return a.offsetParent
                }

                function j(a, b) {
                    var d = e(a),
                        f = c.getSize(d),
                        g = c.getSize(a),
                        h = b[0],
                        i = h + g[0],
                        j = b[1],
                        k = j + g[1];
                    return i > 0 && h < f[0] && k > 0 && j < f[1]
                }

                function m(a) {
                    var b = c.getId(a),
                        d = c.getOffset(a);
                    return a.parentNode.removeChild(a), c.getContainer().appendChild(a), c.setPosition(a, d), delete a._jsPlumbGroup,
                        q(a), c.dragManager.clearParent(a, b), [b, d]
                }

                function o(a) {
                    var b = null;
                    if (!j(a.el, a.pos)) {
                        var d = a.el._jsPlumbGroup;
                        A ? c.remove(a.el) : b = m(a.el), d.remove(a.el)
                    }
                    return b
                }

                function p(a) {
                    var b = c.getId(a);
                    c.revalidate(a), c.dragManager.revalidateParent(a, b)
                }

                function q(a) {
                    a._katavorioDrag && ((A || z) && a._katavorioDrag.off(h, o), A || z || !y || (a._katavorioDrag.off(i, p), a._katavorioDrag
                        .setRevert(null)))
                }

                function r(a) {
                    a._katavorioDrag && ((A || z) && a._katavorioDrag.on(h, o), x && a._katavorioDrag.setConstrain(!0), w && a._katavorioDrag
                        .setUseGhostProxy(!0), A || z || !y || (a._katavorioDrag.on(i, p), a._katavorioDrag.setRevert(function(a,
                            b) {
                            return !j(a, b)
                        })))
                }
                var t = this,
                    u = d.el;
                this.getEl = function() {
                    return u
                }, this.id = d.id || b.uuid(), u._isJsPlumbGroup = !0;
                var v = this.getDragArea = function() {
                        var a = c.getSelector(u, f);
                        return a && a.length > 0 ? a[0] : u
                    },
                    w = d.ghost === !0,
                    x = w || d.constrain === !0,
                    y = d.revert !== !1,
                    z = d.orphan === !0,
                    A = d.prune === !0,
                    B = d.dropOverride === !0,
                    C = d.proxied !== !1,
                    D = [];
                if (this.connections = {
                        source: [],
                        target: [],
                        internal: []
                    }, this.getAnchor = function(a, b) {
                        return d.anchor || "Continuous"
                    }, this.getEndpoint = function(a, b) {
                        return d.endpoint || ["Dot", {
                            radius: 10
                        }]
                    }, this.collapsed = !1, d.draggable !== !1) {
                    var E = {
                        stop: function(a) {
                            c.fire(s, jsPlumb.extend(a, {
                                group: t
                            }))
                        },
                        scope: l
                    };
                    d.dragOptions && a.jsPlumb.extend(E, d.dragOptions), c.draggable(d.el, E)
                }
                d.droppable !== !1 && c.droppable(d.el, {
                    drop: function(a) {
                        var b = a.drag.el;
                        if (!b._isJsPlumbGroup) {
                            var d = b._jsPlumbGroup;
                            if (d !== t) {
                                if (null != d && d.overrideDrop(b, t)) return;
                                c.getGroupManager().addToGroup(t, b, !1)
                            }
                        }
                    }
                });
                var F = function(a, b) {
                    for (var c = null == a.nodeType ? a : [a], d = 0; d < c.length; d++) b(c[d])
                };
                this.overrideDrop = function(a, b) {
                    return B && (y || A || z)
                }, this.add = function(a, b) {
                    var d = v();
                    F(a, function(a) {
                        if (null != a._jsPlumbGroup) {
                            if (a._jsPlumbGroup === t) return;
                            a._jsPlumbGroup.remove(a, !0, b, !1)
                        }
                        a._jsPlumbGroup = t, D.push(a), c.isAlreadyDraggable(a) && r(a), a.parentNode !== d && d.appendChild(a)
                    }), c.getGroupManager().updateConnectionsForGroup(t)
                }, this.remove = function(a, d, e, f, g) {
                    F(a, function(a) {
                        if (delete a._jsPlumbGroup, b.removeWithFunction(D, function(b) {
                                return b === a
                            }), d) try {
                            t.getDragArea().removeChild(a)
                        } catch (f) {
                            jsPlumbUtil.log("Could not remove element from Group " + f)
                        }
                        if (q(a), !e) {
                            var h = {
                                group: t,
                                el: a
                            };
                            g && (h.targetGroup = g), c.fire(n, h)
                        }
                    }), f || c.getGroupManager().updateConnectionsForGroup(t)
                }, this.removeAll = function(a, b) {
                    for (var d = 0, e = D.length; e > d; d++) {
                        var f = D[0];
                        t.remove(f, a, b, !0), c.remove(f, !0)
                    }
                    D.length = 0, c.getGroupManager().updateConnectionsForGroup(t)
                }, this.orphanAll = function() {
                    for (var a = {}, b = 0; b < D.length; b++) {
                        var c = m(D[b]);
                        a[c[0]] = c[1]
                    }
                    return D.length = 0, a
                }, this.getMembers = function() {
                    return D
                }, u[k] = this, c.bind(g, function(a) {
                    a.el._jsPlumbGroup === this && r(a.el)
                }.bind(this)), this.shouldProxy = function() {
                    return C
                }, c.getGroupManager().addGroup(this)
            };
        c.prototype.addGroup = function(a) {
            var b = this;
            if (b._groups = b._groups || {}, null != b._groups[a.id]) throw new TypeError("cannot create Group [" + a.id +
                "]; a Group with that ID exists");
            if (null != a.el[k]) throw new TypeError("cannot create Group [" + a.id +
                "]; the given element is already a Group");
            var c = new A(b, a);
            return b._groups[c.id] = c, a.collapsed && this.collapseGroup(c), c
        }, c.prototype.addToGroup = function(a, b, c) {
            var d = function(b) {
                var d = this.getId(b);
                this.manage(d, b), this.getGroupManager().addToGroup(a, b, c)
            }.bind(this);
            if (Array.isArray(b))
                for (var e = 0; e < b.length; e++) d(b[e]);
            else d(b)
        }, c.prototype.removeFromGroup = function(a, b, c) {
            this.getGroupManager().removeFromGroup(a, b, c)
        }, c.prototype.removeGroup = function(a, b, c, d) {
            return this.getGroupManager().removeGroup(a, b, c, d)
        }, c.prototype.removeAllGroups = function(a, b, c) {
            this.getGroupManager().removeAllGroups(a, b, c)
        }, c.prototype.getGroup = function(a) {
            return this.getGroupManager().getGroup(a)
        }, c.prototype.getGroups = function() {
            return this.getGroupManager().getGroups()
        }, c.prototype.expandGroup = function(a) {
            this.getGroupManager().expandGroup(a)
        }, c.prototype.collapseGroup = function(a) {
            this.getGroupManager().collapseGroup(a)
        }, c.prototype.repaintGroup = function(a) {
            this.getGroupManager().repaintGroup(a)
        }, c.prototype.toggleGroup = function(a) {
            a = this.getGroupManager().getGroup(a), null != a && this.getGroupManager()[a.collapsed ? "expandGroup" :
                "collapseGroup"](a)
        }, c.prototype.getGroupManager = function() {
            var a = this[j];
            return null == a && (a = this[j] = new z(this)), a
        }, c.prototype.removeGroupManager = function() {
            delete this[j]
        }, c.prototype.getGroupFor = function(a) {
            return a = this.getElement(a), a ? a[k] : void 0
        }
    }.call("undefined" != typeof window ? window : this),
    function() {
        "use strict";
        var a = this,
            b = a.jsPlumb,
            c = a.jsPlumbUtil,
            d = "Straight",
            e = "Arc",
            f = function(a) {
                this.type = "Flowchart", a = a || {}, a.stub = null == a.stub ? 30 : a.stub;
                var c, f, g = b.Connectors.AbstractConnector.apply(this, arguments),
                    h = null == a.midpoint ? .5 : a.midpoint,
                    i = a.alwaysRespectStubs === !0,
                    j = null,
                    k = null,
                    l = null != a.cornerRadius ? a.cornerRadius : 0,
                    m = (a.loopbackRadius || 25, function(a) {
                        return 0 > a ? -1 : 0 === a ? 0 : 1
                    }),
                    n = function(a) {
                        return [m(a[2] - a[0]), m(a[3] - a[1])]
                    },
                    o = function(a, b, c, d) {
                        if (j !== b || k !== c) {
                            var e = null == j ? d.sx : j,
                                f = null == k ? d.sy : k,
                                g = e === b ? "v" : "h";
                            j = b, k = c, a.push([e, f, b, c, g])
                        }
                    },
                    p = function(a) {
                        return Math.sqrt(Math.pow(a[0] - a[2], 2) + Math.pow(a[1] - a[3], 2))
                    },
                    q = function(a) {
                        var b = [];
                        return b.push.apply(b, a), b
                    },
                    r = function(a, b, c) {
                        for (var f, h, i, j = null, k = 0; k < b.length - 1; k++) {
                            if (j = j || q(b[k]), f = q(b[k + 1]), h = n(j), i = n(f), l > 0 && j[4] !== f[4]) {
                                var m = Math.min(p(j), p(f)),
                                    o = Math.min(l, m / 2);
                                j[2] -= h[0] * o, j[3] -= h[1] * o, f[0] += i[0] * o, f[1] += i[1] * o;
                                var r = h[1] === i[0] && 1 === i[0] || h[1] === i[0] && 0 === i[0] && h[0] !== i[1] || h[1] === i[0] && -
                                    1 === i[0],
                                    s = f[1] > j[3] ? 1 : -1,
                                    t = f[0] > j[2] ? 1 : -1,
                                    u = s === t,
                                    v = u && r || !u && !r ? f[0] : j[2],
                                    w = u && r || !u && !r ? j[3] : f[1];
                                g.addSegment(a, d, {
                                    x1: j[0],
                                    y1: j[1],
                                    x2: j[2],
                                    y2: j[3]
                                }), g.addSegment(a, e, {
                                    r: o,
                                    x1: j[2],
                                    y1: j[3],
                                    x2: f[0],
                                    y2: f[1],
                                    cx: v,
                                    cy: w,
                                    ac: r
                                })
                            } else {
                                var x = j[2] === j[0] ? 0 : j[2] > j[0] ? c.lw / 2 : -(c.lw / 2),
                                    y = j[3] === j[1] ? 0 : j[3] > j[1] ? c.lw / 2 : -(c.lw / 2);
                                g.addSegment(a, d, {
                                    x1: j[0] - x,
                                    y1: j[1] - y,
                                    x2: j[2] + x,
                                    y2: j[3] + y
                                })
                            }
                            j = f
                        }
                        null != f && g.addSegment(a, d, {
                            x1: f[0],
                            y1: f[1],
                            x2: f[2],
                            y2: f[3]
                        })
                    };
                this._compute = function(a, b) {
                    c = [], j = null, k = null, f = null;
                    var d = function() {
                            return [a.startStubX, a.startStubY, a.endStubX, a.endStubY]
                        },
                        e = {
                            perpendicular: d,
                            orthogonal: d,
                            opposite: function(b) {
                                var c = a,
                                    d = "x" === b ? 0 : 1,
                                    e = {
                                        x: function() {
                                            return 1 === c.so[d] && (c.startStubX > c.endStubX && c.tx > c.startStubX || c.sx > c.endStubX && c
                                                .tx > c.sx) || -1 === c.so[d] && (c.startStubX < c.endStubX && c.tx < c.startStubX || c.sx < c.endStubX &&
                                                c.tx < c.sx)
                                        },
                                        y: function() {
                                            return 1 === c.so[d] && (c.startStubY > c.endStubY && c.ty > c.startStubY || c.sy > c.endStubY && c
                                                .ty > c.sy) || -1 === c.so[d] && (c.startStubY < c.endStubY && c.ty < c.startStubY || c.sy < c.endStubY &&
                                                c.ty < c.sy)
                                        }
                                    };
                                return !i && e[b]() ? {
                                    x: [(a.sx + a.tx) / 2, a.startStubY, (a.sx + a.tx) / 2, a.endStubY],
                                    y: [a.startStubX, (a.sy + a.ty) / 2, a.endStubX, (a.sy + a.ty) / 2]
                                } [b] : [a.startStubX, a.startStubY, a.endStubX, a.endStubY]
                            }
                        },
                        l = e[a.anchorOrientation](a.sourceAxis),
                        m = "x" === a.sourceAxis ? 0 : 1,
                        n = "x" === a.sourceAxis ? 1 : 0,
                        p = l[m],
                        q = l[n],
                        s = l[m + 2],
                        t = l[n + 2];
                    o(c, l[0], l[1], a);
                    var u = a.startStubX + (a.endStubX - a.startStubX) * h,
                        v = a.startStubY + (a.endStubY - a.startStubY) * h,
                        w = {
                            x: [0, 1],
                            y: [1, 0]
                        },
                        x = {
                            perpendicular: function(b) {
                                var c = a,
                                    d = {
                                        x: [
                                            [
                                                [1, 2, 3, 4], null, [2, 1, 4, 3]
                                            ], null, [
                                                [4, 3, 2, 1], null, [3, 4, 1, 2]
                                            ]
                                        ],
                                        y: [
                                            [
                                                [3, 2, 1, 4], null, [2, 3, 4, 1]
                                            ], null, [
                                                [4, 1, 2, 3], null, [1, 4, 3, 2]
                                            ]
                                        ]
                                    },
                                    e = {
                                        x: [
                                            [c.startStubX, c.endStubX], null, [c.endStubX, c.startStubX]
                                        ],
                                        y: [
                                            [c.startStubY, c.endStubY], null, [c.endStubY, c.startStubY]
                                        ]
                                    },
                                    f = {
                                        x: [
                                            [u, c.startStubY],
                                            [u, c.endStubY]
                                        ],
                                        y: [
                                            [c.startStubX, v],
                                            [c.endStubX, v]
                                        ]
                                    },
                                    g = {
                                        x: [
                                            [c.endStubX, c.startStubY]
                                        ],
                                        y: [
                                            [c.startStubX, c.endStubY]
                                        ]
                                    },
                                    h = {
                                        x: [
                                            [c.startStubX, c.endStubY],
                                            [c.endStubX, c.endStubY]
                                        ],
                                        y: [
                                            [c.endStubX, c.startStubY],
                                            [c.endStubX, c.endStubY]
                                        ]
                                    },
                                    i = {
                                        x: [
                                            [c.startStubX, v],
                                            [c.endStubX, v],
                                            [c.endStubX, c.endStubY]
                                        ],
                                        y: [
                                            [u, c.startStubY],
                                            [u, c.endStubY],
                                            [c.endStubX, c.endStubY]
                                        ]
                                    },
                                    j = {
                                        x: [c.startStubY, c.endStubY],
                                        y: [c.startStubX, c.endStubX]
                                    },
                                    k = w[b][0],
                                    l = w[b][1],
                                    m = c.so[k] + 1,
                                    n = c.to[l] + 1,
                                    o = -1 === c.to[l] && j[b][1] < j[b][0] || 1 === c.to[l] && j[b][1] > j[b][0],
                                    p = e[b][m][0],
                                    q = e[b][m][1],
                                    r = d[b][m][n];
                                return c.segment === r[3] || c.segment === r[2] && o ? f[b] : c.segment === r[2] && p > q ? g[b] : c.segment ===
                                    r[2] && q >= p || c.segment === r[1] && !o ? i[b] : c.segment === r[0] || c.segment === r[1] && o ? h[
                                        b] : void 0
                            },
                            orthogonal: function(b, c, d, e, f) {
                                var g = a,
                                    h = {
                                        x: -1 === g.so[0] ? Math.min(c, e) : Math.max(c, e),
                                        y: -1 === g.so[1] ? Math.min(c, e) : Math.max(c, e)
                                    } [b];
                                return {
                                    x: [
                                        [h, d],
                                        [h, f],
                                        [e, f]
                                    ],
                                    y: [
                                        [d, h],
                                        [f, h],
                                        [f, e]
                                    ]
                                } [b]
                            },
                            opposite: function(c, d, e, f) {
                                var h = a,
                                    i = {
                                        x: "y",
                                        y: "x"
                                    } [c],
                                    j = {
                                        x: "height",
                                        y: "width"
                                    } [c],
                                    k = h["is" + c.toUpperCase() + "GreaterThanStubTimes2"];
                                if (b.sourceEndpoint.elementId === b.targetEndpoint.elementId) {
                                    var l = e + (1 - b.sourceEndpoint.anchor[i]) * b.sourceInfo[j] + g.maxStub;
                                    return {
                                        x: [
                                            [d, l],
                                            [f, l]
                                        ],
                                        y: [
                                            [l, d],
                                            [l, f]
                                        ]
                                    } [c]
                                }
                                return !k || 1 === h.so[m] && d > f || -1 === h.so[m] && f > d ? {
                                    x: [
                                        [d, v],
                                        [f, v]
                                    ],
                                    y: [
                                        [u, d],
                                        [u, f]
                                    ]
                                } [c] : 1 === h.so[m] && f > d || -1 === h.so[m] && d > f ? {
                                    x: [
                                        [u, h.sy],
                                        [u, h.ty]
                                    ],
                                    y: [
                                        [h.sx, v],
                                        [h.tx, v]
                                    ]
                                } [c] : void 0
                            }
                        },
                        y = x[a.anchorOrientation](a.sourceAxis, p, q, s, t);
                    if (y)
                        for (var z = 0; z < y.length; z++) o(c, y[z][0], y[z][1], a);
                    o(c, l[2], l[3], a), o(c, a.tx, a.ty, a), r(this, c, a)
                }
            };
        b.Connectors.Flowchart = f, c.extend(b.Connectors.Flowchart, b.Connectors.AbstractConnector)
    }.call("undefined" != typeof window ? window : this),
    function() {
        "use strict";
        var a = this,
            b = a.jsPlumb,
            c = a.jsPlumbUtil;
        b.Connectors.AbstractBezierConnector = function(a) {
            a = a || {};
            var c, d = a.showLoopback !== !1,
                e = (a.curviness || 10, a.margin || 5),
                f = (a.proximityLimit || 80, a.orientation && "clockwise" === a.orientation),
                g = a.loopbackRadius || 25,
                h = !1;
            return this._compute = function(a, b) {
                var i = b.sourcePos,
                    j = b.targetPos,
                    k = Math.abs(i[0] - j[0]),
                    l = Math.abs(i[1] - j[1]);
                if (d && b.sourceEndpoint.elementId === b.targetEndpoint.elementId) {
                    h = !0;
                    var m = b.sourcePos[0],
                        n = b.sourcePos[1] - e,
                        o = m,
                        p = n - g,
                        q = o - g,
                        r = p - g;
                    k = 2 * g, l = 2 * g, a.points[0] = q, a.points[1] = r, a.points[2] = k, a.points[3] = l, c.addSegment(
                        this, "Arc", {
                            loopback: !0,
                            x1: m - q + 4,
                            y1: n - r,
                            startAngle: 0,
                            endAngle: 2 * Math.PI,
                            r: g,
                            ac: !f,
                            x2: m - q - 4,
                            y2: n - r,
                            cx: o - q,
                            cy: p - r
                        })
                } else h = !1, this._computeBezier(a, b, i, j, k, l)
            }, c = b.Connectors.AbstractConnector.apply(this, arguments)
        }, c.extend(b.Connectors.AbstractBezierConnector, b.Connectors.AbstractConnector);
        var d = function(a) {
            a = a || {}, this.type = "Bezier";
            var c = b.Connectors.AbstractBezierConnector.apply(this, arguments),
                d = a.curviness || 150,
                e = 10;
            this.getCurviness = function() {
                return d
            }, this._findControlPoint = function(a, b, c, f, g, h, i) {
                var j = h[0] !== i[0] || h[1] === i[1],
                    k = [];
                return j ? (0 === i[0] ? k.push(c[0] < b[0] ? a[0] + e : a[0] - e) : k.push(a[0] + d * i[0]), 0 === i[1] ?
                    k.push(c[1] < b[1] ? a[1] + e : a[1] - e) : k.push(a[1] + d * h[1])) : (0 === h[0] ? k.push(b[0] < c[0] ?
                        a[0] + e : a[0] - e) : k.push(a[0] - d * h[0]), 0 === h[1] ? k.push(b[1] < c[1] ? a[1] + e : a[1] - e) :
                    k.push(a[1] + d * i[1])), k
            }, this._computeBezier = function(a, b, d, e, f, g) {
                var h, i, j = d[0] < e[0] ? f : 0,
                    k = d[1] < e[1] ? g : 0,
                    l = d[0] < e[0] ? 0 : f,
                    m = d[1] < e[1] ? 0 : g;
                h = this._findControlPoint([j, k], d, e, b.sourceEndpoint, b.targetEndpoint, a.so, a.to), i = this._findControlPoint(
                    [l, m], e, d, b.targetEndpoint, b.sourceEndpoint, a.to, a.so), c.addSegment(this, "Bezier", {
                    x1: j,
                    y1: k,
                    x2: l,
                    y2: m,
                    cp1x: h[0],
                    cp1y: h[1],
                    cp2x: i[0],
                    cp2y: i[1]
                })
            }
        };
        b.Connectors.Bezier = d, c.extend(d, b.Connectors.AbstractBezierConnector)
    }.call("undefined" != typeof window ? window : this),
    function() {
        "use strict";
        var a = this,
            b = a.jsPlumb,
            c = a.jsPlumbUtil,
            d = function(a, b, c, d) {
                return c >= a && b >= d ? 1 : c >= a && d >= b ? 2 : a >= c && d >= b ? 3 : 4
            },
            e = function(a, b, c, d, e, f, g, h, i) {
                return i >= h ? [a, b] : 1 === c ? d[3] <= 0 && e[3] >= 1 ? [a + (d[2] < .5 ? -1 * f : f), b] : d[2] >= 1 &&
                    e[2] <= 0 ? [a, b + (d[3] < .5 ? -1 * g : g)] : [a + -1 * f, b + -1 * g] : 2 === c ? d[3] >= 1 && e[3] <= 0 ?
                    [a + (d[2] < .5 ? -1 * f : f), b] : d[2] >= 1 && e[2] <= 0 ? [a, b + (d[3] < .5 ? -1 * g : g)] : [a + f, b +
                        -1 * g
                    ] : 3 === c ? d[3] >= 1 && e[3] <= 0 ? [a + (d[2] < .5 ? -1 * f : f), b] : d[2] <= 0 && e[2] >= 1 ? [a, b +
                        (d[3] < .5 ? -1 * g : g)
                    ] : [a + -1 * f, b + -1 * g] : 4 === c ? d[3] <= 0 && e[3] >= 1 ? [a + (d[2] < .5 ? -1 * f : f), b] : d[2] <=
                    0 && e[2] >= 1 ? [a, b + (d[3] < .5 ? -1 * g : g)] : [a + f, b + -1 * g] : void 0
            },
            f = function(a) {
                a = a || {}, this.type = "StateMachine";
                var c, f = b.Connectors.AbstractBezierConnector.apply(this, arguments),
                    g = a.curviness || 10,
                    h = a.margin || 5,
                    i = a.proximityLimit || 80;
                a.orientation && "clockwise" === a.orientation;
                this._computeBezier = function(a, b, j, k, l, m) {
                    var n = b.sourcePos[0] < b.targetPos[0] ? 0 : l,
                        o = b.sourcePos[1] < b.targetPos[1] ? 0 : m,
                        p = b.sourcePos[0] < b.targetPos[0] ? l : 0,
                        q = b.sourcePos[1] < b.targetPos[1] ? m : 0;
                    0 === b.sourcePos[2] && (n -= h), 1 === b.sourcePos[2] && (n += h), 0 === b.sourcePos[3] && (o -= h), 1 ===
                        b.sourcePos[3] && (o += h), 0 === b.targetPos[2] && (p -= h), 1 === b.targetPos[2] && (p += h), 0 === b.targetPos[
                            3] && (q -= h), 1 === b.targetPos[3] && (q += h);
                    var r, s, t, u, v = (n + p) / 2,
                        w = (o + q) / 2,
                        x = d(n, o, p, q),
                        y = Math.sqrt(Math.pow(p - n, 2) + Math.pow(q - o, 2));
                    c = e(v, w, x, b.sourcePos, b.targetPos, g, g, y, i), r = c[0], s = c[0], t = c[1], u = c[1], f.addSegment(
                        this, "Bezier", {
                            x1: p,
                            y1: q,
                            x2: n,
                            y2: o,
                            cp1x: r,
                            cp1y: t,
                            cp2x: s,
                            cp2y: u
                        })
                }
            };
        b.Connectors.StateMachine = f, c.extend(f, b.Connectors.AbstractBezierConnector)
    }.call("undefined" != typeof window ? window : this),
    function() {
        "use strict";
        var a = this,
            b = a.jsPlumb,
            c = a.jsPlumbUtil,
            d = "Straight",
            e = function(a) {
                this.type = d;
                var c = b.Connectors.AbstractConnector.apply(this, arguments);
                this._compute = function(a, b) {
                    c.addSegment(this, d, {
                        x1: a.sx,
                        y1: a.sy,
                        x2: a.startStubX,
                        y2: a.startStubY
                    }), c.addSegment(this, d, {
                        x1: a.startStubX,
                        y1: a.startStubY,
                        x2: a.endStubX,
                        y2: a.endStubY
                    }), c.addSegment(this, d, {
                        x1: a.endStubX,
                        y1: a.endStubY,
                        x2: a.tx,
                        y2: a.ty
                    })
                }
            };
        b.Connectors.Straight = e, c.extend(e, b.Connectors.AbstractConnector)
    }.call("undefined" != typeof window ? window : this),
    function() {
        "use strict";
        var a = this,
            b = a.jsPlumb,
            c = a.jsPlumbUtil,
            d = {
                "stroke-linejoin": "stroke-linejoin",
                "stroke-dashoffset": "stroke-dashoffset",
                "stroke-linecap": "stroke-linecap"
            },
            e = "stroke-dasharray",
            f = "dashstyle",
            g = "linearGradient",
            h = "radialGradient",
            i = "defs",
            j = "fill",
            k = "stop",
            l = "stroke",
            m = "stroke-width",
            n = "style",
            o = "none",
            p = "jsplumb_gradient_",
            q = "strokeWidth",
            r = {
                svg: "http://www.w3.org/2000/svg"
            },
            s = function(a, b) {
                for (var c in b) a.setAttribute(c, "" + b[c])
            },
            t = function(a, c) {
                return c = c || {}, c.version = "1.1", c.xmlns = r.svg, b.createElementNS(r.svg, a, null, null, c)
            },
            u = function(a) {
                return "position:absolute;left:" + a[0] + "px;top:" + a[1] + "px"
            },
            v = function(a) {
                for (var b = a.querySelectorAll(" defs,linearGradient,radialGradient"), c = 0; c < b.length; c++) b[c].parentNode
                    .removeChild(b[c])
            },
            w = function(a, b, c, d, e) {
                var f = p + e._jsPlumb.instance.idstamp();
                v(a);
                var m;
                m = c.gradient.offset ? t(h, {
                    id: f
                }) : t(g, {
                    id: f,
                    gradientUnits: "userSpaceOnUse"
                });
                var n = t(i);
                a.appendChild(n), n.appendChild(m);
                for (var o = 0; o < c.gradient.stops.length; o++) {
                    var q = 1 === e.segment || 2 === e.segment ? o : c.gradient.stops.length - 1 - o,
                        r = c.gradient.stops[q][1],
                        s = t(k, {
                            offset: Math.floor(100 * c.gradient.stops[o][0]) + "%",
                            "stop-color": r
                        });
                    m.appendChild(s)
                }
                var u = c.stroke ? l : j;
                b.setAttribute(u, "url(#" + f + ")")
            },
            x = function(a, b, c, g, h) {
                if (b.setAttribute(j, c.fill ? c.fill : o), b.setAttribute(l, c.stroke ? c.stroke : o), c.gradient ? w(a, b,
                        c, g, h) : (v(a), b.setAttribute(n, "")), c.strokeWidth && b.setAttribute(m, c.strokeWidth), c[f] && c[q] &&
                    !c[e]) {
                    var i = -1 === c[f].indexOf(",") ? " " : ",",
                        k = c[f].split(i),
                        p = "";
                    k.forEach(function(a) {
                        p += Math.floor(a * c.strokeWidth) + i
                    }), b.setAttribute(e, p)
                } else c[e] && b.setAttribute(e, c[e]);
                for (var r in d) c[r] && b.setAttribute(d[r], c[r])
            },
            y = function(a, b, c) {
                a.childNodes.length > c ? a.insertBefore(b, a.childNodes[c]) : a.appendChild(b)
            };
        c.svg = {
            node: t,
            attr: s,
            pos: u
        };
        var z = function(a) {
            var d = a.pointerEventsSpec || "all",
                e = {};
            b.jsPlumbUIComponent.apply(this, a.originalArgs), this.canvas = null, this.path = null, this.svg = null, this
                .bgCanvas = null;
            var f = a.cssClass + " " + (a.originalArgs[0].cssClass || ""),
                g = {
                    style: "",
                    width: 0,
                    height: 0,
                    "pointer-events": d,
                    position: "absolute"
                };
            this.svg = t("svg", g), a.useDivWrapper ? (this.canvas = b.createElement("div", {
                    position: "absolute"
                }), c.sizeElement(this.canvas, 0, 0, 1, 1), this.canvas.className = f) : (s(this.svg, {
                    "class": f
                }), this.canvas = this.svg), a._jsPlumb.appendElement(this.canvas, a.originalArgs[0].parent), a.useDivWrapper &&
                this.canvas.appendChild(this.svg);
            var h = [this.canvas];
            return this.getDisplayElements = function() {
                return h
            }, this.appendDisplayElement = function(a) {
                h.push(a)
            }, this.paint = function(b, d, f) {
                if (null != b) {
                    var g, h = [this.x, this.y],
                        i = [this.w, this.h];
                    null != f && (f.xmin < 0 && (h[0] += f.xmin), f.ymin < 0 && (h[1] += f.ymin), i[0] = f.xmax + (f.xmin < 0 ?
                        -f.xmin : 0), i[1] = f.ymax + (f.ymin < 0 ? -f.ymin : 0)), a.useDivWrapper ? (c.sizeElement(this.canvas,
                        h[0], h[1], i[0], i[1]), h[0] = 0, h[1] = 0, g = u([0, 0])) : g = u([h[0], h[1]]), e.paint.apply(this,
                        arguments), s(this.svg, {
                        style: g,
                        width: i[0] || 0,
                        height: i[1] || 0
                    })
                }
            }, {
                renderer: e
            }
        };
        c.extend(z, b.jsPlumbUIComponent, {
            cleanup: function(a) {
                a || null == this.typeId ? (this.canvas && (this.canvas._jsPlumb = null), this.svg && (this.svg._jsPlumb =
                        null), this.bgCanvas && (this.bgCanvas._jsPlumb = null), this.canvas && this.canvas.parentNode && this.canvas
                    .parentNode.removeChild(this.canvas), this.bgCanvas && this.bgCanvas.parentNode && this.canvas.parentNode
                    .removeChild(this.canvas), this.svg = null, this.canvas = null, this.path = null, this.group = null) : (
                    this.canvas && this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this.bgCanvas &&
                    this.bgCanvas.parentNode && this.bgCanvas.parentNode.removeChild(this.bgCanvas))
            },
            reattach: function(a) {
                var b = a.getContainer();
                this.canvas && null == this.canvas.parentNode && b.appendChild(this.canvas), this.bgCanvas && null == this
                    .bgCanvas.parentNode && b.appendChild(this.bgCanvas)
            },
            setVisible: function(a) {
                this.canvas && (this.canvas.style.display = a ? "block" : "none")
            }
        }), b.ConnectorRenderers.svg = function(a) {
            var c = this,
                d = z.apply(this, [{
                    cssClass: a._jsPlumb.connectorClass,
                    originalArgs: arguments,
                    pointerEventsSpec: "none",
                    _jsPlumb: a._jsPlumb
                }]);
            d.renderer.paint = function(d, e, f) {
                var g = c.getSegments(),
                    h = "",
                    i = [0, 0];
                if (f.xmin < 0 && (i[0] = -f.xmin), f.ymin < 0 && (i[1] = -f.ymin), g.length > 0) {
                    h = c.getPathData();
                    var j = {
                            d: h,
                            transform: "translate(" + i[0] + "," + i[1] + ")",
                            "pointer-events": a["pointer-events"] || "visibleStroke"
                        },
                        k = null,
                        l = [c.x, c.y, c.w, c.h];
                    if (d.outlineStroke) {
                        var m = d.outlineWidth || 1,
                            n = d.strokeWidth + 2 * m;
                        k = b.extend({}, d), delete k.gradient, k.stroke = d.outlineStroke, k.strokeWidth = n, null == c.bgPath ?
                            (c.bgPath = t("path", j), b.addClass(c.bgPath, b.connectorOutlineClass), y(c.svg, c.bgPath, 0)) : s(c.bgPath,
                                j), x(c.svg, c.bgPath, k, l, c)
                    }
                    null == c.path ? (c.path = t("path", j), y(c.svg, c.path, d.outlineStroke ? 1 : 0)) : s(c.path, j), x(c.svg,
                        c.path, d, l, c)
                }
            }
        }, c.extend(b.ConnectorRenderers.svg, z);
        var A = b.SvgEndpoint = function(a) {
            var c = z.apply(this, [{
                cssClass: a._jsPlumb.endpointClass,
                originalArgs: arguments,
                pointerEventsSpec: "all",
                useDivWrapper: !0,
                _jsPlumb: a._jsPlumb
            }]);
            c.renderer.paint = function(a) {
                var c = b.extend({}, a);
                c.outlineStroke && (c.stroke = c.outlineStroke), null == this.node ? (this.node = this.makeNode(c), this.svg
                    .appendChild(this.node)) : null != this.updateNode && this.updateNode(this.node), x(this.svg, this.node,
                    c, [this.x, this.y, this.w, this.h], this), u(this.node, [this.x, this.y])
            }.bind(this)
        };
        c.extend(A, z), b.Endpoints.svg.Dot = function() {
                b.Endpoints.Dot.apply(this, arguments), A.apply(this, arguments), this.makeNode = function(a) {
                    return t("circle", {
                        cx: this.w / 2,
                        cy: this.h / 2,
                        r: this.radius
                    })
                }, this.updateNode = function(a) {
                    s(a, {
                        cx: this.w / 2,
                        cy: this.h / 2,
                        r: this.radius
                    })
                }
            }, c.extend(b.Endpoints.svg.Dot, [b.Endpoints.Dot, A]), b.Endpoints.svg.Rectangle = function() {
                b.Endpoints.Rectangle.apply(this, arguments), A.apply(this, arguments), this.makeNode = function(a) {
                    return t("rect", {
                        width: this.w,
                        height: this.h
                    })
                }, this.updateNode = function(a) {
                    s(a, {
                        width: this.w,
                        height: this.h
                    })
                }
            }, c.extend(b.Endpoints.svg.Rectangle, [b.Endpoints.Rectangle, A]), b.Endpoints.svg.Image = b.Endpoints.Image,
            b.Endpoints.svg.Blank = b.Endpoints.Blank, b.Overlays.svg.Label = b.Overlays.Label, b.Overlays.svg.Custom = b.Overlays
            .Custom;
        var B = function(a, c) {
            a.apply(this, c), b.jsPlumbUIComponent.apply(this, c), this.isAppendedAtTopLevel = !1;
            this.path = null, this.paint = function(a, b) {
                if (a.component.svg && b) {
                    null == this.path && (this.path = t("path", {
                            "pointer-events": "all"
                        }), a.component.svg.appendChild(this.path), this.elementCreated && this.elementCreated(this.path, a.component),
                        this.canvas = a.component.svg);
                    var e = c && 1 === c.length ? c[0].cssClass || "" : "",
                        f = [0, 0];
                    b.xmin < 0 && (f[0] = -b.xmin), b.ymin < 0 && (f[1] = -b.ymin), s(this.path, {
                        d: d(a.d),
                        "class": e,
                        stroke: a.stroke ? a.stroke : null,
                        fill: a.fill ? a.fill : null,
                        transform: "translate(" + f[0] + "," + f[1] + ")"
                    })
                }
            };
            var d = function(a) {
                return isNaN(a.cxy.x) || isNaN(a.cxy.y) ? "" : "M" + a.hxy.x + "," + a.hxy.y + " L" + a.tail[0].x + "," + a
                    .tail[0].y + " L" + a.cxy.x + "," + a.cxy.y + " L" + a.tail[1].x + "," + a.tail[1].y + " L" + a.hxy.x +
                    "," + a.hxy.y
            };
            this.transfer = function(a) {
                a.canvas && this.path && this.path.parentNode && (this.path.parentNode.removeChild(this.path), a.canvas.appendChild(
                    this.path))
            }
        };
        c.extend(B, [b.jsPlumbUIComponent, b.Overlays.AbstractOverlay], {
            cleanup: function(a) {
                null != this.path && (a ? this._jsPlumb.instance.removeElement(this.path) : this.path.parentNode && this.path
                    .parentNode.removeChild(this.path))
            },
            reattach: function(a, b) {
                this.path && b.canvas && b.canvas.appendChild(this.path)
            },
            setVisible: function(a) {
                null != this.path && (this.path.style.display = a ? "block" : "none")
            }
        }), b.Overlays.svg.Arrow = function() {
            B.apply(this, [b.Overlays.Arrow, arguments])
        }, c.extend(b.Overlays.svg.Arrow, [b.Overlays.Arrow, B]), b.Overlays.svg.PlainArrow = function() {
            B.apply(this, [b.Overlays.PlainArrow, arguments])
        }, c.extend(b.Overlays.svg.PlainArrow, [b.Overlays.PlainArrow, B]), b.Overlays.svg.Diamond = function() {
            B.apply(this, [b.Overlays.Diamond, arguments])
        }, c.extend(b.Overlays.svg.Diamond, [b.Overlays.Diamond, B]), b.Overlays.svg.GuideLines = function() {
            var a, c, d = null,
                e = this;
            b.Overlays.GuideLines.apply(this, arguments), this.paint = function(b, g) {
                null == d && (d = t("path"), b.connector.svg.appendChild(d), e.attachListeners(d, b.connector), e.attachListeners(
                    d, e), a = t("path"), b.connector.svg.appendChild(a), e.attachListeners(a, b.connector), e.attachListeners(
                    a, e), c = t("path"), b.connector.svg.appendChild(c), e.attachListeners(c, b.connector), e.attachListeners(
                    c, e));
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
            var f = function(a, b) {
                return "M " + a.x + "," + a.y + " L" + b.x + "," + b.y
            }
        }, c.extend(b.Overlays.svg.GuideLines, b.Overlays.GuideLines)
    }.call("undefined" != typeof window ? window : this),
    function() {
        "use strict";
        var a = this,
            b = a.jsPlumb,
            c = a.jsPlumbUtil,
            d = a.Katavorio,
            e = a.Biltong,
            f = function(a, c) {
                c = c || "main";
                var f = "_katavorio_" + c,
                    g = a[f],
                    h = a.getEventManager();
                return g || (g = new d({
                    bind: h.on,
                    unbind: h.off,
                    getSize: b.getSize,
                    getConstrainingRectangle: function(a) {
                        return [a.parentNode.scrollWidth, a.parentNode.scrollHeight]
                    },
                    getPosition: function(b, c) {
                        var d = a.getOffset(b, c, b._katavorioDrag ? b.offsetParent : null);
                        return [d.left, d.top]
                    },
                    setPosition: function(a, b) {
                        a.style.left = b[0] + "px", a.style.top = b[1] + "px"
                    },
                    addClass: b.addClass,
                    removeClass: b.removeClass,
                    intersects: e.intersects,
                    indexOf: function(a, b) {
                        return a.indexOf(b)
                    },
                    scope: a.getDefaultScope(),
                    css: {
                        noSelect: a.dragSelectClass,
                        droppable: "jtk-droppable",
                        draggable: "jtk-draggable",
                        drag: "jtk-drag",
                        selected: "jtk-drag-selected",
                        active: "jtk-drag-active",
                        hover: "jtk-drag-hover",
                        ghostProxy: "jtk-ghost-proxy"
                    }
                }), g.setZoom(a.getZoom()), a[f] = g, a.bind("zoom", g.setZoom)), g
            },
            g = function(a, b) {
                var d = function(d) {
                    if (null != b[d]) {
                        if (c.isString(b[d])) {
                            var e = b[d].match(/-=/) ? -1 : 1,
                                f = b[d].substring(2);
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
            getElement: function(a) {
                return null == a ? null : (a = "string" == typeof a ? a : null != a.length && null == a.enctype ? a[0] : a,
                    "string" == typeof a ? document.getElementById(a) : a)
            },
            removeElement: function(a) {
                f(this).elementRemoved(a), this.getEventManager().remove(a)
            },
            doAnimate: function(a, c, d) {
                d = d || {};
                var e = this.getOffset(a),
                    f = g(e, c),
                    h = f[0] - e.left,
                    i = f[1] - e.top,
                    j = d.duration || 250,
                    k = 15,
                    l = j / k,
                    m = k / j * h,
                    n = k / j * i,
                    o = 0,
                    p = setInterval(function() {
                        b.setPosition(a, {
                            left: e.left + m * (o + 1),
                            top: e.top + n * (o + 1)
                        }), null != d.step && d.step(o, Math.ceil(l)), o++, o >= l && (window.clearInterval(p), null != d.complete &&
                            d.complete())
                    }, k)
            },
            destroyDraggable: function(a, b) {
                f(this, b).destroyDraggable(a)
            },
            unbindDraggable: function(a, b, c, d) {
                f(this, d).destroyDraggable(a, b, c)
            },
            destroyDroppable: function(a, b) {
                f(this, b).destroyDroppable(a)
            },
            unbindDroppable: function(a, b, c, d) {
                f(this, d).destroyDroppable(a, b, c)
            },
            initDraggable: function(a, b, c) {
                f(this, c).draggable(a, b)
            },
            initDroppable: function(a, b, c) {
                f(this, c).droppable(a, b)
            },
            isAlreadyDraggable: function(a) {
                return null != a._katavorioDrag
            },
            isDragSupported: function(a, b) {
                return !0
            },
            isDropSupported: function(a, b) {
                return !0
            },
            isElementDraggable: function(a) {
                return a = b.getElement(a), a._katavorioDrag && a._katavorioDrag.isEnabled()
            },
            getDragObject: function(a) {
                return a[0].drag.getDragElement()
            },
            getDragScope: function(a) {
                return a._katavorioDrag && a._katavorioDrag.scopes.join(" ") || ""
            },
            getDropEvent: function(a) {
                return a[0].e
            },
            getUIPosition: function(a, b) {
                var c = a[0].el;
                if (null == c.offsetParent) return null;
                var d = a[0].finalPos || a[0].pos,
                    e = {
                        left: d[0],
                        top: d[1]
                    };
                if (c._katavorioDrag && c.offsetParent !== this.getContainer()) {
                    var f = this.getOffset(c.offsetParent);
                    e.left += f.left, e.top += f.top
                }
                return e
            },
            setDragFilter: function(a, b, c) {
                a._katavorioDrag && a._katavorioDrag.setFilter(b, c)
            },
            setElementDraggable: function(a, c) {
                a = b.getElement(a), a._katavorioDrag && a._katavorioDrag.setEnabled(c)
            },
            setDragScope: function(a, b) {
                a._katavorioDrag && a._katavorioDrag.k.setDragScope(a, b)
            },
            setDropScope: function(a, b) {
                a._katavorioDrop && a._katavorioDrop.length > 0 && a._katavorioDrop[0].k.setDropScope(a, b)
            },
            addToPosse: function(a, c) {
                var d = Array.prototype.slice.call(arguments, 1),
                    e = f(this);
                b.each(a, function(a) {
                    a = [b.getElement(a)], a.push.apply(a, d), e.addToPosse.apply(e, a)
                })
            },
            setPosse: function(a, c) {
                var d = Array.prototype.slice.call(arguments, 1),
                    e = f(this);
                b.each(a, function(a) {
                    a = [b.getElement(a)], a.push.apply(a, d), e.setPosse.apply(e, a)
                })
            },
            removeFromPosse: function(a, c) {
                var d = Array.prototype.slice.call(arguments, 1),
                    e = f(this);
                b.each(a, function(a) {
                    a = [b.getElement(a)], a.push.apply(a, d), e.removeFromPosse.apply(e, a)
                })
            },
            removeFromAllPosses: function(a) {
                var c = f(this);
                b.each(a, function(a) {
                    c.removeFromAllPosses(b.getElement(a))
                })
            },
            setPosseState: function(a, c, d) {
                var e = f(this);
                b.each(a, function(a) {
                    e.setPosseState(b.getElement(a), c, d)
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
            animEvents: {
                step: "step",
                complete: "complete"
            },
            stopDrag: function(a) {
                a._katavorioDrag && a._katavorioDrag.abort()
            },
            addToDragSelection: function(a) {
                f(this).select(a)
            },
            removeFromDragSelection: function(a) {
                f(this).deselect(a)
            },
            clearDragSelection: function() {
                f(this).deselectAll()
            },
            trigger: function(a, b, c, d) {
                this.getEventManager().trigger(a, b, c, d)
            },
            doReset: function() {
                for (var a in this) 0 === a.indexOf("_katavorio_") && this[a].reset()
            }
        });
        var h = function(a) {
            var b = function() {
                /complete|loaded|interactive/.test(document.readyState) && "undefined" != typeof document.body && null !=
                    document.body ? a() : setTimeout(b, 9)
            };
            b()
        };
        h(b.init)
    }.call("undefined" != typeof window ? window : this);