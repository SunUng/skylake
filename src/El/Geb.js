/*

GET ELEMENT BY
──────────────

const content = S.Geb.id('content')
const btn = S.Geb.class('btn')
const span = S.Geb.tag('span')

CHILD OF ELEMENT
────────────────

const elements = S.Geb.class('elements', parentEl)

*/

S.Geb = {
    parent: function (p) {
        return p ? p : document
    },

    id: function (el, p) {
        return this.parent(p).getElementById(el)
    },

    class: function (el, p) {
        return this.parent(p).getElementsByClassName(el)
    },

    tag: function (el, p) {
        return this.parent(p).getElementsByTagName(el)
    }
}
