import {Document, Page, pdfjs} from 'react-pdf'
import { useEffect, useState } from 'react';
import { getPdfFormCigna, getPdfFromLocal } from './__request/getPdf';
// import { saveAs } from 'file-saver'
import { StyleSheet } from '@react-pdf/renderer'
import { fillFieldWithThereName } from './utility/utility';
import { fillFormUsingVariables } from './utility/fillFromUsingVariables';
import PdfFile from './form-cms1500.pdf'


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
    // const file = new Blob([PdfFile], {type: 'application/pdf'})
    const PdfBytes = await getPdfFromLocal()
    // console.log(PdfBytes)
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
    

    // fields which are checkboxes can be indentified when getTextField throws an error
    // const checkboxes = [
    //   '276',
    //   'sex',
    //   'rel_to_ins' ,
    //   'ins_sex' ,
    //   'lab' ,
    //   'assignment' ,
    //   'pt_auto_accident' ,
    //   'other_accident' ,
    //   'ssn' ,
    //   'insurance_type' ,
    //   'ins_benefit_plan' ,
    //   'employment'
    // ]

    const buttons = ["Clear Form"]

    // TWO FUNCTION CALLS
    setPdf(await fillFieldWithThereName(PdfBytes, buttons, 'emplo'))
    // setPdf(await fillFormUsingVariables(PdfBytes))


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
    <div style={{textAlign: 'center', marginTop: "1%"}}>
    <object data={pdf}
     type="application/pdf"
     style={{width: '60%', height: '750px'}}>
     </object>
      {/* <Document file={pdf} style={styles.section}>
        {console.log(PdfFile)}
      <a href={pdf} download={'Filled-cms-1500.pdf'} target='C:/H5SH/Work/FillingPDF_cms-1500-React-js'>DownLoad</a>
        <Page size={'A4'} pageNumber={1} style={styles.page}/>
      </Document> */}
      
      </div>
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
