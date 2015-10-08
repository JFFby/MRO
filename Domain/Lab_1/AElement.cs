using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Domain.Lab_1
{
    [JsonObject(MemberSerialization.OptIn)]
    public class AElement : Element
    {
        private static int _aId = 0;
        private static double delta = 1.5;
        [JsonProperty]
        private double _l;

        public AElement(double l)
        {
            _l = l;
            XElements = new List<XElement>();
            id = _aId++;
        }

        [JsonProperty]
        public List<XElement> XElements { get; set; }

        public override int Value
        {
            get { return XElements.Sum(x => x.SignValue) - T >= 0 ? 1 : 0; }
        }

        public double LValue
        {
            get { return _l * Value; }
        }

        public bool IsEmpty
        {
            get { return XElements.Any() == false; }
        }

        public double L { get { return _l; } }

        public void AdjustL(int sign)
        {
            _l += sign*delta;
        }

        public bool IsExcited { get { return XElements.Any(x => x.IsExcited); } }

        private const int T = 1;
    }
}
