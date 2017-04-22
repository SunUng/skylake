/*

const isSafari = S.Sniffer.isSafari
const version = S.Sniffer.version
const isTouch = S.Sniffer.isTouch

*/

S.Sniffer = {

    uA: navigator.userAgent.toLowerCase(),

    get isAndroid () {
        const isDroidPhone = /android.*mobile/.test(this.uA)
        return isDroidPhone || !isDroidPhone && /android/i.test(this.uA)
    },

    get isFirefox () {
        return this.uA.indexOf('firefox') > -1
    },

    get safari () {
        return this.uA.match(/version\/[\d\.]+.*safari/)
    },

    get isSafari () {
        return !!this.safari && !this.isAndroid
    },

    get isSafariOlderThan8 () {
        var limit = 8
        var version = limit
        if (this.isSafari) {
            var versionWithVersionWord = this.safari[0].match(/version\/\d{1,2}/)
            version = +versionWithVersionWord[0].split('/')[1]
        }
        return version < limit
    },

    get isIEolderThan11 () {
        return this.uA.indexOf('msie') > -1
    },

    get isIE11 () {
        return navigator.appVersion.indexOf('Trident/') > 0
    },

    get isIE () {
        return this.isIEolderThan11 || this.isIE11
    },

    get isMac () {
        return navigator.platform.toLowerCase().indexOf('mac') > -1
    },

    get isTouch () {
        return 'ontouchstart' in window
    }
}
