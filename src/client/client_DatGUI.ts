/* Dat GUI */

// ! The Dat.GUI is another very useful tool that we can use to learn about Three.js as it allows us to quickly add a very basic user interface which allows us to interact with our 3d scene and the objects within it.

/*
We can install the Dat.GUI from its official repository.

npm install dat.gui --save-dev

We should also install the Dat.GUI type definitions.

npm install @types/dat.gui --save-dev
*/

// ! Note that there was a problem with @types/dat.gui@0.7.9 which caused auto inferring Three.js types to no longer work. This made the definition very hard work with. This was corrected in @types/dat.gui@0.7.10. Ensure you have the latest version. npm install @types/dat.gui@latest

/*
Now add the import for it into our existing client.ts script

import { GUI } from 'dat.gui'
*/

// ! ERROR : Module not found: Error: Can't resolve 'three/examples/jsm/libs/dat.gui.module'

/*
Install Dat.GUI manually from its official repository.

npm install dat.gui --save-dev
npm install @types/dat.gui --save-dev

Then change any scripts that reference Dat.GUI in the form of,

import { GUI } from 'three/examples/jsm/libs/dat.gui.module'`
to

import { GUI } from 'dat.gui'
*/

// ! ERROR : Argument of type 'Euler' is not assignable to parameter of type 'Record'.

/*
The type definitions, @types/dat.gui@0.7.8 and greater no longer support auto inference of Three.js types.

This makes the Dat.GUI type definitions much more complicated to use in Three.js TypeScript projects.

You can either install a previous version of the type definitions:

npm install @types/dat.gui@0.7.7 --save-dev

Or, install lil-gui.

lil-gui is a drop-in replacement for Dat.GUI, and the types are automatically installed by default when installing lil-gui. They are also much more user-friendly, similar to the older @types/dat.gui@0.7.7 type definitions.

Install lil-gui:

npm install lil-gui
Then in your client.ts

Change:

import { GUI } from 'dat.gui'
to
import { GUI } from 'lil-gui'
*/

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
//controls.addEventListener('change', render) // !This line allows to update the render just when we have some change, like when the user manipulate the object. Instead, we're using the render in animation and resize.

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

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
const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2);
cubeFolder.open();
const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "z", 0, 10);
cameraFolder.open();

function animate() {
  requestAnimationFrame(animate);

  //cube.rotation.x += 0.01
  //cube.rotation.y += 0.01

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
//render()
