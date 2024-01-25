import { setFromAndToDate } from "./setDates"

export function setSupplierInfo(
    form,
    titleOfService,
    fromDate, 
    toDate,
    placeOfService, 
    emg,
    cpt,
    arrayOf4modifiers,
    diagnosisPointer,
    charges,
    daysOrUnits,
    epsdt,
    plan, 
    qualId,
    arrayOf2RenderingProviders,
    row
     ){
        if(titleOfService.length > 0 && row > 0 && row < 7){
            switch (row){
                case 1:
                    form.getTextField('Suppl').setText(titleOfService)
                    break
                case 2:
                    form.getTextField('Suppla').setText(titleOfService)
                    break
                case 3:
                    form.getTextField("Supplb").setText(titleOfService)
                    break
                case 4:
                    form.getTextField("Supplc").setText(titleOfService)
                    break
                case 5:
                    form.getTextField("Suppld").setText(titleOfService)
                    break
                case 6:
                    form.getTextField("Supple").setText(titleOfService)
                    break
            }

            setFromAndToDate(form, `sv${row}`, fromDate, toDate)

            const mod = ['a', 'b', 'c']
            arrayOf4modifiers.map((modifier, index)=>{
                if(index === 0){
                    form.getTextField(`mod${row}`).setText(modifier)
                }else{
                    form.getTextField(`mod${row}${mod[index - 1]}`).setText(modifier)
                }
            })
            const fields = [`cpt${row}`, `type${row}`, `plan${row}`, `diag${row}`, `ch${row}`, `day${row}`, `epsdt${row}`, `plan${row}`, `emg${row}`]
            const data = [cpt, emg, placeOfService, diagnosisPointer, `${charges}`, daysOrUnits, epsdt, plan, `${qualId}`]
            fields.map((field, index)=>{
                data[index] && form.getTextField(field).setText(data[index])
            })
            if(arrayOf2RenderingProviders.length <= 2 && arrayOf2RenderingProviders.length > 0){
                arrayOf2RenderingProviders.map((renderingProvider, index)=>{
                    if(index === 0){
                        form.getTextField(`local${row}`).setText(renderingProvider)
                    }else{
                        form.getTextField(`local${row}a`).setText(renderingProvider)
                    }
                })
            }
        }
        
}

export function setDiagnosisNature(form, arrayOfdiagnosis, icdInd){
    form.getTextField('99icd').setText(icdInd)
    if(arrayOfdiagnosis.length > 0){
        arrayOfdiagnosis.map((diagnose, index)=> {
            form.getTextField(`diagnosis${++index}`).setText(diagnose)
        })
    }
}

export function setServiceFacilityLocation(form ,name, street, location, a, b){
    if(name.length > 0 && street.length > 0 && location.length > 0){
        const fields = ['fac_name', 'fac_street', 'fac_location', 'pin1', 'grp1']
        const data = [name, `${street}`, location, a, b]
        fields.map((field, index)=>{
            data[index] && form.getTextField(field).setText(data[index])
        })
    }
}

export function setBillingProviderInfo(form ,name, street, location, countryCode, number,a, b){
    if(name.length > 0 && street.length > 0 && location.length > 0 && countryCode.length > 0 && number.length > 0){
        const fields = ['doc_name', 'doc_street', 'doc_location', 'doc_phone area', 'doc_phone', 'pin', 'grp']
        const data = [name, `${street}`, location, `${countryCode}`, `${number}`, a, b]
        fields.map((field, index)=>{
            data[index] && form.getTextField(field).setText(data[index])
        })
    }
}
