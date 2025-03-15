//declare globals
var screen_width, screen_height, isLandscape;   //screen info
var mode=false; //dark mode by default
var ctx_bg, ctx_bb, ctx_tc, ctx_lc, ctx_rc; //canvas contexts
//button selector vars
var main_container_open = false;
var current_container;
var prev_obj, prev_selection;
var selection_id=null;
//project selector vars
var project_displayed=false;
var current_project=null;
var y_coords;
//touch position 
var xi,xf;
//animation vars
var keyframe=0;
var animation_on=false;
var animation=null;
var animation_counter=0;
var max_frames=0;
var faded=0;
//drawing shapes vars
var o, chevrons;
var rhombus, arrows, tp, bt, ribbon_decorations, collumns, container_coords, back_button_cont_coords;
var step, nav_step;
var ribbons =[];
var decoration_canvas_size, back_button_canvas_size;
//html elements
var main_background, pseudo_background, nav_bar, toggle_button_container, div_content_box, toggle_canvas, main_decoration_canvas, back_button, back_button_canvas, title_canvas;
var nav_buttons = [];
var nav_button_decorations = [];
var nav_buttons_text = [];
var toggle_text = [];
//image vars for the contact linktree
var image_gallery = [
    //email
    {
        nox:"img/email_nox_light.png",
        lux_light:"img/email_lux_light.png",
        lux_dark:"img/email_lux_dark.png"
    },
    //github
    {
        nox:"img/github_nox_light.png",
        lux_light:"img/github_lux_light.png",
        lux_dark:"img/github_lux_dark.png"
    },
    //higginface
    {
        nox:"img/hf_nox_light.png",
        lux_light:"img/hf_lux_light.png",
        lux_dark:"img/hf_lux_dark.png"
    },
    //discord
    {
        nox:"img/discord_nox_light.png",
        lux_light:"img/discord_lux_light.png",
        lux_dark:"img/discord_lux_dark.png"
    },
    //itchio
    {
        nox:"img/itchio_nox_light.png",
        lux_light:"img/itchio_lux_light.png",
        lux_dark:"img/itchio_lux_dark.png"
    }
];
//colours
var Roma, Juno, Venus, Trivia, Nymphae_Avernales, Melinoe, Zagreus, Proserpina, Pluto, Maribel, Vulcan, Neptune, Mars, Sol, Minerva, Quirinus, Pontus, Salacia, Carmentis, Falacer, Flora, Furrina, Palatua, Portunus, Volturnus, Janus;
//shaders
const no_shading_nav_button = "0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
const shading_nav_button = "-8px 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
const no_shading_project_button = "0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 0px 0px 0 rgba(0, 0, 0, 0.19)";
const shading_project_button = "-4px 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
//main contnet
const main_content = [
    `<p id="about_title" class="text_title"><b>About</b></p>
    <p id="about_text" class="text_content">Hey there.
    <br>I'm interested in writing free, open source and efficient software that anyone can find both easy to use and friendly to tinker with. On the <b>PROJECTS</b> tab, you can find a few web demos of my more extensive projects, and you can find the rest on my various other pages, reachable from the <b>CONTACT</b> tab.
    <br>If you're a beginner in programming, do not be overwhelmed by the apparent complexity of some of the projects: they were all written with people like you in mind, making sure to comment and deobfuscate most lines of code even if it might be a slight disadvantage to actual code review. I don't have a favourite or preferred coding language, although most projects you'll see here are written in JavaScript to facilitate a beginner friendly aura, given the fact that JavaScript is usually considered the easiest and most forgiving language for any programmer starting out, as well as to facilitate both distribution (all devices have a web browser that can run the code, regardless of installed software and libraries, operating system or processor architecture) and get to use the built in browser capabilities, especially when it comes to user interface handling. On my github profile you might find projects written in Python, Java, or even scripting languages like Bash, and they will be just as thoroughly documented as the JavaScript ones.
    <br>I am mostly interested in machine learning and artificial intelligence, but you'll find plenty of other things in my 
    <a href="https://github.com/archmagos-dominus" class="link_content">github repositories</a>. Everything that I make is open-source and free to use on whatever project you're working on.
    <br>If you have any questions, bug reports, requests of taking part in your own projects or simply just wish to chat about anything that has to do computers don't hesitate to shoot me an email or a discord message. 
    <br>Thanks for checking my portfolio out!</p>`,

    `<p id="projects_title" class="text_title"><b>Projects</b></p>
    <div id="selector_bar">
        <canvas id="select_left" onclick="prev_project()"></canvas>
        <canvas id="title_canvas"></canvas>
        <canvas id="select_right" onclick="next_project()"></canvas>
        <div id="project_title_container"><p id="project_title">Hell Raven</p></div>
    </div>
    <div id="project_selector">
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
    
    `<p id="contact_title" class="text_title"><b>Contact</b></p>
    <p id="contact_text" class="text_content">
    <a href="mailto:yk3a4tgpd@mozmail.com?subject=Homepage Contact" class="link_content"><img src="" class="logos"> E-mail me!</a><br>
    <a href="https://github.com/archmagos-dominus" class="link_content"><img src="" class="logos"> Github repositories</a><br>
    <a href="https://huggingface.co/archmagos" class="link_content"><img src="" class="logos"> Hugginface repositories</a><br>
    <a href="https://discord.gg/GdbQJh8VU9" class="link_content"><img src="" class="logos"> Discord server invite</a><br>
    <a href="https://leonisius.itch.io/" class="link_content"><img src="" class="logos"> Itch.io page</a>
    </p>`
];
//project content
const project_content = [
    `<h1 class="subtitle" id="subtitle_invisible_portrait">Pax Astrorum</h1>
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
    `<h1 class="subtitle" id="subtitle_invisible_portrait">Project 2</h1>
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
        <h1 class="subtitle" id="subtitle_invisible_portrait">AAAAAAAAAAAAAA</h1>
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
    `<h1 class="subtitle" id="subtitle_invisible_portrait">Project 3</h1>
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
    `<h1 class="subtitle" id="subtitle_invisible_portrait">Project 4</h1>
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
    `<h1 class="subtitle" id="subtitle_invisible_portrait">Project 5</h1>
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

//executes at any reload/resize of the page - same as load_page(), but without the need to load DOM elements and makes sure that any animations currently playing are not left hanging
function reload_page() {
    //animation reset
    if (animation_on) {
        animation_on=false;
        keyframe=0;
        animation_counter=0;
        max_frames=0;
        animation=null;
        faded=0;
    }
    //remove any listeners
    remove_listeners()
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
        //check orientation
        if (isLandscape) {
            //draw open
            show_main_opened();
        } else {
            //draw open
            show_main_opened_p();
        }
        
    } else {
        //check orientation
        if (isLandscape) {
            //draw closed
            show_main_intial();
        } else {
            //draw closed
            show_main_intial_p();
        }
        
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
    nav_bar = document.getElementById("nav_bar");
    nav_buttons = document.getElementsByClassName("nav_button");
    nav_button_decorations = document.getElementsByClassName("nav_button_decoration");
    nav_buttons_text = document.getElementsByClassName("nav_button_text");
    div_content_box = document.getElementById("content_box");
    back_button = document.getElementById("back_button");
    back_button_canvas = document.getElementById("back_button_canvas");
    //contexts
    ctx_bg = main_decoration_canvas.getContext("2d");   //context for the main canvas
    ctx_bb = back_button_canvas.getContext("2d");       //context for the back button canvas
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
            Pomona="#393D47";//"#C8CDD2";
            //container decorations
            Diana="#C8CDD2";//"#393D47";
            //content text
            Quirinus="#C8CDD2";//"#393D47";
            //content link
            Pontus="#C8CDD2";//"#393D47";
            //content link (hover)
            Salacia="#C8CDD2";//"#393D47";
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
            document.querySelector(':root').style.setProperty('--scroll-thumb-color', "#C8CDD2");
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

//function: handles the preliminary page display
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
        main_background.style.visibility = "visible";
        //pseudo_background (centered in parent)
        pseudo_background.style.position = "absolute";
        pseudo_background.style.height = Math.floor(main_background.offsetHeight*98/100) + "px";
        pseudo_background.style.width = Math.floor(main_background.offsetWidth*99/100) + "px";
        pseudo_background.style.top = Math.floor((main_background.offsetHeight-pseudo_background.offsetHeight)/2) + "px";
        pseudo_background.style.left = Math.floor((main_background.offsetWidth-pseudo_background.offsetWidth)/2) + "px";
        pseudo_background.style.visibility = "visible";
        //LUX/NOX button container
        toggle_button_container.style.height = Math.floor(pseudo_background.offsetHeight/12) + "px";
        toggle_button_container.style.width = toggle_button_container.offsetHeight*2 + "px";
        toggle_button_container.style.position = "absolute";
        toggle_button_container.style.top = pseudo_background.offsetTop*2 + "px";
        toggle_button_container.style.left = pseudo_background.offsetWidth-pseudo_background.offsetLeft*2-toggle_button_container.offsetWidth + "px";
        toggle_button_container.style.visibility = "visible";
        //LUX/NOX button canvas
        toggle_canvas.style.height = Math.floor(toggle_button_container.offsetHeight*5/6) + "px";
        toggle_canvas.style.position = "absolute";
        toggle_canvas.style.top =  Math.floor((toggle_button_container.offsetHeight-toggle_canvas.offsetHeight)/2) + "px";
        toggle_canvas.style.left = Math.floor((toggle_button_container.offsetHeight-toggle_canvas.offsetHeight)/2) + "px";
        toggle_canvas.style.width = Math.floor(toggle_button_container.offsetWidth-toggle_canvas.offsetLeft*2) + "px";
        toggle_canvas.height = toggle_canvas.style.height.replace('px','');
        toggle_canvas.width = toggle_canvas.style.width.replace('px','');
        //create the 'LUX/NOX' button
        show_toggle_button_lnd();
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
        };
        //nav_bar (centered in parent)
        nav_bar.style.position = "absolute";
        nav_bar.style.height = Math.floor(pseudo_background.offsetHeight*2/10) + "px";
        nav_bar.style.width = pseudo_background.offsetHeight + "px";
        nav_bar.style.left = Math.floor((pseudo_background.offsetWidth-nav_bar.offsetWidth)/2) + "px";
        nav_bar.style.visibility = "visible";
        //nav_buttons (class)
        for (let index = 0; index < nav_buttons.length; index++) {
            nav_buttons[index].style.position = "absolute";
            nav_buttons[index].style.height = Math.floor(nav_bar.offsetHeight/2) + "px";
            nav_buttons[index].style.width = Math.floor(nav_bar.offsetWidth/4) + "px";
            nav_buttons[index].style.top = Math.floor((nav_bar.offsetHeight-nav_buttons[index].offsetHeight)/2) + "px";
            nav_buttons[index].style.left = index*3*Math.floor(nav_bar.offsetWidth/8) + "px";
            nav_buttons[index].style.backgroundColor=Neptune;
            nav_buttons[index].style.backgroundImage=marble_noise;
            nav_buttons[index].style.visibility = "visible";
        }
        //nav_button_decorations (canvases around the buttons, used to draw decorations on them)
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
            decoration_start(nav_button_decorations[index], Venus);    //this is no longer needed i think?             
        }
        //place the text on the buttons
        for (let index = 0; index < nav_buttons_text.length; index++) {
            nav_buttons_text[index].style.fontSize = nav_button_decorations[index].offsetHeight/5 + "px";
            nav_buttons_text[index].style.position = "absolute";
            nav_buttons_text[index].style.width = nav_buttons[index].style.width.replace('px','') + "px";
            nav_buttons_text[index].style.top = nav_button_decorations[index].style.height.replace('px','')/7+nav_buttons_text[index].offsetHeight/4 + "px";
            nav_buttons_text[index].style.left = "0px";
            nav_buttons_text[index].style.color=Venus;
            nav_buttons_text[index].style.visibility = "visible";       
        }
        //make back button invisible (in case the portrait mode made it visible beofre)
        back_button_canvas.style.visibility = "hidden";
        //check the status of the content container and arrange the elements accordingly
        if (!main_container_open) {
            //initialize the page elements after the container box has been opened
            show_main_intial(); //resize the canvas as 0,0 and add no elements to it
        } else {
            //initialize the elements without the opening the container box
            show_main_opened(); //canvas is max sized and all the elements are drawn on it
        }
    } else {
        //calculate element sizes according to width
        //main_background
        main_background.style.height = screen_height + "px";
        main_background.style.width = screen_width + "px";
        main_background.style.position = "absolute";
        main_background.style.top = "0px";
        main_background.style.left = "0px";
        main_background.style.visibility = "visible";
        //pseudo_background 
        pseudo_background.style.position = "absolute";
        pseudo_background.style.height = Math.floor(main_background.offsetHeight*98/100) + "px";
        pseudo_background.style.width = Math.floor(main_background.offsetWidth*98/100) + "px";
        pseudo_background.style.top = Math.floor((main_background.offsetHeight-pseudo_background.offsetHeight)/2) + "px";
        pseudo_background.style.left = "0px";
        pseudo_background.style.visibility = "visible";
        //LUX/NOX button container
        toggle_button_container.style.height = Math.floor(screen_width/6) + "px";
        toggle_button_container.style.width = toggle_button_container.offsetHeight + "px";
        toggle_button_container.style.position = "absolute";
        toggle_button_container.style.top = pseudo_background.offsetTop*2 + "px";
        toggle_button_container.style.left = pseudo_background.offsetWidth-pseudo_background.offsetTop*2-toggle_button_container.offsetWidth + "px";
        toggle_button_container.style.visibility = "visible";
        //LUX/NOX button canvas
        toggle_canvas.style.height = Math.floor(toggle_button_container.offsetHeight*5/6) + "px";
        toggle_canvas.style.position = "absolute";
        toggle_canvas.style.top =  Math.floor((toggle_button_container.offsetHeight-toggle_canvas.offsetHeight)/2) + "px";
        toggle_canvas.style.left = Math.floor((toggle_button_container.offsetHeight-toggle_canvas.offsetHeight)/2) + "px";
        toggle_canvas.style.width = Math.floor(toggle_button_container.offsetHeight*5/6) + "px";
        toggle_canvas.height = toggle_canvas.style.height.replace('px','');
        toggle_canvas.width = toggle_canvas.style.width.replace('px','');
        //create the 'LUX/NOX' button
        show_toggle_button_prt();
        let temp_x = (2*toggle_button_container.offsetTop) + toggle_button_container.offsetHeight;
        //main container decoration canvas
        main_decoration_canvas.style.position = "absolute";
        main_decoration_canvas.style.height = Math.floor(screen_height-(temp_x*2)) + "px";
        main_decoration_canvas.style.top = temp_x + "px";
        main_decoration_canvas.style.width = Math.floor(screen_width-toggle_button_container.offsetTop)+ "px";
        main_decoration_canvas.style.left = "0px"; //<test only|| -1*Math.floor(screen_width-toggle_button_container.offsetTop)+'px'; /////////////////////////////////////////////////reset this
        main_decoration_canvas.height = main_decoration_canvas.style.height.replace('px','');
        main_decoration_canvas.width = main_decoration_canvas.style.width.replace('px','');
        decoration_canvas_size = {
            w:main_decoration_canvas.offsetWidth,
            h:main_decoration_canvas.offsetHeight
        }
        main_decoration_canvas.style.visibility = "visible";  //make it visible, since it sits outside the screen anyway
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //draw the decoration on the main canvas from the start
        draw_portrait_canvas_decoration();
        //back button container size and possitoning
        back_button.style.position = "absolute";
        back_button.style.height = Math.floor(decoration_canvas_size.h/14) + "px";
        back_button.style.width = Math.floor(decoration_canvas_size.w/4) + "px";
        back_button.style.top = main_decoration_canvas.offsetTop +  "px";
        back_button.style.left = main_decoration_canvas.offsetLeft+'px';
        back_button.style.visibility = "visible";
        //back button canvas size and possitoning
        back_button_canvas.style.position = "absolute";
        back_button_canvas.style.height = Math.floor(decoration_canvas_size.h/14) + "px";
        back_button_canvas.style.width = Math.floor(decoration_canvas_size.w/4) + "px";
        back_button_canvas.style.top = decoration_canvas_size.h/15+ "px";
        back_button_canvas.style.left = main_decoration_canvas.offsetLeft+'px';
        back_button_canvas.height = Math.floor(decoration_canvas_size.h/12);
        back_button_canvas.width = Math.floor(decoration_canvas_size.w/4);
        back_button_canvas_size = {
            w:back_button_canvas.offsetWidth,
            h:back_button_canvas.offsetHeight
        }
        //back_button_canvas.style.backgroundImage=marble_noise;
        back_button_canvas.style.visibility = "visible";
        //create the back button
        draw_back_button();
        //nav_bar (centered in parent)
        nav_bar.style.position = "absolute";
        nav_bar.style.height = main_decoration_canvas.offsetHeight+"px";
        nav_bar.style.top  = main_decoration_canvas.offsetTop+"px";
        nav_bar.style.width = main_decoration_canvas.style.width.replace('px','') + "px";
        nav_bar.style.left ="0px";
        nav_bar.style.visibility = "visible";
        //nav_buttons (class)
        for (let index = 0; index < nav_buttons.length; index++) {
            nav_buttons[index].style.position = "absolute";
            nav_buttons[index].style.height = Math.floor(nav_bar.offsetHeight/5) + "px";
            nav_buttons[index].style.width = Math.floor(nav_bar.offsetHeight/2) + "px";
            nav_buttons[index].style.top = Math.floor(nav_buttons[index].offsetHeight+(index*nav_bar.offsetHeight/4)) + "px";
            nav_buttons[index].style.left = "0px";
            nav_buttons[index].style.backgroundColor=Neptune;
            nav_buttons[index].style.backgroundImage=marble_noise;
            nav_buttons[index].style.visibility = "visible";
        }
        //nav_button_decorations (canvases around the buttons, used to draw decorations on them)
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
            decoration_start_p(nav_button_decorations[index], Venus);            //this is no longer needed i think? 
        }    
        for (let index = 0; index < nav_buttons_text.length; index++) {
            //nav_buttons_text[index].style.textAlign="left";
            nav_buttons_text[index].style.fontSize = nav_button_decorations[index].offsetHeight/3.5 + "px";
            nav_buttons_text[index].style.position = "absolute";
            nav_buttons_text[index].style.width = nav_buttons[index].style.width.replace('px','')-nav_buttons[index].style.width.replace('px','')/10-5.5*nav_buttons[index].style.width.replace('px','')/20+ "px";
            nav_buttons_text[index].style.top = nav_buttons_text[index].offsetHeight/4-nav_button_decorations[index].style.height.replace('px','')/100 + "px";
            nav_buttons_text[index].style.left = nav_buttons[index].style.width.replace('px','')/10+"px";
            nav_buttons_text[index].style.color=Venus;
            nav_buttons_text[index].style.visibility = "visible";
        }

        //check the status of the content container and arrange the elements accordingly
        if (!main_container_open) {
            //initialize the page elements after the container box has been opened
            show_main_intial_p(); //buttons on x=0 and container canvas on x=-width CHECK IF DONE
        } else {
            //initialize the elements without the opening the container box
            show_main_opened_p(); //buttons on x=-width and container canvas on x=0 CHECK IF DONE
        }
    }

}

//function: draws the back button (used for navigating in protrait mode)
function draw_back_button() {
    //calculate the extremes of the container
    back_button_cont_coords = [
        {
            x:0,
            y:0
        },
        {
            x:back_button_canvas_size.w,
            y:0
        },
        {
            x:back_button_canvas_size.w,
            y:back_button_canvas_size.h
        },
        {
            x:0,
            y:back_button_canvas_size.h
        }
    ];
    //calculate a standard measure to help keep the scale of various elements similar
    let el=back_button_canvas_size.h/9;
    //calculate the coordinates for the various shapes which will be outlined
    let outlined_shapes = [
        //fist decoration shape
        [
            {
                x:el,
                y:el
            },
            {
                x:4*el,
                y:el
            },
            {
                x:4*el,
                y:3*el
            },
            {
                x:3*el,
                y:3*el
            },
            {
                x:3*el,
                y:2*el
            },
            {
                x:2*el,
                y:2*el
            },
            {
                x:2*el,
                y:4*el
            },
            {
                x:5*el,
                y:4*el
            }
        ],
        //second decoartion shape
        [
            {
                x:el,
                y:5*el
            },
            {
                x:4*el,
                y:5*el
            },
            {
                x:4*el,
                y:7*el
            },
            {
                x:3*el,
                y:7*el
            },
            {
                x:3*el,
                y:6*el
            },
            {
                x:2*el,
                y:6*el
            },
            {
                x:2*el,
                y:8*el
            },
            {
                x:5*el,
                y:8*el
            }
        ],
        //frst demarcation line
        [
            {
                x:el,
                y:0
            },
            {
                x:el,
                y:back_button_canvas_size.h
            }
        ],
        //second demarcation line
        [
            {
                x:5*el,
                y:0
            },
            {
                x:5*el,
                y:back_button_canvas_size.h
            }
        ],
        //top horizonal line
        [
            {
                x:6*el,
                y:el
            },
            {
                x:back_button_canvas_size.w-el*5,
                y:el
            }
        ],
        //bottom horizontal line
        [
            {
                x:6*el,
                y:back_button_canvas_size.h-el
            },
            {
                x:back_button_canvas_size.w-el*5,
                y:back_button_canvas_size.h-el
            }
        ],
    ];
    //calculate the coords for the filled chevrons
    let filled_shapes = [
        [
            {
                x:back_button_canvas_size.w-el*1.5,
                y:el
            },
            {
                x:back_button_canvas_size.w-el*1.5,
                y:2*el
            },
            {
                x:back_button_canvas_size.w-el*4,
                y:4.5*el
            },
            {
                x:back_button_canvas_size.w-el*1.5,
                y:7*el
            },
            {
                x:back_button_canvas_size.w-el*1.5,
                y:8*el
            },
            {
                x:back_button_canvas_size.w-el*5,
                y:4.5*el
            }
        ],
        [
            {
                x:back_button_canvas_size.w-el*3.5,
                y:el
            },
            {
                x:back_button_canvas_size.w-el*3.5,
                y:el*2
            },
            {
                x:back_button_canvas_size.w-el*6,
                y:el*4.5
            },
            {
                x:back_button_canvas_size.w-el*3.5,
                y:el*7
            },
            {
                x:back_button_canvas_size.w-el*3.5,
                y:el*8
            },
            {
                x:back_button_canvas_size.w-el*7,
                y:el*4.5
            }
        ],
        [
            {
                x:back_button_canvas_size.w-el*1.5,
                y:el*3
            },
            {
                x:back_button_canvas_size.w-el*3,
                y:el*4.5
            },
            {
                x:back_button_canvas_size.w-el*1.5,
                y:el*6
            }
        ]
    ];
    //clear the canvas
    ctx_bb.clearRect(0,0,back_button_canvas_size.w,back_button_canvas_size.h);
    //calculate line width
    ctx_bb.lineWidth=el/2;
    //draw the container bg
    ctx_bb.beginPath();
    ctx_bb.moveTo(back_button_cont_coords[0].x, back_button_cont_coords[0].y);
    ctx_bb.lineTo(back_button_cont_coords[1].x, back_button_cont_coords[1].y);
    ctx_bb.lineTo(back_button_cont_coords[2].x, back_button_cont_coords[2].y);
    ctx_bb.lineTo(back_button_cont_coords[3].x, back_button_cont_coords[3].y);
    ctx_bb.fillStyle=Neptune;
    ctx_bb.fill();
    //VENUS FOR DECORATIONS 
    //draw the outlined shapes
    ctx_bb.strokeStyle=Venus;
    for (let index = 0; index < outlined_shapes.length; index++) {
        ctx_bb.beginPath();
        ctx_bb.moveTo(outlined_shapes[index][0].x,outlined_shapes[index][0].y);
        for (let l = 1; l < outlined_shapes[index].length; l++) {
            ctx_bb.lineTo(outlined_shapes[index][l].x, outlined_shapes[index][l].y);
        }
        ctx_bb.stroke();
    }
    //draw the filled shapes
    ctx_bb.fillStyle=Venus;
    for (let index = 0; index < filled_shapes.length; index++) {
        ctx_bb.beginPath();
        ctx_bb.moveTo(filled_shapes[index][0].x,filled_shapes[index][0].y);
        for (let l = 1; l < filled_shapes[index].length; l++) {
            ctx_bb.lineTo(filled_shapes[index][l].x, filled_shapes[index][l].y);
        }
        ctx_bb.fill();
    }
}

//function: draws the main canvas decorations for portrait mode
function draw_portrait_canvas_decoration() {
    //calculate padding size
    let padding_size = decoration_canvas_size.h/30;
    //calculate the extremes of the container
    container_coords = [
        {
            x:0,
            y:0
        },
        {
            x:main_decoration_canvas.offsetWidth,
            y:0
        },
        {
            x:main_decoration_canvas.offsetWidth,
            y:main_decoration_canvas.offsetHeight
        },
        {
            x:0,
            y:main_decoration_canvas.offsetHeight
        }
    ];
    //calculate the coordinates of the container decorations
    decoration_coords=[
        {
            x:container_coords[3].x,
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
            x:container_coords[0].x,
            y:container_coords[0].y + padding_size
        }
    ];
    //calculate the size and possition of the content box
    div_content_box.style.position = "absolute";
    div_content_box.style.top = main_decoration_canvas.offsetTop+container_coords[0].y+2*padding_size + "px";
    div_content_box.style.left = main_decoration_canvas.offsetLeft+container_coords[0].x+2*padding_size + "px";
    div_content_box.style.height = container_coords[2].y-container_coords[0].y-4*padding_size + "px";
    div_content_box.style.width = container_coords[2].x-container_coords[0].x-4*padding_size + "px";
    //clear the canvas
    ctx_bg.clearRect(0,0,decoration_canvas_size.w,decoration_canvas_size.h);
    //calculate line width
    ctx_bg.lineWidth=padding_size/5;
    //draw the container bg
    ctx_bg.beginPath();
    ctx_bg.moveTo(container_coords[0].x, container_coords[0].y);
    ctx_bg.lineTo(container_coords[1].x, container_coords[1].y);
    ctx_bg.lineTo(container_coords[2].x, container_coords[2].y);
    ctx_bg.lineTo(container_coords[3].x, container_coords[3].y);
    ctx_bg.fillStyle=Pomona;
    ctx_bg.fill();
    //draw container decorations
    ctx_bg.beginPath();
    ctx_bg.moveTo(decoration_coords[0].x, decoration_coords[0].y);
    for (let index = 1; index < decoration_coords.length; index++) {
        ctx_bg.lineTo(decoration_coords[index].x, decoration_coords[index].y)
    }
    ctx_bg.strokeStyle=Diana;
    ctx_bg.stroke();
}

//function: displays the mode button on a landscape page
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

    //create the NOX text
    context.fillStyle = Pluto;
    context.font = zagreus[3]/3+"px bold Trajan";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText("NOX", toggle_canvas.width*3/4, toggle_canvas.height*3/4);
    context.fill();
}

//function: displays the mode button on a portrait page
function show_toggle_button_prt(){
    //size up the canvas according to the width and height, and position it vertically in the top right corner
    let context = toggle_canvas.getContext("2d");
    //Lampad
    context.beginPath();
    context.rect(0, 0, toggle_canvas.width, toggle_canvas.height);
    context.fillStyle = Nymphae_Avernales;
    context.fill();
    //Melinoe
    context.beginPath();
    context.rect(0, 0, toggle_canvas.width, toggle_canvas.height);
    context.fillStyle = Melinoe;
    context.fill();
    let zagreus=[toggle_canvas.height/10,toggle_canvas.height/10,toggle_canvas.width*4/5,toggle_canvas.height*4/5];
    context.beginPath();
    context.rect(zagreus[0], zagreus[1], zagreus[2], zagreus[3]);
    context.fillStyle = Zagreus;
    context.fill();
    //check if LUX/NOX mode is on, and draw the correct shape/text 
    if (mode) {
        //LUX
        //calculate origin
        let LUX_origin = {
            x: toggle_canvas.height/10+toggle_canvas.width/2.5,
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
        //fill all the shapes
        context.fillText("LUX", toggle_canvas.width/2, toggle_canvas.height*3/4);
        context.fill();
    } else {
        //NOX
        //create the NOX shape
        let NOX_origin={
            x:toggle_canvas.width/2,
            y:toggle_canvas.height/5+toggle_canvas.width/3  
        }
        let point_a={
            x:NOX_origin.x-toggle_canvas.width/3,
            y:toggle_canvas.height/6
        }
        let point_b={
            x:NOX_origin.x+toggle_canvas.width/3,
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
        //create the NOX text
        context.fillStyle = Pluto;
        context.font = zagreus[3]/3+"px bold Trajan";
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText("NOX", toggle_canvas.width/2, toggle_canvas.height*3/4);
        context.fill();
    }
}

//function: define how a button's decoration canvas should look (landscape - standard)
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
        }
    }
    //draw the top/bottom lines
    context.lineWidth = temp_y/2;
    context.strokeStyle = new_colour;
    context.fillStyle = new_colour;
    context.beginPath();
    context.moveTo(4.5*temp_x,temp_y/2);
    context.lineTo(15.5*temp_x,temp_y/2);
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

//function: define how a button's decoration canvas should look (landscape - clicked)
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

//function: define how a button's decoration canvas should look (portrait - standard)
function decoration_start_p(button_id, new_colour) {
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
        16*temp_x,
        19*temp_x
    ];
    //draw the 2 columns of circles
    for (let i = 0; i < 2; i++) {
        //7 circles per colmn
        for (let j = 0; j < 7; j++) {
            context.beginPath();
            context.arc(x_coords[i]+temp_y/2, temp_y*(j+0.5), temp_y/3, 0, 2 * Math.PI, false);
            context.fillStyle = (mode)?randomize_colour(new_colour):new_colour;
            context.fill();
        }
    }
    //draw the top/bottom lines
    context.lineWidth = temp_y/2;
    context.strokeStyle = new_colour;
    context.beginPath();
    context.moveTo(temp_x,temp_y/2);
    context.lineTo(15.5*temp_x,temp_y/2);
    context.stroke();
    context.beginPath();
    context.moveTo(temp_x,current_decoration.height-temp_y/2);
    context.lineTo(15.5*temp_x,current_decoration.height-temp_y/2);
    context.stroke();

    //draw the arrows
    context.fillStyle = new_colour;
    context.beginPath();
    context.moveTo(temp_x,temp_y*2.5);
    context.lineTo(temp_x,temp_y*4.5);
    context.lineTo(2*temp_x,temp_y*3.5);
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
    var temp_x3 = 17*temp_x + (temp_decoration_total_size-temp_decoration_actual_size)/2;
    var temp_x4 = 19*temp_x - (temp_decoration_total_size-temp_decoration_actual_size)/2;
    var temp_y_coef = ((temp_decoration_total_size-temp_decoration_actual_size+(line_width/2))/2);
    var sqrs=[];
    //draw the squares cullumn on the right
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

//function: define how a button's decoration canvas should look (landscape - clicked)
function decoration_clicked_p(button_id, new_colour){
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
        16*temp_x,
        19*temp_x
    ];
    //draw teh 4 columns of circles
    for (let i = 0; i < 2; i++) {
        //7 circles per colmn
        for (let j = 0; j < 7; j++) {
            context.beginPath();
            context.arc(x_coords[i]+temp_y/2, temp_y*(j+0.5), temp_y/3, 0, 2 * Math.PI, false);
            context.fillStyle = new_colour;
            context.fill();
        }
    }
    //draw the top/bottom lines
    context.lineWidth = temp_y/2;
    context.strokeStyle = new_colour;
    context.fillStyle = new_colour;
    context.beginPath();
    context.moveTo(4.5*temp_x,temp_y/2);
    context.lineTo(15.5*temp_x,temp_y/2);
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
    let temp_x3 = 17*temp_x + (temp_decoration_total_size-temp_decoration_actual_size)/2;
    let temp_x4 = 19*temp_x - (temp_decoration_total_size-temp_decoration_actual_size)/2;
    let temp_y_coef = ((temp_decoration_total_size-temp_decoration_actual_size+(line_width/2))/2);
    let sqrs=[];
    //draw the right column of squares
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

//what to do when a nav button is clicked  //TODO
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
        
        if (isLandscape) {
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
        } else {
            //play the initialization animation
            open_main_container_p();                                                                                                                         
        }
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
            if (isLandscape) {
                decoration_start(current_dec,Venus);
                //fade out container content
                fade_out_container_content();
                //play the closing animation
                close_main_container();   
            } else {    //in portrait it works with a back button now
                // decoration_start_p(current_dec,Venus);
                // //fade out container content
                // fade_out_container_content();
                // //play the closing animation
                // close_main_container_p();                                                                                                                     
            }
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
            if (isLandscape) {
                decoration_start(prev_dec,Venus);
            } else {
                //decoration_start_p(prev_dec,Venus);
            }
            //set the 'selected' stly to the new selected button
            current_obj.style.boxShadow = no_shading_nav_button; 
            //make it the marble colour
            current_obj.style.backgroundColor = "#00000000";//makes it transparent // Maribel+"00";
            //change text to plumbum
            current_txt.style.color = Vulcan;
            //redo decorations in plumbum colour
            if (isLandscape) {
                decoration_clicked(current_dec,Vulcan);
            } else {//in portrait it works with back button
                //decoration_clicked_p(current_dec,Vulcan);
            }
            //function handling the correct timing in swithcing the contents
            switch_contents();
            //store the current selection in memory
            current_container=selection;
            prev_selection=selection;
        }
    }
}

//opening the main container    //TODO
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
}

//back button functionality     //TODO
function back_button_clicked() {
    remove_listeners()
    if (animation_on) {
        return;
    } else {
        close_main_container_p();
    }
}

//closing the main container    //TODO
function close_main_container(){
    //set the var
    main_container_open=false;
    //start the reverse animation
    animation = "main_cont_out";
    animate();
}   

//for portrait, TODO once we are done cleaning up the landscape ones
function open_main_container_p() {
     //set the var
     main_container_open=true;
     //start the animation
     animation = "main_cont_in_p";
     animate();
}

function close_main_container_p() {
    //set the var
    main_container_open=false;
    //start the reverse animation
    animation = "main_cont_out_p";
    animate();
}

//function: shows the menu in the intial state (landscape)
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

//function: shows the menu in the intial state (portrait)
function show_main_intial_p() {
    //show the initial state
    //place the nav bar
    nav_bar.style.top = (2*toggle_button_container.offsetTop) + toggle_button_container.offsetHeight + "px";
    //draw the button decorations as 'initial'
    for (let index = 0; index < nav_button_decorations.length; index++) {
        //draw the decorations
        decoration_start_p(nav_button_decorations[index], Venus);                 
    }
    //move the content container to the left
    main_decoration_canvas.style.left = -1*Math.floor(screen_width-toggle_button_container.offsetTop)+'px';
    //move the back button to the same position
    back_button_canvas.style.left = main_decoration_canvas.offsetLeft+'px';
}

//function: shows the menu in the final state (landscape)
function show_main_opened() {
    //show the opened state
    //place the nav bar on top
    nav_bar.style.top = Math.floor((pseudo_background.style.height.replace('px','')/5-nav_bar.offsetHeight)/2) + "px";
    //draw the button decoration again, this time checking which button is clicked
    for (let index = 0; index < nav_button_decorations.length; index++) {
        //chekc if it's selected
        if (index==selection_id) {
            //delete shading off selection button
            nav_buttons[index].style.boxShadow = no_shading_nav_button; 
            //make it transparent
            nav_buttons[index].style.backgroundColor = "#00000000";
            //change text to plumbum
            nav_buttons_text[index].style.color = Vulcan;
            //draw the decoration
            decoration_clicked(nav_button_decorations[index], Vulcan);
        } else {
            //delete shading off selection button
            nav_buttons[index].style.boxShadow = shading_nav_button; 
            //make it the Neptune colour
            nav_buttons[index].style.backgroundColor = Neptune; 
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

//function: shows the menu in the final state (portrait) //TODO
function show_main_opened_p() {
    //show the opened state
    //place the nav bar
    nav_bar.style.top = (2*toggle_button_container.offsetTop) + toggle_button_container.offsetHeight + "px"; //not nedded?
    nav_bar.style.left = -1*nav_bar.offsetWidth + "px";
    //draw the button decorations as 'initial' (we'll do this in the 'back' animation)
    // for (let index = 0; index < nav_button_decorations.length; index++) {
    //     //draw the decorations
    //     decoration_start_p(nav_button_decorations[index], Venus);                 
    // }
    //move the content container to the opened position
    main_decoration_canvas.style.left = '0px';
    //move the back button to the same position
    back_button_canvas.style.left = '0px';
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
            keyframe=0;
            animation_counter=0;
            max_frames=0;
            animation=null;
            animation_on=false;
            faded=0;
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
            faded=1;    //set the faded var to 1 (content fading complete)
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

//draws the decocration for the central part of the selector bar
function draw_title_decor() {
    //create horizontal lines
    let line_w=title_canvas.height/25;
    let lines = [
        {
            xi: title_canvas.width/10,
            xf: title_canvas.width*9/10,
            y: line_w
        },
        {
            xi: title_canvas.width*1.5/10,
            xf: title_canvas.width*8.5/10,
            y: title_canvas.height*2/3 //maybe plus/minus line width
        },  
        {
            xi: title_canvas.width/3,
            xf: title_canvas.width*2/3,
            y: title_canvas.height-line_w
        },
    ];
    //create decorative rhombi
    let rhombi = [
        [
            {x:title_canvas.width/3-2*title_canvas.height/12,   y:title_canvas.height*9/12},
            {x:title_canvas.width/3-title_canvas.height/12,   y:title_canvas.height*5/6},
            {x:title_canvas.width/3-2*title_canvas.height/12,   y:title_canvas.height*11/12},
            {x:title_canvas.width/3-3*title_canvas.height/12,   y:title_canvas.height*5/6}
        ],
        [
            {x:2*title_canvas.width/3+2*title_canvas.height/12,   y:title_canvas.height*9/12},
            {x:2*title_canvas.width/3+title_canvas.height/12,   y:title_canvas.height*5/6},
            {x:2*title_canvas.width/3+2*title_canvas.height/12,   y:title_canvas.height*11/12},
            {x:2*title_canvas.width/3+3*title_canvas.height/12,   y:title_canvas.height*5/6}
        ]
    ];

    //using the selection_id val, draw the 3 numerals
    draw_decoration_numeral(current_project,true,1);
    //draw the left numeral (if applicable)
    if (current_project-1>-1) {
        draw_decoration_numeral(current_project-1,false,0);
    }
    //draw the right numeral  (if applicable)
    if (current_project+1<project_content.length) {
        draw_decoration_numeral(current_project+1,false,2);
    }

    //draw the lines
    for (let index = 0; index < lines.length; index++) {
        ctx_tc.lineWidth=line_w;
        ctx_tc.beginPath();
        ctx_tc.moveTo(lines[index].xi, lines[index].y);
        ctx_tc.lineTo(lines[index].xf, lines[index].y);
        ctx_tc.strokeStyle=Neptune;
        ctx_tc.stroke();
    }
    //draw the decorative rhombi
    for (let i = 0; i < rhombi.length; i++) {
        ctx_tc.lineWidth=line_w;
        ctx_tc.beginPath();
        ctx_tc.moveTo(rhombi[i][0].x, rhombi[i][0].y);
        ctx_tc.lineTo(rhombi[i][1].x, rhombi[i][1].y);
        ctx_tc.lineTo(rhombi[i][2].x, rhombi[i][2].y);
        ctx_tc.lineTo(rhombi[i][3].x, rhombi[i][3].y);
        ctx_tc.closePath();
        ctx_tc.fillStyle=Neptune;
        ctx_tc.fill();
    }
}

function draw_decoration_numeral(s_id,s,pos) {
    //setup helper vars
    let size = (s)?1:2/3;
    let ox = title_canvas.width/3+pos*title_canvas.width/9;
    let oy = title_canvas.height*2/3+title_canvas.height/25;
    let tw=title_canvas.width/9;
    let th=title_canvas.height/3-title_canvas.height/25;
    let y1=5*th/12-size*5*th/18;
    let y2=5*th/12+size*5*th/18;
    let shape=[];
    let line_w=size*title_canvas.height/28;
    //create the roman numeral shape to be drawn
    switch (s_id) {
        case 0:
            //I
            shape.push({
                xi:tw/2,
                yi:y1,
                xf:tw/2,
                yf:y2
            });
            // shape.push({
            //     xi:tw/2-1.5*tw/6*size,
            //     yi:y1,
            //     xf:tw/2+1.5*tw/6*size,
            //     yf:y1
            // });
            // shape.push({
            //     xi:tw/2-1.5*tw/6*size,
            //     yi:y2,
            //     xf:tw/2+1.5*tw/6*size,
            //     yf:y2
            // });
            break;
        case 1:
            //II
            shape.push({
                xi:tw/2-tw/6*size,
                yi:y1,
                xf:tw/2-tw/6*size,
                yf:y2
            });
            shape.push({
                xi:tw/2+tw/6*size,
                yi:y1,
                xf:tw/2+tw/6*size,
                yf:y2
            });
            // shape.push({
            //     xi:tw/2-2.5*tw/6*size,
            //     yi:y1,
            //     xf:tw/2+2.5*tw/6*size,
            //     yf:y1
            // });
            // shape.push({
            //     xi:tw/2-2.5*tw/6*size,
            //     yi:y2,
            //     xf:tw/2+2.5*tw/6*size,
            //     yf:y2
            // });
            break;
        case 2:
            //III
            shape.push({
                xi:tw/2,
                yi:y1,
                xf:tw/2,
                yf:y2
            });
            shape.push({
                xi:tw/2-tw/4*size,
                yi:y1,
                xf:tw/2-tw/4*size,
                yf:y2
            });
            shape.push({
                xi:tw/2+tw/4*size,
                yi:y1,
                xf:tw/2+tw/4*size,
                yf:y2
            });
            // shape.push({
            //     xi:tw/2-2.8*tw/6*size,
            //     yi:y1,
            //     xf:tw/2+2.8*tw/6*size,
            //     yf:y1
            // });
            // shape.push({
            //     xi:tw/2-2.8*tw/6*size,
            //     yi:y2,
            //     xf:tw/2+2.8*tw/6*size,
            //     yf:y2
            // });
            break;
        case 3:
            //IV
            shape.push({
                xi:tw/2-tw*6/15*size,
                yi:y1,
                xf:tw/2-tw*6/15*size,
                yf:y2
            });
            shape.push({
                xi:tw/2-tw*3/15*size,
                yi:y1,
                xf:tw/2+tw/15*size,
                yf:y2
            });
            shape.push({
                xi:tw/2+tw/15*size,
                yi:y2,
                xf:tw/2+5*tw/15*size,
                yf:y1
            });
            // shape.push({
            //     xi:tw/2-2.8*tw/6*size,
            //     yi:y1,
            //     xf:tw/2+2.8*tw/6*size,
            //     yf:y1
            // });
            // shape.push({
            //     xi:tw/2-2.8*tw/6*size,
            //     yi:y2,
            //     xf:tw/2+2.8*tw/6*size,
            //     yf:y2
            // });
            break;
        case 4:
            //V
            shape.push({
                xi:tw/2-3.5*tw/15*size,
                yi:y1,
                xf:tw/2,
                yf:y2
            });
            shape.push({
                xi:tw/2,
                yi:y2,
                xf:tw/2+3.5*tw/15*size,
                yf:y1
            });
            // shape.push({
            //     xi:tw/2-2.8*tw/6*size,
            //     yi:th/6*size,
            //     xf:tw/2+2.8*tw/6*size,
            //     yf:th/6*size
            // });
            // shape.push({
            //     xi:tw/2-2.8*tw/6*size,
            //     yi:y2,
            //     xf:tw/2+2.8*tw/6*size,
            //     yf:y2
            // });
            break;
                                            
        default:
            break;
    }
    //stroke all lines in the shape array
    for (let index = 0; index < shape.length; index++) {
        ctx_tc.lineWidth=line_w;
        ctx_tc.beginPath();
        ctx_tc.moveTo(ox+shape[index].xi, oy+shape[index].yi);
        ctx_tc.lineTo(ox+shape[index].xf, oy+shape[index].yf);
        ctx_tc.strokeStyle=Neptune;
        ctx_tc.stroke();
    }
}

function draw_left_arrow(selector_left, clicked=false) {
    //get canvas size
    let ow = selector_left.offsetWidth;
    let w = selector_left.offsetWidth/2.5;
    let h = selector_left.offsetHeight;
    let line_w=title_canvas.height/28;
    //generate shapes
    let shape_l = [
        {
            x:ow,
            y:0
        },
        {
            x:ow,
            y:h/4
        },
        {
            x:ow-(w/2),
            y:h/2
        },
        {
            x:ow,
            y:3*h/4
        },
        {
            x:ow,
            y:h
        },
        {
            x:ow-w,
            y:h/2
        }
    ];
    let shape_s = [
        {
            x:ow,
            y:3*h/8
        },
        {
            x:ow,
            y:5*h/8
        },
        {
            x:ow-(w/4),
            y:h/2
        }
    ];
    //if button currently clicked, trace the outside of the shape
    //if not fill the shape
    if (clicked) {
        ctx_lc.lineWidth=line_w;
        ctx_lc.strokeStyle=Neptune;
        ctx_lc.beginPath();
        ctx_lc.moveTo(shape_l[0].x, shape_l[0].y);
        //stroke all lines in the large shape array
        for (let index = 1; index < shape_l.length; index++) {
            ctx_lc.lineTo(shape_l[index].x, shape_l[index].y);
        }
        ctx_lc.stroke();
        ctx_lc.beginPath();
        ctx_lc.moveTo(shape_s[0].x, shape_s[0].y);
        //stroke all lines in the small shape array
        for (let index = 1; index < shape_s.length; index++) {
            ctx_lc.lineTo(shape_s[index].x, shape_s[index].y);
        }
        ctx_lc.stroke();
    } else {
        ctx_lc.lineWidth=line_w;
        ctx_lc.fillStyle=Neptune;
        ctx_lc.beginPath();
        ctx_lc.moveTo(shape_l[0].x, shape_l[0].y);
        //stroke all lines in the large shape array
        for (let index = 1; index < shape_l.length; index++) {
            ctx_lc.lineTo(shape_l[index].x, shape_l[index].y);
        }
        ctx_lc.closePath();
        ctx_lc.fill();
        ctx_lc.beginPath();
        ctx_lc.moveTo(shape_s[0].x, shape_s[0].y);
        //stroke all lines in the small shape array
        for (let index = 1; index < shape_s.length; index++) {
            ctx_lc.lineTo(shape_s[index].x, shape_s[index].y);
        }
        ctx_lc.closePath();
        ctx_lc.fill();
    }
}

function draw_right_arrow(selector_right, clicked=false) {
    //get canvas size
    let w = selector_right.offsetWidth/2.5;
    let h = selector_right.offsetHeight;
    let line_w=title_canvas.height/28;
    //generate shapes
    let shape_l = [
        {
            x:0,
            y:0
        },
        {
            x:0,
            y:h/4
        },
        {
            x:w/2,
            y:h/2
        },
        {
            x:0,
            y:3*h/4
        },
        {
            x:0,
            y:h
        },
        {
            x:w,
            y:h/2
        }
    ];
    let shape_s = [
        {
            x:0,
            y:3*h/8
        },
        {
            x:0,
            y:5*h/8
        },
        {
            x:w/4,
            y:h/2
        }
    ];
    //if button currently clicked, trace the outside of the shape
    //if not fill the shape
    if (clicked) {
        ctx_rc.lineWidth=line_w;
        ctx_rc.strokeStyle=Neptune;
        ctx_rc.beginPath();
        ctx_rc.moveTo(shape_l[0].x, shape_l[0].y);
        //stroke all lines in the large shape array
        for (let index = 1; index < shape_l.length; index++) {
            ctx_rc.lineTo(shape_l[index].x, shape_l[index].y);
        }
        ctx_rc.stroke();
        ctx_rc.beginPath();
        ctx_rc.moveTo(shape_s[0].x, shape_s[0].y);
        //stroke all lines in the small shape array
        for (let index = 1; index < shape_s.length; index++) {
            ctx_rc.lineTo(shape_s[index].x, shape_s[index].y);
        }
        ctx_rc.stroke();
    } else {
        ctx_rc.lineWidth=line_w;
        ctx_rc.fillStyle=Neptune;
        ctx_rc.beginPath();
        ctx_rc.moveTo(shape_l[0].x, shape_l[0].y);
        //stroke all lines in the large shape array
        for (let index = 1; index < shape_l.length; index++) {
            ctx_rc.lineTo(shape_l[index].x, shape_l[index].y);
        }
        ctx_rc.closePath();
        ctx_rc.fill();
        ctx_rc.beginPath();
        ctx_rc.moveTo(shape_s[0].x, shape_s[0].y);
        //stroke all lines in the small shape array
        for (let index = 1; index < shape_s.length; index++) {
            ctx_rc.lineTo(shape_s[index].x, shape_s[index].y);
        }
        ctx_rc.closePath();
        ctx_rc.fill();
    }
}

function style_project_title(w,h){
    //get project title element
    let title = document.getElementById("project_title");
    //set the title
    title.innerHTML = document.getElementById("subtitle_invisible_portrait").innerHTML;
    //initialise styling for the title
    title.style.position = "absolute";
    title.style.margin="0px";
    title.style.padding="0px";
    title.style.color=Quirinus;
    //check the lenght of the title
    if (title.innerHTML.length>8) {
        //lenght is larger than 8, see if we can divide it
        let title_array=title.innerHTML.split(/\W/,2);
        //create two <p> elements
        title.innerHTML = `<p id="title_line_1">${title_array[0]}</p><p id="title_line_2">${title_array[1]}</p>`;
        //size, possition and align them separately
        //give it the proper size so that the text fits
        let font_size = (title_array[0]<title_array[1])?(w/(1.1*title_array[0].length)):(w/(1.1*title_array[1].length));
        //also make sure the text does not go over a max size f h/2
        title.style.fontSize=(font_size<0.5*h)?1.1*font_size+"px":0.5*h+'px'; 
        //align it properly
        let t_1 = document.getElementById("title_line_1");
        let t_2 = document.getElementById("title_line_2")
        t_1.style.position = "absolute";
        t_1.style.margin="0px";
        t_1.style.padding="0px";
        t_1.style.left=(w/2)-t_1.offsetWidth/2;
        t_1.style.top=(h/4)-t_1.offsetHeight/2;
        t_2.style.position = "absolute";
        t_2.style.margin="0px";
        t_2.style.padding="0px";
        t_2.style.left=(w/2)-t_2.offsetWidth/2;
        t_2.style.top=(3*h/4)-t_2.offsetHeight/2;
    } else {
        let font_size = (w/(1.1*title.innerHTML.length));
        //give it the proper size
        title.style.fontSize=(font_size<0.6*h)?font_size+"px":0.6*h+'px'; 
        //align it properly
        title.style.left=(w/2)-title.offsetWidth/2;
        title.style.top=(h/2)-title.offsetHeight/2;
    }
}

function remove_listeners(){
    //remove keyboard listeners
    document.onkeydown=null;
    //remove touch listeners
    document.removeEventListener('touchstart', handleTouchStart, false);
    document.removeEventListener('touchmove', handleTouchMove, false);
    document.removeEventListener('touchend', handleTouchEnd, false);
}

function add_listeners(selector_l,selector_r){
    //add click listeners
    selector_l.addEventListener("onmousedown", prev_project);
    selector_r.addEventListener("onmousedown", next_project);
    //add keyboard listeners
    document.onkeydown=(event)=>{
        switch(event.key){
            case "ArrowLeft":
                prev_project();
                break;
            case "ArrowRight":
                next_project();
                break;
            default:
                break;
        }
    }
    //add touch listeners
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);
}

function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    xi = firstTouch.clientX;
}

function handleTouchMove(evt) {
    const lastTouch = evt.touches[0];
    xf = lastTouch.clientX;
}

function handleTouchEnd(evt) {
    if (xi-xf>screen_width/4) {
        console.log('Swipe Left');
        prev_project();
    } else if (xi-xf<-1*screen_width/4) {
        console.log('Swipe Right');
        next_project();
    }
    // Reset values or handle end of touch event
    xi=0;xf=0;
    console.log('Touch ended',screen_width,xi-xf);
}

function prev_project() {
    console.log('Touch ended - L');
}

function next_project() {
    console.log('Touch ended - R');
}

function style_content(){
    //check which content is displayed
    switch (selection_id) {
        case 0:
            //check for portrait/landscape
            if (isLandscape) {
                //make title invisible
                document.getElementById("about_title").style.visibility="hidden";
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
            } else {
                //about content
                let atext = document.getElementById("about_text");
                let alinks = document.getElementsByClassName("link_content");
                let atitle = document.getElementById("about_title");
                atitle.style.visibility='visible';
                //title size
                atitle.style.fontSize = div_content_box.offsetHeight/16+"px";
                //title position
                atitle.style.top = -1*back_button_canvas_size.h/1.25+'px';
                atitle.style.left = Math.floor((div_content_box.offsetWidth-back_button_canvas.offsetWidth)/2)+'px';
                //title colour
                atitle.style.color = Quirinus;
                //text sizes
                atext.style.fontSize = div_content_box.offsetHeight/22+"px";
                //text position
                atext.style.height=div_content_box.offsetHeight-back_button_canvas.offsetTop*1.1+'px';
                atext.style.top=back_button_canvas.offsetTop+'px';
                atext.style.textAlign='left'; 
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
            }
            
            break;

        case 1:
            //check orientation
            if (isLandscape) {
                //projects content
                let project_selection_div = document.getElementById("project_selector");
                let prject_selector_canvases = document.getElementsByClassName("project_selector_canvas");
                let project_selector_texts = document.getElementsByClassName("project_selector_text");
                let project_display_canvas = document.getElementById("project_display");
                let project_display_text = document.getElementById("project_display_text");
                //make all portrait-only elements invisible
                document.getElementById("projects_title").style.visibility="hidden";
                document.getElementById("selector_bar").style.visibility="hidden";
                document.getElementById("project_title").style.visibility="hidden";
                //make all landscape-only elements visible
                project_selection_div.style.visibility="visible";
                //size and pos for selector div "project_selector"
                project_selection_div.style.top="0px";
                project_selection_div.style.left="0px";
                project_selection_div.style.width=div_content_box.offsetWidth/4;
                project_selection_div.style.height=div_content_box.offsetHeight;
                //calculate the paddin value for the project selector
                let pad = project_selection_div.offsetWidth/64;
                //iterate throught the project selector's canvases and texts
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
                    //check to see if this button is selected
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
                        prject_selector_canvases[index].style.boxShadow = no_shading_project_button; 
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
                        prject_selector_canvases[index].style.boxShadow = shading_project_button; 
                    }
                }
                //set the size and pos of the display area
                project_display_canvas.style.top="0px";
                project_display_canvas.style.left=div_content_box.offsetWidth/4+"px";
                project_display_canvas.style.width=3*div_content_box.offsetWidth/4+"px";
                project_display_canvas.style.height=div_content_box.offsetHeight+"px";
                project_display_canvas.width=3*div_content_box.offsetWidth/4;
                project_display_canvas.height=div_content_box.offsetHeight;
                //set size, pos adn colours of displayed text and titles
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
            } else {
                //portrait mode
                let ptitle = document.getElementById("projects_title");
                let selector_bar = document.getElementById("selector_bar");
                let selector_left = document.getElementById("select_left");
                let selector_right = document.getElementById("select_right");
                title_canvas = document.getElementById("title_canvas");
                let project_title = document.getElementById("project_title");
                let title_container = document.getElementById("project_title_container");
                //make all landscape-only elemetns invisible
                document.getElementById("project_selector").style.visibility="hidden";
                //make all portrait-only elements visible
                ptitle.style.visibility="visible";
                selector_bar.style.visibility="visible";
                title_container.style.visibility="visible";
                project_title.style.visibility="visible";
                //if no selection, assign one
                if (current_project==null) {
                    current_project=0;
                    project_displayed=true;
                }
                //title size
                ptitle.style.fontSize = div_content_box.offsetHeight/16+"px";
                //title position
                //ptitle.style.position="absolute";                                                          //maybe
                ptitle.style.top = -1*back_button_canvas_size.h/1.25+'px';
                ptitle.style.left = Math.floor((div_content_box.offsetWidth-back_button_canvas.offsetWidth)/2)+'px';
                //title colour
                ptitle.style.color = Quirinus;
                //style the portrait selector bar
                selector_bar.style.position="absolute";
                selector_bar.style.top=ptitle.offsetTop+1.5*ptitle.offsetHeight+"px";
                selector_bar.style.height=1.5*ptitle.offsetHeight+'px';
                selector_bar.style.width=selector_bar.offsetHeight*3+'px'
                selector_bar.style.left=(div_content_box.offsetWidth-selector_bar.offsetWidth)/2-decoration_canvas_size.h/60+"px";  //decoration_canvas_size.h/60 is half the padding for the decoration

                //size and pos for the title canvas
                title_canvas.style.position="absolute";
                title_canvas.style.top="0px";
                title_canvas.style.height=selector_bar.offsetHeight+'px';
                title_canvas.style.width=selector_bar.offsetWidth*3/5+'px'
                title_canvas.style.left=selector_bar.offsetWidth/5+"px";
                title_canvas.style.zIndex="299";
                title_canvas.height = Math.floor(selector_bar.offsetHeight);
                title_canvas.width = Math.floor(selector_bar.offsetWidth*3/5);
                ctx_tc=title_canvas.getContext("2d");
                draw_title_decor();
                //size and pos the title container
                title_container.style.position="relative";
                title_container.style.top="0px";
                title_container.style.height=title_canvas.offsetHeight*2/3+'px';
                title_container.style.width=title_canvas.offsetWidth+'px'
                title_container.style.left=selector_bar.offsetWidth/5+"px";
                title_container.style.zIndex="300";
                //size and pos for the left selector canvas
                selector_left.style.position="absolute";
                selector_left.style.top=selector_bar.offsetHeight/16+'px';//"0px";
                selector_left.style.height=selector_bar.offsetHeight/2+'px';
                selector_left.style.width=selector_bar.offsetWidth/5+'px'
                selector_left.style.left="0px";
                selector_left.style.zIndex="299";
                selector_left.height = Math.floor(selector_left.offsetHeight);
                selector_left.width = Math.floor(selector_bar.offsetWidth/5);
                ctx_lc=selector_left.getContext("2d");
                //draw decoration
                draw_left_arrow(selector_left);
                //size and pos for the right selector canvas
                selector_right.style.position="absolute";
                selector_right.style.top=selector_bar.offsetHeight/16+'px';//"0px";
                selector_right.style.height=selector_bar.offsetHeight/2+'px';
                selector_right.style.width=selector_bar.offsetWidth/5+'px'
                selector_right.style.left=selector_bar.offsetWidth-selector_right.offsetWidth+"px";
                selector_right.style.zIndex="299";
                selector_right.height = Math.floor(selector_right.offsetHeight);
                selector_right.width = Math.floor(selector_bar.offsetWidth/5);
                ctx_rc=selector_right.getContext("2d");
                //draw decoration
                draw_right_arrow(selector_right);
                //assign all listeners
                add_listeners(selector_left,selector_right);
                
                //possition the content box for the project text
                let project_display_text = document.getElementById("project_display_text");
                project_display_text.style.left="0px";div_content_box.offsetWidth/12+"px";
                project_display_text.style.width=(div_content_box.offsetWidth*19/20)+"px";
                project_display_text.style.height=div_content_box.offsetHeight-selector_bar.offsetHeight*2+"px";
                project_display_text.style.top=selector_bar.offsetTop+selector_bar.offsetHeight*5/4+"px";
                //padding for the content
                project_display_text.style.paddingLeft=Math.round(project_display_text.offsetWidth/50)+"px";
                project_display_text.style.paddingRight=Math.round(project_display_text.offsetWidth/50)+"px"; 
                
                //check if project already selected and display it
                if(project_displayed){initial_project_show();}
                //style the title
                style_project_title(title_container.offsetWidth,title_container.offsetHeight);         
            }
            break;

        case 2:
            //check orientation
            if (isLandscape) {
                //make title invisible
                document.getElementById("contact_title").style.visibility="hidden";
                //contact content
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
            } else {
                //contact content
                let ctitle = document.getElementById("contact_title");
                let ctext = document.getElementById("contact_text");
                let clinks = document.getElementsByClassName("link_content");
                let clink_imgs = document.getElementsByClassName("logos");
                let image_size = Math.floor(div_content_box.offsetHeight/20)+"px";
                ctitle.style.visibility='visible';
                //title size
                ctitle.style.fontSize = div_content_box.offsetHeight/16+"px";
                //title position
                ctitle.style.top = -1*back_button_canvas_size.h/1.25+'px';
                ctitle.style.left = Math.floor((div_content_box.offsetWidth-back_button_canvas.offsetWidth)/2)+'px';
                //title colour
                ctitle.style.color = Quirinus;
                //text sizes
                ctext.style.fontSize = div_content_box.offsetWidth/12+"px";
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
        prject_selector_canvases[current_project].style.boxShadow = shading_project_button; 
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
        prject_selector_canvases[proj_id].style.boxShadow = no_shading_project_button; 
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
    //check for landscaper/portrait modes
    if (isLandscape) {
        let text_headers = document.getElementsByClassName("subtitle");
        for (let index = 0; index < text_headers.length; index++) {
            text_headers[index].style.color = Portunus;
            text_headers[index].style.fontSize = (project_display_text.offsetHeight/15)+"px";
        }
    } else {
        document.getElementById("subtitle_invisible_portrait").style.visibility="hidden";
        document.getElementById("subtitle_invisible_portrait").style.fontSize="0px";
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
    //do not show subtitle in portrait mode
    if(!isLandscape){ 
        
    }
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
        case "main_cont_in_p":
            max_frames=30;
            step=nav_bar.offsetWidth/max_frames;
            animation_main_container_opening_p();
            break;
         case "main_cont_out_p":
            max_frames=30;
            step=nav_bar.offsetWidth/max_frames;
            animation_main_container_closing_p();
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
                //animation_on=false;
                // keyframe=0;
                // animation_counter=0;
                // max_frames=0;
                // animation=null;
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

        //keyframe 4 (not needed anymore)
        //set all canvas elements where they should be at the end, store them in memory, exit the animation function
        case 4:
            //set all canvas vars as the "show main container open" vars
            //set the ending for the animation
            //animation_on=false;
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

function animation_main_container_opening_p() {
    switch (keyframe) {
        //nav bar moves left
        case 0:
            //set up the first max frame counter
            //max_frames=40;
            //current frame check
            if (animation_counter<max_frames) {
                //increment animation counter
                animation_counter++;
                //move navbar left
                nav_bar.style.left=nav_bar.offsetLeft-step+'px';
            } else {
                //set up next animation keyframe
                keyframe=1;
                animation_counter=0;
                //max_frames=40;
            }
            break;

        //content container & back button move right
        case 1:
            //current frame check
            if (main_decoration_canvas.offsetLeft+step<0) {
                //increment animation counter
                animation_counter++;
                //move elements right
                main_decoration_canvas.style.left=main_decoration_canvas.offsetLeft+step+'px';
                //back_button.style.left=main_decoration_canvas.offsetLeft+'px';
                back_button_canvas.style.left=main_decoration_canvas.offsetLeft+'px';
            } else {
                //finalize animation
                //move elements right
                main_decoration_canvas.style.left='0px';
                //back_button.style.left='0px';
                back_button_canvas.style.left='0px';
                //set up next animation keyframe
                keyframe=2;
                animation_counter=0;
                max_frames=40;
            }
            break;

        //fade in the content
        case 2:
            //final keyframe
            // animation_on=false;
            keyframe=0;
            // animation_counter=0;
            // max_frames=0;
            // animation=null;
            //call for the fade in of the content
            fade_in_container_content();

        default:
            // animation_on=false;
            // keyframe=0;
            // animation_counter=0;
            // max_frames=0;
            // animation=null;
            break;
    }
}

function animation_main_container_closing_p() {
    switch (keyframe) {
        //change all nav buttons to the default state & fade out the content
        case 0:
            //draw the button decorations as 'initial' (this does not work since the canvas is offscreen while doing it?)
            //so we'll just not change the buttons
            //shold not be an issue on since portrait mode is for phones and tablets anyway
            // for (let index = 0; index < nav_button_decorations.length; index++) {
            //     //draw the decorations
            //     decoration_start_p(nav_button_decorations[index], Venus);
            // }    
            //in order to properly syncronize the fade-out animation and the rest of the movements
            //I will use a variable 'faded' that has 3 states: 0 (not faded), 1 (faded out), 2 (in the process of fading)
            //this way the animation can proceed only after we are done fading out the content
            if (faded==1) {
                //content faded out, proceed to hte next keyframe
                keyframe=1;
                faded=0;
            } else if (faded==0) {
                //set var as 'in the process of fading out'
                faded=2;
                //fade out content
                fade_out_container_content();
            }
            break;

        //move the contianer and back buttons left
        case 1:
            //current frame check
            if (main_decoration_canvas.offsetLeft-step>-1*main_decoration_canvas.offsetWidth) {
                //move elements left
                main_decoration_canvas.style.left=main_decoration_canvas.offsetLeft-step+'px';
                //back_button.style.left=main_decoration_canvas.offsetLeft+'px';
                back_button_canvas.style.left=main_decoration_canvas.offsetLeft+'px';
            } else {
                //finalize animation
                //move elements right
                main_decoration_canvas.style.left=-1*main_decoration_canvas.offsetWidth+'px';
                //back_button.style.left='0px';
                back_button_canvas.style.left=main_decoration_canvas.offsetLeft+'px';
                //set up next animation keyframe
                keyframe=2;
                animation_counter=0;
                max_frames=40;
            }
            break;

        //nav bar moves right
        case 2:
            //check current navbar position
            if (nav_bar.offsetLeft+step<0) {
                //move navbar left
                nav_bar.style.left=nav_bar.offsetLeft+step+'px';
            } else {
                nav_bar.style.left='0px';
                //set up next animation keyframe
                keyframe=3;
            }
            break;

        //fade in the content
        case 3:
            //final keyframe
            animation_on=false;
            keyframe=0;
            animation_counter=0;
            max_frames=0;
            animation=null;

        default:
            animation_on=false;
            keyframe=0;
            animation_counter=0;
            max_frames=0;
            animation=null;
            break;
    }
}

