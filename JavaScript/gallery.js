let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg; // Tracking the last opened img

if (galleryImages) {
    galleryImages.forEach(function (image, index) {
        image.onclick = function() {
            let getElementCss = window.getComputedStyle(image);
            let getFullImgUrl = getElementCss.getPropertyValue("background-image"); // taking the url for Thumbnail image
            let getImgUrlPos = getFullImgUrl.split("/thumbs/"); // Going to grab the last part of the url link
            let setNewImgUrl = getImgUrlPos[1].replace('")', ''); // removing those two signs in the end of url: ")

            getLatestOpenedImg = index + 1;

            // Creating the background for the image-window 
            let container = document.body;
            let newImgWindow = document.createElement("div");
            container.appendChild(newImgWindow);
            newImgWindow.setAttribute("class", "img-window");
            newImgWindow.setAttribute("onclick", "closeImg()"); // "closeImg" function declared in the bottom

            // Making img element
            let newImg = document.createElement("img");
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src", "gallery/" + setNewImgUrl);
            newImg.setAttribute("id", "currentImg");

            newImg.onload = function() {
                let imgWidth = this.width;
                let calcImgToEdge = ((window.innerWidth / 2) + (imgWidth / 2)+ 10);

                // "Next" button
                let newNextBtn = document.createElement("a");
                let btnNextText = document.createTextNode("Next");

                newNextBtn.appendChild(btnNextText);
                container.appendChild(newNextBtn);
                newNextBtn.setAttribute("class", "img-btn-next");
                newNextBtn.setAttribute("onclick", "changeImg(1)");
                newNextBtn.style.cssText = "left: " + calcImgToEdge + "px;";

                // "Previous" button
                let newPrevBtn = document.createElement("a");
                let btnPrevText = document.createTextNode("Previous");
                newPrevBtn.appendChild(btnPrevText);
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute("class", "img-btn-prev");
                newPrevBtn.setAttribute("onclick", "changeImg(0)");
                newPrevBtn.style.cssText = "right: " + calcImgToEdge + "px;";

                // On windows below 700 pixels, buttons become smaller
                if (window.innerWidth < 700) {
                    newNextBtn.innerHTML = ">";
                    newPrevBtn.innerHTML = "<";
                }
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
    document.querySelector("#currentImg").remove();
    let getImgWindow = document.querySelector(".img-window");
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);

    let calcNewImg;
    if (changeDigit === 1) {
        calcNewImg = getLatestOpenedImg + 1; // +1 due to moving to img with higher number
        if (calcNewImg > galleryImages.length) {
            calcNewImg = 1;
        }
    }
    else if (changeDigit === 0) {
        calcNewImg = getLatestOpenedImg - 1;
        if (calcNewImg < 1) {
            calcNewImg = galleryImages.length;
        }
    }

    newImg.setAttribute("src", "gallery/img" + calcNewImg + ".jpg");
    newImg.setAttribute("id", "currentImg");

    getLatestOpenedImg = calcNewImg;

    // After changing picture, buttons "previous" and "next" stayed in the same place//
    newImg.onload = function() {
        let imgWidth = this.width;
        let calcImgToEdge = ((window.innerWidth / 2) + (imgWidth / 2) + 6);
        // let calcImgToEdge = ((windowWidth / 2) + (imgWidth / 2) + 6);

        let nextBtn = document.querySelector(".img-btn-next");
        nextBtn.style.cssText = "left: " + calcImgToEdge + "px;";

        let prevBtn = document.querySelector(".img-btn-prev");
        prevBtn.style.cssText = "right: " + calcImgToEdge + "px;";
    }
}

// If user changed window's width after loading an image, buttons were leaving there positions. Applying the function below fixed that issue
function adjustToWindow() {
    let widthForCalc = document.getElementById("currentImg").width;
    calcImgToEdge = ((window.innerWidth / 2) + (widthForCalc / 2) + 6);

    let nextButton = document.querySelector('.img-btn-next');
    let prevButton = document.querySelector('.img-btn-prev');

    nextButton.setAttribute("style", `left: ${calcImgToEdge}px;`);
    prevButton.setAttribute("style", `right: ${calcImgToEdge}px;`);

    if (window.innerWidth < 700) {
        nextButton.innerHTML = ">";
        prevButton.innerHTML = "<";
    } else {
        nextButton.innerHTML = "Next";
        prevButton.innerHTML = "Previous";
    }
}
window.onresize = adjustToWindow;