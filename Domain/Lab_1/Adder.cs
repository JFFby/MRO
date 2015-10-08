using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Domain.Lab_1
{
    [JsonObject(MemberSerialization.OptIn)]
    public class Adder
    {
        [JsonProperty]
        public List<AElement> AElements;

        public double Value
        {
            get { return AElements.Sum(x => x.LValue); }
        }

    }
}
