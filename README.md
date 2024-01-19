# PDFAndReact
The App will supposedly write given data on a PDF

## Final Solution
PDF-lib worked perfectly with minor inconvenience. 

## PDF-Lib 
Pdf-lib is nearly perfect libirary but its getFiled 
functions are not picking up any fields from the given pdf
And that is because of different filed names, you can display
All the filed names form.getFieds().find/filter/map(x=>console.log(x.name))
And with those names you can start filling your fields
or you fill the form fields with there own names to make indentification easier.

~~~
 // fields which are checkboxes can be indentified when getTextField throws an error
    const checkboxes = [
      '276',
      'sex',
      'rel_to_ins' ,
      'ins_sex' ,
      'ins_benefir_plan' ,
      'lab' ,
      'assignment' ,
      'employement' , 
      'pt_auto_accident' ,
      'other_accident' ,
      'ssn' ,
      'insurance_type' ,
      'ins_benefit_plan' ,
      'employment'
    ]

    // Loop to fill the form with the names of its on fields 
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
~~~

## pdfform.js
pdfform is potentional solution which might pick up the fields
but it is not available on node package instullar or npm 
