/* Materials */

// ! An introduction to the Three.js Material base class: THREE.Material

/* All these classes below inherit methods and properties from the Material base class:

LineBasicMaterial
LineDashedMaterial
MeshBasicMaterial
MeshDepthMaterial
MeshDistanceMaterial
MeshLambertMaterial
MeshMatcapMaterial
MeshNormalMaterial
MeshPhongMaterial
MeshPhysicalMaterial
MeshStandardMaterial
MeshToonMaterial
PointsMaterial
RawShaderMaterial
ShaderMaterial
ShadowMaterial
SpriteMaterial
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
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const boxGeometry = new THREE.BoxGeometry(); // ! store cube object - here can be define width, height, lenght, etc..
const sphereGeometry = new THREE.SphereGeometry(); // ! store sphere object
const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0); // ! store icosahedron object - (size/deep, more/less points; more points = more round; don't apply to negative number)
const planeGeometry = new THREE.PlaneGeometry(); // ! store plane object
const torusKnotGeometry = new THREE.TorusKnotGeometry(); // ! store knot object

const material = new THREE.MeshBasicMaterial();
//const material= new THREE.MeshNormalMaterial()

// ! create cube object - add the material defined before and add it to the scene
const cube = new THREE.Mesh(boxGeometry, material);
cube.position.x = 5; // ! define cube position
scene.add(cube); // ! add cube to the scene
// ! when we crate a mesh, the constructor needs some kind of geometry, and the geometry that we're passing has BufferGeometry as base class, like all geometries. It saves all data in buffers to reduce memory and CPU cycles

// ! create sphere object
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = 3;
scene.add(sphere);

// ! create icosahedron object
const icosahedron = new THREE.Mesh(icosahedronGeometry, material);
icosahedron.position.x = 0;
scene.add(icosahedron);

// ! create plane object
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -2;
scene.add(plane);

// ! create torusKnot object
const torusKnot = new THREE.Mesh(torusKnotGeometry, material);
torusKnot.position.x = -5;
scene.add(torusKnot);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

//! console.dir(scene); // or .log() - Allows to see in the console all the objects that is inside the scene

const stats = new Stats();
document.body.appendChild(stats.dom);

const options = {
  side: {
    FrontSide: THREE.FrontSide, // ! Same as 'material.side = THREE.Frontside'
    BackSide: THREE.BackSide, // ! A good option for environments like a house, you can see inside the object
    DoubleSide: THREE.DoubleSide,
  },
};

const gui = new GUI();
const materialFolder = gui.addFolder("THREE.Material");
materialFolder
  .add(material, "transparent")
  .onChange(() => (material.needsUpdate = true));
materialFolder.add(material, "opacity", 0, 1, 0.01);
materialFolder.add(material, "depthTest");
materialFolder.add(material, "depthWrite"); // ! "Ignore" materials so we can see through the object, no matter their position
materialFolder
  .add(material, "alphaTest", 0, 1, 0.01)
  .onChange(() => updateMaterial());
materialFolder.add(material, "visible");
materialFolder
  .add(material, "side", options.side)
  .onChange(() => updateMaterial());
materialFolder.open();

function updateMaterial() {
  material.side = Number(material.side) as THREE.Side;
  material.needsUpdate = true;
}

function animate() {
  requestAnimationFrame(animate);

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
