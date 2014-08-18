// ============
// VARIABLES
// ============

var d = document,
	w = window,
	v = 0.1,
	msg,
	tpl = {
		action: "<button id='action_{0}' onclick='action[{0}]();'>{1}</button>"
	};



// ============
// HELPERS
// ============

function $(expr){ return d.querySelector(expr); }

function first(object){
	for (var key in object) return key;
};

function last(object){
	var lastKey = "";
	for(var key in object){
	    if(object.hasOwnProperty(key)){
	        lastKey = key;
	    }
	}
	return lastKey;
};

function list(object){
	var list = [];
	for (var key in object) {
		list.push(key);
	};
	return list;
}

Array.prototype.has = function(v){
	for (var i = 0, length = this.length; i < length; i++) {
		if (this[i] == v) return true;
	}
	return false;
};

Number.prototype.between = function(min, max){
	return ((this >= min) && (this < max));
};

String.prototype.format = function(){
	var string = this;
	for (var i = 0, j = arguments.length; i < j; i++) {
		string = string.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
	}
	return string;
};

String.prototype.cap = function(){
	return this.charAt(0).toUpperCase() + this.substring(1);
};


// ============
// ENGINE
// ============

function changeLang(ln){
	set("lang", ln);
	location.reload();
}


// ============
// GAME
// ============

function add(what, val){
	if(get(what) < levelsMax[what][get("level") - 1]){
		_add(what, val);
		count(what);
	}
}

function sub(what, val){
	if(get(what) >= val){
		_sub(what, val);
		count(what);
	} else {
		return 0;
	}
}

function levelUp(){
	var newLevel = get("level") + 1;
	if(newLevel <= levelsMax["hth"].length){
		set("level", newLevel);
		displayNotif(msg.levelUp.format(get("level")));
		displayLevel();
		setHthMax();
		count("hth");
	}	
}

function displayLevel(){
	level.innerHTML = get("level");
}

function setHthMax(){
	set("hth", levelsMax["hth"][get("level") - 1]);
}

function displayNotif(info){
	notif.textContent = info;
	notif.style.display = "block";
	setTimeout(function(){ notif.style.display = "none"; }, 5000);
}

function count(){
	 for (var i = 0, j = arguments.length; i < j; i++) {
		switch(arguments[i]){
			case "jb": 
				countCristals();
				checkCheckpoints();
				break;
		}
		var infos = m_get(arguments[i], "level");
		$("#" + arguments[i]).innerHTML = infos[0];
		$("#" + arguments[i] + "_ind").style.width = (infos[0] * 100) / levelsMax[arguments[i]][infos[1] - 1] + "%";
    }
}

function countCristals(){
	set("cristal", parseInt(get("jb") / prices.oneCristal));
	cristals.innerHTML = (get("cristal") < 2) ? msg.timeCristals.zero.format(get("cristal")) : msg.timeCristals.more.format(get("cristal"));
}

function checkCheckpoints(){
	var infos = m_get("jb", "unlocked");
	
	if (list(checkpoints).has(infos[0])){
		checkpoints[infos[0]]();
		if(!infos[1].has(infos[0])){ push("unlocked", infos[0]); }
	}
}

function unlockCheckpoints(){
	var infos = m_get("jb", "unlocked");

	for (var i = 0, length = infos[1].length; i < length && infos[1][i] < infos[0] ; i++) {
		checkpoints[infos[1][i]]();
	}
}

function buy(what, n){
	if(!get(what)){
		if (sub("jb", prices[what]) !== 0){
			$("#"+what).innerHTML = models[what].join('\n');
			set(what, true);
			levelUp();
			push("done", n);
			$("#action_"+n).style.display = "none";
		} else {
			$("#"+what).innerHTML = msg.notEnoughJB.format(msg.buy.format(msg.object[what]));
		}
	}
}

function redoActions(){
	if(get("tardis")){
		tardis.innerHTML = models.tardis.join('\n');
	}

	//var infos = get("done");

	//for (var i = 0, length = infos[1].length; i < length && infos[1][i] < infos[0] ; i++) {
	//	checkpoints[infos[1][i]]();
	//}
}

function displayEnemy(foe){
	enemy.innerHTML = models[foe].join('\n');
}

function has(){
	for (var i = 0, j = arguments.length; i < j; i++) {
		if(get(arguments[i])){ $("#"+arguments[i]).innerHTML = models[arguments[i]].join('\n'); }

	}
}


// ===================
// RUN YOU CLEVER BOY
// ===================

isFirstRun();

msg = messages[get("lang") || "en"];

displayLevel();

count("jb","hth");
unlockCheckpoints();
//redoActions();
has("tardis", "k9")

setInterval(function(){
	add("jb", 1);
}, 2000);

window.onbeforeunload = function () {
	//save();
};