var myApp = angular.module('myApp', []);

myApp.controller('CartController', ['$scope',function($scope){
	$scope.items = [
		{title: 'paint pots',quantity:8,price:3.95},
		{title: 'polka dots',quantity:17,price:12.95},
		{title: 'pebbles',quantity:5,price:6.95}
	];
	$scope.remove = function(index){
		$scope.items.splice(index,1);
	}
	
}]);

myApp.controller('ExampleController', ['$scope', function($scope){
	$scope.master = {};
	$scope.update = function(user){
		$scope.master = angular.copy(user);
	};
	$scope.reset = function(){
		$scope.user = angular.copy($scope.master);
	};
	$scope.isUnchanged = function(user){
		return angular.equals(user, $scope.master);
	}
	$scope.reset();
}]);

/*angular.element(document).ready(function(){
	angular.bootstrap(document,['myApp']);
});*/