//Philippe Roy - 3420249
//Assignment 2
//INTE 1113


//Axes
 function axes(length)
{
    var axes = new THREE.Line();
    axes.geometry = new THREE.Geometry();
    axes.material = new THREE.LineBasicMaterial();
    axes.geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    axes.geometry.vertices.push(new THREE.Vector3(length, 0, 0));
    axes.geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    axes.geometry.vertices.push(new THREE.Vector3(0, length, 0));
    axes.geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    axes.geometry.vertices.push(new THREE.Vector3(0, 0, length));
    axes.geometry.colors.push(new THREE.Color(0xff0000));
    axes.geometry.colors.push(new THREE.Color(0xff0000));
    axes.geometry.colors.push(new THREE.Color(0x00ff00));
    axes.geometry.colors.push(new THREE.Color(0x00ff00));
    axes.geometry.colors.push(new THREE.Color(0x0000ff));
    axes.geometry.colors.push(new THREE.Color(0x0000ff));
    axes.material.vertexColors = true;
    axes.type = THREE.LinePieces;
    //scene.add(axes);

    return axes;
}


function horse(sx,sy,sz,rx,ry,rz,px,py,pz,colour){

this.sx = sx;
this.sy = sy;
this.sz = sz;

this.rx = rx;
this.ry = ry;
this.rz = rz;

this.px = px;
this.py = py;
this.pz = pz;

this.colour = colour;

var geometry = new THREE.CubeGeometry(1, 1, 1); 
var material = new THREE.MeshPhongMaterial({color: colour, specular: white});
var cube = new THREE.Mesh(geometry, material); 

cube.scale.x = sx;
cube.scale.y = sy;
cube.scale.z = sz;

cube.rotation.x = rx;
cube.rotation.y = ry;
cube.rotation.z = rz;

cube.position.x = px;
cube.position.y = py;
cube.position.z = pz;

return cube;
}


function HDimond(px,py,pz,rz,HDcolour){

this.px = px;
this.py = py;
this.pz = pz;

var rz = rz;

this.HDcolour = HDcolour;

var geometry = new THREE.Geometry();

geometry.vertices.push(new THREE.Vector3(-1, 0, -1));
geometry.vertices.push(new THREE.Vector3(-1, 0, 1));
geometry.vertices.push(new THREE.Vector3(0, 1, 0));

geometry.vertices.push(new THREE.Vector3(-1, 0, -1));
geometry.vertices.push(new THREE.Vector3(1, 0, -1));
geometry.vertices.push(new THREE.Vector3(0, 1, 0));

geometry.vertices.push(new THREE.Vector3(1, 0, -1));
geometry.vertices.push(new THREE.Vector3(1, 0, 1));
geometry.vertices.push(new THREE.Vector3(0, 1, 0));

geometry.vertices.push(new THREE.Vector3(1, 0, 1));
geometry.vertices.push(new THREE.Vector3(-1, 0, 1));
geometry.vertices.push(new THREE.Vector3(0, 1, 0));

geometry.faces.push(new THREE.Face3(0, 1, 2));
geometry.faces.push(new THREE.Face3(5, 4, 3));
geometry.faces.push(new THREE.Face3(8, 7, 6));
geometry.faces.push(new THREE.Face3(11, 10, 9));

geometry.computeFaceNormals();

var material = new THREE.MeshPhongMaterial({color: HDcolour, specular: white});

var tailT = new THREE.Mesh( geometry, material );
var tailB = new THREE.Mesh( geometry, material );

tailB.rotation.z = 3.1415926;


var	tail = new THREE.Object3D();
		tail.add(tailT);
		tail.add(tailB);


tail.scale.x = tail.scale.y = tail.scale.z = 0.5; 

tail.rotation.z = rz;

tail.position.x = px;
tail.position.y = py;
tail.position.z = pz;




return tail;
}


	


