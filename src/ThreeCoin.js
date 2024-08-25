import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import Head from "./Dollar-Gold-Coin.png";

const ThreeCoin = ({ flipping }) => {
  const mountRef = useRef(null);
  const [stopRotation, setStopRotation] = useState(false);

  useEffect(() => {
    const scene = new THREE.Scene();

    
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

   
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(300, 300); 
    renderer.setClearColor(0x000000, 0); 
    mountRef.current.appendChild(renderer.domElement);

    
    const pointLight = new THREE.PointLight(0xffffff, 2, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1); 
    scene.add(ambientLight);

    
    const textureLoader = new THREE.TextureLoader();
    const faceTexture = textureLoader.load(Head);

   
    const faceMaterial = new THREE.MeshStandardMaterial({
      map: faceTexture,
      metalness: 0.7, 
      roughness: 0.2, 
    });

    
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFD700,
      metalness: 1,
      roughness: 0.1,
    });

    
    const coinGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 64); 
    const coinMaterials = [goldMaterial, faceMaterial, faceMaterial]; 
    const coin = new THREE.Mesh(coinGeometry, coinMaterials);
    coin.rotation.x = Math.PI / 2;
    scene.add(coin);

    
    camera.aspect = 1; 
    camera.updateProjectionMatrix();

    let startTime = null;
    const rotateDuration = 5000;

    const animate = (time) => {
      requestAnimationFrame(animate);

      if (flipping) {
        if (!startTime) startTime = time;

        const elapsed = time - startTime;

        if (elapsed < rotateDuration) {
          coin.rotation.y += 0.05;
          coin.rotation.x += 0.05;
        } else {
          setStopRotation(true);
          startTime = null;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [flipping]);

  return <div ref={mountRef} style={{ width: '300px', height: '300px', margin: '0 auto', overflow: 'hidden' }} />;
};

export default ThreeCoin;
