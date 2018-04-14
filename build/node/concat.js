const fs = require('fs')

const srcArr = [
    'src/Base/S.js',
    'src/Animation/Merom.js',
    'src/Animation/Timeline.js',
    'src/Core/BindMaker.js',
    'src/Core/Ease.js',
    'src/Core/Has.js',
    'src/Core/Is.js',
    'src/Core/Lerp.js',
    'src/Core/Round.js',
    'src/Core/Snif.js',
    'src/Core/Throttle.js',
    'src/El/G.js', // Must be before 'Dom'
    'src/El/Dom.js',
    'src/El/Selector.js',
    'src/El/Index.js',
    'src/Event/MM.js',
    'src/Event/RO.js',
    'src/Event/Scroll.js',
    'src/Event/WT.js',
    'src/Event/WTP.js',
    'src/Listener/L.js',
    'src/Scroll/ScrollToTop.js',
    'src/Scroll/ScrollTo.js',
    'src/Scroll/ScrollZero.js',
    'src/Scroll/TopWhenRefresh.js',
    'src/Window/Win.js'
]

const dist = 'skylake.js'

const encoding = 'utf-8'

const src = srcArr.map(value => {
    return fs.readFileSync(value, encoding)
}).join('\n')

fs.writeFileSync(dist, src, encoding)
