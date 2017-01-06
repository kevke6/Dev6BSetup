describe('MpController', function() {
    beforeEach(module('controller'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('$scope.grade', function() {
        it('says that the player lost', function() {
            var $scope = {};
            var controller = $controller('MPController', {
                $scope: $scope });
            $char = [{
                Character_name: 'Test',
                Health: 10,
                Att: 10,
                Def: 10,
                LVL: 1,
                EXP: 0,
                Stamina: 10
            }]

            user = [{
                Character_name: 'Test',
                Health: 10,
                Att: 0,
                Def: 10,
                LVL: 1,
                EXP: 0,
                Stamina: 10
            }]
            $scope.user = user;
            $scope.updateData($char);
            expect($scope.test).toEqual("succes");
        });
    });
});