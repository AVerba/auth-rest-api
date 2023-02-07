const phoneRegex =
    /^((\\+[1-9]{1,4}[ \\-]*)|[(\+\(\))]|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

module.exports = {
    phoneRegex,
    emailRegex
}