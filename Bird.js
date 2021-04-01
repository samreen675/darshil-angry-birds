class Bird {
  constructor(x, y) {
    var options = {
      'restitution': 0.8,
      'friction': 1,
      'density': 1,
      'mass': 5000
    }
    this.body = Bodies.rectangle(x, y, 50, 50, options);
    this.width = 50;
    this.height = 50;
    this.image = loadImage("sprites/bird.png");
    this.i = loadImage("sprites/smoke.png");
    this.path = []

    World.add(world, this.body);
  }
  display() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height);
    pop();
    if (pos.x>200&& this.body.velocity.x>10 && frameCount%2===0 ) {
      var position = [pos.x, pos.y]
      this.path.push(position)
    }
   
    for (let i = 0; i < this.path.length; i++) {
      
      image(this.i,this.path[i][0],this.path[i][1],20,20)
    }
  }
};

