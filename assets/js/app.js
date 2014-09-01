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


// ============
// PROTOTYPES
// ============

Array.prototype.has = function(v){
	for (var i = 0, length = this.length; i < length; i++) {
		if (this[i] == v) return true;
	}
	return false;
};

Array.prototype.rdm = function(){
	return this[Math.floor(Math.random() * this.length)];
}

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
	if(get(what) < levelsMax[what][get("lvl") - 1]){
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
	var newLevel = get("lvl") + 1;
	if(newLevel <= levelsMax["hth"].length){
		set("lvl", newLevel);
		displayNotif(msg.levelUp.format(get("lvl")));
		displayLevel();
		setHthMax();
		count("hth");
	}	
}


// ============
// DISPLAY
// ============

function displayLevel(){
	level.innerHTML = "Level <br />" + get("lvl");
}

function displayNotif(info){
	notif.textContent = info;
	notif.style.display = "block";
	setTimeout(function(){ notif.style.display = "none"; }, 5000);
}

function displayEnemy(foe){
	enemy.innerHTML = models[foe].join('\n');
}

function displayInventory(){
	for (var prop in Doctor.obj){
		if (Doctor.obj[prop]){ 
			$("#" + prop).innerHTML = models[prop].join('\n');
		};
	}
}

function displayCristals(){
	cristals.innerHTML = (get("cristal") < 2) ? msg.timeCristals.zero.format(get("cristal")) : msg.timeCristals.more.format(get("cristal"));
}

function displayStory(msg){

	var span = document.createElement("span");
		span.innerHTML = "<br />" + msg,
		story = document.getElementById("story");

	story.appendChild(span);
}

// ============
// CHECKPOINTS
// ============

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


// ============
// ACTIONS
// ============

function buy(what, n){ 
	if (sub("jb", prices[what]) !== 0){
		//push("done", n);
		_add(what, +1);
		displayCristals();
		//$("#action_" + n).style.display = "none";
	} else {
		//$("#" + what).innerHTML = msg.notEnoughJB.format(msg.buy.format(msg.object[what]));
	}
}

function obtain(what, n){
	if(!get(what)){
		inv(what);
		displayInventory();
		//push("done", n);
		$("#action_" + n).style.display = "none";
	}
}


// ============
// OTHER
// ============

function setHthMax(){
	set("hth", levelsMax["hth"][get("lvl") - 1]);
}

function count(){
	 for (var i = 0, j = arguments.length; i < j; i++) {
		switch(arguments[i]){
			case "jb": 
				displayCristals();
				checkCheckpoints();
				break;
		}
		var infos = m_get(arguments[i], "lvl");
		$("#" + arguments[i]).innerHTML = infos[0];
		$("#" + arguments[i] + "_ind").style.width = (infos[0] * 100) / levelsMax[arguments[i]][infos[1] - 1] + "%";
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






// ===================
// RUN YOU CLEVER BOY
// ===================

isFirstRun();

msg = messages[get("lang") || "en"];

displayLevel();

count("jb","hth");
unlockCheckpoints();
//redoActions();

displayInventory();


setInterval(function(){
	add("jb", 1);
}, 2000);