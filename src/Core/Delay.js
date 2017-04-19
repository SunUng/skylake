/*

S.Delay(callback, delay)

*/

S.Delay = function (cb, delay) {
    window.setTimeout(function () {
        cb()
    }, delay)
}
