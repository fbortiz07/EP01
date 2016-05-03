window.onload = function()
{
	var ancho = window.innerWidth;
	var alto = window.innerHeight;
	var lienzo = new THREE.WebGLRenderer({alpha: true});
	lienzo.setSize(ancho, alto);
	document.body.appendChild(lienzo.domElement);
	var escena 		  = new THREE.Scene,
		tamanoJupiter = 300,
    tamanoMercurio = 4880/142984,
    tamanoVenus = 12104/142984,
    tamanoTierra = 12756/142984,
    tamanoMarte = 6794/142984;


	var crearPlaneta = function(data)
	{
		var geometria = new THREE.SphereGeometry(data.tamano,data.tamano,data.tamano);
		var textura = THREE.ImageUtils.loadTexture(data.imagen);
		var material = new THREE.MeshBasicMaterial( { map: textura } );
		return new THREE.Mesh(geometria, material);
	};

  var marte = crearPlaneta({
      tamano : tamanoJupiter * tamanoMarte,
      imagen : 'img/marte.jpg'
  });
  escena.add(marte);

  var tierra = crearPlaneta({
    tamano : tamanoJupiter * tamanoTierra,
    imagen : 'img/tierra.jpg'
  });
  escena.add(tierra);

  var venus = crearPlaneta({
    tamano : tamanoJupiter * tamanoTierra,
    imagen : 'img/venus.jpg'
  });
  escena.add(venus);

  var mercurio = crearPlaneta({
    tamano : tamanoJupiter * tamanoMercurio,
    imagen : 'img/mercurio.jpg'
  });
  escena.add(mercurio);

	var jupiter = crearPlaneta({
									tamano 	: tamanoJupiter,
									imagen	: 'img/jupiter.jpg'
							  }),
		escalaJupiter = true;
	escena.add(jupiter);

  var camara = new THREE.PerspectiveCamera(50,(ancho / alto),0.1, 10000);
  camara.position.y = 160;
  camara.position.z = 400;
  camara.lookAt(jupiter.position);
  jupiter.position.x = 500;
  marte.position.x = 100;
  tierra.position.x = 0;
  venus.position.x = -100;
  mercurio.position.x = -200;
  escena.add(camara);





	function renderizar()
	{
		jupiter.rotation.y += 0.001;
    marte.rotation.y += 0.01;
    tierra.rotation.y += 0.01;
    venus.rotation.y += 0.01;
    mercurio.rotation.y += 0.01;
		lienzo.render(escena, camara);
		requestAnimationFrame(renderizar);
	}
	renderizar();
};
