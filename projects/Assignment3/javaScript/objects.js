
function horseFence(posX, posY, posZ, scale, rotY, col){

this.posX = posX;
this.posY = posY;
this.posZ = posZ;
this.scale = scale;
this.rotY = rotY;
this.col = col;


var texture = new THREE.Texture();

var imageLoader = new THREE.ImageLoader();
imageLoader.addEventListener( 'load', function ( event ) {
    texture.image = event.content;
    texture.needsUpdate = true;
	} );
	
	if(col == 1){
imageLoader.load( '../Assignment3/textures/jumpR.jpg' );   
	}
	else{
		
		imageLoader.load( '../Assignment3/textures/jumpG.jpg' );   

		}
var objLoader = new THREE.OBJLoader();

objLoader.addEventListener('load', function (event) { 
   
    var object = event.content;
		
	object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            child.material.map = texture;
        }
    } );

object.position.x = posX;
object.position.y = posY;
object.position.z = posZ;

object.scale.x = object.scale.y = object.scale.z = scale;

object.rotation.y = rotY * Math.PI / 180;

		scene.add(object); 
	
	});

	
objLoader.load('../Assignment3/obj/horsejump/horsejump.obj');

}

