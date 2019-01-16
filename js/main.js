const swup = new Swup();

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".fixed-action-btn");
  var instances = M.FloatingActionButton.init(elems);
});
$(function() {
  setTimeout(function() {
    $("#scrollarrow").addClass("hidden");
  }, 8000);
});
// $(document).ready(function() {
//   $("#right2").click(function() {
//     $("#righttext2").hide();
//   });
//   $("#right2").click(function() {
//     $("#hiddendiv").show();
//   });

// });
$("#hiddendiv").hide();
// $("#right2").click(function() {
//   $("#righttext2").fadeToggle();
// });
// $("#right2").click(function() {
//   $("#hiddendiv").toggle();
// });

// $("#right2").click(function() {
//   $("#righttext2").fadeToggle(400, function() {
//     $("#hiddendiv").toggle();
//   });
// });
$("#right2").click(function() {
  var container = $("#right2"); //Narrow the selector to the container
  var teaser = $("#righttext2", container);
  var fullContent = $("#hiddendiv", container);

  //Check to see if the teaser is visible
  if (teaser.is(":visible")) {
    teaser.fadeToggle(function() {
      fullContent.fadeToggle();
    });
  } else {
    fullContent.fadeToggle(function() {
      teaser.fadeToggle();
    });
  }
});
