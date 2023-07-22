/* global Bodies, world, World, setup, CENTER, Body, RADIUS, height, Events, engine, Composite, Matter */

function Ball(x, y, radius, id, fixed, active) {
    var valueee = 1;
    var options = {
        isStatic: fixed,
        friction: 0.03,
        frictionAir: 0.001,
        density: 0.2,
        mass: 35.29389992000000004,
        inertia: 660.03935734690198,
        restitution: 0,
        inverseMass: 0.02833350812085603,
        inverseInertia: 0.0015150611685030508,
        render: {
            fillStyle: '#f4ee42'
        }
    };
    var circ = Bodies.circle(x, y, radius, options);

    this.fixed = fixed;
    this.circ = circ;
    this.valueee = valueee;
    this.active = active;
    this.id = id;
    this.fixed = fixed;

    World.add(world, circ);

    this.show = function () {
        var pos = circ.position;
        push();
        translate(pos.x, pos.y);
        fill("#f4ee42");
        strokeWeight(0.1);
        ellipse(0, 0, radius * 2);
        pop();
    };
}