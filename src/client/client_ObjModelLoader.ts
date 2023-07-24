/* OBJ Model Loader */

/*
Used for loading 3d models saved in the Wavefront OBJ format.

There are many DCC (Digital Content Creation) tools that can create models in OBJ format.

In Threejs, when importing an OBJ, the default material will be a white MeshPhongMaterial so you will need at least one light in your scene.
*/

// ! Using 3D object - 'model' folder

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// ! need import
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import Stats from "three/examples/jsm/libs/stats.module";

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const light = new THREE.PointLight();
light.position.set(2.5, 7.5, 15);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// const material = new THREE.MeshBasicMaterial({
//   color: 0x00ff00,
//   wireframe: true,
// });
const material = new THREE.MeshNormalMaterial();

const objLoader = new OBJLoader(); // ! by default, it'll load MeshPhongMaterial
objLoader.load(
  "models/monkey.obj", // ! import object .obj
  (object) => {
    // ! this load happens asynchronously - while JS load the model, the script will continue running
    console.log(object);
    // (object.children[0] as THREE.Mesh).material = material; // ! assign a new material to the object
    object.traverse(function (child) {
      // ! .traverse() will run over all group children to find a children with Mesh kind and assign a new material for it
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = material;
      }
    });
    scene.add(object);
  },
  (xhr) => {
    // ! information about download progress while the page loads
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);
// ! loading a second .obj
objLoader.load(
  "models/cube.obj",
  (object) => {
    object.position.x = -2;
    console.log(object);
    // (object.children[0] as THREE.Mesh).material = material; // ! assign a new material to the object
    // object.traverse(function (child) {
    //   if ((child as THREE.Mesh).isMesh) {
    //     (child as THREE.Mesh).material = material;
    //   }
    // });
    scene.add(object);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

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
