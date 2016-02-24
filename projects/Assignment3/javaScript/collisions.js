function collision(ox,oy,oz,or){
	
	
	this.ox = ox;
	this.oy = oy;
	this.ox = oz;
	this.or = or;
	
	 var horseX = BlCavier.position.x;
	 var horseY = BlCavier.position.y;
	 var horseZ = BlCavier.position.z;
	 var horseR = 2;
	 
	 var objX = ox;
	 var objY = oy;
	 var objZ = oz;
	 var objR = or;
	
	var distX = horseX - objX;
	var distY = horseY - objY;
	var distZ = horseZ - objZ;
	
	var squaredist = (distX * distX) + (distZ * distZ);
	var radii= (horseR + objR) * (horseR + objR) ;

	return squaredist <= (horseR + objR) * (horseR + objR) ;
	}


function detection(){
	
if(collision(0,-4, -30, .4, 1) && hit[0] == false){
		jumpFence[0] = horseFence(0,-4, -30, .41, 90, 1);
		hit[0] = true;	
			document.getElementById("check1").innerHTML='check';

		 } 
		
if(collision(30,-4, 0, .4, 1) && hit[1] == false){
		jumpFence[1] = horseFence(30,-4, 0, .41, 0, 1);
		hit[1] = true;	
				document.getElementById("check2").innerHTML='check';

		 } 

if(collision(0,-4, 30, .4, 1) && hit[2] == false){
		jumpFence[2] = horseFence(0,-4, 30, .41, 90, 1);
		hit[2] = true;	
				document.getElementById("check3").innerHTML='check';

		 } 

if(collision(-30,-4, 0, .4, 1) && hit[3] == false){
		jumpFence[3] = horseFence(-30,-4, 0, .41, 0, 1);
		hit[3] = true;	
				document.getElementById("check4").innerHTML='check';

		 } 
}
