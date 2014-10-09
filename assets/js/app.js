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
	w.currentEnemy = {
		foe : "",
		hth : 0,
		lost : false
	};



// ============
// HELPERS
// ============

function $(expr){ return d.querySelector(expr); }

function first(object){
	for (var key in object) return key;
}

function last(object){
	var lastKey = "";
	for(var key in object){
	    if(object.hasOwnProperty(key)){
	        lastKey = key;
	    }
	}
	return lastKey;
}

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
	if (get(what) < levelsMax[what][get("lvl") - 1]){
		_add(what, val);
		count(what);
	}
}

function sub(what, val){
	if (get(what) >= val){
		_sub(what, val);
		count(what);
	} else {
		return 0;
	}
}

function levelUp(){
	var newLevel = get("lvl") + 1;
	if (newLevel <= levelsMax["hth"].length){
		set("lvl", newLevel);
		displayNotif(msg.levelUp.format(get("lvl")));
		displayLevel();
		set("hth", levelsMax["hth"][newLevel - 1]);
		set("atk", levelsMax["atk"][newLevel - 1]);
		count();
	}
}

function attack(){
	if (!w.currentEnemy.lost){
		w.currentEnemy.hth = w.currentEnemy.hth - (10 * get("atk"));
		displayEnemyHth();
		if (w.currentEnemy.hth <= 0){ 
			w.currentEnemy.lost = true;
			button_attack.disabled = true;
			foe_hth_ind.style.width = 0;
		}
	}
	console.log(w.currentEnemy.hth, w.currentEnemy.lost);
}


// ============
// DISPLAY
// ============

function displayLevel(){
	level.innerHTML = "Level <br />" + get("lvl");
}

function displayNotif(info, type){
	notif.textContent = info;
	notif.className = type || "success";
	notif.style.display = "block";
	setTimeout(function(){ notif.style.display = "none"; }, 5000);
}

function displayEnemy(foe){
	enemy_img.innerHTML = models[foe].join('\n');
	enemy_hth.style.display = "block";

	w.currentEnemy.foe = foe;
	w.currentEnemy.hth = enemies[foe];
	w.currentEnemy.lost = false;

	button_attack.disabled = false;
	displayEnemyHth();
}

function displayEnemyHth(){
	foe_hth_ind.style.width = ((w.currentEnemy.hth * 100) / enemies[w.currentEnemy.foe]) + "%";
}

function displayInventory(){
	for (var prop in Doctor.obj){
		if (Doctor.obj[prop]){ 
			$("#" + prop).innerHTML = models[prop].join('\n');
		}
	}
}

function displayCristals(){
	cr.innerHTML = get("cristal");
}

function displayStory(msg){
	var span = d.createElement("span");
		span.innerHTML = "<br />" + msg;

	story.appendChild(span);
}

// ============
// CHECKPOINTS
// ============

function checkCheckpoints(){
	var infos = m_get("jb", "unlocked");

	if (list(checkpoints).has(infos[0])){
		checkpoints[infos[0]]();
		if (!infos[1].has(infos[0])){ push("unlocked", infos[0]); }
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

function buy(what, f, n){ 
	if (sub("jb", (f||1) * prices[what]) !== 0){
		_add(what, 1 * (f||1));
		displayCristals();
		if(n){ push("done", n); };
	}
}

function obtain(what, n){
	if(!get(what)){
		inv(what);
		displayInventory();
		$("#action_" + n).style.display = "none";
		if(n){ push("done", n); };
	}
}


// ============
// OTHER
// ============

function count(){
	var args = (arguments.length >= 1) ? arguments : ["jb","hth"];
	for (var i = 0, j = args.length; i < j; i++){
		var infos = m_get(args[i], "lvl");
		$("#" + args[i]).innerHTML = infos[0];

		var value = (infos[0] * 100) / levelsMax[args[i]][infos[1] - 1];
		$("#" + args[i] + "_ind").style.width = value + "%";

		switch(args[i]){
			case "jb": 
				displayCristals();
				checkCheckpoints();
				break;
			case "hth":
				if (value.between(0, 33)){ hth_ind.style.backgroundColor = "red"; }
				if (value.between(33, 66)){ hth_ind.style.backgroundColor = "orange"; }
				if (value.between(66, 100)){ hth_ind.style.backgroundColor = "green"; }
				break;
		}
    }
}

function redoActions(){
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

count();
unlockCheckpoints();
//redoActions();

displayInventory();


setInterval(function(){
	add("jb", 1);
}, 2000);