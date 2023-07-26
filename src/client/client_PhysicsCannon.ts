/* Physics with Cannon */

/*
Animation can also be achieved using a Physics library. We can use a library called Cannon.js. But, rather than using the original Cannon.js, which is no longer maintained, we can install a newer fork of it named Cannon-es instead.

The Cannon physics library is ideal for simulating rigid bodies. You don't have to use it with Three.js, but it was originally built to be used with Three.js, so it will be quite easy to begin using in your project.

We will use it to make objects move and interact in a more realistic way and provide collision detection possibilities.

Basic Concepts
- Shape : A geometrical shape, such as a sphere, cube or plane, used for the the physics calculations.
- Rigid Body : A rigid body has a shape and a number of other properties used in the calculations such as mass and inertia.
- Constraint : A 3D body has 6 degrees of freedom, 3 for position and three to describe the rotation vector. A constraint is a limit on one of the degrees of freedom.
- Contact constraint : A type of constraint to simulate friction and restitution. These are like the faces of an object where the constraint is applied.
- World : A collection of bodies and constraints that interact together.
- Solver : The algorithm that is passed over the bodies and constraints to calculate there physical properties and adjust them accordingly.

Collision Detection
Collision detection algorithms determine what pairs of objects may be colliding. Collision detection is a computationally expensive process, so various methods can be used to simplify the collision detection.

- Narrowphase : Outright body vs body collision detection. This is the most computationally expensive.
- Broadphase : Is a compromise on Narrowphase where various other techniques can be used to improve collision detection performance.
Cannon provides several options for broadphase detection.

Phase -> Description
NaiveBroadphase	Default. 
The NaiveBroadphase looks at all possible pairs without restriction, therefore it has complexity N^2. It is similar to the Narrowphase technique, except it decides first whether objects are close enough before checking if there bodies touch. NaiveBroadphase is the default and is suitable for the most common use cases, but becomes less performant if there are many objects in the physics world.

SAPBroadphase	
The Sweep and Prune algorithm sorts bodies along an axis and then moves down that list finding pairs by looking at body size and position of the next bodies. For best performance, choose an axis that the bodies are spread out more on. Set 0 for X axis, 1 for Y axis and 2 for Z axis. Default axisIndex is 0 (X axis). ; E.g.,

    // TypeScript
    world.broadphase = new CANNON.SAPBroadphase(world)
    ;(world.broadphase as CANNON.SAPBroadphase).axisIndex = 2

GridBroadphase	
Axis aligned uniform grid broadphase. Divides space into a grid of cells. Bodies are placed into the cells they overlap and bodies in the same cell are paired. GridBroadphase needs to know the size of the space ahead of time. Set number of cells when you create the object. Default number of cells is X = 10, Y = 10, Z = 10.

Iterations
The Solver algorithms decide what force to add to bodies in contact. The solver is iterative, which means that it solves the equations incrementally on each animation pass. It will get closer to the solution for each iteration during the loop. A number too low for the solver iterations will result in increasingly inaccurate contact forces, which can appear as jittering or vibrations on the object, and a higher number will increase precision and stability, but also compromise performance.

The default solver iterations is 10.

    //JavaScript (Cannon.js version)
    world.solver.iterations = 10

    //TypeScript (Cannon-es version)
    ;(world.solver as CANNON.GSSolver).iterations = 10

Setup
Install Cannon-es

    npm install cannon-es --save-dev
*/

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";
import * as CANNON from "cannon-es";

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const light1 = new THREE.SpotLight();
light1.position.set(2.5, 5, 5);
light1.angle = Math.PI / 4;
light1.penumbra = 0.5;
light1.castShadow = true;
light1.shadow.mapSize.width = 1024;
light1.shadow.mapSize.height = 1024;
light1.shadow.camera.near = 0.5;
light1.shadow.camera.far = 20;
scene.add(light1);

const light2 = new THREE.SpotLight();
light2.position.set(-2.5, 5, 5);
light2.angle = Math.PI / 4;
light2.penumbra = 0.5;
light2.castShadow = true;
light2.shadow.mapSize.width = 1024;
light2.shadow.mapSize.height = 1024;
light2.shadow.camera.near = 0.5;
light2.shadow.camera.far = 20;
scene.add(light2);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 4);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.y = 0.5;

// ! equivalent to 'scene'
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.broadphase = new CANNON.NaiveBroadphase();
(world.solver as CANNON.GSSolver).iterations = 10;
world.allowSleep = true;

const normalMaterial = new THREE.MeshNormalMaterial();
const phongMaterial = new THREE.MeshPhongMaterial();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMesh = new THREE.Mesh(cubeGeometry, normalMaterial);
cubeMesh.position.x = -3;
cubeMesh.position.y = 3;
cubeMesh.castShadow = true;
scene.add(cubeMesh);
const cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
const cubeBody = new CANNON.Body({ mass: 1 });
cubeBody.addShape(cubeShape);
cubeBody.position.x = cubeMesh.position.x;
cubeBody.position.y = cubeMesh.position.y;
cubeBody.position.z = cubeMesh.position.z;
world.addBody(cubeBody);

const sphereGeometry = new THREE.SphereGeometry();
const sphereMesh = new THREE.Mesh(sphereGeometry, normalMaterial);
sphereMesh.position.x = -1;
sphereMesh.position.y = 3;
sphereMesh.castShadow = true;
scene.add(sphereMesh);
const sphereShape = new CANNON.Sphere(1);
const sphereBody = new CANNON.Body({ mass: 1 });
sphereBody.addShape(sphereShape);
sphereBody.position.x = sphereMesh.position.x;
sphereBody.position.y = sphereMesh.position.y;
sphereBody.position.z = sphereMesh.position.z;
world.addBody(sphereBody);

// ! Cannon doesn't have icosahedron
const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0);
const icosahedronMesh = new THREE.Mesh(icosahedronGeometry, normalMaterial);
icosahedronMesh.position.x = 1;
icosahedronMesh.position.y = 3;
icosahedronMesh.castShadow = true;
scene.add(icosahedronMesh);
let position = (
  icosahedronMesh.geometry.attributes.position as THREE.BufferAttribute
).array;
const icosahedronPoints: CANNON.Vec3[] = [];
for (let i = 0; i < position.length; i += 3) {
  icosahedronPoints.push(
    new CANNON.Vec3(position[i], position[i + 1], position[i + 2])
  );
}
const icosahedronFaces: number[][] = [];
for (let i = 0; i < position.length / 3; i += 3) {
  icosahedronFaces.push([i, i + 1, i + 2]);
}
const icosahedronShape = new CANNON.ConvexPolyhedron({
  vertices: icosahedronPoints,
  faces: icosahedronFaces,
});
const icosahedronBody = new CANNON.Body({ mass: 1 });
icosahedronBody.addShape(icosahedronShape);
icosahedronBody.position.x = icosahedronMesh.position.x;
icosahedronBody.position.y = icosahedronMesh.position.y;
icosahedronBody.position.z = icosahedronMesh.position.z;
world.addBody(icosahedronBody);

const torusKnotGeometry = new THREE.TorusKnotGeometry();
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, normalMaterial);
torusKnotMesh.position.x = 4;
torusKnotMesh.position.y = 3;
torusKnotMesh.castShadow = true;
scene.add(torusKnotMesh);
// position = (torusKnotMesh.geometry.attributes.position as THREE.BufferAttribute)
//   .array;
// const torusKnotPoints: CANNON.Vec3[] = [];
// for (let i = 0; i < position.length; i += 3) {
//   torusKnotPoints.push(
//     new CANNON.Vec3(position[i], position[i + 1], position[i + 2])
//   );
// }
// const torusKnotFaces: number[][] = [];
// for (let i = 0; i < position.length / 3; i += 3) {
//   torusKnotFaces.push([i, i + 1, i + 2]);
// }
// const torusKnotShape = new CANNON.ConvexPolyhedron({
//   vertices: torusKnotPoints,
//   faces: torusKnotFaces,
// });
const torusKnotShape = CreateTrimesh(torusKnotMesh.geometry);

const torusKnotBody = new CANNON.Body({ mass: 1 });
torusKnotBody.addShape(torusKnotShape);
torusKnotBody.position.x = torusKnotMesh.position.x;
torusKnotBody.position.y = torusKnotMesh.position.y;
torusKnotBody.position.z = torusKnotMesh.position.z;
world.addBody(torusKnotBody);

function CreateTrimesh(geometry: THREE.BufferGeometry) {
  const vertices = (geometry.attributes.position as THREE.BufferAttribute)
    .array;
  const indices = Object.keys(vertices).map(Number);
  return new CANNON.Trimesh(vertices as unknown as number[], indices);
}

// ! three.js plane version
const planeGeometry = new THREE.PlaneGeometry(25, 25);
const planeMesh = new THREE.Mesh(planeGeometry, phongMaterial);
planeMesh.rotateX(-Math.PI / 2);
planeMesh.receiveShadow = true;
scene.add(planeMesh);

// ! cannon.js plane version
const planeShape = new CANNON.Plane();
const planeBody = new CANNON.Body({ mass: 0 });
planeBody.addShape(planeShape);
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
world.addBody(planeBody);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const stats = new Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
const physicsFolder = gui.addFolder("Physics");
physicsFolder.add(world.gravity, "x", -10.0, 10.0, 0.1);
physicsFolder.add(world.gravity, "y", -10.0, 10.0, 0.1);
physicsFolder.add(world.gravity, "z", -10.0, 10.0, 0.1);
physicsFolder.open();

const clock = new THREE.Clock();
let delta;

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  //   delta = clock.getDelta();
  delta = Math.min(clock.getDelta(), 0.1);
  world.step(delta);

  // Copy coordinates from Cannon to Three.js
  cubeMesh.position.set(
    cubeBody.position.x,
    cubeBody.position.y,
    cubeBody.position.z
  );
  cubeMesh.quaternion.set(
    cubeBody.quaternion.x,
    cubeBody.quaternion.y,
    cubeBody.quaternion.z,
    cubeBody.quaternion.w
  );
  sphereMesh.position.set(
    sphereBody.position.x,
    sphereBody.position.y,
    sphereBody.position.z
  );
  sphereMesh.quaternion.set(
    sphereBody.quaternion.x,
    sphereBody.quaternion.y,
    sphereBody.quaternion.z,
    sphereBody.quaternion.w
  );
  icosahedronMesh.position.set(
    icosahedronBody.position.x,
    icosahedronBody.position.y,
    icosahedronBody.position.z
  );
  icosahedronMesh.quaternion.set(
    icosahedronBody.quaternion.x,
    icosahedronBody.quaternion.y,
    icosahedronBody.quaternion.z,
    icosahedronBody.quaternion.w
  );
  torusKnotMesh.position.set(
    torusKnotBody.position.x,
    torusKnotBody.position.y,
    torusKnotBody.position.z
  );
  torusKnotMesh.quaternion.set(
    torusKnotBody.quaternion.x,
    torusKnotBody.quaternion.y,
    torusKnotBody.quaternion.z,
    torusKnotBody.quaternion.w
  );

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
