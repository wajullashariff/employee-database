//creating all the instances of the elements to be used
let body=document.querySelector("body");
let s="input";
let empid=createDOMElement(s),name=createDOMElement(s),department,phone=createDOMElement(s),email=createDOMElement(s),loc=createDOMElement(s),manager;
let index,children,pointer=1,idToDelete=idToUpdate=-1;
let indexArray = localStorage.getItem('APindex') ? JSON.parse(localStorage.getItem('APindex')) : [];
localStorage.setItem('APindex', JSON.stringify(indexArray));
let data = JSON.parse(localStorage.getItem('APindex'));
let space=createDOMElement("br"),horizontalBreak=createDOMElement("hr");
let heading=createDOMElement("h1","Employee Details Form"), heading3=createDOMElement("h3","Please add the details below");
body.appendChild(heading);body.appendChild(horizontalBreak.cloneNode(true));body.appendChild(heading3);

function createDOMElement(type,str){
    if(str==""||str==undefined){
    return document.createElement(type);
    }
    else{
        element=document.createElement(type);
        element.textContent=str;
        return element;
    }
}
function createAndSetClass(element,className){
    htmlTag=createDOMElement(element);
    htmlTag.setAttribute("class",className);
    body.appendChild(htmlTag);
    return htmlTag;
}
let detailsForm=createAndSetClass("form","details");
let buttonAU=createAndSetClass("button","AddUpdateBtn");
buttonAU.textContent="Add";
let clear=createAndSetClass("button","clear");
clear.textContent="Clear";
buttonAU.addEventListener('click',addEmployee);
clear.addEventListener('click',clearForm);
body.appendChild(space.cloneNode(true));
body.appendChild(space.cloneNode(true));
body.appendChild(horizontalBreak.cloneNode(true));
let table=createAndSetClass("table","detailsTable");
let headingsPresent=false;

let tableHeadings=["<b>Employee ID</b>","<b>Name</b>","<b>Department</b>","<b>Phone Number</b>","<b>Email</b>","<b>Manager</b>","<b>Location</b>","<b>Edit</b>","<b>Delete</b>"]
function createTableHeadings(tableHeadings){
    var row=table.insertRow(0);
    for(i=0;i<9;i++){
    row.insertCell(i).innerHTML=tableHeadings[i];
    }
    headingsPresent=true;
}

//setting attributes to all the instances and appending it to the form element
function setAndAppend(variable,label,typeArray,valueArray){         //function to set all the attributes of the input elements used in the form and append them to the form
    labelValue=createDOMElement("label");
    labelValue.innerHTML=label;
    divElement=createDOMElement("div");
    for(i=0;i<typeArray.length;i++){
        variable.setAttribute(typeArray[i],valueArray[i]);
    }
    divElement.appendChild(labelValue);
    divElement.appendChild(variable);
    detailsForm.appendChild(divElement);
    detailsForm.appendChild(space.cloneNode(true));
    detailsForm.appendChild(space.cloneNode(true));
}

function dropDown(label,classValue,arr) {            //function to create a dropdown menu
    labelValue=createDOMElement("label");
    labelValue.innerHTML="Employee "+label+":";
    divElement=createDOMElement("div");
    selectOption = createDOMElement("SELECT");
    selectOption.setAttribute("class", classValue);
    for(i=0;i<arr.length;i++){
    let differentOptions = createDOMElement("option");
    differentOptions.setAttribute("value", arr[i]);
    differentOptions.innerHTML=arr[i];
    selectOption.appendChild(differentOptions);
    divElement.appendChild(labelValue);
    divElement.appendChild(selectOption);
    detailsForm.appendChild(divElement);
  }
  detailsForm.appendChild(space.cloneNode(true));
  detailsForm.appendChild(space.cloneNode(true));
}

setAndAppend(empid,"Employee ID:",["type","placeholder","name"],["text","Employee ID","empid"]);
setAndAppend(name,"Employee Name:",["type","placeholder","name"],["text","Name","empname"]);
dropDown("Department","departmentSelect",["Development","Testing","Support","Management","Staff"]);
setAndAppend(phone,"Employee Phone:",["type","placeholder","name"],["tel","Phone number","phone"]);
setAndAppend(email,"Employee Email:",["type","placeholder","name"],["email","Email ID","email"]);
dropDown("Manager","managerSelect",["Samuel","John","Joe"]);
setAndAppend(loc,"Employee's Location:",["type","placeholder","name"],["text","Location","location"]);

department=document.querySelector(".departmentSelect");
manager=document.querySelector(".managerSelect")

function findIndex(){                   //function to find the next index at which the details are supposed to be stored. This index is added to the APindex array
    data = JSON.parse(localStorage.getItem('APindex'));
    if(data.length!==0){
    index = data[data.length-1]+1;
    indexArray.push(index);
    localStorage.setItem('APindex', JSON.stringify(indexArray));
    return index;
    }
    else{
        index=0;
        indexArray.push(index);
        localStorage.setItem('APindex', JSON.stringify(indexArray));
        return index;
    }
}

function getKey(indexValue){    //change the key value in localStorage so that it is not easily mutable 
    let key;
    indexValue<10?key="AP00"+indexValue:(indexValue<100?key="AP0"+indexValue:key="AP"+indexValue);
    return key;
}

function addEmployee(){             //function to add the employee details to localStorage
    if(headingsPresent==false){
        createTableHeadings(tableHeadings);
    }
    if(table.style.visibility=="hidden"){
        table.style.visibility="visible";
    }
    proceed=validate();
    if(proceed==true){
    let obj1={
        id:empid.value,
        name:name.value,
        dept:department.value,
        phone:phone.value,
        email:email.value,
        manager:manager.value,
        loc:loc.value
    }
    index=findIndex();
    key=getKey(index);
    localStorage.setItem(key,JSON.stringify(obj1));
    display(index);             //function call to display the details of employee present at the current index
    clearForm();
    }
}
function validate(){            //function to validate all the input fields of the form
    var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(empid.value ==""||isNaN(empid.value))
    {
        alert( "Please Enter a valid Employee ID!" );
        empid.focus();
        return false;
    }
    if(name.value ==""||!isNaN(name.value))
    {
        alert( "Please Enter valid Employee Name!" );
        name.focus();
        return false;
    }

    if(phone.value ==""||isNaN(phone.value)||phone.value.length<10||phone.value.length>10)
    {
        alert( "Please Enter a valid 10 digit Phone Number!" );
        phone.focus();
        return false;
    }
    if(email.value ==""||email.value.match(emailformat)==null)
    {
        alert( "Please Enter Employee's Valid Email ID!" );
        email.focus();
        return false;
    }

    if(loc.value =="")
    {
        alert( "Please Enter Employee's Location!" );
        loc.focus();
        return false;
    }
    return true;
}

function display(itr){              //function to display the details of the employee at the particular index
    let fetchObject;
    key=getKey(itr);
    fetchObject=JSON.parse(localStorage.getItem(key));
    row=table.insertRow(pointer);
    pointer+=1;
    row.setAttribute('id',itr);
    row.insertCell(0).innerHTML=fetchObject.id;
    row.insertCell(1).innerHTML=fetchObject.name;
    row.insertCell(2).innerHTML=fetchObject.dept;
    row.insertCell(3).innerHTML=fetchObject.phone;
    row.insertCell(4).innerHTML=fetchObject.email;
    row.insertCell(5).innerHTML=fetchObject.manager;
    row.insertCell(6).innerHTML=fetchObject.loc;
    row.insertCell(7).innerHTML="<button onclick='edit(this);'>Edit</button>";
    row.insertCell(8).innerHTML="<button onclick='remove(this);'>Delete</button>";
}

function edit(ele){             //function to edit the already present details in the localStorage and display them in the input fields
    buttonAU.removeEventListener('click',addEmployee);
    idToUpdate = ele.parentElement.parentElement.id;
    children = ele.parentElement.parentElement.children;
    empid.value = children[0].innerText;
    name.value = children[1].innerText;
    department.value = children[2].innerText;
    phone.value=children[3].innerText;
    email.value=children[4].innerText;
    manager.value=children[5].innerText;
    loc.value=children[6].innerText;
    buttonAU.textContent = "Update";
    buttonAU.addEventListener('click',update);
}
function update(){              //function to update the details edited in the previous function and store the updated values to the localStorage
    proceed=validate();
    if(proceed==true){
    buttonAU.removeEventListener('click',update);
    key=getKey(idToUpdate);
    let rowChildren = document.querySelector('.detailsTable').tBodies[0].children.namedItem(idToUpdate).children;
    let objToUpdate=JSON.parse(localStorage.getItem(key));
    rowChildren[0].innerHTML=objToUpdate.id=empid.value;
    rowChildren[1].innerHTML=objToUpdate.name=name.value;
    rowChildren[2].innerHTML=objToUpdate.dept=department.value;
    rowChildren[3].innerHTML=objToUpdate.phone=phone.value;
    rowChildren[4].innerHTML=objToUpdate.email=email.value;
    rowChildren[5].innerHTML=objToUpdate.manager=manager.value;
    rowChildren[6].innerHTML=objToUpdate.loc=loc.value;
    localStorage.setItem(key,JSON.stringify(objToUpdate));
    buttonAU.addEventListener('click',addEmployee);
    clearForm();
    }
}
function remove(ele) {          //function to remove the individual employee details, based on the "delete" button clicked
    data = JSON.parse(localStorage.getItem('APindex'));
    idToDelete = ele.parentElement.parentElement.id;
    ele.parentElement.parentElement.remove();
    key=getKey(idToDelete);
    localStorage.removeItem(key);
    indexArray = JSON.parse(localStorage.getItem('APindex'));
    deleteIndex = data.indexOf(parseInt(idToDelete));
    if (deleteIndex > -1) {
        indexArray.splice(deleteIndex, 1);
    }
    localStorage.setItem("APindex",JSON.stringify(indexArray));
    pointer-=1;
    if(indexArray.length==0){
        //table.deleteRow(0);
        table.style.visibility="hidden";
    }
}
function clearForm(){       //function to clear the input fields
    detailsForm.reset(); 
    buttonAU.textContent="Add";
}
data = JSON.parse(localStorage.getItem('APindex'));
if(data.length!=0){             //condition to check before populating the table
    if(headingsPresent==false){
        createTableHeadings(tableHeadings);
    }
    data.forEach(item => {
        display(item);
    });
}
