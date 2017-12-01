/*

S.BindMaker(this, ['bindFunction1', 'bindFunction2', 'bindFunction3'])

*/

S.BindMaker = function (self, bindArr) {
    var bindArrL = bindArr.length

    for (var i = 0; i < bindArrL; i++) {
        self[bindArr[i]] = self[bindArr[i]].bind(self)
    }
}
