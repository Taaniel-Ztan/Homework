var app = angular.module('app', ['ngAnimate'])

app.controller('mainCtrl', function($scope) {
	$scope.boxes = [{
		name: 'Rebane',
		image: 'rebane.jpg'
	},{
		name: 'Päikesetõus',
		image: 'paiketous.jpg'
	},{
		name: 'Päikeseloojang',
		image: 'paikeloojang.jpg'
	}, {
		name: 'Linnuke',
		image: 'linnuke.png'
	}, {
		name: 'Part',
		image: 'part.jpg'
	}, {
		name: 'Pardid',
		image: 'pardid.jpg'
	}, {
		name: 'Part ja tema pardipojad',
		image: 'pardipojad.jpg'
	}, {
		name: 'Lind puu oksa peal',
		image: 'LinnukePuuoksal.jpg'
	}, {
		name: 'Meri',
		image: 'meri.jpg'
	}, {
		name: 'Põld',
		image: 'pold.jpg'
	}, {
		name: 'Mahajäetud Linn',
		image: 'majad.jpg'
	}, {
		name: 'Noor Hirv',
		image: 'hirv.jpg'
	}, ];

	$scope.selected = [];
	$scope.selectBox = function(item, position) {
		$scope.selected = [{
			item: item,
			position: position
		}];
		$scope.$apply();
	}
	$scope.clearSelection = function() {
		$scope.selected = [];
	}
})

app.directive('box', function() {
	return {
		restrict: 'E',
		scope: {},
		bindToController: {
			onSelect: "=",
			item: "="
		},
		controllerAs: 'box',
		controller: function() {
			var box = this;

			box.goFullscreen = function(e) {
				box.onSelect(box.item, e.target.getBoundingClientRect())
			}
		},
		link: function(scope, element) {
			element.bind('click', scope.box.goFullscreen)
			element.css({
				'background-image': 'url(' + scope.box.item.image + ')'
			})
		}
	}
})

app.directive('bigBox', function($timeout) {
	return {
		restrict: 'AE',
		scope: {},
		bindToController: {
			position: "=",
			selected: "=",
			onSelect: "="
		},
		controllerAs: 'box',
		controller: function() {
			var box = this;
		},
		link: function(scope, element) {
			var css = {}
			for (var key in scope.box.position) {
				css[key] = scope.box.position[key] + 'px';
			}
			
			element.css(css);

			$timeout(function() {
				element.css({
					top: '50%',
					left: '10%'
				})
				element.addClass('image-out');
			}, 200)

			$timeout(function() {
				element.css({
					width: '80%',
					height: '100%'
				})
			}, 500)
			
			$timeout(function(){
				element.addClass('show');
			}, 800)
		}
	}
})