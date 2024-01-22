import { PDFDocument, PDFName, createPDFAcroFields } from "pdf-lib"

// Loop to fill the form with the names of its on fields 
export async function fillFieldWithThereName(fileBytes, buttons, f){
  const pdfDoc = await PDFDocument.load(fileBytes)
    const form = pdfDoc.getForm()
    form.updateFieldAppearances()
    const kids = createPDFAcroFields(form.getCheckBox('rel_to_ins').acroField.Kids()).map(_=>_[0])
    const [medicare, medicaid, tricate, champva, group, feca, other] = createPDFAcroFields(form.getCheckBox('insurance_type').acroField.Kids()).map(_=>_[0])
    medicare.setPartialName('mediacre')
    medicaid.setPartialName('medicaid')
    tricate.setPartialName('tricate')
    champva.setPartialName('champva')
    group.setPartialName('group')
    feca.setPartialName('feca')
    other.setPartialName('other')
    let count = 1
    if (f.toLowerCase() === medicare.getPartialName().toLowerCase()){
      medicare.setValue(medicaid.getOnValue())
    }else if(f.toLowerCase() === medicaid.getPartialName().toLowerCase()){
      medicaid.setValue(medicaid.getOnValue())
    }else if(f.toLowerCase() === tricate.getPartialName().toLowerCase()){
      tricate.setValue(tricate.getOnValue())
    }else if(f.toLowerCase() === champva.getPartialName().toLowerCase()){
      champva.setValue(champva.getOnValue())
    }else if(f.toLowerCase() === group.getPartialName().toLowerCase()){
      group.setValue(group.getOnValue())
    }else if(f.toLowerCase() === feca.getPartialName().toLowerCase()){
      feca.setValue(feca.getOnValue())
    }else if(f.toLowerCase() === other.getPartialName().toLowerCase()){
      other.setValue(other.getOnValue())
    }
    // insuranceTypes.forEach((kid, index)=>{
    //   if(typeof kid.getPartialName() === 'undefined'){
    //     kid.setPartialName(`insurance_type_${count++}`)
    //   }
    //   // console.log(kid.getOnValue())
    //   // if('/Medicaid' === kid.getOnValue().encodedName){
    //   //   kid.setValue(kid.getOnValue())
    //   // }
    //   console.log(kid.getPartialName())
    //   console.log(PDFName.of('ZIP CODE'))
    //   if(kid.getPartialName() === 'insurance_type_2'){
    //      kid.setValue(kid.getOnValue())
    //   }
    // })

    // insuranceTypes.map((kid, index)=>{
    //   if('/Other' === kid.getOnValue().encodedName){
    //     kid.setValue(kid.getOnValue())
    //   }
    // })

    const checkBoxOutSideLab_20 = form.getCheckBox('lab').check()
    const checkBoxEmployment_a = form.getCheckBox('employment').check()
    // b. AUTO ACCIDENT?
    const checkBoxAutoAccident_b = form.getCheckBox('pt_auto_accident').check()
    // c. OTHER ACCIDENT?
    const checkBoxOtherAccident_c = form.getCheckBox('other_accident').check()
    // console.log(form.getOptionList())
    // console.log(form.getCheckBox('insurance_type').acroField.Kids())
   

    // form.getFields().find(x=>{
    //     // to fields with specific names
    //     if(x.getName().includes(findAndPrintOnConsole)){
    //       console.log(x.getName())
    //     }
       
    //       try{
    //         if(typeof form.getField(x.getName()).check === 'function'){
    //           form.getCheckBox(x.getName()).check()
    //         }else if(buttons.includes(x.getName())){
    //           form.getButton(x.getName())
    //         }else{
    //           const length = form.getTextField(x.getName()).getMaxLength()
    //           // fields with max length limit get filled with sliced name
    //           if(length === undefined || length > 4){
    //             form.getTextField(x.getName()).setText(x.getName())
    //           }else{
    //             form.getTextField(x.getName()).setText(x.getName().slice(0, length))
    //           }
    //         }
  
    //       }catch(err){
    //         console.log("LOOP ERROR")
    //         console.log(err)
    //       }
      
    //   })

      return await urlforPDF(pdfDoc)
}


export async function urlforPDF(pdfDoc){
  const pdfBytes = await pdfDoc.save()
    const file = new Blob([pdfBytes], {type:'applocation/pdf'})
    return URL.createObjectURL(file) 
}
