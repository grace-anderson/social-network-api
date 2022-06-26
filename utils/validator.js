function validateEmail(input) {
    const validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return validation.test(input);
}

module.exports = {
    validateEmail,
}