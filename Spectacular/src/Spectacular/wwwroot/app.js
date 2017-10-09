class AppCtrl {
    constructor($http) {
        this.$http = $http;
        this.message = 'hello world';
        this.loadModules();
    }
    add() {
        this.$http.post('/api/modules', { name: 'mod 1', description: 'desc 1' })
            .then(() => {
            this.loadModules();
        });
    }
    loadModules() {
        this.$http.get('/api/modules')
            .then((modules) => {
            this.modules = modules.data;
        });
    }
}
AppCtrl.ctor = ['$http', AppCtrl];
class AppCmp {
    constructor() {
        this.bindings = {};
        this.controller = AppCtrl.ctor;
        this.templateUrl = 'app.html';
    }
}
angular.module('Spectacular', [])
    .component('specApp', new AppCmp());
angular.element(document).ready(() => {
    angular.bootstrap(document, ['Spectacular']);
    console.log('strapped');
});
