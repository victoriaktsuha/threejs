import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/*
Before we can do anything with Three.js, we need 3 things:

Scene
Camera
Renderer
*/

const scene = new THREE.Scene();
/*Scene: A tree like structure of Meshes, Lights, Groups, 3D Positions, Cameras (Optional), allow you to set up what is to be rendered by three.js and where it is in 3D coordinates. We need a scene, The scene is also sometimes referred to as the scene graph. We can have multiple scenes. When you have a scene, you can then add objects and lighting.*/
scene.background = new THREE.Color(0x0050ff); //scene background

const camera = new THREE.PerspectiveCamera(
  75,
  // window.innerWidth / window.innerHeight,
  // => same as 1 below
  1,
  0.1,
  1000
);
camera.position.z = 2;
/*Camera: Describes the view boundaries of the scene within the Frustum dimensions; There are many types of Cameras in Threejs. In this video we experiment with the Perspective and the Orthographic cameras.
The camera properties describe a Frustum which are the dimensions inside the scene that will be rendered.

- The Perspective projection is designed to mimic the way the human eye sees. It is a very common projection mode used when rendering 3D scenes.
- The Orthographic projection is like a cube in itself where the perspective remains constant regardless of it's distance from the camera.
*/

const canvas1 = document.getElementById("c1") as HTMLCanvasElement;
const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1 });
// This block up here is used when creating canvas from HTML

const canvas2 = document.getElementById("c2") as HTMLCanvasElement;
const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 });
// We can have as many canvas we want in the HTMl, just need to remember to create new 'renderer' WebGLRenderer(), 'setSize', 'OrbitControls', 'render()' to every new canvas, anything that uses 'renderer'

const renderer = new THREE.WebGLRenderer();
// Renderer: displays the scene onto a HTML Canvas Element. By default it uses WebGL. WebGL allows GPU-accelerated image processing and effects as the renderer creates the 2D image for the Canvas.
renderer.setSize(window.innerWidth, window.innerHeight);
renderer1.setSize(200, 200);
renderer2.setSize(200, 200);
//=> we can use number to set size to scene just if in PerspectiveCamera, we also use number as aspect parameter
document.body.appendChild(renderer.domElement);
// this line add the canvas to the HTMl, but you can hardcode canvas in the HTML with <canvas></canvas>

new OrbitControls(camera, renderer.domElement); //alows to the user interact rotating/zooming in and out the object (BoxGeometry())

new OrbitControls(camera, renderer1.domElement);
new OrbitControls(camera, renderer2.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff, //change color (durr)
  wireframe: true, // give a outline (true)/solid (false) structure view
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

console.dir(scene); // or .log() - Allows to see in the console all the objects that is inside the scene

/* window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
} */
// This event listener resize the scene with window, but if we add 1 to the PerspectiveCamera as apsect, its can be commented

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  render();
}

function render() {
  renderer.render(scene, camera);
  renderer1.render(scene, camera);
  renderer2.render(scene, camera);
}

animate();
