/* Texture Mipmaps */

/*
Mipmapping is a texture rendering technique that is applied on a per-texture basis.

When mipmapping is enabled (default), the GPU will use different size versions of a texture to render a surface depending on how far away it is from the camera.
https://en.wikipedia.org/wiki/Mipmap

Magnification Filters
Defines the textures magnification function to be used when the pixel being textured maps to an area less than or equal to one texture element (texel).

texture.magFilter =

THREE.NearestFilter
THREE.LinearFilter (Default)
Minification Filters
Defines the textures minifying function that is used when the pixel being textured maps to an area greater than one texture element (texel).

texture.minFilter =

THREE.NearestFilter
THREE.NearestMipmapNearestFilter
THREE.NearestMipmapLinearFilter
THREE.LinearFilter
THREE.LinearMipmapNearestFilter
THREE.LinearMipmapLinearFilter (Default)
*/

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

const scene1 = new THREE.Scene();
const scene2 = new THREE.Scene();
// ! There is two scene because we have a "divider" to show comparison between 2 filters - the same will happen with 'axesHelper', geometry 'planeGeometry', 'TextureLoader', material MeshBasicMaterial, object 'plane'

const axesHelper1 = new THREE.AxesHelper(5);
scene1.add(axesHelper1);
const axesHelper2 = new THREE.AxesHelper(5);
scene2.add(axesHelper2);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const planeGeometry1 = new THREE.PlaneGeometry();
const planeGeometry2 = new THREE.PlaneGeometry();

const texture1 = new THREE.TextureLoader().load("img/grid.png");
const texture2 = texture1.clone();

const material1 = new THREE.MeshBasicMaterial({ map: texture1 });
const material2 = new THREE.MeshBasicMaterial({ map: texture2 });

texture2.minFilter = THREE.NearestFilter;
texture2.magFilter = THREE.NearestFilter;

const plane1 = new THREE.Mesh(planeGeometry1, material1);
const plane2 = new THREE.Mesh(planeGeometry2, material2);

scene1.add(plane1);
scene2.add(plane2);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const options = {
  minFilters: {
    NearestFilter: THREE.NearestFilter,
    NearestMipMapLinearFilter: THREE.NearestMipMapLinearFilter,
    NearestMipMapNearestFilter: THREE.NearestMipMapNearestFilter,
    "LinearFilter ": THREE.LinearFilter,
    "LinearMipMapLinearFilter (Default)": THREE.LinearMipMapLinearFilter,
    LinearMipmapNearestFilter: THREE.LinearMipmapNearestFilter,
  },
  magFilters: {
    NearestFilter: THREE.NearestFilter,
    "LinearFilter (Default)": THREE.LinearFilter,
  },
};
const gui = new GUI();
const textureFolder = gui.addFolder("THREE.Texture");
textureFolder
  .add(texture2, "minFilter", options.minFilters)
  .onChange(() => updateMinFilter());
textureFolder
  .add(texture2, "magFilter", options.magFilters)
  .onChange(() => updateMagFilter());
textureFolder.open();

function updateMinFilter() {
  texture2.minFilter = Number(texture2.minFilter) as THREE.TextureFilter;
  texture2.needsUpdate = true;
}
function updateMagFilter() {
  //   texture2.magFilter = Number(texture2.magFilter) as THREE.TextureFilter;
  texture2.needsUpdate = true;
}
// ! the MinFilter will change where the texture is drawn when it's being minified, in this case, the more 'distant' part of texture in the plane when you tilt it - NearestFilter and related will show every detail of the texture, even far from the camera. And the LinearFilter and related will give a blur to the more 'distant' part of the texture in the plane

// ! the MagFilter is a function that is applied when it has to magnofy or make larger the texture (closer to the camera) - the NearestFilter will bring a flickery texture and the LinearFilter will bring a smooth texture

const stats = new Stats();
document.body.appendChild(stats.dom);

function animate() {
  requestAnimationFrame(animate);

  render();

  stats.update();
}

function render() {
  renderer.setScissorTest(true);

  // ! setScissor display a line o divide the scene
  renderer.setScissor(0, 0, window.innerWidth / 2 - 2, window.innerHeight);
  renderer.render(scene1, camera);

  renderer.setScissor(
    window.innerWidth / 2,
    0,
    window.innerWidth / 2 - 2,
    window.innerHeight
  );

  renderer.render(scene2, camera);

  //   renderer.setScissorTest(false);
}
animate();
