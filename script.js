//declare globals and stuff
var screen_width, screen_height, isLandscape;   //screen info
var mode=false; //dark mode by default
var ctx_bg; //canvas context
//button selector vars
var main_container_open = false;
var current_container;
var prev_obj, prev_selection;
var selection_id=null;
//project selector vars
var project_displayed=false;
var current_project=null;
var y_coords;
//animation vars
var keyframe=0;
var animation_on=false;
var animation=null;
var animation_counter=0;
var max_frames=0;
//drawing shapes vars
var o, chevrons;
var  rhombus, arrows, tp, bt, ribbon_decorations, collumns, container_coords;
var step, nav_step;
var ribbons =[];
var decoration_canvas_size;
//html elements
var main_background, pseudo_background, nav_bar, toggle_button_container, div_content_box, toggle_canvas, main_decoration_canvas;
var nav_buttons = [];
var nav_button_decorations = [];
var nav_buttons_text = [];
var toggle_text = [];
//image vars for the contact linktree
var image_gallery = [
    //email
    {
        nox:"img/email_nox_dark.png",
        lux_light:"img/email_lux_light.png",
        lux_dark:"img/email_lux_dark.png"
    },
    //github
    {
        nox:"img/github_nox_dark.png",
        lux_light:"img/github_lux_light.png",
        lux_dark:"img/github_lux_dark.png"
    },
    //higginface
    {
        nox:"img/hf_nox_dark.png",
        lux_light:"img/hf_lux_light.png",
        lux_dark:"img/hf_lux_dark.png"
    },
    //discord
    {
        nox:"img/discord_nox_dark.png",
        lux_light:"img/discord_lux_light.png",
        lux_dark:"img/discord_lux_dark.png"
    },
    //itchio
    {
        nox:"img/itchio_nox_dark.png",
        lux_light:"img/itchio_lux_light.png",
        lux_dark:"img/itchio_lux_dark.png"
    }
];
//colours
var Roma, Juno, Venus, Trivia, Nymphae_Avernales, Melinoe, Zagreus, Proserpina, Pluto, Maribel, Vulcan, Neptune, Mars, Sol, Minerva, Quirinus, Pontus, Salacia, Carmentis, Falacer, Flora, Furrina, Palatua, Portunus, Volturnus, Janus;
//shaders
const no_shading_nav_button = "0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
const shading_nav_button = "-8px 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
const no_shading_project_button = "0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
const shading_project_button = "-4px 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 12px 0 rgba(0, 0, 0, 0.19);";
const bg_noise = "var(--noise_image)";
const button_noise = "var(--noise_marble)";
//main contnet
const main_content = [
    `<p id="about_text" class="text_content">Hey there.
    <br>I'm interested in writing free, open source and efficient software that anyone can find both easy to use and friendly to tinker with. On the <b>PROJECTS</b> tab, you can find a few web demos of my more extensive projects, and you can find the rest on my various other pages, reachable from the <b>CONTACT</b> tab.
    <br>If you're a beginner in programming, do not be overwhelmed by the apparent complexity of some of the projects: they were all written with people like you in mind, making sure to comment and deobfuscate most lines of code even if it might be a slight disadvantage to actual code review. I don't have a favourite or preferred coding language, although most projects you'll see here are written in JavaScript to facilitate a beginner friendly aura, given the fact that JavaScript is usually considered the easiest and most forgiving language for any programmer starting out, as well as to facilitate both distribution (all devices have a web browser that can run the code, regardless of installed software and libraries, operating system or processor architecture) and get to use the built in browser capabilities, especially when it comes to user interface handling. On my github profile you might find projects written in Python, Java, or even scripting languages like Bash, and they will be just as thoroughly documented as the JavaScript ones.
    <br>I am mostly interested in machine learning and artificial intelligence, but you'll find plenty of other things in my 
    <a href="https://github.com/archmagos-dominus" class="link_content">github repositories</a>. Everything that I make is open-source and free to use on whatever project you're working on.
    <br>If you have any questions, bug reports, requests of taking part in your own projects or simply just wish to chat about anything that has to do computers don't hesitate to shoot me an email or a discord message. 
    <br>Thanks for checking my portfolio out!</p>`,

    `<div id="project_selector">
        <canvas id="0_cv" class="project_selector_canvas" onclick="show_project(0)"></canvas>
        <p class="project_selector_text" id="0_pt" onclick="show_project(0)">MumbAI</p>
        <canvas id="1_cv" class="project_selector_canvas" onclick="show_project(1)"></canvas>
        <p class="project_selector_text" id="1_pt" onclick="show_project(1)">HourAI/ShanghAI</p>
        <canvas id="2_cv" class="project_selector_canvas" onclick="show_project(2)"></canvas>
        <p class="project_selector_text" id="2_pt" onclick="show_project(2)">Spirat</p>
        <canvas id="3_cv" class="project_selector_canvas" onclick="show_project(3)"></canvas>
        <p class="project_selector_text" id="3_pt" onclick="show_project(3)">Hell Raven</p>
        <canvas id="4_cv" class="project_selector_canvas" onclick="show_project(4)"></canvas>
        <p class="project_selector_text" id="4_pt" onclick="show_project(4)">Mima</p>
    </div>
    <canvas id="project_display"></canvas>
    <div id="project_display_text"></div>`,
    
    `<p id="contact_text" class="text_content">
    <a href="mailto:yk3a4tgpd@mozmail.com?subject=Homepage Contact" class="link_content"><img src="" class="logos"> E-mail me!</a><br>
    <a href="https://github.com/archmagos-dominus" class="link_content"><img src="" class="logos"> Github repositories</a><br>
    <a href="https://huggingface.co/archmagos" class="link_content"><img src="" class="logos"> Hugginface repositories</a><br>
    <a href="https://discord.gg/GdbQJh8VU9" class="link_content"><img src="" class="logos"> Discord server invite</a><br>
    <a href="https://leonisius.itch.io/" class="link_content"><img src="" class="logos"> Itch.io page</a>
    </p>`
];
//project content
const project_content = [
    `<h1 class="subtitle">Project 1</h1>
        <p class="paragraph"> AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA <a class="link" href=''>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</a> AAAAAAAAAAAAAAA
        AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAA
        AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA
        AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAA
        </p>`,
    `<h1 class="subtitle">Project 2</h1>
        <p class="paragraph"> AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA <a class="link" href=''>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</a> AAAAAAAAAAAAAAA
        AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAA
        AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA
        AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAA
        </p>
        <h1 class="subtitle">AAAAAAAAAAAAAA</h1>
        <p class="paragraph"> AAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAA
        AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>`,
    `<h1 class="subtitle">Project 3</h1>
        <p class="paragraph"> AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA <a class="link" href=''>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</a> AAAAAAAAAAAAAAA
        AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAA
        AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA
        AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAA
        </p>`,
    `<h1 class="subtitle">Project 4</h1>
        <p class="paragraph"> AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA <a class="link" href=''>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</a> AAAAAAAAAAAAAAA
        AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAA
        AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA
        AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAA
        </p>`,
    `<h1 class="subtitle">Project 5</h1>
        <p class="paragraph"> AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA <a class="link" href=''>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</a> AAAAAAAAAAAAAAA
        AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAA
        AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA
        AAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAA
        </p>`
];

//executes at init - loads DOM elements and possitions them
function load_page() {
    //load html elements
    load_elements();
    //position all elements properly
    position_elements();
}

//executes at any reload/resize of the page - same as load_page(), but without the need to load DOM elements
function reload_page() {
    //re-position all elements properly
    position_elements();
}

//function: positions all the elements properly as well as assign their proper colours
function position_elements() {
    //check which colour mode is selected
    set_colours(mode);
    //size up and position all elements
    resize_page_elements();
    //colour the elements
    assign_colours();
    //check if you need to redraw the canvas (show_main_opened and show_main_initial is where the drawing and the positioning should happen)
    if (main_container_open) {
        //draw open
        show_main_opened();
    } else {
        //draw closed
        show_main_intial();
    }
}

//function: changes from light mode to dark mode and vice versa
function change_mode(){
    //if the animation is in progress, do not do anything
    if (animation_on) {
        return;
    }
    mode = !mode;
    //re-position all elements properly
    position_elements();
}

//function: loads initial DOM elements & preloads images to memory
function load_elements() {
    main_background = document.getElementById("main_background");
    pseudo_background = document.getElementById("pseudo_background");
    toggle_button_container = document.getElementById("mode_button_container");
    toggle_canvas = document.getElementById("mode_button_canvas");
    main_decoration_canvas = document.getElementById("content_box_dec");
    ctx_bg = main_decoration_canvas.getContext("2d");   //context for the main canvas
    nav_bar = document.getElementById("nav_bar");
    nav_buttons = document.getElementsByClassName("nav_button");
    nav_button_decorations = document.getElementsByClassName("nav_button_decoration");
    nav_buttons_text = document.getElementsByClassName("nav_button_text");
    div_content_box = document.getElementById("content_box");

    //preload images to prevent that slight jitter for a few ms until the images load in normal image operations
    for (let index = 0; index < image_gallery.length; index++) {
        //create an image object
        let img_nox = new Image();
        img_nox.onload = (index) => {
            //convert image object to an url that we can use as a source and store it in the initial array
            image_gallery[index].nox=URL.createObjectURL(img_nox)
        }
        //set the source for the image
        img_nox.src=image_gallery[index].nox;
        //create an image object
        let img_lux_l = new Image();
        img_lux_l.onload = (index) => {
            //convert image object to an url that we can use as a source and store it in the initial array
            image_gallery[index].lux_light=URL.createObjectURL(img_lux_l)
        }
        //set the source for the image
        img_lux_l.src=image_gallery[index].lux_light;
        //create an image object
        let img_lux_d = new Image();
        img_lux_d.onload = (index) => {
            //convert image object to an url that we can use as a source and store it in the initial array
            image_gallery[index].lux_dark=URL.createObjectURL(img_lux_d)
        }
        //set the source for the image
        img_lux_d.src=image_gallery[index].lux_dark
    }
}

//function: returns a slightly darker/lighter shade of a given hex colour
function randomize_colour(colour) {
    //slice the colour hex into it's RGB parts
    let red = parseInt(colour.slice(1,3),16);
    let green = parseInt(colour.slice(3,5),16);
    let blue = parseInt(colour.slice(5,7),16);
    //get a random change in the shade
    let change=(Math.random>0.5)?Math.floor(Math.random()*30):-1*Math.floor(Math.random()*30);
    //apply said change to the RGB values (special cases if the change is positive or negative)
    if (change>0){
        //check for overflow (max 255)
        (red+change>255)?red=255:red=red+change;
        (green+change>255)?green=255:green=green+change;
        (blue+change>255)?blue=255:blue=blue+change;
    } else {
        //check for overflow (min 0)
        (red+change<0)?red=0:red=red+change;
        (green+change<0)?green=0:green=green+change;
        (blue+change<0)?blue=0:blue=blue+change;
    }
    //convert the integer RGB values to strings
    red=red.toString(16);
    green=green.toString(16);
    blue=blue.toString(16);
    //concatenate the strings into a hex #RGB value
    let new_colour = "#"+red+green+blue;
    return new_colour;
}

//function: changes the colour variables to their LUX/NOX variants
function set_colours(mode) {
    switch (mode) {
        case false:
            //set all colours up for NOX (dark) mode
            //background
            Roma="#C8CDD2";
            //pseudobackground
            Juno="#393D47";
            //nav button bg
            Neptune="#C8CDD2";
            //nav text and decorations
            Venus="#393D47";
            //nav text and decorations clicked
            Vulcan="#C8CDD2";
            //mode button bg
            Trivia="#C8CDD2";
            //mode button pseudobg
            Nymphae_Avernales="#393D47";
            //mode button selection square background
            Melinoe="#393D47";
            //mode button selection square pseudobackground
            Zagreus="#C8CDD2";
            //mode button text and decorations
            Proserpina="#C8CDD2";
            //mode button text and decoration clicked
            Pluto="#393D47";
            //chevron/ribbon red bg
            Mars='#C8CDD2';
            //golden decorations 
            Sol='#393D47';
            //column lines
            Minerva='#C8CDD2';
            //container bg - parchment colour
            Pomona="#C8CDD2";
            //container decorations
            Diana="#393D47";
            //content text
            Quirinus="#393D47";
            //content link
            Pontus="#393D47";
            //content link (hover)
            Salacia="#393D47";
            //project selector button background
            Carmentis="#393D47";
            //project selector button decoration
            Falacer="#C8CDD2";
            //project sleector button text
            Flora="#C8CDD2";
            //project display bg
            Furrina='#393D47';
            //project paragraph text
            Palatua='#C8CDD2';
            //project header text
            Portunus='#C8CDD2';
            //project link
            Volturnus='#C8CDD2';
            //project link hover
            Janus='#C8CDD2';
            //scrollbar
            document.querySelector(':root').style.setProperty('--scroll-thumb-color', Sol);
            break;

        case true:
            //set all colours up for LUX (light) mode
            //background
            Roma="radial-gradient(circle, rgb(228,225,217) 65%, rgb(214,209,195) 100%)";
            //pseudobackground
            Juno='#F9EAE5';
            //nav button bg
            Neptune='#166A7B';
            //nav text and decorations
            Venus="#DAE4E4";
            //nav text and decorations clicked
            Vulcan="#565655";
            //mode button bg
            Trivia="#D6D1C3";
            //mode button pseudobg
            Nymphae_Avernales="#565655";
            //mode button selection square background
            Melinoe='#166A7B';
            //mode button selection square pseudobackground
            Zagreus="#E4E1D9";
            //mode button text and decorations
            Proserpina="#565655";
            //mode button text and decoration clicked
            Pluto="#DAE4E4";
            //chevron/ribbon red bg
            Mars='#7B2716';
            //golden decorations 
            Sol='#ffd700';
            //column lines
            Minerva='#393D47';
            //container bg - parchment colour
            Pomona='#F9F4E5';
            //container decorations
            Diana="#393D47";
            //content text
            Quirinus="#393D47";
            //content link
            Pontus="#347A7F";
            //content link (hover)
            Salacia="#0F9EE0";
            //project selector button background (unselected)
            Carmentis="#00000000";
            //project display bg & project selector button background (selected)
            Furrina='#E2DAD2';
            //project selector button text & decorations (for preoject display as well)
            Falacer="#565655";
            //project paragraph text
            Palatua='#565655'
            //project header text
            Portunus='#565655';
            //project link
            Volturnus='#347A7F';
            //project link hover
            Janus='#0F9EE0';
            //scrollbar
            document.querySelector(':root').style.setProperty('--scroll-thumb-color', Sol);
            break;
        
        default:
            break;
    }
}

//function: assigns colours to the static DOM elements
function assign_colours() {
    main_background.style.background=Roma;
    pseudo_background.style.backgroundColor=Juno;
    pseudo_background.style.backgroundImage=(mode)?bg_noise:""; //render noise if the mode is LUX
    toggle_button_container.style.backgroundColor=Trivia;
}

//function that handles the preliminary page display
//it is mainly used to calculate sizes, positions and colours of all elements at the start
function resize_page_elements() {
    //get current width
    screen_width = window.innerWidth;
    //get current height
    screen_height = window.innerHeight;
    //check to see if display is LANDSCAPE or PORTRAIT
    isLandscape = (screen_height<screen_width)?true:false;
    //calculate size of all elements elements according to the screen size
    //if LANDSCAPE we're gonna use the screen height as a measuring stick (since it is the smallest)
    //else if PORTRAIT we are going to be using the width of the screen to ensure proper readability
    if (isLandscape) {
        //calculate element sizes according to height
        //main_background
        main_background.style.height = screen_height + "px";
        main_background.style.width = screen_width + "px";
        main_background.style.position = "absolute";
        main_background.style.top = "0px";
        main_background.style.left = "0px";
        //pseudo_background (centered in parent)
        pseudo_background.style.position = "absolute";
        pseudo_background.style.height = Math.floor(main_background.offsetHeight*98/100) + "px";
        pseudo_background.style.width = Math.floor(main_background.offsetWidth*99/100) + "px";
        pseudo_background.style.top = Math.floor((main_background.offsetHeight-pseudo_background.offsetHeight)/2) + "px";
        pseudo_background.style.left = Math.floor((main_background.offsetWidth-pseudo_background.offsetWidth)/2) + "px";
        //LUX/NOX button container
        toggle_button_container.style.height = Math.floor(pseudo_background.offsetHeight/12) + "px";
        toggle_button_container.style.width = toggle_button_container.offsetHeight*2 + "px";
        toggle_button_container.style.position = "absolute";
        toggle_button_container.style.top = pseudo_background.offsetTop*2 + "px";
        toggle_button_container.style.left = pseudo_background.offsetWidth-pseudo_background.offsetLeft*2-toggle_button_container.offsetWidth + "px";
        //LUX/NOX button canvas                                                                            ///////////////////////////////////////TODO make it vertical for portrait mode blep
        toggle_canvas.style.height = Math.floor(toggle_button_container.offsetHeight*5/6) + "px";
        toggle_canvas.style.position = "absolute";
        toggle_canvas.style.top =  Math.floor((toggle_button_container.offsetHeight-toggle_canvas.offsetHeight)/2) + "px";
        toggle_canvas.style.left = Math.floor((toggle_button_container.offsetHeight-toggle_canvas.offsetHeight)/2) + "px";
        toggle_canvas.style.width = Math.floor(toggle_button_container.offsetWidth-toggle_canvas.offsetLeft*2) + "px";
        toggle_canvas.height = toggle_canvas.style.height.replace('px','');
        toggle_canvas.width = toggle_canvas.style.width.replace('px','');
        //main container decoration canvas
        main_decoration_canvas.style.position = "absolute";
        main_decoration_canvas.style.height = Math.floor(pseudo_background.style.height.replace('px','')-(pseudo_background.style.height.replace('px','')*2.25/10)) + "px";
        main_decoration_canvas.style.top =   Math.floor(pseudo_background.style.height.replace('px','')/5) + "px";
        main_decoration_canvas.style.width = Math.floor(main_decoration_canvas.style.height.replace('px','')*2.5)+ "px";
        main_decoration_canvas.style.left = Math.floor((pseudo_background.offsetWidth-main_decoration_canvas.offsetWidth)/2)+ 'px';
        main_decoration_canvas.height = main_decoration_canvas.style.height.replace('px','');
        main_decoration_canvas.width = main_decoration_canvas.style.width.replace('px','');
        decoration_canvas_size = {
            w:main_decoration_canvas.offsetWidth,
            h:main_decoration_canvas.offsetHeight
        }
        //nav_bar (centered in parent)
        nav_bar.style.position = "absolute";
        nav_bar.style.height = Math.floor(pseudo_background.offsetHeight*2/10) + "px";
        nav_bar.style.width = pseudo_background.offsetHeight + "px";
        nav_bar.style.left = Math.floor((pseudo_background.offsetWidth-nav_bar.offsetWidth)/2) + "px";
        //nav_buttons (class)
        for (let index = 0; index < nav_buttons.length; index++) {
            nav_buttons[index].style.position = "absolute";
            nav_buttons[index].style.height = Math.floor(nav_bar.offsetHeight/2) + "px";
            nav_buttons[index].style.width = Math.floor(nav_bar.offsetWidth/4) + "px";
            nav_buttons[index].style.top = Math.floor((nav_bar.offsetHeight-nav_buttons[index].offsetHeight)/2) + "px";
            nav_buttons[index].style.left = index*3*Math.floor(nav_bar.offsetWidth/8) + "px";
            nav_buttons[index].style.backgroundColor=Neptune;
        }
        //nav_button_decorations (canvases at the sides of hte buttons, used to draw decorations on them)
        for (let index = 0; index < nav_button_decorations.length; index++) {
            nav_button_decorations[index].style.position = "absolute";
            nav_button_decorations[index].style.height = nav_buttons[index].style.height;
            nav_button_decorations[index].style.width = nav_buttons[index].style.width;
            nav_button_decorations[index].style.top = "0px";
            nav_button_decorations[index].style.left = "0px";
            //special for canvases
            nav_button_decorations[index].height = nav_buttons[index].style.height.replace('px','');
            nav_button_decorations[index].width = nav_buttons[index].style.width.replace('px','');
            //draw the decorations
            decoration_start(nav_button_decorations[index], Venus);                 
        }
        //place the text on the buttons
        for (let index = 0; index < nav_buttons_text.length; index++) {
            nav_buttons_text[index].style.fontSize = nav_button_decorations[index].offsetHeight/5 + "px";
            nav_buttons_text[index].style.position = "absolute";
            //nav_buttons_text[index].style.height = nav_buttons[index].offsetHeight + "px"; //let the algorithm figure out the heigh, no reason to worry about it here
            nav_buttons_text[index].style.width = nav_buttons[index].style.width.replace('px','') + "px";
            nav_buttons_text[index].style.top = nav_button_decorations[index].style.height.replace('px','')/7+nav_buttons_text[index].offsetHeight/4 + "px";
            nav_buttons_text[index].style.left = "0px";
            nav_buttons_text[index].style.color=Venus;
        }

        //draw the elements on the toggle btn canvas
        show_toggle_button_lnd();//move to show main something
        //check the status of the contianer move this to show something somethingh
        if (!main_container_open) {
            //initialize the page elements after the container box has been opened
            show_main_intial(); //resize the canvas as 0,0 and add no elements to it
        } else {
            //initialize the elements without the opening the container box
            show_main_opened(); //canvas is max sized and all the elements are drawn on it
        }

        //nav_bar.style.top = Math.floor((pseudo_background.style.height.replace('px','')/5-nav_bar.offsetHeight)/2) + "px";

        //about container positions and sizes
        //projects container possitions and sizes
        //contact container possitions and sizes

    } else {
        //calculate element sizes according to width
        
    }

}

//display the mode button on a landscape page
function show_toggle_button_lnd(){
    //longitudinal canvas for landscape mode
    let context = toggle_canvas.getContext("2d");
    //Lampad
    context.beginPath();
    context.rect(0, 0, toggle_canvas.width, toggle_canvas.height);
    context.fillStyle = Nymphae_Avernales;
    context.fill();
    //check wheteher it's LUX/NOX for the position of Melinoe and Zagreus squares
    let x_pos=(mode)?0:toggle_canvas.width/2;
    //Melinoe
    context.beginPath();
    context.rect(x_pos, 0, toggle_canvas.width/2, toggle_canvas.height);
    context.fillStyle = Melinoe;
    context.fill();
    //Zagreus
    //calculate it's size and position
    let zagreus=[x_pos+toggle_canvas.height/10,toggle_canvas.height/10,toggle_canvas.width*4/10,toggle_canvas.height*4/5];
    context.beginPath();
    context.rect(zagreus[0], zagreus[1], zagreus[2], zagreus[3]);
    context.fillStyle = Zagreus;
    context.fill();
    //Prosrepina
    //draw the shape of the LUX element
    //calculate origin
    let LUX_origin = {
        x: toggle_canvas.height/10+toggle_canvas.width/5,
        y: toggle_canvas.height/10+toggle_canvas.height*2/5
    };
    let LUX_r = zagreus[2]/6;
    let LUX_w = LUX_r/2;
    let LUX_l = LUX_r*2;
    let LUX_R = LUX_r+LUX_w;
    let LUX_RM = LUX_r+LUX_l-LUX_w;
    context.beginPath();
    context.arc(LUX_origin.x, LUX_origin.y, LUX_r, Math.PI, 2*Math.PI, false);
    context.lineTo(LUX_origin.x+LUX_RM,LUX_origin.y);
    context.lineTo(LUX_origin.x+LUX_RM,LUX_origin.y-LUX_w);
    context.lineTo(LUX_origin.x+LUX_R,LUX_origin.y-LUX_w);
    context.arc(LUX_origin.x, LUX_origin.y, LUX_R, Math.PI*2-Math.PI/9, 2*Math.PI-2*Math.PI/9, true);

    context.lineTo(LUX_origin.x+LUX_RM*Math.cos(2*Math.PI-2*Math.PI/9), LUX_origin.y+LUX_RM*Math.sin(2*Math.PI-2*Math.PI/9));
    context.lineTo(LUX_origin.x+LUX_RM*Math.cos(2*Math.PI-3*Math.PI/9), LUX_origin.y+LUX_RM*Math.sin(2*Math.PI-3*Math.PI/9));
    context.arc(LUX_origin.x, LUX_origin.y, LUX_R, Math.PI*2-3*Math.PI/9, 2*Math.PI-4*Math.PI/9, true);

    context.lineTo(LUX_origin.x+LUX_RM*Math.cos(2*Math.PI-4*Math.PI/9), LUX_origin.y+LUX_RM*Math.sin(2*Math.PI-4*Math.PI/9));
    context.lineTo(LUX_origin.x+LUX_RM*Math.cos(2*Math.PI-5*Math.PI/9), LUX_origin.y+LUX_RM*Math.sin(2*Math.PI-5*Math.PI/9));
    context.arc(LUX_origin.x, LUX_origin.y, LUX_R, Math.PI*2-5*Math.PI/9, 2*Math.PI-6*Math.PI/9, true);

    context.lineTo(LUX_origin.x+LUX_RM*Math.cos(2*Math.PI-6*Math.PI/9), LUX_origin.y+LUX_RM*Math.sin(2*Math.PI-6*Math.PI/9));
    context.lineTo(LUX_origin.x+LUX_RM*Math.cos(2*Math.PI-7*Math.PI/9), LUX_origin.y+LUX_RM*Math.sin(2*Math.PI-7*Math.PI/9));
    context.arc(LUX_origin.x, LUX_origin.y, LUX_R, Math.PI*2-7*Math.PI/9, 2*Math.PI-8*Math.PI/9, true);

    context.lineTo(LUX_origin.x-LUX_RM,LUX_origin.y-LUX_w);
    context.lineTo(LUX_origin.x-LUX_RM,LUX_origin.y);
    context.lineTo(LUX_origin.x-LUX_r,LUX_origin.y);

    //create LUX text
    context.fillStyle = Proserpina;
    context.font = zagreus[3]/3+"px bold Trajan";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText("LUX", toggle_canvas.width/4, toggle_canvas.height*3/4);
    
    //fill all the shapes
    //context.strokeStyle = Nymphae_Avernales;
    context.fill();

    //create the NOX shape
    let NOX_origin={
        x:toggle_canvas.width*3/4,
        y:toggle_canvas.height/5+toggle_canvas.width/6  
    }
    let point_a={
        x:NOX_origin.x-toggle_canvas.width/6,
        y:toggle_canvas.height/6
    }
    let point_b={
        x:NOX_origin.x+toggle_canvas.width/6,
        y:toggle_canvas.height/6
    }
    let point_c={
        x:NOX_origin.x,
        y:toggle_canvas.height/2.5
    }

    context.beginPath();
    context.moveTo(point_a.x, point_a.y);
    context.quadraticCurveTo(point_c.x, point_c.y, point_b.x, point_b.y);
    context.quadraticCurveTo(NOX_origin.x, NOX_origin.y, point_a.x, point_a.y);
    //context.stroke(); 

    //create the NOX text
    context.fillStyle = Pluto;
    context.font = zagreus[3]/3+"px bold Trajan";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText("NOX", toggle_canvas.width*3/4, toggle_canvas.height*3/4);
    context.fill();
}

function show_toggle_button_prt(){
    //size up the canvas according to the width and height, and position it vertically in th etop right corner
}

//define how a decoration canvas should look at initialization time
function decoration_start(button_id, new_colour) {
    var current_decoration = button_id;
    //get it's context
    const context = current_decoration.getContext("2d");
    //clear the canvas
    context.clearRect(0, 0, current_decoration.width, current_decoration.height);
    //maybe set width and heigth
    //x_coords for the cirlce rows
    var temp_x = current_decoration.offsetWidth/20;
    var temp_y = current_decoration.offsetHeight/7;
    var x_coords = [
        0,
        3*temp_x,
        16*temp_x,
        19*temp_x
    ];
    //draw teh 4 columns of circles
    for (let i = 0; i < 4; i++) {
        //7 circles per colmn
        for (let j = 0; j < 7; j++) {
            context.beginPath();
            context.arc(x_coords[i]+temp_y/2, temp_y*(j+0.5), temp_y/3, 0, 2 * Math.PI, false);
            context.fillStyle = (mode)?randomize_colour(new_colour):new_colour;
            context.fill();
            console.log("beep?",(mode))
        }
    }
    //draw the top/bottom lines
    context.beginPath();
    context.lineWidth = temp_y/2;
    context.moveTo(4.5*temp_x,temp_y/2);
    context.lineTo(15.5*temp_x,temp_y/2);
    context.strokeStyle = new_colour;
    context.stroke();

    context.beginPath();
    context.moveTo(4.5*temp_x,current_decoration.height-temp_y/2);
    context.lineTo(15.5*temp_x,current_decoration.height-temp_y/2);
    context.stroke();

    //draw the arrows
    context.beginPath();
    context.moveTo(4.5*temp_x,temp_y*2.5);
    context.lineTo(4.5*temp_x,temp_y*4.5);
    context.lineTo(5.5*temp_x,temp_y*3.5);
    context.fillStyle = new_colour;
    context.fill();

    context.beginPath();
    context.moveTo(current_decoration.width-4.5*temp_x,temp_y*2.5);
    context.lineTo(current_decoration.width-4.5*temp_x,temp_y*4.5);
    context.lineTo(current_decoration.width-5.5*temp_x,temp_y*3.5);
    context.fill();

    //draw the roman style decorations
    var line_width = temp_y/8; //slim enough so that all details are visible
    context.lineWidth=line_width;
    //calculate the total number of deocrations
    var dec_n = 4;
    //calc some stuff here to take some pressure from the loops
    var temp_decoration_total_size = (current_decoration.height/4); //size of the alloted space
    var temp_decoration_actual_size = (temp_decoration_total_size*3/4); //size of the square
    //var temp_dec = temp_decoration_actual_size/2;
    var temp_x1 = temp_x + (temp_decoration_total_size-temp_decoration_actual_size)/2;
    var temp_x2 = 3*temp_x - (temp_decoration_total_size-temp_decoration_actual_size)/2;
    var temp_x3 = 17*temp_x + (temp_decoration_total_size-temp_decoration_actual_size)/2;
    var temp_x4 = 19*temp_x - (temp_decoration_total_size-temp_decoration_actual_size)/2;
    var temp_y_coef = ((temp_decoration_total_size-temp_decoration_actual_size+(line_width/2))/2);
    var sqrs=[];
    //draw the squares
    //left column
    for (let i = 0; i < dec_n; i++) {
        //get a colour
        var colour = (mode)?randomize_colour(new_colour):new_colour;
        context.strokeStyle=colour;
        //draw a square
        context.beginPath();
        context.moveTo(temp_x1, (i*temp_decoration_total_size)+temp_y_coef);
        context.lineTo(temp_x2, (i*temp_decoration_total_size)+temp_y_coef);
        context.lineTo(temp_x2, ((i+1)*temp_decoration_total_size)-temp_y_coef);
        context.lineTo(temp_x1, ((i+1)*temp_decoration_total_size)-temp_y_coef);
        context.lineTo(temp_x1, (i*temp_decoration_total_size)+temp_y_coef);
        context.stroke();
        //add the coords to the sqr array
        sqrs.push({
            x: temp_x1,
            y: (i*temp_decoration_total_size)+temp_y_coef,
            w: temp_decoration_actual_size,
            h: temp_decoration_actual_size,
            c: colour
        });
    }
    //right column
    for (let i = 0; i < dec_n; i++) {
        //get a colour
        var colour = (mode)?randomize_colour(new_colour):new_colour;
        context.strokeStyle =colour;
        //draw a square
        context.beginPath();
        context.moveTo(temp_x3, (i*temp_decoration_total_size)+temp_y_coef);
        context.lineTo(temp_x4, (i*temp_decoration_total_size)+temp_y_coef);
        context.lineTo(temp_x4, ((i+1)*temp_decoration_total_size)-temp_y_coef);
        context.lineTo(temp_x3, ((i+1)*temp_decoration_total_size)-temp_y_coef);
        context.lineTo(temp_x3, (i*temp_decoration_total_size)+temp_y_coef);
        context.stroke();
        //add the coords to the sqr array
        sqrs.push({
            x: temp_x3,
            y: (i*temp_decoration_total_size)+temp_y_coef,
            w: temp_decoration_actual_size,
            h: temp_decoration_actual_size,
            c: colour
        });
    }
    line_width = temp_decoration_actual_size/11;
    context.lineWidth = line_width;
    //draw interior lines
    sqrs.forEach((square, pos)=>{
        context.strokeStyle = square.c;
        if (pos%2==0) {
            //even positions are horizontal
            //first horizontal lines
            context.beginPath();
            context.moveTo(square.x, square.y+6*temp_decoration_actual_size/11-line_width);
            context.lineTo(square.x+5*temp_decoration_actual_size/11-line_width/2, square.y+6*temp_decoration_actual_size/11-line_width);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+7*temp_decoration_actual_size/11-line_width/2, square.y+6*temp_decoration_actual_size/11-line_width);
            context.lineTo(square.x+square.w, square.y+6*temp_decoration_actual_size/11-line_width);
            context.stroke();

            //first vertical lines
            context.beginPath();
            context.moveTo(square.x+5*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11-line_width);
            context.lineTo(square.x+5*temp_decoration_actual_size/11-line_width/2, square.y+9*temp_decoration_actual_size/11);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+7*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11-line_width);
            context.lineTo(square.x+7*temp_decoration_actual_size/11-line_width, square.y+9*(temp_decoration_actual_size/11));
            context.stroke();

            //second horizontal lines
            context.beginPath();
            context.moveTo(square.x+5*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+2*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+7*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+9*temp_decoration_actual_size/11+line_width/2, square.y+2*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+5*temp_decoration_actual_size/11-line_width/2, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+2*temp_decoration_actual_size/11-line_width/2, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+7*temp_decoration_actual_size/11-line_width/2, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+9*temp_decoration_actual_size/11+line_width/2, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            //second vertical lines
            context.beginPath();
            context.moveTo(square.x+2*temp_decoration_actual_size/11, square.y+2*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+2*temp_decoration_actual_size/11, square.y+3.5*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+2*temp_decoration_actual_size/11, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+2*temp_decoration_actual_size/11, square.y+7.5*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+9*temp_decoration_actual_size/11, square.y+2*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+9*temp_decoration_actual_size/11, square.y+3.5*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+9*temp_decoration_actual_size/11, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+9*temp_decoration_actual_size/11, square.y+7.5*temp_decoration_actual_size/11-line_width/2);
            context.stroke();
        } else {
            //uneven positions are vertical
            //first vertical lines
            context.beginPath();
            context.moveTo(square.x+6*temp_decoration_actual_size/11-line_width, square.y);
            context.lineTo(square.x+6*temp_decoration_actual_size/11-line_width, square.y+5*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+6*temp_decoration_actual_size/11-line_width, square.y+7*(temp_decoration_actual_size/11)-line_width/2);
            context.lineTo(square.x+6*temp_decoration_actual_size/11-line_width, square.y+square.h-line_width/2);
            context.stroke();

            //first horizontal lines
            context.beginPath();
            context.moveTo(square.x+2*temp_decoration_actual_size/11-line_width, square.y+5*temp_decoration_actual_size/11-3*line_width/4);
            context.lineTo(square.x+9*temp_decoration_actual_size/11, square.y+5*temp_decoration_actual_size/11-3*line_width/4);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+2*temp_decoration_actual_size/11-line_width, square.y+7*temp_decoration_actual_size/11-3*line_width/4);
            context.lineTo(square.x+9*temp_decoration_actual_size/11, square.y+7*temp_decoration_actual_size/11-3*line_width/4);
            context.stroke();

            //second horizontal lines
            context.beginPath();
            context.moveTo(square.x+2*temp_decoration_actual_size/11-line_width/2, square.y+5*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+2*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+9*temp_decoration_actual_size/11-line_width/3, square.y+5*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+9*temp_decoration_actual_size/11-line_width/3, square.y+2*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+2*temp_decoration_actual_size/11-line_width/2, square.y+7*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+2*temp_decoration_actual_size/11-line_width/2, square.y+9*temp_decoration_actual_size/11);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+9*temp_decoration_actual_size/11-line_width/3, square.y+7*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+9*temp_decoration_actual_size/11-line_width/3, square.y+9*temp_decoration_actual_size/11);
            context.stroke();

            //second vertical lines
            context.beginPath();
            context.moveTo(square.x+2*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11);
            context.lineTo(square.x+3.5*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+9*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11);
            context.lineTo(square.x+7.5*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+2*temp_decoration_actual_size/11-line_width/2, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+3.5*temp_decoration_actual_size/11-line_width/2, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+9*temp_decoration_actual_size/11-line_width/2, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+7.5*temp_decoration_actual_size/11-line_width/2, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.stroke();
        }
    })
}

//define how a decoration canvas should look after the button is clciked
function decoration_clicked(button_id, new_colour){
    let current_decoration = button_id;
    //get it's context
    const context = current_decoration.getContext("2d");
    //clear the canvas
    context.clearRect(0, 0, current_decoration.width, current_decoration.height);
    //maybe set width and heigth
    //x_coords for the cirlce rows
    let temp_x = current_decoration.offsetWidth/20;
    let temp_y = current_decoration.offsetHeight/7;
    let x_coords = [
        0,
        3*temp_x,
        16*temp_x,
        19*temp_x
    ];
    //draw teh 4 columns of circles
    for (let i = 0; i < 4; i++) {
        //7 circles per colmn
        for (let j = 0; j < 7; j++) {
            context.beginPath();
            context.arc(x_coords[i]+temp_y/2, temp_y*(j+0.5), temp_y/3, 0, 2 * Math.PI, false);
            context.fillStyle = new_colour;
            context.fill();
        }
    }
    //draw the top/bottom lines
    context.beginPath();
    context.lineWidth = temp_y/2;
    context.moveTo(4.5*temp_x,temp_y/2);
    context.lineTo(15.5*temp_x,temp_y/2);
    context.strokeStyle = new_colour;
    context.stroke();

    context.beginPath();
    context.moveTo(4.5*temp_x,current_decoration.height-temp_y/2);
    context.lineTo(15.5*temp_x,current_decoration.height-temp_y/2);
    context.stroke();

    //draw the arrows
    context.beginPath();
    context.moveTo(4.5*temp_x,temp_y*2.5);
    context.lineTo(4.5*temp_x,temp_y*4.5);
    context.lineTo(5.5*temp_x,temp_y*3.5);
    context.fillStyle = new_colour;
    context.fill();

    context.beginPath();
    context.moveTo(current_decoration.width-4.5*temp_x,temp_y*2.5);
    context.lineTo(current_decoration.width-4.5*temp_x,temp_y*4.5);
    context.lineTo(current_decoration.width-5.5*temp_x,temp_y*3.5);
    context.fill();

    //draw the roman style decorations
    let line_width = temp_y/8; //slim enough so that all details are visible
    context.lineWidth=line_width;
    //calculate the total number of deocrations
    let dec_n = 4;
    //calc some stuff here to take some pressure from the loops
    let temp_decoration_total_size = (current_decoration.height/4); //size of the alloted space
    let temp_decoration_actual_size = (temp_decoration_total_size*3/4); //size of the square
    //let temp_dec = temp_decoration_actual_size/2;
    let temp_x1 = temp_x + (temp_decoration_total_size-temp_decoration_actual_size)/2;
    let temp_x2 = 3*temp_x - (temp_decoration_total_size-temp_decoration_actual_size)/2;
    let temp_x3 = 17*temp_x + (temp_decoration_total_size-temp_decoration_actual_size)/2;
    let temp_x4 = 19*temp_x - (temp_decoration_total_size-temp_decoration_actual_size)/2;
    let temp_y_coef = ((temp_decoration_total_size-temp_decoration_actual_size+(line_width/2))/2);
    let sqrs=[];
    //draw the squares
    //left column
    for (let i = 0; i < dec_n; i++) {
        //get a colour
        let colour = new_colour;
        context.strokeStyle = colour;
        //draw a square
        context.beginPath();
        context.moveTo(temp_x1, (i*temp_decoration_total_size)+temp_y_coef);
        context.lineTo(temp_x2, (i*temp_decoration_total_size)+temp_y_coef);
        context.lineTo(temp_x2, ((i+1)*temp_decoration_total_size)-temp_y_coef);
        context.lineTo(temp_x1, ((i+1)*temp_decoration_total_size)-temp_y_coef);
        context.lineTo(temp_x1, (i*temp_decoration_total_size)+temp_y_coef);
        context.stroke();
        //add the coords to the sqr array
        sqrs.push({
            x: temp_x1,
            y: (i*temp_decoration_total_size)+temp_y_coef,
            w: temp_decoration_actual_size,
            h: temp_decoration_actual_size,
            c: colour
        });
    }
    //right column
    for (let i = 0; i < dec_n; i++) {
        //get a colour
        let colour = new_colour;
        context.strokeStyle = colour;
        //draw a square
        context.beginPath();
        context.moveTo(temp_x3, (i*temp_decoration_total_size)+temp_y_coef);
        context.lineTo(temp_x4, (i*temp_decoration_total_size)+temp_y_coef);
        context.lineTo(temp_x4, ((i+1)*temp_decoration_total_size)-temp_y_coef);
        context.lineTo(temp_x3, ((i+1)*temp_decoration_total_size)-temp_y_coef);
        context.lineTo(temp_x3, (i*temp_decoration_total_size)+temp_y_coef);
        context.stroke();
        //add the coords to the sqr array
        sqrs.push({
            x: temp_x3,
            y: (i*temp_decoration_total_size)+temp_y_coef,
            w: temp_decoration_actual_size,
            h: temp_decoration_actual_size,
            c: colour
        });
    }
    line_width = temp_decoration_actual_size/11;
    context.lineWidth = line_width;
    //draw interior lines
    sqrs.forEach((square, pos)=>{
        context.strokeStyle = square.c;
        if (pos%2==0) {
            //even positions are horizontal
            //first horizontal lines
            context.beginPath();
            context.moveTo(square.x, square.y+6*temp_decoration_actual_size/11-line_width);
            context.lineTo(square.x+5*temp_decoration_actual_size/11-line_width/2, square.y+6*temp_decoration_actual_size/11-line_width);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+7*temp_decoration_actual_size/11-line_width/2, square.y+6*temp_decoration_actual_size/11-line_width);
            context.lineTo(square.x+square.w, square.y+6*temp_decoration_actual_size/11-line_width);
            context.stroke();

            //first vertical lines
            context.beginPath();
            context.moveTo(square.x+5*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11-line_width);
            context.lineTo(square.x+5*temp_decoration_actual_size/11-line_width/2, square.y+9*temp_decoration_actual_size/11);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+7*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11-line_width);
            context.lineTo(square.x+7*temp_decoration_actual_size/11-line_width, square.y+9*(temp_decoration_actual_size/11));
            context.stroke();

            //second horizontal lines
            context.beginPath();
            context.moveTo(square.x+5*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+2*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+7*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+9*temp_decoration_actual_size/11+line_width/2, square.y+2*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+5*temp_decoration_actual_size/11-line_width/2, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+2*temp_decoration_actual_size/11-line_width/2, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+7*temp_decoration_actual_size/11-line_width/2, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+9*temp_decoration_actual_size/11+line_width/2, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            //second vertical lines
            context.beginPath();
            context.moveTo(square.x+2*temp_decoration_actual_size/11, square.y+2*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+2*temp_decoration_actual_size/11, square.y+3.5*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+2*temp_decoration_actual_size/11, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+2*temp_decoration_actual_size/11, square.y+7.5*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+9*temp_decoration_actual_size/11, square.y+2*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+9*temp_decoration_actual_size/11, square.y+3.5*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+9*temp_decoration_actual_size/11, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+9*temp_decoration_actual_size/11, square.y+7.5*temp_decoration_actual_size/11-line_width/2);
            context.stroke();
        } else {
            //uneven positions are vertical
            //first vertical lines
            context.beginPath();
            context.moveTo(square.x+6*temp_decoration_actual_size/11-line_width, square.y);
            context.lineTo(square.x+6*temp_decoration_actual_size/11-line_width, square.y+5*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+6*temp_decoration_actual_size/11-line_width, square.y+7*(temp_decoration_actual_size/11)-line_width/2);
            context.lineTo(square.x+6*temp_decoration_actual_size/11-line_width, square.y+square.h-line_width/2);
            context.stroke();

            //first horizontal lines
            context.beginPath();
            context.moveTo(square.x+2*temp_decoration_actual_size/11-line_width, square.y+5*temp_decoration_actual_size/11-3*line_width/4);
            context.lineTo(square.x+9*temp_decoration_actual_size/11, square.y+5*temp_decoration_actual_size/11-3*line_width/4);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+2*temp_decoration_actual_size/11-line_width, square.y+7*temp_decoration_actual_size/11-3*line_width/4);
            context.lineTo(square.x+9*temp_decoration_actual_size/11, square.y+7*temp_decoration_actual_size/11-3*line_width/4);
            context.stroke();

            //second horizontal lines
            context.beginPath();
            context.moveTo(square.x+2*temp_decoration_actual_size/11-line_width/2, square.y+5*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+2*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+9*temp_decoration_actual_size/11-line_width/3, square.y+5*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+9*temp_decoration_actual_size/11-line_width/3, square.y+2*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+2*temp_decoration_actual_size/11-line_width/2, square.y+7*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+2*temp_decoration_actual_size/11-line_width/2, square.y+9*temp_decoration_actual_size/11);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+9*temp_decoration_actual_size/11-line_width/3, square.y+7*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+9*temp_decoration_actual_size/11-line_width/3, square.y+9*temp_decoration_actual_size/11);
            context.stroke();

            //second vertical lines
            context.beginPath();
            context.moveTo(square.x+2*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11);
            context.lineTo(square.x+3.5*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+9*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11);
            context.lineTo(square.x+7.5*temp_decoration_actual_size/11-line_width/2, square.y+2*temp_decoration_actual_size/11);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+2*temp_decoration_actual_size/11-line_width/2, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+3.5*temp_decoration_actual_size/11-line_width/2, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.stroke();

            context.beginPath();
            context.moveTo(square.x+9*temp_decoration_actual_size/11-line_width/2, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.lineTo(square.x+7.5*temp_decoration_actual_size/11-line_width/2, square.y+9*temp_decoration_actual_size/11-line_width/2);
            context.stroke();
        }
    })
}

//what to do when a nav button is clicked
function main_button_clicked(selection){
    //button attributes
    let current_obj = document.getElementById(selection);
    let current_dec = document.getElementById(selection+"_dec");
    let current_txt = document.getElementById(selection+"_txt");

    //if the animation is in progress, do not do anything
    if (animation_on) {
        return;
    }

    //store current selection
    selection_id=selection;

    //initialization check
    if (!main_container_open) {  
        //delete shading off selection button
        current_obj.style.boxShadow = no_shading_nav_button; 
        //make it the marble colour
        current_obj.style.backgroundColor = "#00000000"; // Maribel+"00";
        //change text to plumbum
        current_txt.style.color = Vulcan;
        //redo decorations in plumbum colour
        decoration_clicked(current_dec,Vulcan);
        //play the initialization animation
        open_main_container();        
        //store the current selection in memory
        current_container=selection;
        prev_selection=selection;

    } else {
        //check if the current selection is the current one
        if (current_container==selection) {
            //reset all to start state
            ////set current button to start state (shading+colour)
            current_obj.style.boxShadow = shading_nav_button; 
            current_obj.style.backgroundColor = Neptune;
            current_txt.style.color = Venus;
            decoration_start(current_dec,Venus);
            ////fade out container content
            fade_out_container_content();
            ////play the closing animation
            close_main_container();
            //reset the current selection var
            current_container=null;
            prev_selection=null;
            selection_id=null;
        } else {
            //store the id in memory
            selection_id=selection;
            
            let prev_obj = document.getElementById(prev_selection);
            let prev_dec = document.getElementById(prev_selection+"_dec");
            let prev_txt = document.getElementById(prev_selection+"_txt");
            //reset current selection and show the new one
            ////set current button to start state (shading+colour)
            prev_obj.style.boxShadow = shading_nav_button; 
            prev_obj.style.backgroundColor = Neptune;
            prev_txt.style.color = Venus;
            decoration_start(prev_dec,Venus);
            current_obj.style.boxShadow = no_shading_nav_button; 
            //make it the marble colour
            current_obj.style.backgroundColor = "#00000000";//makes it transparent // Maribel+"00";
            //change text to plumbum
            current_txt.style.color = Vulcan;
            //redo decorations in plumbum colour
            decoration_clicked(current_dec,Vulcan);
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ////fade out container content
            //fade_out_container_content();
            ////fade in the new content
            //fade_in_container_content();
            //shit timing, instead make a special function that does just this
            switch_contents();

            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //store the current selection in memory
            current_container=selection;
            prev_selection=selection;
        }
    }

    
}

//opening the main container
function open_main_container() {
    //set the var
    main_container_open=true;
    //start the animation
    //keyframe 0 - create the rhombus 
    //keyframe 1 - make the rhombus larger
    //keyframe 2 - split the rhombus and go to the edges with a ribbon in between
    //keyframe 3 - move the buttons and the ribbons up/down to create the main display area for the contianer
    //keyframe 4 - add decorations to the ribbon, push up slab
    //keyframe 5 - move the roof up and the other details
    animation = "main_cont_in";
    animate();
    //show_main_opened();//for debug
}

//closing the main container
function close_main_container(){
    //set the var
    main_container_open=false;
    //start the reverse animation
    animation = "main_cont_out";
    animate();
    //show_main_intial();//for debug
}   

//showing the menu in the intial state
function show_main_intial() {
    //show the initial state
    //place the nav bar
    nav_bar.style.top = Math.floor((pseudo_background.offsetHeight-nav_bar.offsetHeight)/2) + "px";
    //draw the button decorations as 'initial'
    for (let index = 0; index < nav_button_decorations.length; index++) {
        //draw the decorations
        decoration_start(nav_button_decorations[index], Venus);                 
    }
    //draw nothing on the main canvas
    ctx_bg.clearRect(0,0,decoration_canvas_size.w,decoration_canvas_size.h);
    //place the remaining elements (content) (decoration canvas, div container for each button, and the elements contained within said containers)
    //none since it's not open
}

//showing the menu in the final state 
function show_main_opened() {
    //show the opened state
    //place the nav bar on top
    nav_bar.style.top = Math.floor((pseudo_background.style.height.replace('px','')/5-nav_bar.offsetHeight)/2) + "px";
    //draw the button decoration again, this time checking which button is clicked
    for (let index = 0; index < nav_button_decorations.length; index++) {
        //chekc if it's selected
        if (index==selection_id) {
            //set the bg
            //delete shading off selection button
            nav_buttons[index].style.boxShadow = no_shading_nav_button; 
            //make it the marble colour
            nav_buttons[index].style.backgroundColor = "#00000000"; // Maribel+"00";
            //change text to plumbum
            nav_buttons_text[index].style.color = Vulcan;
            //draw the decoration
            decoration_clicked(nav_button_decorations[index], Vulcan);
        } else {
            //set the bg
            //delete shading off selection button
            nav_buttons[index].style.boxShadow = shading_nav_button; 
            //make it the marble colour
            nav_buttons[index].style.backgroundColor = Neptune; // Maribel+"00";
            //change text to plumbum
            nav_buttons_text[index].style.color = Venus;
            //draw the decoration
            decoration_start(nav_button_decorations[index], Venus);
        }
    }
    //draw the main canvas in the final state
    draw_decoration_canvas_opened();
    //show the content
    show_container_content();
}

//fading in container content
function fade_in_container_content(){
    //set teh correct content
    div_content_box.innerHTML = main_content[selection_id];
    //style the content
    style_content();
    //set its visibility
    div_content_box.style.visibility="visible";
    //set its opacity
    let opac = 0;
    var fade_in_effect = setInterval(function () {
        if (!div_content_box.style.opacity) {
            div_content_box.style.opacity = opac;
        }
        if (div_content_box.style.opacity < 1) {
            opac+=0.05;
            div_content_box.style.opacity = opac;
        } else {
            div_content_box.style.opacity = 1;
            clearInterval(fade_in_effect);
        }   
    }, 10);
}

//fading out container content
function fade_out_container_content() {
    //set its opacity
    let opac = 1;
    var fade_out_effect = setInterval(function () {
        if (!div_content_box.style.opacity) {
            div_content_box.style.opacity = opac;
        }
        if (div_content_box.style.opacity > 0) {
            opac-=0.05;
            div_content_box.style.opacity = opac;
        } else {
            div_content_box.style.opacity = 0;
            div_content_box.style.visibility="hidden";
            clearInterval(fade_out_effect);
        }   
    }, 10);
}

function switch_contents(){
    if (animation_on) {
        return;
    }
    animation_on=true;
    let opac = 1;
    var fade_out_effect = setInterval(function () {
        if (!div_content_box.style.opacity) {
            div_content_box.style.opacity = opac;
        }
        if (div_content_box.style.opacity > 0) {
            opac-=0.05;
            div_content_box.style.opacity = opac;
        } else {
            opac=0;
            div_content_box.style.opacity = 0;
            div_content_box.style.visibility="hidden";
            //set the correct content
            div_content_box.innerHTML = main_content[selection_id];
            //style the content
            style_content();
            //set its visibility
            div_content_box.style.visibility="visible";
            //set its opacity
            let opc = 0;
            var fade_in_effect = setInterval(function () {
                if (!div_content_box.style.opacity) {
                    div_content_box.style.opacity = opc;
                }
                if (div_content_box.style.opacity < 1) {
                    opc+=0.05;
                    div_content_box.style.opacity = opc;
                } else {
                    div_content_box.style.opacity = 1;
                    animation_on=false;
                    clearInterval(fade_in_effect);
                }   
            }, 10); 
            //stop the fade out effect
            clearInterval(fade_out_effect); 
        } 
    }, 10);
}

//show the container content without any animations (used on resize)
function show_container_content(){
    //set teh correct content
    div_content_box.innerHTML = main_content[selection_id];
    //style container content
    style_content();
    //set its visibility
    div_content_box.style.visibility="visible";
    //set its opacity
    div_content_box.style.opacity = 1;
}

function style_content(){
    //check which content is displayed
    switch (selection_id) {
        case 0:
            //about content
            let atext = document.getElementById("about_text");
            let alinks = document.getElementsByClassName("link_content");
            //text sizes
            atext.style.fontSize = div_content_box.offsetHeight/22+"px";
            //text position
            atext.style.top=Math.floor((div_content_box.offsetHeight-atext.offsetHeight)/2)+'px';   
            //text/link colours
            atext.style.color = Quirinus;
            for (let index = 0; index < alinks.length; index++) {
                //normal text colour
                alinks[index].style.color = Pontus;
                //change colour on hover
                alinks[index].addEventListener('mouseover',function(){
                    alinks[index].style.color = Salacia;
                 })
                alinks[index].addEventListener('mouseleave',function(){
                    alinks[index].style.color = Pontus;
                 })
            }
            break;

        case 1:
            //projects content
            //size and pos for selector div "project_selector"
            let project_selection_div = document.getElementById("project_selector");
            project_selection_div.style.top="0px";
            project_selection_div.style.left="0px";
            project_selection_div.style.width=div_content_box.offsetWidth/4;
            project_selection_div.style.height=div_content_box.offsetHeight;
            //iterate throught the project selectors canvases and texts
            let prject_selector_canvases = document.getElementsByClassName("project_selector_canvas");
            let project_selector_texts = document.getElementsByClassName("project_selector_text");
            //calculate the paddin value 
            let pad = project_selection_div.offsetWidth/64;
            for (let index = 0; index < prject_selector_canvases.length; index++) {
                //size up the canvas
                prject_selector_canvases[index].style.width = project_selection_div.offsetWidth+"px";
                prject_selector_canvases[index].style.height = project_selection_div.offsetHeight/6+"px";
                prject_selector_canvases[index].width = project_selection_div.offsetWidth;
                prject_selector_canvases[index].height = project_selection_div.offsetHeight/6;
                //possition the canvas
                let padding=(project_selection_div.offsetHeight-(prject_selector_canvases[index].offsetHeight*prject_selector_canvases.length))/4;
                prject_selector_canvases[index].style.top = index*(prject_selector_canvases[index].offsetHeight+padding)+"px";
                prject_selector_canvases[index].style.left = "0px";
                //size up the text
                project_selector_texts[index].style.fontSize = prject_selector_canvases[index].offsetHeight/3+"px";
                //possition the text
                project_selector_texts[index].style.top = prject_selector_canvases[index].offsetTop+"px";
                project_selector_texts[index].style.left = prject_selector_canvases[index].offsetLeft+prject_selector_canvases[index].offsetWidth/2-project_selector_texts[index].offsetWidth/2+"px";
                //set text colour
                project_selector_texts[index].style.color = Falacer;
                //check to see   if this button is selected
                if ((index==current_project) && project_displayed) {
                    //display selected canvas decorations
                    //calculate the position of the 4 points
                    let xi = pad;
                    let xf = prject_selector_canvases[index].offsetWidth+1;
                    let yi = pad;
                    let yf = prject_selector_canvases[index].offsetHeight-pad;
                    //store the Y coords of the points for the display canvas
                    y_coords={
                        i:prject_selector_canvases[index].offsetTop+yi,
                        f:prject_selector_canvases[index].offsetTop+yf+1
                    };
                    //draw background
                    let ctx = prject_selector_canvases[index].getContext("2d");
                    //draw decoration lines (as a C)
                    ctx.beginPath();
                    ctx.lineWidth = pad/2;
                    ctx.moveTo(xf,yi);
                    ctx.lineTo(xi,yi);
                    ctx.lineTo(xi,yf);
                    ctx.lineTo(xf,yf);
                    ctx.fillStyle = Furrina; //set the colour of the bg
                    ctx.fill();
                    ctx.strokeStyle = Falacer; //set the colour of the lines
                    ctx.stroke();
                    //remove all shadows
                    prject_selector_canvases[index].style.boxShadow = shading_project_button; 
                } else {
                    //display unselected canvas decarations
                    //calculate the position of the 4 ponts
                    let xi = pad;
                    let xf = prject_selector_canvases[index].offsetWidth-pad;
                    let yi = pad;
                    let yf = prject_selector_canvases[index].offsetHeight-pad;
                    //draw background
                    let ctx = prject_selector_canvases[index].getContext("2d");
                    //draw decaoration lines (as a rectangle)
                    ctx.beginPath();
                    ctx.lineWidth = pad/2;
                    ctx.moveTo(xi,yi);
                    ctx.lineTo(xf,yi);
                    ctx.lineTo(xf,yf);
                    ctx.lineTo(xi,yf);
                    ctx.lineTo(xi,yi);
                    ctx.fillStyle = Carmentis; //set the colour of the bg
                    ctx.fill();
                    ctx.strokeStyle = Falacer; //set the colour var for the lines
                    ctx.stroke();
                    //add shading decarations
                    prject_selector_canvases[index].style.boxShadow = no_shading_project_button; 
                }
            }
            //set the size and pos of the display area
            let project_display_canvas = document.getElementById("project_display");
            project_display_canvas.style.top="0px";
            project_display_canvas.style.left=div_content_box.offsetWidth/4+"px";
            project_display_canvas.style.width=3*div_content_box.offsetWidth/4+"px";
            project_display_canvas.style.height=div_content_box.offsetHeight+"px";
            project_display_canvas.width=3*div_content_box.offsetWidth/4;
            project_display_canvas.height=div_content_box.offsetHeight;
            //set size, pos adn colours of displayed text and titles
            let project_display_text = document.getElementById("project_display_text");
            project_display_text.style.left=div_content_box.offsetWidth/4+"px";
            project_display_text.style.width=(project_display_canvas.offsetWidth-project_display_canvas.offsetWidth/25)+"px";
            project_display_text.style.height=(project_display_canvas.offsetHeight-project_display_canvas.offsetHeight/15)+"px";
            project_display_text.style.top=project_display_canvas.offsetHeight/50+"px";
            //project_display_text.style.top=-project_display_text.offsetHeight/27+"px"; //for some reason the top possition is always one line down on p  -> just made it into a div instead
            //padding for the content
            project_display_text.style.paddingTop=Math.round(project_display_canvas.offsetHeight/50)+"px";
            project_display_text.style.paddingBottom="0px";
            project_display_text.style.paddingLeft=Math.round(project_display_canvas.offsetWidth/50)+"px";
            project_display_text.style.paddingRight=Math.round(project_display_canvas.offsetWidth/50)+"px";
            

            //set font size

            //set colours


            //make sure the overflow scrollbar is properly styled

            //see if a button was clicked, and display appropately
            if (project_displayed) {
                //diplay it as a proper shape fitting the button one
                //calculate the position of the 4 ponts
                let xi = pad;
                let xf = project_display_canvas.offsetWidth-pad;
                let yi = pad;
                let yf = project_display_canvas.offsetHeight-pad;
                //draw background
                let ctx = project_display_canvas.getContext("2d");
                //draw decaoration lines (selected)
                ctx.beginPath();
                ctx.lineWidth = pad/2;
                ctx.moveTo(0,y_coords.i);
                ctx.lineTo(xi,y_coords.i);
                ctx.lineTo(xi,yi);
                ctx.lineTo(xf,yi);
                ctx.lineTo(xf,yf);
                ctx.lineTo(xi,yf);
                ctx.lineTo(xi,y_coords.f);
                ctx.lineTo(0,y_coords.f);
                ctx.fillStyle = Furrina; //set the colour of the bg
                ctx.fill();
                ctx.strokeStyle = Falacer; //set the colour of the lines
                ctx.stroke();
            } else {
                //display decorations as a rectangle 
                //calculate the position of the 4 ponts
                let xi = pad;
                let xf = project_display_canvas.offsetWidth-pad;
                let yi = pad;
                let yf = project_display_canvas.offsetHeight-pad;
                //draw background
                let ctx = project_display_canvas.getContext("2d");
                //draw decaoration lines (as a rectangle)
                ctx.beginPath();
                ctx.lineWidth = pad/2;
                ctx.moveTo(xi,yi);
                ctx.lineTo(xf,yi);
                ctx.lineTo(xf,yf);
                ctx.lineTo(xi,yf);
                ctx.lineTo(xi,yi);
                ctx.fillStyle = Furrina; //set the colour of the bg
                ctx.fill();
                ctx.strokeStyle = Falacer; //set the colour of the lines
                ctx.stroke();
            }

            //
            if(project_displayed){initial_project_show();}

            break;

        case 2:
            //contact content
            //about content
            let ctext = document.getElementById("contact_text");
            let clinks = document.getElementsByClassName("link_content");
            let clink_imgs = document.getElementsByClassName("logos");
            let image_size = Math.floor(div_content_box.offsetHeight/20)+"px";
            //text sizes
            ctext.style.fontSize = div_content_box.offsetHeight/16+"px";
            //text position
            ctext.style.top=Math.floor((div_content_box.offsetHeight-ctext.offsetHeight)/2)+'px';   
            //text/link colours
            ctext.style.color = Quirinus;
            for (let index = 0; index < clinks.length; index++) {
                //normal text colour
                clinks[index].style.color = Pontus;
                //set the correct image at the start
                if (mode) {
                    clink_imgs[index].src=image_gallery[index].lux_dark;
                } else {
                    clink_imgs[index].src=image_gallery[index].nox;
                }
                //change colour on hover
                clinks[index].addEventListener('mouseover',function(){
                    //text
                    clinks[index].style.color = Salacia;
                    //image
                    if (mode) {
                        clink_imgs[index].src=image_gallery[index].lux_light;
                    } else {
                        clink_imgs[index].src=image_gallery[index].nox;             //keep this just in case we want to change to colour of hovered links later?
                    }
                });
                clinks[index].addEventListener('mouseleave',function(){
                    //text
                    clinks[index].style.color = Pontus;
                    //image
                    if (mode) {
                        clink_imgs[index].src=image_gallery[index].lux_dark;
                    } else {
                        clink_imgs[index].src=image_gallery[index].nox;             //keep this just in case we want to change to colour of hovered links later?
                    }
                });
                //make images the correct size
                clink_imgs[index].style.height=image_size;
            }
            break;

        default:
            break;
    }
}

//shows a certain project on the project display
function show_project(project_id) {
    if (animation_on) {
        return;
    };
    //check to see if a project is displayed
    if (project_displayed) {
        //check to see if the current project is being the one shown
        if (current_project==project_id) {
            display_project(null);
            //set the vars
            project_displayed=false;
            current_project=null;
            //same project displayed, clear the dispaly area
            fade_out_project_content();
        } else {
            display_project(project_id);
            //fade out the current project, and fade in the new one
            switch_projects(project_id);
            //set the vars
            current_project=project_id;
        }
    } else {
        display_project(project_id);
        //set the vars
        project_displayed=true;
        current_project=project_id;
        //fade in the new project
        fade_in_project_content();
        
    }
}

function display_project(proj_id) {
    //get the buttons array and display canvas
    let prject_selector_canvases = document.getElementsByClassName("project_selector_canvas");
    let project_display_canvas = document.getElementById("project_display");
    //calculate the paddin value 
    let pad = document.getElementById("project_selector").offsetWidth/64;
    //check if we have a previously selected button
    if (project_displayed) {
        //unselect the previously selected button
        //calculate the position of the 4 ponts
        let xi = pad;
        let xf = prject_selector_canvases[current_project].offsetWidth-pad;
        let yi = pad;
        let yf = prject_selector_canvases[current_project].offsetHeight-pad;
        //draw background
        let ctx = prject_selector_canvases[current_project].getContext("2d");
        //draw decaoration lines (as a rectangle)
        ctx.clearRect(0,0,prject_selector_canvases[current_project].width,prject_selector_canvases[current_project].height);
        ctx.beginPath();
        ctx.lineWidth = pad/2;
        ctx.moveTo(xi,yi);
        ctx.lineTo(xf,yi);
        ctx.lineTo(xf,yf);
        ctx.lineTo(xi,yf);
        ctx.lineTo(xi,yi);
        ctx.fillStyle = Carmentis; //set the colour of the bg
        ctx.fill(); 
        ctx.strokeStyle = Falacer; //set the colour var for the line
        ctx.stroke();
        //add shading decarations
        prject_selector_canvases[current_project].style.boxShadow = no_shading_project_button; 
        //reset project display are to default
        //calculate the position of the 4 ponts
        xi = pad;
        xf = project_display_canvas.offsetWidth-pad;
        yi = pad;
        yf = project_display_canvas.offsetHeight-pad;
        //draw background
        ctx = project_display_canvas.getContext("2d");
        //draw decaoration lines (as a rectangle)
        ctx.clearRect(0,0,project_display_canvas.width,project_display_canvas.height);
        ctx.beginPath();
        ctx.lineWidth = pad/2;
        ctx.moveTo(xi,yi);
        ctx.lineTo(xf,yi);
        ctx.lineTo(xf,yf);
        ctx.lineTo(xi,yf);
        ctx.lineTo(xi,yi);
        ctx.fillStyle = Furrina; //set the colour of the bg
        ctx.fill();
        ctx.strokeStyle = Falacer; //set the colour of the lines
        ctx.stroke();
    }
    //check to see if there was a viable selection
    if (proj_id!=null) {
        //calculate the position of the 4 points
        let xi = pad;
        let xf = prject_selector_canvases[proj_id].offsetWidth+1;
        let yi = pad;
        let yf = prject_selector_canvases[proj_id].offsetHeight-pad;
        //store the Y coords of the points for the display canvas
        y_coords={
            i:prject_selector_canvases[proj_id].offsetTop+yi,
            f:prject_selector_canvases[proj_id].offsetTop+yf+1
        };
        //draw background
        let ctx = prject_selector_canvases[proj_id].getContext("2d");
        //draw decoration lines (as a C)
        ctx.clearRect(0,0,prject_selector_canvases[proj_id].width,prject_selector_canvases[proj_id].height);
        ctx.beginPath();
        ctx.lineWidth = pad/2;
        ctx.moveTo(xf,yi);
        ctx.lineTo(xi,yi);
        ctx.lineTo(xi,yf);
        ctx.lineTo(xf,yf);
        ctx.fillStyle = Furrina; //set the colour of the bg
        ctx.fill();
        ctx.strokeStyle = Falacer; //set the colour of the lines
        ctx.stroke();
        //remove all shadows
        prject_selector_canvases[proj_id].style.boxShadow = shading_project_button; 
        //set the project display area to it's proper position
        //calculate the position of the 4 ponts
        xi = pad;
        xf = project_display_canvas.offsetWidth-pad;
        yi = pad;
        yf = project_display_canvas.offsetHeight-pad;
        //draw background
        ctx = project_display_canvas.getContext("2d");
        //draw decaoration lines (button selected)
        ctx.clearRect(0,0,project_display_canvas.width,project_display_canvas.height);
        ctx.beginPath();
        ctx.lineWidth = pad/2;
        ctx.moveTo(0,y_coords.i);
        ctx.lineTo(xi,y_coords.i);
        ctx.lineTo(xi,yi);
        ctx.lineTo(xf,yi);
        ctx.lineTo(xf,yf);
        ctx.lineTo(xi,yf);
        ctx.lineTo(xi,y_coords.f);
        ctx.lineTo(0,y_coords.f);
        ctx.fillStyle = Furrina; //set the colour of the bg
        ctx.fill();
        ctx.strokeStyle = Falacer; //set the colour of the lines
        ctx.stroke();
    }
}

//fading in project content
function fade_in_project_content(){
    let project_display_text = document.getElementById("project_display_text");
    animation_on=true;
    //set teh correct content
    project_display_text.innerHTML = project_content[current_project];
    //set text size and colours
    let text_headers = document.getElementsByClassName("subtitle");
    for (let index = 0; index < text_headers.length; index++) {
        text_headers[index].style.color = Portunus;
        text_headers[index].style.fontSize = (project_display_text.offsetHeight/15)+"px";
        
    }
    let text_paragraphs = document.getElementsByClassName("paragraph");
    for (let index = 0; index < text_paragraphs.length; index++) {
        text_paragraphs[index].style.color = Palatua;
        text_paragraphs[index].style.fontSize = (project_display_text.offsetHeight/25)+"px";
        
    }
    let text_links = document.getElementsByClassName("link");
    for (let index = 0; index < text_links.length; index++) {
        text_links[index].style.fontSize = (project_display_text.offsetHeight/25)+"px";
        text_links[index].style.color = Volturnus;
        //change colour on hover
        text_links[index].addEventListener('mouseover',function(){
            //text
            text_links[index].style.color = Janus;
        });
        text_links[index].addEventListener('mouseleave',function(){
            //text
            text_links[index].style.color = Volturnus;
        });
    }
    //set its visibility
    project_display_text.style.opacity=0; // make it transparent before we raise it's opacity in the animation
    project_display_text.style.visibility="visible";
    //set its opacity
    let opac = 0;
    var fade_in_effect = setInterval(function () {
        if (!project_display_text.style.opacity) {
            project_display_text.style.opacity = opac;
        }
        if (project_display_text.style.opacity < 1) {
            opac+=0.05;
            project_display_text.style.opacity = opac;
        } else {
            project_display_text.style.opacity = 1;
            animation_on=false;
            clearInterval(fade_in_effect);
        }   
    }, 10);
}

//fading out project content
function fade_out_project_content() {
    let project_display_text = document.getElementById("project_display_text");
    animation_on=true;
    //set its opacity
    let opac = 1;
    var fade_out_effect = setInterval(function () {
        if (!project_display_text.style.opacity) {
            project_display_text.style.opacity = opac;
        }
        if (project_display_text.style.opacity > 0) {
            opac-=0.05;
            project_display_text.style.opacity = opac;
        } else {
            project_display_text.style.opacity = 0;
            project_display_text.style.visibility="hidden";
            animation_on=false;
            clearInterval(fade_out_effect);
        }   
    }, 10);
}

//switch projects
function switch_projects(project_id) {
    if (animation_on) {
        return;
    }
    let project_display_text = document.getElementById("project_display_text");
    animation_on=true;
    let opac = 1;
    var fade_out_effect = setInterval(function () {
        if (!project_display_text.style.opacity) {
            project_display_text.style.opacity = opac;
        }
        if (project_display_text.style.opacity > 0) {
            opac-=0.05;
            project_display_text.style.opacity = opac;
        } else {
            opac=0;
            project_display_text.style.opacity = 0;
            project_display_text.style.visibility="hidden";
            //set the correct content
            project_display_text.innerHTML = project_content[project_id];
            //set text size and colours
            let text_headers = document.getElementsByClassName("subtitle");
            for (let index = 0; index < text_headers.length; index++) {
                text_headers[index].style.color = Portunus;
                text_headers[index].style.fontSize = (project_display_text.offsetHeight/15)+"px";
                
            }
            let text_paragraphs = document.getElementsByClassName("paragraph");
            for (let index = 0; index < text_paragraphs.length; index++) {
                text_paragraphs[index].style.color = Palatua;
                text_paragraphs[index].style.fontSize = (project_display_text.offsetHeight/25)+"px";
                
            }
            let text_links = document.getElementsByClassName("link");
            for (let index = 0; index < text_links.length; index++) {
                text_links[index].style.fontSize = (project_display_text.offsetHeight/25)+"px";
                text_links[index].style.color = Volturnus;
                //change colour on hover
                text_links[index].addEventListener('mouseover',function(){
                    //text
                    text_links[index].style.color = Janus;
                });
                text_links[index].addEventListener('mouseleave',function(){
                    //text
                    text_links[index].style.color = Volturnus;
                });
            }
            //set its visibility
            project_display_text.style.visibility="visible";
            //set its opacity
            let opc = 0;
            var fade_in_effect = setInterval(function () {
                if (!project_display_text.style.opacity) {
                    project_display_text.style.opacity = opc;
                }
                if (project_display_text.style.opacity < 1) {
                    opc+=0.05;
                    project_display_text.style.opacity = opc;
                } else {
                    project_display_text.style.opacity = 1;
                    animation_on=false;
                    clearInterval(fade_in_effect);
                }   
            }, 10); 
            //stop the fade out effect
            clearInterval(fade_out_effect); 
        } 
    }, 10);
}

function initial_project_show(){
    let project_display_text = document.getElementById("project_display_text");
    //set teh correct content
    project_display_text.innerHTML = project_content[current_project];
    //set text size and colours
    let text_headers = document.getElementsByClassName("subtitle");
    for (let index = 0; index < text_headers.length; index++) {
        text_headers[index].style.color = Portunus;
        text_headers[index].style.fontSize = (project_display_text.offsetHeight/15)+"px";
        
    }
    let text_paragraphs = document.getElementsByClassName("paragraph");
    for (let index = 0; index < text_paragraphs.length; index++) {
        text_paragraphs[index].style.color = Palatua;
        text_paragraphs[index].style.fontSize = (project_display_text.offsetHeight/25)+"px";
        
    }
    let text_links = document.getElementsByClassName("link");
    for (let index = 0; index < text_links.length; index++) {
        text_links[index].style.fontSize = (project_display_text.offsetHeight/25)+"px";
        text_links[index].style.color = Volturnus;
        //change colour on hover
        text_links[index].addEventListener('mouseover',function(){
            //text
            text_links[index].style.color = Janus;
        });
        text_links[index].addEventListener('mouseleave',function(){
            //text
            text_links[index].style.color = Volturnus;
        });
    }
    //set its visibility
    project_display_text.style.visibility="visible";
}

function animate() {
    //animation requested,
    animation_on=true;
    switch (animation) {
        case "main_cont_in":
            animation_main_container_opening();
            break;
        case "main_cont_out":
            animation_main_container_closing();
            break;

        default:
            animation_on=false;
            break;
    }
    //calls the animate method many times per second
    if (animation_on) {
        requestAnimationFrame(animate);
    }
}

function animation_main_container_closing() {
    switch (keyframe) {
        //keyframe 0
        //fade out the container
        case 0:
            //set up the first max frame counter
            max_frames=40;
            let beta=0;
            //current frame check
            if (animation_counter<max_frames) {
                //increment animation counter
                animation_counter++;
                //alpha
                beta = Math.floor(255-(animation_counter/max_frames)*255);
            } else {
                //set up next animation keyframe
                keyframe=1;
                animation_counter=0;
                max_frames=40;
                step = (((decoration_canvas_size.h/2)-(tp.chevron[2].y-tp.chevron[4].y)/2))/max_frames;
                nav_step = (Math.floor((pseudo_background.offsetHeight-nav_bar.offsetHeight)/2)-Math.floor((pseudo_background.style.height.replace('px','')/5-nav_bar.offsetHeight)/2))/max_frames;

            }
            //clear the canvas
            ctx_bg.clearRect(0,0,decoration_canvas_size.w,decoration_canvas_size.h);
            //draw left chevron
            ctx_bg.beginPath();
            ctx_bg.moveTo(chevrons.left[0].x, chevrons.left[0].y);
            for (let index = 1; index < chevrons.left.length; index++) {
                ctx_bg.lineTo(chevrons.left[index].x, chevrons.left[index].y)
            }
            ctx_bg.fillStyle=Mars;
            ctx_bg.fill();
            //draw right chevron
            ctx_bg.beginPath();
            ctx_bg.moveTo(chevrons.right[0].x, chevrons.right[0].y);
            for (let index = 1; index < chevrons.left.length; index++) {
                ctx_bg.lineTo(chevrons.right[index].x, chevrons.right[index].y)
            }
            ctx_bg.fillStyle=Mars;
            ctx_bg.fill();
            //top ribbon
            ctx_bg.beginPath();
            ctx_bg.moveTo(tp.ribbon[0].x, tp.ribbon[0].y);
            ctx_bg.lineTo(tp.ribbon[1].x, tp.ribbon[1].y);
            ctx_bg.lineTo(tp.ribbon[2].x, tp.ribbon[2].y);
            ctx_bg.lineTo(tp.ribbon[3].x, tp.ribbon[3].y);
            ctx_bg.closePath();
            ctx_bg.fillStyle=Mars;
            ctx_bg.fill();
            //bottom ribbon
            ctx_bg.beginPath();
            ctx_bg.moveTo(bt.ribbon[0].x, bt.ribbon[0].y);
            ctx_bg.lineTo(bt.ribbon[1].x, bt.ribbon[1].y);
            ctx_bg.lineTo(bt.ribbon[2].x, bt.ribbon[2].y);
            ctx_bg.lineTo(bt.ribbon[3].x, bt.ribbon[3].y);
            ctx_bg.closePath();
            ctx_bg.fillStyle=Mars; 
            ctx_bg.fill();
            //decorations
            ctx_bg.strokeStyle=Sol;
            ctx_bg.lineWidth=(collumns.top[1].y-collumns.top[0].y)/5
            //draw the lines
            for (let g = 0; g < tp.decoration.length; g++) {
                //start teh shape
                ctx_bg.beginPath();
                ctx_bg.moveTo(tp.decoration[g][0].x, tp.decoration[g][0].y);
                for (let h = 1; h < tp.decoration[g].length; h++) {
                    ctx_bg.lineTo(tp.decoration[g][h].x, tp.decoration[g][h].y);
                }
                ctx_bg.stroke();
            }
            for (let g = 0; g < bt.decoration.length; g++) {
                //start teh shape
                ctx_bg.beginPath();
                ctx_bg.moveTo(bt.decoration[g][0].x, bt.decoration[g][0].y);
                for (let h = 1; h < bt.decoration[g].length; h++) {
                    ctx_bg.lineTo(bt.decoration[g][h].x, bt.decoration[g][h].y);
                }
                ctx_bg.stroke();
            }
            //decoration limits
            //top-top
            ctx_bg.beginPath();
            ctx_bg.moveTo(tp.ribbon[0].x, tp.decoration[0][7].y);
            ctx_bg.lineTo(tp.ribbon[1].x, tp.decoration[0][7].y);
            ctx_bg.stroke();
            //top-bot
            ctx_bg.beginPath();
            ctx_bg.moveTo(tp.ribbon[0].x, tp.decoration[0][0].y);
            ctx_bg.lineTo(tp.ribbon[1].x, tp.decoration[0][0].y);
            ctx_bg.stroke();
            //bot-top
            ctx_bg.beginPath();
            ctx_bg.moveTo(bt.ribbon[0].x, bt.decoration[0][7].y);
            ctx_bg.lineTo(bt.ribbon[1].x, bt.decoration[0][7].y);
            ctx_bg.stroke();
            //bot-bot
            ctx_bg.beginPath();
            ctx_bg.moveTo(bt.ribbon[0].x, bt.decoration[0][0].y);
            ctx_bg.lineTo(bt.ribbon[1].x, bt.decoration[0][0].y);
            ctx_bg.stroke();

            ctx_bg.strokeStyle=Minerva;
            ctx_bg.lineWidth=(collumns.top[1].y-collumns.top[0].y)/4
            //column bases
            for (let g = 0; g < collumns.top.length; g++) {
                if (collumns.bot[g].y > collumns.top[g].y) {
                    ctx_bg.beginPath();
                    ctx_bg.moveTo(collumns.top[g].xi,collumns.top[g].y);
                    ctx_bg.lineTo(collumns.top[g].xf,collumns.top[g].y);
                    ctx_bg.stroke();

                    ctx_bg.beginPath();
                    ctx_bg.moveTo(collumns.bot[g].xi,collumns.bot[g].y);
                    ctx_bg.lineTo(collumns.bot[g].xf,collumns.bot[g].y);
                    ctx_bg.stroke();
                }
            }
            //pillars (only if visible)
            if (collumns.bot_points[0].y > collumns.top_points[0].y) {
                for (let h = 0; h < collumns.top_points.length; h++) {
                    ctx_bg.beginPath();
                    ctx_bg.moveTo(collumns.top_points[h].x, collumns.top_points[h].y);
                    ctx_bg.lineTo(collumns.bot_points[h].x, collumns.bot_points[h].y);
                    ctx_bg.stroke();
                }
            }

            //calculate the alpha as a hex number
            (beta<17)?(beta="0"+beta.toString(16)):beta=beta.toString(16);
            ctx_bg.lineWidth=(collumns.top[1].y-collumns.top[0].y)/2
            //fade out the container bg
            ctx_bg.beginPath();
            ctx_bg.moveTo(container_coords[0].x, container_coords[0].y);
            ctx_bg.lineTo(container_coords[1].x, container_coords[1].y);
            ctx_bg.lineTo(container_coords[2].x, container_coords[2].y);
            ctx_bg.lineTo(container_coords[3].x, container_coords[3].y);
            ctx_bg.fillStyle=Pomona+beta; 
            ctx_bg.fill();
            //fade out decoration
            ctx_bg.beginPath();
            ctx_bg.moveTo(decoration_coords[0].x, decoration_coords[0].y);
            for (let index = 1; index < decoration_coords.length; index++) {
                ctx_bg.lineTo(decoration_coords[index].x, decoration_coords[index].y)
            }
            ctx_bg.strokeStyle=Diana+beta;
            ctx_bg.stroke();
            //fade out the content

            break;

        //keyframe 1
        //bring them back together
        case 1:
            //animation timing check
            if (animation_counter<max_frames) {
                //move the shapes and the buttons 
                //triangles
                for (let a = 0; a < tp.chevron.length; a++) {
                    //left riangle down
                    tp.chevron[a].y += step;
                    //right triangle up
                    bt.chevron[a].y -= step;
                }
                //ribbons
                for (let b = 0; b < tp.ribbon.length; b++) {
                    //top ribbon down
                    tp.ribbon[b].y += step;
                    //bottom ribbon up
                    bt.ribbon[b].y -= step;
                }
                //decorations
                for (let c = 0; c < tp.decoration.length; c++) {
                    //iterate through the points in the decoration elements
                    for (let d = 0; d < tp.decoration[c].length; d++) {
                        //move the top points down
                        tp.decoration[c][d].y += step;
                        //move the botom points up
                        bt.decoration[c][d].y -= step;
                    }                  
                }
                //nav 
                nav_bar.style.top = nav_bar.offsetTop+nav_step + "px";
                //move the column bases
                for (let d = 0; d < collumns.top.length; d++) {
                    //top goes downwards
                    collumns.top[d].y += step;
                    //bot goes upwards
                    collumns.bot[d].y -= step;
                }
                //move the column pillar lines
                for (let e = 0; e < collumns.top_points.length; e++) {
                    //top goes downwards
                    collumns.top_points[e].y += step;
                    //bot goes upwards
                    collumns.bot_points[e].y -= step;
                }

                //increment counter
                animation_counter++;
            } else {
                //set counters
                keyframe=2;
                max_frames=30;
                animation_counter=0;
                nav_bar.style.top = Math.floor((pseudo_background.offsetHeight-nav_bar.offsetHeight)/2) //shitty fix what the hell is even going on?//
            }
            //clear the canvas
            ctx_bg.clearRect(0,0,decoration_canvas_size.w,decoration_canvas_size.h);
            //draw left chevron
            ctx_bg.beginPath();
            ctx_bg.moveTo(chevrons.left[0].x, chevrons.left[0].y);
            for (let index = 1; index < chevrons.left.length; index++) {
                ctx_bg.lineTo(chevrons.left[index].x, chevrons.left[index].y)
            }
            ctx_bg.fillStyle=Mars;
            ctx_bg.fill();
            //draw right chevron
            ctx_bg.beginPath();
            ctx_bg.moveTo(chevrons.right[0].x, chevrons.right[0].y);
            for (let index = 1; index < chevrons.left.length; index++) {
                ctx_bg.lineTo(chevrons.right[index].x, chevrons.right[index].y)
            }
            ctx_bg.fillStyle=Mars;
            ctx_bg.fill();
            //top ribbon
            ctx_bg.beginPath();
            ctx_bg.moveTo(tp.ribbon[0].x, tp.ribbon[0].y);
            ctx_bg.lineTo(tp.ribbon[1].x, tp.ribbon[1].y);
            ctx_bg.lineTo(tp.ribbon[2].x, tp.ribbon[2].y);
            ctx_bg.lineTo(tp.ribbon[3].x, tp.ribbon[3].y);
            ctx_bg.closePath();
            ctx_bg.fillStyle=Mars;
            ctx_bg.fill();
            //bottom ribbon
            ctx_bg.beginPath();
            ctx_bg.moveTo(bt.ribbon[0].x, bt.ribbon[0].y);
            ctx_bg.lineTo(bt.ribbon[1].x, bt.ribbon[1].y);
            ctx_bg.lineTo(bt.ribbon[2].x, bt.ribbon[2].y);
            ctx_bg.lineTo(bt.ribbon[3].x, bt.ribbon[3].y);
            ctx_bg.closePath();
            ctx_bg.fillStyle=Mars; 
            ctx_bg.fill();
            //decorations
            ctx_bg.strokeStyle=Sol;
            ctx_bg.lineWidth=(collumns.top[1].y-collumns.top[0].y)/5
            //draw the lines
            for (let g = 0; g < tp.decoration.length; g++) {
                //start teh shape
                ctx_bg.beginPath();
                ctx_bg.moveTo(tp.decoration[g][0].x, tp.decoration[g][0].y);
                for (let h = 1; h < tp.decoration[g].length; h++) {
                    ctx_bg.lineTo(tp.decoration[g][h].x, tp.decoration[g][h].y);
                }
                ctx_bg.stroke();
            }
            for (let g = 0; g < bt.decoration.length; g++) {
                //start teh shape
                ctx_bg.beginPath();
                ctx_bg.moveTo(bt.decoration[g][0].x, bt.decoration[g][0].y);
                for (let h = 1; h < bt.decoration[g].length; h++) {
                    ctx_bg.lineTo(bt.decoration[g][h].x, bt.decoration[g][h].y);
                }
                ctx_bg.stroke();
            }
            //decoration limits
            //top-top
            ctx_bg.beginPath();
            ctx_bg.moveTo(tp.ribbon[0].x, tp.decoration[0][7].y);
            ctx_bg.lineTo(tp.ribbon[1].x, tp.decoration[0][7].y);
            ctx_bg.stroke();
            //top-bot
            ctx_bg.beginPath();
            ctx_bg.moveTo(tp.ribbon[0].x, tp.decoration[0][0].y);
            ctx_bg.lineTo(tp.ribbon[1].x, tp.decoration[0][0].y);
            ctx_bg.stroke();
            //bot-top
            ctx_bg.beginPath();
            ctx_bg.moveTo(bt.ribbon[0].x, bt.decoration[0][7].y);
            ctx_bg.lineTo(bt.ribbon[1].x, bt.decoration[0][7].y);
            ctx_bg.stroke();
            //bot-bot
            ctx_bg.beginPath();
            ctx_bg.moveTo(bt.ribbon[0].x, bt.decoration[0][0].y);
            ctx_bg.lineTo(bt.ribbon[1].x, bt.decoration[0][0].y);
            ctx_bg.stroke();

            ctx_bg.strokeStyle=Minerva;
            ctx_bg.lineWidth=(collumns.top[1].y-collumns.top[0].y)/4
            //column bases
            for (let g = 0; g < collumns.top.length; g++) {
                if (collumns.bot[g].y > collumns.top[g].y) {
                    ctx_bg.beginPath();
                    ctx_bg.moveTo(collumns.top[g].xi,collumns.top[g].y);
                    ctx_bg.lineTo(collumns.top[g].xf,collumns.top[g].y);
                    ctx_bg.stroke();

                    ctx_bg.beginPath();
                    ctx_bg.moveTo(collumns.bot[g].xi,collumns.bot[g].y);
                    ctx_bg.lineTo(collumns.bot[g].xf,collumns.bot[g].y);
                    ctx_bg.stroke();
                }
            }
            //pillars (only if visible)
            if (collumns.bot_points[0].y > collumns.top_points[0].y) {
                for (let h = 0; h < collumns.top_points.length; h++) {
                    ctx_bg.beginPath();
                    ctx_bg.moveTo(collumns.top_points[h].x, collumns.top_points[h].y);
                    ctx_bg.lineTo(collumns.bot_points[h].x, collumns.bot_points[h].y);
                    ctx_bg.stroke();
                }
            }

            break;

        //keyframe 2
        //fade everything out
        case 2:
            //calculate alpha value for the ribbon decoration
            let alpha = 255-Math.floor((animation_counter/max_frames)*255);
            alpha=(alpha<17)?"0"+alpha.toString(16):alpha.toString(16);
            //animation timing check
            if (animation_counter<max_frames) {
                //increment counter
                animation_counter++;
            } else {
                //final keyframe, reset all vars
                //set counters
                keyframe=0;
                max_frames=0;
                animation_counter=0;
                animation_on=false;
                animation=null;
            }
            //clear the canvas
            ctx_bg.clearRect(0,0,decoration_canvas_size.w,decoration_canvas_size.h);
            //draw left chevron
            ctx_bg.beginPath();
            ctx_bg.moveTo(chevrons.left[0].x, chevrons.left[0].y);
            for (let index = 1; index < chevrons.left.length; index++) {
                ctx_bg.lineTo(chevrons.left[index].x, chevrons.left[index].y)
            }
            ctx_bg.fillStyle=Mars+alpha;
            ctx_bg.fill();
            //draw right chevron
            ctx_bg.beginPath();
            ctx_bg.moveTo(chevrons.right[0].x, chevrons.right[0].y);
            for (let index = 1; index < chevrons.left.length; index++) {
                ctx_bg.lineTo(chevrons.right[index].x, chevrons.right[index].y)
            }
            ctx_bg.fillStyle=Mars+alpha;
            ctx_bg.fill();
            //top ribbon
            ctx_bg.beginPath();
            ctx_bg.moveTo(tp.ribbon[0].x, tp.ribbon[0].y);
            ctx_bg.lineTo(tp.ribbon[1].x, tp.ribbon[1].y);
            ctx_bg.lineTo(tp.ribbon[2].x, tp.ribbon[2].y);
            ctx_bg.lineTo(tp.ribbon[3].x, tp.ribbon[3].y);
            ctx_bg.closePath();
            ctx_bg.fillStyle=Mars+alpha;
            ctx_bg.fill();
            //bottom ribbon
            ctx_bg.beginPath();
            ctx_bg.moveTo(bt.ribbon[0].x, bt.ribbon[0].y);
            ctx_bg.lineTo(bt.ribbon[1].x, bt.ribbon[1].y);
            ctx_bg.lineTo(bt.ribbon[2].x, bt.ribbon[2].y);
            ctx_bg.lineTo(bt.ribbon[3].x, bt.ribbon[3].y);
            ctx_bg.closePath();
            ctx_bg.fillStyle=Mars+alpha; 
            ctx_bg.fill();
            //decorations
            ctx_bg.strokeStyle=Sol+alpha;
            ctx_bg.lineWidth=(collumns.top[1].y-collumns.top[0].y)/5
            //draw the lines
            for (let g = 0; g < tp.decoration.length; g++) {
                //start teh shape
                ctx_bg.beginPath();
                ctx_bg.moveTo(tp.decoration[g][0].x, tp.decoration[g][0].y);
                for (let h = 1; h < tp.decoration[g].length; h++) {
                    ctx_bg.lineTo(tp.decoration[g][h].x, tp.decoration[g][h].y);
                }
                ctx_bg.stroke();
            }
            for (let g = 0; g < bt.decoration.length; g++) {
                //start teh shape
                ctx_bg.beginPath();
                ctx_bg.moveTo(bt.decoration[g][0].x, bt.decoration[g][0].y);
                for (let h = 1; h < bt.decoration[g].length; h++) {
                    ctx_bg.lineTo(bt.decoration[g][h].x, bt.decoration[g][h].y);
                }
                ctx_bg.stroke();
            }
            //decoration limits
            //top-top
            ctx_bg.beginPath();
            ctx_bg.moveTo(tp.ribbon[0].x, tp.decoration[0][7].y);
            ctx_bg.lineTo(tp.ribbon[1].x, tp.decoration[0][7].y);
            ctx_bg.stroke();
            //top-bot
            ctx_bg.beginPath();
            ctx_bg.moveTo(tp.ribbon[0].x, tp.decoration[0][0].y);
            ctx_bg.lineTo(tp.ribbon[1].x, tp.decoration[0][0].y);
            ctx_bg.stroke();
            //bot-top
            ctx_bg.beginPath();
            ctx_bg.moveTo(bt.ribbon[0].x, bt.decoration[0][7].y);
            ctx_bg.lineTo(bt.ribbon[1].x, bt.decoration[0][7].y);
            ctx_bg.stroke();
            //bot-bot
            ctx_bg.beginPath();
            ctx_bg.moveTo(bt.ribbon[0].x, bt.decoration[0][0].y);
            ctx_bg.lineTo(bt.ribbon[1].x, bt.decoration[0][0].y);
            ctx_bg.stroke();

            break;

        default:
            break;
    }
}

function animation_main_container_opening() {
    switch (keyframe) {
        //keyframe 0
        //create a rhombus and enlarge it 
        case 0:
            //set up the first max frmae coutner
            max_frames=20;
            //animation timing check
            if (animation_counter<max_frames) {
                //get the canvas center point
                o = {
                    x:decoration_canvas_size.w/2,
                    y:decoration_canvas_size.h/2
                };
                //calculate a step value according to the size of the canvas
                step = decoration_canvas_size.h/600;
                // create the two chevrons
                chevrons = {
                    left: [
                        {
                            x:o.x-((animation_counter/2)*step),
                            y:o.y
                        },
                        {
                            x:o.x,
                            y:o.y+((animation_counter/2)*step)
                        },
                        {
                            x:o.x,
                            y:o.y+animation_counter*step
                        },
                        {
                            x:o.x-animation_counter*step,
                            y:o.y
                        },
                        {
                            x:o.x,
                            y:o.y-animation_counter*step
                        },
                        {
                            x:o.x,
                            y:o.y-((animation_counter/2)*step)
                        }
                    ],
                    right: [
                        {
                            x:o.x+((animation_counter/2)*step),
                            y:o.y
                        },
                        {
                            x:o.x,
                            y:o.y+((animation_counter/2)*step)
                        },
                        {
                            x:o.x,
                            y:o.y+animation_counter*step
                        },
                        {
                            x:o.x+animation_counter*step,
                            y:o.y
                        },
                        {
                            x:o.x,
                            y:o.y-animation_counter*step
                        },
                        {
                            x:o.x,
                            y:o.y-((animation_counter/2)*step)
                        }
                    ]
                }
                //increment animation counter
                animation_counter++;
            } else {
                //set the keyframe and max frames for the next animation
                keyframe = 1;
                max_frames = 25;
                //create the shape s for the next animation
                //ribbons
                ribbons = [
                    {
                        x:chevrons.right[3].x,
                        y:chevrons.left[5].y
                    },
                    {
                        x:chevrons.left[3].x,
                        y:chevrons.right[5].y
                    },
                    {
                        x:chevrons.left[3].x,
                        y:chevrons.right[1].y
                    },
                    {
                        x:chevrons.right[3].x,
                        y:chevrons.left[1].y
                    }
                ];
                //set the step for the next animation
                step = ((decoration_canvas_size.w/2)-(chevrons.right[3].x-chevrons.right[2].x))/(max_frames);
                //reset animation counter
                animation_counter=0;
            }
            //clear the canvas
            ctx_bg.clearRect(0,0,decoration_canvas_size.w,decoration_canvas_size.h);
            //draw left chevron
            ctx_bg.beginPath();
            ctx_bg.moveTo(chevrons.left[0].x, chevrons.left[0].y);
            for (let index = 1; index < chevrons.left.length; index++) {
                ctx_bg.lineTo(chevrons.left[index].x, chevrons.left[index].y)
            }
            ctx_bg.fillStyle=Mars;
            ctx_bg.fill();
            //draw right chevron
            ctx_bg.beginPath();
            ctx_bg.moveTo(chevrons.right[0].x, chevrons.right[0].y);
            for (let index = 1; index < chevrons.left.length; index++) {
                ctx_bg.lineTo(chevrons.right[index].x, chevrons.right[index].y)
            }
            ctx_bg.fillStyle=Mars;
            ctx_bg.fill();
            break;

        //keyframe 1
        //splits the rhombus in two and translates to the edges, leaving a ribbon in it's wake
        case 1:
            //animation timing check
            if (animation_counter<max_frames) {
                //move triangles to the sides
                for (let index = 0; index < chevrons.right.length; index++) {
                    chevrons.left[index].x -= step;
                    chevrons.right[index].x += step;
                }
                //enlarge the ribbons
                ribbons[0].x -= step;
                ribbons[1].x += step;
                ribbons[2].x += step;
                ribbons[3].x -= step;
                //increment counter
                animation_counter++;
            } else {
                //set the keyframe and max frames for the next animation
                keyframe = 2;
                max_frames=60;
                //reset animation counter
                animation_counter=0;
                //calculate decorations
                let cell_height =  ribbons[2].y-ribbons[1].y;                             //height of the decoration element
                let cell_width = 2*cell_height/3;                                         //width of the decoration element
                let decor_number = Math.floor((ribbons[1].x-ribbons[0].x)/cell_width);    //total number of decorations
                let padding = ((ribbons[1].x-ribbons[0].x)-(decor_number*cell_width))/2;  //the start/end padding for the decoration
                //decoration coords (calculate here only once)
                let y0=ribbons[0].y;
                let x1=cell_width/4;
                let x2=x1*2;
                let x3=x1*3;
                let x4=x2*2;
                let y1=cell_height/6;
                let y2=y1*2;
                let y3=y1*3;
                let y4=y2*2;
                let y5=y1*5;
                let top_dec = [];
                let bot_dec = [];
                for (let index = 0; index < decor_number; index++) {
                    let current_dec_width = ribbons[0].x+(index*cell_width)+padding;
                    let temp_dec=[
                        {
                            x:current_dec_width+x1,
                            y:y0+y5
                        },
                        {
                            x:current_dec_width+x1,
                            y:y0+y2
                        },
                        {
                            x:current_dec_width+x3,
                            y:y0+y2
                        },
                        {
                            x:current_dec_width+x3,
                            y:y0+y3
                        },
                        {
                            x:current_dec_width+x2,
                            y:y0+y3
                        },
                        {
                            x:current_dec_width+x2,
                            y:y0+y4
                        },
                        {
                            x:current_dec_width+x4,
                            y:y0+y4
                        },
                        {
                            x:current_dec_width+x4,
                            y:y0+y1
                        }
                    ];
                    let temp_dec_b=[
                        {
                            x:current_dec_width+x1,
                            y:y0+y5
                        },
                        {
                            x:current_dec_width+x1,
                            y:y0+y2
                        },
                        {
                            x:current_dec_width+x3,
                            y:y0+y2
                        },
                        {
                            x:current_dec_width+x3,
                            y:y0+y3
                        },
                        {
                            x:current_dec_width+x2,
                            y:y0+y3
                        },
                        {
                            x:current_dec_width+x2,
                            y:y0+y4
                        },
                        {
                            x:current_dec_width+x4,
                            y:y0+y4
                        },
                        {
                            x:current_dec_width+x4,
                            y:y0+y1
                        }
                    ];
                    top_dec.push(temp_dec);
                    bot_dec.push(temp_dec_b);
                }
                //ribbons since aparently there are some issues with just the ribbons array?
                let top_r = [];
                let bot_r = [];
                ribbons.forEach(el => {
                    top_r.push(structuredClone(el));
                    bot_r.push(structuredClone(el));
                })
                //store the shapes for the next animation
                tp = {
                    chevron: chevrons.left,
                    ribbon: top_r,
                    decoration: top_dec
                }
                bt = {
                    chevron: chevrons.right,
                    ribbon: bot_r,
                    decoration: bot_dec
                }
                //helper vars
                let interline_i = decoration_canvas_size.w/36 + decoration_canvas_size.w/50; 
                let interline_f = decoration_canvas_size.w/36 + decoration_canvas_size.w/12 - decoration_canvas_size.w/50;
                let interline_w = (interline_f-interline_i)/5; 
                //create the column shapes
                collumns = {
                    top:[
                        //left
                        {
                            xi:decoration_canvas_size.w/36,
                            xf:decoration_canvas_size.w/36 + decoration_canvas_size.w/12,
                            y:tp.chevron[2].y// + decoration_canvas_size.h/100
                        },
                        {
                            xi:decoration_canvas_size.w/36,
                            xf:decoration_canvas_size.w/36 + decoration_canvas_size.w/12,
                            y:tp.chevron[2].y + (decoration_canvas_size.h/100)
                        },
                        {
                            xi:decoration_canvas_size.w/36 + decoration_canvas_size.w/100,
                            xf:decoration_canvas_size.w/36 + decoration_canvas_size.w/12 - decoration_canvas_size.w/100,
                            y:tp.chevron[2].y + (decoration_canvas_size.h/100)*2
                        },
                        {
                            xi:decoration_canvas_size.w/36 + (decoration_canvas_size.w/200),
                            xf:decoration_canvas_size.w/36 + decoration_canvas_size.w/12 - (decoration_canvas_size.w/200),
                            y:tp.chevron[2].y + (decoration_canvas_size.h/100)*3
                        },
                        //right
                        {
                            xi:decoration_canvas_size.w - decoration_canvas_size.w/36,
                            xf:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/12,
                            y:tp.chevron[2].y// + decoration_canvas_size.h/100
                        },
                        {
                            xi:decoration_canvas_size.w - decoration_canvas_size.w/36,
                            xf:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/12,
                            y:tp.chevron[2].y + (decoration_canvas_size.h/100)
                        },
                        {
                            xi:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/100,
                            xf:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/12 + decoration_canvas_size.w/100,
                            y:tp.chevron[2].y + (decoration_canvas_size.h/100)*2
                        },
                        {
                            xi:decoration_canvas_size.w - decoration_canvas_size.w/36 - (decoration_canvas_size.w/200),
                            xf:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/12 + (decoration_canvas_size.w/200),
                            y:tp.chevron[2].y + (decoration_canvas_size.h/100)*3
                        }
                    ],
                    bot:[
                        //left
                        {
                            xi:decoration_canvas_size.w/36 + (decoration_canvas_size.w/200),
                            xf:decoration_canvas_size.w/36 + decoration_canvas_size.w/12 - (decoration_canvas_size.w/200),
                            y:bt.chevron[4].y - (decoration_canvas_size.h/100)*3
                        },
                        {
                            xi:decoration_canvas_size.w/36 + decoration_canvas_size.w/100,
                            xf:decoration_canvas_size.w/36 + decoration_canvas_size.w/12 - decoration_canvas_size.w/100,
                            y:bt.chevron[4].y - (decoration_canvas_size.h/100)*2
                        },
                        {
                            xi:decoration_canvas_size.w/36,
                            xf:decoration_canvas_size.w/36 + decoration_canvas_size.w/12,
                            y:bt.chevron[4].y - (decoration_canvas_size.h/100)
                        },
                        {
                            xi:decoration_canvas_size.w/36,
                            xf:decoration_canvas_size.w/36 + decoration_canvas_size.w/12,
                            y:bt.chevron[4].y// - (decoration_canvas_size.h/100)
                        },
                        //right
                        {
                            xi:decoration_canvas_size.w - decoration_canvas_size.w/36 - (decoration_canvas_size.w/200),
                            xf:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/12 + (decoration_canvas_size.w/200),
                            y:bt.chevron[4].y - (decoration_canvas_size.h/100)*3
                        },
                        {
                            xi:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/100,
                            xf:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/12 + decoration_canvas_size.w/100,
                            y:bt.chevron[4].y - (decoration_canvas_size.h/100)*2
                        },
                        {
                            xi:decoration_canvas_size.w - decoration_canvas_size.w/36,
                            xf:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/12,
                            y:bt.chevron[4].y - (decoration_canvas_size.h/100)
                        },
                        {
                            xi:decoration_canvas_size.w - decoration_canvas_size.w/36,
                            xf:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/12,
                            y:bt.chevron[4].y// - (decoration_canvas_size.h/100)
                        }
                        
                    ],
                    top_points:[
                        //left points
                        {
                            x:interline_i,
                            y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:interline_i+interline_w,
                            y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:interline_i+interline_w*2,
                            y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:interline_i+interline_w*3,
                            y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:interline_i+interline_w*4,
                            y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:interline_i+interline_w*5,
                            y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
                        },
                        //right points
                        {
                            x:decoration_canvas_size.w - interline_i,
                            y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:decoration_canvas_size.w - interline_i-interline_w,
                            y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:decoration_canvas_size.w - interline_i-interline_w*2,
                            y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:decoration_canvas_size.w - interline_i-interline_w*3,
                            y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:decoration_canvas_size.w - interline_i-interline_w*4,
                            y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:decoration_canvas_size.w - interline_i-interline_w*5,
                            y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
                        }
                    ],
                    bot_points:[
                        //left points
                        {
                            x:interline_i,
                            y:bt.chevron[4].y - (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:interline_i+interline_w,
                            y:bt.chevron[4].y - (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:interline_i+interline_w*2,
                            y:bt.chevron[4].y - (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:interline_i+interline_w*3,
                            y:bt.chevron[4].y - (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:interline_i+interline_w*4,
                            y:bt.chevron[4].y - (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:interline_i+interline_w*5,
                            y:bt.chevron[4].y - (decoration_canvas_size.h/100)*4
                        },
                        //right points
                        {
                            x:decoration_canvas_size.w - interline_i,
                            y:bt.chevron[4].y - (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:decoration_canvas_size.w - interline_i-interline_w,
                            y:bt.chevron[4].y - (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:decoration_canvas_size.w - interline_i-interline_w*2,
                            y:bt.chevron[4].y - (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:decoration_canvas_size.w - interline_i-interline_w*3,
                            y:bt.chevron[4].y - (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:decoration_canvas_size.w - interline_i-interline_w*4,
                            y:bt.chevron[4].y - (decoration_canvas_size.h/100)*4
                        },
                        {
                            x:decoration_canvas_size.w - interline_i-interline_w*5,
                            y:bt.chevron[4].y - (decoration_canvas_size.h/100)*4
                        }
                    ]
                }
                //calculate the step  on the Y axis
                step = (((decoration_canvas_size.h/2)-(tp.chevron[2].y-tp.chevron[4].y)/2))/max_frames;
                nav_step = (Math.floor((pseudo_background.offsetHeight-nav_bar.offsetHeight)/2)-Math.floor((pseudo_background.style.height.replace('px','')/5-nav_bar.offsetHeight)/2))/max_frames;
            }
            //clear the canvas
            ctx_bg.clearRect(0,0,decoration_canvas_size.w,decoration_canvas_size.h);
            //draw left chevron
            ctx_bg.beginPath();
            ctx_bg.moveTo(chevrons.left[0].x, chevrons.left[0].y);
            for (let index = 1; index < chevrons.left.length; index++) {
                ctx_bg.lineTo(chevrons.left[index].x, chevrons.left[index].y)
            }
            ctx_bg.fillStyle=Mars;
            ctx_bg.fill();
            //draw right chevron
            ctx_bg.beginPath();
            ctx_bg.moveTo(chevrons.right[0].x, chevrons.right[0].y);
            for (let index = 1; index < chevrons.left.length; index++) {
                ctx_bg.lineTo(chevrons.right[index].x, chevrons.right[index].y)
            }
            ctx_bg.fillStyle=Mars; 
            ctx_bg.fill();
            //draw the ribbons
            if (ribbons[1].x-ribbons[0].x>0) { //only draw ribbons once there is a positive distance between their horizontal extremes
                ctx_bg.beginPath();
                ctx_bg.moveTo(ribbons[0].x, ribbons[0].y);
                ctx_bg.lineTo(ribbons[1].x, ribbons[1].y);
                ctx_bg.lineTo(ribbons[2].x, ribbons[2].y);
                ctx_bg.lineTo(ribbons[3].x, ribbons[3].y);
                ctx_bg.closePath();
                ctx_bg.fillStyle=Mars;
                ctx_bg.fill();
            }
            break;

        //keyframe 2
        //double the ribbon shape and move it upwards
        case 2:
            //double the ribbon
            //start moving one to the top and the other to the bottom
            //left triangle goes tot he top and the right goes to bottom
            //at the same time, move the buttons up
            //calculate the deoration alpha as a hex number
            let alpha = Math.floor((animation_counter/max_frames)*255);//.toString(16);
            alpha=(alpha<17)?"0"+alpha.toString(16):alpha.toString(16);
            //animation timing check
            if (animation_counter<max_frames) {
                //move the shapes and the buttons 
                //triangles
                for (let a = 0; a < tp.chevron.length; a++) {
                    //left riangle up
                    tp.chevron[a].y -= step;
                    //right triangle down
                    bt.chevron[a].y += step;
                }
                //ribbons
                for (let b = 0; b < tp.ribbon.length; b++) {
                    //top ribbon up
                    tp.ribbon[b].y -= step;
                    //bottom ribbon down
                    bt.ribbon[b].y += step;
                }
                //decorations
                for (let c = 0; c < tp.decoration.length; c++) {
                    //iterate through the points in the decoration elements
                    for (let d = 0; d < tp.decoration[c].length; d++) {
                        //move the top points up
                        tp.decoration[c][d].y -= step;
                        //move the botom points down
                        bt.decoration[c][d].y += step;
                    }                  
                }
                //nav buttons
                //move the nav buttons by the step? or more?
                nav_bar.style.top = (nav_bar.offsetTop-nav_step) + "px";
                //move the column bases
                for (let d = 0; d < collumns.top.length; d++) {
                    //top goes upwards
                    collumns.top[d].y -= step;
                    //bot goes downwards
                    collumns.bot[d].y += step;
                }
                //move the column pillar lines
                for (let e = 0; e < collumns.top_points.length; e++) {
                    //top goes upwards
                    collumns.top_points[e].y -= step;
                    //bot goes downwards
                    collumns.bot_points[e].y += step;
                }

                //increment counter
                animation_counter++;
            } else {
                //size and possition of the container
                //padding is the ribbon width from the inside of the ribbons, and left/right from the most extreme point in the column
                let padding_size = tp.ribbon[3].y - tp.ribbon[0].y;
                container_coords=[
                    {
                        x:collumns.top[0].xf + padding_size,
                        y:tp.ribbon[3].y + padding_size
                    },
                    {
                        x:collumns.top[4].xf - padding_size,
                        y:tp.ribbon[3].y + padding_size
                    },
                    {
                        x:collumns.top[4].xf - padding_size,
                        y:bt.ribbon[0].y - padding_size
                    },
                    {
                        x:collumns.top[0].xf + padding_size,
                        y:bt.ribbon[0].y - padding_size
                    }
                ];
                //create the decoration for the container
                decoration_coords=[
                    {
                        x:container_coords[0].x + padding_size/2,
                        y:container_coords[0].y + padding_size/2
                    },
                    {
                        x:container_coords[0].x + padding_size,
                        y:container_coords[0].y + padding_size/2
                    },
                    {
                        x:container_coords[3].x + padding_size,
                        y:container_coords[3].y - padding_size/2
                    },
                    {
                        x:container_coords[3].x + padding_size/2,
                        y:container_coords[3].y - padding_size/2
                    },
                    {
                        x:container_coords[3].x + padding_size/2,
                        y:container_coords[3].y - padding_size
                    },
                    {
                        x:container_coords[2].x - padding_size/2,
                        y:container_coords[2].y - padding_size
                    },
                    {
                        x:container_coords[2].x - padding_size/2,
                        y:container_coords[2].y - padding_size/2
                    },
                    {
                        x:container_coords[2].x - padding_size,
                        y:container_coords[2].y - padding_size/2
                    },
                    {
                        x:container_coords[1].x - padding_size,
                        y:container_coords[1].y + padding_size/2
                    },
                    {
                        x:container_coords[1].x - padding_size/2,
                        y:container_coords[1].y + padding_size/2
                    },
                    {
                        x:container_coords[1].x - padding_size/2,
                        y:container_coords[1].y + padding_size
                    },
                    {
                        x:container_coords[0].x + padding_size/2,
                        y:container_coords[0].y + padding_size
                    },
                    {
                        x:container_coords[0].x + padding_size/2,
                        y:container_coords[0].y + padding_size/2
                    }
                ];
                //size and possition the content box
                div_content_box.style.position = "absolute";
                div_content_box.style.top = main_decoration_canvas.offsetTop+container_coords[0].y+2*padding_size + "px";
                div_content_box.style.left = main_decoration_canvas.offsetLeft+container_coords[0].x+2*padding_size + "px";
                div_content_box.style.height = container_coords[2].y-container_coords[0].y-4*padding_size + "px";
                div_content_box.style.width = container_coords[2].x-container_coords[0].x-4*padding_size + "px";

                //reset the animation counter and set the keyframe
                animation_counter=0;
                max_frames=40;
                keyframe=3;
            }
            //clear the canvas
            ctx_bg.clearRect(0,0,decoration_canvas_size.w,decoration_canvas_size.h);
            //draw left chevron
            ctx_bg.beginPath();
            ctx_bg.moveTo(chevrons.left[0].x, chevrons.left[0].y);
            for (let index = 1; index < chevrons.left.length; index++) {
                ctx_bg.lineTo(chevrons.left[index].x, chevrons.left[index].y)
            }
            ctx_bg.fillStyle=Mars;
            ctx_bg.fill();
            //draw right chevron
            ctx_bg.beginPath();
            ctx_bg.moveTo(chevrons.right[0].x, chevrons.right[0].y);
            for (let index = 1; index < chevrons.left.length; index++) {
                ctx_bg.lineTo(chevrons.right[index].x, chevrons.right[index].y)
            }
            ctx_bg.fillStyle=Mars;
            ctx_bg.fill();
            //top ribbon
            ctx_bg.beginPath();
            ctx_bg.moveTo(tp.ribbon[0].x, tp.ribbon[0].y);
            ctx_bg.lineTo(tp.ribbon[1].x, tp.ribbon[1].y);
            ctx_bg.lineTo(tp.ribbon[2].x, tp.ribbon[2].y);
            ctx_bg.lineTo(tp.ribbon[3].x, tp.ribbon[3].y);
            ctx_bg.closePath();
            ctx_bg.fillStyle=Mars;
            ctx_bg.fill();
            //bottom ribbon
            ctx_bg.beginPath();
            ctx_bg.moveTo(bt.ribbon[0].x, bt.ribbon[0].y);
            ctx_bg.lineTo(bt.ribbon[1].x, bt.ribbon[1].y);
            ctx_bg.lineTo(bt.ribbon[2].x, bt.ribbon[2].y);
            ctx_bg.lineTo(bt.ribbon[3].x, bt.ribbon[3].y);
            ctx_bg.closePath();
            ctx_bg.fillStyle=Mars; 
            ctx_bg.fill();
            //decorations
            ctx_bg.strokeStyle=Sol+alpha;
            ctx_bg.lineWidth=(collumns.top[1].y-collumns.top[0].y)/5
            //draw the lines
            for (let g = 0; g < tp.decoration.length; g++) {
                //start teh shape
                ctx_bg.beginPath();
                ctx_bg.moveTo(tp.decoration[g][0].x, tp.decoration[g][0].y);
                for (let h = 1; h < tp.decoration[g].length; h++) {
                    ctx_bg.lineTo(tp.decoration[g][h].x, tp.decoration[g][h].y);
                }
                ctx_bg.stroke();
            }
            for (let g = 0; g < bt.decoration.length; g++) {
                //start teh shape
                ctx_bg.beginPath();
                ctx_bg.moveTo(bt.decoration[g][0].x, bt.decoration[g][0].y);
                for (let h = 1; h < bt.decoration[g].length; h++) {
                    ctx_bg.lineTo(bt.decoration[g][h].x, bt.decoration[g][h].y);
                }
                ctx_bg.stroke();
            }
            //decoration limits
            //top-top
            ctx_bg.beginPath();
            ctx_bg.moveTo(tp.ribbon[0].x, tp.decoration[0][7].y);
            ctx_bg.lineTo(tp.ribbon[1].x, tp.decoration[0][7].y);
            ctx_bg.stroke();
            //top-bot
            ctx_bg.beginPath();
            ctx_bg.moveTo(tp.ribbon[0].x, tp.decoration[0][0].y);
            ctx_bg.lineTo(tp.ribbon[1].x, tp.decoration[0][0].y);
            ctx_bg.stroke();
            //bot-top
            ctx_bg.beginPath();
            ctx_bg.moveTo(bt.ribbon[0].x, bt.decoration[0][7].y);
            ctx_bg.lineTo(bt.ribbon[1].x, bt.decoration[0][7].y);
            ctx_bg.stroke();
            //bot-bot
            ctx_bg.beginPath();
            ctx_bg.moveTo(bt.ribbon[0].x, bt.decoration[0][0].y);
            ctx_bg.lineTo(bt.ribbon[1].x, bt.decoration[0][0].y);
            ctx_bg.stroke();

            ctx_bg.strokeStyle=Minerva;
            ctx_bg.lineWidth=(collumns.top[1].y-collumns.top[0].y)/4
            //column bases
            for (let g = 0; g < collumns.top.length; g++) {
                if (collumns.bot[g].y > collumns.top[g].y) {
                    ctx_bg.beginPath();
                    ctx_bg.moveTo(collumns.top[g].xi,collumns.top[g].y);
                    ctx_bg.lineTo(collumns.top[g].xf,collumns.top[g].y);
                    ctx_bg.stroke();

                    ctx_bg.beginPath();
                    ctx_bg.moveTo(collumns.bot[g].xi,collumns.bot[g].y);
                    ctx_bg.lineTo(collumns.bot[g].xf,collumns.bot[g].y);
                    ctx_bg.stroke();
                }
            }
            //pillars (only if visible)
            if (collumns.bot_points[0].y > collumns.top_points[0].y) {
                for (let h = 0; h < collumns.top_points.length; h++) {
                    ctx_bg.beginPath();
                    ctx_bg.moveTo(collumns.top_points[h].x, collumns.top_points[h].y);
                    ctx_bg.lineTo(collumns.bot_points[h].x, collumns.bot_points[h].y);
                    ctx_bg.stroke();
                }
            }

            break;

        //keyframe 3
        //fade in the content and it's container
        case 3:
            if (animation_counter<max_frames) {
                //increment animation counter
                animation_counter++;
            } else {
                //final keyframe
                animation_on=false;
                keyframe=0;
                animation_counter=0;
                max_frames=0;
                animation=null;
                //call for the fade in of the content
                fade_in_container_content();
            }

            //calculate the deoration alpha as a hex number
            let beta = Math.floor((animation_counter/max_frames)*255);//.toString(16);  //why is alpha undeclarable here?
            (beta<17)?(beta="0"+beta.toString(16)):beta=beta.toString(16);
            ctx_bg.lineWidth=(collumns.top[1].y-collumns.top[0].y)/2
            //fade in the container bg
            ctx_bg.beginPath();
            ctx_bg.moveTo(container_coords[0].x, container_coords[0].y);
            ctx_bg.lineTo(container_coords[1].x, container_coords[1].y);
            ctx_bg.lineTo(container_coords[2].x, container_coords[2].y);
            ctx_bg.lineTo(container_coords[3].x, container_coords[3].y);
            ctx_bg.fillStyle=Pomona+beta;
            ctx_bg.fill();
            //fade in decoration
            ctx_bg.beginPath();
            ctx_bg.moveTo(decoration_coords[0].x, decoration_coords[0].y);
            for (let index = 1; index < decoration_coords.length; index++) {
                ctx_bg.lineTo(decoration_coords[index].x, decoration_coords[index].y)
            }
            ctx_bg.strokeStyle=Diana+beta;
            ctx_bg.stroke();
            //fade in the content

            break;

        //keyframe 4
        //set all canvas elements where they should be at the end, store them in memory, exit the animation function
        case 4:
            //set all canvas vars as the "show main container open" vars
            //set the ending for the animation
            animation_on=false;
            keyframe = 0;
            break;

        default:
            break;
    }
}

function draw_decoration_canvas_opened(){
    //calculate the size and position of canvas elements (maybe do a different function and make use of it in animating as well, helping with the calculation speed?)
    //chevron coords
    chevrons = {
        left: [
            {
                x:decoration_canvas_size.h/60,
                y:decoration_canvas_size.h/30
            },
            {
                x:decoration_canvas_size.h/30,
                y:decoration_canvas_size.h/20
            },
            {
                x:decoration_canvas_size.h/30,
                y:decoration_canvas_size.h/15
            },
            {
                x:0,
                y:decoration_canvas_size.h/30
            },
            {
                x:decoration_canvas_size.h/30,
                y:0
            },
            {
                x:decoration_canvas_size.h/30,
                y:decoration_canvas_size.h/60
            }
        ],
        right: [
            {
                x:decoration_canvas_size.w-decoration_canvas_size.h/60,
                y:decoration_canvas_size.h-decoration_canvas_size.h/30
            },
            {
                x:decoration_canvas_size.w-decoration_canvas_size.h/30,
                y:decoration_canvas_size.h-decoration_canvas_size.h/20
            },
            {
                x:decoration_canvas_size.w-decoration_canvas_size.h/30,
                y:decoration_canvas_size.h-decoration_canvas_size.h/15
            },
            {
                x:decoration_canvas_size.w,
                y:decoration_canvas_size.h-decoration_canvas_size.h/30
            },
            {
                x:decoration_canvas_size.w-decoration_canvas_size.h/30,
                y:decoration_canvas_size.h
            },
            {
                x:decoration_canvas_size.w-decoration_canvas_size.h/30,
                y:decoration_canvas_size.h-decoration_canvas_size.h/60
            }
        ]
    }
    //ribbon coords
    let top_ribbon = [
        {
            x:chevrons.left[3].x+decoration_canvas_size.h/15,
            y:chevrons.left[5].y
        },
        {
            x:chevrons.right[3].x-decoration_canvas_size.h/15,
            y:chevrons.left[5].y
        },
        {
            x:chevrons.right[3].x-decoration_canvas_size.h/15,
            y:chevrons.left[1].y
        },
        {
            x:chevrons.left[3].x+decoration_canvas_size.h/15,
            y:chevrons.left[1].y
        }
    ];
    let bot_ribbon = [
        {
            x:chevrons.left[3].x+decoration_canvas_size.h/15,
            y:chevrons.right[1].y
        },
        {
            x:chevrons.right[3].x-decoration_canvas_size.h/15,
            y:chevrons.right[1].y
        },
        {
            x:chevrons.right[3].x-decoration_canvas_size.h/15,
            y:chevrons.right[5].y
        },
        {
            x:chevrons.left[3].x+decoration_canvas_size.h/15,
            y:chevrons.right[5].y
        }
    ];
    //calculate decorations
    let cell_height =  top_ribbon[2].y-top_ribbon[1].y;                             //height of the decoration element
    let cell_width = 2*cell_height/3;                                         //width of the decoration element
    let decor_number = Math.floor((top_ribbon[1].x-top_ribbon[0].x)/cell_width);    //total number of decorations
    let padding = ((top_ribbon[1].x-top_ribbon[0].x)-(decor_number*cell_width))/2;  //the start/end padding for the decoration
    //decoration coords (calculate here only once)
    let y0_top=top_ribbon[0].y;
    let y0_bot=bot_ribbon[0].y;
    let x1=cell_width/4;
    let x2=x1*2;
    let x3=x1*3;
    let x4=x2*2;
    let y1=cell_height/6;
    let y2=y1*2;
    let y3=y1*3;
    let y4=y2*2;
    let y5=y1*5;
    let top_dec = [];
    let bot_dec = [];
    for (let index = 0; index < decor_number; index++) {
        let current_dec_width = top_ribbon[0].x+(index*cell_width)+padding;
        let temp_dec=[
            {
                x:current_dec_width+x1,
                y:y0_top+y5
            },
            {
                x:current_dec_width+x1,
                y:y0_top+y2
            },
            {
                x:current_dec_width+x3,
                y:y0_top+y2
            },
            {
                x:current_dec_width+x3,
                y:y0_top+y3
            },
            {
                x:current_dec_width+x2,
                y:y0_top+y3
            },
            {
                x:current_dec_width+x2,
                y:y0_top+y4
            },
            {
                x:current_dec_width+x4,
                y:y0_top+y4
            },
            {
                x:current_dec_width+x4,
                y:y0_top+y1
            }
        ];
        let temp_dec_b=[
            {
                x:current_dec_width+x1,
                y:y0_bot+y5
            },
            {
                x:current_dec_width+x1,
                y:y0_bot+y2
            },
            {
                x:current_dec_width+x3,
                y:y0_bot+y2
            },
            {
                x:current_dec_width+x3,
                y:y0_bot+y3
            },
            {
                x:current_dec_width+x2,
                y:y0_bot+y3
            },
            {
                x:current_dec_width+x2,
                y:y0_bot+y4
            },
            {
                x:current_dec_width+x4,
                y:y0_bot+y4
            },
            {
                x:current_dec_width+x4,
                y:y0_bot+y1
            }
        ];
        top_dec.push(temp_dec);
        bot_dec.push(temp_dec_b);
    }
    //store the shapes for the next animation
    tp = {
        chevron: chevrons.left,
        ribbon: top_ribbon,
        decoration: top_dec
    }
    bt = {
        chevron: chevrons.right,
        ribbon: bot_ribbon,
        decoration: bot_dec
    }
    //helper vars
    let interline_i = decoration_canvas_size.w/36 + decoration_canvas_size.w/50; 
    let interline_f = decoration_canvas_size.w/36 + decoration_canvas_size.w/12 - decoration_canvas_size.w/50;
    let interline_w = (interline_f-interline_i)/5; 
    //create the column shapes
    collumns = {
        top:[
            //left
            {
                xi:decoration_canvas_size.w/36,
                xf:decoration_canvas_size.w/36 + decoration_canvas_size.w/12,
                y:tp.chevron[2].y// + decoration_canvas_size.h/100
            },
            {
                xi:decoration_canvas_size.w/36,
                xf:decoration_canvas_size.w/36 + decoration_canvas_size.w/12,
                y:tp.chevron[2].y + (decoration_canvas_size.h/100)
            },
            {
                xi:decoration_canvas_size.w/36 + decoration_canvas_size.w/100,
                xf:decoration_canvas_size.w/36 + decoration_canvas_size.w/12 - decoration_canvas_size.w/100,
                y:tp.chevron[2].y + (decoration_canvas_size.h/100)*2
            },
            {
                xi:decoration_canvas_size.w/36 + (decoration_canvas_size.w/200),
                xf:decoration_canvas_size.w/36 + decoration_canvas_size.w/12 - (decoration_canvas_size.w/200),
                y:tp.chevron[2].y + (decoration_canvas_size.h/100)*3
            },
            //right
            {
                xi:decoration_canvas_size.w - decoration_canvas_size.w/36,
                xf:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/12,
                y:tp.chevron[2].y// + decoration_canvas_size.h/100
            },
            {
                xi:decoration_canvas_size.w - decoration_canvas_size.w/36,
                xf:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/12,
                y:tp.chevron[2].y + (decoration_canvas_size.h/100)
            },
            {
                xi:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/100,
                xf:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/12 + decoration_canvas_size.w/100,
                y:tp.chevron[2].y + (decoration_canvas_size.h/100)*2
            },
            {
                xi:decoration_canvas_size.w - decoration_canvas_size.w/36 - (decoration_canvas_size.w/200),
                xf:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/12 + (decoration_canvas_size.w/200),
                y:tp.chevron[2].y + (decoration_canvas_size.h/100)*3
            }
        ],
        bot:[
            //left
            {
                xi:decoration_canvas_size.w/36 + (decoration_canvas_size.w/200),
                xf:decoration_canvas_size.w/36 + decoration_canvas_size.w/12 - (decoration_canvas_size.w/200),
                y:bt.chevron[2].y - (decoration_canvas_size.h/100)*3
            },
            {
                xi:decoration_canvas_size.w/36 + decoration_canvas_size.w/100,
                xf:decoration_canvas_size.w/36 + decoration_canvas_size.w/12 - decoration_canvas_size.w/100,
                y:bt.chevron[2].y - (decoration_canvas_size.h/100)*2
            },
            {
                xi:decoration_canvas_size.w/36,
                xf:decoration_canvas_size.w/36 + decoration_canvas_size.w/12,
                y:bt.chevron[2].y - (decoration_canvas_size.h/100)
            },
            {
                xi:decoration_canvas_size.w/36,
                xf:decoration_canvas_size.w/36 + decoration_canvas_size.w/12,
                y:bt.chevron[2].y// - (decoration_canvas_size.h/100)
            },
            //right
            {
                xi:decoration_canvas_size.w - decoration_canvas_size.w/36 - (decoration_canvas_size.w/200),
                xf:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/12 + (decoration_canvas_size.w/200),
                y:bt.chevron[2].y - (decoration_canvas_size.h/100)*3
            },
            {
                xi:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/100,
                xf:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/12 + decoration_canvas_size.w/100,
                y:bt.chevron[2].y - (decoration_canvas_size.h/100)*2
            },
            {
                xi:decoration_canvas_size.w - decoration_canvas_size.w/36,
                xf:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/12,
                y:bt.chevron[2].y - (decoration_canvas_size.h/100)
            },
            {
                xi:decoration_canvas_size.w - decoration_canvas_size.w/36,
                xf:decoration_canvas_size.w - decoration_canvas_size.w/36 - decoration_canvas_size.w/12,
                y:bt.chevron[2].y// - (decoration_canvas_size.h/100)
            }                            
        ],
        top_points:[
            //left points
            {
                x:interline_i,
                y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
            },
            {
                x:interline_i+interline_w,
                y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
            },
            {
                x:interline_i+interline_w*2,
                y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
            },
            {
                x:interline_i+interline_w*3,
                y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
            },
            {
                x:interline_i+interline_w*4,
                y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
            },
            {
                x:interline_i+interline_w*5,
                y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
            },
            //right points
            {
                x:decoration_canvas_size.w - interline_i,
                y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
            },
            {
                x:decoration_canvas_size.w - interline_i-interline_w,
                y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
            },
            {
                x:decoration_canvas_size.w - interline_i-interline_w*2,
                y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
            },
            {
                x:decoration_canvas_size.w - interline_i-interline_w*3,
                y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
            },
            {
                x:decoration_canvas_size.w - interline_i-interline_w*4,
                y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
            },
            {
                x:decoration_canvas_size.w - interline_i-interline_w*5,
                y:tp.chevron[2].y + (decoration_canvas_size.h/100)*4
            }
        ],
        bot_points:[
            //left points
            {
                x:interline_i,
                y:bt.chevron[2].y - (decoration_canvas_size.h/100)*4
            },
            {
                x:interline_i+interline_w,
                y:bt.chevron[2].y - (decoration_canvas_size.h/100)*4
            },
            {
                x:interline_i+interline_w*2,
                y:bt.chevron[2].y - (decoration_canvas_size.h/100)*4
            },
            {
                x:interline_i+interline_w*3,
                y:bt.chevron[2].y - (decoration_canvas_size.h/100)*4
            },
            {
                x:interline_i+interline_w*4,
                y:bt.chevron[2].y - (decoration_canvas_size.h/100)*4
            },
            {
                x:interline_i+interline_w*5,
                y:bt.chevron[2].y - (decoration_canvas_size.h/100)*4
            },
            //right points
            {
                x:decoration_canvas_size.w - interline_i,
                y:bt.chevron[2].y - (decoration_canvas_size.h/100)*4
            },
            {
                x:decoration_canvas_size.w - interline_i-interline_w,
                y:bt.chevron[2].y - (decoration_canvas_size.h/100)*4
            },
            {
                x:decoration_canvas_size.w - interline_i-interline_w*2,
                y:bt.chevron[2].y - (decoration_canvas_size.h/100)*4
            },
            {
                x:decoration_canvas_size.w - interline_i-interline_w*3,
                y:bt.chevron[2].y - (decoration_canvas_size.h/100)*4
            },
            {
                x:decoration_canvas_size.w - interline_i-interline_w*4,
                y:bt.chevron[2].y - (decoration_canvas_size.h/100)*4
            },
            {
                x:decoration_canvas_size.w - interline_i-interline_w*5,
                y:bt.chevron[2].y - (decoration_canvas_size.h/100)*4
            }
        ]
    }
    //container coords
    let padding_size = tp.ribbon[3].y - tp.ribbon[0].y;
    container_coords=[
        {
            x:collumns.top[0].xf + padding_size,
            y:tp.ribbon[3].y + padding_size
        },
        {
            x:collumns.top[4].xf - padding_size,
            y:tp.ribbon[3].y + padding_size
        },
        {
            x:collumns.top[4].xf - padding_size,
            y:bt.ribbon[0].y - padding_size
        },
        {
            x:collumns.top[0].xf + padding_size,
            y:bt.ribbon[0].y - padding_size
        }
    ];
    //container decorations coords
    decoration_coords=[
        {
            x:container_coords[0].x + padding_size/2,
            y:container_coords[0].y + padding_size/2
        },
        {
            x:container_coords[0].x + padding_size,
            y:container_coords[0].y + padding_size/2
        },
        {
            x:container_coords[3].x + padding_size,
            y:container_coords[3].y - padding_size/2
        },
        {
            x:container_coords[3].x + padding_size/2,
            y:container_coords[3].y - padding_size/2
        },
        {
            x:container_coords[3].x + padding_size/2,
            y:container_coords[3].y - padding_size
        },
        {
            x:container_coords[2].x - padding_size/2,
            y:container_coords[2].y - padding_size
        },
        {
            x:container_coords[2].x - padding_size/2,
            y:container_coords[2].y - padding_size/2
        },
        {
            x:container_coords[2].x - padding_size,
            y:container_coords[2].y - padding_size/2
        },
        {
            x:container_coords[1].x - padding_size,
            y:container_coords[1].y + padding_size/2
        },
        {
            x:container_coords[1].x - padding_size/2,
            y:container_coords[1].y + padding_size/2
        },
        {
            x:container_coords[1].x - padding_size/2,
            y:container_coords[1].y + padding_size
        },
        {
            x:container_coords[0].x + padding_size/2,
            y:container_coords[0].y + padding_size
        },
        {
            x:container_coords[0].x + padding_size/2,
            y:container_coords[0].y + padding_size/2
        }
    ];
    //size and possition the content box
    div_content_box.style.position = "absolute";
    div_content_box.style.top = main_decoration_canvas.offsetTop+container_coords[0].y+2*padding_size + "px";
    div_content_box.style.left = main_decoration_canvas.offsetLeft+container_coords[0].x+2*padding_size + "px";
    div_content_box.style.height = container_coords[2].y-container_coords[0].y-4*padding_size + "px";
    div_content_box.style.width = container_coords[2].x-container_coords[0].x-4*padding_size + "px";
    //clear the canvas
    ctx_bg.clearRect(0,0,decoration_canvas_size.w,decoration_canvas_size.h);
    //draw left chevron
    ctx_bg.beginPath();
    ctx_bg.moveTo(chevrons.left[0].x, chevrons.left[0].y);
    for (let index = 1; index < chevrons.left.length; index++) {
        ctx_bg.lineTo(chevrons.left[index].x, chevrons.left[index].y)
    }
    ctx_bg.fillStyle=Mars;
    ctx_bg.fill();
    //draw right chevron
    ctx_bg.beginPath();
    ctx_bg.moveTo(chevrons.right[0].x, chevrons.right[0].y);
    for (let index = 1; index < chevrons.left.length; index++) {
        ctx_bg.lineTo(chevrons.right[index].x, chevrons.right[index].y)
    }
    ctx_bg.fillStyle=Mars;
    ctx_bg.fill();
    //top ribbon
    ctx_bg.beginPath();
    ctx_bg.moveTo(tp.ribbon[0].x, tp.ribbon[0].y);
    ctx_bg.lineTo(tp.ribbon[1].x, tp.ribbon[1].y);
    ctx_bg.lineTo(tp.ribbon[2].x, tp.ribbon[2].y);
    ctx_bg.lineTo(tp.ribbon[3].x, tp.ribbon[3].y);
    ctx_bg.closePath();
    ctx_bg.fillStyle=Mars;
    ctx_bg.fill();
    //bottom ribbon
    ctx_bg.beginPath();
    ctx_bg.moveTo(bt.ribbon[0].x, bt.ribbon[0].y);
    ctx_bg.lineTo(bt.ribbon[1].x, bt.ribbon[1].y);
    ctx_bg.lineTo(bt.ribbon[2].x, bt.ribbon[2].y);
    ctx_bg.lineTo(bt.ribbon[3].x, bt.ribbon[3].y);
    ctx_bg.closePath();
    ctx_bg.fillStyle=Mars; 
    ctx_bg.fill();
    //decorations
    ctx_bg.strokeStyle=Sol;
    ctx_bg.lineWidth=(collumns.top[1].y-collumns.top[0].y)/5
    //draw the lines
    for (let g = 0; g < tp.decoration.length; g++) {
        //start teh shape
        ctx_bg.beginPath();
        ctx_bg.moveTo(tp.decoration[g][0].x, tp.decoration[g][0].y);
        for (let h = 1; h < tp.decoration[g].length; h++) {
            ctx_bg.lineTo(tp.decoration[g][h].x, tp.decoration[g][h].y);
        }
        ctx_bg.stroke();
    }
    for (let g = 0; g < bt.decoration.length; g++) {
        //start teh shape
        ctx_bg.beginPath();
        ctx_bg.moveTo(bt.decoration[g][0].x, bt.decoration[g][0].y);
        for (let h = 1; h < bt.decoration[g].length; h++) {
            ctx_bg.lineTo(bt.decoration[g][h].x, bt.decoration[g][h].y);
        }
        ctx_bg.stroke();
    }
    //decoration limits
    //top-top
    ctx_bg.beginPath();
    ctx_bg.moveTo(tp.ribbon[0].x, tp.decoration[0][7].y);
    ctx_bg.lineTo(tp.ribbon[1].x, tp.decoration[0][7].y);
    ctx_bg.stroke();
    //top-bot
    ctx_bg.beginPath();
    ctx_bg.moveTo(tp.ribbon[0].x, tp.decoration[0][0].y);
    ctx_bg.lineTo(tp.ribbon[1].x, tp.decoration[0][0].y);
    ctx_bg.stroke();
    //bot-top
    ctx_bg.beginPath();
    ctx_bg.moveTo(bt.ribbon[0].x, bt.decoration[0][7].y);
    ctx_bg.lineTo(bt.ribbon[1].x, bt.decoration[0][7].y);
    ctx_bg.stroke();
    //bot-bot
    ctx_bg.beginPath();
    ctx_bg.moveTo(bt.ribbon[0].x, bt.decoration[0][0].y);
    ctx_bg.lineTo(bt.ribbon[1].x, bt.decoration[0][0].y);
    ctx_bg.stroke();

    ctx_bg.strokeStyle=Minerva;
    ctx_bg.lineWidth=(collumns.top[1].y-collumns.top[0].y)/4
    //column bases
    for (let g = 0; g < collumns.top.length; g++) {
        if (collumns.bot[g].y > collumns.top[g].y) {
            ctx_bg.beginPath();
            ctx_bg.moveTo(collumns.top[g].xi,collumns.top[g].y);
            ctx_bg.lineTo(collumns.top[g].xf,collumns.top[g].y);
            ctx_bg.stroke();

            ctx_bg.beginPath();
            ctx_bg.moveTo(collumns.bot[g].xi,collumns.bot[g].y);
            ctx_bg.lineTo(collumns.bot[g].xf,collumns.bot[g].y);
            ctx_bg.stroke();
        }
    }
    //pillars (only if visible)
    if (collumns.bot_points[0].y > collumns.top_points[0].y) {
        for (let h = 0; h < collumns.top_points.length; h++) {
            ctx_bg.beginPath();
            ctx_bg.moveTo(collumns.top_points[h].x, collumns.top_points[h].y);
            ctx_bg.lineTo(collumns.bot_points[h].x, collumns.bot_points[h].y);
            ctx_bg.stroke();
        }
    }
    //fade in the container bg
    ctx_bg.beginPath();
    ctx_bg.moveTo(container_coords[0].x, container_coords[0].y);
    ctx_bg.lineTo(container_coords[1].x, container_coords[1].y);
    ctx_bg.lineTo(container_coords[2].x, container_coords[2].y);
    ctx_bg.lineTo(container_coords[3].x, container_coords[3].y);
    ctx_bg.fillStyle=Pomona;
    ctx_bg.fill();
    //fade in decoration
    ctx_bg.beginPath();
    ctx_bg.moveTo(decoration_coords[0].x, decoration_coords[0].y);
    for (let index = 1; index < decoration_coords.length; index++) {
        ctx_bg.lineTo(decoration_coords[index].x, decoration_coords[index].y)
    }
    ctx_bg.strokeStyle=Diana;
    ctx_bg.stroke();
}