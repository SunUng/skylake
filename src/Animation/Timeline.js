/*

this.tl = new S.Timeline()
this.tl.from({el: '#id0', p: {x: [0, 600, 'px'], rotate: [0, 360]}, d: 5000, e: 'linear'})
this.tl.from({el: '#id1', p: {x: [0, 600, 'px'], rotate: [0, 360]}, d: 5000, e: 'linear', delay: 300})

this.tl.play()

this.tl.pause()

*/

S.Timeline = function () {
    this.arr = []
    this.delay = 0
}

S.Timeline.prototype = {

    from: function (opts) {
        this.delay += S.Has(opts, 'delay') ? opts.delay : 0
        opts.delay = this.delay
        this.arr.push(new S.Merom(opts))
    },

    play: function (opts) {
        this.run('play', opts)
    },

    pause: function () {
        this.run('pause')
    },

    run: function (type, opts) {
        var arrL = this.arr.length
        for (var i = 0; i < arrL; i++) {
            var opt = !opts ? undefined : opts[i]
            this.arr[i][type](opt)
        }
    }

}
