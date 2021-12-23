const express = require('express');
const { models } = require('mongoose');
const router = express.Router();

const stripe = require("stripe")("sk_test_51K9D6UA32Adg2XeIHSgKlwhQv8iuS235SFa3utAxVVdyj6NSHN1O9Feh2mZXnaMd3Z3YTFrIjwTCI9AWwdYEclG200bdSXDFyd");
const { v4: uuid } = require("uuid");

router.post("/payment", (req, res) => {
    const { product, token } = req.body;
    const idempontencyKey = uuid()
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        console.log(customer);
        console.log(" ");
        stripe.charges.create({
            amount: (product.price * 100).toFixed(0),
            currency: 'egp',
            customer: customer.id,
            receipt_email: token.email,
            description: product.name
        })
            .then(result => res.status(200).json(result))
            .catch(err => { console.log(err); res.sendStatus(err.statusCode) })
    }).catch(err => { console.log(err); res.sendStatus(err.statusCode) })
});



router.post("/refund", (req, res) => {
    const { amount, chargeId } = req.body;
    const idempontencyKey = uuid()
    let payload;
    if (amount) {
        payload = {
            charge: chargeId,
            amount: (100 * amount).toFixed(0),
        }
    } else {
        payload = {
            charge: chargeId,
        }
    }
    return stripe.refunds.create(payload).then(result => res.status(200).json(result))
        .catch(err => { console.log(err); res.sendStatus(err.statusCode) })
});

router.post("/retrieve", (req, res) => {
    const { chargeId } = req.body;
    const idempontencyKey = uuid()
    return stripe.charges.retrieve(chargeId).then(result => res.status(200).json(result))
        .catch(err => { console.log(err); res.sendStatus(err.statusCode) })
});




module.exports = router;