"use strict";

const messageSystem = {
  startFetching() {
  },

  sendMessage(msg) {
    // https://thecrew.cc/api/message/create.php?token=__TOKEN__ POST
  },

  fetchMessages() {
    // https://thecrew.cc/api/message/read.php?token=__TOKEN__ GET
    fetch(`https://thecrew.cc/api/message/read.php?token=` + userSystem.token)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
  }
};

const userSystem = {
  token: "",
  loggedIn: false,

  checkToken() {
    const localToken = this.getToken();
    if (localToken !== null) {
      this.token = localToken;
      messageSystem.fetchMessages();
      const removeScreen = document.getElementById("loginWindow");
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
