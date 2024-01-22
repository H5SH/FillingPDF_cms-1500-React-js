

export function checkInsuranceType(boxes, check){
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