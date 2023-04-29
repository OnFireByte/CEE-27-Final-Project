const backendIPAddress = "127.0.0.1:3000";

let currentTimeStamp = 0;
let user = {
  user_id: "",
  name: "",
  img: "",
};
let course_id;

setInterval(function () {
  getChat(course_id);
}, 1000);

const authorizeApplication = () => {
  window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
};

const logout = async () => {
  window.location.href = `http://${backendIPAddress}/courseville/logout`;
};

function scrollToBottom(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollTop = element.scrollHeight;
  }
}

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
        name: data.firstname_en,
        img: data.profile_pict,
      };
      const li = document.createElement("li");
      li.classList.add("clearfix");
      if (`${fname}` == "undefined") {
        li.innerHTML = `
        <h1>Plese Login Before Using Chat</h1?
    `;
      } else {
        li.innerHTML = `
                <img src="${image}" alt="">
                <h2>${fname}</h2?
            `;
      }

      profile.appendChild(li);

      li.style.display = "flex";
      li.style.alignItems = "center";
      //login button
      const loginbt = document.querySelector(".login-button");
      const id = data.id;
      loginbt.textContent = `${id}` == "undefined" ? "Login" : `${id}`;
    })
    .catch((error) => console.error(error));

  // COURSES
  const res = await fetch(
    `http://${backendIPAddress}/courseville/get_courses`,
    options
  );
  data = await res.json();
  const chatList = document.querySelector(".chat-list ul");
  chatList.innerHTML = "";
  data.forEach((course) => {
    const { title, course_icon, cv_cid } = course;
    const li = document.createElement("li");
    li.classList.add("clearfix");
    li.setAttribute("id", cv_cid);
    li.innerHTML = `
            <img src="${course_icon}" alt="${title}">
            <div class="about">
                <div class="name">${title}</div>
            </div>
        `;
    li.addEventListener("click", async () => {
      document.getElementById(course_id).classList.remove("active");

      currentTimeStamp = 0;
      course_id = cv_cid;
      clearChat();
      document.getElementById(course_id).classList.add("active");
      await getChat(course_id);
      scrollToBottom("#chat-window");
    });
    chatList.appendChild(li);
  });

  if (data[0].length != 0) {
    course_id = data[0].cv_cid;
    getChat(course_id);
    scrollToBottom("#chat-window");
    document.getElementById(data[0].cv_cid).classList.add("active");
  }
};

async function getChat(chat_id) {
  const options = {
    method: "GET",
    credentials: "include",
  };
  const res = await fetch(
    `http://${backendIPAddress}/chat/${chat_id}/${currentTimeStamp}/`,
    options
  );
  const temp = await res.json();

  const data = temp.filter((x) => x.timestamp > currentTimeStamp);
  const chatWindow = document.querySelector("#chat-window");
  const isBottom = chatWindow.scrollTop == chatWindow.scrollHeight;

  for (message of data) {
    renderMessage(message);
  }
  if (isBottom) scrollToBottom("#chat-window");
  if (data.length != 0) currentTimeStamp = data.at(-1).timestamp;
}

const chatField = document.querySelector(".chat-field");
function renderMessage(message) {
  const li = document.createElement("li");
  li.classList.add(
    "message",
    message.user_id == user.user_id ? "self" : "other"
  );
  li.innerHTML = `
        <div class="chat-body ${
          message.user_id == user.user_id ? "self" : "other"
        }" >
            <h6>${message.name}</h6>
            <div style="display: flex; align-items: center;">
                <img src="${
                  message.img
                }" alt="User" style="display: inline-block;">
                <div class="square ${
                  message.user_id == user.user_id ? "self" : "other"
                }" style="display: inline-block;">${message.message}</div>
            </div>
        </div>
    `;
  chatField.appendChild(li);
}

function clearChat() {
  const ul = document.querySelector("ul.chat-field");
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
      chat_id: "" + course_id,
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
    // renderMessage({
    //   user_id: user.user_id,
    //   name: user.name,
    //   img: user.img,
    //   message: input.value,
    // });
    scrollToBottom("#chat-window");
    input.value = "";
  }
});
