let applicant =
    {
        profile:{
            given_name : "Angelo",
            middle_name: "Limlengco",
            last_name : "Guan",
            username: "alguan",
            bday: "1999-11-25",
            age: 20,
            sex: "Male",
            status: "Single"
        },
        contact:{
            address: "Pagsanjan, Laguna",
            email: "alguan@up.edu.ph",
            number: "+6391702934"
        },
        education:{
           
        },
        college:[
            {
                college: "University of the Philippines Los Banos",
                degree: "BS Computer Science",
                year: 2022
            },
            {
                college: "University of the Philippines Los Banos",
                degree: "MS in IT",
                year: 2025
            }
        ],
        experience:[
            
        ]
        

}

let state = {
    // for switching tabs. onProfile up to onExperience refers to tabs in the Profile page.
    onProfile: true,
    onContact: false,
    onEducation: false,
    onCollege: false,
    onExperience: false,
    //edit refers when we're opening the edit card for editing information
    edit: false,
    //onEditProfile up to onEditExperience refers to tabs present in the edit card.
    onEditProfile: true,
    onEditContact: false,
    onEditEducation: false,
    onEditCollege: false,
    onEditExperience: false,
    //the last two items is the applicant (used to display data in the profile page)
    //editApplicant is used to reflect the changes when we're editing the profile.
    applicant: applicant,
    editApplicant: JSON.parse(JSON.stringify(applicant)) //deep copy applicant so we can modify it without reflecting changes to applicant
}

function onStateChange(applicant){
    
    if (!state.edit){   //we're not editing anything
        deleteDiv(".profile_card", ".profile_info") //remove the profile_info
        //create profile info depending on which tab is active
        if (state.onProfile){
            putProfile(applicant.profile)
        } else if (state.onContact){
            putContact(applicant.contact)
        } else if (state.onEducation){
            putEducation(applicant.education)
        } else if (state.onCollege) {
            putDegree(applicant.college)
        } else if (state.onExperience) {
            putExperience(applicant.experience)
        } 
    } else {    //we're editing
        deleteDiv(".edit_box", "#form_contents")   //delete the edit tab
        //create edit div where we put the appropiate data depending on the edit tab active
        if (state.onEditProfile){
            putEditorProfile(applicant.profile)
            manipulateAddBtn(false) // used for making the add button appear or disappear
        } else if (state.onEditContact){
            putEditorContact(applicant.contact)
            manipulateAddBtn(false)
        } else if (state.onEditEducation) {
            putEditorEducation(applicant.education)
            manipulateAddBtn(true)
        } else if (state.onEditCollege) {
            putEditorCollege(applicant.college)
            manipulateAddBtn(true) //this is true because in college and experience, we can add new fields
        } else if (state.onEditExperience){
            putEditorExperience(applicant.experience)
            manipulateAddBtn(true)
        }
    }
}

function createText(className, text, element){
    //parameters: className -> name of the class of the element
    //text -> value of the element (<h1>HELLO</h1>, HELLO as text)
    //element -> element we want to create (h1,p,h2,h3,...)

    let textElement = document.createElement(element) //create a specified element
    textElement.className = className      //add className 
    textElement.appendChild(document.createTextNode(text)) //add the text
    return textElement
}

function createDiv(className){
    //parameter: className -> name of the class
    let div = document.createElement("div") //create parent div
    div.className = className
    return div
}

function createEntryField(value_id, label, text){
    //parameters: value_id -> the id of the value of the field we want to display (id = "value" or #value) 
    //label -> label of the field we want to display (Given name)
    // text -> value that we want to display (Robert)
    //create an entry field (label and value ) for displaying user information
    let data_field = createDiv("data_field")  //create div called data_field
    data_field.appendChild(createText("label", label, "p")) //add a label
    data_field.appendChild(createText(value_id, text, "p")) //add the value

    // Given name (label)           Robert (value)
    return data_field
}

function createNumberSeparator(number){
    //parameter: number -> used to display the order of the complex attributes
    //create a number that will serve as a separator between the complex attributes (college and experience)
    let options_field = createDiv("number")
    options_field.appendChild(createText("complexAttributeNumber",number,"p"))
    //1
    //Degree .......
    //2
    //Degree .......
    return options_field
}

function putProfile(profile){
    //parameter: profile -> an object that contains the information related to profile(name, bday, sex, etc)
    //create the profile div used in the profile tab
    let parent_div = document.querySelector(".profile_card")    //get the parent div so we can append it the profile_div to this
    let profile_info = createDiv("profile_info") //div for profile

    //the different entry fields. append those fields in profile_info
    profile_info.appendChild(createEntryField("value", "Given name", profile.given_name))   
    profile_info.appendChild(createEntryField("value", "Middle name", profile.middle_name))
    profile_info.appendChild(createEntryField("value", "Last name", profile.last_name))
    profile_info.appendChild(createEntryField("value", "Username", profile.username))
    profile_info.appendChild(createEntryField("value", "Birthdate", profile.bday))
    profile_info.appendChild(createEntryField("value", "Age", profile.age))
    profile_info.appendChild(createEntryField("value", "Sex", profile.sex))
    profile_info.appendChild(createEntryField("value", "Civil status", profile.status))

    parent_div.appendChild(profile_info)    //append profile_info to parent_div so it appears
}

function putContact(contact){
    //parameter: contact -> object that contains contact info (email, number, address)
    //put contact information in contact tab
    let parent_div = document.querySelector(".profile_card") //get parent_div
    let profile_info = createDiv("profile_info") //create div

    //fields that we appended into profile_info
    profile_info.appendChild(createEntryField("value", "Address", contact.address))
    profile_info.appendChild(createEntryField("value", "Email address", contact.email))
    profile_info.appendChild(createEntryField("value", "Contact Number", contact.number))

    parent_div.appendChild(profile_info) //append profile_info to parent div
}

function putEducation(education){
    //parameter: education -> object that contains information about education (attainment, school)
    // same logic as putContact
    let parent_div = document.querySelector(".profile_card")
    let profile_info = createDiv("profile_info")
    profile_info.appendChild(createEntryField("value","Highest educational attainment", education.attainment))
    profile_info.appendChild(createEntryField("value","School attended", education.school))
    parent_div.appendChild(profile_info)
}

function putDegree(college){
    //parameter: college -> array of objects that contains information about college (degree, school, year)
    let parent_div = document.querySelector(".profile_card")
    let profile_info = createDiv("profile_info")
    //loop through the length of college, create a number then entry fields
    for (let i = 0; i < college.length; i++){
        profile_info.appendChild(createNumberSeparator(i+1))
        profile_info.appendChild(createEntryField("value","Degree finished", college[i].degree))
        profile_info.appendChild(createEntryField("value","School attended", college[i].college))
        profile_info.appendChild(createEntryField("value","Year graduated", college[i].year))
    }

    //1
    //degree
    //college
    //year

    parent_div.appendChild(profile_info)
}

function putExperience(experience){
    //parameter: experience -> array of objects that contains info about experience (position, company, years)
    let parent_div = document.querySelector(".profile_card")
    let profile_info = createDiv("profile_info")
    for (let i = 0; i < experience.length; i++){
        profile_info.appendChild(createNumberSeparator(i+1))
        profile_info.appendChild(createEntryField("value","Position held", experience[i].position))
        profile_info.appendChild(createEntryField("value","Company", experience[i].company))
        profile_info.appendChild(createEntryField("value","Years", experience[i].years))
    }
    parent_div.appendChild(profile_info)
}

function changeStateTab(edit,element, boolean){
    //change tabs depending on the textContent (i.e., <p>Text Content</p>) of the element
    //for BOTH profile tabs and edit tabs
    //parameter: element -> clicked element, element we want to manipulate
    //boolean -> change onProfile, etc..., to that boolean value

    if (!edit){
        switch (element.textContent){
            case "Profile":
                state.onProfile = boolean
                break;
            case "Contact Information":
                state.onContact = boolean
                break;
            case "Education" :
                state.onEducation = boolean
                break;
            case "College Degree":
                state.onCollege = boolean;
                break;
            case "Experience":
                state.onExperience = boolean
                break;
        }
    } else {
        switch (element.textContent){
            case "Profile":
                state.onEditProfile = boolean
                break;
            case "Contact Information":
                state.onEditContact = boolean
                break;
            case "Education" :
                state.onEditEducation = boolean
                break;
            case "College Degree":
                state.onEditCollege = boolean;
                break;
            case "Experience":
                state.onEditExperience = boolean
        }
    }

}

function changeTab(event){
    let active_tab = document.querySelector(".active_card") //find the active tab
    let inactive_tabs = document.querySelectorAll(".inactive_card") //find all inactive tabs
    if (event.target.className != active_tab.className){    //inactive tab, loop through it
        active_tab.className = "inactive_card"  //make active_tab inactive
        for (let i = 0; i < inactive_tabs.length; i++){ //find the event.target tab (it is an inactive_tab)
            if (event.target.textContent === inactive_tabs[i].textContent){     //same textContent
                inactive_tabs[i].className = "active_card"  //make it active
                changeStateTab(false ,inactive_tabs[i], true)   //not on edit mode, make the event.target tab true on state. to load the proper data
                break;
            }
        }
        changeStateTab(false, active_tab, false)    //change the active tab to false
    }
    onStateChange(state.applicant)      //we changed tabs, call onStateChange()

}

function createProfileOptions(applicant){
    let parent_div = document.querySelector(".profile_card")
    let card = document.querySelector(".card_options")
    if (card){
        parent_div.removeChild(card)
    }
    let card_options = createDiv("card_options")


    //create tabs in profile page that indicate the information they're displaying
    //i.e., the "Profile" tab only displays Name, Sex, Bday, Age, etc...
    if (applicant.profile){ //profile tab exists
        card_options.appendChild(createText("active_card", "Profile", "p"))
    }

    if (applicant.contact){   //contact info exists
        card_options.appendChild(createText("inactive_card", "Contact Information", "p"))
    }

    if (applicant.education.hasOwnProperty("attainment")){   //education info exists
        card_options.appendChild(createText("inactive_card", "Education", "p"))
    }

    if (applicant.college.length > 0){  //there are information in college
        card_options.appendChild(createText("inactive_card", "College Degree", "p"))
    }

    if (applicant.experience.length > 0){ //there are information in experience
        card_options.appendChild(createText("inactive_card", "Experience", "p"))
    }

    let children = card_options.children    //get all of the created tabs and attach an event listener to it
    for (let i = 0; i < children.length; i++){
        children[i].addEventListener("click", changeTab)    //if we click it, change the tab
    }

    parent_div.appendChild(card_options)

}

function modifyEditor(event){
    let edit_box = document.querySelector(".edit_modal")
    let editor = document.querySelector(".edit_box")
    if (!state.edit){   //we just opened the edit profile button
        state.edit = true   //make it so it'll appear
        edit_box.className = "edit_modal"
        editor.className = "edit_box editor_anim_open" //for animation purposes
        state.editApplicant = JSON.parse(JSON.stringify(state.applicant))         // refer to the applicant that was used to display data
    } else {
        state.edit = false //exit out of edit profile
        editor.className = "edit_box editor_anim_close" //for animation purposes
        setTimeout(()=>{ //wait for the animation to finish
            edit_box.className = "edit_modal close_editor" //to remove the edit profile
        },500)
        // createProfileOptions(applicant)
    }
    onStateChange(state.applicant)  //we changed the state, load appropriate information 
}

function manipulateAddBtn(appear){
    let add_btn = document.querySelector(".add_button")
    if (appear){        //make the add button appear on the upper right hand side of the edit tab
        add_btn.id = ""
    } else {            //make it disappear
        add_btn.id = "inactive_add_btn"
    }
}

function createEditorTabs(applicant){
    //tabs for edit tabs
    let parent_div = document.querySelector(".edit_box")
    let card_options = createDiv("edit_tabs")
    card_options.appendChild(createText("active_editor", "Profile", "p"))
    card_options.appendChild(createText("inactive_editor", "Contact Information", "p"))
    card_options.appendChild(createText("inactive_editor", "Education", "p"))
    card_options.appendChild(createText("inactive_editor", "College Degree", "p"))
    card_options.appendChild(createText("inactive_editor", "Experience", "p"))


    let children = card_options.children
    for (let i = 0; i < children.length; i++){
        children[i].addEventListener("click", changeEditorTabs)
    }

    parent_div.appendChild(card_options)
}

function changeEditorTabs(event){

    //same logic as changeProfileTab
    let active_editor = document.querySelector(".active_editor")
    let inactive_editors = document.querySelectorAll(".inactive_editor")
    if (event.target.className != active_editor.className){
        active_editor.className = "inactive_editor"
        for (let i = 0; i < inactive_editors.length; i++){
            if (event.target.textContent === inactive_editors[i].textContent){
                inactive_editors[i].className = "active_editor"
                changeStateTab(true,inactive_editors[i], true)
                break;
            }
        }
        changeStateTab(true,active_editor, false) 
    }
    onStateChange(state.editApplicant)
}

function deleteDiv(parentNode, childNode){
    //get the parent div, get the child then delete child if it exists.
    let parent = document.querySelector(parentNode)
    let child = document.querySelector(childNode)
    if (child){
        parent.removeChild(child)
    }
}

function createInputField(type, name, value){
    //type -> type of the input (text or password or date)
    //name -> name of the input
    //value -> the value inside the input
    //create input field
    let input = document.createElement("input")
    input.type = type
    input.name = name
    input.value = value

    input.addEventListener("change", changingFieldValues)   //add an event listener for change, 
    //so we can record the changes made during editing
    return input
}

function createInputLabel(labelText, id){
    let label  = document.createElement("label")
    //create label
    label.id = id
    label.appendChild(document.createTextNode(labelText))
    return label
}

function createSelection(name, options, selected){
    //create selection
    //name = name of the select element
    //options = options that we can choose from ("Elementary", "JHS", ...)
    //selected = value that was selected by the user
    let select = document.createElement("select")
    select.name = name
    for (let i = 0; i < options.length; i++){   //find selected value (i.e., the value selected by the user)
        let option = document.createElement("option")
        
        if (options[i]!== "Select your highest educational attainment"){   
            option.value = options[i]
        } else {  //default value, use this if our applicant wants to add a new education field
            option.value = ""
        }

        option.appendChild(document.createTextNode(options[i]))
        if (options[i] === selected){
            option.selected = "true"
        }
        select.appendChild(option)
    }

    select.addEventListener("change", changingFieldValues)
    return select
}

function createEraseButton(){
    let span = document.createElement("span")
    span.className = "material-icons delete_button"
    span.appendChild(document.createTextNode("delete"))
    span.addEventListener("click", deleteField)

    //create the erase button on complex attributes (college and experience)
    //so we can delete fields

    return span
}

function createEducationField(selected, school, educationOptions){
    let div = createDiv("complexDiv")
    div.appendChild(createEraseButton())
    div.appendChild(createSelection("education", educationOptions, selected))
    div.appendChild(createInputLabel("Highest educational attainment", "select_placeholder"))
    div.appendChild(createInputField("text", "current_school", school))
    div.appendChild(createInputLabel("Current school", "placeholder"))
    return div
}

function createCollegeDegreeFields(collegeInfo){
    //collegeInfo = object that contains information about college
    let complexDiv = createDiv("complexDiv")
    if (collegeInfo){   //it exists, so put the actual values
        complexDiv.appendChild(createEraseButton())
        complexDiv.appendChild(createInputField("text", "degree", collegeInfo.degree))
        complexDiv.appendChild(createInputLabel("Degree attained", "placeholder"))
        complexDiv.appendChild(createInputField("text", "grad_school", collegeInfo.college))
        complexDiv.appendChild(createInputLabel("School graduated from", "placeholder"))
        complexDiv.appendChild(createInputField("text", "grad_year", collegeInfo.year))
        complexDiv.appendChild(createInputLabel("Graduation year",  "placeholder"))
    } else {    //doesn't exists, use a "" as replacement to values
        complexDiv.appendChild(createEraseButton())
        complexDiv.appendChild(createInputField("text", "degree", ""))
        complexDiv.appendChild(createInputLabel("Degree attained", "placeholder"))
        complexDiv.appendChild(createInputField("text", "grad_school", ""))
        complexDiv.appendChild(createInputLabel("School graduated from", "placeholder"))
        complexDiv.appendChild(createInputField("text", "grad_year", ""))
        complexDiv.appendChild(createInputLabel("Graduation year",  "placeholder"))
    }
    return complexDiv
}

function createExperienceFields(experienceInfo){
    //same logic as createCollegeDegreeFields
    //experienceInfo = object that contains info about experience
    let complexDiv = createDiv("complexDiv")
    if (experienceInfo){    
        complexDiv.appendChild(createEraseButton())
        complexDiv.appendChild(createInputField("text", "company", experienceInfo.position))
        complexDiv.appendChild(createInputLabel("Company", "placeholder"))
        complexDiv.appendChild(createInputField("text", "position", experienceInfo.company))
        complexDiv.appendChild(createInputLabel("Position held", "placeholder"))
        complexDiv.appendChild(createInputField("text", "years_worked", experienceInfo.years))
        complexDiv.appendChild(createInputLabel("Years worked",  "placeholder"))
    } else {
        complexDiv.appendChild(createEraseButton())
        complexDiv.appendChild(createInputField("text", "company", ""))
        complexDiv.appendChild(createInputLabel("Company", "placeholder"))
        complexDiv.appendChild(createInputField("text", "position", ""))
        complexDiv.appendChild(createInputLabel("Position held", "placeholder"))
        complexDiv.appendChild(createInputField("text", "years_worked", ""))
        complexDiv.appendChild(createInputLabel("Years worked",  "placeholder"))
    }
    return complexDiv
}

function createNothingMessage(){
    //for notifying the user that the education or college or experience has no fields
    let nothingDiv = createDiv("nothingDiv")
    let img = document.createElement("img")
    img.src = "../assets/nothing.svg"
    img.alt = "Nothing found"
    nothingDiv.appendChild(img)
    nothingDiv.appendChild(createText("","You have entered nothing here.", "p"))
    nothingDiv.appendChild(createText("","Add items by clicking the add/plus button on the upper right hand side.", "p"))
    return nothingDiv
}

function putEditorProfile(profile){

    //create editor profile
    let sexOptions = ["Male", "Female"]
    let civilOptions = ["Single", "Married", "Widow", "Widower"]
    
    let parent_div = document.querySelector(".edit_box")
    let form_contents = document.createElement("form")
    form_contents.id = "form_contents"
    form_contents.appendChild(createInputField("text", "given_name", profile.given_name))
    form_contents.appendChild(createInputLabel("Given name", "placeholder"))
    form_contents.appendChild(createInputField("text", "middle_name", profile.middle_name))
    form_contents.appendChild(createInputLabel("Middle name", "placeholder"))
    form_contents.appendChild(createInputField("text", "last_name", profile.last_name))
    form_contents.appendChild(createInputLabel("Last name",  "placeholder"))
    form_contents.appendChild(createInputField("text", "username", profile.username))
    form_contents.appendChild(createInputLabel("Username", "placeholder"))
    form_contents.appendChild(createInputField("date", "bday", profile.bday))
    form_contents.appendChild(createInputLabel("Date of Birthday", "bday_placeholder"))
    form_contents.appendChild(createSelection("sex", sexOptions, profile.sex))
    form_contents.appendChild(createInputLabel("Sex", "select_placeholder"))
    form_contents.appendChild(createSelection("civil_status", civilOptions, profile.status))
    form_contents.appendChild(createInputLabel("Civil Status", "select_placeholder"))
    
    parent_div.appendChild(form_contents)
    
    
}

function putEditorContact(contact){
    let parent_div = document.querySelector(".edit_box")
    let form_contents = document.createElement("form")
    form_contents.id = "form_contents"

    form_contents.appendChild(createInputField("text", "address", contact.address))
    form_contents.appendChild(createInputLabel("Home Address", "placeholder"))
    form_contents.appendChild(createInputField("text", "email", contact.email))
    form_contents.appendChild(createInputLabel("Email address", "placeholder"))
    form_contents.appendChild(createInputField("text", "number", contact.number))
    form_contents.appendChild(createInputLabel("Contact number",  "placeholder"))


    parent_div.appendChild(form_contents)
    
}

function putEditorEducation(education){
    let educationOptions = ["Elementary", "Junior High School", "Senior High School"]

    let parent_div = document.querySelector(".edit_box")
    let form_contents = document.createElement("form")
    form_contents.id = "form_contents"

    if (education.hasOwnProperty("attainment")){
        let educationOptions = ["Elementary", "Junior High School", "Senior High School"]
        form_contents.appendChild(createEducationField(education.attainment, education.school, educationOptions))
    } else {
        form_contents.appendChild(createNothingMessage())
    }

    parent_div.appendChild(form_contents)
}

function putEditorCollege(college){
    let parent_div = document.querySelector(".edit_box")
    let form_contents = document.createElement("form")
    form_contents.id = "form_contents"

    if (college.length > 0){
        for (let i = 0; i < college.length; i++){
            form_contents.appendChild(createCollegeDegreeFields(college[i]))
        }
    } else {
        form_contents.appendChild(createNothingMessage())
    }

    parent_div.appendChild(form_contents)
}

function putEditorExperience(experience){
    let parent_div = document.querySelector(".edit_box")
    let form_contents = document.createElement("form")
    form_contents.id = "form_contents"

    if (experience.length > 0){
        for (let i = 0; i < experience.length; i++){
            form_contents.appendChild(createExperienceFields(experience[i]))
        }
    } else {
        form_contents.appendChild(createNothingMessage())
    }

    parent_div.appendChild(form_contents)
}

function addComplexFields(){
    let form_contents = document.querySelector("#form_contents") //get form_contents
    let nothingDiv = document.querySelector(".nothingDiv") //remove nothingDiv if it exists
    if (nothingDiv){
        form_contents.removeChild(nothingDiv)
    }
    if (form_contents){ //form contents exists
        if (state.onEditCollege){       //if the tab is in college, add fields related to college
            form_contents.appendChild(createCollegeDegreeFields())
            state.editApplicant.college.push(
                {
                    college: "",
                    degree: "",
                    year: ""
                },
            )
            
        } else if (state.onEditExperience) {  //if the tab is in experience, add fields related to experience
            form_contents.appendChild(createExperienceFields())
            state.editApplicant.experience.push(
                {
                    position: "",
                    company: "",
                    years: ""
                }
            )
        } else if (state.onEditEducation) { //if the tab is on education
            if (!state.editApplicant.education.hasOwnProperty("attainment") && !state.editApplicant.education.hasOwnProperty("school")){
                //education has no property, we can add those properties
                let educationOptions = ["Select your highest educational attainment", "Elementary", "Junior High School", "Senior High School"]
                form_contents.appendChild(createEducationField("", "", educationOptions))
                state.editApplicant.education.attainment = "",
                state.editApplicant.education.school = ""
            }
        }
    }
    
}

function deleteField(event){
    let form_contents = document.querySelector("#form_contents")
    let children = form_contents.children
    for (let i = 0; i < children.length ; i++){
        if (children[i] === event.target.parentNode){
            if (event.target.nextSibling.name === "degree"){ //
                state.editApplicant.college.splice(i, 1)
            } else if (event.target.nextSibling.name === "company"){
                state.editApplicant.experience.splice(i, 1)
            } else if (event.target.nextSibling.name === "education"){
                delete state.editApplicant.education.attainment
                delete state.editApplicant.education.school
            }
        }
    }


    let parent = event.target.parentNode
    let parent_class = parent.className
    form_contents.removeChild(parent)

    let parentClasses = document.querySelectorAll("."+ parent_class)
    if (parentClasses.length === 0){
        form_contents.appendChild(createNothingMessage())
    }
}

function changingFieldValues(event){
    if (event.target.name === "given_name"){
        state.editApplicant.profile.given_name = event.target.value
    } else if (event.target.name === "middle_name"){
        state.editApplicant.profile.middle_name = event.target.value
    } else if (event.target.name === "last_name"){
        state.editApplicant.profile.last_name = event.target.value
    } else if (event.target.name === "username"){
        state.editApplicant.profile.username = event.target.value
    } else if (event.target.name === "bday"){
        state.editApplicant.profile.bday = event.target.value
    } else if (event.target.name === "sex"){
        state.editApplicant.profile.sex = event.target.value
    } else if (event.target.name === "civil_status"){
        state.editApplicant.profile.civil_status = event.target.value
    }  else if (event.target.name === "address"){
        state.editApplicant.contact.address = event.target.value
    } else if (event.target.name === "email"){
        state.editApplicant.contact.email = event.target.value
    } else if (event.target.name === "number"){
        state.editApplicant.contact.number = event.target.value
    } else if (event.target.name === "education"){
        state.editApplicant.education.attainment = event.target.value
    } else if (event.target.name === "current_school"){
        state.editApplicant.education.school = event.target.value
    }
    
    //complex attributes
    let children = document.querySelector("#form_contents").children
    if (event.target.name === "degree" || event.target.name === "grad_school" || event.target.name === "grad_year"){
        for (let i = 0; i < children.length ; i++){
            if (children[i] === event.target.parentNode){
                if (event.target.name === "degree"){
                    state.editApplicant.college[i].degree = event.target.value
                } else  if (event.target.name === "grad_year"){
                    state.editApplicant.college[i].year = event.target.value
                } else  if (event.target.name === "grad_school"){
                    state.editApplicant.college[i].college = event.target.value
                }
            }
        }
    } else {
        for (let i = 0; i < children.length ; i++){
            if (children[i] === event.target.parentNode){
                if (event.target.name === "company"){
                    state.editApplicant.experience[i].company = event.target.value
                } else  if (event.target.name === "position"){
                    state.editApplicant.experience[i].position = event.target.value
                } else  if (event.target.name === "years_worked"){
                    state.editApplicant.experience[i].years = event.target.value
                }
            }
        }
    }

}

function createMessage(type, message){
    let alert = document.querySelector(".alert_message")
    let icon = document.querySelector(".status_icon")
    let message_text = document.querySelector(".message_text")
    
        icon.textContent = "check_circle_outline"
        icon.className = "material-icons status_icon " + type + "_icon"
        alert.className = "alert_message " + type + " message_appear"
        message_text.textContent = message
        setTimeout(()=>{
            alert.className = "alert_message " + type +" message_disappear"
        }, 1000)
    
}

function saveApplicant(){
    if (validInputs()){
        state.applicant = Object.assign({}, state.editApplicant)
        createProfileOptions(state.applicant)
        resetProfile()
        createMessage("success", "Successfully saved!")
    } else {
        createMessage("fail", "Not all inputs have a value")
    }

    //do a request where we will save the data to the database
    //to further improve this, just use html to load the inputs and labels. then just activate it using classes

}

function validInputs(){
    //profile
    let profile = state.editApplicant.profile
    if (!profile.given_name || !profile.middle_name || !profile.last_name || !profile.bday || !profile.sex
        || !profile.status){
        return false
    }

    let contact = state.editApplicant.contact
    if (!contact.address || !contact.email || !contact.number){
        return false
    }

    let education = state.editApplicant.education
    if (education.hasOwnProperty("attainment") && education.hasOwnProperty("school")){
        if (!education.attainment || !education.school){
            return false
        }
    }

    let college = state.editApplicant.college
    for (let i = 0; i < college.length; i++){
        if (!college[i].college || !college[i].degree || !college[i].year){
            return false
        }
    }

    let experience = state.editApplicant.experience
    for (let i = 0; i < experience.length; i++){
        if (!experience[i].position || !experience[i].company || !experience[i].years){
            return false
        }
    }

    return true

}

function resetProfile(){
    state.onProfile = true
    state.onContact = false
    state.onCollege = false
    state.onEducation = false
    state.onExperience = false
}

function onStartPage(applicant){
    //function is used to attach event listeners to buttons or spans that we can click.
    let avatar_initials = document.querySelector(".name_logo p") 
    avatar_initials.textContent = applicant.profile.given_name[0].toUpperCase() + applicant.profile.last_name[0].toUpperCase()
    let big_name = document.querySelector(".avatar_options h1")
    big_name.textContent = applicant.profile.given_name + " " + applicant.profile.last_name  

    let edit_button = document.querySelector(".edit_button")
    edit_button.addEventListener("click", modifyEditor)

    let close_button = document.querySelector('.close_button')
    close_button.addEventListener("click", modifyEditor)

    let add_button = document.querySelector('.add_button')      //add a field depends on the tab we're manipulating
    add_button.addEventListener("click", addComplexFields)

    let save_button = document.querySelector(".save_button")
    save_button.addEventListener("click", saveApplicant)

}

onStartPage(state.applicant)
createProfileOptions(state.applicant)
createEditorTabs(state.applicant)

onStateChange(state.applicant)
