const express = require('express')
const fs = require('fs');
app = express()
const path = require('path')

exports.log_in = (req,res) => {
	//replace this with mariadb select
	//if applicant:
	let userContents = fs.readFileSync("./applicant.txt", 'utf8');
	let splitUserContents = userContents.split("\n");
	let usersArray;
	let same;

	
	for(let i = 0; i < splitUserContents.length; i++){
		same = true;
		//splits the splitUserContents[i] per ','
		usersArray = splitUserContents[i].split(",");

		//if the username and the current username in the file has same length
		if(req.body.userName.length == usersArray[0].length){
			for(let j = 0; j < usersArray.length; j++){
				//if they are not the same per character, breaks the loop and same = false
				if(usersArray[0].charAt(j) != req.body.userName.charAt(j)){
					same = false;
					break;
				}
			}
		}else same = false; //if not same length
		
		if(same){
			if(req.body.passWord.length == usersArray[1].length){
				for(let j = 0; j < usersArray.length; j++){
					//if they are not the same per character, breaks the loop and same = false
					if(usersArray[1].charAt(j) != req.body.passWord.charAt(j)){
						same = false;
						break;
					}
				}
			}else same = false; 
		}

		if(same){
			res.sendFile(path.join(__dirname + '/public/ApplicantHome/applicant_home.html'))
		}
	}

	
	//if company:
	//res.sendFile(path.join(__dirname + '/public/____.html'))
}
exports.app_reg = (req,res) => {
	//create new applicant in db
	//use req.body. + 'name' of input
	try{
		fs.appendFileSync("applicant.txt",req.body.username+","+ req.body.pw+ "\n");
		res.sendFile(path.join(__dirname + '/public/index.html'))
		console.log("Updated the applicant.txt!");
	}catch(err){
		console.log(err);
	}
}


exports.comp_reg = (req,res) => {
	try{
		fs.appendFileSync("company.txt",req.body.username+","+ req.body.pw+ "\n");
		res.sendFile(path.join(__dirname + '/public/index.html'))
		console.log("Updated the company.txt!");
	}catch(err){
		console.log(err);
	}

	//create new company in db
}