import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

/*
! Before we can do anything with Three.js, we need 3 things:

Scene
Camera
Renderer
*/

const scene = new THREE.Scene();
/* ! Scene: A tree like structure of Meshes, Lights, Groups, 3D Positions, Cameras (Optional), allow you to set up what is to be rendered by three.js and where it is in 3D coordinates. We need a scene, The scene is also sometimes referred to as the scene graph. We can have multiple scenes. When you have a scene, you can then add objects and lighting. The scene is an Object3D. You can add other Object3Ds to the scene and they become children of the scene. The scene itself is derived from the Object3D base class.
If you rotate the scene, or scale the scene, or translate its position, it will affect all if its child objects.
You make an Object3D a child of another Object3D by using the parents add method.*/

scene.background = new THREE.Color(0x000); //scene background
scene.add(new THREE.AxesHelper(3)); //! Add axis (related to the camera) to the 3D object; The number argument repesents the lenght of the axes lines

/* const scene2 = new THREE.Scene(); */
//we can render different scenes

const camera = new THREE.PerspectiveCamera(
  75, // ! < lower = zoom in / > higher = zoom out
  window.innerWidth / window.innerHeight,
  // ! same as 1 below
  // 1,
  0.1,
  1000
);

/* const camera2 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
const camera3 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
const camera4 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
const camera5 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10); */

// camera.position.z = 2;

/* camera2.position.y = 2;
camera2.lookAt(new THREE.Vector3());
camera3.position.x = -1;
camera3.lookAt(new THREE.Vector3(0, 0, 0));
camera4.position.z = 2;
camera5.position.z = 2; */
// ! 'position' changes the direction that canvas rotate

camera.position.x = 4;
camera.position.y = 4;
camera.position.z = 4;

/* ! Camera: Describes the view boundaries of the scene within the Frustum dimensions; There are many types of Cameras in Threejs. In this video we experiment with the Perspective and the Orthographic cameras.
The camera properties describe a Frustum which are the dimensions inside the scene that will be rendered.

- The Perspective projection is designed to mimic the way the human eye sees. It is a very common projection mode used when rendering 3D scenes.
- The Orthographic projection is like a cube in itself where the perspective remains constant regardless of it's distance from the camera.
*/

/* const canvas1 = document.getElementById("c1") as HTMLCanvasElement;
const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1 }); */
// ! This code block up here is used when creating canvas from HTML

/* const canvas2 = document.getElementById("c2") as HTMLCanvasElement;
const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 }); */
// ! We can have as many canvas we want in the HTMl, just need to remember to create new 'renderer' WebGLRenderer(), 'setSize', 'OrbitControls', 'render()' to every new canvas, anything that uses 'renderer'

/* const canvas3 = document.getElementById("c3") as HTMLCanvasElement;
const renderer3 = new THREE.WebGLRenderer({ canvas: canvas3 });

const canvas4 = document.getElementById("c4") as HTMLCanvasElement;
const renderer4 = new THREE.WebGLRenderer({ canvas: canvas4 });

const canvas5 = document.getElementById("c5") as HTMLCanvasElement;
const renderer5 = new THREE.WebGLRenderer({ canvas: canvas5 }); */

const renderer = new THREE.WebGLRenderer();
// ! Renderer: displays the scene onto a HTML Canvas Element. By default it uses WebGL. WebGL allows GPU-accelerated image processing and effects as the renderer creates the 2D image for the Canvas.
renderer.setSize(window.innerWidth, window.innerHeight);
/* renderer1.setSize(200, 200);
renderer2.setSize(200, 200);
renderer3.setSize(200, 200);
renderer4.setSize(200, 200);
renderer5.setSize(200, 200); */
// ! we can use number to set size to scene just if in PerspectiveCamera, we also use number as aspect parameter
document.body.appendChild(renderer.domElement);
/* document.body.appendChild(renderer1.domElement);
document.body.appendChild(renderer2.domElement);
document.body.appendChild(renderer3.domElement);
document.body.appendChild(renderer4.domElement);
document.body.appendChild(renderer5.domElement); */

// ! this line add the canvas to the HTMl, but you can hardcode canvas in the HTML with <canvas></canvas>

const controls = new OrbitControls(camera, renderer.domElement); // ! alows to the user interact rotating/zooming in and out the object (BoxGeometry())
// controls.addEventListener("change", render);
// !The line above allows to update the render just when we have some change, like when the user manipulate the object. In reverse, we're using the render in animation and resize.
controls.target.set(8, 0, 0);

const light1 = new THREE.PointLight();
light1.position.set(10, 10, 10); // ! set(x position, y position, z position)
scene.add(light1);

const light2 = new THREE.PointLight();
light2.position.set(-10, 10, 10);
scene.add(light2);

const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshPhongMaterial({ color: 0xff0000 })
);
object1.position.set(4, 0, 0);
scene.add(object1);
object1.add(new THREE.AxesHelper(3));

const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshPhongMaterial({ color: 0x00ff00 })
);
object2.position.set(4, 0, 0);
object1.add(object2); // ! Link the 'object2'(child) to 'object1'(parent)
object2.add(new THREE.AxesHelper(3));

const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshPhongMaterial({ color: 0x0000ff })
);
object3.position.set(4, 0, 0);
object2.add(object3); // ! Link the 'object3'(grandchild/child) to 'object2'(child/parent)
object3.add(new THREE.AxesHelper(3));

/* new OrbitControls(camera, renderer1.domElement);
new OrbitControls(camera2, renderer2.domElement);
new OrbitControls(camera3, renderer3.domElement);
new OrbitControls(camera4, renderer4.domElement);
new OrbitControls(camera5, renderer5.domElement); */
// ! Different cameras defined before can allows us to interact with canvas separately

// const geometry = new THREE.BoxGeometry();
// /* const geometry = new THREE.TorusKnotGeometry(); */
// const material = new THREE.MeshBasicMaterial({
//   color: 0x00ff00, // ! change color
//   wireframe: true, // ! give a outline (true)/solid (false) structure view
// });

// const cube = new THREE.Mesh(geometry, material);
// /* cube.scale.x = 0.5;
// cube.scale.y = 0.5;
// cube.scale.z = 0.5; */
// scene.add(cube);

/* const cube2 = new THREE.Mesh(geometry, material);
scene2.add(cube2); */

//! console.dir(scene); // or .log() - Allows to see in the console all the objects that is inside the scene

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}
// ! This event listener resize the scene with window, but if we add 1 to the PerspectiveCamera as apsect, its can be commented

const gui = new GUI();

/* Folders for cube object - Hide when publish*/
// const cubeFolder = gui.addFolder("Cube");
// // ! It groups the controls with a title in a tab
// cubeFolder.open();
// // ! Define the tab open once the page loads
// cubeFolder.add(cube, "visible");
// // ! Gives to the browser controls an option to enable/disable the obejct visibility

// const cubeRotationFolder = gui.addFolder("Rotation");
// cubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2);
// // ! Display controls in the page, in this case, to rotation on x axle, delivering 0 as minimun and Math.PI * 2 (= 360) as maximum
// cubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2);
// cubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2);
// // ! Display controls for the other axles
// cubeRotationFolder.open();

// const cubePositionFolder = gui.addFolder("Position");
// cubePositionFolder.add(cube.position, "x", -10, 10, 2);
// cubePositionFolder.add(cube.position, "y", -10, 10, 2);
// cubePositionFolder.add(cube.position, "z", -10, 10, 2);
// // ! the '2' value is for 'step' argument, which represents the 'jump' in the control values change
// cubePositionFolder.open();

// const cubeScaleFolder = gui.addFolder("Scale");
// cubeScaleFolder.add(cube.scale, "x", -5, 5);
// // ! Display controls, in this case, to rotation on x axle; Math.PI * 2 = 360
// cubeScaleFolder.add(cube.scale, "y", -5, 5);
// cubeScaleFolder.add(cube.scale, "z", -5, 5);
// // ! Display controls for the other axles
// cubeScaleFolder.open();

// const cameraFolder = gui.addFolder("Camera");
// cameraFolder.add(camera.position, "z", 0, 20); // ! Camera position was define previously in this code (camera.position.z = 2;)
// cameraFolder.open();

/* Folders for Sphere objects - Hide when publish*/
const object1Folder = gui.addFolder("Object1 - RED");
object1Folder.add(object1.position, "x", 0, 10, 0.01).name("X Position");
object1Folder
  .add(object1.rotation, "x", 0, Math.PI * 2, 0.01)
  .name("X Rotation");
object1Folder.add(object1.scale, "x", 0, 2, 0.01).name("X Scale");
object1Folder.open();

const object2Folder = gui.addFolder("Object2 - GREEN");
object2Folder.add(object2.position, "x", 0, 10, 0.01).name("X Position");
object2Folder
  .add(object2.rotation, "x", 0, Math.PI * 2, 0.01)
  .name("X Rotation");
object2Folder.add(object2.scale, "x", 0, 2, 0.01).name("X Scale");
object2Folder.open();

const object3Folder = gui.addFolder("Object3 - BLUE");
object3Folder.add(object3.position, "x", 0, 10, 0.01).name("X Position");
object3Folder
  .add(object3.rotation, "x", 0, Math.PI * 2, 0.01)
  .name("X Rotation");
object3Folder.add(object3.scale, "x", 0, 2, 0.01).name("X Scale");
object3Folder.open();

// ! Stats display FPS/performance box in the browser
const stats = new Stats();
document.body.appendChild(stats.dom);

const debug = document.getElementById("debug1") as HTMLDivElement;

// ! Create the loop animation
function animate() {
  requestAnimationFrame(animate);
  // ! 60fps
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // /* cube2.rotation.y += 0.01; */

  controls.update();
  render();

  const object1WorldPosition = new THREE.Vector3();
  object1.getWorldPosition(object1WorldPosition);

  const object2WorldPosition = new THREE.Vector3();
  object2.getWorldPosition(object2WorldPosition);

  const object3WorldPosition = new THREE.Vector3();
  object3.getWorldPosition(object3WorldPosition);

  debug.innerText =
    "Red\n" +
    "Local Pos X : " +
    object1.position.x.toFixed(2) + // ! toFixed(argument) define the decimals number on the "debug1"
    "\n" +
    "World Pos X : " +
    object1WorldPosition.x.toFixed(2) +
    "\n" +
    "\nGreen\n" +
    "Local Pos X : " +
    object2.position.x.toFixed(2) +
    "\n" +
    "World Pos X : " +
    object2WorldPosition.x.toFixed(2) +
    "\n" +
    "\nBlue\n" +
    "Local Pos X : " +
    object3.position.x.toFixed(2) +
    "\n" +
    "World Pos X : " +
    object3WorldPosition.x.toFixed(2) +
    "\n";

  stats.update();
}

function render() {
  renderer.render(scene, camera);
  // renderer.render(cube, camera);
  // ! render() expects a 3D object, so we can pass directly the object ('cube', in ths case) instead the scene, but it'll disable the 'AxesHelper' method, since we don't have an 'environment' reference anymore

  /* renderer1.render(scene, camera);
  renderer2.render(scene2, camera2);
  renderer3.render(scene, camera3);
  renderer4.render(scene, camera4);
  renderer5.render(scene, camera5); */
}

animate();
// render();
