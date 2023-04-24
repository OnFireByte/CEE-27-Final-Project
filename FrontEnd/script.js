const backendIPAddress = "127.0.0.1:3000";

let currentTimeStamp = 0;
let user;
let course_id = "123";

const authorizeApplication = () => {
    window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
};

const logout = async () => {
    window.location.href = `http://${backendIPAddress}/courseville/logout`;
};

const getUserProfile = async () => {
    const options = {
        method: "GET",
        credentials: "include",
    };
    // PROFILE
    await fetch(`http://${backendIPAddress}/courseville/me`, options)
        .then((response) => response.json())
        .then((data) => {
            const profile = document.querySelector(".chat-header");
            profile.innerHTML = "";
            const fname = data.firstname_en;
            const image = data.profile_pict;
            user = {
                user_id: data.uid,
                name: fname,
                img: image
            }    
            const li = document.createElement("li");
            li.classList.add("clearfix");
            li.innerHTML = `
                <img src="${image}" alt="${"Profile"}">
                <h2>${fname}</h2?
            `;
            profile.appendChild(li);

            li.style.display = "flex";
            li.style.alignItems = "center";
        })
        .catch((error) => console.error(error));

    // COURSES
    const res = await fetch(`http://${backendIPAddress}/courseville/get_courses`, options);
    const data = await res.json();
    // console.log(data);
    const chatList = document.querySelector(".chat-list ul");
    chatList.innerHTML = "";
    data.forEach(course => {
        const { title, course_icon, cv_cid } = course;
        const state = 0;
        const lastMessage = {
            userId: "1",
            fname: "Neo",
            imageProfile: "https://scontent.fbkk22-4.fna.fbcdn.net/v/t39.30808-6/315982233_2209647319214449_3417131465598011782_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFVEK9R6K9ijG3YcQzqWYn9aVa_1qnKR2lpVr_WqcpHaSQvVLc_Sbr21FQ7OhAsRw0AQaJX3RbN1n9HJIYkS1w8&_nc_ohc=xUlzjVA5iTQAX9GUHxa&_nc_zt=23&_nc_ht=scontent.fbkk22-4.fna&oh=00_AfBTYa_MkcgnQwE7fthLsIVwrq6MXoxdr_gysGM-IHKx5A&oe=64466E8A",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula id dolor dictum elementum a quis lacus. Nunc et odio risus. Proin a tincidunt felis, at vehicula nunc.",
            imageMessage: null,
            time: "10:30 AM",
            type: "text"
        };
        const li = document.createElement("li");
        li.classList.add("clearfix");
        if (state) {
            li.classList.add("active");
        }
        if(lastMessage.imageMessage == null){
            li.innerHTML = `
                <img src="${course_icon}" alt="${title}">
                <div class="about">
                    <div class="name">${title}</div>
                    <div class="last-message"><p>${lastMessage.fname} : ${lastMessage.message.substring(0, 20)}${lastMessage.message.length > 20 ? "..." : ""}  ${lastMessage.time}</p></div>
                </div>
            `;
        }
        else{
            li.innerHTML = `
                <img src="${course_icon}" alt="${title}">
                <div class="about">
                    <div class="name">${title}</div>
                    <div class="last-message"><p>${lastMessage.fname} sent a photo.</p></div>
                </div>
                <span class="time">${time}</span>
            `;
        }
        li.addEventListener("click", () => {
            //course_id = cv_cid;
            clearChat();
            getChat(course_id);
        });
        chatList.appendChild(li);
    });
};

async function getChat (chat_id) {
    const options = {
        method: "GET",
        credentials: "include",
    };
    const res = await fetch(`http://${backendIPAddress}/chat/${chat_id}`, options);
    const data = await res.json();
    console.log(data);
    const chatbox = document.getElementById("chat");
    // if (data.at(-1).timestamp < currentTimeStamp) {
    //     chatbox.innerHTML = "";
    // }
    for (message of data) {
        renderMessage(message)
    }
    currentTimeStamp = data.at(-1).timestamp;
};

const chatField = document.querySelector(".chat-field");
function renderMessage(message) {
    const li = document.createElement("li");
    li.classList.add("message", message.user_id == user.user_id ? "self" : "other");
    //const content = message.type === "image" ? "image" : message.message;
    li.innerHTML = `
        <div class="chat-body ${message.user_id == user.user_id ? "self" : "other"}" >
            <h6>${message.name}</h6>
            <div style="display: flex; align-items: center;">
                <img src="${message.img}" alt="User" style="display: inline-block;">
                <div class="square ${message.user_id == user.user_id ? 'self' : 'other'}" style="display: inline-block;">${message.message}</div>
            </div>
        </div>
    `;
    //console.log(message.userId, user.userId);
    // if (message.type === "image") {
    //     const img = document.createElement("img");
    //     img.src = message.content;
    //     li.appendChild(img);
    // }
    chatField.appendChild(li);    
}

function clearChat(){
    const ul = document.querySelector('ul.chat-field');
    while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
    }
}

const form = document.querySelector(".chat-footer");
const input = form.querySelector("input");
const button = form.querySelector("button");
button.addEventListener("click", (event) => {
    event.preventDefault();

    const content = input.value;
    if (content.trim() !== "") {
        const itemData = {
            message: input.value,
            chat_id: course_id,
        };
        const options = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(itemData),
        };
        fetch(`http://${backendIPAddress}/chat/`, options);
        renderMessage({
            user_id: user.user_id,
            name: user.name,
            img: user.img,
            message: input.value
        });
        input.value = "";
    }
});