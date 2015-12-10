using System.Collections.Generic;
using System.Drawing;
using System.Linq;

namespace Domain.Lab_1
{
    public class CustomImage<T> : Img<T>
    {
        public CustomImage(Bitmap bitmap, T className)
            : base(bitmap, className)
        {
            Pixels = GetAllPixels();
        }

        public bool IsUsed { get; set; }

        public int PixelValue(int y, int x)
        {
            return Pixels.Single(p => p.X == x && p.Y == y).Value;
        }

        private List<Pixel> GetAllPixels()
        {
            var pixels = new List<Pixel>();
            for (int i = 0; i < Image.PhysicalDimension.Height; ++i)
            {
                for (int j = 0; j < Image.PhysicalDimension.Width; ++j)
                {
                    var pixel = new Pixel
                    {
                        X = j,
                        Y = i,
                        Value = RGBToNumber(Image.GetPixel(j, i))
                    };

                    pixels.Add(pixel);
                }
            }

            return pixels;
        }

        private int RGBToNumber(Color color)
        {
            var colorName = color.Name;
            switch (colorName)
            {
                case "ffffffff":
                    return 0;
                default:
                    return color.A == 0 ? 0 : 1;
            }
        }
    }
}
