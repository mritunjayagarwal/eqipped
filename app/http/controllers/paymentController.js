const Menu = require('../../models/order');
const express = require("express")


// const https = require("http")
// const qs = require("querystring")

const checksum_lib = require("../../../routes/Paytm/checksum")
const config = require("../../../routes/Paytm/config")
// const parseUrl = express.urlencoded({ extended: false });
// const parseJson = express.json({ extended: false });

function paymentController() {
    return {
        payment(req, res) {
            res.render('payment')
        }
    }
}

module.exports = paymentController