window.addEventListener('load', () => {
    console.log('page is loaded');

  }) //end
  
  //p5.js sketch beloww
  

//   let typecanvas;
  
//   function preload() {
//     // preload images before the sketch
//     type0 = loadImage("images/type0.PNG");
//     type1 = loadImage("images/type1.PNG");
//     type2 = loadImage("images/type2.PNG");
//     type3 = loadImage("images/type3.PNG");
//     type4 = loadImage("images/type4.PNG");
//     type5 = loadImage("images/type5.PNG");
//     type6 = loadImage("images/type6.PNG");
//     type7 = loadImage("images/type7.PNG");
//     type8 = loadImage("images/type8.PNG");
//   }
  
//   function setup() {
//     //make the buttons from the class, place the canvas in the right div
//     typecanvas = createCanvas(1000, 400);
//     typecanvas.parent("types");
  
//     let x = random(70, width - 70);
//     let y = random(70, height - 70);
//     let bsize = 140;
//     button0 = new Button(x, y, bsize, type0, "recreational");
//     button1 = new Button(x, y, bsize, type1, "education");
//     button2 = new Button(x, y, bsize, type2, "social");
//     button3 = new Button(x, y, bsize, type3, "diy");
//     button4 = new Button(x, y, bsize, type4, "charity");
//     button5 = new Button(x, y, bsize, type5, "cooking");
//     button6 = new Button(x, y, bsize, type6, "relaxation");
//     button7 = new Button(x, y, bsize, type7, "music");
//     button8 = new Button(x, y, bsize, type8, "busywork");
//   }
  
//   function mousePressed() {
//     // calls the clicked function for each button, checks if the mouse has clicked on the button
//     button0.clicked(mouseX, mouseY);
//     button1.clicked(mouseX, mouseY);
//     button2.clicked(mouseX, mouseY);
//     button3.clicked(mouseX, mouseY);
//     button4.clicked(mouseX, mouseY);
//     button5.clicked(mouseX, mouseY);
//     button6.clicked(mouseX, mouseY);
//     button7.clicked(mouseX, mouseY);
//     button8.clicked(mouseX, mouseY);

//   }
  
//   function draw() {
//     background(255, 243, 199);
//     //calling in each button's show and edge functions, 
//     // next time i should put all this into an array..
//     button0.show();
//     button0.edge();
//     button1.show();
//     button1.edge();
//     button2.show();
//     button2.edge();
//     button3.show();
//     button3.edge();
//     button4.show();
//     button4.edge();
//     button5.show();
//     button5.edge();
//     button6.show();
//     button6.edge();
//     button7.show();
//     button7.edge();
//     button8.show();
//     button8.edge();
//   }
  
//   //button class:
//   class Button {
//     constructor(x, y, bsize, pic, type) { // type and image is specified when i make the object in setup
//       this.x = x;
//       this.y = y;
//       this.bsize = bsize; //button size
//       this.speedx = random(-4, 4);
//       this.speedy = random(-4, 4);
//       this.pic = pic;
//       this.type = type;
//     }
  
//     clicked(px, py) {
//       let d = dist(px, py, this.x, this.y);
//       //radius is 70 
//       if (d < 70) {
//         //button gets a random speed every time you click on it
//         this.speedx = random(-4, 4);
//         this.speedy = random(-4, 4);
//         // gets the url for each type
//         let url = "https://www.boredapi.com/api/activity?type=" + this.type;
//         fetch(url)
//           .then(response => response.json())
//           .then(data => {
//             let nameelement = select('#activity-name')
//             nameelement.html(data.activity);
//             //activity suggestion displays in the html , sound plays
//           })
//          // //audio effect:
//         let bling = document.getElementById("bling");
//         bling.play();
//       }
//     }
  
//     show() {
//       // image bounces around on screen
//       imageMode(CENTER);
//       this.x += this.speedx;
//       this.y += this.speedy;
//       image(this.pic, this.x, this.y, this.bsize, this.bsize);
//     }
  
//     edge() {
//       // bounces off the edges
//       if (this.x <= 70 || this.x >= width - 70) {
//         this.speedx = -this.speedx;
//       }
//       if (this.y <= 70 || this.y >= height - 70) {
//         this.speedy = -this.speedy;
//       }
//     }
//   }

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
                    let nameelement = select('#activity-name')
                    nameelement.html(data.activity);
                    //activity suggestion displays in the html , sound plays
                })
            // //audio effect:
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