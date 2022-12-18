// we define some variables: //
let galleryImages = document.querySelectorAll(".gallery-img"); // Here we store all images as an array//
let getLatestOpenedImg; // We keep tracking the last opened img //
let windowWidth = window.innerWidth; // We take current window's width //
// window is current browser window which is object in itself//
//innerWidth is property //

if(galleryImages) { // IF we have any images, it is true. Reference to first variable //
    galleryImages.forEach(function(image, index) { // Image is reference to first element in array. Index is number of current element (startting from zero)//
        image.onclick = function() {
            let getElementCss = window.getComputedStyle(image); // The getComputedStyle() method gets the computed CSS properties and values of an HTML element. //// Above, we took all style from image. We take for example background-mage of that image as well (it's in #gallery .imgX) //
            let getFullImgUrl = getElementCss.getPropertyValue("background-image"); //Now, we take only the url for Thumbnail image (it is stored in CSS file//
            let getImgUrlPos = getFullImgUrl.split("/thumbs/"); //We want to grab last part of the url link (imgX.jpg) // // "/img/thumbs/" it's part in which we split //
            let setNewImgUrl = getImgUrlPos[1].replace('")', '');// // [0] was a first part of split url, [1] is the second part, the one we want//            // .replace('")',''); replaces two signs in the end of url: ")  with empty space//

            getLatestOpenedImg = index + 1; //index (declared a few lines above) counts things found by function, starting from zero.//

            let container = document.body;
            let newImgWindow = document.createElement("div");
            container.appendChild(newImgWindow);
            newImgWindow.setAttribute("class", "img-window"); //We  will write this class in CSS of course //
            newImgWindow.setAttribute("onclick", "closeImg()"); // "closeImg" is function is declared in the bottom //
            // Above, we declared popup window in CSS/gallery.css//

            let newImg = document.createElement("img"); // img here is only a tag name//
            newImgWindow.appendChild(newImg); // We insert newImg inside our window which we created//
            newImg.setAttribute("src", "gallery/" + setNewImgUrl);
            newImg.setAttribute("id", "currentImg");

            newImg.onload = function() { //Function below won't start untill image will be loaded//
                let imgWidth = this.width; // "this" means image above - "newImg"//
                let calcImgToEdge = ((windowWidth / 2) + (imgWidth / 2)+ 10); //We substract imgWidth from width of all browser (check 4th line)//

                // "Next" button //
                let newNextBtn = document.createElement("a"); //It will be our button//
                let btnNextText = document.createTextNode("Next");
                newNextBtn.appendChild(btnNextText);
                container.appendChild(newNextBtn);
                newNextBtn.setAttribute("class", "img-btn-next");
                newNextBtn.setAttribute("onclick", "changeImg(1)");
                newNextBtn.style.cssText = "left: " + calcImgToEdge + "px;";

                // "Previous" button //
                let newPrevBtn = document.createElement("a"); // We create a new "a" tag //
                let btnPrevText = document.createTextNode("Previous"); //Creating text//
                newPrevBtn.appendChild(btnPrevText); //We insert text to this "a" tag//
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute("class", "img-btn-prev");
                newPrevBtn.setAttribute("onclick", "changeImg(0)");
                newPrevBtn.style.cssText = "right: " + calcImgToEdge + "px;";
            }
        }
    });
}
//            alert(getLatestOpenedImg);//

function closeImg() { // this function close image, deletes img-window (is used above) //
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();
}

function changeImg(changeDigit) {
    document.querySelector("#currentImg").remove(); // We remove current picture, first //
    //Above, currentImg was declared around line 28 //
    let getImgWindow = document.querySelector(".img-window"); //We give to new variable the picture with class ".img-window" declared higher for container//
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);

    let calcNewImg;
    if(changeDigit === 1) {
        calcNewImg = getLatestOpenedImg + 1; //+1 because if we click forward we move to img with higher number//
        if(calcNewImg > galleryImages.length) {
            calcNewImg = 1;
        }
    }
    else if(changeDigit === 0) {
        calcNewImg = getLatestOpenedImg - 1; //+1 because if we click forward we move to img with higher number//
        if(calcNewImg < 1) {
            calcNewImg = galleryImages.length;
        }
    }

    newImg.setAttribute("src", "gallery/img" + calcNewImg + ".jpg"); //gallery/img is localization of ma images //
    newImg.setAttribute("id", "currentImg");

    getLatestOpenedImg = calcNewImg;

    // Below the code to fix such issue: after changing picture, buttons "previous" and "next" stay in the same place//
    newImg.onload = function() {
        let imgWidth = this.width;
        let calcImgToEdge = ((windowWidth / 2) + (imgWidth / 2) + 10);

        let nextBtn = document.querySelector(".img-btn-next") //We give it class from CSS//
        nextBtn.style.cssText = "left: " + calcImgToEdge + "px;";

        let prevBtn = document.querySelector(".img-btn-prev") //We give it class from CSS//
        prevBtn.style.cssText = "right: " + calcImgToEdge + "px;";
    }
}