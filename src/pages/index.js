import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const ThreeDScene = () => {
  const sceneRef = useRef();
  let width, height;

  if (typeof window !== "undefined") {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  useEffect(() => {
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    const roomGeometry = new THREE.BoxGeometry(100, 100, 100);

    const roomMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const room = new THREE.Mesh(roomGeometry, roomMaterial);
    scene.add(room);

    const floorGeometry = new THREE.PlaneGeometry(100, 100);

    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.5;
    scene.add(floor);

    const loader = new GLTFLoader();
    let car;
    loader.load("/forklift.glb", (gltf) => {
      car = gltf.scene;
      const { x, y, z } = {
        x: -4,
        y: -0.5,
        z: -6,
      };
      car.position.set(x, y, z);
      scene.add(car);
    });
    let boxes;
    loader.load("/low_poly_toon_boxes.glb", (gltf) => {
      boxes = gltf.scene;
      const { x, y, z } = {
        x: 3,
        y: -0.5,
        z: -6,
      };
      boxes.position.set(x, y, z);
      scene.add(boxes);
    });
    

    const numColumns = 5;
    const modelsToLoad = [
      { url: "/classic_shelf.glb" },
      { url: "/classic_shelf.glb" },
      { url: "/classic_shelf.glb" },
      { url: "/classic_shelf.glb" },
    ];

    for (let col = 0; col < numColumns; col++) {
      modelsToLoad.forEach((model, index) => {
        loader.load(model.url, function (gltf) {
          const { x, y, z } = {
            x: col * 2,
            y: 0,
            z: index * 5,
          };
          gltf.scene.position.set(x, y, z);
          scene.add(gltf.scene);
        });
      });
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    window.addEventListener("keydown", function (event) {
      const moveDistance = 0.1;
      const rotateAngle = Math.PI / 90;

      switch (event.keyCode) {
        case 37:
          car.rotation.y += rotateAngle;
          break;
        case 40:
          const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(
            car.quaternion
          );
          car.position.add(forward.multiplyScalar(moveDistance));
          break;
        case 39:
          car.rotation.y -= rotateAngle;
          break;
        case 38:
          const backward = new THREE.Vector3(0, 0, 1).applyQuaternion(
            car.quaternion
          );
          car.position.add(backward.multiplyScalar(moveDistance));
          break;
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      if (camera.position.y < 0) {
        camera.position.y = 0;
      }
      renderer.render(scene, camera);
    };

    animate();
    return () => {
      renderer.dispose();
    };
  }, [width, height]);

  return <div ref={sceneRef} style={{ width: "100%", height: "100vh" }} />;
};

export default ThreeDScene;
