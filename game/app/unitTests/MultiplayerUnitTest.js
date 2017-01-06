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
            var controller = $controller('MpController', { $scope: $scope });
            $char = {
                Character_name: 'Test',
                Health: 10,
                Att: 10,
                Def: 10,
                LVL: 1,
                EXP: 0,
                Stamina: 10
            }

            user = {
                Character_name: 'Test',
                Health: 10,
                Att: 0,
                Def: 10,
                LVL: 1,
                EXP: 0,
                Stamina: 10
            }
            $scope.updateData($char)
            $scope.grade();
            expect($scope.msg).toEqual('To bad, you failed to defeat: " + $char.Character_Name + ". You gained 5 Experience for trying"');
        });
    });
});