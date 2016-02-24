function interpolator(keys, values, ta)
{
	this.keys = keys;
	this.values = values;
	this.ta = ta;

	var totalAnimTime = ta; //the time taken to complete the animation

	var firstPos = 0; //first position in array
	var secondPos = 1; //second position in array

	var normalisedTime = 0;
	var normalKeyTime = 0 ; 
	
	changeInTime = clock.getDelta();
	currentAnimTime = currentAnimTime + changeInTime;
	
	normalisedTime = currentAnimTime/totalAnimTime;

	if(currentAnimTime >= totalAnimTime){
		currentAnimTime -= totalAnimTime;

	}
		
	while (secondPos < values.length ) {
				

   		if (keys[firstPos] < normalisedTime && keys[secondPos] > normalisedTime) {
			break; //the loop
    	} 
		
		else {
			
			firstPos += 1;
	 		secondPos += 1;
    	}
	}
	
if (secondPos < values.length) {
	var deltaKey = keys[secondPos] - keys[firstPos];//secondKey - firstKey;
	normalKeyTime = normalisedTime - keys[firstPos]; //normalisedTime - firstKey
	normalKeyTime = normalKeyTime / deltaKey;	
	
	var deltaVal = values[secondPos] - values[firstPos];
	var temp = deltaVal*normalKeyTime;
	var result = temp + values[firstPos]; 
	
}
	
	else{
		result = 0;
		trigger = false;
		trigger2 = false;
		secondPos = 1;
		}

return(result);

}


  
function jump(){
	 var verticalJump = interpolator(horseJumpTimer, vJump,3);
	 var horizontalJump = interpolator(horseJumpTimer, hJump,3);
	
	 var frontLegRotation = interpolator(horseLegTimer, frontLegRot,3);
	 var rearLegRotation = interpolator(horseLegTimer, rearLegRot,3);
	 
	BlCavier.position.y = verticalJump;
	BlCavier.translateX (horizontalJump);
	BlCavierLFLeg.rotation.z = BlCavierRFLeg.rotation.z =  frontLegRotation;
	BlCavierRRLeg.rotation.z  = BlCavierLRLeg.rotation.z = rearLegRotation;
	}
	
function trot(time){
	
		 this.time = time;

		 var side1 = interpolator(trotTimer,sideA, time);
		 var side2 = interpolator(trotTimer,sideB, time);

		 BlCavierRFLeg.rotation.z = BlCavierLRLeg.rotation.z =  side1;
		 BlCavierLFLeg.rotation.z = BlCavierRRLeg.rotation.z =  side2;

	}
	
	
function rear(){
	

		 var BCTorso = interpolator(rearTimer,horseTorso, 4);
		 var BCRearLegs = interpolator(rearTimer,horseRearLegs, 4);
		 var BCHead = interpolator(rearTimer,horseHead, 4);
		 var BCFrontRightLeg = interpolator(rearTimer,horseFrontRightLeg, 4);
		 var BCFrontLeftLeg = interpolator(rearTimer,horseFrontleftLeg, 4);

		 BlCavier.position.y = BCTorso;
		 BlCavier.rotation.z = BCTorso;
		 BlCavierLRLeg.rotation.z = BlCavierRRLeg.rotation.z =  BCRearLegs;
		 BlCavierHead.rotation.z = BCHead;
		 BlCavierRFLeg.rotation.z =  BCFrontRightLeg;
		 BlCavierRFLegUp.rotation.z =  BCFrontRightLeg;
		 BlCavierLFLegUp.rotation.z =  BCFrontLeftLeg;
	
	}
	
	
