/* Download Progress Indicator */

/*
When downloading large assets, the end user of your application may need to wait sometime.

The length of time will depend on many factors, such as size of file and quality of internet connection.

To indicate to the end user, how long they can expect to wait, it is useful to provide some kind of visual feedback showing the progress of a download.

We can use the browsers XMLHttpRequest web API to calculate the progress. The XMLHttpRequest registers a ProgressEvent which contains values that we can use.

All Threejs loaders that extend from the THREE.LoadingManager, can read the ProgressEvent via the onProgress callback.

One important thing to note about calculating the progress, is that we need to know the size of the file that is being downloaded. In the sample code above, note the property xhr.total in line 9.

Not all browser versions can read, or even web servers will provide, the Content-Length header in the HTML response that is used to get that total value.

The web server serving this website is a version of Nginx server that provides the Content-Length header value in responses by default. If your browser can read the total value, then you will notice that some of my other working Threejs examples throughout this site, do show a download progress indicator.

If you are developing your application using the Webpack Dev Server, as is taught in the course, then depending on the version you installed, it also may not send the Content-Length header in the HTML responses. So the xhr.total will always equate to 0. Line 9 above, (xhr.loaded / xhr.total), will equate to infinity since the xhr.loaded will be divided by 0.

One trick to enable the Webpack Dev Server to send the Content-Length header in responses, is to edit the ./src/client/webpack.dev.js of this course boilerplate, and add this highlighted line below:

const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, '../../dist/client'),
        },
        hot: true,
        > headers: { 'Content-Encoding': 'none' },
    },
})
In client.ts:
- Create a reference to the progressBar HTML element (lines 30-32).
- We can use it (line 43).
- We can hide it in the loaders onSuccess callback before adding the downloaded model to the scene (line 38).
*/
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Stats from "three/examples/jsm/libs/stats.module";

const scene = new THREE.Scene();

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.25));

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(1.15, 1.15, 1.15);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.y = 1;

const progressBar = document.getElementById(
  "progressBar"
) as HTMLProgressElement;

const loader = new GLTFLoader();
loader.load(
  "models/walkModel2.glb",
  function (gltf) {
    progressBar.style.display = "none";
    scene.add(gltf.scene);
  },
  (xhr) => {
    const percentComplete = (xhr.loaded / xhr.total) * 100;
    progressBar.value = percentComplete === Infinity ? 100 : percentComplete;
  }
);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}
window.addEventListener("resize", onWindowResize, false);

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
