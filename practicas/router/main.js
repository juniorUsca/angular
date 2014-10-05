var myApp = angular.module('myApp', ['ngRoute']);


myApp.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when('/',{
			templateUrl: 'template.html',
			controller: 'AppCtrl',
			resolve: {
				loadData: appCtrl.loadData,
				prepData: appCtrl.prepData
				/*app: function($q, $timeout){
					var defer = $q.defer();
					//defer.resolve();
					$timeout(function () {
						defer.resolve(); 
					}, 2000);
					return defer.promise;
				}*/
			}
		})
		.when('/personal/:message',{
			templateUrl: 'template.html',
			controller: 'AppCtrl2'
		})
		.when('/pizza/:crust/:toppings',{
			redirectTo: function(routeParams, path, search){
				console.log(routeParams);
				console.log(path);
				console.log(search);
				return '/' + routeParams.crust;
			}
		})
		.when('/deep', {
			template: 'Deep dish'
		})
		.when('/when',{
			templateUrl: 'when.html',
			controller: 'WhenCtrl'
		})
		.when('/new',{
			templateUrl: 'new.html',
			controller: 'NewCtrl',
			resolve: {
				loadData: whenCtrl.loadData
			}
		})
		//.otherwise({redirectTo:'/'});
}]);
/// trato de errores
myApp.directive('error', ['$rootScope', function($rootScope){
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		template: '<div class="alert-box alert" ng-show="isErrror">Error!!!</div>',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			$rootScope.$on("$routeChangeError", function(event, current, previus, rejection){
				$scope.isErrror = true;
			});
		}
	};
}]);

myApp.controller('AappCtrl', ['$rootScope','$scope', '$route', '$location', function($rootScope, $scope, $route, $location){
	$rootScope.$on('$routeChangeError', function(event, current, previus, rejection){
		console.log('fallo al cambiar rutas');
		console.log(rejection);
	});

	$rootScope.$on("$routeChangeStart", function(event, current, previous, rejection){
		console.log($scope, $rootScope, $route, $location);
	});
	$rootScope.$on("$routeChangeSuccess", function(event, current, previous, rejection){
		console.log($scope, $rootScope, $route, $location);
	});
}]);
/// controladores

var appCtrl = myApp.controller('AppCtrl', ['$scope', '$route', function($scope, $route){
	console.log($route);
	$scope.model = {
		message: 'siiiiiiiiii'
	};
}]);

appCtrl.loadData = function($q, $timeout){
	var defer = $q.defer();
	$timeout(function () {
		//defer.resolve('load data'); 
		defer.reject('load data'); 
		//console.log('loada data');
	}, 2000);
	return defer.promise;
}
appCtrl.prepData = function($q, $timeout){
	var defer = $q.defer();
	$timeout(function () {
		defer.resolve('prep data');
		//console.log('prep data');
	}, 2000);
	return defer.promise;
}


myApp.controller('AppCtrl2', ['$scope','$routeParams', function($scope,$routeParams){
	$scope.model = {
		message: $routeParams.message
	};
}]);


////

var whenCtrl = myApp.controller('WhenCtrl', ['$scope', '$route', '$location', function($scope, $route, $location){
	$scope.changeRoute = function(){
		console.log($scope);
		$location.path('/new');
	};
}]);
myApp.controller('NewCtrl', ['$scope', 'loadData', '$template', function($scope, loadData, $template){
	console.log($scope, loadData, $template);
}]);
whenCtrl.loadData = function($q, $timeout){
	var defer = $q.defer();
	$timeout(function () {
		defer.resolve({message: 'success'});
	}, 2000);
	return defer.promise;
}