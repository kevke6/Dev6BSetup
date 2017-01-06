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

        $scope.updateData = function($char) {
            user = $scope.user[0];
            battle_dif = user.Att - $char.Def;
            random = Math.random();
            if (user.Stamina > 0) {
                user.Stamina--;
                if (user.Att > $char.Def) {
                    user.EXP =+ 5;
                    if (user.EXP == 50) {
                        user.LVL++
                    }
                    //hier moet de update komen
                    alert("gewonnen");
                } else {
                    if (random > 0.4 && battle_dif >= 0) {
                        user.EXP =+ 6;
                        if (user.EXP == 50) {
                            user.LVL++
                        }
                        //hier moet de update komen
                        alert("gewonnen");
                    } else if (random > 0.8 && battle_dif < 0) {
                        user.EXP =+ 8;
                        if (user.EXP == 50) {
                            user.LVL++
                        }
                        //hier moet de update komen
                        alert("gewonnen");
                    } else {
                        user.EXP++;
                        if (user.EXP == 50) {
                            user.LVL++
                        }
                        // hier moet de update komen
                        alert("verloren");
                    }
                }
            } else {
                alert("u heeft niet genoeg stamina om aan te vallen");
            }
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

