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

scene.background = new THREE.Color(0x000000); //scene background
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

camera.position.z = 3;

/* camera2.position.y = 2;
camera2.lookAt(new THREE.Vector3());
camera3.position.x = -1;
camera3.lookAt(new THREE.Vector3(0, 0, 0));
camera4.position.z = 2;
camera5.position.z = 2; */
// ! 'position' changes the direction that canvas rotate

// camera.position.x = 4;
// camera.position.y = 4;
// camera.position.z = 4;

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

const renderer = new THREE.WebGLRenderer(); // ! 'new' is added just for constructors
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
// controls.target.set(5, -2, -5);
controls.screenSpacePanning = true; // default is now true since three r118. Used so that panning up and down doesn't zoom in/out
//controls.addEventListener('change', render)

const light1 = new THREE.PointLight(0xffffff, 1);
light1.position.set(0, 5, 10); // ! set(x position, y position, z position)
scene.add(light1);

// const light2 = new THREE.PointLight(0xffffff, 2);
// light2.position.set(-10, -10, -10);
// scene.add(light2);

// const object1 = new THREE.Mesh(
//   new THREE.SphereGeometry(),
//   new THREE.MeshPhongMaterial({ color: 0xff0000 }) // ! '0x' in three.js is replacing '#' from HTML
// );
// object1.position.set(4, 0, 0); // ! the position of the parent will affect all of its child
// scene.add(object1);
// object1.add(new THREE.AxesHelper(3));

// const object2 = new THREE.Mesh(
//   new THREE.SphereGeometry(),
//   new THREE.MeshPhongMaterial({ color: 0x00ff00 })
// );
// object2.position.set(4, 0, 0); // ! The 4 position on x axis will count from the parent position - local position (4) ≠ world position (4+4 = 8))
// object1.add(object2); // ! Link the 'object2'(child) to 'object1'(parent)
// object2.add(new THREE.AxesHelper(3));

// const object3 = new THREE.Mesh(
//   new THREE.SphereGeometry(),
//   new THREE.MeshPhongMaterial({ color: 0x0000ff })
// );
// object3.position.set(4, 0, 0); // ! The 4 position on x axis will count from the parent position (4+4+4 = 12)
// object2.add(object3); // ! Link the 'object3'(grandchild/child) to 'object2'(child/parent)
// object3.add(new THREE.AxesHelper(3));
// object3.add(new THREE.PointLight(0xf0f000, 10)); // ! this emits light from the object itself (lamp/bulb)

/* new OrbitControls(camera, renderer1.domElement);
new OrbitControls(camera2, renderer2.domElement);
new OrbitControls(camera3, renderer3.domElement);
new OrbitControls(camera4, renderer4.domElement);
new OrbitControls(camera5, renderer5.domElement); */
// ! Different cameras defined before can allows us to interact with canvas separately

// const boxGeometry = new THREE.BoxGeometry(); // ! store cube object - here can be define width, height, lenght, etc..
// const sphereGeometry = new THREE.SphereGeometry(); // ! store sphere object
// const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0); // ! store icosahedron object - (size/deep, more/less points; more points = more round; don't apply to negative number)
const planeGeometry = new THREE.PlaneGeometry(3.6, 1.8); // ! store plane object
// const TorusKnotGeometry = new THREE.TorusKnotGeometry(); // ! store knot object

// console.log(boxGeometry); // ! here we can access the array with all the points of the object stored by the Buffergeometrys

// const threeTone = new THREE.TextureLoader().load("img/threeTone.jpg");
// threeTone.minFilter = THREE.NearestFilter; // ! these lines guarantee that the shades won't be smooth, removing the cartoonish visual
// threeTone.magFilter = THREE.NearestFilter;

// const fourTone = new THREE.TextureLoader().load("img/fourTone.jpg");
// fourTone.minFilter = THREE.NearestFilter;
// fourTone.magFilter = THREE.NearestFilter;

// const fiveTone = new THREE.TextureLoader().load("img/fiveTone.jpg");
// fiveTone.minFilter = THREE.NearestFilter;
// fiveTone.magFilter = THREE.NearestFilter;

// ! Define the material (in general)
// const material = new THREE.MeshBasicMaterial({
//   color: 0x00ff00, // ! change color
//   wireframe: true, // ! give a outline (true)/solid (false) structure view
// });

// material.transparent = true; // ! Attributes without GUI
// material.opacity = 0.25;

// const material = new THREE.MeshBasicMaterial(); // ! MeshBasicMaterial doesn't have 'shadows', object get flat
// const material = new THREE.MeshNormalMaterial(); // ! Doesn't need lighting
// const material = new THREE.MeshLambertMaterial(); // ! Need lighting (Mesh.PointLight); defines an ideal matte or diffusely reflecting surface. Examples may be wood, or stone. Generally objects that aren't shiny, but are still affected by lighting.
const material = new THREE.MeshPhongMaterial(); // ! It is useful for simulating shiny objects such as polished wood, but it's computationally-expensive
// const material = new THREE.MeshStandardMaterial(); // ! It uses the Physically Based Rendering (PBR) model AND creates a more realistic appearance than the MeshLambertMaterial or the MeshPhongMaterial. It is also more computationally expensive.
// const material = new THREE.MeshPhysicalMaterial(); // ! It is an extension of the MeshStandardMaterial which gives more reflectivity options.
// material.reflectivity = 0;
// material.transmission = 1.0;
// material.roughness = 0.2;
// material.metalness = 0;
// material.clearcoat = 0.3;
// material.clearcoatRoughness = 0.25;
// material.color = new THREE.Color(0xffffff);
// material.ior = 1.2;
// material.thickness = 10.0;
// const material = new THREE.MeshMatcapMaterial(); // ! MatCap (Material Capture) shader uses an image of a sphere as a view-space environment map. The image contains pre baked colours and shading.
//const material: THREE.MeshToonMaterial = new THREE.MeshToonMaterial();
// /* ({gradientMap: fourTone,}) */
// ! Toon shading or Cel shading is a type of non-photorealistic rendering technique designed to make 3D computer graphics appear more cartoonish by using less shading color instead of a smooth gradient effect. We can add the gray scale directly in this material

// const texture = new THREE.TextureLoader().load("img/grid.png");
const texture = new THREE.TextureLoader().load("img/worldColour.5400x2700.jpg");
material.map = texture; // ! apply texture loaded above to material defined previously - texture ≠ color
// const pmremGenerator = new THREE.PMREMGenerator(renderer);
// const envTexture = new THREE.CubeTextureLoader().load(
//   [
//     "img/px_50.png",
//     "img/nx_50.png",
//     "img/py_50.png",
//     "img/ny_50.png",
//     "img/nz_50.png",
//     "img/pz_50.png",
//   ] // ! these 6 images represent the 'up' view, the 'front' view and the 'down' view - 'both' sides
//   () => {
//     material.envMap = pmremGenerator.fromCubemap(envTexture).texture;
//     pmremGenerator.dispose();
//     scene.background = material.envMap; // ! Add the 6 images textures to the scene background, creating an 360 environment
//   }
// );
const envTexture = new THREE.CubeTextureLoader().load([
  "img/px_eso0932a.jpg",
  "img/nx_eso0932a.jpg",
  "img/py_eso0932a.jpg",
  "img/ny_eso0932a.jpg",
  "img/pz_eso0932a.jpg",
  "img/nz_eso0932a.jpg",
]);
envTexture.mapping = THREE.CubeReflectionMapping; // ! Apply the 6 images in a 360º view
// envTexture.mapping = THREE.CubeRefractionMapping;
material.envMap = envTexture;

// const matcapTexture = new THREE.TextureLoader().load("img/matcap-opal.png");
// const matcapTexture = new THREE.TextureLoader().load("img/matcap-crystal.png");
// const matcapTexture = new THREE.TextureLoader().load("img/matcap-gold.png");
// const matcapTexture = new THREE.TextureLoader().load(
//   "img/matcap-red-light.png"
// );
// const matcapTexture = new THREE.TextureLoader().load(
//   "img/matcap-green-yellow-pink.png"
// );
// material.matcap = matcapTexture;

// const specularTexture = new THREE.TextureLoader().load(
//   "img/grayscale-test.png"
// ); // ! when light color picked on specular selector, the lighter /white image areas will appear (since the shininess radius is reaching these areas); when darker color/black is picked, the image won't appear
const specularTexture = new THREE.TextureLoader().load("img/earthSpecular.jpg");
material.specularMap = specularTexture;

// ! create cube object
// const cube = new THREE.Mesh(boxGeometry, material); // ! when we crate a mesh, the constructor needs some kind of geometry, and the geometry that we're passing has BufferGeometry as base class, like all geometries. It saves all data in buffers to reduce memory and CPU cycles
// /* cube.scale.x = 0.5;
// cube.scale.y = 0.5;
// cube.scale.z = 0.5; */
// cube.position.x = 5; // ! define cube position
// scene.add(cube); // ! add cube to the scene

// ! create sphere object
// const sphere = new THREE.Mesh(sphereGeometry, material);
// sphere.position.x = 3;
// scene.add(sphere);

// ! create icosahedron object
// const icosahedron = new THREE.Mesh(icosahedronGeometry, material);
// icosahedron.position.x = 0;
// scene.add(icosahedron);

// ! create plane object
const plane = new THREE.Mesh(planeGeometry, material);
// plane.position.x = -2;
scene.add(plane);

// ! create torusKnot object
// const torusKnot = new THREE.Mesh(TorusKnotGeometry, material);
// torusKnot.position.x = -5;
// scene.add(torusKnot);

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

// ! Stats display FPS/performance box in the browser
const stats = new Stats();
document.body.appendChild(stats.dom);

// ! Use dropodown in GUI
const options = {
  side: {
    FrontSide: THREE.FrontSide, // ! Same as 'material.side = THREE.Frontside'
    BackSide: THREE.BackSide, // ! A good option for environments like a house, you can see inside the object
    DoubleSide: THREE.DoubleSide,
  },
  // ! Options when combining layers of textures
  combine: {
    MultiplyOperation: THREE.MultiplyOperation, // ! Mix textures
    MixOperation: THREE.MixOperation, // ! overlap the layers and the underneath layer can be seen when the upper layer reflectivity is changed, but doens't need shininess
    AddOperation: THREE.AddOperation, // ! add upper texture to the underneath texture according to the reflectivity
  },
  // ! Options when MeshToonMaterial
  // gradientMap: {
  //   Default: null,
  //   threeTone: "threeTone",
  //   fourTone: "fourTone",
  //   fiveTone: "fiveTone",
  // },
};

const gui = new GUI();

/* Folders for cube object - Hide when publish*/
// const cubeFolder = gui.addFolder("Cube");
// ! It groups the controls with a title in a tab
// cubeFolder.open();
// ! Define the tab open once the page loads
// cubeFolder.add(cube, "visible", true);
// ! Gives to the browser controls an option to enable/disable the obejct visibility

// const cubeRotationFolder = gui.addFolder("Rotation");
// cubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2);
// ! Display controls in the page, in this case, to rotation on x axle, delivering 0 as minimun and Math.PI * 2 (= 360) as maximum
// cubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2);
// cubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2);
// ! Display controls for the other axles
// cubeRotationFolder.open();

// const cubePositionFolder = gui.addFolder("Position");
// cubePositionFolder.add(cube.position, "x", -10, 10, 2);
// cubePositionFolder.add(cube.position, "y", -10, 10, 2);
// cubePositionFolder.add(cube.position, "z", -10, 10, 2);
// ! the '2' value is for 'step' argument, which represents the 'jump' in the control values change
// cubePositionFolder.open();

// const cubeScaleFolder = gui.addFolder("Scale");
// cubeScaleFolder.add(cube.scale, "x", -5, 5); //.onFinishChange(() => console.dir(cube.geometry))
// ! Display controls, in this case, to rotation on x axle; Math.PI * 2 = 360
// cubeScaleFolder.add(cube.scale, "y", -5, 5);
// cubeScaleFolder.add(cube.scale, "z", -5, 5);
// ! Display controls for the other axles
// cubeScaleFolder.open();

// const cameraFolder = gui.addFolder("Camera");
// cameraFolder.add(camera.position, "x", 0, 20); // ! Camera position was define previously in this code (camera.position.z = 2;)
// cameraFolder.add(camera.position, "y", 0, 20);
// cameraFolder.add(camera.position, "z", 0, 20);
// cameraFolder.open();

/* Folders for Sphere objects - Hide when publish*/
// const object1Folder = gui.addFolder("Object1 - RED");
// object1Folder.add(object1.position, "x", 0, 10, 0.01).name("X Position");
// object1Folder.add(object1.position, "y", 0, 10, 0.01).name("Y Position");
// object1Folder.add(object1.position, "z", 0, 10, 0.01).name("Z Position");
// object1Folder
//   .add(object1.rotation, "x", 0, Math.PI * 2, 0.01)
//   .name("X Rotation");
// object1Folder
//   .add(object1.rotation, "y", 0, Math.PI * 2, 0.01)
//   .name("Y Rotation");
// object1Folder
//   .add(object1.rotation, "z", 0, Math.PI * 2, 0.01)
//   .name("Z Rotation");
// object1Folder.add(object1.scale, "x", 0, 2, 0.01).name("X Scale");
// object1Folder.add(object1.scale, "y", 0, 2, 0.01).name("Y Scale");
// object1Folder.add(object1.scale, "z", 0, 2, 0.01).name("Z Scale");
// object1Folder.open();

// const object2Folder = gui.addFolder("Object2 - GREEN");
// object2Folder.add(object2.position, "x", 0, 10, 0.01).name("X Position");
// object2Folder.add(object2.position, "y", 0, 10, 0.01).name("Y Position");
// object2Folder.add(object2.position, "z", 0, 10, 0.01).name("Z Position");
// object2Folder
//   .add(object2.rotation, "x", 0, Math.PI * 2, 0.01)
//   .name("X Rotation");
// object2Folder
//   .add(object2.rotation, "y", 0, Math.PI * 2, 0.01)
//   .name("Y Rotation");
// object2Folder
//   .add(object2.rotation, "z", 0, Math.PI * 2, 0.01)
//   .name("Z Rotation");
// object2Folder.add(object2.scale, "x", 0, 2, 0.01).name("X Scale");
// object2Folder.add(object2.scale, "y", 0, 2, 0.01).name("Y Scale");
// object2Folder.add(object2.scale, "z", 0, 2, 0.01).name("Z Scale");
// object2Folder.open();

// const object3Folder = gui.addFolder("Object3 - BLUE");
// object3Folder.add(object3.position, "x", 0, 10, 0.01).name("X Position");
// object3Folder.add(object3.position, "y", 0, 10, 0.01).name("Y Position");
// object3Folder.add(object3.position, "z", 0, 10, 0.01).name("Z Position");
// object3Folder
//   .add(object3.rotation, "x", 0, Math.PI * 2, 0.01)
//   .name("X Rotation");
// object3Folder
//   .add(object3.rotation, "y", 0, Math.PI * 2, 0.01)
//   .name("Y Rotation");
// object3Folder
//   .add(object3.rotation, "z", 0, Math.PI * 2, 0.01)
//   .name("Z Rotation");
// object3Folder.add(object3.scale, "x", 0, 2, 0.01).name("X Scale");
// object3Folder.add(object3.scale, "y", 0, 2, 0.01).name("Y Scale");
// object3Folder.add(object3.scale, "z", 0, 2, 0.01).name("Z Scale");
// object3Folder.open();

// ! Create cube GUI properties
// const cubeData = {
//   width: 1,
//   height: 1,
//   depth: 1,
//   widthSegments: 1,
//   heightSegments: 1,
//   depthSegments: 1,
// };

// ! Define and add cube properties to GUI with min and max values
// const cubePropertiesFolder = cubeFolder.addFolder("Properties");
// cubePropertiesFolder
//   .add(cubeData, "width", 1, 30)
//   .onChange(regenerateBoxGeometry)
//   .onFinishChange(() => console.dir(cube.geometry));
// cubePropertiesFolder
//   .add(cubeData, "height", 1, 30)
//   .onChange(regenerateBoxGeometry);
// cubePropertiesFolder
//   .add(cubeData, "depth", 1, 30)
//   .onChange(regenerateBoxGeometry);
// cubePropertiesFolder
//   .add(cubeData, "widthSegments", 1, 30)
//   .onChange(regenerateBoxGeometry);
// cubePropertiesFolder
//   .add(cubeData, "heightSegments", 1, 30)
//   .onChange(regenerateBoxGeometry);
// cubePropertiesFolder
//   .add(cubeData, "depthSegments", 1, 30)
//   .onChange(regenerateBoxGeometry);

// function regenerateBoxGeometry() {
//   const newGeometry = new THREE.BoxGeometry(
//     cubeData.width,
//     cubeData.height,
//     cubeData.depth,
//     cubeData.widthSegments,
//     cubeData.heightSegments,
//     cubeData.depthSegments
//   );
// ! Replace builtin properties for the new ones
//   cube.geometry.dispose();
//   cube.geometry = newGeometry;
// }

// const sphereData = {
//   radius: 1,
//   widthSegments: 8,
//   heightSegments: 6,
//   phiStart: 0,
//   phiLenght: Math.PI * 2,
//   thetaStart: 0,
//   thetaLenght: Math.PI,
// };

// const sphereFolder = gui.addFolder("Sphere");
// const spherePropertiesFolder = sphereFolder.addFolder("Properties");
// spherePropertiesFolder
//   .add(sphereData, "radius", 0.1, 30)
//   .onChange(regenerateSphereGeometry);
// spherePropertiesFolder
//   .add(sphereData, "widthSegments", 1, 32)
//   .onChange(regenerateSphereGeometry);
// spherePropertiesFolder
//   .add(sphereData, "heightSegments", 1, 16)
//   .onChange(regenerateSphereGeometry);
// spherePropertiesFolder
//   .add(sphereData, "phiStart", 0, Math.PI * 2)
//   .onChange(regenerateSphereGeometry);
// spherePropertiesFolder
//   .add(sphereData, "phiLenght", 0, Math.PI * 2)
//   .onChange(regenerateSphereGeometry);
// spherePropertiesFolder
//   .add(sphereData, "thetaStart", 0, Math.PI * 2)
//   .onChange(regenerateSphereGeometry);
// spherePropertiesFolder
//   .add(sphereData, "thetaLenght", 0, Math.PI * 2)
//   .onChange(regenerateSphereGeometry);

// function regenerateSphereGeometry() {
//   const newGeometry = new THREE.SphereGeometry(
//     sphereData.radius,
//     sphereData.widthSegments,
//     sphereData.heightSegments,
//     sphereData.phiStart,
//     sphereData.phiLenght,
//     sphereData.thetaStart,
//     sphereData.thetaLenght
//   );
//   sphere.geometry.dispose();
//   sphere.geometry = newGeometry;
// }

// const icosahedronData = {
//   radius: 1,
//   detail: 0,
// };

// const icosahedronFolder = gui.addFolder("Iconsahedron");
// const icosahedronPropertiesFolder = icosahedronFolder.addFolder("Properties");
// icosahedronPropertiesFolder
//   .add(icosahedronData, "radius", 0.1, 10)
//   .onChange(regenerateIconsahedronGeometry);
// icosahedronPropertiesFolder
//   .add(icosahedronData, "detail", 0, 5)
//   .step(1)
//   .onChange(regenerateIconsahedronGeometry);

// function regenerateIconsahedronGeometry() {
//   const newGeometry = new THREE.IcosahedronGeometry(
//     icosahedronData.radius,
//     icosahedronData.detail
//   );
//   icosahedron.geometry.dispose();
//   icosahedron.geometry = newGeometry;
// }

/* Folder for materials */
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

/* Folder for MeshBasicMaterial */
// var data = {
//   color: material.color.getHex(),
// };

// const meshBasicMaterialFolder = gui.addFolder("THREE.MeshBasicMaterial");
// meshBasicMaterialFolder.addColor(data, "color").onChange(() => {
//   material.color.setHex(Number(data.color.toString().replace("#", "0x")));
// });
// meshBasicMaterialFolder.add(material, "wireframe"); // ! Display a checkbox on GUI to toggle between wireframe or material
// ! Remembering: color and wireframe can be set on the 'const material'
// meshBasicMaterialFolder.add(material, "wireframeLinewidth", 0, 10); //! deprecated
// meshBasicMaterialFolder
//   .add(material, "combine", options.combine)
//   .onChange(() => updateMaterial()); // ! use to combine layers of textures
// meshBasicMaterialFolder.add(material, "reflectivity", 0, 1); // ! Control how much the texture will appear, like opacity
// meshBasicMaterialFolder.add(material, "refractionRatio", 0, 1); // ! apply just for 'CubeRefractionMapping' changing the 'deep' of the image
// meshBasicMaterialFolder.open();

/* Folder for MeshNormalMaterial */
// const meshNormalMaterialFolder = gui.addFolder("THREE.MeshNormalMaterial");

// meshNormalMaterialFolder.add(material, "wireframe");
// meshNormalMaterialFolder
//   .add(material, "flatShading")
//   .onChange(() => updateMaterial());
// meshNormalMaterialFolder.open();

/* Folder for MeshLambertMaterial */

// const data = {
//   color: material.color.getHex(),
//   emissive: material.emissive.getHex(), // ! With emissive, the light/shadow that the object itself has, MeshLambertMaterial doens't need the Mesh.PointLight
// };

// const meshLambertMaterialFolder = gui.addFolder("THREE.MeshLambertMaterial");

// meshLambertMaterialFolder.addColor(data, "color").onChange(() => {
//   material.color.setHex(Number(data.color.toString().replace("#", "0x")));
// });
// meshLambertMaterialFolder.addColor(data, "emissive").onChange(() => {
//   material.emissive.setHex(Number(data.emissive.toString().replace("#", "0x")));
// }); // ! emissive can be useful if your background is a constant color
// meshLambertMaterialFolder.add(material, "wireframe");
// meshLambertMaterialFolder.add(material, "wireframeLinewidth", 0, 10);
// //meshLambertMaterialFolder.add(material, 'flatShading').onChange(() => updateMaterial())
// meshLambertMaterialFolder
//   .add(material, "combine", options.combine)
//   .onChange(() => updateMaterial());
// meshLambertMaterialFolder.add(material, "reflectivity", 0, 1);
// meshLambertMaterialFolder.add(material, "refractionRatio", 0, 1);
// meshLambertMaterialFolder.open();

/* Folder for MeshPhongMaterial */

// const data = {
//   color: material.color.getHex(),
//   emissive: material.emissive.getHex(),
//   specular: material.specular.getHex(), // ! define the shine color
// };

// const meshPhongMaterialFolder = gui.addFolder("THREE.MeshPhongMaterial");
// meshPhongMaterialFolder.addColor(data, "color").onChange(() => {
//   material.color.setHex(Number(data.color.toString().replace("#", "0x")));
// });
// meshPhongMaterialFolder.addColor(data, "emissive").onChange(() => {
//   material.emissive.setHex(Number(data.emissive.toString().replace("#", "0x")));
// });
// meshPhongMaterialFolder.addColor(data, "specular").onChange(() => {
//   material.specular.setHex(Number(data.specular.toString().replace("#", "0x")));
// });
// meshPhongMaterialFolder.add(material, "shininess", 0, 1024); // ! more shine = less difuse is the light reflect on the object
// meshPhongMaterialFolder.add(material, "wireframe");
// // meshPhongMaterialFolder.add(material, "wireframeLinewidth", 0, 10);
// meshPhongMaterialFolder
//   .add(material, "flatShading")
//   .onChange(() => updateMaterial());
// meshPhongMaterialFolder
//   .add(material, "combine", options.combine)
//   .onChange(() => updateMaterial());
// meshPhongMaterialFolder.add(material, "reflectivity", 0, 1); // ! t affects just the upper layer fo textures
// meshPhongMaterialFolder.add(material, "refractionRatio", 0, 1);
// meshPhongMaterialFolder.open();

/* Folder for MeshStandardMaterial */

// const data = {
//   color: material.color.getHex(),
//   emissive: material.emissive.getHex(),
//   specular: material.specular.getHex(), // ! define the shine color
// };

// const meshStandardMaterialFolder = gui.addFolder("THREE.MeshStandardMaterial");
// meshStandardMaterialFolder.addColor(data, "color").onChange(() => {
//   material.color.setHex(Number(data.color.toString().replace("#", "0x")));
// });
// meshStandardMaterialFolder.addColor(data, "emissive").onChange(() => {
//   material.emissive.setHex(Number(data.emissive.toString().replace("#", "0x")));
// });
// meshStandardMaterialFolder.add(material, "wireframe");
// meshStandardMaterialFolder
//   .add(material, "flatShading")
//   .onChange(() => updateMaterial());
// meshStandardMaterialFolder.add(material, "roughness", 0, 1);
// meshStandardMaterialFolder.add(material, "metalness", 0, 1);
// meshStandardMaterialFolder.open();

/* Folder for MeshPhysicalMaterial */

// const data = {
//   color: material.color.getHex(),
//   emissive: material.emissive.getHex(),
// };

// const meshPhysicalMaterialFolder = gui.addFolder("THREE.MeshPhysicalMaterial");

// meshPhysicalMaterialFolder.addColor(data, "color").onChange(() => {
//   material.color.setHex(Number(data.color.toString().replace("#", "0x")));
// });
// meshPhysicalMaterialFolder.addColor(data, "emissive").onChange(() => {
//   material.emissive.setHex(Number(data.emissive.toString().replace("#", "0x")));
// });

// meshPhysicalMaterialFolder.add(material, "wireframe");
// meshPhysicalMaterialFolder
//   .add(material, "flatShading")
//   .onChange(() => updateMaterial());
// meshPhysicalMaterialFolder.add(material, "reflectivity", 0, 1);
// meshPhysicalMaterialFolder.add(material, "roughness", 0, 1);
// meshPhysicalMaterialFolder.add(material, "metalness", 0, 1);
// meshPhysicalMaterialFolder.add(material, "clearcoat", 0, 1, 0.01);
// meshPhysicalMaterialFolder.add(material, "clearcoatRoughness", 0, 1, 0.01);
// meshPhysicalMaterialFolder.add(material, "transmission", 0, 1, 0.01);
// meshPhysicalMaterialFolder.add(material, "ior", 1.0, 2.333);
// meshPhysicalMaterialFolder.add(material, "thickness", 0, 10.0);
// meshPhysicalMaterialFolder.open();

/* Folder for MeshMatcapMaterial */
// const data = {
//   color: material.color.getHex(),
// };

// const meshMatcapMaterialFolder = gui.addFolder("THREE.MeshMatcapMaterial");
// meshMatcapMaterialFolder.addColor(data, "color").onChange(() => {
//   material.color.setHex(Number(data.color.toString().replace("#", "0x")));
// });
// meshMatcapMaterialFolder
//   .add(material, "flatShading")
//   .onChange(() => updateMaterial());
// meshMatcapMaterialFolder.open();

/* Folder for MeshToonMaterial */
// const data = {
//   lightColor: light1.color.getHex(),
//   color: material.color.getHex(),
//   gradientMap: "threeTone",
// };

// material.gradientMap = threeTone;

// const lightFolder = gui.addFolder("THREE.Light");
// lightFolder.addColor(data, "lightColor").onChange(() => {
//   light1.color.setHex(Number(data.lightColor.toString().replace("#", "0x")));
// });
// lightFolder.add(light1, "intensity", 0, 4);

// const meshToonMaterialFolder = gui.addFolder("THREE.MeshToonMaterial");
// meshToonMaterialFolder.addColor(data, "color").onChange(() => {
//   material.color.setHex(Number(data.color.toString().replace("#", "0x")));
// });

// //shininess, specular and flatShading no longer supported in MeshToonMaterial

// meshToonMaterialFolder
//   .add(data, "gradientMap", options.gradientMap)
//   .onChange(() => updateMaterial());
// meshToonMaterialFolder.open();

/* Folder for SpecularMap + MeshPhongMaterial (could be MeshLambert and MashToon)*/
const data = {
  color: material.color.getHex(),
  emissive: material.emissive.getHex(),
  specular: material.specular.getHex(), // ! specular affects the shine color and also, in a white/gray/black scale, whiter will be more affected and darker will be less affected
};

const meshPhongMaterialFolder = gui.addFolder("THREE.MeshPhongMaterial");

meshPhongMaterialFolder.addColor(data, "color").onChange(() => {
  material.color.setHex(Number(data.color.toString().replace("#", "0x")));
});
meshPhongMaterialFolder.addColor(data, "emissive").onChange(() => {
  material.emissive.setHex(Number(data.emissive.toString().replace("#", "0x")));
});
meshPhongMaterialFolder.addColor(data, "specular").onChange(() => {
  material.specular.setHex(Number(data.specular.toString().replace("#", "0x")));
});
meshPhongMaterialFolder.add(material, "shininess", 0, 1024);
meshPhongMaterialFolder.add(material, "wireframe");
meshPhongMaterialFolder
  .add(material, "flatShading")
  .onChange(() => updateMaterial());
meshPhongMaterialFolder
  .add(material, "combine", options.combine)
  .onChange(() => updateMaterial());
meshPhongMaterialFolder.add(material, "reflectivity", 0, 1);
meshPhongMaterialFolder.open();

function updateMaterial() {
  material.side = Number(material.side) as THREE.Side;
  material.combine = Number(material.combine) as THREE.Combine;
  // material.gradientMap = eval(data.gradientMap as string);
  material.needsUpdate = true;
}

// const debug = document.getElementById("debug1") as HTMLDivElement;

// ! Create the loop animation
function animate() {
  requestAnimationFrame(animate);
  // ! 60fps
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // /* cube2.rotation.y += 0.01; */
  // torusKnot.rotation.x += 0.01;
  // torusKnot.rotation.y += 0.01;

  // controls.update();
  render();

  // const object1WorldPosition = new THREE.Vector3();
  // object1.getWorldPosition(object1WorldPosition);

  // const object1WorldRotation = new THREE.Quaternion();
  // object1.getWorldQuaternion(object1WorldRotation);

  // const object1WorldScale = new THREE.Vector3();
  // object1.getWorldScale(object1WorldScale);

  // const object2WorldPosition = new THREE.Vector3();
  // object2.getWorldPosition(object2WorldPosition);

  // const object2WorldRotation = new THREE.Quaternion();
  // object2.getWorldQuaternion(object2WorldRotation);

  // const object2WorldScale = new THREE.Vector3();
  // object2.getWorldScale(object2WorldScale);

  // const object3WorldPosition = new THREE.Vector3();
  // object3.getWorldPosition(object3WorldPosition);

  // const object3WorldRotation = new THREE.Quaternion();
  // object3.getWorldQuaternion(object3WorldRotation);

  // const object3WorldScale = new THREE.Vector3();
  // object3.getWorldScale(object3WorldScale);

  // debug.innerText =
  // "Red\n\n" +
  // "Local Pos X : " +
  // object1.position.x.toFixed(2) + // ! toFixed(argument) define the decimals number on the "debug1"
  // "\n" +
  // "Local Pos Y : " +
  // object1.position.y.toFixed(2) +
  // "\n" +
  // "Local Pos Z : " +
  // object1.position.z.toFixed(2) +
  // "\n\n" +
  // "Local Rot X : " +
  // object1.rotation.x.toFixed(2) +
  // "\n" +
  // "Local Rot Y : " +
  // object1.rotation.y.toFixed(2) +
  // "\n" +
  // "Local Rot Z : " +
  // object1.rotation.z.toFixed(2) +
  // "\n\n" +
  // "World Pos X : " +
  // object1WorldPosition.x.toFixed(2) +
  // "\n" +
  // "World Pos Y : " +
  // object1WorldPosition.y.toFixed(2) +
  // "\n" +
  // "World Pos Z : " +
  // object1WorldPosition.z.toFixed(2) +
  // "\n\n" +
  // "World Rot X : " +
  // object1WorldRotation.x.toFixed(2) +
  // "\n" +
  // "World Rot Y : " +
  // object1WorldRotation.y.toFixed(2) +
  // "\n" +
  // "World Rot Z : " +
  // object1WorldRotation.z.toFixed(2) +
  // "\n" +
  // "\nGreen\n\n" +
  // "Local Pos X : " +
  // object2.position.x.toFixed(2) +
  // "\n" +
  // "Local Pos Y : " +
  // object2.position.y.toFixed(2) +
  // "\n" +
  // "Local Pos Z : " +
  // object2.position.z.toFixed(2) +
  // "\n" +
  // "World Pos X : " +
  // object2WorldPosition.x.toFixed(2) +
  // "\n" +
  // "World Pos Y : " +
  // object2WorldPosition.y.toFixed(2) +
  // "\n" +
  // "World Pos Z : " +
  // object2WorldPosition.z.toFixed(2) +
  // "\n" +
  // "\nBlue\n\n" +
  // "Local Pos X : " +
  // object3.position.x.toFixed(2) +
  // "\n" +
  // "Local Pos Y : " +
  // object3.position.y.toFixed(2) +
  // "\n" +
  // "Local Pos Z : " +
  // object3.position.z.toFixed(2) +
  // "\n" +
  // "World Pos X : " +
  // object3WorldPosition.x.toFixed(2) +
  // "\n" +
  // "World Pos Y : " +
  // object3WorldPosition.y.toFixed(2) +
  // "\n" +
  // "World Pos Z : " +
  // object3WorldPosition.z.toFixed(2) +
  // "\n";

  // "Matrix\n" + cube.matrix.elements.toString().replace(/,/g, "\n");

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
