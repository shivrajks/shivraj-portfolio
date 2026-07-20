// ocean-scene.js — Three.js ocean particle scene for One Piece hero
(function () {
  const container = document.getElementById("ocean-canvas");
  if (!container || typeof THREE === "undefined") return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Ocean particles
  const count = window.innerWidth < 720 ? 600 : 1500;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 20;
    positions[i3 + 1] = (Math.random() - 0.5) * 12;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;
    velocities[i3] = (Math.random() - 0.5) * 0.003;
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;
  }

  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.04,
    color: 0x62c3f8,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // Straw Hat compass core — a small red-gold ring
  const ringGeo = new THREE.TorusGeometry(0.5, 0.03, 8, 32);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xd70000,
    transparent: true,
    opacity: 0.4,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  scene.add(ring);

  // Inner gold ring
  const innerRingGeo = new THREE.TorusGeometry(0.3, 0.02, 8, 24);
  const innerRingMat = new THREE.MeshBasicMaterial({
    color: 0xffcd00,
    transparent: true,
    opacity: 0.3,
  });
  const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
  innerRing.rotation.x = Math.PI / 2;
  scene.add(innerRing);

  // Orbiting nodes (like Log Pose islands)
  const nodeGeo = new THREE.SphereGeometry(0.06, 8, 8);
  const nodeColors = [0xd70000, 0xffcd00, 0x62c3f8, 0xaf6528];
  const nodes = [];
  for (let i = 0; i < 4; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: nodeColors[i],
      transparent: true,
      opacity: 0.6,
    });
    const node = new THREE.Mesh(nodeGeo, mat);
    node.userData = {
      angle: (i / 4) * Math.PI * 2,
      radius: 1.2 + Math.random() * 0.3,
      speed: 0.2 + Math.random() * 0.15,
      yOffset: (Math.random() - 0.5) * 0.6,
    };
    scene.add(node);
    nodes.push(node);
  }

  // Mouse parallax
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Resize
  function onResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  window.addEventListener("resize", onResize);

  // Scroll-based camera
  let scrollProgress = 0;
  window.addEventListener("scroll", () => {
    scrollProgress =
      window.scrollY / (document.body.scrollHeight - window.innerHeight);
  });

  // Animate
  function animate() {
    requestAnimationFrame(animate);

    if (prefersReduced) {
      renderer.render(scene, camera);
      return;
    }

    // Smooth mouse
    targetX += (mouseX - targetX) * 0.03;
    targetY += (mouseY - targetY) * 0.03;

    // Move particles
    const pos = geo.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] += velocities[i3];
      pos[i3 + 1] += velocities[i3 + 1];
      pos[i3 + 2] += velocities[i3 + 2];

      // Wrap around
      if (pos[i3] > 10) pos[i3] = -10;
      if (pos[i3] < -10) pos[i3] = 10;
      if (pos[i3 + 1] > 6) pos[i3 + 1] = -6;
      if (pos[i3 + 1] < -6) pos[i3 + 1] = 6;
    }
    geo.attributes.position.needsUpdate = true;

    // Camera path
    const t = scrollProgress;
    camera.position.x = targetX * 1.5 + Math.sin(t * Math.PI) * 2;
    camera.position.y = -t * 3 + targetY * 1;
    camera.position.z = 5 - t * 2;
    camera.lookAt(0, 0, 0);

    // Rotate rings
    const time = Date.now() * 0.001;
    ring.rotation.z = time * 0.15;
    innerRing.rotation.z = -time * 0.2;

    // Pulse ring
    const pulse = Math.sin(time * 1.5) * 0.1 + 0.4;
    ringMat.opacity = pulse;
    innerRingMat.opacity = pulse * 0.8;

    // Orbit nodes
    nodes.forEach((node) => {
      const d = node.userData;
      d.angle += d.speed * 0.016;
      node.position.x = Math.cos(d.angle) * d.radius;
      node.position.y = Math.sin(d.angle) * d.radius * 0.4 + d.yOffset;
      node.position.z = Math.sin(d.angle) * d.radius * 0.3;
    });

    renderer.render(scene, camera);
  }

  animate();
})();
