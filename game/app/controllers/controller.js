angular.module('controller',[])

    .controller('MController', ['$scope', '$http', '$log', function($scope, $http, $log) {

        $scope.frmToggle = function() {
            $('#blogForm').slideToggle();
        }

        $http.get('./js/popData.php',{params:{statement : "select * from `Character` where `Character_Name` = 'TheHero'"}})
            .success(function(data) {
                $scope.user = data;
            })
            .error(function(err) {
                $log.error(err);
            })

        $http.get('./js/popData.php',{params:{statement : "select * from `Mission` " +
                                                            "where `LVL_Low` <= (select `LVL` from `Character` where `Character_Name` = 'TheHero') " +
                                                            "and LVL_High >= (select `LVL` from `Character` where `Character_Name` = 'TheHero') " +
                                                            "order by field(`Difficulty`,'Easy', 'Medium', 'Hard')"}})
            .success(function(data) {
                $scope.missions = data;
            })
            .error(function(err) {
                $log.error(err);
            })

        $scope.pushData = function($params) {
            $http.post('./js/pushData.php',{'title':$params.title, 'description':$params.description})
                .success(function(data) {
                    $scope.characters = data;
                })
                .error(function(err) {
                    $log.error(err);
                })
        }

       /* $scope.removeData = function($params) {
            var cnfrm = confirm("Are you sure to delete?");
            if(cnfrm) {
                $http.post('./js/removeData.php', {'id':$params})
                    .success(function(data) {
                        $scope.characters = data;
                    })
                    .error(function(err) {
                        $log.error(err);
                    })
            } else {
                //
            }

        }*/

    }])
    .controller('MPController', ['$scope', '$http', '$log', function($scope, $http, $log) {

        $scope.frmToggle = function() {
            $('#blogForm').slideToggle();
        }

        $http.get('./js/popData.php',{params:{statement : "select * from `Character` where `Character_Name` != 'ItsReaper'"}})
            .success(function(data) {
                $scope.characters = data;
            })
            .error(function(err) {
                $log.error(err);
            })

        $http.get('./js/popData.php',{params:{statement : "select * from `Character` where `Character_Name` = 'ItsReaper'"}})
            .success(function(data) {
                $scope.user = data;
            })
            .error(function(err) {
                $log.error(err);
            })

        $scope.pushData = function($params) {
            $http.post('./js/pushData.php',{'title':$params.title, 'description':$params.description})
                .success(function(data) {
                    $scope.characters = data;
                })
                .error(function(err) {
                    $log.error(err);
                })
        }

        $scope.removeData = function($params) {
            var cnfrm = confirm("Are you sure to delete?");
            if(cnfrm) {
                $http.post('./js/removeData.php', {'id':$params})
                    .success(function(data) {
                        $scope.characters = data;
                    })
                    .error(function(err) {
                        $log.error(err);
                    })
            } else {
                //
            }

        }

    }])

