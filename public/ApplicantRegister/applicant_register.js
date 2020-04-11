let student = document.querySelector(".student");
let college = document.querySelector(".college");
let job = document.querySelector(".job");
let student_div = document.querySelector("#student_div");
let college_div = document.querySelector("#grad_div");
let job_div = document.querySelector("#job_div");
let college_add = document.querySelector("#college_add");
let job_add = document.querySelector("#job_add");
let close_elements = document.querySelectorAll("#close_symbol");

function putRequired(div){
    for (let child = div.firstChild; child!=null; child = child.nextSibling){
        if(child.nodeName === "SELECT" || child.nodeName === "INPUT"){
            child.required = true;
        }
    }
}

function removeRequired(div){
    for (let child = div.firstChild; child!=null; child = child.nextSibling){
        if(child.nodeName === "SELECT" || child.nodeName === "INPUT"){
            child.required = false;
            child.value = "";
        }
    }
}

function addOption(checkbox, div){
    if (checkbox.checked){
        div.style.display = "flex";
        div.style.flexDirection = "column";
        putRequired(div);
    } else {
        div.style.display = "none";
        removeRequired(div);
    }
}

function deleteAdditionFields(div){ 
    for (let i = 0; i < 7; i++){    //7 children. 2 children pero input+label (6 children) plus the close button
        div.removeChild(div.lastChild);
    }
}

function createCollegeField(){
    let close = document.createElement("span");
    close.className = "material-icons md-12";
    close.id = "close_symbol";
    let close_node = document.createTextNode("delete");
    close.appendChild(close_node);
    
    let deg_field = document.createElement("input");
    deg_field.name = "degree";
    deg_field.required = "true";
    deg_field.type = "text";
    let deg_label = document.createElement("label");
    deg_label.id = "placeholder";
    deg_label.for = "college";
    let deg_node = document.createTextNode("Degree attained");
    deg_label.appendChild(deg_node);

    let school_field = document.createElement("input");
    school_field.name = "grad_school";
    school_field.required = "true";
    school_field.type = "text";
    let school_label = document.createElement("label");
    school_label.id = "placeholder";
    school_label.for = "college";
    let school_node = document.createTextNode("School graduated from");
    school_label.appendChild(school_node);

    let grad_field = document.createElement("input");
    grad_field.name = "grad_year";
    grad_field.required = "true";
    grad_field.type = "text";
    let grad_label = document.createElement("label");
    grad_label.id = "placeholder";
    grad_label.for = "college";
    let grad_node = document.createTextNode("Graduation year");
    grad_label.appendChild(grad_node);

    college_div.append(close);
    college_div.appendChild(deg_field);
    college_div.appendChild(deg_label);
    college_div.appendChild(school_field);
    college_div.appendChild(school_label);
    college_div.appendChild(grad_field);
    college_div.appendChild(grad_label);

    close.addEventListener("click", ()=>{
        deleteAdditionFields(college_div);
    })
}

function createJobField(){
    // <span class="material-icons md-12">close</span>
    let close = document.createElement("span");
    close.className = "material-icons md-12";
    close.id = "close_symbol";
    let close_node = document.createTextNode("close");
    close.appendChild(close_node);

    let company_field = document.createElement("input");
    company_field.name = "company";
    company_field.required = "true";
    company_field.type = "text";
    let company_label = document.createElement("label");
    company_label.id = "placeholder";
    company_label.for = "college";
    let company_node = document.createTextNode("Company");
    company_label.appendChild(company_node);

    let position_field = document.createElement("input");
    position_field.name = "position";
    position_field.required = "true";
    position_field.type = "text";
    let position_label = document.createElement("label");
    position_label.id = "placeholder";
    position_label.for = "college";
    let position_node = document.createTextNode("Position held");
    position_label.appendChild(position_node);

    let years_field = document.createElement("input");
    years_field.name = "years_worked";
    years_field.required = "true";
    years_field.type = "text";
    let years_label = document.createElement("label");
    years_label.id = "placeholder";
    years_label.for = "college";
    let years_node = document.createTextNode("Years worked");
    years_label.appendChild(years_node);

    job_div.append(close);
    job_div.appendChild(company_field);
    job_div.appendChild(company_label);
    job_div.appendChild(position_field);
    job_div.appendChild(position_label);
    job_div.appendChild(years_field);
    job_div.appendChild(years_label);

    close.addEventListener("click", ()=>{
        deleteAdditionFields(job_div);
    })
}


student.addEventListener("click", ()=>{
    addOption(student, student_div);
});

college.addEventListener("click", ()=>{
    addOption(college, college_div);
});

job.addEventListener("click", ()=>{
    addOption(job, job_div);
});

if (college_add){
    college_add.addEventListener("click", createCollegeField);
}

if (job_add){
    job_add.addEventListener("click", createJobField);
}

