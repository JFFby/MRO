using System.Collections.Generic;
using System.Drawing;

namespace Domain.Lab_1
{
    public class Img<T>
    {

        public Img(Bitmap image, T className)
        {
            Image = image;
            Class = className;
        }

        public Bitmap Image { get; private set; }

        public List<Pixel> Pixels { get; protected set; }

        public T Class { get; private set; }
    }
}
