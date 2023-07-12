import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

/*
Before we can do anything with Three.js, we need 3 things:

Scene
Camera
Renderer
*/

const scene = new THREE.Scene();
/*Scene: A tree like structure of Meshes, Lights, Groups, 3D Positions, Cameras (Optional), allow you to set up what is to be rendered by three.js and where it is in 3D coordinates. We need a scene, The scene is also sometimes referred to as the scene graph. We can have multiple scenes. When you have a scene, you can then add objects and lighting.*/
scene.background = new THREE.Color(0x0050ff); //scene background

/* const scene2 = new THREE.Scene(); */
//we can render different scenes

const camera = new THREE.PerspectiveCamera(
  75, // < lower = zoom in / > higher = zoom out
  window.innerWidth / window.innerHeight,
  // => same as 1 below
  // 1,
  0.1,
  1000
);
/* const camera2 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
const camera3 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
const camera4 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
const camera5 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10); */
camera.position.z = 2;
/* camera2.position.y = 2;
camera2.lookAt(new THREE.Vector3());
camera3.position.x = -1;
camera3.lookAt(new THREE.Vector3(0, 0, 0));
camera4.position.z = 2;
camera5.position.z = 2; */
// 'position' changes the direction that canvas rotate

/*Camera: Describes the view boundaries of the scene within the Frustum dimensions; There are many types of Cameras in Threejs. In this video we experiment with the Perspective and the Orthographic cameras.
The camera properties describe a Frustum which are the dimensions inside the scene that will be rendered.

- The Perspective projection is designed to mimic the way the human eye sees. It is a very common projection mode used when rendering 3D scenes.
- The Orthographic projection is like a cube in itself where the perspective remains constant regardless of it's distance from the camera.
*/

/* const canvas1 = document.getElementById("c1") as HTMLCanvasElement;
const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1 }); */
// This block up here is used when creating canvas from HTML

/* const canvas2 = document.getElementById("c2") as HTMLCanvasElement;
const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 }); */
// We can have as many canvas we want in the HTMl, just need to remember to create new 'renderer' WebGLRenderer(), 'setSize', 'OrbitControls', 'render()' to every new canvas, anything that uses 'renderer'

/* const canvas3 = document.getElementById("c3") as HTMLCanvasElement;
const renderer3 = new THREE.WebGLRenderer({ canvas: canvas3 });

const canvas4 = document.getElementById("c4") as HTMLCanvasElement;
const renderer4 = new THREE.WebGLRenderer({ canvas: canvas4 });

const canvas5 = document.getElementById("c5") as HTMLCanvasElement;
const renderer5 = new THREE.WebGLRenderer({ canvas: canvas5 }); */

const renderer = new THREE.WebGLRenderer();
// Renderer: displays the scene onto a HTML Canvas Element. By default it uses WebGL. WebGL allows GPU-accelerated image processing and effects as the renderer creates the 2D image for the Canvas.
renderer.setSize(window.innerWidth, window.innerHeight);
/* renderer1.setSize(200, 200);
renderer2.setSize(200, 200);
renderer3.setSize(200, 200);
renderer4.setSize(200, 200);
renderer5.setSize(200, 200); */
//=> we can use number to set size to scene just if in PerspectiveCamera, we also use number as aspect parameter
document.body.appendChild(renderer.domElement);
/* document.body.appendChild(renderer1.domElement);
document.body.appendChild(renderer2.domElement);
document.body.appendChild(renderer3.domElement);
document.body.appendChild(renderer4.domElement);
document.body.appendChild(renderer5.domElement); */

// this line add the canvas to the HTMl, but you can hardcode canvas in the HTML with <canvas></canvas>

const controls = new OrbitControls(camera, renderer.domElement); //alows to the user interact rotating/zooming in and out the object (BoxGeometry())
// controls.addEventListener("change", render);
// The line above allows to update the render just when we have some change, like when the user manipulate the object. In reverse, we're using the render in animation and resize.

/* new OrbitControls(camera, renderer1.domElement);
new OrbitControls(camera2, renderer2.domElement);
new OrbitControls(camera3, renderer3.domElement);
new OrbitControls(camera4, renderer4.domElement);
new OrbitControls(camera5, renderer5.domElement); */
// Different cameras defined before can allows us to interact with canvas separately

const geometry = new THREE.BoxGeometry();
// const geometry = new THREE.TorusKnotGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00, //change color (durr)
  wireframe: true, // give a outline (true)/solid (false) structure view
});

const cube = new THREE.Mesh(geometry, material);
/* cube.scale.x = 0.5;
cube.scale.y = 0.5;
cube.scale.z = 0.5; */
scene.add(cube);

/* const cube2 = new THREE.Mesh(geometry, material);
scene2.add(cube2); */

//console.dir(scene); // or .log() - Allows to see in the console all the objects that is inside the scene

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // render();
}
// This event listener resize the scene with window, but if we add 1 to the PerspectiveCamera as apsect, its can be commented

// Stats display FPS/performance box in the browser
const stats = new Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
const cubeFolder = gui.addFolder("Cube");
// It groups the controls with a title in a tab
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2);
// Display controls, in this case, to rotation on x axle; Math.PI * 2 = 360
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2);
// Display controls for the other axles

const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "z", 0, 20); // Camera position was define previously in this code (camera.position.z = 2;)
cameraFolder.open(); // Define the tab open once the page loads

// Create the loop animation
function animate() {
  requestAnimationFrame(animate);
  //60fps

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // /* cube2.rotation.y += 0.01; */

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
  /* renderer1.render(scene, camera);
  renderer2.render(scene2, camera2);
  renderer3.render(scene, camera3);
  renderer4.render(scene, camera4);
  renderer5.render(scene, camera5); */
}

animate();
// render();
