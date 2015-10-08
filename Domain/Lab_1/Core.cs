using System.Collections.Generic;
using Newtonsoft.Json;

namespace Domain.Lab_1
{
    [JsonArray]
    public class Core
    {
        [JsonProperty]
        public IList<RElement> rElements;
    }
}
