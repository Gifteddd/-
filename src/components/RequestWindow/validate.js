export function checkINN(inn) {
    const error = {};

    inn = String(inn);

    if (!inn.length) {
        return { result: false, error: { code: 1, message: 'ИНН пуст' } };
    }

    if (!/^\d+$/.test(inn)) {
        return { result: false, error: { code: 2, message: 'ИНН может состоять только из цифр' } };
    }

    if (![10, 12].includes(inn.length)) {
        return { result: false, error: { code: 3, message: 'ИНН может состоять только из 10 или 12 цифр' } };
    }

    const checkDigit = (coefficients) => {
        const sum = coefficients.reduce((acc, coef, i) => acc + coef * parseInt(inn[i]), 0);
        return parseInt(sum % 11 % 10);
    };

    const validateControlDigits = (coefficients, controlIndex) => checkDigit(coefficients) === parseInt(inn[controlIndex]);

    const isValid = inn.length === 10
        ? validateControlDigits([2, 4, 10, 3, 5, 9, 4, 6, 8], 9)
        : validateControlDigits([7, 2, 4, 10, 3, 5, 9, 4, 6, 8], 10) && validateControlDigits([3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8], 11);

    if (isValid) {
        return { result: true };
    }

    return { result: false, error: { code: 4, message: 'Неправильное контрольное число' } };
}