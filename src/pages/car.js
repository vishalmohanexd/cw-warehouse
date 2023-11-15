
// import React, { useRef, useEffect } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const ThreeDScene = () => {
//   const sceneRef = useRef();
//   let width, height;

//   if (typeof window !== "undefined") {
//     width = window.innerWidth;
//     height = window.innerHeight;
//   }

//   useEffect(() => {
//     // Check if the scene has already been initialized
//     if (sceneRef.current.children.length > 0) {
//       return;
//     }

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xffffff);

//     const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//     camera.position.set(10, 10, 10);

//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(width, height);
//     sceneRef.current.appendChild(renderer.domElement);

//     // Create the room geometry
//     const roomGeometry = new THREE.BoxGeometry(100, 100, 100);

//     // Create the room material
//     const roomMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

//     // Create the room mesh
//     const room = new THREE.Mesh(roomGeometry, roomMaterial);
//     scene.add(room);

//     // Create the floor geometry
//     const floorGeometry = new THREE.PlaneGeometry(100, 100);

//     // Create the floor material
//     const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });

//     // Create the floor mesh
//     const floor = new THREE.Mesh(floorGeometry, floorMaterial);
//     floor.rotation.x = -Math.PI / 2;
//     floor.position.y = -0.5;
//     scene.add(floor);

//     // Load the classic_shelf.glb file
//     const loader = new GLTFLoader();
//     loader.load('/worn_warehouse_shelf.glb', function (gltf) {
//       // Add the glTF object to the scene
//       scene.add(gltf.scene);
//     });

//     // Load additional GLB models
//     const positions = [
//       { x: 5, y: 1, z: 0 },
//       { x: 7, y: 1, z: 0 },
//       { x: 9, y: 1, z: 0 },
//       { x: 11, y: 1, z: 0 },
//     ];

//     const modelsToLoad = [
//       { url: '/classic_shelf.glb' },
//       { url: '/classic_shelf.glb' },
//       { url: '/classic_shelf.glb' },
//       { url: '/classic_shelf.glb' }
//     ];

//     modelsToLoad.forEach((model, index) => {
//       loader.load(model.url, function (gltf) {
//         const { x, y, z } = positions[index];
//         gltf.scene.position.set(x, y, z);
//         scene.add(gltf.scene);

//         // Create a mirrored row by negating the x positions
//         const mirroredX = -x;
//         const mirroredZ = z; // Keep the z position the same for a straight row
//         const mirroredY = y;

//         const mirroredModel = gltf.scene.clone();
//         mirroredModel.position.set(mirroredX, mirroredY, mirroredZ);
//         scene.add(mirroredModel);
//       });
//     });

//     // Create the controls
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.05;

//     // Render the scene
//     const render = () => {
//       requestAnimationFrame(render);
//       controls.update();
//       renderer.render(scene, camera);
//     };

//     render();

//     return () => {
//       // Dispose of the scene and renderer when the component unmounts
//       // scene.dispose();
//       renderer.dispose();
//     };
//   }, [width, height]); // Add width and height as dependencies

//   return <div ref={sceneRef} style={{ width: "100%", height: "100vh" }} />;
// };

// export default ThreeDScene;



// import React, { useRef, useEffect } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const ThreeDScene = () => {
//   const sceneRef = useRef();
//   let width, height;

//   if (typeof window !== "undefined") {
//     width = window.innerWidth;
//     height = window.innerHeight;
//   }

//   useEffect(() => {
//     // Check if the scene has already been initialized
//     if (sceneRef.current.children.length > 0) {
//       return;
//     }

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xffffff);

//     const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//     camera.position.set(10, 10, 10);
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(width, height);
//     sceneRef.current.appendChild(renderer.domElement);

//     // Create the room geometry
//     const roomGeometry = new THREE.BoxGeometry(100, 100, 100);

//     // Create the room material
//     const roomMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

//     // Create the room mesh
//     const room = new THREE.Mesh(roomGeometry, roomMaterial);
//     scene.add(room);

//     // Create the floor geometry
//     const floorGeometry = new THREE.PlaneGeometry(100, 100);

//     // Create the floor material
//     const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });

//     // Create the floor mesh
//     const floor = new THREE.Mesh(floorGeometry, floorMaterial);
//     floor.rotation.x = -Math.PI / 2;
//     floor.position.y = -0.5;
//     scene.add(floor);

//     const textureLoader = new THREE.TextureLoader();
//     const carTexture = textureLoader.load('/cartoon_car.glb');

//     // Create the car geometry
//     const carGeometry = new THREE.BoxGeometry(1, 0.5, 2);

//     // Create the car material
//     const carMaterial = new THREE.MeshBasicMaterial({
//       map: carTexture,
//       side: THREE.DoubleSide // Make the car visible from both sides
//     });

//     // Create the car mesh
//     const car = new THREE.Mesh(carGeometry, carMaterial);
//     car.position.set(0, 0, 0);
//     scene.add(car);

//     // Create the controls
//     const controls = new OrbitControls(camera, renderer.domElement);
    
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.05;

//     window.addEventListener('keydown', function(event) {
//       switch(event.keyCode) {
//         case 37: // Left arrow
//           car.position.x -= 0.1;
//           break;
//         case 38: // Up arrow
//           car.position.z += 0.1;
//           break;
//         case 39: // Right arrow
//           car.position.x += 0.1;
//           break;
//         case 40: // Down arrow
//           car.position.z -= 0.1;
//           break;
//       }
//     });

//     // Load the classic_shelf.glb file
//     const loader = new GLTFLoader();
//     loader.load('/cartoon_car.glb', function (gltf) {
//       // Add the glTF object to the scene
//       scene.add(gltf.scene);
//       const { x, y, z } = {
//         x: -4,  // Adjust the spacing between columns
//         y: -1.5,
//         z: -6, // Adjust the spacing between models in the same column
//       };
//       gltf.scene.position.set(x, y, z);
//       scene.add(gltf.scene);
//     });

//     // Load additional GLB models
//     const numColumns = 5;
//     const modelsToLoad = [
//       { url: '/classic_shelf.glb' },
//       { url: '/classic_shelf.glb' },
//       { url: '/classic_shelf.glb' },
//       { url: '/classic_shelf.glb' }
//     ];  

//     for (let col = 0; col < numColumns; col++) {
//       modelsToLoad.forEach((model, index) => {
//         loader.load(model.url, function (gltf) {
//           const { x, y, z } = {
//             x: col * 2,  // Adjust the spacing between columns
//             y: 0,
//             z: index * 5, // Adjust the spacing between models in the same column
//           };
//           gltf.scene.position.set(x, y, z);
//           scene.add(gltf.scene);
//         });
//       });
//     }
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.05;
//     const render = () => {
//       requestAnimationFrame(render);
//       if (camera.position.y < 0) {
//         camera.position.y = 0;
//       }
//       controls.update();
//       renderer.render(scene, camera);
//     };
//     render();

//     return () => {
//       // Dispose of the scene and renderer when the component unmounts
//       // scene.dispose();
//       renderer.dispose();
//     };
//   }, [width, height]); // Add width and height as dependencies

//   return <div ref={sceneRef} style={{ width: "100%", height: "100vh" }} />;
// };

// export default ThreeDScene;











import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const ThreeDScene = () => {
  const sceneRef = useRef();
  let width, height;

  if (typeof window !== "undefined") {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  useEffect(() => {
    // Check if the scene has already been initialized
    if (sceneRef.current.children.length > 0) {
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(10, 10, 10);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    sceneRef.current.appendChild(renderer.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const loader = new GLTFLoader();

    let car; // Declare the car outside the loader to make it accessible

    // Load the car model
    loader.load('/cartoon_car.glb', (gltf) => {
      car = gltf.scene;
      const { x, y, z } = {
        x: -4,
        y: -1.5,
        z: -6,
      };
      car.position.set(x, y, z);
      scene.add(car);
    });

    // Create the controls
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Add keyboard controls for moving the car
    window.addEventListener('keydown', function (event) {
      switch (event.keyCode) {
        case 37: // Left arrow
          if (car) car.position.x -= 0.1;
          break;
        case 38: // Up arrow
          if (car) car.position.z += 0.1;
          break;
        case 39: // Right arrow
          if (car) car.position.x += 0.1;
          break;
        case 40: // Down arrow
          if (car) car.position.z -= 0.1;
          break;
      }
    });

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

  }, [width, height]);

  return <div ref={sceneRef} />;
};

export default ThreeDScene;
