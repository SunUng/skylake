/*

this.tl = new S.Timeline()
this.tl.from({el: '#id0', p: {x: [0, 600, 'px'], rotate: [0, 360]}, d: 5000, e: 'linear'})
this.tl.from({el: '#id1', p: {x: [0, 600, 'px'], rotate: [0, 360]}, d: 5000, e: 'linear', delay: 300})

this.tl.play()

this.tl.pause()

this.tl.reverse([
    {p: {x: {newEnd: 100}}},
    {p: {x: {newEnd: 400}}}
])

*/

S.Timeline = function () {
    this.arr = []

    this.contentL = function () {
        return this.arr.length
    }
}

S.Timeline.prototype = {

    from: function (opts) {
        if (this.contentL() > 0) {
            var prev = this.arr[this.contentL() - 1]
            var prevDelay = prev.delay || 0
            opts.delay += prevDelay
        }

        this.arr.push(new S.Merom(opts))
    },

    play: function () {
        for (var i = 0; i < this.contentL(); i++) {
            this.arr[i].play()
        }
    },

    pause: function () {
        for (var i = 0; i < this.contentL(); i++) {
            this.arr[i].pause()
        }
    },

    reverse: function (opts) {
        for (var i = 0; i < this.contentL(); i++) {
            var opt = !opts ? undefined : opts[i]
            this.arr[i].reverse(opt)
        }
    }

}
