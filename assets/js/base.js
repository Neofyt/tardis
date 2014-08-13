function isFirstRun() {
	(localStorage.getItem(StorageName)) ? load() : save();
}

function save() {
	localStorage.setItem(StorageName, JSON.stringify(Doctor));
	load();
}

function load() {
	Doctor = JSON.parse(localStorage.getItem(StorageName));
}

function get(param) {
	return Doctor[param];
}

function m_get() {
    var list = [];
    for (var i = 0, j = arguments.length; i < j; i++) {
        list.push(Doctor[arguments[i]]);
    }
    return list;
}

function _add(param, val) {
	Doctor[param] += val;
	save();
}

function _sub(param, val) {
	Doctor[param] -= val;
	save();
}

function set(param, val) {
	Doctor[param] = val;
	save();
}

function push(param, val){
	Doctor[param].push(val);
	save();
}