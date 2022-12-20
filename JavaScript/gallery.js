let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if(galleryImages) {
    galleryImages.forEach(function(image, index) {
        image.onclick = function() {
            let getElementCss = window.getComputedStyle(image); // Getting the computed properties and values of an HTML element - clicked thumb in this case
            let getFullImgUrl = getElementCss.getPropertyValue("background-image"); // We take the url for Thumbnail image
            // console.log(getFullImgUrl); <- returns e.g. url("http://127.0.0.1:4000/am_global/thumbs/img2.jpg")

            let getImgUrlPos = getFullImgUrl.split("/thumbs/"); // We want to grab last part of the url link (imgX.jpg)
            let setNewImgUrl = getImgUrlPos[1].replace('")', ''); // [1] is the second part of split url - the one we want. We replace two signs in the end of url: ")  with empty space

            getLatestOpenedImg = index + 1;

                // Pop up window
            let container = document.body;
            let newImgWindow = document.createElement("div");
            container.appendChild(newImgWindow);
            newImgWindow.setAttribute("class", "img-window");
            newImgWindow.setAttribute("onclick", "closeImg()");

            let newImg = document.createElement("img"); // img here is only a tag name//
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src", "gallery/" + setNewImgUrl); // newImg gets picture from gallery
            newImg.setAttribute("id", "currentImg");

            newImg.onload = function() {
            let imgWidth = this.width; // "this" is newImg in this case
                let calcImgToEdge = ((windowWidth / 2) + (imgWidth / 2) + 10);

                    // "Next" button
                let newNextBtn = document.createElement("a");
                let btnNextText = document.createTextNode("Next");
                newNextBtn.appendChild(btnNextText);
                container.appendChild(newNextBtn);
                newNextBtn.setAttribute("class", "img-btn-next");
                newNextBtn.setAttribute("onclick", "changeImg(1)"); // Function changeImg declared further
                newNextBtn.style.cssText = "left: " + calcImgToEdge + "px;";

                    // "Previous" button //
                let newPrevBtn = document.createElement("a");
                let btnPrevText = document.createTextNode("Previous");
                newPrevBtn.appendChild(btnPrevText);
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute("class", "img-btn-prev");
                newPrevBtn.setAttribute("onclick", "changeImg(0)");
                newPrevBtn.style.cssText = "right: " + calcImgToEdge + "px;";
            }
        }
    });
}

function closeImg() {
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();
}

function changeImg(changeDigit) {
    document.querySelector("#currentImg").remove(); // We remove current picture, first
    let getImgWindow = document.querySelector(".img-window");
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);

    let calcNewImg;
    if(changeDigit === 1) {
        calcNewImg = getLatestOpenedImg + 1; // +1 because we are moving to an img with higher number
        if(calcNewImg > galleryImages.length) {
            calcNewImg = 1;
        }
    }
    else if(changeDigit === 0) {
        calcNewImg = getLatestOpenedImg - 1;
        if(calcNewImg < 1) {
            calcNewImg = galleryImages.length;
        }
    }

    newImg.setAttribute("src", "gallery/img" + calcNewImg + ".jpg"); //gallery/img is localization of ma images
    newImg.setAttribute("id", "currentImg");

    getLatestOpenedImg = calcNewImg;

        // The code to put buttons "previous" and "next" in a proper place
    newImg.onload = function() {
        let imgWidth = this.width;
        let calcImgToEdge = ((windowWidth / 2) + (imgWidth / 2) + 10);

        let nextBtn = document.querySelector(".img-btn-next")
        nextBtn.style.cssText = "left: " + calcImgToEdge + "px;";

        let prevBtn = document.querySelector(".img-btn-prev")
        prevBtn.style.cssText = "right: " + calcImgToEdge + "px;";
    }
}