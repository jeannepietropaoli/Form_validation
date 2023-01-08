const inputs = Array.from(document.querySelectorAll('input'));
const submitFormBtn = document.querySelector('button[id = "submit"]');
const zipCodeInput = document.querySelector('#zipCode');
const countryInput = document.querySelector('#country');
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

const location = () => {
    const country = () => document.querySelector('#country').value;
}

function identifyTheCountry() {
    return document.querySelector('#country').value;
}

function checkIfZipCodeCorrectWithCountry() {
    let country = identifyTheCountry();
    return countryZipCodePattern[country].test(zipCodeInput.value)
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

function verifyZipCode() {
    if (countryInput.value) {
        return checkIfZipCodeCorrectWithCountry();
    }
    else {
        return false;
    }
}

function alertZipCodeInvalid() {
        zipCodeInput.classList.toggle('invalid');
        zipCodeInput.setCustomValidity(inputsErrorMessages[zipCodeInput.id])
}

function isInputInvalid(input) {
        return input.validity.valueMissing || input.validity.typeMismatch || input.validity.patternMismatch;
}

function updateCountryErrorMessage() {
    inputsErrorMessages['zipCode'] = `Zip code example ${countryZipCodeExample[countryInput.value]}`;
    zipCodeInput.placeholder = (inputsErrorMessages['zipCode']);
}

inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (isInputRelatedToZipCode(input)) {
            updateCountryErrorMessage();
            if (verifyZipCode()) {
                alertInputIsValid(input);
            }
            else {
                alertZipCodeInvalid();
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


