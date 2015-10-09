using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
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
                SerializePerceptron(Config.SerializationPath);
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

        public ClassType DefineImage(Img<ClassType> img)
        {
            AcceptIMage(img);
            var resul = GetBinaruCode();
            var imgClass = DefineClass(resul);
            xElements.ForEach(x => x.Value = 0);
            return imgClass;
        }

        private ClassType DefineClass(int[] result)
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
                    return key;
                }
            }

            return ClassType.Undefined;
        }

        private int[] GetBinaruCode()
        {
            var result = new int[_core.rElements.Count];
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

        private void AdjustL(int rIndex, int sign)
        {
            var els = _core.rElements[rIndex].Adder.AElements
                .Where(x => x.IsExcited)
                .ToList();

            els.ForEach(x => x.AdjustL(sign));
        }

        public IEnumerable<XTAModel> XtaList(int i)
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

        public string Learninig(IEnumerable<CustomImage<ClassType>> images)
        {
            LReset();
            foreach (var image in images)
            {
                ExamineImage(image);
            }

            xElements.ForEach(x => x.Value = 0);
            SerializePerceptron(Config.SerializationPath);
            return ResultEvaluation(images.GroupBy(x => x.Class).ToDictionary(x => x.Key, y => y.ToList()));
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
                ranged = i * x + x;
            }

            if (ranged < ACount)
            {
                _core.rElements.Last().Adder.AElements.AddRange(_aElements.GetRange(ranged, ACount - ranged));
            }
        }

        private void SerializePerceptron(string path)
        {
            var jsonPerceptron = JsonConvert.SerializeObject(_core.rElements);

            File.WriteAllText(path, jsonPerceptron);
        }

        public void ClearMemory()
        {
            File.WriteAllText(Config.SerializationPath, string.Empty);
        }

        public string ResultEvaluation(IDictionary<ClassType, List<CustomImage<ClassType>>> imgDictionary)
        {
            var result = new StringBuilder();
            var total = 0;
            foreach (var key in imgDictionary.Keys)
            {
                int guessedImages = 0;
                foreach (var customImage in imgDictionary[key])
                {
                    guessedImages += DefineImage(customImage) == key ? 1 : 0;
                }

                total += guessedImages;
                result.Append(string.Format("\n{0}: {1}", key,
                    ((double)guessedImages * 100 / imgDictionary[key].Count).ToString("F")));
            }

            result.Append(string.Format("\nВсего: {0}",
                ((double)total * 100 / imgDictionary.SelectMany(x => x.Value).Count()).ToString("F")));

            return result.ToString();
        }

        private void LReset()
        {
            var rand = new Random((int)(DateTime.Now.Ticks % (int.MaxValue - 1)));
            aElements.ForEach(x => x.L = rand.Next() % 2 == 0 ? 1 : -1);
            xElements.ForEach(x => x.Value = 0);
        }

        public string LearningLoop(Func<IList<CustomImage<ClassType>>> imgSupplier, IProgress<string> strProgress, IProgress<int> intProgress)
        {
            var resultStoreg = new List<int> { Config.LoopNumberMinValue };
            for (int i = 0; i < Config.LoopNumber; i++)
            {
                var result = ProcessResult(Learninig(imgSupplier()));
                if (result > resultStoreg.Max())
                {
                    resultStoreg.Add(result);
                    SerializePerceptron(Regex.Replace(Config.SerializationPath, @"(\w+)(\.json)",
                  m => m.Groups[1].Value + string.Format("({0})", result) + m.Groups[2].Value));
                }

                strProgress.Report(string.Format("{0}/{1} ({2})", i + 1, Config.LoopNumber, resultStoreg.Max()));
                intProgress.Report((i + 1) * 100 / Config.LoopNumber);
            }

            return string.Format("(Max: {0})", resultStoreg.Max());
        }

        private int ProcessResult(string result)
        {
            const string pattern = @"Всего: (\d+)";
            return Int32.Parse(Regex.Match(result, pattern).Groups[1].Value);
        }
    }
}