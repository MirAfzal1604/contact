var nick = document.querySelector("#name");
var number = document.querySelector("#number");
var btn = document.querySelector(".btn");

var allMessage = document.querySelector(".allMessage");

var myList = [];
var selectedContactIndex = -1;
var storage = window.localStorage;

loadFromStorage();

btn.addEventListener("click", () => {
    var nameValue = nick.value.trim();
    var numberValue = number.value.trim();

    if (nameValue.length > 0 && numberValue.length > 0) {

        myList.push({
            nick: nameValue,
            tel: numberValue,
            remove: false
        });

        refreshContacts();

        nick.value = "";
        number.value = "";
    }

})

function refreshContacts() {
    var html = "";

    for (var index in myList) {
        var item = myList[index];
        html += `
        <div onclick="showContact(${index})" class="message ${index == selectedContactIndex ? "selected" : ""}">
            <p class="name">${item.nick}</p>
            <p class="number">${item.tel}</p>
            <i class="fas fa-trash" onclick="deleteItem(${index})"></i>
        </div>  
        `
    }

    allMessage.innerHTML = html;
    storage.setItem("myList", JSON.stringify(myList));
}

function deleteItem(index) {
    myList.splice(index, 1);

    refreshContacts();
}

function loadFromStorage() {
    var data = storage.getItem("myList");

    if (data != null) {
        myList = JSON.parse(data);

        refreshContacts();
    }
}

var getNick = document.querySelector("#getNick");
var getNumber = document.querySelector("#getNumber");


function showContact(index) {
    selectedContactIndex = index;
    refreshContactDetails();
    refreshContacts();
}

function refreshContactDetails() {
    getNick.innerHTML = myList[selectedContactIndex].nick;
    getNumber.innerHTML = myList[selectedContactIndex].tel;
}