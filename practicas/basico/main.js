
var myApp = angular.module('myApp', []);

myApp.factory('Data', function(){
	return {
		message:"I'm data from a service"
	};
})
.factory('Avengers', function(){
	var Avengers = {};
	Avengers.cast = [
		{
			name: 'jasfd',
			character: 'ironMan'
		},
		{
			name: 'lllll',
			character: 'thor'
		},
		{
			name: 'zzzz',
			character: 'hulk'
		}
	];
	return Avengers;
});

myApp.directive("superhero", function(){
	return{
		restrict: 'E',
		scope: {},
		controller: function($scope){
			$scope.abilities = [];
			this.addStrength = function(){
				$scope.abilities.push("fuerza");
			};
			this.addSpeed = function(){
				$scope.abilities.push("velocidad");
			};
			this.addFlight = function(){
				$scope.abilities.push("volar");
			};
		},
		link: function(scope, element){
			element.addClass("button");
			element.bind("mouseenter", function(){
				console.log(scope.abilities);
			});
		}
	};
});
myApp.directive("strength", function(){
	return{
		require: "superhero",
		link: function(scope,element,attrs,superheroCtrl){
			superheroCtrl.addStrength();
		}
	};
});
myApp.directive("flight", function(){
	return{
		require: "superhero",
		link: function(scope,element,attrs,superheroCtrl){
			superheroCtrl.addFlight();
		}
	};
});
myApp.directive("speed", function(){
	return{
		require: "superhero",
		link: function(scope,element,attrs,superheroCtrl){
			superheroCtrl.addSpeed();
		}
	};
});

myApp.directive('superman', function(){
	return {
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		link: function(){
			alert("estoy trabajando duro");
		}
		//template: '<div>aki estoy para salvarte</div>'
	};
});
myApp.directive('flash', function(){
	return {
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		link: function(){
			alert("estoy trabajando rapido");
		}
		//template: '<div>aki estoy para salvarte</div>'
	};
});
myApp.directive('enter', function(){
	return function(scope,element,attrs){
		element.bind("mouseenter", function(){
			element.addClass(attrs.enter);
		})
	}
});
myApp.directive('salir', function(){
	return function(scope,element,attrs){
		element.bind("mouseleave", function(){
			element.removeClass(attrs.enter);
		})
	}
});

myApp.filter('reverse',function(){
	return function(text){
		return text.split("").reverse().join("");
	}
});

myApp.controller('FirstCtrl', function($scope,Data){
	$scope.data = Data;
})
.controller('SecondCtrl', function($scope,Data){
	$scope.data = Data;
	/*$scope.reversedMessage = function(){
		return $scope.data.message.split("").reverse().join("");
	};*/
})
.controller('AvengersCtrl', function($scope,Avengers){
	$scope.avengers = Avengers;
})
.controller('AppCtrl', function($scope){
	
});

myApp.directive("panel", function(){
	return{
		restrict: 'E',
		transclude: true,
		template: '<div class="panel" ng-transclude>This is a panel component</div>'
	};
});
myApp.directive("clock", function(){
	return{
		restrict: 'E',
		scope: {
			timezone: "@"
		},
		template: '<div>12:00pm {{timezone}}</div>'
	};
});
myApp.directive("panelc", function(){
	return{
		restrict: 'E',
		transclude: true,
		scope: {
			title: "@"
		},
		template: '<div style="border:3px solid #000">' + 
		'<div class="alert-box">{{title}}</div>' + 
		'<div ng-transclude></div></div>'
	};
});

myApp.directive("country", function () {
	return {
		restrict: "E",
		controller: function () {
			this.makeAnnouncement = function (message) { 
				console.log("Country says: " + message);
			};
		}
	};
});
myApp.directive("state", function () {
	return {
		restrict: "E",
		controller: function () {
			this.makeLaw = function (law) {
				console.log("Law: " + law);
			};
		}
	};
});
myApp.directive("city", function () {
	return {
		restrict: "E",
		require: ["^country","^state"],
		link: function (scope, element, attrs, ctrls) {
			ctrls[0].makeAnnouncement("This city rocks");
			ctrls[1].makeLaw("Jump higher");
		}
	};
});

myApp.controller('thisCtrl', function($scope){
	this.sayHi = function(){
		alert('holaaaa!');
	};

	//return $scope.thisCtrl = this;
	$scope.asd = this;
});

myApp.directive('dumbPassword', function(){
	var validElement = angular.element('<div>{{model.input}}</div>');
	var link = function(scope){
		scope.$watch("model.input", function(value){
			if(value === "password"){
				validElement.toggleClass("alert-box alert");
			}
		});
	};
	return {
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'template.html',
		replace: true,
		compile: function(tElem){
			tElem.append(validElement);

			return link;
		}/*,
		link: function(scope, element) {
			scope.$watch("model.input", function(value){
				if(value == "password"){
					element.children(1).toggleClass("alert-box alert");
				}
			});
		}*/
	};
});

var controllers = {};

//controllers.controller('')



var twitterApp = angular.module('twitterApp', []);

twitterApp.controller('AppCtrl', function($scope){
	$scope.loadMoreTweets = function(){
		alert('loading tweets');
	};
	$scope.deleteTweets = function () {
		alert("deleting tweets!");
	}
});

twitterApp.directive('entering', function(){
	return function(scope,element,attrs){
		element.bind("mouseenter", function(){
			scope.$apply(attrs.entering);
		})
	}
});