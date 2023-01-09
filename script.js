const inputs = Array.from(document.querySelectorAll('input'));
const submitFormBtn = document.querySelector('button[id = "submit"]');
const defaultCountry = 'France';

inputs.push(document.querySelector('select'));

const countryZipCodePattern = {
    France : /([0-9][0-9])[^96|97|98|99|00][0-9]{3}/,
    Canada : /[A-Z][1-9][A-Z]-[1-9][A-Z][1-9]/
}

const countryZipCodeExample = {
    France : '69003',
    Canada : 'G3J-1E8'
}

const inputsErrorMessages = {
    firstName : 'Please enter your first name',
    lastName : 'Please enter your last name',
    email : 'Your email must be valid end with .com or .fr',
    country : 'Select your country',
    zipCode : `Zip code example ${countryZipCodeExample[defaultCountry]}`,
    password : 'Your password must contain at least 8 characters and one special character',
    passwordConfirmation : 'does not match your inital password'
}

const area = (() => {
    const zipCodeInput = document.querySelector('#zipCode');
    const countryInput = document.querySelector('#country');
    const inputs = [zipCodeInput, countryInput];
    const country = () => document.querySelector('#country').value;
    const isZipCodeCorrectWithCountry = () => countryZipCodePattern[country()].test(zipCodeInput.value);
    const alertZipCodeInvalid = () => {
        zipCodeInput.classList.toggle('invalid');
        zipCodeInput.setCustomValidity(inputsErrorMessages[zipCodeInput.id])
    }
    const updateCountryErrorMessage = () => {
        inputsErrorMessages['zipCode'] = `Zip code example ${countryZipCodeExample[countryInput.value]}`;
        zipCodeInput.placeholder = (inputsErrorMessages['zipCode']);
    }

    return {
        isZipCodeCorrectWithCountry,
        alertZipCodeInvalid,
        updateCountryErrorMessage,
        inputs
    }
})()

const password = (() => {
    const mainPassword = document.querySelector('#password');
    const passwordConfirmation = document.querySelector('#passwordConfirmation');
    const inputs = [mainPassword, passwordConfirmation];
    const isPasswordConfirmationCorrect = () => mainPassword.value === passwordConfirmation.value;
    const alertConfirmationPasswordIsInvalid = () => {
        passwordConfirmation.classList.toggle('invalid');
        passwordConfirmation.setCustomValidity(inputsErrorMessages[passwordConfirmation.id])
    }

    return {
        inputs,
        isPasswordConfirmationCorrect,
        alertConfirmationPasswordIsInvalid
    }
})()

function isInputRelatedToPassword(input) {
    return input.id === 'password'|| input.id === 'passwordConfirmation';
}

function alertInputIsValid(input) {
    input.style.border = '1px solid green';
    input.setCustomValidity('');
}

function alertInputIsInvalid(input) {        
    input.style.border = '1px solid red';
    input.setCustomValidity(inputsErrorMessages[input.id]);
    input.reportValidity();
    input.placeholder = inputsErrorMessages[input.id];
}

function isInputRelatedToZipCode(input) {
    return input.id === 'country' || input.id === 'zipCode';
}

function isInputInvalid(input) {
        return input.validity.valueMissing || input.validity.typeMismatch || input.validity.patternMismatch;
}

inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (isInputRelatedToZipCode(input)) {
            if (area.isZipCodeCorrectWithCountry()) {
                area.inputs.forEach(input => {
                    alertInputIsValid(input)
                })
            }
            else {
                area.updateCountryErrorMessage();
                area.alertZipCodeInvalid();
            }
        }
        else if (isInputRelatedToPassword(input)) {
            if (password.isPasswordConfirmationCorrect()) {                
                password.inputs.forEach(input => {
                    alertInputIsValid(input)
                })
            }
            else {
                password.alertConfirmationPasswordIsInvalid()
            }
        }
        else if (isInputInvalid(input)) {
            alertInputIsInvalid(input);
        }
        else {
            alertInputIsValid(input);
        }
    })
})

submitFormBtn.addEventListener('click', () => {
    inputs.forEach(input => {
            if (isInputInvalid(input)) {
                alertInputIsInvalid(input);
            }
    })
})


