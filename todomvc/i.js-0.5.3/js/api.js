var app = app || {};

// Public api for benchmark
// API.FULLRENDER = false;

API.render = function(force){
	console.log(11111)
	return API.RENDERCOUNT;
}
API.getModels = function(){
	console.log(1111)
	return app.appController.list;
}
// Override storage
API.ready = function(){
	console.log('API.ready')
	var list = [];
	return;

}

console.log('my API')
