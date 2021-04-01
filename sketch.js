const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const cons = Matter.Constraint;
var bgimg, bg
var gameState = "onSling"
var fired;
var engine, world;
var box1, pig1;
window.score
var endCounter
var star1, star2, star3;
var star1Y, star2Y, star3Y;
var overlay, overlaySize
function preload() {

    getBackgroundImage()
    star1 = loadImage("sprites/star1.png")
    star2 = loadImage("sprites/star2.png")
    star3 = loadImage("sprites/star3.png")
    overlay = loadImage("sprites/overlay.png")
}

function setup() {
    var canvas = createCanvas(1200, 400);
    engine = Engine.create();
    world = engine.world;
    window.score = 0
    fired = false
    ground = new Ground(600, height, 1200, 20)
    platform = new Ground(150, 305, 300, 170)

    box1 = new Box(700, 320, 70, 70);
    box2 = new Box(920, 320, 70, 70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810, 260, 300, PI / 2);

    glass1 = new IceBox(700, 240, 50, 50);
    glass2 = new IceBox(920, 240, 50, 50);
    glass3 = new IceBox(700, 240, 50, 50);
    glass4 = new IceBox(920, 240, 50, 50);
    pig3 = new Pig(810, 220);

    log3 = new Log(810, 180, 230, PI / 2);

    box5 = new Box(810, 160, 70, 70);
    log4 = new Log(760, 120, 150, PI / 7);
    log5 = new Log(870, 120, 150, -PI / 7);

    bird = new Bird(200, 50);
    s = new Slingshot(bird.body, { x: 200, y: 50 })
    star1Y = 1000
    star2Y = 1000
    star3Y = 1000
    endCounter = 0
    overlaySize = 1
}

function draw() {

    if (bg) {
        // imageMode(CORNER)
        background(bg);
    }
    textSize(35);
    stroke("black");
    text("SCORE: " + window.score, 950, 50);

    if (mouseIsPressed) {
        if (mouseX >= 0 && fired === false && mouseX <= 200) {
            Matter.Body.setPosition(bird.body, { x: mouseX, y: mouseY });
        }
        if (mouseX > 200) {
            Matter.Body.setPosition(bird.body, { x: 200, y: 50 })
        }
    }
    if (bird.body.velocity.x > 30) {
        Matter.Body.applyForce(bird.body, bird.body.position, { x: (bird.body.velocity.x) * -1, y: 0 });
    }
    if (bird.body.velocity.y > 15) {
        Matter.Body.applyForce(bird.body, bird.body.position, { x: 0, y: (bird.body.velocity.x) * -1 });
    }

    Engine.update(engine);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();
    platform.display();

    glass1.display()
    glass2.display()
    glass3.display()
    glass4.display()
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    s.display()


    //To change gamestate to over first
    if (bird.body.speed < 0.4 && gameState === "release") {
        endCounter++
        if (endCounter === 200) {
            gameState = "over";
        }
    }

    //To draw the overlay 
    if (gameState === "over") {
        if (overlaySize < 100) {
            overlaySize++;
        }
        image(overlay, 600 - overlaySize * 6, 200 - overlaySize * 2, overlaySize * 12, overlaySize * 4);
    }

    //To draw stars
    image(star1, 475, star1Y, 100, 100);
    image(star2, 600, star2Y, 120, 120);
    image(star3, 725, star3Y, 100, 100);

    if (gameState === "over") {
        if (window.score >= 0 && star1Y > 150) {
            star1Y -= 6;
        }

        if (window.score >= 200 && star2Y > 130) {
            star2Y -= 5;
        }

        if (window.score >= 500 && star3Y > 150) {
            star3Y -= 5.5;
        }
    }


}

function mouseDragged() {
    if (gameState === "onSling") {
        Matter.Body.setPosition(bird.body, { x: mouseX, y: mouseY })
    }
}
function mouseReleased() {
    if (fired === false) {
        s.fly()
        gameState = "release"
        fired = true
    }
}

function keyPressed() {
    if (keyCode === 32) {
        Matter.Body.setPosition(bird.body, { x: 200, y: 50 })
        s.attach(bird.body)
        gameState = "onSling"
        fired = false
        bird.path = []

    }
}
function getBackgroundImage() {
    //   var  api_response =await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
    //   var api_responseJSON =await api_response.json()
    //   console.log(new Date().getHours())
    //   var time =  api_responseJSON.datetime
    //   var d1 = time.slice(11,13)
    var d1 = (new Date().getHours())
    console.log(d1)
    if (d1 >= 5 && d1 <= 18) {
        bgImg = "sprites/halloween.png"
    }
    else {
        bgImg = "sprites/bg.png"
    }
    bg = loadImage(bgImg)
}

