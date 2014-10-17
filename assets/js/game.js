var StorageName = "Doctor",
	Doctor = {pseudo:"",lang:"",lvl:1,hth:100,jb:0,cristal:0,atk:1,def:1,obj:{sonic:false,tardis:false,k9:false},unlocked:[],done:[]},
	levelsMax = {
		jb: [1000,2000,4000,8000,16000,32000,64000,128000],
		hth: [100,200,400,800,1600,3200,6400,12800],
		atk: [1.2,1.4,1.6,1.8,2,2.2,2.4,2.6]
	},
	planets = ["Earth","Trenzalore","Gallifrey","Skaro"],
	prices = {
		cristal: 256
	},
	checkpoints = {
		10: function(){ if(!Doctor.obj["tardis"]){ actions.innerHTML = tpl.action.format(1, msg.steal.format(msg.objects.tardis).cap()); }},
		256: function(){ buy_1_jb.disabled = false; },
		2560: function(){ buy_10_jb.disabled = false; }
	},
	action = {
		1: function(){ obtain("tardis", 1); },
		2: function(f){ buy("cristal", f); },
		3: function(){ reset(); },
		4: function(){ eat(10); }
	},
	enemies = {
		cyberman: {hth: 100, atk: 1, def: 1},
		dalek: {hth: 150, atk: 1, def: 1}
	};