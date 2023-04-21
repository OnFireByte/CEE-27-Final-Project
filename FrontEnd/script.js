const user = {
    fname: "Nasmeen",
    image: "https://scontent.fbkk22-8.fna.fbcdn.net/v/t39.30808-6/337699838_218151764202341_7243774399398942615_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEOqiylVCSDVBVQefcyaE3XqgVg00B9XgeqBWDTQH1eBzdB3laYUtsH6tObcjmhcwgB8Wk0L3W9eQPCqJSNxUGD&_nc_ohc=4YRcdj1LvJ4AX-HQ5wz&_nc_zt=23&_nc_ht=scontent.fbkk22-8.fna&oh=00_AfDFmS3v2uABjVOR_aYmBP9Qw5x2Uu99ItPXv5VAUSHj-g&oe=644768F4"
}

const chatList = [
    {
        name: "Prog Meth",
        image: "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/icon_eclipse_green.png",
        state: true,
        lastMessage: {
            fname: "Neo",
            imageProfile: "https://via.placeholder.com/50",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula id dolor dictum elementum a quis lacus. Nunc et odio risus. Proin a tincidunt felis, at vehicula nunc.",
            imageMessage: null,
            time: "10:30 AM"
        },
        time: "10:30 AM"
    },
    {
        name: "Com Eng Ess",
        image: "https://mycourseville-default.s3.ap-southeast-1.amazonaws.com/useruploaded_course_files/2021_2/27352/course_icon/icon_cee_2022-1-16418931038922.png",
        state: false,
        lastMessage: {
                fname: "Oak",
                imageProfile: "https://via.placeholder.com/50",
                message: "Vestibulum in ligula id dolor dictum elementum a quis lacus. Nunc et odio risus. Proin a tincidunt felis, at vehicula nunc.",
                imageMessage: null,
                time: "10:30 AM"
        },      
        time: "Yesterday"
    },
    {
        name: "Gen Phys 2",
        image: "https://mycourseville-default.s3.ap-southeast-1.amazonaws.com/useruploaded_course_files/2022_1/31104/course_icon/2304104-172879-16711638496707.svg",
        state: false,
        lastMessage:{
                fname: "Byte",
                imageProfile: "https://via.placeholder.com/50",
                message: "asd",
                imageMessage: "123",
                time: "10:30 AM"
        },
        time: "Monday"
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
}

function renderChatList(list) {
    const chatList = document.querySelector(".chat-list ul");
    chatList.innerHTML = "";
    list.forEach(chatUser => {
        const { name, image, state, lastMessage, time } = chatUser;
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
                    <div class="last-message"><p>${lastMessage.fname} : ${lastMessage.message.substring(0, 20)}${lastMessage.message.length > 20 ? "..." : ""}</p></div>
                </div>
                <span class="time">${time}</span>
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
            // TODO
            
        });
        chatList.appendChild(li);
    });
}
  
renderprofile(user);
renderChatList(chatList);