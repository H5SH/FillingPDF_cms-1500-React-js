import { PDFDocument } from "pdf-lib"

// Loop to fill the form with the names of its on fields 
export async function fillFieldWithThereName(fileBytes, checkboxes, buttons, findAndPrintOnConsole){
  const pdfDoc = await PDFDocument.load(fileBytes)
    const form = pdfDoc.getForm()
    form.updateFieldAppearances()

    form.getFields().find(x=>{
        // to fields with specific names
        if(x.getName().includes(findAndPrintOnConsole)){
          console.log(x.getName())
        }
       
          try{
            if(checkboxes.includes(x.getName())){
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
