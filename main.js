const form = document.querySelector("form");
const elBtn = document.querySelector("button");
const elLogout = document.querySelector("#logOut");
const h1 = document.querySelector("h1");
const login = document.querySelector("#login");

elBtn.addEventListener("click", () => {
  fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: form.username.value,
      password: form.password.value,
    }),
  })
    .then((res) => {
      if (res.status !== 200) {
        alert("Username or Password incorrect");
      } else {
      }
      return res.json();
    })
    .then((json) => {
      localStorage.setItem("token", json.token);
      if (json && localStorage.getItem("token")) {
      }
    });
  elUsername.value = "";
  elpassword.value = "";
});
if (localStorage.getItem("token")) {
  elLogout.classList.remove("d-none");
}
// window.location.replace("./login/index.html");
elLogout.addEventListener("click", () => {
  localStorage.removeItem("token");
  elLogout.classList.add("d-none");
  h1.textContent = "Registratsiya";
  elBtn.textContent = "Saqlash";
});
