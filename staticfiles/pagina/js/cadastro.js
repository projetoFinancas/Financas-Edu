lucide.createIcons();

const signinBtn = document.querySelector("#sign-in-btn"),
signupBtn = document.querySelector("#sign-up-btn"),
container = document.querySelector(".container");
const signinBtn2 = document.querySelector("#sign-in-btn2"),
signupBtn2 = document.querySelector("#sign-up-btn2");

signupBtn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

signinBtn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

signupBtn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});

signinBtn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
});
