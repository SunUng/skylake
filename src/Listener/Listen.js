/*

S.Listen(element, 'add', 'click', callback)

S.Listen(document, 'remove', 'touchmove', callback)

*/

S.Listen = function (el, action, type, cb) {
    var d = document
    var el = S.Selector.el(el)
    var elL = el.length
    var listenType

    if (type === 'mouseWheel') {
        listenType = 'onwheel' in d ? 'wheel' : d.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll'
    } else if (type === 'focusOut') {
        listenType = S.Sniffer.isFirefox ? 'blur' : 'focusout'
    } else {
        listenType = type
    }

    for (var i = 0; i < elL; i++) {
        el[i][action + 'EventListener'](listenType, cb)
    }
}
