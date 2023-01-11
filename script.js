const inputs = Array.from(document.querySelectorAll('input'));
const submitFormBtn = document.querySelector('button[id = "submit"]');
const defaultCountry = 'France';

inputs.push(document.querySelector('select'));

const countryZipCodePattern = {
    France : /^(0[1-9]|(?!99|98|97|96)[1-9][0-9])[0-9]{3}$/,
    Canada : /^[A-Z][1-9][A-Z]-[1-9][A-Z][1-9]$/
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
    const country = () => document.querySelector('#country').value;
    const isZipCodeCorrectWithCountry = () => countryZipCodePattern[country()].test(zipCodeInput.value);
    const updateCountryErrorMessage = () => {
        inputsErrorMessages['zipCode'] = `Zip code example ${countryZipCodeExample[countryInput.value]}`;
        zipCodeInput.placeholder = (inputsErrorMessages['zipCode']);
    }
    const manageAreaData = () => {
        if (isZipCodeCorrectWithCountry()) {
            alertInputIsValid(zipCodeInput)
        }
        else {
            updateCountryErrorMessage();
            alertInputIsInvalid(zipCodeInput);
        }
    }
    return {
        manageAreaData
    }
})()

const password = (() => {
    const mainPassword = document.querySelector('#password');
    const passwordConfirmation = document.querySelector('#passwordConfirmation');
    const inputs = [mainPassword, passwordConfirmation];
    const isPasswordConfirmationCorrect = () => mainPassword.value === passwordConfirmation.value;
    const manageMainPasswordData = () => {
        if (isInputInvalid(mainPassword)) {
            alertInputIsInvalid(mainPassword)
        }
        else {
            alertInputIsValid(mainPassword);
            isPasswordConfirmationCorrect() ? alertInputIsValid(passwordConfirmation) : alertInputIsInvalid(passwordConfirmation)
        } 
    }
    const manageConfirmationPasswordData = () => {
        if (isPasswordConfirmationCorrect()) {                
            alertInputIsValid(passwordConfirmation);
        }
        else {
            alertInputIsInvalid(passwordConfirmation);
        }
    }
    const managePasswordData = (input) => {
        if (input === mainPassword) {
            manageMainPasswordData();
        }
        else {
            manageConfirmationPasswordData()
        }
    }
    return {
        managePasswordData
    }
})()

function alertInputIsValid(input) {
    input.style.border = '1px solid green';
    input.setCustomValidity('');
}

function isInputInvalid(input) {
    return input.validity.valueMissing || input.validity.typeMismatch || input.validity.patternMismatch;
}

function alertInputIsInvalid(input) {        
    input.style.border = '1px solid red';
    input.setCustomValidity(inputsErrorMessages[input.id]);
    input.reportValidity();
    input.placeholder = inputsErrorMessages[input.id];
}

function isInputRelatedToArea(input) {
    return input.id === 'country' || input.id === 'zipCode';
}

function isInputRelatedToPassword(input) {
    return input.id === 'password'|| input.id === 'passwordConfirmation';
}

inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (isInputRelatedToArea(input)) {
            area.manageAreaData();
        }
        else if (isInputRelatedToPassword(input)) {
            password.managePasswordData(input)
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


