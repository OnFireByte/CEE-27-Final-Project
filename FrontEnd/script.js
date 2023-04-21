// getProfileUser(userId)
const user = {
    userId: "4",
    fname: "Nasmeen",
    image: "https://scontent.fbkk22-8.fna.fbcdn.net/v/t39.30808-6/337699838_218151764202341_7243774399398942615_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEOqiylVCSDVBVQefcyaE3XqgVg00B9XgeqBWDTQH1eBzdB3laYUtsH6tObcjmhcwgB8Wk0L3W9eQPCqJSNxUGD&_nc_ohc=4YRcdj1LvJ4AX-HQ5wz&_nc_zt=23&_nc_ht=scontent.fbkk22-8.fna&oh=00_AfDFmS3v2uABjVOR_aYmBP9Qw5x2Uu99ItPXv5VAUSHj-g&oe=644768F4"
};

// getMessageList(userId, courseId) : Messages in each courses
const messageList = [
    {
        userId: "1",
        fname: "Neo",
        imageProfile: "https://scontent.fbkk22-4.fna.fbcdn.net/v/t39.30808-6/315982233_2209647319214449_3417131465598011782_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFVEK9R6K9ijG3YcQzqWYn9aVa_1qnKR2lpVr_WqcpHaSQvVLc_Sbr21FQ7OhAsRw0AQaJX3RbN1n9HJIYkS1w8&_nc_ohc=xUlzjVA5iTQAX9GUHxa&_nc_zt=23&_nc_ht=scontent.fbkk22-4.fna&oh=00_AfBTYa_MkcgnQwE7fthLsIVwrq6MXoxdr_gysGM-IHKx5A&oe=64466E8A",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula id dolor dictum elementum a quis lacus. Nunc et odio risus. Proin a tincidunt felis, at vehicula nunc.",
        imageMessage: null,
        time: "10:30 AM",
        type: "text"
    },
    {
        userId: "2",
        fname: "Byte",
        imageProfile: "https://via.placeholder.com/50",
        message: "What?",
        imageMessage: null,
        time: "10:31 AM",
        type: "text"
    },
    {
        userId: "3",
        fname: "Oak",
        imageProfile: "https://via.placeholder.com/50",
        message: "Vestibulum in ligula id dolor dictum elementum a quis lacus. Nunc et odio risus. Proin a tincidunt felis, at vehicula nunc.",
        imageMessage: null,
        time: "10:35 AM",
        type: "text"
    }
];

// getcourse(userId) : Course with the lasted chats for each course 
const courses = [
    {
        courseId: "1",
        name: "Prog Meth",
        image: "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/icon_eclipse_green.png",
        state: true,
        lastMessage: messageList[0]
    },
    {
        courseId: "2",
        name: "Com Eng Ess",
        image: "https://mycourseville-default.s3.ap-southeast-1.amazonaws.com/useruploaded_course_files/2021_2/27352/course_icon/icon_cee_2022-1-16418931038922.png",
        state: false,
        lastMessage: messageList[1]  
    },
    {
        courseId: "3",
        name: "Gen Phys 2",
        image: "https://mycourseville-default.s3.ap-southeast-1.amazonaws.com/useruploaded_course_files/2022_1/31104/course_icon/2304104-172879-16711638496707.svg",
        state: false,
        lastMessage: messageList[2]
    },
];

function renderprofile(user) {
    const profile = document.querySelector(".chat-header");
    profile.innerHTML = "";
    const { fname, image } = user;
    const li = document.createElement("li");
    li.classList.add("clearfix");
    li.innerHTML = `
        <img src="${image}" alt="${"Profile"}">
        <h2>${fname}</h2?
    `;
    profile.appendChild(li);

    li.style.display = "flex";
    li.style.alignItems = "center";
};

function renderChatList(list) {
    const chatList = document.querySelector(".chat-list ul");
    chatList.innerHTML = "";
    list.forEach(course => {
        const { name, image, state, lastMessage } = course;
        const li = document.createElement("li");
        li.classList.add("clearfix");
        if (state) {
            li.classList.add("active");
        }
        if(lastMessage.imageMessage == null){
            li.innerHTML = `
                <img src="${image}" alt="${name}">
                <div class="about">
                    <div class="name">${name}</div>
                    <div class="last-message"><p>${lastMessage.fname} : ${lastMessage.message.substring(0, 20)}${lastMessage.message.length > 20 ? "..." : ""}  ${lastMessage.time}</p></div>
                </div>
            `;
        }
        else{
            li.innerHTML = `
                <img src="${image}" alt="${name}">
                <div class="about">
                    <div class="name">${name}</div>
                    <div class="last-message"><p>${lastMessage.fname} sent a photo.</p></div>
                </div>
                <span class="time">${time}</span>
            `;
        }
        li.addEventListener("click", () => {
            // getMessageList(userId, courseId)
            // for(message of messageList){
            //     renderMessage(message);
            // }
        });
        chatList.appendChild(li);
    });
}
  
const chatField = document.querySelector(".chat-field");
function renderMessage(message) {
    const li = document.createElement("li");
    li.classList.add("message", message.userId == user.userId ? "self" : "other");
    const content = message.type === "image" ? "image" : message.message;
    li.innerHTML = `
        <div class="chat-body ${message.userId == user.userId ? "self" : "other"}" >
            <h6>${message.fname}</h6>
            <div style="display: flex; align-items: center;">
                <img src="${message.imageProfile}" alt="User" style="display: inline-block;">
                <div class="square ${message.userId == user.userId ? 'self' : 'other'}" style="display: inline-block;">${content}</div>
            </div>
        </div>
    `;
    console.log(message.userId, user.userId);
    if (message.type === "image") {
        const img = document.createElement("img");
        img.src = message.content;
        li.appendChild(img);
    }
    chatField.appendChild(li);    
}

const form = document.querySelector(".chat-footer");
const input = form.querySelector("input");
const button = form.querySelector("button");
button.addEventListener("click", (event) => {
    event.preventDefault();
    const content = input.value;
    if (content.trim() !== "") {
        // postMessage(userId ,courseId ,message)
        const message = {
            userId: user.userId,
            fname: user.fname,
            imageProfile: user.image,
            message: content,
            imageMessage: null,
            time: "",
            type: "text"
        }
        renderMessage(message);
        input.value = "";
    }
});

renderprofile(user);
renderChatList(courses);
for(message of messageList){
    renderMessage(message);
}