/* global Bodies, world, World, CENTER, Body, engine, Events, Composites, Composite, Constraint */
var redColor = '#C44D58';
function Cup(x, id, valueee, cupColor) {
    var leftAngle = Bodies.rectangle(x, 500, 8, 100, {isStatic: true, angle: Math.PI * -0.05});
    var rightAngle = Bodies.rectangle(x + 75, 500, 8, 100, {isStatic: true, angle: Math.PI * 0.05});
    var sensorCup = Bodies.rectangle(x + 38, 470, 70, 8, {isStatic: true, isSensor: true,
        render: {strokeStyle: redColor, fillStyle: 'transparent', lineWidth: 1}});
    var sensorOut = Bodies.rectangle(x + 138, 470, 100, 8, {isStatic: true, isSensor: true,
        render: {strokeStyle: redColor, fillStyle: 'transparent', lineWidth: 1}});

    World.add(world, [leftAngle, rightAngle, sensorCup, sensorOut]);

    this.sensorCup = sensorCup;
    this.sensorOut = sensorOut;
    this.cupColor = cupColor;
    this.valueee = valueee;
    this.id = id;
    this.leftAngle = leftAngle;
    this.rightAngle = rightAngle;
    this.show = function () {
        var pos = this.leftAngle.position;
        push();
        translate(pos.x, pos.y);
        strokeWeight(0.1);
        rotate(Math.PI * -0.05);
        rect(0, 0, 8, 100, 120);
        pop();

        push();
        translate(pos.x, pos.y);
        strokeWeight(0.1);
        rotate(Math.PI * 0.05);
        rect(75, -12, 8, 100, 120);
        pop();
    };
}