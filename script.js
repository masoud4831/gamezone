function filterImages(category, button) {

    const cards = document.querySelectorAll(".card");
    const buttons = document.querySelectorAll(".filter");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    cards.forEach(card => {

        if (category === "all") {
            card.style.display = "block";
        }

        else if (card.classList.contains(category)) {
            card.style.display = "block";
        }

        else {
            card.style.display = "none";
        }

    });
}


function toggleMenu() {

    const nav = document.querySelector("nav");

    nav.classList.toggle("show");

}