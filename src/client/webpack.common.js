const path = require("path");

module.exports = {
  // entry: "./src/client/client_initial.ts",
  // entry: "./src/client/client_AnimationLoop.ts",
  // entry: "./src/client/client_DatGUI.ts",
  // entry: "./src/client/client_Object3D.ts",
  // entry: "./src/client/client_Object3DHierarchy.ts",
  // entry: "./src/client/client_Geometries.ts",
  // entry: "./src/client/client_Materials.ts",
  // entry: "./src/client/client_MeshBasicMat.ts",
  // entry: "./src/client/client_MeshNormalMat.ts",
  // entry: "./src/client/client_MeshLambertMat.ts",
  // entry: "./src/client/client_MeshPhysicalMat.ts",
  // entry: "./src/client/client_MeshMatcapMat.ts",
  // entry: "./src/client/client_MeshToonMat.ts",
  // entry: "./src/client/client_SpecularMap.ts",
  // entry: "./src/client/client_RoughnessMetalnessMap.ts",
  // entry: "./src/client/client_BumpMap.ts",
  // entry: "./src/client/client_NormalMap.ts",
  // entry: "./src/client/client_DisplacementMap.ts",
  // entry: "./src/client/client_DisplacementNormalMap.ts",
  // entry: "./src/client/client_MatRepeatCenter.ts",
  // entry: "./src/client/client_TexMipMap.ts",
  // entry: "./src/client/client_CustomMipMap.ts",
  // entry: "./src/client/client_AnisotropicFilter.ts",
  // entry: "./src/client/client_AmbientLight.ts",
  // entry: "./src/client/client_DirectionalLight.ts",
  // entry: "./src/client/client_HemisphereLight.ts",
  // entry: "./src/client/client_PointLight.ts",
  // entry: "./src/client/client_SpotLight.ts",
  // entry: "./src/client/client_SpotLightShadow.ts",
  // entry: "./src/client/client_DirectionalLightShadow.ts",
  // entry: "./src/client/client_DisplacementShadow.ts",
  // entry: "./src/client/client_OrbitControls.ts",
  // entry: "./src/client/client_TrackballControls.ts",
  // entry: "./src/client/client_PointerLockControls.ts",
  // entry: "./src/client/client_DragControls.ts",
  // entry: "./src/client/client_TransformControls.ts",
  // entry: "./src/client/client_MultipleControls.ts",
  // entry: "./src/client/client_ObjModelLoader.ts",
  // entry: "./src/client/client_MTLLoader.ts",
  // entry: "./src/client/client_GLTFModelLoader.ts",
  // entry: "./src/client/client_DracoLoader.ts",
  // entry: "./src/client/client_TexGLTF.ts",
  // entry: "./src/client/client_PLYLoader.ts",
  // entry: "./src/client/client_STLLoader.ts",
  // entry: "./src/client/client_FBXLoader.ts",
  // entry: "./src/client/client_FBXAnimations.ts",
  // entry: "./src/client/client_GLTFAnimations.ts",
  // entry: "./src/client/client_GLTFCustomAnimations.ts",
  // entry: "./src/client/client_DragGLTFAnimations.ts",
  // entry: "./src/client/client_TransformControlGLTFAnimations.ts",
  // entry: "./src/client/client_Reflector.ts",
  // entry: "./src/client/client_CubeCameraReflections.ts",
  // entry: "./src/client/client_CubeCameraRefractions.ts",
  // entry: "./src/client/client_Raycaster.ts",
  // entry: "./src/client/client_RaycasterCollisionDet.ts",
  // entry: "./src/client/client_RaycasterMousePicking.ts",
  // entry: "./src/client/client_RaycasterMeasurements.ts",
  // entry: "./src/client/client_Tween.ts",
  // entry: "./src/client/client_TweenAnimationMixer.ts",
  // entry: "./src/client/client_TweenOrbitControl.ts",
  // entry: "./src/client/client_TweenChaining.ts",
  // entry: "./src/client/client_Vector3.ts",
  // entry: "./src/client/client_Vector3Lerp.ts",
  // entry: "./src/client/client_PhysicsCannon.ts",
  // entry: "./src/client/client_CannonDebug.ts",
  // entry: "./src/client/client_CompoundsConvexPolyhedrons.ts",
  // entry: "./src/client/client_ConvexObjBreaker.ts",
  // entry: "./src/client/client_ConstructiveSolidGeo.ts",
  // entry: "./src/client/client_CollisionOBB.ts",
  // entry: "./src/client/client_ProgressIndicator.ts",
  entry: "./src/client/client.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../../dist/client"),
  },
};
