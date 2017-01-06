/**
 * Created by kevke6 on 6-1-2017.
 */
describe('MController', function() {
    beforeEach(module('controller'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));
    describe('$scope.grade', function() {
        it('Return Succes afther code completion', function () {
            var $scope = {};
            var controller = $controller('MController', {$scope: $scope});
            $mission = {
                EXP_Reward: 50,
                Stamina_Costs: 3,
                Difficulty: 'Hard'
            };

            user = [{
                Character_name: 'Test',
                Health: 10,
                Att: 0,
                Def: 10,
                LVL: 1,
                EXP: 0,
                Stamina: 10
            }];
            $scope.user = user;
            $scope.updateData($mission);
            expect($scope.test).toEqual("Succes");
        });
        /*it('Returns User afther get request', function () {
            var $scope = {};
            var controller = $controller('MController', {$scope: $scope});

            });*/
    });
});