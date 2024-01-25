export async function getPdfFormCigna(){
    try{
        const response = await fetch('https://www.cigna.com/static/www-cigna-com/docs/form-cms1500.pdf')
        return await response.arrayBuffer()
    }catch(err){
        console.log(err)
        return {id: 0}
    }
}


export async function getPdfFromLocal(){
    try{
        const response = await fetch('/static/media/form-cms1500.23529aaddc8eef3a598b.pdf')
        return await response.arrayBuffer()
    }catch(err){
        console.log(err)
        return {id: 0}
    }
}