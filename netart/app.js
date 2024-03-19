window.addEventListener('load', () => {
    console.log('page is loaded');

  }) //end
  
  //p5.js sketch beloww

let typecanvas;
//made the buttons and images into arrays so it doesnt get repetitive:
let buttons = [];
let images = [];
let buttonNo = 9; // total no. of buttons

function preload() {
    // preload images before the sketch
    // saved the images in the folder numbered so they r easier to find in the code
    for (let i = 0; i < buttonNo; i++) {
        images[i] = loadImage("images/type" + i + ".PNG");
    }
}

function setup() {
    //make the buttons from the class, place the canvas in the right div
    typecanvas = createCanvas(1000, 400);
    typecanvas.parent("types");

    for (let i = 0; i < buttonNo; i++) {
        let x = random(70, width - 70);
        let y = random(70, height - 70);
        let bsize = 140;
        buttons[i] = new Button(x, y, bsize, images[i], getType(i));
    }
}

function mousePressed() {
    // calls the clicked function for each button, checks if the mouse has clicked on the button
    for (let i = 0; i < buttonNo; i++) {
        buttons[i].clicked(mouseX, mouseY);
    }
}

function draw() {
    background(0, 0, 0);
    //calling in each button's show and edge functions
    for (let i = 0; i < buttonNo; i++) {
        buttons[i].show();
        buttons[i].edge();
    }
}

function getType(index) {
    // match the types of activities (from the api) to the correct button number
    switch (index) {
        case 0:
            return "recreational";
        case 1:
            return "education";
        case 2:
            return "social";
        case 3:
            return "diy";
        case 4:
            return "charity";
        case 5:
            return "cooking";
        case 6:
            return "relaxation";
        case 7:
            return "music";
        case 8:
            return "busywork";
        default:
            return ""; // error prevention
    }
}

//button class:
class Button {
    constructor(x, y, bsize, pic, type) {
        this.x = x;
        this.y = y;
        this.bsize = bsize; //button size
        this.speedx = random(-4, 4);
        this.speedy = random(-4, 4);
        this.pic = pic;
        this.type = type;
    }

    clicked(px, py) {
        let d = dist(px, py, this.x, this.y);
        //radius is 70
        if (d < 70) {
            //button gets a random speed every time you click on it
            this.speedx = random(-2, 5);
            this.speedy = random(-2, 5);
            // gets the url for each type from the api, depends on which type u have clicked
            let url = "https://www.boredapi.com/api/activity?type=" + this.type;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    let nameelement = select('#activity-name') // selects the html element for the text
                    nameelement.html(data.activity); 
                    //activity suggestion from boredAPI displays in the html
                })
            //sound effect:
            let bling = document.getElementById("bling");
            bling.currentTime = 0; // resets the audio to the beginning so it plays every time u click
            bling.play();
        }
    }

    show() {
        // image bounces around on screen
        imageMode(CENTER);
        this.x += this.speedx;
        this.y += this.speedy;
        image(this.pic, this.x, this.y, this.bsize, this.bsize);
    }

    edge() {
        // bounces off the edges of the canvas
        if (this.x <= 70 || this.x >= width - 70) {
            this.speedx = -this.speedx;
        }
        if (this.y <= 70 || this.y >= height - 70) {
            this.speedy = -this.speedy;
        }
    }
}

  
  // link to api https://www.boredapi.com/
