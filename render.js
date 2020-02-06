let particles = [];
let distThreshold = 120;
let r, g,  b, a;
let speed = 4;
let input, button;
let showFields = false;
let particlesLength;

function setup()
{
	r = random(0, 120);
	g = random(0, 120);
	b = random(0, 120);
	a = 255 / 2;
	console.log(r, g, b);
	createCanvas(window.innerWidth, window.innerHeight);
	input = createInput();
	input2 = createInput();
	input3 = createInput();
	input.position(window.innerWidth / 2, window.innerHeight / 2);
	input2.position(window.innerWidth / 2, input.y + input.height);
	input3.position(window.innerWidth / 2, input2.y + input2.height)
	button = createButton("update");
	button.position(input.x + input.width, input.y);
	button.mousePressed(updateValues);
	particlesLength = 100; //Math.floor(window.innerWidth / 10);

	for(let i = 0; i < particlesLength; i++)
	{
		particles.push(new Particle());
	}
}

function draw()
{
	if(!showFields)
	{
		input.hide();
		input2.hide();
		input3.hide();
		button.hide();
	}
	else
	{
		input.show();
		input2.show();
		input3.show();
		button.show();
	}
	background(0, 0, 0);
	particles.forEach((p, index) => 
	{
		p.render();
		p.update();
		p.checkParticles(particles.slice(index));
	});
}

function updateValues()
{
	speed = input.value();
	particles = [];
	particlesLength = input2.value();
	distThreshold = input3.value();
	
	for(let i = 0; i < particlesLength; i++)
	{
		particles.push(new Particle());
	}

	showFields = false;

	console.log('Updated speed to ' + speed);
}

function keyPressed()
{
	if (key == 'a')
	{
		showFields = !showFields;
	}
}

class Particle
{
	constructor()
	{
		this.pos = createVector(random(width), random(height));
		this.vel = createVector(random(-speed, speed), random(-speed, speed));
		this.size = 5;
	}

	render()
	{
		noStroke();
		//fill('rgba(255,255,255,0.7)');
		fill(r, g, b, 192);
		circle(this.pos.x, this.pos.y, this.size);
	}

	update()
	{
		this.pos.add(this.vel);
		this.edges();
	}

	edges()
	{
		if(this.pos.x < 0 || this.pos.x > width)
		{
			this.vel.x *= -1;
		}

		if(this.pos.y < 0 || this.pos.y > height)
		{
			this.vel.y *= -1
		}
	}

	checkParticles(particles)
	{
		particles.forEach(particle => 
		{
			const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

			if(d < distThreshold)
			{
				//stroke('rgba(255, 255, 255, 0.3)');
				stroke(r, g, b, 128);
				line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
			}
		});
	}
}
