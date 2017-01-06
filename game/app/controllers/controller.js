angular.module('controller',[])

    .controller('MController', ['$scope', '$http', '$log', function($scope, $http, $log) {

        $scope.frmToggle = function() {
            $('#blogForm').slideToggle();
        }

        $http.get('./js/pushData.php', {params:{statement:"UPDATE `Character` set `Stamina` = 10 , `LastLogin` = DATE(NOW()) " +
                                                            "where `LastLogin` != DATE(NOW()) and `Character_Name` = 'TheHero'"}})

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

        $scope.updateData = function($mission) {
            user = $scope.user[0];
            if ((user.Stamina - $mission.Stamina_Costs) < 0) {
                alert("Can't start mission, Stamina to low try again tomorrow");
                return;
            } else {
                difficulty = $mission.Difficulty;
                number = (Math.random() * 10) + 1;
                switch (difficulty) {
                    case 'Easy': {
                        if (number > 3) {
                            succes = true;
                        } else {
                            succes = false;
                        }
                    }
                    case 'Medium': {
                        if (number > 6) {
                            succes = true;
                        } else {
                            succes = false;
                        }
                    }
                    case 'Hard': {
                        if (number > 8) {
                            succes = true;
                        } else {
                            succes = false;
                        }
                    }
                }
                stmt = "Update `Character` set ";
                if (succes == true) {
                    $scope.msg = ("Congratulations you have successfully completed the mission: " + $mission.Name);
                    if ((parseInt(user.EXP) + parseInt($mission.EXP_Reward)) >= 100) {
                        lvl = parseInt(user.LVL) + 1;
                        hp = parseInt(user.Health) + 50;
                        exp = (parseInt(user.EXP) +parseInt($mission.EXP_Reward)) - 100;
                        sta = parseInt(user.Stamina) - parseInt($mission.Stamina_Costs);
                        att = parseInt(parseInt(user.Att) + (Math.random()*10) + 1);
                        def = parseInt(parseInt(user.Def) + (Math.random()*10) + 1);
                        $scope.msg = ("Congratulations you are lvl up and your stats have been increased");
                        stmt += " `LVL` = " + lvl +
                                " ,`EXP` =" + exp +
                                " ,`Stamina` =" + sta +
                                " ,`Att` =" + att +
                                " ,`Def` =" + def +
                                " ,`Health` =" + hp +
                                " where Character_Name = '" + user.Character_Name + "'";
                    }else{
                        exp = parseInt(user.EXP) + parseInt($mission.EXP_Reward);
                        sta = parseInt(user.Stamina) - parseInt($mission.Stamina_Costs);
                        stmt += "`EXP` = " + exp + " ,`Stamina` = " + sta + " where Character_Name = '" + user.Character_Name + "'";
                    }
                }
                else {
                    $scope.msg = ("To bad, you failed to complete: " + $mission.Name + ". You are granted 5 Experience for trying");
                    if ((parseInt(user.EXP) + 5) >= 100) {
                        lvl = parseInt(user.LVL) + 1;
                        hp = parseInt(user.Health) + 50;
                        exp = (5 + parseInt(user.EXP)) - 100;
                        sta = parseInt(user.Stamina) - parseInt($mission.Stamina_Costs);
                        att = parseInt(parseInt(user.Att) + (Math.random()*10) + 1);
                        def = parseInt(parseInt(user.Def) + (Math.random()*10) + 1);
                        $scope.msg = ("Congratulations you are lvl up and your stats have been increased");
                        stmt += "`LVL` = " + lvl +
                            ", `EXP` =" + exp +
                            ", `Stamina` =" + sta +
                            ", `Att` =" + att +
                            ", `Def` =" + def +
                            " ,`Health` =" + hp +
                            " where Character_Name = '" + user.Character_Name + "'";
                    }else{
                        exp = parseInt(user.EXP) + 5;
                        sta = parseInt(user.Stamina) - parseInt($mission.Stamina_Costs);
                        stmt += "`EXP` = " + exp + " ,`Stamina` = " + sta + " where Character_Name = '" + user.Character_Name + "'";
                    }
                }
            }
            $http.get('./js/pushData.php', {params:{statement: stmt}});
            $http.get('./js/popData.php',{params:{statement : "select * from `Character` where `Character_Name` = '" + user.Character_Name + "'"}})
                .success(function(data) {
                    $scope.user = data;
                })
                .error(function(err) {
                    $log.error(err);
                })
        }

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
            if(user.Att >= $char.Def) {
                alert("gewonnen");
            } else {
                alert("verloren");
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

