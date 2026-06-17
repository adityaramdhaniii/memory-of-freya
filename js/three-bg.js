// ===== Three.js — soft floating 3D orbs =====
(function initThree() {
  const container = document.getElementById('three-bg');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const pl = new THREE.PointLight(0xf9a8d4, 1.2);
  pl.position.set(5, 5, 5);
  scene.add(pl);

  const colors = [0xf472b6, 0xfbcfe8, 0xfdba74, 0xd8b4fe, 0xfca5a5, 0xfde68a];
  const orbs = [];
  for (let i = 0; i < 18; i++) {
    const geo = new THREE.SphereGeometry(0.4 + Math.random() * 1.0, 32, 32);
    const mat = new THREE.MeshStandardMaterial({
      color: colors[i % colors.length],
      transparent: true,
      opacity: 0.12 + Math.random() * 0.1,
      roughness: 0.4,
      metalness: 0.1
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 10 - 2
    );
    mesh.userData.offset = Math.random() * Math.PI * 2;
    mesh.userData.rot = {
      x: (Math.random() - 0.5) * 0.012,
      y: (Math.random() - 0.5) * 0.012,
      z: (Math.random() - 0.5) * 0.012
    };
    scene.add(mesh);
    orbs.push(mesh);
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.005;
    orbs.forEach((orb) => {
      orb.position.y += Math.sin(t + orb.userData.offset) * 0.002;
      orb.rotation.x += orb.userData.rot.x;
      orb.rotation.y += orb.userData.rot.y;
      orb.rotation.z += orb.userData.rot.z;
    });
    renderer.render(scene, camera);
  }
  animate();
})();
