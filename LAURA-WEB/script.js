/* =====================================================
   CONTRASEÑA
===================================================== */

const CORRECT_PASSWORD = "10/8/2026";

const loginScreen =
    document.getElementById("loginScreen");

const passwordInput =
    document.getElementById("passwordInput");

const enterButton =
    document.getElementById("enterButton");

const loginMessage =
    document.getElementById("loginMessage");


function unlockUniverse() {

    const password =
        passwordInput.value.trim();

    if (password === CORRECT_PASSWORD) {

        loginMessage.textContent =
            "ACCESS GRANTED ✦";

        enterButton.textContent =
            "BIENVENIDA, LAURA";

        passwordInput.disabled = true;

        enterButton.disabled = true;

        setTimeout(() => {

            loginScreen.classList.add(
                "hidden"
            );

        }, 500);

        setTimeout(() => {

            loginScreen.style.display =
                "none";

        }, 1900);

    } else {

        loginMessage.textContent =
            "Esa no es la fecha... ♡";

        passwordInput.animate(
            [
                {
                    transform:
                        "translateX(-8px)"
                },
                {
                    transform:
                        "translateX(8px)"
                },
                {
                    transform:
                        "translateX(-5px)"
                },
                {
                    transform:
                        "translateX(0)"
                }
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


/* =====================================================
   CANVAS
===================================================== */

const canvas =
    document.getElementById("universe");

const ctx =
    canvas.getContext("2d");

let width =
    window.innerWidth;

let height =
    window.innerHeight;

let centerX =
    width / 2;

let centerY =
    height / 2;


function resize() {

    width =
        window.innerWidth;

    height =
        window.innerHeight;

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;

    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    centerX =
        width / 2;

    centerY =
        height / 2;
}


window.addEventListener(
    "resize",
    resize
);

resize();


/* =====================================================
   UTILIDADES
===================================================== */

function randomRange(
    min,
    max
) {
    return min +
        Math.random() *
        (max - min);
}


function clamp(
    value,
    min,
    max
) {
    return Math.max(
        min,
        Math.min(
            max,
            value
        )
    );
}


/* =====================================================
   ESTRELLAS
===================================================== */

const stars = [];

for (
    let i = 0;
    i < 260;
    i++
) {

    stars.push({

        x: Math.random(),

        y: Math.random(),

        size:
            randomRange(
                0.4,
                1.5
            ),

        alpha:
            randomRange(
                0.2,
                0.9
            ),

        phase:
            Math.random() *
            Math.PI *
            2,

        speed:
            randomRange(
                0.0003,
                0.001
            )

    });
}


/* =====================================================
   ESTRELLAS FUGACES
===================================================== */

const shootingStars = [];


function createShootingStar() {

    shootingStars.push({

        x:
            Math.random() *
            width,

        y:
            Math.random() *
            height *
            0.6,

        length:
            randomRange(
                60,
                150
            ),

        speed:
            randomRange(
                5,
                9
            ),

        life: 0,

        maxLife:
            randomRange(
                35,
                70
            )

    });
}


setInterval(
    () => {

        if (
            Math.random() >
            0.35
        ) {
            createShootingStar();
        }

    },
    3000
);


/* =====================================================
   FLOR
===================================================== */

const FLOWER_COUNT = 5000;

const PETAL_COUNT = 5;

const flowerParticles = [];


function createFlowerParticle() {

    const isCenter =
        Math.random() < 0.16;

    let x;
    let y;

    if (isCenter) {

        const angle =
            Math.random() *
            Math.PI *
            2;

        const radius =
            Math.pow(
                Math.random(),
                0.6
            ) * 0.42;

        x =
            Math.cos(angle) *
            radius;

        y =
            Math.sin(angle) *
            radius;

    } else {

        const petal =
            Math.floor(
                Math.random() *
                PETAL_COUNT
            );

        const petalAngle =
            petal *
            (
                Math.PI *
                2 /
                PETAL_COUNT
            );

        const angularSpread =
            randomRange(
                -0.46,
                0.46
            );

        const distance =
            0.13 +
            Math.pow(
                Math.random(),
                0.55
            ) *
            0.87;

        const petalWidth =
            Math.sin(
                clamp(
                    distance,
                    0,
                    1
                ) *
                Math.PI
            );

        const sideOffset =
            randomRange(
                -1,
                1
            ) *
            petalWidth *
            0.34;

        const dirX =
            Math.cos(
                petalAngle
            );

        const dirY =
            Math.sin(
                petalAngle
            );

        const perpX =
            -Math.sin(
                petalAngle
            );

        const perpY =
            Math.cos(
                petalAngle
            );

        x =
            dirX *
                distance +
            perpX *
                sideOffset;

        y =
            dirY *
                distance +
            perpY *
                sideOffset;
    }

    return {

        x,

        y,

        z:
            randomRange(
                -0.30,
                0.30
            ),

        size:
            randomRange(
                0.65,
                1.55
            ),

        alpha:
            randomRange(
                0.55,
                1
            ),

        phase:
            Math.random() *
            Math.PI *
            2,

        drift:
            randomRange(
                0.00002,
                0.00008
            )

    };
}


for (
    let i = 0;
    i < FLOWER_COUNT;
    i++
) {

    flowerParticles.push(
        createFlowerParticle()
    );

}


/* =====================================================
   ROTACIÓN 3D
===================================================== */

let rotationX = -0.08;

let rotationY = 0;

let targetRotationX =
    rotationX;

let targetRotationY =
    rotationY;


function rotate3D(
    x,
    y,
    z
) {

    const cosY =
        Math.cos(
            rotationY
        );

    const sinY =
        Math.sin(
            rotationY
        );

    const x1 =
        x * cosY -
        z * sinY;

    const z1 =
        x * sinY +
        z * cosY;

    const cosX =
        Math.cos(
            rotationX
        );

    const sinX =
        Math.sin(
            rotationX
        );

    const y1 =
        y * cosX -
        z1 * sinX;

    const z2 =
        y * sinX +
        z1 * cosX;

    return {
        x: x1,
        y: y1,
        z: z2
    };
}


/* =====================================================
   FONDO
===================================================== */

function drawBackground() {

    ctx.fillStyle =
        "#000000";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );

    const time =
        performance.now();

    for (
        const star of stars
    ) {

        const twinkle =
            Math.sin(
                time *
                    star.speed +
                star.phase
            ) *
            0.25;

        ctx.globalAlpha =
            clamp(
                star.alpha +
                    twinkle,
                0.05,
                1
            );

        ctx.fillStyle =
            "#ffffff";

        ctx.beginPath();

        ctx.arc(
            star.x * width,
            star.y * height,
            star.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    ctx.globalAlpha = 1;
}


/* =====================================================
   ESTRELLAS FUGACES
===================================================== */

function drawShootingStars() {

    for (
        let i =
            shootingStars.length - 1;
        i >= 0;
        i--
    ) {

        const star =
            shootingStars[i];

        star.x +=
            star.speed;

        star.y +=
            star.speed *
            0.45;

        star.life++;

        const alpha =
            1 -
            star.life /
                star.maxLife;

        ctx.globalAlpha =
            alpha;

        ctx.strokeStyle =
            "#ffffff";

        ctx.lineWidth = 1;

        ctx.beginPath();

        ctx.moveTo(
            star.x,
            star.y
        );

        ctx.lineTo(
            star.x -
                star.length,
            star.y -
                star.length *
                0.45
        );

        ctx.stroke();

        if (
            star.life >=
            star.maxLife
        ) {

            shootingStars.splice(
                i,
                1
            );
        }
    }

    ctx.globalAlpha = 1;
}


/* =====================================================
   DIBUJAR FLOR
===================================================== */

function drawFlower(time) {

    const projected = [];

    const flowerSize =
        Math.min(
            width,
            height
        ) * 0.34;

    for (
        const particle
        of flowerParticles
    ) {

        const movementX =
            Math.cos(
                time *
                    particle.drift +
                particle.phase
            ) *
            0.0015;

        const movementY =
            Math.sin(
                time *
                    particle.drift +
                particle.phase
            ) *
            0.0015;

        const breathing =
            1 +
            Math.sin(
                time *
                    0.0007 +
                particle.phase
            ) *
            0.004;

        const rotated =
            rotate3D(
                (
                    particle.x +
                    movementX
                ) * breathing,

                (
                    particle.y +
                    movementY
                ) * breathing,

                particle.z
            );

        const perspective =
            1 /
            (
                1 -
                rotated.z *
                    0.42
            );

        projected.push({

            x:
                centerX +
                rotated.x *
                    flowerSize *
                    perspective,

            y:
                centerY +
                rotated.y *
                    flowerSize *
                    perspective,

            z:
                rotated.z,

            size:
                particle.size *
                perspective,

            alpha:
                particle.alpha *
                clamp(
                    0.72 +
                        rotated.z *
                        0.5,
                    0.35,
                    1
                )

        });
    }

    projected.sort(
        (a, b) =>
            a.z - b.z
    );

    for (
        const particle
        of projected
    ) {

        ctx.globalAlpha =
            particle.alpha;

        ctx.fillStyle =
            "#ffd83d";

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    ctx.globalAlpha = 1;
}


/* =====================================================
   POLVO
===================================================== */

const dust = [];

for (
    let i = 0;
    i < 350;
    i++
) {

    dust.push({

        angle:
            Math.random() *
            Math.PI *
            2,

        radius:
            randomRange(
                0.4,
                1.2
            ),

        size:
            randomRange(
                0.3,
                1
            ),

        alpha:
            randomRange(
                0.08,
                0.4
            )

    });
}


function drawDust(time) {

    const maxRadius =
        Math.min(
            width,
            height
        ) * 0.48;

    for (
        const particle
        of dust
    ) {

        const angle =
            particle.angle +
            time *
            0.000015;

        const radius =
            particle.radius *
            maxRadius;

        const x =
            centerX +
            Math.cos(angle) *
            radius;

        const y =
            centerY +
            Math.sin(angle) *
            radius *
            0.65;

        ctx.globalAlpha =
            particle.alpha;

        ctx.fillStyle =
            "#ffd83d";

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    ctx.globalAlpha = 1;
}


/* =====================================================
   FOTOS
===================================================== */

const PHOTOS = [

    "fotos/''''''.jpeg",

    "fotos/0000.jpeg",

    "fotos/09909.jpeg",

    "fotos/ppppp.jpeg",

    "fotos/WhatsApp Image 2026-09-20 at 19.42.35.jpeg",

    "fotos/WhatsApp Image 2026-09-21 at 21.54.39.jpeg",

    "fotos/WhatsApp Image 2026-09-21 at 21.54.40.jpeg",

    "fotos/WhatsApp Image 2026-09-21 at 21.54.40999.jpeg",

    "fotos/`'''000'.jpeg",

    "fotos/````.jpeg"

];


const photoPlanets =
    document.getElementById(
        "photoPlanets"
    );

const photoElements = [];


PHOTOS.forEach(
    (src, index) => {

        const planet =
            document.createElement(
                "div"
            );

        planet.className =
            "photo-planet";

        planet.dataset.index =
            index;

        const img =
            document.createElement(
                "img"
            );

        img.src = src;

        img.alt =
            "Nuestro recuerdo";

        img.draggable = false;

        planet.appendChild(
            img
        );

        photoPlanets.appendChild(
            planet
        );


        /* =================================
           CLIC EN FOTO
        ================================= */

        planet.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                openMemory(
                    src,
                    index
                );

            }
        );


        photoElements.push({

            element: planet,

            angle:
                (
                    Math.PI *
                    2 /
                    PHOTOS.length
                ) *
                index,

            orbit:
                0.82 +
                (
                    index % 3
                ) *
                0.15,

            speed:
                0.00010 +
                (
                    index % 4
                ) *
                0.000025,

            tilt:
                (
                    index % 3 -
                    1
                ) *
                0.35

        });

    }
);


/* =====================================================
   ACTUALIZAR ÓRBITAS
===================================================== */

function updatePhotoPlanets(
    time
) {

    const baseOrbit =
        Math.min(
            width,
            height
        ) * 0.38;


    for (
        let i = 0;
        i < photoElements.length;
        i++
    ) {

        const item =
            photoElements[i];

        const angle =
            item.angle +
            time *
            item.speed;

        const radius =
            baseOrbit *
            item.orbit;

        const x =
            Math.cos(angle) *
            radius;

        const y =
            Math.sin(angle) *
            radius *
            (
                0.58 +
                item.tilt *
                0.12
            );

        const z =
            Math.sin(angle) *
            radius *
            0.75;


        const rotated =
            rotate3D(
                x / baseOrbit,
                y / baseOrbit,
                z / baseOrbit
            );


        const depth =
            clamp(
                1 +
                    rotated.z *
                    0.28,
                0.72,
                1.28
            );


        const screenX =
            centerX +
            rotated.x *
            baseOrbit;

        const screenY =
            centerY +
            rotated.y *
            baseOrbit;


        item.element.style.left =
            screenX + "px";

        item.element.style.top =
            screenY + "px";


        item.element.style.transform =
            `translate(-50%, -50%) scale(${depth})`;


        item.element.style.opacity =
            clamp(
                0.55 +
                    rotated.z *
                    0.38,
                0.42,
                1
            );


        item.element.style.zIndex =
            String(
                500 +
                Math.round(
                    (
                        rotated.z +
                        1
                    ) *
                    100
                )
            );

    }
}


/* =====================================================
   MODAL
===================================================== */

const memory =
    document.getElementById(
        "memory"
    );

const memoryPhoto =
    document.getElementById(
        "memoryPhoto"
    );

const memoryTitle =
    document.getElementById(
        "memoryTitle"
    );

const memoryText =
    document.getElementById(
        "memoryText"
    );

const memoryDate =
    document.getElementById(
        "memoryDate"
    );

const closeMemory =
    document.getElementById(
        "closeMemory"
    );


function openMemory(
    src,
    index
) {

    memoryPhoto.src =
        src;

    memoryTitle.textContent =
        "Nuestro recuerdo ♡";

    memoryText.textContent =
        "Cada momento contigo forma parte de nuestro pequeño universo.";

    memoryDate.textContent =
        "PARA SIEMPRE";

    memory.classList.add(
        "show"
    );

    document.body.style.overflow =
        "hidden";
}


function closeMemoryModal() {

    memory.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";
}


closeMemory.addEventListener(
    "click",
    event => {

        event.preventDefault();

        event.stopPropagation();

        closeMemoryModal();

    }
);


memory.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            memory
        ) {

            closeMemoryModal();

        }

    }
);


/* =====================================================
   ROTAR FLOR CON RATÓN / DEDO
===================================================== */

let dragging = false;

let lastPointerX = 0;

let lastPointerY = 0;


canvas.addEventListener(
    "pointerdown",
    event => {

        dragging = true;

        lastPointerX =
            event.clientX;

        lastPointerY =
            event.clientY;

        canvas.setPointerCapture(
            event.pointerId
        );

    }
);


canvas.addEventListener(
    "pointermove",
    event => {

        if (!dragging) {
            return;
        }

        const dx =
            event.clientX -
            lastPointerX;

        const dy =
            event.clientY -
            lastPointerY;

        targetRotationY +=
            dx * 0.006;

        targetRotationX +=
            dy * 0.006;

        targetRotationX =
            clamp(
                targetRotationX,
                -1.2,
                1.2
            );

        lastPointerX =
            event.clientX;

        lastPointerY =
            event.clientY;

    }
);


canvas.addEventListener(
    "pointerup",
    event => {

        dragging = false;

        try {

            canvas.releasePointerCapture(
                event.pointerId
            );

        } catch {}

    }
);


canvas.addEventListener(
    "pointercancel",
    () => {

        dragging = false;

    }
);


/* =====================================================
   ANIMACIÓN
===================================================== */

function animate(time) {

    rotationX +=
        (
            targetRotationX -
            rotationX
        ) *
        0.06;

    rotationY +=
        (
            targetRotationY -
            rotationY
        ) *
        0.06;


    drawBackground();

    drawDust(time);

    drawFlower(time);

    drawShootingStars();

    updatePhotoPlanets(time);


    requestAnimationFrame(
        animate
    );
}


requestAnimationFrame(
    animate
);