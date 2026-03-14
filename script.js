// New cards create karne hai, data local storage main save karna hai
// localStorage se hi cards ko show karna hai 
// buttons ko handle krna hai
// filters ko handle krna hai
// ALL VARIABLES AND DOC SELECTION.

// const tasks = [];
const container = document.querySelector(".container");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");
const addForm = document.querySelector(".addForm");
const modal = document.querySelector("#modal");
const closeForm = document.querySelector(".close");

const form = document.querySelector(".form");

const imageURL = form.querySelectorAll(".input")[0];
const fullName = form.querySelectorAll(".input")[1];
const homeTown = form.querySelectorAll(".input")[2];
const purpose = form.querySelectorAll(".input")[3];

const categoryRadios = form.querySelectorAll('input[name="category"]');

const createBtn = form.querySelector(".create");
const closeBtn = form.querySelector(".close");
const allCards = document.querySelector(".allCards");

// CODE STARTS HERE.
function saveToLocalStorage(obj) {
    if (localStorage.getItem("tasks") === null) {
        let oldTasks = [];
        oldTasks.push(obj)
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    } else {
        let oldTasks = localStorage.getItem("tasks");
        oldTasks = JSON.parse(oldTasks);
        oldTasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    }

}

addForm.addEventListener("click", function() {
    modal.classList.add("active");
    container.style.display = "none";
})

closeForm.addEventListener("click", function() {
    modal.classList.remove("active");
    container.style.display = "initial";
})

form.addEventListener("submit", function(evt) {
    evt.preventDefault();
    const checkImageURL = imageURL.value.trim(); 
    const checkFullName = fullName.value.trim();
    const checkHomeTown = homeTown.value.trim();
    const checkPurpose = purpose.value.trim();
    let selected = false;
    categoryRadios.forEach(function(cat) {
        if (cat.checked) {
            selected = cat.value;
        }
    })

    if (checkImageURL === "") {
        alert("Please Enter Your Image URL.");
        return;
    }
    if (checkFullName === "") {
        alert("Please Enter Your Full Name.");
        return;
    }
    if (checkHomeTown === "") {
        alert("Please Enter Your Hometown.");
        return;
    }
    if (checkPurpose === "") {
        alert("Please Enter Your Purpose.");
        return;
    }
    if (!selected) {
        alert("Please Select a Category")
    }

    saveToLocalStorage({
        checkImageURL,
        checkFullName,
        checkHomeTown,
        checkPurpose,
        selected,
    });

    form.reset();
    modal.classList.remove("active");
    showCards();
})


function showCards() {
    allCards.innerHTML = "";
    let allTasks = JSON.parse(localStorage.getItem("tasks"));
    allTasks.forEach(function (task) {
        // Create main card
        const card = document.createElement("div");
        card.classList.add("card");

        // Profile
        const profile = document.createElement("div");
        profile.classList.add("profile");

        const avatar = document.createElement("div");
        avatar.classList.add("avatar");
        const avatarImg = document.createElement("img");
        avatarImg.classList.add("userImg");
        // avatarImg.setAttribute("src", `${imageURL}`);
        // avatarImg.classList.add("avatar");
        // avatar.appendChild("avatarImg");
        avatarImg.setAttribute("src" , `${task.checkImageURL}`);
        avatar.appendChild(avatarImg);

        profile.appendChild(avatar);

        // Name
        const name = document.createElement("div");
        name.classList.add("name");
        name.textContent = task.checkFullName;

        // Info container
        const info = document.createElement("div");
        info.classList.add("info");

        // Home town section
        const homeTown = document.createElement("div");
        homeTown.innerHTML = `Home Town<br> <strong>${task.checkHomeTown}</strong>`;


        // Bookings section
        const bookings = document.createElement("div");
        bookings.innerHTML = `Purpose<br>
        <strong>${task.checkPurpose}</strong>
        `;

        info.appendChild(homeTown);
        info.appendChild(bookings);

        // Buttons container
        const buttons = document.createElement("div");
        buttons.classList.add("buttons");

        // Call button
        const callBtn = document.createElement("button");
        callBtn.classList.add("call");
        callBtn.textContent = "📞 Call";

        // Message button
        const messageBtn = document.createElement("button");
        messageBtn.classList.add("message");
        messageBtn.textContent = "Message";

        buttons.appendChild(callBtn);
        buttons.appendChild(messageBtn);

        // Assemble card
        card.appendChild(profile);
        card.appendChild(name);
        card.appendChild(info);
        card.appendChild(buttons);

        // Add card to page
        allCards.appendChild(card);
        // container.appendChild(allCards);
    })
}
showCards();

// next.addEventListener("click", function() {
//     const cards = document.querySelectorAll(".card");

//     if(cards.length > 1){
//         allCards.appendChild(cards[0]);
//     }
// })

// previous.addEventListener("click", function() {
//     const cards = document.querySelectorAll(".card");

//     if(cards.length > 1){
//         allCards.prepend(cards[cards.length - 1]);
//     }
// })

function updateAllCards() {
    const cards = document.querySelectorAll(".allCards .card");

    cards.forEach(function (card, index) {
        card.style.zIndex =  3 - index;
        card.style.transform =`translateY(${index * 5}px) scale(${1 - index * 0.02})`;
        // card.style.opacity = `${1 - index * 0.03}`;
    });
}

previous.addEventListener("click", function() {
    let lastChild = allCards.lastElementChild;
    if(lastChild) {
        allCards.insertBefore(lastChild, allCards.firstElementChild);

        updateAllCards();
    }
})

next.addEventListener("click", function() {
    const firstChild = allCards.firstElementChild;
    if (firstChild) {
        allCards.appendChild(firstChild);

        updateAllCards();
    }
})
