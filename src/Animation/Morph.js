/*

►►► Type : 'polygon' or 'path'

const morphAnimation = new S.Morph({
    type: 'polygon',
    element: S.Geb.id('polygon'),
    newCoords: '50.2,12.8 63,0 63,4.1 63,7 63,10 63,13.1 63,17',
    duration: 1100,
    ease: 'Power4InOut',
    delay: 700,
    callbackDelay: myCallback,
    callback: myCallback
})

morphAnimation.play()
morphAnimation.pause()
morphAnimation.reverse()

*/

S.Morph = function (opts) {
    this.type = opts.type === 'polygon' ? 'points' : 'd'
    this.el = opts.element
    this.ease = opts.ease
    this.delay = opts.delay || 0
    this.cbDelay = opts.callbackDelay || 0
    this.cb = opts.callback

    this.origin = {
        start: this.el.getAttribute(this.type),
        end: opts.newCoords,
        duration: opts.duration
    }
    this.origin.arr = {
        start: this.getArr(this.origin.start),
        end: this.getArr(this.origin.end)
    }

    this.qty = this.origin.arr.start.length

    for (var i = 0; i < this.qty; i++) {
        if (this.origin.arr.start[i] !== this.origin.arr.end[i]) {
            this.coeff = this.origin.duration / Math.abs(this.origin.arr.end[i] - this.origin.arr.start[i])
            this.no = i
            break
        }
    }

    this.current = this.origin.start

    this.easePack = S.EasePack

    this.raf = new S.RafIndex()

    S.BindMaker(this, ['loop'])
}

S.Morph.prototype = {

    play: function () {
        var self = this

        self.init(0)

        S.Delay(function () {
            self.getRaf()
        }, self.delay)
    },

    pause: function () {
        this.isPaused = true
    },

    reverse: function () {
        this.init(1)

        this.getRaf()
    },

    init: function (from) {
        var param = from === 1 ? 'start' : 'end'
        this.end = this.origin[param]
        this.endArr = this.origin.arr[param]

        this.startArr = this.getArr(this.current)
        this.duration = Math.abs(this.endArr[this.no] - this.startArr[this.no]) * this.coeff
    },

    getRaf: function () {
        this.startTime = Date.now()
        this.raf.start(this.loop)
    },

    loop: function () {
        if (this.isPaused) return

        var multiplier = Math.min((Date.now() - this.startTime) / this.duration, 1)
        var easeMultiplier = this.easePack[this.ease](multiplier)

        var isLetterArr = []
        var value = []
        var current = ''

        for (var i = 0; i < this.qty; i++) {
            isLetterArr[i] = this.isLetter(this.startArr[i])
            value[i] = isLetterArr[i] ? this.startArr[i] : S.Lerp.init(+this.startArr[i], +this.endArr[i], easeMultiplier)
            current += value[i] + ' '
            this.current = current.trim()
        }

        this.el.setAttribute(this.type, this.current)

        if (multiplier < 1) {
            this.raf.start(this.loop)
        } else {
            this.raf.cancel()
            this.el.setAttribute(this.type, this.end)
            this.getCb()
        }
    },

    getArr: function (coords) {
        var coordsSplit = coords.split(' ')
        var coordsArr = []
        for (var i = 0; i < coordsSplit.length; i++) {
            var coordsSplit2 = coordsSplit[i].split(',')
            for (var j = 0; j < coordsSplit2.length; j++) {
                coordsArr.push(coordsSplit2[j])
            }
        }
        return coordsArr
    },

    isLetter: function (val) {
        return (val === 'M' || val === 'L' || val === 'C' || val === 'Z')
    },

    getCb: function () {
        if (this.cb) {
            S.Delay(this.cb, this.cbDelay)
        }
    }

}
