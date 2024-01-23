import { PDFDocument, createPDFAcroFields } from "pdf-lib"
import { urlforPDF } from "./utility"
import checkCheckBox from "./checkChildBoxes"
import { setDate, setFromAndToDate } from "./setDates"
import { 
    setDiagnosisNature, 
    setSupplierInfo, 
    setServiceFacilityLocation, 
    setBillingProviderInfo 
} from "./physicianOrSupplierInfo"
import { setInsuredData, setPatientData } from "./setPatientAndInsuredData"
import setInsuranceHeaders from "./setInsuranceHeaders"
import setNuccUse from "./setNuccUse"

export async function fillFormUsingVariables(fileBytes){

    const pdfDoc = await PDFDocument.load(fileBytes)
   
    const form = pdfDoc.getForm()
    form.updateFieldAppearances()

    // CheckBoxes FieldNames
    const checkboxFields = {
        insurance_type: 'insurance_type',
        patientsGender: 'sex',
        patientsRelationshipToInsured: 'rel_to_ins',
        employement: 'employment',
        autoAccident: 'pt_auto_accident',
        otherAccident: 'other_accident',
        insuredGender: 'ins_sex',
        anotherHealthBenefit: 'ins_benefit_plan',
        outsideLab: 'lab',
        federalTaxIDNumber: 'ssn',
        acceptAssignment: 'assignment'
    }

    // Dates FieldNames
    const datesFields = {
        dateOfCurrentIllness: 'cur_ill',
        otherDate: 'sim_ill',
        datesPatientUnableToWorkFromAndTo: 'work',
        hospitalDatesFromAndTo: 'hosp',
        dateOfServiceFromAndTo1: 'sv1',
        dateOfServiceFromAndTo2: 'sv2',
        dateOfServiceFromAndTo3: 'sv3',
        dateOfServiceFromAndTo4: 'sv4',
        dateOfServiceFromAndTo5: 'sv5',
        dateOfServiceFromAndTo6: 'sv6'
    }
    // VARIABLES TO FILL DATA

    // MAIN TITLES (NO TAGS)
    setInsuranceHeaders(form, "MainTitle", "Lahore Wapda Town", "SomeWhere In Sialkot", "Lahore Pakistan 57720")

    // PATIENT'S DATA 
    setPatientData(form, "Hasham", "12", 'Lahore', 'PAK', 57720, +92, 333444489, '', '12/12/2004',23444444, "No Plan", "12-12-2004" )

    // INSURED DATA
    setInsuredData(form, 'Ali', "no Other Policy", '', 'Non', 122, 'Wapda', 'Lahore', 54470, 'Pakistan', +92, 333444489, 'Policy','PlanNameC', 'PlanNameD', '12/12/2004' )

    // NUCC USE
    setNuccUse(form, 'nuccUseB', 'nuccUseC', 'nuccUse_8')
    // 10. IS PATIENT'S CONDITION RELATED TO
    const placeState_10 = form.getTextField("accident_place")
    
    // b. OTHER CLAIM ID (Designated by NUCC)
    // left field 
    const otherClaimId_b_left = form.getTextField('57')
    // right field  
    const otherClaimId_b_right = form.getTextField('58')
    
    // 10d. CLAIM CODES (Designated by NUCC)
    const claimCodes_10d = form.getTextField('50')
    
    // 14. DATE OF CURRENT ILLNESS, INJURY, or PREGNANCY (LMP)
    // right most
    const dateOfCurrentIllnessQual_14 = form.getTextField('73')
    // DATES
    setDate(form, datesFields.dateOfCurrentIllness, '12-12-2004')
    
    // 15. OTHER DATE
    // QUAL
    const otherDateQual_15 = form.getTextField('74')
    // DaATES
    setDate(form, datesFields.otherDate, "12/12/2004")
    
    // 16. DATES PATIENT UNABLE TO WORK IN CURRENT OCCUPATION
    // From
    setFromAndToDate(form, datesFields.datesPatientUnableToWorkFromAndTo, "12/12/2004", "12-12-2004")
    
    // 17.NAME OF REFERRING PROVIDER OR OTHER SOURCE
    // left field
    const nameOfReferringProvider_17_left = form.getTextField('85')
    // right
    const nameOfReferringProvider_17_right = form.getTextField('ref_physician')
    
    // 17a
    const a_17_left = form.getTextField("physician number 17a1")
    const a_17_right = form.getTextField('physician number 17a')
    
    // 17b
    const npi_17b = form.getTextField('id_physician')
    
    // 18. HOSPITALIZATION DATES ReLATED TO CURRENT SERVICES
    // From
    setFromAndToDate(form, datesFields.hospitalDatesFromAndTo, '12/12/2004', '12-12-2004')
    
    // 19. ADDITIONAL CLAIM INFORMATION (Designated by NUCC)
    const additionalClaimInformation_19 = form.getTextField('96')
    
    
    // $ CHARGES
    const charges_$20 = form.getTextField('charge')
    
    // 21. DIAGNOSIS OR NATURE OF ILLNESS OR INJURY
    setDiagnosisNature(form, [ "diagnosis" , "diagnosis", "diagnosis", "diagnosis"
,"diagnosis","diagnosis","diagnosis","diagnosis","diagnosis","diagnosis","diagnosis","diagnosis"], '22')
    
    // 22. RESUBMISSION CODE
    const resubmissionCode_22 = form.getTextField('medicaid_resub')
    
    // ORGINAL REF NO
    const orginalRefNo = form.getTextField('original_ref')

    // 23. PRIOR AUTHORIZATION NUMBER
    const priorAuthorizationNumber = form.getTextField('prior_auth')
    
    // 24. A. DATE(S) OF SERVICE
    // 1
    setSupplierInfo(form, "Supplier1", "12-12-2004", "12/12/2004", "UOL", "EMG", 'CPT', ['modifier1', 'modifier2', 'modifier3', 'modifier4'], "diagnosisPointer", "20.0", "days", 'epsdt', 'plan', '120', ['renderingProvider1', 'renderingProvider2'], 1 )
    // 2
    setSupplierInfo(form, "2ndSupplier", "12-12-2004", '12/12/2004', 'CS', '' ,'cpt', ['modifier1', 'modifier2'], 'diagnosis', '2.00', 'units', '', 'PLAN', '12', ['rendering'], 2 )
    // 3
    setSupplierInfo(form, '3rdSupplier', '12/12/2004', '12-12-2004', '', '', '', [], '', '2000', 'units', '', '', '12', [], 3)
    // 4 
    setSupplierInfo(form, '4thSupplier', '12/12/2004', '12-12-2004', '', 'emg', 'cpt', ['modifier'], 'ptPointer', '20.0', '', 'epsdt', 'plan', 12, ['rendering'], 4)

    // 25. FEDERAL TAX I.D NUMBER
    const federalTax_25 = form.getTextField('tax_id')
    
    // 26. PATIENT'S ACCOUNT NO
    const patientAccountNo_26 = form.getTextField('pt_account')
    
    
    // 28.TOTAL CHARGE
    const checkBoxtotalCharge_28 = form.getCheckBox('276')
    const totalCharge_28 = form.getTextField('t_charge')
    
    // 29. AMOUNT PAID
    const amountPaid_29 = form.getTextField('amt_paid')
    
    // 31. SIGNATURE OF PHYSICIAN OR SUPPLIER
    const physicianSignature = form.getTextField('physician_signature')
    const physicianDate = form.getTextField('physician_date')
    
    // 32. SERVICE FACILITY LOCATION INFORMATION
    setServiceFacilityLocation(form, "Hasham Asad", '13', 'Wapda Town Phase 1', "a", 'b' )
    
    // 33. BILLING PROVIDER INFO & PH#
    setBillingProviderInfo(form, 'ALI', '13', "SomeWhere In Lahore", "+92", '333444489', 'a', 'b')
    
    // Button
    const clearForm = form.getButton('Clear Form')

    checkCheckBox(form, checkboxFields.insurance_type, 'group health plan')
    checkCheckBox(form, checkboxFields.patientsGender, 'm')
    checkCheckBox(form, checkboxFields.patientsRelationshipToInsured, 'other')
    checkCheckBox(form, checkboxFields.employement, 'y')
    checkCheckBox(form, checkboxFields.autoAccident, 'n')
    checkCheckBox(form, checkboxFields.otherAccident, 'y')
    placeState_10.setText("PAK")
    claimCodes_10d.setText("002,003,004")
    otherClaimId_b_left.setText("23")
    otherClaimId_b_right.setText("no other claim ID so far")
    checkCheckBox(form, checkboxFields.insuredGender, 'm')
    checkCheckBox(form, checkboxFields.anotherHealthBenefit, 'n')
    dateOfCurrentIllnessQual_14.setText("QUAL 1")
    otherDateQual_15.setText("QUAL 2")
    nameOfReferringProvider_17_left.setText("01")
    nameOfReferringProvider_17_right.setText("Muaz Asim")
    a_17_left.setText("00")
    a_17_right.setText("Physician Bilaal")
    npi_17b.setText("I don't know what to right")
    
    additionalClaimInformation_19.setText("No Additional Claims")
    checkCheckBox(form, checkboxFields.outsideLab, 'y')
    charges_$20.setText("20.0")
    resubmissionCode_22.setText("00200")
    orginalRefNo.setText("44444")
    priorAuthorizationNumber.setText("00900")
    
    federalTax_25.setText("#221133")
    checkCheckBox(form, checkboxFields.federalTaxIDNumber, 'ein')
    patientAccountNo_26.setText("003357678930")
    checkCheckBox(form, checkboxFields.acceptAssignment, 'y')

    totalCharge_28.setText("2300")
    checkBoxtotalCharge_28.check()

    amountPaid_29.setText("2300")
    physicianDate.setText("12-02-2024")

    form.flatten()
    return await urlforPDF(pdfDoc)
}
