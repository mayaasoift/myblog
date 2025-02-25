// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// const DreamMachine = () => {
//     const [sceneType, setSceneType] = useState("");
//     const mountRef = useRef(null);

//     const handleSceneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setSceneType(e.target.value);
//     };

//     useEffect(() => {
//         if (!mountRef.current) return;

//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//         const renderer = new THREE.WebGLRenderer({ antialias: true });
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         mountRef.current.appendChild(renderer.domElement);

//         const controls = new OrbitControls(camera, renderer.domElement);
//         controls.enableDamping = true;

//         let animationFrameId: number;

//         const renderScene = () => {
//             scene.clear();

//             switch (sceneType) {
//                 case "zen":
//                     // Zen Garden
//                     const zenAmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
//                     scene.add(zenAmbientLight);

//                     const zenPointLight = new THREE.PointLight(0xffd700, 1, 100);
//                     zenPointLight.position.set(10, 10, 10);
//                     scene.add(zenPointLight);

//                     const zenGeometry = new THREE.BoxGeometry(2, 2, 2);
//                     const zenMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
//                     const zenCube = new THREE.Mesh(zenGeometry, zenMaterial);
//                     scene.add(zenCube);

//                     const zenPlaneGeometry = new THREE.PlaneGeometry(20, 20);
//                     const zenPlaneMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513, side: THREE.DoubleSide });
//                     const zenPlane = new THREE.Mesh(zenPlaneGeometry, zenPlaneMaterial);
//                     zenPlane.rotation.x = Math.PI / 2;
//                     scene.add(zenPlane);

//                     camera.position.set(5, 5, 5);
//                     controls.update();

//                     const zenAnimate = () => {
//                         animationFrameId = requestAnimationFrame(zenAnimate);
//                         zenCube.rotation.y += 0.01;
//                         renderer.render(scene, camera);
//                     };
//                     zenAnimate();
//                     break;

//                 case "chaos":
//                     // Chaotic Storm
//                     const chaosAmbientLight = new THREE.AmbientLight(0xffffff, 0.2);
//                     scene.add(chaosAmbientLight);

//                     const chaosSpotLight = new THREE.SpotLight(0xff0000, 1, 100);
//                     chaosSpotLight.position.set(10, 20, 10);
//                     scene.add(chaosSpotLight);

//                     const chaosParticlesGeometry = new THREE.BufferGeometry();
//                     const chaosParticlesCount = 1000;
//                     const chaosPositions = new Float32Array(chaosParticlesCount * 3);

//                     for (let i = 0; i < chaosParticlesCount * 3; i++) {
//                         chaosPositions[i] = (Math.random() - 0.5) * 10;
//                     }

//                     chaosParticlesGeometry.setAttribute("position", new THREE.BufferAttribute(chaosPositions, 3));
//                     const chaosParticlesMaterial = new THREE.PointsMaterial({ color: 0xff4500, size: 0.1 });
//                     const chaosParticles = new THREE.Points(chaosParticlesGeometry, chaosParticlesMaterial);
//                     scene.add(chaosParticles);

//                     camera.position.set(0, 0, 10);
//                     controls.update();

//                     const chaosAnimate = () => {
//                         animationFrameId = requestAnimationFrame(chaosAnimate);
//                         chaosParticles.rotation.x += 0.001;
//                         chaosParticles.rotation.y += 0.002;
//                         renderer.render(scene, camera);
//                     };
//                     chaosAnimate();
//                     break;

//                 case "cyber":
//                     // Cyber City
//                     const cyberAmbientLight = new THREE.AmbientLight(0xffffff, 0.3);
//                     scene.add(cyberAmbientLight);

//                     const cyberDirectionalLight = new THREE.DirectionalLight(0x00ffff, 1);
//                     cyberDirectionalLight.position.set(10, 10, 5);
//                     scene.add(cyberDirectionalLight);

//                     const cyberBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
//                     const cyberBoxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff });
//                     const cyberBoxes: THREE.Mesh[] = [];

//                     for (let i = 0; i < 50; i++) {
//                         const cyberBox = new THREE.Mesh(cyberBoxGeometry, cyberBoxMaterial);
//                         cyberBox.position.set(
//                             (Math.random() - 0.5) * 10,
//                             (Math.random() - 0.5) * 10,
//                             (Math.random() - 0.5) * 10
//                         );
//                         cyberBoxes.push(cyberBox);
//                         scene.add(cyberBox);
//                     }

//                     camera.position.set(10, 10, 10);
//                     controls.update();

//                     const cyberAnimate = () => {
//                         animationFrameId = requestAnimationFrame(cyberAnimate);
//                         cyberBoxes.forEach((box) => {
//                             box.rotation.x += 0.01;
//                             box.rotation.y += 0.01;
//                         });
//                         renderer.render(scene, camera);
//                     };
//                     cyberAnimate();
//                     break;

//                 case "myth":
//                     // Mythical Dragon
//                     const mythAmbientLight = new THREE.AmbientLight(0xffffff, 0.4);
//                     scene.add(mythAmbientLight);

//                     const mythPointLight = new THREE.PointLight(0xffd700, 1, 100);
//                     mythPointLight.position.set(10, 10, 10);
//                     scene.add(mythPointLight);

//                     const mythTorusGeometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16);
//                     const mythTorusMaterial = new THREE.MeshPhongMaterial({ color: 0x8a2be2 });
//                     const mythTorus = new THREE.Mesh(mythTorusGeometry, mythTorusMaterial);
//                     scene.add(mythTorus);

//                     camera.position.set(5, 5, 5);
//                     controls.update();

//                     const mythAnimate = () => {
//                         animationFrameId = requestAnimationFrame(mythAnimate);
//                         mythTorus.rotation.x += 0.01;
//                         mythTorus.rotation.y += 0.01;
//                         renderer.render(scene, camera);
//                     };
//                     mythAnimate();
//                     break;

//                 default:
//                     camera.position.set(0, 0, 5);
//                     controls.update();
//                     break;
//             }
//         };

//         renderScene();

//         return () => {
//             if (animationFrameId) cancelAnimationFrame(animationFrameId);
//             mountRef.current.removeChild(renderer.domElement);
//         };
//     }, [sceneType]);

//     return (
//         <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
//             <h1 className="text-3xl font-bold mb-6">Dream Machine</h1>
//             <p className="text-lg text-gray-300 mb-8">Choose a dream scene from the dropdown!</p>
//             <div className="w-full max-w-md mb-12">
//                 <select value={sceneType} onChange={handleSceneChange} className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-blue-500 transition">
//                     <option value="">Select a Dream Scene</option>
//                     <option value="zen">Peaceful Zen Garden</option>
//                     <option value="chaos">Chaotic Storm</option>
//                     <option value="cyber">Cyber City</option>
//                     <option value="myth">Mythical Dragon</option>
//                 </select>
//             </div>
//             <div ref={mountRef} className="w-full max-w-4xl h-[400px] mt-12" />
//         </div>
//     );
// };

// export default DreamMachine;