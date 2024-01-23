import { setDate } from "./setDates"


export function setPatientData(form, name, street, city, state, zipCode, areaCode, phoneNo, signature, signedDate, accountNo, planName, birthDate){
    if(name.length > 0){
        form.getTextField('pt_name').setText(name)
        street !== undefined && form.getTextField('pt_street').setText(`${street}`)
        city !== undefined && form.getTextField('pt_city').setText(city)
        state !== undefined && form.getTextField('pt_state').setText(state.slice(0, 3))
        zipCode !== undefined && form.getTextField('pt_zip').setText(`${zipCode}`)
        areaCode !== undefined && form.getTextField('pt_AreaCode').setText(`${areaCode}`)
        phoneNo !== undefined && form.getTextField('pt_phone').setText(`${phoneNo}`)
        signature !== undefined && form.getTextField('pt_signature').setText(signature)
        signedDate !== undefined && form.getTextField('pt_date').setText(signedDate)
        accountNo !== undefined && form.getTextField('pt_account').setText(`${accountNo}`)
        birthDate && setDate(form, 'birth', '12/12/2004')
    }
}

export function setInsuredData(form, name, otherPolicy, signed, otherName, idNumber, address, city, zipCode, state, areaCode, phoneNo, policy, planName_c, planName_d, dateOfBirth){
    if(name.length > 0){
        form.getTextField('ins_name').setText(name)
        otherName && form.getTextField('other_ins_name').setText(otherName)
        otherPolicy && form.getTextField('other_ins_policy').setText(otherPolicy)
        signed && form.getTextField('ins_signature').setText(signed)
        idNumber && form.getTextField('insurance_id').setText(`${idNumber}`)
        address && form.getTextField('ins_street').setText(address)
        city && form.getTextField('ins_city').setText(city)
        zipCode && form.getTextField('ins_zip').setText(`${zipCode}`)
        state && form.getTextField('ins_state').setText(state.slice(0, 3))
        areaCode && form.getTextField('ins_phone area').setText(`${areaCode}`)
        phoneNo && form.getTextField('ins_phone').setText(`${phoneNo}`)
        policy && form.getTextField('ins_policy').setText(policy)
        planName_d && form.getTextField('ins_plan_name').setText(planName_d)
        planName_c && form.getTextField('other_ins_plan_name').setText(planName_c)
        dateOfBirth && setDate(form, 'ins_dob', "12/12/2004")
    }  
}