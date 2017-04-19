/*

const content = S.Geb.id('content')
const btn = S.Geb.class('btn')
const span = S.Geb.tag('span')

*/

S.Geb = (function () {
    var d = document

    var id = function (el) {
        return d.getElementById(el)
    }

    var class = function (el) {
        return d.getElementsByClassName(el)
    }

    var tag = function (el) {
        return d.getElementsByTagName(el)
    }

    return {
        id: id,
        class: class,
        tag: tag
    }
}())
