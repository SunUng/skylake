/*

const el[0] = S.Selector.el(selector)
const type = S.Selector.type(selector)
const name = S.Selector.name(selector)

*/

S.Selector = {
    el: function (s) {
        var el = []
        if (S.Is.string(s)) {
            const elementName = s.substring(1)
            if (s.charAt(0) === '#') {
                el[0] = S.Geb.id(elementName)
            } else {
                el = S.Geb.class(elementName)
            }
        } else {
            el[0] = s
        }
        return el
    },

    type: function (s) {
        if (s.charAt(0) === '#') {
            return 'id'
        } else {
            return 'class'
        }
    },

    name: function (s) {
        return s.substring(1)
    }
}
