"use strict";

const messageSystem = {
  startFetching() {
    setInterval(() => {
      this.fetchMessages();
    }, 1000);
  },

  sendMessage(msg) {
    // https://thecrew.cc/api/message/create.php?token=__TOKEN__ POST
    fetch(`https://thecrew.cc/api/message/create.php?token=`+ userSystem.token, {
      method: 'POST',
      body: JSON.stringify({
      message : msg
      })
    })
    .then(response => response.json())
    .then(data=> {
      console.log(data);
      this.fetchMessages();
    });
  },

  fetchMessages() {
    // https://thecrew.cc/api/message/read.php?token=__TOKEN__ GET
    fetch(`https://thecrew.cc/api/message/read.php?token=` + userSystem.token)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.forEach(data => {
        const bericht = `<div class="message">
        <span class="by">${data.handle}</span>
        <span class="on">${data.created_at}</span>
        <p>${data.message}</p>
      </div>`;
      console.log(data.message);
      document.getElementById("output").insertAdjacentHTML("beforeend", bericht);
    });
    // const time = document.getElementsByClassName("on");
    // console.log(time);
    // time.sort((a,b)=> b-a);
    // console.log("sorted", time);
    });
  }
};

const userSystem = {
  token: "",
  loggedIn: false,

  checkToken() {
    const localToken = this.getToken();
    const removeScreen = document.getElementById("loginWindow");
    if (localToken !== null) {
      this.token = localToken;
      messageSystem.fetchMessages();
      removeScreen.style.display = "none";
    }
  },

  saveToken() {
    localStorage.setItem("token", this.token);
  },

  getToken() {
    return localStorage.getItem("token");
  },

  logout() { 
    localStorage.removeItem("token");
  },

  login(email, password) {
    // https://thecrew.cc/api/user/login.php POST
    fetch('https://thecrew.cc/api/user/login.php',{
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => {
      return response.json();
    })
    .then(loginData => {
      this.token = loginData.token;
      messageSystem.fetchMessages();
      this.saveToken();
    });

  },

  updateUser(password, handle) {
    // https://thecrew.cc/api/user/update.php?token=__TOKEN__ POST
  }
};

const display = {
  initFields() {
    const loginInput = document.getElementById("loginForm");
    loginInput.addEventListener("submit", this.submitHandler);
    const writeMsg = document.getElementById("output");
    writeMsg.addEventListener("submit", this.submitHandler);
  },
  submitHandler(event){
    event.preventDefault();
    const email = document.getElementById("emailField");
    const pass = document.getElementById("passwordField");
    const userEmail = email.value;
    const userPassword = pass.value;
    // console.log(userEmail, userPassword);
    userSystem.login(userEmail, userPassword);

  },
};

  display.initFields();
  userSystem.checkToken();
