/* Object3D */

/*
Object3D is the base class for many objects in Three.js provides methods and properties for manipulating objects in 3D space.

Most common examples are Meshes, Lights, Cameras and Groups of Object3Ds.

The full list of methods and properties can be found in the Three.js documentation at THREE.Object3D

Here we'll demonstrate the most common things you will do with an Object3D and that is change:

Rotation
Position
Scale
Visibility
A list of Three.js objects that derive from the Object3D base class are:

Scene
Mesh
InstancedMesh
SkinnedMesh
Camera
OrthographicCamera
PerspectiveCamera
CubeCamera
Group
Sprite
LOD
Bone
Line
LineLoop
LineSegments
Points
Light
AmbientLight
DirectionalLight
HemisphereLight
PointLight
RectAreaLight
SpotLight
AudioListener
Audio
PositionalAudio
ImmediateRenderObject
SpotLightHelper
HemisphereLightHelper
DirectionalLightHelper
ArrowHelper

Some of the above classes are also derived from parent classes that derive from the Object3D.
*/

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

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

const controls = new OrbitControls(camera, renderer.domElement);
//controls.addEventListener('change', render)

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
const cubeRotationFolder = cubeFolder.addFolder("Rotation");
cubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2);
cubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2);
cubeFolder.open();
cubeRotationFolder.open();
const cubePositionFolder = cubeFolder.addFolder("Position");
cubePositionFolder.add(cube.position, "x", -10, 10, 2);
cubePositionFolder.add(cube.position, "y", -10, 10, 2);
cubePositionFolder.add(cube.position, "z", -10, 10, 2);
cubeFolder.open();
cubePositionFolder.open();
const cubeScaleFolder = cubeFolder.addFolder("Scale");
cubeScaleFolder.add(cube.scale, "x", -5, 5);
cubeScaleFolder.add(cube.scale, "y", -5, 5);
cubeScaleFolder.add(cube.scale, "z", -5, 5);
cubeFolder.add(cube, "visible");
cubeFolder.open();
cubeScaleFolder.open();

function animate() {
  requestAnimationFrame(animate);

  //cube.rotation.x += 0.01
  //cube.rotation.y += 0.01

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
  // renderer.render(cube, camera);
  // ! render() expects a 3D object, so we can pass directly the object ('cube', in ths case) instead the scene, but it'll disable the 'AxesHelper' method, since we don't have an 'environment' reference anymore
}

animate();
//render()
