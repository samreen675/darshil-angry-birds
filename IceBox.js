class IceBox {
  constructor(x, y, width, height) {
    var options = {
      'restitution': 0.8,
      'friction': 1.0,
      'density': 1.0
    }
    this.body = Bodies.rectangle(x, y, width, height, options);
    this.width = width;
    this.height = height;
    this.image = loadImage("sprites/glass.png")
    this.pts = loadImage("sprites/+15.png");
    this.counter = 0;
    this.posX = null
    this.posY = null
    World.add(world, this.body);
  }
  fade() {
    this.counter++;
    if (this.counter === 1) {
      window.score += 15
      this.posX = this.body.position.x
      this.posY = this.body.position.y
    }
    if(this.counter < 20){
      image(this.pts, this.posX,this.posY -(30+ this.counter) , 75,60)
    }
  }

  display() {
    if (this.body.speed < 5) {
      var pos = this.body.position;
      var angle = this.body.angle;
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.image, 0, 0, this.width, this.height);
      pop();
    }
    else {
      World.remove(world, this.body);
      this.fade()
    }
  }
};
