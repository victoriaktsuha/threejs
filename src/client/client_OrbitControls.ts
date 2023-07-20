/* Orbit Controls */

/* Orbit controls allow the camera to orbit around a target. */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2; // ! 0,0,2 - two is like the distance

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
// ! the target pf the camera is the own object, at the position 0,0,0, so the camera slides around this object. We can quickly change this target position by holding the right button of the mouse and drag to some different direction (panning) - zoom in/out doesn't change the target

// camera.lookAt(0.5, 0.5, 0.5); // ! every object3D has a lookAt method - when page loads, the camera is on the defined position, but in the first click, the camera comes back to the original position (0,0,2), then when page refresh, it returns to the lookAt defined position and so on
// controls.target.set(0.5, 0.5, 0.5); // ! use target.set instead of lookAt to avoid update screen problems; Need to call update() - it can be done in the animate function
// controls.update();

controls.addEventListener("change", () => console.log("Controls Change"));
controls.addEventListener("start", () => console.log("Controls Start Event")); // ! happens when you click down the mouse button
controls.addEventListener("end", () => console.log("Controls End Event")); // ! happens when you lift up the mouse button

// controls.autoRotate = true; // ! it only works if you have the .update() being called
// controls.autoRotateSpeed = 10; // rotation speed
controls.enableDamping = true; // ! when you move the object, it smoothly continues to move for some time; it also only works if you have the .update() being called -
controls.dampingFactor = 0.05; // ! change the damping speed
// controls.enableKeys = true //older versions - deprecated
controls.listenToKeyEvents(document.body); // ! give you the option to control the position by the keyboard
controls.keys = {
  LEFT: "ArrowLeft", // or "KeyD" for D key - left arrow
  UP: "ArrowUp", // or "KeyW" for W key - up arrow
  RIGHT: "ArrowRight", // or "KeyA" for A key - right arrow
  BOTTOM: "ArrowDown", // or "KeyS" for S key - down arrow
  // ! https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
};
controls.mouseButtons = {
  LEFT: THREE.MOUSE.ROTATE,
  MIDDLE: THREE.MOUSE.DOLLY, // zoom
  RIGHT: THREE.MOUSE.PAN, // drag
};
controls.touches = {
  ONE: THREE.TOUCH.ROTATE,
  TWO: THREE.TOUCH.DOLLY_PAN,
};
controls.screenSpacePanning = true; // ! false default
controls.minAzimuthAngle = 0; // ! limit the object left-and-right rotation - accepts negative numbers
controls.maxAzimuthAngle = Math.PI / 2; // ! 180 / 2
controls.minPolarAngle = 0; // ! limit the object up-and-down rotation - accepts negative numbers
controls.maxPolarAngle = Math.PI; // ! 180
controls.maxDistance = 4; // ! define how far the dolly can go forward and backward (how far go zoom in/out)
controls.minDistance = 2;
// ! https://en.wikipedia.org/wiki/Azimuth

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

  controls.update();

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
