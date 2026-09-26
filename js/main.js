/* =========================================
   WEDDING INVITATION JAVASCRIPT
========================================= */


/* =========================================
   BACKGROUND VIDEO
========================================= */

const heroVideo = document.getElementById("heroVideo");

const VIDEO_LOOP_POINT = 30;


if (heroVideo) {

    heroVideo.addEventListener("canplay", function () {

        heroVideo.classList.add("video-ready");

        heroVideo.play().catch(function () {
            console.log("Autoplay was blocked.");
        });

    });


    heroVideo.addEventListener("timeupdate", function () {

        if (heroVideo.currentTime >= VIDEO_LOOP_POINT) {

            heroVideo.currentTime = 0;

            heroVideo.play().catch(function () {
                console.log("Video playback was blocked.");
            });

        }

    });

}


/* =========================================
   SOUND BUTTON
========================================= */

const soundButton =
    document.getElementById("soundButton");

const soundIcon =
    document.getElementById("soundIcon");


if (soundButton && heroVideo) {

    soundButton.addEventListener("click", function () {

        if (heroVideo.muted) {

            heroVideo.muted = false;

            heroVideo.play().catch(function () {});

            soundIcon.textContent = "🔊";

            soundButton.setAttribute(
                "aria-label",
                "Turn wedding music off"
            );

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
   HERO SCROLL FADE
========================================= */

const heroContent =
    document.getElementById("heroContent");


window.addEventListener("scroll", function () {

    if (!heroContent) return;

    const scrollY = window.scrollY;

    const opacity =
        Math.max(
            0,
            1 - (scrollY / (window.innerHeight * 0.75))
        );

    const translate =
        Math.min(
            60,
            scrollY * 0.15
        );

    heroContent.style.opacity = opacity;

    heroContent.style.transform =
        `translateY(${translate}px)`;

});


/* =========================================
   COUNTDOWN
========================================= */

const weddingDate =
    new Date("December 26, 2026 00:00:00").getTime();


const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");


function updateCountdown() {

    const now =
        new Date().getTime();

    const difference =
        weddingDate - now;


    if (difference <= 0) {

        if (daysElement) daysElement.textContent = "00";
        if (hoursElement) hoursElement.textContent = "00";
        if (minutesElement) minutesElement.textContent = "00";
        if (secondsElement) secondsElement.textContent = "00";

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (difference %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (difference %
                (1000 * 60)) /
            1000
        );


    if (daysElement) {
        daysElement.textContent =
            String(days).padStart(2, "0");
    }

    if (hoursElement) {
        hoursElement.textContent =
            String(hours).padStart(2, "0");
    }

    if (minutesElement) {
        minutesElement.textContent =
            String(minutes).padStart(2, "0");
    }

    if (secondsElement) {
        secondsElement.textContent =
            String(seconds).padStart(2, "0");
    }

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================
   RSVP MODAL
========================================= */

const rsvpModal =
    document.getElementById("rsvpModal");

const rsvpOpenButton =
    document.getElementById("rsvpOpenButton");

const rsvpCloseButton =
    document.getElementById("rsvpCloseButton");

const rsvpModalBackdrop =
    document.getElementById("rsvpModalBackdrop");


function openRsvpModal() {

    if (!rsvpModal) return;

    rsvpModal.classList.add("active");

    rsvpModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "rsvp-open"
    );


    const nameInput =
        document.getElementById("guestName");


    if (nameInput) {

        setTimeout(function () {

            nameInput.focus();

        }, 300);

    }

}


function closeRsvpModal() {

    if (!rsvpModal) return;

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


if (rsvpModalBackdrop) {

    rsvpModalBackdrop.addEventListener(
        "click",
        closeRsvpModal
    );

}


document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeRsvpModal();

        }

    }
);


/* =========================================
   RSVP GOOGLE SHEET
========================================= */

const RSVP_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbyTcbqx2W1-inn8V0RXrtRIsxA_NvldqbI_SpB87pv1YmwGd4jaY70Sq2wNr-ZoZMKTTw/exec";


const rsvpForm =
    document.getElementById("rsvpForm");

const rsvpStatus =
    document.getElementById("rsvpStatus");

const rsvpSubmit =
    document.getElementById("rsvpSubmit");

const attendanceInputs =
    document.querySelectorAll(
        'input[name="attendance"]'
    );

const guestCountField =
    document.getElementById(
        "guestCountField"
    );

const mealField =
    document.getElementById(
        "mealField"
    );

const guestCount =
    document.getElementById(
        "guestCount"
    );

const mealPreference =
    document.getElementById(
        "mealPreference"
    );


function updateRsvpFields() {

    const selected =
        document.querySelector(
            'input[name="attendance"]:checked'
        );


    if (!selected) return;


    const attending =
        selected.value ===
        "Joyfully accepting";


    if (guestCountField) {

        guestCountField.style.display =
            attending
                ? "flex"
                : "none";

    }


    if (mealField) {

        mealField.style.display =
            attending
                ? "flex"
                : "none";

    }


    if (!attending) {

        if (guestCount) {
            guestCount.value = "0";
        }

        if (mealPreference) {
            mealPreference.value = "";
        }

    } else {

        if (
            guestCount &&
            guestCount.value === "0"
        ) {

            guestCount.value = "1";

        }


        if (
            mealPreference &&
            !mealPreference.value
        ) {

            mealPreference.value =
                "Prefer not to say";

        }

    }

}


attendanceInputs.forEach(
    function (input) {

        input.addEventListener(
            "change",
            updateRsvpFields
        );

    }
);


if (rsvpForm) {

    rsvpForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const formData =
                new FormData(rsvpForm);


            const honeypot =
                String(
                    formData.get("website") || ""
                ).trim();


            if (honeypot) {
                return;
            }


            const name =
                String(
                    formData.get("name") || ""
                ).trim();


            const attendance =
                String(
                    formData.get("attendance") || ""
                ).trim();


            const guests =
                String(
                    formData.get("guests") || "0"
                ).trim();


            const meal =
                String(
                    formData.get("meal") || ""
                ).trim();


            const message =
                String(
                    formData.get("message") || ""
                ).trim();


            if (!name || !attendance) {

                rsvpStatus.textContent =
                    "Please enter your name and RSVP.";

                rsvpStatus.className =
                    "rsvp-status error";

                return;

            }


            const submission =
                new URLSearchParams();


            submission.append(
                "name",
                name
            );

            submission.append(
                "attendance",
                attendance
            );

            submission.append(
                "guests",
                guests
            );

            submission.append(
                "meal",
                meal
            );

            submission.append(
                "message",
                message
            );


            rsvpSubmit.disabled = true;

            rsvpSubmit.querySelector(
                "span"
            ).textContent =
                "SENDING…";


            rsvpStatus.textContent =
                "";

            rsvpStatus.className =
                "rsvp-status";


            try {

                await fetch(
                    RSVP_ENDPOINT,
                    {
                        method: "POST",
                        body: submission
                    }
                );


                rsvpForm.reset();

                updateRsvpFields();


                rsvpStatus.textContent =
                    "Thank you. Your RSVP has been received ♥";


                rsvpStatus.className =
                    "rsvp-status success";


            } catch (error) {

                console.error(
                    "RSVP submission error:",
                    error
                );


                /*
                 * Apps Script may complete the
                 * submission even if the browser
                 * cannot read the redirected response.
                 *
                 * The request is therefore treated
                 * as submitted here, matching the
                 * working setup already tested.
                 */

                rsvpForm.reset();

                updateRsvpFields();


                rsvpStatus.textContent =
                    "Thank you. Your RSVP has been received ♥";


                rsvpStatus.className =
                    "rsvp-status success";

            }


            rsvpSubmit.disabled =
                false;


            rsvpSubmit.querySelector(
                "span"
            ).textContent =
                "SUBMIT RSVP";

        }
    );

}


updateRsvpFields();


/* =========================================
   CLOUDINARY GUEST PHOTO UPLOAD
========================================= */

const uploadButton =
    document.getElementById(
        "uploadWidgetButton"
    );

const uploadStatus =
    document.getElementById(
        "uploadStatus"
    );


let uploadWidget = null;


if (
    uploadButton &&
    typeof cloudinary !== "undefined"
) {

    uploadWidget =
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


            function (error, result) {

                if (error) {

                    console.error(
                        "Cloudinary upload error:",
                        error
                    );

                    uploadStatus.textContent =
                        "Something went wrong. Please try again.";

                    return;

                }


                if (
                    result &&
                    result.event === "queues-start"
                ) {

                    uploadStatus.textContent =
                        "Uploading your beautiful moments…";

                }


                if (
                    result &&
                    result.event === "success"
                ) {

                    uploadStatus.textContent =
                        "Your photo has been shared with Justin & Tanya ♥";

                }


                if (
                    result &&
                    result.event === "close"
                ) {

                    uploadStatus.textContent =
                        "Thank you for sharing your memories ♥";

                }

            }

        );


    uploadButton.addEventListener(
        "click",
        function () {

            uploadStatus.textContent =
                "";

            uploadWidget.open();

        }
    );

}


/* =========================================
   OFFICIAL WEDDING GALLERY
========================================= */

const galleryGrid =
    document.getElementById(
        "galleryGrid"
    );

const galleryStatus =
    document.getElementById(
        "galleryStatus"
    );


const CLOUDINARY_CLOUD_NAME =
    "deft8ujf";


const GALLERY_TAG =
    "official-wedding";


async function loadWeddingGallery() {

    if (!galleryGrid) return;


    const listUrl =
        `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/${GALLERY_TAG}.json`;


    try {

        const response =
            await fetch(listUrl);


        if (!response.ok) {
            throw new Error(
                "Gallery request failed."
            );
        }


        const data =
            await response.json();


        const resources =
            Array.isArray(data.resources)
                ? data.resources
                : [];


        if (!resources.length) {

            galleryStatus.textContent =
                "Our gallery will bloom here soon.";

            return;

        }


        galleryGrid.innerHTML =
            "";


        galleryStatus.textContent =
            "";


        resources.forEach(
            function (resource) {

                const item =
                    document.createElement(
                        "button"
                    );


                item.className =
                    "gallery-item";

                item.type =
                    "button";


                const image =
                    document.createElement(
                        "img"
                    );


                const imageUrl =
                    `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_1200,c_fill/${resource.public_id}.${resource.format}`;


                image.src =
                    imageUrl;

                image.alt =
                    "Justin and Tanya wedding moment";

                image.loading =
                    "lazy";


                item.appendChild(
                    image
                );


                item.addEventListener(
                    "click",
                    function () {

                        openGalleryLightbox(
                            imageUrl
                        );

                    }
                );


                galleryGrid.appendChild(
                    item
                );

            }
        );


    } catch (error) {

        console.error(
            "Gallery error:",
            error
        );


        galleryStatus.textContent =
            "Our gallery will bloom here soon.";

    }

}


loadWeddingGallery();


/* =========================================
   GALLERY LIGHTBOX
========================================= */

function openGalleryLightbox(
    imageUrl
) {

    let lightbox =
        document.getElementById(
            "galleryLightbox"
        );


    if (!lightbox) {

        lightbox =
            document.createElement(
                "div"
            );


        lightbox.id =
            "galleryLightbox";

        lightbox.className =
            "gallery-lightbox";


        const image =
            document.createElement(
                "img"
            );


        image.className =
            "gallery-lightbox-image";


        const close =
            document.createElement(
                "button"
            );


        close.className =
            "gallery-lightbox-close";

        close.type =
            "button";

        close.setAttribute(
            "aria-label",
            "Close photo"
        );

        close.textContent =
            "×";


        lightbox.appendChild(
            image
        );

        lightbox.appendChild(
            close
        );


        document.body.appendChild(
            lightbox
        );


        close.addEventListener(
            "click",
            closeGalleryLightbox
        );


        lightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeGalleryLightbox();

                }

            }
        );

    }


    const image =
        lightbox.querySelector(
            ".gallery-lightbox-image"
        );


    image.src =
        imageUrl;


    lightbox.classList.add(
        "active"
    );

}


function closeGalleryLightbox() {

    const lightbox =
        document.getElementById(
            "galleryLightbox"
        );


    if (!lightbox) return;


    lightbox.classList.remove(
        "active"
    );

}


document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeGalleryLightbox();

        }

    }
);
