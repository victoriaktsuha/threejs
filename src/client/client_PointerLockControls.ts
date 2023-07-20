/* PointerLock Controls */

/*
The PointerLockControls implements the inbuilt browsers Pointer Lock API. It provides input methods based on the movement of the mouse over time (i.e., deltas), not just the absolute position of the mouse cursor in the viewport. It gives you access to raw mouse movement, locks the target of mouse events to a single element, eliminates limits on how far mouse movement can go in a single direction, and removes the cursor from view. It is ideal for first person 3D games, for example.
*/

// ! NEED the follow HTML:
/*
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Three.js TypeScript Tutorials by Sean Bradley : https://sbcode.net/threejs</title>
        <style>
            body {
                overflow: hidden;
                margin: 0px;
            }

            #menuPanel {
                position: absolute;
                background-color: rgba(255, 255, 255, 0.5);
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
            }

            #startButton {
                height: 50px;
                width: 200px;
                margin: -25px -100px;
                position: relative;
                top: 50%;
                left: 50%;
                font-size: 32px;
            }
        </style>
    </head>

    <body>
        <div id="menuPanel">
            <button id="startButton">Click to Start</button>
        </div>
        <script type="module" src="bundle.js"></script>
    </body>
</html>
*/

import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import Stats from "three/examples/jsm/libs/stats.module";

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.y = 1;
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const menuPanel = document.getElementById("menuPanel") as HTMLDivElement;
const startButton = document.getElementById("startButton") as HTMLInputElement;
startButton.addEventListener(
  "click",
  function () {
    controls.lock(); // ! lock the mouse to the element after click
  },
  false
);

const controls = new PointerLockControls(camera, renderer.domElement);
// controls.addEventListener('change', () => console.log("Controls Change"))
controls.addEventListener("lock", () => (menuPanel.style.display = "none")); // ! hide the gray dim after lock function is triggered
controls.addEventListener("unlock", () => (menuPanel.style.display = "block")); // ! display the gray dim after unlock function is triggered (ESC)

const planeGeometry = new THREE.PlaneGeometry(100, 100, 50, 50); // ! field size
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
}); // ! field material/visual
const plane = new THREE.Mesh(planeGeometry, material); // ! create field
plane.rotateX(-Math.PI / 2); // ! tilt the field in -90 degree
scene.add(plane); // ! add field to the scene

const cubes: THREE.Mesh[] = [];
for (let i = 0; i < 100; i++) {
  // ! 100 cubes
  const geo = new THREE.BoxGeometry(
    Math.random() * 4, // X
    Math.random() * 16, // Y
    Math.random() * 4 // Z
  );
  const mat = new THREE.MeshBasicMaterial({ wireframe: true });
  switch (i % 4) {
    case 0:
      mat.color = new THREE.Color(0xff0000);
      break;
    case 1:
      mat.color = new THREE.Color(0xffff00);
      break;
    case 2:
      mat.color = new THREE.Color(0x0000ff);
      break;
    // ! a new color of cube can be added here - need to update the number on (i % N)
    case 3:
      mat.color = new THREE.Color(0xff00ff);
      break;
  }
  const cube = new THREE.Mesh(geo, mat); // ! create cubes
  cubes.push(cube); // ! add cubes to the scene with random colors and sizes, but limited to 100 cubes
}
cubes.forEach((c) => {
  c.position.x = Math.random() * 100 - 50; // ! random X pos
  c.position.z = Math.random() * 100 - 50; // ! random Y pos
  c.geometry.computeBoundingBox();
  c.position.y =
    ((c.geometry.boundingBox as THREE.Box3).max.y -
      (c.geometry.boundingBox as THREE.Box3).min.y) /
    2; // ! positioning the cubes at the top half of its own height, because by default, plane is positioned on the half of the objects, starting in the 0,0,0 position of the scene
  scene.add(c); // ! appply the position definitions to the cubes at the scene
});

const onKeyDown = function (event: KeyboardEvent) {
  switch (event.code) {
    case "KeyW":
      controls.moveForward(0.25);
      break;
    case "KeyA":
      controls.moveRight(-0.25);
      break;
    case "KeyS":
      controls.moveForward(-0.25);
      break;
    case "KeyD":
      controls.moveRight(0.25);
      break;
  }
};
document.addEventListener("keydown", onKeyDown, false);

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

  //controls.update() // ! PointerLockControls doesn't have update method

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
