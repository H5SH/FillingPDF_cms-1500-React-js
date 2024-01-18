export async function getPdfFormCigna(url){
    try{
        const response = await fetch('https://www.cigna.com/static/www-cigna-com/docs/form-cms1500.pdf')
        return await response.arrayBuffer()
    }catch(err){
        console.log(err)
        return {id: 0}
    }
}