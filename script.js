var centerX, centerY;
var abt_click = false;
var cnt_click = false;
var prj_click = false;
var clicked = false;

function ShowDivInCenter(){
  divWidth = 815;
  divHeight = 100;
  divId = 'main_nav'; // id of the div that you want to show in center

  // Get the x and y coordinates of the center in output browser's window

  if (self.innerHeight)
  {
      centerX = self.innerWidth;
      centerY = self.innerHeight;
  }
  else if (document.documentElement && document.documentElement.clientHeight)
  {
      centerX = document.documentElement.clientWidth;
      centerY = document.documentElement.clientHeight;
  }
  else if (document.body)
  {
      centerX = document.body.clientWidth;
      centerY = document.body.clientHeight;
  }

  var offsetLeft = (centerX - divWidth) / 2;
  var offsetTop = (centerY - divHeight) / 2;

  // The initial width and height of the div can be set in the
  // style sheet with display:none; divid is passed as an argument to
  // the function
  var ojbDiv = document.getElementById(divId);

  ojbDiv.style.position = 'absolute';
  ojbDiv.style.top = offsetTop + 'px';
  ojbDiv.style.left = offsetLeft + 'px';
  ojbDiv.style.display = "block";
}

function abt() {
  if (!clicked) {
    //raise the ALL container
    document.getElementById("main_nav").style.top = "5%";
    document.getElementById("main_content_box").style.height = "70%";
    abt_click = true;
    cnt_click = false;
    prj_click = false;
    clicked = true;
  }  else {
    if (abt_click){
      //lower it down
      document.getElementById("main_nav").style.top = "40%";
      document.getElementById("main_content_box").style.height = "0%";
      abt_click = false;
      cnt_click = false;
      prj_click = false;
      clicked = false;
    } else {
      //bring up the abt caategory and down the other 2
      document.getElementById("about_container").style.width = "100%";
      document.getElementById("projects_container").style.width = "0%";
      document.getElementById("contact_container").style.width = "0%";
      abt_click = true;
      cnt_click = false;
      prj_click = false;
    }
  }
}

function prj() {
  if (!clicked) {
    document.getElementById("main_nav").style.top = "5%";
    document.getElementById("main_content_box").style.height = "70%";
    abt_click = false;
    cnt_click = false;
    prj_click = true;
    clicked = true;
    //raise the ALL container

  } else {
    if (prj_click){
      document.getElementById("main_nav").style.top = "40%";
      document.getElementById("main_content_box").style.height = "0%";
      abt_click = false;
      cnt_click = false;
      prj_click = false;
      clicked = false;
    } else {
      document.getElementById("about_container").style.width = "0%";
      document.getElementById("projects_container").style.width = "100%";
      document.getElementById("contact_container").style.width = "0%";
      abt_click = false;
      cnt_click = false;
      prj_click = true;
    }
  }
}

function cnt() {
  if (!clicked) {
    document.getElementById("main_nav").style.top = "5%";
    document.getElementById("main_content_box").style.height = "70%";
    abt_click = false;
    cnt_click = true;
    prj_click = false;
    clicked = true;
    //raise the ALL container

  } else {
    if (cnt_click){
      document.getElementById("main_nav").style.top = "40%";
      document.getElementById("main_content_box").style.height = "0%";
      abt_click = false;
      cnt_click = false;
      prj_click = false;
      clicked = false;
    } else {
      document.getElementById("about_container").style.width = "0%";
      document.getElementById("projects_container").style.width = "0%";
      document.getElementById("contact_container").style.width = "100%";
      abt_click = false;
      cnt_click = true;
      prj_click = false;
    }
  }
}
