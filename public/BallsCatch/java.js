/* global Matter, height, CENTER, RADIANS, width, mouseX, mouseY, Ball, fixed, Runner, compound, Events, render, body, mouseIsPressed, p5, Cup, CORNER */
var Engine = Matter.Engine,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Render = Matter.Render,
        Body = Matter.Body,
        Events = Matter.Events;

var engine, world;
//var world;
var fensThickness = 8;

var balls = [];
var ballRadius = 10;
var ballId = 1;
var quantityBalls = 60;
var counterBolls = 59;
var valueBalls = 1;

var cups = [];
var cupX = 0;
var cupId = 1;
var quantityCups = 14;
var speed = 1;
var space = 200;

var endScore = 0;
var cupScore = 0;
var scoreBallCup = 0;
var valueCup = 1;
var meter = 10;
var level = 1;

p5.disableFriendlyErrors = true;
function setup() {
    createCanvas(450, 650);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    engine.world.gravity.y = 1.8;
    /* var render = Render.create({
     element: document.body,
     engine: engine,
     options: {
     width: 450,
     height: 650,
     showAngleIndicator: true,
     //wireframes: false,
     background: '#111',
     showCollisions: true,
     showVelocity: true
     }
     });
     Render.run(render);*/
    createBalls();
    fenses();
    createCups();
    collision();
}
var ballPassed = 0;
var ball = 1;
var valueBalls = 1;
var totalScore = 0;
var ballMeter = 0;
var cupsMeter = 20;
var metarLoptica = 10;
function collision() {
    Events.on(engine, 'beforeUpdate', function () {
        for (var i = 0; i < cups.length; i++) {
            Body.translate(cups[i].leftAngle, {x: speed, y: 0});
            Body.translate(cups[i].rightAngle, {x: speed, y: 0});
            Body.translate(cups[i].sensorCup, {x: speed, y: 0});
            Body.translate(cups[i].sensorOut, {x: speed, y: 0});

            if (cups[i].leftAngle.position.x >= (space * quantityCups) - 100) {
                Body.setPosition(cups[i].leftAngle, {x: -100, y: 500});
                Body.setPosition(cups[i].rightAngle, {x: -25, y: 500});
                Body.setPosition(cups[i].sensorCup, {x: -62, y: 470});
                Body.setPosition(cups[i].sensorOut, {x: 38, y: 470});
            }
        }
    });
    Events.on(engine, 'collisionStart', function (event) {
        var pairs = event.pairs;
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            for (var j = 0; j < cups.length; j++) {
                if (pair.bodyB === cups[j].sensorCup) {
                    for (var b = 0; b < balls.length; b++) {
                        if (pair.bodyA.id === balls[b].id) {
                            ballPassed++;
                            ball = valueBalls * cups[j].valueee;

                            if (ballPassed === cupsMeter) {
                                level++;
                                if (cups[j].valueee <= 8) {
                                    cups[j].valueee += 1;
                                }
                                speed += 0.035;
                                cupsMeter += 20;

                                if (cups[j].valueee === 2) {
                                    cups[j].cupColor = color(
                                            'hsla(100, 100%, 50%, 0.25)');//green
                                }
                                if (cups[j].valueee === 3) {
                                    cups[j].cupColor = color(
                                            'hsla(360, 100%, 50%, 0.25)');//red
                                }
                                if (cups[j].valueee === 4) {
                                    cups[j].cupColor = color(
                                            'hsla(196, 100%, 45%, 0.25)');//blue
                                }
                                if (cups[j].valueee === 5) {
                                    cups[j].cupColor = color(
                                            'hsla(16, 100%, 50%,0.2)');//orange
                                }
                                if (cups[j].valueee === 6) {
                                    cups[j].cupColor = color(
                                            'hsla(196, 100%, 45%, 0.25)');//blue
                                }
                                if (cups[j].valueee === 7) {
                                    cups[j].cupColor = color(
                                            'hsla(296, 100%, 20%,0.2)');//purple
                                }
                                if (cups[j].valueee === 8) {
                                    cups[j].cupColor = color(
                                            'hsla(36, 100%, 50%,0.2)');//blue
                                }
                            }
                            ballMeter++;
                            if (ballMeter === 10) {
                                ballMeter = 0;
                                valueBalls += 1;
                            }
                        }
                    }
                    totalScore = totalScore + ball;
                }
                if (pair.bodyB === cups[j].sensorOut) {
                    for (var b = 0; b < balls.length; b++) {
                        if (pair.bodyA.id === balls[b].id) {
                            balls[b].active = false;
                            quantityBalls--;
                            valueBalls = 1;
                            ballMeter = 0;
                        }
                    }
                }
            }
        }
    });
}
function createCups() {
    for (var i = 0; i < quantityCups; i++) {
        var cup = new Cup(cupX, cupId, 1, 'hsla(160, 100%, 100%,0.2)');
        cups.push(cup);
        cupX = cupX - 200;
        cupId++;
    }
}
function createBalls() {
    x = 130;
    y = 110;
    var fixed = false;
    var active = true;
    for (var i = 0; i < quantityBalls; i++) {
        balls.push(new Ball(x, y, ballRadius, ballId, fixed, active));
        if (i < 19) {
            if (i === 9) {
                y = y + 21;
                x = x - 210;
            }
        }
        if (i === 19) {
            fixed = true;
            x = 12;
            y = 32;
        }
        if (i === 23 | i === 31 | i === 39 | i === 47 | i === 55) {
            fixed = true;
            x = x + 240;
        }
        if (i === 27 | i === 35 | i === 43 | i === 51) {
            fixed = true;
            x = x - 408;
            y = y + 21;
        }
        ballId++;
        x = x + 21;
    }
}
function mousePressed() {
    Matter.Body.setPosition(doorLeft, {
        x: 175,
        y: 330
    });
    Matter.Body.setPosition(doorRight, {
        x: 275,
        y: 330
    });
}
function mouseReleased() {
    Matter.Body.setPosition(doorLeft, {
        x: 206,
        y: 330
    });
    Matter.Body.setPosition(doorRight, {
        x: 244,
        y: 330
    });
}
function fenses() {
    var options = {
        isStatic: true
    };
    leftLeft = Bodies.rectangle(16, 116, fensThickness, 200, options);
    leftMid = Bodies.rectangle(112, 81, fensThickness, 130, options);
    rightMid = Bodies.rectangle(340, 81, fensThickness, 130, options);
    rightRight = Bodies.rectangle(436, 116, fensThickness, 200, options);
    topLeft = Bodies.rectangle(64, 16, 104, fensThickness, options);
    topRight = Bodies.rectangle(388, 16, 104, fensThickness, options);
    directiveLeft = Bodies.rectangle(160, -101, fensThickness * 9, 200, options);
    directiveRight = Bodies.rectangle(290, -101, fensThickness * 9, 200, options);
    midLeft = Bodies.rectangle(195, 305, fensThickness * 3, 75, options);
    midRight = Bodies.rectangle(255, 305, fensThickness * 3, 75, options);
    leftLongAngle = Bodies.rectangle(67, 210, 300, fensThickness * 3, {
        isStatic: true,
        angle: 0.47
    });
    rightLongAngle = Bodies.rectangle(382, 210, 300, fensThickness * 3, {
        isStatic: true,
        angle: -0.47
    });
    upperAngleLeft = Bodies.rectangle(198, 80, 60, fensThickness, {
        isStatic: true,
        angle: -Math.PI * 0.12
    });
    upperAngleRight = Bodies.rectangle(252, 80, 60, fensThickness, {
        isStatic: true,
        angle: Math.PI * 0.12
    });
    downAngleLeft = Bodies.rectangle(145, height - 25, 170, fensThickness * 3, {
        isStatic: true,
        angle: -Math.PI * 0.07
    });
    downAngleRight = Bodies.rectangle(305, height - 25, 170, fensThickness * 3, {
        isStatic: true,
        angle: Math.PI * 0.07
    });
    World.add(world,
            [leftLeft, leftMid, rightMid, rightRight, leftLongAngle, rightLongAngle,
                midLeft, midRight, upperAngleLeft, upperAngleRight, downAngleLeft,
                downAngleRight, directiveLeft, directiveRight
            ]);
    doorLeft = Bodies.rectangle(206, 330, 43, fensThickness * 3, options);
    doorRight = Bodies.rectangle(244, 330, 43, fensThickness * 3, options);
    World.add(world, [doorLeft, doorRight]);
}
function drawFens() {

    strokeWeight(0);
    rectMode(CENTER);
    rect(leftLeft.position.x, leftLeft.position.y - 19, fensThickness, 164, 120);
    rect(leftMid.position.x, leftMid.position.y - 4, fensThickness, 130, 120);
    rect(rightMid.position.x, rightMid.position.y - 4, fensThickness, 130, 120);
    rect(rightRight.position.x, rightRight.position.y - 19, fensThickness, 164, 120);
    rect(topLeft.position.x, topLeft.position.y, 104, fensThickness, 120);
    rect(topRight.position.x, topRight.position.y, 104, fensThickness, 120);
    rect(midLeft.position.x + 5, midLeft.position.y - 8, fensThickness, 61, 120);
    rect(midRight.position.x - 5, midRight.position.y - 8, fensThickness, 61, 120);
    rect(doorLeft.position.x + 10, doorLeft.position.y - 5, 36, fensThickness, 120);
    rect(doorRight.position.x - 10, doorRight.position.y - 5, 36, fensThickness, 120);
    //upperMidAngle
    push();
    angleMode(RADIANS);
    rotate(-Math.PI * 0.12);
    rectMode(CENTER);
    rect(157, 147, 60, fensThickness, 120);
    pop();
    push();
    angleMode(RADIANS);
    rotate(Math.PI * 0.12);
    rectMode(CENTER);
    rect(262, -19, 60, fensThickness, 120);
    pop();
    //downLongAngle
    push();
    angleMode(RADIANS);
    rotate(-Math.PI * 0.07);
    rectMode(CENTER);
    rect(7, 633, 170, fensThickness, 120);
    pop();
    push();
    angleMode(RADIANS);
    rotate(Math.PI * 0.07);
    rectMode(CENTER);
    rect(432, 535, 170, fensThickness, 120);
    pop();
    //loongAngle
    push();
    angleMode(RADIANS);
    rotate(0.47);
    rectMode(CENTER);
    rect(197, 150, 212, fensThickness, 120);
    pop();
    push();
    angleMode(RADIANS);
    rotate(-0.47);
    rectMode(CENTER);
    rect(206, 354, 212, fensThickness, 120);
    pop();

//valueBalls
    push();
    rectMode(CORNER);
    rect(165, 35, 120, 20, 120);
    pop();

    push();
    ellipse(225, 35, 31);
    pop();

    push();
    fill(187);
    strokeWeight(0.1);
    ellipse(225, 35, 26);
    pop();

    push();
    fill(187);
    rectMode(CORNER);
    rect(167, 37, 116, 16, 120);
    pop();
    //Meter
    push();
    rectMode(CORNER);
    rect(170, 40, ballMeter * 11, 10, 120);
    pop();
}
function draw() {
    background(187);
    drawFens();
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].circ.position.y >= 670) {
            if (balls[i].active === false) {
                Matter.Composite.remove(world, balls[i].circ);
                Body.setStatic(balls[counterBolls].circ, false);
                balls[counterBolls].circ.friction = 0.03;
                counterBolls--;
            }
            Body.setPosition(balls[i].circ, {x: 225, y: -80});
        }
        balls[i].show();
    }

    for (var i = 0; i < cups.length; i++) {

        push();
        translate(cups[i].leftAngle.position.x, cups[i].leftAngle.position.y);
        fill(cups[i].cupColor);
        quad(-3, -46, 79, -46, 65, 45, 11, 45);
        quad(-1, -36, 77, -36, 76, -26, -5, -26);
        pop();

        push();
        translate(cups[i].leftAngle.position.x, cups[i].leftAngle.position.y);
        fill(cups[i].cupColor);
        ellipse(38, 14, 25);
        textAlign(CENTER);
        textSize(14);
        fill(20);
        text("x" + cups[i].valueee, 38, 18);
        pop();
        cups[i].show();

    }

    push();
    textAlign(CENTER);
    textSize(15);
    fill(100);
    text("Level " + level, 225, 410);
    pop();

    push();
    textAlign(CENTER);
    textSize(38);
    fill(100);
    text(totalScore, 225, 390);
    pop();

    push();
    textAlign(CENTER);
    textSize(12);
    fill("#000000");
    text("x" + valueBalls, 225, 35);
    pop();

    push();
    fill("#f4ee42");
    strokeWeight(0.1);
    ellipse(210, 91.5, 15);
    textAlign(CENTER);
    textSize(15);
    fill(100);
    text("x ", 226, 95);
    text(quantityBalls, 238, 96);
    pop();

}
