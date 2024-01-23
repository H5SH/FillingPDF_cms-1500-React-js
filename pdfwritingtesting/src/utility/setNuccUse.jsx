export default function setNuccUse(form, nuccUse_b, nuccUse_c, nuccUse_8){
    nuccUse_b && form.getTextField('40').setText(nuccUse_b)
    nuccUse_c && form.getTextField('41').setText(nuccUse_c)
    nuccUse_8 && form.getTextField('NUCC USE').setText(nuccUse_8)
}