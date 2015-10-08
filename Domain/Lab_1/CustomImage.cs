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

        public int PixelValue(int x, int y)
        {
            return Pixels.Single(p => p.X == x && p.Y == y).Value;
        }

        private List<Pixel> GetAllPixels()
        {
            var pixels = new List<Pixel>();
            for (int i = 0; i < Image.PhysicalDimension.Width; ++i)
            {
                for (int j = 0; j < Image.PhysicalDimension.Height; ++j)
                {
                    var pixel = new Pixel
                    {
                        X = i,
                        Y = j,
                        Value = RGBToNumber(Image.GetPixel(j, i).Name)
                    };

                    pixels.Add(pixel);
                }
            }

            return pixels;
        }

        private int RGBToNumber(string colorName)
        {
            switch (colorName)
            {
                case "ffffffff":
                    return 0;
                default:
                    return 1;
            }
        }
    }
}
