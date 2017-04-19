/*

const elementLiIndex = S.Index.list(liElement)
const elementClassIndex = S.Index.class(elementWithClass, className)

*/

S.Index = (function () {
    function index (n, els) {
        var elsL = els.length
        for (var i = 0; i < elsL; i++) {
            if (n === els[i]) {
                return i
            }
        }
        return -1
    }

    var list = function (n) {
        var els = n.parentNode.children
        return index(n, els)
    }

    var class = function (n, cN) {
        var els = S.Geb.class(cN)
        return index(n, els)
    }

    return {
        list: list,
        class: class
    }
}())
