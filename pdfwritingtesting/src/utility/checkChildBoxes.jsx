

export function checkInsuranceType(boxes, check){

    if(check.length > 0){
        boxes[0].setPartialName('medicare')
        boxes[1].setPartialName('medicaid')
        boxes[2].setPartialName('tricare')
        boxes[3].setPartialName('champva')
        boxes[4].setPartialName('grouphealthplan')
        boxes[5].setPartialName('fecablklung')
        boxes[6].setPartialName('other')
        boxes.filter((box) => {
            if(box.getPartialName() === check.toLowerCase().replace(/\s/g, '')){
                box.setValue(box.getOnValue())
            }
        })
    }
    
}

export function checkGender(boxes, check){

    if(check.length > 0){
        boxes[0].setPartialName("M")
        boxes[1].setPartialName("F")

        boxes.filter((box)=>{
            if(box.getPartialName() === check[0].toUpperCase()){
                box.setValue(box.getOnValue())
            }
        })
    }
    
}

export function checkPatientRelationshipToInsured(boxes, check){
    if(check.length > 0){
        boxes[0].setPartialName("self")
        boxes[1].setPartialName("spouse")
        boxes[2].setPartialName("child")
        boxes[3].setPartialName("other")

        boxes.filter((box)=>{
            if(box.getPartialName() === check.toLowerCase()){
                box.setValue(box.getOnValue())
            }
        })
    }
}

export function checkYesOrNo(boxes, check){
    if(check.length > 0){
        boxes[0].setPartialName('yes')
        boxes[1].setPartialName('no')
        boxes.filter((box)=>{
            if(box.getPartialName().includes(check[0].toLowerCase())){
                box.setValue(box.getOnValue())
            }
        })
    }
}

export function checkSSNOrEIN(boxes, check){
    if(check.length > 0){
        boxes[0].setPartialName('ssn')
        boxes[1].setPartialName('ein')
        boxes.filter((box)=>{
            if(box.getPartialName() === check.toLowerCase()){
                box.setValue(box.getOnValue())
            }
        })
    }
}