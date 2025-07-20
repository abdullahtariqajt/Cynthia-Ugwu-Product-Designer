const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  });

  tl.to(".boundingElem", {
    y: "0",
    duration: 2,
    delay: -1,
    ease: Expo.easeInOut,
    stagger: 0.2,
  });

  tl.from("#heroFooter", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
    delay: -1,
  });
}

function circleChapta() {
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  var circle = document.querySelector("#circle");

  window.addEventListener("mousemove", function (dets) {
    var xdiff = dets.clientX - xprev;
    var ydiff = dets.clientY - yprev;

    xprev = dets.clientX;
    yprev = dets.clientY;

    // Calculate velocity
    var speed = Math.sqrt(xdiff * xdiff + ydiff * ydiff);

    // Dynamically change scale based on speed
    xscale = gsap.utils.clamp(0.8, 1.2, 1 + speed / 150);
    yscale = gsap.utils.clamp(0.8, 1.2, 1 - speed / 200);

    // Animate circle
    gsap.to(circle, {
      scaleX: xscale,
      scaleY: yscale,
      duration: 0.3,
      ease: "power3.out",
    });

    // Move circle to mouse
    gsap.to(circle, {
      x: dets.clientX,
      y: dets.clientY,
      duration: 0.2,
      ease: "power3.out",
    });
  });
}

function circleMouseFollower() {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#miniCircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
  });
}

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});

circleMouseFollower();
firstPageAnim();
circleChapta();
