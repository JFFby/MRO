using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Domain.Lab_1.Enums;
using Newtonsoft.Json;

namespace Domain.Lab_1
{
    public class Perceptron
    {
        private readonly Core _core;
        public static int XCount;
        private readonly int ACount;
        public static int RCount;
        private readonly Dictionary<ClassType, int[]> classDictionary;

        public Perceptron(int rCount, int aCount, int xCount)
        {
            RCount = rCount;
            ACount = aCount;
            XCount = xCount;

            classDictionary = new Dictionary<ClassType, int[]>()
            {
                {ClassType.Zero, new[] {0, 0, 0, 0}},
                {ClassType.One, new[] {0, 0, 0, 1}},
                {ClassType.Two, new[] {0, 0, 1, 0}},
                {ClassType.Three, new[] {0, 0, 1, 1}},
                {ClassType.Four, new[] {0, 1, 0, 0}},
                {ClassType.Five, new[] {0, 1, 0, 1}},
                {ClassType.Six, new[] {0, 1, 1, 0}},
                {ClassType.Seven, new[] {0, 1, 1, 1}},
                {ClassType.Eight, new[] {1, 0, 0, 0}},
                {ClassType.Nine, new[] {1, 0, 0, 1}}
            };

            _core = new Core();

            if (!ReadFromJson())
            {
                InitElements();
                SerializePerceptron();
            }
        }

        private List<XElement> xElements
        {
            get
            {
                return _core.rElements.Select(x => x.Adder)
                        .SelectMany(x => x.AElements)
                        .SelectMany(x => x.XElements)
                        .OrderBy(x => x.Id)
                        .ToList();
            }
        }

        public List<AElement> aElements
        {
            get
            {
                return _core.rElements.Select(x => x.Adder)
                    .SelectMany(x => x.AElements)
                    .OrderBy(x => x.Id)
                    .ToList();
            }
        }

        public string DefineImage(Img<ClassType> img)
        {
            AcceptIMage(img);
            var resul = GetBinaruCode();
            var imgClass = DefineClass(resul);
            xElements.ForEach(x => x.Value = 0);
            return imgClass;
        }

        private string DefineClass(int[] result)
        {
            foreach (var key in classDictionary.Keys)
            {
                var isEdintic = 0;
                var array = classDictionary[key];
                for (int i = 0; i < array.Length; i++)
                {
                    if (array[i] == result[i])
                    {
                        isEdintic++;
                    }
                }

                if (isEdintic == result.Count())
                {
                    return key.ToString();
                }
            }

            return "undefined";
        }

        private int[] GetBinaruCode()
        {
            int[] result = new int[_core.rElements.Count];
            for (int i = 0; i < _core.rElements.Count; i++)
            {
                var rValue = _core.rElements[i].Value;
                result[i] = rValue;
            }

            return result;
        }

        private void AcceptIMage(Img<ClassType> img)
        {
            for (int i = 0; i < img.Pixels.Count; i++)
            {
                xElements[i].Value = img.Pixels[i].Value;
            }

            var rs = xElements.Where(x => x.IsExcited).ToList();
        }

        public void AdjustL(int rIndex, int sign)
        {
            var els = _core.rElements[rIndex].Adder.AElements
                .Where(x => x.IsExcited)
                .ToList();

            els.ForEach(x => x.AdjustL(sign));
        }

        public List<XTAModel> XtaList(int i)
        {
            var relement = _core.rElements[i];
            var xtaModel = new List<XTAModel>();

            for (int j = 0; j < relement.XElements.Count; j++)
            {
                var xEl = relement.XElements[j];
                var aEl = _core.rElements[i].Adder.AElements.First(x => x.XElements.Contains(xEl));
                xtaModel.Add(new XTAModel
                {
                    Value = xEl.Sign,
                    AElementId = aEl.Id,
                    XElementId = xEl.Id,
                    Number = j
                });
            }

            return xtaModel;
        }

        public void Learninig(List<CustomImage<ClassType>> images)
        {
            foreach (var image in images)
            {
                ExamineImage(image);
            }

            xElements.ForEach(x => x.Value = 0);
            SerializePerceptron();
        }

        private void ExamineImage(CustomImage<ClassType> image)
        {
            AcceptIMage(image);
            GetDeltaSign(image.Class);
        }

        private void GetDeltaSign(ClassType classType)
        {
            var stadartArray = classDictionary[classType];
            for (int i = 0; i < _core.rElements.Count; i++)
            {
                var rValue = _core.rElements[i].Value;

                if (rValue != stadartArray[i])
                {
                    var deltaSign = stadartArray[i] == 0 ? -1 : 1;
                    AdjustL(i, deltaSign);
                }
            }
        }

        private bool ReadFromJson()
        {
            string perceptronJs = String.Empty;

            try
            {
                if (!File.Exists(Config.SerializationPath))
                {
                    var file = File.Create(Config.SerializationPath);
                    file.Close();
                }

                perceptronJs = File.ReadAllText(Config.SerializationPath);
            }
            catch (Exception)
            {
                return false;
            }

            if (string.IsNullOrEmpty(perceptronJs))
            {
                return false;
            }

            var elements = JsonConvert.DeserializeObject<List<RElement>>(perceptronJs);

            if (elements != null && elements.Any())
            {
                _core.rElements = elements;

                return true;
            }


            File.WriteAllText(Config.SerializationPath, string.Empty);
            return false;
        }

        private void InitElements()
        {
            var rand = new Random((int)(DateTime.Now.Ticks % (int.MaxValue - 1)));

            _core.rElements = new List<RElement>();
            var _xElements = new List<XElement>();
            var _aElements = new List<AElement>();

            for (int i = 0; i < XCount; i++)
            {
                int j = 0;
                do
                {
                    j = rand.Next() % 2 == 1 ? 1 : -1;
                } while (j == 0);

                _xElements.Add(new XElement(j));

                if (i < ACount)
                    _aElements.Add(new AElement((j)));

                if (i < RCount)
                    _core.rElements.Add(new RElement());
            }

            foreach (var xElement in _xElements)
            {
                int i;
                var emptyElement = _aElements.Where(a => a.IsEmpty).ToList();
                if (emptyElement.Any())
                {
                    i = rand.Next(emptyElement.Count());
                    emptyElement[i].XElements.Add(xElement);
                    continue;
                }

                i = rand.Next(ACount);
                _aElements[i].XElements.Add(xElement);
            }

            if (_aElements.Any(a => a.XElements.Count < 1))
            {
                throw new ArgumentOutOfRangeException("aElements");
            }

            var x = (int)_aElements.Count / RCount;
            var ranged = 0;
            for (int i = 0; i < RCount; i++)
            {
                _core.rElements[i].Adder.AElements = _aElements.GetRange(i * x, x);
                ranged = i*x + x;
            }

            if (ranged < ACount)
            {
                _core.rElements.Last().Adder.AElements.AddRange(_aElements.GetRange(ranged, ACount - ranged));
            }
        }

        private void SerializePerceptron()
        {
            var jsonPerceptron = JsonConvert.SerializeObject(_core.rElements);

            File.WriteAllText(Config.SerializationPath, jsonPerceptron);
        }

        public void ClearMemory()
        {
            File.WriteAllText(Config.SerializationPath, string.Empty);
        }
    }
}
