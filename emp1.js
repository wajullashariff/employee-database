//creating all the instances of the elements to be used
let detailsForm=document.forms.details;
let empid=document.createElement("input");
let name=document.createElement("input");
let department=document.createElement("input");
let phone=document.createElement("input");
let email=document.createElement("input");
let manager=document.createElement("input");
let loc=document.createElement("input");
let buttonAU=document.createElement("button");      //button to add and update, hence name AU
let clear=document.createElement("button");
let index,children,pointer=1,idToDelete=idToUpdate=-1;
let table=document.querySelector(".detailsTable");

let indexArray = localStorage.getItem('indices') ? JSON.parse(localStorage.getItem('indices')) : [];
localStorage.setItem('indices', JSON.stringify(indexArray));
let data = JSON.parse(localStorage.getItem('indices'));

//setting attributes to all the instances and appending it to the form element
empid.setAttribute("type","text");
empid.setAttribute("placeholder","Employee ID");
empid.setAttribute("name","empid");
detailsForm.appendChild(empid);

name.setAttribute("type","text");
name.setAttribute("placeholder","name");
name.setAttribute("name","empname");
detailsForm.appendChild(name);

department.setAttribute("type","text");
department.setAttribute("placeholder","department");
department.setAttribute("name","department");
detailsForm.appendChild(department);

phone.setAttribute("type","text");
phone.setAttribute("placeholder","phone number");
phone.setAttribute("name","phone");
detailsForm.appendChild(phone);

email.setAttribute("type","text");
email.setAttribute("placeholder","email ID");
email.setAttribute("name","email");
detailsForm.appendChild(email);

manager.setAttribute("type","text");
manager.setAttribute("placeholder","manager");
manager.setAttribute("name","manager");
detailsForm.appendChild(manager);

loc.setAttribute("type","text");
loc.setAttribute("placeholder","location");
loc.setAttribute("name","location");
detailsForm.appendChild(loc);

buttonAU.textContent="Add";
buttonAU.addEventListener('click',addEmployee);
document.body.appendChild(buttonAU);
clear.textContent="Clear";
clear.addEventListener('click',clearForm);
document.body.appendChild(clear);

function findIndex(){
    data = JSON.parse(localStorage.getItem('indices'));
    if(data.length!==0){
    index = data[data.length-1]+1;
    indexArray.push(index);
    localStorage.setItem('indices', JSON.stringify(indexArray));
    return index;
    }
    else{
        index=0;
        indexArray.push(index);
        localStorage.setItem('indices', JSON.stringify(indexArray));
        return index;
    }
}

function addEmployee(){
    //table.style.display="block";
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
    localStorage.setItem(index,JSON.stringify(obj1));
    display(index);
    clearForm();

}

function display(itr){
    let fetchObject;
    fetchObject=JSON.parse(localStorage.getItem(itr));
    row=table.insertRow(pointer);
    pointer+=1;
    row.setAttribute('id',itr);
    cell1=row.insertCell(0).innerHTML=fetchObject.id;
    cell2=row.insertCell(1).innerHTML=fetchObject.name;
    cell3=row.insertCell(2).innerHTML=fetchObject.dept;
    cell4=row.insertCell(3).innerHTML=fetchObject.phone;
    cell5=row.insertCell(4).innerHTML=fetchObject.email;
    cell6=row.insertCell(5).innerHTML=fetchObject.manager;
    cell7=row.insertCell(6).innerHTML=fetchObject.loc;
    cell8=row.insertCell(7).innerHTML="<button onclick='edit(this);'>Edit</button>";
    cell9=row.insertCell(8).innerHTML="<button onclick='remove(this);'>Delete</button>";
}

function edit(ele){
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
function update(){
    buttonAU.removeEventListener('click',update);
    let rowChildren = document.querySelector('.detailsTable').tBodies[0].children.namedItem(idToUpdate).children;
    let objToUpdate=JSON.parse(localStorage.getItem(idToUpdate));
    rowChildren[0].innerHTML=objToUpdate.id=empid.value;
    rowChildren[1].innerHTML=objToUpdate.name=name.value;
    rowChildren[2].innerHTML=objToUpdate.dept=department.value;
    rowChildren[3].innerHTML=objToUpdate.phone=phone.value;
    rowChildren[4].innerHTML=objToUpdate.email=email.value;
    rowChildren[5].innerHTML=objToUpdate.manager=manager.value;
    rowChildren[6].innerHTML=objToUpdate.loc=loc.value;
    localStorage.setItem(idToUpdate,JSON.stringify(objToUpdate));
    buttonAU.addEventListener('click',addEmployee);
    clearForm();
}

function remove(ele) {
    idToDelete = ele.parentElement.parentElement.id;
    ele.parentElement.parentElement.remove()
    localStorage.removeItem(idToDelete);
    indexArray = JSON.parse(localStorage.getItem('indices'));
    deleteIndex = data.indexOf(parseInt(idToDelete));
    if (deleteIndex > -1) {
        indexArray.splice(deleteIndex, 1);
    }
    localStorage.setItem("indices",JSON.stringify(indexArray));
}

function clearForm(){
    detailsForm.reset(); 
    buttonAU.textContent="Add";
}

data.forEach(item => {
    //table.style.display="block";
    display(item);
  });
