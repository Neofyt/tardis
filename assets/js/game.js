var StorageName = "Game",
	Game = {pseudo:"",level:1,lang:"",tardis:false,hth:100,jb:0,cristal:0,unlocked:[]},
	levelsMax = {
		jb: [1000,2000,4000,8000,16000,32000,64000,128000],
		hth: [100,200]
	},
	jbForOneCristal = 256,
	checkpoints = {
		500: function(){ actions.innerHTML = tpl.action.format(1, msg.buyTardis); },
		70: function(){ console.log(msg.timeCristals.more.format(get("cristal"))); }
	},
	action = {
		1: function(){ buyTardis(); }
	};