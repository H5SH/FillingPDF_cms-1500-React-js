import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import { useState } from 'react';

const styles = StyleSheet.create({
    page:{
        felxDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
})

function MyDocument(){

    
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }){
    setNumPages(pageNumber);
  }
    return (
        // <Document>
        //     <Page size={'A4'} style={styles.page}>
        //         <View style={styles.section}>
        //             <Text>Section #1</Text>
        //         </View>
        //         <View style={styles.section}>
        //             <Text>Section #2</Text>
        //         </View>
        //     </Page>
        // </Document>
        <Document file='https://www.cigna.com/static/www-cigna-com/docs/form-cms1500.pdf'
        onLoadSuccess={onDocumentLoadSuccess}>
          <Page size={'A4'} pageNumber={numPages} wrap>

          </Page>
        </Document>
    )
}

export default MyDocument