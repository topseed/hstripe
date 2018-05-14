
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
	.use(express.static(path.join(__dirname, 'www')))
	.set('views', path.join(__dirname, 'www'))

	.get('/', (req, res) => res.render('www/index'))
	.listen(PORT, () => console.log(`Listening on ${ PORT }`))