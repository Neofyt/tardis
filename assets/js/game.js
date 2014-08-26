var StorageName = "Doctor",
	Doctor = {pseudo:"",lvl:1,lang:"",hth:100,jb:0,cristal:0,obj:{sonic:false,tardis:false,k9:false},unlocked:[],done:[]},
	levelsMax = {
		jb: [1000,2000,4000,8000,16000,32000,64000,128000],
		hth: [100,200,400,800,1600,3200,6400,12800]
	},
	prices = {
		oneCristal: 256
	},
	checkpoints = {
		10: function(){ if(!Doctor.obj["tardis"]){ actions.innerHTML = tpl.action.format(1, msg.steal.format(msg.objects.tardis).cap()); }},
	},
	action = {
		1: function(){ steal("tardis", 1); }
	},
	test = [
		{
            a: 1,
            s: 500,
            f: function(){ buy("tardis", 1); }
		}
	];