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

EXPLOITATION JS
───────────────

►►►  shape (circle, path)    →   '#id' or '.class' or domElement

const animatedLine = new S.AnimatedLine('.shape')
animatedLine.play(4000, 'Power1InOut', playCallback)
animatedLine.reverse(1000, 'ExpoInOut', reverseCallback)
animatedLine.pause('on')
animatedLine.pause('off')
animatedLine.reset()

EXPLOITATION CSS
────────────────

.shape {
    fill: none;
    stroke: pink;
    opacity: 0;
    transition: opacity 10ms linear 10ms; /* debug IE
}

*/

S.AnimatedLine = function (shape) {
    this.shape = S.Selector.el(shape)
    this.shapeL = this.shape.length

    this.merom = []
}

S.AnimatedLine.prototype = {

    play: function (duration, ease, cb) {
        this.type = 'play'
        this.run(duration, ease, cb)
    },

    reverse: function (duration, ease, cb) {
        this.type = 'reverse'
        this.run(duration, ease, cb)
    },

    run: function (duration, ease, cb) {
        this.duration = duration
        this.ease = ease
        this.cb = cb
        for (var i = 0; i < this.shapeL; i++) {
            this.animationLine(this.shape[i], i)
        }
    },

    pause: function (status) {
        for (var i = 0; i < this.shapeL; i++) {
            this.merom[i].pause(status)
        }
    },

    reset: function () {
        for (var i = 0; i < this.shapeL; i++) {
            this.shape[i].style = ''
        }
    },

    animationLine: function (shape, i) {
        var shapeLength = this.getShapeLength(shape)
        var start
        var end
        if (this.type === 'reverse') {
            var shapeSDO = shape.style.strokeDashoffset
            start = shapeSDO.charAt(shapeSDO.length - 1) === 'x' ? +shapeSDO.substring(0, shapeSDO.length - 2) : +shapeSDO
            end = shapeLength
        } else {
            start = shapeLength
            end = 0
        }

        shape.style.strokeDasharray = shapeLength
        shape.style.opacity = 1

        this.merom[i] = new S.Merom(shape, 'strokeDashoffset', start, end, this.duration, this.ease, {callback: this.cb})
        this.merom[i].play()
    },

    getShapeLength: function (shape) {
        var shapeLength

        if (shape.tagName === 'circle') {
            var radius = shape.getAttribute('r')
            shapeLength = 2 * radius * Math.PI
        } else {
            shapeLength = shape.getTotalLength()
        }

        return shapeLength
    }

}

