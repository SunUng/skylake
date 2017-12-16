/*

EXPLOITATION HTML - CIRCLE SHAPE
────────────────────────────────

<svg width="30" height="30" viewBox="0 0 30 30">
    <circle class="shape" r="14.5" cx="15" cy="15"></circle>
</svg>

EXPLOITATION HTML - PATH SHAPE
──────────────────────────────

<svg width="100" height="100" viewBox="0 0 100 100">
    <path class="shape" d="M1,50a49,49 0 1,0 98,0a49,49 0 1,0 -98,0"/>
</svg>

EXPLOITATION CSS
────────────────

.shape {
    fill: none;
    stroke: pink;
    opacity: 0;
    transition: opacity 10ms linear 10ms; /* debug IE
}

EXPLOITATION JS
───────────────

►►►  shape (circle, path)    →   '#id' or '.class' or domElement

this.animatedLine = new S.AnimatedLine({
    el: '.shape',
    elWithLength: this.lEl, // optional
    d: 1000,
    e: 'linear',
    cb: false
})

this.animatedLine.play()

this.animatedLine.pause()

this.animatedLine.play({
    d: 500,
    e: 'Power4InOut',
    cb: myCallback
})

ELEMENT WITH LENGTH
───────────────────

"elWithLength" arg is optional
The total length of the line is calculated with him if he's present
When the starting size is different from the end

Ex : A morphing at the same time

ANIMATED DASHED LINE
────────────────────

►►►  need to be the same for all elements

this.dahsedLineAnimation = new S.AnimatedLine({
    el: element,
    d: 1500,
    e: 'ExpoInOut',
    dashed: '1,4',
    cb: false
})

START & END
───────────

►►►  percentage
►►►  default → start: 0 & end: 100

this.lineAnimation = new S.AnimatedLine({
    el: element,
    start: '0',
    end: '25',
    d: 1500,
    e: 'ExpoInOut',
    cb: false
})

*/

S.AnimatedLine = function (opts) {
    var self = this
    this.el = S.Selector.el(opts.el)
    this.elL = this.el.length
    var elWL = opts.elWithLength
    var d = opts.d
    var e = opts.e
    var dashed = opts.dashed || false
    var start = opts.start || 0
    var end = opts.end || 100

    var startCoeff = (100 - +start) / 100
    var endCoeff = (100 - +end) / 100
    var startArr = []
    var endArr = []
    var shapeL = []
    var cb = []
    var r = 1000
    this.merom = []

    for (var i = 0; i < this.elL; i++) {
        shapeL[i] = getShapeLength(this.el[i])
        cb[i] = i === this.elL - 1 ? opts.cb : false

        if (dashed) {
            var dashL = 0
            var dashArr = dashed.split(/[\s,]/)
            var dashArrL = dashArr.length
            for (var j = 0; j < dashArrL; j++) {
                dashL += parseFloat(dashArr[j]) || 0
            }
            var a = ''
            var dashCount = Math.ceil(shapeL[i] / dashL)
            for (var j = 0; j < dashCount; j++) {
                a += dashed + ' '
            }
            this.el[i].style.strokeDasharray = a + '0' + ' ' + shapeL[i]
        } else {
            this.el[i].style.strokeDasharray = shapeL[i]
        }

        startArr[i] = startCoeff * shapeL[i]
        endArr[i] = endCoeff * shapeL[i]

        this.merom[i] = new S.Merom({d: d, e: e, update: upd, cb: cb[i]})
    }

    function upd (v) {
        for (var i = 0; i < self.elL; i++) {
            self.el[i].style.strokeDashoffset = Math.round(S.Lerp.init(startArr[i], endArr[i], v.progress) * r) / r
        }
    }

    function getShapeLength (el) {
        if (el.tagName === 'circle') {
            var radius = el.getAttribute('r')
            return 2 * radius * Math.PI
        } else if (el.tagName === 'line') {
            var x1 = el.getAttribute('x1')
            var x2 = el.getAttribute('x2')
            var y1 = el.getAttribute('y1')
            var y2 = el.getAttribute('y2')
            return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2)
        } else {
            var el = elWL || el
            return el.getTotalLength()
        }
    }
}

S.AnimatedLine.prototype = {

    play: function (opts) {
        for (var i = 0; i < this.elL; i++) {
            this.el[i].style.opacity = 1
            this.merom[i].play(opts)
        }
    },

    pause: function () {
        for (var i = 0; i < this.elL; i++) {
            this.merom[i].pause()
        }
    }

}

