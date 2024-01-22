import { PDFDocument, PDFName, createPDFAcroFields } from "pdf-lib"

// Loop to fill the form with the names of its on fields 
export async function fillFieldWithThereName(fileBytes, buttons, f){
  const pdfDoc = await PDFDocument.load(fileBytes)
    const form = pdfDoc.getForm()
    form.updateFieldAppearances()

    // check child of a checkbox
    // const kids = createPDFAcroFields(form.getCheckBox('rel_to_ins').acroField.Kids()).map(_=>_[0])
    // checkChildBox(form, kids, 4)

    form.getFields().find(x=>{
        // to fields with specific names
        if(x.getName().includes(findAndPrintOnConsole)){
          console.log(x.getName())
        }
       
          try{
            if(typeof form.getField(x.getName()).check === 'function'){
              form.getCheckBox(x.getName()).check()
            }else if(buttons.includes(x.getName())){
              form.getButton(x.getName())
            }else{
              const length = form.getTextField(x.getName()).getMaxLength()
              // fields with max length limit get filled with sliced name
              if(length === undefined || length > 4){
                form.getTextField(x.getName()).setText(x.getName())
              }else{
                form.getTextField(x.getName()).setText(x.getName().slice(0, length))
              }
            }
  
          }catch(err){
            console.log("LOOP ERROR")
            console.log(err)
          }
      
      })

      return await urlforPDF(pdfDoc)
}


export async function urlforPDF(pdfDoc){
  const pdfBytes = await pdfDoc.save()
    const file = new Blob([pdfBytes], {type:'applocation/pdf'})
    return URL.createObjectURL(file) 
}

async function checkChildBox(form, arrayOfCheckBoxes ,boxNumber){
  if(arrayOfCheckBoxes.length < boxNumber){
    throw "ARRAY IS SMALLER THEN THE BOXNUMBER"
  }else{

    arrayOfCheckBoxes.forEach((kid, index)=>{
      if(typeof kid.getPartialName() === 'undefined'){
        kid.setPartialName(`insurance_type_${index}`)
      }
      // console.log(kid.getOnValue())
      // if('/Medicaid' === kid.getOnValue().encodedName){
      //   kid.setValue(kid.getOnValue())
      // }
      console.log(kid.getPartialName())
      if(kid.getPartialName() === `insurance_type_${boxNumber + 1}`){
         kid.setValue(kid.getOnValue())
      }
    })
  }
  
}
