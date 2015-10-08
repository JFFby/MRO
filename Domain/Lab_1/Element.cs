using Newtonsoft.Json;

namespace Domain.Lab_1
{
    [JsonObject(MemberSerialization.OptIn)]
    public abstract class Element
    {
        [JsonProperty]
        protected int id;

        public int Id { get { return id; } }

        public virtual int Value { get; set; }
    }
}
