```javascript
/* ================= IMAGE DATABASE ================= */

/*
    حداکثر 50 عکس برای هر گالری

    فقط عکس‌هایی را که واقعاً داری وارد کن.

    مثال:
    اگر فقط 4 عکس داری،
    فقط 4 مورد را بنویس.
*/

const galleries = {

    football: {

        title: "Football",

        subtitle: "FOOTBALL GALLERY",

        images: [

            "images/football/football1.jpg",
            "images/football/football2.jpg",
            "images/football/football3.jpg",
            "images/football/football4.jpg"

        ]

    },


    shooter: {

        title: "Shooter",

        subtitle: "SHOOTER GALLERY",

        images: [

            "images/shooter/shooter1.jpg",
            "images/shooter/shooter2.jpg",
            "images/shooter/shooter3.jpg",
            "images/shooter/shooter4.jpg"

        ]

    },


    gaming: {

        title: "Gaming",

        subtitle: "GAMING GALLERY",

        images: [

            "images/gaming/gaming1.jpg",
            "images/gaming/gaming2.jpg",
            "images/gaming/gaming3.jpg",
            "images/gaming/gaming4.jpg"

        ]

    }

};



/* ================= VARIABLES ================= */

let currentGallery = [];

let currentIndex = 0;

let zoomLevel = 1;



/* ================= COUNTERS ================= */

function updateCounters() {

    const football =
        galleries.football.images.length;

    const shooter =
        galleries.shooter.images.length;

    const gaming =
        galleries.gaming.images.length;


    document.getElementById(
        "footballCount"
    ).textContent =
        football + " Images";


    document.getElementById(
        "shooterCount"
    ).textContent =
        shooter + " Images";


    document.getElementById(
        "gamingCount"
    ).textContent =
        gaming + " Images";


    const total =
        football +
        shooter +
        gaming;


    document.getElementById(
        "totalImages"
    ).textContent = total;

}



/* ================= OPEN GALLERY ================= */

function openGallery(category) {

    const gallery =
        galleries[category];


    currentGallery =
        gallery.images;


    currentIndex = 0;


    document.getElementById(
        "galleryTitle"
    ).textContent =
        gallery.title;


    document.getElementById(
        "gallerySubtitle"
    ).textContent =
        gallery.subtitle;


    const grid =
        document.getElementById(
            "galleryGrid"
        );


    grid.innerHTML = "";


    currentGallery.forEach(
        function(image,index) {

            const img =
                document.createElement(
                    "img"
                );


            img.src = image;

            img.loading = "lazy";

            img.alt =
                gallery.title +
                " image " +
                (index + 1);


            img.onclick =
                function() {

                    openLightbox(index);

                };


            grid.appendChild(img);

        }
    );


    document
        .getElementById("galleryView")
        .classList.add("active");


    document
        .getElementById("galleryView")
        .scrollIntoView({
            behavior: "smooth"
        });

}



/* ================= CLOSE GALLERY ================= */

function closeGallery() {

    document
        .getElementById("galleryView")
        .classList.remove("active");

}



/* ================= LIGHTBOX ================= */

function openLightbox(index) {

    currentIndex = index;

    zoomLevel = 1;

    updateLightbox();

    document
        .getElementById("lightbox")
        .classList.add("active");

    document.body.style.overflow =
        "hidden";

}



/* ================= UPDATE LIGHTBOX ================= */

function updateLightbox() {

    const image =
        document.getElementById(
            "lightboxImage"
        );


    image.src =
        currentGallery[currentIndex];


    image.style.transform =
        "scale(" +
        zoomLevel +
        ")";


    document.getElementById(
        "imageNumber"
    ).textContent =

        (currentIndex + 1) +
        " / " +
        currentGallery.length;

}



/* ================= CLOSE LIGHTBOX ================= */

function closeLightbox() {

    document
        .getElementById("lightbox")
        .classList.remove("active");

    document.body.style.overflow =
        "auto";

}



/* ================= NEXT ================= */

function nextImage() {

    currentIndex++;


    if (
        currentIndex >=
        currentGallery.length
    ) {

        currentIndex = 0;

    }


    zoomLevel = 1;

    updateLightbox();

}



/* ================= PREVIOUS ================= */

function previousImage() {

    currentIndex--;


    if (currentIndex < 0) {

        currentIndex =
            currentGallery.length - 1;

    }


    zoomLevel = 1;

    updateLightbox();

}



/* ================= ZOOM IN ================= */

function zoomIn() {

    zoomLevel += .2;


    if (zoomLevel > 3) {

        zoomLevel = 3;

    }


    updateLightbox();

}



/* ================= ZOOM OUT ================= */

function zoomOut() {

    zoomLevel -= .2;


    if (zoomLevel < .5) {

        zoomLevel = .5;

    }


    updateLightbox();

}



/* ================= MOUSE WHEEL ZOOM ================= */

document
    .getElementById("lightbox")
    .addEventListener(
        "wheel",
        function(event) {

            event.preventDefault();


            if (event.deltaY < 0) {

                zoomIn();

            }

            else {

                zoomOut();

            }

        },
        {
            passive: false
        }
    );



/* ================= KEYBOARD ================= */

document.addEventListener(
    "keydown",
    function(event) {

        const lightbox =
            document.getElementById(
                "lightbox"
            );


        if (
            !lightbox.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (
            event.key === "Escape"
        ) {

            closeLightbox();

        }


        if (
            event.key === "ArrowRight"
        ) {

            nextImage();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousImage();

        }


        if (
            event.key === "+"
        ) {

            zoomIn();

        }


        if (
            event.key === "-"
        ) {

            zoomOut();

        }

    }
);



/* ================= SEARCH ================= */

function searchImages() {

    const query =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .toLowerCase();


    const categories =
        document.querySelectorAll(
            ".category"
        );


    categories.forEach(
        function(card) {

            const text =
                card.innerText
                    .toLowerCase();


            if (
                text.includes(query)
            ) {

                card.style.display =
                    "block";

            }

            else {

                card.style.display =
                    "none";

            }

        }
    );

}



/* ================= MUSIC ================= */

const music =
    document.getElementById(
        "backgroundMusic"
    );


function toggleMusic() {

    const icon =
        document.getElementById(
            "musicIcon"
        );


    const text =
        document.getElementById(
            "musicText"
        );


    if (music.paused) {

        music.play();


        icon.textContent =
            "❚❚";


        text.textContent =
            "توقف موزیک";

    }

    else {

        music.pause();


        icon.textContent =
            "▶";


        text.textContent =
            "پخش موزیک";

    }

}



/* ================= MOBILE MENU ================= */

function toggleMenu() {

    document
        .getElementById("nav")
        .classList.toggle("show");

}



/* ================= CONTACT ================= */

function sendMessage(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("name")
            .value;


    document
        .getElementById(
            "messageStatus"
        )
        .textContent =

        "پیام شما ثبت شد، " +
        name +
        " عزیز ❤️";


    event.target.reset();

}



/* ================= START ================= */

updateCounters();
```
