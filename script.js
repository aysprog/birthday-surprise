"use strict";

/* ==========================================================
    DOM
========================================================== */

const pages = document.querySelectorAll(".page");

const loader = document.getElementById("loader");

const nextButtons = document.querySelectorAll("[data-next]");

const prevButtons = document.querySelectorAll("[data-prev]");

const app = document.getElementById("app");

/* ==========================================================
    State
========================================================== */

let currentPage = 0;

let isAnimating = false;

/* ==========================================================
    Helpers
========================================================== */

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

/* ==========================================================
    Loader
========================================================== */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(function () {

            loader.style.opacity = "0";

            setTimeout(function () {

                loader.style.display = "none";

            }, 500);

        }, 2000);

    }

});

/* ==========================================================
    Hide All Pages
========================================================== */

function hidePages() {

    pages.forEach(page => {

        page.classList.remove("active");

    });

}

/* ==========================================================
    Show Page
========================================================== */

function showPage(index) {

    if (index < 0 || index >= pages.length) return;

    hidePages();

    currentPage = index;

    pages[currentPage].classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    saveProgress();

    if (currentPage === 2) {
        typingIndex = 0;
        typingRunning = false;
        startTyping();
    }

    if (currentPage === pages.length - 1) {
        createConfetti();
    }

}


/* ==========================================================
    Next Page
========================================================== */

function nextPage() {

    if (currentPage >= pages.length - 1) return;

    showPage(currentPage + 1);

}

/* ==========================================================
    Previous Page
========================================================== */

function previousPage() {

    if (currentPage <= 0) return;

    showPage(currentPage - 1);

}
/* ==========================================================
    Button Events
========================================================== */

const startButton = document.getElementById("startButton");

if (startButton) {
    startButton.addEventListener("click", () => {
        showPage(1);
    });
}

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const funnyText = document.getElementById("funnyText");

if (yesButton) {
    yesButton.addEventListener("click", () => {
        showPage(2);
    });
}

if (noButton) {
    noButton.addEventListener("click", () => {
        funnyText.innerHTML = "No option doesn't exist 😜";
    });
}

nextButtons.forEach(button => {

    button.addEventListener("click", () => {

        const target = button.dataset.next;

        if (target) {

            goToPage(target);

        } else {

            nextPage();

        }

    });

});

prevButtons.forEach(button => {

    button.addEventListener("click", previousPage);

});

const restartWebsite = document.getElementById("restartWebsite");

if (restartWebsite) {

    restartWebsite.addEventListener("click", () => {

        showPage(0);

    });

}

/* ==========================================================
    Go To Specific Page
========================================================== */

function goToPage(id) {

    const target = document.getElementById(id);

    if (!target) return;

    const index = [...pages].indexOf(target);

    if (index !== -1) {

        showPage(index);

    }

}

/* ==========================================================
    Keyboard Support
========================================================== */

document.addEventListener("keydown", (e) => {

    switch (e.key) {

        case "ArrowRight":

            nextPage();

            break;

        case "ArrowLeft":

            previousPage();

            break;

    }

});

/* ==========================================================
    Ripple Effect
========================================================== */

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect = this.getBoundingClientRect();

        ripple.style.left = (e.clientX - rect.left) + "px";

        ripple.style.top = (e.clientY - rect.top) + "px";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 700);

    });

});

/* ==========================================================
    Scroll Reveal
========================================================== */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("fade-in");

        }

    });

}, {

    threshold: .15

});

document.querySelectorAll(".paper-card").forEach(card => {

    observer.observe(card);

});

/* ==========================================================
    Random Utility
========================================================== */

function random(min, max) {

    return Math.random() * (max - min) + min;

}

/* ==========================================================
    Random Integer
========================================================== */

function randomInt(min, max) {

    return Math.floor(random(min, max));

}

/* ==========================================================
    Disable Image Drag
========================================================== */

document.querySelectorAll("img").forEach(img => {

    img.draggable = false;

});

/* ==========================================================
    Prevent Double Click Selection
========================================================== */

document.addEventListener("selectstart", (e) => {

    if (e.target.tagName === "IMG") {

        e.preventDefault();

    }

});

/* ==========================================================
    Resize
========================================================== */

window.addEventListener("resize", () => {

    // reserved

});

/* ==========================================================
    Init
========================================================== */

showPage(0);

console.log("Birthday Website Loaded ❤️");

/* ==========================================================
   Typewriter
========================================================== */

const typingElement = document.getElementById("typingText");

const typingMessage =
    `Happy Birthday ❤️

This little surprise
was made just for you.

I hope it makes you smile,
even for a moment.

Have the most wonderful day! 🎂✨`;

let typingIndex = 0;
let typingRunning = false;

function startTyping() {

    if (!typingElement) return;

    if (typingRunning) return;

    typingRunning = true;

    typingElement.innerHTML = "";

    typeNextCharacter();

}

function typeNextCharacter() {

    if (typingIndex >= typingMessage.length) {

        typingRunning = false;

        return;

    }

    typingElement.innerHTML += typingMessage.charAt(typingIndex);

    typingIndex++;

    setTimeout(typeNextCharacter, 35);

}


/* ==========================================================
   Start typing when page becomes visible
========================================================== */

const typingPage = document.getElementById("birthday-page");

if (typingPage) {

    const observerTyping = new MutationObserver(() => {

        if (typingPage.classList.contains("active")) {

            if (typingIndex === 0) {

                startTyping();

            }

        }

    });

    observerTyping.observe(typingPage, {
        attributes: true
    });

}

/* ==========================================================
   Gift Boxes (Flip Version)
========================================================== */

const giftBoxes = document.querySelectorAll(".gift-box");

giftBoxes.forEach((gift) => {

    gift.addEventListener("click", () => {

        gift.classList.toggle("flip");

        createFlyingHearts(gift);

    });

});
/* ==========================================================
   Popup
========================================================== */

const popup = document.getElementById("giftPopup");

const popupText = document.getElementById("popupText");

const closePopup = document.querySelector(".closePopup");

function openPopup(message) {

    if (!popup) return;

    popup.classList.add("active");

    if (popupText) {

        popupText.innerHTML = message;

    }

}

function hidePopup() {

    if (!popup) return;

    popup.classList.remove("active");

}

if (closePopup) {

    closePopup.addEventListener("click", hidePopup);

}

if (popup) {

    popup.addEventListener("click", (e) => {

        if (e.target === popup) {

            hidePopup();

        }

    });

}


/* ==========================================================
   Flying Hearts
========================================================== */

function createFlyingHearts(parent) {

    const rect = parent.getBoundingClientRect();

    for (let i = 0; i < 12; i++) {

        const heart = document.createElement("div");

        heart.className = "flying-heart";

        heart.innerHTML = "💜";

        heart.style.left =

            rect.left + rect.width / 2 + random(-40, 40) + "px";

        heart.style.top =

            rect.top + rect.height / 2 + random(-20, 20) + "px";

        heart.style.fontSize =

            random(18, 34) + "px";

        heart.style.animationDuration =

            random(2, 4) + "s";

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 4000);

    }

}


/* ==========================================================
   Button Pop Effect
========================================================== */

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", () => {

        button.classList.add("pop");

        setTimeout(() => {

            button.classList.remove("pop");

        }, 500);

    });

});


/* ==========================================================
   Birthday Cake
========================================================== */

const cake = document.querySelector(".cake-container img");

if (cake) {

    cake.addEventListener("click", () => {

        createFlyingHearts(cake);

        openPopup(

            "🎂 Happy Birthday! Hope this cake makes your day sweeter ❤️"

        );

    });

}


/* ==========================================================
   Double Click Anywhere
========================================================== */

document.addEventListener("dblclick", (e) => {

    const heart = document.createElement("div");

    heart.className = "flying-heart";

    heart.innerHTML = "💖";

    heart.style.left = e.clientX + "px";

    heart.style.top = e.clientY + "px";

    heart.style.fontSize = "30px";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 3000);

});


/* ==========================================================
   Secret Message
========================================================== */

let secretClicks = 0;

document.addEventListener("keydown", (e) => {

    if (e.key === "h") {

        secretClicks++;

    }

    if (secretClicks >= 5) {

        openPopup(

            "💜 Secret unlocked! You're awesome!"

        );

        secretClicks = 0;

    }

});


console.log("Chapter 2 Loaded 💜");


/* ==========================================================
   Gallery Viewer
========================================================== */

const galleryItems = document.querySelectorAll(".gallery-grid img");

const galleryViewer = document.getElementById("galleryViewer");

const viewerImage = document.getElementById("viewerImage");

const closeViewer = document.getElementById("closeViewer");

let currentImageIndex = 0;

function openGallery(index) {

    if (!galleryViewer) return;

    currentImageIndex = index;

    viewerImage.src = galleryItems[index].src;

    viewerImage.alt = galleryItems[index].alt || "";

    galleryViewer.classList.add("active");

    document.body.style.overflow = "hidden";

}

function closeGallery() {

    galleryViewer.classList.remove("active");

    document.body.style.overflow = "";

}

galleryItems.forEach((img, index) => {

    img.addEventListener("click", () => {

        openGallery(index);

    });

});

if (closeViewer) {

    closeViewer.addEventListener("click", closeGallery);

}

if (galleryViewer) {

    galleryViewer.addEventListener("click", (e) => {

        if (e.target === galleryViewer) {

            closeGallery();

        }

    });

}


/* ==========================================================
   Keyboard Gallery Navigation
========================================================== */

document.addEventListener("keydown", (e) => {

    if (!galleryViewer.classList.contains("active")) return;

    if (e.key === "Escape") {

        closeGallery();

    }

    if (e.key === "ArrowRight") {

        currentImageIndex++;

        if (currentImageIndex >= galleryItems.length) {

            currentImageIndex = 0;

        }

        viewerImage.src = galleryItems[currentImageIndex].src;

    }

    if (e.key === "ArrowLeft") {

        currentImageIndex--;

        if (currentImageIndex < 0) {

            currentImageIndex = galleryItems.length - 1;

        }

        viewerImage.src = galleryItems[currentImageIndex].src;

    }

});


/* ==========================================================
   Confetti
========================================================== */

function createConfetti() {

    for (let i = 0; i < 180; i++) {

        const piece = document.createElement("div");

        piece.className = "confetti-piece";

        piece.style.left = Math.random() * 100 + "vw";

        piece.style.background =

            `hsl(${Math.random() * 360},90%,65%)`;

        piece.style.width =

            random(6, 12) + "px";

        piece.style.height =

            random(10, 22) + "px";

        piece.style.animationDuration =

            random(2.5, 5) + "s";

        piece.style.animationDelay =

            random(0, .5) + "s";

        document.body.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 6000);

    }

}


/* ==========================================================
   Balloons
========================================================== */

function createBalloon() {

    const balloon = document.createElement("div");

    balloon.className = "balloon";

    const list = ["🎈", "🎈", "🎉", "🎊", "💜"];

    balloon.innerHTML =

        list[randomInt(0, list.length)];

    balloon.style.left =

        random(5, 95) + "vw";

    balloon.style.animationDuration =

        random(12, 20) + "s";

    balloon.style.fontSize =

        random(45, 70) + "px";

    document.body.appendChild(balloon);

    setTimeout(() => {

        balloon.remove();

    }, 22000);

}

setInterval(createBalloon, 2500);


/* ==========================================================
   Sparkles
========================================================== */

function createSparkle(x, y) {

    const s = document.createElement("div");

    s.innerHTML = "✨";

    s.style.position = "fixed";

    s.style.left = x + "px";

    s.style.top = y + "px";

    s.style.pointerEvents = "none";

    s.style.fontSize = random(18, 30) + "px";

    s.style.animation = "sparkle .9s forwards";

    document.body.appendChild(s);

    setTimeout(() => {

        s.remove();

    }, 900);

}

document.addEventListener("mousemove", (e) => {

    if (Math.random() < 0.03) {

        createSparkle(e.clientX, e.clientY);

    }

});


/* ==========================================================
   Celebration Button
========================================================== */

const celebrateButton = document.getElementById("celebrateBtn");

if (celebrateButton) {

    celebrateButton.addEventListener("click", () => {

        createConfetti();

        for (let i = 0; i < 15; i++) {

            setTimeout(createBalloon, i * 120);

        }

        openPopup(

            "🎉 Happy Birthday! Wishing you endless happiness and success! 💜"

        );

    });

}


/* ==========================================================
   Final Page Auto Celebration
========================================================== */

const finalPage = document.getElementById("ending-page");

if (finalPage) {

    const finalObserver = new MutationObserver(() => {

        if (finalPage.classList.contains("active")) {

            createConfetti();

        }

    });

    finalObserver.observe(finalPage, {

        attributes: true

    });

}


/* ==========================================================
   Random Stars
========================================================== */

setInterval(() => {

    const star = document.createElement("div");

    star.innerHTML = "⭐";

    star.style.position = "fixed";

    star.style.left = random(0, 100) + "vw";

    star.style.top = "-40px";

    star.style.fontSize = random(16, 26) + "px";

    star.style.pointerEvents = "none";

    star.style.transition = "4s linear";

    document.body.appendChild(star);

    requestAnimationFrame(() => {

        star.style.transform = "translateY(110vh) rotate(360deg)";

    });

    setTimeout(() => {

        star.remove();

    }, 4200);

}, 1800);

console.log("Chapter 3 Loaded 🎉");

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {

    touchStartX = e.changedTouches[0].screenX;

}, { passive: true });

document.addEventListener("touchend", (e) => {

    touchEndX = e.changedTouches[0].screenX;

    handleSwipe();

}, { passive: true });

function handleSwipe() {

    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) < 80) return;

    if (distance < 0) {

        nextPage();

    } else {

        previousPage();

    }

}


/* ==========================================================
   Save Current Page
========================================================== */

function saveProgress() {

    localStorage.setItem(

        "birthday-current-page",

        currentPage

    );

}

function restoreProgress() {

    const page = Number(

        localStorage.getItem(

            "birthday-current-page"

        )

    );

    if (!isNaN(page) && page < pages.length) {

        showPage(page);

    }

}

window.addEventListener("beforeunload", saveProgress);

/*   window.addEventListener("load", () => {

       restoreProgress();

   });
*/

/* ==========================================================
   Lazy Loading Images
========================================================== */

document.querySelectorAll("img").forEach(img => {

    img.loading = "lazy";

    img.decoding = "async";

});


/* ==========================================================
   Auto Focus Buttons
========================================================== */

document.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        const btn = document.querySelector(".page.active button");

        if (btn) {

            btn.focus();

        }

    }

});


/* ==========================================================
   Scroll To Top
========================================================== */

function scrollTopSmooth() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

/* ==========================================================
   Disable Right Click On Images
========================================================== */

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("contextmenu", (e) => {

        e.preventDefault();

    });

});


/* ==========================================================
   Keyboard Shortcuts
========================================================== */

document.addEventListener("keydown", (e) => {

    switch (e.key.toLowerCase()) {

        case "home":

            showPage(0);

            break;

        case "end":

            showPage(pages.length - 1);

            break;

    }

});


/* ==========================================================
   Random Floating Hearts
========================================================== */

setInterval(() => {

    if (Math.random() > .55) return;

    const heart = document.createElement("div");

    heart.className = "flying-heart";

    heart.innerHTML = "💖";

    heart.style.left = random(5, 95) + "vw";

    heart.style.top = "100vh";

    heart.style.fontSize = random(18, 32) + "px";

    heart.style.animationDuration = random(3, 5) + "s";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 5000);

}, 4000);

console.log("script.js Complete ✅");
