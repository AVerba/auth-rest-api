const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const {SENDGRID_API_KEY} = process.env;
const {createError} = require('../helpers');

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
    try {
        const email = {...data, from: "vom.d@meta.ua"};
        await sgMail.send(email);
        return true;

    } catch (error) {
        throw createError(404, `${error.message}`);
    }
};

module.exports = sendMail;