var container
var stats;
var camera;
var controls;
var scene;
var renderer;
var info;
var sphereTab = [];
var objects = [];
var sun;
var currentcolor;
var orangePivot;
var orbitaPivot;
var mesh;
var pianetiClick = 0;
init();
animate();


//quando appare il titolo
$(window).on('load', function() {
    TweenMax.to($('#first'), 1, {
        css: {
            opacity: 1
        },
        ease: Quad.easeInOut,
    });
});

$(window).on('load', function() {
    TweenMax.to($('#container'), 1, {
        css: {
            opacity: 1
        },
        ease: Quad.easeInOut,
    });
});

$(window).on('load', function() {
    TweenMax.to($('#contet'), 1, {
        css: {
            opacity: 1
        },
        ease: Quad.easeInOut,
    });
});


$(window).on('load', function() {
    TweenMax.to($('p'), 1, {
        css: {
            opacity: 1
        },
        ease: Quad.easeInOut,
    });
});

$(window).on('load', function() {
    TweenMax.to($('#title'), 1, {
        css: {
            opacity: 1
        },
        ease: Quad.easeInOut,
    });
});



function hidefirst() {
    TweenMax.to($('#first'), 0.5, {
        css: {
            opacity: 0
        },
        ease: Quad.easeInOut
    });
    TweenMax.to($('#first'), 0.5, {
        css: {
            display: 'none'
        },
        delay: 1,
        ease: Quad.easeInOut
    });
}

function init() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 45;
    controls = new THREE.OrbitControls(camera);
    controls.maxDistance = 100;
    controls.minDistance = 35;
    controls.noPan = true;
    controls.noKeys = true;
    controls.noZoom = false;

    scene = new THREE.Scene();
    var geoSphere = new THREE.SphereGeometry(Math.random() * 1, 15, 15);
    for (var i = 0; i < 1000; i++) {
        // randRadius = Math.random()*30+10;
        stars = new THREE.MeshPhongMaterial({
            emissive: '#fff',
                shininess: 100,
        });
        sphereTab.push(new THREE.Mesh(new THREE.SphereGeometry(Math.random() * 1, 20, 20), stars));
    }
    var posX = -2950;
    var posY = -2950;
    for (var i = 0; i < sphereTab.length; i++) {
        sphereTab[i].position.set(Math.random() * 800 - 200, Math.random() * 800 - 200, Math.random() * 800 - 100);
        scene.add(sphereTab[i]);
    }


//star
    var starMaterial = new THREE.MeshPhongMaterial({
        color: 0xffd600,
        emissive: 0xffd600,
        specular: 0xffd600,
        shininess: 100,
        transparent: 1,
        opacity: 1
    });

    var starMaterialGlow = new THREE.ShaderMaterial(
    {
      uniforms: {  },
      vertexShader:   document.getElementById( 'vertexShader').textContent,
      fragmentShader: document.getElementById( 'fragmentShader').textContent,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    }   );

    var glowGeometry = new THREE.SphereGeometry( 12, 64, 64 );
    var glow = new THREE.Mesh(glowGeometry, starMaterialGlow );
    scene.add( glow );
    objects.push(glow);

    star = new THREE.Mesh(new THREE.SphereGeometry(10, 64, 64), starMaterial);
    scene.add(star);
    objects.push(star);


    var orangePlanet = new THREE.SphereGeometry(3, 64, 64);
    var bluePlanet = new THREE.SphereGeometry(2.5, 64, 64);
    var greenPlanet = new THREE.SphereGeometry(1.5, 64, 64);

    var material = new THREE.MeshPhongMaterial({
        color: 0xed5817,
        emissive: 0xed5817,
        shininess: 100,
    });
    var bluePlanetMaterial = new THREE.MeshPhongMaterial({
        color: 0x122fda,
        emissive: 0x122fda,
        shininess: 100,
    });
    var greenPlanetMaterial = new THREE.MeshPhongMaterial({
        color: 0x00b900,
        emissive:  0x00b900,
        shininess: 100,
    });

    var planet1 = new THREE.ShaderMaterial(
    {
      uniforms: {  },
      vertexShader:  document.getElementById( 'vertexShader').textContent,
      fragmentShader: document.getElementById( 'fragmentShader').textContent,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    }   );

    var planet1GlowGeometry = new THREE.SphereGeometry( 3, 64, 64 );
    var glowPlanet1 = new THREE.Mesh(planet1GlowGeometry, planet1 );
    scene.add( glowPlanet1);
    objects.push(glowPlanet1);


    orbitaPivot = new THREE.Object3D();
    star.add(orbitaPivot);
    var radius = 15;
    var tubeRadius = 0.03;
    var radialSegments = 8 * 10;
    var tubularSegments = 6 * 15;
    var arc = Math.PI * 2;
    var orbita = new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments, arc);
    var orbitamaterial = new THREE.MeshLambertMaterial({
    shininess: 100,
    color: 0xffffff,
    emissive: 0xffffff,
    });



    mesh = new THREE.Mesh(orbita, orbitamaterial);
    orbitaPivot.add(mesh);
    //pianeta arancio
    orangePivot = new THREE.Object3D();
    star.add(orangePivot);
    var orange = new THREE.Mesh(orangePlanet, material);
    orange.position.x = 15;
    orangePivot.add(orange);
    objects.push(orange);
    // pianteblu
    bluePivot = new THREE.Object3D();
    star.add(bluePivot);
    var blue = new THREE.Mesh(bluePlanet, bluePlanetMaterial);
    blue.position.x = 20;
    bluePivot.add(blue);
    objects.push(blue);
    //pianeta verde
    greenPivot = new THREE.Object3D();
    star.add(greenPivot);
    var green = new THREE.Mesh(greenPlanet, greenPlanetMaterial);
    green.position.x = 26;
    greenPivot.add(green);
    objects.push(green);

//set luci
    light = new THREE.DirectionalLight(0x4f4f4f);
    light.position.set(3, 3, 3);
    scene.add(light);
    light = new THREE.DirectionalLight(0x4f4f4f);
    light.position.set(-3, -3, -3);
    scene.add(light);


//render
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.sortObjects = false;
    renderer.setClearColor(0xdbdbdb, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    stats = new Stats();
    container = document.getElementById('container');

    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    info = document.getElementById('contentTitle');

    subtitle = document.getElementById('subtitle');

    description = document.getElementById('description')
    var univers = document.getElementById('univers');
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function setFromCamera(raycaster, coords, origin) {
    raycaster.ray.origin.copy(camera.position);
    raycaster.ray.direction.set(coords.x, coords.y, 0.5).unproject(camera).sub(camera.position).normalize();
}

function onMouseDown(event) {
  raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1;
    setFromCamera(raycaster, mouse, camera);
    var intersects = raycaster.intersectObjects(objects);
    currentcolor = intersects[0].object.material.color.getHex();
    if (intersects.length > 0) {
        console.log(currentcolor);
        switch (intersects[0].object.geometry.type) {
        case 'SphereGeometry':
        if (currentcolor == 0xffd600) {
        if (pianetiClick == 0) {
        hidefirst();
        pianetiClick = 1;
        window.location.href = "index2.html";
                    }
                    if (pianetiClick == 2 || pianetiClick==3 || pianetiClick==4) {
                        pianetiClick = 1;
                        window.location.href = "index2.html";
                    }
                }
                break;
        }
    }
    console.log('Click');
}
document.addEventListener('mousedown', onMouseDown, false);

function animate() {
    var timer = 0.00001 * Date.now();
    for (var i = 0, il = sphereTab.length; i < il; i++) {
        var sfere = sphereTab[i];
        sfere.position.x = 400 * Math.sin(timer + i);
        sfere.position.z = 400 * Math.sin(timer + i * 1.1);
    }
    star.rotation.x += 0.008;
    orangePivot.rotation.z += 0.006;
    bluePivot.rotation.z += 0.01;
    orbitaPivot.rotation.y += 0.007;
    greenPivot.rotation.z+=0.008;
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    renderer.render(scene, camera)
}
