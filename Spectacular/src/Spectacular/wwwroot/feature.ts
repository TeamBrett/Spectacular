interface IFeature {
    id: number;
    name: string;
    description: string;
}

interface IRequirement {
}

class FeatureCmpCtrl {
    public static ctor = ['$http', FeatureCmpCtrl];

    public moduleId: number;
    public feature: IFeature;
    private requirements: Array<IRequirement>;

    constructor(private $http: ng.IHttpService) {
    }

    public $onChanges(changes: { feature: { currentValue: any, previousValue: any }}) {
        if (changes && changes.feature && changes.feature.currentValue !== changes.feature.previousValue) {
            this.loadRequirements();
        }
    }

    public add(): void {
        this.$http.post(`/api/modules/${this.moduleId}/features`, { name: 'feat 1', description: 'feat 1' })
            .then(() => {
                this.loadRequirements();
            });
    }

    private loadRequirements() {
        this.$http.get(`/api/modules/${this.moduleId}/features/${this.feature.id}/requirements`)
            .then((response: ng.IHttpPromiseCallbackArg<Array<IModule>>) => {
                this.requirements = response.data;
            });
    }
}

class FeatureCmp implements ng.IComponentOptions {
    public bindings: { [binding: string]: string } = {
        moduleId: '<',
        feature: '<'
    };

    public controller = FeatureCmpCtrl.ctor;

    public templateUrl = 'feature.html';
}

angular.module('Spectacular')
    .component('specFeature', new FeatureCmp());
