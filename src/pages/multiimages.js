// import React, { useRef, useEffect } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// const ThreeDScene = () => {
//   const sceneRef = useRef();
//   let width, height;

//   if (typeof window !== "undefined") {
//     width = window.innerWidth;
//     height = window.innerHeight;
//   }

//   useEffect(() => {
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

//     // Create the tables and chairs
//     for (let i = 0; i < 4; i++) {
//       for (let j = 0; j < 4; j++) {
//         // Create the table geometry
//         const tableGeometry = new THREE.BoxGeometry(2, 2, 1);

//         // Create the table material
//         const tableMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

//         // Create the table mesh
//         const table = new THREE.Mesh(tableGeometry, tableMaterial);
//         table.position.x = i * 10 - 45;
//         table.position.z = j * 10 - 45;
//         scene.add(table);

//         // Create the chair geometry
//         const chairGeometry = new THREE.BoxGeometry(1, 1, 1);

//         // Create the chair material
//         const chairMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });

//         // Create the chair mesh
//         const chair = new THREE.Mesh(chairGeometry, chairMaterial);
//         chair.position.x = i * 10 - 45 + 1;
//         chair.position.z = j * 10 - 45;
//         scene.add(chair);
//       }
//     }

//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.05;

//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };

//     animate();
//   }, []);

//   return <div ref={sceneRef} style={{ width: "100%", height: "100vh" }} />;
// };

// export default ThreeDScene;


import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeDScene = () => {
  const sceneRef = useRef();
  let width, height;

  if (typeof window !== "undefined") {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(10, 10, 10);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    sceneRef.current.appendChild(renderer.domElement);

    // Create the room geometry
    const roomGeometry = new THREE.BoxGeometry(100, 100, 100);

    // Create the room material
    const roomMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Create the room mesh
    const room = new THREE.Mesh(roomGeometry, roomMaterial);
    scene.add(room);

    // Create the floor geometry
    const floorGeometry = new THREE.PlaneGeometry(100, 100);

    // Create the floor material
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });

    // Create the floor mesh
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.5;
    scene.add(floor);

    // Create the tables and chairs
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        // Create the table geometry
        const tableGeometry = new THREE.BoxGeometry(2, 2, 1);

        // Create the table material
        const tableMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

        // Create the table mesh
        const table = new THREE.Mesh(tableGeometry, tableMaterial);
        table.position.x = i * 10 - 45;
        table.position.z = j * 10 - 45;
        scene.add(table);

        // Create the chair geometry
        const chairGeometry = new THREE.BoxGeometry(1, 1, 1);

        // Create the chair material
        const chairMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });

        // Create the chair mesh
        const chair = new THREE.Mesh(chairGeometry, chairMaterial);
        chair.position.x = i * 10 - 45 + 1;
        chair.position.z = j * 10 - 45;
        scene.add(chair);
      }
    }

    // Create the controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Render the scene
    const render = () => {
      requestAnimationFrame(render);
      controls.update();
      renderer.render(scene, camera);
    };

    render();
  }, []);

  return <div ref={sceneRef} style={{ width: "100%", height: "100vh" }} />;
};

export default ThreeDScene;
