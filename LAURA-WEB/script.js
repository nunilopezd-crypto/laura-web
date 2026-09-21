const CORRECT_PASSWORD = "1082026";

const loginScreen = document.getElementById("loginScreen");
const passwordInput = document.getElementById("passwordInput");
const enterButton = document.getElementById("enterButton");
const loginMessage = document.getElementById("loginMessage");

function unlockUniverse() {

    // Elimina cualquier espacio, barra o carácter que pueda meter el móvil
    const password = passwordInput.value
        .replace(/\D/g, "");

    if (password === CORRECT_PASSWORD) {

        loginMessage.textContent = "ACCESS GRANTED ✦";

        enterButton.textContent = "BIENVENIDA, LAURA";

        passwordInput.disabled = true;
        enterButton.disabled = true;

        setTimeout(() => {
            loginScreen.classList.add("hidden");
        }, 500);

        setTimeout(() => {
            loginScreen.style.display = "none";
        }, 1900);

    } else {

        loginMessage.textContent = "Esa no es la fecha... ♡";

        passwordInput.animate(
            [
                { transform: "translateX(-8px)" },
                { transform: "translateX(8px)" },
                { transform: "translateX(-5px)" },
                { transform: "translateX(0)" }
            ],
            {
                duration: 350
            }
        );
    }
}

enterButton.addEventListener(
    "click",
    unlockUniverse
);

passwordInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            unlockUniverse();
        }

    }
);
