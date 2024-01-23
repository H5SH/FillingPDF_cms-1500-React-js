import { PDFDocument, createPDFAcroFields } from "pdf-lib"
import { urlforPDF } from "./utility"
import checkCheckBox from "./checkChildBoxes"
import { setDate, setFromAndToDate } from "./setDates"
import { setDiagnosisNature, setSupplierInfo } from "./physicianOrSupplierInfo"

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
        patientBD: 'birth',
        insuredBD: 'ins_dob',
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
    // First title field
    const heading1InsuranceName = form.getTextField('insurance_name')
    // Second field
    const heading2InsuranceAddress = form.getTextField('insurance_address')
    // Third field
    const heading3InsuranceAddress2 = form.getTextField("insurance_address2")
    // Forth field
    const heading4InsuranceCityStateZip = form.getTextField('insurance_city_state_zip')

    
    // 2.PATIENT'S NAME 
    const patientName_2 = form.getTextField('pt_name')
    
    // 3. PATIENT'S BIRTH DATE
   setDate(form, datesFields.patientBD ,'12/12/2004')
    
    // 4. INSURED'S NAME
    const insuredName_4 = form.getTextField('ins_name')
    
    // 5. PATIENT'S ADDRESS
    const patientAddress_5 = form.getTextField('pt_street')
    
    // CITY
    const patientCity = form.getTextField("pt_city")

    // STATE
    const patientState = form.getTextField("pt_state")
    
    // ZIP CODE
    const patientZipCode = form.getTextField('pt_zip')
    //Patient Telephone number
    const patientTelephoneCountryCode = form.getTextField('pt_AreaCode')
    const patientTelephoneNumber = form.getTextField('pt_phone')
    
    // 9. OTHER INSURED'S NAME
    const otherInsuredName_9 = form.getTextField('other_ins_name')

    // 10. IS PATIENT'S CONDITION RELATED TO
    const placeState_10 = form.getTextField("accident_place")
    
    // a. OTHER INSURED'S POLICY OR GROUP NUMBER
    const otherInsuredPolicy_a = form.getTextField('other_ins_policy')
    
    
    // b. RESERVED FOR NUCC USE
    const reserverdForNuccUse_b = form.getTextField('40')
    
    // c. RESERVED FOR NUCC USE
    const reserverdForNuccUse_c = form.getTextField('41')
    
    // d. INSURANCE PLAN NAME OR PROGRAM NAME
    const insurancePlanName_d = form.getTextField('other_ins_plan_name')
    
    // 12. PATIENT'S OR AUTHORIZED PERSON'S SIGNATURE
    // SIGNED
    const patientSigned = form.getTextField('pt_signature')
    
    // DATE
    const patientSigneDate = form.getTextField("pt_date")

    // 13.INSURED OR AUTHRIED PERSON SIGNATURE
    const insuredSigned = form.getTextField("ins_signature")
    
    
    // 1 a. INSURED'S I.D NUMBER
    const insuredIdNumber_1a = form.getTextField('insurance_id')
    // 7. INSURED'S ADDRESS
    const insuredAddress_7 = form.getTextField('ins_street') 
    // CITY under Insured tags
    const insuredCity = form.getTextField('ins_city')
    // ZIP CODE
    const insuredZipCode = form.getTextField('ins_zip')
    // STATE
    const insuredState = form.getTextField('ins_state')
    // TELEPHONE (Include Area Code)
    const insuredTelephoneCountryCode = form.getTextField('ins_phone area')
    const insuredTelephoneNumber = form.getTextField('ins_phone')
    
    // 11.INSURED'S POLICY GROUP OR FECA NUMBER
    const insuredPolicy_11 = form.getTextField('ins_policy')
    // a. INSURED'S DATE OF BIRTH
    setDate(form, datesFields.insuredBD, '12-12-2004')
    
    // b. OTHER CLAIM ID (Designated by NUCC)
    // left field 
    const otherClaimId_b_left = form.getTextField('57')
    // right field  
    const otherClaimId_b_right = form.getTextField('58')
    
    // c. INSURANCE PLAN NAME OR PROGRAM NAME
    const insurancePlanName_c = form.getTextField('ins_plan_name')

    
    // 8. RESERVED FOR NUCC USE 
    const reserverdForNuccUse_8 = form.getTextField('NUCC USE')
    
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
    setSupplierInfo(form, "Supplier1", "12-12-2004", "12/12/2004", "UOL", "EMG", 'CPT', ['modifier1', 'modifier2', 'modifier3', 'modifier4'], "diagnosisPointer", "20.0", "days", 'epsdt', 'plan', '120', ['renderingProvider1', 'renderingProvider2'], 1 )
   
    // 2
    // From
    const dateOfService2 = form.getTextField('Suppla')
    setFromAndToDate(form, datesFields.dateOfServiceFromAndTo2, '12-12-2004', '12/12/2004')

    // 3
    // From
    const dateOfService3 = form.getTextField('Supplb')
    setFromAndToDate(form, datesFields.dateOfServiceFromAndTo3, '12-12-2004', '12/12/2004')
    // 4
    // From
    const dateOfService4 = form.getTextField('Supplc')
    setFromAndToDate(form, datesFields.dateOfServiceFromAndTo4, '12-12-2004', '12/12/2004')
    // 5
    // From
    const dateOfService5 = form.getTextField('Suppld')
    setFromAndToDate(form, datesFields.dateOfServiceFromAndTo5, '12-12-2004', '12/12/2004')
    // 6
    // From
    const dateOfService6 = form.getTextField('Supple')
    setFromAndToDate(form, datesFields.dateOfServiceFromAndTo6, '12-12-2004', '12/12/2004')
    
    // B. PLACE OF SERVICE
    // const placeOfService1 = form.getTextField('place1')
    const placeOfService2 = form.getTextField('place2')
    const placeOfService3 = form.getTextField('place3')
    const placeOfService4 = form.getTextField('place4')
    const placeOfService5 = form.getTextField('place5')
    const placeOfService6 = form.getTextField('place6')
    
    // C. EMG
    // const emg1 = form.getTextField('type1')
    const emg2 = form.getTextField('type2')
    const emg3 = form.getTextField('type3')
    const emg4 = form.getTextField('type4')
    const emg5 = form.getTextField('type5')
    const emg6 = form.getTextField('type6')
    
    // D. PROCEDURES, SERVICES, OR SUPPLIES
    // CPT/HCPCS
    // const cpt1 = form.getTextField('cpt1')
    const cpt2 = form.getTextField('cpt2')
    const cpt3 = form.getTextField('cpt3')
    const cpt4 = form.getTextField('cpt4')
    const cpt5 = form.getTextField('cpt5')
    const cpt6 = form.getTextField('cpt6')

    // MODIFIER
    // colum 1
    // const modifier1 = form.getTextField('mod1')
    const modifier2 = form.getTextField('mod2')
    const modifier3 = form.getTextField('mod3')
    const modifier4 = form.getTextField('mod4')
    const modifier5 = form.getTextField('mod5')
    const modifier6 = form.getTextField('mod6')
    
    // colum 2
    // const modifier1a = form.getTextField('mod1a')
    const modifier2a = form.getTextField('mod2a')
    const modifier3a = form.getTextField('mod3a')
    const modifier4a = form.getTextField('mod4a')
    const modifier5a = form.getTextField('mod5a')
    const modifier6a = form.getTextField('mod6a')

    // colum 3
    // const modifier1b = form.getTextField('mod1b')
    const modifier2b = form.getTextField('mod2b')
    const modifier3b = form.getTextField('mod3b')
    const modifier4b = form.getTextField('mod4b')
    const modifier5b = form.getTextField('mod5b')
    const modifier6b = form.getTextField('mod6b')

    // colum 4
    // const modifier1c = form.getTextField('mod1c')
    const modifier2c = form.getTextField('mod2c')
    const modifier3c = form.getTextField('mod3c')
    const modifier4c = form.getTextField('mod4c')
    const modifier5c = form.getTextField('mod5c')
    const modifier6c = form.getTextField('mod6c')
    
    // E. DIAGNOSIS POINTER
    // const diagnosis1 = form.getTextField('diag1')
    const diagnosis2 = form.getTextField('diag2')
    const diagnosis3 = form.getTextField('diag3')
    const diagnosis4 = form.getTextField('diag4')
    const diagnosis5 = form.getTextField('diag5')
    const diagnosis6 = form.getTextField('diag6')

    // F. $CHARGES
    // const charges1 = form.getTextField('ch1')
    const charges2 = form.getTextField('ch2')
    const charges3 = form.getTextField('ch3')
    const charges4 = form.getTextField('ch4')
    const charges5 = form.getTextField('ch5')
    const charges6 = form.getTextField('ch6')

    // G. DAYS OR UNITS
    // const dayOrUnits1 = form.getTextField('day1')
    const dayOrUnits2 = form.getTextField('day2')
    const dayOrUnits3 = form.getTextField('day3')
    const dayOrUnits4 = form.getTextField('day4')
    const dayOrUnits5 = form.getTextField('day5')
    const dayOrUnits6 = form.getTextField('day6')
    
    // H. EPSD T Familty Plan
    // const epsdFamilyPlan1 = form.getTextField('epsdt1')
    // const epsdFamilyPlan2 = form.getTextField('plan1')
    const epsdFamilyPlan3 = form.getTextField('epsdt2')
    const epsdFamilyPlan4 = form.getTextField('plan2')
    const epsdFamilyPlan5 = form.getTextField('epsdt3')
    const epsdFamilyPlan6 = form.getTextField('plan3')
    const epsdFamilyPlan7 = form.getTextField('epsdt4')
    const epsdFamilyPlan8 = form.getTextField('plan4')
    const epsdFamilyPlan9 = form.getTextField('epsdt5')
    const epsdFamilyPlan10 = form.getTextField('plan5')
    const epsdFamilyPlan11 = form.getTextField('epsdt6')
    const epsdFamilyPlan12 = form.getTextField('plan6')

    // I. ID QUAL
    // const qualId1 = form.getTextField('emg1')
    const qualId2 = form.getTextField('emg2')
    const qualId3 = form.getTextField('emg3')
    const qualId4 = form.getTextField('emg4')
    const qualId5 = form.getTextField('emg5')
    const qualId6 = form.getTextField('emg6')
    
    // J. RENDERING PROVIDER ID. #
    // const renderingProvider1 = form.getTextField('local1a')
    // const renderingProvider2 = form.getTextField('local1')
    const renderingProvider3 = form.getTextField('local2a')
    const renderingProvider4 = form.getTextField('local2')
    const renderingProvider5 = form.getTextField('local3a')
    const renderingProvider6 = form.getTextField('local3')
    const renderingProvider7 = form.getTextField('local4a')
    const renderingProvider8 = form.getTextField('local4')
    const renderingProvider9 = form.getTextField('local5a')
    const renderingProvider10 = form.getTextField('local5')
    const renderingProvider11 = form.getTextField('local6a')
    const renderingProvider12 = form.getTextField('local6')
    
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
    const serviceFacilityLocationName = form.getTextField('fac_name')
    const serviceFacilityLocationStreet = form.getTextField('fac_street')
    const serviceFacilityLocationLocation = form.getTextField('fac_location')
    // a
    const serviceFacilityLocation_a = form.getTextField('pin1')
    // b
    const serviceFacilityLocation_b = form.getTextField('grp1')
    
    // 33. BILLING PROVIDER INFO & PH#
    const billingProviderInfoName = form.getTextField('doc_name')
    const billingProviderInfoStreet = form.getTextField('doc_street')
    const billingProviderInfoLocation = form.getTextField('doc_location')
    const billingProviderInfoNumberCode = form.getTextField('doc_phone area')
    const billingProviderInfoNumber = form.getTextField('doc_phone')
    // a
    const billingProviderInfo_a = form.getTextField('pin')
    // b
    const billingProviderInfo_b = form.getTextField('grp')
    
    // Button
    const clearForm = form.getButton('Clear Form')

    heading1InsuranceName.setText("Heading 1 of insurance")
    heading2InsuranceAddress.setText("heading 2 of insurance")
    heading3InsuranceAddress2.setText("heading 3 of insurance")
    heading4InsuranceCityStateZip.setText("Lahore, Pakistan, 52770")

    checkCheckBox(form, checkboxFields.insurance_type, 'group health plan')
    patientName_2.setText("Hasham Asad")
    patientAddress_5.setText("Wapda Town PHase 1")
    patientCity.setText("Sialkot")
    patientState.setText("Pak")
    patientZipCode.setText("57720")
    patientTelephoneCountryCode.setText("+92")
    patientTelephoneNumber.setText("333444489")
    checkCheckBox(form, checkboxFields.patientsGender, 'm')
    insuredIdNumber_1a.setText("70120545")
    insuredName_4.setText("Ali Ahmed")
    insuredAddress_7.setText("SomeWhere in lahore")
    checkCheckBox(form, checkboxFields.patientsRelationshipToInsured, 'other')
    insuredCity.setText("Lahore")
    insuredState.setText("Pak")
    insuredZipCode.setText("57720")
    reserverdForNuccUse_8.setText('RESERVED FOR NUCK USE 1')
    insuredTelephoneCountryCode.setText("+92")
    insuredTelephoneNumber.setText("033334329")
    otherInsuredName_9.setText("No other isurance")
    otherInsuredPolicy_a.setText("No other policy")
    reserverdForNuccUse_b.setText("reserved for nucc use 2")
    reserverdForNuccUse_c.setText('reserved for nucc use 3')
    insurancePlanName_d.setText("First time filling with variables")
    checkCheckBox(form, checkboxFields.employement, 'y')
    checkCheckBox(form, checkboxFields.autoAccident, 'n')
    checkCheckBox(form, checkboxFields.otherAccident, 'y')
    placeState_10.setText("PAK")
    claimCodes_10d.setText("002,003,004")
    otherClaimId_b_left.setText("23")
    otherClaimId_b_right.setText("no other claim ID so far")
    checkCheckBox(form, checkboxFields.insuredGender, 'm')
    insurancePlanName_c.setText("no plan or program name")
    checkCheckBox(form, checkboxFields.anotherHealthBenefit, 'n')
    patientSigneDate.setText("23-01-2024")
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

    dateOfService2.setText("intership")
    placeOfService2.setText("uol")
    emg2.setText("emg??")
    cpt2.setText("cpt??")
    modifier2.setText("modifiers??")
    modifier2a.setText("modifierA")
    modifier2b.setText("modifierB")
    modifier2c.setText("modifierC")
    diagnosis2.setText("pt pointer")
    charges2.setText("2000")
    dayOrUnits2.setText("60")
    epsdFamilyPlan3.setText("NON1")
    epsdFamilyPlan4.setText("NON2")
    qualId2.setText("Q1")
    renderingProvider3.setText('rendering provider 1')
    renderingProvider4.setText("rendering provider 2")

    dateOfService3.setText("intership")
    placeOfService3.setText("uol")
    emg3.setText("emg??")
    cpt3.setText("cpt??")
    modifier3.setText("modifiers??")
    modifier3a.setText("modifierA")
    modifier3b.setText("modifierB")
    modifier3c.setText("modifierC")
    diagnosis3.setText("pt pointer")
    charges3.setText("2000")
    dayOrUnits3.setText("60")
    epsdFamilyPlan5.setText("NON1")
    epsdFamilyPlan6.setText("NON2")
    qualId3.setText("Q1")
    renderingProvider5.setText('rendering provider 1')
    renderingProvider6.setText("rendering provider 2")

    dateOfService4.setText("intership")
    placeOfService4.setText("uol")
    emg4.setText("emg??")
    cpt4.setText("cpt??")
    modifier4.setText("modifiers??")
    modifier4a.setText("modifierA")
    modifier4b.setText("modifierB")
    modifier4c.setText("modifierC")
    diagnosis4.setText("pt pointer")
    charges4.setText("2000")
    dayOrUnits4.setText("60")
    epsdFamilyPlan7.setText("NON1")
    epsdFamilyPlan8.setText("NON2")
    qualId4.setText("Q1")
    renderingProvider7.setText('rendering provider 1')
    renderingProvider8.setText("rendering provider 2")

    dateOfService5.setText("intership")
    placeOfService5.setText("uol")
    emg5.setText("emg??")
    cpt5.setText("cpt??")
    modifier5.setText("modifiers??")
    modifier5a.setText("modifierA")
    modifier5b.setText("modifierB")
    modifier5c.setText("modifierC")
    diagnosis5.setText("pt pointer")
    charges5.setText("2000")
    dayOrUnits5.setText("60")
    epsdFamilyPlan9.setText("NON1")
    epsdFamilyPlan10.setText("NON2")
    qualId5.setText("Q1")
    renderingProvider9.setText('rendering provider 1')
    renderingProvider10.setText("rendering provider 2")

    dateOfService6.setText("intership")
    placeOfService6.setText("uol")
    emg6.setText("emg??")
    cpt6.setText("cpt??")
    modifier6.setText("modifiers??")
    modifier6a.setText("modifierA")
    modifier6b.setText("modifierB")
    modifier6c.setText("modifierC")
    diagnosis6.setText("pt pointer")
    charges6.setText("2000")
    dayOrUnits6.setText("60")
    epsdFamilyPlan11.setText("NON1")
    epsdFamilyPlan12.setText("NON2")
    qualId6.setText("Q1")
    renderingProvider11.setText('rendering provider 1')
    renderingProvider12.setText("rendering provider 2")
    
    federalTax_25.setText("#221133")
    checkCheckBox(form, checkboxFields.federalTaxIDNumber, 'ein')
    patientAccountNo_26.setText("003357678930")
    checkCheckBox(form, checkboxFields.acceptAssignment, 'y')

    totalCharge_28.setText("2300")
    checkBoxtotalCharge_28.check()

    amountPaid_29.setText("2300")
    physicianDate.setText("12-02-2024")
    serviceFacilityLocationLocation.setText("SomeWhere in Pakistan")
    billingProviderInfoNumber.setText("333444489")
    billingProviderInfoNumberCode.setText("+92")
    serviceFacilityLocation_a.setText("in Lahore")
    serviceFacilityLocation_b.setText("022333789")
    billingProviderInfo_a.setText("almost done")
    billingProviderInfo_b.setText('DONE')


    form.flatten()
    return await urlforPDF(pdfDoc)
}
