//Keybaord Controls




document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;
  
function handleKeyDown(event){
        keysDown[event.keyCode] = true;
		
		switch (event.keyCode) {
    
    case 83://s
		toggle(switchView);
        break;
		}
      }

function handleKeyUp(event){
        keysDown[event.keyCode] = false;
      }
    
function handleKeys(){
        if(keysDown[keysCode.ra] == true){
			BlCavier.rotation.y -= 0.05; 
        }
        if(keysDown[keysCode.la] == true){
			BlCavier.rotation.y += 0.05; 
        }
		if(keysDown[keysCode.ua] == true){
    		BlCavier.translateX(0.05);
			
			walk = true;

        }
		if(keysDown[keysCode.ua] != true && keysDown[keysCode.da] != true){

			walk = false;
			//currentAnimTime = 0;   


        }
     	if(keysDown[keysCode.da] == true){
			BlCavier.translateX(-0.05);
			
			walk = true;

		}
		
		//Run
		if(keysDown[keysCode.ua] == true && keysDown[keysCode.t] == true){
    		BlCavier.translateX(0.1);
			
			run = true;

        }
     	if(keysDown[keysCode.da] == true && keysDown[keysCode.t] == true){
			BlCavier.translateX(-0.1);
			
			run = true;

		}
		if(keysDown[keysCode.t] != true){
			
			run = false;

		}
	   if(keysDown[keysCode.j] == true){

			clock.stop();
			trigger = true;//make a boolean statement to 
	 		currentAnimTime = 0;   

    
			 }
		if(keysDown[keysCode.r] == true){

			clock.stop();
			trigger2 = true;//make a boolean statement to 
	 		currentAnimTime = 0;   

    
			 }
			
}


function toggle(b)
{
  if(b){
	 switchView = false;
} 
  else 	switchView = true;

}

function game(){
	var i = 3;
	
	if(keysDown[keysCode.z] == true){
		hit[0] = hit[1] = hit[2] = hit[3] = false;
		jumpFence[0] = horseFence(0,-4, -30, .4, 90, 0);
		jumpFence[1] = horseFence(30,-4, 0, .4, 0, 0);
		jumpFence[2] = horseFence(0,-4, 30, .4, 90, 0);
		jumpFence[3] = horseFence(-30,-4, 0, .4, 0, 0 );
		currentGameTime = 0;
		gameClock.start();
		start = true;
				document.getElementById("start").innerHTML='';

        }
		
		if(start){
					currentGameTime = currentGameTime + gameClock.getDelta();

			
			}
		
	if( hit[0] && hit[1] && hit[2] && hit[3] ){
		start = false;
	
		score[i] = currentGameTime;
		

		document.getElementById("Finish").innerHTML= score[i];

	
	
	
	}
}