const express = require('express')
const router = require('./router')
const bp = require('body-parser')
const app = express()
app.use(bp.json())
app.use(bp.urlencoded({extended: false}))
//routes
router(app)

app.listen(3000, ()=>{
	console.log('Server started at port 3000')
})