/*

RULES
─────

For 3dx & 3dy properties :
►►►  string   →   px
►►►  int      →   %

EXAMPLES
────────

const animation1 = new S.Merom('.class', '3dy', 0, 100, 1000, 'Power4Out')
animation1.play()

const animation2 = new S.Merom(domElement, 'opacity', 1, 0, 1000, 'linear', {delay: 500, callbackDelay: 200, callback: myCallback})
animation2.play()

const animation3 = new S.Merom('#id', ['rotate', '3dy'], [0, '0'], [-45, '-6'], 450, 'Power4Out')
animation3.play()

const animation4 = new S.Merom('.class', 'scale', '0', '145', 1000, 'Power4Out')
animation4.play()
animation4.reverse(opts)

const animation5 = new S.Merom('.class', '3dx', 1, 1.2, 700, 'Power1In')
animation5.play()
animation5.pause()

*/

S.Merom = function (element, prop, start, end, duration, ease, opts) {
    this.el = S.Selector.el(element)
    this.elL = this.el.length
    this.prop = prop
    this.origin = {
        start: start,
        end: end
    }

    if (S.Is.object(duration)) {
        this.duration = 0
        this.ease = 'linear'
        this.opts = duration
    } else {
        this.duration = duration || 0
        this.ease = ease || 'linear'
        this.opts = opts || false
    }

    this.delay = this.opts.delay || 0
    this.callbackDelay = this.opts.callbackDelay || 0
    this.cb = this.opts.callback
    this.round = 1000
    this.unit = ''

    this.noMultiT = !S.Is.array(this.prop)
    var delta
    if (this.noMultiT) {
        if (this.prop === '3dx' || this.prop === '3dy' || this.prop === 'height' || this.prop === 'width') {
            this.unit = this.getUnit(this.origin.start)
        }
        delta = this.origin.end - this.origin.start
    } else {
        this.qty = this.prop.length
        for (var i = 0; i < this.qty; i++) {
            if (this.prop[i] === '3dx') {
                this.unitX = this.getUnit(this.origin.start[i])
            } else if (this.prop[i] === '3dy') {
                this.unitY = this.getUnit(this.origin.start[i])
            }
        }
        // To combat cases where start = end → delta is null so duration is null
        this.no = 0
        for (var i = 0; i < this.qty; i++) {
            if (this.origin.start[i] !== this.origin.end[i]) {
                this.no = i
                break
            }
        }
        delta = this.origin.end[this.no] - this.origin.start[this.no]
    }
    this.update = this.noMultiT ? this.singleUp() : this.multiT
    this.coeff = this.duration / Math.abs(delta)

    this.raf = new S.RafIndex()

    this.startTime = 0
    this.curr = this.origin.start

    S.BindMaker(this, ['getRaf', 'loop'])
}

S.Merom.prototype = {

    play: function (opts) {
        this.init(0, opts)

        setTimeout(this.getRaf, this.delay)
    },

    pause: function () {
        this.isPaused = true
    },

    reverse: function (opts) {
        this.init(1, opts)

        this.getRaf()
    },

    init: function (from, opts) {
        this.pause()

        this.needEnd = true

        var endParam = from === 1 ? 'start' : 'end'
        this.end = this.origin[endParam]

        var startParam = from === 1 ? 'end' : 'start'
        this.start = this.curr

        var delta = this.noMultiT ? (this.end - this.start) : (this.end[this.no] - this.start[this.no])
        this.duration = Math.abs(delta) * this.coeff

        if (opts) {
            this.start = opts.newStart || this.start
            this.end = opts.newEnd || this.end
            this.duration = opts.duration || this.duration
            this.ease = opts.ease || this.ease
            this.cb = opts.callback || false
            this.delay = opts.delay || 0
            this.callbackDelay = opts.callbackDelay || 0
        } else if (from === 1) {
            this.cb = false
            this.delay = 0
            this.callbackDelay = 0
        }

        this.easeCalc = S.Is.string(this.ease) ? S.EasePack[this.ease] : this.easeCalc = S.EaseCSS(this.ease[0], this.ease[1], this.ease[2], this.ease[3])
    },

    getRaf: function () {
        this.isPaused = false
        this.raf.start(this.loop)
    },

    loop: function (now) {
        if (this.isPaused) return

        if (!this.startTime) this.startTime = now
        var multiplier = this.duration === 0 ? 1 : Math.min((now - this.startTime) / this.duration, 1)
        var easeMultiplier = this.easeCalc(multiplier)

        if (this.noMultiT) {
            this.curr = this.lerp(+this.start, +this.end, easeMultiplier)
        } else {
            this.curr = []
            for (var i = 0; i < this.qty; i++) {
                this.curr[i] = this.lerp(+this.start[i], +this.end[i], easeMultiplier)
            }
        }

        this.update(this.curr)

        if (multiplier < 1) {
            this.raf.start(this.loop)
        } else if (this.needEnd) {
            this.needEnd = false
            this.raf.cancel()
            this.update(this.end)
            if (this.cb) {
                setTimeout(this.cb, this.callbackDelay)
            }
        }
    },

    lerp: function (start, end, easeM) {
        return Math.round(S.Lerp.init(start, end, easeM) * this.round) / this.round
    },

    singleUp: function () {
        switch (this.prop) {
            case '3dx':
            case '3dy':
            case 'scale':
            case 'scaleX':
            case 'scaleY':
            case 'rotate':
            case 'rotateX':
            case 'rotateY':
                return this.singleT
                break
            case 'gtx':
            case 'gty':
                return this.gradientT
                break
            case 'scrollTop':
                return this.scrollTop
                break
            default:
                return this.setOthers
        }
    },

    multiT: function (val) {
        var t3dx = 0
        var t3dy = 0
        var rotate = ''
        var scale = ''

        for (var i = 0; i < this.qty; i++) {
            if (this.prop[i] === '3dx') {
                t3dx = val[i] + this.unitX
            } else if (this.prop[i] === '3dy') {
                t3dy = val[i] + this.unitY
            } else if (this.prop[i].substring(0, 6) === 'rotate') {
                rotate = this.prop[i] + '(' + val[i] + 'deg)'
            } else {
                scale = this.prop[i] + '(' + val[i] + ')'
            }
        }

        var translate3d = 'translate3d(' + t3dx + ',' + t3dy + ',0)'
        var transformValue = translate3d + ' ' + rotate + ' ' + scale

        this.updateDom('t', transformValue)
    },

    singleT: function (val) {
        var transformValue
        if (this.prop === '3dx' || this.prop === '3dy') {
            var valueUnit = val + this.unit
            var translate = this.prop === '3dx' ? valueUnit + ',0' : '0,' + valueUnit
            transformValue = 'translate3d(' + translate + ',0)'
        } else if (this.prop.substring(0, 6) === 'rotate') {
            transformValue = this.prop + '(' + val + 'deg)'
        } else {
            transformValue = this.prop + '(' + val + ')'
        }

        this.updateDom('t', transformValue)
    },

    gradientT: function (val) {
        var gt = this.prop === 'gtx' ? val + ',0' : '0,' + val
        this.updateDom('gradientTransform', 'translate(' + gt + ')')
    },

    scrollTop: function (val) {
        this.el[0][this.prop] = val
    },

    setOthers: function (val) {
        this.updateDom(this.prop, val)
    },

    updateDom: function (prop, val) {
        for (var i = 0; i < this.elL; i++) {
            if (prop === 't') {
                this.el[i].style.webkitTransform = val
                this.el[i].style.transform = val
            } else if (prop === 'x' || prop === 'y' || prop === 'r' || prop === 'gradientTransform') {
                this.el[i].setAttribute(prop, val)
            } else {
                this.el[i].style[prop] = val + this.unit
            }
        }
    },

    getUnit: function (valueToCheck) {
        return S.Is.string(valueToCheck) ? 'px' : '%'
    }

}
