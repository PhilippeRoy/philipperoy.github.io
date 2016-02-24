/*
 * Philippe Roy - 3420249
 * Assignment 3 
 */
 
 
//Global Variables
		var camera, controls, scene, renderer;
	
		var	BlCavier;
		
		//Colours
		var colour = 0x000000;
		var brown = 0x7B4A12;
		var green = 0x00ff00;
		var black = 0x000000;
		var white = 0xffffff;
		
		//Booleen
		var trigger = false;
		var trigger2 = false;
		var switchView = false;
		var walk = false;
		var run = false;
		
		
		var keysCode = 
   {    ra:39,//Right Arrow
    	la:37,//Left Arrow
    	ua:38,//Up Arrow
    	da:40,//Down Arrow
     	
		a:65,
		b:66,
		c:67,
		d:68,
		e:69,
		f:70,
		g:71,
		h:72,
		i:73,
		j:74,
		k:75,
		l:76,
		m:77,
		n:78,
		o:79,
		p:80,
		q:81,
		r:82,
		s:83,
		t:84,
		u:85,
		v:86,
		w:87,
		x:88,
		y:89,
		z:90,
		
		space:32
   };
      
	var keysDown = new Array();
		
	//Clock
	var clock = new THREE.Clock();
	clock.start();
	var currentAnimTime = clock.getElapsedTime();
	
	var gameClock = new THREE.Clock();
	var currentGameTime = clock.getElapsedTime();


	//Horse Jump
	var horseJumpTimer = [0, 0.5, 1]; //time keys
	var horseLegTimer = [0, 0.5, 1]; //time keys

    var vJump = [0 , 3, 0 ]; //if the number is < than the previous the animation reverses direction
	var hJump = [0 ,0.1, .2 ]; //if the number is < than the previous the animation reverses direction
	var frontLegRot = [0, 1, 0 ]; //if the number is < than the previous the animation reverses direction
	var rearLegRot = [0, -1, 0 ]; //if the number is < than the previous the animation reverses direction

	
	//Horse Trot 
	var trotTimer = [0, 0.25, 0.5, 0.75, 1]; //time keys
	var sideA = [0, .5, 0, -.5, 0 ]; 
	var sideB = [0, -.5, 0, .5, 0 ]; //if the number is < than the previous the animation reverses direction

	//Rearing
	var rearTimer = [0, 0.25, 0.5, 0.75, 1]; //time keys
	var horseTorso = [0, .5, 1, .5, 0 ]; 
	var horseRearLegs = [0, -.5, -1, -.5, 0 ]; 
	var horseHead = [0, .1, -.22, -.2, 0 ]; 
	var horseFrontRightLeg = [0, -.3, .1, -.2, 0 ]; 
	var horseFrontleftLeg = [0, -.5, .1, -.1, 0 ]; 


	//objects
	var jumpFence = new Array();
	var hit = new Array();

	hit[0] = hit[1] = hit[2] = hit[3] = false;

	//game
	var start = false;
	var score = new Array();
	score[0] = score[1] = score[2] = 1000000;
	
	//Program functions	
		init();
		animate();
		
		


function init() {

		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.z = 80;
		camera.position.y = 20;

		// Set up camera so we know from where to render the scene
		cam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000); 
		cam.rotation.y = 270 * Math.PI / 180;
		cam.position.y = 4; 
		//cam.rotation.z = 10 * Math.PI / 180;
		cam.position.x = -5;

		controls = new THREE.TrackballControls( camera );
	
		controls.rotateSpeed = 1.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;
	
		controls.noZoom = false;
		controls.noPan = false;
	
		controls.staticMoving = true;
		controls.dynamicDampingFactor = 0.3;
	
		controls.addEventListener( 'change', render );
	
		
		// world
		scene = new THREE.Scene();
		
		// axes
		var ax = new axes(10);
		var floor = horse(100,1,100,0,0,0,0,-4.3,0, green);
		
		var fence = new Array();
		
		//Fence Poles (50x50)
		for (var i=0; i<10; i++){
		
		//Vertical - columns starting from the right moving left
		 fence[i] = horse(1,5,1,0,0,0,50,-2.3,-50+(i*10), white); //left column
		 fence[i+10] = horse(1,5,1,0,0,0,-50,-2.3,-50+(i*10), white); // right column
		 
		 fence[i+20] = horse(1,5,1,0,0,0,-50+(i*10),-2.3,-50, white); //top row
		 fence[i+30] = horse(1,5,1,0,0,0,-50+(i*10),-2.3,50, white); //bottom row
		 
		 fence[i+60] = horse(1,5,1,0,0,0,(5*10),-2.3,50, white); // missing pole

		//Horizontal
		fence[i+40] = horse(100,1,1,0,0,0,0,-2.3,-150+(i*100), white); //top && bottom
		fence[i+50] = horse(1,1,100,0,0,0,-50+(i*100),-2.3,0, white); //left && right

}
		//The scene
		
		//Arena
		var	Arena = new THREE.Object3D();
		Arena.add(floor);
		//Arena.add(ax);

		for (var i=0; i<40; i++){
			Arena.add(fence[i]);
			}
					
		Arena.add(fence[41]);
		Arena.add(fence[42]);
		Arena.add(fence[50]);
		Arena.add(fence[51]);
		Arena.add(fence[60]);

			
		//The Horse
		
		//Horse - Black Cavier
		var torso = new horse(4,2,2,0,0,0,0,0,0,brown);
		var neck = new horse(2.5,2,2,0,0,45,1.5,1,0,brown);
		var head = new horse(2,1.5,2,0,0,0,2.5,1.5,0,brown);
		
		var LRHoof = new horse(0.75,0.75,0.75,0,0,0,0,-.5,-2, black);
		var RRHoof = new horse(0.75,0.75,0.75,0,0,0,0,-.5,0, black);
		var LFHoof = new horse(0.75,0.75,0.75,0,0,0,0,-.5,-2, black);
		var RFHoof = new horse(0.75,0.75,0.75,0,0,0,0,-.5,0, black);
		
		var LRLegU= new HDimond(0,-.5,-2,0,brown);
		var LRLegL= new HDimond(0,-.5,-2,0,brown);
		var RRLegU= new HDimond(0,-.5,0,0,brown);
		var RRLegL= new HDimond(0,-.5,0,0,brown);
		var LFLegU= new HDimond(0,-.5,-2,0,brown);
		var LFLegL= new HDimond(0,-.5,-2,0,brown);
		var RFLegU= new HDimond(0,-.5,0,0,brown);
		var RFLegL= new HDimond(0,-.5,0,0,brown);

		var Utail= new HDimond(-2.5,0,0,1.57079642, brown);
		var Mtail= new HDimond(-3.2,-.4,0,0.07853981, brown);
		var Ltail= new HDimond(-3.5,-1.25,0,0, white);
		
		BlCavier = new THREE.Object3D();
	
		//Body
		BlCavier.add(torso);
		BlCavier.add(neck);
		//Tail
		BlCavier.add(Utail);
		BlCavier.add(Mtail);
		BlCavier.add(Ltail);
		
		
		//Head
		BlCavierHead = new THREE.Object3D();
		
		BlCavierHead.add(head);
		BlCavier.add(BlCavierHead);

		
		//Left Rear Leg
		BlCavierLRLeg = new THREE.Object3D();
		BlCavierLRLegUp = new THREE.Object3D();
		BlCavierLRLegLo = new THREE.Object3D();

		BlCavierLRLeg.translateX(-1.5);
		BlCavierLRLeg.translateY(-1);
		BlCavierLRLeg.translateZ(1);
		
		BlCavierLRLeg.add(LRLegU);
		BlCavierLRLeg.add(BlCavierLRLegUp);
	
		//Left lower sections
		//Change Rotation Origin		
		BlCavierLRLegUp.translateX(0);
		BlCavierLRLegUp.translateY(-1);
		BlCavierLRLegUp.translateZ(0)
		
		BlCavierLRLegUp.add(LRLegL);
		BlCavierLRLegUp.add(BlCavierLRLegLo);
		
		//Left Hoof
		BlCavierLRLegLo.translateX(0);
		BlCavierLRLegLo.translateY(-.9);
		BlCavierLRLegLo.translateZ(0);
		
		BlCavierLRLegLo.add(LRHoof);

		
		//Right Rear Leg 
		BlCavierRRLeg = new THREE.Object3D();
		BlCavierRRLegUp = new THREE.Object3D();
		BlCavierRRLegLo = new THREE.Object3D();

		BlCavierRRLeg.translateX(-1.5);
		BlCavierRRLeg.translateY(-1);
		BlCavierRRLeg.translateZ(1);
		
		BlCavierRRLeg.add(RRLegU);
		BlCavierRRLeg.add(BlCavierRRLegUp);
		
		//Right Rear lower sections
		//Change Rotation Origin
		BlCavierRRLegUp.translateX(0);
		BlCavierRRLegUp.translateY(-1);
		BlCavierRRLegUp.translateZ(0);

		BlCavierRRLegUp.add(RRLegL);
		BlCavierRRLegUp.add(BlCavierRRLegLo);
		
		//Right Hoof
		BlCavierRRLegLo.translateX(0);
		BlCavierRRLegLo.translateY(-.9);
		BlCavierRRLegLo.translateZ(0);

		BlCavierRRLegLo.add(RRHoof);
		
		//Right Leg
		BlCavierRFLeg = new THREE.Object3D();
		BlCavierRFLegUp = new THREE.Object3D();
		BlCavierRFLegLo = new THREE.Object3D();

		BlCavierRFLeg.translateX(1.5);
		BlCavierRFLeg.translateY(-1);
		BlCavierRFLeg.translateZ(1);
		
		BlCavierRFLeg.add(RFLegU);
		BlCavierRFLeg.add(BlCavierRFLegUp);
	
		//Right lower sections
		//Change Rotation Origin		
		BlCavierRFLegUp.translateX(0);
		BlCavierRFLegUp.translateY(-1);
		BlCavierRFLegUp.translateZ(0);
		
		BlCavierRFLegUp.add(RFLegL);
		BlCavierRFLegUp.add(BlCavierRFLegLo);
		
		//Right Hoof
		BlCavierRFLegLo.translateX(0);
		BlCavierRFLegLo.translateY(-.9);
		BlCavierRFLegLo.translateZ(0);
		
		BlCavierRFLegLo.add(RFHoof);
		
		//Left Front Leg
		BlCavierLFLeg = new THREE.Object3D();
		BlCavierLFLegUp = new THREE.Object3D();
		BlCavierLFLegLo = new THREE.Object3D();

		//Left Leg
		BlCavierLFLeg.translateX(1.5);
		BlCavierLFLeg.translateY(-1);
		BlCavierLFLeg.translateZ(1);
		
		BlCavierLFLeg.add(LFLegU);
		BlCavierLFLeg.add(BlCavierLFLegUp);
	
		//Left lower sections
		//Change Rotation Origin		
		BlCavierLFLegUp.translateX(0);
		BlCavierLFLegUp.translateY(-1);
		BlCavierLFLegUp.translateZ(0)
		
		BlCavierLFLegUp.add(LFLegL);
		BlCavierLFLegUp.add(BlCavierLFLegLo);
		
		//Left Hoof
		BlCavierLFLegLo.translateX(0);
		BlCavierLFLegLo.translateY(-.9);
		BlCavierLFLegLo.translateZ(0);
		
		BlCavierLFLegLo.add(LFHoof);

		//Add to parent horse
		BlCavier.add(BlCavierRFLeg);
		BlCavier.add(BlCavierLFLeg);
		BlCavier.add(BlCavierRRLeg);
		BlCavier.add(BlCavierLRLeg);


		
		// lights

		light = new THREE.PointLight( 0xffffff );
		light.position.set( 0, 30, 50 );
		scene.add( light );

		light = new THREE.DirectionalLight( 0x002288 );
		light.position.set( -1, -1, -1 );
		scene.add( light );

		light = new THREE.AmbientLight( 0x222222 );
		scene.add( light );
		
			
		Arena.add(BlCavier);
		scene.add(Arena);
	
		//Second Camera
		BlCavier.add( cam );	
		
		//Jump Fences
	    jumpFence[0] = horseFence(0,-4, -30, .4, 90, 0);
		jumpFence[1] = horseFence(30,-4, 0, .4, 0, 0);
		jumpFence[2] = horseFence(0,-4, 30, .4, 90, 0);
		jumpFence[3] = horseFence(-30,-4, 0, .4, 0, 0 );
		
		// renderer
		renderer = new THREE.WebGLRenderer( { antialias: false } );
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild(renderer.domElement); 
		window.addEventListener( 'resize', onWindowResize, false );
		
		currentGameTime = 0;

	
	}
	
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	controls.handleResize();
	render();
}

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	render();

	handleKeys();

	game();

	if(trigger){
		jump();
	}
	if(walk){
		trot(2);
	}
	if(run){
		trot(.5);
	}
	if(trigger2){
		rear();
	}	
	 detection();


	document.getElementById("time").innerHTML= currentGameTime;
 	
	 
}

function render() {
	if(switchView){
		renderer.render( scene, cam);}
	else{
		renderer.render( scene, camera);
	}
		
}


	
	