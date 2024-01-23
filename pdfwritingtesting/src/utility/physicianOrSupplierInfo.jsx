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
            form.getTextField(`plan${row}`).setText(placeOfService)
            form.getTextField(`type${row}`).setText(emg)
            form.getTextField(`cpt${row}`).setText(cpt)

            const mod = ['a', 'b', 'c']
            arrayOf4modifiers.map((modifier, index)=>{
                if(index === 0){
                    form.getTextField(`mod${row}`).setText(modifier)
                }else{
                    form.getTextField(`mod${row}${mod[index - 1]}`).setText(modifier)
                }
            })
            form.getTextField(`diag${row}`).setText(diagnosisPointer)
            form.getTextField(`ch${row}`).setText(charges)
            form.getTextField(`day${row}`).setText(daysOrUnits)
            form.getTextField(`epsdt${row}`).setText(epsdt)
            form.getTextField(`plan${row}`).setText(plan)
            form.getTextField(`emg${row}`).setText(emg)
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
