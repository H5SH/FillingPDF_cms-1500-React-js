import { createPDFAcroFields } from "pdf-lib"

export default function checkCheckBox(form, fieldName, check){
    if(check.length > 0 ){
        if(fieldName === 'insurance_type'){
            // 1. TopOptions
            checkInsuranceType(createPDFAcroFields(form.getCheckBox('insurance_type').acroField.Kids()).map(_=>_[0]), check)
        }else if(fieldName.includes('sex')){
            // 3. PATIENT'S BIRTH DATE
            // a. INSURED'S DATE OF BIRTH
            checkGender(createPDFAcroFields(form.getCheckBox(fieldName).acroField.Kids()).map(_=>_[0]), check)
        }else if(fieldName === 'rel_to_ins'){
            // 6. PATIENT RELATIONSHIP TO INSURED
            checkPatientRelationshipToInsured(createPDFAcroFields(form.getCheckBox('rel_to_ins').acroField.Kids()).map(_=>_[0]), check)
        }else if(fieldName === 'ssn'){
            // 25. FEDERAL TAX I.D NUMBER
            checkSSNOrEIN(createPDFAcroFields(form.getCheckBox('ssn').acroField.Kids()).map(_=>_[0]), check)   
        }else{
            // 10. IS PATIENT'S CONDITION RELATED TO
            // b. AUTO ACCIDENT?
            // c. OTHER ACCIDENT?
            // a. EMPLOYEMENT?
            // 20.OUTSIDELAB?
            // 27. ACCEPT ASSIGNMENT
            // d.IS THERE ANOTHER HEALTH BENEFIT PLAN?
            checkYesOrNo(createPDFAcroFields(form.getCheckBox(fieldName).acroField.Kids()).map(_=>_[0]), check)
        }
        
    }


}

function checkInsuranceType(boxes, check){

    if(check.length > 0){
        boxes[0].setPartialName('medicare')
        boxes[1].setPartialName('medicaid')
        boxes[2].setPartialName('tricare')
        boxes[3].setPartialName('champva')
        boxes[4].setPartialName('grouphealthplan')
        boxes[5].setPartialName('fecablklung')
        boxes[6].setPartialName('other')

        boxes.find((box) => {
            // works even if user have added spaces
            if(box.getPartialName() === check.toLowerCase().replace(/\s/g, '')){
                box.setValue(box.getOnValue())
                return
            }
        })
    }
    
}

function checkGender(boxes, check){

    if(check.length > 0){
        boxes[0].setPartialName("M")
        boxes[1].setPartialName("F")

        boxes.find((box)=>{
            // also works with single character Input m or f 
            if(box.getPartialName() === check[0].toUpperCase()){
                box.setValue(box.getOnValue())
                return
            }
        })
    }
    
}

function checkPatientRelationshipToInsured(boxes, check){
    if(check.length > 0){
        boxes[0].setPartialName("self")
        boxes[1].setPartialName("spouse")
        boxes[2].setPartialName("child")
        boxes[3].setPartialName("other")

        boxes.find((box)=>{
            if(box.getPartialName() === check.toLowerCase()){
                box.setValue(box.getOnValue())
                return
            }
        })
    }
}

function checkYesOrNo(boxes, check){
    if(check.length > 0){
        boxes[0].setPartialName('yes')
        boxes[1].setPartialName('no')
        boxes.find((box)=>{
            // works with single character inputs like y or n in respected of case
            if(box.getPartialName().includes(check[0].toLowerCase())){
                box.setValue(box.getOnValue())
                return
            }
        })
    }
}

function checkSSNOrEIN(boxes, check){
    if(check.length > 0){
        boxes[0].setPartialName('ssn')
        boxes[1].setPartialName('ein')
        boxes.find((box)=>{
            if(box.getPartialName() === check.toLowerCase()){
                box.setValue(box.getOnValue())
                return
            }
        })
    }
}