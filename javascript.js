$(function() {
  $(".colorPicker div").each(function() {
    let text = $(this).attr("id")
    $(this).css("background-color", text)
  });

  var paint = false;
  //tool = pencil, paintbrush, eraser, fill
  var tool = "pencil";
  //size = small, medium, large, xlarge
  var size = "small"
  $("#small").toggleClass("size-active");

  var canvas = document.getElementById("paint");
  var ctx = canvas.getContext("2d");
  var container = $("#container");

  var mouse = {
    x: 0,
    y: 0
  };

  //load saved image
  if (localStorage.getItem("imgCanvas") != null) {
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    }
    img.src = localStorage.getItem("imgCanvas");
  };
  //set drawing parameters (lineWidth, lineJoin, lineCap)
  ctx.lineWidth = 1;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  //click inside container
  container.mousedown(function(e) {
    paint = true;
    if (tool == "fill") {
		  fill();
		  return;
	  }
    ctx.beginPath();
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    ctx.moveTo(mouse.x, mouse.y);
  });

  //move the mouse while holding mouse key
  container.mousemove(function(e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    if (paint == true) {
      if (tool == "eraser") {
        ctx.strokeStyle = "white";
      }
      else {
        let color = $(".chosen").attr("col")
        ctx.strokeStyle = color;
        if (tool == "fill") {
          fill();
          return;
        }
    }
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
  }
});

  container.mouseup(function() {
    paint = false;
  });

  container.mouseleave(function() {
    paint = false;
  });

  $("#reset").click(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  $("#save").click(function() {
    if (typeof(localStorage) != null) {
      localStorage.setItem("imgCanvas", canvas.toDataURL());
    } else {
      window.alert("Your browser does not support local storage!");
    }
  });

  $("#eraser").click(function() {
    var active = "#" + tool
    $(active).removeClass("active");
    tool = "eraser";
    $(this).toggleClass("active");
  });

  $("#pencil").click(function() {
    var active = "#" + tool
    $(active).removeClass("active");
    tool = "pencil"
    $(this).toggleClass("active");
  });

  $("#paintbrush").click(function() {
    var active = "#" + tool
    $(active).removeClass("active");
    tool = "paintbrush"
    $(this).toggleClass("active");
  });

  $("#fill").click(function() {
    var active = "#" + tool
    $(active).removeClass("active");
		tool = "fill"
    $(this).toggleClass("active");
    var s = "#" + size
    $(s).removeClass("size-active");
  });

  $(".color").click(function() {
    let color = $(this).attr("id");
    $(".chosen").attr("col", color);
    $(".chosen").css("background-color", color);
  });

  $("#hidden").change(function() {
    let color = $("#hidden").val();
    $(".chosen").attr("col", color);
    $(".chosen").css("background-color", color);
  });

//change brush sizes

  $("#small").click(function() {
    ctx.lineWidth = 1;
    var active = "#" + size
    $(active).removeClass("size-active");
    $(this).toggleClass("size-active");
    size = "small"
  });

  $("#medium").click(function() {
    ctx.lineWidth = 5;
    var active = "#" + size
    $(active).removeClass("size-active");
    $(this).toggleClass("size-active");
    size = "medium"
  });

  $("#large").click(function() {
    ctx.lineWidth = 10;
    var active = "#" + size
    $(active).removeClass("size-active");
    $(this).toggleClass("size-active");
    size = "large"
  });

  $("#xlarge").click(function() {
    ctx.lineWidth = 15;
    var active = "#" + size
    $(active).removeClass("size-active");
    $(this).toggleClass("size-active");
    size = "xlarge"
  });

  function fill() {
	  let color = $(".chosen").attr("col")
	  ctx.strokeStyle = color;
	  ctx.fillStyle = color;
	  ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

});
