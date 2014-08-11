function isFirstRun() {
	(localStorage.getItem(StorageName)) ? load() : save();
}

function save() {
	localStorage.setItem(StorageName, JSON.stringify(Game));
	load();
}

function load() {
	Game = JSON.parse(localStorage.getItem(StorageName));
}

function get(param) {
	return Game[param];
}

function m_get() {
    var list = [];
    for (var i = 0, j = arguments.length; i < j; i++) {
        list.push(Game[arguments[i]]);
    }
    return list;
}

function _add(param, val) {
	Game[param] += val;
	save();
}

function _sub(param, val) {
	Game[param] -= val;
	save();
}

function set(param, val) {
	Game[param] = val;
	save();
}

function push(param, val){
	Game[param].push(val);
	save();
}