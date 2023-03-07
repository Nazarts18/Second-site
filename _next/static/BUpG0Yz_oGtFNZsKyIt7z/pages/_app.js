(window.webpackJsonp = window.webpackJsonp || []).push([["f496"], {
    "+6XX": function(e, t, a) {
        var n = a("y1pI");
        e.exports = function(e) {
            return n(this.__data__, e) > -1
        }
    },
    "+K+b": function(e, t, a) {
        var n = a("JHRd");
        e.exports = function(e) {
            var t = new e.constructor(e.byteLength);
            return new n(t).set(new n(e)),
            t
        }
    },
    "+VcZ": function(e, t, a) {
        "use strict";
        var n = function() {
            function e(e, t) {
                for (var a = 0; a < t.length; a++) {
                    var n = t[a];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, a, n) {
                return a && e(t.prototype, a),
                n && e(t, n),
                t
            }
        }()
          , i = function(e, t, a) {
            for (var n = !0; n; ) {
                var i = e
                  , r = t
                  , o = a;
                n = !1,
                null === i && (i = Function.prototype);
                var c = Object.getOwnPropertyDescriptor(i, r);
                if (void 0 !== c) {
                    if ("value"in c)
                        return c.value;
                    var s = c.get;
                    if (void 0 === s)
                        return;
                    return s.call(o)
                }
                var l = Object.getPrototypeOf(i);
                if (null === l)
                    return;
                e = l,
                t = r,
                a = o,
                n = !0,
                c = l = void 0
            }
        };
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function o(e, t, a) {
            return t in e ? Object.defineProperty(e, t, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = a,
            e
        }
        var c, s, l, u, m, d = a("q1tI"), p = r(d), h = r(a("17x9")), f = a("MTB2"), v = r(a("TSYQ")), b = r(a("Gytx")), g = 0, E = "transform", y = !0, k = 0, N = -1, w = function(e) {
            function t(e, a) {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                i(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e, a),
                this.handleResize = this.handleResize.bind(this),
                this.handleScroll = this.handleScroll.bind(this),
                this.handleScrollStart = this.handleScrollStart.bind(this),
                this.delta = 0,
                this.stickyTop = 0,
                this.stickyBottom = 0,
                this.frozen = !1,
                this.skipNextScrollEvent = !1,
                this.scrollTop = -1,
                this.bottomBoundaryTarget,
                this.topTarget,
                this.subscribers,
                this.state = {
                    top: 0,
                    bottom: 0,
                    width: 0,
                    height: 0,
                    x: 0,
                    y: 0,
                    topBoundary: 0,
                    bottomBoundary: 1 / 0,
                    status: g,
                    pos: 0,
                    activated: !1
                }
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, d.Component),
            n(t, [{
                key: "getTargetHeight",
                value: function(e) {
                    return e && e.offsetHeight || 0
                }
            }, {
                key: "getTopPosition",
                value: function(e) {
                    return "string" == typeof (e = e || this.props.top || this.props.topTarget || 0) && (this.topTarget || (this.topTarget = c.querySelector(e)),
                    e = this.getTargetHeight(this.topTarget)),
                    e
                }
            }, {
                key: "getTargetBottom",
                value: function(e) {
                    if (!e)
                        return -1;
                    var t = e.getBoundingClientRect();
                    return this.scrollTop + t.bottom
                }
            }, {
                key: "getBottomBoundary",
                value: function(e) {
                    var t = e || this.props.bottomBoundary;
                    return "object" == typeof t && (t = t.value || t.target || 0),
                    "string" == typeof t && (this.bottomBoundaryTarget || (this.bottomBoundaryTarget = c.querySelector(t)),
                    t = this.getTargetBottom(this.bottomBoundaryTarget)),
                    t && t > 0 ? t : 1 / 0
                }
            }, {
                key: "reset",
                value: function() {
                    this.setState({
                        status: g,
                        pos: 0
                    })
                }
            }, {
                key: "release",
                value: function(e) {
                    this.setState({
                        status: 1,
                        pos: e - this.state.y
                    })
                }
            }, {
                key: "fix",
                value: function(e) {
                    this.setState({
                        status: 2,
                        pos: e
                    })
                }
            }, {
                key: "updateInitialDimension",
                value: function(e) {
                    e = e || {};
                    var t = this.outerElement.getBoundingClientRect()
                      , a = this.innerElement.getBoundingClientRect()
                      , n = t.width || t.right - t.left
                      , i = a.height || a.bottom - a.top
                      , r = t.top + this.scrollTop;
                    this.setState({
                        top: this.getTopPosition(e.top),
                        bottom: Math.min(this.state.top + i, N),
                        width: n,
                        height: i,
                        x: t.left,
                        y: r,
                        bottomBoundary: this.getBottomBoundary(e.bottomBoundary),
                        topBoundary: r
                    })
                }
            }, {
                key: "handleResize",
                value: function(e, t) {
                    this.props.shouldFreeze() || (N = t.resize.height,
                    this.updateInitialDimension(),
                    this.update())
                }
            }, {
                key: "handleScrollStart",
                value: function(e, t) {
                    this.frozen = this.props.shouldFreeze(),
                    this.frozen || (this.scrollTop === t.scroll.top ? this.skipNextScrollEvent = !0 : (this.scrollTop = t.scroll.top,
                    this.updateInitialDimension()))
                }
            }, {
                key: "handleScroll",
                value: function(e, t) {
                    this.skipNextScrollEvent ? this.skipNextScrollEvent = !1 : (k = t.scroll.delta,
                    this.scrollTop = t.scroll.top,
                    this.update())
                }
            }, {
                key: "update",
                value: function() {
                    if (!this.props.enabled || this.state.bottomBoundary - this.state.topBoundary <= this.state.height || 0 === this.state.width && 0 === this.state.height)
                        this.state.status !== g && this.reset();
                    else {
                        var e = k
                          , t = this.scrollTop + this.state.top
                          , a = this.scrollTop + this.state.bottom;
                        if (t <= this.state.topBoundary)
                            this.reset();
                        else if (a >= this.state.bottomBoundary)
                            this.stickyBottom = this.state.bottomBoundary,
                            this.stickyTop = this.stickyBottom - this.state.height,
                            this.release(this.stickyTop);
                        else if (this.state.height > N - this.state.top)
                            switch (this.state.status) {
                            case g:
                                this.release(this.state.y),
                                this.stickyTop = this.state.y,
                                this.stickyBottom = this.stickyTop + this.state.height;
                            case 1:
                                this.stickyBottom = this.stickyTop + this.state.height,
                                e > 0 && a > this.stickyBottom ? this.fix(this.state.bottom - this.state.height) : e < 0 && t < this.stickyTop && this.fix(this.state.top);
                                break;
                            case 2:
                                var n = !0
                                  , i = this.state.pos
                                  , r = this.state.height;
                                if (e > 0 && i === this.state.top)
                                    this.stickyTop = t - e,
                                    this.stickyBottom = this.stickyTop + r;
                                else if (e < 0 && i === this.state.bottom - r)
                                    this.stickyBottom = a - e,
                                    this.stickyTop = this.stickyBottom - r;
                                else if (i !== this.state.bottom - r && i !== this.state.top) {
                                    var o = i + r - this.state.bottom;
                                    this.stickyBottom = a - e + o,
                                    this.stickyTop = this.stickyBottom - r
                                } else
                                    n = !1;
                                n && this.release(this.stickyTop)
                            }
                        else
                            this.fix(this.state.top);
                        this.delta = e
                    }
                }
            }, {
                key: "componentWillReceiveProps",
                value: function(e) {
                    this.updateInitialDimension(e),
                    this.update()
                }
            }, {
                key: "componentDidUpdate",
                value: function(e, t) {
                    var a = this;
                    t.status !== this.state.status && this.props.onStateChange && this.props.onStateChange({
                        status: this.state.status
                    }),
                    e.enabled !== this.props.enabled && (this.props.enabled ? this.setState({
                        activated: !0
                    }, function() {
                        a.updateInitialDimension(),
                        a.update()
                    }) : this.setState({
                        activated: !1
                    }, function() {
                        a.reset()
                    }))
                }
            }, {
                key: "componentWillUnmount",
                value: function() {
                    for (var e = (this.subscribers || []).length - 1; e >= 0; e--)
                        this.subscribers[e].unsubscribe()
                }
            }, {
                key: "componentDidMount",
                value: function() {
                    m || (m = window,
                    c = document,
                    l = c.documentElement,
                    s = c.body,
                    N = m.innerHeight || l.clientHeight,
                    (u = window.Modernizr) && u.prefixed && (y = u.csstransforms3d,
                    E = u.prefixed("transform"))),
                    this.scrollTop = s.scrollTop + l.scrollTop,
                    this.props.enabled && (this.setState({
                        activated: !0
                    }),
                    this.updateInitialDimension(),
                    this.update()),
                    this.subscribers = [(0,
                    f.subscribe)("scrollStart", this.handleScrollStart.bind(this), {
                        useRAF: !0
                    }), (0,
                    f.subscribe)("scroll", this.handleScroll.bind(this), {
                        useRAF: !0,
                        enableScrollInfo: !0
                    }), (0,
                    f.subscribe)("resize", this.handleResize.bind(this), {
                        enableResizeInfo: !0
                    })]
                }
            }, {
                key: "translate",
                value: function(e, t) {
                    y && this.props.enableTransforms && this.state.activated ? e[E] = "translate3d(0," + Math.round(t) + "px,0)" : e.top = t + "px"
                }
            }, {
                key: "shouldComponentUpdate",
                value: function(e, t) {
                    return !(this.props.shouldFreeze() || (0,
                    b.default)(this.props, e) && (0,
                    b.default)(this.state, t))
                }
            }, {
                key: "render",
                value: function() {
                    var e, t = this, a = {
                        position: 2 === this.state.status ? "fixed" : "relative",
                        top: 2 === this.state.status ? "0px" : "",
                        zIndex: this.props.innerZ
                    }, n = {};
                    this.translate(a, this.state.pos),
                    this.state.status !== g && (a.width = this.state.width + "px",
                    n.height = this.state.height + "px");
                    var i = (0,
                    v.default)("sticky-outer-wrapper", this.props.className, (o(e = {}, this.props.activeClass, 2 === this.state.status),
                    o(e, this.props.releasedClass, 1 === this.state.status),
                    e))
                      , r = this.props.children;
                    return p.default.createElement("div", {
                        ref: function(e) {
                            t.outerElement = e
                        },
                        className: i,
                        style: n
                    }, p.default.createElement("div", {
                        ref: function(e) {
                            t.innerElement = e
                        },
                        className: "sticky-inner-wrapper",
                        style: a
                    }, "function" == typeof r ? r({
                        status: this.state.status
                    }) : r))
                }
            }]),
            t
        }();
        w.displayName = "Sticky",
        w.defaultProps = {
            shouldFreeze: function() {
                return !1
            },
            enabled: !0,
            top: 0,
            bottomBoundary: 0,
            enableTransforms: !0,
            activeClass: "active",
            releasedClass: "released",
            onStateChange: null
        },
        w.propTypes = {
            enabled: h.default.bool,
            top: h.default.oneOfType([h.default.string, h.default.number]),
            bottomBoundary: h.default.oneOfType([h.default.object, h.default.string, h.default.number]),
            enableTransforms: h.default.bool,
            activeClass: h.default.string,
            releasedClass: h.default.string,
            onStateChange: h.default.func,
            shouldFreeze: h.default.func,
            innerZ: h.default.oneOfType([h.default.string, h.default.number])
        },
        w.STATUS_ORIGINAL = g,
        w.STATUS_RELEASED = 1,
        w.STATUS_FIXED = 2,
        e.exports = w
    },
    "+iFO": function(e, t, a) {
        var n = a("dTAl")
          , i = a("LcsW")
          , r = a("6sVZ");
        e.exports = function(e) {
            return "function" != typeof e.constructor || r(e) ? {} : n(i(e))
        }
    },
    "/9aa": function(e, t, a) {
        var n = a("NykK")
          , i = a("ExA7")
          , r = "[object Symbol]";
        e.exports = function(e) {
            return "symbol" == typeof e || i(e) && n(e) == r
        }
    },
    "/Bct": function(e, t, a) {
        "use strict";
        var n = a("doui")
          , i = a("zrwo")
          , r = a("q1tI")
          , o = a.n(r)
          , c = a("t8Fj")
          , s = a.n(c)
          , l = a("tnMW")
          , u = (a("tUrg"),
        a("9VmF"),
        a("A3CJ"))
          , m = a.n(u)
          , d = a("cPJV")
          , p = a.n(d)
          , h = a("0Ops")
          , f = a("smdI")
          , v = a("2L0F")
          , b = a("2wwy")
          , g = a.n(b)
          , E = a("4WT4");
        function y(e) {
            var t, a = e.item, n = e.clickIdComponente, i = e.showMobile, c = e.firstLevel, s = e.stateHistory, u = a.sidemenuAction && (a.sidemenuAction.link || "#").startsWith("http"), m = Object(r.useContext)(v.a).appData, d = "tablet" === m.device || "mobile" === m.device;
            return t = s && g()(s)[1] === Object(E.U)() && a.href === Object(E.U)() ? !c || !1 : !!s && g()(s).indexOf(a.href) > -1,
            a.hideInHamburger ? null : "filetto" === a.voce ? o.a.createElement(function() {
                return o.a.createElement("li", {
                    className: "sidemenu-list-sep"
                })
            }, null) : "" === a.href && "2" === a.level ? o.a.createElement(function(e) {
                var t = e.label;
                return o.a.createElement("li", {
                    className: "sidemenu-list-label"
                }, t)
            }, {
                label: a.voce
            }) : o.a.createElement(l.a, {
                handler: function() {
                    return n(a.level, a.href)
                },
                overMouse: i,
                skipBorderReset: !0,
                style: {
                    transitionDelay: "3s"
                }
            }, o.a.createElement("li", {
                className: "sidemenu-list-item"
            }, a.freccia ? o.a.createElement(o.a.Fragment, null, i && a.sidemenuAction && a.sidemenuAction.link && !u ? o.a.createElement(h.Link, {
                route: d ? null : a.sidemenuAction.link
            }, o.a.createElement("a", {
                className: "sidemenu-link ".concat(t && "Tutti i video" !== a.voce ? "is-active" : "")
            }, a.voce, o.a.createElement("span", {
                className: "icon icon-angle-right"
            }))) : o.a.createElement("a", {
                className: "sidemenu-link ".concat(t && "Tutti i video" !== a.voce ? "is-active" : ""),
                href: d ? "#" : a.sidemenuAction && a.sidemenuAction.link ? a.sidemenuAction.link : "#"
            }, a.voce, o.a.createElement("span", {
                className: "icon icon-angle-right"
            }))) : o.a.createElement(o.a.Fragment, null, a.href && a.href.startsWith("http") ? o.a.createElement("a", {
                className: "sidemenu-link ".concat(t && "Tutti i video" !== a.voce ? "is-active" : ""),
                href: a.href
            }, a.voce) : o.a.createElement(h.Link, {
                route: a.href || "#"
            }, o.a.createElement("a", {
                className: "sidemenu-link ".concat(t && "Tutti i video" !== a.voce ? "is-active" : "")
            }, a.voce)))))
        }
        function k(e) {
            var t = e.menuLevel0
              , a = e.itemParent
              , n = e.levelTopNav
              , i = e.clickSetShowMenu
              , c = e.clickRemoveActive
              , s = e.clickSearch
              , u = Object(r.useContext)(v.a).appData.isWebview;
            return t ? o.a.createElement("div", {
                className: "sidemenu-topnav-block"
            }, o.a.createElement("span", {
                className: "sidemenu-24"
            }, o.a.createElement(h.Link, {
                route: "/"
            }, o.a.createElement("a", null, o.a.createElement("span", {
                className: "icon icon-24"
            }))), o.a.createElement("a", {
                className: "btn sidemenu-subscribe",
                href: u && u.ios ? f.b : f.c
            }, "Abbonati")), o.a.createElement(l.a, {
                handler: i,
                skipBorderReset: !0
            }, o.a.createElement("a", {
                className: "sidemenu-close ".concat(t ? "sidemenu-action" : "")
            }, o.a.createElement("span", {
                className: "icon icon-close"
            }))), o.a.createElement(l.a, {
                handler: s
            }, o.a.createElement("a", {
                className: "sidemenu-search"
            }, o.a.createElement("span", {
                className: "icon icon-search"
            })))) : o.a.createElement("div", {
                className: "sidemenu-topnav-block"
            }, o.a.createElement(l.a, {
                handler: function() {
                    return c(n, "")
                },
                skipBorderReset: !0
            }, o.a.createElement("a", {
                className: "sidemenu-back sidemenu-action"
            }, o.a.createElement("span", {
                className: "icon icon-arrow-left"
            }))), n < "2" ? o.a.createElement(l.a, {
                handler: function() {
                    return c(n, "")
                },
                skipBorderReset: !0
            }, o.a.createElement("a", {
                className: "sidemenu-parent sidemenu-action"
            }, o.a.createElement("span", {
                className: "icon icon-24"
            }))) : o.a.createElement(l.a, {
                handler: function() {
                    return c(n, "")
                },
                skipBorderReset: !0
            }, o.a.createElement("a", {
                className: "sidemenu-parent sidemenu-action"
            }, o.a.createElement("span", {
                className: "sidemenu-topnav-title"
            }, a.voce))), o.a.createElement(l.a, {
                handler: i,
                skipBorderReset: !0
            }, o.a.createElement("a", {
                className: "sidemenu-close ".concat(t ? "sidemenu-action" : "")
            }, o.a.createElement("span", {
                className: "icon icon-close"
            }))), n < "2" ? o.a.createElement(l.a, {
                handler: s
            }, o.a.createElement("a", {
                className: "sidemenu-search"
            }, o.a.createElement("span", {
                className: "icon icon-search"
            }))) : null)
        }
        function N(e) {
            var t = e.item
              , a = e.itemParent
              , n = e.idComponente
              , i = e.clickIdComponente
              , c = e.stateHistory
              , s = e.clickSetShowMenu
              , l = e.clickSearch
              , u = e.showMobile
              , d = Object(r.useContext)(v.a).appData.isWebview
              , b = t.sidemenuAction && (t.sidemenuAction.link || "#").startsWith("http")
              , g = p()(new Date, "DDDDHH");
            return o.a.createElement("div", {
                className: "sidemenu-lev ".concat(t.class ? t.class : "", " ").concat(n === t.href ? "is-active" : ""),
                "data-level": t.level
            }, o.a.createElement("div", {
                className: "sidemenu-topnav d-lg-none"
            }, o.a.createElement(k, {
                clickSetShowMenu: s,
                clickRemoveActive: i,
                itemParent: a,
                levelTopNav: t.level,
                clickSearch: l
            })), t.sidemenuAction && !b ? o.a.createElement(h.Link, {
                route: t.sidemenuAction.link || ""
            }, o.a.createElement("a", {
                className: "sidemenu-top ".concat(t.sidemenuAction.link ? "sidemenu-action" : "", " d-none d-lg-block")
            }, t.sidemenuAction.imgRadio24 ? o.a.createElement("span", {
                className: "sidemenu-top-logo"
            }, o.a.createElement(m.a, {
                src: "/static/img/radio24.png",
                alt: "Radio24"
            })) : o.a.createElement(o.a.Fragment, null, o.a.createElement("span", {
                className: "sidemenu-top-title blue"
            }, t.sidemenuAction.titolo), o.a.createElement("span", {
                className: "sidemenu-top-text"
            }, t.sidemenuAction.descrizione)))) : null, t.sidemenuAction && b ? o.a.createElement("a", {
                className: "sidemenu-top sidemenu-action d-none d-lg-block",
                href: t.sidemenuAction.link
            }, t.sidemenuAction.imgRadio24 || t.sidemenuAction.imgBusiness ? o.a.createElement("span", {
                className: "sidemenu-top-logo"
            }, "radio" === t.tipo && o.a.createElement(m.a, {
                src: "/static/img/radio24.png",
                alt: "Radio24"
            }) || o.a.createElement(o.a.Fragment, null, o.a.createElement(m.a, {
                "data-img-plain": !0,
                src: "/static/images/24ore-professionale.svg",
                alt: "24 Ore Professionale"
            }), o.a.createElement(m.a, {
                "data-img-hover": !0,
                src: "/static/images/24ore-professionale--white.svg",
                alt: "24 Ore Professionale"
            }))) : o.a.createElement(o.a.Fragment, null, o.a.createElement("span", {
                className: "sidemenu-top-title blue"
            }, t.sidemenuAction.titolo), o.a.createElement("span", {
                className: "sidemenu-top-text"
            }, t.sidemenuAction.descrizione))) : null, t.sidemenuAction ? null : o.a.createElement("div", {
                className: "sidemenu-top d-none d-lg-block"
            }, o.a.createElement("span", {
                className: "sidemenu-top-title"
            }, t.voce), t.descrizioneVoce ? o.a.createElement("span", {
                className: "sidemenu-top-text"
            }, t.descrizioneVoce) : null), t.articoli ? o.a.createElement("div", {
                className: "sidemenu-scrolling"
            }, o.a.createElement("ul", {
                className: "sidemenu-list"
            }, t.articoli.map(function(e) {
                return o.a.createElement("li", {
                    key: "".concat(t.href, "-").concat(e.title),
                    className: "sidemenu-list-item"
                }, o.a.createElement(h.Link, {
                    href: e.link
                }, o.a.createElement("a", {
                    className: "sidemenu-link sidemenu-link--topic"
                }, e.titolo, o.a.createElement("span", {
                    className: "sidemenu-link-description"
                }, e.descrizione))))
            }))) : null, t.sottoMenu ? o.a.createElement("div", {
                className: "sidemenu-scrolling"
            }, t.sidemenuAction ? o.a.createElement(h.Link, {
                href: t.sidemenuAction.link
            }, o.a.createElement("a", {
                className: "sidemenu-top sidemenu-action d-lg-none"
            }, "radio" === t.tipo || "business" === t.tipo ? o.a.createElement("span", {
                className: "sidemenu-top-title"
            }, "radio" === t.tipo && o.a.createElement(m.a, {
                src: "/static/img/radio24.png",
                alt: "Radio24"
            }) || o.a.createElement(o.a.Fragment, null, o.a.createElement(m.a, {
                "data-img-plain": !0,
                src: "/static/images/24ore-professionale.svg",
                alt: "24 Ore Professionale"
            }), o.a.createElement(m.a, {
                "data-img-hover": !0,
                src: "/static/images/24ore-professionale--white.svg",
                alt: "24 Ore Professionale"
            }))) : o.a.createElement("span", {
                className: "sidemenu-top-title"
            }, t.sidemenuAction.titolo))) : o.a.createElement("div", {
                className: "sidemenu-top d-lg-none"
            }, "Video" === t.voce ? o.a.createElement("span", {
                className: "sidemenu-top-title "
            }, o.a.createElement("img", {
                src: "/static/images/stream24-video--white.svg",
                alt: "Video"
            })) : null, "Video" !== t.voce ? o.a.createElement("span", {
                className: "sidemenu-top-title "
            }, t.voce) : null), o.a.createElement("ul", {
                className: "sidemenu-list"
            }, t.sottoMenu.map(function(e) {
                return o.a.createElement(y, {
                    key: "SideMenuList".concat(t.level, "-").concat(t.href, "-").concat(e.href),
                    item: e,
                    stateHistory: c,
                    clickIdComponente: i,
                    showMobile: u
                })
            }))) : null, t.edizioni || t.buttonArchivio ? o.a.createElement("div", {
                className: "sidemenu-scrolling"
            }, t.edizioni ? o.a.createElement("ul", {
                className: "sidemenu-list"
            }, t.edizioni.map(function(e) {
                return o.a.createElement("li", {
                    key: e.edizione,
                    className: "sidemenu-list-item"
                }, o.a.createElement("a", {
                    className: "sidemenu-link sidemenu-link--cover",
                    href: e.img.href
                }, o.a.createElement("img", {
                    className: "img-fluid img-cover",
                    src: "".concat(e.img.src, "?").concat(g),
                    alt: e.img.alt
                }), o.a.createElement("span", {
                    className: "sidemenu-link-description"
                }, e.edizione)))
            })) : null, t.buttonArchivio ? o.a.createElement("div", {
                className: "sidemenu-btn-wrapper"
            }, o.a.createElement("a", {
                className: "btn",
                href: t.buttonArchivio.link
            }, t.buttonArchivio.testo)) : null) : null, t.footerText ? o.a.createElement("div", {
                className: "sidemenu-cta"
            }, o.a.createElement("span", {
                className: "sidemenu-cta-title"
            }, t.footerText.titolo), o.a.createElement("span", {
                className: "sidemenu-cta-text"
            }, t.footerText.descrizione), o.a.createElement("a", {
                className: "btn btn--blue",
                href: d && d.ios ? f.b : t.footerText.link
            }, t.footerText.testo)) : null, t.archivioList ? o.a.createElement("div", {
                className: "sidemenu-scrolling"
            }, o.a.createElement("ul", {
                className: "sidemenu-list"
            }, t.archivioList.map(function(e) {
                return o.a.createElement(o.a.Fragment, {
                    key: e.titolo.testo
                }, o.a.createElement("li", {
                    className: "sidemenu-list-item"
                }, o.a.createElement("a", {
                    className: "sidemenu-link",
                    href: e.titolo.link
                }, e.titolo.testo)), o.a.createElement("li", {
                    className: "sidemenu-list-item"
                }, o.a.createElement("a", {
                    className: "sidemenu-link sidemenu-link--cover",
                    href: e.img.href
                }, o.a.createElement("img", {
                    className: "img-fluid img-cover",
                    src: "".concat(e.img.src, "?").concat(g),
                    alt: e.img.alt
                }), o.a.createElement("span", {
                    className: "sidemenu-link-description"
                }, e.edizione))))
            }))) : null)
        }
        function w(e) {
            var t = e.item;
            return o.a.createElement("li", {
                className: "sidemenu-social-list-item flex-fill"
            }, "/rss" === t.href ? o.a.createElement("a", {
                className: "sidemenu-social-link",
                href: t.href
            }, o.a.createElement("span", {
                className: "icon ".concat(t.className || "")
            })) : o.a.createElement("a", {
                className: "sidemenu-social-link",
                href: t.href,
                target: "_blank",
                rel: "noopener noreferrer"
            }, o.a.createElement("span", {
                className: "icon ".concat(t.className || "")
            })))
        }
        function O(e) {
            var t = e.showModal
              , a = e.clickSearch
              , i = Object(r.useState)("")
              , c = Object(n.default)(i, 2)
              , s = c[0]
              , u = c[1];
            return o.a.createElement(o.a.Fragment, null, o.a.createElement("div", {
                className: "modal modal--transparent ".concat(t ? "show" : ""),
                tabIndex: -1,
                style: t ? {
                    display: "block"
                } : {}
            }, o.a.createElement("div", {
                className: "modal-dialog modal-lg"
            }, o.a.createElement("div", {
                className: "modal-content"
            }, o.a.createElement("div", {
                className: "modal-header"
            }, o.a.createElement("a", {
                className: "sidemenu-parent sidemenu-action d-md-none",
                href: "#"
            }, o.a.createElement("span", {
                className: "icon icon-24"
            })), o.a.createElement(l.a, {
                key: "clickSearch",
                handler: a,
                skipBorderReset: !0
            }, o.a.createElement("a", {
                className: "ltool ltool--circle ltool--clr ml-auto"
            }, o.a.createElement("span", {
                className: "icon icon-close"
            })))), o.a.createElement("div", {
                className: "modal-body"
            }, o.a.createElement("div", {
                className: "search-panel-simple"
            }, o.a.createElement("form", {
                action: Object(E.kb)(),
                methode: "get",
                acceptCharset: "UTF-8"
            }, o.a.createElement("input", {
                type: "hidden",
                name: "cmd",
                value: "static"
            }), o.a.createElement("input", {
                type: "hidden",
                name: "chId",
                value: "30"
            }), o.a.createElement("input", {
                type: "hidden",
                name: "path",
                value: "/search/search_engine.jsp"
            }), o.a.createElement("input", {
                type: "hidden",
                name: "field",
                value: "Titolo|Testo"
            }), o.a.createElement("input", {
                type: "hidden",
                name: "orderBy",
                value: "score desc"
            }), o.a.createElement("input", {
                type: "hidden",
                name: "chId",
                value: "30"
            }), o.a.createElement("div", {
                className: "search-input"
            }, o.a.createElement("input", {
                className: "input input--lined",
                type: "text",
                name: "keyWords",
                value: s,
                onChange: function(e) {
                    var t = e.target.value;
                    u(t)
                },
                placeholder: "Cosa stai cercando?"
            }), o.a.createElement("button", {
                className: "search-input-submit",
                type: "submit",
                name: "button"
            }, o.a.createElement("span", {
                className: "icon icon-search"
            }))))))))))
        }
        function S(e) {
            var t = e.menu
              , a = e.stateHistory
              , n = e.clickIdComponente
              , i = e.showMobile
              , r = e.indexItem;
            return o.a.createElement(o.a.Fragment, null, t.map(function(e, t) {
                return o.a.createElement(y, {
                    key: "side-SideMenuList0-".concat(t),
                    item: e,
                    stateHistory: a,
                    firstLevel: !0,
                    clickIdComponente: n,
                    showMobile: i
                })
            }), 3 !== r ? o.a.createElement("li", {
                key: "li-SideMenuList0",
                className: "sidemenu-list-sep"
            }) : null)
        }
        var j = [{
            href: "https://it-it.facebook.com/ilsole24ore/",
            className: "icon-facebook"
        }, {
            href: "https://twitter.com/sole24ore",
            className: "icon-twitter"
        }, {
            href: "https://it.linkedin.com/company/il-sole-24-ore",
            className: "icon-linkedin"
        }, {
            href: "https://www.instagram.com/ilsole_24ore/?hl=it",
            className: "icon-instagram"
        }, {
            href: "/rss",
            className: "icon-feed"
        }]
          , I = {
            idComponenteLevel1: void 0,
            idComponenteLevel2: void 0,
            idComponenteLevel3: void 0,
            idComponenteLevel4: void 0,
            idComponenteLevel5: void 0
        };
        function x(e, t) {
            switch (t.type) {
            case "1":
                return Object(i.a)({}, e, {
                    idComponenteLevel1: t.payload,
                    idComponenteLevel2: I.idComponenteLevel2,
                    idComponenteLevel3: I.idComponenteLevel3,
                    idComponenteLevel4: I.idComponenteLevel4,
                    idComponenteLevel5: I.idComponenteLevel5
                });
            case "2":
                return Object(i.a)({}, e, {
                    idComponenteLevel2: t.payload,
                    idComponenteLevel3: I.idComponenteLevel3,
                    idComponenteLevel4: I.idComponenteLevel4,
                    idComponenteLevel5: I.idComponenteLevel5
                });
            case "3":
                return Object(i.a)({}, e, {
                    idComponenteLevel3: t.payload,
                    idComponenteLevel4: I.idComponenteLevel4,
                    idComponenteLevel5: I.idComponenteLevel5
                });
            case "4":
                return Object(i.a)({}, e, {
                    idComponenteLevel4: t.payload,
                    idComponenteLevel5: I.idComponenteLevel5
                });
            case "5":
                return Object(i.a)({}, e, {
                    idComponenteLevel5: t.payload
                });
            case "initialState":
            default:
                return Object(i.a)({}, I)
            }
        }
        t.a = function(e) {
            var t = e.showMenu
              , a = e.clickSideMenu
              , i = e.listMenu
              , c = e.device
              , u = Object(r.useState)(!1)
              , m = Object(n.default)(u, 2)
              , d = m[0]
              , p = m[1]
              , h = Object(r.useReducer)(x, I)
              , f = Object(n.default)(h, 2)
              , v = f[0]
              , b = f[1]
              , g = "mobile" !== c || !1
              , E = "bot" === c
              , y = function(e) {
                e.preventDefault(),
                a(),
                p(!1),
                b({
                    type: "initialState",
                    payload: ""
                })
            }
              , T = function() {
                p(!d)
            }
              , _ = function(e, t) {
                "https://areautente.ilsole24ore.com/#newsletter" !== t && b({
                    type: e,
                    payload: t
                })
            };
            return Object(r.useEffect)(function() {
                t ? document.body.classList.add("is-sidemenu-in") : document.body.classList.remove("is-sidemenu-in")
            }),
            o.a.createElement(o.a.Fragment, null, o.a.createElement(l.a, {
                key: "backdrop",
                handler: y,
                skipBorderReset: !0
            }, o.a.createElement("span", {
                className: "sidemenu-backdrop"
            })), o.a.createElement(s.a, {
                enabled: !0,
                enableTransforms: !1,
                bottomBoundary: "body",
                innerZ: 9001
            }, o.a.createElement("div", {
                className: "".concat(d ? "modal-open" : "")
            }, o.a.createElement("div", {
                className: "sidemenu"
            }, o.a.createElement("div", {
                key: "lev0",
                className: "sidemenu-lev inverted-color",
                "data-level": "0"
            }, o.a.createElement("div", {
                className: "sidemenu-topnav"
            }, o.a.createElement(k, {
                menuLevel0: !0,
                levelTopNav: "0",
                clickSetShowMenu: y,
                stateHistory: v,
                clickRemoveActive: _,
                clickSearch: T
            })), o.a.createElement("div", {
                className: "sidemenu-scrolling"
            }, o.a.createElement("ul", {
                className: "sidemenu-list"
            }, i.map(function(e, t) {
                return o.a.createElement(S, {
                    key: "SideMenuListContainer0-".concat(t),
                    menu: e,
                    indexItem: t,
                    stateHistory: v,
                    clickIdComponente: _,
                    showMobile: g
                })
            }))), o.a.createElement("div", {
                className: "sidemenu-social"
            }, o.a.createElement("ul", {
                className: "sidemenu-social-list d-flex"
            }, j.map(function(e) {
                return o.a.createElement(w, {
                    key: e.className,
                    item: e
                })
            })))), !t && !E || d ? null : i.map(function(e) {
                return e.map(function(e) {
                    return o.a.createElement(o.a.Fragment, {
                        key: "l1-".concat(e.href)
                    }, e.freccia ? o.a.createElement(N, {
                        key: e.href,
                        item: e,
                        idComponente: v.idComponenteLevel1,
                        clickIdComponente: _,
                        clickSetShowMenu: y,
                        clickRemoveActive: _,
                        clickSearch: T,
                        stateHistory: v,
                        showMobile: g
                    }) : null, e.freccia && e.sottoMenu ? e.sottoMenu.map(function(t) {
                        return t.freccia && t.sottoMenu ? o.a.createElement(o.a.Fragment, {
                            key: "children-".concat(t.href)
                        }, o.a.createElement(N, {
                            key: t.href,
                            item: t,
                            itemParent: e,
                            idComponente: v.idComponenteLevel2,
                            clickIdComponente: _,
                            clickSetShowMenu: y,
                            clickRemoveActive: _,
                            clickSearch: T,
                            stateHistory: v,
                            showMobile: g
                        }), t.sottoMenu.map(function(e) {
                            return e.freccia && e.sottoMenu ? o.a.createElement(o.a.Fragment, {
                                key: "children-".concat(e.href)
                            }, o.a.createElement(N, {
                                key: e.href,
                                item: e,
                                itemParent: t,
                                idComponente: v.idComponenteLevel3,
                                clickIdComponente: _,
                                clickSetShowMenu: y,
                                clickRemoveActive: _,
                                clickSearch: T,
                                stateHistory: v,
                                showMobile: g
                            }), e.sottoMenu.map(function(t) {
                                return t.freccia && t.sottoMenu ? o.a.createElement(o.a.Fragment, {
                                    key: "children-".concat(t.href)
                                }, o.a.createElement(N, {
                                    key: t.href,
                                    item: t,
                                    itemParent: e,
                                    idComponente: v.idComponenteLevel4,
                                    clickIdComponente: _,
                                    clickSetShowMenu: y,
                                    clickRemoveActive: _,
                                    clickSearch: T,
                                    stateHistory: v,
                                    showMobile: g
                                }), t.sottoMenu.map(function(e) {
                                    return e.freccia ? o.a.createElement(N, {
                                        key: e.href,
                                        item: e,
                                        itemParent: t,
                                        idComponente: v.idComponenteLevel5,
                                        clickSetShowMenu: y,
                                        clickSearch: T,
                                        stateHistory: v,
                                        showMobile: g
                                    }) : null
                                })) : null
                            })) : null
                        })) : null
                    }) : null)
                })
            })), d ? o.a.createElement(O, {
                showModal: d,
                clickSearch: T
            }) : null)))
        }
    },
    "03A+": function(e, t, a) {
        var n = a("JTzB")
          , i = a("ExA7")
          , r = Object.prototype
          , o = r.hasOwnProperty
          , c = r.propertyIsEnumerable
          , s = n(function() {
            return arguments
        }()) ? n : function(e) {
            return i(e) && o.call(e, "callee") && !c.call(e, "callee")
        }
        ;
        e.exports = s
    },
    "0Cz8": function(e, t, a) {
        var n = a("Xi7e")
          , i = a("ebwN")
          , r = a("e4Nc")
          , o = 200;
        e.exports = function(e, t) {
            var a = this.__data__;
            if (a instanceof n) {
                var c = a.__data__;
                if (!i || c.length < o - 1)
                    return c.push([e, t]),
                    this.size = ++a.size,
                    this;
                a = this.__data__ = new r(c)
            }
            return a.set(e, t),
            this.size = a.size,
            this
        }
    },
    "0Jvr": function(e, t, a) {
        "use strict";
        var n = a("KI45");
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = void 0;
        var i = n(a("q1tI"))
          , r = n(a("17x9"))
          , o = n(a("m/Pd"))
          , c = n(a("DHlL"))
          , s = function(e) {
            var t = e.baseSalary
              , a = e.datePosted
              , n = e.description
              , r = e.educationRequirements
              , s = e.employmentType
              , l = e.hiringOrganization
              , u = e.jobLocation
              , m = e.applicantLocationRequirements
              , d = e.jobLocationType
              , p = e.title
              , h = e.validThrough
              , f = '{\n    "@context": "http://schema.org",\n    "@type": "JobPosting",\n    '.concat(t ? function(e) {
                return '\n  "baseSalary": {\n    "@type": "MonetaryAmount",\n    '.concat(e.currency ? '"currency": "'.concat(e.currency, '",') : "", '\n    "value": {\n      "@type": "QuantitativeValue",\n      ').concat(e.value ? '"value": "'.concat(e.value, '",') : "", "\n      ").concat(e.unitText ? '"unitText": "'.concat(e.unitText, '"') : "", "\n    }\n  },\n")
            }(t) : "", '\n    "datePosted": "').concat(a, '",\n    "description": "').concat(n, '",\n    ').concat(r ? '"educationRequirements": "'.concat(r, '",') : "", "\n    ").concat(s ? '"employmentType": "'.concat(s, '",') : "", '\n    "hiringOrganization" : {\n      "@type" : "Organization",\n      "name" : "').concat(l.name, '",\n      "sameAs" : "').concat(l.sameAs, '"\n    },\n    \n    "jobLocation": {\n      "@type": "Place",\n      "address": {\n        "@type": "PostalAddress",\n        "addressLocality": "').concat(u.addressLocality, '",\n        "addressRegion": "').concat(u.addressRegion, '",\n        "postalCode" : "').concat(u.postalCode, '",\n        "streetAddress" : "').concat(u.streetAddress, '",\n        "addressCountry" : "').concat(u.addressCountry, '"\n      }\n    },\n    ').concat(m ? ' "applicantLocationRequirements": {\n        "@type": "Country",\n        "name": "'.concat(m, '"\n    },') : "", "\n    ").concat(d ? '"jobLocationType": "'.concat(d, '",') : "", "\n    ").concat(h ? '"validThrough": "'.concat(h, '",') : "", '\n    "title": "').concat(p, '"\n  }');
            return i.default.createElement(o.default, null, i.default.createElement("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: (0,
                c.default)(f),
                key: "jsonld-jobPosting"
            }))
        };
        s.defaultProps = {
            baseSalary: null,
            educationRequirements: null,
            employmentType: null,
            jobLocationType: null,
            validThrough: null,
            applicantLocationRequirements: null
        },
        s.propTypes = {
            baseSalary: r.default.shape({
                currency: r.default.string,
                value: r.default.number,
                unitText: r.default.string
            }),
            datePosted: r.default.string.isRequired,
            description: r.default.string.isRequired,
            educationRequirements: r.default.string,
            employmentType: r.default.oneOfType([r.default.array, r.default.string]),
            hiringOrganization: r.default.shape({
                name: r.default.string.isRequired,
                sameAs: r.default.string.isRequired
            }).isRequired,
            jobLocation: r.default.shape({
                streetAddress: r.default.string.isRequired,
                addressLocality: r.default.string.isRequired,
                addressRegion: r.default.string.isRequired,
                postalCode: r.default.string.isRequired,
                addressCountry: r.default.string.isRequired
            }).isRequired,
            jobLocationType: r.default.string,
            title: r.default.string.isRequired,
            validThrough: r.default.string,
            applicantLocationRequirements: r.default.string
        };
        var l = s;
        t.default = l
    },
    "0KLy": function(e, t, a) {
        "use strict";
        var n = a("KI45")
          , i = n(a("p0XB"))
          , r = n(a("0iUn"))
          , o = n(a("sLSF"))
          , c = n(a("MI3g"))
          , s = n(a("a7VT"))
          , l = n(a("Tit0"))
          , u = n(a("XXOK"))
          , m = n(a("UXZV"))
          , d = n(a("eVuF"))
          , p = n(a("pLtp"))
          , h = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var f = h(a("q1tI"))
          , v = a("Q0KE")
          , b = []
          , g = []
          , E = !1;
        function y(e) {
            var t = e()
              , a = {
                loading: !0,
                loaded: null,
                error: null
            };
            return a.promise = t.then(function(e) {
                return a.loading = !1,
                a.loaded = e,
                e
            }).catch(function(e) {
                throw a.loading = !1,
                a.error = e,
                e
            }),
            a
        }
        function k(e) {
            var t = {
                loading: !1,
                loaded: {},
                error: null
            }
              , a = [];
            try {
                (0,
                p.default)(e).forEach(function(n) {
                    var i = y(e[n]);
                    i.loading ? t.loading = !0 : (t.loaded[n] = i.loaded,
                    t.error = i.error),
                    a.push(i.promise),
                    i.promise.then(function(e) {
                        t.loaded[n] = e
                    }).catch(function(e) {
                        t.error = e
                    })
                })
            } catch (n) {
                t.error = n
            }
            return t.promise = d.default.all(a).then(function(e) {
                return t.loading = !1,
                e
            }).catch(function(e) {
                throw t.loading = !1,
                e
            }),
            t
        }
        function N(e, t) {
            return f.default.createElement((a = e) && a.__esModule ? a.default : a, t);
            var a
        }
        function w(e, t) {
            var a, n = (0,
            m.default)({
                loader: null,
                loading: null,
                delay: 200,
                timeout: null,
                render: N,
                webpack: null,
                modules: null
            }, t), d = null;
            function p() {
                return d || (d = e(n.loader)),
                d.promise
            }
            if ("undefined" == typeof window && b.push(p),
            !E && "undefined" != typeof window && "function" == typeof n.webpack) {
                var h = n.webpack();
                g.push(function(e) {
                    var t = !0
                      , a = !1
                      , n = void 0;
                    try {
                        for (var i, r = (0,
                        u.default)(h); !(t = (i = r.next()).done); t = !0) {
                            var o = i.value;
                            if (-1 !== e.indexOf(o))
                                return p()
                        }
                    } catch (c) {
                        a = !0,
                        n = c
                    } finally {
                        try {
                            t || null == r.return || r.return()
                        } finally {
                            if (a)
                                throw n
                        }
                    }
                })
            }
            return (a = function(t) {
                function a(t) {
                    var i;
                    return (0,
                    r.default)(this, a),
                    (i = (0,
                    c.default)(this, (0,
                    s.default)(a).call(this, t))).retry = function() {
                        i.setState({
                            error: null,
                            loading: !0,
                            timedOut: !1
                        }),
                        d = e(n.loader),
                        i._loadModule()
                    }
                    ,
                    p(),
                    i.state = {
                        error: d.error,
                        pastDelay: !1,
                        timedOut: !1,
                        loading: d.loading,
                        loaded: d.loaded
                    },
                    i
                }
                return (0,
                l.default)(a, t),
                (0,
                o.default)(a, [{
                    key: "componentWillMount",
                    value: function() {
                        this._mounted = !0,
                        this._loadModule()
                    }
                }, {
                    key: "_loadModule",
                    value: function() {
                        var e = this;
                        if (this.context && (0,
                        i.default)(n.modules) && n.modules.forEach(function(t) {
                            e.context(t)
                        }),
                        d.loading) {
                            "number" == typeof n.delay && (0 === n.delay ? this.setState({
                                pastDelay: !0
                            }) : this._delay = setTimeout(function() {
                                e.setState({
                                    pastDelay: !0
                                })
                            }, n.delay)),
                            "number" == typeof n.timeout && (this._timeout = setTimeout(function() {
                                e.setState({
                                    timedOut: !0
                                })
                            }, n.timeout));
                            var t = function() {
                                e._mounted && (e.setState({
                                    error: d.error,
                                    loaded: d.loaded,
                                    loading: d.loading
                                }),
                                e._clearTimeouts())
                            };
                            d.promise.then(function() {
                                t()
                            }).catch(function(e) {
                                t()
                            })
                        }
                    }
                }, {
                    key: "componentWillUnmount",
                    value: function() {
                        this._mounted = !1,
                        this._clearTimeouts()
                    }
                }, {
                    key: "_clearTimeouts",
                    value: function() {
                        clearTimeout(this._delay),
                        clearTimeout(this._timeout)
                    }
                }, {
                    key: "render",
                    value: function() {
                        return this.state.loading || this.state.error ? f.default.createElement(n.loading, {
                            isLoading: this.state.loading,
                            pastDelay: this.state.pastDelay,
                            timedOut: this.state.timedOut,
                            error: this.state.error,
                            retry: this.retry
                        }) : this.state.loaded ? n.render(this.state.loaded, this.props) : null
                    }
                }], [{
                    key: "preload",
                    value: function() {
                        return p()
                    }
                }]),
                a
            }(f.default.Component)).contextType = v.LoadableContext,
            a
        }
        function O(e) {
            return w(y, e)
        }
        function S(e, t) {
            for (var a = []; e.length; ) {
                var n = e.pop();
                a.push(n(t))
            }
            return d.default.all(a).then(function() {
                if (e.length)
                    return S(e, t)
            })
        }
        O.Map = function(e) {
            if ("function" != typeof e.render)
                throw new Error("LoadableMap requires a `render(loaded, props)` function");
            return w(k, e)
        }
        ,
        O.preloadAll = function() {
            return new d.default(function(e, t) {
                S(b).then(e, t)
            }
            )
        }
        ,
        O.preloadReady = function(e) {
            return new d.default(function(t) {
                var a = function() {
                    return E = !0,
                    t()
                };
                S(g, e).then(a, a)
            }
            )
        }
        ,
        t.default = O
    },
    "0ycA": function(e, t) {
        e.exports = function() {
            return []
        }
    },
    "1+5i": function(e, t, a) {
        var n = a("w/wX")
          , i = a("sEf8")
          , r = a("mdPL")
          , o = r && r.isSet
          , c = o ? i(o) : n;
        e.exports = c
    },
    "1mdS": function(e, t, a) {
        "use strict";
        a.d(t, "a", function() {
            return f
        });
        var n = a("kOwS")
          , i = a("doui")
          , r = (a("Z2Ku"),
        a("L9s1"),
        a("q1tI"))
          , o = a.n(r)
          , c = a("TSYQ")
          , s = a.n(c)
          , l = a("ob4f")
          , u = a("4WT4")
          , m = a("rO+U")
          , d = a("1xym")
          , p = /^\/[^/]/;
        function h(e) {
            var t = e.route
              , a = e.articolo
              , n = e.external
              , i = e.anchorcn
              , r = e.linkHandler
              , c = e.trackEventObj
              , s = e.noIcon
              , l = e.noLink
              , u = e.children
              , d = a.type
              , p = o.a.createElement(o.a.Fragment, null, u, !s && ("video" === d && o.a.createElement("span", {
                className: "icon icon-play"
            }) || ["audio", "Podcast"].includes(d) && o.a.createElement("span", {
                className: "icon icon-podcast"
            })));
            return l ? p : r ? o.a.createElement("button", {
                type: "button",
                className: i,
                onClick: r
            }, p) : c ? o.a.createElement(m.a, {
                route: t,
                params: a,
                external: n,
                classNames: i,
                trackEventObj: c
            }, p) : o.a.createElement(m.a, {
                route: t,
                params: a,
                external: n
            }, o.a.createElement("a", {
                className: i
            }, p))
        }
        function f(e) {
            var t = e.children
              , a = e.route
              , c = e.articolo
              , m = e.external
              , f = e.images
              , v = e.disableSensor
              , b = e.className
              , g = e.placeholder
              , E = e.caption
              , y = e.wrapWithSpan
              , k = e.captionCaretUp
              , N = e.linkHandler
              , w = e.extraProps
              , O = e.opening
              , S = e.trackEventObj
              , j = e.noIcon
              , I = e.noLink
              , x = f || []
              , T = Object(i.default)(x, 2)
              , _ = T[0]
              , M = T[1]
              , L = s()({
                "aprev-img": !0
            }, b)
              , R = s()({
                "d-block": !0
            })
              , C = s()({
                "img-fluid": !0
            })
              , P = p.test(g) ? "".concat(Object(u.B)()).concat(g) : g
              , A = c.uuid
              , F = {
                route: a,
                articolo: c,
                external: m,
                anchorcn: R,
                linkHandler: N,
                trackEventObj: S,
                noIcon: j,
                noLink: I
            }
              , z = function(e) {
                return o.a.createElement(h, F, e)
            }
              , V = function(e) {
                return y ? o.a.createElement("span", {
                    className: "aprev-img-ratio"
                }, z(e)) : z(e)
            }
              , D = Object(r.useMemo)(function() {
                return o.a.createElement(d.b, Object(n.a)({
                    className: C,
                    src: _,
                    alt: M,
                    uuid: A,
                    placeholder: P,
                    container: V,
                    disableSensor: v,
                    noLazy: !0
                }, w))
            }, [A]);
            return o.a.createElement(l.InView, {
                triggerOnce: !0,
                rootMargin: "150px 0px"
            }, function(e) {
                var a = e.inView
                  , n = e.ref;
                e.entry;
                return o.a.createElement("figure", {
                    className: L,
                    ref: n
                }, a || v ? D : V(o.a.createElement("img", {
                    className: C,
                    src: P,
                    alt: M
                })), E ? o.a.createElement("figcaption", {
                    className: "aembed-caption ".concat(O ? "d-none d-md-block" : "")
                }, k && o.a.createElement("span", {
                    className: "icon icon-caret-up"
                }), E) : null, t)
            })
        }
        f.defaultProps = {
            className: "",
            route: "article",
            external: !1,
            disableSensor: !1,
            captionCaretUp: !1,
            linkHandler: null,
            extraProps: null,
            opening: !1,
            trackEventObj: null,
            noIcon: !1,
            noLink: !1
        }
    },
    "1xym": function(e, t, a) {
        "use strict";
        a.d(t, "a", function() {
            return j
        }),
        a.d(t, "b", function() {
            return I
        });
        var n = a("kOwS")
          , i = a("qNsG")
          , r = a("6BQ9")
          , o = a.n(r)
          , c = (a("KKXr"),
        a("doui"))
          , s = a("p0XB")
          , l = a.n(s)
          , u = a("MX0m")
          , m = a.n(u)
          , d = a("q1tI")
          , p = a.n(d)
          , h = a("A3CJ")
          , f = a.n(h)
          , v = a("ob4f")
          , b = a("2L0F")
          , g = a("O84j")
          , E = a("4WT4")
          , y = /^\/[^/]/
          , k = Object(E.B)()
          , N = g.config.placeHolders("403x210");
        var w = function(e) {
            var t = e.disableSensor
              , a = e.dimensions
              , n = e.imageSrc
              , i = e.children;
            if (t && a) {
                var r = a.split("x")
                  , s = Object(c.default)(r, 2)
                  , u = s[0]
                  , d = s[1]
                  , h = 100 * o()(d, 10) / o()(u, 10)
                  , f = "PL-".concat(function(e) {
                    var t = 0
                      , a = l()(e) && e.length > 0 ? e[0] : e;
                    if (0 === a.length)
                        return t;
                    for (var n = 0; n < a.length; n += 1)
                        t = (t << 5) - t + a.charCodeAt(n),
                        t &= t;
                    return t
                }(n));
                return p.a.createElement(p.a.Fragment, null, p.a.createElement(m.a, {
                    id: "2784308429",
                    dynamic: [f, h]
                }, ["#".concat(f, ".embed-responsive-dynamic.__jsx-style-dynamic-selector:before{padding-top:").concat(h, "%;}")]), p.a.createElement("div", {
                    id: f,
                    className: m.a.dynamic([["2784308429", [f, h]]]) + " embed-responsive embed-responsive-dynamic"
                }, p.a.createElement("div", {
                    className: m.a.dynamic([["2784308429", [f, h]]]) + " embed-responsive-item"
                }, i)))
            }
            return i
        }
          , O = function(e, t, a, n, i, r, o) {
            var c = !o && t && (l()(a) && a.length && a[0] || a) || (e ? "".concat(y.test(e) ? k : "").concat(e) : N);
            return p.a.createElement("img", {
                src: c,
                className: n && n.className || "img-fluid",
                alt: "",
                width: i,
                height: r
            })
        };
        function S(e, t) {
            var a = t.cssBreakpoint
              , n = e[a] || e.default || ""
              , i = n.split("x")
              , r = Object(c.default)(i, 2);
            return {
                widthAttr: r[0],
                heightAttr: r[1],
                dimensions: n,
                cssBreakpoint: a
            }
        }
        function j(e) {
            var t = Object(v.useInView)({
                triggerOnce: !0
            })
              , a = Object(c.default)(t, 2)
              , r = a[0]
              , o = a[1]
              , s = Object(d.useContext)(b.a).appData
              , l = e.placeholder
              , u = (e.src,
            e.conf)
              , m = Object(i.a)(e, ["placeholder", "src", "conf"])
              , h = S(u, s)
              , f = h.widthAttr
              , g = h.heightAttr;
            return p.a.createElement("span", {
                ref: r
            }, o ? p.a.createElement(I, e) : p.a.createElement("img", Object(n.a)({
                src: l,
                alt: "loading"
            }, m, {
                width: f,
                height: g
            })))
        }
        function I(e) {
            var t = e.disableSensor
              , a = e.placeholder
              , r = e.hideIfFail
              , o = e.src
              , c = e.alt
              , s = e.conf
              , l = e.noLazy
              , u = Object(i.a)(e, ["disableSensor", "placeholder", "hideIfFail", "src", "alt", "conf", "noLazy"])
              , m = Object(d.useContext)(b.a).appData;
            if (!o)
                return null;
            var h = S(s, m)
              , v = h.widthAttr
              , g = h.heightAttr
              , E = h.dimensions
              , y = h.cssBreakpoint
              , k = s["container_".concat(y)]
              , N = function(e) {
                return "" !== E ? "".concat(e, "?r=").concat(E) : e
            }
              , j = "string" == typeof o ? N(o) : o.map(N)
              , I = O(a, t, j, u, v, g, l);
            return p.a.createElement(w, {
                disableSensor: t,
                dimensions: k || E,
                imageSrc: j
            }, p.a.createElement(f.a, Object(n.a)({
                className: "img-fluid",
                alt: c,
                src: j,
                unloader: r ? null : I,
                loader: I,
                width: v,
                height: g
            }, u)))
        }
        j.defaultProps = {
            placeholder: N,
            src: null,
            conf: {
                default: ""
            }
        },
        I.defaultProps = {
            disableSensor: !1,
            hideIfFail: !1,
            placeholder: null,
            src: "",
            alt: "",
            conf: {
                default: ""
            },
            noLazy: !1
        }
    },
    "2Emt": function(e, t, a) {
        "use strict";
        a.d(t, "a", function() {
            return c
        }),
        a.d(t, "c", function() {
            return p
        }),
        a.d(t, "b", function() {
            return f
        });
        a("tUrg");
        var n = a("zrwo")
          , i = a("qNsG")
          , r = (a("dRSK"),
        a("pIFo"),
        a("4WT4"));
        function o(e) {
            return "/" === e.slice(-1) ? e : "".concat(e, "/")
        }
        var c = {
            STREAM: "stream",
            DOTCOM: "dotcom"
        }
          , s = {
            STREAM: o(Object(r.rb)()),
            MERCATI: o(Object(r.U)()),
            DOTCOM: o(Object(r.N)())
        }
          , l = {
            STREAM: "stream://",
            DOTCOM: "dotcom://",
            MERCATI: "mercati://"
        };
        function u(e, t) {
            var a = "";
            if (e) {
                var n = t === c.STREAM ? "/" : s.STREAM
                  , i = t === c.DOTCOM ? "/" : s.DOTCOM
                  , r = t === c.STREAM || t === c.DOTCOM ? s.MERCATI : "/";
                a = e.replace(l.STREAM, n).replace(l.DOTCOM, i).replace(l.MERCATI, r)
            }
            return a
        }
        function m(e) {
            return "Sezioni" === e.label
        }
        function d(e, t) {
            var a = {
                twigs: []
            };
            return (((e || []).find(function(e) {
                return e.twigs.some(t)
            }) || a).twigs.find(t) || a).twigs
        }
        function p(e, t) {
            return d(e.branches, m).map(function(a) {
                var n = a.uuid
                  , i = a.label
                  , r = a.url
                  , o = a.visibleItems
                  , c = a.visibleItemsSticky
                  , s = a.twigs
                  , l = a.subLevel
                  , m = a.hideInSections
                  , p = {};
                p.uuid = n,
                p.label = i,
                m && (p.hideInSections = m),
                r && (p.url = u(r, t)),
                o && (p.visibleItems = o),
                c && (p.visibleItemsSticky = c);
                var h = l ? d(e.branches, function(e) {
                    return e.label === i
                }) : s;
                return h && (p.subsections = h.map(function(e) {
                    var a = {};
                    return a.uuid = e.uuid,
                    a.label = e.label,
                    e.hideInSections && (a.hideInSections = e.hideInSections),
                    e.url && (a.url = u(e.url, t)),
                    e.visibleItems && (a.visibleItems = e.visibleItems),
                    e.visibleItemsSticky && (a.visibleItemsSticky = e.visibleItemsSticky),
                    a
                })),
                p
            })
        }
        function h(e, t) {
            var a = t.buttonArchivio
              , n = t.archivioList;
            return !!(e || a || n)
        }
        function f(e, t) {
            var a = function(t) {
                return d(e.branches, function(e) {
                    return e.label === t
                })
            };
            return e.branches.map(function(e) {
                return e.twigs.map(function(e) {
                    return function e(t, a, r, o, c, s) {
                        var l, m = t.url, d = t.label, p = t.twigs, f = t.sidemenuAction, v = t.subLevel, b = t.hideInHamburger, g = Object(i.a)(t, ["url", "label", "twigs", "sidemenuAction", "subLevel", "hideInHamburger"]), E = "mercati" === d.toLowerCase() ? "mercati" : o, y = v ? c(d) : p, k = v ? "".concat(d.toLowerCase(), "-") : s, N = Object(n.a)({}, g, {
                            href: u(m, r),
                            voce: d,
                            hideInHamburger: b,
                            freccia: h(y, t),
                            level: "".concat(a)
                        });
                        if (f) {
                            var w = f.link
                              , O = Object(i.a)(f, ["link"]);
                            N.sidemenuAction = Object(n.a)({}, O, {
                                link: u(w, r)
                            })
                        } else
                            (function(e, t, a) {
                                return !!t && ("mercati" === a.toLowerCase() || "sezioni" !== e.toLowerCase() && "sezioni" === a.toLowerCase())
                            }
                            )(d, y, E) && (N.sidemenuAction = {
                                link: u(m, r),
                                titolo: d,
                                descrizione: ""
                            });
                        return y && (N.sottoMenu = y.map(function(t) {
                            return e(t, a + 1, r, E, c, k)
                        }),
                        N.href = (l = E,
                        a > 2 && "mercati" === l ? "".concat(k).concat(t.uuid) : N.href)),
                        N
                    }(e, 1, t, e.label, a)
                })
            })
        }
    },
    "2gN3": function(e, t, a) {
        var n = a("Kz5y")["__core-js_shared__"];
        e.exports = n
    },
    "2wwy": function(e, t, a) {
        e.exports = a("nhzr")
    },
    "3Fdi": function(e, t) {
        var a = Function.prototype.toString;
        e.exports = function(e) {
            if (null != e) {
                try {
                    return a.call(e)
                } catch (t) {}
                try {
                    return e + ""
                } catch (t) {}
            }
            return ""
        }
    },
    "3OWR": function(e, t, a) {
        var n = a("MrPd")
          , i = a("juv8")
          , r = a("LsHQ")
          , o = a("MMmD")
          , c = a("6sVZ")
          , s = a("7GkX")
          , l = Object.prototype.hasOwnProperty
          , u = r(function(e, t) {
            if (c(t) || o(t))
                i(t, s(t), e);
            else
                for (var a in t)
                    l.call(t, a) && n(e, a, t[a])
        });
        e.exports = u
    },
    "3niX": function(e, t, a) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.flush = function() {
            var e = u.cssRules();
            return u.flush(),
            e
        }
        ,
        t.default = void 0;
        var n, i = a("q1tI");
        function r(e) {
            return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function o(e, t) {
            for (var a = 0; a < t.length; a++) {
                var n = t[a];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value"in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        function c(e, t) {
            return !t || "object" !== r(t) && "function" != typeof t ? function(e) {
                if (void 0 === e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function s(e) {
            return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }
            )(e)
        }
        function l(e, t) {
            return (l = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t,
                e
            }
            )(e, t)
        }
        var u = new (((n = a("SevZ")) && n.__esModule ? n : {
            default: n
        }).default)
          , m = function(e) {
            function t(e) {
                var a;
                return function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                (a = c(this, s(t).call(this, e))).prevProps = {},
                a
            }
            var a, n, r;
            return function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && l(e, t)
            }(t, i.Component),
            a = t,
            r = [{
                key: "dynamic",
                value: function(e) {
                    return e.map(function(e) {
                        var t = e[0]
                          , a = e[1];
                        return u.computeId(t, a)
                    }).join(" ")
                }
            }],
            (n = [{
                key: "shouldComponentUpdate",
                value: function(e) {
                    return this.props.id !== e.id || String(this.props.dynamic) !== String(e.dynamic)
                }
            }, {
                key: "componentWillUnmount",
                value: function() {
                    u.remove(this.props)
                }
            }, {
                key: "render",
                value: function() {
                    return this.shouldComponentUpdate(this.prevProps) && (this.prevProps.id && u.remove(this.prevProps),
                    u.add(this.props),
                    this.prevProps = this.props),
                    null
                }
            }]) && o(a.prototype, n),
            r && o(a, r),
            t
        }();
        t.default = m
    },
    "4Pxe": function(e, t, a) {
        "use strict";
        a.d(t, "a", function() {
            return u
        });
        var n = a("qNsG")
          , i = a("q1tI")
          , r = a.n(i)
          , o = a("cPJV")
          , c = a.n(o)
          , s = a("hmb4")
          , l = a.n(s);
        function u(e) {
            var t = e.format
              , a = e.value
              , i = e.plain
              , o = Object(n.a)(e, ["format", "value", "plain"]);
            if (!a)
                return null;
            var s = c()(new Date(a), t, {
                locale: l.a
            })
              , u = s.charAt(0).toUpperCase() + s.substring(1);
            return i ? r.a.createElement("span", o, u) : r.a.createElement("time", o, u)
        }
        u.defaultProps = {
            format: "D MMMM YYYY",
            plain: !1
        }
    },
    "4aqO": function(e, t, a) {
        "use strict";
        var n = a("NZqJ");
        t.a = n.b
    },
    "4hZ1": function(e, t, a) {
        "use strict";
        var n = a("KI45")
          , i = n(a("0iUn"))
          , r = n(a("MI3g"))
          , o = n(a("a7VT"))
          , c = n(a("AT/M"))
          , s = n(a("sLSF"))
          , l = n(a("Tit0"))
          , u = n(a("dfwq"))
          , m = n(a("ttDY"));
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var d = a("q1tI")
          , p = "undefined" == typeof window;
        t.default = function() {
            var e, t = new m.default;
            function a(a) {
                e = a.props.reduceComponentsToState((0,
                u.default)(t), a.props),
                a.props.handleStateChange && a.props.handleStateChange(e)
            }
            return function(n) {
                function u(e) {
                    var n;
                    return (0,
                    i.default)(this, u),
                    n = (0,
                    r.default)(this, (0,
                    o.default)(u).call(this, e)),
                    p && (t.add((0,
                    c.default)(n)),
                    a((0,
                    c.default)(n))),
                    n
                }
                return (0,
                l.default)(u, n),
                (0,
                s.default)(u, null, [{
                    key: "rewind",
                    value: function() {
                        var a = e;
                        return e = void 0,
                        t.clear(),
                        a
                    }
                }]),
                (0,
                s.default)(u, [{
                    key: "componentDidMount",
                    value: function() {
                        t.add(this),
                        a(this)
                    }
                }, {
                    key: "componentDidUpdate",
                    value: function() {
                        a(this)
                    }
                }, {
                    key: "componentWillUnmount",
                    value: function() {
                        t.delete(this),
                        a(this)
                    }
                }, {
                    key: "render",
                    value: function() {
                        return null
                    }
                }]),
                u
            }(d.Component)
        }
    },
    "4kuk": function(e, t, a) {
        var n = a("SfRM")
          , i = a("Hvzi")
          , r = a("u8Dt")
          , o = a("ekgI")
          , c = a("JSQU");
        function s(e) {
            var t = -1
              , a = null == e ? 0 : e.length;
            for (this.clear(); ++t < a; ) {
                var n = e[t];
                this.set(n[0], n[1])
            }
        }
        s.prototype.clear = n,
        s.prototype.delete = i,
        s.prototype.get = r,
        s.prototype.has = o,
        s.prototype.set = c,
        e.exports = s
    },
    "5Tg0": function(e, t, a) {
        (function(e) {
            var n = a("Kz5y")
              , i = t && !t.nodeType && t
              , r = i && "object" == typeof e && e && !e.nodeType && e
              , o = r && r.exports === i ? n.Buffer : void 0
              , c = o ? o.allocUnsafe : void 0;
            e.exports = function(e, t) {
                if (t)
                    return e.slice();
                var a = e.length
                  , n = c ? c(a) : new e.constructor(a);
                return e.copy(n),
                n
            }
        }
        ).call(this, a("YuTi")(e))
    },
    "6sVZ": function(e, t) {
        var a = Object.prototype;
        e.exports = function(e) {
            var t = e && e.constructor;
            return e === ("function" == typeof t && t.prototype || a)
        }
    },
    "77Zs": function(e, t, a) {
        var n = a("Xi7e");
        e.exports = function() {
            this.__data__ = new n,
            this.size = 0
        }
    },
    "7GkX": function(e, t, a) {
        var n = a("b80T")
          , i = a("A90E")
          , r = a("MMmD");
        e.exports = function(e) {
            return r(e) ? n(e) : i(e)
        }
    },
    "7Ix3": function(e, t) {
        e.exports = function(e) {
            var t = [];
            if (null != e)
                for (var a in Object(e))
                    t.push(a);
            return t
        }
    },
    "88Gu": function(e, t) {
        var a = 800
          , n = 16
          , i = Date.now;
        e.exports = function(e) {
            var t = 0
              , r = 0;
            return function() {
                var o = i()
                  , c = n - (o - r);
                if (r = o,
                c > 0) {
                    if (++t >= a)
                        return arguments[0]
                } else
                    t = 0;
                return e.apply(void 0, arguments)
            }
        }
    },
    "8Bbg": function(e, t, a) {
        e.exports = a("B5Ud")
    },
    "91GP": function(e, t, a) {
        var n = a("XKFU");
        n(n.S + n.F, "Object", {
            assign: a("czNK")
        })
    },
    "9kyW": function(e, t, a) {
        "use strict";
        e.exports = function(e) {
            for (var t = 5381, a = e.length; a; )
                t = 33 * t ^ e.charCodeAt(--a);
            return t >>> 0
        }
    },
    A90E: function(e, t, a) {
        var n = a("6sVZ")
          , i = a("V6Ve")
          , r = Object.prototype.hasOwnProperty;
        e.exports = function(e) {
            if (!n(e))
                return i(e);
            var t = [];
            for (var a in Object(e))
                r.call(e, a) && "constructor" != a && t.push(a);
            return t
        }
    },
    AP2z: function(e, t, a) {
        var n = a("nmnc")
          , i = Object.prototype
          , r = i.hasOwnProperty
          , o = i.toString
          , c = n ? n.toStringTag : void 0;
        e.exports = function(e) {
            var t = r.call(e, c)
              , a = e[c];
            try {
                e[c] = void 0;
                var n = !0
            } catch (s) {}
            var i = o.call(e);
            return n && (t ? e[c] = a : delete e[c]),
            i
        }
    },
    B5Ud: function(e, t, a) {
        "use strict";
        var n = a("KI45")
          , i = n(a("eVuF"))
          , r = n(a("UXZV"))
          , o = n(a("/HRN"))
          , c = n(a("WaGi"))
          , s = n(a("ZDA2"))
          , l = n(a("/+P4"))
          , u = n(a("N9n2"))
          , m = function(e) {
            if (e && e.__esModule)
                return e;
            var t = {};
            if (null != e)
                for (var a in e)
                    Object.hasOwnProperty.call(e, a) && (t[a] = e[a]);
            return t.default = e,
            t
        }
          , d = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var p = m(a("q1tI"))
          , h = d(a("lgD3"))
          , f = a("Bu4q")
          , v = a("nOHt")
          , b = function(e) {
            function t() {
                return (0,
                o.default)(this, t),
                (0,
                s.default)(this, (0,
                l.default)(t).apply(this, arguments))
            }
            return (0,
            u.default)(t, e),
            (0,
            c.default)(t, [{
                key: "getChildContext",
                value: function() {
                    return {
                        router: v.makePublicRouterInstance(this.props.router)
                    }
                }
            }, {
                key: "componentDidCatch",
                value: function(e) {
                    throw e
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.props
                      , t = e.router
                      , a = e.Component
                      , n = e.pageProps
                      , i = y(t);
                    return p.default.createElement(g, null, p.default.createElement(a, (0,
                    r.default)({}, n, {
                        url: i
                    })))
                }
            }], [{
                key: "getInitialProps",
                value: function(e) {
                    var t = e.Component
                      , a = (e.router,
                    e.ctx);
                    try {
                        return i.default.resolve(f.loadGetInitialProps(t, a)).then(function(e) {
                            return {
                                pageProps: e
                            }
                        })
                    } catch (n) {
                        return i.default.reject(n)
                    }
                }
            }]),
            t
        }(p.Component);
        b.childContextTypes = {
            router: h.default.object
        },
        t.default = b;
        var g = function(e) {
            function t() {
                return (0,
                o.default)(this, t),
                (0,
                s.default)(this, (0,
                l.default)(t).apply(this, arguments))
            }
            return (0,
            u.default)(t, e),
            (0,
            c.default)(t, [{
                key: "componentDidMount",
                value: function() {
                    this.scrollToHash()
                }
            }, {
                key: "componentDidUpdate",
                value: function() {
                    this.scrollToHash()
                }
            }, {
                key: "scrollToHash",
                value: function() {
                    var e = window.location.hash;
                    if (e = !!e && e.substring(1)) {
                        var t = document.getElementById(e);
                        t && setTimeout(function() {
                            return t.scrollIntoView()
                        }, 0)
                    }
                }
            }, {
                key: "render",
                value: function() {
                    return this.props.children
                }
            }]),
            t
        }(p.Component);
        t.Container = g;
        var E = f.execOnce(function() {
            0
        });
        function y(e) {
            var t = e.pathname
              , a = e.asPath
              , n = e.query;
            return {
                get query() {
                    return E(),
                    n
                },
                get pathname() {
                    return E(),
                    t
                },
                get asPath() {
                    return E(),
                    a
                },
                back: function() {
                    E(),
                    e.back()
                },
                push: function(t, a) {
                    return E(),
                    e.push(t, a)
                },
                pushTo: function(t, a) {
                    E();
                    var n = a ? t : null
                      , i = a || t;
                    return e.push(n, i)
                },
                replace: function(t, a) {
                    return E(),
                    e.replace(t, a)
                },
                replaceTo: function(t, a) {
                    E();
                    var n = a ? t : null
                      , i = a || t;
                    return e.replace(n, i)
                }
            }
        }
        t.createUrl = y
    },
    B8du: function(e, t) {
        e.exports = function() {
            return !1
        }
    },
    CH3K: function(e, t) {
        e.exports = function(e, t) {
            for (var a = -1, n = t.length, i = e.length; ++a < n; )
                e[i + a] = t[a];
            return e
        }
    },
    Ca10: function(e, t, a) {
        "use strict";
        a.d(t, "a", function() {
            return s
        });
        var n = a("q1tI")
          , i = a.n(n)
          , r = a("m/Pd")
          , o = a.n(r)
          , c = a("4WT4");
        function s() {
            var e = "production" === Object(c.K)();
            return i.a.createElement(i.a.Fragment, null, i.a.createElement(o.a, null, i.a.createElement("script", {
                src: "".concat("https://j2.res.24o.it/js/2020/playeraudio").concat(e ? "/prod" : "/dev-dlv", "/player.js"),
                type: "text/javascript"
            })), i.a.createElement("iframe", {
                id: "embed-player-fixed",
                width: "100%",
                height: "90",
                frameBorder: "0",
                scrolling: "no",
                className: "player-frame player-hide",
                title: "Player Audio"
            }))
        }
    },
    Cs30: function(e, t, a) {
        "use strict";
        a.d(t, "b", function() {
            return p
        }),
        a.d(t, "a", function() {
            return v
        });
        a("9VmF");
        var n = a("doui")
          , i = a("q1tI")
          , r = a.n(i)
          , o = a("0Ops")
          , c = a("ecV5")
          , s = a("hWJk")
          , l = a("tnMW")
          , u = a("4Pxe")
          , m = a("PcoO")
          , d = a("2L0F");
        a("K91E");
        function p(e) {
            var t = e.navIcon
              , a = e.topic
              , n = e.sticky
              , i = e.navLogo
              , l = e.articleTitle
              , u = e.noLinks
              , m = e.title
              , d = e.sectionItem
              , p = e.subsectionItem
              , f = e.items
              , v = e.maxVisibleItems
              , b = e.searchModalVisibility
              , g = e.setSearchModalVisibility
              , E = e.clickSetShowMenu
              , y = e.isSuperdossierArticle
              , k = e.dossier
              , N = !0 === a ? "nav-inline nav-inline--sep" : "nav-inline";
            N = y ? "hnav hnav--scroll" : N;
            var w = null
              , O = k && "superdossier" === k.type;
            y && k || d && "" !== d.section && (w = d.sectionId && "" !== d.sectionId && "mercati" !== d.sectionId ? r.a.createElement("li", {
                key: "sectioname",
                className: "nav-inline-item"
            }, r.a.createElement(o.Link, {
                route: "dossier" === d.sectionId ? "homedossier" : Object(o.getRouteToPath)("section", {
                    sectionId: d.sectionId
                })
            }, r.a.createElement("a", {
                className: "hlink hlink--title"
            }, d.section, " ", "finanza-personale" === d.sectionId && r.a.createElement("span", {
                className: "hlink-light"
            }, "by Plus24")))) : r.a.createElement("li", {
                key: "sectioname",
                className: "nav-inline-item"
            }, r.a.createElement("span", {
                className: "hlink hlink--title"
            }, d.section)));
            var S = null;
            return p && "" !== p.subsection && (S = p.subsectionId && "" !== p.subsectionId ? r.a.createElement("li", {
                className: "nav-inline-item "
            }, r.a.createElement(o.Link, {
                route: Object(o.getRouteToPath)("subsection", {
                    sectionId: d.sectionId,
                    subsectionId: p.subsectionId
                })
            }, r.a.createElement("a", {
                className: "hlink "
            }, p.subsection))) : r.a.createElement("li", {
                className: "nav-inline-item "
            }, r.a.createElement("span", {
                className: "hlink "
            }, p.subsection))),
            r.a.createElement("ul", {
                key: "Navigation-lists",
                className: N
            }, !0 === t ? r.a.createElement(r.a.Fragment, null, r.a.createElement(s.b, {
                key: "hamburger-first",
                clickSetShowMenu: E,
                inList: !0
            }), r.a.createElement(c.a, {
                key: "search-modal-button-first",
                searchModalVisibility: b,
                setSearchModalVisibility: g
            })) : null, !0 !== t || !0 !== n && !0 !== i ? null : r.a.createElement("li", {
                key: "linkhome",
                className: "nav-inline-item"
            }, r.a.createElement(o.Link, {
                route: "/"
            }, r.a.createElement("a", {
                className: "hlink hlink--icon hlink--icon24"
            }, r.a.createElement("span", {
                className: "icon icon-24"
            })))), "" !== m ? r.a.createElement("li", {
                key: "sectioname",
                className: "nav-inline-item"
            }, y ? r.a.createElement(o.Link, {
                route: Object(o.getRouteToPath)("homesuperdossierlist", {
                    slug: k.parentslug || k.slug,
                    uuid: k.parentuuid || k.uuid
                })
            }, r.a.createElement("a", {
                className: "hlink hlink--dtitle"
            }, m)) : r.a.createElement("span", {
                className: "hlink hlink--title"
            }, m)) : null, w, "" !== l && !0 === n ? !y && r.a.createElement("li", {
                key: "articletitle",
                className: "nav-inline-item"
            }, r.a.createElement("span", {
                className: "hlink hlink--page-title"
            }, "".concat(l, " "))) : null, "" !== l && !1 === n ? !y && S : null, "" === l && !1 === u ? r.a.createElement(h, {
                key: "navigation-link-first",
                items: f,
                maxVisibleItems: O ? f.length + 1 : v,
                topic: a,
                isSuperDossier: O
            }) : null)
        }
        function h(e) {
            var t = e.items
              , a = e.maxVisibleItems
              , o = e.topic
              , c = e.v2021
              , s = e.sticky
              , u = e.isSuperDossier
              , m = Object(i.useState)(!1)
              , d = Object(n.default)(m, 2)
              , p = d[0]
              , h = d[1]
              , v = function(e) {
                document.querySelector("#closeSez") && (e.target.isSameNode(document.querySelector("#closeSez")) || e.target.isSameNode(document.querySelector("#closeSez > span")) || e.target.isSameNode(document.querySelector("#closeSez-sticky")) || e.target.isSameNode(document.querySelector("#closeSez-sticky > span")) || h(!1))
            };
            if (Object(i.useEffect)(function() {
                return document.addEventListener("click", v, {
                    passive: !0,
                    capture: !1
                }),
                function() {
                    document.removeEventListener("click", v, {
                        passive: !0,
                        capture: !1
                    })
                }
            }, []),
            0 === t.length)
                return null;
            var b = t.filter(function(e) {
                return e && !e.hideInSections
            });
            return r.a.createElement(r.a.Fragment, null, b.filter(function(e, t) {
                return t < a
            }).map(function(e, t) {
                var n = e.uuid;
                return r.a.createElement(f, {
                    key: "single-link-comp-".concat(n),
                    item: e,
                    topic: o,
                    hide: o && t === a - 1,
                    v2021: c,
                    isSuperDossier: u
                })
            }), b.length > a ? r.a.createElement("li", {
                key: "dropdown",
                className: "".concat(c ? "hnav-item" : "nav-inline-item", " dropdown ").concat(!0 === p ? "show" : "")
            }, r.a.createElement(l.a, {
                handler: function(e) {
                    e.preventDefault(),
                    h(!p)
                }
            }, r.a.createElement("a", {
                id: "closeSez".concat(s ? "-sticky" : ""),
                className: "hlink ".concat(c ? "hlink-dd" : ""),
                href: ""
            }, c ? r.a.createElement(r.a.Fragment, null, "Altre ", r.a.createElement("span", {
                className: "icon icon-table-order-increase"
            })) : r.a.createElement(r.a.Fragment, null, "…"))), r.a.createElement("div", {
                key: "single-dropdown",
                className: "dropdown-menu dropdown-menu-right dropdown-menu--bubble ".concat(!0 === p ? "show" : "")
            }, r.a.createElement("ul", {
                key: "single-links",
                className: "list-column"
            }, b.filter(function(e, t) {
                return t >= a
            }).map(function(e) {
                var t = e.uuid;
                return r.a.createElement(f, {
                    key: "single-link-second-".concat(t),
                    item: e,
                    dropdown: !0,
                    clickAction: function() {
                        return h(!1)
                    },
                    v2021: c,
                    isSuperDossier: u
                })
            })))) : null)
        }
        function f(e) {
            var t = e.item
              , a = e.dropdown
              , n = void 0 !== a && a
              , i = e.topic
              , c = void 0 !== i && i
              , s = e.clickAction
              , l = e.hide
              , u = void 0 !== l && l
              , m = e.v2021
              , d = e.isSuperDossier
              , p = t.external
              , h = t.url;
            return t.hideInSections ? null : p || h && h.startsWith("http") ? r.a.createElement("li", {
                key: t.uuid,
                className: "".concat(!0 === n ? "list-column-item" : "".concat(m ? "hnav-item" : "nav-inline-item").concat(u ? " d-none d-lg-inline-block" : ""))
            }, r.a.createElement("a", {
                href: h,
                onClick: s,
                className: "hlink".concat(!0 === n ? "-more" : "", " ").concat(!0 !== c || d ? "" : "hlink--topic")
            }, t.label)) : r.a.createElement("li", {
                key: t.uuid,
                className: "".concat(!0 === n ? "list-column-item" : "".concat(m ? "hnav-item" : "nav-inline-item").concat(u ? " d-none d-lg-inline-block" : ""))
            }, r.a.createElement(o.Link, {
                route: t.url
            }, r.a.createElement("a", {
                onClick: s,
                className: "hlink".concat(!0 === n ? "-more" : "", " ").concat(!0 !== c || d ? "" : "hlink--topic")
            }, t.label)))
        }
        function v(e) {
            var t = e.navIcon
              , a = e.topic
              , n = e.scroll
              , l = e.sticky
              , p = e.title
              , f = e.items
              , v = e.maxVisibleItems
              , b = void 0 === v ? 5 : v
              , g = e.searchModalVisibility
              , E = e.setSearchModalVisibility
              , y = e.clickSetShowMenu
              , k = e.disableMeteo
              , N = e.slimVersion
              , w = e.hideItems
              , O = e.isSuperDossier
              , S = Object(i.useContext)(d.a).appData.routeData
              , j = (S = void 0 === S ? {} : S).query
              , I = S.routeName
              , x = (Object(o.getRouteToPath)(I, j),
            "hnav ".concat((!t || l || O ? n && "hnav--scroll" : "hnav--lined") || (N || l) && " " || "d-none d-lg-block"));
            return r.a.createElement("ul", {
                className: x
            }, t ? r.a.createElement(r.a.Fragment, null, r.a.createElement(s.a, {
                key: "hamburger-first",
                clickSetShowMenu: y,
                sticky: l,
                slimVersion: N
            }), r.a.createElement(c.b, {
                key: "search-modal-button-first",
                searchModalVisibility: g,
                setSearchModalVisibility: E,
                sticky: l,
                slimVersion: N
            }), l || N ? r.a.createElement("li", {
                key: "linkhome",
                className: "hnav-item"
            }, r.a.createElement(o.Link, {
                route: "/"
            }, r.a.createElement("a", {
                className: "hicon-link"
            }, r.a.createElement("span", {
                className: "icon icon-24"
            })))) : r.a.createElement(r.a.Fragment, null, r.a.createElement("li", {
                key: "linkhome",
                className: "hnav-item hnav-item--no-brd d-md-none"
            }, r.a.createElement(o.Link, {
                route: "/"
            }, r.a.createElement("a", {
                className: "hlink hlink--logo"
            }, r.a.createElement("img", {
                className: "himg himg--m",
                src: "/static/img/ilsole24ore-o-2021.svg",
                alt: "Il Sole 24 Ore"
            })))), r.a.createElement("li", {
                className: "hnav-item d-none d-md-inline-block"
            }, r.a.createElement("span", {
                className: "hicon-link widget--meteo"
            }, !k && r.a.createElement(m.a, null), r.a.createElement("span", {
                className: "hicon-label hicon-label--t"
            }, r.a.createElement(u.a, {
                plain: !0,
                format: "D MMMM YYYY",
                value: (new Date).toISOString()
            })))))) : null, "" !== p ? r.a.createElement("li", {
                key: "sectioname",
                className: "hnav-item"
            }, O ? r.a.createElement(o.Link, {
                route: Object(o.getRouteToPath)("homesuperdossierlist", {
                    slug: j.parentslug || j.slug,
                    uuid: j.parentuuid || j.uuid
                })
            }, r.a.createElement("a", {
                className: "hlink ".concat(N ? "hlink--dtitle" : "hlink--label")
            }, p)) : r.a.createElement("span", {
                className: "hlink ".concat(N ? "hlink--dtitle" : "hlink--label")
            }, p)) : null, !w && f && f.length ? r.a.createElement(h, {
                key: "navigation-link-first",
                items: f,
                maxVisibleItems: O ? f.length + 1 : b,
                topic: a,
                v2021: !0,
                sticky: l,
                slimVersion: N,
                isSuperDossier: O
            }) : null)
        }
        p.defaultProps = {
            navIcon: !1,
            topic: !1,
            sticky: !1,
            noLinks: !1,
            navLogo: !1,
            articleTitle: "",
            title: "",
            sectionItem: {
                section: "",
                sectionId: ""
            },
            subsectionItem: {
                subsection: "",
                subsectionId: ""
            },
            items: [],
            maxVisibleItems: 5,
            searchModalVisibility: !1,
            setSearchModalVisibility: function() {},
            clickSetShowMenu: function() {},
            isSuperdossierArticle: !1,
            dossier: {}
        },
        v.defaultProps = {
            navIcon: !1,
            topic: !1,
            disableMeteo: !1,
            scroll: !1,
            sticky: !1,
            title: "",
            items: [],
            maxVisibleItems: 5,
            searchModalVisibility: !1,
            setSearchModalVisibility: function() {},
            clickSetShowMenu: function() {},
            slimVersion: !1,
            hideItems: !1,
            isSuperDossier: !1
        },
        h.defaultProps = {
            items: [],
            topic: !1,
            v2021: !1,
            sticky: !1,
            isSuperDossier: !1
        }
    },
    Cwc5: function(e, t, a) {
        var n = a("NKxu")
          , i = a("Npjl");
        e.exports = function(e, t) {
            var a = i(e, t);
            return n(a) ? a : void 0
        }
    },
    DHlL: function(e, t, a) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = void 0;
        var n = function(e) {
            return {
                __html: e
            }
        };
        t.default = n
    },
    DSRE: function(e, t, a) {
        (function(e) {
            var n = a("Kz5y")
              , i = a("B8du")
              , r = t && !t.nodeType && t
              , o = r && "object" == typeof e && e && !e.nodeType && e
              , c = o && o.exports === r ? n.Buffer : void 0
              , s = (c ? c.isBuffer : void 0) || i;
            e.exports = s
        }
        ).call(this, a("YuTi")(e))
    },
    "Dw+G": function(e, t, a) {
        var n = a("juv8")
          , i = a("mTTR");
        e.exports = function(e, t) {
            return e && n(t, i(t), e)
        }
    },
    DzJC: function(e, t, a) {
        var n = a("sEfC")
          , i = a("GoyQ")
          , r = "Expected a function";
        e.exports = function(e, t, a) {
            var o = !0
              , c = !0;
            if ("function" != typeof e)
                throw new TypeError(r);
            return i(a) && (o = "leading"in a ? !!a.leading : o,
            c = "trailing"in a ? !!a.trailing : c),
            n(e, t, {
                leading: o,
                maxWait: t,
                trailing: c
            })
        }
    },
    E2jh: function(e, t, a) {
        var n, i = a("2gN3"), r = (n = /[^.]+$/.exec(i && i.keys && i.keys.IE_PROTO || "")) ? "Symbol(src)_1." + n : "";
        e.exports = function(e) {
            return !!r && r in e
        }
    },
    E8gZ: function(e, t, a) {
        var n = a("jmDH")
          , i = a("w6GO")
          , r = a("NsO/")
          , o = a("NV0k").f;
        e.exports = function(e) {
            return function(t) {
                for (var a, c = r(t), s = i(c), l = s.length, u = 0, m = []; l > u; )
                    a = s[u++],
                    n && !o.call(c, a) || m.push(e ? [a, c[a]] : c[a]);
                return m
            }
        }
    },
    EA7m: function(e, t, a) {
        var n = a("zZ0H")
          , i = a("Ioao")
          , r = a("wclG");
        e.exports = function(e, t) {
            return r(i(e, t, n), e + "")
        }
    },
    EEGq: function(e, t, a) {
        var n = a("juv8")
          , i = a("oCl/");
        e.exports = function(e, t) {
            return n(e, i(e), t)
        }
    },
    EpBk: function(e, t) {
        e.exports = function(e) {
            var t = typeof e;
            return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e
        }
    },
    ExA7: function(e, t) {
        e.exports = function(e) {
            return null != e && "object" == typeof e
        }
    },
    FmXa: function(e, t, a) {
        "use strict";
        var n = a("KI45");
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = void 0;
        var i = n(a("p0XB"))
          , r = function(e) {
            return (0,
            i.default)(e) ? "[".concat(e.map(function(e) {
                return '"'.concat(e, '"')
            }), "]") : '"'.concat(e, '"')
        };
        t.default = r
    },
    G6z8: function(e, t, a) {
        var n = a("fR/l")
          , i = a("oCl/")
          , r = a("mTTR");
        e.exports = function(e) {
            return n(e, r, i)
        }
    },
    Gi0A: function(e, t, a) {
        var n = a("QqLw")
          , i = a("ExA7")
          , r = "[object Map]";
        e.exports = function(e) {
            return i(e) && n(e) == r
        }
    },
    GoyQ: function(e, t) {
        e.exports = function(e) {
            var t = typeof e;
            return null != e && ("object" == t || "function" == t)
        }
    },
    Gytx: function(e, t) {
        e.exports = function(e, t, a, n) {
            var i = a ? a.call(n, e, t) : void 0;
            if (void 0 !== i)
                return !!i;
            if (e === t)
                return !0;
            if ("object" != typeof e || !e || "object" != typeof t || !t)
                return !1;
            var r = Object.keys(e)
              , o = Object.keys(t);
            if (r.length !== o.length)
                return !1;
            for (var c = Object.prototype.hasOwnProperty.bind(t), s = 0; s < r.length; s++) {
                var l = r[s];
                if (!c(l))
                    return !1;
                var u = e[l]
                  , m = t[l];
                if (!1 === (i = a ? a.call(n, u, m, l) : void 0) || void 0 === i && u !== m)
                    return !1
            }
            return !0
        }
    },
    H5ZR: function(e, t, a) {
        "use strict";
        var n = a("doui")
          , i = a("q1tI")
          , r = a.n(i)
          , o = a("Reer")
          , c = a("4WT4")
          , s = a("1mdS")
          , l = a("rO+U")
          , u = a("O84j")
          , m = (a("f3/d"),
        a("pLtp"))
          , d = a.n(m)
          , p = (a("tUrg"),
        a("dfwq"))
          , h = a("TSYQ")
          , f = a.n(h)
          , v = a("0Ops")
          , b = a("InxH")
          , g = Object(c.U)()
          , E = Object(c.vb)();
        function y(e) {
            var t = e.sectionId
              , a = e.isSticky
              , o = Object(i.useState)([{}, {}, {}, {}, {}])
              , s = Object(n.default)(o, 2)
              , l = s[0]
              , u = s[1]
              , m = function(e) {
                var t = e.list;
                return t || 0 !== t.length ? t.reduce(function(e, t) {
                    var a = t.QUOTE
                      , n = t.F10061
                      , i = t.segno
                      , r = t.F10015
                      , o = t.F10011;
                    return [].concat(Object(p.default)(e), [{
                        name: o,
                        value: r,
                        segno: i,
                        perc: "".concat(i).concat(n.substring(0, 4), "%"),
                        graph: a,
                        link: "".concat(E, "/FinanzaMercati/api/TickerInfo/Redirect/").concat(a)
                    }])
                }, []) : []
            };
            return Object(i.useEffect)(function() {
                var e = Object(c.n)().map(function(e) {
                    return "tickerName=".concat(e)
                }).join("&")
                  , t = function() {
                    var e = JSON.parse('{"ITEMS":"SPMib;SPREAD_ITL_DEM.MTS;EURUS.FX;BRNST.IPE;","loggedIn":false,"list":[{"QUOTE":"SPMib","F10011":"FTSEMIB","F10061":"-","segno":"+","F10015":"-","F20002":"-","F20721":"Milano","Open":false},{"QUOTE":"SPREAD_ITL_DEM.MTS","F10011":"SpreadBTP-Bund10Y","F10061":"-","segno":"-","F10015":"-","F20002":"-","F20721":"MTS","Open":false},{"QUOTE":"EURUS.FX","F10011":"EUR/USD","F10061":"-","segno":"+","F10015":"-","F20002":"-","F20721":"Forex","Open":false},{"QUOTE":"BRNST.IPE","F10011":"Brent","F10061":"-","segno":"+","F10015":"-","F20002":"-","F20721":"Ice","Open":false}]}');
                    u(m(e))
                };
                Object(c.Hb)(5e3, fetch("".concat(E, "/FinanzaMercati/api/TickerInfo/GetItemJSON?").concat(e)).then(function(e) {
                    return e.json()
                }).then(function(e) {
                    e && u(m(e))
                }).catch(function(e) {
                    t()
                })).catch(function(e) {
                    t()
                })
            }, []),
            r.a.createElement("section", {
                className: "rel rel--strip hmarket bg-mtick inverted-color"
            }, r.a.createElement("div", {
                className: "container"
            }, r.a.createElement("div", {
                className: "hmarket-expandible"
            }, r.a.createElement("div", {
                className: "hnav-scroll"
            }, r.a.createElement("ul", {
                className: "hnav hnav--small hnav--lined hnav--scroll hnav--fixw"
            }, r.a.createElement("li", {
                className: "hnav-item"
            }, r.a.createElement("div", {
                className: "hmarket-index hmarket-head"
            }, r.a.createElement("span", {
                className: "hmarket-head-t"
            }, "Finanza"), r.a.createElement("span", {
                className: "hmarket-head-f"
            }, r.a.createElement(v.Link, {
                route: Object(v.getRouteToPath)("section", {
                    sectionId: t
                })
            }, r.a.createElement("a", {
                className: "hmarket-head-l"
            }, "Homepage")), r.a.createElement("a", {
                className: "hmarket-head-l",
                href: g
            }, "Tutti i dati")))), l.map(function(e, t) {
                var n = "-" === e.segno ? "red" : "green"
                  , i = "-" === e.segno ? "down" : "up";
                "SPREAD_ITL_DEM.MTS" === e.graph && (n = "+" === e.segno ? "red" : "green");
                var o = {
                    link_id: "elementi foglia articolo",
                    event_type: "fascia mercati",
                    wtck20: "".concat(t + 1),
                    wtck21: e.link
                };
                return r.a.createElement("li", {
                    className: f()("hnav-item", {
                        "is-loading": 0 === d()(e).length
                    }),
                    key: "RowMercati-".concat(t)
                }, r.a.createElement("a", {
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "hmarket-index",
                    href: e.link,
                    onClick: function() {
                        return Object(b.a)(o)
                    }
                }, r.a.createElement("span", {
                    className: "hmarket-name"
                }, e.name), r.a.createElement("span", {
                    className: "hmarket-value"
                }, e.value), " ", r.a.createElement("span", {
                    className: "hmarket-var ".concat(n)
                }, e.perc, r.a.createElement("span", {
                    className: "icon icon-caret-".concat(i)
                })), !a && r.a.createElement("figure", {
                    className: "sbox-datachart-img hi"
                }, r.a.createElement("img", {
                    className: "img-fluid",
                    src: "".concat(E, "/FinanzaMercati/api/StaticChartEngine/").concat(e.graph, "/Ticker2022"),
                    alt: ""
                })), r.a.createElement("span", {
                    className: "icon icon-linktopage hmarket-goto"
                })))
            }))))))
        }
        var k = a("smdI");
        a.d(t, "a", function() {
            return S
        });
        var N = Object(c.A)()
          , w = Object(c.gb)()
          , O = Object(c.rb)();
        function S(e) {
            var t = e.isSticky
              , a = e.articolo
              , i = e.podcastLast
              , m = e.videoLastBySection;
            if (!a || !a.mainDwp || !a.mainDwp.articleStrip)
                return null;
            var d = a.mainDwp.articleStrip
              , p = a.dossier
              , h = a.frontendTemplate
              , f = a.sectionId;
            if ("nascosto" === d || p || k.g.articlegallery === h)
                return null;
            if ("mercati" === d)
                return r.a.createElement(y, {
                    sectionId: f,
                    isSticky: t
                });
            var v = "podcast" === d ? i : m
              , b = v && v.length && v.slice(0, 3) || []
              , g = t && u.config.placeHolders("71x71") || u.config.placeHolders("154x81");
            return r.a.createElement(o.a, {
                nostrip: !0,
                rstrip: !0,
                invertedColor: !0,
                dgray: "video" === d,
                cwine: "podcast" === d,
                sticky: t
            }, r.a.createElement("div", {
                className: "container"
            }, r.a.createElement("div", {
                className: "rstrip-wrapper"
            }, r.a.createElement("ul", {
                className: "row row--lined scrolling scrolling--md"
            }, r.a.createElement("li", {
                className: "rstrip-title scrolling-item"
            }, r.a.createElement("h6", {
                className: "rstrip-title-txt"
            }, r.a.createElement(l.a, {
                route: "video" === d ? O : w
            }, r.a.createElement("a", null, r.a.createElement("span", {
                className: "rstrip-title-label teal"
            }, "I nostri"), "video" === d ? "Video" : "Podcast"))), r.a.createElement("img", {
                className: "rstrip-title-icon",
                src: "".concat(N, "/img/icon-").concat(d, ".svg"),
                alt: ""
            })), b.map(function(e, t) {
                return function(e, t) {
                    var a = e.cover
                      , i = e.title.leafTitle
                      , o = Object(c.j)([{
                        src: a && (a.medium || a.large) || ""
                    }], N)
                      , u = Object(n.default)(o, 2)
                      , m = u[0]
                      , p = u[1]
                      , h = {
                        link_id: "elementi foglia articolo",
                        event_type: "podcast" === d ? "fascia podcast" : "fascia video",
                        wtck20: "".concat(t + 1)
                    };
                    return r.a.createElement("li", {
                        key: "fasciatop-".concat(t),
                        className: "col scrolling-item"
                    }, r.a.createElement("div", {
                        className: "aprev aprev--h aprev--shline aprev--small"
                    }, r.a.createElement(s.a, {
                        articolo: e,
                        route: "auto",
                        images: [m, p],
                        placeholder: g,
                        trackEventObj: h
                    }), r.a.createElement("div", {
                        className: "aprev-main  "
                    }, r.a.createElement("h3", {
                        className: "aprev-title "
                    }, r.a.createElement(l.a, {
                        key: "fasciatop-titolo-".concat(t),
                        route: "auto",
                        params: e,
                        html: i,
                        trackEventObj: h
                    })))))
                }(e, t)
            })))))
        }
        S.defaultProps = {
            isSticky: !1,
            articolo: {
                mainDwp: {
                    articleStrip: "video"
                }
            },
            videoLastBySection: [],
            podcastLast: []
        }
    },
    H8j4: function(e, t, a) {
        var n = a("QkVE");
        e.exports = function(e, t) {
            var a = n(this, e)
              , i = a.size;
            return a.set(e, t),
            this.size += a.size == i ? 0 : 1,
            this
        }
    },
    HOxn: function(e, t, a) {
        var n = a("Cwc5")(a("Kz5y"), "Promise");
        e.exports = n
    },
    Hvzi: function(e, t) {
        e.exports = function(e) {
            var t = this.has(e) && delete this.__data__[e];
            return this.size -= t ? 1 : 0,
            t
        }
    },
    IClC: function(e, t, a) {
        "use strict";
        var n = function(e) {
            if (e && e.__esModule)
                return e;
            var t = {};
            if (null != e)
                for (var a in e)
                    Object.hasOwnProperty.call(e, a) && (t[a] = e[a]);
            return t.default = e,
            t
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(a("q1tI"));
        t.HeadManagerContext = i.createContext(null)
    },
    Ioao: function(e, t, a) {
        var n = a("heNW")
          , i = Math.max;
        e.exports = function(e, t, a) {
            return t = i(void 0 === t ? e.length - 1 : t, 0),
            function() {
                for (var r = arguments, o = -1, c = i(r.length - t, 0), s = Array(c); ++o < c; )
                    s[o] = r[t + o];
                o = -1;
                for (var l = Array(t + 1); ++o < t; )
                    l[o] = r[o];
                return l[t] = a(s),
                n(e, this, l)
            }
        }
    },
    J5xr: function(e, t, a) {
        (window.__NEXT_P = window.__NEXT_P || []).push(["/_app", function() {
            var e = a("YNMu");
            return {
                page: e.default || e
            }
        }
        ])
    },
    JHRd: function(e, t, a) {
        var n = a("Kz5y").Uint8Array;
        e.exports = n
    },
    JHgL: function(e, t, a) {
        var n = a("QkVE");
        e.exports = function(e) {
            return n(this, e).get(e)
        }
    },
    JSQU: function(e, t, a) {
        var n = a("YESw")
          , i = "__lodash_hash_undefined__";
        e.exports = function(e, t) {
            var a = this.__data__;
            return this.size += this.has(e) ? 0 : 1,
            a[e] = n && void 0 === t ? i : t,
            this
        }
    },
    JTzB: function(e, t, a) {
        var n = a("NykK")
          , i = a("ExA7")
          , r = "[object Arguments]";
        e.exports = function(e) {
            return i(e) && n(e) == r
        }
    },
    JiEa: function(e, t) {
        t.f = Object.getOwnPropertySymbols
    },
    K91E: function(e, t, a) {
        "use strict";
        a.d(t, "g", function() {
            return r
        }),
        a.d(t, "c", function() {
            return o
        }),
        a.d(t, "d", function() {
            return c
        }),
        a.d(t, "f", function() {
            return s
        }),
        a.d(t, "e", function() {
            return l
        }),
        a.d(t, "a", function() {
            return u
        }),
        a.d(t, "b", function() {
            return m
        });
        var n = a("zrwo")
          , i = (a("9VmF"),
        a("dRSK"),
        a("0Ops"));
        function r(e) {
            return !(!e || !e.type) && ("unknown" === e.type ? e && e.items && e.items.length && 1 === e.items.filter(function(e) {
                return "introDossier2015" === e.webtype
            }).length : "dossier" === e.type)
        }
        function o(e) {
            return e && e.items && r(e) ? e.items.find(function(e) {
                return "introDossier2015" === e.webtype
            }) : null
        }
        function c(e) {
            return r(e) ? e.items.filter(function(e) {
                return "introDossier2015" !== e.webtype
            }) : null
        }
        function s(e) {
            return r(e) ? e.uuid || ((o(e) || e.items[0] || {}).dossier || {}).uuid : e && e.uuid || "NaD"
        }
        function l(e) {
            return e.filter(Boolean).reduce(function(e, t) {
                var a = c(t) || (t || {}).items || [];
                return e.concat(a)
            }, [])
        }
        function u(e, t) {
            var a = e.uuid
              , r = e.menuType
              , o = e.slug
              , c = e.url
              , s = r && "article" === r ? c && c.startsWith("http") && c || Object(i.getRouteToPath)("article", {
                slug: o,
                uuid: a
            }) : Object(i.getRouteToPath)("superdossier" === r ? "homesuperdossierlistsection" : "homedossierlistsection", {
                parentslug: t.slug || "",
                parentuuid: t.uuid,
                sectionslug: o,
                uuid: a
            });
            return Object(n.a)({}, e, {
                url: s
            })
        }
        function m(e, t) {
            var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
              , n = e.uuid
              , r = e.slug
              , o = e.menuSuperDossier
              , c = e.intro.title.leafTitle;
            return (a ? [] : [{
                uuid: "menuindex-".concat(n),
                label: c,
                menuType: "superdossier",
                slug: r,
                url: Object(i.getRouteToPath)("homesuperdossierlist", t || e)
            }]).concat(o.map(function(a) {
                return u(a, t || e)
            }))
        }
    },
    KMkd: function(e, t) {
        e.exports = function() {
            this.__data__ = [],
            this.size = 0
        }
    },
    KfNM: function(e, t) {
        var a = Object.prototype.toString;
        e.exports = function(e) {
            return a.call(e)
        }
    },
    Kh8m: function(e, t, a) {
        "use strict";
        var n = a("KI45");
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = void 0;
        var i = n(a("q1tI"))
          , r = n(a("17x9"))
          , o = n(a("m/Pd"))
          , c = n(a("DHlL"))
          , s = function(e) {
            var t = e.courseName
              , a = e.description
              , n = e.providerName
              , r = e.providerUrl
              , s = '{\n    "@context": "http://schema.org",\n    "@type": "Course",\n    "name": "'.concat(t, '",\n    "description": "').concat(a, '",\n    "provider": {\n      "@type": "Organization",\n      "name": "').concat(n, '"').concat(r ? ',\n      "sameAs": "'.concat(r, '"') : "", "\n    }\n  }");
            return i.default.createElement(o.default, null, i.default.createElement("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: (0,
                c.default)(s),
                key: "jsonld-course"
            }))
        };
        s.defaultProps = {
            providerUrl: null
        },
        s.propTypes = {
            courseName: r.default.string.isRequired,
            providerName: r.default.string.isRequired,
            providerUrl: r.default.string,
            description: r.default.string.isRequired
        };
        var l = s;
        t.default = l
    },
    Kz5y: function(e, t, a) {
        var n = a("WFqU")
          , i = "object" == typeof self && self && self.Object === Object && self
          , r = n || i || Function("return this")();
        e.exports = r
    },
    L8xA: function(e, t) {
        e.exports = function(e) {
            var t = this.__data__
              , a = t.delete(e);
            return this.size = t.size,
            a
        }
    },
    LXxW: function(e, t) {
        e.exports = function(e, t) {
            for (var a = -1, n = null == e ? 0 : e.length, i = 0, r = []; ++a < n; ) {
                var o = e[a];
                t(o, a, e) && (r[i++] = o)
            }
            return r
        }
    },
    LcsW: function(e, t, a) {
        var n = a("kekF")(Object.getPrototypeOf, Object);
        e.exports = n
    },
    LsHQ: function(e, t, a) {
        var n = a("EA7m")
          , i = a("mv/X");
        e.exports = function(e) {
            return n(function(t, a) {
                var n = -1
                  , r = a.length
                  , o = r > 1 ? a[r - 1] : void 0
                  , c = r > 2 ? a[2] : void 0;
                for (o = e.length > 3 && "function" == typeof o ? (r--,
                o) : void 0,
                c && i(a[0], a[1], c) && (o = r < 3 ? void 0 : o,
                r = 1),
                t = Object(t); ++n < r; ) {
                    var s = a[n];
                    s && e(t, s, n, o)
                }
                return t
            })
        }
    },
    MMmD: function(e, t, a) {
        var n = a("lSCD")
          , i = a("shjB");
        e.exports = function(e) {
            return null != e && i(e.length) && !n(e)
        }
    },
    MTB2: function(e, t, a) {
        "use strict";
        a.r(t);
        var n = a("3OWR")
          , i = a.n(n)
          , r = a("uhBA")
          , o = a.n(r)
          , c = !1;
        if ("undefined" != typeof window)
            try {
                var s = Object.defineProperty({}, "passive", {
                    get: function() {
                        c = !0
                    }
                });
                window.addEventListener("test", null, s)
            } catch (ae) {}
        var l = c
          , u = {
            connections: {},
            EE: new o.a,
            enableResizeInfo: !1,
            enableScrollInfo: !1,
            listeners: {},
            removers: [],
            supportPassiveEvent: l
        }
          , m = u.supportPassiveEvent
          , d = {
            capture: !1,
            passive: !1
        };
        var p = function(e, t, a, n) {
            var r = "addEventListener"
              , o = "removeEventListener"
              , c = t
              , s = !!m && i()({}, d, n);
            return !e.addEventListener && e.attachEvent && (r = "attachEvent",
            o = "detachEvent",
            c = "on" + t),
            e[r](c, a, s),
            {
                remove: function() {
                    e[o](t, a)
                }
            }
        }
          , h = !1;
        if ("undefined" != typeof navigator) {
            var f = navigator.userAgent.match(/MSIE (\d+\.\d+)/);
            f && (h = parseFloat(f[1], 10) < 9)
        }
        var v = h
          , b = a("uM7l")
          , g = a.n(b)
          , E = a("DzJC")
          , y = a.n(E)
          , k = a("vN+2")
          , N = a.n(k)
          , w = function() {
            function e(e, t) {
                for (var a = 0; a < t.length; a++) {
                    var n = t[a];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, a, n) {
                return a && e(t.prototype, a),
                n && e(t, n),
                t
            }
        }();
        var O = {
            width: 0,
            height: 0
        }
          , S = {
            delta: 0,
            top: 0
        }
          , j = {
            axisIntention: "",
            startX: 0,
            startY: 0,
            deltaX: 0,
            deltaY: 0
        }
          , I = function(e) {
            var t = {
                x: 0,
                y: 0
            }
              , a = document.body
              , n = document.documentElement;
            return e.pageX || e.pageY ? (t.x = e.pageX,
            t.y = e.pageY) : (t.x = e.clientX + a.scrollLeft + n.scrollLeft,
            t.y = e.clientY + a.scrollTop + n.scrollTop),
            t
        }
          , x = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var a = (t.mainType || "").toLowerCase()
                  , n = (t.subType || "").toLowerCase();
                this.mainType = a,
                this.subType = n,
                this.type = a + n.charAt(0).toUpperCase() + n.slice(1) || "",
                this.scroll = S,
                this.resize = O,
                this.touch = j
            }
            return w(e, [{
                key: "update",
                value: function(e) {
                    var t = this.mainType
                      , a = this.subType
                      , n = document.documentElement;
                    if (u.enableScrollInfo && ("scroll" === t || "touchmove" === t)) {
                        var i = n.scrollTop + document.body.scrollTop;
                        i !== this.scroll.top && (this.scroll.delta = i - this.scroll.top,
                        this.scroll.top = i)
                    }
                    if (u.enableResizeInfo && "resize" === t && (this.resize.width = window.innerWidth || n.clientWidth,
                    this.resize.height = window.innerHeight || n.clientHeight),
                    u.enableTouchInfo && e.touches && ("touchstart" === t || "touchmove" === t || "touchend" === t)) {
                        var r = void 0
                          , o = void 0
                          , c = void 0;
                        "touchstart" === t || "start" === a ? (r = I(e.touches[0]),
                        this.touch.axisIntention = "",
                        this.touch.startX = r.x,
                        this.touch.startY = r.y,
                        this.touch.deltaX = 0,
                        this.touch.deltaY = 0) : "touchmove" === t && (r = I(e.touches[0]),
                        this.touch.deltaX = r.x - this.touch.startX,
                        this.touch.deltaY = r.y - this.touch.startY,
                        "" === this.touch.axisIntention && (o = Math.abs(this.touch.deltaX),
                        c = Math.abs(this.touch.deltaY),
                        o > 5 && o >= c ? this.touch.axisIntention = "x" : c > 5 && c > o && (this.touch.axisIntention = "y")))
                    }
                }
            }]),
            e
        }()
          , T = a("xEkU")
          , _ = a.n(T)
          , M = Date.now || function() {
            return (new Date).getTime()
        }
        ;
        var L = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 15
              , a = void 0
              , n = void 0
              , i = 0
              , r = 0
              , o = function o() {
                var c = M();
                t - (c - i) <= 0 ? (i = c,
                r = 0,
                e.apply(a, n)) : r = _()(o)
            };
            return function() {
                a = this,
                n = arguments,
                r || (r = _()(o))
            }
        }
          , R = 100
          , C = 50
          , P = u.connections
          , A = u.EE
          , F = u.listeners
          , z = u.removers
          , V = void 0
          , D = void 0
          , q = void 0
          , B = 0;
        function U(e) {
            return e.id || "target-id-" + B++
        }
        function W(e, t, a, n) {
            return A.on(e, t || N.a, a),
            P[n = n || e] = (P[n] || 0) + 1,
            {
                _type: e,
                _cb: t,
                _ctx: a,
                unsubscribe: function() {
                    if (this._type) {
                        A.removeListener(e, t, a),
                        P[n]--,
                        0 === P[n] && (F[n].remove(),
                        F[n] = void 0),
                        this._type = void 0,
                        this._cb = void 0,
                        this._ctx = void 0;
                        for (var i = z.length - 1; i >= 0; i--) {
                            if (z[i] === this) {
                                z.splice(i, 1);
                                break
                            }
                        }
                    }
                }
            }
        }
        function G(e, t, a) {
            return function(n, i, r, o) {
                var c = r.context
                  , s = r.target
                  , l = s && U(s)
                  , u = l ? ":" + l : ""
                  , m = t + "Start:" + n + u
                  , d = t + "End:" + n + u
                  , h = t + ":" + n + u
                  , f = W(a + ":" + n + u, i, c, h);
                if (z.push(f),
                F[h])
                    return f;
                var b = {
                    start: new x({
                        mainType: t,
                        subType: "start"
                    }),
                    main: new x({
                        mainType: t
                    }),
                    end: new x({
                        mainType: t,
                        subType: "end"
                    })
                };
                "raf" === n ? (n = 16,
                N = L(N)) : n > 0 && (N = y()(N, n));
                var E = void 0;
                function k(e) {
                    b.end.update(e),
                    A.emit(d, e, b.end),
                    E = null
                }
                function N(e) {
                    E || (b.start.update(e),
                    A.emit(m, e, b.start)),
                    clearTimeout(E),
                    b.main.update(e),
                    A.emit(h, e, b.main),
                    E = v ? setTimeout(function() {
                        k(g()(e))
                    }, n + R) : setTimeout(k.bind(null, e), n + R)
                }
                return F[h] = p(s || e, t, N, o),
                f
            }
        }
        function H(e, t) {
            return function(a, n, i, r) {
                var o = i.context
                  , c = i.target
                  , s = c && U(c)
                  , l = t + ":0" + (s ? ":" + s : "")
                  , u = W(l, n, o);
                if (z.push(u),
                F[l])
                    return u;
                var m = new x({
                    mainType: t
                });
                return F[l] = p(c || e, t, function(e) {
                    m.update(e),
                    A.emit(l, e, m)
                }, r),
                u
            }
        }
        "undefined" != typeof window && (q = (V = (D = window).document || document).body);
        var K = {
            scrollStart: G(D, "scroll", "scrollStart"),
            scrollEnd: G(D, "scroll", "scrollEnd"),
            scroll: G(D, "scroll", "scroll"),
            resizeStart: G(D, "resize", "resizeStart"),
            resizeEnd: G(D, "resize", "resizeEnd"),
            resize: G(D, "resize", "resize"),
            visibilitychange: H(V, "visibilitychange"),
            touchmoveStart: G(q, "touchmove", "touchmoveStart"),
            touchmoveEnd: G(q, "touchmove", "touchmoveEnd"),
            touchmove: G(q, "touchmove", "touchmove"),
            touchstart: H(q, "touchstart"),
            touchend: H(q, "touchend")
        };
        var X = function(e, t) {
            var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
              , n = a.useRAF || !1
              , i = parseInt(a.throttleRate, 10)
              , r = a.eventOptions;
            return isNaN(i) && (i = C),
            n && (i = "raf"),
            v && (i = 0),
            u.enableScrollInfo = u.enableScrollInfo || a.enableScrollInfo || !1,
            u.enableResizeInfo = u.enableResizeInfo || a.enableResizeInfo || !1,
            u.enableTouchInfo = u.enableTouchInfo || a.enableTouchInfo || !1,
            K[e](i, t, a, r)
        }
          , Y = u.removers;
        var Q = function(e, t) {
            for (var a = void 0, n = Y.length - 1; n >= 0; n -= 1)
                (a = Y[n])._cb === t && a._type.indexOf(e) >= 0 && (a.unsubscribe(),
                Y.splice(n, 1))
        };
        a.d(t, "listen", function() {
            return $
        }),
        a.d(t, "subscribe", function() {
            return ee
        }),
        a.d(t, "unsubscribe", function() {
            return te
        });
        var Z = "undefined" != typeof window;
        function J() {
            0
        }
        var $ = Z ? p : J
          , ee = Z ? X : J
          , te = Z ? Q : J
    },
    MX0m: function(e, t, a) {
        e.exports = a("3niX")
    },
    MrPd: function(e, t, a) {
        var n = a("hypo")
          , i = a("ljhN")
          , r = Object.prototype.hasOwnProperty;
        e.exports = function(e, t, a) {
            var o = e[t];
            r.call(e, t) && i(o, a) && (void 0 !== a || t in e) || n(e, t, a)
        }
    },
    MvSz: function(e, t, a) {
        var n = a("LXxW")
          , i = a("0ycA")
          , r = Object.prototype.propertyIsEnumerable
          , o = Object.getOwnPropertySymbols
          , c = o ? function(e) {
            return null == e ? [] : (e = Object(e),
            n(o(e), function(t) {
                return r.call(e, t)
            }))
        }
        : i;
        e.exports = c
    },
    NKxu: function(e, t, a) {
        var n = a("lSCD")
          , i = a("E2jh")
          , r = a("GoyQ")
          , o = a("3Fdi")
          , c = /^\[object .+?Constructor\]$/
          , s = Function.prototype
          , l = Object.prototype
          , u = s.toString
          , m = l.hasOwnProperty
          , d = RegExp("^" + u.call(m).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        e.exports = function(e) {
            return !(!r(e) || i(e)) && (n(e) ? d : c).test(o(e))
        }
    },
    NMoU: function(e, t, a) {
        "use strict";
        var n = a("KI45");
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = void 0;
        var i = n(a("q1tI"))
          , r = n(a("17x9"))
          , o = n(a("m/Pd"))
          , c = n(a("DHlL"))
          , s = function(e) {
            var t = e.url
              , a = e.title
              , n = e.images
              , r = void 0 === n ? [] : n
              , s = e.datePublished
              , l = e.dateModified
              , u = void 0 === l ? null : l
              , m = e.authorName
              , d = e.description
              , p = '{\n    "@context": "http://schema.org",\n    "@type": "Blog",\n    "mainEntityOfPage": {\n      "@type": "WebPage",\n      "@id": "'.concat(t, '"\n    },\n    "headline": "').concat(a, '",\n    "image": [\n      ').concat(r.map(function(e) {
                return '"'.concat(e, '"')
            }), '\n     ],\n    "datePublished": "').concat(s, '",\n    "dateModified": "').concat(u || s, '",\n    "author": {\n      "@type": "Person",\n      "name": "').concat(m, '"\n    },\n    "description": "').concat(d, '"\n  }');
            return i.default.createElement(o.default, null, i.default.createElement("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: (0,
                c.default)(p),
                key: "jsonld-blog"
            }))
        };
        s.defaultProps = {
            dateModified: null
        },
        s.propTypes = {
            url: r.default.string.isRequired,
            title: r.default.string.isRequired,
            images: r.default.array.isRequired,
            datePublished: r.default.string.isRequired,
            dateModified: r.default.string,
            authorName: r.default.string.isRequired,
            description: r.default.string.isRequired
        };
        var l = s;
        t.default = l
    },
    Npjl: function(e, t) {
        e.exports = function(e, t) {
            return null == e ? void 0 : e[t]
        }
    },
    NykK: function(e, t, a) {
        var n = a("nmnc")
          , i = a("AP2z")
          , r = a("KfNM")
          , o = "[object Null]"
          , c = "[object Undefined]"
          , s = n ? n.toStringTag : void 0;
        e.exports = function(e) {
            return null == e ? void 0 === e ? c : o : s && s in Object(e) ? i(e) : r(e)
        }
    },
    O0oS: function(e, t, a) {
        var n = a("Cwc5")
          , i = function() {
            try {
                var e = n(Object, "defineProperty");
                return e({}, "", {}),
                e
            } catch (t) {}
        }();
        e.exports = i
    },
    O84j: function(e, t, a) {
        var n = a("HohS").default
          , i = {
            galleryCommentsThreshold: 1,
            articleCommentsThreshold: 1,
            videoCommentsThreshold: 1,
            placeHolders: function(e) {
                var t = n().publicRuntimeConfig.cdnJavascriptHost;
                return "".concat(t).concat({
                    "71x71": "/static/images/placeholders/art/71x71.png",
                    "90x90": "/static/images/placeholders/art/90x90.png",
                    "1170x507": "/static/images/placeholders/art/1170x507.png",
                    "258x258": "/static/images/placeholders/art/258x258.png",
                    "400x400": "/static/images/placeholders/art/390x390.png",
                    "390x390": "/static/images/placeholders/art/390x390.png",
                    "380x214": "/static/images/placeholders/media/380x214.png",
                    "403x210": "/static/images/placeholders/art/403x210.png",
                    "835x437": "/static/images/placeholders/art/835x437.png",
                    "672x351": "/static/images/placeholders/art/672x351.png",
                    "154x154": "/static/images/placeholders/art/154x154.png",
                    "154x81": "/static/images/placeholders/art/154x81.png",
                    "160x120": "/static/images/placeholders/media/MediaGallery/Immagini_della_gallery/160x120.png",
                    "166x93": "/static/images/placeholders/media/166x93.png",
                    "237x125": "/static/images/placeholders/art/237x125.png",
                    "900x675": "/static/images/placeholders/media/MediaGallery/Copertine/900x675.png",
                    "400x300": "/static/images/placeholders/media/MediaGallery/Immagini_della_gallery/400x300.png",
                    "270x420": "/static/images/placeholders/art/270x420.png"
                }[e] || "/static/images/placeholders/media/100x56.png")
            }
        };
        e.exports.config = i,
        e.exports.aliasSectionMapping = function(e) {
            switch (e) {
            case "notizie":
                return "italia";
            case "impresa-e-territori":
                return "economia";
            case "commenti-e-idee":
                return "commenti";
            case "tecnologie":
                return "tecnologia";
            case "finanza-e-mercati":
                return "finanza";
            default:
                return e
            }
        }
    },
    OBhP: function(e, t, a) {
        var n = a("fmRc")
          , i = a("gFfm")
          , r = a("MrPd")
          , o = a("WwFo")
          , c = a("Dw+G")
          , s = a("5Tg0")
          , l = a("Q1l4")
          , u = a("VOtZ")
          , m = a("EEGq")
          , d = a("qZTm")
          , p = a("G6z8")
          , h = a("QqLw")
          , f = a("yHx3")
          , v = a("wrZu")
          , b = a("+iFO")
          , g = a("Z0cm")
          , E = a("DSRE")
          , y = a("zEVN")
          , k = a("GoyQ")
          , N = a("1+5i")
          , w = a("7GkX")
          , O = a("mTTR")
          , S = 1
          , j = 2
          , I = 4
          , x = "[object Arguments]"
          , T = "[object Function]"
          , _ = "[object GeneratorFunction]"
          , M = "[object Object]"
          , L = {};
        L[x] = L["[object Array]"] = L["[object ArrayBuffer]"] = L["[object DataView]"] = L["[object Boolean]"] = L["[object Date]"] = L["[object Float32Array]"] = L["[object Float64Array]"] = L["[object Int8Array]"] = L["[object Int16Array]"] = L["[object Int32Array]"] = L["[object Map]"] = L["[object Number]"] = L[M] = L["[object RegExp]"] = L["[object Set]"] = L["[object String]"] = L["[object Symbol]"] = L["[object Uint8Array]"] = L["[object Uint8ClampedArray]"] = L["[object Uint16Array]"] = L["[object Uint32Array]"] = !0,
        L["[object Error]"] = L[T] = L["[object WeakMap]"] = !1,
        e.exports = function e(t, a, R, C, P, A) {
            var F, z = a & S, V = a & j, D = a & I;
            if (R && (F = P ? R(t, C, P, A) : R(t)),
            void 0 !== F)
                return F;
            if (!k(t))
                return t;
            var q = g(t);
            if (q) {
                if (F = f(t),
                !z)
                    return l(t, F)
            } else {
                var B = h(t)
                  , U = B == T || B == _;
                if (E(t))
                    return s(t, z);
                if (B == M || B == x || U && !P) {
                    if (F = V || U ? {} : b(t),
                    !z)
                        return V ? m(t, c(F, t)) : u(t, o(F, t))
                } else {
                    if (!L[B])
                        return P ? t : {};
                    F = v(t, B, z)
                }
            }
            A || (A = new n);
            var W = A.get(t);
            if (W)
                return W;
            A.set(t, F),
            N(t) ? t.forEach(function(n) {
                F.add(e(n, a, R, n, t, A))
            }) : y(t) && t.forEach(function(n, i) {
                F.set(i, e(n, a, R, i, t, A))
            });
            var G = q ? void 0 : (D ? V ? p : d : V ? O : w)(t);
            return i(G || t, function(n, i) {
                G && (n = t[i = n]),
                r(F, i, e(n, a, R, i, t, A))
            }),
            F
        }
    },
    OG14: function(e, t, a) {
        "use strict";
        var n = a("y3w9")
          , i = a("g6HL")
          , r = a("Xxuz");
        a("IU+Z")("search", 1, function(e, t, a, o) {
            return [function(a) {
                var n = e(this)
                  , i = null == a ? void 0 : a[t];
                return void 0 !== i ? i.call(a, n) : new RegExp(a)[t](String(n))
            }
            , function(e) {
                var t = o(a, e, this);
                if (t.done)
                    return t.value;
                var c = n(e)
                  , s = String(this)
                  , l = c.lastIndex;
                i(l, 0) || (c.lastIndex = 0);
                var u = r(c, s);
                return i(c.lastIndex, l) || (c.lastIndex = l),
                null === u ? -1 : u.index
            }
            ]
        })
    },
    "Of+w": function(e, t, a) {
        var n = a("Cwc5")(a("Kz5y"), "WeakMap");
        e.exports = n
    },
    OgNi: function(e, t, a) {
        "use strict";
        var n = a("KI45");
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = void 0;
        var i = n(a("q1tI"))
          , r = n(a("17x9"))
          , o = n(a("m/Pd"))
          , c = n(a("DHlL"))
          , s = n(a("FmXa"))
          , l = function(e) {
            var t = e.type
              , a = e.id
              , n = e.name
              , r = e.description
              , l = e.url
              , u = e.telephone
              , m = e.address
              , d = e.geo
              , p = e.images
              , h = '{\n    "@context": "http://schema.org",\n    "@type": "'.concat(t, '",\n    "@id": "').concat(a, '",\n    ').concat(r ? '"description": "'.concat(r, '",') : "", "\n    ").concat(l ? '"url": "'.concat(l, '",') : "", "\n    ").concat(u ? '"telephone": "'.concat(u, '",') : "", "\n    ").concat(function(e) {
                return '\n  "address": {\n    "@type": "PostalAddress",\n    "streetAddress": "'.concat(e.streetAddress, '",\n    "addressLocality": "').concat(e.addressLocality, '",\n    ').concat(e.addressRegion ? '"addressRegion": "'.concat(e.addressRegion, '",') : "", '\n    "postalCode": "').concat(e.postalCode, '",\n    "addressCountry": "').concat(e.addressCountry, '"\n  },\n')
            }(m), "\n    ").concat(d ? "".concat(function(e) {
                return '\n  "geo": {\n    "@type": "GeoCoordinates",\n    "latitude": "'.concat(e.latitude, '",\n    "longitude": "').concat(e.longitude, '"\n  },\n')
            }(d)) : "", '\n    "image":').concat((0,
            s.default)(p), ',\n    "name": "').concat(n, '"\n  }');
            return i.default.createElement(o.default, null, i.default.createElement("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: (0,
                c.default)(h),
                key: "jsonld-local-business"
            }))
        };
        l.defaultProps = {
            type: "LocalBusiness",
            description: null,
            url: null,
            telephone: null,
            images: [],
            geo: null
        },
        l.propTypes = {
            type: r.default.string,
            id: r.default.string.isRequired,
            name: r.default.string.isRequired,
            description: r.default.string,
            url: r.default.string,
            telephone: r.default.string,
            address: r.default.shape({
                streetAddress: r.default.string.isRequired,
                addressLocality: r.default.string.isRequired,
                addressRegion: r.default.string,
                postalCode: r.default.string.isRequired,
                addressCountry: r.default.string.isRequired
            }).isRequired,
            geo: r.default.shape({
                latitude: r.default.string.isRequired,
                longitude: r.default.string.isRequired
            }),
            images: r.default.oneOfType([r.default.arrayOf(r.default.string), r.default.string])
        };
        var u = l;
        t.default = u
    },
    PcoO: function(e, t, a) {
        "use strict";
        a.d(t, "a", function() {
            return o
        });
        var n = a("q1tI")
          , i = a.n(n)
          , r = a("4WT4");
        function o() {
            return Object(n.useEffect)(function() {
                Object(r.V)() && Object(r.Fb)(Object(r.W)(), "meteo", function() {
                    new ScriptWeather(".weather_ilmeteo").render()
                })
            }, []),
            Object(r.V)() ? i.a.createElement(i.a.Fragment, null, i.a.createElement("span", {
                className: "weather_ilmeteo hicon-label hicon-label--t"
            })) : null
        }
    },
    PtJn: function(e, t, a) {
        "use strict";
        function n(e) {
            var t = document.createElement("div");
            t.innerHTML = e;
            var a = t.textContent || t.innerText || "";
            return t.remove && t.remove(),
            a
        }
        a.r(t),
        a.d(t, "default", function() {
            return n
        })
    },
    Q0KE: function(e, t, a) {
        "use strict";
        var n = function(e) {
            if (e && e.__esModule)
                return e;
            var t = {};
            if (null != e)
                for (var a in e)
                    Object.hasOwnProperty.call(e, a) && (t[a] = e[a]);
            return t.default = e,
            t
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(a("q1tI"));
        t.LoadableContext = i.createContext(null)
    },
    Q1l4: function(e, t) {
        e.exports = function(e, t) {
            var a = -1
              , n = e.length;
            for (t || (t = Array(n)); ++a < n; )
                t[a] = e[a];
            return t
        }
    },
    QIyF: function(e, t, a) {
        var n = a("Kz5y");
        e.exports = function() {
            return n.Date.now()
        }
    },
    QcOe: function(e, t, a) {
        var n = a("GoyQ")
          , i = a("6sVZ")
          , r = a("7Ix3")
          , o = Object.prototype.hasOwnProperty;
        e.exports = function(e) {
            if (!n(e))
                return r(e);
            var t = i(e)
              , a = [];
            for (var c in e)
                ("constructor" != c || !t && o.call(e, c)) && a.push(c);
            return a
        }
    },
    QeGq: function(e, t, a) {
        "use strict";
        a.d(t, "a", function() {
            return m
        });
        var n = a("doui")
          , i = a("q1tI")
          , r = a.n(i)
          , o = a("KB5c")
          , c = a("4WT4")
          , s = a("tnMW")
          , l = a("InxH")
          , u = a("NZqJ");
        function m(e) {
            var t = e.withComments
              , a = e.saved
              , m = e.commentSavedLabel
              , d = e.article
              , p = e.inList
              , h = e.shareUrl
              , f = e.shareText
              , v = e.type
              , b = e.paywall
              , g = e.notinline
              , E = e.middle
              , y = !0 === a ? "active" : ""
              , k = E ? "ltool ltool--circle ltool--mid ltool--solo" : !0 === t ? "abtn-link" : "ltool"
              , N = g ? "list-item" : !0 === t ? "list-inline-item" : "list-inline-item d-md-none"
              , w = d || {}
              , O = w.url
              , S = w.title
              , j = (S = void 0 === S ? {} : S).leafTitle
              , I = h || Object(c.l)(O)
              , x = f || j
              , T = Object(i.useState)(!1)
              , _ = Object(n.default)(T, 2)
              , M = _[0]
              , L = _[1]
              , R = function() {
                saveBookmark(x || document.title, I || document.location.href, "dotcom")
            }
              , C = function(e) {
                e.preventDefault(),
                b || (Object(o.d)() ? ("undefined" == typeof saveBookmark ? (Object(c.Fb)(Object(c.X)(), "scriptmy24"),
                setTimeout(function() {
                    R()
                }, 1e3)) : R(),
                Object(l.a)({
                    link_id: "strumenti articolo",
                    event_type: "preferiti"
                })) : L(!0))
            }
              , P = function() {
                return r.a.createElement(r.a.Fragment, null, r.a.createElement(s.a, {
                    handler: C
                }, r.a.createElement("a", {
                    className: "".concat(k, " ").concat(y),
                    href: "#"
                }, r.a.createElement("span", {
                    className: "icon icon-save".concat(E ? "" : "-small")
                }), m)), r.a.createElement(u.b, {
                    loginModalVisibility: M,
                    setLoginModalVisibility: L,
                    styleDisplay: !0
                }))
            };
            return "preview" === v ? !1 === p ? P() : r.a.createElement("li", {
                className: N
            }, P()) : r.a.createElement(s.a, {
                handler: C
            }, r.a.createElement("a", {
                className: "ltool ltool--circle ".concat(E ? "ltool--mid ltool--solo" : "ltool--clr"),
                href: "#"
            }, r.a.createElement("span", {
                className: "icon icon-save"
            })))
        }
        m.defaultProps = {
            withComments: !1,
            saved: !1,
            commentSavedLabel: "",
            inList: !0,
            type: "preview",
            notinline: !1,
            middle: !1
        }
    },
    QkVE: function(e, t, a) {
        var n = a("EpBk");
        e.exports = function(e, t) {
            var a = e.__data__;
            return n(t) ? a["string" == typeof t ? "string" : "hash"] : a.map
        }
    },
    QqLw: function(e, t, a) {
        var n = a("tadb")
          , i = a("ebwN")
          , r = a("HOxn")
          , o = a("yGk4")
          , c = a("Of+w")
          , s = a("NykK")
          , l = a("3Fdi")
          , u = l(n)
          , m = l(i)
          , d = l(r)
          , p = l(o)
          , h = l(c)
          , f = s;
        (n && "[object DataView]" != f(new n(new ArrayBuffer(1))) || i && "[object Map]" != f(new i) || r && "[object Promise]" != f(r.resolve()) || o && "[object Set]" != f(new o) || c && "[object WeakMap]" != f(new c)) && (f = function(e) {
            var t = s(e)
              , a = "[object Object]" == t ? e.constructor : void 0
              , n = a ? l(a) : "";
            if (n)
                switch (n) {
                case u:
                    return "[object DataView]";
                case m:
                    return "[object Map]";
                case d:
                    return "[object Promise]";
                case p:
                    return "[object Set]";
                case h:
                    return "[object WeakMap]"
                }
            return t
        }
        ),
        e.exports = f
    },
    Reer: function(e, t, a) {
        "use strict";
        var n = a("rQ8e");
        t.a = n.a
    },
    SevZ: function(e, t, a) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = void 0;
        var n = r(a("9kyW"))
          , i = r(a("bVZc"));
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function o(e, t) {
            for (var a = 0; a < t.length; a++) {
                var n = t[a];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value"in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        var c = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , a = t.styleSheet
                  , n = void 0 === a ? null : a
                  , r = t.optimizeForSpeed
                  , o = void 0 !== r && r
                  , c = t.isBrowser
                  , s = void 0 === c ? "undefined" != typeof window : c;
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                this._sheet = n || new i.default({
                    name: "styled-jsx",
                    optimizeForSpeed: o
                }),
                this._sheet.inject(),
                n && "boolean" == typeof o && (this._sheet.setOptimizeForSpeed(o),
                this._optimizeForSpeed = this._sheet.isOptimizeForSpeed()),
                this._isBrowser = s,
                this._fromServer = void 0,
                this._indices = {},
                this._instancesCounts = {},
                this.computeId = this.createComputeId(),
                this.computeSelector = this.createComputeSelector()
            }
            var t, a, r;
            return t = e,
            (a = [{
                key: "add",
                value: function(e) {
                    var t = this;
                    void 0 === this._optimizeForSpeed && (this._optimizeForSpeed = Array.isArray(e.children),
                    this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),
                    this._optimizeForSpeed = this._sheet.isOptimizeForSpeed()),
                    this._isBrowser && !this._fromServer && (this._fromServer = this.selectFromServer(),
                    this._instancesCounts = Object.keys(this._fromServer).reduce(function(e, t) {
                        return e[t] = 0,
                        e
                    }, {}));
                    var a = this.getIdAndRules(e)
                      , n = a.styleId
                      , i = a.rules;
                    if (n in this._instancesCounts)
                        this._instancesCounts[n] += 1;
                    else {
                        var r = i.map(function(e) {
                            return t._sheet.insertRule(e)
                        }).filter(function(e) {
                            return -1 !== e
                        });
                        this._indices[n] = r,
                        this._instancesCounts[n] = 1
                    }
                }
            }, {
                key: "remove",
                value: function(e) {
                    var t = this
                      , a = this.getIdAndRules(e).styleId;
                    if (function(e, t) {
                        if (!e)
                            throw new Error("StyleSheetRegistry: ".concat(t, "."))
                    }(a in this._instancesCounts, "styleId: `".concat(a, "` not found")),
                    this._instancesCounts[a] -= 1,
                    this._instancesCounts[a] < 1) {
                        var n = this._fromServer && this._fromServer[a];
                        n ? (n.parentNode.removeChild(n),
                        delete this._fromServer[a]) : (this._indices[a].forEach(function(e) {
                            return t._sheet.deleteRule(e)
                        }),
                        delete this._indices[a]),
                        delete this._instancesCounts[a]
                    }
                }
            }, {
                key: "update",
                value: function(e, t) {
                    this.add(t),
                    this.remove(e)
                }
            }, {
                key: "flush",
                value: function() {
                    this._sheet.flush(),
                    this._sheet.inject(),
                    this._fromServer = void 0,
                    this._indices = {},
                    this._instancesCounts = {},
                    this.computeId = this.createComputeId(),
                    this.computeSelector = this.createComputeSelector()
                }
            }, {
                key: "cssRules",
                value: function() {
                    var e = this
                      , t = this._fromServer ? Object.keys(this._fromServer).map(function(t) {
                        return [t, e._fromServer[t]]
                    }) : []
                      , a = this._sheet.cssRules();
                    return t.concat(Object.keys(this._indices).map(function(t) {
                        return [t, e._indices[t].map(function(e) {
                            return a[e].cssText
                        }).join(e._optimizeForSpeed ? "" : "\n")]
                    }).filter(function(e) {
                        return Boolean(e[1])
                    }))
                }
            }, {
                key: "createComputeId",
                value: function() {
                    var e = {};
                    return function(t, a) {
                        if (!a)
                            return "jsx-".concat(t);
                        var i = String(a)
                          , r = t + i;
                        return e[r] || (e[r] = "jsx-".concat((0,
                        n.default)("".concat(t, "-").concat(i)))),
                        e[r]
                    }
                }
            }, {
                key: "createComputeSelector",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : /__jsx-style-dynamic-selector/g
                      , t = {};
                    return function(a, n) {
                        this._isBrowser || (n = n.replace(/\/style/gi, "\\/style"));
                        var i = a + n;
                        return t[i] || (t[i] = n.replace(e, a)),
                        t[i]
                    }
                }
            }, {
                key: "getIdAndRules",
                value: function(e) {
                    var t = this
                      , a = e.children
                      , n = e.dynamic
                      , i = e.id;
                    if (n) {
                        var r = this.computeId(i, n);
                        return {
                            styleId: r,
                            rules: Array.isArray(a) ? a.map(function(e) {
                                return t.computeSelector(r, e)
                            }) : [this.computeSelector(r, a)]
                        }
                    }
                    return {
                        styleId: this.computeId(i),
                        rules: Array.isArray(a) ? a : [a]
                    }
                }
            }, {
                key: "selectFromServer",
                value: function() {
                    return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e, t) {
                        return e[t.id.slice(2)] = t,
                        e
                    }, {})
                }
            }]) && o(t.prototype, a),
            r && o(t, r),
            e
        }();
        t.default = c
    },
    SfRM: function(e, t, a) {
        var n = a("YESw");
        e.exports = function() {
            this.__data__ = n ? n(null) : {},
            this.size = 0
        }
    },
    SuNC: function(e, t, a) {
        "use strict";
        a.d(t, "a", function() {
            return c
        });
        var n = a("q1tI")
          , i = a.n(n)
          , r = a("2L0F")
          , o = a("0Ops");
        function c(e) {
            var t = e.href
              , a = e.children
              , c = Object(n.useContext)(r.a).appData.routeData.routeName
              , s = -1 === t.indexOf("?s=") ? "".concat(("homepage" === c ? "?s=hpl" : "section" === c && "?s=sl") || "") : "";
            return i.a.createElement(o.Link, {
                href: "".concat(t).concat(s)
            }, a)
        }
        c.defaultProps = {
            href: "#"
        }
    },
    TO8r: function(e, t) {
        var a = /\s/;
        e.exports = function(e) {
            for (var t = e.length; t-- && a.test(e.charAt(t)); )
                ;
            return t
        }
    },
    TtSx: function(e, t, a) {
        "use strict";
        var n = a("KI45");
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = void 0;
        var i = n(a("q1tI"))
          , r = n(a("17x9"))
          , o = n(a("m/Pd"))
          , c = n(a("DHlL"))
          , s = function(e) {
            var t = e.type
              , a = e.name
              , n = e.url
              , r = e.sameAs
              , s = void 0 === r ? [] : r
              , l = '{\n    "@context": "http://schema.org",\n    "@type": "'.concat(t, '",\n    "name": "').concat(a, '",\n    "url": "').concat(n, '",\n    "sameAs": [\n      ').concat(s.map(function(e) {
                return '"'.concat(e, '"')
            }), "\n     ]\n  }");
            return i.default.createElement(o.default, null, i.default.createElement("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: (0,
                c.default)(l),
                key: "jsonld-social"
            }))
        };
        s.propTypes = {
            type: r.default.string.isRequired,
            name: r.default.string.isRequired,
            url: r.default.string.isRequired,
            sameAs: r.default.array.isRequired
        };
        var l = s;
        t.default = l
    },
    UHJ7: function(e, t, a) {
        "use strict";
        a.d(t, "a", function() {
            return l
        });
        var n = a("q1tI")
          , i = a.n(n)
          , r = a("0Ops")
          , o = a("smdI")
          , c = a("4WT4")
          , s = a("2L0F");
        function l() {
            var e = Object(n.useContext)(s.a).appData.isWebview;
            return i.a.createElement("div", {
                className: "main-footer inverted-color"
            }, i.a.createElement("div", {
                className: "ftop"
            }, i.a.createElement("div", {
                className: "container"
            }, i.a.createElement("div", {
                className: "ftop-wrapper"
            }, i.a.createElement(r.Link, {
                route: "homepage"
            }, i.a.createElement("a", {
                className: "ftop-logo"
            }, i.a.createElement("img", {
                src: "".concat(Object(c.B)(), "/img/ilsole24ore-white-2021.svg"),
                alt: "Il Sole 24 Ore"
            }))), i.a.createElement("ul", {
                className: "list-inline list-inline--tools ftop-social"
            }, i.a.createElement("li", {
                className: "list-inline-item"
            }, i.a.createElement("a", {
                className: "ltool ltool--outline",
                href: "https://it-it.facebook.com/ilsole24ore/",
                target: "blank"
            }, i.a.createElement("span", {
                className: "icon icon-facebook"
            }))), i.a.createElement("li", {
                className: "list-inline-item"
            }, i.a.createElement("a", {
                className: "ltool ltool--outline",
                href: "https://twitter.com/sole24ore",
                target: "blank"
            }, i.a.createElement("span", {
                className: "icon icon-twitter"
            }))), i.a.createElement("li", {
                className: "list-inline-item"
            }, i.a.createElement("a", {
                className: "ltool ltool--outline",
                href: "https://it.linkedin.com/company/il-sole-24-ore",
                target: "blank"
            }, i.a.createElement("span", {
                className: "icon icon-linkedin"
            }))), i.a.createElement("li", {
                className: "list-inline-item"
            }, i.a.createElement("a", {
                className: "ltool ltool--outline",
                href: "https://www.instagram.com/ilsole_24ore/?hl=it",
                target: "blank"
            }, i.a.createElement("span", {
                className: "icon icon-instagram"
            }))), i.a.createElement("li", {
                className: "list-inline-item"
            }, i.a.createElement("a", {
                className: "ltool ltool--outline",
                href: "https://flipboard.com/@ilsole24ore/il-sole-24-ore-filkcj20z",
                target: "blank"
            }, i.a.createElement("span", {
                className: "icon icon-flipboard"
            }))), i.a.createElement("li", {
                className: "list-inline-item"
            }, i.a.createElement(r.Link, {
                key: "rss-footer",
                params: {
                    href: "/rss"
                },
                href: "/rss"
            }, i.a.createElement("a", {
                className: "ltool ltool--outline",
                href: "".concat(Object(c.N)(), "/rss")
            }, i.a.createElement("span", {
                className: "icon icon-rss"
            }))))), i.a.createElement("a", {
                className: "ftop-scrolltop abs-mr",
                href: "#"
            }, "Torna all’inizio", i.a.createElement("span", {
                className: "icon icon-arrow-up d-none d-lg-block"
            }), i.a.createElement("span", {
                className: "icon icon-arrow-up-small d-lg-none"
            }))))), i.a.createElement("div", {
                className: "container"
            }, i.a.createElement("div", {
                className: "fnav d-none d-lg-block"
            }, i.a.createElement("div", {
                className: "row row--lined"
            }, i.a.createElement("div", {
                className: "col fnav-col"
            }, i.a.createElement("h4", {
                className: "fnav-title"
            }, "Il gruppo"), i.a.createElement("ul", {
                className: "fnav-list"
            }, i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "http://www.gruppo24ore.ilsole24ore.com/"
            }, "Gruppo 24 ORE")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "http://www.radio24.ilsole24ore.com/"
            }, "Radio24")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "http://www.radiocor.ilsole24ore.com/"
            }, "Radiocor")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://24oreprofessionale.ilsole24ore.com/"
            }, "24 ORE Professionale")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "http://www.24orecultura.com/"
            }, "24 ORE Cultura")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://24oresystem.ilsole24ore.com/it/digital/"
            }, "24 ORE System"))), i.a.createElement("ul", {
                className: "fnav-list fnav-last"
            }, i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/redazione/index.shtml"
            }, "La redazione")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.gruppo24ore.ilsole24ore.com/it-it/institutional/contatti/pages/pag-1/"
            }, "Contatti")))), i.a.createElement("div", {
                className: "col-3 fnav-col"
            }, i.a.createElement("h4", {
                className: "fnav-title"
            }, "Il sito"), i.a.createElement("div", {
                className: "row"
            }, i.a.createElement("div", {
                className: "col"
            }, i.a.createElement("ul", {
                className: "fnav-list"
            }, i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/italia"
            }, "Italia")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/mondo"
            }, "Mondo")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/economia"
            }, "Economia")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/finanza"
            }, "Finanza")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://mercati.ilsole24ore.com"
            }, "Mercati")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/risparmio"
            }, "Risparmio")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/norme-e-tributi"
            }, "Norme&Tributi")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/commenti"
            }, "Commenti")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/management"
            }, "Management")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/salute"
            }, "Salute")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/htsi"
            }, "HTSI")))), i.a.createElement("div", {
                className: "col"
            }, i.a.createElement("ul", {
                className: "fnav-list"
            }, i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/tecnologia"
            }, "Tecnologia")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/cultura"
            }, "Cultura")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/motori"
            }, "Motori")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/moda"
            }, "Moda")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/casa"
            }, "Real Estate")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/viaggi"
            }, "Viaggi")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/food"
            }, "Food")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/sport24"
            }, "Sport")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/arteconomy"
            }, "Arteconomy")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/sostenibilita"
            }, "Sostenibilità")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/sez/scuola"
            }, "Scuola"))))), i.a.createElement("ul", {
                className: "fnav-list fnav-last"
            }, i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "http://newsletters.ilsole24ore.com/"
            }, "Newsletter")))), i.a.createElement("div", {
                className: "col fnav-col"
            }, i.a.createElement("h4", {
                className: "fnav-title"
            }, "Quotidiani digitali"), i.a.createElement("ul", {
                className: "fnav-list"
            }, i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://ntplusfisco.ilsole24ore.com/"
            }, "Fisco")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://ntplusdiritto.ilsole24ore.com/"
            }, "Diritto")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://ntpluslavoro.ilsole24ore.com/"
            }, "Lavoro")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://ntplusentilocaliedilizia.ilsole24ore.com/"
            }, "Enti locali & Edilizia")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://ntpluscondominio.ilsole24ore.com/"
            }, "Condominio")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "http://www.sanita24.ilsole24ore.com/"
            }, "Sanità24")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "http://www.agrisole.ilsole24ore.com/"
            }, "Agrisole")))), i.a.createElement("div", {
                className: "col fnav-col"
            }, i.a.createElement("h4", {
                className: "fnav-title"
            }, "Link utili"), i.a.createElement("ul", {
                className: "fnav-list"
            }, i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.shopping24.ilsole24ore.com/"
            }, "Shopping24")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "http://www.espertorisponde.ilsole24ore.com/"
            }, "L’Esperto risponde")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.ilsole24ore.com/strumenti"
            }, "Strumenti")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "http://www.ticket24ore.it/"
            }, "Ticket 24 ORE")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://st.ilsole24ore.com/blog.shtml"
            }, "Blog")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://meteo24.ilsole24ore.com/"
            }, "Meteo")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.agenziailviaggio.it/ilsole24ore-experience/"
            }, "24Ore Experience")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://codicisconto.ilsole24ore.com"
            }, "Codici sconto"))), i.a.createElement("ul", {
                className: "fnav-list"
            }, i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "http://www.astetribunali24.ilsole24ore.com/"
            }, "Pubblicità Tribunali e P.A.")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.immobiliare.it/"
            }, "Case e Appartamenti"))), i.a.createElement("ul", {
                className: "fnav-list fnav-last"
            }, i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link fnav-link--icon",
                href: "https://linee-guida-editoriali.ilsole24ore.com/"
            }, i.a.createElement("span", {
                className: "icon icon-trust-small"
            }), "Trust Project")))), i.a.createElement("div", {
                className: "col fnav-col"
            }, i.a.createElement("h4", {
                className: "fnav-title"
            }, "Abbonamenti"), i.a.createElement("ul", {
                className: "fnav-list"
            }, i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://abbonamenti.ilsole24ore.com/landing"
            }, "Abbonamenti al quotidiano")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "https://www.shopping24.ilsole24ore.com/sh4/catalog/rinnovi/periodici.jsp"
            }, "Abbonamenti da rinnovare")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "btn btn--white",
                href: e && e.ios ? o.b : o.c
            }, "Abbonati"))), i.a.createElement("div", {
                className: "fnav-last"
            }, i.a.createElement("h4", {
                className: "fnav-title"
            }, "Archivio"), i.a.createElement("ul", {
                className: "fnav-list"
            }, i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "http://www.archiviostorico.ilsole24ore.com/"
            }, "Archivio del quotidiano")), i.a.createElement("li", {
                className: "fnav-list-item"
            }, i.a.createElement("a", {
                className: "fnav-link",
                href: "http://www.archiviodomenica.ilsole24ore.com/"
            }, "Archivio Domenica"))))))), i.a.createElement("div", {
                className: "fbtm"
            }, i.a.createElement("p", {
                className: "fbtm-text fbtm-text--sep d-lg-none"
            }, "App disponibile su:", i.a.createElement("br", null), i.a.createElement("a", {
                className: "fbtm-applink",
                href: "#"
            }, "Google Play"), i.a.createElement("span", {
                className: "fbtm-line"
            }, " "), i.a.createElement("a", {
                className: "fbtm-applink",
                href: "#"
            }, "App store")), i.a.createElement("p", {
                className: "fbtm-text"
            }, "P.I. 00777910159", i.a.createElement("span", {
                className: "d-print-none fbtm-line"
            }, " "), i.a.createElement("a", {
                className: "d-print-none",
                href: "https://www.gruppo24ore.ilsole24ore.com/it-it/institutional/dati-societari"
            }, "Dati societari"), i.a.createElement("span", {
                className: "d-md-none"
            }), i.a.createElement("span", {
                className: "fbtm-line d-none d-md-inline-block"
            }, " "), "© Copyright Il Sole 24 Ore Tutti i diritti riservati", i.a.createElement("br", {
                className: "d-lg-none"
            }), i.a.createElement("span", {
                className: "d-print-none"
            }, i.a.createElement("span", {
                className: "fbtm-line d-none d-lg-inline-block"
            }, " "), "Per la tua pubblicità sul sito:  ", i.a.createElement("a", {
                href: "http://websystem.ilsole24ore.com/"
            }, "24 Ore System"), i.a.createElement("span", {
                className: "d-sm-block d-md-none d-lg-block"
            }), i.a.createElement("span", {
                className: "fbtm-line d-none d-md-inline-block d-lg-none"
            }, " "), i.a.createElement("a", {
                href: "https://du.ilsole24ore.com/utenti/privacyfiles/informativa_cookies.html"
            }, "Informativa sui cookie"), i.a.createElement("span", {
                className: "fbtm-line"
            }, " "), i.a.createElement("a", {
                href: "https://linee-guida-editoriali.ilsole24ore.com/privacy"
            }, "Privacy policy"))), i.a.createElement("div", {
                className: "d-none d-print-block fbtm-logo-print"
            }, i.a.createElement("img", {
                src: "".concat(Object(c.B)(), "/static/img/ilsole24ore.svg"),
                alt: "Il Sole 24 Ore"
            })))))
        }
    },
    "UNi/": function(e, t) {
        e.exports = function(e, t) {
            for (var a = -1, n = Array(e); ++a < e; )
                n[a] = t(a);
            return n
        }
    },
    UgXd: function(e, t, a) {
        "use strict";
        var n = a("KI45")
          , i = n(a("pLtp"))
          , r = n(a("UXZV"))
          , o = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var c = o(a("q1tI"))
          , s = o(a("0KLy"))
          , l = "undefined" == typeof window;
        function u(e, t) {
            return delete t.webpack,
            delete t.modules,
            l ? function() {
                return c.default.createElement(t.loading, {
                    error: null,
                    isLoading: !0,
                    pastDelay: !1,
                    timedOut: !1
                })
            }
            : e(t)
        }
        function m() {
            return c.default.createElement("p", null, "loading...")
        }
        t.noSSR = u,
        t.default = function(e, t) {
            var a = s.default
              , n = {
                loading: function(e) {
                    return e.error,
                    e.isLoading,
                    e.pastDelay ? c.default.createElement(m, null) : null
                }
            };
            if ("function" == typeof e.then ? n.loader = function() {
                return e
            }
            : "function" == typeof e ? n.loader = e : "object" == typeof e && (n = (0,
            r.default)({}, n, e)),
            n = (0,
            r.default)({}, n, t),
            e.render && (n.render = function(t, a) {
                return e.render(a, t)
            }
            ),
            e.modules) {
                a = s.default.Map;
                var o = {}
                  , l = e.modules();
                (0,
                i.default)(l).forEach(function(e) {
                    var t = l[e];
                    "function" != typeof t.then ? o[e] = t : o[e] = function() {
                        return t.then(function(e) {
                            return e.default || e
                        })
                    }
                }),
                n.loader = o
            }
            if (n.loadableGenerated && delete (n = (0,
            r.default)({}, n, n.loadableGenerated)).loadableGenerated,
            "boolean" == typeof n.ssr) {
                if (!n.ssr)
                    return delete n.ssr,
                    u(a, n);
                delete n.ssr
            }
            return a(n)
        }
    },
    V6Ve: function(e, t, a) {
        var n = a("kekF")(Object.keys, Object);
        e.exports = n
    },
    VOtZ: function(e, t, a) {
        var n = a("juv8")
          , i = a("MvSz");
        e.exports = function(e, t) {
            return n(e, i(e), t)
        }
    },
    VaNO: function(e, t) {
        e.exports = function(e) {
            return this.__data__.has(e)
        }
    },
    WFqU: function(e, t, a) {
        (function(t) {
            var a = "object" == typeof t && t && t.Object === Object && t;
            e.exports = a
        }
        ).call(this, a("yLpj"))
    },
    Wr5T: function(e, t) {
        !function() {
            "use strict";
            if ("object" == typeof window)
                if ("IntersectionObserver"in window && "IntersectionObserverEntry"in window && "intersectionRatio"in window.IntersectionObserverEntry.prototype)
                    "isIntersecting"in window.IntersectionObserverEntry.prototype || Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
                        get: function() {
                            return this.intersectionRatio > 0
                        }
                    });
                else {
                    var e = window.document
                      , t = [];
                    n.prototype.THROTTLE_TIMEOUT = 100,
                    n.prototype.POLL_INTERVAL = null,
                    n.prototype.USE_MUTATION_OBSERVER = !0,
                    n.prototype.observe = function(e) {
                        if (!this._observationTargets.some(function(t) {
                            return t.element == e
                        })) {
                            if (!e || 1 != e.nodeType)
                                throw new Error("target must be an Element");
                            this._registerInstance(),
                            this._observationTargets.push({
                                element: e,
                                entry: null
                            }),
                            this._monitorIntersections(),
                            this._checkForIntersections()
                        }
                    }
                    ,
                    n.prototype.unobserve = function(e) {
                        this._observationTargets = this._observationTargets.filter(function(t) {
                            return t.element != e
                        }),
                        this._observationTargets.length || (this._unmonitorIntersections(),
                        this._unregisterInstance())
                    }
                    ,
                    n.prototype.disconnect = function() {
                        this._observationTargets = [],
                        this._unmonitorIntersections(),
                        this._unregisterInstance()
                    }
                    ,
                    n.prototype.takeRecords = function() {
                        var e = this._queuedEntries.slice();
                        return this._queuedEntries = [],
                        e
                    }
                    ,
                    n.prototype._initThresholds = function(e) {
                        var t = e || [0];
                        return Array.isArray(t) || (t = [t]),
                        t.sort().filter(function(e, t, a) {
                            if ("number" != typeof e || isNaN(e) || e < 0 || e > 1)
                                throw new Error("threshold must be a number between 0 and 1 inclusively");
                            return e !== a[t - 1]
                        })
                    }
                    ,
                    n.prototype._parseRootMargin = function(e) {
                        var t = (e || "0px").split(/\s+/).map(function(e) {
                            var t = /^(-?\d*\.?\d+)(px|%)$/.exec(e);
                            if (!t)
                                throw new Error("rootMargin must be specified in pixels or percent");
                            return {
                                value: parseFloat(t[1]),
                                unit: t[2]
                            }
                        });
                        return t[1] = t[1] || t[0],
                        t[2] = t[2] || t[0],
                        t[3] = t[3] || t[1],
                        t
                    }
                    ,
                    n.prototype._monitorIntersections = function() {
                        this._monitoringIntersections || (this._monitoringIntersections = !0,
                        this.POLL_INTERVAL ? this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL) : (i(window, "resize", this._checkForIntersections, !0),
                        i(e, "scroll", this._checkForIntersections, !0),
                        this.USE_MUTATION_OBSERVER && "MutationObserver"in window && (this._domObserver = new MutationObserver(this._checkForIntersections),
                        this._domObserver.observe(e, {
                            attributes: !0,
                            childList: !0,
                            characterData: !0,
                            subtree: !0
                        }))))
                    }
                    ,
                    n.prototype._unmonitorIntersections = function() {
                        this._monitoringIntersections && (this._monitoringIntersections = !1,
                        clearInterval(this._monitoringInterval),
                        this._monitoringInterval = null,
                        r(window, "resize", this._checkForIntersections, !0),
                        r(e, "scroll", this._checkForIntersections, !0),
                        this._domObserver && (this._domObserver.disconnect(),
                        this._domObserver = null))
                    }
                    ,
                    n.prototype._checkForIntersections = function() {
                        var e = this._rootIsInDom()
                          , t = e ? this._getRootRect() : {
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            width: 0,
                            height: 0
                        };
                        this._observationTargets.forEach(function(n) {
                            var i = n.element
                              , r = o(i)
                              , c = this._rootContainsTarget(i)
                              , s = n.entry
                              , l = e && c && this._computeTargetAndRootIntersection(i, t)
                              , u = n.entry = new a({
                                time: window.performance && performance.now && performance.now(),
                                target: i,
                                boundingClientRect: r,
                                rootBounds: t,
                                intersectionRect: l
                            });
                            s ? e && c ? this._hasCrossedThreshold(s, u) && this._queuedEntries.push(u) : s && s.isIntersecting && this._queuedEntries.push(u) : this._queuedEntries.push(u)
                        }, this),
                        this._queuedEntries.length && this._callback(this.takeRecords(), this)
                    }
                    ,
                    n.prototype._computeTargetAndRootIntersection = function(t, a) {
                        if ("none" != window.getComputedStyle(t).display) {
                            for (var n, i, r, c, l, u, m, d, p = o(t), h = s(t), f = !1; !f; ) {
                                var v = null
                                  , b = 1 == h.nodeType ? window.getComputedStyle(h) : {};
                                if ("none" == b.display)
                                    return;
                                if (h == this.root || h == e ? (f = !0,
                                v = a) : h != e.body && h != e.documentElement && "visible" != b.overflow && (v = o(h)),
                                v && (n = v,
                                i = p,
                                r = void 0,
                                c = void 0,
                                l = void 0,
                                u = void 0,
                                m = void 0,
                                d = void 0,
                                r = Math.max(n.top, i.top),
                                c = Math.min(n.bottom, i.bottom),
                                l = Math.max(n.left, i.left),
                                u = Math.min(n.right, i.right),
                                d = c - r,
                                !(p = (m = u - l) >= 0 && d >= 0 && {
                                    top: r,
                                    bottom: c,
                                    left: l,
                                    right: u,
                                    width: m,
                                    height: d
                                })))
                                    break;
                                h = s(h)
                            }
                            return p
                        }
                    }
                    ,
                    n.prototype._getRootRect = function() {
                        var t;
                        if (this.root)
                            t = o(this.root);
                        else {
                            var a = e.documentElement
                              , n = e.body;
                            t = {
                                top: 0,
                                left: 0,
                                right: a.clientWidth || n.clientWidth,
                                width: a.clientWidth || n.clientWidth,
                                bottom: a.clientHeight || n.clientHeight,
                                height: a.clientHeight || n.clientHeight
                            }
                        }
                        return this._expandRectByRootMargin(t)
                    }
                    ,
                    n.prototype._expandRectByRootMargin = function(e) {
                        var t = this._rootMarginValues.map(function(t, a) {
                            return "px" == t.unit ? t.value : t.value * (a % 2 ? e.width : e.height) / 100
                        })
                          , a = {
                            top: e.top - t[0],
                            right: e.right + t[1],
                            bottom: e.bottom + t[2],
                            left: e.left - t[3]
                        };
                        return a.width = a.right - a.left,
                        a.height = a.bottom - a.top,
                        a
                    }
                    ,
                    n.prototype._hasCrossedThreshold = function(e, t) {
                        var a = e && e.isIntersecting ? e.intersectionRatio || 0 : -1
                          , n = t.isIntersecting ? t.intersectionRatio || 0 : -1;
                        if (a !== n)
                            for (var i = 0; i < this.thresholds.length; i++) {
                                var r = this.thresholds[i];
                                if (r == a || r == n || r < a != r < n)
                                    return !0
                            }
                    }
                    ,
                    n.prototype._rootIsInDom = function() {
                        return !this.root || c(e, this.root)
                    }
                    ,
                    n.prototype._rootContainsTarget = function(t) {
                        return c(this.root || e, t)
                    }
                    ,
                    n.prototype._registerInstance = function() {
                        t.indexOf(this) < 0 && t.push(this)
                    }
                    ,
                    n.prototype._unregisterInstance = function() {
                        var e = t.indexOf(this);
                        -1 != e && t.splice(e, 1)
                    }
                    ,
                    window.IntersectionObserver = n,
                    window.IntersectionObserverEntry = a
                }
            function a(e) {
                this.time = e.time,
                this.target = e.target,
                this.rootBounds = e.rootBounds,
                this.boundingClientRect = e.boundingClientRect,
                this.intersectionRect = e.intersectionRect || {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: 0,
                    height: 0
                },
                this.isIntersecting = !!e.intersectionRect;
                var t = this.boundingClientRect
                  , a = t.width * t.height
                  , n = this.intersectionRect
                  , i = n.width * n.height;
                this.intersectionRatio = a ? Number((i / a).toFixed(4)) : this.isIntersecting ? 1 : 0
            }
            function n(e, t) {
                var a, n, i, r = t || {};
                if ("function" != typeof e)
                    throw new Error("callback must be a function");
                if (r.root && 1 != r.root.nodeType)
                    throw new Error("root must be an Element");
                this._checkForIntersections = (a = this._checkForIntersections.bind(this),
                n = this.THROTTLE_TIMEOUT,
                i = null,
                function() {
                    i || (i = setTimeout(function() {
                        a(),
                        i = null
                    }, n))
                }
                ),
                this._callback = e,
                this._observationTargets = [],
                this._queuedEntries = [],
                this._rootMarginValues = this._parseRootMargin(r.rootMargin),
                this.thresholds = this._initThresholds(r.threshold),
                this.root = r.root || null,
                this.rootMargin = this._rootMarginValues.map(function(e) {
                    return e.value + e.unit
                }).join(" ")
            }
            function i(e, t, a, n) {
                "function" == typeof e.addEventListener ? e.addEventListener(t, a, n || !1) : "function" == typeof e.attachEvent && e.attachEvent("on" + t, a)
            }
            function r(e, t, a, n) {
                "function" == typeof e.removeEventListener ? e.removeEventListener(t, a, n || !1) : "function" == typeof e.detatchEvent && e.detatchEvent("on" + t, a)
            }
            function o(e) {
                var t;
                try {
                    t = e.getBoundingClientRect()
                } catch (a) {}
                return t ? (t.width && t.height || (t = {
                    top: t.top,
                    right: t.right,
                    bottom: t.bottom,
                    left: t.left,
                    width: t.right - t.left,
                    height: t.bottom - t.top
                }),
                t) : {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: 0,
                    height: 0
                }
            }
            function c(e, t) {
                for (var a = t; a; ) {
                    if (a == e)
                        return !0;
                    a = s(a)
                }
                return !1
            }
            function s(e) {
                var t = e.parentNode;
                return t && 11 == t.nodeType && t.host ? t.host : t && t.assignedSlot ? t.assignedSlot.parentNode : t
            }
        }()
    },
    WwFo: function(e, t, a) {
        var n = a("juv8")
          , i = a("7GkX");
        e.exports = function(e, t) {
            return e && n(t, i(t), e)
        }
    },
    Wziy: function(e, t, a) {
        "use strict";
        var n = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(a("q1tI"))
          , r = a("imt6");
        function o() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
              , t = e.enabled
              , a = void 0 !== t && t
              , n = e.hybrid
              , i = void 0 !== n && n
              , r = e.hasQuery;
            return a && (!i || i && (void 0 !== r && r))
        }
        t.isAmp = o,
        t.useAmp = function() {
            return o(i.default.useContext(r.AmpModeContext))
        }
        ,
        t.withAmp = function(e) {
            var t = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).hybrid
              , a = void 0 !== t && t;
            function n() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , n = i.default.useContext(r.AmpModeContext);
                return n.enabled = !0,
                n.hybrid = a,
                i.default.createElement(e, t)
            }
            return n.__nextAmpOnly = !a,
            n.getInitialProps = e.getInitialProps,
            n
        }
    },
    XYm9: function(e, t, a) {
        var n = a("+K+b");
        e.exports = function(e, t) {
            var a = t ? n(e.buffer) : e.buffer;
            return new e.constructor(a,e.byteOffset,e.byteLength)
        }
    },
    Xi7e: function(e, t, a) {
        var n = a("KMkd")
          , i = a("adU4")
          , r = a("tMB7")
          , o = a("+6XX")
          , c = a("Z8oC");
        function s(e) {
            var t = -1
              , a = null == e ? 0 : e.length;
            for (this.clear(); ++t < a; ) {
                var n = e[t];
                this.set(n[0], n[1])
            }
        }
        s.prototype.clear = n,
        s.prototype.delete = i,
        s.prototype.get = r,
        s.prototype.has = o,
        s.prototype.set = c,
        e.exports = s
    },
    YESw: function(e, t, a) {
        var n = a("Cwc5")(Object, "create");
        e.exports = n
    },
    YNMu: function(e, t, a) {
        "use strict";
        a.r(t);
        var n = a("ln6h")
          , i = a.n(n)
          , r = a("qNsG")
          , o = (a("ls82"),
        a("O40h"))
          , c = (a("Z2Ku"),
        a("L9s1"),
        a("kOwS"))
          , s = a("zrwo")
          , l = (a("9VmF"),
        a("pLtp"))
          , u = a.n(l)
          , m = (a("KKXr"),
        a("doui"))
          , d = a("0iUn")
          , p = a("sLSF")
          , h = a("MI3g")
          , f = a("a7VT")
          , v = a("Tit0")
          , b = a("q1tI")
          , g = a.n(b)
          , E = a("8Bbg")
          , y = a.n(E)
          , k = a("m/Pd")
          , N = a.n(k)
          , w = (a("91GP"),
        a("Wr5T"),
        a("NyWP"))
          , O = a("erEE")
          , S = a.n(O)
          , j = a("4WT4")
          , I = a("6Vy/")
          , x = function(e) {
            function t(e) {
                var a;
                return Object(d.default)(this, t),
                (a = Object(h.default)(this, Object(f.default)(t).call(this, e))).state = {
                    hasError: !1
                },
                a
            }
            return Object(v.default)(t, e),
            Object(p.default)(t, [{
                key: "componentDidCatch",
                value: function(e, t) {
                    console.warn(e, t)
                }
            }, {
                key: "render",
                value: function() {
                    return this.state.hasError ? g.a.createElement("div", null, g.a.createElement("h1", null, "Something went wrong.")) : this.props.children
                }
            }], [{
                key: "getDerivedStateFromError",
                value: function(e) {
                    return {
                        hasError: !0,
                        error: e
                    }
                }
            }]),
            t
        }(g.a.Component)
          , T = a("aPx5")
          , _ = a("4aqO")
          , M = a("tnMW")
          , L = a("rO+U")
          , R = a("2L0F")
          , C = a("InxH");
        function P() {
            var e = Object(b.useContext)(R.a).appData.routeData.asPath
              , t = Object(b.useState)(!1)
              , a = Object(m.default)(t, 2)
              , n = a[0]
              , i = a[1]
              , r = function(e) {
                e.preventDefault(),
                i(!n),
                Object(C.a)({
                    link_id: "login",
                    event_type: "login"
                }),
                Object(j.Ib)()
            };
            return g.a.createElement(g.a.Fragment, null, g.a.createElement("div", {
                className: "podcast-head"
            }, g.a.createElement("div", {
                className: "container"
            }, g.a.createElement("div", {
                className: "podcast-head-wrapper"
            }, g.a.createElement("ul", {
                className: "list-inline"
            }, g.a.createElement("li", {
                className: "list-inline-item"
            }, g.a.createElement(L.a, {
                route: "/appodcast"
            }, g.a.createElement("a", {
                className: "ibtn podcast-head-logo"
            }, g.a.createElement("span", {
                className: "icon icon-24"
            })))), g.a.createElement("li", {
                className: "list-inline-item"
            }, g.a.createElement(L.a, {
                route: "/appodcast"
            }, g.a.createElement("a", {
                className: "podcast-head-link"
            }, "Podcast")))), g.a.createElement(T.a, {
                key: "user-logged",
                currentUrl: e,
                headerPodcast: !0,
                NotLoggedChild: function() {
                    return g.a.createElement(M.a, {
                        handler: r
                    }, g.a.createElement("button", {
                        type: "button",
                        key: "user-not-logged",
                        className: "ibtn"
                    }, g.a.createElement("span", {
                        className: "icon icon-user"
                    })))
                }
            })))), g.a.createElement(_.a, {
                key: "login-modal",
                loginModalVisibility: n,
                setLoginModalVisibility: i
            }))
        }
        var A = a("t8Fj")
          , F = a.n(A)
          , z = a("cw6n")
          , V = a("4Pxe")
          , D = a("ecV5")
          , q = a("/Bct")
          , B = (a("f3/d"),
        a("tUrg"),
        a("dfwq"))
          , U = a("jCVj")
          , W = function(e, t) {
            var a = "-" === e ? "red" : "green";
            return "SPREAD_ITL_DEM.MTS" === t && (a = "+" === e ? "red" : "green"),
            a
        };
        function G(e) {
            var t = e.device
              , a = (e.isFinanzaSection,
            Object(b.useState)(!1))
              , n = Object(m.default)(a, 2)
              , i = n[0]
              , r = n[1]
              , o = Object(b.useState)([])
              , c = Object(m.default)(o, 2)
              , s = c[0]
              , l = c[1]
              , u = function(e) {
                var t = e.list;
                return t || 0 !== t.length ? t.reduce(function(e, t) {
                    var a = t.QUOTE
                      , n = t.F10061
                      , i = t.segno
                      , r = t.F10015
                      , o = t.F20002
                      , c = t.F10011
                      , s = t.Open;
                    return [].concat(Object(B.default)(e), [{
                        name: c,
                        value: "EURUS.FX" === a ? r.substring(0, r.length - 2) : r,
                        perc: "".concat(i).concat(n.substring(0, 4)),
                        time: o,
                        segno: i,
                        isMarketOpen: s,
                        ticker: a,
                        link: "".concat(Object(j.vb)(), "/FinanzaMercati/api/TickerInfo/Redirect/").concat(a)
                    }])
                }, []) : []
            };
            return Object(b.useEffect)(function() {
                var e = Object(j.M)().map(function(e) {
                    return "tickerName=".concat(e)
                }).join("&")
                  , t = function() {
                    var e = JSON.parse('{"ITEMS":"SPMib;SPREAD_ITL_DEM.MTS;EURUS.FX;BRNST.IPE;GLDEUR;","loggedIn":false,"list":[{"QUOTE":"SPMib","F10011":"FTSE MIB","F10061":"-","segno":"+","F10015":"-","F20002":"-","F20721":"Milano","Open":true},{"QUOTE":"SPREAD_ITL_DEM.MTS","F10011":"Spread BTP-Bund 10Y","F10061":"-","segno":"+","F10015":"-","F20002":"-","F20721":"MTS","Open":false},{"QUOTE":"EURUS.FX","F10011":"EUR/USD","F10061":"-","segno":"+","F10015":"-","F20002":"-","F20721":"Forex","Open":false},{"QUOTE":"BRNST.IPE","F10011":"Brent","F10061":"-","segno":"-","F10015":"-","F20002":"-","F20721":"Ice","Open":false},{"QUOTE":"GLDEUR","F10011":"Oro Spot Eur","F10061":"-","segno":"+","F10015":"-","F20002":"14:47","Open":false}]}');
                    l(u(e))
                };
                Object(j.Hb)(5e3, fetch("".concat(Object(j.vb)(), "/FinanzaMercati/api/TickerInfo/GetItemJSON?").concat(e)).then(function(e) {
                    return e.json()
                }).then(function(e) {
                    e && l(u(e))
                }).catch(function(e) {
                    t()
                })).catch(function() {
                    t()
                })
            }, []),
            g.a.createElement("section", {
                className: "hgr hmarket bg-mtick inverted-color order-0 order-md-1"
            }, g.a.createElement("div", {
                className: "container"
            }, g.a.createElement("div", {
                className: "hmarket-expandible ".concat(!0 === i ? "is-expanded" : "")
            }, g.a.createElement("div", {
                className: "hgr-wrapper"
            }, g.a.createElement("div", {
                className: "hnav-scroll"
            }, g.a.createElement("ul", {
                className: "hnav hnav--small hnav--lined hnav--scroll hnav--fixw"
            }, s.length > 0 ? s.map(function(e, a) {
                return g.a.createElement(g.a.Fragment, {
                    key: e.graph
                }, g.a.createElement(K, {
                    item: e,
                    isLast: a === s.length - 1,
                    device: t,
                    key: e.graph
                }))
            }) : g.a.createElement(g.a.Fragment, null, g.a.createElement(H, null), g.a.createElement(H, null), g.a.createElement(H, null), g.a.createElement(H, null), g.a.createElement(H, null), g.a.createElement(H, null))))), g.a.createElement("a", {
                type: "button",
                className: "hmarket-expand d-md-none",
                onClick: function(e) {
                    e.preventDefault(),
                    r(!i)
                }
            }, g.a.createElement("span", {
                className: "icon icon-angle-down icon--status"
            })))))
        }
        var H = function() {
            return g.a.createElement("li", {
                className: "hnav-item is-loading "
            }, g.a.createElement("a", {
                className: "hmarket-index",
                href: "#"
            }, g.a.createElement("span", {
                className: "hmarket-name"
            }), g.a.createElement("span", {
                className: "hmarket-value"
            }), g.a.createElement("span", {
                className: "hmarket-var green"
            }, g.a.createElement("span", {
                className: "icon "
            })), g.a.createElement("span", {
                className: "icon icon-linktopage hmarket-goto"
            })))
        }
          , K = function(e) {
            var t = e.item
              , a = e.isLast
              , n = (e.device,
            W(t.segno, t.ticker))
              , i = "EURUS.FX" !== t.ticker && "SPREAD_ITL_DEM.MTS" !== t.ticker;
            return g.a.createElement("li", {
                className: "hnav-item ".concat(a ? "d-lg-none d-xl-inline-block" : "")
            }, g.a.createElement("a", {
                href: t.link,
                className: "hmarket-index"
            }, g.a.createElement(U.a, {
                html: "".concat(t.name, "&nbsp")
            }, g.a.createElement("span", {
                className: "hmarket-name"
            })), g.a.createElement(U.a, {
                html: "".concat(t.value, " ")
            }, g.a.createElement("span", {
                className: "hmarket-value"
            })), g.a.createElement("span", {
                className: "hmarket-var ".concat(n)
            }, g.a.createElement(U.a, {
                html: "".concat(t.perc, "% ")
            }, g.a.createElement("span", null)), g.a.createElement("span", {
                className: "icon icon-caret-".concat("SPREAD_ITL_DEM.MTS" !== t.ticker ? "green" === n ? "up" : "down" : "green" === n ? "down" : "up")
            })), g.a.createElement("span", {
                className: "icon icon-linktopage hmarket-goto"
            })), g.a.createElement("div", {
                className: "hmarket-chart-wrapper d-md-none"
            }, g.a.createElement("div", {
                className: "hmarket-chart"
            }, g.a.createElement("span", {
                className: "hmarket-status "
            }, g.a.createElement("span", {
                className: "hmarket-time"
            }, t.time), i && (t.isMarketOpen ? "• Mercato aperto" : "• Mercato chiuso")), g.a.createElement("figure", {
                className: "sbox-datachart-img"
            }, g.a.createElement("img", {
                className: "img-fluid",
                src: "".concat(Object(j.vb)(), "/FinanzaMercati/api/StaticChartEngine/").concat(t.ticker, "/Ticker2022"),
                alt: ""
            })))))
        };
        G.defaultProps = {
            isFinanzaSection: !1
        };
        var X = a("Cs30")
          , Y = a("0Ops")
          , Q = a("H5ZR")
          , Z = a("hWJk");
        function J() {
            var e = Object(b.useState)(0)
              , t = Object(m.default)(e, 2)
              , a = t[0]
              , n = t[1]
              , i = function() {
                var e, t, a = (e = window.scrollY,
                (t = document.getElementById("progress-anchor")) && t.clientHeight ? Math.floor(e / t.clientHeight * 100) : 0);
                n(a)
            };
            return Object(b.useEffect)(function() {
                return i(),
                window.addEventListener("scroll", i, {
                    passive: !0
                }),
                document.body.classList.add("is-article"),
                function() {
                    window.removeEventListener("scroll", i, {
                        passive: !0
                    }),
                    document.body.classList.remove("is-article")
                }
            }, []),
            g.a.createElement("div", {
                className: " progressbar-wrapper"
            }, g.a.createElement("div", {
                className: "progressbar",
                style: {
                    height: "4px",
                    backgroundColor: "#003c7f",
                    width: "".concat(a, "%"),
                    padding: "0px",
                    top: 0,
                    transition: "width .4s ease-out",
                    zIndex: 10
                }
            }))
        }
        var $ = a("K91E");
        function ee(e) {
            var t = e.routeName
              , a = e.setSearchModalVisibility
              , n = e.searchModalVisibility
              , i = e.sectionItem
              , r = e.subsectionItem
              , o = e.articleTitle
              , c = e.hotTopics
              , l = e.maxVisibleHotTopics
              , u = e.sectionsList
              , d = e.maxVisibleSections
              , p = e.clickSetShowMenu
              , h = e.setLoginModalVisibility
              , f = e.loginModalVisibility
              , v = e.article
              , E = e.videoLastBySection
              , y = e.podcastLast
              , k = (e.isWebview,
            e.isSuperdossierArticle)
              , N = e.dossier
              , w = !(c && 0 !== c.length)
              , O = Object(b.useState)(!1)
              , S = Object(m.default)(O, 2)
              , I = (S[0],
            S[1]);
            function x() {
                var e = document.getElementById("header")
                  , t = document.querySelectorAll("#progress-anchor").length > 0 ? document.querySelector("#progress-anchor").offsetTop : e.clientHeight;
                e && (Object(j.w)() > t ? document.body.classList.add("is-scrolled") : document.body.classList.remove("is-scrolled"))
            }
            return Object(b.useEffect)(function() {
                return x(),
                document.addEventListener("scroll", x, {
                    passive: !0
                }),
                document.addEventListener("resize", x, {
                    passive: !0
                }),
                function() {
                    document.removeEventListener("scroll", x, {
                        passive: !0
                    }),
                    document.removeEventListener("resize", x, {
                        passive: !0
                    })
                }
            }, []),
            g.a.createElement(F.a, {
                enabled: !0,
                top: -87,
                onStateChange: function(e) {
                    e.status === F.a.STATUS_FIXED && I(!0),
                    e.status === F.a.STATUS_ORIGINAL && I(!1)
                },
                enableTransforms: !1,
                bottomBoundary: "body",
                innerZ: 1020
            }, g.a.createElement("div", {
                className: "sticky-header",
                id: "sticky"
            }, g.a.createElement("div", {
                className: k ? "hgr hgr--up bg-white" : "htop pt-0"
            }, g.a.createElement("div", {
                className: "container"
            }, "article" === t ? g.a.createElement("div", {
                className: "htop-title d-md-none"
            }, g.a.createElement("div", {
                className: "habs-left"
            }, g.a.createElement(Z.b, {
                clickSetShowMenu: p,
                bigIcons: !0
            }), g.a.createElement(Y.Link, {
                route: "homepage"
            }, g.a.createElement("a", {
                className: "hlink hlink--icon-big hlink--icon-big24"
            }, g.a.createElement("span", {
                className: "icon icon--big icon-24"
            })))), g.a.createElement("div", {
                className: "habs-right"
            }, g.a.createElement(z.a, {
                key: "tools-in-sticky",
                share: !0,
                shareAndAction: !0
            }))) : null, g.a.createElement("div", {
                className: "htop-wrap d-none d-md-block"
            }, "homepage" === t ? g.a.createElement(X.b, {
                key: "navigation-home",
                navIcon: !0,
                navLogo: !0,
                setSearchModalVisibility: a,
                searchModalVisibility: n,
                items: u,
                maxVisibleItems: d,
                clickSetShowMenu: p
            }) : null, "section" === t ? g.a.createElement(X.b, {
                key: "navigation-section",
                navIcon: !0,
                navLogo: !0,
                sectionItem: i,
                setSearchModalVisibility: a,
                searchModalVisibility: n,
                items: u,
                maxVisibleItems: d,
                clickSetShowMenu: p
            }) : null, "subsection" === t ? g.a.createElement(X.b, {
                key: "navigation-subsection",
                navIcon: !0,
                navLogo: !0,
                articleTitle: o,
                sectionItem: i,
                subsectionItem: r,
                setSearchModalVisibility: a,
                searchModalVisibility: n,
                items: u,
                maxVisibleItems: d,
                clickSetShowMenu: p
            }) : null, "article" === t ? g.a.createElement(X.b, {
                key: "navigation-article",
                navIcon: !0,
                navLogo: !0,
                sectionItem: i,
                articleTitle: o,
                setSearchModalVisibility: a,
                searchModalVisibility: n,
                items: u,
                maxVisibleItems: u.length,
                sticky: !0,
                clickSetShowMenu: p,
                isSuperdossierArticle: k,
                dossier: N
            }) : null, g.a.createElement("div", {
                className: "habs-right"
            }, "article" === t ? g.a.createElement(z.a, {
                share: !0,
                shareAndAction: !0,
                hasMoreActions: !0
            }) : g.a.createElement(z.a, {
                social: !0
            }))))), "article" === t ? g.a.createElement(g.a.Fragment, null, N && k ? g.a.createElement("div", {
                className: "hgr hgr--light bg-white order-1"
            }, g.a.createElement("div", {
                className: "container"
            }, g.a.createElement("div", {
                className: "hgr-wrapper hgr-wrapper--center"
            }, g.a.createElement("div", {
                className: "hnav-scroll"
            }, g.a.createElement(X.b, {
                key: "navigation-article-second",
                title: N.title.leafTitle,
                items: Object($.b)(Object(s.a)({}, N, {
                    intro: {
                        title: N.title || ""
                    }
                }), Object(s.a)({}, N, {
                    intro: {
                        title: N.title || ""
                    }
                }), !0),
                maxVisibleItems: l,
                topic: !0,
                isSuperdossierArticle: !0,
                dossier: N
            }))))) : g.a.createElement(Q.a, {
                articolo: v,
                videoLastBySection: E,
                podcastLast: y,
                isSticky: !0
            }), g.a.createElement(J, null)) : g.a.createElement("div", {
                className: "hbtm d-none d-md-block"
            }, g.a.createElement("div", {
                className: "container"
            }, g.a.createElement("div", {
                className: "hbtm-wrap"
            }, g.a.createElement(X.b, {
                key: "navigation-article-second",
                title: w ? "" : "Temi Caldi",
                items: c,
                maxVisibleItems: l,
                topic: !0
            }), g.a.createElement("div", {
                className: "halign-right"
            }, g.a.createElement(z.a, {
                key: "tools-in-container",
                headerUserTools: !0,
                subscribe: !0,
                setLoginModalVisibility: h,
                loginModalVisibility: f
            })))))))
        }
        var te = a("Reer");
        function ae() {
            var e = Object(j.C)();
            return g.a.createElement(te.a, {
                hntplus: !0,
                norel: !0
            }, g.a.createElement("div", {
                className: "container"
            }, g.a.createElement("ul", {
                className: "list-inline"
            }, g.a.createElement("li", {
                className: "list-inline-item"
            }, g.a.createElement("span", {
                className: "hntplus-title"
            }, "Per i professionisti")), g.a.createElement("li", {
                className: "list-inline-item list-inline-item--brd"
            }, g.a.createElement("a", {
                className: "hntplus-link",
                href: Object(j.bb)()
            }, g.a.createElement("img", {
                src: "".concat(e, "/img/2020/nt-plus/nt-plus-fisco--simple.svg"),
                alt: "Norme & Tributi Plus Fisco"
            }))), g.a.createElement("li", {
                className: "list-inline-item list-inline-item"
            }, g.a.createElement("a", {
                className: "hntplus-link",
                href: Object(j.Z)()
            }, g.a.createElement("img", {
                src: "".concat(e, "/img/2020/nt-plus/nt-plus-diritto--simple.svg"),
                alt: "Norme & Tributi Diritto"
            }))), g.a.createElement("li", {
                className: "list-inline-item"
            }, g.a.createElement("a", {
                className: "hntplus-link",
                href: Object(j.cb)()
            }, g.a.createElement("img", {
                src: "".concat(e, "/img/2020/nt-plus/nt-plus-lavoro--simple.svg"),
                alt: "Norme & Tributi Lavoro"
            }))), g.a.createElement("li", {
                className: "list-inline-item"
            }, g.a.createElement("a", {
                className: "hntplus-link",
                href: Object(j.Y)()
            }, g.a.createElement("img", {
                src: "".concat(e, "/img/2020/nt-plus/nt-plus-condominio--simple.svg"),
                alt: "Norme & Tributi Condominio"
            }))), g.a.createElement("li", {
                className: "list-inline-item list-inline-item"
            }, g.a.createElement("a", {
                className: "hntplus-link",
                href: Object(j.ab)()
            }, g.a.createElement("img", {
                src: "".concat(e, "/img/2020/nt-plus/nt-plus-enti-locali-pa--simple.svg"),
                alt: "Norme & Tributi Plus Enti Locali & PA"
            }))))))
        }
        var ne = a("5tas")
          , ie = a("smdI")
          , re = Object(j.B)()
          , oe = Object(j.Q)()
          , ce = Object(j.R)();
        var se = a("8H2i")
          , le = function() {
            return g.a.createElement("ul", {
                className: "hnav hnav--lined hnav--lsep"
            }, g.a.createElement(se.a, {
                header2021: !0
            }), g.a.createElement("li", {
                className: "hnav-item"
            }, g.a.createElement("a", {
                className: "hlink hlink--logo",
                href: "http://lab24.ilsole24ore.com/"
            }, g.a.createElement("img", {
                className: "himg himg--t",
                src: "/img/lab24.svg",
                alt: "Lab24"
            }))), g.a.createElement("li", {
                className: "hnav-item"
            }, g.a.createElement("a", {
                className: "hlink hlink--logo",
                href: "http://www.radio24.ilsole24ore.com/"
            }, g.a.createElement("img", {
                className: "himg himg--b",
                src: "/static/img/radio24.png",
                alt: "Radio 24"
            }))), g.a.createElement("li", {
                className: "hnav-item"
            }, g.a.createElement("a", {
                className: "hlink hlink--logo",
                href: "http://24o.it/Daw9sn"
            }, g.a.createElement("img", {
                className: "himg himg--m",
                src: "/static/img/24ore-professionale.svg",
                alt: "24Ore Professionale"
            }))))
        }
          , ue = Object(j.O)();
        function me(e) {
            e.routeName;
            var t = e.asPath
              , a = e.setSearchModalVisibility
              , n = e.searchModalVisibility
              , i = (e.sectionItem,
            e.subsectionItem,
            e.articleTitle)
              , r = e.hotTopics
              , o = (e.maxVisibleHotTopics,
            e.sectionsList)
              , c = e.maxVisibleSections
              , s = e.clickSetShowMenu
              , l = e.setLoginModalVisibility
              , u = (e.loginModalVisibility,
            e.article,
            e.videoLastBySection,
            e.podcastLast,
            e.isWebview)
              , d = e.slimVersion
              , p = e.isSuperDossier
              , h = !(r && 0 !== r.length)
              , f = Object(b.useState)(!1)
              , v = Object(m.default)(f, 2)
              , E = (v[0],
            v[1]);
            function y() {
                var e = document.getElementById("header")
                  , t = document.querySelectorAll("#progress-anchor").length > 0 ? document.querySelector("#progress-anchor").offsetTop : e.clientHeight;
                e && (Object(j.w)() >= t ? document.body.classList.add("is-scrolled") : document.body.classList.remove("is-scrolled"))
            }
            return Object(b.useEffect)(function() {
                return y(),
                document.addEventListener("scroll", y, {
                    passive: !0
                }),
                document.addEventListener("resize", y, {
                    passive: !0
                }),
                function() {
                    document.removeEventListener("scroll", y, {
                        passive: !0
                    }),
                    document.removeEventListener("resize", y, {
                        passive: !0
                    })
                }
            }, []),
            g.a.createElement(F.a, {
                enabled: !0,
                top: -87,
                onStateChange: function(e) {
                    e.status === F.a.STATUS_FIXED && E(!0),
                    e.status === F.a.STATUS_ORIGINAL && E(!1)
                },
                enableTransforms: !1,
                bottomBoundary: "body",
                innerZ: 1020
            }, g.a.createElement("div", {
                className: "sticky-header",
                id: "sticky"
            }, g.a.createElement("div", {
                className: "hgr hgr--up"
            }, g.a.createElement("div", {
                className: "container"
            }, g.a.createElement("div", {
                className: "hgr-wrapper"
            }, g.a.createElement(X.a, {
                key: "navigation-home",
                navIcon: !0,
                setSearchModalVisibility: a,
                searchModalVisibility: n,
                items: o,
                maxVisibleItems: c,
                clickSetShowMenu: s,
                slimVersion: d,
                hideItems: d,
                sticky: !0
            }), g.a.createElement("ul", {
                className: "hnav hnav--right"
            }, g.a.createElement("li", {
                className: "hnav-item"
            }, u && u.ios && g.a.createElement("a", {
                className: "hlink hlink--sub",
                href: ie.b
            }, g.a.createElement("strong", null, "Abbonati")) || g.a.createElement("a", {
                className: "hlink hlink--sub",
                href: ue
            }, g.a.createElement("strong", null, "Abbonati"))), g.a.createElement("li", {
                className: "hnav-item d-none d-md-inline-block"
            }, g.a.createElement("a", {
                className: "hicon-link",
                href: "https://www.quotidiano.ilsole24ore.com",
                target: "_blank",
                rel: "noopener noreferrer"
            }, g.a.createElement("span", {
                className: "icon icon-doc-my24"
            }))), g.a.createElement("li", {
                className: "hnav-item hnav-item--no-brd-md"
            }, g.a.createElement(T.a, {
                key: "user-logged",
                currentUrl: t,
                NotLoggedChild: function() {
                    return g.a.createElement(M.a, {
                        handler: l,
                        skipBorderReset: d,
                        skipOutlineReset: d
                    }, g.a.createElement("a", {
                        className: "hicon-link"
                    }, g.a.createElement("span", {
                        className: "icon icon-user"
                    })))
                }
            })))))), g.a.createElement("div", {
                className: "hgr hgr--light order-1"
            }, g.a.createElement("div", {
                className: "container"
            }, g.a.createElement("div", {
                className: "hgr-wrapper ".concat(d ? "hgr-wrapper--center" : "")
            }, g.a.createElement("div", {
                className: "hnav-scroll"
            }, g.a.createElement(X.a, {
                key: "navigation-hbtm",
                scroll: !0,
                title: d && i || (h ? "" : "In evidenza"),
                topic: !0,
                items: p ? r.slice(1) : r,
                maxVisibleItems: 5,
                slimVersion: d,
                isSuperDossier: p
            })), !d && g.a.createElement(le, null))))))
        }
        me.defaultProps = {
            isSuperDossier: !1
        };
        var de = function(e) {
            var t = e.hotTopics;
            e.sticky;
            return g.a.createElement("div", {
                className: "hgr hgr--light order-1"
            }, g.a.createElement("div", {
                className: "container"
            }, g.a.createElement("div", {
                className: "hgr-wrapper hgr-wrapper--center"
            }, g.a.createElement("div", {
                className: "hnav-scroll"
            }, g.a.createElement(X.a, {
                key: "navigation-hbtm",
                scroll: !0,
                topic: !0,
                items: t.slice(1),
                maxVisibleItems: 55,
                slimVersion: !0,
                isSuperDossier: !0,
                title: t[0].label
            })))))
        }
          , pe = Object(j.O)();
        function he(e) {
            e.hasNav;
            var t = e.sectionItem
              , a = void 0 === t ? {
                section: "",
                sectionId: ""
            } : t
              , n = e.subsectionItem
              , i = void 0 === n ? {
                subsection: "",
                subsectionId: ""
            } : n
              , r = e.sezioni
              , o = e.articleTitle
              , c = e.maxVisibleItems
              , s = void 0 === c ? 6 : c
              , l = e.maxVisibleItemsSticky
              , u = void 0 === l ? 7 : l
              , d = e.hamburger
              , p = e.hotTopics
              , h = e.device
              , f = e.eco
              , v = e.article
              , E = e.videoLastBySection
              , y = e.podcastLast
              , k = e.disableMeteo
              , N = !(p && 0 !== p.length)
              , w = Object(b.useContext)(R.a).appData
              , O = Object(b.useState)(!1)
              , S = Object(m.default)(O, 2)
              , I = S[0]
              , x = S[1]
              , L = Object(b.useState)(!1)
              , P = Object(m.default)(L, 2)
              , A = P[0]
              , z = P[1]
              , V = Object(b.useState)(!1)
              , B = Object(m.default)(V, 2)
              , U = B[0]
              , W = B[1]
              , H = Object(b.useState)(!1)
              , K = Object(m.default)(H, 2)
              , Q = (K[0],
            K[1],
            Object(b.useState)(f))
              , Z = Object(m.default)(Q, 2)
              , J = Z[0]
              , $ = Z[1]
              , ee = "mobile" === h;
            Object(b.useEffect)(function() {
                J && $(!1),
                Object(j.w)() > 0 && document.body.classList.add("is-scrolled")
            }, [J]);
            var te = function(e) {
                e.preventDefault(),
                x(!I),
                Object(C.a)({
                    link_id: "strumenti navigazione",
                    event_type: "pulsante naviga"
                })
            }
              , ae = function(e) {
                e.preventDefault(),
                W(!U),
                Object(C.a)({
                    link_id: "login",
                    event_type: "login"
                }),
                Object(j.Ib)()
            }
              , re = w.routeData
              , oe = w.isWebview
              , ce = w.cssBreakpoint
              , se = re.routeName
              , ue = re.query
              , he = re.asPath
              , fe = "homepage" === se || ue && "finanza" === ue.sectionId && ("section" === se || "subsection" === se);
            ["radiocor"].includes(se) && (se = "homepage");
            var ve = ["homesuperdossierlist", "homesuperdossierlistsection"].includes(se)
              , be = function(e) {
                var t = e.sticky
                  , a = void 0 !== t && t;
                return g.a.createElement("div", {
                    className: "main-header",
                    id: "header"
                }, g.a.createElement("div", {
                    className: "d-none d-print-block container"
                }, g.a.createElement("div", {
                    className: "htop-logo-print"
                }, g.a.createElement("img", {
                    src: "/static/img/ilsole24ore-o-2021.svg",
                    alt: "Il Sole 24 Ore"
                }))), g.a.createElement("div", {
                    className: "hgr hgr--up ".concat(ve ? "" : "order-1")
                }, g.a.createElement("div", {
                    className: "container"
                }, g.a.createElement("div", {
                    className: "hgr-wrapper"
                }, g.a.createElement(X.a, {
                    setSearchModalVisibility: z,
                    searchModalVisibility: A,
                    clickSetShowMenu: te,
                    navIcon: !0,
                    disableMeteo: k,
                    slimVersion: ve,
                    isSuperDossier: ve
                }), g.a.createElement("ul", {
                    className: "hnav hnav--right ".concat(ve ? "" : "hnav--lined")
                }, g.a.createElement("li", {
                    className: "hnav-item"
                }, oe && oe.ios && g.a.createElement("a", {
                    className: "hlink hlink--sub",
                    href: ie.b
                }, g.a.createElement("strong", null, "Abbonati")) || g.a.createElement("a", {
                    className: "hlink hlink--sub",
                    href: pe
                }, g.a.createElement("strong", null, "Abbonati"))), g.a.createElement("li", {
                    className: "hnav-item d-none d-md-inline-block"
                }, g.a.createElement("a", {
                    className: "hicon-link",
                    href: "https://www.quotidiano.ilsole24ore.com",
                    target: "_blank",
                    rel: "noopener noreferrer"
                }, !ve && g.a.createElement("span", {
                    className: "hicon-label"
                }, "Sfoglia il giornale"), g.a.createElement("span", {
                    className: "icon icon-doc-my24"
                }))), g.a.createElement("li", {
                    className: "hnav-item hnav-item--no-brd-md"
                }, g.a.createElement(T.a, {
                    key: "user-logged",
                    currentUrl: he,
                    NotLoggedChild: function() {
                        return g.a.createElement(M.a, {
                            handler: ae,
                            skipBorderReset: ve,
                            skipOutlineReset: ve
                        }, g.a.createElement("a", {
                            className: "hicon-link"
                        }, !ve && g.a.createElement("span", {
                            className: "hicon-label"
                        }, "Accedi"), g.a.createElement("span", {
                            className: "icon icon-user"
                        })))
                    }
                })))))), fe && g.a.createElement(G, {
                    device: h
                }), ve ? null : g.a.createElement(g.a.Fragment, null, g.a.createElement("div", {
                    className: "hmn order-1 d-none d-md-block"
                }, g.a.createElement("div", {
                    className: "container"
                }, g.a.createElement("div", {
                    className: "hmn-wrapper"
                }, g.a.createElement("div", {
                    className: "hmn-nav"
                }, g.a.createElement(Y.Link, {
                    route: "/"
                }, g.a.createElement("a", {
                    className: "hsole hsole"
                }, g.a.createElement("img", {
                    src: "/static/img/ilsole24ore-o-2021.svg",
                    alt: "Il Sole 24 Ore"
                }))), g.a.createElement(X.a, {
                    key: "navigation-section-homepage",
                    items: r,
                    maxVisibleItems: s
                })), ee ? null : g.a.createElement(ne.a, {
                    classes: "hmnc d-none d-md-block",
                    slot: "Manchette_1"
                })))), g.a.createElement("div", {
                    className: "hgr hgr--light hgr--big d-none d-md-block order-1"
                }, g.a.createElement("div", {
                    className: "container"
                }, g.a.createElement("div", {
                    className: "hgr-wrapper"
                }, g.a.createElement("div", {
                    className: "hnav-scroll"
                }, g.a.createElement(X.a, {
                    key: "navigation-hbtm",
                    scroll: !0,
                    title: N ? "" : "In evidenza",
                    topic: !0,
                    items: p,
                    maxVisibleItems: 5
                })), g.a.createElement(le, null))))), ve && ee && g.a.createElement(de, {
                    hotTopics: p,
                    sticky: a
                }))
            };
            return g.a.createElement(g.a.Fragment, null, J ? null : g.a.createElement(q.a, {
                key: "side-menu",
                showMenu: I,
                clickSideMenu: function() {
                    return x(!I)
                },
                listMenu: d,
                device: h
            }), ee && "sm" === ce && g.a.createElement(F.a, {
                key: "sticky-header",
                enabled: !0,
                top: 0,
                onStateChange: function(e) {
                    e.status === F.a.STATUS_FIXED && document.body.classList.add("is-scrolled"),
                    e.status === F.a.STATUS_ORIGINAL && document.body.classList.remove("is-scrolled")
                },
                enableTransforms: !1,
                bottomBoundary: "body",
                innerZ: 1020
            }, g.a.createElement("div", {
                id: "sticky-header-mobile"
            }, g.a.createElement(be, null))) || g.a.createElement(g.a.Fragment, null, g.a.createElement(be, null), g.a.createElement(me, {
                routeName: se,
                asPath: he,
                setSearchModalVisibility: z,
                searchModalVisibility: A,
                sectionItem: a,
                subsectionItem: i,
                articleTitle: o,
                clickSetShowMenu: te,
                hotTopics: p,
                maxVisibleHotTopics: 5,
                sectionsList: r,
                maxVisibleSections: "md" === ce ? 6 : u,
                setLoginModalVisibility: W,
                loginModalVisibility: U,
                article: v,
                videoLastBySection: E,
                podcastLast: y,
                isWebview: oe,
                slimVersion: ve,
                isSuperDossier: ve
            })), g.a.createElement(D.c, {
                key: "search-modal",
                searchModalVisibility: A,
                setSearchModalVisibility: z
            }), g.a.createElement(_.a, {
                key: "login-modal",
                loginModalVisibility: U,
                setLoginModalVisibility: W
            }))
        }
        var fe = a("PcoO")
          , ve = function(e) {
            var t = e.sectionItem
              , a = t.section
              , n = t.sectionId
              , i = e.eco
              , r = e.hamburger
              , o = e.disableMeteo
              , c = Object(b.useContext)(R.a).appData
              , s = c.routeData
              , l = c.device
              , u = (s.routeName,
            s.query,
            s.asPath)
              , d = Object(b.useState)(!1)
              , p = Object(m.default)(d, 2)
              , h = p[0]
              , f = p[1]
              , v = Object(b.useState)(!1)
              , E = Object(m.default)(v, 2)
              , y = E[0]
              , k = E[1]
              , N = Object(b.useState)("")
              , w = Object(m.default)(N, 2)
              , O = w[0]
              , S = w[1]
              , I = Object(b.useState)(i)
              , x = Object(m.default)(I, 2)
              , L = x[0]
              , P = x[1]
              , A = Object(b.useState)(!1)
              , F = Object(m.default)(A, 2)
              , z = F[0]
              , B = F[1];
            Object(b.useEffect)(function() {
                L && P(!1)
            }, [L]),
            Object(b.useEffect)(function() {
                "mobile" === l && document.body.classList.add("fsticky");
                var e = function(e) {
                    Object(j.w)() > document.getElementsByClassName("main-header")[0].clientHeight ? document.body.classList.add("is-scrolled") : document.body.classList.remove("is-scrolled")
                };
                return document.addEventListener("scroll", e, {
                    passive: !0
                }),
                document.addEventListener("resize", e, {
                    passive: !0
                }),
                e(),
                function() {
                    document.body.classList.remove("fsticky"),
                    document.removeEventListener("scroll", e, {
                        passive: !0
                    }),
                    document.removeEventListener("resize", e, {
                        passive: !0
                    })
                }
            });
            var U = function(e) {
                document.body.classList.contains("is-sidemenu-in") ? document.body.classList.remove("is-sidemenu-in") : document.body.classList.add("is-sidemenu-in"),
                B(!z),
                Object(C.a)({
                    link_id: "strumenti navigazione",
                    event_type: "pulsante naviga"
                })
            }
              , W = function(e) {
                e.preventDefault(),
                f(!h),
                Object(C.a)({
                    link_id: "login",
                    event_type: "login"
                }),
                Object(j.Ib)()
            };
            return g.a.createElement(g.a.Fragment, null, L ? null : g.a.createElement(q.a, {
                key: "side-menu",
                showMenu: z,
                clickSideMenu: function() {
                    return B(!z)
                },
                listMenu: r,
                device: l
            }), g.a.createElement("div", {
                className: "main-header"
            }, g.a.createElement("div", {
                className: "d-none d-print-block container"
            }, g.a.createElement("div", {
                className: "htop-logo-print"
            }, g.a.createElement("img", {
                src: "/static/img/ilsole24ore-o.svg",
                alt: "Il Sole 24 Ore"
            })), g.a.createElement("span", {
                className: "htop-section"
            }, a)), g.a.createElement("div", {
                className: "hgr hgr--up order-1"
            }, g.a.createElement("div", {
                className: "container"
            }, g.a.createElement("div", {
                className: "hgr-wrapper"
            }, g.a.createElement("ul", {
                className: "hnav hnav--lined  "
            }, g.a.createElement("li", {
                className: "hnav-item"
            }, g.a.createElement("button", {
                type: "button",
                className: "hicon-link",
                onClick: U
            }, g.a.createElement("span", {
                className: "hicon-label"
            }, "Naviga"), g.a.createElement("span", {
                className: "icon icon-menu"
            }))), g.a.createElement("li", {
                className: "hnav-item hnav-item--no-brd-md d-none d-md-inline-block"
            }, g.a.createElement("button", {
                type: "button",
                className: "hicon-link",
                onClick: function() {
                    k(!0)
                }
            }, g.a.createElement("span", {
                className: "hicon-label"
            }, "Ricerca"), g.a.createElement("span", {
                className: "icon icon-search"
            }))), g.a.createElement("li", {
                className: "hnav-item hnav-item--no-brd d-md-none"
            }, g.a.createElement("a", {
                className: "hlink hlink--icon hlink--icon24",
                href: Object(j.N)()
            }, g.a.createElement("span", {
                className: "icon icon-24"
            }))), g.a.createElement("li", {
                className: "hnav-item hnav-item--no-brd d-md-none"
            }, g.a.createElement(Y.Link, {
                route: Object(Y.getRouteToPath)("section", {
                    sectionId: n
                })
            }, g.a.createElement("a", {
                className: "hlink hlink--title"
            }, "Finanza"))), g.a.createElement("li", {
                className: "hnav-item d-none d-md-inline-block"
            }, g.a.createElement("span", {
                className: "hicon-link widget--meteo",
                href: "#"
            }, !o && g.a.createElement(fe.a, null), g.a.createElement("span", {
                className: "hicon-label hicon-label--t"
            }, g.a.createElement(V.a, {
                plain: !0,
                format: "D MMMM YYYY",
                value: (new Date).toISOString()
            }))))), g.a.createElement("ul", {
                className: "hnav hnav--right hnav--lined"
            }, g.a.createElement("li", {
                className: "hnav-item"
            }, g.a.createElement("a", {
                className: "hlink hlink--sub",
                href: Object(j.P)()
            }, "Abbonati")), g.a.createElement("li", {
                className: "hnav-item d-none d-md-inline-block"
            }, g.a.createElement("a", {
                className: "hicon-link",
                href: "https://www.quotidiano.ilsole24ore.com/"
            }, g.a.createElement("span", {
                className: "hicon-label"
            }, "Sfoglia il giornale"), g.a.createElement("span", {
                className: "icon icon-doc-my24"
            }))), g.a.createElement("li", {
                className: "hnav-item hnav-item--no-brd-md"
            }, g.a.createElement(T.a, {
                key: "user-logged",
                currentUrl: u,
                NotLoggedChild: function() {
                    return g.a.createElement(M.a, {
                        handler: W
                    }, g.a.createElement("a", {
                        className: "hicon-link"
                    }, g.a.createElement("span", {
                        className: "hicon-label"
                    }, "Accedi"), g.a.createElement("span", {
                        className: "icon icon-user"
                    })))
                }
            })))))), g.a.createElement(G, {
                device: l,
                isFinanzaSection: !0
            }), g.a.createElement("div", {
                className: "hmn order-1 d-none d-md-block hgr--dark inverted-color"
            }, g.a.createElement("div", {
                className: "container"
            }, g.a.createElement("a", {
                className: "hsole hsole--small",
                href: "/"
            }, g.a.createElement("img", {
                src: "/static/img/ilsole24ore-white-2021.svg",
                alt: "Il Sole 24 Ore"
            }))), g.a.createElement("div", {
                className: "container"
            }, g.a.createElement("div", {
                className: "hmn-wrapper hmn-wrapper--bottom"
            }, g.a.createElement("div", {
                className: "hmn-nav"
            }, g.a.createElement(Y.Link, {
                route: Object(Y.getRouteToPath)("section", {
                    sectionId: n
                })
            }, g.a.createElement("a", {
                className: "hshome hshome--serif"
            }, "Finanza")), g.a.createElement("ul", {
                className: "hnav hnav--sep  d-none d-md-block"
            }, g.a.createElement("li", {
                className: "hnav-item"
            }, g.a.createElement("a", {
                className: "hlink hlink--serif",
                href: Object(j.U)()
            }, "Mercati")), g.a.createElement("li", {
                className: "hnav-item"
            }, g.a.createElement(Y.Link, {
                route: Object(Y.getRouteToPath)("section", {
                    sectionId: "radiocor"
                })
            }, g.a.createElement("a", {
                className: "hlink hlink--serif"
            }, "Radiocor"))), g.a.createElement("li", {
                className: "hnav-item"
            }, g.a.createElement(Y.Link, {
                route: Object(Y.getRouteToPath)("section", {
                    sectionId: "finanza-personale"
                })
            }, g.a.createElement("a", {
                className: "hlink hlink--serif"
            }, "Finanza Personale ", g.a.createElement("span", {
                className: "hlink-light"
            }, "by Plus24")))))), g.a.createElement("div", {
                className: "relmt-search d-none d-lg-block"
            }, g.a.createElement("input", {
                className: "input",
                type: "text",
                placeholder: "Cerca titolo, indice, fondo, valuta…",
                value: O,
                onChange: function(e) {
                    return S(e.target.value)
                }
            }), g.a.createElement("button", {
                className: "relmt-search-btn",
                type: "submit",
                onClick: function(e) {
                    document.location = "".concat(Object(j.U)(), "ricerca/").concat(O)
                }
            }, g.a.createElement("span", {
                className: "icon icon-search"
            })))))), g.a.createElement("div", {
                className: "hgr hgr--dark inverted-color hgr--big d-none d-md-block order-1"
            }, g.a.createElement("div", {
                className: "container"
            }, g.a.createElement("div", {
                className: "hgr-wrapper"
            }, g.a.createElement("div", {
                className: " relmt-scroll"
            }, g.a.createElement("ul", {
                className: "list-inline list-inline--close relmt-list"
            }, g.a.createElement("li", {
                className: "list-inline-item"
            }, g.a.createElement("span", {
                className: "relmt-nav-label"
            }, "Ultimi dati")), g.a.createElement("li", {
                className: "list-inline-item"
            }, g.a.createElement("a", {
                className: "btn btn--pill",
                href: "".concat(Object(j.U)(), "tassi-e-valute/valute/contro-euro")
            }, "Cambio Euro")), g.a.createElement("li", {
                className: "list-inline-item"
            }, g.a.createElement("a", {
                className: "btn btn--pill",
                href: "".concat(Object(j.U)(), "azioni/classifiche/migliori-peggiori")
            }, "Migliori e Peggiori")), g.a.createElement("li", {
                className: "list-inline-item"
            }, g.a.createElement("a", {
                className: "btn btn--pill",
                href: "".concat(Object(j.U)(), "azioni/indici/principali-indici-italia")
            }, "Indici Italia")), g.a.createElement("li", {
                className: "list-inline-item"
            }, g.a.createElement("a", {
                className: "btn btn--pill",
                href: "".concat(Object(j.U)(), "tassi-e-valute")
            }, "Tassi")), g.a.createElement("li", {
                className: "list-inline-item"
            }, g.a.createElement("a", {
                className: "btn btn--pill",
                href: "".concat(Object(j.U)(), "obbligazioni")
            }, "Obbligazioni")), g.a.createElement("li", {
                className: "list-inline-item d-none d-xl-inline-block"
            }, g.a.createElement("a", {
                className: "btn btn--pill",
                href: "".concat(Object(j.U)(), "materie-prime")
            }, "Materie prime")))), g.a.createElement("ul", {
                className: "hnav hnav--lined hnav--lsep"
            }, g.a.createElement("li", {
                className: "hnav-item"
            }, g.a.createElement("a", {
                className: "hlink hlink--logo",
                href: Object(j.k)()
            }, g.a.createElement("img", {
                className: "himg himg--s himg--24plus",
                src: "/static/img/24plus--white.svg",
                alt: "24+"
            }))), g.a.createElement("li", {
                className: "hnav-item"
            }, g.a.createElement(Y.Link, {
                route: "archive2",
                params: {
                    sectionId: "mercati",
                    page: 1
                }
            }, g.a.createElement("a", {
                className: "hlink hlink--logo"
            }, g.a.createElement("img", {
                className: "himg himg--s",
                src: "/static/img/mercati-plus.svg",
                alt: "Mercati+"
            })))), g.a.createElement("li", {
                className: "hnav-item"
            }, g.a.createElement("a", {
                className: "hlink hlink--logo",
                href: Object(j.lb)()
            }, g.a.createElement("img", {
                className: "himg himg--b",
                src: "/static/img/radio24--logo.svg",
                alt: "Radio24"
            })))))))), g.a.createElement("div", {
                className: "sticky-header sticky-header--dark",
                id: "sticky-header-mobile"
            }, g.a.createElement("div", {
                className: "hgr hgr--up hgr--dark inverted-color order-1"
            }, g.a.createElement("div", {
                className: "container"
            }, g.a.createElement("div", {
                className: "hgr-wrapper"
            }, g.a.createElement("ul", {
                className: "nav-inline nav-inline--sep"
            }, g.a.createElement("li", {
                className: "nav-inline-item"
            }, g.a.createElement("button", {
                type: "button",
                className: "hlink hlink--icon",
                onClick: U
            }, g.a.createElement("span", {
                className: "icon icon-menu"
            }))), g.a.createElement("li", {
                className: "nav-inline-item d-none d-md-inline-block"
            }, g.a.createElement("button", {
                type: "button",
                className: "hlink hlink--icon",
                onClick: function() {
                    k(!0)
                }
            }, g.a.createElement("span", {
                className: "icon icon-search"
            }))), g.a.createElement("li", {
                className: "nav-inline-item"
            }, g.a.createElement("a", {
                className: "hlink hlink--icon hlink--icon24",
                href: Object(j.N)()
            }, g.a.createElement("span", {
                className: "icon icon-24"
            }))), g.a.createElement("li", {
                className: "nav-inline-item "
            }, g.a.createElement(Y.Link, {
                route: Object(Y.getRouteToPath)("section", {
                    sectionId: n
                })
            }, g.a.createElement("a", {
                className: "hlink hlink--title hlink-light"
            }, "Finanza"))), g.a.createElement("li", {
                className: "nav-inline-item d-none d-md-inline-block"
            }, g.a.createElement("a", {
                className: "hlink hlink--serif",
                href: Object(j.U)()
            }, "Mercati")), g.a.createElement("li", {
                className: "nav-inline-item d-none d-md-inline-block"
            }, g.a.createElement(Y.Link, {
                route: Object(Y.getRouteToPath)("section", {
                    sectionId: "radiocor"
                })
            }, g.a.createElement("a", {
                className: "hlink hlink--serif"
            }, "Radiocor"))), g.a.createElement("li", {
                className: "nav-inline-item d-none d-md-inline-block"
            }, g.a.createElement(Y.Link, {
                route: Object(Y.getRouteToPath)("section", {
                    sectionId: "finanza-personale"
                })
            }, g.a.createElement("a", {
                className: "hlink hlink--serif"
            }, "Finanza Personale ", g.a.createElement("span", {
                className: "hlink-light"
            }, "by Plus24"))))), g.a.createElement("ul", {
                className: "hnav hnav--right "
            }, g.a.createElement("li", {
                className: "hnav-item"
            }, g.a.createElement("a", {
                className: "hlink hlink--sub",
                href: Object(j.P)()
            }, "Abbonati")), g.a.createElement("li", {
                className: "hnav-item d-none d-md-inline-block"
            }, g.a.createElement("a", {
                className: "hicon-link",
                href: "https://www.quotidiano.ilsole24ore.com/"
            }, g.a.createElement("span", {
                className: "icon icon-doc-my24"
            }))), g.a.createElement("li", {
                className: "hnav-item hnav-item--no-brd-md"
            }, g.a.createElement("div", {
                className: "hicon huser "
            }, g.a.createElement("a", {
                className: "hicon-link",
                href: "#modal-login",
                "data-toggle": "modal"
            }, g.a.createElement("span", {
                className: "icon icon-user"
            })))))))), g.a.createElement(G, {
                device: l,
                isFinanzaSection: !0
            })), g.a.createElement("div", {
                className: "hgr hgr--dark inverted-color order-last d-md-none"
            }, g.a.createElement("div", {
                className: "container"
            }, g.a.createElement("div", {
                className: "hgr-wrapper"
            }, g.a.createElement("div", {
                className: "hnav-scroll"
            }, g.a.createElement("ul", {
                className: "hnav hnav--sep hnav--scroll  "
            }, g.a.createElement("li", {
                className: "hnav-item"
            }, g.a.createElement("a", {
                className: "hlink hlink--serif",
                href: Object(j.U)()
            }, "Mercati")), g.a.createElement("li", {
                className: "hnav-item"
            }, g.a.createElement(Y.Link, {
                route: Object(Y.getRouteToPath)("section", {
                    sectionId: "radiocor"
                })
            }, g.a.createElement("a", {
                className: "hlink hlink--serif"
            }, "Radiocor"))), g.a.createElement("li", {
                className: "hnav-item"
            }, g.a.createElement(Y.Link, {
                route: Object(Y.getRouteToPath)("section", {
                    sectionId: "finanza-personale"
                })
            }, g.a.createElement("a", {
                className: "hlink hlink--serif"
            }, "Finanza Personale ", g.a.createElement("span", {
                className: "hlink-light"
            }, "by Plus24"))))))))), g.a.createElement(D.c, {
                key: "search-modal",
                searchModalVisibility: y,
                setSearchModalVisibility: k
            }), g.a.createElement(_.a, {
                key: "login-modal",
                loginModalVisibility: h,
                setLoginModalVisibility: f
            }))
        }
          , be = function(e) {
            var t = e.hasNav
              , a = void 0 === t || t
              , n = e.sectionItem
              , i = void 0 === n ? {
                section: "",
                sectionId: ""
            } : n
              , r = e.subsectionItem
              , o = void 0 === r ? {
                subsection: "",
                subsectionId: ""
            } : r
              , c = e.sezioni
              , s = e.articleTitle
              , l = e.maxVisibleItems
              , u = void 0 === l ? 6 : l
              , d = e.maxVisibleItemsSticky
              , p = void 0 === d ? 7 : d
              , h = e.hamburger
              , f = e.hotTopics
              , v = e.device
              , E = e.eco
              , y = e.article
              , k = e.videoLastBySection
              , N = e.podcastLast
              , w = !(f && 0 !== f.length)
              , O = Object(b.useContext)(R.a).appData
              , S = Object(b.useState)(!1)
              , I = Object(m.default)(S, 2)
              , x = I[0]
              , L = I[1]
              , P = Object(b.useState)(!1)
              , A = Object(m.default)(P, 2)
              , B = A[0]
              , U = A[1]
              , W = Object(b.useState)(!1)
              , H = Object(m.default)(W, 2)
              , K = H[0]
              , Q = H[1]
              , J = Object(b.useState)(!1)
              , $ = Object(m.default)(J, 2)
              , te = $[0]
              , se = $[1]
              , le = Object(b.useState)(E)
              , ue = Object(m.default)(le, 2)
              , me = ue[0]
              , de = ue[1]
              , pe = "mobile" === v
              , he = y && y.dossier && "superdossier" === y.dossier.type;
            Object(b.useEffect)(function() {
                me && de(!1)
            }, [me]);
            var fe = function(e) {
                e.preventDefault(),
                L(!x),
                Object(C.a)({
                    link_id: "strumenti navigazione",
                    event_type: "pulsante naviga"
                })
            }
              , ve = function(e) {
                e.preventDefault(),
                se(!te),
                Object(C.a)({
                    link_id: "login",
                    event_type: "login"
                }),
                Object(j.Ib)()
            }
              , be = O.routeData
              , ge = O.isWebview
              , Ee = (O.orientation,
            O.cssBreakpoint)
              , ye = be.routeName
              , ke = be.query
              , Ne = be.asPath;
            switch (ye) {
            case "homedossier":
            case "ebooklist":
            case "radiocor":
            case "radiocorBList":
                ye = "section";
                break;
            case "ebook":
            case "ebookCover":
            case "fogliaradiocor":
                ye = "article";
                break;
            case "homedossierlist":
            case "homedossierlistsection":
            case "sostenibilitasub":
            case "errore":
            case "erroreLogin":
            case "rss":
                ye = "subsection";
                break;
            default:
                (ye.startsWith("strumenti") || ye.startsWith("archive") && ke.sectionId) && (ye = "subsection")
            }
            var we = "homepage" === ye || ke && "finanza" === ke.sectionId && ("section" === ye || "subsection" === ye);
            ["radiocor"].includes(ye) && (ye = "section");
            var Oe = function() {
                return g.a.createElement("div", {
                    className: "main-header",
                    id: "header"
                }, "section" === ye && i && "norme-e-tributi" === i.sectionId && g.a.createElement(ae, null), g.a.createElement("div", {
                    className: "d-none d-print-block container"
                }, g.a.createElement("div", {
                    className: "htop-logo-print"
                }, g.a.createElement("img", {
                    src: "".concat(re, "/static/images/ilsole24ore.svg"),
                    alt: "Il Sole 24 Ore"
                })), g.a.createElement("span", {
                    className: "htop-section"
                }, i.section)), we ? g.a.createElement(G, {
                    device: v
                }) : null, "section" === ye ? g.a.createElement("div", {
                    className: "htop"
                }, g.a.createElement("div", {
                    className: "container"
                }, g.a.createElement("div", {
                    className: "htop-title"
                }, g.a.createElement("div", {
                    className: "habs-left"
                }, "section" === ye ? g.a.createElement(g.a.Fragment, null, g.a.createElement(Z.b, {
                    clickSetShowMenu: fe,
                    bigIcons: !0,
                    mobileOnly: !0
                }), g.a.createElement(Y.Link, {
                    route: "homepage"
                }, g.a.createElement("a", {
                    className: "hlink hlink--icon-big hlink--icon-big24 d-md-none"
                }, g.a.createElement("span", {
                    className: "icon icon--big icon-24"
                })))) : g.a.createElement(g.a.Fragment, null, pe ? null : g.a.createElement(ne.a, {
                    classes: "hlogo d-none d-lg-block",
                    slot: "Manchette_1"
                }), g.a.createElement(Z.b, {
                    clickSetShowMenu: fe,
                    bigIcons: !0,
                    mobileOnly: !0
                }))), g.a.createElement("div", {
                    className: "htop-center ".concat("homepage" !== ye ? "htop-center--page" : "")
                }, g.a.createElement(Y.Link, {
                    route: "homepage"
                }, g.a.createElement("a", {
                    className: "hlogo ".concat("section" === ye ? "hlogo--main-small" : "hlogo--main"),
                    href: "/"
                }, g.a.createElement("img", {
                    src: "".concat(re, "/static/images/ilsole24ore.svg"),
                    alt: "Il Sole 24 Ore"
                }))), "section" === ye && i.sectionId ? g.a.createElement("h2", {
                    className: "htitle"
                }, g.a.createElement(Y.Link, {
                    route: Object(Y.getRouteToPath)("section", {
                        sectionId: i.sectionId
                    })
                }, g.a.createElement("a", null, "il" === i.sectionId && g.a.createElement("img", {
                    className: "htitle-img",
                    src: "/static/images/il-magazine.svg",
                    alt: "IL magazine"
                }) || "how-to-spend-it" === i.sectionId && g.a.createElement("img", {
                    className: "htitle-img",
                    src: "/static/images/how-to-spend-it.svg",
                    alt: "How to Spend it"
                }) || "htsi" === i.sectionId && g.a.createElement("img", {
                    className: "htitle-img",
                    src: "/static/images/htsi.svg",
                    alt: "How to Spend it"
                }) || "radiocor" === i.sectionId && g.a.createElement("img", {
                    className: "htitle-img",
                    src: "/static/img/radiocor.svg",
                    alt: "Radiocor"
                }) || i.section)), " ", "finanza-personale" === i.sectionId && g.a.createElement("span", {
                    className: "hlink-light"
                }, "by Plus24")) : null, "section" !== ye || i.sectionId ? null : g.a.createElement("h2", {
                    className: "htitle"
                }, i.section)), "section" === ye || pe ? null : g.a.createElement("div", {
                    className: "habs-right-lg d-none d-md-block"
                }, g.a.createElement("a", {
                    className: "hlogo hlogo--radio24 habs-left-mdo",
                    href: "http://www.radio24.ilsole24ore.com/"
                }, g.a.createElement("img", {
                    src: "".concat(re, "/static/images/radio24-diretta.svg"),
                    alt: "Radio24"
                })), g.a.createElement("a", {
                    className: "hlogo hlogo--business24 habs-right-mdo",
                    href: "http://24o.it/Daw9sn"
                }, g.a.createElement("img", {
                    src: "".concat(re, "/static/images/24ore-professionale.svg"),
                    alt: "Business24"
                }))), g.a.createElement(T.a, {
                    key: "user-logged",
                    currentUrl: Ne,
                    mobile: !0,
                    NotLoggedChild: function() {
                        return g.a.createElement(M.a, {
                            handler: ve
                        }, g.a.createElement("a", {
                            key: "user-not-logged-mobile-1",
                            className: "hlink hlink--icon-big habs-right d-md-none"
                        }, g.a.createElement("span", {
                            className: "icon icon-user"
                        })))
                    }
                })), g.a.createElement("div", {
                    className: "htop-wrap d-none d-md-flex"
                }, g.a.createElement("div", {
                    className: "htoday halign-left"
                }, g.a.createElement(V.a, {
                    plain: !0,
                    format: "dddd D MMMM YYYY",
                    value: (new Date).toISOString()
                })), !0 === a ? g.a.createElement("div", {
                    className: "halign-center d-none d-lg-block"
                }, g.a.createElement(X.b, {
                    key: "navigation-has-nav",
                    items: c,
                    maxVisibleItems: u
                })) : null, g.a.createElement("div", {
                    className: "halign-right"
                }, g.a.createElement("ul", {
                    key: "offerte",
                    className: "nav-inline"
                }, g.a.createElement("li", {
                    className: "nav-inline-item nav-inline-item--brd"
                }, g.a.createElement("a", {
                    className: "hcta",
                    href: "https://www.quotidiano.ilsole24ore.com",
                    target: "_blank"
                }, "Sfoglia il giornale")), g.a.createElement("li", {
                    className: "nav-inline-item"
                }, ge && ge.ios && g.a.createElement("a", {
                    className: "hcta",
                    href: ie.b
                }, g.a.createElement("strong", null, "ABBONATI")) || g.a.createElement("a", {
                    className: "hcta",
                    href: oe
                }, g.a.createElement("strong", null, "ABBONATI"), " ", ce))))))) : g.a.createElement("div", {
                    className: "htop pt-0 ".concat(he ? "bg-white" : "")
                }, g.a.createElement("div", {
                    className: "container"
                }, g.a.createElement("div", {
                    className: "htop-title d-md-none"
                }, g.a.createElement("div", {
                    className: "habs-left"
                }, g.a.createElement(Z.b, {
                    clickSetShowMenu: fe,
                    bigIcons: !0
                }), g.a.createElement(Y.Link, {
                    route: "homepage"
                }, g.a.createElement("a", {
                    className: "hlink hlink--icon-big hlink--icon-big24"
                }, g.a.createElement("span", {
                    className: "icon icon--big icon-24"
                })))), g.a.createElement("div", {
                    className: "htop-center htop-center--page"
                }, !(he && "sm" === Ee) && g.a.createElement(g.a.Fragment, null, "article" === ye || "subsection" === ye ? g.a.createElement(g.a.Fragment, null, i && i.sectionId && "mercati" !== i.sectionId ? g.a.createElement(Y.Link, {
                    route: "dossier" === i.sectionId ? "homedossier" : Object(Y.getRouteToPath)("section", {
                        sectionId: i.sectionId
                    })
                }, g.a.createElement("h2", {
                    className: "htitle htitle--sub"
                }, g.a.createElement("a", {
                    className: "blue",
                    href: ""
                }, i.section))) : g.a.createElement("h2", {
                    className: "htitle htitle--sub"
                }, i && i.sectionId && "mercati" === i.sectionId ? g.a.createElement("a", {
                    className: "blue",
                    href: Object(j.U)()
                }, i.section) : i.section)) : g.a.createElement("h2", {
                    className: "htitle"
                }, i.section))), g.a.createElement(T.a, {
                    key: "user-logged-mobile",
                    currentUrl: Ne,
                    mobile: !0,
                    NotLoggedChild: function() {
                        return g.a.createElement(M.a, {
                            handler: ve
                        }, g.a.createElement("a", {
                            className: "hlink hlink--icon-big habs-right"
                        }, g.a.createElement("span", {
                            className: "icon icon-user"
                        })))
                    }
                })), g.a.createElement("div", {
                    className: "htop-wrap d-none d-md-block"
                }, "section" === ye ? g.a.createElement(X.b, {
                    key: "navigation-htop",
                    navIcon: !0,
                    navLogo: !0,
                    setSearchModalVisibility: Q,
                    searchModalVisibility: K,
                    clickSetShowMenu: fe
                }) : null, "subsection" === ye ? g.a.createElement(X.b, {
                    key: "navigation-subsection",
                    navIcon: !0,
                    navLogo: !0,
                    articleTitle: s,
                    sectionItem: i,
                    subsectionItem: o,
                    setSearchModalVisibility: Q,
                    searchModalVisibility: K,
                    clickSetShowMenu: fe,
                    sticky: !1
                }) : null, "article" === ye ? g.a.createElement(X.b, {
                    key: "navigation-article-homepage",
                    navIcon: !0,
                    navLogo: !0,
                    articleTitle: s,
                    sectionItem: i,
                    subsectionItem: o,
                    setSearchModalVisibility: Q,
                    searchModalVisibility: K,
                    clickSetShowMenu: fe,
                    sticky: !1,
                    isSuperdossierArticle: he,
                    dossier: y && y.dossier
                }) : null, g.a.createElement("div", {
                    className: "habs-right"
                }, "subsection" === ye ? g.a.createElement(z.a, {
                    social: !0
                }) : g.a.createElement(z.a, {
                    share: !0,
                    shareAndAction: !0,
                    shareActionsHasLabel: !0,
                    hasMoreActions: !0,
                    dropdownReverse: !0,
                    article: y
                }))))), "article" === ye ? g.a.createElement("div", {
                    className: "hgr hgr--light d-none d-md-block order-1"
                }, g.a.createElement("div", {
                    className: "container"
                }, g.a.createElement("div", {
                    className: "hgr-wrapper"
                }, g.a.createElement("div", {
                    className: "hnav-scroll"
                }, g.a.createElement(X.a, {
                    key: "navigation-hbtm",
                    scroll: !0,
                    title: w ? "" : "In evidenza",
                    topic: !0,
                    items: f,
                    maxVisibleItems: 5
                })), g.a.createElement(z.a, {
                    key: "other-tools-halign",
                    header2021: !0,
                    subscribe: !0,
                    headerUserTools: !0,
                    setLoginModalVisibility: se,
                    loginModalVisibility: te
                })))) : g.a.createElement("div", {
                    className: "hbtm d-none d-md-block"
                }, g.a.createElement("div", {
                    className: "container"
                }, g.a.createElement("div", {
                    className: "hbtm-wrap"
                }, "section" === ye ? g.a.createElement(X.b, {
                    key: "navigation-hbtm",
                    navIcon: !0,
                    title: w ? "" : "Temi Caldi",
                    topic: !0,
                    items: f,
                    maxVisibleItems: 5,
                    setSearchModalVisibility: Q,
                    searchModalVisibility: K,
                    clickSetShowMenu: fe
                }) : g.a.createElement(X.b, {
                    key: "navigation-temi-caldi",
                    topic: !0,
                    title: w ? "" : "Temi Caldi",
                    items: f,
                    maxVisibleItems: 5
                }), g.a.createElement("div", {
                    className: "halign-right"
                }, "section" === ye ? g.a.createElement(z.a, {
                    key: "tools-halign",
                    social: !0,
                    headerUserTools: !0,
                    setLoginModalVisibility: se,
                    loginModalVisibility: te
                }) : g.a.createElement(z.a, {
                    key: "other-tools-halign",
                    subscribe: !0,
                    headerUserTools: !0,
                    setLoginModalVisibility: se,
                    loginModalVisibility: te
                }))))))
            };
            return g.a.createElement(g.a.Fragment, null, me ? null : g.a.createElement(q.a, {
                key: "side-menu",
                showMenu: x,
                clickSideMenu: function() {
                    return L(!x)
                },
                listMenu: h,
                device: v
            }), ("subsection" === ye || "section" === ye) && pe && "sm" === Ee && g.a.createElement(g.a.Fragment, null, g.a.createElement(F.a, {
                key: "sticky-header",
                enabled: !0,
                top: 0,
                onStateChange: function(e) {
                    e.status === F.a.STATUS_FIXED && U(!0),
                    e.status === F.a.STATUS_ORIGINAL && U(!1)
                },
                enableTransforms: !1,
                bottomBoundary: "body",
                innerZ: 1020
            }, g.a.createElement("div", {
                id: "sticky-header-mobile"
            }, Oe())), "subsection" !== ye && "section" !== ye ? g.a.createElement("div", {
                style: {
                    position: "static",
                    width: "100%",
                    height: B ? "94px" : "0px",
                    display: "block",
                    verticalAlign: "baseline",
                    float: "none"
                }
            }) : null) || Oe(), g.a.createElement(ee, {
                routeName: ye,
                setSearchModalVisibility: Q,
                searchModalVisibility: K,
                sectionItem: i,
                subsectionItem: o,
                articleTitle: s,
                clickSetShowMenu: fe,
                hotTopics: f,
                maxVisibleHotTopics: 5,
                sectionsList: c,
                maxVisibleSections: p,
                setLoginModalVisibility: se,
                loginModalVisibility: te,
                article: y,
                videoLastBySection: k,
                podcastLast: N,
                isWebview: ge,
                isSuperdossierArticle: he,
                dossier: y && y.dossier
            }), g.a.createElement(D.c, {
                key: "search-modal",
                searchModalVisibility: K,
                setSearchModalVisibility: Q
            }), g.a.createElement(_.a, {
                key: "login-modal",
                loginModalVisibility: te,
                setLoginModalVisibility: se
            }))
        }
          , ge = a("Zsfv")
          , Ee = "bottomsubs";
        function ye(e) {
            var t = e.abbonamento
              , a = Object(b.useState)(!1)
              , n = Object(m.default)(a, 2)
              , i = n[0]
              , r = n[1];
            Object(b.useEffect)(function() {
                sessionStorage.getItem(Ee) || (sessionStorage.setItem(Ee, "true"),
                r(!0))
            }, []),
            Object(b.useEffect)(function() {
                "true" === sessionStorage.getItem(Ee) && setTimeout(function() {
                    r(!0),
                    setTimeout(function() {
                        return document.body.classList.add("is-bottomsubs-in")
                    }, 1e3)
                }, 10)
            }, [i]);
            var o = function() {
                sessionStorage.setItem(Ee, "false"),
                document.body.classList.remove("is-bottomsubs-in"),
                setTimeout(function() {
                    return r(!1)
                }, 1e3)
            };
            if (!i)
                return null;
            return "24plus" === t ? g.a.createElement(function() {
                return g.a.createElement("div", {
                    className: "bottomsubs bottomsubs--plus"
                }, g.a.createElement("a", {
                    href: "https://abbonamenti.ilsole24ore.com/landing?wt_mc=internal.display.mobile.footer..quotidiano.estate2022..."
                }, g.a.createElement("span", {
                    className: "bottomsubs-text"
                }, "Leggi Il Sole 24 Ore con", " ", g.a.createElement("span", {
                    className: "lplus-24"
                }, "24", g.a.createElement("span", {
                    className: "lplus-24-o"
                }, "+")), " ", "per 1 mese a solo 1 €"), g.a.createElement("figure", {
                    className: "bottomsubs-img"
                }, g.a.createElement("img", {
                    className: "img-fluid",
                    src: "/static/images/banner-promo-24plus.jpg",
                    alt: ""
                }))), g.a.createElement("button", {
                    type: "button",
                    className: "bottomsubs-close",
                    "data-toggle-class": "is-bottomsubs-in",
                    onClick: o
                }, g.a.createElement("span", {
                    className: "icon icon-close-small"
                })))
            }, null) : g.a.createElement(function() {
                return g.a.createElement("div", {
                    className: "bottomsubs"
                }, g.a.createElement("a", {
                    href: "https://abbonamenti.ilsole24ore.com/landing?wt_mc=internal.display.mobile.footer..quotidiano.btw2022..."
                }, g.a.createElement("span", {
                    className: "bottomsubs-text"
                }, "Leggi Il Sole 24 Ore per 2 mesi a solo 19,90 €"), g.a.createElement("span", {
                    className: "bottomsubs-link"
                }, "Scopri l’offerta", g.a.createElement("span", {
                    className: "icon icon-arrow-right-small"
                })), g.a.createElement("figure", {
                    className: "bottomsubs-img"
                }, g.a.createElement("img", {
                    className: "img-fluid",
                    src: "/static/images/subscribe24ore.jpg",
                    alt: ""
                }))), g.a.createElement("button", {
                    type: "button",
                    className: "bottomsubs-close",
                    "data-toggle-class": "is-bottomsubs-in",
                    onClick: o
                }, g.a.createElement("span", {
                    className: "icon icon-close-small"
                })))
            }, null)
        }
        var ke = a("UHJ7")
          , Ne = a("vs/s")
          , we = a("YPp1")
          , Oe = a("cS44")
          , Se = a("abTZ")
          , je = a("TSYQ")
          , Ie = a.n(je);
        function xe(e) {
            var t = e.children
              , a = e.sectionId
              , n = e.routeName
              , i = Ie()({
                "il-body": ["il", "how-to-spend-it", "htsi"].includes(a),
                "htsi-body": ["how-to-spend-it", "htsi"].includes(a),
                "sd-body": ["homesuperdossierlist", "homesuperdossierlistsection"].includes(n)
            });
            return g.a.createElement("div", {
                key: "wrapper",
                id: "wrapper",
                className: i
            }, t)
        }
        var Te, _e, Me = a("Ca10");
        var Le = a("tgc+");
        Te = Le.default,
        _e = Le.clearSSRrefreshVar;
        var Re = Te
          , Ce = a("2Emt")
          , Pe = (a("OG14"),
        a("nOHt"))
          , Ae = a.n(Pe);
        function Fe(e) {
            var t = e.includes("?refresh") ? e.substring(0, e.indexOf("?")) : e;
            return t.includes("#") ? t.substring(0, t.indexOf("#")) : t
        }
        function ze() {
            return Object(b.useEffect)(function() {
                if ("scrollRestoration"in window.history) {
                    window.history.scrollRestoration = "auto";
                    var e = !1
                      , t = function(t) {
                        var a, n, i;
                        e || (a = "".concat(document.location.pathname).concat(document.location.search || ""),
                        n = t,
                        i = Fe(a),
                        sessionStorage.setItem(i, n))
                    }
                      , a = function(t) {
                        e ? (e = !1,
                        function(e) {
                            var t = Fe(e)
                              , a = sessionStorage.getItem(t);
                            if (a) {
                                var n = document.querySelectorAll("[href='".concat(a, "']"));
                                n && (1 === n.length || n.length > 1 && n[0].href.includes("/art/")) ? (window.history.scrollRestoration = "manual",
                                n[0].scrollIntoView({
                                    block: "center"
                                })) : window.scrollTo(0, 0)
                            } else
                                window.scrollTo(0, 0);
                            window.history.scrollRestoration = "auto"
                        }(t)) : window.scrollTo(0, 0)
                    };
                    return Ae.a.events.on("routeChangeStart", t),
                    Ae.a.events.on("routeChangeComplete", a),
                    Ae.a.beforePopState(function() {
                        return e = !0,
                        !0
                    }),
                    function() {
                        Ae.a.events.off("routeChangeStart", t),
                        Ae.a.events.off("routeChangeComplete", a),
                        Ae.a.beforePopState(function() {
                            return !0
                        })
                    }
                }
            }, []),
            null
        }
        var Ve = {
            facebook: {
                appId: 0x7f3b9fb6e870
            },
            openGraph: {
                site_name: "Il Sole 24 ORE"
            },
            twitter: {
                site: "@sole24ore"
            }
        }
          , De = a("NUs0")
          , qe = a("ZA9o");
        a.d(t, "default", function() {
            return Xe
        });
        var Be = Object(j.ub)()
          , Ue = "https://j2.res.24o.it/js/2020/playeraudio"
          , We = "https://c2.res.24o.it/css/2020/playeraudio"
          , Ge = "production" === Object(j.K)()
          , He = Object(j.s)()
          , Ke = Object(j.I)()
          , Xe = function(e) {
            function t() {
                return Object(d.default)(this, t),
                Object(h.default)(this, Object(f.default)(t).apply(this, arguments))
            }
            return Object(v.default)(t, e),
            Object(p.default)(t, [{
                key: "componentDidUpdate",
                value: function(e) {
                    if (Ke) {
                        var t = this.props.asPath;
                        e.asPath !== t && window && window.scrollTo(0, 0)
                    }
                }
            }, {
                key: "render",
                value: function() {
                    var e, t, a, n = this.props, i = n.Component, r = n.pageProps, o = n.sections, l = n.hottrends, d = n.hamburger, p = void 0 === d ? [] : d, h = n.pathname, f = n.device, v = n.routeName, b = (n.isLanding,
                    n.isSSR), y = n.asPath, k = n.query, w = n.cookies, O = n.error, I = n.eco, T = n.userAgent, _ = {
                        routeName: v,
                        pathname: h,
                        asPath: y,
                        query: k
                    }, M = ((k || {}).uuid || "").split("_"), L = Object(m.default)(M, 2), C = (L[0],
                    L[1]);
                    if (O)
                        return g.a.createElement(R.b, {
                            addProps: {
                                device: f,
                                routeData: _,
                                isSSR: b
                            }
                        }, g.a.createElement(Re, {
                            routeData: _,
                            isLive: r.isLive,
                            isSSR: b,
                            device: f
                        }), g.a.createElement(qe.default, {
                            withFooter: !0,
                            withHeader: !0,
                            error: O,
                            sections: o,
                            hamburger: p,
                            hottrends: l,
                            device: f,
                            eco: I
                        }));
                    var A, F, z, V, D, q, B = o, U = l, W = r.data || r.article || r.ebook || r.ebookCover || r.dossier || r.superdossier || r.radiocorLeaf || r.listarticle || {}, G = W.taxonomyInfo || (W.section || {}).taxonomyInfo, H = (k.customAdunit && {
                        adunit: k.customAdunit
                    } || G || {}).adunit, K = void 0 === H ? "ilsole24ore.com/ros" : H, X = k && k.utm_campaign && u()(k).filter(function(e) {
                        return e && e.toLowerCase().startsWith("utm_")
                    }).map(function(e) {
                        return "".concat(e, "=").concat(encodeURIComponent(k[e]))
                    }).join("&"), Y = {}, Q = r || {}, Z = Q.videoLastBySection, J = Q.podcastLast;
                    switch (v) {
                    case "homepage":
                        var ee = r.data.section;
                        r.device;
                        A = 7,
                        Y = Object(we.a)("homepage", ee);
                        break;
                    case "article":
                        var te = V = r.article
                          , ae = te.title
                          , ie = te.section
                          , re = te.sectionId
                          , oe = te.subsectionId
                          , ce = te.dossier
                          , se = ae.leafTitle;
                        e = se;
                        var le = Object(j.ob)(re, oe, o)
                          , ue = le.sectionLabel
                          , me = le.subsectionLabel;
                        t = {
                            section: ce && "superdossier" === ce.type && ce.title && ce.title.leafTitle || ue || ie,
                            sectionId: re
                        },
                        a = me ? {
                            subsection: me,
                            subsectionId: oe
                        } : {
                            subsection: "",
                            subsectionId: ""
                        },
                        Y = Object(we.a)("article", V);
                        break;
                    case "section":
                    case "radiocor":
                    case "radiocorBList":
                        var de = r.data.section;
                        Y = Object(we.a)("section", de),
                        o.some(function(e) {
                            return k.sectionId === e.uuid && (t = {
                                section: e.label,
                                sectionId: e.uuid
                            },
                            B = e.subsections,
                            A = e.visibleItems || 5,
                            F = e.visibleItemsSticky || 7,
                            !0)
                        });
                        break;
                    case "subsection":
                        var pe = r.data.section
                          , fe = k.sectionId
                          , ge = k.subsectionId;
                        t = {
                            section: pe.section,
                            sectionId: fe
                        },
                        a = {
                            subsection: pe.subsection,
                            subsectionId: ge
                        },
                        Y = Object(we.a)("subsection", Object(s.a)({}, pe, {
                            sectionId: fe,
                            subsectionId: ge
                        })),
                        o.some(function(n) {
                            return fe === n.uuid && (n.subsections.some(function(i) {
                                return ge === i.uuid && (t = {
                                    section: n.label,
                                    sectionId: n.uuid
                                },
                                a = {
                                    subsection: i.label,
                                    subsectionId: i.uuid
                                },
                                e = i.label,
                                B = n.subsections,
                                !0)
                            }),
                            !0)
                        });
                        break;
                    case "ebook":
                        var Ee = D = r.ebook
                          , je = Ee.title
                          , Ie = Ee.section
                          , Te = Ee.sectionId
                          , _e = Ee.subsection
                          , Le = Ee.subsectionId
                          , Ce = je.leafTitle;
                        e = Ce;
                        var Pe = Object(j.ob)(Te, Le, o)
                          , Ae = Pe.sectionLabel
                          , Fe = Pe.subsectionLabel;
                        t = {
                            section: Ae || Ie,
                            sectionId: Te
                        },
                        a = {
                            subsection: Fe || _e,
                            subsectionId: Le
                        },
                        Y = Object(we.a)("ebook", D);
                        break;
                    case "ebookCover":
                        var Xe = q = r.ebookCover
                          , Ye = Xe.title
                          , Qe = Xe.section
                          , Ze = Xe.sectionId
                          , Je = Xe.subsection
                          , $e = Xe.subsectionId
                          , et = Ye.leafTitle;
                        e = et;
                        var tt = Object(j.ob)(Ze, $e, o)
                          , at = tt.sectionLabel
                          , nt = tt.subsectionLabel;
                        t = {
                            section: at || Qe,
                            sectionId: Ze
                        },
                        a = {
                            subsection: nt || Je,
                            subsectionId: $e
                        },
                        Y = Object(we.a)(v, q);
                        break;
                    case "ebooklist":
                        t = {
                            section: "Ebook",
                            sectionId: ""
                        },
                        e = "Ebook",
                        Y = Object(we.a)(v, G);
                        break;
                    case "homedossier":
                        t = {
                            section: "Dossier",
                            sectionId: ""
                        },
                        Y = Object(we.a)(v, {
                            uuid: "zzzz",
                            taxonomyInfo: G
                        });
                        break;
                    case "homedossierlist":
                    case "homedossierlistsection":
                        var it = (z = r.dossier).intro.title.leafTitle;
                        e = "",
                        t = {
                            section: "Dossier",
                            sectionId: "dossier"
                        },
                        a = {
                            subsection: it || "",
                            subsectionId: ""
                        },
                        Y = Object(we.a)(v, Object(s.a)({}, z, {
                            query: k
                        }));
                        break;
                    case "homesuperdossierlist":
                    case "homesuperdossierlistsection":
                    case "homesuperdossierarchivio":
                        z = r.superdossier;
                        var rt = r.parentDossier
                          , ot = z.intro.title.leafTitle;
                        e = ot,
                        U = Object($.b)(z, rt, !1),
                        Y = Object(we.a)(v, Object(s.a)({}, z, {
                            query: k
                        }));
                        break;
                    case "fogliaradiocor":
                        var ct = r.radiocorLeaf
                          , st = ct.title
                          , lt = ct.slug
                          , ut = ct.text;
                        e = st,
                        t = {
                            section: "Radiocor",
                            sectionId: ""
                        },
                        a = {
                            subsection: st,
                            subsectionId: ""
                        },
                        Y = Object(we.a)("fogliaradiocor", {
                            title: st,
                            description: ut,
                            slug: lt,
                            images: [{
                                url: "".concat(Object(j.C)(), "/img2020/Twbg1920x1200fondorosa.jpg"),
                                alt: ""
                            }]
                        });
                        break;
                    case "sostenibilitasub":
                        var mt = k.subsectionId;
                        o.some(function(n) {
                            return "sostenibilita" === n.uuid && (B = n.subsections,
                            t = {
                                section: n.label,
                                sectionId: n.uuid
                            },
                            B.some(function(t) {
                                return t.uuid === mt && (a = {
                                    subsection: t.label,
                                    subsectionId: mt
                                },
                                e = t.label,
                                !0)
                            }),
                            !0)
                        }),
                        Y = Object(we.a)("sostenibilitasub", Object(s.a)({
                            taxonomyInfo: G
                        }, k));
                        break;
                    case "archive":
                        var dt = r.listarticle;
                        e = "archivio",
                        k.sectionId && o.some(function(e) {
                            return !(k.sectionId !== e.uuid || (t = {
                                section: e.label,
                                sectionId: e.uuid
                            },
                            Y = Object(we.a)("section", dt),
                            !k.subsectionId)) && (e.subsections.some(function(e) {
                                return k.subsectionId === e.uuid && (a = {
                                    subsection: e.label,
                                    subsectionId: e.uuid
                                },
                                Y = Object(we.a)("subsection", dt),
                                !0)
                            }),
                            !0)
                        });
                        break;
                    case "errore":
                        Y = Object(we.a)("errore");
                        break;
                    case "appodcast":
                    case "appfogliapodcast":
                    case "appseriepodcast":
                        return g.a.createElement(x, null, g.a.createElement(N.a, null, g.a.createElement("link", {
                            rel: "stylesheet",
                            href: "/static/css/style-podcast.css?v=".concat(Be),
                            type: "text/css"
                        }), g.a.createElement("link", {
                            rel: "stylesheet",
                            href: "".concat(We).concat(Ge ? "/prod" : "/dev-dlv", "/customPlayerStyle.css?v=").concat(Be),
                            type: "text/css"
                        })), g.a.createElement(E.Container, {
                            key: "container"
                        }, g.a.createElement(De.a, null, g.a.createElement(R.b, {
                            addProps: {
                                device: f,
                                routeData: _,
                                isSSR: b,
                                userAgent: T
                            }
                        }, g.a.createElement(g.a.Fragment, null, g.a.createElement(S.a, {
                            config: Ve
                        }), g.a.createElement(S.a, {
                            config: Y
                        })), g.a.createElement(P, {
                            key: "headerPodcast-".concat(y)
                        }), g.a.createElement(i, Object(c.a)({
                            key: "content-".concat(y)
                        }, r, {
                            isSSR: b
                        })), g.a.createElement(Me.a, null)))));
                    case "brief":
                    case "briefNew":
                        return g.a.createElement(x, null, g.a.createElement(N.a, null, g.a.createElement("link", {
                            rel: "stylesheet",
                            href: "/static/css/style-webview".concat("briefNew" === v ? "-app" : "", ".css?v=").concat(Be),
                            type: "text/css"
                        }), g.a.createElement("link", {
                            rel: "stylesheet",
                            href: "".concat(We).concat(Ge ? "/prod" : "/dev-dlv", "/customPlayerStyle.css?v=").concat(Be),
                            type: "text/css"
                        })), g.a.createElement(E.Container, {
                            key: "container"
                        }, g.a.createElement(De.a, null, g.a.createElement(R.b, {
                            addProps: {
                                device: f,
                                routeData: _,
                                isSSR: b
                            }
                        }, g.a.createElement(g.a.Fragment, null, g.a.createElement(S.a, {
                            config: Ve
                        }), g.a.createElement(S.a, {
                            config: Y
                        })), g.a.createElement(i, Object(c.a)({
                            key: "content-".concat(y)
                        }, r, {
                            isSSR: b,
                            userAgent: T
                        })), g.a.createElement(Me.a, null)))));
                    case "player":
                    case "playerExternal":
                        return g.a.createElement(x, null, g.a.createElement(N.a, null, g.a.createElement("script", {
                            src: "".concat(Ue, "/jquery.min.js"),
                            type: "text/javascript"
                        }), g.a.createElement("script", {
                            src: "".concat(Ue).concat(Ge ? "/prod" : "/dev-dlv", "/player-iframe.js?v=").concat(Be),
                            type: "text/javascript"
                        }), g.a.createElement("link", {
                            rel: "stylesheet",
                            href: "".concat(We).concat(Ge ? "/prod" : "/dev-dlv", "/style-player.css?v=").concat(Be),
                            type: "text/css"
                        })), g.a.createElement(E.Container, {
                            key: "container"
                        }, g.a.createElement(i, Object(c.a)({
                            key: "content-".concat(y)
                        }, r, {
                            adunit: K,
                            cookies: w,
                            isSSR: b,
                            query: k
                        }))));
                    default:
                        v.startsWith("strumenti") && (t = {
                            section: "Mercati",
                            sectionId: ""
                        },
                        a = {
                            subsection: "Strumenti",
                            subsectionId: ""
                        },
                        e = "Strumenti")
                    }
                    var pt = ["homepage", "homesuperdossierlist", "homesuperdossierlistsection"].includes(v) ? he : be;
                    return "section" === v && "finanza" === k.sectionId && (pt = ve),
                    g.a.createElement(x, null, g.a.createElement(N.a, null, t && ["il", "how-to-spend-it", "htsi"].includes(t.sectionId) && g.a.createElement("link", {
                        rel: "stylesheet",
                        href: "/static/css/style-append-il.css?v=".concat(Be)
                    }), t && "sostenibilita" === t.sectionId && g.a.createElement("link", {
                        rel: "stylesheet",
                        href: "/static/css/style-append-sustainability.css?v=".concat(Be)
                    }), ["homesuperdossierlist", "homesuperdossierlistsection"].includes(v) && g.a.createElement("link", {
                        rel: "stylesheet",
                        href: "/static/css/style-append-superdossier.css?v=".concat(Be)
                    })), g.a.createElement(E.Container, {
                        key: "container"
                    }, g.a.createElement(xe, {
                        sectionId: t && t.sectionId || "default",
                        routeName: v
                    }, !Ke && g.a.createElement(ze, null), g.a.createElement(Re, {
                        routeData: _,
                        isLive: r.isLive,
                        isSSR: b,
                        device: f,
                        article: V
                    }), g.a.createElement(Oe.a, null), g.a.createElement(De.a, null, g.a.createElement(R.b, {
                        addProps: {
                            device: f,
                            routeData: _,
                            isSSR: b,
                            adunit: K,
                            disableAdv: k.disableAdv,
                            utmParams: X
                        }
                    }, g.a.createElement(g.a.Fragment, null, g.a.createElement(S.a, {
                        config: Ve
                    }), g.a.createElement(S.a, {
                        config: Y
                    })), g.a.createElement(Ne.a, {
                        key: "Tracking-".concat(y),
                        article: V,
                        ebook: D,
                        ebookCover: q,
                        taxonomyInfo: G,
                        dossier: z,
                        disableTIQ: k.disableTagManager,
                        disableTracking: k.disableTracking,
                        isFromSidedoor: !!C,
                        sidedoorId: C,
                        isSSR: b
                    }), !k.noskin && g.a.createElement(ne.a, {
                        key: "advtop-".concat(y),
                        slot: "Top"
                    }), g.a.createElement(pt, {
                        key: "header-".concat(y),
                        hasNav: !0,
                        sezioni: B,
                        sectionItem: t,
                        subsectionItem: a,
                        articleTitle: e,
                        maxVisibleItems: A,
                        maxVisibleItemsSticky: F,
                        hamburger: p,
                        hotTopics: U,
                        device: f,
                        eco: I,
                        article: V,
                        videoLastBySection: Z,
                        podcastLast: J,
                        disableMeteo: "1" === k.disableMeteo
                    }), g.a.createElement(g.a.Fragment, null, "mobile" !== f || "article" !== v ? g.a.createElement(Se.a, {
                        key: "advhead-".concat(y),
                        adunit: K,
                        slot: "MaxTicker",
                        routeName: v,
                        asPath: y,
                        device: f
                    }) : null), g.a.createElement(i, Object(c.a)({
                        key: "content-".concat(y)
                    }, r, {
                        adunit: K,
                        sections: o,
                        cookies: w,
                        isSSR: b
                    })), g.a.createElement(ne.a, {
                        key: "advover-".concat(y),
                        slot: "Overlay"
                    }), "mobile" === f && He && g.a.createElement(ye, {
                        abbonamento: He
                    }), g.a.createElement(ke.a, {
                        key: "footer"
                    }))))))
                }
            }], [{
                key: "getInitialProps",
                value: function() {
                    var e = Object(o.default)(i.a.mark(function e(t) {
                        var a, n, o, c, l, u, m, d, p, h, f, v, b, g, E, y, k, N, O, S, x, T, _, M;
                        return i.a.wrap(function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    if (a = t.Component,
                                    n = t.ctx,
                                    o = {},
                                    c = n.query,
                                    l = n.asPath,
                                    u = n.pathname,
                                    m = n.req,
                                    d = n.res,
                                    p = Object(w.parseCookies)(n),
                                    h = !!m,
                                    f = m ? m.headers["user-agent"] : navigator.userAgent,
                                    v = Object(j.F)(f),
                                    !_e(n)) {
                                        e.next = 10;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 10:
                                    return b = new ge.a({
                                        res: d,
                                        noCookies: !0
                                    }),
                                    g = {},
                                    e.prev = 12,
                                    e.next = 15,
                                    b.request(I.l, {
                                        sections: !0
                                    }, "queryAppJs");
                                case 15:
                                    if (E = e.sent,
                                    y = E.tree,
                                    k = Object(r.a)(E, ["tree"]),
                                    N = Object(Ce.c)(y, Ce.a.DOTCOM),
                                    O = Object(Ce.b)(y, Ce.a.DOTCOM),
                                    g = Object(s.a)({
                                        sections: N,
                                        hamburger: O
                                    }, k),
                                    e.prev = 21,
                                    !a.getInitialProps) {
                                        e.next = 26;
                                        break
                                    }
                                    return e.next = 25,
                                    a.getInitialProps(Object(s.a)({}, n, {
                                        device: v
                                    }));
                                case 25:
                                    o = e.sent;
                                case 26:
                                    e.next = 33;
                                    break;
                                case 28:
                                    e.prev = 28,
                                    e.t0 = e.catch(21),
                                    S = e.t0.statusCode,
                                    x = e.t0.code,
                                    o = {
                                        statusCode: S || 500,
                                        code: x,
                                        error: e.t0
                                    };
                                case 33:
                                    e.next = 38;
                                    break;
                                case 35:
                                    e.prev = 35,
                                    e.t1 = e.catch(12),
                                    e.t1.request && e.t1.response ? (console.error("error app_js: ".concat(e.t1)),
                                    g = e.t1.response,
                                    d.statusCode = e.t1.response.status) : (console.error("fatal error app_js: ".concat(e.t1)),
                                    g = Object(s.a)({}, e.t1.response, {
                                        error: e.t1
                                    }),
                                    T = e.t1.code,
                                    d && (["ECONNREFUSED", "ECONNRESET"].includes(T) ? d.statusCode = 503 : d.statusCode = 500));
                                case 38:
                                    return _ = Object(Y.getRouteName)(u),
                                    M = ["homepage", "section"].includes(_),
                                    o.statusCode && d && (d.statusCode = o.statusCode),
                                    e.abrupt("return", Object(s.a)({
                                        pageProps: o
                                    }, g, {
                                        error: g.error || o.error,
                                        pathname: u,
                                        device: v,
                                        asPath: l,
                                        query: c,
                                        routeName: _,
                                        isLanding: M,
                                        isSSR: h,
                                        cookies: p,
                                        eco: o.eco || !!(o.data || {}).eco,
                                        userAgent: f
                                    }));
                                case 42:
                                case "end":
                                    return e.stop()
                                }
                        }, e, null, [[12, 35], [21, 28]])
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }()
            }]),
            t
        }(y.a)
    },
    YPp1: function(e, t, a) {
        "use strict";
        (function(e) {
            a.d(t, "a", function() {
                return m
            });
            a("xfY5");
            var n = a("doui")
              , i = (a("pIFo"),
            a("zrwo"))
              , r = a("qNsG")
              , o = a("0Ops")
              , c = a("4WT4")
              , s = Object(c.N)()
              , l = {
                frontpage: "frontpage",
                article: "article",
                website: "website"
            };
            function u(e, t) {
                if (t)
                    switch (e) {
                    case "homepage":
                        return function(e, t) {
                            var a = t.taxonomyInfo
                              , n = a.title
                              , i = a.description
                              , r = "".concat(n, " - Il Sole 24 ORE")
                              , c = Object(o.getRouteToPath)(e, t);
                            return {
                                canonical: "".concat(s).concat(c),
                                title: r,
                                description: i,
                                openGraph: {
                                    title: r,
                                    description: i,
                                    type: l.frontpage,
                                    url: "".concat(s).concat(c)
                                }
                            }
                        }(e, t);
                    case "article":
                        return function(e) {
                            var t = e.summary
                              , a = e.metaDescription
                              , i = e.title.leafTitle
                              , r = e.noindex
                              , u = e.imageWide
                              , m = e.section
                              , d = e.createdAt
                              , p = e.updatedAt
                              , h = e.tagAuthors
                              , f = Object(c.j)(u, Object(c.A)())
                              , v = Object(n.default)(f, 2)
                              , b = v[0]
                              , g = v[1]
                              , E = t ? t.replace(/(<([^>]+)>)/gi, "") : ""
                              , y = b && b.length > 0 ? [{
                                url: b[0],
                                alt: g
                            }] : []
                              , k = "".concat(i, " - Il Sole 24 ORE")
                              , N = Object(o.getRouteToPath)("article", e)
                              , w = new Date(Number(d)).toISOString()
                              , O = new Date(Number(p)).toISOString();
                            return {
                                canonical: "".concat(s).concat(N),
                                title: k,
                                description: E || a,
                                noindex: r,
                                openGraph: {
                                    title: i,
                                    description: E || a,
                                    type: l.article,
                                    url: "".concat(s).concat(N),
                                    images: y,
                                    article: {
                                        section: m,
                                        publishedTime: w,
                                        modifiedTime: O,
                                        authors: h
                                    }
                                },
                                twitter: {
                                    handle: "@sole24ore",
                                    cardType: "summary_large_image"
                                }
                            }
                        }(t);
                    case "section":
                    case "sostenibilitasub":
                        return function(e, t) {
                            var a = t.taxonomyInfo
                              , n = a.title
                              , i = a.description
                              , r = "".concat(n, " - Il Sole 24 ORE")
                              , c = Object(o.getRouteToPath)(e, t);
                            return {
                                canonical: "".concat(s).concat(c),
                                title: r,
                                description: i,
                                openGraph: {
                                    title: r,
                                    description: i,
                                    type: l.website,
                                    url: "".concat(s).concat(c)
                                }
                            }
                        }(e, t);
                    case "subsection":
                        return function(e) {
                            if (!e.taxonomyInfo)
                                return {
                                    title: e.subsectionId
                                };
                            var t = e.taxonomyInfo
                              , a = t.title
                              , n = t.description
                              , i = "".concat(a, " - Il Sole 24 ORE")
                              , r = Object(o.getRouteToPath)("subsection", e);
                            return {
                                canonical: "".concat(s).concat(r),
                                title: i,
                                description: n,
                                openGraph: {
                                    title: i,
                                    description: n,
                                    type: l.website,
                                    url: "".concat(s).concat(r)
                                }
                            }
                        }(t);
                    case "homedossier":
                        return function(e, t) {
                            var a = t.taxonomyInfo
                              , n = a.title
                              , i = a.description
                              , r = "".concat(n, " - Il Sole 24 ORE")
                              , c = Object(o.getRouteToPath)(e, t);
                            return {
                                canonical: "".concat(s).concat(c),
                                title: r,
                                description: i,
                                openGraph: {
                                    title: r,
                                    description: i,
                                    type: l.website,
                                    url: "".concat(s).concat(c)
                                }
                            }
                        }(e, t);
                    case "homedossierlist":
                    case "homedossierlistsection":
                    case "homesuperdossierlist":
                    case "homesuperdossierlistsection":
                        return function(e, t) {
                            var a = t.uuid
                              , n = t.parentUuid
                              , i = t.title.leafTitle
                              , r = t.intro.leadText
                              , c = t.label
                              , u = t.query
                              , m = "".concat(i).concat(a !== n ? " - ".concat(c) : "", " - Il Sole 24 ORE")
                              , d = Object(o.getRouteToPath)(e, u);
                            return {
                                canonical: "".concat(s).concat(d),
                                title: m,
                                description: r,
                                openGraph: {
                                    title: m,
                                    description: r,
                                    type: l.article,
                                    url: "".concat(s).concat(d)
                                }
                            }
                        }(e, t);
                    case "ebookCover":
                        return function(e) {
                            var t = e.metaDescription
                              , a = e.title.leafTitle
                              , i = e.apertura.apertura.imageWide
                              , r = Object(c.j)(i, Object(c.A)())
                              , u = Object(n.default)(r, 2)
                              , m = u[0]
                              , d = u[1]
                              , p = m && m.length > 0 ? [{
                                url: m[0],
                                alt: d
                            }] : []
                              , h = "".concat(a, " - Il Sole 24 ORE")
                              , f = Object(o.getRouteToPath)("ebookCover", e);
                            return {
                                canonical: "".concat(s).concat(f),
                                title: h,
                                description: t,
                                openGraph: {
                                    title: h,
                                    description: t,
                                    images: p,
                                    type: l.article,
                                    url: "".concat(s).concat(f)
                                }
                            }
                        }(t);
                    case "ebook":
                        return function(e) {
                            var t = e.title.leafTitle
                              , a = "".concat(t, " - Il Sole 24 ORE")
                              , n = Object(o.getRouteToPath)("ebook", e);
                            return {
                                canonical: "".concat(s).concat(n),
                                title: a,
                                description: a,
                                openGraph: {
                                    title: a,
                                    type: l.article,
                                    url: "".concat(s).concat(n),
                                    description: a
                                }
                            }
                        }(t);
                    case "ebooklist":
                        return function(e) {
                            var t = e.title
                              , a = e.description
                              , n = "".concat(t, " - Il Sole 24 ORE")
                              , i = Object(o.getRouteToPath)("ebooklist", e);
                            return {
                                canonical: "".concat(s).concat(i),
                                title: n,
                                description: a,
                                openGraph: {
                                    title: n,
                                    description: a,
                                    type: l.article,
                                    url: "".concat(s).concat(i)
                                }
                            }
                        }(t);
                    case "radiocor":
                        return function(e) {
                            var t = e.taxonomyInfo
                              , a = t.title
                              , n = t.description
                              , i = "".concat(a, " - Il Sole 24 ORE")
                              , r = Object(o.getRouteToPath)("radiocor", e);
                            return {
                                canonical: "".concat(s).concat(r),
                                title: i,
                                description: n,
                                openGraph: {
                                    title: i,
                                    description: n,
                                    type: l.website,
                                    url: "".concat(s).concat(r)
                                }
                            }
                        }(t);
                    case "fogliaradiocor":
                        return function(e) {
                            var t = e.title
                              , a = e.description
                              , n = e.images
                              , i = a.replace(/<(.|\n)*?>/g, "").substring(0, 150).concat("...")
                              , r = "".concat(t, " - Il Sole 24 ORE")
                              , c = Object(o.getRouteToPath)("fogliaradiocor", e);
                            return {
                                canonical: "".concat(s).concat(c),
                                title: r,
                                description: i,
                                openGraph: {
                                    title: r,
                                    description: i,
                                    type: l.article,
                                    url: "".concat(s).concat(c),
                                    images: n,
                                    article: {
                                        section: "Economia"
                                    }
                                },
                                twitter: {
                                    handle: "@sole24ore",
                                    cardType: "summary_large_image"
                                }
                            }
                        }(t);
                    case "errore":
                        return {
                            title: "Errore",
                            description: "Si è verificato un errore"
                        };
                    default:
                        return {}
                    }
                return {}
            }
            function m(t, n) {
                return function(t) {
                    var n = t || {}
                      , o = n.title
                      , c = void 0 === o ? "" : o
                      , s = n.description
                      , l = void 0 === s ? "" : s
                      , u = Object(r.a)(n, ["title", "description"])
                      , m = t.openGraph || {}
                      , d = m.title
                      , p = m.description
                      , h = Object(r.a)(m, ["title", "description"])
                      , f = e.document ? a("PtJn").default : a("nOYO").decode
                      , v = Object(i.a)({}, u, {
                        title: f(c),
                        description: f(l || "")
                    });
                    return t.openGraph && (v.openGraph = Object(i.a)({}, h, {
                        title: f(d),
                        description: f(p || "")
                    })),
                    v
                }(u(t, n))
            }
        }
        ).call(this, a("yLpj"))
    },
    Z0cm: function(e, t) {
        var a = Array.isArray;
        e.exports = a
    },
    Z8oC: function(e, t, a) {
        var n = a("y1pI");
        e.exports = function(e, t) {
            var a = this.__data__
              , i = n(a, e);
            return i < 0 ? (++this.size,
            a.push([e, t])) : a[i][1] = t,
            this
        }
    },
    ZA9o: function(e, t, a) {
        "use strict";
        a.r(t),
        a.d(t, "default", function() {
            return I
        });
        var n = a("zrwo")
          , i = a("doui")
          , r = a("9Jkg")
          , o = a.n(r)
          , c = a("q1tI")
          , s = a.n(c)
          , l = a("t8Fj")
          , u = a.n(l)
          , m = a("cw6n")
          , d = a("hWJk")
          , p = a("Cs30")
          , h = a("ecV5")
          , f = a("4aqO")
          , v = a("/Bct")
          , b = a("aPx5")
          , g = a("tnMW")
          , E = a("5tas")
          , y = a("UHJ7")
          , k = a("4Pxe")
          , N = a("0Ops")
          , w = a("smdI")
          , O = a("4WT4")
          , S = a("InxH")
          , j = a("2L0F");
        function I(e) {
            var t = e.withFooter
              , a = e.withHeader
              , n = e.error
              , i = (n = void 0 === n ? {
                statusCode: 404
            } : n).statusCode
              , r = e.sections
              , l = e.hottrends
              , u = e.hamburger
              , m = e.device
              , d = e.eco
              , p = Object(c.useContext)(j.a).appData.isWebview;
            return s.a.createElement(s.a.Fragment, null, a ? s.a.createElement(T, {
                device: m,
                sections: r,
                hamburger: u,
                hotTopics: l,
                eco: d,
                isWebview: p
            }) : null, s.a.createElement("div", {
                className: "main-content"
            }, s.a.createElement("div", {
                className: "errorpage"
            }, s.a.createElement("div", {
                className: "container"
            }, s.a.createElement("h1", {
                className: "errorpage-title"
            }, i), s.a.createElement("h2", {
                className: "errorpage-subtitle"
            }, "Qualcosa è andato storto"), s.a.createElement("p", {
                className: "errorpage-text"
            }, "Non troviamo la pagina che stai cercando"), s.a.createElement("form", {
                action: Object(O.kb)(),
                methode: "get",
                acceptCharset: "ISO-8859-1"
            }, s.a.createElement("input", {
                type: "hidden",
                name: "cmd",
                value: "static"
            }), s.a.createElement("input", {
                type: "hidden",
                name: "chId",
                value: "30"
            }), s.a.createElement("input", {
                type: "hidden",
                name: "path",
                value: "/search/search_engine.jsp"
            }), s.a.createElement("input", {
                type: "hidden",
                name: "field",
                value: "Titolo|Testo"
            }), s.a.createElement("input", {
                type: "hidden",
                name: "orderBy",
                value: "score desc"
            }), s.a.createElement("input", {
                type: "hidden",
                name: "chId",
                value: "30"
            }), s.a.createElement("div", {
                className: "search-input"
            }, s.a.createElement("input", {
                className: "input",
                type: "text",
                name: "keyWords",
                placeholder: "Cerca"
            }), s.a.createElement("button", {
                className: "search-input-submit",
                type: "submit",
                name: "button"
            }, s.a.createElement("span", {
                className: "icon icon-search"
            })))), s.a.createElement("p", {
                className: "errorpage-goto"
            }, s.a.createElement("span", {
                className: "meta-part"
            }, "Vai a:"), s.a.createElement(N.Link, {
                route: "/"
            }, s.a.createElement("a", {
                className: "meta-part blue"
            }, "Homepage")), s.a.createElement("a", {
                className: "meta-part blue",
                href: "https://mercati.ilsole24ore.com"
            }, "Mercati"), s.a.createElement("a", {
                className: "meta-part blue",
                href: "http://my24areautente.ilsole24ore.com/my24/web/guest/guestnewsletter;jsessionid=SSEC2im2s4WxnGsO1xmnGXud"
            }, "Newsletter")), s.a.createElement("pre", {
                style: {
                    display: "none"
                }
            }, o()(e, null, 2))))), t ? s.a.createElement(y.a, null) : null)
        }
        function x(e) {
            var t = e.sections
              , a = e.hotTopics
              , n = e.device
              , i = e.showMenu
              , r = e.setShowMenu
              , o = e.searchModalVisibility
              , c = e.setSearchModalVisibility
              , l = e.loginModalVisibility
              , u = e.setLoginModalVisibility
              , h = e.isWebview
              , f = !(a && 0 !== a.length)
              , v = t || {}
              , y = "mobile" === n
              , j = function(e) {
                e.preventDefault(),
                r(!i),
                Object(S.a)({
                    link_id: "strumenti navigazione",
                    event_type: "pulsante naviga"
                })
            }
              , I = function(e) {
                e.preventDefault(),
                u(!l),
                Object(S.a)({
                    link_id: "login",
                    event_type: "login"
                }),
                Object(O.Ib)()
            };
            return s.a.createElement("div", {
                className: "main-header",
                id: "header"
            }, s.a.createElement("div", {
                className: "htop"
            }, s.a.createElement("div", {
                className: "container"
            }, s.a.createElement("div", {
                className: "htop-title"
            }, s.a.createElement("div", {
                className: "habs-left"
            }, s.a.createElement(s.a.Fragment, null, y ? null : s.a.createElement(E.a, {
                classes: "hlogo d-none d-lg-block",
                slot: "Manchette_1"
            }), s.a.createElement(d.b, {
                clickSetShowMenu: j,
                bigIcons: !0,
                mobileOnly: !0
            }))), s.a.createElement("div", {
                className: "htop-center htop-center--page"
            }, s.a.createElement(N.Link, {
                route: "homepage"
            }, s.a.createElement("a", {
                className: "hlogo hlogo--main",
                href: "/"
            }, s.a.createElement("img", {
                src: "/static/images/ilsole24ore.svg",
                alt: "Il Sole 24 Ore"
            })))), y ? null : s.a.createElement("div", {
                className: "habs-right-lg d-none d-md-block"
            }, s.a.createElement("a", {
                className: "hlogo hlogo--radio24 habs-left-mdo",
                href: "http://www.radio24.ilsole24ore.com/"
            }, s.a.createElement("img", {
                src: "/static/img/radio24.png",
                alt: "Radio24"
            })), s.a.createElement("a", {
                className: "hlogo hlogo--business24 habs-right-mdo",
                href: "http://24o.it/Daw9sn"
            }, s.a.createElement("img", {
                src: "/static/images/24ore-professionale.svg",
                alt: "Business24"
            }))), s.a.createElement(b.a, {
                key: "user-logged",
                currentUrl: void 0,
                mobile: !0,
                NotLoggedChild: function() {
                    return s.a.createElement(g.a, {
                        handler: I
                    }, s.a.createElement("a", {
                        key: "user-not-logged-mobile-1",
                        className: "hlink hlink--icon-big habs-right d-md-none"
                    }, s.a.createElement("span", {
                        className: "icon icon-user"
                    })))
                }
            })), s.a.createElement("div", {
                className: "htop-wrap d-none d-md-flex"
            }, s.a.createElement("div", {
                className: "htoday halign-left"
            }, s.a.createElement(k.a, {
                plain: !0,
                format: "dddd D MMMM YYYY",
                value: (new Date).toISOString()
            })), s.a.createElement("div", {
                className: "halign-center d-none d-lg-block"
            }, v.length > 0 ? s.a.createElement(p.b, {
                key: "navigation-has-nav",
                items: v,
                maxVisibleItems: 7
            }) : null), s.a.createElement("div", {
                className: "halign-right"
            }, s.a.createElement("ul", {
                key: "offerte",
                className: "nav-inline"
            }, s.a.createElement("li", {
                className: "nav-inline-item nav-inline-item--brd"
            }, s.a.createElement("a", {
                className: "hcta",
                href: "https://www.quotidiano.ilsole24ore.com",
                target: "_blank"
            }, "Sfoglia il giornale")), s.a.createElement("li", {
                className: "nav-inline-item"
            }, h && h.ios && s.a.createElement("a", {
                className: "hcta",
                href: w.b
            }, s.a.createElement("strong", null, "ABBONATI")) || s.a.createElement("a", {
                className: "hcta",
                href: w.c
            }, s.a.createElement("strong", null, "ABBONATI"), " ", Object(O.R)()))))))), s.a.createElement("div", {
                className: "hbtm d-none d-md-block"
            }, s.a.createElement("div", {
                className: "container"
            }, s.a.createElement("div", {
                className: "hbtm-wrap"
            }, s.a.createElement(p.b, {
                key: "navigation-hbtm",
                navIcon: !0,
                title: f ? "" : "Temi Caldi",
                topic: !0,
                items: a,
                maxVisibleItems: 5,
                setSearchModalVisibility: c,
                searchModalVisibility: o,
                clickSetShowMenu: j
            }), s.a.createElement("div", {
                className: "halign-right"
            }, s.a.createElement(m.a, {
                key: "tools-halign",
                social: !0,
                headerUserTools: !0,
                setLoginModalVisibility: u,
                loginModalVisibility: l
            }))))))
        }
        function T(e) {
            var t = e.hamburger
              , a = e.device
              , r = e.eco
              , o = "mobile" === a
              , l = Object(c.useState)(!1)
              , m = Object(i.default)(l, 2)
              , d = m[0]
              , p = m[1]
              , b = Object(c.useState)(!1)
              , g = Object(i.default)(b, 1)[0]
              , E = Object(c.useState)(!1)
              , y = Object(i.default)(E, 2)
              , k = y[0]
              , N = y[1]
              , w = Object(c.useState)(!1)
              , O = Object(i.default)(w, 2)
              , S = O[0]
              , j = O[1];
            var I = Object(n.a)({}, e, {
                showMenu: d,
                setShowMenu: p,
                searchModalVisibility: k,
                setSearchModalVisibility: N,
                loginModalVisibility: S,
                setLoginModalVisibility: j
            });
            return s.a.createElement(s.a.Fragment, null, r ? null : s.a.createElement(v.a, {
                key: "side-menu",
                showMenu: d,
                clickSideMenu: function() {
                    return p(!d)
                },
                listMenu: t,
                device: a
            }), o ? s.a.createElement(u.a, {
                key: "sticky-header",
                enabled: !0,
                top: 0,
                onStateChange: function(e) {
                    e.status === u.a.STATUS_FIXED && g(!0),
                    e.status === u.a.STATUS_ORIGINAL && g(!1)
                },
                enableTransforms: !1,
                bottomBoundary: "body",
                innerZ: 1020
            }, s.a.createElement(x, I)) : s.a.createElement(x, I), s.a.createElement(h.c, {
                key: "search-modal",
                searchModalVisibility: k,
                setSearchModalVisibility: N
            }), s.a.createElement(f.a, {
                key: "login-modal",
                loginModalVisibility: S,
                setLoginModalVisibility: j
            }))
        }
    },
    aPx5: function(e, t, a) {
        "use strict";
        a.d(t, "a", function() {
            return l
        });
        a("9VmF");
        var n = a("doui")
          , i = a("q1tI")
          , r = a.n(i)
          , o = a("NUs0")
          , c = a("4WT4")
          , s = a("2L0F");
        function l(e) {
            var t = e.currentUrl
              , a = e.mobile
              , l = e.NotLoggedChild
              , u = e.headerPodcast
              , m = Object(i.useContext)(s.a).appData.isWebview;
            if (m && m.ios)
                return null;
            var d = Object(i.useState)(!1)
              , p = Object(n.default)(d, 2)
              , h = p[0]
              , f = p[1]
              , v = Object(i.useContext)(o.b)
              , b = v.logged
              , g = Object(i.useRef)()
              , E = function(e) {
                e.preventDefault(),
                f(!h)
            }
              , y = function(e) {
                g.current && !g.current.contains(e.target) && f(!1)
            };
            Object(i.useEffect)(function() {
                return document.addEventListener("click", y, {
                    passive: !0,
                    capture: !1
                }),
                function() {
                    document.removeEventListener("click", y, {
                        passive: !0,
                        capture: !1
                    })
                }
            }, [b]);
            var k = v || {}
              , N = k.shortname
              , w = k.fullname
              , O = t || Object(c.N)()
              , S = "".concat(Object(c.J)(), "/du/authfiles/logoff.aspx?RURL=").concat(O.startsWith("http") ? O : "".concat(Object(c.N)()).concat(O));
            return b ? r.a.createElement("div", {
                className: "hicon dropdown ".concat(h ? "show" : "", " ").concat(a ? "d-md-none abs-mr" : ""),
                ref: g
            }, u ? r.a.createElement("button", {
                type: "button",
                className: "ibtn",
                onClick: E,
                title: w,
                "data-toggle": "dropdown",
                "aria-expanded": h ? "true" : "false"
            }, r.a.createElement("span", {
                className: "icon icon-user-logged-mono"
            })) : r.a.createElement("a", {
                key: "link-logged",
                className: "hicon-link",
                onClick: E,
                href: "#",
                title: w,
                "data-toggle": "dropdown",
                "aria-expanded": h ? "true" : "false"
            }, r.a.createElement("span", {
                key: "label-logged",
                className: "hicon-label"
            }, N), r.a.createElement("span", {
                key: "icon-user-logged",
                className: "icon icon--multi icon-user-logged"
            }, r.a.createElement("span", {
                key: "path1",
                className: "path1"
            }), r.a.createElement("span", {
                key: "path2",
                className: "path2"
            }))), r.a.createElement("div", {
                className: "dropdown-menu dropdown-menu-right dropdown-menu--bubble ".concat(h ? "show" : "")
            }, r.a.createElement("p", {
                className: "hicon-fullname"
            }, w), r.a.createElement("ul", {
                className: "list-lined"
            }, r.a.createElement("li", {
                className: "list-lined-item"
            }, r.a.createElement("a", {
                className: "link-icon link-icon--big",
                href: "https://areautente.ilsole24ore.com/#home"
            }, r.a.createElement("span", {
                className: "icon icon-my-products"
            }), "I miei prodotti")), r.a.createElement("li", {
                className: "list-lined-item"
            }, r.a.createElement("a", {
                className: "link-icon link-icon--big",
                href: "https://areautente.ilsole24ore.com/#profilo"
            }, r.a.createElement("span", {
                className: "icon icon-user"
            }), "Il mio profilo")), r.a.createElement("li", {
                className: "list-lined-item"
            }, r.a.createElement("a", {
                className: "link-icon link-icon--big",
                href: "https://areautente.ilsole24ore.com/#archivio"
            }, r.a.createElement("span", {
                className: "icon icon-my-archive"
            }), "Il mio archivio")), r.a.createElement("li", {
                className: "list-lined-item"
            }, r.a.createElement("a", {
                className: "link-icon link-icon--big",
                href: "https://areautente.ilsole24ore.com/#newsletter"
            }, r.a.createElement("span", {
                className: "icon icon-my-newsletter"
            }), "Newsletter & Alert"))), r.a.createElement("div", {
                className: "dropdown-menu-foot"
            }, r.a.createElement("a", {
                className: "btn btn--blue",
                href: S
            }, "Logout")))) : r.a.createElement(l, null) || null
        }
    },
    abTZ: function(e, t, a) {
        "use strict";
        a.d(t, "b", function() {
            return d
        }),
        a.d(t, "a", function() {
            return p
        });
        var n = a("doui")
          , i = a("q1tI")
          , r = a.n(i)
          , o = a("UgXd")
          , c = a.n(o)
          , s = a("5tas")
          , l = a("4WT4")
          , u = c()(function() {
            return Promise.resolve().then(a.t.bind(null, "t8Fj", 7))
        }, {
            ssr: !1,
            loadableGenerated: {
                webpack: function() {
                    return ["t8Fj"]
                },
                modules: ["react-stickynode"]
            }
        })
          , m = !1;
        function d() {
            m = !1
        }
        function p(e) {
            var t = e.slot
              , a = e.device
              , o = "MaxTicker" === t ? "abox d-lg-block no-border shrinkable" : "abox d-lg-block no-border";
            if ("MaxTicker1" === t)
                return r.a.createElement(s.a, {
                    slot: t,
                    classes: o
                });
            var c = Object(i.useState)(0)
              , d = Object(n.default)(c, 2)
              , p = d[0]
              , h = d[1]
              , f = Object(i.useState)(!1)
              , v = Object(n.default)(f, 2)
              , b = v[0]
              , g = v[1]
              , E = Object(i.useState)(2)
              , y = Object(n.default)(E, 2)
              , k = y[0]
              , N = y[1];
            function w() {
                m || b || !document.body.classList.contains("is-scrolled") || (m = !0,
                g(!0),
                N(1e3),
                setTimeout(function() {
                    g(!1),
                    N(2)
                }, 2e3))
            }
            Object(i.useEffect)(function() {
                document.addEventListener("scroll", w, {
                    passive: !0
                });
                var e = Object(l.qb)(0);
                return h(e),
                function() {
                    document.removeEventListener("scroll", w, {
                        passive: !0
                    })
                }
            }, [w]);
            var O = r.a.createElement("div", {
                className: "background-adv shrinkable",
                style: "mobile" === a ? {
                    minHeight: 120
                } : {}
            }, r.a.createElement(u, {
                enabled: b,
                innerZ: k,
                top: p,
                innerClass: "sticky-masthead"
            }, r.a.createElement("div", {
                className: "sticky-item"
            }, r.a.createElement(s.a, {
                slot: t,
                classes: o
            }))));
            return "mobile" === a ? r.a.createElement("div", {
                className: "container"
            }, O) : O
        }
        p.defaultProps = {
            slot: "MaxTicker1"
        }
    },
    adU4: function(e, t, a) {
        var n = a("y1pI")
          , i = Array.prototype.splice;
        e.exports = function(e) {
            var t = this.__data__
              , a = n(t, e);
            return !(a < 0 || (a == t.length - 1 ? t.pop() : i.call(t, a, 1),
            --this.size,
            0))
        }
    },
    b2z7: function(e, t) {
        var a = /\w*$/;
        e.exports = function(e) {
            var t = new e.constructor(e.source,a.exec(e));
            return t.lastIndex = e.lastIndex,
            t
        }
    },
    b80T: function(e, t, a) {
        var n = a("UNi/")
          , i = a("03A+")
          , r = a("Z0cm")
          , o = a("DSRE")
          , c = a("wJg7")
          , s = a("c6wG")
          , l = Object.prototype.hasOwnProperty;
        e.exports = function(e, t) {
            var a = r(e)
              , u = !a && i(e)
              , m = !a && !u && o(e)
              , d = !a && !u && !m && s(e)
              , p = a || u || m || d
              , h = p ? n(e.length, String) : []
              , f = h.length;
            for (var v in e)
                !t && !l.call(e, v) || p && ("length" == v || m && ("offset" == v || "parent" == v) || d && ("buffer" == v || "byteLength" == v || "byteOffset" == v) || c(v, f)) || h.push(v);
            return h
        }
    },
    bQgK: function(e, t, a) {
        (function(t) {
            (function() {
                var a, n, i, r, o, c;
                "undefined" != typeof performance && null !== performance && performance.now ? e.exports = function() {
                    return performance.now()
                }
                : null != t && t.hrtime ? (e.exports = function() {
                    return (a() - o) / 1e6
                }
                ,
                n = t.hrtime,
                r = (a = function() {
                    var e;
                    return 1e9 * (e = n())[0] + e[1]
                }
                )(),
                c = 1e9 * t.uptime(),
                o = r - c) : Date.now ? (e.exports = function() {
                    return Date.now() - i
                }
                ,
                i = Date.now()) : (e.exports = function() {
                    return (new Date).getTime() - i
                }
                ,
                i = (new Date).getTime())
            }
            ).call(this)
        }
        ).call(this, a("8oxB"))
    },
    bVZc: function(e, t, a) {
        "use strict";
        (function(e) {
            function a(e, t) {
                for (var a = 0; a < t.length; a++) {
                    var n = t[a];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.default = void 0;
            var n = e.env && !0
              , i = function(e) {
                return "[object String]" === Object.prototype.toString.call(e)
            }
              , r = function() {
                function e() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                      , a = t.name
                      , r = void 0 === a ? "stylesheet" : a
                      , c = t.optimizeForSpeed
                      , s = void 0 === c ? n : c
                      , l = t.isBrowser
                      , u = void 0 === l ? "undefined" != typeof window : l;
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    o(i(r), "`name` must be a string"),
                    this._name = r,
                    this._deletedRulePlaceholder = "#".concat(r, "-deleted-rule____{}"),
                    o("boolean" == typeof s, "`optimizeForSpeed` must be a boolean"),
                    this._optimizeForSpeed = s,
                    this._isBrowser = u,
                    this._serverSheet = void 0,
                    this._tags = [],
                    this._injected = !1,
                    this._rulesCount = 0;
                    var m = this._isBrowser && document.querySelector('meta[property="csp-nonce"]');
                    this._nonce = m ? m.getAttribute("content") : null
                }
                var t, r, c;
                return t = e,
                (r = [{
                    key: "setOptimizeForSpeed",
                    value: function(e) {
                        o("boolean" == typeof e, "`setOptimizeForSpeed` accepts a boolean"),
                        o(0 === this._rulesCount, "optimizeForSpeed cannot be when rules have already been inserted"),
                        this.flush(),
                        this._optimizeForSpeed = e,
                        this.inject()
                    }
                }, {
                    key: "isOptimizeForSpeed",
                    value: function() {
                        return this._optimizeForSpeed
                    }
                }, {
                    key: "inject",
                    value: function() {
                        var e = this;
                        if (o(!this._injected, "sheet already injected"),
                        this._injected = !0,
                        this._isBrowser && this._optimizeForSpeed)
                            return this._tags[0] = this.makeStyleTag(this._name),
                            this._optimizeForSpeed = "insertRule"in this.getSheet(),
                            void (this._optimizeForSpeed || (n || console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),
                            this.flush(),
                            this._injected = !0));
                        this._serverSheet = {
                            cssRules: [],
                            insertRule: function(t, a) {
                                return "number" == typeof a ? e._serverSheet.cssRules[a] = {
                                    cssText: t
                                } : e._serverSheet.cssRules.push({
                                    cssText: t
                                }),
                                a
                            },
                            deleteRule: function(t) {
                                e._serverSheet.cssRules[t] = null
                            }
                        }
                    }
                }, {
                    key: "getSheetForTag",
                    value: function(e) {
                        if (e.sheet)
                            return e.sheet;
                        for (var t = 0; t < document.styleSheets.length; t++)
                            if (document.styleSheets[t].ownerNode === e)
                                return document.styleSheets[t]
                    }
                }, {
                    key: "getSheet",
                    value: function() {
                        return this.getSheetForTag(this._tags[this._tags.length - 1])
                    }
                }, {
                    key: "insertRule",
                    value: function(e, t) {
                        if (o(i(e), "`insertRule` accepts only strings"),
                        !this._isBrowser)
                            return "number" != typeof t && (t = this._serverSheet.cssRules.length),
                            this._serverSheet.insertRule(e, t),
                            this._rulesCount++;
                        if (this._optimizeForSpeed) {
                            var a = this.getSheet();
                            "number" != typeof t && (t = a.cssRules.length);
                            try {
                                a.insertRule(e, t)
                            } catch (c) {
                                return n || console.warn("StyleSheet: illegal rule: \n\n".concat(e, "\n\nSee https://stackoverflow.com/q/20007992 for more info")),
                                -1
                            }
                        } else {
                            var r = this._tags[t];
                            this._tags.push(this.makeStyleTag(this._name, e, r))
                        }
                        return this._rulesCount++
                    }
                }, {
                    key: "replaceRule",
                    value: function(e, t) {
                        if (this._optimizeForSpeed || !this._isBrowser) {
                            var a = this._isBrowser ? this.getSheet() : this._serverSheet;
                            if (t.trim() || (t = this._deletedRulePlaceholder),
                            !a.cssRules[e])
                                return e;
                            a.deleteRule(e);
                            try {
                                a.insertRule(t, e)
                            } catch (r) {
                                n || console.warn("StyleSheet: illegal rule: \n\n".concat(t, "\n\nSee https://stackoverflow.com/q/20007992 for more info")),
                                a.insertRule(this._deletedRulePlaceholder, e)
                            }
                        } else {
                            var i = this._tags[e];
                            o(i, "old rule at index `".concat(e, "` not found")),
                            i.textContent = t
                        }
                        return e
                    }
                }, {
                    key: "deleteRule",
                    value: function(e) {
                        if (this._isBrowser)
                            if (this._optimizeForSpeed)
                                this.replaceRule(e, "");
                            else {
                                var t = this._tags[e];
                                o(t, "rule at index `".concat(e, "` not found")),
                                t.parentNode.removeChild(t),
                                this._tags[e] = null
                            }
                        else
                            this._serverSheet.deleteRule(e)
                    }
                }, {
                    key: "flush",
                    value: function() {
                        this._injected = !1,
                        this._rulesCount = 0,
                        this._isBrowser ? (this._tags.forEach(function(e) {
                            return e && e.parentNode.removeChild(e)
                        }),
                        this._tags = []) : this._serverSheet.cssRules = []
                    }
                }, {
                    key: "cssRules",
                    value: function() {
                        var e = this;
                        return this._isBrowser ? this._tags.reduce(function(t, a) {
                            return a ? t = t.concat(e.getSheetForTag(a).cssRules.map(function(t) {
                                return t.cssText === e._deletedRulePlaceholder ? null : t
                            })) : t.push(null),
                            t
                        }, []) : this._serverSheet.cssRules
                    }
                }, {
                    key: "makeStyleTag",
                    value: function(e, t, a) {
                        t && o(i(t), "makeStyleTag acceps only strings as second parameter");
                        var n = document.createElement("style");
                        this._nonce && n.setAttribute("nonce", this._nonce),
                        n.type = "text/css",
                        n.setAttribute("data-".concat(e), ""),
                        t && n.appendChild(document.createTextNode(t));
                        var r = document.head || document.getElementsByTagName("head")[0];
                        return a ? r.insertBefore(n, a) : r.appendChild(n),
                        n
                    }
                }, {
                    key: "length",
                    get: function() {
                        return this._rulesCount
                    }
                }]) && a(t.prototype, r),
                c && a(t, c),
                e
            }();
            function o(e, t) {
                if (!e)
                    throw new Error("StyleSheet: ".concat(t, "."))
            }
            t.default = r
        }
        ).call(this, a("8oxB"))
    },
    c6wG: function(e, t, a) {
        var n = a("dD9F")
          , i = a("sEf8")
          , r = a("mdPL")
          , o = r && r.isTypedArray
          , c = o ? i(o) : n;
        e.exports = c
    },
    cS44: function(e, t, a) {
        "use strict";
        a.d(t, "a", function() {
            return s
        });
        var n = a("doui")
          , i = a("q1tI")
          , r = a.n(i)
          , o = a("nOHt")
          , c = a.n(o);
        function s(e) {
            var t = e.setLoader
              , a = Object(i.useState)(t || !1)
              , o = Object(n.default)(a, 2)
              , s = o[0]
              , l = o[1]
              , u = function() {
                return l(!0)
            }
              , m = function() {
                return l(!1)
            };
            if (Object(i.useEffect)(function() {
                return c.a.events.on("routeChangeStart", u),
                c.a.events.on("routeChangeComplete", m),
                function() {
                    c.a.events.off("routeChangeStart", u),
                    c.a.events.off("routeChangeComplete", m)
                }
            }, []),
            !s)
                return null;
            var d = {
                display: s ? "" : "none"
            };
            return r.a.createElement("div", {
                className: "loader-wrapper loader-wrapper--overlay loader-container",
                style: d
            }, r.a.createElement("div", {
                className: "loader"
            }, r.a.createElement("span", {
                className: "loader-circle-out"
            }), r.a.createElement("span", {
                className: "loader-circle-in"
            }), r.a.createElement("span", {
                className: "loader-icons"
            }, r.a.createElement("span", {
                className: "icon icon-24 icon--one"
            }), r.a.createElement("span", {
                className: "icon icon-24 icon--two"
            }))))
        }
    },
    cvCv: function(e, t) {
        e.exports = function(e) {
            return function() {
                return e
            }
        }
    },
    cw6n: function(e, t, a) {
        "use strict";
        var n = a("q1tI")
          , i = a.n(n)
          , r = a("2L0F")
          , o = (a("9VmF"),
        a("tUrg"),
        a("QeGq"))
          , c = a("kKrJ")
          , s = a("QWVi")
          , l = a("doui");
        function u(e) {
            var t = e.hasLabel
              , a = void 0 !== t && t
              , r = e.hasMoreActions
              , c = void 0 !== r && r
              , u = e.withMainSocial
              , m = void 0 !== u && u
              , d = e.reverse
              , p = void 0 !== d && d
              , h = e.icon
              , f = void 0 === h ? "more" : h
              , v = e.isBig
              , b = void 0 !== v && v
              , g = e.circle
              , E = void 0 !== g && g
              , y = e.shareUrl
              , k = void 0 === y ? "" : y
              , N = e.shareText
              , w = void 0 === N ? "" : N
              , O = e.dropup
              , S = void 0 !== O && O
              , j = e.uniqueKey
              , I = e.isWebview
              , x = Object(n.useState)(!1)
              , T = Object(l.default)(x, 2)
              , _ = T[0]
              , M = T[1]
              , L = Object(n.useRef)()
              , R = function(e) {
                L.current && !L.current.contains(e.target) && M(!1)
            };
            return Object(n.useEffect)(function() {
                return document.addEventListener("click", R, {
                    passive: !0,
                    capture: !1
                }),
                function() {
                    document.removeEventListener("click", R, {
                        passive: !0,
                        capture: !1
                    })
                }
            }, []),
            i.a.createElement("li", {
                key: "the-real-dropdown",
                className: "list-inline-item dropdown ".concat(_ ? "show" : ""),
                ref: L
            }, i.a.createElement("a", {
                className: "ltool ".concat(!0 === E ? " ltool--circle ltool--more" : "", " "),
                onClick: function(e) {
                    e.preventDefault(),
                    M(!_)
                },
                href: "#",
                role: "button",
                "data-toggle": "dropdown",
                "data-display": "static"
            }, i.a.createElement("span", {
                className: "icon ".concat(b ? "icon--big" : "", " icon-").concat(f)
            })), _ ? i.a.createElement("div", {
                key: "the-dropdown-social",
                className: "dropdown-menu ".concat(!0 === p ? "dropdown-menu-right" : "", " dropdown-menu--bubble ").concat(_ ? "show" : "", " ").concat(S ? "dropup" : "")
            }, i.a.createElement("div", {
                key: "social-circle",
                className: "ltool-block"
            }, !0 === a ? i.a.createElement("span", {
                className: "ltool-label"
            }, "Condividi") : null, !0 === m ? i.a.createElement(i.a.Fragment, null, i.a.createElement(s.a, {
                key: "social-fb-".concat(j),
                type: "fb",
                icon: "facebook",
                shareUrl: k,
                shareText: w,
                isWebview: I,
                circle: !0
            }), i.a.createElement(s.a, {
                key: "social-tw-".concat(j),
                type: "tw",
                icon: "twitter",
                shareUrl: k,
                shareText: w,
                isWebview: I,
                circle: !0
            }), i.a.createElement(s.a, {
                key: "social-in-".concat(j),
                type: "in",
                icon: "linkedin",
                shareUrl: k,
                shareText: w,
                isWebview: I,
                circle: !0
            }), I && I.generic ? null : i.a.createElement(s.a, {
                key: "social-mail-".concat(j),
                type: "mail",
                icon: "mail",
                shareUrl: k,
                shareText: w,
                isWebview: I,
                clearItem: !0,
                circle: !0
            }), i.a.createElement("br", null), i.a.createElement(s.a, {
                key: "social-wa-".concat(j),
                type: "wa",
                icon: "whatsapp",
                shareUrl: k,
                shareText: w,
                isWebview: I,
                circle: !0
            })) : i.a.createElement(i.a.Fragment, null, i.a.createElement(s.a, {
                key: "social-wa-".concat(j),
                circle: !0,
                type: "wa",
                icon: "whatsapp",
                shareUrl: k,
                shareText: w,
                isWebview: I
            }), I && I.generic ? null : i.a.createElement(s.a, {
                key: "social-ml-".concat(j),
                circle: !0,
                clearItem: !0,
                type: "mail",
                icon: "mail",
                shareUrl: k,
                shareText: w,
                isWebview: I
            }))), !0 === c ? i.a.createElement("div", {
                key: "the-ltool-block",
                className: "ltool-block"
            }, i.a.createElement("span", {
                className: "ltool-label"
            }, "Altre azioni"), i.a.createElement(o.a, {
                key: "saveArticle-3-".concat(j),
                icon: "save-small",
                type: "shareaction",
                shareUrl: k,
                shareText: w
            }), i.a.createElement(s.a, {
                key: "social-print-".concat(j),
                circle: !0,
                clearItem: !0,
                icon: "print-small",
                type: "print",
                shareUrl: k,
                shareText: w,
                isWebview: I
            })) : null) : null)
        }
        var m = a("8H2i")
          , d = a("tnMW")
          , p = a("aPx5")
          , h = a("4WT4")
          , f = a("smdI")
          , v = a("0Ops")
          , b = a("InxH")
          , g = Object(h.Q)();
        function E(e) {
            var t, a, n, r = e.social, l = e.share, E = e.shareText, y = e.shareUrl, k = e.article, N = e.radio, w = e.saveAndComment, O = e.headerUserTools, S = e.subscribe, j = e.articlePreview, I = e.noActions, x = e.commentsNumber, T = e.dropdownReverse, _ = e.hasMoreActions, M = e.shareActionsHasLabel, L = e.commentSavedLabel, R = e.setLoginModalVisibility, C = e.loginModalVisibility, P = e.noCommentNumber, A = e.uniqueKey, F = e.dropup, z = e.noBookmark, V = e.vertical, D = e.socialOutline, q = e.socialNoStyle, B = e.lockedPaywall, U = e.isWebview, W = e.header2021;
            if (k) {
                if (t = k.title,
                a = k.url,
                n = k.type,
                t) {
                    var G = t
                      , H = G.leafTitle
                      , K = G.leadTitle;
                    if (H)
                        t = H;
                    else if (K && K.length > 0) {
                        t = K[0].text
                    }
                }
                a || (a = k.link),
                a = !a && k.type ? Object(v.getRouteToPath)(Object(v.getRouteForContent)("auto", {
                    type: n
                }), k) : a
            }
            var X = y || a || ("undefined" != typeof document ? document.location.href : "");
            X = X.startsWith("http") ? X : "".concat(Object(h.N)()).concat(X);
            var Y = E || t || ("undefined" != typeof document ? document.title : "");
            return i.a.createElement(i.a.Fragment, null, !0 === r ? i.a.createElement(i.a.Fragment, null, i.a.createElement(s.a, {
                key: "fb-social-".concat(A),
                type: "fb",
                inList: !0,
                outline: !0,
                small: !0,
                nostyle: !0,
                icon: "facebook",
                isWebview: U
            }), i.a.createElement(s.a, {
                key: "tw-social-".concat(A),
                type: "tw",
                inList: !0,
                outline: !0,
                small: !0,
                nostyle: !0,
                icon: "twitter",
                isWebview: U
            }), i.a.createElement(s.a, {
                key: "lnk-social-".concat(A),
                type: "in",
                inList: !0,
                outline: !0,
                small: !0,
                nostyle: !0,
                icon: "linkedin",
                isWebview: U
            })) : null, O && i.a.createElement(m.a, {
                header: !W,
                header2021: W
            }), S && O ? i.a.createElement("li", {
                key: "subscribeHeaderUserTools",
                className: W ? "hnav-item" : "list-inline-item"
            }, i.a.createElement("a", {
                className: W ? "hlink hlink--sub" : "hsubscribe",
                href: U && U.ios ? f.b : g
            }, "Abbonati")) : null, O ? i.a.createElement("li", {
                key: "headerUserTools-profile",
                className: W ? "hnav-item" : "list-inline-item"
            }, i.a.createElement(p.a, {
                key: "user-logged-desktop",
                currentUrl: X,
                NotLoggedChild: function() {
                    return i.a.createElement("div", {
                        className: "hicon"
                    }, i.a.createElement(d.a, {
                        handler: function(e) {
                            e.preventDefault(),
                            R(!C),
                            Object(b.a)({
                                link_id: "login",
                                event_type: "login"
                            }),
                            Object(h.Ib)()
                        }
                    }, i.a.createElement("a", {
                        key: "user-not-logged",
                        className: "hicon-link",
                        href: "",
                        id: "modal-login-trigger"
                    }, i.a.createElement("span", {
                        className: "hicon-label"
                    }, "Accedi"), i.a.createElement("span", {
                        className: "icon icon-user"
                    }))))
                }
            })) : null, !0 === w ? i.a.createElement(i.a.Fragment, null, i.a.createElement(o.a, {
                key: "saveArticle-1-".concat(A),
                withComments: !0,
                saved: !0,
                commentSavedLabel: L,
                shareUrl: X,
                shareText: Y
            }), i.a.createElement(c.a, {
                key: "CommentsLink-".concat(A),
                number: x
            })) : null, !0 === l ? i.a.createElement(i.a.Fragment, null, V && i.a.createElement(i.a.Fragment, null, i.a.createElement(o.a, {
                key: "saveArticle-3-".concat(A),
                shareUrl: X,
                shareText: Y,
                notinline: V,
                middle: V
            }), !P && i.a.createElement(c.a, {
                key: "CommentsLink-".concat(A),
                number: x,
                notinline: V,
                middle: V,
                notext: V
            })), !B && i.a.createElement(i.a.Fragment, null, i.a.createElement(s.a, {
                key: "fb-share-".concat(A),
                type: "fb",
                icon: "facebook",
                inList: !0,
                circle: !0,
                shareUrl: X,
                shareText: Y,
                notinline: V,
                middle: V,
                outline: D,
                nostyle: q,
                isWebview: U
            }), i.a.createElement(s.a, {
                key: "tw-share-".concat(A),
                type: "tw",
                icon: "twitter",
                inList: !0,
                circle: !0,
                shareUrl: X,
                shareText: Y,
                notinline: V,
                middle: V,
                outline: D,
                nostyle: q,
                isWebview: U
            }), i.a.createElement(s.a, {
                key: "in-share-".concat(A),
                type: "in",
                icon: "linkedin",
                inList: !0,
                circle: !0,
                shareUrl: X,
                shareText: Y,
                notinline: V,
                middle: V,
                outline: D,
                nostyle: q,
                isWebview: U
            }), V && i.a.createElement(s.a, {
                key: "wa-share-".concat(A),
                type: "wa",
                icon: "whatsapp",
                inList: !0,
                circle: !0,
                shareUrl: X,
                shareText: Y,
                notinline: V,
                middle: V,
                isWebview: U
            })), V || !1 !== I ? null : i.a.createElement(u, {
                key: "SocialDropdown-1-".concat(A),
                uniqueKey: A,
                hasLabel: M,
                hasMoreActions: _,
                reverse: T,
                shareUrl: X,
                dropup: F,
                shareText: Y,
                isWebview: U,
                circle: !0
            })) : null, !0 === j && !0 === N ? i.a.createElement(s.a, {
                inList: !0,
                circle: !0,
                icon: "play"
            }) : null, !0 === j && !1 === N ? i.a.createElement(i.a.Fragment, null, z ? null : i.a.createElement(o.a, {
                key: "saveArticle-2-".concat(A),
                shareUrl: X,
                shareText: Y
            }), P ? null : i.a.createElement(c.b, {
                key: "CommentsNumber-".concat(A),
                number: x,
                artUrl: X
            }), i.a.createElement(u, {
                key: "SocialDropdown-2-".concat(A),
                uniqueKey: A,
                icon: "share-small",
                withMainSocial: !0,
                hasMoreActions: !1,
                reverse: T,
                shareUrl: X,
                dropup: F,
                shareText: Y,
                isWebview: U
            })) : null)
        }
        function y(e) {
            var t = e.social
              , a = e.share
              , o = e.shareText
              , c = e.shareUrl
              , s = e.article
              , l = e.radio
              , u = e.commentSaved
              , m = e.headerUserTools
              , d = e.subscribe
              , p = e.articlePreview
              , h = e.noActions
              , f = e.commentsNumber
              , v = e.dropdownReverse
              , b = e.hasMoreActions
              , g = e.shareActionsHasLabel
              , y = e.noBookmark
              , k = e.setLoginModalVisibility
              , N = e.loginModalVisibility
              , w = e.classNameVariant
              , O = e.noCommentNumber
              , S = e.dropup
              , j = e.vertical
              , I = e.socialOutline
              , x = e.socialNoStyle
              , T = e.lockedPaywall
              , _ = e.header2021
              , M = e.withSep
              , L = Object(n.useContext)(r.a).appData.isWebview
              , R = !0 === u ? "Salvato" : "Salva"
              , C = (j ? "list" : _ && "hnav hnav--lined hnav--lsep") || "list-inline list-inline--tools ".concat(M ? "list-inline--sep" : "")
              , P = s || {}
              , A = P.uuid || c || "nokey";
            return "24plus" === P.sectionId ? null : i.a.createElement("ul", {
                className: "".concat(C, " ").concat(w)
            }, i.a.createElement(E, {
                key: "ToolsElement-".concat(A),
                social: t,
                share: a,
                shareText: o,
                shareUrl: c,
                dropup: S,
                article: s,
                radio: l,
                headerUserTools: m,
                subscribe: d,
                articlePreview: p,
                noActions: h,
                commentsNumber: f,
                dropdownReverse: v,
                hasMoreActions: b,
                shareActionsHasLabel: g,
                commentSavedLabel: R,
                setLoginModalVisibility: k,
                loginModalVisibility: N,
                noCommentNumber: O,
                uniqueKey: A,
                noBookmark: y,
                vertical: j,
                socialOutline: I,
                socialNoStyle: x,
                lockedPaywall: T,
                isWebview: L,
                header2021: _
            }))
        }
        E.defaultProps = {
            vertical: !1,
            socialOutline: !1,
            socialNoStyle: !1,
            lockedPaywall: !1,
            isWebview: {
                ios: !1
            },
            headerUserTools: !1,
            header2021: !1
        },
        a.d(t, "a", function() {
            return y
        }),
        y.defaultProps = {
            social: !1,
            share: !1,
            shareText: null,
            shareUrl: null,
            radio: !1,
            commentSaved: !1,
            headerUserTools: !1,
            subscribe: !1,
            articlePreview: !1,
            noActions: !1,
            commentsNumber: 0,
            dropdownReverse: !0,
            hasMoreActions: !1,
            shareActionsHasLabel: !1,
            noBookmark: !1,
            noCommentNumber: !1,
            dropup: !1,
            vertical: !1,
            socialOutline: !1,
            socialNoStyle: !1,
            lockedPaywall: !1,
            classNameVariant: "",
            header2021: !1,
            withSep: !1
        }
    },
    czNK: function(e, t, a) {
        "use strict";
        var n = a("nh4g")
          , i = a("DVgA")
          , r = a("JiEa")
          , o = a("UqcF")
          , c = a("S/j/")
          , s = a("Ymqv")
          , l = Object.assign;
        e.exports = !l || a("eeVq")(function() {
            var e = {}
              , t = {}
              , a = Symbol()
              , n = "abcdefghijklmnopqrst";
            return e[a] = 7,
            n.split("").forEach(function(e) {
                t[e] = e
            }),
            7 != l({}, e)[a] || Object.keys(l({}, t)).join("") != n
        }) ? function(e, t) {
            for (var a = c(e), l = arguments.length, u = 1, m = r.f, d = o.f; l > u; )
                for (var p, h = s(arguments[u++]), f = m ? i(h).concat(m(h)) : i(h), v = f.length, b = 0; v > b; )
                    p = f[b++],
                    n && !d.call(h, p) || (a[p] = h[p]);
            return a
        }
        : l
    },
    dD9F: function(e, t, a) {
        var n = a("NykK")
          , i = a("shjB")
          , r = a("ExA7")
          , o = {};
        o["[object Float32Array]"] = o["[object Float64Array]"] = o["[object Int8Array]"] = o["[object Int16Array]"] = o["[object Int32Array]"] = o["[object Uint8Array]"] = o["[object Uint8ClampedArray]"] = o["[object Uint16Array]"] = o["[object Uint32Array]"] = !0,
        o["[object Arguments]"] = o["[object Array]"] = o["[object ArrayBuffer]"] = o["[object Boolean]"] = o["[object DataView]"] = o["[object Date]"] = o["[object Error]"] = o["[object Function]"] = o["[object Map]"] = o["[object Number]"] = o["[object Object]"] = o["[object RegExp]"] = o["[object Set]"] = o["[object String]"] = o["[object WeakMap]"] = !1,
        e.exports = function(e) {
            return r(e) && i(e.length) && !!o[n(e)]
        }
    },
    dESq: function(e, t, a) {
        "use strict";
        var n = a("KI45");
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = void 0;
        var i = n(a("q1tI"))
          , r = n(a("17x9"))
          , o = n(a("m/Pd"))
          , c = n(a("DHlL"))
          , s = n(a("FmXa"))
          , l = function(e) {
            var t = e.url
              , a = e.logo
              , n = e.contactPoint
              , r = void 0 === n ? [] : n
              , l = '{\n    "@context": "https://schema.org",\n    "@type": "Organization",\n    "url": "'.concat(t, '",\n    ').concat(a ? '"logo": "'.concat(a, '",') : "", '\n    "contactPoint": [').concat(function(e) {
                return e.map(function(e) {
                    return '{\n    "@type": "ContactPoint",\n    "telephone": "'.concat(e.telephone, '",\n    "contactType": "').concat(e.contactType, '"').concat(e.areaServed ? ',\n    "areaServed": '.concat((0,
                    s.default)(e.areaServed)) : "").concat(e.availableLanguage ? ',\n    "availableLanguage": '.concat((0,
                    s.default)(e.availableLanguage)) : "").concat(e.contactOption ? ',\n    "contactOption": "'.concat(e.contactOption, '"') : "", "\n    }")
                })
            }(r), "]\n  }");
            return i.default.createElement(o.default, null, i.default.createElement("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: (0,
                c.default)(l),
                key: "jsonld-corporate-contact"
            }))
        };
        l.defaultProps = {
            logo: null
        },
        l.propTypes = {
            logo: r.default.string,
            url: r.default.string.isRequired,
            contactPoint: r.default.arrayOf(r.default.shape({
                telephone: r.default.string.isRequired,
                contactType: r.default.string.isRequired,
                areaServed: r.default.oneOfType([r.default.string, r.default.array]),
                availableLanguage: r.default.oneOfType([r.default.string, r.default.array]),
                contactOption: r.default.string
            })).isRequired
        };
        var u = l;
        t.default = u
    },
    dTAl: function(e, t, a) {
        var n = a("GoyQ")
          , i = Object.create
          , r = function() {
            function e() {}
            return function(t) {
                if (!n(t))
                    return {};
                if (i)
                    return i(t);
                e.prototype = t;
                var a = new e;
                return e.prototype = void 0,
                a
            }
        }();
        e.exports = r
    },
    e4Nc: function(e, t, a) {
        var n = a("fGT3")
          , i = a("k+1r")
          , r = a("JHgL")
          , o = a("pSRY")
          , c = a("H8j4");
        function s(e) {
            var t = -1
              , a = null == e ? 0 : e.length;
            for (this.clear(); ++t < a; ) {
                var n = e[t];
                this.set(n[0], n[1])
            }
        }
        s.prototype.clear = n,
        s.prototype.delete = i,
        s.prototype.get = r,
        s.prototype.has = o,
        s.prototype.set = c,
        e.exports = s
    },
    ebwN: function(e, t, a) {
        var n = a("Cwc5")(a("Kz5y"), "Map");
        e.exports = n
    },
    ecV5: function(e, t, a) {
        "use strict";
        a.d(t, "c", function() {
            return l
        }),
        a.d(t, "a", function() {
            return u
        }),
        a.d(t, "b", function() {
            return m
        });
        a("pIFo"),
        a("KKXr");
        var n = a("doui")
          , i = a("q1tI")
          , r = a.n(i)
          , o = a("4WT4")
          , c = a("jCVj")
          , s = a("tnMW");
        function l(e) {
            var t = e.searchModalVisibility
              , a = e.setSearchModalVisibility
              , l = Object(i.useState)("")
              , u = Object(n.default)(l, 2)
              , m = u[0]
              , d = u[1]
              , p = Object(i.useState)({})
              , h = Object(n.default)(p, 2)
              , f = h[0]
              , v = h[1];
            function b(e, t) {
                return e.map(function(e) {
                    var a = e.extra_info.split("||")
                      , n = "".concat(Object(o.kb)(), "?cmd=static&chId=30&path=%2Fsearch%2Fsearch_engine.jsp&keyWords=").concat(a[2].trim().replace(/ /g, "+"), "&field=&id=&maxDocs=&criteria=0&pageNumber=1&simili=&action=&chiaviSelezionate=&description=&flagPartialResult=&senv=r24&layout=r24");
                    return r.a.createElement("li", {
                        className: "suggestion-list-item",
                        key: e.extra_info
                    }, r.a.createElement("a", {
                        href: "Firme" === t ? n : a[3],
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, r.a.createElement("span", {
                        className: "suggestion-type"
                    }, t), r.a.createElement(c.a, {
                        html: e.query
                    }, r.a.createElement("span", null))))
                })
            }
            Object(i.useEffect)(function() {
                return t && (document.body.classList.add("modal-open"),
                document.body.classList.add("modal-search-open")),
                function() {
                    document.body.classList.remove("modal-open"),
                    document.body.classList.remove("modal-search-open")
                }
            }, [t]);
            var g = !0 === t ? {
                display: "block"
            } : {
                display: "none"
            };
            return r.a.createElement(r.a.Fragment, null, r.a.createElement("div", {
                id: "modal-search",
                className: "modal modal--transparent ".concat(!0 === t ? "show" : ""),
                style: g,
                tabIndex: "-1",
                role: "dialog"
            }, r.a.createElement("div", {
                className: "modal-dialog modal-lg",
                "data-toggle-class-target": !0
            }, r.a.createElement("div", {
                className: "modal-content"
            }, r.a.createElement("div", {
                className: "modal-header"
            }, r.a.createElement(s.a, {
                handler: function(e) {
                    e.preventDefault(),
                    a(!t)
                },
                skipBorderReset: !0
            }, r.a.createElement("a", {
                className: "ltool ltool--circle ltool--clr ml-auto",
                "data-dismiss": "modal",
                "aria-label": "Close",
                href: ""
            }, r.a.createElement("span", {
                className: "icon icon-close"
            })))), r.a.createElement("div", {
                className: "modal-body"
            }, r.a.createElement("div", {
                className: "search-panel-simple"
            }, r.a.createElement("form", {
                id: "ricercaForm",
                action: Object(o.kb)(),
                methode: "get",
                acceptCharset: "UTF-8"
            }, r.a.createElement("input", {
                type: "hidden",
                name: "cmd",
                value: "static"
            }), r.a.createElement("input", {
                type: "hidden",
                name: "chId",
                value: "30"
            }), r.a.createElement("input", {
                type: "hidden",
                name: "path",
                value: "/search/search_engine.jsp"
            }), r.a.createElement("input", {
                type: "hidden",
                name: "field",
                value: "Titolo|Testo"
            }), r.a.createElement("input", {
                type: "hidden",
                name: "orderBy",
                value: "score desc"
            }), r.a.createElement("input", {
                type: "hidden",
                name: "chId",
                value: "30"
            }), r.a.createElement("div", {
                className: "search-input"
            }, r.a.createElement("input", {
                className: "input input--lined",
                type: "text",
                name: "keyWords",
                value: m,
                onChange: function(e) {
                    var t = e.target.value
                      , a = Object(o.jb)();
                    d(t),
                    t.length > 1 && fetch("".concat(a).concat(t)).then(function(e) {
                        return e.arrayBuffer()
                    }).then(function(e) {
                        var t = new TextDecoder("iso-8859-1");
                        return JSON.parse(t.decode(e))
                    }).then(function(e) {
                        v(e)
                    })
                },
                placeholder: "Cosa stai cercando?"
            }), r.a.createElement("button", {
                className: "search-input-submit",
                type: "button",
                name: "button",
                onClick: function(e) {
                    return function(e) {
                        e.preventDefault(),
                        0 !== m.length && document.getElementById("ricercaForm").submit()
                    }(e)
                }
            }, r.a.createElement("span", {
                className: "icon icon-search"
            }))), f.length > 0 ? r.a.createElement("div", {
                className: "suggestion"
            }, f[0] && f[0].r24extra_finance && f[0].r24extra_finance.length > 0 ? r.a.createElement("div", {
                className: "suggestion-block"
            }, r.a.createElement("h6", {
                className: "suggestion-block-title"
            }, "il titolo in borsa"), r.a.createElement("ul", {
                className: "suggestion-list"
            }, f[0].r24extra_finance.map(function(e) {
                var t = e.extra_info.split("||");
                return r.a.createElement("li", {
                    className: "suggestion-list-item",
                    key: t[1]
                }, r.a.createElement("a", {
                    href: t[3],
                    target: "_blank",
                    rel: "noopener noreferrer"
                }, r.a.createElement("strong", {
                    className: "suggestion-code"
                }, r.a.createElement("span", {
                    className: "icon icon-fmw-realtime"
                }), t[1]), t[2]))
            }))) : null, r.a.createElement("ul", {
                className: "suggestion-list"
            }, f[1] && f[1].r24extra_autori && f[1].r24extra_autori.length > 0 ? b(f[1].r24extra_autori, "Firme") : null, f[2] && f[2].r24extra_topics && f[2].r24extra_topics.length > 0 ? b(f[2].r24extra_topics, "Argomenti") : null, f[3] && f[3].r24extra_query && f[3].r24extra_query.length > 0 ? function(e) {
                return e.map(function(e) {
                    return r.a.createElement("li", {
                        className: "suggestion-list-item",
                        key: e.query
                    }, r.a.createElement("a", {
                        target: "_blank",
                        rel: "noopener noreferrer",
                        href: "".concat(Object(o.kb)(), "?cmd=static&chId=30&path=%2Fsearch%2Fsearch_engine.jsp&keyWords=").concat(e.query.replace(" ", "+"), "&field=&id=&maxDocs=&criteria=0&pageNumber=1&simili=&action=&chiaviSelezionate=&description=&flagPartialResult=&senv=r24&layout=r24"),
                        className: "suggestion-type"
                    }, r.a.createElement(c.a, {
                        html: e.query
                    }, r.a.createElement("span", null))))
                })
            }(f[3].r24extra_query.filter(function(e, t) {
                return t < 10 - f[0].r24extra_finance.length - f[1].r24extra_autori.length - f[2].r24extra_topics.length
            })) : null)) : null)))))), t ? r.a.createElement("div", {
                className: "modal-backdrop ".concat(t ? "show" : "")
            }) : null)
        }
        function u(e) {
            var t = e.searchModalVisibility
              , a = e.setSearchModalVisibility;
            return r.a.createElement("li", {
                key: "search",
                className: "nav-inline-item"
            }, r.a.createElement(s.a, {
                handler: function() {
                    return a(!t)
                }
            }, r.a.createElement("a", {
                className: "hlink hlink--icon",
                href: "#"
            }, r.a.createElement("span", {
                className: "icon icon-search"
            }))))
        }
        function m(e) {
            var t = e.searchModalVisibility
              , a = e.setSearchModalVisibility
              , n = e.sticky
              , i = e.slimVersion;
            return r.a.createElement("li", {
                key: "search2021",
                className: "hnav-item hnav-item--no-brd-md d-none d-md-inline-block"
            }, r.a.createElement(s.a, {
                handler: function() {
                    return a(!t)
                }
            }, r.a.createElement("a", {
                className: "hicon-link",
                href: "#"
            }, !n && !i && r.a.createElement("span", {
                className: "hicon-label"
            }, "Ricerca"), r.a.createElement("span", {
                className: "icon icon-search"
            }))))
        }
    },
    ekgI: function(e, t, a) {
        var n = a("YESw")
          , i = Object.prototype.hasOwnProperty;
        e.exports = function(e) {
            var t = this.__data__;
            return n ? void 0 !== t[e] : i.call(t, e)
        }
    },
    erEE: function(e, t, a) {
        "use strict";
        var n = a("KI45");
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        Object.defineProperty(t, "ArticleJsonLd", {
            enumerable: !0,
            get: function() {
                return r.default
            }
        }),
        Object.defineProperty(t, "BreadcrumbJsonLd", {
            enumerable: !0,
            get: function() {
                return o.default
            }
        }),
        Object.defineProperty(t, "BlogJsonLd", {
            enumerable: !0,
            get: function() {
                return c.default
            }
        }),
        Object.defineProperty(t, "CourseJsonLd", {
            enumerable: !0,
            get: function() {
                return s.default
            }
        }),
        Object.defineProperty(t, "LocalBusinessJsonLd", {
            enumerable: !0,
            get: function() {
                return l.default
            }
        }),
        Object.defineProperty(t, "LogoJsonLd", {
            enumerable: !0,
            get: function() {
                return u.default
            }
        }),
        Object.defineProperty(t, "ProductJsonLd", {
            enumerable: !0,
            get: function() {
                return m.default
            }
        }),
        Object.defineProperty(t, "SocialProfileJsonLd", {
            enumerable: !0,
            get: function() {
                return d.default
            }
        }),
        Object.defineProperty(t, "CorporateContactJsonLd", {
            enumerable: !0,
            get: function() {
                return p.default
            }
        }),
        Object.defineProperty(t, "JobPostingJsonLd", {
            enumerable: !0,
            get: function() {
                return h.default
            }
        }),
        t.default = void 0;
        var i = n(a("zrE3"))
          , r = n(a("wQvz"))
          , o = n(a("uSNX"))
          , c = n(a("NMoU"))
          , s = n(a("Kh8m"))
          , l = n(a("OgNi"))
          , u = n(a("pjlW"))
          , m = n(a("s3TM"))
          , d = n(a("TtSx"))
          , p = n(a("dESq"))
          , h = n(a("0Jvr"))
          , f = i.default;
        t.default = f
    },
    fGT3: function(e, t, a) {
        var n = a("4kuk")
          , i = a("Xi7e")
          , r = a("ebwN");
        e.exports = function() {
            this.size = 0,
            this.__data__ = {
                hash: new n,
                map: new (r || i),
                string: new n
            }
        }
    },
    "fR/l": function(e, t, a) {
        var n = a("CH3K")
          , i = a("Z0cm");
        e.exports = function(e, t, a) {
            var r = t(e);
            return i(e) ? r : n(r, a(e))
        }
    },
    fW1p: function(e, t, a) {
        var n = a("Y7ZC")
          , i = a("E8gZ")(!1);
        n(n.S, "Object", {
            values: function(e) {
                return i(e)
            }
        })
    },
    fmRc: function(e, t, a) {
        var n = a("Xi7e")
          , i = a("77Zs")
          , r = a("L8xA")
          , o = a("gCq4")
          , c = a("VaNO")
          , s = a("0Cz8");
        function l(e) {
            var t = this.__data__ = new n(e);
            this.size = t.size
        }
        l.prototype.clear = i,
        l.prototype.delete = r,
        l.prototype.get = o,
        l.prototype.has = c,
        l.prototype.set = s,
        e.exports = l
    },
    g6HL: function(e, t) {
        e.exports = Object.is || function(e, t) {
            return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
        }
    },
    gCq4: function(e, t) {
        e.exports = function(e) {
            return this.__data__.get(e)
        }
    },
    gFfm: function(e, t) {
        e.exports = function(e, t) {
            for (var a = -1, n = null == e ? 0 : e.length; ++a < n && !1 !== t(e[a], a, e); )
                ;
            return e
        }
    },
    hWJk: function(e, t, a) {
        "use strict";
        a.d(t, "b", function() {
            return o
        }),
        a.d(t, "a", function() {
            return c
        });
        var n = a("q1tI")
          , i = a.n(n)
          , r = a("tnMW");
        function o(e) {
            var t = e.clickSetShowMenu
              , a = e.bigIcons
              , n = e.inList
              , o = e.mobileOnly
              , c = function() {
                return i.a.createElement(r.a, {
                    handler: t
                }, i.a.createElement("a", {
                    className: "hlink hlink--icon".concat(a ? "-big" : "", " ").concat(o ? "d-md-none" : ""),
                    href: ""
                }, i.a.createElement("span", {
                    className: "icon ".concat(a ? "icon--big" : "", " icon-menu")
                })))
            };
            return !0 === n ? i.a.createElement("li", {
                key: "sidemenu",
                className: "nav-inline-item"
            }, c()) : c()
        }
        function c(e) {
            var t = e.clickSetShowMenu
              , a = e.sticky
              , n = e.slimVersion;
            return i.a.createElement("li", {
                className: "hnav-item"
            }, i.a.createElement(function() {
                return i.a.createElement(r.a, {
                    handler: t,
                    skipBorderReset: n,
                    skipOutlineReset: n
                }, i.a.createElement("a", {
                    className: "hicon-link"
                }, !a && !n && i.a.createElement("span", {
                    className: "hicon-label"
                }, "Naviga"), i.a.createElement("span", {
                    className: "icon icon-menu"
                })))
            }, null))
        }
        o.defaultProps = {
            clickSetShowMenu: null,
            bigIcons: !1,
            inList: !1,
            mobileOnly: !1
        }
    },
    heNW: function(e, t) {
        e.exports = function(e, t, a) {
            switch (a.length) {
            case 0:
                return e.call(t);
            case 1:
                return e.call(t, a[0]);
            case 2:
                return e.call(t, a[0], a[1]);
            case 3:
                return e.call(t, a[0], a[1], a[2])
            }
            return e.apply(t, a)
        }
    },
    hypo: function(e, t, a) {
        var n = a("O0oS");
        e.exports = function(e, t, a) {
            "__proto__" == t && n ? n(e, t, {
                configurable: !0,
                enumerable: !0,
                value: a,
                writable: !0
            }) : e[t] = a
        }
    },
    imt6: function(e, t, a) {
        "use strict";
        var n = function(e) {
            if (e && e.__esModule)
                return e;
            var t = {};
            if (null != e)
                for (var a in e)
                    Object.hasOwnProperty.call(e, a) && (t[a] = e[a]);
            return t.default = e,
            t
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(a("q1tI"));
        t.AmpModeContext = i.createContext({})
    },
    jXQH: function(e, t, a) {
        var n = a("TO8r")
          , i = /^\s+/;
        e.exports = function(e) {
            return e ? e.slice(0, n(e) + 1).replace(i, "") : e
        }
    },
    juv8: function(e, t, a) {
        var n = a("MrPd")
          , i = a("hypo");
        e.exports = function(e, t, a, r) {
            var o = !a;
            a || (a = {});
            for (var c = -1, s = t.length; ++c < s; ) {
                var l = t[c]
                  , u = r ? r(a[l], e[l], l, a, e) : void 0;
                void 0 === u && (u = e[l]),
                o ? i(a, l, u) : n(a, l, u)
            }
            return a
        }
    },
    "k+1r": function(e, t, a) {
        var n = a("QkVE");
        e.exports = function(e) {
            var t = n(this, e).delete(e);
            return this.size -= t ? 1 : 0,
            t
        }
    },
    kKrJ: function(e, t, a) {
        "use strict";
        a.d(t, "b", function() {
            return c
        }),
        a.d(t, "a", function() {
            return s
        });
        var n = a("q1tI")
          , i = a.n(n)
          , r = a("0Ops")
          , o = a("InxH");
        function c(e) {
            var t = e.number
              , a = e.artUrl;
            if (t < 10)
                return null;
            var n = t > 99 ? "99+" : t
              , o = t > 99 ? "icon icon--big icon-comments-many" : "icon icon--big icon-comments";
            return i.a.createElement("li", {
                className: "list-inline-item d-none d-lg-inline-block"
            }, i.a.createElement(r.Link, {
                route: "".concat(a, "#commentsform")
            }, i.a.createElement("a", {
                className: "ltool d-none d-lg-block"
            }, i.a.createElement("span", {
                className: o
            }), i.a.createElement("span", {
                className: "ltool-counter"
            }, n))))
        }
        function s(e) {
            var t = e.number
              , a = e.inList
              , n = void 0 === a || a
              , r = e.notinline
              , c = e.notext
              , s = e.middle
              , l = function() {
                Object(o.a)({
                    link_id: "strumenti articolo",
                    event_type: "commento"
                })
            }
              , u = function(e) {
                var t = s ? "ltool ltool--circle ltool--mid ltool--solo" : "abtn-link"
                  , a = "icon ".concat(c ? "" : "icon--big", " icon-comments")
                  , n = c ? "" : "Commenta";
                return i.a.createElement("a", {
                    className: t,
                    href: "#commentsform",
                    onClick: l
                }, i.a.createElement("span", {
                    className: a
                }), i.a.createElement("span", {
                    className: "ltool-counter"
                }, e), n)
            };
            return !0 === n ? i.a.createElement("li", {
                className: r ? "list-item" : "list-inline-item"
            }, u(t)) : u(t)
        }
        s.defaultProps = {
            notinline: !1,
            notext: !1,
            middle: !1
        }
    },
    kekF: function(e, t) {
        e.exports = function(e, t) {
            return function(a) {
                return e(t(a))
            }
        }
    },
    lSCD: function(e, t, a) {
        var n = a("NykK")
          , i = a("GoyQ")
          , r = "[object AsyncFunction]"
          , o = "[object Function]"
          , c = "[object GeneratorFunction]"
          , s = "[object Proxy]";
        e.exports = function(e) {
            if (!i(e))
                return !1;
            var t = n(e);
            return t == o || t == c || t == r || t == s
        }
    },
    ljhN: function(e, t) {
        e.exports = function(e, t) {
            return e === t || e != e && t != t
        }
    },
    "m/Pd": function(e, t, a) {
        "use strict";
        var n = a("KI45")(a("ttDY"))
          , i = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = i(a("q1tI"))
          , o = i(a("4hZ1"))
          , c = a("imt6")
          , s = a("IClC")
          , l = a("Wziy");
        function u() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "next-head"
              , t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
              , a = [r.default.createElement("meta", {
                key: "charSet",
                charSet: "utf-8",
                className: e
            })];
            return t || a.push(r.default.createElement("meta", {
                key: "viewport",
                name: "viewport",
                content: "width=device-width,minimum-scale=1,initial-scale=1",
                className: e
            })),
            a
        }
        function m(e, t) {
            return "string" == typeof t || "number" == typeof t ? e : t.type === r.default.Fragment ? e.concat(r.default.Children.toArray(t.props.children).reduce(function(e, t) {
                return "string" == typeof t || "number" == typeof t ? e : e.concat(t)
            }, [])) : e.concat(t)
        }
        t.defaultHead = u;
        var d = ["name", "httpEquiv", "charSet", "viewport", "itemProp"];
        function p(e, t) {
            return e.reduce(function(e, t) {
                var a = r.default.Children.toArray(t.props.children);
                return e.concat(a)
            }, []).reduce(m, []).reverse().concat(u("", t.isAmp)).filter((a = new n.default,
            i = new n.default,
            o = new n.default,
            c = {},
            function(e) {
                if (e.key && "number" != typeof e.key && 0 === e.key.indexOf(".$"))
                    return !a.has(e.key) && (a.add(e.key),
                    !0);
                switch (e.type) {
                case "title":
                case "base":
                    if (i.has(e.type))
                        return !1;
                    i.add(e.type);
                    break;
                case "meta":
                    for (var t = 0, r = d.length; t < r; t++) {
                        var s = d[t];
                        if (e.props.hasOwnProperty(s))
                            if ("charSet" === s || "viewport" === s) {
                                if (o.has(s))
                                    return !1;
                                o.add(s)
                            } else {
                                var l = e.props[s]
                                  , u = c[s] || new n.default;
                                if (u.has(l))
                                    return !1;
                                u.add(l),
                                c[s] = u
                            }
                    }
                }
                return !0
            }
            )).reverse().map(function(e, t) {
                var a = (e.props && e.props.className ? e.props.className + " " : "") + "next-head"
                  , n = e.key || t;
                return r.default.cloneElement(e, {
                    key: n,
                    className: a
                })
            });
            var a, i, o, c
        }
        var h = o.default();
        function f(e) {
            var t = e.children;
            return r.default.createElement(c.AmpModeContext.Consumer, null, function(e) {
                return r.default.createElement(s.HeadManagerContext.Consumer, null, function(a) {
                    return r.default.createElement(h, {
                        reduceComponentsToState: p,
                        handleStateChange: a,
                        isAmp: l.isAmp(e)
                    }, t)
                })
            })
        }
        f.rewind = h.rewind,
        t.default = f
    },
    mTTR: function(e, t, a) {
        var n = a("b80T")
          , i = a("QcOe")
          , r = a("MMmD");
        e.exports = function(e) {
            return r(e) ? n(e, !0) : i(e)
        }
    },
    mdPL: function(e, t, a) {
        (function(e) {
            var n = a("WFqU")
              , i = t && !t.nodeType && t
              , r = i && "object" == typeof e && e && !e.nodeType && e
              , o = r && r.exports === i && n.process
              , c = function() {
                try {
                    var e = r && r.require && r.require("util").types;
                    return e || o && o.binding && o.binding("util")
                } catch (t) {}
            }();
            e.exports = c
        }
        ).call(this, a("YuTi")(e))
    },
    "mv/X": function(e, t, a) {
        var n = a("ljhN")
          , i = a("MMmD")
          , r = a("wJg7")
          , o = a("GoyQ");
        e.exports = function(e, t, a) {
            if (!o(a))
                return !1;
            var c = typeof t;
            return !!("number" == c ? i(a) && r(t, a.length) : "string" == c && t in a) && n(a[t], e)
        }
    },
    nOYO: function(e, t) {
        e.exports = he
    },
    nhzr: function(e, t, a) {
        a("fW1p"),
        e.exports = a("WEpk").Object.values
    },
    nmnc: function(e, t, a) {
        var n = a("Kz5y").Symbol;
        e.exports = n
    },
    "oCl/": function(e, t, a) {
        var n = a("CH3K")
          , i = a("LcsW")
          , r = a("MvSz")
          , o = a("0ycA")
          , c = Object.getOwnPropertySymbols ? function(e) {
            for (var t = []; e; )
                n(t, r(e)),
                e = i(e);
            return t
        }
        : o;
        e.exports = c
    },
    "otv/": function(e, t, a) {
        var n = a("nmnc")
          , i = n ? n.prototype : void 0
          , r = i ? i.valueOf : void 0;
        e.exports = function(e) {
            return r ? Object(r.call(e)) : {}
        }
    },
    pFRH: function(e, t, a) {
        var n = a("cvCv")
          , i = a("O0oS")
          , r = a("zZ0H")
          , o = i ? function(e, t) {
            return i(e, "toString", {
                configurable: !0,
                enumerable: !1,
                value: n(t),
                writable: !0
            })
        }
        : r;
        e.exports = o
    },
    pSRY: function(e, t, a) {
        var n = a("QkVE");
        e.exports = function(e) {
            return n(this, e).has(e)
        }
    },
    pjlW: function(e, t, a) {
        "use strict";
        var n = a("KI45");
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = void 0;
        var i = n(a("q1tI"))
          , r = n(a("17x9"))
          , o = n(a("m/Pd"))
          , c = n(a("DHlL"))
          , s = function(e) {
            var t = e.url
              , a = e.logo
              , n = '{\n    "@context": "http://schema.org",\n    "@type": "Organization",\n    "url": "'.concat(t, '",\n    "logo": "').concat(a, '"\n  }');
            return i.default.createElement(o.default, null, i.default.createElement("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: (0,
                c.default)(n),
                key: "jsonld-logo"
            }))
        };
        s.propTypes = {
            url: r.default.string.isRequired,
            logo: r.default.string.isRequired
        };
        var l = s;
        t.default = l
    },
    qZTm: function(e, t, a) {
        var n = a("fR/l")
          , i = a("MvSz")
          , r = a("7GkX");
        e.exports = function(e) {
            return n(e, r, i)
        }
    },
    "rO+U": function(e, t, a) {
        "use strict";
        a("9VmF"),
        a("tUrg"),
        a("Z2Ku"),
        a("L9s1");
        var n = a("q1tI")
          , i = a.n(n)
          , r = a("nOHt")
          , o = a.n(r)
          , c = a("0Ops")
          , s = a("4WT4")
          , l = a("InxH")
          , u = a("SuNC");
        function m(e) {
            var t = e.href
              , a = e.children;
            return i.a.createElement(c.Link, {
                href: "".concat(t, "?cmpid=.com")
            }, a)
        }
        m.defaultProps = {
            href: "#"
        },
        a.d(t, "a", function() {
            return p
        });
        var d = Object(s.N)();
        function p(e) {
            var t = e.route
              , a = e.params
              , n = e.children
              , r = e.external
              , p = e.html
              , h = e.trackEventObj
              , f = e.classNames
              , v = e.forceRoute
              , b = r;
            a && (a.webtype ? b = r || "Articolo_Tappo" === a.webtype : a.sectionId && "radio" === a.sectionId && (b = !1));
            var g = "";
            g = v ? t : a && a.webtype && "introDossier2015" === a.webtype && (a.dossier || "SuperDossier" === a.subwebtype) ? "SuperDossier" === a.subwebtype ? "homesuperdossierlist" : "homedossierlist" : a && a.pay ? "auto" : t;
            var E = b ? void 0 : Object(c.getRouteToPath)(Object(c.getRouteForContent)(g, a || {}), function(e, t) {
                return ["homedossierlist", "homesuperdossierlist"].includes(e) ? t.dossier || {} : t
            }(g, a || {})) || g
              , y = b ? a.url || a.link || a.href : void 0
              , k = E && E.startsWith("http") ? void 0 : E
              , N = E && E.startsWith("http") ? E : y;
            if (h) {
                if (k)
                    return h.wtck21 = "".concat(d).concat(k),
                    i.a.createElement("a", {
                        className: f,
                        href: k,
                        onClick: function(e) {
                            e.preventDefault(),
                            Object(l.a)(h),
                            o.a.pushRoute(k)
                        },
                        dangerouslySetInnerHTML: p ? {
                            __html: p
                        } : null
                    }, p ? null : n);
                if (N)
                    return h.wtck21 = N,
                    i.a.createElement("a", {
                        className: f,
                        href: N,
                        onClick: function() {
                            return Object(l.a)(h)
                        },
                        dangerouslySetInnerHTML: p ? {
                            __html: p
                        } : null
                    }, p ? null : n)
            }
            var w = p ? i.a.cloneElement(i.a.Children.only(n), {
                dangerouslySetInnerHTML: {
                    __html: p
                }
            }) : n;
            return N && N.startsWith(Object(s.k)()) ? i.a.createElement(u.a, {
                href: N
            }, w) : N && N.indexOf("ntplus") > -1 ? i.a.createElement(m, {
                href: N
            }, w) : i.a.createElement(c.Link, {
                route: k,
                href: N
            }, w)
        }
        p.defaultProps = {
            external: !1,
            html: "",
            trackEventObj: null,
            classNames: "",
            forceRoute: !1
        }
    },
    rQ8e: function(e, t, a) {
        "use strict";
        a.d(t, "a", function() {
            return s
        });
        var n = a("kOwS")
          , i = a("q1tI")
          , r = a.n(i)
          , o = a("TSYQ")
          , c = a.n(o);
        function s(e) {
            var t = e.children
              , a = e.black
              , i = e.invertedColor
              , o = e.nostrip
              , s = e.norel
              , l = e.green
              , u = e.brown
              , m = e.blue
              , d = e.open
              , p = e.video
              , h = e.gray
              , f = e.gallery
              , v = e.banche
              , b = e.wine
              , g = e.red
              , E = e.infodata
              , y = e.consigli24
              , k = e.newsletter
              , N = e.onlyRelbg
              , w = e.plus24big
              , O = e.plus24small
              , S = e.ntplus
              , j = e.hntplus
              , I = e.shrinkable
              , x = e.radiocor
              , T = e.dgray
              , _ = e.rstrip
              , M = e.cwine
              , L = e.market
              , R = e.sticky
              , C = e.noborder
              , P = e.spcl
              , A = e.liveVideo
              , F = e.partner24
              , z = e.sdossier
              , V = e.sdossiermetabox
              , D = e.customStyles
              , q = e.serievideo
              , B = c()({
                sopen: d,
                rel: !d && !s,
                "rel--strip": o,
                "bg-black": a,
                "inverted-color": i,
                "rel--bg bg-jade inverted-color": l,
                "rel--24plus rel--bg bg-dblue inverted-color": m,
                "rel--bg bg-black inverted-color rel--video-alt": p,
                "rel--bg bg-black inverted-color rel--gallery-alt": f,
                "rel--bg inverted-color bg-dgray": v,
                "rel--bg rel--infodata bg-dblue inverted-color": E,
                "rel--bg rel--infodata bg-dwine inverted-color": y,
                "rel--bg inverted-color bg-red": g,
                "rel--newsletter": k,
                "bg-wine inverted-color": b,
                "rel--bg inverted-color bg-dbrown": u,
                "scta bg-dgray inverted-color": h,
                "rel--bg": N,
                "rel--bg rel--24plus rel--plus-big": w,
                "rel--bg rel--24plus rel--plus-slim": O,
                "rel--bg rel--nt-plus rel--plus-slim": S,
                hntplus: j,
                "rel--radiocor": x,
                "bg-dgray": T,
                rstrip: _,
                "bg-cwine": M,
                "rstrip--market": L,
                "rstrip--sticky": R,
                "brd-0": C,
                shrinkable: I,
                "rel--spcl": P,
                "live-video": A,
                "rel--bg rel--partner": F,
                "bbox--sdossier": z,
                "shrinkable sopen": V,
                "rel--bg rel--inpage bg-dgray inverted-color": q
            });
            return r.a.createElement("section", Object(n.a)({
                className: B
            }, D), t)
        }
        s.defaultProps = {
            black: !1,
            invertedColor: !1,
            nostrip: !1,
            norel: !1,
            green: !1,
            blue: !1,
            open: !1,
            video: !1,
            gallery: !1,
            banche: !1,
            red: !1,
            infodata: !1,
            consigli24: !1,
            wine: !1,
            newsletter: !1,
            brown: !1,
            gray: !1,
            onlyRelbg: !1,
            plus24big: !1,
            plus24small: !1,
            ntplus: !1,
            hntplus: !1,
            shrinkable: !1,
            radiocor: !1,
            dgray: !1,
            rstrip: !1,
            cwine: !1,
            market: !1,
            sticky: !1,
            spcl: !1,
            noborder: !1,
            liveVideo: !1,
            partner24: !1,
            sdossier: !1,
            sdossiermetabox: !1,
            customStyles: {},
            serievideo: !1
        }
    },
    s3TM: function(e, t, a) {
        "use strict";
        var n = a("KI45");
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = void 0;
        var i = n(a("q1tI"))
          , r = n(a("17x9"))
          , o = n(a("m/Pd"))
          , c = n(a("DHlL"))
          , s = n(a("FmXa"))
          , l = function(e) {
            var t = e.productName
              , a = e.images
              , n = void 0 === a ? [] : a
              , r = e.description
              , l = e.sku
              , u = e.gtin8
              , m = e.gtin13
              , d = e.gtin14
              , p = e.mpn
              , h = e.brand
              , f = e.reviews
              , v = void 0 === f ? [] : f
              , b = e.aggregateRating
              , g = e.offers
              , E = '{\n    "@context": "http://schema.org/",\n    "@type": "Product",\n    "image":'.concat((0,
            s.default)(n), ",\n    ").concat(r ? '"description": "'.concat(r, '",') : "", "\n    ").concat(p ? '"mpn": "'.concat(p, '",') : "", "\n    ").concat(l ? '"sku": "'.concat(l, '",') : "", "\n    ").concat(u ? '"gtin8": "'.concat(u, '",') : "", "\n    ").concat(m ? '"gtin13": "'.concat(m, '",') : "", "\n    ").concat(d ? '"gtin14": "'.concat(d, '",') : "", "\n    ").concat(h ? function(e) {
                return '\n  "brand": {\n      "@type": "Thing",\n      "name": "'.concat(e, '"\n    },\n')
            }(h) : "", "\n    ").concat(v.length ? function(e) {
                return '\n"review": [\n  '.concat(e.map(function(e) {
                    return '{\n      "@type": "Review",\n      '.concat(e.datePublished ? '"datePublished": "'.concat(e.datePublished, '",') : "", "\n      ").concat(e.reviewBody ? '"reviewBody": "'.concat(e.reviewBody, '",') : "", "\n      ").concat(e.name ? '"name": "'.concat(e.name, '",') : "", "\n      ").concat(function(e) {
                        return e ? '"reviewRating": {\n          "@type": "Rating",\n          '.concat(e.bestRating ? '"bestRating": "'.concat(e.bestRating, '",') : "", "\n          ").concat(e.worstRating ? '"worstRating": "'.concat(e.worstRating, '",') : "", '\n          "ratingValue": "').concat(e.ratingValue, '"\n        },') : ""
                    }(e.reviewRating), '\n      "author": "').concat(e.author, '"\n  }')
                }), "],")
            }(v) : "", "\n    ").concat(b ? function(e) {
                return '\n  "aggregateRating": {\n      "@type": "AggregateRating",\n      "ratingValue": "'.concat(e.ratingValue, '",\n      "reviewCount": "').concat(e.reviewCount, '"\n    },\n')
            }(b) : "", "\n    ").concat(g ? function(e) {
                return '\n  "offers": {\n    "@type": "Offer",\n    "priceCurrency": "'.concat(e.priceCurrency, '",\n    ').concat(e.priceValidUntil ? '"priceValidUntil": "'.concat(e.priceValidUntil, '",') : "", "\n    ").concat(e.itemCondition ? '"itemCondition": "'.concat(e.itemCondition, '",') : "", "\n    ").concat(e.availability ? '"availability": "'.concat(e.availability, '",') : "", "\n    ").concat(e.seller ? '\n      "seller": {\n      "@type": "Organization",\n      "name": "'.concat(e.seller.name, '"\n    },\n    ') : "", '\n    "price": "').concat(e.price, '"\n  },\n')
            }(g) : "", '\n    "name": "').concat(t, '"\n  }');
            return i.default.createElement(o.default, null, i.default.createElement("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: (0,
                c.default)(E),
                key: "jsonld-product"
            }))
        };
        l.defaultProps = {
            images: [],
            description: null,
            brand: null,
            reviews: [],
            aggregateRating: null,
            offers: null,
            sku: null,
            gtin8: null,
            gtin13: null,
            gtin14: null,
            mpn: null
        },
        l.propTypes = {
            productName: r.default.string.isRequired,
            images: r.default.oneOfType([r.default.arrayOf(r.default.string), r.default.string]),
            description: r.default.string,
            brand: r.default.string,
            reviews: r.default.arrayOf(r.default.shape({
                author: r.default.string.isRequired,
                datePublished: r.default.string,
                reviewBody: r.default.string,
                name: r.default.string,
                reviewRating: r.default.shape({
                    bestRating: r.default.string,
                    ratingValue: r.default.string.isRequired,
                    worstRating: r.default.string
                })
            })),
            aggregateRating: r.default.shape({
                ratingValue: r.default.string.isRequired,
                reviewCount: r.default.string.isRequired
            }),
            offers: r.default.shape({
                price: r.default.string.isRequired,
                priceCurrency: r.default.string.isRequired,
                priceValidUntil: r.default.string,
                itemCondition: r.default.string,
                availability: r.default.string,
                seller: r.default.shape({
                    name: r.default.string.isRequired
                })
            }),
            sku: r.default.string,
            gtin8: r.default.string,
            gtin13: r.default.string,
            gtin14: r.default.string,
            mpn: r.default.string
        };
        var u = l;
        t.default = u
    },
    sEf8: function(e, t) {
        e.exports = function(e) {
            return function(t) {
                return e(t)
            }
        }
    },
    sEfC: function(e, t, a) {
        var n = a("GoyQ")
          , i = a("QIyF")
          , r = a("tLB3")
          , o = "Expected a function"
          , c = Math.max
          , s = Math.min;
        e.exports = function(e, t, a) {
            var l, u, m, d, p, h, f = 0, v = !1, b = !1, g = !0;
            if ("function" != typeof e)
                throw new TypeError(o);
            function E(t) {
                var a = l
                  , n = u;
                return l = u = void 0,
                f = t,
                d = e.apply(n, a)
            }
            function y(e) {
                var a = e - h;
                return void 0 === h || a >= t || a < 0 || b && e - f >= m
            }
            function k() {
                var e = i();
                if (y(e))
                    return N(e);
                p = setTimeout(k, function(e) {
                    var a = t - (e - h);
                    return b ? s(a, m - (e - f)) : a
                }(e))
            }
            function N(e) {
                return p = void 0,
                g && l ? E(e) : (l = u = void 0,
                d)
            }
            function w() {
                var e = i()
                  , a = y(e);
                if (l = arguments,
                u = this,
                h = e,
                a) {
                    if (void 0 === p)
                        return function(e) {
                            return f = e,
                            p = setTimeout(k, t),
                            v ? E(e) : d
                        }(h);
                    if (b)
                        return clearTimeout(p),
                        p = setTimeout(k, t),
                        E(h)
                }
                return void 0 === p && (p = setTimeout(k, t)),
                d
            }
            return t = r(t) || 0,
            n(a) && (v = !!a.leading,
            m = (b = "maxWait"in a) ? c(r(a.maxWait) || 0, t) : m,
            g = "trailing"in a ? !!a.trailing : g),
            w.cancel = function() {
                void 0 !== p && clearTimeout(p),
                f = 0,
                l = h = u = p = void 0
            }
            ,
            w.flush = function() {
                return void 0 === p ? d : N(i())
            }
            ,
            w
        }
    },
    shjB: function(e, t) {
        var a = 9007199254740991;
        e.exports = function(e) {
            return "number" == typeof e && e > -1 && e % 1 == 0 && e <= a
        }
    },
    t8Fj: function(e, t, a) {
        e.exports = a("+VcZ")
    },
    tLB3: function(e, t, a) {
        var n = a("jXQH")
          , i = a("GoyQ")
          , r = a("/9aa")
          , o = NaN
          , c = /^[-+]0x[0-9a-f]+$/i
          , s = /^0b[01]+$/i
          , l = /^0o[0-7]+$/i
          , u = parseInt;
        e.exports = function(e) {
            if ("number" == typeof e)
                return e;
            if (r(e))
                return o;
            if (i(e)) {
                var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                e = i(t) ? t + "" : t
            }
            if ("string" != typeof e)
                return 0 === e ? e : +e;
            e = n(e);
            var a = s.test(e);
            return a || l.test(e) ? u(e.slice(2), a ? 2 : 8) : c.test(e) ? o : +e
        }
    },
    tMB7: function(e, t, a) {
        var n = a("y1pI");
        e.exports = function(e) {
            var t = this.__data__
              , a = n(t, e);
            return a < 0 ? void 0 : t[a][1]
        }
    },
    tadb: function(e, t, a) {
        var n = a("Cwc5")(a("Kz5y"), "DataView");
        e.exports = n
    },
    "tgc+": function(e, t, a) {
        "use strict";
        a.r(t);
        a("rvZc"),
        a("pIFo"),
        a("Z2Ku"),
        a("L9s1");
        var n = a("q1tI")
          , i = a("nOHt")
          , r = a.n(i)
          , o = a("4WT4")
          , c = a("ZpnV")
          , s = a("abTZ");
        a.d(t, "default", function() {
            return p
        }),
        a.d(t, "clearSSRrefreshVar", function() {
            return h
        });
        var l = Object(o.r)()
          , u = Object(o.q)()
          , m = Object(o.p)()
          , d = Object(o.o)();
        function p(e) {
            var t = e.routeData
              , a = t.routeName
              , i = t.asPath
              , o = t.pathname
              , p = t.query
              , h = e.isLive
              , f = e.isSSR
              , v = (e.device,
            e.article);
            c.a._adManager._initialRender = !0;
            var b = p.nof
              , g = !("" === b || i.includes("refresh_ce&nof"))
              , E = function() {
                g = !0,
                ("" === b || i.includes("refresh_ce&nof")) && document.location.reload()
            }
              , y = function() {
                g = !1
            }
              , k = function() {
                try {
                    document.body.classList.remove("backgroundAdv");
                    var e = document.querySelectorAll("#idProva, #link_ws_btop, #link_ws_bleft, #link_ws_bright");
                    if (void 0 !== e && e)
                        for (var t = 0; t < e.length; t += 1)
                            e[t].parentNode.removeChild(e[t]);
                    var a = document.querySelectorAll("div[id^='div-gpt-ad']");
                    if (void 0 !== a && a)
                        for (var n = 0; n < a.length; n += 1)
                            void 0 !== a[n].style && void 0 !== a[n].style.cssText ? a[n].style.cssText = "" : a[n].style = "";
                    var i = document.querySelectorAll("script[id^='script4W'], style[id^='style4W'], style[id^='teads']");
                    if (void 0 !== i && i)
                        for (var r = 0; r < i.length; r += 1)
                            i[r].parentNode.removeChild(i[r]);
                    Object(s.b)()
                } catch (o) {
                    console.log(o)
                }
            };
            return Object(n.useEffect)(function() {
                var e = i.includes("refresh_ce") ? "true" : "false";
                if (c.a.setTargeting("pagina_autorefresh", e),
                v) {
                    var t = v.uuid
                      , n = v.dossier
                      , s = v.tags
                      , b = v.subsectionId;
                    if (c.a.setTargeting("idArticolo", t),
                    c.a.setTargeting("kwSottosezione", b),
                    n) {
                        var N = n.parentUuid;
                        c.a.setTargeting("idParentArticolo", N)
                    }
                    if (s && s.length > 0) {
                        var w = s.map(function(e) {
                            var t = e.tagname;
                            return t || null
                        }).filter(Boolean);
                        w && w.length > 0 && c.a.setTargeting("kwArticolo", w)
                    }
                } else
                    ["homedossierlist", "homedossierlistsection"].includes(a) ? (c.a.setTargeting("idDossier", p.parentuuid || p.uuid),
                    p.parentuuid && c.a.setTargeting("idSezioneDossier", p.uuid)) : p && p.subsectionId && c.a.setTargeting("kwSottosezione", p.subsectionId);
                var O = h ? u : "article" === a && (g && m || d) || l
                  , S = function() {
                    switch (a) {
                    case "homepage":
                    case "section":
                    case "subsection":
                    case "article":
                        window.refreshTimeout = setTimeout(function() {
                            var e = g ? "" : "&nof"
                              , t = i.replace("refresh_ce=1", "refresh_ce");
                            if (t.includes("refresh_ce")) {
                                var a = t.replace("&nof", "").replace("refresh_ce", "refresh_ce".concat(e));
                                r.a.push({
                                    pathname: o,
                                    query: p
                                }, a, {
                                    shallow: !1
                                })
                            } else {
                                var n = t.includes("?") ? t.replace("?", "?refresh_ce".concat(e, "&")).replace("&&", "&") : "".concat(t, "?refresh_ce").concat(e);
                                r.a.push({
                                    pathname: o,
                                    query: p
                                }, n, {
                                    shallow: !1
                                })
                            }
                        }, O)
                    }
                }
                  , j = function() {
                    window.refreshTimeout && clearTimeout(window.refreshTimeout)
                };
                return window.addEventListener("focus", E, {
                    passive: !0
                }),
                window.addEventListener("blur", y, {
                    passive: !0
                }),
                window.addEventListener("online", S, {
                    passive: !0
                }),
                window.addEventListener("offline", j, {
                    passive: !0
                }),
                r.a.events.on("routeChangeStart", k),
                S(),
                f || (c.a._adManager._isFirstLoad = !1,
                function e(t) {
                    try {
                        "undefined" != typeof oz_config && "undefined" != typeof googletag && "function" == typeof googletag.pubads ? setTimeout(function() {
                            window.hb_status = {
                                n_adserver_callback: [],
                                adserverRequestSent: !1,
                                prebidTargetingSet: !1
                            },
                            window.hb_status.n_adserver_callback.push("criteo"),
                            oz_config(googletag)
                        }, 500) : (void 0 === t && (t = 1),
                        t > 0 && setTimeout(function() {
                            e(t - 1)
                        }, 1e3))
                    } catch (a) {
                        void 0 === t && (t = 1),
                        t > 0 && setTimeout(function() {
                            e(t - 1)
                        }, 1e3)
                    }
                }(3),
                window.k5aTimeout = setTimeout(function() {
                    i.includes("refresh_ce") && function() {
                        try {
                            var e = document.querySelector("meta[property='og:title']").getAttribute("content")
                              , t = document.querySelector("meta[property='og:type']").getAttribute("content");
                            window.kilkaya.pageview({
                                url: window.location.href,
                                title: e,
                                type: t,
                                cntTag: ["refresh"]
                            })
                        } catch (a) {
                            console.error(a)
                        }
                    }()
                }, 1e3)),
                function() {
                    window.removeEventListener("focus", E),
                    window.removeEventListener("blur", y),
                    window.removeEventListener("online", S),
                    window.removeEventListener("offline", j),
                    r.a.events.off("routeChangeStart", k),
                    j(),
                    window.k5aTimeout && clearTimeout(window.k5aTimeout)
                }
            }, [h, a, i, p]),
            null
        }
        function h(e) {
            e.query;
            var t = e.asPath
              , a = (e.pathname,
            e.req)
              , n = e.res;
            return function() {
                if (a && n && !t.includes("refresh_ce=1") && t.includes("refresh_ce") && !n.headersSent) {
                    var e = t.replace("refresh_ce&nof", "");
                    return (e = e.replace("refresh_ce", "")).endsWith("?") && (e = e.replace("?", "")),
                    n.writeHead(302, {
                        Location: e
                    }),
                    n.end(),
                    "doit"
                }
                return ""
            }()
        }
    },
    u8Dt: function(e, t, a) {
        var n = a("YESw")
          , i = "__lodash_hash_undefined__"
          , r = Object.prototype.hasOwnProperty;
        e.exports = function(e) {
            var t = this.__data__;
            if (n) {
                var a = t[e];
                return a === i ? void 0 : a
            }
            return r.call(t, e) ? t[e] : void 0
        }
    },
    uM7l: function(e, t, a) {
        var n = a("OBhP")
          , i = 4;
        e.exports = function(e) {
            return n(e, i)
        }
    },
    uSNX: function(e, t, a) {
        "use strict";
        var n = a("KI45");
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = void 0;
        var i = n(a("q1tI"))
          , r = n(a("17x9"))
          , o = n(a("m/Pd"))
          , c = n(a("DHlL"))
          , s = function(e) {
            var t = e.itemListElements
              , a = '{\n    "@context": "http://schema.org",\n    "@type": "BreadcrumbList",\n    "itemListElement": [\n      '.concat((void 0 === t ? [] : t).map(function(e) {
                return '{\n        "@type": "ListItem",\n        "position": '.concat(e.position, ',\n        "name": "').concat(e.name, '",\n        "item": "').concat(e.item, '"\n      }')
            }), "\n     ]\n  }");
            return i.default.createElement(o.default, null, i.default.createElement("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: (0,
                c.default)(a),
                key: "jsonld-breadcrumb"
            }))
        };
        s.propTypes = {
            itemListElements: r.default.arrayOf(r.default.shape({
                position: r.default.number.isRequired,
                name: r.default.string.isRequired,
                item: r.default.string.isRequired
            })).isRequired
        };
        var l = s;
        t.default = l
    },
    "vN+2": function(e, t) {
        e.exports = function() {}
    },
    "vs/s": function(e, t, a) {
        "use strict";
        a.d(t, "a", function() {
            return O
        });
        var n = a("9Jkg")
          , i = a.n(n)
          , r = (a("pIFo"),
        a("xfY5"),
        a("UXZV"))
          , o = a.n(r)
          , c = a("q1tI")
          , s = a.n(c)
          , l = a("cPJV")
          , u = a.n(l)
          , m = a("hmb4")
          , d = a.n(m)
          , p = a("4WT4")
          , h = a("smdI")
          , f = a("InxH")
          , v = a("jCVj")
          , b = a("2L0F")
          , g = a("NUs0")
          , E = a("KB5c")
          , y = "N24"
          , k = "APP"
          , N = Object(p.K)()
          , w = Object(p.B)();
        function O(e) {
            var t = e.article
              , a = e.ebook
              , n = e.ebookCover
              , r = e.dossier
              , l = e.disableTIQ
              , m = e.disableTracking
              , O = e.taxonomyInfo
              , S = e.doPaywallTracking
              , j = e.doAdaptiveTracking
              , I = e.isSSR
              , x = e.sidedoorId
              , T = e.isFromSidedoor
              , _ = Object(c.useContext)(b.a).appData
              , M = Object(c.useContext)(g.b)
              , L = {
                server: "N24",
                no_view: "si",
                isSSR: I ? "si" : "no"
            }
              , R = _.routeData
              , C = R.routeName
              , P = R.query
              , A = _.isWebview
              , F = O || {
                nielsenBrandAppID: h.d,
                nielsenBrandSection: h.e
            }
              , z = F.nielsenAppID
              , V = F.nielsenSection
              , D = o()({}, L)
              , q = {
                appId: z
            };
            switch (C) {
            case "homepage":
                D.pageName = "".concat(y, ":home:home"),
                D.prop9 = "".concat(y, ":home"),
                q.sectionId = V,
                q.assetId = "homepage";
                break;
            case "section":
                D.pageName = "".concat(y, ":").concat(P.sectionId, ":home"),
                D.prop9 = "".concat(y, ":sezione"),
                q.sectionId = V,
                q.assetId = P.sectionId;
                break;
            case "subsection":
            case "sostenibilitasub":
                D.pageName = "".concat(y, ":").concat(P.sectionId, ":").concat(P.subsectionId, ":home"),
                D.prop9 = "".concat(y, ":sottosezione"),
                q.sectionId = V,
                q.assetId = "".concat(P.sectionId, "-").concat(P.subsectionId);
                break;
            case "article":
                if (t) {
                    var B = t.sectionId
                      , U = t.subsectionId
                      , W = t.slug
                      , G = t.uuid
                      , H = t.title
                      , K = t.dossier
                      , X = t.createdAt
                      , Y = void 0 === X ? "1970-01-01" : X
                      , Q = t.tagAuthors
                      , Z = t.articleGallery
                      , J = t.payWall
                      , $ = t.lockedPaywall
                      , ee = u()(new Date(Number(Y)), "YYYY-MM-DD", {
                        locale: d.a
                    })
                      , te = Q && Q.length && Q.join(",").replace(/\.| /g, "-").toLowerCase() || ""
                      , ae = "bol/bol" === Object(p.fb)(J) ? "mercatiplus" : "dotcom";
                    if (q.sectionId = V,
                    q.assetId = G,
                    D.isPaywalled = Object(p.Eb)(J),
                    D.lockedPaywall = $,
                    D.pageName = "".concat(y, ":").concat(B, ":").concat(U, ":").concat(W, "-").concat(G),
                    D.prop8 = H && H.leafTitle ? H.leafTitle : "Senza titolo",
                    D.prop9 = T && x ? "".concat(y, ":sidedoor articolo") : D.isPaywalled && $ ? "".concat(y, ":articolo-blocco") : "".concat(y, ":articolo"),
                    D.prop10 = G,
                    D.prop36 = T && x ? "sidedoor" : (J && ("Adaptive" === J.docRulesView ? "Libero" : J.docRulesView) || "Libero").toLowerCase(),
                    D.prop61 = ee,
                    D.wt_int_cs_72 = "wt_int=".concat(ae, "..").concat(D.isPaywalled ? "pay" : "free", ".").concat(B, ".").concat(W, "-").concat(G, ".").concat(te, "."),
                    K) {
                        var ne = K.slug
                          , ie = K.uuid;
                        D.prop24 = "".concat(y, ":").concat(ne, "-").concat(ie),
                        D.prop25 = "".concat(y, ":").concat(B, ":").concat(U)
                    }
                    Z && (D.prop2 = "articlegallery")
                }
                break;
            case "ebook":
                if (a) {
                    var re = a.sectionId
                      , oe = a.slug
                      , ce = a.uuid
                      , se = a.title;
                    D.pageName = "".concat(y, ":").concat(re, ":pdf_sfogliabile:").concat(oe, "-").concat(ce),
                    D.prop8 = se && se.leafTitle ? se.leafTitle : "Senza titolo",
                    D.prop9 = "".concat(y, T && x ? ":sidedoor ebook" : ":ebook"),
                    D.prop10 = ce,
                    q.sectionId = V,
                    q.assetId = ce
                }
                break;
            case "ebookCover":
                if (n) {
                    var le = n.sectionId
                      , ue = n.slug
                      , me = n.uuid;
                    D.pageName = "".concat(y, ":").concat(le, ":cover-").concat(ue, "-").concat(me),
                    D.prop9 = "".concat(y, ":cover-").concat(ue, "-").concat(me),
                    D.prop10 = me,
                    q.sectionId = h.e,
                    q.assetId = me,
                    q.appId = h.d
                }
                break;
            case "homedossierlistsection":
                if (r) {
                    var de = r.sectionId
                      , pe = r.subsectionId
                      , he = r.slug
                      , fe = r.uuid;
                    D.channel = "".concat(y, ":").concat(de),
                    D.pageName = "".concat(y, ":dossier:").concat(de, ":").concat(pe, ":").concat(he, "-").concat(fe),
                    D.prop8 = "".concat(he, "-").concat(fe),
                    D.prop9 = "".concat(y, ":dossier:sezione"),
                    D.prop10 = fe,
                    D.prop24 = "".concat(y, ":").concat(he, "-").concat(fe),
                    D.prop25 = "".concat(y, ":").concat(de, ":").concat(pe),
                    q.sectionId = h.e,
                    q.assetId = fe,
                    q.appId = h.d
                }
                break;
            case "homedossierlist":
                if (r) {
                    var ve = r.sectionId
                      , be = r.subsectionId
                      , ge = r.slug
                      , Ee = r.uuid;
                    D.pageName = "".concat(y, ":dossier:").concat(ve, ":").concat(be, ":").concat(ge, "-").concat(Ee),
                    D.prop9 = "".concat(y, ":dossier"),
                    D.prop10 = Ee,
                    D.prop24 = "".concat(y, ":").concat(ge, "-").concat(Ee),
                    D.prop25 = "".concat(y, ":").concat(ve, ":").concat(be),
                    q.sectionId = h.e,
                    q.assetId = Ee,
                    q.appId = h.d
                }
                break;
            case "errore":
                D.pageName = "".concat(y, ":errorPage:404 not found");
                break;
            case "archive":
                P.subsectionId ? (D.pageName = "".concat(y, ":").concat(P.sectionId, ":").concat(P.subsectionId, ":home"),
                D.prop9 = "".concat(y, ":sottosezione"),
                q.sectionId = V,
                q.assetId = "archivio-".concat(P.sectionId, "-").concat(P.subsectionId, "-").concat(P.page)) : (D.pageName = "".concat(y, ":").concat(P.sectionId, ":home"),
                D.prop9 = "".concat(y, ":sezione"),
                q.sectionId = V,
                q.assetId = "archivio-".concat(P.sectionId, "-").concat(P.page));
                break;
            case "radiocor":
                D.pageName = "".concat(y, ":radiocor:home"),
                D.prop9 = "".concat(y, ":sezione"),
                q.sectionId = V,
                q.assetId = "radiocor";
                break;
            case "fogliaradiocor":
                D.pageName = "".concat(y, ":radiocor:").concat(P.slug),
                D.prop9 = "".concat(y, ":radiocor"),
                q.sectionId = h.e,
                q.assetId = P.slug;
                break;
            case "radiocorBList":
                D.pageName = "".concat(y, ":radiocor:").concat(P.label, "-").concat(P.bottomline),
                D.prop9 = "".concat(y, ":radiocor"),
                q.sectionId = h.e,
                q.assetId = "".concat(P.label, "-").concat(P.bottomline);
                break;
            case "ebooklist":
                D.pageName = "".concat(y, ":ebook:home"),
                D.prop9 = "".concat(y, ":sezione"),
                q.sectionId = h.e,
                q.assetId = "ebook";
                break;
            case "homedossier":
                D.pageName = "".concat(y, ":dossier:home"),
                D.prop9 = "".concat(y, ":sezione"),
                q.sectionId = V,
                q.assetId = "dossier";
                break;
            case "brief":
            case "briefNew":
                if (t) {
                    var ye = t.uuid
                      , ke = t.createdAt;
                    q.sectionId = V,
                    q.assetId = ye,
                    D.pageName = "".concat(k, ":brief:").concat(P.date || u()(Number(ke), "YYYYMMDD")),
                    D.prop9 = "".concat(k, ":il-mio-brief")
                }
                break;
            case "appodcast":
                q.sectionId = V,
                q.assetId = "apppodcast",
                D.pageName = "".concat(k, ":podcast"),
                D.prop9 = "".concat(k, ":podcast");
                break;
            case "appseriepodcast":
                q.sectionId = V,
                q.assetId = "apppodcast-".concat(P.rubricaId),
                D.pageName = "".concat(k, ":podcast:").concat(P.rubricaId),
                D.prop9 = "".concat(k, ":podcast"),
                D.prop24 = "".concat(k, ":").concat(P.rubricaId);
                break;
            case "appfogliapodcast":
                q.sectionId = V,
                q.assetId = "apppodcast-".concat(P.rubricaId, "-").concat(P.uuid),
                D.pageName = "".concat(k, ":podcast:").concat(P.rubricaId, ":").concat(P.slug, "-").concat(P.uuid),
                D.prop9 = "".concat(k, ":podcast"),
                D.prop24 = "".concat(k, ":").concat(P.rubricaId)
            }
            return Object(c.useEffect)(function() {
                var e = M.userid
                  , t = M.logged
                  , a = M.isChecking;
                D.logged = t ? "loggato" : "non loggato",
                D.prop26 = t ? D.isPaywalled && !D.lockedPaywall ? "abbonato" : "registrato" : "free",
                t && "" !== e && (D.prop51 = e),
                A && A.generic && (D.prop50 = "app"),
                a || (j ? m || Object(f.a)({
                    link_id: "paywall adattivo",
                    event_type: "M+"
                }) : (!D.isPaywalled || D.isPaywalled && S) && (window.utag_data = D,
                m || Object(f.b)(D, 3, void 0 !== Object(E.c)()),
                m || A && A.generic || "si" !== D.no_view || Object(p.Fb)("".concat(w, "/static/js/sdk-nielsen.js?applicationId=").concat(q.appId || "P09BB5F85-92A1-4B71-8A6F-230E3A2B7977", "&sectionId=").concat(q.sectionId || "homepage", "&assetId=").concat(q.assetId || "homepage"), "sdkNielsen")))
            }),
            s.a.createElement(s.a.Fragment, null, s.a.createElement(v.a, {
                html: "var utag_data = ".concat(i()(D), ";")
            }, s.a.createElement("script", null)), !l && ("production" === N ? s.a.createElement("script", {
                defer: !0,
                type: "text/javascript",
                src: "".concat(w, "/static/js/tealium-p.js")
            }) : s.a.createElement("script", {
                defer: !0,
                type: "text/javascript",
                src: "".concat(w, "/static/js/tealium-d.js")
            })))
        }
        O.defaultProps = {
            article: {
                payWall: {
                    docRulesView: "Libero"
                }
            },
            isSSR: !1
        }
    },
    "w/wX": function(e, t, a) {
        var n = a("QqLw")
          , i = a("ExA7")
          , r = "[object Set]";
        e.exports = function(e) {
            return i(e) && n(e) == r
        }
    },
    wJg7: function(e, t) {
        var a = 9007199254740991
          , n = /^(?:0|[1-9]\d*)$/;
        e.exports = function(e, t) {
            var i = typeof e;
            return !!(t = null == t ? a : t) && ("number" == i || "symbol" != i && n.test(e)) && e > -1 && e % 1 == 0 && e < t
        }
    },
    wQvz: function(e, t, a) {
        "use strict";
        var n = a("KI45");
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = void 0;
        var i = n(a("q1tI"))
          , r = n(a("17x9"))
          , o = n(a("m/Pd"))
          , c = n(a("DHlL"))
          , s = function(e) {
            var t = e.url
              , a = e.title
              , n = e.images
              , r = void 0 === n ? [] : n
              , s = e.datePublished
              , l = e.dateModified
              , u = void 0 === l ? null : l
              , m = e.authorName
              , d = e.description
              , p = e.publisherName
              , h = e.publisherLogo
              , f = '{\n    "@context": "http://schema.org",\n    "@type": "Article",\n    "mainEntityOfPage": {\n      "@type": "WebPage",\n      "@id": "'.concat(t, '"\n    },\n    "headline": "').concat(a, '",\n    "image": [\n      ').concat(r.map(function(e) {
                return '"'.concat(e, '"')
            }), '\n     ],\n    "datePublished": "').concat(s, '",\n    "dateModified": "').concat(u || s, '",\n    "author": {\n      "@type": "Person",\n      "name": "').concat(m, '"\n    },\n    "publisher": {\n      "@type": "Organization",\n      "name": "').concat(p, '",\n      "logo": {\n        "@type": "ImageObject",\n        "url": "').concat(h, '"\n      }\n    },\n    "description": "').concat(d, '"\n  }');
            return i.default.createElement(o.default, null, i.default.createElement("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: (0,
                c.default)(f),
                key: "jsonld-article"
            }))
        };
        s.defaultProps = {
            dateModified: null
        },
        s.propTypes = {
            url: r.default.string.isRequired,
            title: r.default.string.isRequired,
            images: r.default.array.isRequired,
            datePublished: r.default.string.isRequired,
            dateModified: r.default.string,
            authorName: r.default.string.isRequired,
            publisherName: r.default.string.isRequired,
            publisherLogo: r.default.string.isRequired,
            description: r.default.string.isRequired
        };
        var l = s;
        t.default = l
    },
    wclG: function(e, t, a) {
        var n = a("pFRH")
          , i = a("88Gu")(n);
        e.exports = i
    },
    wrZu: function(e, t, a) {
        var n = a("+K+b")
          , i = a("XYm9")
          , r = a("b2z7")
          , o = a("otv/")
          , c = a("yP5f")
          , s = "[object Boolean]"
          , l = "[object Date]"
          , u = "[object Map]"
          , m = "[object Number]"
          , d = "[object RegExp]"
          , p = "[object Set]"
          , h = "[object String]"
          , f = "[object Symbol]"
          , v = "[object ArrayBuffer]"
          , b = "[object DataView]"
          , g = "[object Float32Array]"
          , E = "[object Float64Array]"
          , y = "[object Int8Array]"
          , k = "[object Int16Array]"
          , N = "[object Int32Array]"
          , w = "[object Uint8Array]"
          , O = "[object Uint8ClampedArray]"
          , S = "[object Uint16Array]"
          , j = "[object Uint32Array]";
        e.exports = function(e, t, a) {
            var I = e.constructor;
            switch (t) {
            case v:
                return n(e);
            case s:
            case l:
                return new I(+e);
            case b:
                return i(e, a);
            case g:
            case E:
            case y:
            case k:
            case N:
            case w:
            case O:
            case S:
            case j:
                return c(e, a);
            case u:
                return new I;
            case m:
            case h:
                return new I(e);
            case d:
                return r(e);
            case p:
                return new I;
            case f:
                return o(e)
            }
        }
    },
    xEkU: function(e, t, a) {
        (function(t) {
            for (var n = a("bQgK"), i = "undefined" == typeof window ? t : window, r = ["moz", "webkit"], o = "AnimationFrame", c = i["request" + o], s = i["cancel" + o] || i["cancelRequest" + o], l = 0; !c && l < r.length; l++)
                c = i[r[l] + "Request" + o],
                s = i[r[l] + "Cancel" + o] || i[r[l] + "CancelRequest" + o];
            if (!c || !s) {
                var u = 0
                  , m = 0
                  , d = [];
                c = function(e) {
                    if (0 === d.length) {
                        var t = n()
                          , a = Math.max(0, 1e3 / 60 - (t - u));
                        u = a + t,
                        setTimeout(function() {
                            var e = d.slice(0);
                            d.length = 0;
                            for (var t = 0; t < e.length; t++)
                                if (!e[t].cancelled)
                                    try {
                                        e[t].callback(u)
                                    } catch (a) {
                                        setTimeout(function() {
                                            throw a
                                        }, 0)
                                    }
                        }, Math.round(a))
                    }
                    return d.push({
                        handle: ++m,
                        callback: e,
                        cancelled: !1
                    }),
                    m
                }
                ,
                s = function(e) {
                    for (var t = 0; t < d.length; t++)
                        d[t].handle === e && (d[t].cancelled = !0)
                }
            }
            e.exports = function(e) {
                return c.call(i, e)
            }
            ,
            e.exports.cancel = function() {
                s.apply(i, arguments)
            }
            ,
            e.exports.polyfill = function(e) {
                e || (e = i),
                e.requestAnimationFrame = c,
                e.cancelAnimationFrame = s
            }
        }
        ).call(this, a("yLpj"))
    },
    y1pI: function(e, t, a) {
        var n = a("ljhN");
        e.exports = function(e, t) {
            for (var a = e.length; a--; )
                if (n(e[a][0], t))
                    return a;
            return -1
        }
    },
    yGk4: function(e, t, a) {
        var n = a("Cwc5")(a("Kz5y"), "Set");
        e.exports = n
    },
    yHx3: function(e, t) {
        var a = Object.prototype.hasOwnProperty;
        e.exports = function(e) {
            var t = e.length
              , n = new e.constructor(t);
            return t && "string" == typeof e[0] && a.call(e, "index") && (n.index = e.index,
            n.input = e.input),
            n
        }
    },
    yP5f: function(e, t, a) {
        var n = a("+K+b");
        e.exports = function(e, t) {
            var a = t ? n(e.buffer) : e.buffer;
            return new e.constructor(a,e.byteOffset,e.length)
        }
    },
    zEVN: function(e, t, a) {
        var n = a("Gi0A")
          , i = a("sEf8")
          , r = a("mdPL")
          , o = r && r.isMap
          , c = o ? i(o) : n;
        e.exports = c
    },
    zMgs: function(e, t, a) {
        "use strict";
        var n = a("KI45");
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = void 0;
        var i = n(a("q1tI"))
          , r = {
            templateTitle: null,
            noindex: !1,
            openGraph: {
                defaultImageHeight: null,
                defaultImageWidth: null
            }
        }
          , o = function(e) {
            var t = [];
            if (e.titleTemplate && (r.templateTitle = e.titleTemplate),
            e.title) {
                var a = e.title;
                r.templateTitle && (a = r.templateTitle.replace(/%s/g, function() {
                    return a
                })),
                t.push(i.default.createElement("title", {
                    key: "title"
                }, a))
            }
            if (!1 === e.noindex ? (t.push(i.default.createElement("meta", {
                key: "robots",
                name: "robots",
                content: "index,follow"
            })),
            t.push(i.default.createElement("meta", {
                key: "googlebot",
                name: "googlebot",
                content: "index,follow"
            }))) : e.noindex || r.noindex || e.dangerouslySetAllPagesToNoIndex ? (e.dangerouslySetAllPagesToNoIndex && (r.noindex = !0),
            t.push(i.default.createElement("meta", {
                key: "robots",
                name: "robots",
                content: "noindex,nofollow"
            })),
            t.push(i.default.createElement("meta", {
                key: "googlebot",
                name: "googlebot",
                content: "noindex,nofollow"
            }))) : (t.push(i.default.createElement("meta", {
                key: "robots",
                name: "robots",
                content: "index,follow"
            })),
            t.push(i.default.createElement("meta", {
                key: "googlebot",
                name: "googlebot",
                content: "index,follow"
            }))),
            e.description && t.push(i.default.createElement("meta", {
                key: "description",
                name: "description",
                content: e.description
            })),
            e.hasOwnProperty("twitter") && (e.twitter.cardType && t.push(i.default.createElement("meta", {
                key: "twitter:card",
                name: "twitter:card",
                content: e.twitter.cardType
            })),
            e.twitter.site && t.push(i.default.createElement("meta", {
                key: "twitter:site",
                name: "twitter:site",
                content: e.twitter.site
            })),
            e.twitter.handle && t.push(i.default.createElement("meta", {
                key: "twitter:creator",
                name: "twitter:creator",
                content: e.twitter.handle
            }))),
            e.hasOwnProperty("facebook") && e.facebook.appId && t.push(i.default.createElement("meta", {
                key: "fb:app_id",
                property: "fb:app_id",
                content: e.facebook.appId
            })),
            e.hasOwnProperty("openGraph")) {
                if (e.openGraph.url && t.push(i.default.createElement("meta", {
                    key: "og:url",
                    property: "og:url",
                    content: e.openGraph.url
                })),
                e.openGraph.type) {
                    var n = e.openGraph.type.toLowerCase();
                    t.push(i.default.createElement("meta", {
                        key: "og:type",
                        property: "og:type",
                        content: n
                    })),
                    "profile" === n && e.openGraph.profile ? (e.openGraph.profile.firstName && t.push(i.default.createElement("meta", {
                        key: "profile:first_name",
                        property: "profile:first_name",
                        content: e.openGraph.profile.firstName
                    })),
                    e.openGraph.profile.lastName && t.push(i.default.createElement("meta", {
                        key: "profile:last_name",
                        property: "profile:last_name",
                        content: e.openGraph.profile.lastName
                    })),
                    e.openGraph.profile.username && t.push(i.default.createElement("meta", {
                        key: "profile:username",
                        property: "profile:username",
                        content: e.openGraph.profile.username
                    })),
                    e.openGraph.profile.gender && t.push(i.default.createElement("meta", {
                        key: "profile:gender",
                        property: "profile:gender",
                        content: e.openGraph.profile.gender
                    }))) : "book" === n && e.openGraph.book ? (e.openGraph.book.authors && e.openGraph.book.authors.length && e.openGraph.book.authors.forEach(function(e, a) {
                        t.push(i.default.createElement("meta", {
                            key: "book:author:0".concat(a),
                            property: "book:author",
                            content: e
                        }))
                    }),
                    e.openGraph.book.isbn && t.push(i.default.createElement("meta", {
                        key: "book:isbn",
                        property: "book:isbn",
                        content: e.openGraph.book.isbn
                    })),
                    e.openGraph.book.releaseDate && t.push(i.default.createElement("meta", {
                        key: "book:release_date",
                        property: "book:release_date",
                        content: e.openGraph.book.releaseDate
                    })),
                    e.openGraph.book.tags && e.openGraph.book.tags.length && e.openGraph.book.tags.forEach(function(e, a) {
                        t.push(i.default.createElement("meta", {
                            key: "book:tag:0".concat(a),
                            property: "book:tag",
                            content: e
                        }))
                    })) : "article" === n && e.openGraph.article && (e.openGraph.article.publishedTime && t.push(i.default.createElement("meta", {
                        key: "article:published_time",
                        property: "article:published_time",
                        content: e.openGraph.article.publishedTime
                    })),
                    e.openGraph.article.modifiedTime && t.push(i.default.createElement("meta", {
                        key: "article:modified_time",
                        property: "article:modified_time",
                        content: e.openGraph.article.modifiedTime
                    })),
                    e.openGraph.article.expirationTime && t.push(i.default.createElement("meta", {
                        key: "article:expiration_time",
                        property: "article:expiration_time",
                        content: e.openGraph.article.expirationTime
                    })),
                    e.openGraph.article.authors && e.openGraph.article.authors.length && e.openGraph.article.authors.forEach(function(e, a) {
                        t.push(i.default.createElement("meta", {
                            key: "article:author:0".concat(a),
                            property: "article:author",
                            content: e
                        }))
                    }),
                    e.openGraph.article.section && t.push(i.default.createElement("meta", {
                        key: "article:section",
                        property: "article:section",
                        content: e.openGraph.article.section
                    })),
                    e.openGraph.article.tags && e.openGraph.article.tags.length && e.openGraph.article.tags.forEach(function(e, a) {
                        t.push(i.default.createElement("meta", {
                            key: "article:tag:0".concat(a),
                            property: "article:tag",
                            content: e
                        }))
                    }))
                }
                e.openGraph.title && t.push(i.default.createElement("meta", {
                    key: "og:title",
                    property: "og:title",
                    content: e.openGraph.title
                })),
                e.openGraph.description && t.push(i.default.createElement("meta", {
                    key: "og:description",
                    property: "og:description",
                    content: e.openGraph.description
                })),
                e.openGraph.images && e.openGraph.images.length && e.openGraph.images.forEach(function(a, n) {
                    t.push(i.default.createElement("meta", {
                        key: "og:image:0".concat(n),
                        property: "og:image",
                        content: a.url
                    })),
                    a.alt && t.push(i.default.createElement("meta", {
                        key: "og:image:alt0".concat(n),
                        property: "og:image:alt",
                        content: a.alt
                    })),
                    a.width ? t.push(i.default.createElement("meta", {
                        key: "og:image:width0".concat(n),
                        property: "og:image:width",
                        content: a.width
                    })) : (r.openGraph.defaultImageWidth || e.openGraph.defaultImageWidth) && (e.openGraph.defaultImageWidth && (r.openGraph.defaultImageWidth = e.openGraph.defaultImageWidth),
                    t.push(i.default.createElement("meta", {
                        key: "og:image:width0".concat(n),
                        property: "og:image:width",
                        content: r.openGraph.defaultImageWidth
                    }))),
                    a.height ? t.push(i.default.createElement("meta", {
                        key: "og:image:height".concat(n),
                        property: "og:image:height",
                        content: a.height
                    })) : (r.openGraph.defaultImageHeight || e.openGraph.defaultImageHeight) && (e.openGraph.defaultImageHeight && (r.openGraph.defaultImageHeight = e.openGraph.defaultImageHeight),
                    t.push(i.default.createElement("meta", {
                        key: "og:image:height".concat(n),
                        property: "og:image:height",
                        content: r.openGraph.defaultImageHeight
                    })))
                }),
                e.openGraph.locale && t.push(i.default.createElement("meta", {
                    key: "og:locale",
                    property: "og:locale",
                    content: e.openGraph.locale
                })),
                e.openGraph.site_name && t.push(i.default.createElement("meta", {
                    key: "og:site_name",
                    property: "og:site_name",
                    content: e.openGraph.site_name
                }))
            }
            return e.canonical && t.push(i.default.createElement("link", {
                rel: "canonical",
                href: e.canonical,
                key: "canonical"
            })),
            t
        };
        t.default = o
    },
    zZ0H: function(e, t) {
        e.exports = function(e) {
            return e
        }
    },
    zlZz: function(e, t) {
        e.exports = isbot
    },
    zrE3: function(e, t, a) {
        "use strict";
        var n = a("KI45");
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = void 0;
        var i = n(a("/HRN"))
          , r = n(a("WaGi"))
          , o = n(a("ZDA2"))
          , c = n(a("/+P4"))
          , s = n(a("N9n2"))
          , l = n(a("m/Pd"))
          , u = n(a("17x9"))
          , m = n(a("q1tI"))
          , d = n(a("zMgs"))
          , p = function(e) {
            function t(e) {
                var a;
                if ((0,
                i.default)(this, t),
                a = (0,
                o.default)(this, (0,
                c.default)(t).call(this, e)),
                !e.config)
                    throw new Error("[next-seo] You must supply an SEO configuration");
                return a
            }
            return (0,
            s.default)(t, e),
            (0,
            r.default)(t, [{
                key: "render",
                value: function() {
                    var e = this.props.config;
                    return m.default.createElement(l.default, null, (0,
                    d.default)(e))
                }
            }]),
            t
        }(m.default.Component);
        p.propTypes = {
            config: u.default.object.isRequired
        };
        var h = p;
        t.default = h
    }
}, [["J5xr", "5d41", "9da1"]]]);
