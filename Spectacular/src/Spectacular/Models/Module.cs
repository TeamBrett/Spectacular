using System.Collections.Generic;
using System.Linq;

namespace Spectacular.Models {
    public class Module {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Feature> Features { get; set; } = new List<Feature>();

        public Feature Add(Feature feature) {
            lock (this.Features) {
                if (this.Features.Any()) {
                    feature.Id = this.Features.Max(x => x.Id) + 1;
                } else {
                    feature.Id = 1;
                }

                this.Features.Add(feature);
            }

            return feature;
        }

        public Feature Update(int id, ApiFeature apiFeature) {
            Feature feature = this.Features.SingleOrDefault(x => x.Id == id);
            if (feature == null) {
                return null;
            }

            feature.Name = apiFeature.Name;
            feature.Description = apiFeature.Description;
            return feature;
        }
    }

    public class ApiModule {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Feature> Features { get; set; } = new List<Feature>();
    }

    public class Feature : Requirement {
        public Feature(ApiFeature feature) 
            : base(feature) {
            this.Name = feature?.Name;
        }

        public string Name { get; set; }
    }

    public class ApiFeature : ApiRequirement {
        public ApiFeature(Feature feature) : 
            base(feature){
            this.Name = feature?.Name;
        }

        public string Name { get; set; }
    }

    public class Requirement {
        public Requirement(ApiRequirement requirement) {
            this.Id = requirement.Id;
            this.Description = requirement.Description;
        }

        public int Id { get; set; }
        public string Description { get; set; }
        public List<Requirement> Requirements { get; set; } = new List<Requirement>();
    }

    public class ApiRequirement {
        public ApiRequirement(Requirement requirement) {
            this.Id = requirement?.Id ?? 0;
            this.Description = requirement?.Description;
        }

        public int Id { get; set; }
        public string Description { get; set; }
        public List<ApiRequirement> Requirements { get; set; } = new List<ApiRequirement>();
    }

    public static class Store {
        private static readonly List<Module> Modules = new List<Module>();

        public static IEnumerable<Module> GetModules() {
            foreach (Module module in Modules) {
                yield return new Module { Id = module.Id, Name = module.Name, Description = module.Description };
            }
        }

        public static void Add(Module module) {
            lock (Modules) {
                if (Modules.Any()) {
                    module.Id = Modules.Max(x => x.Id) + 1;
                } else {
                    module.Id = 1;
                }
                Modules.Add(module);
            }
        }

        public static void Delete(int id) {
            var module = Modules.SingleOrDefault(x => x.Id == id);
            if (module != null) {
                Modules.Remove(module);
            }
        }

        public static void Update(int id, Module module) {
            var existing = Modules.Single(x => x.Id == id);
            existing.Name = module.Name;
            existing.Description = module.Description;
        }
    }
}
