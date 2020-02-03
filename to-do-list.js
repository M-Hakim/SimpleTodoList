var input = document.getElementById("myInput");
var addBtn = document.getElementsByClassName("addBtn")[0];
var list = document.getElementById("myUL");

var completedList = document.getElementById("myCompleteUL");

if(localStorage.todo == undefined)
    localStorage.setItem("todo", "");
if(localStorage.completed == undefined)
    localStorage.setItem("completed", "");

updateContent();
function addListListenrs(){
    listItems = document.getElementById("myUL").children;
    for(let i=0; i<listItems.length; i++){
        listItems[i].addEventListener('click', completeAction);
    }
    completedListItems = document.getElementById("myCompleteUL").children;
    for(let i=0; i<completedListItems.length; i++){
        completedListItems[i].addEventListener('click', completeAction);
    }
}

function updateContent(){
    list.innerHTML = localStorage.todo;
    completedList.innerHTML = localStorage.completed;
    addListListenrs();
}

function deleteItem(item, name){
    if(name != "comp"){
        if(item.search('<li style="cursor: pointer;">') == -1)
            item = '<li style="cursor: pointer;">' + item + '</li>';
        localStorage.todo = localStorage.todo.replace(item,"");
    }
    else{
        item = '<li name="comp" class="checked">' + item + '</li>';
        localStorage.completed = localStorage.completed.replace(item, "");
    }
}
function completeAction(e){
        if(e.target.type == "submit"){
            if(e.target.parentNode.getAttribute('name') != "comp")
                deleteItem(e.target.parentNode.innerHTML);
            else
            deleteItem(e.target.parentNode.innerHTML, "comp");
        }
        else if(e.target.getAttribute('name') != "comp"){
            addToCompletedList(e.target.innerHTML);
            deleteItem(e.target.innerHTML);
        }
    updateContent();
}
function addToList(){
    var data = input.value;
    if(data != ""){
        var listElement = `<li style="cursor: pointer;">${data} <button class="del" style="cursor: pointer;"> Delete</button></li>`;
        localStorage.todo += listElement;
    input.value = "";
        updateContent();
    }
}
function addToCompletedList(completedTask){
    completedTask = '<li name="comp" class="checked">' + completedTask + '</li>';
    localStorage.completed += completedTask;
}
addBtn.addEventListener('click', addToList);
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addToList();
    }
});