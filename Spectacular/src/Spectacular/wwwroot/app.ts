interface IApp {
}

class AppCtrl {
    public static ctor = ['$http', AppCtrl];
    public message: string = 'hello world';

    public modules: Array<IModule>;

    constructor(private $http: ng.IHttpService) {
        this.loadModules();
    }

    public add(): void {
        this.$http.post('/api/modules', { name: 'mod 1', description: 'desc 1' })
            .then(() => {
                this.loadModules();
            });
    }

    private loadModules() {
        this.$http.get('/api/modules')
            .then((modules: ng.IHttpPromiseCallbackArg<Array<IModule>>) => {
                this.modules = modules.data;
            });
    }
}

class AppCmp implements ng.IComponentOptions {
    public bindings: { [binding: string]: string } = {
    }

    public controller = AppCtrl.ctor;

    public templateUrl = 'app.html';
}

angular.module('Spectacular', [])
    .component('specApp', new AppCmp());

angular.element(document as any).ready(() => {
    angular.bootstrap(document, ['Spectacular']);
    console.log('strapped');
});
