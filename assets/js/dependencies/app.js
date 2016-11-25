var AngularJS = angular.module('VoteBox', ['ngAnimate', 'angularjs-datetime-picker']);

AngularJS.controller('VoteController', function($scope, $http) {
	$scope.SendVote = function(status) {
		io.socket.post('/api/sendvote', {voteid: $scope.voteid, status: status}, function (resData, jwres) {
			if(resData == "OK")
				$('#modalvote').openModal();
			else
				Materialize.toast(resData, 3000);
		});
	}
});

AngularJS.controller('ViewerController', function($scope, $http) {
	$scope.co = 0;
	$scope.load = 0;

	$scope.$watch('endtime', function () {
		var timestamp = parseInt(new Date().getTime() / 1000);
		$scope.count = $scope.endtime - timestamp;
	});

	setInterval(function () {
		$scope.count -= 1;
		$scope.$apply();
	}, 1000);

	io.socket.on('connect', function () {
		setTimeout(function(){
			if($scope.co == 1)
				location.reload();

			$scope.co = 1;
			io.socket.post('/api/viewer', {});
			$http.get("/api/viewer/").success(function(data) {
				$scope.votetrue = 0;
				$scope.votefalse = 0;
				for(var i = 0; i < data.length; i++) {
					if(data[i].status == 1)
						$scope.votetrue++;
				}
				for(var i = 0; i < data.length; i++) {
					if(data[i].status == -1)
						$scope.votefalse++;
				}

				SetChart($scope.votetrue, $scope.votefalse);

				$scope.load = 1;

				if(!$scope.$$phase)
					$scope.$apply();

				console.log($scope.votetrue + "-" + $scope.votefalse);
			});
			io.socket.post('/api/viewer', {});
		}, 100);
	});
	io.socket.on('newvote', function () {
		$http.get("/api/viewer/").success(function(data) {
			$scope.votetrue = 0;
			$scope.votefalse = 0;
			for(var i = 0; i < data.length; i++) {
				if(data[i].status == 1)
					$scope.votetrue++;
			}
			for(var i = 0; i < data.length; i++) {
				if(data[i].status == -1)
					$scope.votefalse++;
			}
			// Ici c'est appellé dès que quelqu'un vote, donc on appelle SetChart
			// qui rafraichi 
			SetChart($scope.votetrue, $scope.votefalse);
		});
	});
});

// Ici c'est la fonction qui affiche le Chart avec les données passées en paramètres
function SetChart(votetrue, votefalse) {
	var data = [
	    {
	        value: votefalse,
	        color:"#f44336",
	        highlight: "#ef5350",
	        label: "Négatif"
	    },
	    {
	        value: votetrue,
	        color:"#4caf50",
	        highlight: "#66bb6a",
	        label: "Positif"
	    }
	];

	var context = document.getElementById('chart').getContext('2d');
	context.canvas.width = 300;
	context.canvas.height = 300;
	new Chart(context).Doughnut(data);
}

AngularJS.controller('AdminLogInController', function($scope, $http) {
	$scope.errors = [];
	$scope.LogIn = function() {
		$scope.errors = [];

		if(!$scope.email)
			$scope.errors.push("Veuillez entrer une adresse e-mail")
		if(!$scope.password)
			$scope.errors.push("Veuillez entrer un mot de passe")

		if(!$scope.errors.length) {
			io.socket.post('/admin/login', {email: $scope.email, password: $scope.password}, function(resData, jwres) {
				console.log(resData)
				if(resData == "Found")
					location.reload();
				else if(resData == "Not found")
					$scope.errors.push("Identification incorrect")
				else
					$scope.errors = resData;

				$scope.$apply();
			});
		}
	}
});	

AngularJS.controller('AdminPanelController', function($scope, $http) {
	$scope.addvote =  [];
	$scope.errors =   [];
	$scope.listvote = [];

	$http.get("/api/getvotes/").success(function(data) { $scope.listvote = data; });

	$scope.AddVote = function() {
		$scope.errors.addvote =  [];
		var time = 0;

		if($scope.addvote.date)
			time = Date.parse($scope.addvote.date);

		if(!$scope.addvote.name)
			$scope.errors.addvote.push("Veuillez entrer un nom de vote valide")

		if(!time)
			$scope.errors.addvote.push("Veuillez entrer une date valide")

		time = new Date(time).getTime() / 1000;

		if(time < new Date().getTime() / 1000)
			$scope.errors.addvote.push("Veuillez entrer une date posterieur")

		if(!$scope.errors.addvote.length) {
			io.socket.post('/admin/addvote', {name: $scope.addvote.name, date: time}, function(resData, jwres) {
				if(resData.id) {
					Materialize.toast("Le vote " + $scope.addvote.name + " a bien été ajouté! (ID: " + resData.id + ")", 3000);
					$http.get("/api/getvotes/").success(function(data) { $scope.listvote = data; });
					$scope.addvote = [];
				}
				else
					$scope.errors.addvote = resData;

				$scope.$apply();
			});
		}
	}

	$scope.DeleteVote = function(id) {
		io.socket.post('/admin/deletevote', {id: id}, function(resData, jwres) {
			if(resData.id) {
				Materialize.toast("Le vote " + resData.name + " a bien été supprimé! (ID: " + resData.id + ")", 3000);
				$http.get("/api/getvotes/").success(function(data) { $scope.listvote = data; });
			}
			else
				Materialize.toast(resData, 3000);

			$scope.$apply();
		});
	}
});
