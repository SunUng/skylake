/*

EXPLOITATION HTML - CIRCLE SHAPE
────────────────────────────────

<svg width="30" height="30" viewBox="0 0 30 30">
    <circle class="shape" r="14.5" cx="15" cy="15"></circle>
</svg>

►►►  r = 14.5 because stroke-width = 1 in this example

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

const animatedLine = new S.AnimatedLine({
    el: '.shape',
    elWithLength: this.lEl, // optional
    duration: 1000,
    ease: 'linear',
    callback: false
})

animatedLine.play()

animatedLine.reverse()

animatedLine.pause()

animatedLine.play({
    duration: 500,
    ease: 'Power4InOut',
    callback: myCallback
})

animatedLine.reverse({
    duration: 500,
    ease: 'Power4InOut',
    callback: myCallback
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

const dahsedLineAnimation = new S.AnimatedLine({
    el: element,
    duration: 1500,
    ease: 'ExpoInOut',
    dashed: '1,4',
    callback: false
})

START & END
───────────

►►►  percentage
►►►  default → start: 0 & end: 100

const lineAnimation = new S.AnimatedLine({
    el: element,
    start: '0',
    end: '25',
    duration: 1500,
    ease: 'ExpoInOut',
    callback: false
})

*/

S.AnimatedLine = function (opts) {
    this.el = S.Selector.el(opts.el)
    this.elL = this.el.length
    this.elWL = opts.elWithLength
    this.duration = opts.duration
    this.ease = opts.ease
    this.dashed = opts.dashed || false
    this.start = opts.start || 0
    this.end = opts.end || 100

    this.startCoeff = (100 - +this.start) / 100
    this.endCoeff = (100 - +this.end) / 100
    this.startArr = []
    this.endArr = []
    this.shapeLength = []
    this.cb = []
    this.merom = []

    for (var i = 0; i < this.elL; i++) {
        this.shapeLength[i] = this.getShapeLength(this.el[i])
        this.cb[i] = i === this.elL - 1 ? opts.callback : false

        if (this.dashed) {
            var dashL = 0
            var dashArr = this.dashed.split(/[\s,]/)
            var dashArrL = dashArr.length
            for (var j = 0; j < dashArrL; j++) {
                dashL += parseFloat(dashArr[j]) || 0
            }
            var a = ''
            var dashCount = Math.ceil(this.shapeLength[i] / dashL)
            for (var j = 0; j < dashCount; j++) {
                a += this.dashed + ' '
            }
            this.el[i].style.strokeDasharray = a + '0' + ' ' + this.shapeLength[i]
        } else {
            this.el[i].style.strokeDasharray = this.shapeLength[i]
        }

        this.startArr[i] = this.startCoeff * this.shapeLength[i]
        this.endArr[i] = this.endCoeff * this.shapeLength[i]

        this.merom[i] = new S.Merom(this.el[i], 'strokeDashoffset', this.startArr[i], this.endArr[i], this.duration, this.ease, {callback: this.cb[i]})
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
    },

    reverse: function (opts) {
        for (var i = 0; i < this.elL; i++) {
            this.merom[i].reverse(opts)
        }
    },

    getShapeLength: function (el) {
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
            var el = this.elWL || el
            return el.getTotalLength()
        }
    }

}

