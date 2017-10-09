class FeatureCmpCtrl {
    constructor($http) {
        this.$http = $http;
    }
    $onChanges(changes) {
        if (changes && changes.feature && changes.feature.currentValue !== changes.feature.previousValue) {
            this.loadRequirements();
        }
    }
    add() {
        this.$http.post(`/api/modules/${this.moduleId}/features`, { name: 'feat 1', description: 'feat 1' })
            .then(() => {
            this.loadRequirements();
        });
    }
    loadRequirements() {
        this.$http.get(`/api/modules/${this.moduleId}/features/${this.feature.id}/requirements`)
            .then((response) => {
            this.requirements = response.data;
        });
    }
}
FeatureCmpCtrl.ctor = ['$http', FeatureCmpCtrl];
class FeatureCmp {
    constructor() {
        this.bindings = {
            moduleId: '<',
            feature: '<'
        };
        this.controller = FeatureCmpCtrl.ctor;
        this.templateUrl = 'feature.html';
    }
}
angular.module('Spectacular')
    .component('specFeature', new FeatureCmp());
