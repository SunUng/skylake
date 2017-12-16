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
    this.arrL = 0
}

S.Timeline.prototype = {

    from: function (opts) {
        if (this.arrL > 0) {
            opts.delay += this.arr[this.arrL - 1].v.delay || 0
        }
        this.arr.push(new S.Merom(opts))
        this.arrL++
    },

    play: function (opts) {
        this.run('play', opts)
    },

    pause: function () {
        this.run('pause')
    },

    run: function (type, opts) {
        for (var i = 0; i < this.arrL; i++) {
            var opt = !opts ? undefined : opts[i]
            this.arr[i][type](opt)
        }
    }

}
