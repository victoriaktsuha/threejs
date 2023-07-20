/* Spot Light Shadow */

/*
The Spot Light Shadow uses a PerspectiveCamera frustum to calculate the shadows.

The PerspectiveCamera defaults are:
Direction - Value
    near - 0.5
    far - If the owning spotlight distance is set higher than 0, it will use that, otherwise it uses the default 500
    fov - the angle property of the owning spotlight via the update method
    aspect - aspect of the mapSize, default 512/512 = 1

Possible renderer.shadowMap.type values:
Type - Value
    BasicShadowMap - gives unfiltered shadow maps - fastest, but lowest quality.
    PCFShadowMap - (Default) filters shadow maps using the Percentage-Closer Filtering (PCF) algorithm (default).
    PCFSoftShadowMap - filters shadow maps using the Percentage-Closer Soft Shadows (PCSS) algorithm.
    VSMShadowMap - filters shadow maps using the Variance Shadow Map (VSM) algorithm. When using VSMShadowMap all shadow receivers will also cast shadows.
*/

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const light = new THREE.SpotLight();
light.castShadow = true; // ! Enable light to cast shadow
light.shadow.mapSize.width = 512; // increasing the width/height can let shadow less pixelated
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 100;
scene.add(light);

// const helper = new THREE.SpotLightHelper(light);
const helper = new THREE.CameraHelper(light.shadow.camera);
scene.add(helper);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 7;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // ! It will draw the object silhouette
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // !default
// renderer.shadowMap.type = THREE.BasicShadowMap; // ! pixelated
// renderer.shadowMap.type = THREE.PCFShadowMap; // ! less smoother than PCFSoftShadowMap
// renderer.shadowMap.type = THREE.VSMShadowMap; // Kind of 'cartoonish'
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(100, 20);
const plane = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial());
plane.rotateX(-Math.PI / 2);
plane.position.y = -1.75;
plane.receiveShadow = true; // ! the object need to have an option to cast and also receive shadow - the plane in this case will just receive
scene.add(plane);

const torusGeometry = [
  new THREE.TorusGeometry(),
  new THREE.TorusGeometry(),
  new THREE.TorusGeometry(),
  new THREE.TorusGeometry(),
  new THREE.TorusGeometry(),
];

const material = [
  new THREE.MeshBasicMaterial(),
  new THREE.MeshLambertMaterial(),
  new THREE.MeshPhongMaterial(),
  new THREE.MeshPhysicalMaterial({}),
  new THREE.MeshToonMaterial(),
];

const torus = [
  new THREE.Mesh(torusGeometry[0], material[0]),
  new THREE.Mesh(torusGeometry[1], material[1]),
  new THREE.Mesh(torusGeometry[2], material[2]),
  new THREE.Mesh(torusGeometry[3], material[3]),
  new THREE.Mesh(torusGeometry[4], material[4]),
];

const texture = new THREE.TextureLoader().load("img/grid.png");
material[0].map = texture;
material[1].map = texture;
material[2].map = texture;
material[3].map = texture;
material[4].map = texture;

torus[0].position.x = -8;
torus[1].position.x = -4;
torus[2].position.x = 0;
torus[3].position.x = 4;
torus[4].position.x = 8;

// ! the object need to have an option to cast and also receive shadow
torus[0].castShadow = true;
torus[1].castShadow = true;
torus[2].castShadow = true;
torus[3].castShadow = true;
torus[4].castShadow = true;

torus[0].receiveShadow = true;
torus[1].receiveShadow = true;
torus[2].receiveShadow = true;
torus[3].receiveShadow = true;
torus[4].receiveShadow = true;

scene.add(torus[0]);
scene.add(torus[1]);
scene.add(torus[2]);
scene.add(torus[3]);
scene.add(torus[4]);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const stats = new Stats();
document.body.appendChild(stats.dom);

const data = {
  color: light.color.getHex(),
  mapsEnabled: true,
  shadowMapSizeWidth: 512, // increasing the width/height can let shadow less pixelated
  shadowMapSizeHeight: 512,
};

const gui = new GUI();
const lightFolder = gui.addFolder("THREE.Light");
lightFolder.addColor(data, "color").onChange(() => {
  light.color.setHex(Number(data.color.toString().replace("#", "0x")));
});
lightFolder.add(light, "intensity", 0, 1, 0.01);

const spotLightFolder = gui.addFolder("THREE.SpotLight");
spotLightFolder.add(light, "distance", 0, 100, 0.01);
spotLightFolder.add(light, "decay", 0, 4, 0.1);
spotLightFolder.add(light, "angle", 0, 1, 0.1);
spotLightFolder.add(light, "penumbra", 0, 1, 0.1);
//spotLightFolder.add(light.shadow.camera, "near", 0.1, 100).onChange(() => light.shadow.camera.updateProjectionMatrix())
//spotLightFolder.add(light.shadow.camera, "far", 0.1, 100).onChange(() => light.shadow.camera.updateProjectionMatrix())
spotLightFolder
  .add(data, "shadowMapSizeWidth", [256, 512, 1024, 2048, 4096])
  .onChange(() => updateShadowMapSize());
spotLightFolder
  .add(data, "shadowMapSizeHeight", [256, 512, 1024, 2048, 4096])
  .onChange(() => updateShadowMapSize());
spotLightFolder.add(light.position, "x", -50, 50, 0.01);
spotLightFolder.add(light.position, "y", -50, 50, 0.01);
spotLightFolder.add(light.position, "z", -50, 50, 0.01);
spotLightFolder.open();

function updateShadowMapSize() {
  light.shadow.mapSize.width = data.shadowMapSizeWidth;
  light.shadow.mapSize.height = data.shadowMapSizeHeight;
  (light.shadow.map as any) = null;
}

const meshesFolder = gui.addFolder("Meshes");
meshesFolder.add(data, "mapsEnabled").onChange(() => {
  material.forEach((m) => {
    if (data.mapsEnabled) {
      m.map = texture;
    } else {
      m.map = null;
    }
    m.needsUpdate = true;
  });
});

function animate() {
  requestAnimationFrame(animate);

  helper.update();

  torus.forEach((t) => {
    t.rotation.y += 0.01;
  });

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
