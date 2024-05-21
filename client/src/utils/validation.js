import { ERROR_MESSAGE } from "../constant/message"
import { REGEX } from "../constant/regex"

export const formValidation = (formData, errorMessage, key) => {
    if (key == 'login') {
        if (formData?.email?.length === 0) {
            errorMessage.email = ERROR_MESSAGE?.EMAIL_ERROR
        }
        if (formData?.password?.length === 0 || !formData.password) {
            errorMessage.password = ERROR_MESSAGE?.PASSWORD_ERROR
        }
    }
    if (key == 'forgotpassword') {
        if (formData?.email?.length === 0) {
            errorMessage.email = ERROR_MESSAGE?.EMAIL_ERROR
        }
        if (formData?.newPassword?.length === 0 || !formData.newPassword) {
            errorMessage.newPassword = ERROR_MESSAGE?.PASSWORD_ERROR
        }
        if (formData?.confirmPassword?.length === 0 || !formData.confirmPassword) {
            errorMessage.confirmPassword = ERROR_MESSAGE?.CONFIRM_PASSWORD_ERROR
        }
        if (formData?.dob?.length === 0) {
            errorMessage.dob = ERROR_MESSAGE?.DOB_ERROR
        }
    }
    if (key == 'register') {
        if (formData?.firstName?.length < 3 || !REGEX.NAME_REGEX.test(formData.name)) {
            errorMessage.firstName = ERROR_MESSAGE?.FIRST_NAME_ERROR
        }
        if (formData?.lastName?.length < 0 || !REGEX.NAME_REGEX.test(formData.name)) {
            errorMessage.lastName = ERROR_MESSAGE?.LAST_NAME_ERROR
        }
        if (formData?.email?.length === 0) {
            errorMessage.email = ERROR_MESSAGE?.EMAIL_ERROR
        }
        if (!REGEX.EMAIL_REGEX.test(formData.email)) {
            errorMessage.email = ERROR_MESSAGE?.EMAIL_INVALID_ERROR
        }
        if (formData?.country?.length === 0 || !formData.country) {
            errorMessage.country = ERROR_MESSAGE?.COUNTRY_ERROR
        }
        if (formData?.state?.length === 0 || !formData.state) {
            errorMessage.state = ERROR_MESSAGE?.STATE_ERROR
        }
        if (formData?.city?.length === 0 || !formData.city) {
            errorMessage.city = ERROR_MESSAGE?.CITY_ERROR
        }
        if (formData?.zip?.length === 0 || !formData.zip) {
            errorMessage.zip = ERROR_MESSAGE?.ZIP_ERROR
        }
        if (formData?.password?.length === 0 || !formData.password) {
            errorMessage.password = ERROR_MESSAGE?.PASSWORD_ERROR
        }
        if (formData?.areaOfInterest?.length === 0 || !formData.areaOfInterest) {
            errorMessage.areaOfInterest = ERROR_MESSAGE?.AREA_OF_INTEREST_ERROR
        }
        if (formData?.dob?.length === 0) {
            errorMessage.dob = ERROR_MESSAGE?.DOB_ERROR
        }
        if (!formData?.gender || Object.keys(formData.gender).length === 0) {
            errorMessage.gender = ERROR_MESSAGE.GENDER_ERROR
        }
    }

}