  // After each time, the function below deletes or adds classes according if there are or are not. If yes - delete, if not - add
$(".menu-toggle-btn").click(function() {
    // fa-times - cross imported from font-awesome cross
  $(this).toggleClass("fa-times");
  $(".navigation-menu").toggleClass("active");
});