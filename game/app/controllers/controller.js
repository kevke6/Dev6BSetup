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
                $scope.test = "Succes";
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
                        scope.msg = ("Congratulations you are lvl up and your stats have$ been increased");
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
            $scope.test = "Succes";
        }

    }])
    .controller('MPController', ['$scope', '$http', '$log', function($scope, $http, $log) {

        $scope.frmToggle = function() {
            $('#blogForm').slideToggle();
        }

        $http.get('./js/pushData.php', {params:{statement:"UPDATE `Character` set `Stamina` = 10 , `LastLogin` = DATE(NOW()) " +
        "where `LastLogin` != DATE(NOW()) and `Character_Name` = 'ItsReaper'"}})

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


        $scope.updateData = function($char) {
            user = $scope.user[0];
            battle_dif = user.Att - $char.Def;
            random = Math.random();
            stmt = "Update `Character` set ";
            if (user.Stamina > 0) {
                user.Stamina--;
                if (user.Att > $char.Def) {
                    $scope.msg = ("Congratulations you have successfully defeated: " + $char.Character_Name);
                    user.EXP = parseInt(user.EXP) + 10;
                    if (user.EXP >= 100) {
                        lvl = parseInt(user.LVL) + 1;
                        hp = parseInt(user.Health) + 50;
                        exp = (parseInt(user.EXP) + parseInt(10)) - 100;
                        att = parseInt(parseInt(user.Att) + (Math.random() * 10) + 1);
                        def = parseInt(parseInt(user.Def) + (Math.random() * 10) + 1);
                        $scope.msg = ("Congratulations you are lvl up and your stats have been increased");
                        stmt += "`LVL` = " + lvl +
                            ", `EXP` =" + exp +
                            ", `Stamina` =" + user.Stamina +
                            ", `Att` =" + att +
                            ", `Def` =" + def +
                            " ,`Health` =" + hp +
                            " where Character_Name = '" + user.Character_Name + "'";
                    } else {
                        stmt += "`EXP` = " + user.EXP +
                            " ,`Stamina` = " + user.Stamina +
                            " where Character_Name = '" + user.Character_Name + "'";
                    }
                } else {
                    if (random > 0.4 && battle_dif >= 0) {
                        $scope.msg = ("Congratulations you have successfully defeated: " + $char.Character_Name);
                        user.EXP = parseInt(user.EXP)+ 30;
                        if (user.EXP >= 100) {
                            lvl = parseInt(user.LVL) + 1;
                            hp = parseInt(user.Health) + 50;
                            exp = (parseInt(user.EXP) + parseInt(30)) - 100;
                            att = parseInt(parseInt(user.Att) + (Math.random() * 10) + 1);
                            def = parseInt(parseInt(user.Def) + (Math.random() * 10) + 1);
                            $scope.msg = ("Congratulations you are lvl up and your stats have been increased");
                            stmt += "`LVL` = " + lvl +
                                ", `EXP` =" + exp +
                                ", `Stamina` =" + user.Stamina +
                                ", `Att` =" + att +
                                ", `Def` =" + def +
                                " ,`Health` =" + hp +
                                " where Character_Name = '" + user.Character_Name + "'";
                        } else {
                            stmt += "`EXP` = " + user.EXP +
                                " ,`Stamina` = " + user.Stamina +
                                " where Character_Name = '" + user.Character_Name + "'";
                        }
                    } else if (random > 0.8 && battle_dif < 0) {
                        user.EXP = parseInt(user.EXP) + 75;
                        $scope.msg = ("Congratulations you have successfully defeated: " + $char.Character_Name);
                        if (user.EXP >= 100) {
                            lvl = parseInt(user.LVL) + 1;
                            hp = parseInt(user.Health) + 50;
                            exp = (parseInt(user.EXP) + parseInt(75)) - 100;
                            att = parseInt(parseInt(user.Att) + (Math.random() * 10) + 1);
                            def = parseInt(parseInt(user.Def) + (Math.random() * 10) + 1);
                            $scope.msg = ("Congratulations you are lvl up and your stats have been increased");
                            stmt += "`LVL` = " + lvl +
                                ", `EXP` =" + exp +
                                ", `Stamina` =" + user.Stamina +
                                ", `Att` =" + att +
                                ", `Def` =" + def +
                                " ,`Health` =" + hp +
                                " where Character_Name = '" + user.Character_Name + "'";
                        } else {
                            stmt += "`EXP` = " + user.EXP +
                                " ,`Stamina` = " + user.Stamina +
                                " where Character_Name = '" + user.Character_Name + "'";
                        }
                    } else {
                        $scope.msg = ("To bad, you failed to defeat: " + $char.Character_Name + ". You gained 5 Experience for trying")
                        user.EXP = parseInt(user.EXP) + 5;
                        if ((parseInt(user.EXP) + 5) >= 100) {
                            lvl = parseInt(user.LVL) + 1;
                            hp = parseInt(user.Health) + 50;
                            exp = (5 + parseInt(user.EXP)) - 100;
                            sta = parseInt(user.Stamina) - parseInt(1);
                            att = parseInt(parseInt(user.Att) + (Math.random()*10) + 1);
                            def = parseInt(parseInt(user.Def) + (Math.random()*10) + 1);
                            scope.msg = ("Congratulations you are lvl up and your stats have$ been increased");
                            stmt += "`LVL` = " + lvl +
                                ", `EXP` =" + exp +
                                ", `Stamina` =" + sta +
                                ", `Att` =" + att +
                                ", `Def` =" + def +
                                " ,`Health` =" + hp +
                                " where Character_Name = '" + user.Character_Name + "'";
                        } else {
                            stmt += "`EXP` = " + user.EXP +
                                " ,`Stamina` = " + user.Stamina +
                                " where Character_Name = '" + user.Character_Name + "'";
                        }
                    }
                }
            } else {
                $scope.test = "succes"
                alert("Can't attack, Stamina to low try again tomorrow");
            }


            $http.get('./js/pushData.php', {params:{statement: stmt}});
            $http.get('./js/popData.php',{params:{statement : "select * from `Character` where `Character_Name` = '" + user.Character_Name + "'"}})
                .success(function(data) {
                    $scope.user = data;
                })
                .error(function(err) {
                    $log.error(err);
                })
            $scope.test = "succes"
        }

    }])

