const neis = require("neis")
const parseMeal = require('./parse')
const fs = require('fs')

const school = neis.createSchool(neis.REGION.INCHOEN, "E100002238", neis.TYPE.HIGH)

school.getMeal(new Date().getFullYear(), new Date().getMonth() + 1).then(mealInfo => {
    let res = mealInfo.map(d => {
        return [parseMeal(d.breakfast), parseMeal(d.lunch), parseMeal(d.dinner)]
    }).filter(x => x)
    fs.writeFileSync('./.github/ISSUE_TEMPLATE.md', `---
title: ${new Date().getFullYear()}_${new Date().getMonth() + 1}
---
${JSON.stringify(res)}`)
});
