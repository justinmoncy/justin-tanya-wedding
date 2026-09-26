/* =========================================
   ELEMENTS
========================================= */

const video =
    document.getElementById("heroVideo");

const soundButton =
    document.getElementById("soundButton");

const soundIcon =
    document.getElementById("soundIcon");

const heroContent =
    document.getElementById("heroContent");



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

if (video) {

    video.addEventListener(
        "canplay",
        function () {

            video.classList.add(
                "video-ready"
            );

        }
    );

}



/* =========================================
   START VIDEO
========================================= */

async function startVideo() {

    if (!video) {
        return;
    }

    /*
        Mobile browsers generally require
        autoplaying video to start muted.
    */

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
   30 SECOND VIDEO LOOP
========================================= */

if (video) {

    video.addEventListener(
        "timeupdate",
        function () {

            if (
                video.currentTime >=
                LOOP_DURATION
            ) {

                video.currentTime = 0;

                video.play().catch(() => {});

            }

        }
    );

}



/* =========================================
   SOUND BUTTON
========================================= */

if (soundButton) {

    soundButton.addEventListener(
        "click",
        async function () {

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

        }
    );

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

        soundIcon.textContent =
            "🔇";

        soundButton.setAttribute(
            "aria-label",
            "Turn wedding music on"
        );

    }

    else {

        soundIcon.textContent =
            "🔊";

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

if (heroContent) {

    window.addEventListener(
        "scroll",
        function () {

            const scroll =
                window.scrollY;

            const fadeDistance =
                500;


            let opacity =
                1 -
                (
                    scroll /
                    fadeDistance
                );


            opacity =
                Math.max(
                    0,
                    Math.min(
                        1,
                        opacity
                    )
                );


            const movement =
                scroll * 0.15;


            heroContent.style.opacity =
                opacity;

            heroContent.style.transform =
                `translateY(${movement}px)`;

        },
        {
            passive: true
        }
    );

}



/* =========================================
   PAGE VISIBILITY
========================================= */

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

            if (
                video.currentTime >=
                LOOP_DURATION
            ) {

                video.currentTime = 0;

            }


            video.play().catch(() => {});

        }

    }
);



/* =========================================
   WEDDING COUNTDOWN
========================================= */

/*
    Wedding date:
    26 December 2026

    Wedding ceremony:
    11:00 AM

    The countdown uses the visitor's
    local device time.
*/

const weddingDate =
    new Date(
        "December 26, 2026 11:00:00"
    ).getTime();



function updateCountdown() {

    const now =
        new Date().getTime();


    const distance =
        weddingDate - now;


    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    /*
        Make sure all countdown elements
        exist before updating them.
    */

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {

        return;

    }


    /*
        Wedding day has arrived.
    */

    if (distance <= 0) {

        daysElement.textContent =
            "00";

        hoursElement.textContent =
            "00";

        minutesElement.textContent =
            "00";

        secondsElement.textContent =
            "00";

        return;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            ) /
            1000
        );


    daysElement.textContent =
        String(days).padStart(2, "0");


    hoursElement.textContent =
        String(hours).padStart(2, "0");


    minutesElement.textContent =
        String(minutes).padStart(2, "0");


    secondsElement.textContent =
        String(seconds).padStart(2, "0");

}



/* =========================================
   START COUNTDOWN
========================================= */

updateCountdown();


/*
    Update every second.
*/

setInterval(
    updateCountdown,
    1000
);
