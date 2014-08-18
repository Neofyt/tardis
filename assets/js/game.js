var StorageName = "Doctor",
	Doctor = {pseudo:"",level:1,lang:"",tardis:false,k9:false,hth:100,jb:0,cristal:0,unlocked:[],done:[]},
	levelsMax = {
		jb: [1000,2000,4000,8000,16000,32000,64000,128000],
		hth: [100,200,400,800,1600,3200,6400,12800]
	},
	prices = {
		oneCristal: 256,
		tardis: 500
	},
	checkpoints = {
		500: function(){ if(!get("tardis")){ actions.innerHTML = tpl.action.format(1, msg.buy.format(msg.objects.tardis).cap()); }},
		70: function(){ console.log(msg.timeCristals.more.format(get("cristal"))); }
	},
	action = {
		1: function(){ buy("tardis",1); }
	},
	test = [
		{
            a: 1,
            s: 500,
            f: function(){ buy("tardis", 1); }
		}
	];