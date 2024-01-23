export default function setInsuranceHeaders(form, name, address, address2, cityStateZip){
    form.getTextField('insurance_name').setText(name)
    // Second field
    form.getTextField('insurance_address').setText(address)
    // Third field
    form.getTextField("insurance_address2").setText(address2)
    // Forth field
    form.getTextField('insurance_city_state_zip').setText(cityStateZip)

}