class ModuleCtrl {
    constructor($http) {
        this.$http = $http;
    }
    $onChanges(changes) {
        if (changes && changes.module && changes.module.currentValue !== changes.module.previousValue) {
            this.loadFeatures();
        }
    }
    add() {
        this.$http.post(`/api/modules/${this.module.id}/features`, { name: 'feat 1', description: 'feat 1' })
            .then(() => {
            this.loadFeatures();
        });
    }
    loadFeatures() {
        this.$http.get(`/api/modules/${this.module.id}/features`)
            .then((response) => {
            this.features = response.data;
        });
    }
}
ModuleCtrl.ctor = ['$http', ModuleCtrl];
class ModuleCmp {
    constructor() {
        this.bindings = {
            module: '<'
        };
        this.controller = ModuleCtrl.ctor;
        this.templateUrl = 'module.html';
    }
}
angular.module('Spectacular')
    .component('specModule', new ModuleCmp());
