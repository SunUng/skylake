/*

const ease = S.EaseCSS(0.8, 0, 0, 1)
ease(multiplier)

*/

var ni = 4
var nms = 0.001
var sp = 0.0000001
var smi = 10

var ksts = 11
var kSSS = 1.0 / (ksts - 1.0)

function A (aA1, aA2) {
    return 1.0 - 3.0 * aA2 + 3.0 * aA1
}
function B (aA1, aA2) {
    return 3.0 * aA2 - 6.0 * aA1
}
function C (aA1) {
    return 3.0 * aA1
}

function calcBezier (aT, aA1, aA2) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT
}

function getS (aT, aA1, aA2) {
    return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1)
}

function binarySubdivide (aX, aA, aB, mX1, mX2) {
    var currentX, currentT, i = 0
    do {
        currentT = aA + (aB - aA) / 2.0
        currentX = calcBezier(currentT, mX1, mX2) - aX
        if (currentX > 0.0) {
            aB = currentT
        } else {
            aA = currentT
        }
    } while (Math.abs(currentX) > sp && ++i < smi)
    return currentT
}

function nRI (aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < ni; ++i) {
        var currS = getS(aGuessT, mX1, mX2)
        if (currS === 0.0) {
            return aGuessT
        }
        var currentX = calcBezier(aGuessT, mX1, mX2) - aX
        aGuessT -= currentX / currS
    }
    return aGuessT
}

S.EaseCSS = function (mX1, mY1, mX2, mY2) {
    var val = new Float32Array(ksts)
    if (mX1 !== mY1 || mX2 !== mY2) {
        for (var i = 0; i < ksts; ++i) {
            val[i] = calcBezier(i * kSSS, mX1, mX2)
        }
    }

    function getTForX (aX) {
        var iS = 0.0
        var lst = ksts - 1

        for (var curr = 1; curr !== lst && val[curr] <= aX; ++curr) {
            iS += kSSS
        }
        --curr

        var dist = (aX - val[curr]) / (val[curr + 1] - val[curr])
        var guessForT = iS + dist * kSSS

        var iS = getS(guessForT, mX1, mX2)
        if (iS >= nms) {
            return nRI(aX, guessForT, mX1, mX2)
        } else if (iS === 0.0) {
            return guessForT
        } else {
            return binarySubdivide(aX, iS, iS + kSSS, mX1, mX2)
        }
    }

    return function BezierEasing (x) {
        if (mX1 === mY1 && mX2 === mY2) {
            return x
        }
        if (x === 0) {
            return 0
        }
        if (x === 1) {
            return 1
        }
        return calcBezier(getTForX(x), mY1, mY2)
    }
}
