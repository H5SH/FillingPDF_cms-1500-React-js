import { setDate } from "./setDates"
import checkCheckBox from "./checkChildBoxes"


export function setPatientData(form, name, street, city, state, zipCode, areaCode, phoneNo, signature, signedDate, accountNo, birthDate, gender){
    if(name.length > 0){
        const arrayOfData = [name, street, city, state.slice(0, 3), zipCode, areaCode, phoneNo, signature, signedDate, accountNo]
        const arrayOfFields = ['pt_name', 'pt_street', 'pt_city', 'pt_state', 'pt_zip', 'pt_AreaCode', 'pt_phone', 'pt_signature', 'pt_date', 'pt_account']
        arrayOfFields.map((field, index)=>{
            arrayOfData[index] && form.getTextField(field).setText(arrayOfData[index])
        })
        birthDate && setDate(form, 'birth', '12/12/2004')
        gender && checkCheckBox(form, 'sex', gender)
    }
}

export function setInsuredData(form, name, otherPolicy, signed, otherName, idNumber, address, city, zipCode, state, areaCode, phoneNo, policy, dateOfBirth, gender){
    if(name.length > 0){
        const arrayOfData = [name, otherPolicy, signed, otherName, idNumber, address, city, zipCode, state.slice(0, 3), areaCode, phoneNo, policy]
        const arrayOfFields = ['ins_name', 'other_ins_policy', 'ins_signature', 'other_ins_name', 'insurance_id', 'ins_street', 'ins_city', 'ins_zip', 'ins_state', 'ins_phone area', 'ins_phone', 'ins_policy']
        arrayOfData.map((data, index)=>{
            data && form.getTextField(arrayOfFields[index]).setText(data)
        })
        dateOfBirth && setDate(form, 'ins_dob', "12/12/2004")
        gender && checkCheckBox(form, 'ins_sex', gender)
    }  
}

export function setIsPatientConditionRelated(form, employment, autoAccident, otherAccident, placeState){
    otherAccident && checkCheckBox(form, 'other_accident', otherAccident)
    autoAccident && checkCheckBox(form, 'pt_auto_accident', autoAccident)
    employment && checkCheckBox(form, 'employment', employment)
    placeState && form.getTextField('accident_place').setText(placeState.slice(0, 3))
}