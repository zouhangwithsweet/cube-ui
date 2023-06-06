import "./css.mjs";
import { openBlock as S, createElementBlock as D, createElementVNode as x, normalizeStyle as ut, Fragment as Et, renderList as It, resolveComponent as gt, renderSlot as tt, toDisplayString as it, createVNode as et, createCommentVNode as vt, withDirectives as W, vShow as A } from "vue";
/*!
 * better-normal-scroll v1.12.6
 * (c) 2016-2018 ustbhuangyi
 * Released under the MIT License.
 */
var Wt = function() {
  function i(t, e) {
    var s = [], o = !0, n = !1, r = void 0;
    try {
      for (var h = t[Symbol.iterator](), a; !(o = (a = h.next()).done) && (s.push(a.value), !(e && s.length === e)); o = !0)
        ;
    } catch (c) {
      n = !0, r = c;
    } finally {
      try {
        !o && h.return && h.return();
      } finally {
        if (n)
          throw r;
      }
    }
    return s;
  }
  return function(t, e) {
    if (Array.isArray(t))
      return t;
    if (Symbol.iterator in Object(t))
      return i(t, e);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  };
}(), At = function(i) {
  if (Array.isArray(i)) {
    for (var t = 0, e = Array(i.length); t < i.length; t++)
      e[t] = i[t];
    return e;
  } else
    return Array.from(i);
};
function zt(i) {
  i.prototype.on = function(t, e) {
    var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this;
    this._events[t] || (this._events[t] = []), this._events[t].push([e, s]);
  }, i.prototype.once = function(t, e) {
    var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this;
    function o() {
      this.off(t, o), e.apply(s, arguments);
    }
    o.fn = e, this.on(t, o);
  }, i.prototype.off = function(t, e) {
    var s = this._events[t];
    if (s)
      for (var o = s.length; o--; )
        (s[o][0] === e || s[o][0] && s[o][0].fn === e) && (s[o][0] = void 0);
  }, i.prototype.trigger = function(t) {
    var e = this._events[t];
    if (e)
      for (var s = e.length, o = [].concat(At(e)), n = 0; n < s; n++) {
        var r = o[n], h = Wt(r, 2), a = h[0], c = h[1];
        a && a.apply(c, [].slice.call(arguments, 1));
      }
  };
}
var X = typeof window < "u", G = X && navigator.userAgent.toLowerCase(), Nt = G && /wechatdevtools/.test(G), $t = G && G.indexOf("android") > 0;
function Y() {
  return window.performance && window.performance.now ? window.performance.now() + window.performance.timing.navigationStart : +/* @__PURE__ */ new Date();
}
function k(i) {
  for (var t = arguments.length, e = Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
    e[s - 1] = arguments[s];
  for (var o = 0; o < e.length; o++) {
    var n = e[o];
    for (var r in n)
      i[r] = n[r];
  }
  return i;
}
function $(i) {
  return i == null;
}
function wt(i, t) {
  return Math.sqrt(i * i + t * t);
}
var ft = X && document.createElement("div").style, st = function() {
  if (!X)
    return !1;
  var i = {
    webkit: "webkitTransform",
    Moz: "MozTransform",
    O: "OTransform",
    ms: "msTransform",
    standard: "transform"
  };
  for (var t in i)
    if (ft[i[t]] !== void 0)
      return t;
  return !1;
}();
function M(i) {
  return st === !1 ? !1 : st === "standard" ? i === "transitionEnd" ? "transitionend" : i : st + i.charAt(0).toUpperCase() + i.substr(1);
}
function J(i, t, e, s) {
  i.addEventListener(t, e, { passive: !1, capture: !!s });
}
function Q(i, t, e, s) {
  i.removeEventListener(t, e, { passive: !1, capture: !!s });
}
function Rt(i) {
  for (var t = 0, e = 0; i; )
    t -= i.offsetLeft, e -= i.offsetTop, i = i.offsetParent;
  return {
    left: t,
    top: e
  };
}
function lt(i) {
  var t = i.getBoundingClientRect();
  return {
    left: -(t.left + window.pageXOffset),
    top: -(t.top + window.pageYOffset)
  };
}
var Lt = M("transform"), Ft = X && M("perspective") in ft, ct = X && ("ontouchstart" in window || Nt), Vt = Lt !== !1, qt = X && M("transition") in ft, _ = {
  transform: Lt,
  transitionTimingFunction: M("transitionTimingFunction"),
  transitionDuration: M("transitionDuration"),
  transitionDelay: M("transitionDelay"),
  transformOrigin: M("transformOrigin"),
  transitionEnd: M("transitionEnd")
}, F = 1, ot = 2, H = {
  touchstart: F,
  touchmove: F,
  touchend: F,
  mousedown: ot,
  mousemove: ot,
  mouseup: ot
};
function I(i) {
  if (i instanceof window.SVGElement) {
    var t = i.getBoundingClientRect();
    return {
      top: t.top,
      left: t.left,
      width: t.width,
      height: t.height
    };
  } else
    return {
      top: i.offsetTop,
      left: i.offsetLeft,
      width: i.offsetWidth,
      height: i.offsetHeight
    };
}
function V(i, t) {
  for (var e in t)
    if (t[e].test(i[e]))
      return !0;
  return !1;
}
function jt(i, t) {
  var e = document.createEvent("Event");
  e.initEvent(t, !0, !0), e.pageX = i.pageX, e.pageY = i.pageY, i.target.dispatchEvent(e);
}
function Ct(i) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "click", e = void 0;
  i.type === "mouseup" || i.type === "mousecancel" ? e = i : (i.type === "touchend" || i.type === "touchcancel") && (e = i.changedTouches[0]);
  var s = {};
  e && (s.screenX = e.screenX || 0, s.screenY = e.screenY || 0, s.clientX = e.clientX || 0, s.clientY = e.clientY || 0);
  var o = void 0, n = !0, r = !0;
  if (typeof MouseEvent < "u")
    try {
      o = new MouseEvent(t, k({
        bubbles: n,
        cancelable: r
      }, s));
    } catch {
      h();
    }
  else
    h();
  function h() {
    o = document.createEvent("Event"), o.initEvent(t, n, r), k(o, s);
  }
  o.forwardedTouchEvent = !0, o._constructed = !0, i.target.dispatchEvent(o);
}
function Zt(i) {
  Ct(i, "dblclick");
}
function Gt(i, t) {
  t.firstChild ? Kt(i, t.firstChild) : t.appendChild(i);
}
function Kt(i, t) {
  t.parentNode.insertBefore(i, t);
}
function yt(i, t) {
  i.removeChild(t);
}
var Jt = {
  startX: 0,
  startY: 0,
  scrollX: !1,
  scrollY: !0,
  freeScroll: !1,
  directionLockThreshold: 5,
  eventPassthrough: "",
  click: !1,
  tap: !1,
  /**
   * support any side
   * bounce: {
   *   top: true,
   *   bottom: true,
   *   left: true,
   *   right: true
   * }
   */
  bounce: !0,
  bounceTime: 800,
  momentum: !0,
  momentumLimitTime: 300,
  momentumLimitDistance: 15,
  swipeTime: 2500,
  swipeBounceTime: 500,
  deceleration: 15e-4,
  flickLimitTime: 200,
  flickLimitDistance: 100,
  resizePolling: 60,
  probeType: 0,
  preventDefault: !0,
  preventDefaultException: {
    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
  },
  HWCompositing: !0,
  useTransition: !0,
  useTransform: !0,
  bindToWrapper: !1,
  disableMouse: ct,
  disableTouch: !ct,
  observeDOM: !0,
  autoBlur: !0,
  /**
   * for picker
   * wheel: {
   *   selectedIndex: 0,
   *   rotate: 25,
   *   adjustTime: 400
   *   wheelWrapperClass: 'wheel-scroll',
   *   wheelItemClass: 'wheel-item'
   * }
   */
  wheel: !1,
  /**
   * for slide
   * snap: {
   *   loop: false,
   *   el: domEl,
   *   threshold: 0.1,
   *   stepX: 100,
   *   stepY: 100,
   *   speed: 400,
   *   easing: {
   *     style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
   *     fn: function (t) {
   *       return t * (2 - t)
   *     }
   *   }
   *   listenFlick: true
   * }
   */
  snap: !1,
  /**
   * for scrollbar
   * scrollbar: {
   *   fade: true,
   *   interactive: false
   * }
   */
  scrollbar: !1,
  /**
   * for pull down and refresh
   * pullDownRefresh: {
   *   threshold: 50,
   *   stop: 20
   * }
   */
  pullDownRefresh: !1,
  /**
   * for pull up and load
   * pullUpLoad: {
   *   threshold: 50
   * }
   */
  pullUpLoad: !1,
  /**
   * for mouse wheel
   * mouseWheel: {
   *   speed: 20,
   *   invert: false,
   *   easeTime: 300
   * }
   */
  mouseWheel: !1,
  stopPropagation: !1,
  /**
   * for zoom
   * zoom: {
   *   start: 1,
   *   min: 1,
   *   max: 4
   * }
   */
  zoom: !1,
  /**
   * for infinity
   * infinity: {
   *   render(item, div) {
   *   },
   *   createTombstone() {
   *   },
   *   fetch(count) {
   *   }
   * }
   */
  infinity: !1,
  /**
   * for double click
   * dblclick: {
   *   delay: 300
   * }
   */
  dblclick: !1
};
function Qt(i) {
  i.prototype._init = function(t, e) {
    this._handleOptions(e), this._events = {}, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this.setScale(1), this._addDOMEvents(), this._initExtFeatures(), this._watchTransition(), this.options.observeDOM && this._initDOMObserver(), this.options.autoBlur && this._handleAutoBlur(), this.refresh(), this.options.snap || this.scrollTo(this.options.startX, this.options.startY), this.enable();
  }, i.prototype.setScale = function(t) {
    this.lastScale = $(this.scale) ? t : this.scale, this.scale = t;
  }, i.prototype._handleOptions = function(t) {
    this.options = k({}, Jt, t), this.translateZ = this.options.HWCompositing && Ft ? " translateZ(0)" : "", this.options.useTransition = this.options.useTransition && qt, this.options.useTransform = this.options.useTransform && Vt, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollX = this.options.eventPassthrough === "horizontal" ? !1 : this.options.scrollX, this.options.scrollY = this.options.eventPassthrough === "vertical" ? !1 : this.options.scrollY, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.tap === !0 && (this.options.tap = "tap");
  }, i.prototype._addDOMEvents = function() {
    var t = J;
    this._handleDOMEvents(t);
  }, i.prototype._removeDOMEvents = function() {
    var t = Q;
    this._handleDOMEvents(t);
  }, i.prototype._handleDOMEvents = function(t) {
    var e = this.options.bindToWrapper ? this.wrapper : window;
    t(window, "orientationchange", this), t(window, "resize", this), this.options.click && t(this.wrapper, "click", this, !0), this.options.disableMouse || (t(this.wrapper, "mousedown", this), t(e, "mousemove", this), t(e, "mousecancel", this), t(e, "mouseup", this)), ct && !this.options.disableTouch && (t(this.wrapper, "touchstart", this), t(e, "touchmove", this), t(e, "touchcancel", this), t(e, "touchend", this)), t(this.scroller, _.transitionEnd, this);
  }, i.prototype._initExtFeatures = function() {
    this.options.snap && this._initSnap(), this.options.scrollbar && this._initScrollbar(), this.options.pullUpLoad && this._initPullUp(), this.options.pullDownRefresh && this._initPullDown(), this.options.wheel && this._initWheel(), this.options.mouseWheel && this._initMouseWheel(), this.options.zoom && this._initZoom(), this.options.infinity && this._initInfinite();
  }, i.prototype._watchTransition = function() {
    if (typeof Object.defineProperty == "function") {
      var t = this, e = !1, s = this.useTransition ? "isInTransition" : "isAnimating";
      Object.defineProperty(this, s, {
        get: function() {
          return e;
        },
        set: function(n) {
          e = n;
          for (var r = t.scroller.children.length ? t.scroller.children : [t.scroller], h = e && !t.pulling ? "none" : "auto", a = 0; a < r.length; a++)
            r[a].style.pointerEvents = h;
        }
      });
    }
  }, i.prototype._handleAutoBlur = function() {
    this.on("scrollStart", function() {
      var t = document.activeElement;
      t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA") && t.blur();
    });
  }, i.prototype._initDOMObserver = function() {
    var t = this;
    if (typeof MutationObserver < "u") {
      var e = void 0, s = new MutationObserver(function(n) {
        if (!t._shouldNotRefresh()) {
          for (var r = !1, h = !1, a = 0; a < n.length; a++) {
            var c = n[a];
            if (c.type !== "attributes") {
              r = !0;
              break;
            } else if (c.target !== t.scroller) {
              h = !0;
              break;
            }
          }
          r ? t.refresh() : h && (clearTimeout(e), e = setTimeout(function() {
            t._shouldNotRefresh() || t.refresh();
          }, 60));
        }
      }), o = {
        attributes: !0,
        childList: !0,
        subtree: !0
      };
      s.observe(this.scroller, o), this.on("destroy", function() {
        s.disconnect();
      });
    } else
      this._checkDOMUpdate();
  }, i.prototype._shouldNotRefresh = function() {
    var t = this.x > this.minScrollX || this.x < this.maxScrollX || this.y > this.minScrollY || this.y < this.maxScrollY;
    return this.isInTransition || this.stopFromTransition || t;
  }, i.prototype._checkDOMUpdate = function() {
    var t = I(this.scroller), e = t.width, s = t.height;
    function o() {
      if (!this.destroyed) {
        t = I(this.scroller);
        var r = t.width, h = t.height;
        (e !== r || s !== h) && this.refresh(), e = r, s = h, n.call(this);
      }
    }
    function n() {
      var r = this;
      setTimeout(function() {
        o.call(r);
      }, 1e3);
    }
    n.call(this);
  }, i.prototype.handleEvent = function(t) {
    switch (t.type) {
      case "touchstart":
      case "mousedown":
        this._start(t), this.options.zoom && t.touches && t.touches.length > 1 && this._zoomStart(t);
        break;
      case "touchmove":
      case "mousemove":
        this.options.zoom && t.touches && t.touches.length > 1 ? this._zoom(t) : this._move(t);
        break;
      case "touchend":
      case "mouseup":
      case "touchcancel":
      case "mousecancel":
        this.scaled ? this._zoomEnd(t) : this._end(t);
        break;
      case "orientationchange":
      case "resize":
        this._resize();
        break;
      case "transitionend":
      case "webkitTransitionEnd":
      case "oTransitionEnd":
      case "MSTransitionEnd":
        this._transitionEnd(t);
        break;
      case "click":
        this.enabled && !t._constructed && (V(t.target, this.options.preventDefaultException) || (t.preventDefault(), t.stopPropagation()));
        break;
      case "wheel":
      case "DOMMouseScroll":
      case "mousewheel":
        this._onMouseWheel(t);
        break;
    }
  }, i.prototype.refresh = function() {
    var t = window.getComputedStyle(this.wrapper, null).position === "static", e = I(this.wrapper);
    this.wrapperWidth = e.width, this.wrapperHeight = e.height;
    var s = I(this.scroller);
    this.scrollerWidth = Math.round(s.width * this.scale), this.scrollerHeight = Math.round(s.height * this.scale), this.relativeX = s.left, this.relativeY = s.top, t && (this.relativeX -= e.left, this.relativeY -= e.top), this.minScrollX = 0, this.minScrollY = 0;
    var o = this.options.wheel;
    o ? (this.items = this.scroller.children, this.options.itemHeight = this.itemHeight = this.items.length ? this.scrollerHeight / this.items.length : 0, this.selectedIndex === void 0 && (this.selectedIndex = o.selectedIndex || 0), this.options.startY = -this.selectedIndex * this.itemHeight, this.maxScrollX = 0, this.maxScrollY = -this.itemHeight * (this.items.length - 1)) : (this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.options.infinity || (this.maxScrollY = this.wrapperHeight - this.scrollerHeight), this.maxScrollX < 0 ? (this.maxScrollX -= this.relativeX, this.minScrollX = -this.relativeX) : this.scale > 1 && (this.maxScrollX = this.maxScrollX / 2 - this.relativeX, this.minScrollX = this.maxScrollX), this.maxScrollY < 0 ? (this.maxScrollY -= this.relativeY, this.minScrollY = -this.relativeY) : this.scale > 1 && (this.maxScrollY = this.maxScrollY / 2 - this.relativeY, this.minScrollY = this.maxScrollY)), this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < this.minScrollX, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < this.minScrollY, this.hasHorizontalScroll || (this.maxScrollX = this.minScrollX, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = this.minScrollY, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = Rt(this.wrapper), this.trigger("refresh"), !this.scaled && this.resetPosition();
  }, i.prototype.enable = function() {
    this.enabled = !0;
  }, i.prototype.disable = function() {
    this.enabled = !1;
  };
}
var y = {
  // easeOutQuint
  swipe: {
    style: "cubic-bezier(0.23, 1, 0.32, 1)",
    fn: function(t) {
      return 1 + --t * t * t * t * t;
    }
  },
  // easeOutQuard
  swipeBounce: {
    style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    fn: function(t) {
      return t * (2 - t);
    }
  },
  // easeOutQuart
  bounce: {
    style: "cubic-bezier(0.165, 0.84, 0.44, 1)",
    fn: function(t) {
      return 1 - --t * t * t * t;
    }
  }
};
function _t(i, t, e, s, o, n, r) {
  var h = i - t, a = Math.abs(h) / e, c = r.deceleration, u = r.itemHeight, p = r.swipeBounceTime, d = r.wheel, f = r.swipeTime, l = f, m = d ? 4 : 15, w = i + a / c * (h < 0 ? -1 : 1);
  return d && u && (w = Math.round(w / u) * u), w < s ? (w = n ? Math.max(s - n / 4, s - n / m * a) : s, l = p) : w > o && (w = n ? Math.min(o + n / 4, o + n / m * a) : o, l = p), {
    destination: Math.round(w),
    duration: l
  };
}
var Bt = 100 / 60;
function Ht() {
}
var nt = function() {
  return X ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || // if all else fails, use setTimeout
  function(i) {
    return window.setTimeout(i, (i.interval || Bt) / 2);
  } : Ht;
}(), E = function() {
  return X ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function(i) {
    window.clearTimeout(i);
  } : Ht;
}(), C = 1, q = -1, rt = 1, ht = -1, Tt = 1, U = 3;
function K(i) {
  console.error("[BScroll warn]: " + i);
}
function j(i, t) {
  if (!i)
    throw new Error("[BScroll] " + t);
}
function ti(i) {
  i.prototype._start = function(t) {
    var e = H[t.type];
    if (!(e !== F && t.button !== 0) && !(!this.enabled || this.destroyed || this.initiated && this.initiated !== e)) {
      this.initiated = e, this.options.preventDefault && !V(t.target, this.options.preventDefaultException) && t.preventDefault(), this.options.stopPropagation && t.stopPropagation(), this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.movingDirectionX = 0, this.movingDirectionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = Y(), this.options.wheel && (this.target = t.target), this.stop();
      var s = t.touches ? t.touches[0] : t;
      this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = s.pageX, this.pointY = s.pageY, this.trigger("beforeScrollStart");
    }
  }, i.prototype._move = function(t) {
    if (!(!this.enabled || this.destroyed || H[t.type] !== this.initiated)) {
      this.options.preventDefault && t.preventDefault(), this.options.stopPropagation && t.stopPropagation();
      var e = t.touches ? t.touches[0] : t, s = e.pageX - this.pointX, o = e.pageY - this.pointY;
      this.pointX = e.pageX, this.pointY = e.pageY, this.distX += s, this.distY += o;
      var n = Math.abs(this.distX), r = Math.abs(this.distY), h = Y();
      if (!(h - this.endTime > this.options.momentumLimitTime && r < this.options.momentumLimitDistance && n < this.options.momentumLimitDistance)) {
        if (!this.directionLocked && !this.options.freeScroll && (n > r + this.options.directionLockThreshold ? this.directionLocked = "h" : r >= n + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), this.directionLocked === "h") {
          if (this.options.eventPassthrough === "vertical")
            t.preventDefault();
          else if (this.options.eventPassthrough === "horizontal") {
            this.initiated = !1;
            return;
          }
          o = 0;
        } else if (this.directionLocked === "v") {
          if (this.options.eventPassthrough === "horizontal")
            t.preventDefault();
          else if (this.options.eventPassthrough === "vertical") {
            this.initiated = !1;
            return;
          }
          s = 0;
        }
        s = this.hasHorizontalScroll ? s : 0, o = this.hasVerticalScroll ? o : 0, this.movingDirectionX = s > 0 ? ht : s < 0 ? rt : 0, this.movingDirectionY = o > 0 ? q : o < 0 ? C : 0;
        var a = this.x + s, c = this.y + o, u = !1, p = !1, d = !1, f = !1, l = this.options.bounce;
        l !== !1 && (u = l.top === void 0 ? !0 : l.top, p = l.bottom === void 0 ? !0 : l.bottom, d = l.left === void 0 ? !0 : l.left, f = l.right === void 0 ? !0 : l.right), (a > this.minScrollX || a < this.maxScrollX) && (a > this.minScrollX && d || a < this.maxScrollX && f ? a = this.x + s / 3 : a = a > this.minScrollX ? this.minScrollX : this.maxScrollX), (c > this.minScrollY || c < this.maxScrollY) && (c > this.minScrollY && u || c < this.maxScrollY && p ? c = this.y + o / 3 : c = c > this.minScrollY ? this.minScrollY : this.maxScrollY), this.moved || (this.moved = !0, this.trigger("scrollStart")), this._translate(a, c), h - this.startTime > this.options.momentumLimitTime && (this.startTime = h, this.startX = this.x, this.startY = this.y, this.options.probeType === Tt && this.trigger("scroll", {
          x: this.x,
          y: this.y
        })), this.options.probeType > Tt && this.trigger("scroll", {
          x: this.x,
          y: this.y
        });
        var m = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft, w = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop, P = this.pointX - m, b = this.pointY - w;
        (P > document.documentElement.clientWidth - this.options.momentumLimitDistance || P < this.options.momentumLimitDistance || b < this.options.momentumLimitDistance || b > document.documentElement.clientHeight - this.options.momentumLimitDistance) && this._end(t);
      }
    }
  }, i.prototype._end = function(t) {
    if (!(!this.enabled || this.destroyed || H[t.type] !== this.initiated)) {
      this.initiated = !1, this.options.preventDefault && !V(t.target, this.options.preventDefaultException) && t.preventDefault(), this.options.stopPropagation && t.stopPropagation(), this.trigger("touchEnd", {
        x: this.x,
        y: this.y
      }), this.isInTransition = !1;
      var e = Math.round(this.x), s = Math.round(this.y), o = e - this.absStartX, n = s - this.absStartY;
      if (this.directionX = o > 0 ? ht : o < 0 ? rt : 0, this.directionY = n > 0 ? q : n < 0 ? C : 0, !(this.options.pullDownRefresh && this._checkPullDown())) {
        if (this._checkClick(t)) {
          this.trigger("scrollCancel");
          return;
        }
        if (!this.resetPosition(this.options.bounceTime, y.bounce)) {
          this._translate(e, s), this.endTime = Y();
          var r = this.endTime - this.startTime, h = Math.abs(e - this.startX), a = Math.abs(s - this.startY);
          if (this._events.flick && r < this.options.flickLimitTime && h < this.options.flickLimitDistance && a < this.options.flickLimitDistance) {
            this.trigger("flick");
            return;
          }
          var c = 0;
          if (this.options.momentum && r < this.options.momentumLimitTime && (a > this.options.momentumLimitDistance || h > this.options.momentumLimitDistance)) {
            var u = !1, p = !1, d = !1, f = !1, l = this.options.bounce;
            l !== !1 && (u = l.top === void 0 ? !0 : l.top, p = l.bottom === void 0 ? !0 : l.bottom, d = l.left === void 0 ? !0 : l.left, f = l.right === void 0 ? !0 : l.right);
            var m = this.directionX === ht && d || this.directionX === rt && f ? this.wrapperWidth : 0, w = this.directionY === q && u || this.directionY === C && p ? this.wrapperHeight : 0, P = this.hasHorizontalScroll ? _t(this.x, this.startX, r, this.maxScrollX, this.minScrollX, m, this.options) : { destination: e, duration: 0 }, b = this.hasVerticalScroll ? _t(this.y, this.startY, r, this.maxScrollY, this.minScrollY, w, this.options) : { destination: s, duration: 0 };
            e = P.destination, s = b.destination, c = Math.max(P.duration, b.duration), this.isInTransition = !0;
          } else
            this.options.wheel && (s = Math.round(s / this.itemHeight) * this.itemHeight, c = this.options.wheel.adjustTime || 400);
          var B = y.swipe;
          if (this.options.snap) {
            var L = this._nearestSnap(e, s);
            this.currentPage = L, c = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(e - L.x), 1e3), Math.min(Math.abs(s - L.y), 1e3)), 300), e = L.x, s = L.y, this.directionX = 0, this.directionY = 0, B = this.options.snap.easing || y.bounce;
          }
          if (e !== this.x || s !== this.y) {
            (e > this.minScrollX || e < this.maxScrollX || s > this.minScrollY || s < this.maxScrollY) && (B = y.swipeBounce), this.scrollTo(e, s, c, B);
            return;
          }
          this.options.wheel && (this.selectedIndex = Math.round(Math.abs(this.y / this.itemHeight))), this.trigger("scrollEnd", {
            x: this.x,
            y: this.y
          });
        }
      }
    }
  }, i.prototype._checkClick = function(t) {
    var e = this.stopFromTransition && !this.pulling;
    if (this.stopFromTransition = !1, !this.moved)
      if (this.options.wheel) {
        if (this.target && this.target.classList.contains(this.options.wheel.wheelWrapperClass)) {
          var s = Math.abs(Math.round(this.y / this.itemHeight)), o = Math.round((this.pointY + lt(this.wrapper).top - this.wrapperHeight / 2) / this.itemHeight);
          this.target = this.items[s + o];
        }
        return this.scrollToElement(this.target, this.options.wheel.adjustTime || 400, !0, !0, y.swipe), !0;
      } else {
        if (!e) {
          var n = this.options.dblclick, r = !1;
          if (n && this.lastClickTime) {
            var h = n.delay, a = h === void 0 ? 300 : h;
            Y() - this.lastClickTime < a && (r = !0, Zt(t));
          }
          return this.options.tap && jt(t, this.options.tap), this.options.click && !V(t.target, this.options.preventDefaultException) && Ct(t), this.lastClickTime = r ? null : Y(), !0;
        }
        return !1;
      }
    return !1;
  }, i.prototype._resize = function() {
    var t = this;
    this.enabled && ($t && (this.wrapper.scrollTop = 0), clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
      t.refresh();
    }, this.options.resizePolling));
  }, i.prototype._startProbe = function() {
    E(this.probeTimer), this.probeTimer = nt(e);
    var t = this;
    function e() {
      var s = t.getComputedPosition();
      if (t.trigger("scroll", s), !t.isInTransition) {
        t.trigger("scrollEnd", s);
        return;
      }
      t.probeTimer = nt(e);
    }
  }, i.prototype._transitionTime = function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    if (this.scrollerStyle[_.transitionDuration] = t + "ms", this.options.wheel)
      for (var e = 0; e < this.items.length; e++)
        this.items[e].style[_.transitionDuration] = t + "ms";
    if (this.indicators)
      for (var s = 0; s < this.indicators.length; s++)
        this.indicators[s].transitionTime(t);
  }, i.prototype._transitionTimingFunction = function(t) {
    if (this.scrollerStyle[_.transitionTimingFunction] = t, this.options.wheel)
      for (var e = 0; e < this.items.length; e++)
        this.items[e].style[_.transitionTimingFunction] = t;
    if (this.indicators)
      for (var s = 0; s < this.indicators.length; s++)
        this.indicators[s].transitionTimingFunction(t);
  }, i.prototype._transitionEnd = function(t) {
    if (!(t.target !== this.scroller || !this.isInTransition)) {
      this._transitionTime();
      var e = !this.pulling || this.movingDirectionY === C;
      e && !this.resetPosition(this.options.bounceTime, y.bounce) && (this.isInTransition = !1, this.options.probeType !== U && this.trigger("scrollEnd", {
        x: this.x,
        y: this.y
      }));
    }
  }, i.prototype._translate = function(t, e, s) {
    if (j(!$(t) && !$(e), "Translate x or y is null or undefined."), $(s) && (s = this.scale), this.options.useTransform ? this.scrollerStyle[_.transform] = "translate(" + t + "px," + e + "px) scale(" + s + ")" + this.translateZ : (t = Math.round(t), e = Math.round(e), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = e + "px"), this.options.wheel)
      for (var o = this.options.wheel.rotate, n = o === void 0 ? 25 : o, r = 0; r < this.items.length; r++) {
        var h = n * (e / this.itemHeight + r);
        this.items[r].style[_.transform] = "rotateX(" + h + "deg)";
      }
    if (this.x = t, this.y = e, this.setScale(s), this.indicators)
      for (var a = 0; a < this.indicators.length; a++)
        this.indicators[a].updatePosition();
  }, i.prototype._animate = function(t, e, s, o) {
    var n = this, r = this.x, h = this.y, a = this.lastScale, c = this.scale, u = Y(), p = u + s;
    function d() {
      var f = Y();
      if (f >= p) {
        n.isAnimating = !1, n._translate(t, e, c), n.trigger("scroll", {
          x: n.x,
          y: n.y
        }), !n.pulling && !n.resetPosition(n.options.bounceTime) && n.trigger("scrollEnd", {
          x: n.x,
          y: n.y
        });
        return;
      }
      f = (f - u) / s;
      var l = o(f), m = (t - r) * l + r, w = (e - h) * l + h, P = (c - a) * l + a;
      n._translate(m, w, P), n.isAnimating && (n.animateTimer = nt(d)), n.options.probeType === U && n.trigger("scroll", {
        x: n.x,
        y: n.y
      });
    }
    this.isAnimating = !0, E(this.animateTimer), d();
  }, i.prototype.scrollBy = function(t, e) {
    var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : y.bounce;
    t = this.x + t, e = this.y + e, this.scrollTo(t, e, s, o);
  }, i.prototype.scrollTo = function(t, e) {
    var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : y.bounce;
    this.isInTransition = this.options.useTransition && s > 0 && (t !== this.x || e !== this.y), !s || this.options.useTransition ? (this._transitionTimingFunction(o.style), this._transitionTime(s), this._translate(t, e), s && this.options.probeType === U && this._startProbe(), !s && (t !== this.x || e !== this.y) && (this.trigger("scroll", {
      x: t,
      y: e
    }), this._reflow = document.body.offsetHeight, this.resetPosition(this.options.bounceTime, y.bounce) || this.trigger("scrollEnd", {
      x: t,
      y: e
    })), this.options.wheel && (e > this.minScrollY ? this.selectedIndex = 0 : e < this.maxScrollY ? this.selectedIndex = this.items.length - 1 : this.selectedIndex = Math.round(Math.abs(e / this.itemHeight)))) : this._animate(t, e, s, o.fn);
  }, i.prototype.scrollToElement = function(t, e, s, o, n) {
    if (t && (t = t.nodeType ? t : this.scroller.querySelector(t), !(this.options.wheel && !t.classList.contains(this.options.wheel.wheelItemClass)))) {
      var r = Rt(t);
      r.left -= this.wrapperOffset.left, r.top -= this.wrapperOffset.top, s === !0 && (s = Math.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), o === !0 && (o = Math.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), r.left -= s || 0, r.top -= o || 0, r.left = r.left > this.minScrollX ? this.minScrollX : r.left < this.maxScrollX ? this.maxScrollX : r.left, r.top = r.top > this.minScrollY ? this.minScrollY : r.top < this.maxScrollY ? this.maxScrollY : r.top, this.options.wheel && (r.top = Math.round(r.top / this.itemHeight) * this.itemHeight), this.scrollTo(r.left, r.top, e, n);
    }
  }, i.prototype.resetPosition = function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : y.bounce, s = this.x, o = Math.round(s);
    !this.hasHorizontalScroll || o > this.minScrollX ? s = this.minScrollX : o < this.maxScrollX && (s = this.maxScrollX);
    var n = this.y, r = Math.round(n);
    return !this.hasVerticalScroll || r > this.minScrollY ? n = this.minScrollY : r < this.maxScrollY && (n = this.maxScrollY), s === this.x && n === this.y ? !1 : (this.scrollTo(s, n, t, e), !0);
  }, i.prototype.getComputedPosition = function() {
    var t = window.getComputedStyle(this.scroller, null), e = void 0, s = void 0;
    return this.options.useTransform ? (t = t[_.transform].split(")")[0].split(", "), e = +(t[12] || t[4]), s = +(t[13] || t[5])) : (e = +t.left.replace(/[^-\d.]/g, ""), s = +t.top.replace(/[^-\d.]/g, "")), {
      x: e,
      y: s
    };
  }, i.prototype.stop = function() {
    if (this.options.useTransition && this.isInTransition) {
      this.isInTransition = !1, E(this.probeTimer);
      var t = this.getComputedPosition();
      this._translate(t.x, t.y), this.options.wheel ? this.target = this.items[Math.round(-t.y / this.itemHeight)] : this.trigger("scrollEnd", {
        x: this.x,
        y: this.y
      }), this.stopFromTransition = !0;
    } else
      !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, E(this.animateTimer), this.trigger("scrollEnd", {
        x: this.x,
        y: this.y
      }), this.stopFromTransition = !0);
  }, i.prototype.destroy = function() {
    this.destroyed = !0, this.trigger("destroy"), this.options.useTransition ? E(this.probeTimer) : E(this.animateTimer), this._removeDOMEvents(), this._events = {};
  };
}
function ii(i) {
  i.prototype._initSnap = function() {
    var t = this;
    this.currentPage = {};
    var e = this.options.snap;
    if (e.loop) {
      var s = this.scroller.children;
      s.length > 1 ? (Gt(s[s.length - 1].cloneNode(!0), this.scroller), this.scroller.appendChild(s[1].cloneNode(!0))) : e.loop = !1;
    }
    var o = e.el;
    typeof o == "string" && (o = this.scroller.querySelectorAll(o)), this.on("refresh", function() {
      if (t.pages = [], !(!t.wrapperWidth || !t.wrapperHeight || !t.scrollerWidth || !t.scrollerHeight)) {
        var n = e.stepX || t.wrapperWidth, r = e.stepY || t.wrapperHeight, h = 0, a = void 0, c = void 0, u = void 0, p = 0, d = void 0, f = 0, l = void 0, m = void 0;
        if (o)
          for (d = o.length, l = -1; p < d; p++)
            m = I(o[p]), (p === 0 || m.left <= I(o[p - 1]).left) && (f = 0, l++), t.pages[f] || (t.pages[f] = []), h = Math.max(-m.left, t.maxScrollX), a = Math.max(-m.top, t.maxScrollY), c = h - Math.round(m.width / 2), u = a - Math.round(m.height / 2), t.pages[f][l] = {
              x: h,
              y: a,
              width: m.width,
              height: m.height,
              cx: c,
              cy: u
            }, h > t.maxScrollX && f++;
        else
          for (c = Math.round(n / 2), u = Math.round(r / 2); h > -t.scrollerWidth; ) {
            for (t.pages[p] = [], d = 0, a = 0; a > -t.scrollerHeight; )
              t.pages[p][d] = {
                x: Math.max(h, t.maxScrollX),
                y: Math.max(a, t.maxScrollY),
                width: n,
                height: r,
                cx: h - c,
                cy: a - u
              }, a -= r, d++;
            h -= n, p++;
          }
        t._checkSnapLoop();
        var w = e._loopX ? 1 : 0, P = e._loopY ? 1 : 0;
        t._goToPage(t.currentPage.pageX || w, t.currentPage.pageY || P, 0);
        var b = e.threshold;
        b % 1 === 0 ? (t.snapThresholdX = b, t.snapThresholdY = b) : (t.snapThresholdX = Math.round(t.pages[t.currentPage.pageX][t.currentPage.pageY].width * b), t.snapThresholdY = Math.round(t.pages[t.currentPage.pageX][t.currentPage.pageY].height * b));
      }
    }), this.on("scrollEnd", function() {
      e.loop && (e._loopX ? (t.currentPage.pageX === 0 && t._goToPage(t.pages.length - 2, t.currentPage.pageY, 0), t.currentPage.pageX === t.pages.length - 1 && t._goToPage(1, t.currentPage.pageY, 0)) : (t.currentPage.pageY === 0 && t._goToPage(t.currentPage.pageX, t.pages[0].length - 2, 0), t.currentPage.pageY === t.pages[0].length - 1 && t._goToPage(t.currentPage.pageX, 1, 0)));
    }), e.listenFlick !== !1 && this.on("flick", function() {
      var n = e.speed || Math.max(Math.max(Math.min(Math.abs(t.x - t.startX), 1e3), Math.min(Math.abs(t.y - t.startY), 1e3)), 300);
      t._goToPage(t.currentPage.pageX + t.directionX, t.currentPage.pageY + t.directionY, n);
    }), this.on("destroy", function() {
      if (e.loop) {
        var n = t.scroller.children;
        n.length > 2 && (yt(t.scroller, n[n.length - 1]), yt(t.scroller, n[0]));
      }
    });
  }, i.prototype._checkSnapLoop = function() {
    var t = this.options.snap;
    !t.loop || !this.pages || !this.pages.length || (this.pages.length > 1 && (t._loopX = !0), this.pages[0] && this.pages[0].length > 1 && (t._loopY = !0), t._loopX && t._loopY && K("Loop does not support two direction at the same time."));
  }, i.prototype._nearestSnap = function(t, e) {
    if (!this.pages.length)
      return { x: 0, y: 0, pageX: 0, pageY: 0 };
    var s = 0;
    if (Math.abs(t - this.absStartX) <= this.snapThresholdX && Math.abs(e - this.absStartY) <= this.snapThresholdY)
      return this.currentPage;
    t > this.minScrollX ? t = this.minScrollX : t < this.maxScrollX && (t = this.maxScrollX), e > this.minScrollY ? e = this.minScrollY : e < this.maxScrollY && (e = this.maxScrollY);
    for (var o = this.pages.length; s < o; s++)
      if (t >= this.pages[s][0].cx) {
        t = this.pages[s][0].x;
        break;
      }
    o = this.pages[s].length;
    for (var n = 0; n < o; n++)
      if (e >= this.pages[0][n].cy) {
        e = this.pages[0][n].y;
        break;
      }
    return s === this.currentPage.pageX && (s += this.directionX, s < 0 ? s = 0 : s >= this.pages.length && (s = this.pages.length - 1), t = this.pages[s][0].x), n === this.currentPage.pageY && (n += this.directionY, n < 0 ? n = 0 : n >= this.pages[0].length && (n = this.pages[0].length - 1), e = this.pages[0][n].y), {
      x: t,
      y: e,
      pageX: s,
      pageY: n
    };
  }, i.prototype._goToPage = function(t) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, s = arguments[2], o = arguments[3], n = this.options.snap;
    if (!(!n || !this.pages || !this.pages.length) && (o = o || n.easing || y.bounce, t >= this.pages.length ? t = this.pages.length - 1 : t < 0 && (t = 0), !!this.pages[t])) {
      e >= this.pages[t].length ? e = this.pages[t].length - 1 : e < 0 && (e = 0);
      var r = this.pages[t][e].x, h = this.pages[t][e].y;
      s = s === void 0 ? n.speed || Math.max(Math.max(Math.min(Math.abs(r - this.x), 1e3), Math.min(Math.abs(h - this.y), 1e3)), 300) : s, this.currentPage = {
        x: r,
        y: h,
        pageX: t,
        pageY: e
      }, this.scrollTo(r, h, s, o);
    }
  }, i.prototype.goToPage = function(t, e, s, o) {
    var n = this.options.snap;
    if (!(!n || !this.pages || !this.pages.length)) {
      if (n.loop) {
        var r = void 0;
        n._loopX ? (r = this.pages.length - 2, t >= r ? t = r - 1 : t < 0 && (t = 0), t += 1) : (r = this.pages[0].length - 2, e >= r ? e = r - 1 : e < 0 && (e = 0), e += 1);
      }
      this._goToPage(t, e, s, o);
    }
  }, i.prototype.next = function(t, e) {
    var s = this.options.snap;
    if (s) {
      var o = this.currentPage.pageX, n = this.currentPage.pageY;
      o++, o >= this.pages.length && this.hasVerticalScroll && (o = 0, n++), this._goToPage(o, n, t, e);
    }
  }, i.prototype.prev = function(t, e) {
    var s = this.options.snap;
    if (s) {
      var o = this.currentPage.pageX, n = this.currentPage.pageY;
      o--, o < 0 && this.hasVerticalScroll && (o = 0, n--), this._goToPage(o, n, t, e);
    }
  }, i.prototype.getCurrentPage = function() {
    var t = this.options.snap;
    if (!t)
      return null;
    if (t.loop) {
      var e = void 0;
      return t._loopX ? e = k({}, this.currentPage, {
        pageX: this.currentPage.pageX - 1
      }) : e = k({}, this.currentPage, {
        pageY: this.currentPage.pageY - 1
      }), e;
    }
    return this.currentPage;
  };
}
function ei(i) {
  i.prototype.wheelTo = function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    this.options.wheel && (this.y = -t * this.itemHeight, this.scrollTo(0, this.y));
  }, i.prototype.getSelectedIndex = function() {
    return this.options.wheel && this.selectedIndex;
  }, i.prototype._initWheel = function() {
    var t = this.options.wheel;
    t.wheelWrapperClass || (t.wheelWrapperClass = "wheel-scroll"), t.wheelItemClass || (t.wheelItemClass = "wheel-item"), t.selectedIndex === void 0 && (t.selectedIndex = 0, K("wheel option selectedIndex is required!"));
  };
}
var R = 8;
function si(i) {
  i.prototype._initScrollbar = function() {
    var t = this, e = this.options.scrollbar, s = e.fade, o = s === void 0 ? !0 : s, n = e.interactive, r = n === void 0 ? !1 : n;
    this.indicators = [];
    var h = void 0;
    this.options.scrollX && (h = {
      el: bt("horizontal"),
      direction: "horizontal",
      fade: o,
      interactive: r
    }, this._insertScrollBar(h.el), this.indicators.push(new g(this, h))), this.options.scrollY && (h = {
      el: bt("vertical"),
      direction: "vertical",
      fade: o,
      interactive: r
    }, this._insertScrollBar(h.el), this.indicators.push(new g(this, h))), this.on("refresh", function() {
      for (var a = 0; a < t.indicators.length; a++)
        t.indicators[a].refresh();
    }), o && (this.on("scrollEnd", function() {
      for (var a = 0; a < t.indicators.length; a++)
        t.indicators[a].fade();
    }), this.on("scrollCancel", function() {
      for (var a = 0; a < t.indicators.length; a++)
        t.indicators[a].fade();
    }), this.on("scrollStart", function() {
      for (var a = 0; a < t.indicators.length; a++)
        t.indicators[a].fade(!0);
    }), this.on("beforeScrollStart", function() {
      for (var a = 0; a < t.indicators.length; a++)
        t.indicators[a].fade(!0, !0);
    })), this.on("destroy", function() {
      t._removeScrollBars();
    });
  }, i.prototype._insertScrollBar = function(t) {
    this.wrapper.appendChild(t);
  }, i.prototype._removeScrollBars = function() {
    for (var t = 0; t < this.indicators.length; t++)
      this.indicators[t].destroy();
  };
}
function bt(i) {
  var t = document.createElement("div"), e = document.createElement("div");
  return t.style.cssText = "position:absolute;z-index:9999;pointerEvents:none", e.style.cssText = "box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;", e.className = "bscroll-indicator", i === "horizontal" ? (t.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", e.style.height = "100%", t.className = "bscroll-horizontal-scrollbar") : (t.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", e.style.width = "100%", t.className = "bscroll-vertical-scrollbar"), t.style.cssText += ";overflow:hidden", t.appendChild(e), t;
}
function g(i, t) {
  this.wrapper = t.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = i, this.direction = t.direction, t.fade ? (this.visible = 0, this.wrapperStyle.opacity = "0") : this.visible = 1, this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.x = 0, this.y = 0, t.interactive && this._addDOMEvents();
}
g.prototype.handleEvent = function(i) {
  switch (i.type) {
    case "touchstart":
    case "mousedown":
      this._start(i);
      break;
    case "touchmove":
    case "mousemove":
      this._move(i);
      break;
    case "touchend":
    case "mouseup":
    case "touchcancel":
    case "mousecancel":
      this._end(i);
      break;
  }
};
g.prototype.refresh = function() {
  this._shouldShow() && (this.transitionTime(), this._calculate(), this.updatePosition());
};
g.prototype.fade = function(i, t) {
  var e = this;
  if (!(t && !this.visible)) {
    var s = i ? 250 : 500;
    i = i ? "1" : "0", this.wrapperStyle[_.transitionDuration] = s + "ms", clearTimeout(this.fadeTimeout), this.fadeTimeout = setTimeout(function() {
      e.wrapperStyle.opacity = i, e.visible = +i;
    }, 0);
  }
};
g.prototype.updatePosition = function() {
  if (this.direction === "vertical") {
    var i = Math.round(this.sizeRatioY * this.scroller.y);
    if (i < 0) {
      this.transitionTime(500);
      var t = Math.max(this.indicatorHeight + i * 3, R);
      this.indicatorStyle.height = t + "px", i = 0;
    } else if (i > this.maxPosY) {
      this.transitionTime(500);
      var e = Math.max(this.indicatorHeight - (i - this.maxPosY) * 3, R);
      this.indicatorStyle.height = e + "px", i = this.maxPosY + this.indicatorHeight - e;
    } else
      this.indicatorStyle.height = this.indicatorHeight + "px";
    this.y = i, this.scroller.options.useTransform ? this.indicatorStyle[_.transform] = "translateY(" + i + "px)" + this.scroller.translateZ : this.indicatorStyle.top = i + "px";
  } else {
    var s = Math.round(this.sizeRatioX * this.scroller.x);
    if (s < 0) {
      this.transitionTime(500);
      var o = Math.max(this.indicatorWidth + s * 3, R);
      this.indicatorStyle.width = o + "px", s = 0;
    } else if (s > this.maxPosX) {
      this.transitionTime(500);
      var n = Math.max(this.indicatorWidth - (s - this.maxPosX) * 3, R);
      this.indicatorStyle.width = n + "px", s = this.maxPosX + this.indicatorWidth - n;
    } else
      this.indicatorStyle.width = this.indicatorWidth + "px";
    this.x = s, this.scroller.options.useTransform ? this.indicatorStyle[_.transform] = "translateX(" + s + "px)" + this.scroller.translateZ : this.indicatorStyle.left = s + "px";
  }
};
g.prototype.transitionTime = function() {
  var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
  this.indicatorStyle[_.transitionDuration] = i + "ms";
};
g.prototype.transitionTimingFunction = function(i) {
  this.indicatorStyle[_.transitionTimingFunction] = i;
};
g.prototype.destroy = function() {
  this._removeDOMEvents(), this.wrapper.parentNode.removeChild(this.wrapper);
};
g.prototype._start = function(i) {
  var t = i.touches ? i.touches[0] : i;
  i.preventDefault(), i.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = t.pageX, this.lastPointY = t.pageY, this.startTime = Y(), this._handleMoveEvents(J), this.scroller.trigger("beforeScrollStart");
};
g.prototype._move = function(i) {
  var t = i.touches ? i.touches[0] : i;
  i.preventDefault(), i.stopPropagation(), this.moved || this.scroller.trigger("scrollStart"), this.moved = !0;
  var e = t.pageX - this.lastPointX;
  this.lastPointX = t.pageX;
  var s = t.pageY - this.lastPointY;
  this.lastPointY = t.pageY;
  var o = this.x + e, n = this.y + s;
  this._pos(o, n);
};
g.prototype._end = function(i) {
  if (this.initiated) {
    this.initiated = !1, i.preventDefault(), i.stopPropagation(), this._handleMoveEvents(Q);
    var t = this.scroller.options.snap;
    if (t) {
      var e = t.speed, s = t.easing, o = s === void 0 ? y.bounce : s, n = this.scroller._nearestSnap(this.scroller.x, this.scroller.y), r = e || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - n.x), 1e3), Math.min(Math.abs(this.scroller.y - n.y), 1e3)), 300);
      (this.scroller.x !== n.x || this.scroller.y !== n.y) && (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = n, this.scroller.scrollTo(n.x, n.y, r, o));
    }
    this.moved && this.scroller.trigger("scrollEnd", {
      x: this.scroller.x,
      y: this.scroller.y
    });
  }
};
g.prototype._pos = function(i, t) {
  i < 0 ? i = 0 : i > this.maxPosX && (i = this.maxPosX), t < 0 ? t = 0 : t > this.maxPosY && (t = this.maxPosY), i = Math.round(i / this.sizeRatioX), t = Math.round(t / this.sizeRatioY), this.scroller.scrollTo(i, t), this.scroller.trigger("scroll", {
    x: this.scroller.x,
    y: this.scroller.y
  });
};
g.prototype._shouldShow = function() {
  return this.direction === "vertical" && this.scroller.hasVerticalScroll || this.direction === "horizontal" && this.scroller.hasHorizontalScroll ? (this.wrapper.style.display = "", !0) : (this.wrapper.style.display = "none", !1);
};
g.prototype._calculate = function() {
  if (this.direction === "vertical") {
    var i = this.wrapper.clientHeight;
    this.indicatorHeight = Math.max(Math.round(i * i / (this.scroller.scrollerHeight || i || 1)), R), this.indicatorStyle.height = this.indicatorHeight + "px", this.maxPosY = i - this.indicatorHeight, this.sizeRatioY = this.maxPosY / this.scroller.maxScrollY;
  } else {
    var t = this.wrapper.clientWidth;
    this.indicatorWidth = Math.max(Math.round(t * t / (this.scroller.scrollerWidth || t || 1)), R), this.indicatorStyle.width = this.indicatorWidth + "px", this.maxPosX = t - this.indicatorWidth, this.sizeRatioX = this.maxPosX / this.scroller.maxScrollX;
  }
};
g.prototype._addDOMEvents = function() {
  var i = J;
  this._handleDOMEvents(i);
};
g.prototype._removeDOMEvents = function() {
  var i = Q;
  this._handleDOMEvents(i), this._handleMoveEvents(i);
};
g.prototype._handleMoveEvents = function(i) {
  this.scroller.options.disableTouch || i(window, "touchmove", this), this.scroller.options.disableMouse || i(window, "mousemove", this);
};
g.prototype._handleDOMEvents = function(i) {
  this.scroller.options.disableTouch || (i(this.indicator, "touchstart", this), i(window, "touchend", this)), this.scroller.options.disableMouse || (i(this.indicator, "mousedown", this), i(window, "mouseup", this));
};
function oi(i) {
  i.prototype._initPullDown = function() {
    this.options.probeType = U;
  }, i.prototype._checkPullDown = function() {
    var t = this.options.pullDownRefresh, e = t.threshold, s = e === void 0 ? 90 : e, o = t.stop, n = o === void 0 ? 40 : o;
    return this.directionY !== q || this.y < s ? !1 : (this.pulling || (this.pulling = !0, this.trigger("pullingDown")), this.scrollTo(this.x, n, this.options.bounceTime, y.bounce), this.pulling);
  }, i.prototype.finishPullDown = function() {
    this.pulling = !1, this.resetPosition(this.options.bounceTime, y.bounce);
  }, i.prototype.openPullDown = function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    this.options.pullDownRefresh = t, this._initPullDown();
  }, i.prototype.closePullDown = function() {
    this.options.pullDownRefresh = !1;
  };
}
function ni(i) {
  i.prototype._initPullUp = function() {
    this.options.probeType = U, this.pullupWatching = !1, this._watchPullUp();
  }, i.prototype._watchPullUp = function() {
    this.pullupWatching || (this.pullupWatching = !0, this.on("scroll", this._checkToEnd));
  }, i.prototype._checkToEnd = function(t) {
    var e = this, s = this.options.pullUpLoad.threshold, o = s === void 0 ? 0 : s;
    this.movingDirectionY === C && t.y <= this.maxScrollY + o && (this.once("scrollEnd", function() {
      e.pullupWatching = !1;
    }), this.trigger("pullingUp"), this.off("scroll", this._checkToEnd));
  }, i.prototype.finishPullUp = function() {
    var t = this;
    this.pullupWatching ? this.once("scrollEnd", function() {
      t._watchPullUp();
    }) : this._watchPullUp();
  }, i.prototype.openPullUp = function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    this.options.pullUpLoad = t, this._initPullUp();
  }, i.prototype.closePullUp = function() {
    this.options.pullUpLoad = !1, this.pullupWatching && (this.pullupWatching = !1, this.off("scroll", this._checkToEnd));
  };
}
function ri(i) {
  i.prototype._initMouseWheel = function() {
    var t = this;
    this._handleMouseWheelEvent(J), this.on("destroy", function() {
      clearTimeout(t.mouseWheelTimer), clearTimeout(t.mouseWheelEndTimer), t._handleMouseWheelEvent(Q);
    }), this.firstWheelOpreation = !0;
  }, i.prototype._handleMouseWheelEvent = function(t) {
    t(this.wrapper, "wheel", this), t(this.wrapper, "mousewheel", this), t(this.wrapper, "DOMMouseScroll", this);
  }, i.prototype._onMouseWheel = function(t) {
    var e = this;
    if (this.enabled) {
      t.preventDefault(), this.options.stopPropagation && t.stopPropagation(), this.firstWheelOpreation && this.trigger("scrollStart"), this.firstWheelOpreation = !1;
      var s = this.options.mouseWheel, o = s.speed, n = o === void 0 ? 20 : o, r = s.invert, h = r === void 0 ? !1 : r, a = s.easeTime, c = a === void 0 ? 300 : a;
      clearTimeout(this.mouseWheelTimer), this.mouseWheelTimer = setTimeout(function() {
        !e.options.snap && !c && e.trigger("scrollEnd", {
          x: e.x,
          y: e.y
        }), e.firstWheelOpreation = !0;
      }, 400);
      var u = void 0, p = void 0;
      switch (!0) {
        case "deltaX" in t:
          t.deltaMode === 1 ? (u = -t.deltaX * n, p = -t.deltaY * n) : (u = -t.deltaX, p = -t.deltaY);
          break;
        case "wheelDeltaX" in t:
          u = t.wheelDeltaX / 120 * n, p = t.wheelDeltaY / 120 * n;
          break;
        case "wheelDelta" in t:
          u = p = t.wheelDelta / 120 * n;
          break;
        case "detail" in t:
          u = p = -t.detail / 3 * n;
          break;
        default:
          return;
      }
      var d = h ? -1 : 1;
      u *= d, p *= d, this.hasVerticalScroll || (u = p, p = 0);
      var f = void 0, l = void 0;
      if (this.options.snap) {
        f = this.currentPage.pageX, l = this.currentPage.pageY, u > 0 ? f-- : u < 0 && f++, p > 0 ? l-- : p < 0 && l++, this._goToPage(f, l);
        return;
      }
      f = this.x + Math.round(this.hasHorizontalScroll ? u : 0), l = this.y + Math.round(this.hasVerticalScroll ? p : 0), this.movingDirectionX = this.directionX = u > 0 ? -1 : u < 0 ? 1 : 0, this.movingDirectionY = this.directionY = p > 0 ? -1 : p < 0 ? 1 : 0, f > this.minScrollX ? f = this.minScrollX : f < this.maxScrollX && (f = this.maxScrollX), l > this.minScrollY ? l = this.minScrollY : l < this.maxScrollY && (l = this.maxScrollY);
      var m = this.y === l;
      this.scrollTo(f, l, c, y.swipe), this.trigger("scroll", {
        x: this.x,
        y: this.y
      }), clearTimeout(this.mouseWheelEndTimer), m && (this.mouseWheelEndTimer = setTimeout(function() {
        e.trigger("scrollEnd", {
          x: e.x,
          y: e.y
        });
      }, c));
    }
  };
}
function hi(i) {
  i.prototype._initZoom = function() {
    var t = this.options.zoom, e = t.start, s = e === void 0 ? 1 : e, o = t.min, n = o === void 0 ? 1 : o, r = t.max, h = r === void 0 ? 4 : r;
    this.scale = Math.min(Math.max(s, n), h), this.setScale(this.scale), this.scrollerStyle[_.transformOrigin] = "0 0";
  }, i.prototype._zoomTo = function(t, e, s, o) {
    this.scaled = !0;
    var n = t / (o || this.scale);
    this.setScale(t), this.refresh();
    var r = Math.round(this.startX - (e - this.relativeX) * (n - 1)), h = Math.round(this.startY - (s - this.relativeY) * (n - 1));
    r > this.minScrollX ? r = this.minScrollX : r < this.maxScrollX && (r = this.maxScrollX), h > this.minScrollY ? h = this.minScrollY : h < this.maxScrollY && (h = this.maxScrollY), (this.x !== r || this.y !== h) && this.scrollTo(r, h, this.options.bounceTime), this.scaled = !1;
  }, i.prototype.zoomTo = function(t, e, s) {
    var o = lt(this.wrapper), n = o.left, r = o.top, h = e + n - this.x, a = s + r - this.y;
    this._zoomTo(t, h, a);
  }, i.prototype._zoomStart = function(t) {
    var e = t.touches[0], s = t.touches[1], o = Math.abs(e.pageX - s.pageX), n = Math.abs(e.pageY - s.pageY);
    this.startDistance = wt(o, n), this.startScale = this.scale;
    var r = lt(this.wrapper), h = r.left, a = r.top;
    this.originX = Math.abs(e.pageX + s.pageX) / 2 + h - this.x, this.originY = Math.abs(e.pageY + s.pageY) / 2 + a - this.y, this.trigger("zoomStart");
  }, i.prototype._zoom = function(t) {
    if (!(!this.enabled || this.destroyed || H[t.type] !== this.initiated)) {
      this.options.preventDefault && t.preventDefault(), this.options.stopPropagation && t.stopPropagation();
      var e = t.touches[0], s = t.touches[1], o = Math.abs(e.pageX - s.pageX), n = Math.abs(e.pageY - s.pageY), r = wt(o, n), h = r / this.startDistance * this.startScale;
      this.scaled = !0;
      var a = this.options.zoom, c = a.min, u = c === void 0 ? 1 : c, p = a.max, d = p === void 0 ? 4 : p;
      h < u ? h = 0.5 * u * Math.pow(2, h / u) : h > d && (h = 2 * d * Math.pow(0.5, d / h));
      var f = h / this.startScale, l = this.startX - (this.originX - this.relativeX) * (f - 1), m = this.startY - (this.originY - this.relativeY) * (f - 1);
      this.setScale(h), this.scrollTo(l, m, 0);
    }
  }, i.prototype._zoomEnd = function(t) {
    if (!(!this.enabled || this.destroyed || H[t.type] !== this.initiated)) {
      this.options.preventDefault && t.preventDefault(), this.options.stopPropagation && t.stopPropagation(), this.isInTransition = !1, this.isAnimating = !1, this.initiated = 0;
      var e = this.options.zoom, s = e.min, o = s === void 0 ? 1 : s, n = e.max, r = n === void 0 ? 4 : n, h = this.scale > r ? r : this.scale < o ? o : this.scale;
      this._zoomTo(h, this.originX, this.originY, this.startScale), this.trigger("zoomEnd");
    }
  };
}
var xt = 30, St = 10, z = 200, Ut = 2e3;
function ai(i) {
  i.prototype._initInfinite = function() {
    this.options.probeType = 3, this.maxScrollY = -Ut, this.infiniteScroller = new v(this, this.options.infinity);
  };
}
function dt(i) {
  if (i && i.classList)
    return i.classList.contains("tombstone");
}
function v(i, t) {
  var e = this;
  this.options = t, j(typeof this.options.createTombstone == "function", "Infinite scroll need createTombstone Function to create tombstone"), j(typeof this.options.fetch == "function", "Infinite scroll need fetch Function to fetch new data."), j(typeof this.options.render == "function", "Infinite scroll need render Function to render each item."), this.firstAttachedItem = 0, this.lastAttachedItem = 0, this.anchorScrollTop = 0, this.anchorItem = {
    index: 0,
    offset: 0
  }, this.tombstoneHeight = 0, this.tombstoneWidth = 0, this.tombstones = [], this.items = [], this.loadedItems = 0, this.requestInProgress = !1, this.hasMore = !0, this.scroller = i, this.wrapperEl = this.scroller.wrapper, this.scrollerEl = this.scroller.scroller, this.scroller.on("scroll", function() {
    e.onScroll();
  }), this.scroller.on("resize", function() {
    e.onResize();
  }), this.onResize();
}
v.prototype.onScroll = function() {
  var i = -this.scroller.y, t = i - this.anchorScrollTop;
  i === 0 ? this.anchorItem = {
    index: 0,
    offset: 0
  } : this.anchorItem = this._calculateAnchoredItem(this.anchorItem, t), this.anchorScrollTop = i;
  var e = this._calculateAnchoredItem(this.anchorItem, this.wrapperEl.offsetHeight), s = this.anchorItem.index, o = e.index;
  t < 0 ? (s -= xt, o += St) : (s -= St, o += xt), this.fill(s, o), this.maybeRequestContent();
};
v.prototype.onResize = function() {
  var i = this.options.createTombstone();
  i.style.position = "absolute", this.scrollerEl.appendChild(i), i.style.display = "", this.tombstoneHeight = i.offsetHeight, this.tombstoneWidth = i.offsetWidth, this.scrollerEl.removeChild(i);
  for (var t = 0; t < this.items.length; t++)
    this.items[t].height = this.items[t].width = 0;
  this.onScroll();
};
v.prototype.fill = function(i, t) {
  this.firstAttachedItem = Math.max(0, i), this.hasMore || (t = Math.min(t, this.items.length)), this.lastAttachedItem = t, this.attachContent();
};
v.prototype.maybeRequestContent = function() {
  var i = this;
  if (!(this.requestInProgress || !this.hasMore)) {
    var t = this.lastAttachedItem - this.loadedItems;
    t <= 0 || (this.requestInProgress = !0, this.options.fetch(t).then(function(e) {
      if (i.requestInProgress = !1, e)
        i.addContent(e);
      else {
        i.hasMore = !1;
        var s = i._removeTombstones(), o = 0;
        i.anchorItem.index <= i.items.length ? (o = i._fixScrollPosition(), i._setupAnimations({}, o), i.scroller.resetPosition(i.scroller.options.bounceTime)) : (i.anchorItem.index -= s, o = i._fixScrollPosition(), i._setupAnimations({}, o), i.scroller.stop(), i.scroller.resetPosition(), i.onScroll());
      }
    }));
  }
};
v.prototype.addContent = function(i) {
  for (var t = 0; t < i.length; t++)
    this.items.length <= this.loadedItems && this._addItem(), this.items[this.loadedItems++].data = i[t];
  this.attachContent(), this.maybeRequestContent();
};
v.prototype.attachContent = function() {
  var i = this._collectUnusedNodes(), t = this._createDOMNodes(i);
  this._cleanupUnusedNodes(i), this._cacheNodeSize();
  var e = this._fixScrollPosition();
  this._setupAnimations(t, e);
};
v.prototype.resetMore = function() {
  this.hasMore = !0;
};
v.prototype._removeTombstones = function() {
  for (var i = void 0, t = 0, e = this.items.length, s = 0; s < e; s++) {
    var o = this.items[s].node, n = this.items[s].data;
    (!o || dt(o)) && !n && (i || (i = s), o && this.scrollerEl.removeChild(o));
  }
  return t = e - i, this.items.splice(i), this.lastAttachedItem = Math.min(this.lastAttachedItem, this.items.length), t;
};
v.prototype._collectUnusedNodes = function() {
  for (var i = [], t = 0; t < this.items.length; t++) {
    if (t === this.firstAttachedItem) {
      t = this.lastAttachedItem - 1;
      continue;
    }
    var e = this.items[t].node;
    e && (dt(e) ? (this.tombstones.push(e), this.tombstones[this.tombstones.length - 1].style.display = "none") : i.push(e)), this.items[t].node = null;
  }
  return i;
};
v.prototype._createDOMNodes = function(i) {
  for (var t = {}, e = this.firstAttachedItem; e < this.lastAttachedItem; e++) {
    for (; this.items.length <= e; )
      this._addItem();
    var s = this.items[e].node, o = this.items[e].data;
    if (s)
      if (dt(s) && o)
        s.style.zIndex = 1, t[e] = [s, this.items[e].top - this.anchorScrollTop], this.items[e].node = null;
      else
        continue;
    var n = o ? this.options.render(o, i.pop()) : this._getTombStone();
    n.style.position = "absolute", this.items[e].top = -1, this.scrollerEl.appendChild(n), this.items[e].node = n;
  }
  return t;
};
v.prototype._cleanupUnusedNodes = function(i) {
  for (; i.length; )
    this.scrollerEl.removeChild(i.pop());
};
v.prototype._cacheNodeSize = function() {
  for (var i = this.firstAttachedItem; i < this.lastAttachedItem; i++)
    this.items[i].data && !this.items[i].height && (this.items[i].height = this.items[i].node.offsetHeight, this.items[i].width = this.items[i].node.offsetWidth);
};
v.prototype._fixScrollPosition = function() {
  this.anchorScrollTop = 0;
  for (var i = 0; i < this.anchorItem.index; i++)
    this.anchorScrollTop += this.items[i].height || this.tombstoneHeight;
  this.anchorScrollTop += this.anchorItem.offset;
  for (var t = this.anchorScrollTop - this.anchorItem.offset, e = this.anchorItem.index; e > this.firstAttachedItem; )
    t -= this.items[e - 1].height || this.tombstoneHeight, e--;
  return t;
};
v.prototype._setupAnimations = function(i, t) {
  var e = this;
  for (var s in i) {
    var o = i[s];
    this.items[s].node.style.transform = "translateY(" + (this.anchorScrollTop + o[1]) + "px) scale(" + this.tombstoneWidth / this.items[s].width + ", " + this.tombstoneHeight / this.items[s].height + ")", this.items[s].node.offsetTop, o[0].offsetTop, this.items[s].node.style.transition = "transform " + z + "ms";
  }
  for (var n = this.firstAttachedItem; n < this.lastAttachedItem; n++) {
    var r = i[n];
    if (r) {
      var h = r[0];
      h.style.transition = "transform " + z + "ms, opacity " + z + "ms", h.style.transform = "translateY(" + t + "px) scale(" + this.items[n].width / this.tombstoneWidth + ", " + this.items[n].height / this.tombstoneHeight + ")", h.style.opacity = 0;
    }
    t !== this.items[n].top && (r || (this.items[n].node.style.transition = ""), this.items[n].node.style.transform = "translateY(" + t + "px)"), this.items[n].top = t, t += this.items[n].height || this.tombstoneHeight;
  }
  this.scroller.maxScrollY = -(t - this.wrapperEl.offsetHeight + (this.hasMore ? Ut : 0)), setTimeout(function() {
    for (var a in i) {
      var c = i[a];
      c[0].style.display = "none", e.tombstones.push(c[0]);
    }
  }, z);
};
v.prototype._getTombStone = function() {
  var i = this.tombstones.pop();
  return i ? (i.style.display = "", i.style.opacity = 1, i.style.transform = "", i.style.transition = "", i) : this.options.createTombstone();
};
v.prototype._addItem = function() {
  this.items.push({
    data: null,
    node: null,
    height: 0,
    width: 0,
    top: 0
  });
};
v.prototype._calculateAnchoredItem = function(i, t) {
  if (t === 0)
    return i;
  var e = i.index, s = 0;
  if (t += i.offset, t < 0) {
    for (; t < 0 && e > 0 && this.items[e - 1].height; )
      t += this.items[e - 1].height, e--;
    s = Math.max(-e, Math.ceil(Math.min(t, 0) / this.tombstoneHeight));
  } else {
    for (; t > 0 && e < this.items.length && this.items[e].height && this.items[e].height < t; )
      t -= this.items[e].height, e++;
    (e >= this.items.length || !this.items[e].height) && (s = Math.floor(Math.max(t, 0) / this.tombstoneHeight));
  }
  return e += s, t -= s * this.tombstoneHeight, {
    index: e,
    offset: t
  };
};
function T(i, t) {
  this.wrapper = typeof i == "string" ? document.querySelector(i) : i, this.wrapper || K("Can not resolve the wrapper DOM."), this.scroller = this.wrapper.children[0], this.scroller || K("The wrapper need at least one child element to be scroller."), this.scrollerStyle = this.scroller.style, this._init(i, t);
}
Qt(T);
ti(T);
zt(T);
ii(T);
ei(T);
si(T);
oi(T);
ni(T);
ri(T);
hi(T);
ai(T);
T.Version = "1.12.6";
const mt = (i, t) => {
  const e = i.__vccOpts || i;
  for (const [s, o] of t)
    e[s] = o;
  return e;
}, li = "cube-loading", ci = {
  name: li,
  data() {
    return {
      balde: 12
    };
  },
  props: {
    size: {
      type: Number
    }
  },
  computed: {
    style() {
      if (!this.size)
        return;
      const i = `${this.size}px`;
      return {
        width: i,
        height: i
      };
    }
  }
}, pi = { class: "cube-loading" }, ui = { class: "cube-loading-spinner" };
function fi(i, t, e, s, o, n) {
  return S(), D("div", pi, [
    x("span", {
      class: "cube-loading-spinners",
      style: ut(n.style)
    }, [
      (S(!0), D(Et, null, It(o.balde, (r) => (S(), D("i", ui))), 256))
    ], 4)
  ]);
}
const di = /* @__PURE__ */ mt(ci, [["render", fi]]), mi = {
  props: {
    y: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      width: 50,
      height: 80,
      ratio: 2
    };
  },
  computed: {
    distance() {
      return Math.max(0, Math.min(this.y * this.ratio, this.maxDistance));
    },
    style() {
      return `width:${this.width / this.ratio}px;height:${this.height / this.ratio}px`;
    }
  },
  mounted() {
    this.ratio = window.devicePixelRatio, this.width *= this.ratio, this.height *= this.ratio, this.initRadius = 18 * this.ratio, this.minHeadRadius = 12 * this.ratio, this.minTailRadius = 5 * this.ratio, this.initArrowRadius = 10 * this.ratio, this.minArrowRadius = 6 * this.ratio, this.arrowWidth = 3 * this.ratio, this.maxDistance = 40 * this.ratio, this.initCenterX = 25 * this.ratio, this.initCenterY = 25 * this.ratio, this.headCenter = {
      x: this.initCenterX,
      y: this.initCenterY
    }, this._draw();
  },
  methods: {
    _draw() {
      const i = this.$refs.bubble;
      let t = i.getContext("2d");
      t.clearRect(0, 0, i.width, i.height), this._drawBubble(t), this._drawArrow(t);
    },
    _drawBubble(i) {
      i.save(), i.beginPath();
      const t = this.distance / this.maxDistance, e = this.initRadius - (this.initRadius - this.minHeadRadius) * t;
      this.headCenter.y = this.initCenterY - (this.initRadius - this.minHeadRadius) * t, i.arc(this.headCenter.x, this.headCenter.y, e, 0, Math.PI, !0);
      const s = this.initRadius - (this.initRadius - this.minTailRadius) * t, o = {
        x: this.headCenter.x,
        y: this.headCenter.y + this.distance
      }, n = {
        x: o.x - s,
        y: o.y
      }, r = {
        x: n.x,
        y: n.y - this.distance / 2
      };
      i.quadraticCurveTo(r.x, r.y, n.x, n.y), i.arc(o.x, o.y, s, Math.PI, 0, !0);
      const h = {
        x: this.headCenter.x + e,
        y: this.headCenter.y
      }, a = {
        x: o.x + s,
        y: h.y + this.distance / 2
      };
      i.quadraticCurveTo(a.x, a.y, h.x, h.y), i.fillStyle = "rgb(170,170,170)", i.fill(), i.strokeStyle = "rgb(153,153,153)", i.stroke(), i.restore();
    },
    _drawArrow(i) {
      i.save(), i.beginPath();
      const t = this.distance / this.maxDistance, e = this.initArrowRadius - (this.initArrowRadius - this.minArrowRadius) * t;
      i.arc(this.headCenter.x, this.headCenter.y, e - (this.arrowWidth - t), -Math.PI / 2, 0, !0), i.arc(this.headCenter.x, this.headCenter.y, e, 0, Math.PI * 3 / 2, !1), i.lineTo(this.headCenter.x, this.headCenter.y - e - this.arrowWidth / 2 + t), i.lineTo(this.headCenter.x + this.arrowWidth * 2 - t * 2, this.headCenter.y - e + this.arrowWidth / 2), i.lineTo(this.headCenter.x, this.headCenter.y - e + this.arrowWidth * 3 / 2 - t), i.fillStyle = "rgb(255,255,255)", i.fill(), i.strokeStyle = "rgb(170,170,170)", i.stroke(), i.restore();
    }
  },
  watch: {
    y() {
      this._draw();
    }
  }
}, gi = ["width", "height"];
function vi(i, t, e, s, o, n) {
  return S(), D("canvas", {
    ref: "bubble",
    width: o.width,
    height: o.height,
    style: ut(n.style)
  }, null, 12, gi);
}
const wi = /* @__PURE__ */ mt(mi, [["render", vi]]), yi = {
  props: {
    // the options of BetterScroll
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  }
}, _i = function(i, t) {
}, Ti = /-(\w)/g;
function bi(i) {
  return i = String(i), i.replace(Ti, function(t, e) {
    return e ? e.toUpperCase() : "";
  });
}
function xi(i) {
  return i = String(i), i.replace(/([A-Z])/g, "-$1").toLowerCase();
}
const Si = {
  methods: {
    _checkDeprecated() {
      const i = this.$options.props, t = this.$options.name;
      Object.entries(i).forEach(([e, s]) => {
        const o = s.deprecated;
        o && this[e] !== void 0 && _i(`The property "${xi(e)}" is deprecated, please use the recommended property "${o.replacedBy}" to replace it. Details could be found in https://didi.github.io/cube-ui/#/en-US/docs/${t.substr(5)}#cube-Propsconfiguration-anchor`);
      });
    }
  },
  mounted() {
    this._checkDeprecated();
  }
}, kt = typeof window < "u", O = kt && navigator.userAgent.toLowerCase();
O && O.indexOf("android") > 0;
const Di = O && /iphone|ipad|ipod|ios/.test(O);
function N(i) {
  return {
    top: i.offsetTop,
    left: i.offsetLeft,
    width: i.offsetWidth,
    height: i.offsetHeight
  };
}
(() => {
  if (!kt)
    return !1;
  let i = document.createElement("div").style, t = {
    standard: "transform",
    webkit: "webkitTransform",
    Moz: "MozTransform",
    O: "OTransform",
    ms: "msTransform"
  };
  for (let e in t)
    if (i[t[e]] !== void 0)
      return e;
  return !1;
})();
function Pi(i) {
  const e = /os (\d\d?_\d(_\d)?)/.exec(i);
  if (!e)
    return null;
  const s = e[1].split("_").map(function(o) {
    return parseInt(o, 10);
  });
  return {
    major: s[0],
    minor: s[1],
    patch: s[2] || 0
  };
}
function Yi() {
  let i = !0;
  if (Di) {
    const t = Pi(O);
    if (!t)
      return i;
    t.major >= 13 && t.minor >= 3 && (i = !1);
  }
  return i;
}
const Mi = Yi();
const Xi = "cube-scroll", Ei = "horizontal", Dt = "vertical", Ii = "Refresh success", Ri = 600, Pt = "click", Yt = "pulling-down", Mt = "pulling-up", Z = "scroll", pt = "before-scroll-start", Ot = "scroll-end", Xt = "none", Li = "native", Ci = [Z, pt, Ot], Hi = {
  observeDOM: !0,
  click: !0,
  probeType: 1,
  scrollbar: !1,
  pullDownRefresh: !1,
  pullUpLoad: !1
}, Ui = {
  name: Xi,
  mixins: [yi, Si],
  provide() {
    return {
      parentScroll: this
    };
  },
  inject: {
    parentScroll: {
      default: null
    }
  },
  emits: [Pt, Yt, Mt, Z, pt, Ot],
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    scrollEvents: {
      type: Array,
      default() {
        return [];
      },
      validator(i) {
        return i.every((t) => Ci.indexOf(t) !== -1);
      }
    },
    // TODO: plan to remove at 1.10.0
    listenScroll: {
      type: Boolean,
      default: void 0,
      deprecated: {
        replacedBy: "scroll-events"
      }
    },
    listenBeforeScroll: {
      type: Boolean,
      default: void 0,
      deprecated: {
        replacedBy: "scroll-events"
      }
    },
    direction: {
      type: String,
      default: Dt
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    nestMode: {
      type: String,
      default: Xt
    }
  },
  data() {
    return {
      beforePullDown: !0,
      isPullingDown: !1,
      isPullUpLoad: !1,
      pullUpNoMore: !1,
      bubbleY: 0,
      pullDownStyle: "",
      pullDownStop: 40,
      pullDownHeight: 60,
      pullUpHeight: 0
    };
  },
  computed: {
    pullDownRefresh() {
      let i = this.options.pullDownRefresh;
      return i && (i === !0 && (i = {}), Object.assign({ stop: this.pullDownStop }, i));
    },
    pullUpLoad() {
      return this.options.pullUpLoad;
    },
    pullUpTxt() {
      const i = this.pullUpLoad, t = i && i.txt, e = t && t.more || "", s = t && t.noMore || "";
      return this.pullUpNoMore ? s : e;
    },
    refreshTxt() {
      const i = this.pullDownRefresh;
      return i && i.txt || Ii;
    },
    finalScrollEvents() {
      const i = this.scrollEvents.slice();
      return i.length || (this.listenScroll && i.push(Z), this.listenBeforeScroll && i.push(pt)), i;
    },
    needListenScroll() {
      return this.finalScrollEvents.indexOf(Z) !== -1 || this.parentScroll;
    }
  },
  watch: {
    data: {
      handler() {
        setTimeout(() => {
          this.forceUpdate(!0);
        }, this.refreshDelay);
      },
      deep: !0
    },
    pullDownRefresh: {
      handler(i, t) {
        i && (this.scroll.openPullDown(i), t || (this._onPullDownRefresh(), this._pullDownRefreshChangeHandler())), !i && t && (this.scroll.closePullDown(), this._offPullDownRefresh(), this._pullDownRefreshChangeHandler());
      },
      deep: !0
    },
    pullUpLoad: {
      handler(i, t) {
        i && (this.scroll.openPullUp(i), t || (this._onPullUpLoad(), this._pullUpLoadChangeHandler())), !i && t && (this.scroll.closePullUp(), this._offPullUpLoad(), this._pullUpLoadChangeHandler());
      },
      deep: !0
    }
  },
  activated() {
    this.enable();
  },
  deactivated() {
    this.disable();
  },
  mounted() {
    this.$nextTick(() => {
      this.initScroll();
    });
  },
  beforeUnmount() {
    this.destroy();
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper)
        return;
      this._calculateMinHeight();
      let i = {
        scrollY: this.direction === Dt,
        scrollX: this.direction === Ei,
        probeType: this.needListenScroll ? 3 : 1,
        useTransition: Mi
      }, t = Object.assign({}, Hi, i, this.options);
      this.scroll = new T(this.$refs.wrapper, t), this.parentScroll && this.nestMode !== Xt && this._handleNestScroll(), this._listenScrollEvents(), this.pullDownRefresh && (this._onPullDownRefresh(), this._pullDownRefreshChangeHandler()), this.pullUpLoad && (this._onPullUpLoad(), this._pullUpLoadChangeHandler());
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    refresh() {
      this._calculateMinHeight(), this.scroll && this.scroll.refresh();
    },
    destroy() {
      this.scroll && this.scroll.destroy(), this.scroll = null;
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
    clickItem(i) {
      this.$emit(Pt, i);
    },
    async forceUpdate(i = !1, t = !1) {
      this.isPullDownUpdating || (this.pullDownRefresh && this.isPullingDown ? (this.isPullingDown = !1, this.isPullDownUpdating = !0, await this._waitFinishPullDown(), this.isPullDownUpdating = !1, await this._waitResetPullDown(i)) : this.pullUpLoad && this.isPullUpLoad && (this.isPullUpLoad = !1, this.scroll.finishPullUp(), this.pullUpNoMore = !i || t), i && this.refresh());
    },
    resetPullUpTxt() {
      this.pullUpNoMore = !1;
    },
    _listenScrollEvents() {
      this.finalScrollEvents.forEach((i) => {
        this.scroll.on(bi(i), (...t) => {
          this.$emit(i, ...t);
        });
      });
    },
    _handleNestScroll() {
      this.$nextTick(() => {
        const i = this.scroll, t = this.parentScroll.scroll;
        [i, t].forEach((s, o, n) => {
          s.on("touchEnd", () => {
            t.enable(), i.enable(), i.initiated = !1;
          }), s.on("beforeScrollStart", () => {
            this.touchStartMoment = !0;
            const r = n[(o + 1) % 2];
            r.stop(), r.resetPosition();
          });
        }), i.on("scroll", (s) => {
          if (!i.initiated || i.isInTransition || this.nestMode === Li && !this.touchStartMoment)
            return;
          this._checkReachBoundary(s) ? (i.resetPosition(), i.disable(), t.pointX = i.pointX, t.pointY = i.pointY, t.enable()) : t.disable(), this.touchStartMoment = !1;
        });
      });
    },
    _checkReachBoundary(i) {
      const t = this.scroll.distX, e = this.scroll.distY, s = t > 0 ? i.x >= this.scroll.minScrollX : t < 0 ? i.x <= this.scroll.maxScrollX : !1, o = e > 0 ? i.y >= this.scroll.minScrollY : e < 0 ? i.y <= this.scroll.maxScrollY : !1, n = this.scroll.freeScroll, r = this.scroll.hasHorizontalScroll, h = this.scroll.hasVerticalScroll;
      if (!r && !h)
        return !0;
      if (n)
        return s || o;
      let a;
      return this.scroll.movingDirectionX ? a = s : this.scroll.movingDirectionY && (a = o), a;
    },
    _calculateMinHeight() {
      const { wrapper: i, listWrapper: t } = this.$refs, e = this.pullUpLoad, s = this.pullDownRefresh;
      let o = 0;
      (s || e) && (o = N(i).height + 1, e && e.visible && (o -= this.pullUpHeight)), t.style.minHeight = `${o}px`;
    },
    _onPullDownRefresh() {
      this.scroll.on("pullingDown", this._pullDownHandle), this.scroll.on("scroll", this._pullDownScrollHandle);
    },
    _offPullDownRefresh() {
      this.scroll.off("pullingDown", this._pullDownHandle), this.scroll.off("scroll", this._pullDownScrollHandle);
    },
    _pullDownRefreshChangeHandler() {
      this.$nextTick(() => {
        this._getPullDownEleHeight(), this._calculateMinHeight();
      });
    },
    _pullDownHandle() {
      this.resetPullDownTimer && clearTimeout(this.resetPullDownTimer), this.beforePullDown = !1, this.isPullingDown = !0, this.$emit(Yt);
    },
    _pullDownScrollHandle(i) {
      this.beforePullDown ? (this.bubbleY = Math.max(0, i.y - this.pullDownHeight), this.pullDownStyle = `top:${Math.min(i.y - this.pullDownHeight, 0)}px`) : (this.bubbleY = 0, this.pullDownStyle = `top:${Math.min(i.y - this.pullDownStop, 0)}px`);
    },
    _pullUpLoadChangeHandler() {
      this.$nextTick(() => {
        this._getPullUpEleHeight(), this._calculateMinHeight();
      });
    },
    _onPullUpLoad() {
      this.scroll.on("pullingUp", this._pullUpHandle);
    },
    _offPullUpLoad() {
      this.scroll.off("pullingUp", this._pullUpHandle);
    },
    _pullUpHandle() {
      this.isPullUpLoad = !0, this.$emit(Mt);
    },
    _waitFinishPullDown(i) {
      const { stopTime: t = Ri } = this.pullDownRefresh;
      return new Promise((e) => {
        setTimeout(() => {
          this.scroll.finishPullDown(), e();
        }, t);
      });
    },
    _waitResetPullDown(i) {
      return new Promise((t) => {
        this.resetPullDownTimer = setTimeout(() => {
          this.pullDownStyle = `top: -${this.pullDownHeight}px`, this.beforePullDown = !0, t();
        }, this.scroll.options.bounceTime);
      });
    },
    _getPullDownEleHeight() {
      let i = this.$refs.pulldown;
      i && (i = i.children[0], this.pullDownHeight = N(i).height, this.beforePullDown = !1, this.isPullingDown = !0, this.$nextTick(() => {
        this.pullDownStop = N(i).height, this.beforePullDown = !0, this.isPullingDown = !1;
      }));
    },
    _getPullUpEleHeight() {
      const t = this.$refs.listWrapper.nextElementSibling;
      if (!t) {
        this.pullUpHeight = 0;
        return;
      }
      this.pullUpHeight = N(t).height;
    }
  },
  components: {
    Loading: di,
    Bubble: wi
  }
}, ki = {
  ref: "wrapper",
  class: "cube-scroll-wrapper"
}, Oi = { class: "cube-scroll-content" }, Wi = {
  ref: "listWrapper",
  class: "cube-scroll-list-wrapper"
}, Ai = { class: "cube-scroll-list" }, zi = ["onClick"], Ni = {
  key: 0,
  class: "cube-pullup-wrapper"
}, $i = {
  key: 0,
  class: "before-trigger"
}, Fi = {
  key: 1,
  class: "after-trigger"
}, Vi = {
  key: 0,
  class: "cube-pulldown",
  ref: "pulldown"
}, qi = { class: "before-trigger" }, ji = { class: "after-trigger" }, Zi = { class: "loading" }, Gi = { class: "cube-pulldown-loaded" };
function Ki(i, t, e, s, o, n) {
  const r = gt("loading"), h = gt("bubble");
  return S(), D("div", ki, [
    x("div", Oi, [
      x("div", Wi, [
        tt(i.$slots, "default", {}, () => [
          x("ul", Ai, [
            (S(!0), D(Et, null, It(e.data, (a, c) => (S(), D("li", {
              class: "cube-scroll-item border-bottom-1px",
              key: c,
              onClick: (u) => n.clickItem(a)
            }, it(a), 9, zi))), 128))
          ])
        ])
      ], 512),
      tt(i.$slots, "pullup", {
        pullUpLoad: n.pullUpLoad,
        isPullUpLoad: o.isPullUpLoad
      }, () => [
        n.pullUpLoad ? (S(), D("div", Ni, [
          o.isPullUpLoad ? (S(), D("div", Fi, [
            et(r)
          ])) : (S(), D("div", $i, [
            x("span", null, it(n.pullUpTxt), 1)
          ]))
        ])) : vt("", !0)
      ])
    ]),
    n.pullDownRefresh ? (S(), D("div", Vi, [
      tt(i.$slots, "pulldown", {
        pullDownRefresh: n.pullDownRefresh,
        pullDownStyle: o.pullDownStyle,
        beforePullDown: o.beforePullDown,
        isPullingDown: o.isPullingDown,
        bubbleY: o.bubbleY
      }, () => [
        x("div", {
          class: "cube-pulldown-wrapper",
          style: ut(o.pullDownStyle)
        }, [
          W(x("div", qi, [
            et(h, {
              y: o.bubbleY,
              class: "bubble"
            }, null, 8, ["y"])
          ], 512), [
            [A, o.beforePullDown]
          ]),
          W(x("div", ji, [
            W(x("div", Zi, [
              et(r)
            ], 512), [
              [A, o.isPullingDown]
            ]),
            W(x("div", Gi, [
              x("span", null, it(n.refreshTxt), 1)
            ], 512), [
              [A, !o.isPullingDown]
            ])
          ], 512), [
            [A, !o.beforePullDown]
          ])
        ], 4)
      ])
    ], 512)) : vt("", !0)
  ], 512);
}
const at = /* @__PURE__ */ mt(Ui, [["render", Ki]]);
at.install = function(i) {
  i.component(at.name, at);
};
export {
  at as default
};
