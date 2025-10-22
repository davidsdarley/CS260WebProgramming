I keep my notes mostly on google drive. To actually see all of them, visit https://docs.google.com/document/d/1uiYrT9PAHq5OUrhJSmd9sQ0cQDH7Bs0E-IW7nSdza8E/edit?usp=sharing


TEMPORARY NOTES

#NOTES
9/3

We’re going to do a lot of assignments in class, so that’s pretty dang convenient.

Most of this class is creative projects. We will also probably be working with other students a fair bit for the projects. 


CLASS GOALS
Front end and back end web development skills
HWML, CSS, Javascript, React, Node.js, Mongo
Active learning, actually make stuff
I wanna make a web application

Learning web programming
Most books are out of date the day they are printed.
Most searches return pages that try to get you to pay money
Don’t use them. The best information is usually free
There is a skill of finding good resources
THE BEST SKILL you can develop here is how to learn new things.
If something seems intriguing, go check it out

It is entirely likely that we will learn a whole new technology every week. 

Imma definitely learn Javascript. That’s probably a good thing

Apparently, different browsers can make a difference in what we program. So, we’re going to primarily use Chrome. Just for standardization. That really won’t really affect me since I pretty much only use Chrome, but yeah.


Bootstrap for CSS: Makes it really hard to do bad things, thus incentivizing doing good stuff.

Grading
Exams 20%: Before the exam, Professor Clement will give us all of the questions. We can literally study, but doing the test beforehand. 

Assignments 20%: self evaluation. Consist mostly of experimentation stuff. All assignments must be our own work, though we can study and collaborate with other students. Bet when it comes time to create your actual source code, you must work alone. No copying work, and no letting others copy off of you.

Projects 60%: The startup projects are big. Do good on these. We’ll be basically making our own startup website. Gonna be cool.

Late work has 10% deducted per day after the due date.


Web developing
HTML, CSS, and JavaScript/React are the main frontend tools. We’re going to mostly be using React.

Server/Route53, HTTP/WebSocket, Webservices, and DB/Authentication are important backend stuff we’re going to work with. 

We’re probably going to use VS code. I can do that. 

We’re also going to use Node.js Webservices.

Startup project:
Ideas
Game
news
peer chat
recipes
Scripture study app
Weather
Fitness tracking
KoY stuff
Dnd encounter tracker/spellbook or something like that
Some kind of Stormlight RPG thing
Skill tree tracker
Character sheet
level up manager

OK, so I’m not entirely sure what it is that I want to make happen here. So, we’re going to need to read through it and thing about what’s going to be hard to keep track of. 

Being able to quickly reference your abilities could be nice. I could do the skill tree manager and make it for each of the heroic paths, and then also the radiant paths. 

If I tried to make basically a DnD beyond but for stormlight, that would be a LOT of work. Like, SO MUCH WORK.

Getting the actual code to just keep track of the data wouldn’t be terribly difficult, but I don’t know most of the things that will make it doable in a pretty graphical user interface. That will probably be the hard part.

Goals:
Primary
Display basic character info
stats
skills
talents
equipment
equipped/dequipped
prioritized IN THAT ORDER
You can access your character sheet from anywhere. 
Assist in Character Creation
calculate numbers based on stats and tiers of experience
Don’t permit them to break rules in character creation.
Secondary
Display skill trees
display full descriptions in sidebar when you click on them

Front end:
Most things
Back end:
Logging in
Your stored character sheet
Contact us suggestion stuff


9/10
IP: Host to host connectivity   4 bytes
TCP: App to app connectivity	   2 bytes
HTTP: Hypertext transfer protocol   a set of protocols for communication
Ethernet:    6 byte address. More addresses than atoms on the planet. 

DNS: I dunno what it is I showed up a bit too late for that.
I think they’re the ones who manage the domain names and IP addresses I think 
When you type http://byu.edu, your device connects to DNS and asks for the IP address associated with the domain name, byu.edu, which DNS sends back. Then your device can send a request through the internet to that IP address, accessing the BYU server. Awesome.

So, how do you get a domain name?
go here https://us-east-1.console.aws.amazon.com/route53/v2/home#Dashboard
In the Register domain thing, put in your name


My key pair name:
startupKeyPair.pem

9/15 - HTML
html is a markup language. My computer can process and render it natively.

9/22
HTML startup assignment:
Got to get Simon up
Should have
index place
2 or 3 other pages
link to github in each footer
Try to have  placeholder for each of the technologies that your application uses.

Responsive design
When you develop a website, your first priority should usually be making it good for mobile, as most things are accessed by mobile devices nowadays. However, you often want it to be both. So, responsive design is the idea of figuring out how to make it adaptable to different screen sizes
I can’t possibly write it down fast enough, so here’s a link to the info again:
https://github.com/webprogramming260/.github/blob/main/profile/css/responsive/responsive.md

CSS frameworks
like libraries, but for css styling.
use Bootstrap. Apparently it’s the best.
Frameworks constrain you in CSS, so that you’re only allowed to do things that look good.
Provides parameters like the stuff we make on our houdini and unreal tools. 


JavaScript Basics
a JavaScript interpreter is natively built into every browser in the world. ie., your application can run on any browser anywhere. 

Some basics
Java script is an untyped language


9/29
React: It’s very very good.

10/1
Simon React: Phase 1

vite commands

Command
Purpose
dev
Bundles a debugging version of the React application and starts Vite's hot reloading HTTP server the hosts the newly bundled application for development purposes.
build
Bundles a production version of the React application and copies it to the dist directory.
preview
Bundles a production version of the React application and starts Vite's hot reloading HTTP server. This is used to test a production version before deployment.


10/20









#USEFUL COMMANDS#

ssh -i Downloads/startupKeyPair.pem ubuntu@52.6.161.219

elastic IP: 52.6.161.219


Basic commands
echo - Output the parameters of the command
cd - Change directory
mkdir - Make directory
rmdir - Remove directory
rm - Remove file(s)
mv - Move file(s)
cp - Copy files
ls - List files
curl - Command line client URL browser
grep - Regular expression search
find - Find files
top - View running processes with CPU and memory usage
df - View disk statistics
cat - Output the contents of a file
less - Interactively output the contents of a file
wc - Count the words in a file
ps - View the currently running processes
kill - Kill a currently running process
sudo - Execute a command as a super user (admin)
ssh - Create a secure shell on a remote computer
scp - Securely copy files to a remote computer
history - Show the history of commands
ping - Check if a website is up
tracert - Trace the connections to a website
dig - Show the DNS information for a domain
man - Look up a command in the manual
You can also chain the input and output of commands using special characters

| - Take the output from the command on the left and pipe, or pass, it to the command on the right
> - Redirect output to a file. Overwrites the file if it exists
>> - Redirect output to a file. Appends if the file exists
Deployment command
 ./deployFiles.sh -k /Users/daviddarley/Downloads/startupKeyPair.pem -h davidsdarley.com -s startup

./deployReact.sh -k /Users/daviddarley/Downloads/startupKeyPair.pem -h davidsdarley.com -s startup

./deployReact.sh -k /Users/daviddarley/Downloads/startupKeyPair.pem -h davidsdarley.com -s simon


deployfile.sh -k /Users/daviddarley/Downloads/keypair.pem -h domainname.comorwhatever -s desiredExtension

How to set up Vite
in the directory you want to convert to React, run the following commands:
npm init -y
npm install vite@latest -D
Open package.json (was created by npm init) find the “scripts” section and change it to look like this:
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
If using git, run this line to avoid committing the library to github
echo "node_modules" >> .gitignore 

Now, you may need to organize the files in the directory into a format vite recognizes. To do that:
Make 2 directories: one named public, the other src
Put all image and sound assets into public
Put the main.css file into src. Rename it to app.css (react like that)
Make a subdirectory in src for every page that is a functional part of your web application

Converting to React-Bootstrap
import the React Bootstrap.
npm install bootstrap react-bootstrap 
Now, you can import it into CSS files like normal
import 'bootstrap/dist/css/bootstrap.min.css';
Enable React
npm install react react-dom react-router-dom




