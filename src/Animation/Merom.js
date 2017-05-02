/*

RULES
─────

For 3dx & 3dy properties :
►►►  string   →   px
►►►  int      →   %

Delay :
►►►  delay           →   int
►►►  callbackDelay   →   int

Reverse :
►►►  if 'duration' and 'ease' are not defined, it inherits the play() properties

During :
►►►  example : elements needs to move during scroll

EXAMPLES
────────

const animation1 = new S.Merom('.class', '3dy', 0, 100, 1000, 'Power4Out')
animation1.play()
animation1.pause('on')
animation1.pause('off')

const animation2 = new S.Merom(domElement, 'opacity', 1, 0, 1000, 'linear', {delay: 500, callbackDelay: 200, callback: myCallback})
animation2.play()

const animation3 = new S.Merom('#id', ['rotate', '3dy'], [0, '0'], [-45, '-6'], 450, 'Power4Out')
animation3.play()

const animation4 = new S.Merom('.class', 'scale', '0', '145', 1000, 'Power4Out')
animation4.play()
animation4.reverse(opts)

const animation5 = new S.Merom('.class', '3dx', 1, 1.2, 700, 'Power1In')
animation5.play()
animation5.pause('on')
animation5.reset({delay: 400, callbackDelay: 700, callback: myCallback})

TODO
────

S.Is.nodeList(this.el)

So for now, animate elements with class :
►►►  for one   →   passing dom element
►►►  for all   →   '.myClass'

*/

S.Merom = function (element, prop, start, end, duration, ease, opts) {
    this.prop = prop
    this.start = start
    this.end = end

    this.el = S.Selector.el(element)
    this.elL = this.el.length

    if (S.Is.object(duration)) {
        this.duration = 0
        this.ease = 'linear'
        this.opts = duration
    } else {
        this.duration = duration || 0
        this.ease = ease || 'linear'
        this.opts = opts || false
    }

    this.round = 1000
    this.unit = ''

    this.noMultiT = !S.Is.array(this.prop)
    if (this.noMultiT && (this.prop === '3dx' || this.prop === '3dy' || this.prop === 'height' || this.prop === 'width')) {
        this.unit = this.getUnit(this.start)
    } else {
        this.updateQty = this.prop.length
        for (var i = 0; i < this.updateQty; i++) {
            if (this.prop[i] === '3dx') {
                this.unitX = this.getUnit(this.start[i])
            } else if (this.prop[i] === '3dy') {
                this.unitY = this.getUnit(this.start[i])
            }
        }
    }
    this.update = this.noMultiT ? this.singleUp() : this.multiT

    this.deltaTimeAtPause = 0

    this.easePack = S.EasePack
    this.raf = new S.RafIndex()

    this.delaysInit()

    S.BindMaker(this, ['getRaf', 'loop'])
}

S.Merom.prototype = {

    play: function () {
        var self = this
        self.isPaused = false
        S.Delay(function () {
            self.getRaf()
        }, self.delay)
    },

    pause: function (status) {
        if (status === 'on') {
            this.isPaused = true
            this.deltaTimeSave = this.deltaTime
        } else {
            this.deltaTimeAtPause = this.deltaTimeSave
            this.delay = 0
            this.play()
        }
    },

    reverse: function (opts) {
        this.pause('on')

        if (opts !== undefined) {
            this.newEnd = opts.newEnd || false
            this.duration = opts.duration || this.duration
            this.ease = opts.ease || this.ease
            this.opts = opts.opts || false
        }

        this.getReset()
    },

    reset: function (opts) {
        this.pause('on')

        this.duration = 0
        this.ease = 'linear'
        this.opts = opts || false

        this.getReset()
    },

    getRaf: function () {
        this.startTime = Date.now()
        this.raf.start(this.loop)
    },

    loop: function () {
        if (this.isPaused) return

        var currentTime = Date.now()
        this.deltaTime = currentTime - this.startTime + this.deltaTimeAtPause
        var multiplier = Math.min(this.deltaTime / this.duration, 1)
        var easeMultiplier = this.easePack[this.ease](multiplier)

        if (this.noMultiT) {
            this.val = this.lerp(+this.start, +this.end, easeMultiplier)
        } else {
            this.val = []
            for (var i = 0; i < this.updateQty; i++) {
                this.val[i] = this.lerp(+this.start[i], +this.end[i], easeMultiplier)
            }
        }

        this.update(this.val)

        if (multiplier < 1) {
            this.raf.start(this.loop)
        } else {
            this.raf.cancel()
            this.update(this.end)
            if (this.opts.callback) {
                S.Delay(this.opts.callback, this.callbackDelay)
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
            case 'rotate':
            case 'rotateX':
            case 'rotateY':
                return this.singleT
                break
            case 'scrollTop':
                return this.setScrollTop
                break
            default:
                return this.setStyle
        }
    },

    multiT: function (val) {
        var t3dx = 0
        var t3dy = 0
        var rotate = ''
        var scale = ''

        for (var i = 0; i < this.updateQty; i++) {
            if (this.prop[i] === '3dx') {
                t3dx = val[i] + this.unitX
            } else if (this.prop[i] === '3dy') {
                t3dy = val[i] + this.unitY
            } else if (this.prop[i].substring(0, 6) === 'rotate') {
                rotate = this.prop[i] + '(' + val[i] + 'deg)'
            } else if (this.prop[i] === 'scale') {
                scale = 'scale(' + val[i] + ')'
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
            transformValue = 'scale(' + val + ')'
        }

        this.updateDom('t', transformValue)
    },

    setScrollTop: function (val) {
        this.el[0][this.prop] = val

        if (this.opts.during) {
            this.opts.during(val)
        }
    },

    setStyle: function (val) {
        this.updateDom(this.prop, val)
    },

    updateDom: function (prop, val) {
        for (var i = 0; i < this.elL; i++) {
            if (prop === 't') {
                this.el[i].style.webkitTransform = val
                this.el[i].style.transform = val
            } else if (prop === 'x' || prop === 'y' || prop === 'r') {
                this.el[i].setAttribute(prop, val)
            } else {
                this.el[i].style[prop] = val + this.unit
            }
        }
    },

    delaysInit: function () {
        this.delay = this.opts.delay || 0
        this.callbackDelay = this.opts.callbackDelay || 0
    },

    getReset: function () {
        this.end = this.newEnd || this.start
        this.start = this.val || this.start

        this.delaysInit()

        this.play()
    },

    getUnit: function (valueToCheck) {
        return S.Is.string(valueToCheck) ? 'px' : '%'
    }

}
