function getMeal() {
    let date = new Date()
    return new Promise((resolve, reject) => {
        fetch('https://api.github.com/repos/IASA-Null/mealAction/issues').then(res => res.json()).then(res => {
            for (let i of res) {
                if (i.title === `I${date.getFullYear()}_${date.getMonth() + 1}`) {
                    resolve(JSON.parse(i.body))
                    return
                }
            }
            reject()
        }).catch((e) => reject(e))
    })
}