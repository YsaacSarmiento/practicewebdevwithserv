
let state = {
    onJobs: true,
    onCompany: false
}


let jobs = [{
    company_title: "Blue Company",
    job_title: "Software Developer",
    job_loc: "San Francisco, CA",
    date_posted: "03/14/2020",
    num_applied: 49,
    qualifications:["Good skills at C, C++, Java, and every language known to mankind", "25 years of experience using Kotlin",
    "Fresh college graduate only"],
    info: {
        working_hrs: 8,
        salary: 100000,
        field: "IT"
    }

},
{

    company_title: "Toyota",
    job_title: "System Analyst",
    job_loc: "Tokyo, JP",
    date_posted: "02/25/2020",
    num_applied: 59,
    qualifications:["Good skills at C, C++, Java, and every language known to mankind", "25 years of experience using Kotlin"],
    info: {
        working_hrs: 8,
        salary: 80000,
        field: "IT"
    }

},{
    company_title: "Noodles and Company",
    job_title: "Web Developer",
    job_loc: "Seattle, WA",
    date_posted: "01/31/2020",
    num_applied: 54,
    qualifications:["Good skills at JavaScript, CSS and other emerging toolkits",
    "Fresh college graduate only"],
    info: {
        working_hrs: 8,
        salary: 75000,
        field: "IT"
    }

},{
    company_title: "Samsung",
    job_title: "Hardware Specialist",
    job_loc: "Seoul, SK",
    date_posted: "11/18/2019",
    num_applied: 223,
    qualifications:["Good skills at C, C++, Java, and every language known to mankind", "25 years of experience using Kotlin","Adapt fast to tools that we use"],
    info: {
        working_hrs: 8,
        salary: 120000,
        field: "IT"
    }
}  ]


let company = [
    {
        name: "Toyota",
        address: "Tokyo, JP",
        industry: "Car manufacturing",
        openJobs: 28,
        contact: {
            email: 'toyota@toyota.jp',
            number: '+9129129'
        }
    },
    {
        name: "Google Singapore",
        address: "Taipei, SG",
        industry: "Technology",
        openJobs: 14,
        contact: {
            email: 'googletaipei@google.sg',
            number: '+73921212'
        }
    },{
        name: "Netflix",
        address: "Silicon Valley, SF",
        industry: "Video",
        openJobs: 40,
        contact: {
            email: 'netflix@netflix.us',
            number: '+88293012'
        }
    }
]


function createCompanyLogo(companyLetter){
    let company_logo = document.createElement("div")    //create the company logo
    company_logo.className = "company_logo"
    
    let company_logo_span = document.createElement("span") //add span
    let company_logo_letter = document.createElement("p") //add the letter that'll symbolize the company
    let company_logo_text = document.createTextNode(companyLetter) //add text
    company_logo_letter.appendChild(company_logo_text) //append it to company letter
    company_logo_span.appendChild(company_logo_letter) //add it to span

    company_logo.appendChild(company_logo_span) //add it to company logo div
    return company_logo;
}

function createText(id, text){

    let title = document.createElement("p") //create a paragraph element
    title.id = id      //add id for company title
    title.appendChild(document.createTextNode(text)) //add the company title to the tag
    return title
}

function createDiv(id){
    let div = document.createElement("div") //create parent div
    div.className = id
    return div
}

function createButton(className, text){
    let button = document.createElement("button")
    button.className = className
    button.appendChild(document.createTextNode(text))
    
    if (className === "learn_button"){
        button.addEventListener("click", displayDetails)
    } else if (className === "apply_button"){
        button.addEventListener("click", applyJob)
        button.addEventListener("mouseover", cancelApply)
        button.addEventListener("mouseout", applyJob)
        button.addEventListener("click", restoreApplyButton)
    }
    return button
}

function createContact(contact){
    let contact_div = createDiv("details_tab")
    let details_label = createText("details_labels", "Contact Information")
    let unordered_list = document.createElement("ul")

    let email = createInformationListItem("Email address: " +  contact.email)
    unordered_list.appendChild(email)
    let number = createInformationListItem("Contact Number: " +  contact.number)
    unordered_list.appendChild(number)

    contact_div.appendChild(details_label)
    contact_div.appendChild(unordered_list)
    return contact_div
}

function createInformationListItem(text){
    let list_item = document.createElement("li")
    list_item.appendChild(document.createTextNode(text))
    return list_item
}

function createInformation(info){
    let information_div = createDiv("details_tab")
    let details_label = createText("details_labels", "Information")
    let unordered_list = document.createElement("ul")

    let working_hrs = createInformationListItem("Working hours: " +  info.working_hrs)
    unordered_list.appendChild(working_hrs)
    let salary = createInformationListItem("Salary: " +  info.salary)
    unordered_list.appendChild(salary)
    let field = createInformationListItem("Field: " +  info.field)
    unordered_list.appendChild(field)

    information_div.appendChild(details_label)
    information_div.appendChild(unordered_list)
    return information_div
}

function createQualifications(qualifications){
    let qualifications_div = createDiv("details_tab")
    let details_label = createText("details_labels", "Qualifications")
    let unordered_list = document.createElement("ul")
    for (let i = 0; i < qualifications.length; i++){
        let list_item = document.createElement("li")
        list_item.appendChild(document.createTextNode(qualifications[i]))
        unordered_list.appendChild(list_item)
    }
    qualifications_div.appendChild(details_label)
    qualifications_div.appendChild(unordered_list)
    return qualifications_div
}

function createJobCard(job){
    let parent_div = document.querySelector(".list")        //find the parent div

    let div_card = createDiv("card")        //parent div
    let details = createDiv("details")  //details div

    div_card.appendChild(createCompanyLogo(job.company_title[0].toUpperCase()))  //add it to the parent div

    let card_details = createDiv("card_details")        //card details, HAS TWO DIVS INSIDE IT: job_desc and post_desc
    let job_desc = createDiv("job_desc")                //job_desc, the company and location

    details.appendChild(createText("title", job.job_title)) //job title, 
    job_desc.appendChild(createText("",job.company_title))
    job_desc.appendChild(createText("", job.job_loc))
    card_details.appendChild(job_desc)               //add job_desc to card_details

    let post_details = document.createElement("div")    //for post details
    post_details.id = "post_details"
    
    post_details.appendChild(createText("", "Posted on " + job.date_posted))
    post_details.appendChild(createText("", job.num_applied + " have applied"))
    card_details.appendChild(post_details)  //add post details to card_details
    
    details.appendChild(card_details)   //add it to details div

    let additional_details_div = createDiv("additional_details inactive_details")

    //INFORMATION DIV
    additional_details_div.appendChild(createInformation(job.info))
    //QUALIFICATIONS DIV
    additional_details_div.appendChild(createQualifications(job.qualifications))
    details.appendChild(additional_details_div)



    let job_options = createDiv("job_options")
    job_options.appendChild(createButton("learn_button", "View more"))
    job_options.appendChild(createButton("apply_button", "APPLY"))

    details.appendChild(job_options)
    div_card.appendChild(details)
    parent_div.appendChild(div_card)
}

function createCompanyCard(company){
    let parent_div = document.querySelector(".list")        //find the parent div

    let div_card = createDiv("card")        //parent div
    let details = createDiv("details")  //details div

    div_card.appendChild(createCompanyLogo(company.name[0].toUpperCase()))  //add it to the parent div

    let card_details = createDiv("card_details")        //card details, HAS TWO DIVS INSIDE IT: job_desc and post_desc
    let job_desc = createDiv("job_desc")                //job_desc, the company and location

    details.appendChild(createText("title", company.name)) //job title, 
    card_details.appendChild(createText("",company.address))
    card_details.appendChild(createText("", company.industry))
    card_details.appendChild(createText("", company.openJobs + " open jobs"))

    details.appendChild(card_details)   //add it to details div

    let additional_details_div = createDiv("additional_details inactive_details")

    //INFORMATION DIV
    additional_details_div.appendChild(createContact(company.contact))
    details.appendChild(additional_details_div)



    let job_options = createDiv("job_options")
    job_options.appendChild(createButton("learn_button", "View more"))
    job_options.appendChild(createButton("view_button", "VIEW PROFILE"))

    details.appendChild(job_options)
    div_card.appendChild(details)
    parent_div.appendChild(div_card)
}

function switching(event){
    let active_tab = document.querySelector('#active_filter')
    let inactive_tab = document.querySelector('#inactive_filter')
    if (inactive_tab.textContent === event.target.textContent){
        if (inactive_tab.textContent === "Jobs"){
            state.onJobs = true
            state.onCompany = false
            onStateChange()     //since we changed the state, call state change
        } else {
            state.onJobs = false
            state.onCompany = true
            onStateChange()     //since we changed the state, call state change
        }
        inactive_tab.id = "active_filter"
        active_tab.id = "inactive_filter"
    }


    
}

function displayDetails(event){
    //from button up to additional_details div
    // button->job_options->job_details
    // then access job_details->additional_details (3rd child)
    let parent = event.target.parentElement
    let grandParent = parent.parentElement
    let children = grandParent.children

    let additonal_details = children[2]     //third children is the additional details
    if (additonal_details.className === "additional_details inactive_details"){  //access the additional details and check if its inactive
        additonal_details.className = "additional_details"   //change the className to make it appear
        event.target.textContent = "View less"    //change the text
    } else if (additonal_details.className === "additional_details"){ //additional details is already on the screen
        additonal_details.className = "additional_details inactive_details"   //make it disappear again
        event.target.textContent = "View more" //change the text
    }

}

function applyJob(event){
    if ((event.type === "click" && event.target.className === "apply_button")|| (event.type === "mouseout" && event.target.className === "cancel")){
        let check = document.createElement("span")
        check.className = "material-icons md-18"
        event.target.classList.remove(event.type.className)
        check.appendChild(document.createTextNode("check"))
        event.target.className = "applied"
        event.target.textContent =""
        event.target.appendChild(check)
        event.target.appendChild(document.createTextNode("APPLIED"));
    }
}

function cancelApply(event){
    if (event.target.className === "applied"){
        let check = document.createElement("span")
        check.className = "material-icons md-18"
        check.appendChild(document.createTextNode("clear"))
        event.target.classList.remove("applied")
        event.target.className = "cancel"
        event.target.textContent =""
        event.target.appendChild(check)
        event.target.appendChild(document.createTextNode("CANCEL")) 
    }
}

function restoreApplyButton(event){
    if (event.target.className === "cancel"){
        event.target.classList.remove("cancel")
        event.target.removeChild(event.target.children[0])
        event.target.classList.add("apply_button")
        event.target.textContent = ""
        event.target.appendChild(document.createTextNode("APPLY"))
    }
}

function deleteListElements(){
    let list = document.querySelector('.list')
    while(list.firstChild){
        list.removeChild(list.lastChild)
    }
}

function onStateChange(){
    if (state.onJobs){
        deleteListElements()        //delete any job cards inside list
        for (let i = 0; i < jobs.length ; i++){
            createJobCard(jobs[i])
        }
    } else {
        deleteListElements()        //delete job cards
        for (let i = 0; i < company.length ; i++){
            createCompanyCard(company[i])
        }
    }
    document.querySelector(".list").classList.add('animateList')
    setTimeout(function() {     //finish the animation before removing it
        document.querySelector(".list").classList.remove('animateList')
    }, 1000); //1s
   
    //idea to make it faster: instead of calling deleteListElements() multiple times 
    //(especially if we have created the cards, make it use an inactive_card filter (same as additional_div))
    //so that we wont waste resources rendering them again and again.
}


onStateChange()
let options = document.querySelector(".switch").querySelectorAll("h4") //find the h4 element inside switch div
for (let i = 0 ; i< options.length; i++){
    options[i].addEventListener("click", switching)
}


