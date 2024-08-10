let link = document.getElementsByClassName("link");
let currentValue = 1; 

function activeLink(event) {
    for (let l of link) {
        l.classList.remove("active");
    }
    event.target.classList.add("active");
    currentValue = event.target.value;
}

function backBtn() {
    if (currentValue > 1) {
        currentValue--;
        window.location.href = "search" + (currentValue === 1 ? "" : currentValue) + ".html";
    }
}

function nextBtn() {
    if (currentValue < 4) {
        currentValue++;
        window.location.href = "search" + (currentValue === 4 ? "" : currentValue) + ".html";
    }
}
