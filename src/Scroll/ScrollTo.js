/*

const options = {
    dest: 1000,
    d: 200,
    e: 'Power3Out',
    cb: afterTop
}

S.ScrollTo(options)

*/

S.ScrollTo = function (opts) {
    var d = document
    var scrollNode = d.scrollingElement ? d.scrollingElement : S.Dom.body // Chrome v.61
    var scrollable = S.Sniffer.isFirefox || S.Sniffer.isIE ? d.documentElement : scrollNode
    var start = pageYOffset
    var end = opts.dest
    var r = 1000
    var anim = new S.Merom({d: opts.d, e: opts.e, update: upd, cb: getCb})

    if (start === end) {
        getCb()
    } else {
        S.WTDisable.on()
        anim.play()
    }

    function upd (v) {
        scrollable.scrollTop = Math.round(S.Lerp.init(start, end, v.progress) * r) / r
    }

    function getCb () {
        S.WTDisable.off()

        if (opts.cb) {
            opts.cb()
        }
    }
}
