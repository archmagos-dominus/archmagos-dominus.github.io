var [abt_click, cnt_click, prj_click, clicked, proj_clicked] = [false,false,false,false,false];
var typeOfScreen;
var currentProject = false;
const navID = "main_nav";
const buttonClass = "main_button";
const mainContainerID = "main_content_box";
const aboutID = "about_container";
const projectsID = "projects_container";
const contactID = "contact_container";
const projectsDB = [
  {
    "id": 0,
    "title": `<b>HourAI</b>/<b>ShanghAI</b> discord chatbot using NLP AI`,
    "Summary": `<p class="project_paragraph">The <b>HourAI</b>/<b>ShanghAI</b> framework offers a quick, easy to setup, reliable and safe way to deploy a robust and efficient AI chatbot on any discord server. It's main purpose is to be as close as possible to state of the art chatbots currently deployed online while also being as cheap as possible to set-up and maintain for a long period of time.</p><p class="project_paragraph">This system is made up of two separate parts: the discord bot (<b>HourAI</b>) and the natural language processing software (<b>ShanghAI</b>). The main reasons for separation can be condensed down to safety and resource usage. In terms of safety, the split allows the part that requires internet access (<b>HourAI</b>) to be hosted on a different machine from <b>ShanghAI</b>, which will be able to provide inference for <b>HourAI</b> as long as they can communicate on a local network. This approach can be beneficial in any event that might compromise the security of the machine connected to the internet that <b>HourAI</b> runs on, making sure that any malicious activity does not reach <b>ShanghAI</b> (and, most importantly, long term data that the bot might collect from the users). In terms of efficiency and resource usage, <b>ShanghAI</b> is deisgned to provide the complete natural language processing functionality (including inference, fine-tuning and model training) while <b>HourAI</b> is left handling all the rest. This creates a back-end as light as it is possible by making sure the machine used to run inference or training does not have to divert any resouces towards other processing tasks required for the full functionality of this system.</p><p class="project_paragraph">Now that we have a basic understanding of the <b>HourAI</b>/<b>ShanghAI</b> framework, let us dive deeper and analyse both components in turn, while also noting the way they can be set up depending on your availible resources.</p><p class="project_paragraph"><b>HourAI</b> is the discord bot, tasked with receiving user messages from discord, sanitizing them so that they can be used for inference, storing message content short term for debugging and/or later training and controlling <b>ShanghAI</b>'s functionality directly from discord. It is written in python and while it does have a wide range of task that it needs to complete, it is also the lightest part of this framework. It can run on any machine that is capable of connecting to the internet and has python and <b>HourAI</b>'s required modules installed. Her configuration files are the place where most of the varibles required (both for herself and <b>ShanghAI</b> inference parameters) are found. <b>HourAI</b> is also capable of connecting to cloud based inference solutions in case your current resources do not allow for on-site hosting of a model (the current example assumes you are using HuggingFace but any kind of service can be used with minimal changes to the requests).</p><p class="project_paragraph">The <b>ShanghAI</b> half of this system has fewer separate processing tasks to concern herself with, however, each of those tasks requires memory and processing power a few orders of magnitude higher than the <b>HourAI</b> part. As such, <b>ShanghAI</b> has been designed with the purpose of being used in self-hosting the model on a dedicated machine, as to allow all the necessary resources to be used exclussively by <b>ShanghAI</b>'s processes. Those processes include inference, taking the sanitized message from <b>HourAI</b> and proving back the response, and the traning of models using it's past conversations as a dataset. <b>ShanghAI</b> seems able to run inference with a system boasting a staggering 4GB of RAM and a mediocre processor, however, the trainig uses up either 16GB of SRAM or 8GB of VRAM, and does require either a fast CPU or a dedicated GPU to perfom this function in an acceptable time frame. That said, I have provided a model that is already trained and ready for use, so even if you do not have acccess to the required hardware for training the model, you can still use the model as is for inference and parameter tuning research.</p>`,
    "demo": `<div id="dialog_hourai_box"></div><div id="text_insert_box"><input placeholder="Write your message here" id="message_text_web"><button id="send_text_button" onclick="sedMessageToHourai()">Send</button></div>`,
    "links": `<p class="project_paragraph">Useful links for this project:</p><p class="project_paragraph"><a href="https://github.com/archmagos-dominus/HourAI" class="project_link"> <img src="img/github_dark.png" class="logosp"> HourAI repository on github</a><br><a href="https://github.com/archmagos-dominus/ShnaghAI" class="project_link"> <img src="img/github_dark.png" class="logosp"> ShanghAI repository on github</a><br><a href ="https://huggingface.co/archmagos/HourAI" class="project_link"><img src="img/hf_dark.png" class="logosp"> HourAI model on huggingface</a><br><a href ="https://discord.gg/GdbQJh8VU9" class="project_link"><img src="img/discord_dark.png" class="logosp"> HourAI/ShanghAI in action on development Discord server</a></p>`
  },
  {
    "id": 1,
    "title": "Driving AI",
    "Summary": ``,
    "demo": `PLACE DEMO HERE`,
    "links": ``
  },
  {
    "id": 2,
    "title": "<b>Mima Bot</b> - Gambling/Economy discord bot (NodeJS)",
    "Summary": `<p class="project_paragraph"><b>Summary:</b></p><p class="project_paragraph">Mima-bot is a gambling/entertainment discord bot written in NodeJS. It features a currency system, an XP system, a plethora of games to play, special monthly events and much more. The core idea behind this project is based on simplicity and efficiency, allowing Mima-bot variants to be hosted locally on lower end computers (including RaspberryPi models) while also not generating a huge amount of network traffic. This project is completely free to use and modify to suit your needs. The code is well commented so that even a beginner might understand the way this app works.</p><p class="project_paragraph"><b>Add to your server:</b></p><p class="project_paragraph">If you can't/don't want to host your own instance of Mima-bot, you can invite the original version in your server using this <a href ="https://discord.com/api/oauth2/authorize?client_id=856632684633522187&permissions=137707777088&scope=bot" class="project_link"><img src="img/discord_dark.png" class="logosp">link</a>. NOTE: You will still need to send me a message in order to set up the bot to work with your server channels. Send a pm to <b>Leonisius#8639</b> and I'll do that for you.</p><p class="project_paragraph"><b>Setting up:</b></p><p class="project_paragraph">All the variables you will need to edit in order to make Mima-bot work in your server(s) are located in the <b>config.json</b> file. Make sure to edit the <b>TOKEN</b> value with your own token, as well as <b>CHANNELID</b> and <b>ANNOUNCEMENTID</b> with the id's of the channel(s) Mima-bot will be present on. The <b>BOTOWNER</b> value should be your discord ID so that you can use the bot owner commands.</p><p class="project_paragraph"><b>Basic usage</b></p><p class="project_paragraph">Once the initial setup has been completed, run <b>node app.js</b>. If everything is correct, Mima will reply in the <b>CHANNELID</b> telling you that she is ready. You can then use <b>!wake</b> in the channel to wake her up. From there, use <b>!help</b> to get a list of commands.</p>`,
    "demo": `DEMO MAYBE?`,
    "links": `<p class="project_paragraph">Useful links for this project:</p><p class="project_paragraph"><a href="https://github.com/archmagos-dominus/Mima-bot" class="project_link"> <img src="img/github_dark.png" class="logosp"> Mima-bot repository on github</a><br><a href ="https://discord.gg/GdbQJh8VU9" class="project_link"><img src="img/discord_dark.png" class="logosp"> Mima-bot in action on development Discord server</a></p>`
  },
  {
    "id": 3,
    "title": "Celular Automata (both GoL and rule something)",
    "Summary": ``,
    "demo": "PLACE DEMO HERE",
    "links": ``
  },
  {
    "id": 4,
    "title": "Danbooru Scraper",
    "Summary": ``,
    "demo": "NO DEMO",
    "links": ``
  }
]


//store the current width and height of the window
//and decide what kind of screen are we looking at (landscape or portait)
function initializePage() {
  //get current width
  var screen_width = window.innerWidth;
  //get current height
  var screen_height = window.innerHeight;
  //decide  the orientation of the screen
  if (screen_width < screen_height) {
    //portrait mode
    typeOfScreen = false;
    setupPortrait(screen_width, screen_height);
  } else {
    //landscape mode
    typeOfScreen = true;
    setupLandscape(screen_width, screen_height);
  }
}

//initialize LANDSCAPE page
function setupLandscape(screen_width, screen_height) {

  /////////////////////////////////////////////////////////////////////////////
  //store ID of the main navigation bar
  
  //get the navigation bar element from teh style sheet
  var navObj = document.getElementById(navID);
  //decide on it's height and width
  var navHeight = Math.floor(screen_height/10);
  var navWidth = Math.floor(screen_width/2.5);
  //calculate navigation bar possition
  var offsetLeft = (screen_width - navWidth) / 2;
  var offsetTop = (screen_height - navHeight) / 2;
  //put navigation bar in the correct possition
  navObj.style.position = 'absolute';
  navObj.style.top = offsetTop + 'px';
  navObj.style.left = offsetLeft + 'px';
  navObj.style.display = "block";

  /////////////////////////////////////////////////////////////////////////////
  //store nav buttons class
  
  //get nav button object
  var buttonObjs = document.getElementsByClassName(buttonClass); 
  //calculate button div size
  var buttonWidth = navWidth/4;
  var buttonHeight = navHeight/1.75;
  //iterate through all the buttons
  for (let index = 0; index < buttonObjs.length; index++) {
    //set the size
    buttonObjs[index].style.width = buttonWidth + 'px';
    buttonObjs[index].style.height = buttonHeight + 'px';
  }

  /////////////////////////////////////////////////////////////////////////////
  //get ID of the main container
  
  //get the object of the main container
  var mainContainerObj = document.getElementById(mainContainerID);
  //calculate the main container width
  var mainContainerWidth = Math.floor(8*screen_width/10);
  var mainContainerOffset = Math.floor((screen_width-mainContainerWidth)/2);
  //set the container box width
  mainContainerObj.style.width = mainContainerWidth + 'px';
  mainContainerObj.style.maxWidth = mainContainerWidth + 'px';
  //offset the container so that it looks centered
  mainContainerObj.style.left = mainContainerOffset + 'px';
  //set it's height to 0 to prevent the nav bar from going behind it
  //when the window is reset by minimizing and other stuff
  mainContainerObj.style.height = "0%";
  [abt_click, cnt_click, prj_click, clicked] = [false,false,false,false];

  //////////////////////////////////////////////////////////////////////////////
  //store content boxes IDs
  
  //get objects
  var aboutObj = document.getElementById(aboutID);
  var projectsObj = document.getElementById(projectsID);
  var contactObj = document.getElementById(contactID);
  //make each container as wide as the main container
  aboutObj.style.width = mainContainerWidth + 'px';
  projectsObj.style.width = mainContainerWidth + 'px';
  contactObj.style.width = mainContainerWidth + 'px';
  //dynamically generate paddings for containers
  //about and contact containers should have bigger padding
  var paddingX = Math.floor(0.2 * mainContainerWidth);
  aboutObj.style.paddingLeft = paddingX + 'px';
  aboutObj.style.paddingRight = paddingX + 'px';
  contactObj.style.paddingLeft = paddingX + 'px';
  contactObj.style.paddingRight = paddingX + 'px';
  //calculate and add some bottom padding to the projects area
  var paddingY = Math.floor(0.1 * mainContainerObj.height);
  projectsObj.style.paddingBottom = paddingY + 'px';
}

//initialize PORTRAIT page
function setupPortrait(screen_width, screen_height) {
  
}

//what to do when the ABOUT button is clicked
function abt() {
  //check screen orientation to decide on the movements
  if (typeOfScreen) {
    //LANDSCAPE MODE
    //check if the main content box is up or not
    if (!clicked) {
      //hide the other two containers
      document.getElementById("projects_container").style.height = "0%";
      document.getElementById("contact_container").style.height = "0%";
      //iterate through their macro content
      for (let index = 0; index < document.getElementsByClassName("visibility_content_projects").length; index++) {
        //hide the content
        document.getElementsByClassName("visibility_content_projects")[index].style.visibility = "hidden";
      }
      for (let index = 0; index < document.getElementsByClassName("visibility_content_contact").length; index++) {
        //hide the content
        document.getElementsByClassName("visibility_content_contact")[index].style.visibility = "hidden";
      }
      //push the nav bar up
      document.getElementById(navID).style.top = "5%";
      //raise the main content container
      document.getElementById("main_content_box").style.height = "80%";
      //raise selected container
      document.getElementById("about_container").style.width = "100%";
      document.getElementById("about_container").style.height = "100%";
      //make it's contents visible
      for (let index = 0; index < document.getElementsByClassName("visibility_content_about").length; index++) {
        document.getElementsByClassName("visibility_content_about")[index].style.visibility = "visible";
      }
      //change the helper vars
      abt_click = true;
      cnt_click = false;
      prj_click = false;
      clicked = true;
    } else {
      //since the main content box is up
      //check if the section that is currently up is
      //either the current selection, or another
      if (abt_click) {
        //make it's content invisible 
        for (let index = 0; index < document.getElementsByClassName("visibility_content_about").length; index++) {
          document.getElementsByClassName("visibility_content_about")[index].style.visibility = "hidden";
        }
        //lower the current content box
        document.getElementById("about_container").style.height = "0%";
        //bring the nav bar back to the center
        document.getElementById(navID).style.top = "40%";
        //lower the main content box
        document.getElementById("main_content_box").style.height = "0%";
        //change helper vars
        abt_click = false;
        cnt_click = false;
        prj_click = false;
        clicked = false;
      } else {
        //iterate through their macro content
        for (let index = 0; index < document.getElementsByClassName("visibility_content_projects").length; index++) {
          //hide the content
          document.getElementsByClassName("visibility_content_projects")[index].style.visibility = "hidden";
        }
        for (let index = 0; index < document.getElementsByClassName("visibility_content_contact").length; index++) {
          //hide the content
          document.getElementsByClassName("visibility_content_contact")[index].style.visibility = "hidden";
        }
        //and make sure all others are lowered
        document.getElementById("projects_container").style.height = "0%";
        document.getElementById("contact_container").style.height = "0%";
        //bring up the selected category
        document.getElementById("about_container").style.width = "100%";
        document.getElementById("about_container").style.height = "100%";
        //make selected content visible
        for (let index = 0; index < document.getElementsByClassName("visibility_content_about").length; index++) {
          document.getElementsByClassName("visibility_content_about")[index].style.visibility = "visible";
        }
        //change helper vars
        abt_click = true;
        cnt_click = false;
        prj_click = false;
      }
    }
  } else {
    //things to do if the orientation is portrait (later phonebois)
  }
}

//what to do when the PROJECT button is clicked
function prj() {
  //check screen orientation to decide on the movements
  if (typeOfScreen) {
    //LANDSCAPE MODE
    //check if the main content box is up or not
    if (!clicked) {
      //hide the other two containers
      document.getElementById("about_container").style.height = "0%";
      document.getElementById("contact_container").style.height = "0%";
      //iterate through their macro content
      for (let index = 0; index < document.getElementsByClassName("visibility_content_about").length; index++) {
        //hide the content
        document.getElementsByClassName("visibility_content_about")[index].style.visibility = "hidden";
      }
      for (let index = 0; index < document.getElementsByClassName("visibility_content_contact").length; index++) {
        //hide the content
        document.getElementsByClassName("visibility_content_contact")[index].style.visibility = "hidden";
      }
      //push the nav bar up
      document.getElementById(navID).style.top = "5%";
      //raise the main content container
      document.getElementById("main_content_box").style.height = "80%";
      //raise selected container
      document.getElementById("projects_container").style.width = "100%";
      document.getElementById("projects_container").style.height = "100%";
      //make it's contents visible
      for (let index = 0; index < document.getElementsByClassName("visibility_content_projects").length; index++) {
        document.getElementsByClassName("visibility_content_projects")[index].style.visibility = "visible";
      }
      //initialize the contents of the container
      initializeProjectsContainer();
      //change the helper vars
      abt_click = false;
      cnt_click = false;
      prj_click = true;
      clicked = true;
    } else {
      //since the main content box is up
      //check if the section that is currently up is
      //either the current selection, or another
      if (prj_click) {
        //make it's content invisible 
        for (let index = 0; index < document.getElementsByClassName("visibility_content_projects").length; index++) {
          document.getElementsByClassName("visibility_content_projects")[index].style.visibility = "hidden";
        }
        //lower the current content box
        document.getElementById("projects_container").style.height = "0%";
        //bring the nav bar back to the center
        document.getElementById(navID).style.top = "40%";
        //lower the main content box
        document.getElementById("main_content_box").style.height = "0%";
        //change helper vars
        abt_click = false;
        cnt_click = false;
        prj_click = false;
        clicked = false;
        //collapse the project display area
        //set helper var
        proj_clicked = false;
        //project container id
        const projectsDisplayContainerID = "project_display_container";
        //get project container object
        var projectsDisplayContainerObj = document.getElementById(projectsDisplayContainerID);
        //collapse the project container (light bg)
        projectsDisplayContainerObj.style.width = "0%";
        projectsDisplayContainerObj.style.backgroundColor = "rgb(57,61,71)";
        //iterate throught the project data nad make it invisible
        const currentProjectDataID = "current_proj";
        var currentProjectDataObj = document.getElementsByClassName(currentProjectDataID);
        for (let index = 0; index < currentProjectDataObj.length; index++) {
          currentProjectDataObj[index].style.visibility = "hidden";
        }
        //reset button style
        const projectButtonClass = "projects_button";
        var projectButtonObjs = document.getElementsByClassName(projectButtonClass);
        for (let index = 0; index < projectButtonObjs.length; index++) {
          //change all other buttons to normal look
          projectButtonObjs[index].style.backgroundColor = "rgb(185,187,190)";
          projectButtonObjs[index].style.borderColor = "rgb(54,57,63)";
          projectButtonObjs[index].style.color = "rgb(54,57,63)";
        }
    } else {
      //and make sure all others are lowered
      document.getElementById("about_container").style.height = "0%";
      document.getElementById("contact_container").style.height = "0%";
      //hide their content
      for (let index = 0; index < document.getElementsByClassName("visibility_content_about").length; index++) {
        //hide the content
        document.getElementsByClassName("visibility_content_about")[index].style.visibility = "hidden";
      }
      for (let index = 0; index < document.getElementsByClassName("visibility_content_contact").length; index++) {
        //hide the content
        document.getElementsByClassName("visibility_content_contact")[index].style.visibility = "hidden";
      }
      //bring up the selected category
      document.getElementById("projects_container").style.width = "100%";
      document.getElementById("projects_container").style.height = "100%";
      //make current content visible
      for (let index = 0; index < document.getElementsByClassName("visibility_content_projects").length; index++) {
        document.getElementsByClassName("visibility_content_projects")[index].style.visibility = "visible";
      }
      //initialize the contents of the container
      initializeProjectsContainer();
      //change helper vars
      abt_click = false;
      cnt_click = false;
      prj_click = true;
    }
  }
} else {
    //things to do if the orientation is portrait (later phonebois)
  }
}

//what to do when the CONTACT button is clicked
function cnt() {
  //check screen orientation to decide on the movements
  if (typeOfScreen) {
    //LANDSCAPE MODE
    //check if the main content box is up or not
    if (!clicked) {
      //hide the other two containers
      document.getElementById("about_container").style.height = "0%";
      document.getElementById("projects_container").style.height = "0%";
      //iterate through their macro content
      for (let index = 0; index < document.getElementsByClassName("visibility_content_about").length; index++) {
        //hide the content
        document.getElementsByClassName("visibility_content_about")[index].style.visibility = "hidden";
      }
      for (let index = 0; index < document.getElementsByClassName("visibility_content_projects").length; index++) {
        //hide the content
        document.getElementsByClassName("visibility_content_projects")[index].style.visibility = "hidden";
      }
      //push the nav bar up
      document.getElementById(navID).style.top = "5%";
      //raise the main content container
      document.getElementById("main_content_box").style.height = "80%";
      //raise selected container
      document.getElementById("contact_container").style.width = "100%";
      document.getElementById("contact_container").style.height = "100%";
      //make it's contents visible
      for (let index = 0; index < document.getElementsByClassName("visibility_content_contact").length; index++) {
        document.getElementsByClassName("visibility_content_contact")[index].style.visibility = "visible";
      }
      //change the helper vars
      abt_click = false;
      cnt_click = true;
      prj_click = false;
      clicked = true;
    } else {
      //since the main content box is up
      //check if the section that is currently up is
      //either the current selection, or another
      if (cnt_click) {
        //hide their content
        for (let index = 0; index < document.getElementsByClassName("visibility_content_contact").length; index++) {
          document.getElementsByClassName("visibility_content_contact")[index].style.visibility = "hidden";
        }
        //lower the current content box
        document.getElementById("contact_container").style.height = "0%";
        //bring the nav bar back to the center
        document.getElementById(navID).style.top = "40%";
        //lower the main content box
        document.getElementById("main_content_box").style.height = "0%";
        //change helper vars
        abt_click = false;
        cnt_click = false;
        prj_click = false;
        clicked = false;
      } else {
        //iterate through their macro content
        for (let index = 0; index < document.getElementsByClassName("visibility_content_about").length; index++) {
          //hide the content
          document.getElementsByClassName("visibility_content_about")[index].style.visibility = "hidden";
        }
        for (let index = 0; index < document.getElementsByClassName("visibility_content_projects").length; index++) {
          //hide the content
          document.getElementsByClassName("visibility_content_projects")[index].style.visibility = "hidden";
        }
        //and make sure all others are lowered
        document.getElementById("about_container").style.height = "0%";
        document.getElementById("projects_container").style.height = "0%";
        //bring up the selected category
        document.getElementById("contact_container").style.width = "100%";
        document.getElementById("contact_container").style.height = "100%";
        //make current content visible
        for (let index = 0; index < document.getElementsByClassName("visibility_content_contact").length; index++) {
          document.getElementsByClassName("visibility_content_contact")[index].style.visibility = "visible";
        }
        //change helper vars
        abt_click = false;
        cnt_click = true;
        prj_click = false;
      }
    }
  } else {
    //things to do if the orientation is portrait (later phonebois)
  }
}

function initializeProjectsContainer() {
  //get object ids
  const projectSelectorID = "project_selector";
  const projectDisplayID = "project_display";
  //get objects
  var projectSelectorObj = document.getElementById(projectSelectorID);
  var projectDisplayObj = document.getElementById(projectDisplayID);
  //calculate cell height according to the window size
  ////calculate the current size of the container
  const ratio = Math.floor(window.innerHeight * 0.8);
  ////calculate the cell height
  const cellHeight = Math.floor(0.87 * ratio);
  //set the cells to cellHeight
  projectSelectorObj.style.height = cellHeight + 'px';
  projectDisplayObj.style.height = cellHeight + 'px';
  //project button class 
  const projectButtonClass = "projects_button";
  //get button objects
  var projectButtonObjs = document.getElementsByClassName(projectButtonClass);
  //calculate allocated button size
  var segmentHeight = Math.floor(cellHeight/(projectButtonObjs.length*3));
  var pButtonHeight = segmentHeight*2;
  var marginYsize = segmentHeight;
  //iterate through all the buttons
  for (let index = 0; index < projectButtonObjs.length; index++) {
    //set the top-margin and it's height
    if(index != 0){
      projectButtonObjs[index].style.margin = marginYsize + 'px 0px 0px';
    }    
    projectButtonObjs[index].style.height = pButtonHeight + 'px';
  }
}

//start stage -> click on a button and show that project -> click same button returns to start


function displayProject(projectID) {
  //check if a project is currently being displayed
  if (proj_clicked) {
    //check if the current button is teh same and put all stuff back if true
    if (currentProject == projectID) {
      //set helper vars
      proj_clicked = false;
      currentProject = false;
      //retract the projet container
      //project container id
      const projectsDisplayContainerID = "project_display_container";
      //get project container object
      var projectsDisplayContainerObj = document.getElementById(projectsDisplayContainerID);
      //extend the project container (light bg)
      projectsDisplayContainerObj.style.width = "0%";
      projectsDisplayContainerObj.style.backgroundColor = "rgb(57,61,71)";
      //reset the buttons to default
      //iterate through the buttons
      const projectButtonClass = "projects_button";
      var projectButtonObjs = document.getElementsByClassName(projectButtonClass);
      for (let index = 0; index < projectButtonObjs.length; index++) {
        //change all other buttons to normal look
        projectButtonObjs[index].style.backgroundColor = "rgb(185,187,190)";
        projectButtonObjs[index].style.borderColor = "rgb(54,57,63)";
        projectButtonObjs[index].style.color = "rgb(54,57,63)";
      }
      //iterate throught the project data nad make it invisible
      const currentProjectDataID = "current_proj";
      var currentProjectDataObj = document.getElementsByClassName(currentProjectDataID);
      for (let index = 0; index < currentProjectDataObj.length; index++) {
        currentProjectDataObj[index].style.visibility = "hidden";
      }
      //reset current project data
      document.getElementById("current_project_title").innerHTML = ""; 
      document.getElementById("current_project_summary").innerHTML = ""; 
      document.getElementById("current_project_demo").innerHTML = ""; 
      document.getElementById("current_project_links").innerHTML = ""; 
      
    } else {
      
      //iterate through the buttons
      const projectButtonClass = "projects_button";
      var projectButtonObjs = document.getElementsByClassName(projectButtonClass);
      for (let index = 0; index < projectButtonObjs.length; index++) {
        if (index == projectID) {
          //change button colour to inverse one
          projectButtonObjs[index].style.backgroundColor = "rgb(54,57,63)";
          projectButtonObjs[index].style.borderColor = "rgb(185,187,190)";
          projectButtonObjs[index].style.color = "rgb(185,187,190)";
        } else {
          //change all other buttons to normal look
          projectButtonObjs[index].style.backgroundColor = "rgb(185,187,190)";
          projectButtonObjs[index].style.borderColor = "rgb(54,57,63)";
          projectButtonObjs[index].style.color = "rgb(54,57,63)";
        }      
      }
      //set helper var
      currentProject = projectID;
      //iterate through the projects 
      for (let index = 0; index < projectsDB.length; index++) {
        if (projectsDB[index].id == projectID) {
          document.getElementById("current_project_title").innerHTML = projectsDB[index].title; 
          document.getElementById("current_project_summary").innerHTML = projectsDB[index].Summary; 
          document.getElementById("current_project_demo").innerHTML = projectsDB[index].demo; 
          document.getElementById("current_project_links").innerHTML = projectsDB[index].links; 
        }    
      }
    }
  } 
  //no project is displayed
  else {
    //set helper vars
    proj_clicked = true;
    currentProject = projectID;
    //project container id
    const projectsDisplayContainerID = "project_display_container";
    //get project container object
    var projectsDisplayContainerObj = document.getElementById(projectsDisplayContainerID);
    //extend the project container (light bg)
    projectsDisplayContainerObj.style.width = "100%";
    projectsDisplayContainerObj.style.backgroundColor = "rgb(185,187,190)";
    //iterate through the buttons
    const projectButtonClass = "projects_button";
    var projectButtonObjs = document.getElementsByClassName(projectButtonClass);
    for (let index = 0; index < projectButtonObjs.length; index++) {
      if (index == projectID) {
        //change button colour to inverse one
        projectButtonObjs[index].style.backgroundColor = "rgb(54,57,63)";
        projectButtonObjs[index].style.borderColor = "rgb(185,187,190)";
        projectButtonObjs[index].style.color = "rgb(185,187,190)";
      } else {
        //change all other buttons to normal look
        projectButtonObjs[index].style.backgroundColor = "rgb(185,187,190)";
        projectButtonObjs[index].style.borderColor = "rgb(54,57,63)";
        projectButtonObjs[index].style.color = "rgb(54,57,63)";
      }      
    }
    //iterate through the projects 
    for (let index = 0; index < projectsDB.length; index++) {
      if (projectsDB[index].id == projectID) {
        document.getElementById("current_project_title").innerHTML = projectsDB[index].title; 
        document.getElementById("current_project_summary").innerHTML = projectsDB[index].Summary; 
        document.getElementById("current_project_demo").innerHTML = projectsDB[index].demo; 
        document.getElementById("current_project_links").innerHTML = projectsDB[index].links; 
      }    
    }
    //iterate throught the project data nad make it visible
    const currentProjectDataID = "current_proj";
    var currentProjectDataObj = document.getElementsByClassName(currentProjectDataID);
    for (let index = 0; index < currentProjectDataObj.length; index++) {
      currentProjectDataObj[index].style.visibility = "visible";
    }
  }
}

function sedMessageToHourai() {

  //id's of objects in the page
  var text_input = document.getElementById('message_text_web');
  var send_button = document.getElementById('send_text_button');
  var dialog_box = document.getElementById('dialog_hourai_box');

  //create constants required for proper data display
  const user_message_pre = `<div class="container darker"><p class="project_paragraph_light">`;
  const hourai_message_pre = `<div class="container"><img src="img/hourai_avatar.png" alt="Avatar"><p class="project_paragraph">`;
  const message_post = `</p></div>`;

  //get user input
  var user_message = text_input.value;

  //clear the input and make the button unavailible
  text_input.value = "";
  send_button.disabled = true;

  //push user message to chat
  ////get current chat hist
  var dialog_box_content = dialog_box.innerHTML;
  ////add new user message
  dialog_box_content = dialog_box_content + user_message_pre + user_message + message_post;
  ////display full chat hist 
  dialog_box.innerHTML = dialog_box_content;

  //send message to Hourai and await response
  query(dialog_box_content).then((response) => {
      var hourai_reply;
      //check if error
      if (response.error) {
        //store error
        hourai_reply = response.error;
        //if there is an eta, store that
        if (response.estimated_time){
          hourai_reply = hourai_reply + "ETA: " + response.estimated_time;
        }
      } else {
        //store generated text
        var hourai_reply = response.generated_text;
      }
      console.log(JSON.stringify(response));
      ////get current chat hist
      var dialog_box_content = dialog_box.innerHTML;
      ////add new user message
      dialog_box_content = dialog_box_content + hourai_message_pre + hourai_reply + message_post;
      ////display full chat hist 
      dialog_box.innerHTML = dialog_box_content;    
      //enable button
      send_button.disabled = false;
  });
}

async function query(data) {
  const url = "https://api-inference.huggingface.co/models/archmagos/HourAI";
  const ab = "BrslqkOXrFXenLcg";
  const ah = "ziPBFXEtmZERyTwvkq";
  const hf = ah + ab;
  const response = await fetch(
    url,
    {
      headers: { Authorization: `Bearer ${"hf_"+hf}` },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}
