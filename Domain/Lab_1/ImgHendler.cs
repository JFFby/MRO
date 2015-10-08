using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text.RegularExpressions;

namespace Domain.Lab_1
{
    public class ImgHendler<T>
    {
        protected readonly Dictionary<T, List<Img<T>>> images;

        public ImgHendler(string folderName, Expression<Func<Bitmap, T, Img<T>>> expression)
        {
            images = new Dictionary<T, List<Img<T>>>();
            var imgFolders = Directory.GetDirectories(folderName);
            var keys = Enum.GetValues(typeof(T)).Cast<T>().ToList();
            const string pattern = @".*\\({0})";

            foreach (var folder in imgFolders)
            {
                if (keys.Any(x => new Regex(string.Format(pattern, x.ToString())).IsMatch(folder)))
                {
                    var f = Regex.Replace(folder, string.Format(pattern, @"\w+"), "$1");
                    var key = keys.Single(x => x.ToString() == f);
                    images.Add(key, new List<Img<T>>());

                    foreach (var imgName in Directory.GetFiles(folder,"*.png"))
                    {
                        images[key].Add(expression.Compile()(Image.FromFile(imgName) as Bitmap, key));
                    }
                }
            }
        }

        public int ImageCounter { get { return images.SelectMany(x => x.Value).Count(); } }
    }
}
