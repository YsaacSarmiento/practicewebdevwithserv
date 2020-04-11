const express = require('express')
const controller = require('./controller')

module.exports = (app) =>{
	app.use(express.static(__dirname + '/public'))
	app.use(express.static(__dirname + '/public/ApplicantHome'))
	app.use(express.static(__dirname + '/public/ApplicantRegister'))
	app.use(express.static(__dirname + '/public/CompanyRegister'))
	app.post("/home", controller.log_in)
	app.post("/applicant_register", controller.app_reg)
	app.post("/company_register", controller.comp_reg)
}
