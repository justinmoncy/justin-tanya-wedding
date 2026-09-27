/* =========================================
   WEDDING INVITATION
   JUSTIN & TANYA
========================================= */


/* =========================================
   BACKGROUND VIDEO
========================================= */

const heroVideo = document.getElementById("heroVideo");

if (heroVideo) {

    const VIDEO_LOOP_TIME = 30;

    heroVideo.addEventListener("timeupdate", () => {

        if (heroVideo.currentTime >= VIDEO_LOOP_TIME) {

            heroVideo.currentTime = 0;

            heroVideo.play().catch(() => {});

        }

    });

}


/* =========================================
   SOUND BUTTON
========================================= */

const soundButton = document.getElementById("soundButton");
const soundIcon = document.getElementById("soundIcon");

if (soundButton && soundIcon && heroVideo) {

    /*
       Mobile browsers often block autoplay with sound.
       Start muted so the invitation can autoplay.
    */

    heroVideo.muted = true;

    soundIcon.textContent = "🔇";

    soundButton.setAttribute(
        "aria-label",
        "Tap to unmute wedding music"
    );


    /*
       Try to start the video automatically.
    */

    heroVideo.play().catch(() => {});


    /*
       Toggle sound when button is tapped.
       Once unmuted, the button becomes compact.
    */

    soundButton.addEventListener("click", () => {

        if (heroVideo.muted) {

            heroVideo.muted = false;

            soundIcon.textContent = "🔊";

            soundButton.classList.add("compact");

            soundButton.setAttribute(
                "aria-label",
                "Mute wedding music"
            );


            /*
               Some mobile browsers pause the video
               when audio permission is granted.
            */

            heroVideo.play().catch(() => {});

        } else {

            heroVideo.muted = true;

            soundIcon.textContent = "🔇";

            soundButton.setAttribute(
                "aria-label",
                "Turn wedding music on"
            );

        }

    });

}


/* =========================================
   COUNTDOWN
========================================= */

const countdownDays = document.getElementById("countdownDays");
const countdownHours = document.getElementById("countdownHours");
const countdownMinutes = document.getElementById("countdownMinutes");
const countdownSeconds = document.getElementById("countdownSeconds");


function updateCountdown() {

    const weddingDate = new Date(
        "December 26, 2026 00:00:00"
    ).getTime();

    const now = new Date().getTime();

    const difference = weddingDate - now;


    if (difference <= 0) {

        if (countdownDays) countdownDays.textContent = "00";
        if (countdownHours) countdownHours.textContent = "00";
        if (countdownMinutes) countdownMinutes.textContent = "00";
        if (countdownSeconds) countdownSeconds.textContent = "00";

        return;

    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    if (countdownDays) {

        countdownDays.textContent =
            String(days).padStart(2, "0");

    }


    if (countdownHours) {

        countdownHours.textContent =
            String(hours).padStart(2, "0");

    }


    if (countdownMinutes) {

        countdownMinutes.textContent =
            String(minutes).padStart(2, "0");

    }


    if (countdownSeconds) {

        countdownSeconds.textContent =
            String(seconds).padStart(2, "0");

    }

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================
   SCROLL REVEALS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================
       STORY SIDE REVEALS
    ===================================== */

    const storyRevealElements =
        document.querySelectorAll(
            ".story-reveal-right, .story-reveal-left"
        );


    const storyRevealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        storyRevealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.18,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    storyRevealElements.forEach(element => {

        storyRevealObserver.observe(element);

    });

});


/* =========================================
   RSVP MODAL
========================================= */

const rsvpModal =
    document.getElementById("rsvpModal");

const rsvpOpenButton =
    document.getElementById("rsvpOpenButton");

const rsvpCloseButton =
    document.getElementById("rsvpCloseButton");

const rsvpBackdrop =
    document.querySelector(".rsvp-modal-backdrop");


function openRsvpModal() {

    if (!rsvpModal) return;

    rsvpModal.classList.add("active");

    document.body.classList.add("rsvp-open");

}


function closeRsvpModal() {

    if (!rsvpModal) return;

    rsvpModal.classList.remove("active");

    document.body.classList.remove("rsvp-open");

}


if (rsvpOpenButton) {

    rsvpOpenButton.addEventListener(
        "click",
        openRsvpModal
    );

}


if (rsvpCloseButton) {

    rsvpCloseButton.addEventListener(
        "click",
        closeRsvpModal
    );

}


if (rsvpBackdrop) {

    rsvpBackdrop.addEventListener(
        "click",
        closeRsvpModal
    );

}


document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        rsvpModal &&
        rsvpModal.classList.contains("active")
    ) {

        closeRsvpModal();

    }

});


/* =========================================
   RSVP FORM
========================================= */

const rsvpForm =
    document.getElementById("rsvpForm");

const rsvpStatus =
    document.getElementById("rsvpStatus");


const RSVP_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbyTcbqx2W1-inn8V0RXrtRIsxA_NvldqbI_SpB87pv1YmwGd4jaY70Sq2wNr-ZoZMKTTw/exec";


if (rsvpForm) {

    rsvpForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            if (rsvpStatus) {

                rsvpStatus.textContent =
                    "Sending your RSVP...";

            }


            const formData =
                new FormData(rsvpForm);


            try {

                await fetch(
                    RSVP_ENDPOINT,
                    {
                        method: "POST",
                        mode: "no-cors",
                        body: formData
                    }
                );


                if (rsvpStatus) {

                    rsvpStatus.textContent =
                        "Thank you! Your RSVP has been received. ❤️";

                }


                rsvpForm.reset();


            } catch (error) {

                console.error(
                    "RSVP submission error:",
                    error
                );


                if (rsvpStatus) {

                    rsvpStatus.textContent =
                        "Something went wrong. Please try again.";

                }

            }

        }
    );

}


/* =========================================
   OFFICIAL CLOUDINARY GALLERY
========================================= */

const officialGallery =
    document.getElementById("officialGallery");


const CLOUDINARY_CLOUD =
    "deft8ujf";


const OFFICIAL_TAG =
    "official-wedding";


async function loadOfficialGallery() {

    if (!officialGallery) return;


    try {

        /*
           Cloudinary resource listing endpoint
           for the official wedding gallery.
        */

        const response = await fetch(
            `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/list/${OFFICIAL_TAG}.json`
        );


        if (!response.ok) {

            throw new Error(
                "Gallery request failed"
            );

        }


        const data =
            await response.json();


        const resources =
            data.resources || [];


        if (!resources.length) {

            officialGallery.innerHTML = `
                <div class="gallery-status">
                    Our photos will appear here soon.
                </div>
            `;

            return;

        }


        officialGallery.innerHTML = "";


        resources.forEach(resource => {

            const imageUrl =
                `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload/f_auto,q_auto/${resource.public_id}.${resource.format}`;


            const button =
                document.createElement("button");


            button.className =
                "gallery-item";


            button.type =
                "button";


            button.innerHTML = `
                <img
                    src="${imageUrl}"
                    alt="Justin and Tanya wedding photo"
                    loading="lazy"
                >
            `;


            button.addEventListener(
                "click",
                () => {

                    openLightbox(imageUrl);

                }
            );


            officialGallery.appendChild(
                button
            );

        });


    } catch (error) {

        console.error(
            "Could not load official gallery:",
            error
        );


        officialGallery.innerHTML = `
            <div class="gallery-status">
                Our photos will appear here soon.
            </div>
        `;

    }

}


loadOfficialGallery();


/* =========================================
   LIGHTBOX
========================================= */

function openLightbox(imageUrl) {

    const lightbox =
        document.getElementById("galleryLightbox");

    const lightboxImage =
        document.getElementById(
            "galleryLightboxImage"
        );


    if (!lightbox || !lightboxImage) return;


    lightboxImage.src =
        imageUrl;


    lightbox.classList.add(
        "active"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "rsvp-open"
    );

}


function closeLightbox() {

    const lightbox =
        document.getElementById("galleryLightbox");


    if (!lightbox) return;


    lightbox.classList.remove(
        "active"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "rsvp-open"
    );

}


const lightboxClose =
    document.getElementById(
        "galleryLightboxClose"
    );


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


const galleryLightbox =
    document.getElementById(
        "galleryLightbox"
    );


if (galleryLightbox) {

    galleryLightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === galleryLightbox
            ) {

                closeLightbox();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            galleryLightbox &&
            galleryLightbox.classList.contains(
                "active"
            )
        ) {

            closeLightbox();

        }

    }
);


/* =========================================
   GUEST PHOTO UPLOAD
========================================= */

const guestUploadButton =
    document.getElementById(
        "guestUploadButton"
    );


const uploadStatus =
    document.getElementById(
        "uploadStatus"
    );


if (guestUploadButton) {

    guestUploadButton.addEventListener(
        "click",
        () => {

            if (
                typeof cloudinary ===
                "undefined"
            ) {

                if (uploadStatus) {

                    uploadStatus.textContent =
                        "Photo upload is currently unavailable.";

                }

                return;

            }


            const widget =
                cloudinary.createUploadWidget(
                    {
                        cloudName:
                            "deft8ujf",

                        uploadPreset:
                            "justin_tanya_wedding",

                        folder:
                            "justin-tanya-wedding/guest-photos",

                        sources: [
                            "local",
                            "camera"
                        ],

                        multiple: true,

                        maxFiles: 10,

                        clientAllowedFormats: [
                            "jpg",
                            "jpeg",
                            "png",
                            "webp"
                        ]

                    },

                    (error, result) => {

                        if (error) {

                            console.error(
                                "Cloudinary upload error:",
                                error
                            );

                            if (uploadStatus) {

                                uploadStatus.textContent =
                                    "Something went wrong while uploading.";

                            }

                            return;

                        }


                        if (
                            result &&
                            result.event ===
                            "success"
                        ) {

                            if (uploadStatus) {

                                uploadStatus.textContent =
                                    "Thank you for sharing your photo! ❤️";

                            }

                        }

                    }
                );


            widget.open();

        }
    );

}
