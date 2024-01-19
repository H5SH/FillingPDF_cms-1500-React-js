import {Document, Page, pdfjs} from 'react-pdf'
import { useEffect, useState } from 'react';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { getPdfFormCigna } from './__request/getPdf';
import { saveAs } from 'file-saver'
import { StyleSheet } from '@react-pdf/renderer'
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


// To display the pdf on Browser
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const styles = StyleSheet.create({
  page: {backgroundColor: 'tomato'},
  section: {color: 'white', textAlign: 'center', margin: 30, height: 40}
})


function App() {

  const [pdf, setPdf] = useState('')
  const [response, setResponse] = useState('')

  async function WriteOnPdf(){
    const PdfBytes = await getPdfFormCigna()
    // var PdfBytes = new File([""], "form-cms1500.pdf")
    // console.log(PdfBytes)

    // const Pdf = require('./form-cms1500.pdf')
    // const PdfBytes = new ArrayBuffer(Pdf.readFile())
    // console.log(PdfBytes)

    try{
    // const out_buf = pdfform.transform(PdfBytes, {
    //   'CITY': "Lahore",
    //   'STATE': "Pakistan"
    // })
    const pdfDoc = await PDFDocument.load(PdfBytes)
   
    const form = pdfDoc.getForm()
    form.updateFieldAppearances()

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

    // to fill the form with the names of its on fields 
    form.getFields().find(x=>{
      const field = form.getFieldMaybe(x.getName())
      if(field){
        try{
          if(checkboxes.includes(x.getName())){
            form.getCheckBox(x.getName()).check()
          }else if(x.getName() === "Clear Form"){
            form.getButton(x.getName())
          }else{
            const length = form.getTextField(x.getName()).getMaxLength()
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
      }
    })

    // // Main Title of the Insurance no visible field
    // const mainTitle = form.getTextField('insurance_name')
    // mainTitle.setText('insurance_name')

    // // 8. RESERVED FOR NUCC USE 
    // const reserverdForNuccUse_8 = form.getTextField('NUCC USE')
    // reserverdForNuccUse_8.setText('NUCC USE')

    // // b. RESERVED FOR NUCC USE
    // const reserverdForNuccUse_b = form.getTextField('40')
    // reserverdForNuccUse_b.setText('40')

    // // c. RESERVED FOR NUCC USE
    // const reserverdForNuccUse_c = form.getTextField('41')
    // reserverdForNuccUse_c.setText('41')

    // // 10d. CLAIM CODES (Designated by NUCC)
    // const claimCodes_10d = form.getTextField('50')
    // claimCodes_10d.setText('50')

    // // fields under b. OTHER CLAIM ID (Designated by NUCC)
    // // left field 
    // const otherClaimId_b_left = form.getTextField('57')
    // otherClaimId_b_left.setText('57')
    // // right field  
    // const otherClaimId_b_right = form.getTextField('58')
    // otherClaimId_b_right.setText('58')

    // // fields under 14. DATE OF CURRENT ILLNESS, INJURY, or PReGNANCY (LMP)
    // // right most
    // const dateOfCurrentIllness_14 = form.getTextField('73')
    // dateOfCurrentIllness_14.setText('73')

    // // fields under 15. OTHER DATE
    // // QUAL
    // const otherDate_15_qual = form.getTextField('74')
    // otherDate_15_qual.setText('74')
    
    // // fields under 17.NAME OF REFERRING PROVIDER OR OTHER SOURCE
    // // left field
    // const nameOfReferringProvider_17_left = form.getTextField('85')
    // nameOfReferringProvider_17_left.setText('85')  

    // // 19. ADDITIONAL CLAIM INFORMATION (Designated by NUCC)
    // const additionalClaimInformation_19 = form.getTextField('96')
    // additionalClaimInformation_19.setText("96")

    // // fields under 21. DIAGNOSIS OR NATURE OF ILLNESS OR INJURY Relate A-L to service line below ()
    // // ICD_Ind
    // const icd_ind =  form.getTextField('99icd')
    // icd_ind.setText('99icd')

    // form.getTextField('135').setText('135')
    // form.getTextField('157').setText('157')
    // form.getTextField('179').setText('179')
    // form.getTextField('201').setText('201')
    // form.getTextField('223').setText('223')
    // form.getTextField('245').setText('245')

    // // 28.TOTAL CHARGE
    // const totalCharge_28 = form.getCheckBox('276')
    // totalCharge_28.check()

    // // Button
    // form.getButton('Clear Form')


    

    // // CITY
    // const city = form.getTextField("pt_city")
    // city.setText("Lahore")

    // // fields under 16. DATES PATIENT UNABLE TO WORK IN CURRENT OCCUPATION
    // form.getTextField('work_yy_from').setText('22')
    
    

    // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica) 

    // const pages = pdfDoc.getPages()
    // const firstPage = pages[0]
    // const {width, height} = firstPage.getSize()

    // firstPage.drawText("Hasham Asad",{
    //   x: 40,
    //   y: 654,
    //   size:10,
    //   font: helveticaFont,
    //   color: rgb(0, 0, 0),
    //   rotate: degrees(0)
    // })

    // firstPage.drawText("House no 49 BLock G4",{
    //   x: 40,
    //   y: 630,
    //   size: 10,
    // })

    // const count = 0
    const pdfBytes = await pdfDoc.save()
    const file = new Blob([pdfBytes], {type:'applocation/pdf'})
    setPdf(URL.createObjectURL(file))
    // to save the file
    //saveAs(pdf, `Filled-cms-1500.pdf`)
    // ReactPDF.render(file, `form-cms${count++}.pdf`)
  }catch(err){
    console.log(err)
    setResponse("Failed to Fetch PDF")
  }
  }

  useEffect(()=>{
    WriteOnPdf()
  },[])
  

  return (
    <div>
    {response ? <p>{response}</p>:
    <>
      <Document file={pdf} style={styles.section}>
      <a href={pdf} download={'Filled-cms-1500.pdf'} target='C:/H5SH/Work/FillingPDF_cms-1500-React-js'>DownLoad</a>
        <Page size={'A4'} pageNumber={1} style={styles.page}/>
      </Document>
      
      </>
}
      
       {/* <PDFViewer>
        <MyDocument />
       </PDFViewer> */}
       
        {/* <Page>
          <Html>{html}</Html>
        </Page>
        */}
       
    </div>
   
  );
}

export default App;
