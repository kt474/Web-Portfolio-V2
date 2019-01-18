//header svg for scramble
var sWidth = 1200;
var sHeight = 50;
var header = d3
  .select("header")
  .append("svg")
  .attr("class", "scramble")
  .attr("height", sHeight)
  .attr("width", sWidth);
var turns = [
  "U",
  "U2",
  "U'",
  "F",
  "F2",
  "F'",
  "L",
  "L2",
  "L'",
  "R",
  "R2",
  "R'",
  "B",
  "B2",
  "B'",
  "D",
  "D2",
  "D'"
];
var scr = [];
var scr_str = "";
function mean(array) {
  array.sort();
  var sum = 0;
  for (var k = 0; k < array.length; k++) {
    sum += Number(array[k]);
  }
  return (sum / array.length).toFixed(3);
}
function median(array) {
  if (array.length % 2 == 1) {
    return array[Math.floor(array.length / 2)];
  } else {
    return (
      (Number(array[array.length / 2 - 1]) + Number(array[array.length / 2])) /
      2
    ).toFixed(3);
  }
}
function createScramble() {
  scr = [];
  for (var k = 0; k < 20; k++) {
    scr.push(turns[Math.floor(Math.random() * 18)]);
  }
  scr_str = scr.join("  \b");
  header
    .append("text")
    .attr("x", 20)
    .attr("y", 30)
    .attr("class", "sText")
    .text("Scramble: ")
    .attr("font-size", 25);
  header
    .append("text")
    .attr("x", 150)
    .attr("y", 30)
    .attr("class", "sText")
    .attr("font-size", 25)
    .text(scr_str);
}

createScramble();
function addList(a) {
  var node = document.createElement("LI");
  var textnode = document.createTextNode(a);
  node.appendChild(textnode);
  document.getElementById("times").appendChild(node);
}
// side svg for displaying results
var index = 1;
var width = 300;
var height = 1000;
var padding = 25;
var resultArray = [];
var uniqueArray = [];
// var svg = d3
//   .select("#timelist")
//   .append("svg")
//   .attr("height", height)
//   .attr("width", width);
//graph svg
var upper = 15;
var gWidth = 550;
var gHeight = 400;
var graph = d3
  .select("body")
  .append("svg")
  .attr("class", "bottomGraph")
  .attr("height", gHeight)
  .attr("width", gWidth);
k = function() {
  k
    ? ((S = new Date()), (T = setInterval("timer.innerHTML=(new Date-S)/1e3")))
    : clearInterval(T);
  k = !k;
};
document.body.onkeydown = function(e) {
  if (e.keyCode == 32) {
    document.getElementById("timer").style.color = "#DB4E4B";
  }
};
document.body.onkeyup = function(e) {
  if (e.keyCode == 32) {
    document.getElementById("timer").style.color = "#000";
    d3.select(".scramble")
      .selectAll("text")
      .remove();
    d3.select("#timelist")
      .selectAll("text")
      .remove();
    d3.select(".stats")
      .selectAll("text")
      .remove();
    // d3.select("#timelist")
    //   .selectAll("text")
    //   .remove();
    k
      ? ((S = new Date()),
        (T = setInterval("timer.innerHTML=(new Date-S)/1e3")))
      : clearInterval(T);
    k = !k;
    resultArray.push(timer.innerHTML);
    $(".bottomGraph").hide();
    $("#timelist").hide();
    //$(".scramble").hide();
    if (
      timer.innerHTML != "0:000" &&
      timer.innerHTML != resultArray[resultArray.length - 2]
    ) {
      uniqueArray.push(timer.innerHTML);
      temp = uniqueArray.join("\n");
      if (uniqueArray.length < 11) {
        addList(timer.innerHTML);
      }

      // svg
      //   .append("text")
      //   .attr("x", 40)
      //   .attr("y", 40)
      //   .attr("font-size", 45)
      //   .text(temp);
      index++;
      graph
        .append("circle")
        .attr("cx", xScale(index - 1))
        .attr("cy", yScale(resultArray[resultArray.length - 1]))
        .attr("r", 6)
        .attr("fill", "#173467");
      $(".bottomGraph").show();
      $("#timelist").show();
      //reappend stats stuff
      stats
        .append("text")
        .attr("x", 0)
        .attr("y", 50)
        .text("Mean: ");
      stats
        .append("text")
        .attr("x", 0)
        .attr("y", 110)
        .text("Median: ");
      stats
        .append("text")
        .attr("x", 0)
        .attr("y", 170)
        .text("Best: ");
      //append numbers
      stats
        .append("text")
        .attr("x", 100)
        .attr("y", 170)
        .attr("id", "stat")
        .text(Math.min(...uniqueArray));
      stats
        .append("text")
        .attr("x", 120)
        .attr("y", 50)
        .attr("id", "stat")
        .text(mean(uniqueArray));
      stats
        .append("text")
        .attr("x", 160)
        .attr("y", 110)
        .attr("id", "stat")
        .text(median(uniqueArray));
      createScramble();
    }
  }
};
var xScale = d3
  .scaleLinear()
  .domain([0, 10])
  .range([padding, gWidth - padding]);
graph
  .append("g")
  .attr("transform", "translate(0," + (gHeight - padding) + ")")
  .call(d3.axisBottom(xScale));
var yScale = d3
  .scaleLinear()
  .domain([0, 20])
  .range([gHeight - padding, padding]);
graph
  .append("g")
  .attr("transform", "translate(" + padding + "," + "0)")
  .call(d3.axisLeft(yScale).ticks(5));
//statistics svg right side
var mHeight = 600;
var mWidth = 300;

var stats = d3
  .select("body")
  .append("svg")
  .attr("height", mHeight)
  .attr("width", mWidth)
  .attr("class", "stats");
stats
  .append("text")
  .attr("x", 0)
  .attr("y", 50)

  .text("Mean: ");
stats
  .append("text")
  .attr("x", 0)
  .attr("y", 110)
  .text("Median: ");
stats
  .append("text")
  .attr("x", 0)
  .attr("y", 170)
  .text("Best: ");

function reset() {
  $("#times li").remove();
  uniqueArray = [];
  index = 1;
  d3.select(".bottomGraph")
    .selectAll("circle")
    .remove();
  $("#stat").remove();
  $("#stat").remove();
  $("#stat").remove();
  $("#stat").remove();
}
