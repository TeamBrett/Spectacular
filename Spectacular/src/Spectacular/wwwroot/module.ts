interface IModule {
    id: number;
    name: string;
    description: string;
}

class ModuleCtrl {
    public static ctor = ['$http', ModuleCtrl];

    public module: IModule;
    private features: Array<IFeature>;

    constructor(private $http: ng.IHttpService) {
    }

    public $onChanges(changes: { module: { currentValue: any, previousValue: any }}) {
        if (changes && changes.module && changes.module.currentValue !== changes.module.previousValue) {
            this.loadFeatures();
        }
    }

    public add(): void {
        this.$http.post(`/api/modules/${this.module.id}/features`, { name: 'feat 1', description: 'feat 1' })
            .then(() => {
                this.loadFeatures();
            });
    }

    private loadFeatures() {
        this.$http.get(`/api/modules/${this.module.id}/features`)
            .then((response: ng.IHttpPromiseCallbackArg<Array<IModule>>) => {
                this.features = response.data;
            });
    }
}

class ModuleCmp implements ng.IComponentOptions {
    public bindings: { [binding: string]: string } = {
        module: '<'
    };

    public controller = ModuleCtrl.ctor;

    public templateUrl = 'module.html';
}

angular.module('Spectacular')
    .component('specModule', new ModuleCmp());
