/*

const tl = new S.Timeline()
tl.from('#element-0', '3dy', 0, 100, 1000, 'Power4Out', {delay: 500})
tl.from('#element-1', 'opacity', 1, 0, 500, 'linear', {callbackDelay: 600, callback: myCallback})
tl.play()

tl.pause()

tl.reverse([
    {
        newEnd: '20',
        duration: 1500,
        ease: 'PowerInOut'
    },
    {
        newEnd: 100,
        duration: 1000,
        ease: 'Power4Out',
        delay: 1000,
        callbackDelay: 500,
        callback: myCallback
    }
])

*/

S.Timeline = function () {
    this.content = []

    this.contentL = function () {
        return this.content.length
    }
}

S.Timeline.prototype = {

    from: function (element, prop, start, end, duration, ease, opts) {
        if (this.contentL() > 0) {
            var opts = opts || {}
            var prevTimelineDelay = this.content[this.contentL() - 1].delay
            var arg4isObj = duration && S.Is.object(duration)
            if (arg4isObj && duration.delay) {
                duration.delay = prevTimelineDelay + duration.delay
            } else if (arg4isObj) {
                duration.delay = prevTimelineDelay
            } else if (opts.delay) {
                opts.delay = prevTimelineDelay + opts.delay
            } else {
                opts.delay = prevTimelineDelay
            }
        }

        this.content.push(new S.Merom(element, prop, start, end, duration, ease, opts))
    },

    play: function () {
        for (var i = 0; i < this.contentL(); i++) {
            this.content[i].play()
        }
    },

    pause: function () {
        for (var i = 0; i < this.contentL(); i++) {
            this.content[i].pause()
        }
    },

    reverse: function (opts) {
        for (var i = 0; i < this.contentL(); i++) {
            const opt = !opts ? undefined : opts[i]
            this.content[i].reverse(opt)
        }
    }

}
