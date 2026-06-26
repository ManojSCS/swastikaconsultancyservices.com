/*=========================================
    SWASTIKA CONSULTANCY SERVICES
    SCRIPT.JS - PART 1
=========================================*/

/*==========================
    STICKY NAVBAR
==========================*/

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.style.background = "#ffffff";
        header.style.boxShadow = "0 8px 20px rgba(0,0,0,.08)";
        header.style.padding = "0px";

    } else {

        header.style.background = "#ffffff";
        header.style.boxShadow = "none";

    }

});


/*==========================
    MOBILE MENU
==========================*/

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


/*==========================
    SMOOTH SCROLL
==========================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


/*==========================
    ACTIVE MENU
==========================*/

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/*==========================
    BACK TO TOP BUTTON
==========================*/

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.pageYOffset > 300) {

        topBtn.style.display = "flex";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/*==========================
    NAVBAR CLOSE
==========================*/

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


/*==========================
    CONSOLE MESSAGE
==========================*/

console.log("Swastika Consultancy Services Website Loaded Successfully");
/*=========================================
    SCRIPT.JS - PART 2
=========================================*/

/*==========================
      ANIMATED COUNTERS
==========================*/

const counters = document.querySelectorAll(".stat-box h2");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;

            const text = counter.innerText;

            const target = parseInt(text.replace(/\D/g, ""));

            const suffix = text.replace(/[0-9]/g, "");

            let count = 0;

            const speed = target / 80;

            const updateCounter = () => {

                if (count < target) {

                    count += speed;

                    counter.innerText = Math.ceil(count) + suffix;

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = target + suffix;

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

}, {

    threshold: 0.5

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});


/*==========================
      SCROLL REVEAL
==========================*/

const revealElements = document.querySelectorAll(

".service-card,.package-card,.why-card,.industry-card,.testimonial-card,.info-box,.about-content"

);

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold:0.15

});

revealElements.forEach(item => {

    item.classList.add("hidden");

    revealObserver.observe(item);

});


/*==========================
      FAQ ACCORDION
==========================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const answer = item.querySelector("p");

    answer.style.display = "none";

    item.addEventListener("click", () => {

        faqItems.forEach(faq => {

            if(faq !== item){

                faq.querySelector("p").style.display="none";

            }

        });

        answer.style.display =

        answer.style.display==="block"

        ? "none"

        : "block";

    });

});


/*==========================
      CONTACT FORM
==========================*/

const contactForm = document.querySelector(".contact-form form");

if(contactForm){

contactForm.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Thank you! Your enquiry has been submitted successfully.");

contactForm.reset();

});

}


/*==========================
      CURRENT YEAR
==========================*/

const yearElement = document.querySelector(".copyright");

if(yearElement){

const year=new Date().getFullYear();

yearElement.innerHTML=

`<p>© ${year} Swastika Consultancy Services. All Rights Reserved.</p>`;

}

console.log("JavaScript Part 2 Loaded");
/*=========================================
    SCRIPT.JS - PART 3
=========================================*/

/*==========================
      PRELOADER
==========================*/

window.addEventListener("load", () => {

    const preloader = document.querySelector(".preloader");

    if(preloader){

        preloader.style.opacity = "0";

        setTimeout(() => {

            preloader.style.display = "none";

        },500);

    }

});


/*==========================
      HERO TYPING EFFECT
==========================*/

const typingElement = document.querySelector(".hero-tag");

if(typingElement){

const words=[
"Trusted Accounting Partner",
"GST & Tax Experts",
"Business Compliance Services",
"Professional Bookkeeping"
];

let wordIndex=0;
let charIndex=0;
let deleting=false;

function typeEffect(){

const currentWord=words[wordIndex];

if(!deleting){

typingElement.textContent=currentWord.substring(0,charIndex++);

if(charIndex>currentWord.length){

deleting=true;

setTimeout(typeEffect,1500);

return;

}

}else{

typingElement.textContent=currentWord.substring(0,charIndex--);

if(charIndex===0){

deleting=false;

wordIndex++;

if(wordIndex>=words.length){

wordIndex=0;

}

}

}

setTimeout(typeEffect,deleting?50:100);

}

typeEffect();

}


/*==========================
      TESTIMONIAL SLIDER
==========================*/

const testimonials=document.querySelectorAll(".testimonial-card");

let currentSlide=0;

if(testimonials.length>0){

setInterval(()=>{

testimonials.forEach(card=>{

card.style.display="none";

});

currentSlide++;

if(currentSlide>=testimonials.length){

currentSlide=0;

}

testimonials[currentSlide].style.display="block";

},5000);

}


/*==========================
      PACKAGE HOVER
==========================*/

document.querySelectorAll(".package-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-15px) scale(1.02)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});


/*==========================
      BUTTON RIPPLE EFFECT
==========================*/

document.querySelectorAll(".primary-btn").forEach(button=>{

button.addEventListener("click",function(e){

const circle=document.createElement("span");

const diameter=Math.max(this.clientWidth,this.clientHeight);

const radius=diameter/2;

circle.style.width=circle.style.height=`${diameter}px`;

circle.style.left=`${e.clientX-this.offsetLeft-radius}px`;

circle.style.top=`${e.clientY-this.offsetTop-radius}px`;

circle.classList.add("ripple");

const ripple=this.querySelector(".ripple");

if(ripple){

ripple.remove();

}

this.appendChild(circle);

});

});

console.log("JavaScript Part 3 Loaded");

/*=========================================
    SCRIPT.JS - PART 4
=========================================*/

/*==========================
      PAGE SCROLL PROGRESS
==========================*/

const progressBar = document.createElement("div");

progressBar.id = "scroll-progress";

document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";

});


/*==========================
      NAVBAR LINK HOVER
==========================*/

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("mouseenter", () => {

        link.style.transition = ".3s";

    });

});


/*==========================
      BUTTON HOVER EFFECT
==========================*/

document.querySelectorAll(".primary-btn,.secondary-btn,.package-btn").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="translateY(-3px)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="translateY(0px)";

});

});


/*==========================
      SCROLL TO CONTACT
==========================*/

document.querySelectorAll(".consult-btn").forEach(button=>{

button.addEventListener("click",(e)=>{

e.preventDefault();

const contact=document.querySelector("#contact");

if(contact){

contact.scrollIntoView({

behavior:"smooth"

});

}

});

});


/*==========================
      DISABLE RIGHT CLICK
==========================*/

document.addEventListener("contextmenu",(e)=>{

e.preventDefault();

});


/*==========================
      DISABLE F12
==========================*/

document.addEventListener("keydown",(e)=>{

if(e.key==="F12"){

e.preventDefault();

}

if(e.ctrlKey && e.shiftKey && e.key==="I"){

e.preventDefault();

}

if(e.ctrlKey && e.shiftKey && e.key==="J"){

e.preventDefault();

}

if(e.ctrlKey && e.key==="U"){

e.preventDefault();

}

});


/*==========================
      LAZY IMAGE LOADING
==========================*/

const lazyImages=document.querySelectorAll("img");

const imageObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const img=entry.target;

img.classList.add("loaded");

imageObserver.unobserve(img);

}

});

});

lazyImages.forEach(img=>{

imageObserver.observe(img);

});


/*==========================
      PAGE READY
==========================*/

window.addEventListener("load",()=>{

console.log("=================================");

console.log("Swastika Consultancy Services");

console.log("Website Loaded Successfully");

console.log("Version 1.0");

console.log("=================================");

});


/*==========================
      COPYRIGHT
==========================*/

console.log("© Swastika Consultancy Services");
