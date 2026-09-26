/* =========================================
   ELEMENTS
========================================= */

const video = document.getElementById("heroVideo");
const soundButton = document.getElementById("soundButton");
const soundIcon = document.getElementById("soundIcon");
const heroContent = document.getElementById("heroContent");


/* =========================================
   VIDEO SETTINGS
========================================= */

/*
    Only the first 30 seconds of the video
    will be played.

    At 30 seconds, the video jumps back
    to the beginning and continues looping.
*/

const LOOP_DURATION = 30;


/* =========================================
   VIDEO READY
========================================= */

/*
    The poster image is visible immediately.

    Once the video has enough data to play,
    the "video-ready" class is added.

    CSS then fades the video in over the poster.
*/

if (video) {

    video.addEventListener("canplay", function () {

        video.classList.add("video-ready");

    });

}


/* =========================================
   START VIDEO
========================================= */

/*
    Video starts muted.

    Muted autoplay is generally allowed
    by mobile browsers.
*/

async function startVideo() {

    if (!video) {
        return;
    }

    video.muted = true;

    try {

        await video.play();

    }

    catch (error) {

        console.log(
            "Video autoplay was blocked."
        );

    }

    updateSoundButton();

}


startVideo();


/* =========================================
   30 SECOND LOOP
========================================= */

/*
    When the video reaches 30 seconds,
    immediately restart from 0.

    The video file itself can be longer
    than 30 seconds.
*/

if (video) {

    video.addEventListener("timeupdate", function () {

        if (video.currentTime >= LOOP_DURATION) {

            video.currentTime = 0;

            video.play().catch(() => {});

        }

    });

}


/* =========================================
   SOUND BUTTON
========================================= */

/*
    The guest must deliberately tap the
    sound button to enable audio.

    Scrolling will NEVER enable sound.
*/

if (soundButton) {

    soundButton.addEventListener("click", async function () {

        if (!video) {
            return;
        }


        /* -----------------------------
           TURN SOUND ON
        ----------------------------- */

        if (video.muted) {

            try {

                video.muted = false;

                await video.play();

            }

            catch (error) {

                /*
                    If the browser refuses audio,
                    keep the video muted.
                */

                video.muted = true;

                console.log(
                    "Audio could not be enabled."
                );

            }

        }


        /* -----------------------------
           TURN SOUND OFF
        ----------------------------- */

        else {

            video.muted = true;

        }


        updateSoundButton();

    });

}


/* =========================================
   UPDATE SOUND BUTTON
========================================= */

function updateSoundButton() {

    if (
        !video ||
        !soundIcon ||
        !soundButton
    ) {

        return;

    }


    if (video.muted) {

        soundIcon.textContent = "🔇";

        soundButton.setAttribute(
            "aria-label",
            "Turn wedding music on"
        );

    }

    else {

        soundIcon.textContent = "🔊";

        soundButton.setAttribute(
            "aria-label",
            "Mute wedding music"
        );

    }

}


/* =========================================
   INITIAL SOUND STATE
========================================= */

updateSoundButton();


/* =========================================
   HERO SCROLL EFFECT
========================================= */

/*
    The background video remains fixed.

    The hero text gradually fades away
    and moves down as the guest scrolls.
*/

if (heroContent) {

    window.addEventListener("scroll", function () {

        const scroll = window.scrollY;

        const fadeDistance = 500;


        let opacity =
            1 -
            (scroll / fadeDistance);


        opacity = Math.max(
            0,
            Math.min(1, opacity)
        );


        const movement =
            scroll * 0.15;


        heroContent.style.opacity =
            opacity;


        heroContent.style.transform =
            `translateY(${movement}px)`;

    }, {
        passive: true
    });

}


/* =========================================
   PAGE VISIBILITY
========================================= */

/*
    Pause the video when the visitor
    leaves the page or switches apps.

    Resume when they return.
*/

document.addEventListener(
    "visibilitychange",
    function () {

        if (!video) {
            return;
        }


        if (document.hidden) {

            video.pause();

        }

        else {

            /*
                If the video passed the
                30-second limit while hidden,
                restart it.
            */

            if (
                video.currentTime >= LOOP_DURATION
            ) {

                video.currentTime = 0;

            }


            video.play().catch(() => {});

        }

    }
)