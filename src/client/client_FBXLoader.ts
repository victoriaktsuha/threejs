/* FBX Model Loader */
/*
The FBX format is used to provide interoperability between digital content creation applications and game engines such as Blender, Maya, Autodesk, Unity, Unreal and many others. It supports many features such as 3D models, scene hierarchy, materials, lighting, animations, bones and more.
*/

// ! Download free characters on FBX https://www.mixamo.com/

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// ! Need Import
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Stats from "three/examples/jsm/libs/stats.module";

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const light = new THREE.PointLight();
light.position.set(0.8, 1.4, 1.0);
scene.add(light);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0.8, 1.4, 1.0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);

const material = new THREE.MeshNormalMaterial();

const fbxLoader = new FBXLoader();
fbxLoader.load(
  "models/Kachujin G Rosales.fbx",
  (object) => {
    object.traverse(function (child) {
      if ((child as THREE.Mesh).isMesh) {
        // (child as THREE.Mesh).material = material;
        if ((child as THREE.Mesh).material) {
          (
            (child as THREE.Mesh).material as THREE.MeshBasicMaterial
          ).transparent = false;
        }
      }
    });
    object.scale.set(0.01, 0.01, 0.01); // ! scale object in 1% of the size
    scene.add(object);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);
// ! X Bot
fbxLoader.load(
  "models/X Bot.fbx",
  (object) => {
    object.position.x = 2;
    object.traverse(function (child) {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = material;
        //   if ((child as THREE.Mesh).material) {
        //     (
        //       (child as THREE.Mesh).material as THREE.MeshBasicMaterial
        //     ).transparent = false;
        //   }
      }
    });
    object.scale.set(0.01, 0.01, 0.01); // ! scale object in 1% of the size
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
