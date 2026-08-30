/* =========================================================
   UNTOLD STORY
   MOBILE CINEMATIC 3D CAMERA VERSION
   ========================================================= */

(() => {
  "use strict";

  /* =========================================================
     SAFETY
     ========================================================= */

  const canvas = document.getElementById("spaceCanvas");

  if (!canvas) {
    console.error("spaceCanvas not found.");
    return;
  }

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("Canvas 2D context could not be created.");
    return;
  }

  const isMobile =
    window.innerWidth <= 768 ||
    window.matchMedia("(orientation: portrait)").matches;

  /* =========================================================
     CANVAS
     ========================================================= */

  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;

    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );
  }

  resizeCanvas();

  window.addEventListener(
    "resize",
    resizeCanvas,
    { passive: true }
  );

  /* =========================================================
     CAMERA
     
     DO NOT CHANGE
     ========================================================= */

  const camera = {
    x: 0,
    y: 0,
    z: 0,

    targetX: 0,
    targetY: 0,
    targetZ: 0,

    yaw: 0,
    pitch: 0,
    roll: 0,

    targetYaw: 0,
    targetPitch: 0,
    targetRoll: 0,

    speed: 0.35
  };

  /* =========================================================
     CAMERA PATH
     ========================================================= */

  let cinematicMode = "intro";

  function setCameraMode(mode) {
    cinematicMode = mode;
  }

  function updateCameraTargets(time) {

    if (cinematicMode === "intro") {

      camera.targetX =
        Math.sin(time * 0.00022) * 25;

      camera.targetY =
        Math.cos(time * 0.00019) * 16;

      camera.targetYaw =
        Math.sin(time * 0.00018) * 0.018;

      camera.targetPitch =
        Math.cos(time * 0.00016) * 0.012;

      camera.targetRoll =
        Math.sin(time * 0.00013) * 0.004;
    }

    else if (cinematicMode === "welcome") {

      camera.targetX =
        Math.sin(time * 0.00020) * 18;

      camera.targetY =
        Math.cos(time * 0.00017) * 12;

      camera.targetYaw =
        Math.sin(time * 0.00014) * 0.012;

      camera.targetPitch =
        Math.cos(time * 0.00016) * 0.008;

      camera.targetRoll =
        Math.sin(time * 0.00011) * 0.003;
    }

    else if (cinematicMode === "travel") {

      camera.targetX =
        Math.sin(time * 0.00027) * 55 +
        Math.sin(time * 0.00011) * 25;

      camera.targetY =
        Math.cos(time * 0.00021) * 40 +
        Math.sin(time * 0.00009) * 20;

      camera.targetYaw =
        Math.sin(time * 0.00020) * 0.035;

      camera.targetPitch =
        Math.cos(time * 0.00018) * 0.025;

      camera.targetRoll =
        Math.sin(time * 0.00014) * 0.006;
    }

    else if (cinematicMode === "lookText") {

      camera.targetX = 70;
      camera.targetY = -8;
      camera.targetYaw = 0.10;
      camera.targetPitch = -0.015;
      camera.targetRoll = 0.008;
    }

    else if (cinematicMode === "lookBack") {

      camera.targetX = 0;
      camera.targetY = 0;
      camera.targetYaw = 0;
      camera.targetPitch = 0;
      camera.targetRoll = 0;
    }

    else if (cinematicMode === "question") {

      camera.targetX = 0;
      camera.targetY = 0;
      camera.targetYaw = 0;
      camera.targetPitch = 0;
      camera.targetRoll = 0;
    }
  }

  function smoothCamera() {

    camera.x +=
      (camera.targetX - camera.x) * 0.025;

    camera.y +=
      (camera.targetY - camera.y) * 0.025;

    camera.yaw +=
      (camera.targetYaw - camera.yaw) * 0.025;

    camera.pitch +=
      (camera.targetPitch - camera.pitch) * 0.025;

    camera.roll +=
      (camera.targetRoll - camera.roll) * 0.025;
  }

  /* =========================================================
     3D STAR WORLD
     ========================================================= */

  const stars = [];

  const STAR_COUNT =
    isMobile ? 560 : 850;

  const WORLD_DEPTH = 2600;

  function createStars() {

    stars.length = 0;

    for (let i = 0; i < STAR_COUNT; i++) {

      const radius =
        Math.random() * 1700 + 150;

      const angle =
        Math.random() * Math.PI * 2;

      stars.push({

        x:
          Math.cos(angle) *
          radius *
          (0.65 + Math.random() * 0.7),

        y:
          Math.sin(angle) *
          radius *
          (0.55 + Math.random() * 0.8),

        z:
          Math.random() *
          WORLD_DEPTH,

        size:
          Math.random() * 1.8 + 0.35,

        hue:
          200 +
          Math.random() * 80,

        brightness:
          0.45 +
          Math.random() * 0.55,

        twinkle:
          Math.random() * Math.PI * 2
      });
    }
  }

  createStars();

  /* =========================================================
     GALAXY NEBULA
     ========================================================= */

  function drawNebula() {

    const cx =
      width * 0.64 -
      camera.x * 0.15;

    const cy =
      height * 0.34 -
      camera.y * 0.10;

    const radius =
      Math.max(width, height) * 0.78;

    const nebula =
      ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        radius
      );

    nebula.addColorStop(
      0,
      "rgba(225,75,255,0.25)"
    );

    nebula.addColorStop(
      0.22,
      "rgba(100,80,255,0.15)"
    );

    nebula.addColorStop(
      0.50,
      "rgba(45,55,150,0.07)"
    );

    nebula.addColorStop(
      0.78,
      "rgba(10,15,60,0.035)"
    );

    nebula.addColorStop(
      1,
      "rgba(0,0,0,0)"
    );

    ctx.fillStyle = nebula;

    ctx.fillRect(
      0,
      0,
      width,
      height
    );
  }

  /* =========================================================
     3D PROJECTION
     ========================================================= */

  function projectStar(star, time) {

    let z =
      star.z -
      camera.z;

    while (z < 5) {
      z += WORLD_DEPTH;
    }

    const perspective =
      650 / z;

    let worldX =
      star.x -
      camera.x;

    let worldY =
      star.y -
      camera.y;

    const cosYaw =
      Math.cos(camera.yaw);

    const sinYaw =
      Math.sin(camera.yaw);

    const rotatedX =
      worldX * cosYaw -
      z * sinYaw;

    const rotatedZ =
      worldX * sinYaw +
      z * cosYaw;

    const cosPitch =
      Math.cos(camera.pitch);

    const sinPitch =
      Math.sin(camera.pitch);

    const rotatedY =
      worldY * cosPitch -
      rotatedZ * sinPitch;

    const finalZ =
      worldY * sinPitch +
      rotatedZ * cosPitch;

    const finalPerspective =
      650 /
      Math.max(5, finalZ);

    let x =
      rotatedX *
      finalPerspective +
      width / 2;

    let y =
      rotatedY *
      finalPerspective +
      height / 2;

    const dx =
      x - width / 2;

    const dy =
      y - height / 2;

    const cosRoll =
      Math.cos(camera.roll);

    const sinRoll =
      Math.sin(camera.roll);

    x =
      dx * cosRoll -
      dy * sinRoll +
      width / 2;

    y =
      dx * sinRoll +
      dy * cosRoll +
      height / 2;

    const twinkle =
      0.78 +
      Math.sin(
        time * 0.002 +
        star.twinkle
      ) * 0.22;

    const size =
      star.size *
      finalPerspective *
      5;

    return {
      x,
      y,
      size,
      alpha:
        Math.min(
          1,
          finalPerspective * 1.55
        ) *
        star.brightness *
        twinkle,
      z: finalZ
    };
  }

  /* =========================================================
     DRAW STAR
     ========================================================= */

  function drawStar(star, time) {

    const p =
      projectStar(
        star,
        time
      );

    if (
      p.x < -100 ||
      p.x > width + 100 ||
      p.y < -100 ||
      p.y > height + 100
    ) {
      return;
    }

    ctx.beginPath();

    ctx.fillStyle =
      `hsla(
        ${star.hue},
        100%,
        88%,
        ${Math.max(
          0.05,
          Math.min(1, p.alpha)
        )}
      )`;

    ctx.arc(
      p.x,
      p.y,
      Math.max(
        0.45,
        Math.min(
          8,
          p.size
        )
      ),
      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  /* =========================================================
     CAMERA TRAIL
     ========================================================= */

  function drawTravelStreaks() {

    if (
      cinematicMode !== "travel"
    ) {
      return;
    }

    const centerX =
      width / 2;

    const centerY =
      height / 2;

    for (
      let i = 0;
      i < (isMobile ? 18 : 28);
      i++
    ) {

      const angle =
        Math.random() *
        Math.PI *
        2;

      const distance =
        Math.random() *
        Math.max(
          width,
          height
        );

      const x1 =
        centerX +
        Math.cos(angle) *
        distance *
        0.15;

      const y1 =
        centerY +
        Math.sin(angle) *
        distance *
        0.15;

      const x2 =
        centerX +
        Math.cos(angle) *
        distance;

      const y2 =
        centerY +
        Math.sin(angle) *
        distance;

      const gradient =
        ctx.createLinearGradient(
          x1,
          y1,
          x2,
          y2
        );

      gradient.addColorStop(
        0,
        "rgba(180,120,255,0)"
      );

      gradient.addColorStop(
        0.7,
        "rgba(190,120,255,0.08)"
      );

      gradient.addColorStop(
        1,
        "rgba(255,180,245,0)"
      );

      ctx.strokeStyle =
        gradient;

      ctx.lineWidth =
        Math.random() *
        1.2 +
        0.2;

      ctx.beginPath();

      ctx.moveTo(
        x1,
        y1
      );

      ctx.lineTo(
        x2,
        y2
      );

      ctx.stroke();
    }
  }

  /* =========================================================
     MAIN DRAW LOOP
     ========================================================= */

  let previousTime = 0;

  function drawSpace(time) {

    const delta =
      Math.min(
        32,
        time -
        previousTime
      );

    previousTime = time;

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    updateCameraTargets(time);

    smoothCamera();

    if (
      cinematicMode === "intro"
    ) {

      camera.z +=
        0.55 *
        (delta / 16.67);
    }

    else if (
      cinematicMode === "welcome"
    ) {

      camera.z +=
        0.32 *
        (delta / 16.67);
    }

    else if (
      cinematicMode === "travel"
    ) {

      camera.z +=
        4.2 *
        (delta / 16.67);
    }

    else if (
      cinematicMode === "lookText"
    ) {

      camera.z +=
        1.7 *
        (delta / 16.67);
    }

    else if (
      cinematicMode === "lookBack"
    ) {

      camera.z +=
        3.2 *
        (delta / 16.67);
    }

    drawNebula();

    drawTravelStreaks();

    const visibleStars =
      stars
        .map(star => ({
          star,
          projected:
            projectStar(
              star,
              time
            )
        }))
        .sort(
          (a, b) =>
            b.projected.z -
            a.projected.z
        );

    for (
      const item of visibleStars
    ) {

      drawStar(
        item.star,
        time
      );
    }

    requestAnimationFrame(
      drawSpace
    );
  }

  requestAnimationFrame(
    drawSpace
  );

  /* =========================================================
     REMOVE OLD HEART
     ========================================================= */

  const heartParticles =
    document.getElementById(
      "heartParticles"
    );

  if (heartParticles) {

    heartParticles.innerHTML = "";

    gsap.set(
      heartParticles,
      {
        opacity: 0,
        display: "none"
      }
    );
  }

  /* =========================================================
     REMOVE OLD EYE
     ========================================================= */

  const eyelids =
    document.querySelectorAll(
      ".eyelid"
    );

  eyelids.forEach(
    eyelid => {

      gsap.set(
        eyelid,
        {
          opacity: 0,
          display: "none"
        }
      );
    }
  );

  const eyeOverlay =
    document.querySelector(
      ".eye-overlay"
    );

  if (eyeOverlay) {

    gsap.set(
      eyeOverlay,
      {
        opacity: 0,
        display: "none"
      }
    );
  }

  /* =========================================================
     TRAVELING PARTICLES
     ========================================================= */

  const travelContainer =
    document.getElementById(
      "travelParticles"
    );

  if (travelContainer) {

    travelContainer.innerHTML = "";

    const amount =
      isMobile
        ? 120
        : 180;

    for (
      let i = 0;
      i < amount;
      i++
    ) {

      const star =
        document.createElement(
          "div"
        );

      star.className =
        "travel-star";

      const size =
        Math.random() *
        3 +
        0.7;

      star.style.width =
        size + "px";

      star.style.height =
        size + "px";

      star.style.left =
        Math.random() *
        100 +
        "%";

      star.style.top =
        Math.random() *
        100 +
        "%";

      star.style.opacity =
        (
          0.25 +
          Math.random() *
          0.75
        ).toFixed(2);

      travelContainer.appendChild(
        star
      );
    }
  }

  /* =========================================================
     STORY TEXT
     ========================================================= */

  const storyText =
    document.getElementById(
      "storyText"
    );

  function mobileTextCenter() {

    if (!storyText) {
      return;
    }

    gsap.set(
      storyText,
      {
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,

        width:
          isMobile
            ? "88vw"
            : "76vw",

        maxWidth:
          isMobile
            ? "92vw"
            : "850px",

        textAlign: "center",

        transformPerspective:
          isMobile
            ? 900
            : 1200,

        transformStyle:
          "preserve-3d"
      }
    );
  }

  mobileTextCenter();

  /* =========================================================
     STORY TEXT
     ========================================================= */

  function showStoryText(
    text,
    holdDuration = 3
  ) {

    if (!storyText) {
      return gsap.timeline();
    }

    storyText.innerHTML =
      text;

    mobileTextCenter();

    const tl =
      gsap.timeline();

    tl.set(
      storyText,
      {
        opacity: 0,
        scale: 0.72,

        rotateY: -55,
        rotateX: 8,

        z: -650,

        transformOrigin:
          "50% 50%"
      }
    );

    tl.to(
      storyText,
      {
        opacity: 1,

        scale: 1,

        rotateY: 0,
        rotateX: 0,

        z: 0,

        duration:
          isMobile
            ? 1.35
            : 1.6,

        ease:
          "power4.out"
      }
    );

    tl.to(
      storyText,
      {
        scale:
          isMobile
            ? 1.025
            : 1.035,

        duration:
          holdDuration,

        ease:
          "sine.inOut"
      }
    );

    tl.to(
      storyText,
      {
        opacity: 0,

        scale: 1.08,

        rotateY: 25,

        z: 350,

        duration:
          isMobile
            ? 1.05
            : 1.25,

        ease:
          "power3.in"
      }
    );

    return tl;
  }

  /* =========================================================
     CAMERA LOOK
     ========================================================= */

  function lookAtText() {

    const tl =
      gsap.timeline();

    setCameraMode(
      "lookText"
    );

    tl.to(
      {},
      {
        duration:
          isMobile
            ? 1.25
            : 1.4,

        ease:
          "power2.inOut"
      }
    );

    tl.to(
      {},
      {
        duration:
          isMobile
            ? 1.8
            : 2.1,

        ease:
          "none"
      }
    );

    tl.call(
      () => {

        setCameraMode(
          "lookBack"
        );
      }
    );

    tl.to(
      {},
      {
        duration:
          isMobile
            ? 1.35
            : 1.55,

        ease:
          "power3.inOut"
      }
    );

    return tl;
  }

  /* =========================================================
     WELCOME MADAM
     
     CENTER FIX ONLY
     ========================================================= */

  function welcomeMadam() {

    const welcome =
      document.getElementById(
        "welcomeText"
      );

    if (!welcome) {
      return gsap.timeline();
    }

    const tl =
      gsap.timeline();

    setCameraMode(
      "welcome"
    );

    /*
      ABSOLUTE CENTER.
      This is deliberately kept at 50% / 50%.
    */

    gsap.set(
      welcome,
      {
        position: "absolute",

        left: "50%",
        top: "50%",

        xPercent: -50,
        yPercent: -50,

        margin: 0,

        width:
          isMobile
            ? "94vw"
            : "80vw",

        maxWidth: "700px",

        textAlign: "center",

        transformPerspective:
          isMobile
            ? 900
            : 1200,

        transformStyle:
          "preserve-3d"
      }
    );

    const loveImage =
      document.getElementById(
        "loveImage"
      );

    if (loveImage) {

      gsap.set(
        loveImage,
        {
          opacity: 0,
          display: "none"
        }
      );
    }

    tl.set(
      welcome,
      {
        opacity: 0,
        scale: 0.65,
        rotateY: -45,
        z: -500
      }
    );

    tl.to(
      welcome,
      {
        opacity: 1,

        scale: 1,

        rotateY: 0,

        z: 0,

        duration:
          isMobile
            ? 1.45
            : 1.7,

        ease:
          "power4.out"
      }
    );

    tl.to(
      welcome,
      {
        scale:
          isMobile
            ? 1.025
            : 1.035,

        duration: 3.2,

        ease:
          "sine.inOut"
      }
    );

    return tl;
  }

  /* =========================================================
     FINAL QUESTION
     ========================================================= */

  const questionScene =
    document.getElementById(
      "questionScene"
    );

  /* =========================================================
     MAIN STORY
     ========================================================= */

  const master =
    gsap.timeline();

  master.call(
    () => {

      setCameraMode(
        "intro"
      );

      camera.speed =
        0.4;
    }
  );

  master.to(
    {},
    {
      duration:
        isMobile
          ? 2.8
          : 3.2
    }
  );

  master.add(
    welcomeMadam()
  );

  master.to(
    {},
    {
      duration:
        isMobile
          ? 3.4
          : 4
    }
  );

  master.call(
    () => {

      setCameraMode(
        "travel"
      );
    }
  );

  master.to(
    "#welcomeText",
    {
      opacity: 0,

      scale:
        isMobile
          ? 1.65
          : 1.9,

      z: 500,

      rotateY: 8,

      duration:
        isMobile
          ? 1.8
          : 2.1,

      ease:
        "power3.in"
    }
  );

  master.to(
    {},
    {
      duration:
        isMobile
          ? 3.4
          : 4
    }
  );

  /* =========================================================
     OYEE PAAPA
     ========================================================= */

  master.call(
    () => {

      mobileTextCenter();

      setCameraMode(
        "lookText"
      );

      showStoryText(
        "Oyee Paapa... ❤️",
        isMobile
          ? 1.7
          : 2.1
      );

      lookAtText();
    }
  );

  master.to(
    {},
    {
      duration:
        isMobile
          ? 3.5
          : 4
    }
  );

  master.call(
    () => {

      setCameraMode(
        "travel"
      );
    }
  );

  master.to(
    {},
    {
      duration:
        isMobile
          ? 2.4
          : 2.8
    }
  );

  /* =========================================================
     BIRTHDAY MESSAGE
     ========================================================= */

  master.call(
    () => {

      mobileTextCenter();

      setCameraMode(
        "lookText"
      );

      showStoryText(
        "Today is so special for me...<br>because it's your birthday ❤️",
        isMobile
          ? 2.3
          : 2.8
      );

      lookAtText();
    }
  );

  master.to(
    {},
    {
      duration:
        isMobile
          ? 4
          : 4.5
    }
  );

  master.call(
    () => {

      setCameraMode(
        "travel"
      );
    }
  );

  master.to(
    {},
    {
      duration:
        isMobile
          ? 2.6
          : 3
    }
  );

  /* =========================================================
     FINAL QUESTION
     ========================================================= */

  if (questionScene) {

    master.to(
      questionScene,
      {
        opacity: 1,

        pointerEvents:
          "auto",

        duration:
          isMobile
            ? 1.5
            : 1.8,

        ease:
          "power3.out"
      }
    );
  }

  const question =
    document.querySelector(
      ".question"
    );

  if (question) {

    master.fromTo(
      question,
      {
        opacity: 0,

        scale: 0.82,

        rotateY: -25,

        z: -300
      },
      {
        opacity: 1,

        scale: 1,

        rotateY: 0,

        z: 0,

        duration:
          isMobile
            ? 1.5
            : 1.8,

        ease:
          "power3.out"
      }
    );
  }

  /* =========================================================
     BUTTONS
     ========================================================= */

  const buttons =
    document.querySelectorAll(
      ".choices button"
    );

  if (buttons.length) {

    master.from(
      buttons,
      {
        opacity: 0,

        y: 45,

        scale: 0.85,

        duration:
          isMobile
            ? 0.9
            : 1.1,

        stagger:
          0.16,

        ease:
          "back.out(1.5)"
      }
    );
  }

  /* =========================================================
     YES BUTTON
     
     YES -> PASSWORD
     ========================================================= */

  const yesBtn =
    document.getElementById(
      "yesBtn"
    );

  const noBtn =
    document.getElementById(
      "noBtn"
    );

  const lockScreen =
    document.getElementById(
      "lockScreen"
    );

  if (yesBtn) {

    yesBtn.addEventListener(
      "click",
      () => {

        yesBtn.style.pointerEvents =
          "none";

        if (noBtn) {
          noBtn.style.pointerEvents =
            "none";
        }

        if (question) {

          gsap.to(
            question,
            {
              scale:
                isMobile
                  ? 1.45
                  : 1.6,

              opacity: 0,

              rotation: 8,

              duration:
                isMobile
                  ? 0.9
                  : 1.1,

              ease:
                "power3.in"
            }
          );
        }

        if (questionScene) {

          gsap.to(
            questionScene,
            {
              opacity: 0,

              scale:
                isMobile
                  ? 1.25
                  : 1.35,

              duration: 1,

              ease: "power3.in"
            }
          );
        }

        setTimeout(
          () => {

            showPasswordScreen();

          },
          950
        );
      }
    );
  }

  /* =========================================================
     NO BUTTON
     
     ZIG-ZAG BEHAVIOUR KEPT
     ========================================================= */

  if (noBtn) {

    function moveNoButton() {

      const mobile =
        window.innerWidth <= 768;

      const moveX =
        mobile
          ? (Math.random() - 0.5) * 150
          : (Math.random() - 0.5) * 200;

      const moveY =
        mobile
          ? (Math.random() - 0.5) * 90
          : (Math.random() - 0.5) * 110;

      gsap.to(
        noBtn,
        {
          x: moveX,

          y: moveY,

          duration:
            mobile
              ? 0.28
              : 0.3,

          ease:
            "power2.out"
        }
      );

      /*
        Show the destiny message.
      */

      const msg =
        document.getElementById(
          "noMessage"
        );

      if (msg) {

        gsap.killTweensOf(msg);

        gsap.to(
          msg,
          {
            opacity: 1,
            y: 0,

            duration: 0.3,

            ease: "power2.out"
          }
        );
      }
    }

    noBtn.addEventListener(
      "mouseenter",
      moveNoButton
    );

    noBtn.addEventListener(
      "touchstart",
      moveNoButton,
      {
        passive: true
      }
    );

    noBtn.addEventListener(
      "click",
      e => {

        e.preventDefault();

        moveNoButton();
      }
    );
  }

  /* =========================================================
     PASSWORD SCREEN
     ========================================================= */

  const nicknameInput =
    document.getElementById(
      "nicknameInput"
    );

  const unlockBtn =
    document.getElementById(
      "unlockBtn"
    );

  const lockError =
    document.getElementById(
      "lockError"
    );

  function showPasswordScreen() {

    if (!lockScreen) {
      return;
    }

    setCameraMode(
      "question"
    );

    lockScreen.style.visibility =
      "visible";

    lockScreen.style.pointerEvents =
      "auto";

    gsap.set(
      lockScreen,
      {
        opacity: 0
      }
    );

    gsap.to(
      lockScreen,
      {
        opacity: 1,

        duration: 1.1,

        ease: "power3.out",

        onComplete: () => {

          if (nicknameInput) {
            nicknameInput.focus();
          }
        }
      }
    );
  }

  /* =========================================================
     PASSWORD
     
     PASSWORD = Manaivi
     ========================================================= */

  function checkPassword() {

    if (!nicknameInput) {
      return;
    }

    const entered =
      nicknameInput.value.trim();

    if (
      entered.toLowerCase() ===
      "manaivi"
    ) {

      if (lockError) {

        gsap.to(
          lockError,
          {
            opacity: 0,
            duration: 0.2
          }
        );
      }

      if (unlockBtn) {
        unlockBtn.style.pointerEvents =
          "none";
      }

      if (nicknameInput) {
        nicknameInput.style.pointerEvents =
          "none";
      }

      unlockToDiwali();

    } else {

      if (lockError) {

        lockError.textContent =
          "Hmm... that's not the secret.";

        gsap.fromTo(
          lockError,
          {
            opacity: 0,
            y: 5
          },
          {
            opacity: 1,
            y: 0,

            duration: 0.35,

            ease: "power2.out"
          }
        );
      }

      if (nicknameInput) {

        gsap.fromTo(
          nicknameInput,
          {
            x: -7
          },
          {
            x: 7,

            duration: 0.07,

            repeat: 5,

            yoyo: true,

            ease: "power1.inOut",

            onComplete: () => {

              gsap.set(
                nicknameInput,
                {
                  x: 0
                }
              );
            }
          }
        );
      }
    }
  }

  if (unlockBtn) {

    unlockBtn.addEventListener(
      "click",
      checkPassword
    );
  }

  if (nicknameInput) {

    nicknameInput.addEventListener(
      "keydown",
      e => {

        if (
          e.key === "Enter"
        ) {

          e.preventDefault();

          checkPassword();
        }
      }
    );
  }

  /* =========================================================
     DIWALI CELEBRATION
     ========================================================= */

  const diwaliScene =
    document.getElementById(
      "diwaliScene"
    );

  const diwaliContent =
    document.querySelector(
      ".diwali-content"
    );

  const fireworks =
    document.getElementById(
      "fireworks"
    );

  const diwaliParticles =
    document.getElementById(
      "diwaliParticles"
    );

  function unlockToDiwali() {

    if (!lockScreen) {
      return;
    }

    const tl =
      gsap.timeline();

    tl.to(
      lockScreen,
      {
        opacity: 0,

        scale: 1.08,

        duration: 0.9,

        ease: "power3.in",

        onComplete: () => {

          lockScreen.style.visibility =
            "hidden";

          lockScreen.style.pointerEvents =
            "none";

          startDiwali();
        }
      }
    );
  }

  /* =========================================================
     DIWALI PARTICLES
     ========================================================= */

  function createDiwaliParticle(
    x,
    y,
    color
  ) {

    if (!diwaliParticles) {
      return;
    }

    const particle =
      document.createElement(
        "div"
      );

    particle.className =
      "firework-particle";

    particle.style.left =
      x + "px";

    particle.style.top =
      y + "px";

    particle.style.color =
      color;

    particle.style.background =
      color;

    diwaliParticles.appendChild(
      particle
    );

    const angle =
      Math.random() *
      Math.PI *
      2;

    const distance =
      50 +
      Math.random() *
      150;

    const tx =
      Math.cos(angle) *
      distance;

    const ty =
      Math.sin(angle) *
      distance;

    gsap.to(
      particle,
      {
        x: tx,

        y: ty,

        opacity: 0,

        scale:
          Math.random() *
          1.5 +
          0.5,

        duration:
          0.8 +
          Math.random() *
          0.8,

        ease: "power2.out",

        onComplete: () => {

          particle.remove();
        }
      }
    );
  }

  /* =========================================================
     FIREWORK BURST
     ========================================================= */

  function createFirework() {

    if (!fireworks) {
      return;
    }

    const x =
      30 +
      Math.random() * 40;

    const y =
      18 +
      Math.random() * 45;

    const px =
      width * x / 100;

    const py =
      height * y / 100;

    const colors = [
      "#ff3b81",
      "#ffd43b",
      "#5dd9ff",
      "#9d7cff",
      "#62ff9a",
      "#ff8a3d",
      "#ffffff"
    ];

    const color =
      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ];

    for (
      let i = 0;
      i < 34;
      i++
    ) {

      createDiwaliParticle(
        px,
        py,
        color
      );
    }

    const flash =
      document.createElement(
        "div"
      );

    flash.style.position =
      "absolute";

    flash.style.left =
      px + "px";

    flash.style.top =
      py + "px";

    flash.style.width =
      "12px";

    flash.style.height =
      "12px";

    flash.style.borderRadius =
      "50%";

    flash.style.background =
      color;

    flash.style.boxShadow =
      `0 0 25px ${color}, 0 0 60px ${color}`;

    flash.style.transform =
      "translate(-50%, -50%)";

    fireworks.appendChild(
      flash
    );

    gsap.to(
      flash,
      {
        scale: 4,

        opacity: 0,

        duration: 0.7,

        ease: "power2.out",

        onComplete: () => {

          flash.remove();
        }
      }
    );
  }

  /* =========================================================
     DIWALI START
     ========================================================= */

  let diwaliInterval = null;

  function startDiwali() {

    if (!diwaliScene) {
      return;
    }

    diwaliScene.style.visibility =
      "visible";

    diwaliScene.style.pointerEvents =
      "auto";

    gsap.set(
      diwaliScene,
      {
        opacity: 0
      }
    );

    gsap.set(
      diwaliContent,
      {
        opacity: 0,
        scale: 0.7
      }
    );

    gsap.to(
      diwaliScene,
      {
        opacity: 1,

        duration: 1.1,

        ease: "power2.out"
      }
    );

    gsap.to(
      diwaliContent,
      {
        opacity: 1,

        scale: 1,

        duration: 1.4,

        delay: 0.35,

        ease: "back.out(1.4)"
      }
    );

    /*
      First big fireworks.
    */

    setTimeout(
      createFirework,
      250
    );

    setTimeout(
      createFirework,
      650
    );

    setTimeout(
      createFirework,
      1050
    );

    /*
      Continue colorful Diwali fireworks.
    */

    diwaliInterval =
      setInterval(
        () => {

          createFirework();

          if (
            Math.random() >
            0.45
          ) {

            setTimeout(
              createFirework,
              280
            );
          }

        },
        850
      );

    /*
      Keep the celebration running,
      then reveal the final scene.
    */

    setTimeout(
      () => {

        if (diwaliInterval) {

          clearInterval(
            diwaliInterval
          );

          diwaliInterval =
            null;
        }

        revealFinalScene();

      },
      9500
    );
  }

  /* =========================================================
     FINAL SCENE
     ========================================================= */

  function revealFinalScene() {

    const finalScene =
      document.getElementById(
        "finalScene"
      );

    if (!finalScene) {
      return;
    }

    gsap.to(
      diwaliScene,
      {
        opacity: 0,

        duration: 1.5,

        ease: "power2.inOut",

        onComplete: () => {

          diwaliScene.style.visibility =
            "hidden";

          diwaliScene.style.pointerEvents =
            "none";
        }
      }
    );

    finalScene.style.visibility =
      "visible";

    finalScene.style.pointerEvents =
      "auto";

    gsap.fromTo(
      finalScene,
      {
        opacity: 0
      },
      {
        opacity: 1,

        duration: 1.5,

        ease: "power3.out"
      }
    );
  }

  /* =========================================================
     MOBILE TEXT SAFETY
     ========================================================= */

  function updateMobileLayout() {

    if (!storyText) {
      return;
    }

    mobileTextCenter();

    if (
      window.innerWidth <= 390
    ) {

      gsap.set(
        storyText,
        {
          width: "88vw"
        }
      );

    } else if (
      window.innerWidth <= 768
    ) {

      gsap.set(
        storyText,
        {
          width: "86vw"
        }
      );

    } else {

      gsap.set(
        storyText,
        {
          width: "76vw"
        }
      );
    }

    /*
      Re-apply Welcome Madam center after resize.
    */

    const welcome =
      document.getElementById(
        "welcomeText"
      );

    if (welcome) {

      gsap.set(
        welcome,
        {
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50
        }
      );
    }
  }

  updateMobileLayout();

  window.addEventListener(
    "resize",
    updateMobileLayout,
    {
      passive: true
    }
  );

  /* =========================================================
     TOUCH / HOLD TO PAUSE
     ========================================================= */

  let paused =
    false;

  function pauseStory() {

    if (paused) {
      return;
    }

    /*
      Do not pause password/Diwali.
    */

    if (
      lockScreen &&
      lockScreen.style.visibility ===
        "visible"
    ) {
      return;
    }

    if (
      diwaliScene &&
      diwaliScene.style.visibility ===
        "visible"
    ) {
      return;
    }

    paused = true;

    master.pause();

    if (typeof gsap !== "undefined") {
      gsap.globalTimeline.pause();
    }
  }

  function resumeStory() {

    if (!paused) {
      return;
    }

    paused = false;

    if (typeof gsap !== "undefined") {
      gsap.globalTimeline.resume();
    }

    master.resume();
  }

  let holdTimer = null;

  document.addEventListener(
    "touchstart",
    () => {

      holdTimer =
        setTimeout(
          pauseStory,
          450
        );
    },
    {
      passive: true
    }
  );

  document.addEventListener(
    "touchend",
    () => {

      clearTimeout(
        holdTimer
      );

      if (paused) {
        resumeStory();
      }
    },
    {
      passive: true
    }
  );

  /* =========================================================
     SWIPE PREVIEW
     ========================================================= */

  let touchStartX = 0;

  document.addEventListener(
    "touchstart",
    e => {

      if (
        e.touches &&
        e.touches.length
      ) {

        touchStartX =
          e.touches[0].clientX;
      }
    },
    {
      passive: true
    }
  );

  document.addEventListener(
    "touchend",
    e => {

      if (
        !e.changedTouches ||
        !e.changedTouches.length
      ) {
        return;
      }

      const touchEndX =
        e.changedTouches[0].clientX;

      const distance =
        touchEndX -
        touchStartX;

      if (
        Math.abs(distance) < 80
      ) {
        return;
      }

      /*
        Do not perform swipe camera movement
        while the question/password/Diwali is active.
      */

      if (
        questionScene &&
        questionScene.style.pointerEvents ===
          "auto"
      ) {
        return;
      }

      if (
        lockScreen &&
        lockScreen.style.visibility ===
          "visible"
      ) {
        return;
      }

      if (
        diwaliScene &&
        diwaliScene.style.visibility ===
          "visible"
      ) {
        return;
      }

      if (
        distance > 0
      ) {

        gsap.to(
          canvas,
          {
            x:
              isMobile
                ? 28
                : 45,

            duration:
              0.35,

            ease:
              "power2.out",

            yoyo: true,

            repeat: 1
          }
        );

      } else {

        gsap.to(
          canvas,
          {
            x:
              isMobile
                ? -28
                : -45,

            duration:
              0.35,

            ease:
              "power2.out",

            yoyo: true,

            repeat: 1
          }
        );
      }
    },
    {
      passive: true
    }
  );

  /* =========================================================
     START
     ========================================================= */

  console.log(
    "Untold Story cinematic 3D camera started."
  );

  console.log(
    "Password protected flow enabled."
  );

})();