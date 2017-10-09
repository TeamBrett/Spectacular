using System.Collections.Generic;
using System.Linq;

using Microsoft.AspNetCore.Mvc;

using Spectacular.Models;

namespace Spectacular.Controllers {
    [Route("api/[controller]")]
    [Route("api/modules/{moduleId}/features")]
    public class FeaturesController : Controller {
        // GET api/values
        [HttpGet]
        public IEnumerable<ApiFeature> Get(int moduleId) {
            var module = Store.GetModules().FirstOrDefault(x => x.Id == moduleId);
            if (module == null) {
                yield break;
            }

            foreach (Feature feature in module.Features) {
                yield return new ApiFeature(feature);
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ApiFeature Get(int moduleId, int id) {
            Module module = Store.GetModules().FirstOrDefault(x => x.Id == id);
            Feature feature = module?.Features.FirstOrDefault(x => x.Id == id);
            return feature == null ? null : new ApiFeature(feature);
        }

        // POST api/values
        [HttpPost]
        public ApiFeature Post(int moduleId, [FromBody]ApiFeature feature) {
            var module = Store.GetModules().FirstOrDefault(x => x.Id == moduleId);
            if (module == null) {
                return null;
            }

            var newFeature = new Feature(feature);

            module.Add(newFeature);

            return new ApiFeature(newFeature);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public ApiFeature Put(int moduleId, int id, [FromBody]ApiFeature feature) {
            Module module = Store.GetModules().FirstOrDefault(x => x.Id == id);
            if (module == null) {
                return null;
            }

            Feature updatedFeature = module.Update(id, feature);

            return new ApiFeature(updatedFeature);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id) {
        }
    }
}
