
export function setDate(form, fieldName ,date){
    if(date.length > 0){
        const [day, month, year] = date.split(/[-/]/)
        form.getTextField(`${fieldName}_dd`).setText(day)
        form.getTextField(`${fieldName}_mm`).setText(month)
        form.getTextField(`${fieldName}_yy`).setText(year)
    }
}

export function setFromAndToDate(form, fieldName, fromDate, ToDate){
    if(fromDate.length > 0 && ToDate.length > 0 && fieldName.length > 0){
        const [fromDay, fromMonth, fromYear] = fromDate.split(/[-/]/)

        form.getTextField(`${fieldName}_dd_from`).setText(fromDay)
        form.getTextField(`${fieldName}_mm_from`).setText(fromMonth)

        const [toDay, toMonth, toYear] = ToDate.split(/[-/]/)
        form.getTextField(`${fieldName}_dd_end`).setText(toDay)
        form.getTextField(`${fieldName}_mm_end`).setText(toMonth)

        if(form.getTextField(`${fieldName}_yy_from`).getMaxLength() < 4){
            form.getTextField(`${fieldName}_yy_from`).setText(fromYear.slice(2, 4))
            form.getTextField(`${fieldName}_yy_end`).setText(toYear.slice(2, 4))
        }else{
            form.getTextField(`${fieldName}_yy_end`).setText(toYear)
            form.getTextField(`${fieldName}_yy_end`).setText(fromYear)
        }
    }
}