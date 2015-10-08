using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Linq.Expressions;
using Domain.Lab_1.Enums;

namespace Domain.Lab_1
{
    public class CustomImageHendler : ImgHendler<ClassType>
    {
        private Random random;
        private int _usedCountr;

        public CustomImageHendler(string folderName, Expression<Func<Bitmap, ClassType, Img<ClassType>>> expression)
            : base(folderName, expression)
        {
            random = new Random((int)DateTime.Now.Ticks);
            _usedCountr = 0;
        }
        
        protected List<ClassType> Keys
        {
            get
            {
                return images.Keys.Where(x => images[x].Cast<CustomImage<ClassType>>().Any( i => !i.IsUsed)).ToList();
            }
        }

        public List<CustomImage<ClassType>> GetRandomList()
        {
            var list = new List<CustomImage<ClassType>>();
            for (int i = 0; i < ImageCounter; i++)
            {
                list.Add(RandomImage());
            }

            return list;
        } 

        public CustomImage<ClassType> RandomImage(ClassType key)
        {
            var maxCount = GetActiveCount(key);
            return GetActiveImg(key, maxCount);
        }

        public CustomImage<ClassType> RandomImage()
        {
            var randomKey = Keys[random.Next(Keys.Count)];
            var maxCount = GetActiveCount(randomKey);
            return GetActiveImg(randomKey, maxCount);
        }

        public string UsedImages { get { return _usedCountr.ToString(); } }

        public List<CustomImage<ClassType>> GetImagesByClass(ClassType key)
        {
            return images[key].Cast<CustomImage<ClassType>>().ToList();
        }

        private CustomImage<ClassType> GetActiveImg(ClassType key, int num)
        {
            var img = images[key].Cast<CustomImage<ClassType>>().Where(x => !x.IsUsed).ElementAt(random.Next(num));
            img.IsUsed = true;
            ++_usedCountr;
            return img;
        }

        private int GetActiveCount(ClassType key)
        {
            var count = images[key].Cast<CustomImage<ClassType>>().Count(x => !x.IsUsed);
            if (count < 1)
            {
                throw new Exception("Count");
            }

            return count;
        }
    }
}
