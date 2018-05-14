
const express = require('express')
const path = require('path')
const yaml = require('js-yaml')
let keys = yaml.load(fs.readFileSync('keys.yaml'))
const PORT = 8443

const stripe = require('stripe')(keys.keySecret)

app.set('view engine', 'pug');
app.use(require('body-parser').urlencoded({extended: false}))

// ////////////////////////////////////////////////
let keyPublishable = keys.keyPublishable
app.get('/', (req, res) =>
  res.render('index.pug', {keyPublishable}))

app.post('/charge', (req, res) => {
  let amount = 500;

  stripe.customers.create({
	  email: req.body.stripeEmail,
	 source: req.body.stripeToken
  })
  .then(customer =>
	 stripe.charges.create({
		amount,
		description: 'Sample Charge',
			currency: 'usd',
			customer: customer.id
	 }))
  .then(charge => res.render('charge.pug'));
});

app.listen(PORT)

