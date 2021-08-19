function isHangul(ch) {
    let c = ch.charCodeAt(0)
    return 0xac00 <= c && c <= 0xd7a3
}

function parseMeal(str) {
    return str.trim()
        .split('\n')
        .map((menuStr) => {
            let start = -1,
                end = 0
            for (let i = 0; i < menuStr.length; i++) {
                if (isHangul(menuStr[i])) {
                    if (start === -1) start = i
                    end = i
                }
            }
            if (
                menuStr[end + 1] === ')' ||
                menuStr[end + 1] === ']' ||
                menuStr[end + 1] === '>'
            )
                end++
            let menuName = menuStr.substring(start, end + 1)
            if (!menuName) return null
            let allergicList
            try {
                allergicList = menuStr
                    .substring(end + 1)
                    .match(/\d+/g)
                    .map(Number)
            } catch (e) {
                allergicList = []
            }
            return {
                name: menuName,
                allergicInfo: allergicList,
            }
        })
        .filter((x) => x)
}

module.exports = parseMeal