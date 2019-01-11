const swup = new Swup();

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".fixed-action-btn");
  var instances = M.FloatingActionButton.init(elems);
});

// document.addEventListener("DOMContentLoaded", function() {
//   var elems = document.querySelectorAll(".sidenav");
//   var instances = M.Sidenav.init(elems);
// });

$(function() {
  setTimeout(function() {
    $("#scrollarrow").addClass("hidden");
  }, 8000);
  // $(window).scroll(function() {
  //   if ($(this).scrollTop() > 80) {
  //     $("body").addClass("changeColor");
  //     $("#side").removeClass("sidebar");
  //     $("#arrow")
  //       .delay(700)
  //       .fadeOut(100);
  //     if ($(this).scrollTop() > 1350) {
  //       $("body").addClass("changeColor2");
  //     }
  //   }
  //   if ($(this).scrollTop() < 1250) {
  //     $("body").removeClass("changeColor2");

  //     if ($(this).scrollTop() < 600) {
  //       $("body").removeClass("changeColor");
  //       //$("#side").addClass("Hidden");
  //     }
  //   }
  // });
});
