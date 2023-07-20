/* Trackball Controls */

/*
TrackballControls is similar to the OrbitControls. However, it does not maintain a constant camera up vector. That means that the camera can orbit past its polar extremes. It won't flip to stay the right side up.
*/

import * as THREE from "three";
// ! Need import
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import Stats from "three/examples/jsm/libs/stats.module";

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

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

const controls = new TrackballControls(camera, renderer.domElement);
controls.addEventListener("change", () => console.log("Controls Change"));
controls.addEventListener("start", () => console.log("Controls Start Event")); // ! happens when you click down the mouse button
controls.addEventListener("end", () => console.log("Controls End Event")); // ! happens when you lift up the mouse button

// controls.enabled = false; // ! disable any interaction with object
controls.rotateSpeed = 1.0; // ! define speed when rotating with object
controls.zoomSpeed = 1.2; // ! define zoom speed
controls.panSpeed = 0.8; // ! define panning speed
controls.keys = ["KeyA", "KeyS", "KeyD"]; // ! need hold the key and use the mouse to rotate, zoom and pan
// ! disabling actions
// controls.noPan = true //default false
// controls.noRotate = true //default false
// controls.noZoom = true //default false
// controls.staticMoving = true //default false - inverse of damping
// controls.dynamicDampingFactor = 0.1 // ! when you move the object, it smoothly continues to move for some time; it also only works if you have the .update() being called
// controls.maxDistance = 4 // ! define how far the dolly can go forward and backward (how far go zoom in/out)
// controls.minDistance = 2

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

function animate() {
  requestAnimationFrame(animate);

  // trackball controls needs to be updated in the animation loop before it will work
  controls.update();

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
