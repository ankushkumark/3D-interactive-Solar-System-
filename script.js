// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the Sun
const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Create planets
const planets = [];
const planetData = [
    { name: 'Mercury', distance: 2, speed: 0.02, color: 0xaaaaaa },
    { name: 'Venus', distance: 3, speed: 0.015, color: 0xffcc00 },
    { name: 'Earth', distance: 4, speed: 0.01, color: 0x0000ff },
    { name: 'Mars', distance: 5, speed: 0.008, color: 0xff0000 },
    { name: 'Jupiter', distance: 6, speed: 0.005, color: 0xffa500 },
    { name: 'Saturn', distance: 7, speed: 0.004, color: 0xffd700 },
    { name: 'Uranus', distance: 8, speed: 0.003, color: 0x00ffff },
    { name: 'Neptune', distance: 9, speed: 0.002, color: 0x00008b }
];

planetData.forEach(data => {
    const geometry = new THREE.SphereGeometry(0.1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: data.color });
    const planet = new THREE.Mesh(geometry, material);
    planet.userData = { speed: data.speed, distance: data.distance };
    planets.push(planet);
    scene.add(planet);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    planets.forEach(planet => {
        planet.rotation.y += 0.01; // Rotate planet
        planet.position.x = Math.cos(Date.now() * 0.001 * planet.userData.speed) * planet.userData.distance;
        planet.position.z = Math.sin(Date.now() * 0.001 * planet.userData.speed) * planet.userData.distance;
    });
    renderer.render(scene, camera);
}
animate();

// Speed control
document.getElementById('mercury-speed').addEventListener('input', (event) => {
    planets[0].userData.speed = event.target.value;
});
