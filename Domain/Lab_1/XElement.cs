using System;
using Newtonsoft.Json;

namespace Domain.Lab_1
{
    [JsonObject(MemberSerialization.OptIn)]
    public class XElement : Element
    {
        private static int _xId;

        public XElement(int sign)
        {
            if (sign != -1 && sign != 1)
            {
                throw new ArgumentOutOfRangeException("sign");
            }

            Sign = sign;
            id = _xId++;
        }

        public bool IsExcited
        {
            get
            {
                if (Value == 1)
                {
                    return true;
                }

                if (Value == 0)
                {
                    return false;
                }

                throw new ArgumentOutOfRangeException("IsExcited");
            }
        }
        [JsonProperty]
        public int Sign { get; private set; }

        public int SignValue
        {
            get { return Sign * Value; }
        }
    }
}
