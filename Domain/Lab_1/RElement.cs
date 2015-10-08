using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Domain.Lab_1
{
    [JsonObject(MemberSerialization.OptIn)]
    public class RElement : Element
    {
        private static int _rId = 0;

        [JsonProperty]
        public Adder Adder;

        public RElement()
        {
            Adder = new Adder();
            id = _rId++;
        }

        public List<XElement> XElements
        {
            get { return Adder.AElements.SelectMany(x => x.XElements).OrderBy(x => x.Id).ToList(); }
        }

        public override int Value
        {
            get
            {
                return Adder.Value >= 0 ? 1 : 0;
            }
        }
    }
}
