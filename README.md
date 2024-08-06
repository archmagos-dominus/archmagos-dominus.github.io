# Portfolio @ archmagos-dominus.github.io
### TL;DR 

**Showcasing website – used to show off some of my personal projects that I could be bothered to transcode into web JS.**


### Project overview
The idea behind this website is to serve as nothing more than a portfolio: a place where give users a way to test drive the code that goes into my projects before they decide to spend their time downloading all the necessary files, setting up the correct enviromnent and making sure to follow the guides that I have provided on using the software I provided, giving them the oportunity to check whether or not my applications area the solutions they are looking for. 

A secondary objective is to give third parties interested in working with me in an academic, professional or casual manner a quick and easy way to gauge my current skillset and my abillity to provide a complete working solution to a solution that they would otherwise be unfamiliar with. Let us discuss, then, the following topics concerning this particular project taken in isolation from it’s purposes defined above, by exploring it’s design choices, the implementation chosen to bring those choices to reality and the lessons I have learned from working on this website.

### Project design
Like most of my projects, the most important part is it’s ability to be understood by anyone currently active in the many domains of programming (in this case, static web programming, to be precise). The use of the most basic of components and client side algorithms is in part forced by gihub’s policies regarding it’s website hosting, allowing only static websites without much server-side functionality availible, and also due to the simple nature of the task this project was made to complete. 

As such, I have chosen to rely on the most common of components to ensure inter-compatibility between different systems and web browsers, building this website from the ground up with a goal of using no bloated external libraries or packages except for what is supplied already by the web browser itself; the `canvas` API was deemed the correct choice in handling the static design and the animations that I first envisioned, even though there are far better alternatives in terms of both speed, and ease of use, since it was deemed the most common way way of reaching the desired end result. The added benefit of said API being well understood by most programmers in this field, especially beginners was, of course, not at all lost on me. 

While further work is still required to make every design choice as clear as possible in both idea and implementation, I believe I have managed to create an easy to follow example on what a portfolio site might look like beneath the hood. As for the visual design, I tried basing it on a Roman theme, since I was, at the time, impressed with the capacity of Paradox Interactive to create an ‘ancient’ looking menu for their “Imperator” game. Of course, while I do like my design and I do believe it is fitting of me, I must confess that visual design was never my true forte, and as such, I must ask that those of you with a better understanding of design features be kind to my attempt; I am after all, a programmer, not a designer, although I am more that willing to accept any criticism as one can never have a wide enough understanding of this field.

### Implementation 
As stated above, the bread and butter of this whole project is mostly concerned with creating the website client side using the `canvas` API to make sure both the proportions of the objects displayed as well as the animations in between their respective states look exactly how I want them, and not be limited by browser interpretation of the code. 

For this purpose the whole website is created on initialization, taking into account the ratio and the size of the screen to make sure everything is set up properly; while I have seen people argue that the browser led relativistic approach is easier to implement and faster to execute, in my testing, on all modern systems (including phones and Raspberry Pis) the difference in performance was marginal at best, and certainly not large enough to warrant the reassessment of my more ‘absolute’ principle that I have applied in controlling the size and position of the elements. 

The development was done however, in bits and pieces, all the while working on other projects in parallel, so, while I will try to make it as efficient and debloated as possible in a subsequent refactoring (I’ll change this when it happens), there might be a few things that can be made far better than what my original idea was. 

I will accept any input on the quality of the code provided, but only if the solution offered is in line with the design guidelines stated above. 

The idea behind the page is quite simple: 3 main buttons leading to the following categories: 
- A quick presentation detailing my most important principles
- A collection of summaries on my most comprehensive projects, alongside links to web demos of said projects
- A link tree noting my presence on social media as a programmer, and various ways for people to reach me

The page must also offer the functionality of light/dark mode (`LUX`/`NOX`) which I think is a must considering the colour choices, made to evoke an ancient feeling, might not be to everyone’s taste. (Your loss, hehe)

The page must also display properly and in an ergonomic manner on all screens, including those dreaded portrait ones of mobile devices. Towards this goal, a different set of design and animation parameters will have to be used, as the landscape version would be very challenging to use on a phone’s screen. 

### Planned features and known bugs
As it was understood from the text above, this is not the final version, and there are still a few key components missing, as well as some possible bugs that may still plague the current version. Here’s a quick list of both:
- [ ] assign a delicate shading effect on the links, making them more visible in both LUX and NOX modes
- [ ] create the portrait mode design and functionality
- [ ] BUG: shading issues with projects buttons
- [x] BUG: images in the contact are not displayed immediately – currently explored solution: loading the images at the start and then assigning them from memory
- [ ] BUG: in certain fringe cases either the selection bugs out or the animation is never considered ’finished’
- [ ] REDO: rewrite the about text to better fulfill it’s purpose
- [ ] create the demonstration pages for the projects selected

If you’ve reached this far, it means you were really interested in this project. To further help you understand the entire process that created it, I have attached an abridged version of my dev diary.

##### DEV DIARY (kinda)
```
Rebuild site as follows:
	+ main theme of the site should be ancient roman/greek influences instead of the boring drab minimalist shit of today
	+ use the files stored in TODOs to get a feel for the theme
	+ make sure all dates are in AUC
	+ offer dark mode (use the colour scheme of the last website then) lux/nox

Colours:
	- Sol Blue: 53,58,54 -> 86,99,92 -> 129,169,161
	- Juno light: 228,225,217
	- Vesta dark: 214,209,195
	- Mars red: 118,41,40
	- Ulthor red: 148,49,24
	- Mercury gold: 242,204,112
	- Neptune blue: 56,131,133
	- Vulcan plumbum: 60,60,60
	- Venus white: 218,228,228
	- Pontus blue: 15,158,224
	- Pluto black: 30,30,30
	- Jupiter marble

Choose Text Sizes:
	+nav button
	+project button
	+main paragraph
	+main title
	+contact links?

General:
	-make sure all sizes and positions are RELATIVE to the screen height/width
	-create a separate algorithm to deal with Portrait mode
	+ make sure animations are properly synchronized 
	- make sure text is fully readable on all screens (even phone/tablet)
	+ create a dark mode button
		+ NOX (moon icon) /lux (sun icon)
		+ make sure all colours are given through the js script
		+ use full range of colours when light mode is on, use the colours for the old website for the dark mode

- [x] Casa Blue background -> full screen
	- [x] changed to Vesta->Juno gradient
- [x] True background (colour is Juno light) -> 1%width, 2%height less on every side, sitting centered 
	- [x] add noise to it
	- [x] add a shadow  to it to make it look more convincing
- [x] Main Buttons
	- [x] create the div that houses them; div should be as wide as the screen is tall (for LANDSCAPE)
	- [x] Colour is Neptune blue (turquoise)/ text is Venus white
	- [x] they have decorations around them (more pronounced on the sides) (Venus white (circles and squares are tinted randomly))
		- [x] colour them properly
		- [x] add a darker colour for the bars and arrows
		- [x] add bump/shading of marble on the button background
	- [x] text should fit neatly on any resolution (Venus white)
		- [x] Trajan font
		- [x] give separate ids to all texts and make sure to set them to the right colour (Venus unselected; Vulcan selected)
	- [x] they will leave a small shadow on the background (element 1)
	- [x] while hover, background becomes a lighter shade of Neptune blue
	- [x] while clicked, background colour changes to Venus white/text changes to Vulcan plumbum
	- [x] while selected colour is Marble White/text is Vulcan plumbum/decorations change to Vesta dark
	- [x] add a shading rect under the buttons
	- [x] Distance between them and the edges is the same ( 4 parts); button size will be the same (3 parts); 1/10 width of parent for the distance, 1/5 width of parent for the button width (SUBJECT TO CHANGE LATER IF NECESSARY)
	- [x] figure out if transparent or Maribel
	- [x] create a draw_base and draw_selected function for the nav buttons
		- [x] instead of calling out the entire function just call those two (even at init)
	- [x] create a LUX/NOX button to switch themes
		- [x] finish button canvas
			- [x] redo the shapes/colours better
		- [x] finish button listener
			- [x] when container is opened and the toggle button is clicked, the button colours do not change <- FIX
	- [x] set up the decoration canvas
	- [x] when button is clicked:
		- [x] create and enlarge the rhombus
		- [x] divide into two triangles
		- [x] move all to the sides
		- [x] create a ribbon between the triangles
		- [x] only draw the ribbon when the difference between the coords is positive
		- [x] duplicate ribbon and divide the current shapes in two parts
		- [x] create the coords for the decorations
		- [x] calculate the Y step
		- [x] take each part to the top/bottom
		- [x] REDESIGN (Keyframe 2 is where we left off)
		- [x] fix the shape of the decorations
		- [x] fix the travel direction of the decorations and their position
		- [x]  move the buttons to their proper top position
		- [x] while the ribbons are going up, slowly fade in the decorations
		- [x] create the columns and show them as the things go vertically
		- [x] finish column shapes
		- [x] finish column pillars and animate them properly
		- [x] add the whole "selected container" to the show opened function.
		- [x] BUG: some lines look wonky sometimes, maybe convert them to square shapes instead? Or fix it
		- [x] BUG: where the \*\*\*\* is that bottom line drawn lmao?
		- [x] create the container (a square with decorations on the side (low alpha, lines drawn in diff colours ))
		- [x] give all the elements their proper colours
		- [x] when onLoad/onResize, calculate the initial points for the animation (checking if the main container is open or not)
		- [x] resize canvas and other containers on resize too
		- [x] make sure that their colours change properly when the lux/nox button is clicked
		- [x] when onLoad(), calculate size of items and then colours and draw, when onResize() calc only the size and position and redraw, on colour change, change the colours and redraw
		- [x] reverse animation for the click again
		- [x] BUG: nav buttons positions are wonky
		- [x] BUG: fade out is wonky for the container
		- [x] animation timing fixes
		- [x] EVERYTHING ONWARDS IS OPTIONAL ONLY
		- [x] create the colours for all the elements as well
		- [x] decide on whether or not to use local or global vars
		- [x] shading rect goes beneath the button
		- [x] move all of them up to the top  (they will take 10%-20% of the height)
		- [x] fade in a small rhombus outline coloured Vulcan plumbum with a small solid plumbum rhombus inside
		- [x] this divides in half, and one goes to one side of the screen while to other does the opposite
		- [x] as they go, between them they create a Mars red ribbon
		- [x] when they reach the end, the ribbon starts to show a decoration (Ulthor red)
		- [x] the ribbon doubles, one remains down, the other goes up with left rhombus until they reach the top
		- [x] when they do, the top part shows a decoration on top of the ribbon (a temple roof and a bunch of olive branches) while the bottom shows some Romano-Corinthian styled decorations on the bottom (all those decorations come out of the ribbon in the same colour as the ribbon (Mars/Ulthor))
		- [x] as they go up, extend a minimalist column on each side
		- [x] calculate final column pos
		- [x] fix bottom of collumns
		- [x] calculate final container pos
		- [x] container fade in/out timing reduced?
		- [x] fade out for the base and decoration is still wonky
		- [x] we need to clear the canvas too when fading it out otherwise it's not gonna be visible
		- [x] fix button listeners: when button is clicked and the animation hasn't finished yet, something wonky happens
		- [x] define contents
		- [x] when button is clicked, set the right contents
		- [x] if buttons clicked, fade in the content after anim
		- [x] figure out how to fade in the content properly
		- [x] create the container div and calculate it's sizes and positions across the board
			- [x] animation in (add call to fade in function)
			- [x] animation out  (plus call to fade out function)
			- [x] show (add call to show content function)
		- [x] fade in function
		- [x] fade out function
		- [x] show function
			- [x] size up the container properly
		- [x] add the logic handling which container is selected -> ???
		- [x] do the switch between contents properly <- important
			- [x] BUG: HAS A SMALL BLEP
			- [x] when switching, make all buttons unclickable until we are done lmfao; Kinda done???
- [x] Create the about container
	- [x] remove lines
	- [x] center text vertically and horizontally  (both for anim in/out and show)
	- [x] assign text colour
	- [x] assign link colour (and maybe bold them)
	- [x] link hover style
	- [x] text size dependent on container size (both for anim in/out and show)
	- [x] assign shade on link hover?
	- [x] rewrite the about text
		- [x] Hey there. I'm interested in writing free, open source and efficient software that anyone can find both easy to use and friendly to tinker with. On the PROJECTS tab, you can find a few web demos of my more extensive projects, and you can find the rest on my various other pages, reachable from the CONTACT tab. If you're a beginner in programming, do not be overwhelmed by the apparent complexity of some of the projects: they were all written with people like you in mind, making sure to comment and deobfuscate most lines of code even if it might be a slight disadvantage to actual code review. I don't have a favourite or preferred coding language, although most projects you'll see here are written in JavaScript to facilitate a beginner friendly aura, given the fact that JavaScript is usually considered the easiest and most forgiving language for any programmer starting out, as well as to facilitate both distribution (all devices have a web browser that can run the code, regardless of installed software and libraries, operating system or processor architecture) and get to use the built in browser capabilities, especially when it comes to user interface handling. On my github profile you might find projects written in Python, Java, or even scripting languages like Bash, and they will be just as thoroughly documented as the JavaScript ones. If you have any questions, bug reports, requests of taking part in your own projects or simply just wish to chat about anything that has to do computers don't hesitate to shoot me an email or a discord message. Thanks for checking my portfolio out!
- [x] create the contact container
	- [x] redraw the discord, email, github, **ich.io** and hugginface logos using the right colours
		- [x] make ichio account
		- [x] https://leonisius.itch.io/
	- [x] use the right images at init
	- [x] change images when toggle LUX/NOX mode
	- [x] change images on mouse hover
	- [x] make a new email address for all job/work related stuffs
- [x] Project select area
	- [x] size up the divs properly
		- [x] project selector size and pos
		- [x] size and pos selector canvases
		- [x] size up the selector texts to fit the canvases
		- [x] size up the display canvas
		- [x] size up content text container
		- [x] fix paragraph positioning (also fix it for the info/contact pages too)
		- [x] create the canvas decorations for the buttons
			- [x] style colours (light mode)
			- [x] selected version
		- [x] create the canvas decorations for the display area
			- [x] unselected version
			- [x] selected version
			- [x] background is dictated by the decoration
			- [x] pad content so it fits nicely
			- [x] add shadows beneath the canvases
				- [x] make it slightly smaller than the nav button on
			- [x] figure out a colour scheme for the different text types (subtitle, paragraph, link, etc) -> use the content colours and just add another value for hte subtitle if necessary
			- [x] dark theme selected/unselected button might need work
		- [x] selector function
			- [x] reset back the values of the initial vars after visual testing
			- [x] create teh selector  fucntion
			- [x] change the state of buttons a decorations as the buttons are clicked
	- [x] scroll bars styling
	- [x] on show size up the elements and position them properly (the content of the project does not size up properly)
		- [x] set h and p font size on resize
		- [x] set h and p colours on mode change
	- [x] project content not displayed when resizing
	- [x] first click starts from visible
	- [x] project buttons (blue background, white text and decorations); when clicked (Hera background/Vesta text/decorations)
	- [x] when button is clicked project data is shown
		- [x] it's background is Vesta
		- [x] text colour is Pluto
		- [x] links are Pontus
	- [ ] sometimes the whole selection thing bugs out, see whats' wrong
	- [ ] load images at the start
		- [ ] set src as image object?
	- [ ] shading issue with project buttons
	- [ ] assign a small shading effect on link hover?
	- [ ] create a portrait screen that asks user to change to landscape for now
		- [ ] offer a portrait website ?
```
