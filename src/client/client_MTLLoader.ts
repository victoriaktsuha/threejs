/* MTL Loader */

/*
MTL is the material information used by an OBJ file. You can set the colours, specular, emissive, alpha, smoothness, image maps, and there coordinates.

Since it is a MeshPhongMaterial by default, we can only set properties affecting the meshPhongMaterial.

If you create your OBJ and MTL using Blender, then you can change

Base Color
Specular
Emission
Alpha
Smooth/Flat Shaded
*/

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// ! Need import
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
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

const mtlLoader = new MTLLoader();
mtlLoader.load(
  "models/monkey.mtl", // ! load the object3D material first - if you're using an image, even imported from the Blender, be sure to remove the URL from the .mtl file, letting just the name and extension of this image, to avoid security problems; And add a copy of the image file itself in the models folder
  (materials) => {
    materials.preload();
    console.log(materials);
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials); // ! set .mtl material to the object .obj
    objLoader.load(
      "models/monkey.obj", // ! load the object3D .obj inside the material method
      (object) => {
        console.log(object);
        scene.add(object);
      },
      // ! optionals
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log("An error happened");
      }
    );
  },
  // ! optionals
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log("An error happened");
  }
);
// ! monkey with texture
mtlLoader.load(
  "models/monkeyTextured.mtl", // ! load the object3D material first - if you're using an image, even imported from the Blender, be sure to remove the URL from the .mtl file, letting just the name and extension of this image, to avoid security problems; And add a copy of the image file itself in the models folder
  (materials) => {
    materials.preload();
    console.log(materials);
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials); // ! set .mtl material to the object .obj
    objLoader.load(
      "models/monkeyTextured.obj", // ! load the object3D .obj inside the material method
      (object) => {
        object.position.x = 3;
        console.log(object);
        scene.add(object);
      },
      // ! optionals
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log("An error happened");
      }
    );
  },
  // ! optionals
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log("An error happened");
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
