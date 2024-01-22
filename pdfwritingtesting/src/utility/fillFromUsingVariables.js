import { PDFDocument, createPDFAcroFields } from "pdf-lib"
import { urlforPDF } from "./utility"
import { 
    checkInsuranceType, 
    checkPatientRelationshipToInsured, 
    checkGender,
    checkYesOrNo,
    checkSSNOrEIN
 } from "./checkChildBoxes"

export async function fillFormUsingVariables(fileBytes){

    const pdfDoc = await PDFDocument.load(fileBytes)
   
    const form = pdfDoc.getForm()
    form.updateFieldAppearances()
    // VARIABLES TO FILL DATA

    // MAIN TITLES (NO TAGS)
    // First title field
    const insuranceName = form.getTextField('insurance_name')
    // Second field
    const insuranceAddress = form.getTextField('insurance_address')
    // Third field
    const insuranceAddress2 = form.getTextField("insurance_address2")
    // Forth field
    const insuranceCityStateZip = form.getTextField('insurance_city_state_zip')

    // 1. TopOptions
    checkInsuranceType(createPDFAcroFields(form.getCheckBox('insurance_type').acroField.Kids()).map(_=>_[0]), '')
    
    // 2.PATIENT'S NAME 
    const patientName_2 = form.getTextField('pt_name')
    
    // 3. PATIENT'S BIRTH DATE
    const patientBDyy_3 = form.getTextField('birth_yy')
    const patientBDmm_3 = form.getTextField('birth_mm')
    const patientBDdd_3 = form.getTextField('birth_dd')
    checkGender(createPDFAcroFields(form.getCheckBox('sex').acroField.Kids()).map(_=>_[0]), '')

    // 4. INSURED'S NAME
    const insuredName_4 = form.getTextField('ins_name')
    
    // 5. PATIENT'S ADDRESS
    const patientAddress_5 = form.getTextField('pt_street')
    
    // CITY
    const patientCity = form.getTextField("pt_city")
    
    // ZIP CODE
    const patientZipCode = form.getTextField('pt_zip')
    
    // 9. OTHER INSURED'S NAME
    const otherInsuredName_9 = form.getTextField('other_ins_name')
    
    // a. OTHER INSURED'S POLICY OR GROUP NUMBER
    const otherInsuredPolicy_a = form.getTextField('other_ins_policy')
    
    
    // b. RESERVED FOR NUCC USE
    const reserverdForNuccUse_b = form.getTextField('40')
    
    // c. RESERVED FOR NUCC USE
    const reserverdForNuccUse_c = form.getTextField('41')
    
    // d. INSURANCE PLAN NAME OR PROGRAM NAME
    const insurancePlanName_d = form.getTextField('other_ins_plan_name')
    
    // SIGNED
    const signed = form.getTextField('pt_signature')
    
    // DATE
    const date = form.getTextField("pt_date")
    
    
    // 1 a. INSURED'S I.D NUMBER
    const insuredIdNUmber_1a = form.getTextField('insurance_id')
    // 6. PATIENT RELATIONSHIP TO INSURED
    checkPatientRelationshipToInsured(createPDFAcroFields(form.getCheckBox('rel_to_ins').acroField.Kids()).map(_=>_[0]), '')
    // 7. INSURED'S ADDRESS
    const insuredAddress = form.getTextField('ins_street') 
    // CITY under Insured tags
    const insuredCity = form.getTextField('ins_city')
    // ZIP CODE
    const insuredZipCode = form.getTextField('ins_zip')
    // STATE
    const insuredState = form.getTextField('ins_state')
    // TELEPHONE (Include Area Code)
    const insuredTelephoneCountryCode = form.getTextField('ins_phone area')
    const insuredTelephoneNumber = form.getTextField('ins_phone')
    
    // 10. IS PATIENT'S CONDITION RELATED TO
    // a. EMPLOYEMENT?
    checkYesOrNo(createPDFAcroFields(form.getCheckBox('employment').acroField.Kids()).map(_=>_[0]), '')
    // b. AUTO ACCIDENT?
    checkYesOrNo(createPDFAcroFields(form.getCheckBox('pt_auto_accident').acroField.Kids()).map(_=>_[0]), '')
    // c. OTHER ACCIDENT?
    checkYesOrNo(createPDFAcroFields(form.getCheckBox('other_accident').acroField.Kids()).map(_=>_[0]), '')
    
    // 11.INSURED'S POLICY GROUP OR FECA NUMBER
    const insuredPolicy_11 = form.getTextField('ins_policy')
    // a. INSURED'S DATE OF BIRTH
    const insuredBDmm = form.getTextField('ins_dob_mm')
    const insuredBDdd = form.getTextField('ins_dob_dd')
    const insuredBDyy = form.getTextField('ins_dob_yy')
    checkGender(createPDFAcroFields(form.getCheckBox('ins_sex').acroField.Kids()).map(_=>_[0]), '')
    
    // b. OTHER CLAIM ID (Designated by NUCC)
    // left field 
    const otherClaimId_b_left = form.getTextField('57')
    // right field  
    const otherClaimId_b_right = form.getTextField('58')
    
    // c. INSURANCE PLAN NAME OR PROGRAM NAME
    const insurancePlanName_c = form.getTextField('ins_plan_name')
    // d.IS THERE ANOTHER HEALTH BENEFIT PLAN?
    checkYesOrNo(createPDFAcroFields(form.getCheckBox('ins_benefit_plan').acroField.Kids()).map(_=>_[0]), '')
    
    // 8. RESERVED FOR NUCC USE 
    const reserverdForNuccUse_8 = form.getTextField('NUCC USE')
    
    // 10d. CLAIM CODES (Designated by NUCC)
    const claimCodes_10d = form.getTextField('50')
    
    // 14. DATE OF CURRENT ILLNESS, INJURY, or PREGNANCY (LMP)
    // right most
    const dateOfCurrentIllnessQual_14 = form.getTextField('73')
    // DATES
    const dateOfCurrentIllnessMM_14 = form.getTextField('cur_ill_mm')
    const dateOfCurrentIllnessDD_14 = form.getTextField('cur_ill_dd')
    const dateOfCurrentIllnessYY_14 = form.getTextField('cur_ill_yy')
    
    // 15. OTHER DATE
    // QUAL
    const otherDateQual_15 = form.getTextField('74')
    // DaATES
    const otherDateMM_15 = form.getTextField('sim_ill_mm')
    const otherDateDD_15 = form.getTextField('sim_ill_dd')
    const otherDateYY_15 = form.getTextField('sim_ill_yy')

    // 16. DATES PATIENT UNABLE TO WORK IN CURRENT OCCUPATION
    // From
    const datesPatientUnableToWorkFromYY_16 = form.getTextField('work_yy_from')
    const datesPatientUnableToWorkFromDD_16 = form.getTextField('work_dd_from')
    const datesPatientUnableToWorkFromMM_16 = form.getTextField('work_mm_from')
    // To
    const datesPatientUnableToWorkToYY_16 = form.getTextField('work_yy_end')
    const datesPatientUnableToWorkToDD_16 = form.getTextField('work_dd_end')
    const datesPatientUnableToWorkToMM_16 = form.getTextField('work_mm_end')

    // 17.NAME OF REFERRING PROVIDER OR OTHER SOURCE
    // left field
    const nameOfReferringProvider_17_left = form.getTextField('85')
    // right
    const nameOfReferringProvider_17_right = form.getTextField('ref_physician')
    
    // 17a
    const num_17a1 = form.getTextField("physician number 17a1")
    const physicianNumber_17a = form.getTextField('physician number 17a')

    // 17b
    const npi_17b = form.getTextField('id_physician')

    // 18. HOSPITALIZATION DATES ReLATED TO CURRENT SERVICES
    // From
    const hospitalDatesFromYY_18 = form.getTextField('hosp_yy_from')
    const hospitalDatesFromDD_18 = form.getTextField('hosp_dd_from')
    const hospitalDatesFromMM_18 = form.getTextField('hosp_mm_from')
    // To
    const hospitalDatesToYY_18 = form.getTextField('hosp_yy_end')
    const hospitalDatesToDD_18 = form.getTextField('hosp_dd_end')
    const hospitalDatesToMM_18 = form.getTextField('hosp_mm_end')

    
    // 19. ADDITIONAL CLAIM INFORMATION (Designated by NUCC)
    const additionalClaimInformation_19 = form.getTextField('96')


    // 20.OUTSIDELAB?
    checkYesOrNo(createPDFAcroFields(form.getCheckBox('lab').acroField.Kids()).map(_=>_[0]), '')
    // $ CHARGES
    const charges_$20 = form.getTextField('charge')

    // 21. DIAGNOSIS OR NATURE OF ILLNESS OR INJURY
    const diagnosesNatureA_21 = form.getTextField('diagnosis1')
    const diagnosesNatureB_21 = form.getTextField('diagnosis2')
    const diagnosesNatureC_21 = form.getTextField('diagnosis3')
    const diagnosesNatureD_21 = form.getTextField('diagnosis4')
    const diagnosesNatureE_21 = form.getTextField('diagnosis5')
    const diagnosesNatureF_21 = form.getTextField('diagnosis6')
    const diagnosesNatureG_21 = form.getTextField('diagnosis7')
    const diagnosesNatureH_21 = form.getTextField('diagnosis8')
    const diagnosesNatureI_21 = form.getTextField('diagnosis9')
    const diagnosesNatureJ_21 = form.getTextField('diagnosis10')
    const diagnosesNatureK_21 = form.getTextField('diagnosis11')
    const diagnosesNatureL_21 = form.getTextField('diagnosis12')
    // ICD_Ind
    const icd_ind =  form.getTextField('99icd')

    // 22. RESUBMISSION CODE
    const resubmissionCode_22 = form.getTextField('medicaid_resub')

    // ORGINAL REF NO
    const orginalRefNo = form.getTextField('original_ref')

    // 23. PRIOR AUTHORIZATION NUMBER
    const priorAuthorizationNumber = form.getTextField('prior_auth')

    // 24. A. DATE(S) OF SERVICE
    // 1
    // FROM
    const dateOfService1 = form.getTextField('Suppl')
    const dateOfService1FromMM = form.getTextField('sv1_mm_from')
    const dateOfService1FromDD = form.getTextField('sv1_dd_from')
    const dateOfService1FromYY = form.getTextField('sv1_yy_from')
    // To
    const dateOfService1ToMM = form.getTextField('sv1_mm_end')
    const dateOfService1ToDD = form.getTextField('sv1_dd_end')
    const dateOfService1ToYY = form.getTextField('sv1_yy_end')

    // 2
    // From
    const dateOfService2 = form.getTextField('Suppla')
    const dateOfService2FromMM = form.getTextField('sv2_mm_from')
    const dateOfService2FromDD = form.getTextField('sv2_dd_from')
    const dateOfService2FromYY = form.getTextField('sv2_yy_from')
    // To
    const dateOfService2ToMM = form.getTextField('sv2_mm_end')
    const dateOfService2ToDD = form.getTextField('sv2_dd_end')
    const dateOfService2ToYY = form.getTextField('sv2_yy_end')

    // 3
    // From
    const dateOfService3 = form.getTextField('Supplb')
    const dateOfService3FromMM = form.getTextField('sv3_mm_from')
    const dateOfService3FromDD = form.getTextField('sv3_dd_from')
    const dateOfService3FromYY = form.getTextField('sv3_yy_from')
    // To
    const dateOfService3ToMM = form.getTextField('sv3_mm_end')
    const dateOfService3ToDD = form.getTextField('sv3_dd_end')
    const dateOfService3ToYY = form.getTextField('sv3_yy_end')

    // 4
    // From
    const dateOfService4 = form.getTextField('Supplc')
    const dateOfService4FromMM = form.getTextField('sv4_mm_from')
    const dateOfService4FromDD = form.getTextField('sv4_dd_from')
    const dateOfService4FromYY = form.getTextField('sv4_yy_from')
    // To
    const dateOfService4ToMM = form.getTextField('sv4_mm_end')
    const dateOfService4ToDD = form.getTextField('sv4_dd_end')
    const dateOfService4ToYY = form.getTextField('sv4_yy_end')

    // 5
    // From
    const dateOfService5 = form.getTextField('Suppld')
    const dateOfService5FromMM = form.getTextField('sv5_mm_from')
    const dateOfService5FromDD = form.getTextField('sv5_dd_from')
    const dateOfService5FromYY = form.getTextField('sv5_yy_from')
    // To
    const dateOfService5ToMM = form.getTextField('sv5_mm_end')
    const dateOfService5ToDD = form.getTextField('sv5_dd_end')
    const dateOfService5ToYY = form.getTextField('sv5_yy_end')

    // 6
    // From
    const dateOfService6 = form.getTextField('Supple')
    const dateOfService6FromMM = form.getTextField('sv6_mm_from')
    const dateOfService6FromDD = form.getTextField('sv6_dd_from')
    const dateOfService6FromYY = form.getTextField('sv6_yy_from')
    // To
    const dateOfService6ToMM = form.getTextField('sv6_mm_end')
    const dateOfService6ToDD = form.getTextField('sv6_dd_end')
    const dateOfService6ToYY = form.getTextField('sv6_yy_end')

    // B. PLACE OF SERVICE
    const placeOfService1 = form.getTextField('place1')
    const placeOfService2 = form.getTextField('place2')
    const placeOfService3 = form.getTextField('place3')
    const placeOfService4 = form.getTextField('place4')
    const placeOfService5 = form.getTextField('place5')
    const placeOfService6 = form.getTextField('place6')

    // C. EMG
    const emg1 = form.getTextField('type1')
    const emg2 = form.getTextField('type2')
    const emg3 = form.getTextField('type3')
    const emg4 = form.getTextField('type4')
    const emg5 = form.getTextField('type5')
    const emg6 = form.getTextField('type6')
    
    // D. PROCEDURES, SERVICES, OR SUPPLIES
    // CPT/HCPCS
    const cpt1 = form.getTextField('cpt1')
    const cpt2 = form.getTextField('cpt2')
    const cpt3 = form.getTextField('cpt3')
    const cpt4 = form.getTextField('cpt4')
    const cpt5 = form.getTextField('cpt5')
    const cpt6 = form.getTextField('cpt6')

    // MODIFIER
    // colum 1
    const modifier1 = form.getTextField('mod1')
    const modifier2 = form.getTextField('mod2')
    const modifier3 = form.getTextField('mod3')
    const modifier4 = form.getTextField('mod4')
    const modifier5 = form.getTextField('mod5')
    const modifier6 = form.getTextField('mod6')

    // colum 2
    const modifier1a = form.getTextField('mod1a')
    const modifier2a = form.getTextField('mod2a')
    const modifier3a = form.getTextField('mod3a')
    const modifier4a = form.getTextField('mod4a')
    const modifier5a = form.getTextField('mod5a')
    const modifier6a = form.getTextField('mod6a')

    // colum 3
    const modifier1b = form.getTextField('mod1b')
    const modifier2b = form.getTextField('mod2b')
    const modifier3b = form.getTextField('mod3b')
    const modifier4b = form.getTextField('mod4b')
    const modifier5b = form.getTextField('mod5b')
    const modifier6b = form.getTextField('mod6b')

    // colum 4
    const modifier1c = form.getTextField('mod1c')
    const modifier2c = form.getTextField('mod2c')
    const modifier3c = form.getTextField('mod3c')
    const modifier4c = form.getTextField('mod4c')
    const modifier5c = form.getTextField('mod5c')
    const modifier6c = form.getTextField('mod6c')

    // E. DIAGNOSIS POINTER
    const diagnosis1 = form.getTextField('diag1')
    const diagnosis2 = form.getTextField('diag2')
    const diagnosis3 = form.getTextField('diag3')
    const diagnosis4 = form.getTextField('diag4')
    const diagnosis5 = form.getTextField('diag5')
    const diagnosis6 = form.getTextField('diag6')

    // F. $CHARGES
    const charges1 = form.getTextField('ch1')
    const charges2 = form.getTextField('ch2')
    const charges3 = form.getTextField('ch3')
    const charges4 = form.getTextField('ch4')
    const charges5 = form.getTextField('ch5')
    const charges6 = form.getTextField('ch6')

    // G. DAYS OR UNITS
    const dayOrUnits1 = form.getTextField('day1')
    const dayOrUnits2 = form.getTextField('day2')
    const dayOrUnits3 = form.getTextField('day3')
    const dayOrUnits4 = form.getTextField('day4')
    const dayOrUnits5 = form.getTextField('day5')
    const dayOrUnits6 = form.getTextField('day6')

    // H. EPSD T Familty Plan
    const epsdFamilyPlan1 = form.getTextField('epsdt1')
    const epsdFamilyPlan2 = form.getTextField('epsdt2')
    const epsdFamilyPlan3 = form.getTextField('epsdt3')
    const epsdFamilyPlan4 = form.getTextField('epsdt4')
    const epsdFamilyPlan5 = form.getTextField('epsdt5')
    const epsdFamilyPlan6 = form.getTextField('epsdt6')

    // I. ID QUAL
    const qualId1 = form.getTextField('emg1')
    const qualId2 = form.getTextField('emg2')
    const qualId3 = form.getTextField('emg3')
    const qualId4 = form.getTextField('emg4')
    const qualId5 = form.getTextField('emg5')
    const qualId6 = form.getTextField('emg6')

    // J. RENDERING PROVIDER ID. #
    const renderingProvider1 = form.getTextField('local1a')
    const renderingProvider2 = form.getTextField('local1')
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
    checkSSNOrEIN(createPDFAcroFields(form.getCheckBox('ssn').acroField.Kids()).map(_=>_[0]), '')

    // 26. PATIENT'S ACCOUNT NO
    const patientAccountNo = form.getTextField('pt_account')
    
    // 27. ACCEPT ASSIGNMENT
    checkYesOrNo(createPDFAcroFields(form.getCheckBox('assignment').acroField.Kids()).map(_=>_[0]),'')
    
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
    
    // insuranceName.setText('insurance_name')
    // insuranceAddress.setText('insurance_address')
    // insuranceAddress2.getText('insurance_address2')
    // insuranceCityStateZip.setText('insurance_city_state_zip')
    
    // patientName_2.setText('pt_name')
    // patientAddress_5.setText('pt_street')
    // patientCity.setText("pt_city")
    // patientZipCode.setText('zipCode')
    // otherInsuredName_9.setText('other_ins_name')
    // otherInsuredPolicy_a.setText('other_ins_policy')
    
    // reserverdForNuccUse_b.setText('40')
    // reserverdForNuccUse_c.setText('41')
    // insurancePlanName_d.setText('other_ins_plan_name')
    // signed.setText('pt_signature')
    // date.setText('pt_date')

    // patientBDyy_3.setText('2001')
    // patientBDmm_3.setText('07')
    // patientBDdd_3.setText('15')
    
    // reserverdForNuccUse_8.setText('NUCC USE')
    // claimCodes_10d.setText('50')
    // otherClaimId_b_left.setText('57')
    // otherClaimId_b_right.setText('58')
    // dateOfCurrentIllnessQual_14.setText('73')
    // otherDateQual_15.setText('74')

    // nameOfReferringProvider_17_left.setText('85')  
    // additionalClaimInformation_19.setText("96")
    // icd_ind.setText('99icd')

    form.flatten()
    return await urlforPDF(pdfDoc)
}
