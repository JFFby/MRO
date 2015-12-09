using System.Drawing;
using System.IO;

namespace Domain.Resize
{
    public sealed class Img
    {
        public Bitmap Image;
        private readonly string _path;

        public Img(string path)
        {
            _path = path;
            Image = System.Drawing.Image.FromFile(path) as Bitmap;
        }

        private void Save()
        {
            if (File.Exists(_path))
            {
                File.Delete(_path);
            }

            Image.Save(_path);
        }

        public void Resize(int width, int height, int wo, int ho)
        {
            var bitmap = new Bitmap(width, height);
            for (int y = 0; y < Image.Height; y++)
            {
                for (int x = 0; x < Image.Width; x++)
                {
                    bitmap.SetPixel(x + wo, y + ho, Image.GetPixel(x, y));
                }
            }

            Image.Dispose();
            Image = bitmap;
            Save();
        }
    }
}
