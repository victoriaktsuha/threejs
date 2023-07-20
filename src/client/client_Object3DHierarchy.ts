/* Object3D Hierarchy */

/* NEED the follow HTML:
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Three.js TypeScript Tutorials by Sean Bradley : https://sbcode.net/threejs</title>
        <style>
            body {
                overflow: hidden;
                margin: 0px;
            }
            #debug1 {
                font-family: monospace;
                font-size: larger;
                position: absolute;
                left: 0px;
                top: 50px;
                border: 1px solid red;
                width: 180px;
                height: 220px;
                color: white;
                pointer-events: none;
            }
        </style>
    </head>

    <body>
        <div id="debug1"></div>
        <script type="module" src="bundle.js"></script>
    </body>
</html>
*/

/* 
The scene is an Object3D. You can add other Object3Ds to the scene and they become children of the scene. The scene itself is derived from the Object3D base class.

If you rotate the scene, or scale the scene, or translate its position, it will affect all if its child objects.

You make an Object3D a child of another Object3D by using the parents add method. = > scene.add(cube)

You can also add Object3Ds to other Object3Ds that are already part of the scene. Any changes to the Object3D such as position, scale, rotation will affect all of the children under the same parent equally.

It is possible to create a Hierarchy of Object3Ds by continually adding new objects to any existing objects.

scene
    |--object1 (Red Ball)
             |--object2 (Green Ball)
                       |--object3 (Blue Ball)

In this example, the blue ball is a child of the green ball, which is a child of the red ball.

Any changes to the red ball will effect the green and blue balls,

Any changes to the green ball, will affect the blue ball, but not its parent, the red ball.

Any changes to the blue ball, have no effect on its parent, or grand parent balls.

Any number of Object3Ds can be added as children of other Object3Ds.

An Object3D can have only 1 parent, and you can change its parent dynamically any time.

Changing an Object3Ds parent will affect the current position, scale and rotation based in the parent it has now become a child of.

code/
scene.position.set(0, 0, 0) // this is default position of a scene, and any Object3Ds
cube.position.set(5, 0, 0) // cube is offset x = 5 from of its parent.
scene.add(cube) // add the cube to the scene. The scene becomes its parent Object3D.

sphere.position.set(3, 0, 0) // sphere is offset x = 3 from the center of its parent.
cube.add(sphere) // The spheres parent is now the cube. The sphere will be x=3 offset from the cube in local space. So that will be 8 in world space since the cube is a child of the scene and is already offset x = 5.
/code

Getting an Object3D transform, such as position, rotation/quaternion and scale will return the values in local transform space. If the Object3D is a direct descendant of the scene, then the world space values will be identical.

If your Object3D is a child of another Object3D which is already a child of the scene, then the world transform values will also consider the transforms of its parent, grandparents, great grandparents etc.

code/
obj.position // values are local transform
obj.rotation // values are local transform
obj.quaternion // values are local transform
obj.scale // values are local transform
/code

To get the world transforms of an object:

code/
const objectsWorldPosition = new THREE.Vector3()
object.getWorldPosition(objectsWorldPosition)

const objectsWorldDirection = new THREE.Vector3()
object.getWorldDirection(objectsWorldDirection)

const objectsWorldQuaternion = new THREE.Quaternion()
object.getWorldQuaternion(objectsWorldQuaternion)

const objectsWorldScale = new THREE.Vector3()
object.getWorldScale(objectsWorldScale)
/code
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
camera.position.x = 4;
camera.position.y = 4;
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(8, 0, 0);

const light1 = new THREE.PointLight();
light1.position.set(10, 10, 10);
scene.add(light1);

const light2 = new THREE.PointLight();
light2.position.set(-10, 10, 10);
scene.add(light2);

const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshPhongMaterial({ color: 0xff0000 }) // ! '0x' in three.js is replacing '#' from HTML
);
object1.position.set(4, 0, 0); // ! the position of the parent will affect all of its child
scene.add(object1);
object1.add(new THREE.AxesHelper(5));

const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshPhongMaterial({ color: 0x00ff00 })
);
object2.position.set(4, 0, 0); // ! The 4 position on x axis will count from the parent position - local position (4) ≠ world position (4+4 = 8))
object1.add(object2); // ! Link the 'object2'(child) to 'object1'(parent)
object2.add(new THREE.AxesHelper(5));

const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshPhongMaterial({ color: 0x0000ff })
);
object3.position.set(4, 0, 0); // ! The 4 position on x axis will count from the parent position (4+4+4 = 12)
object2.add(object3); // ! Link the 'object3'(grandchild/child) to 'object2'(child/parent)
object3.add(new THREE.AxesHelper(5));
// object3.add(new THREE.PointLight(0xf0f000, 10)); // ! this emits light from the object itself (lamp/bulb)

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const gui = new GUI();
const object1Folder = gui.addFolder("Object1 - RED");
object1Folder.add(object1.position, "x", 0, 10, 0.01).name("X Position");
object1Folder.add(object1.position, "y", 0, 10, 0.01).name("Y Position");
object1Folder.add(object1.position, "z", 0, 10, 0.01).name("Z Position");
object1Folder
  .add(object1.rotation, "x", 0, Math.PI * 2, 0.01)
  .name("X Rotation");
object1Folder
  .add(object1.rotation, "y", 0, Math.PI * 2, 0.01)
  .name("Y Rotation");
object1Folder
  .add(object1.rotation, "z", 0, Math.PI * 2, 0.01)
  .name("Z Rotation");
object1Folder.add(object1.scale, "x", 0, 2, 0.01).name("X Scale");
object1Folder.add(object1.scale, "y", 0, 2, 0.01).name("Y Scale");
object1Folder.add(object1.scale, "z", 0, 2, 0.01).name("Z Scale");
object1Folder.open();

const object2Folder = gui.addFolder("Object2 - GREEN");
object2Folder.add(object2.position, "x", 0, 10, 0.01).name("X Position");
object2Folder.add(object2.position, "y", 0, 10, 0.01).name("Y Position");
object2Folder.add(object2.position, "z", 0, 10, 0.01).name("Z Position");
object2Folder
  .add(object2.rotation, "x", 0, Math.PI * 2, 0.01)
  .name("X Rotation");
object2Folder
  .add(object2.rotation, "y", 0, Math.PI * 2, 0.01)
  .name("Y Rotation");
object2Folder
  .add(object2.rotation, "z", 0, Math.PI * 2, 0.01)
  .name("Z Rotation");
object2Folder.add(object2.scale, "x", 0, 2, 0.01).name("X Scale");
object2Folder.add(object2.scale, "y", 0, 2, 0.01).name("Y Scale");
object2Folder.add(object2.scale, "z", 0, 2, 0.01).name("Z Scale");
object2Folder.open();

const object3Folder = gui.addFolder("Object3 - BLUE");
object3Folder.add(object3.position, "x", 0, 10, 0.01).name("X Position");
object3Folder.add(object3.position, "y", 0, 10, 0.01).name("Y Position");
object3Folder.add(object3.position, "z", 0, 10, 0.01).name("Z Position");
object3Folder
  .add(object3.rotation, "x", 0, Math.PI * 2, 0.01)
  .name("X Rotation");
object3Folder
  .add(object3.rotation, "y", 0, Math.PI * 2, 0.01)
  .name("Y Rotation");
object3Folder
  .add(object3.rotation, "z", 0, Math.PI * 2, 0.01)
  .name("Z Rotation");
object3Folder.add(object3.scale, "x", 0, 2, 0.01).name("X Scale");
object3Folder.add(object3.scale, "y", 0, 2, 0.01).name("Y Scale");
object3Folder.add(object3.scale, "z", 0, 2, 0.01).name("Z Scale");
object3Folder.open();

const stats = new Stats();
document.body.appendChild(stats.dom);

const debug = document.getElementById("debug1") as HTMLDivElement;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
  const object1WorldPosition = new THREE.Vector3();
  object1.getWorldPosition(object1WorldPosition);
  const object1WorldRotation = new THREE.Quaternion();
  object1.getWorldQuaternion(object1WorldRotation);
  const object1WorldScale = new THREE.Vector3();
  object1.getWorldScale(object1WorldScale);

  const object2WorldPosition = new THREE.Vector3();
  object2.getWorldPosition(object2WorldPosition);
  const object2WorldRotation = new THREE.Quaternion();
  object2.getWorldQuaternion(object2WorldRotation);
  const object2WorldScale = new THREE.Vector3();
  object2.getWorldScale(object2WorldScale);

  const object3WorldPosition = new THREE.Vector3();
  object3.getWorldPosition(object3WorldPosition);
  const object3WorldRotation = new THREE.Quaternion();
  object3.getWorldQuaternion(object3WorldRotation);
  const object3WorldScale = new THREE.Vector3();
  object3.getWorldScale(object3WorldScale);

  debug.innerText =
    "Red\n\n" +
    "Local Pos X : " +
    object1.position.x.toFixed(2) + // ! toFixed(argument) define the decimals number on the "debug1"
    "\n" +
    "Local Pos Y : " +
    object1.position.y.toFixed(2) +
    "\n" +
    "Local Pos Z : " +
    object1.position.z.toFixed(2) +
    "\n\n" +
    "Local Rot X : " +
    object1.rotation.x.toFixed(2) +
    "\n" +
    "Local Rot Y : " +
    object1.rotation.y.toFixed(2) +
    "\n" +
    "Local Rot Z : " +
    object1.rotation.z.toFixed(2) +
    "\n\n" +
    "World Pos X : " +
    object1WorldPosition.x.toFixed(2) +
    "\n" +
    "World Pos Y : " +
    object1WorldPosition.y.toFixed(2) +
    "\n" +
    "World Pos Z : " +
    object1WorldPosition.z.toFixed(2) +
    "\n\n" +
    "World Rot X : " +
    object1WorldRotation.x.toFixed(2) +
    "\n" +
    "World Rot Y : " +
    object1WorldRotation.y.toFixed(2) +
    "\n" +
    "World Rot Z : " +
    object1WorldRotation.z.toFixed(2) +
    "\n" +
    "\nGreen\n\n" +
    "Local Pos X : " +
    object2.position.x.toFixed(2) +
    "\n" +
    "Local Pos Y : " +
    object2.position.y.toFixed(2) +
    "\n" +
    "Local Pos Z : " +
    object2.position.z.toFixed(2) +
    "\n" +
    "World Pos X : " +
    object2WorldPosition.x.toFixed(2) +
    "\n" +
    "World Pos Y : " +
    object2WorldPosition.y.toFixed(2) +
    "\n" +
    "World Pos Z : " +
    object2WorldPosition.z.toFixed(2) +
    "\n" +
    "\nBlue\n\n" +
    "Local Pos X : " +
    object3.position.x.toFixed(2) +
    "\n" +
    "Local Pos Y : " +
    object3.position.y.toFixed(2) +
    "\n" +
    "Local Pos Z : " +
    object3.position.z.toFixed(2) +
    "\n" +
    "World Pos X : " +
    object3WorldPosition.x.toFixed(2) +
    "\n" +
    "World Pos Y : " +
    object3WorldPosition.y.toFixed(2) +
    "\n" +
    "World Pos Z : " +
    object3WorldPosition.z.toFixed(2) +
    "\n";
  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
