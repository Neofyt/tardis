function planet(p){
	this.init = function(){ displayStory(dialogs[p][1]);  },
	this.foe = function(enemy){
		displayStory(msg.planets.foe.format(enemy));
		displayEnemy(enemy); 
	}
}

var skaro = new planet("Skaro");
