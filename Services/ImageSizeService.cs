using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using Domain.Resize;

namespace Services
{
    public sealed class ImageSizeService
    {
        private readonly string path;

        public ImageSizeService()
        {
            this.path = ConfigurationManager.AppSettings["path"];
        }

        public void AdjustImages(Func<string, string> pathMapper)
        {
            var localPath = pathMapper(path);
            var imgs = LoadImages(localPath);
            AdjustSize(imgs);
        }

        private IList<Img> LoadImages(string localPath)
        {
            var imgs = new List<Img>();
            var folders = Directory.GetDirectories(localPath);
            foreach (var folder in folders)
            {
                foreach (var file in Directory.GetFiles(folder, "*.png"))
                {
                    imgs.Add(new Img(file));
                }
            }

            return imgs;
        }

        private void AdjustSize(IList<Img> imgs)
        {
            var maxWidht = imgs.Max(x => x.Image.Width);
            var maxHeight = imgs.Max(x => x.Image.Height);
            foreach (var bitmap in imgs)
            {
                if (bitmap.Image.Width < maxHeight || bitmap.Image.Height < maxHeight)
                {
                    var dw = maxWidht - bitmap.Image.Width;
                    var dh = maxHeight - bitmap.Image.Height;
                    var wo = GetOffsets(dw);
                    var ho = GetOffsets(dh);
                    bitmap.Resize(maxWidht, maxHeight, wo, ho);
                }
            }
        }

        private int GetOffsets(int dw)
        {
            return dw % 2 == 1 ? (dw - 1) / 2 : dw / 2;
        }
    }
}
