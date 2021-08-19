const neis = require("neis")
const parseMeal = require('./parse')
const fs = require('fs')

const school = neis.createSchool(neis.REGION.INCHOEN, "E100002238", neis.TYPE.HIGH)

var date = new Date();
date.setDate(date.getDate() + 3);

school.getMeal(date.getFullYear(), new date.getMonth() + 1).then(mealInfo => {
    let res = mealInfo.map(d => {
        return [parseMeal(d.breakfast), parseMeal(d.lunch), parseMeal(d.dinner)]
    }).filter(x => x)
    fs.writeFileSync('./.github/ISSUE_TEMPLATE.md', `---
title: I${date.getFullYear()}_${date.getMonth() + 1}
---
${JSON.stringify(res)}`)
});
