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

*/

S.AnimatedLine = function (opts) {
    this.el = S.Selector.el(opts.el)
    this.elL = this.el.length
    this.elWL = opts.elWithLength
    this.duration = opts.duration
    this.ease = opts.ease

    this.shapeLength = []
    this.cb = []
    this.merom = []

    for (var i = 0; i < this.elL; i++) {
        this.shapeLength[i] = this.getShapeLength(this.el[i])
        this.cb[i] = i === this.elL - 1 ? opts.callback : false

        this.el[i].style.strokeDasharray = this.shapeLength[i]
        this.el[i].style.opacity = 1

        this.merom[i] = new S.Merom(this.el[i], 'strokeDashoffset', this.shapeLength[i], 0, this.duration, this.ease, {callback: this.cb[i]})
    }
}

S.AnimatedLine.prototype = {

    play: function (opts) {
        for (var i = 0; i < this.elL; i++) {
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
        } else {
            var el = this.elWL || el
            return el.getTotalLength()
        }
    }

}

