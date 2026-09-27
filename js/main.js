/* =========================================
   BACKGROUND VIDEO
========================================= */

const heroVideo =
    document.getElementById("heroVideo");


if (heroVideo) {

    /*
     * The video plays from the beginning
     * and loops after 30 seconds.
     */

    heroVideo.addEventListener(
        "timeupdate",
        () => {

            if (heroVideo.currentTime >= 30) {

                heroVideo.currentTime = 0;

                heroVideo.play().catch(() => {});

            }

        }
    );

}


/* =========================================
   SOUND BUTTON
========================================= */

const soundButton =
    document.getElementById("soundButton");

const soundIcon =
    document.getElementById("soundIcon");


if (soundButton && heroVideo) {


    soundButton.addEventListener(
        "click",
        async () => {

            if (heroVideo.muted) {

                heroVideo.muted = false;

                try {

                    await heroVideo.play();

                    soundIcon.textContent = "🔊";

                    soundButton.setAttribute(
                        "aria-label",
                        "Turn wedding music off"
                    );

                } catch (error) {

                    heroVideo.muted = true;

                    soundIcon.textContent = "🔇";

                    soundButton.setAttribute(
                        "aria-label",
                        "Turn wedding music on"
                    );

                }

            } else {

                heroVideo.muted = true;

                soundIcon.textContent = "🔇";

                soundButton.setAttribute(
                    "aria-label",
                    "Turn wedding music on"
                );

            }

        }
    );


    /*
     * Try autoplay first.
     * Mobile browsers may require muted playback.
     */

    heroVideo.muted = true;

    heroVideo.play().catch(() => {});

}


/* =========================================
   COUNTDOWN
========================================= */

const weddingDate =
    new Date("December 26, 2026 00:00:00");


function updateCountdown() {

    const now =
        new Date();

    const difference =
        weddingDate.getTime() - now.getTime();


    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {

        return;

    }


    if (difference <= 0) {

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
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) %
            24
        );


    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) %
            60
        );


    const seconds =
        Math.floor(
            (difference / 1000) %
            60
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


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================
   SCROLL REVEAL
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const revealElements =
            document.querySelectorAll(
                ".reveal:not(.story-reveal-left):not(.story-reveal-right)"
            );


        if (
            !("IntersectionObserver" in window)
        ) {

            revealElements.forEach(
                element => {

                    element.classList.add(
                        "visible"
                    );

                }
            );

            return;

        }


        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    }
);


/* =========================================
   JOURNEY SIDE REVEAL
========================================= */

const storyRevealElements =
    document.querySelectorAll(
        ".story-reveal-left, .story-reveal-right"
    );


if (
    storyRevealElements.length &&
    ("IntersectionObserver" in window)
) {

    const storyRevealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.15,
                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    storyRevealElements.forEach(
        element => {

            storyRevealObserver.observe(
                element
            );

        }
    );

}


/* =========================================
   RSVP MODAL
========================================= */

const rsvpOpenButton =
    document.getElementById(
        "rsvpOpenButton"
    );

const rsvpModal =
    document.getElementById(
        "rsvpModal"
    );

const rsvpCloseButton =
    document.getElementById(
        "rsvpCloseButton"
    );

const rsvpBackdrop =
    rsvpModal
        ? rsvpModal.querySelector(
            ".rsvp-modal-backdrop"
        )
        : null;


function openRsvpModal() {

    if (!rsvpModal) {
        return;
    }

    rsvpModal.classList.add(
        "active"
    );

    rsvpModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "rsvp-open"
    );

}


function closeRsvpModal() {

    if (!rsvpModal) {
        return;
    }

    rsvpModal.classList.remove(
        "active"
    );

    rsvpModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "rsvp-open"
    );

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


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            rsvpModal &&
            rsvpModal.classList.contains("active")
        ) {

            closeRsvpModal();

        }

    }
);


/* =========================================
   RSVP FORM
========================================= */

const rsvpForm =
    document.getElementById(
        "rsvpForm"
    );

const rsvpAttendance =
    document.getElementById(
        "rsvpAttendance"
    );

const rsvpAdditionalFields =
    document.getElementById(
        "rsvpAdditionalFields"
    );

const rsvpGuests =
    document.getElementById(
        "rsvpGuests"
    );

const rsvpMeal =
    document.getElementById(
        "rsvpMeal"
    );

const rsvpStatus =
    document.getElementById(
        "rsvpStatus"
    );


const RSVP_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbyTcbqx2W1-inn8V0RXrtRIsxA_NvldqbI_SpB87pv1YmwGd4jaY70Sq2wNr-ZoZMKTTw/exec";


function updateRsvpFields() {

    if (
        !rsvpAttendance ||
        !rsvpAdditionalFields
    ) {

        return;

    }


    if (
        rsvpAttendance.value ===
        "Joyfully accepting"
    ) {

        rsvpAdditionalFields.style.display =
            "block";

    } else {

        rsvpAdditionalFields.style.display =
            "none";

        if (rsvpGuests) {
            rsvpGuests.value = "0";
        }

        if (rsvpMeal) {
            rsvpMeal.value = "";
        }

    }

}


if (rsvpAttendance) {

    rsvpAttendance.addEventListener(
        "change",
        updateRsvpFields
    );

    updateRsvpFields();

}


if (rsvpForm) {

    rsvpForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            if (rsvpStatus) {

                rsvpStatus.textContent =
                    "Sending your RSVP…";

            }


            const formData =
                new FormData(
                    rsvpForm
                );


            /*
             * Honeypot protection
             */

            if (
                String(
                    formData.get("website") ||
                    ""
                ).trim()
            ) {

                return;

            }


            const params =
                new URLSearchParams();


            params.append(
                "name",
                String(
                    formData.get("name") ||
                    ""
                ).trim()
            );


            params.append(
                "attendance",
                String(
                    formData.get("attendance") ||
                    ""
                ).trim()
            );


            params.append(
                "guests",
                String(
                    formData.get("guests") ||
                    "0"
                ).trim()
            );


            params.append(
                "meal",
                String(
                    formData.get("meal") ||
                    ""
                ).trim()
            );


            params.append(
                "message",
                String(
                    formData.get("message") ||
                    ""
                ).trim()
            );


            try {

                await fetch(
                    RSVP_ENDPOINT,
                    {
                        method: "POST",
                        mode: "no-cors",
                        headers: {
                            "Content-Type":
                                "application/x-www-form-urlencoded"
                        },
                        body:
                            params.toString()
                    }
                );


                /*
                 * Google Apps Script can redirect
                 * the request, so the browser may not
                 * expose the response. The request is
                 * therefore treated as submitted here.
                 */

                if (rsvpStatus) {

                    rsvpStatus.textContent =
                        "Thank you. Your RSVP has been received ♥";

                }


                rsvpForm.reset();

                updateRsvpFields();


            } catch (error) {

                /*
                 * Keep the existing graceful behavior
                 * for Apps Script browser restrictions.
                 */

                if (rsvpStatus) {

                    rsvpStatus.textContent =
                        "Thank you. Your RSVP has been received ♥";

                }

            }

        }
    );

}


/* =========================================
   OFFICIAL CLOUDINARY GALLERY
========================================= */

const officialGallery =
    document.getElementById(
        "officialGallery"
    );


const CLOUDINARY_CLOUD_NAME =
    "deft8ujf";


const GALLERY_TAG =
    "official-wedding";


async function loadOfficialGallery() {

    if (!officialGallery) {
        return;
    }


    const galleryUrl =
        `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/${GALLERY_TAG}.json`;


    try {

        const response =
            await fetch(
                galleryUrl
            );


        if (!response.ok) {

            throw new Error(
                "Gallery unavailable"
            );

        }


        const data =
            await response.json();


        const resources =
            data.resources || [];


        if (!resources.length) {

            officialGallery.innerHTML = `
                <p class="gallery-status">
                    Our gallery will bloom here soon.
                </p>
            `;

            return;

        }


        officialGallery.innerHTML =
            "";


        resources.forEach(
            resource => {

                const publicId =
                    resource.public_id;


                const format =
                    resource.format ||
                    "jpg";


                const imageUrl =
                    `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_1200,c_fill/${publicId}.${format}`;


                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";

                button.className =
                    "gallery-item";


                const image =
                    document.createElement(
                        "img"
                    );


                image.src =
                    imageUrl;

                image.alt =
                    "Justin and Tanya wedding memory";

                image.loading =
                    "lazy";


                button.appendChild(
                    image
                );


                button.addEventListener(
                    "click",
                    () => {

                        openGalleryLightbox(
                            imageUrl
                        );

                    }
                );


                officialGallery.appendChild(
                    button
                );

            }
        );


    } catch (error) {

        officialGallery.innerHTML = `
            <p class="gallery-status">
                Our gallery will bloom here soon.
            </p>
        `;

    }

}


function openGalleryLightbox(
    imageUrl
) {

    const lightbox =
        document.createElement(
            "div"
        );


    lightbox.className =
        "gallery-lightbox";


    const image =
        document.createElement(
            "img"
        );


    image.className =
        "gallery-lightbox-image";

    image.src =
        imageUrl;

    image.alt =
        "Justin and Tanya wedding memory";


    const closeButton =
        document.createElement(
            "button"
        );


    closeButton.className =
        "gallery-lightbox-close";

    closeButton.type =
        "button";

    closeButton.setAttribute(
        "aria-label",
        "Close image"
    );

    closeButton.textContent =
        "×";


    lightbox.appendChild(
        image
    );

    lightbox.appendChild(
        closeButton
    );


    document.body.appendChild(
        lightbox
    );


    closeButton.addEventListener(
        "click",
        () => {

            lightbox.remove();

        }
    );


    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox
            ) {

                lightbox.remove();

            }

        }
    );


    document.addEventListener(
        "keydown",
        function closeWithEscape(
            event
        ) {

            if (
                event.key === "Escape"
            ) {

                lightbox.remove();

                document.removeEventListener(
                    "keydown",
                    closeWithEscape
                );

            }

        }
    );

}


loadOfficialGallery();


/* =========================================
   CLOUDINARY GUEST UPLOAD
========================================= */

const guestUploadButton =
    document.getElementById(
        "guestUploadButton"
    );

const uploadStatus =
    document.getElementById(
        "uploadStatus"
    );


if (
    guestUploadButton &&
    typeof cloudinary !== "undefined"
) {


    const uploadWidget =
        cloudinary.createUploadWidget(
            {

                cloudName:
                    "deft8ujf",

                uploadPreset:
                    "justin_tanya_wedding",

                asset_folder:
                    "justin-tanya-wedding/guest-photos",

                multiple:
                    true,

                sources:
                    [
                        "local",
                        "camera"
                    ],

                resourceType:
                    "image",

                maxFileSize:
                    10000000,

                maxFiles:
                    20,

                clientAllowedFormats:
                    [
                        "jpg",
                        "jpeg",
                        "png",
                        "webp",
                        "heic"
                    ],

                showAdvancedOptions:
                    false,

                cropping:
                    false,

                defaultSource:
                    "local"

            },


            (
                error,
                result
            ) => {

                if (error) {

                    if (uploadStatus) {

                        uploadStatus.textContent =
                            "Something went wrong. Please try again.";

                    }

                    return;

                }


                if (
                    result &&
                    result.event ===
                    "queues-start"
                ) {

                    if (uploadStatus) {

                        uploadStatus.textContent =
                            "Uploading your beautiful moments…";

                    }

                }


                if (
                    result &&
                    result.event ===
                    "success"
                ) {

                    if (uploadStatus) {

                        uploadStatus.textContent =
                            "Your photo has been shared with Justin & Tanya ♥";

                    }

                }


                if (
                    result &&
                    result.event ===
                    "close"
                ) {

                    if (uploadStatus) {

                        uploadStatus.textContent =
                            "Thank you for sharing your memories ♥";

                    }

                }

            }

        );


    guestUploadButton.addEventListener(
        "click",
        () => {

            uploadWidget.open();

        }
    );

}
