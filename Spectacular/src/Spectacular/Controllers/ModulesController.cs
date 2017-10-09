using System.Collections.Generic;
using System.Linq;

using Microsoft.AspNetCore.Mvc;

using Spectacular.Models;

namespace Spectacular.Controllers {
    [Route("api/[controller]")]
    public class ModulesController : Controller {
        // GET api/values
        [HttpGet]
        public IEnumerable<ApiModule> Get() {
            foreach (Module module in Store.GetModules()) {
                yield return new ApiModule { Id = module.Id, Name = module.Name, Description = module.Description };
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ApiModule Get(int id) {
            var module = Store.GetModules().First(x => x.Id == id);
            return new ApiModule { Id = module.Id, Name = module.Name, Description = module.Description };
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]ApiModule module) {
            Store.Add(new Module { Name = module.Name, Description = module.Description });
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]ApiModule module) {
            Store.Add(new Module { Id = id, Name = module.Name, Description = module.Description });
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id) {
        }
    }
}
