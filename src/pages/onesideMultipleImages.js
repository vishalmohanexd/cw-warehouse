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

    // Load the classic_shelf.glb file
    const loader = new GLTFLoader();
    loader.load('/worn_warehouse_shelf.glb', function (gltf) {
      // Add the glTF object to the scene
      scene.add(gltf.scene);
    });

    // Load additional GLB models
    const positions = [
      { x: 5, y: 1, z: 0 },
      { x: 7, y: 1, z: 0 }, 
      { x: 9, y: 1, z: 0 }, 
      { x: 11, y: 1, z: 0 }, 
    ];

    const modelsToLoad = [
      { url: '/classic_shelf.glb' },
      { url: '/classic_shelf.glb' },
      { url: '/classic_shelf.glb' },
      { url: '/classic_shelf.glb' }
    ];

    modelsToLoad.forEach((model, index) => {
      loader.load(model.url, function (gltf) {
        const { x, y, z } = positions[index];
        gltf.scene.position.set(x, y, z);
        scene.add(gltf.scene);
      });
    });

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

    return () => {
      // Dispose of the scene and renderer when the component unmounts
      // scene.dispose();
      renderer.dispose();
    };
  }, [width, height]); // Add width and height as dependencies

  return <div ref={sceneRef} style={{ width: "100%", height: "100vh" }} />;
};

export default ThreeDScene;
