/*

S.Has(object, 'property')

*/

S.Has = function (obj, key) {
    return obj ? hasOwnProperty.call(obj, key) : false
}
