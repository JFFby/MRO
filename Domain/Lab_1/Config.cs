using System;
using System.Configuration;
using System.Dynamic;
using Domain.Lab_1.Enums;

namespace Domain.Lab_1
{
    public static class Config
    {
        public static string SerializationPath
        {
            get { return ConfigurationManager.AppSettings["json"]; }
        }

        public static string ImgFolder
        {
            get { return ConfigurationManager.AppSettings["imgFolder"]; }
        }

        public static int CountOfRElements
        {
            get { return Int32.Parse(ConfigurationManager.AppSettings["rCount"]); }
        }

        public static LearningAlgoritm LearningAlgoritm
        {
            get
            {
                return (LearningAlgoritm)Enum
                    .Parse(typeof(LearningAlgoritm), ConfigurationManager.AppSettings["learningAlgoritm"]);
            }
        }

        public static int LoopNumberRebuilding
        {
            get { return Int32.Parse(ConfigurationManager.AppSettings["learningLoopRebuilding"]); }
        }

        public static int LearningLoopLearning
        {
            get { return Int32.Parse(ConfigurationManager.AppSettings["learningLoopLearning"]); }
        }

        public static int LoopNumberMinValue
        {
            get { return Int32.Parse(ConfigurationManager.AppSettings["learningLoopMinValue"]); }
        }

        public static int XCount
        {
            get
            {
                var width = Int32.Parse(ConfigurationManager.AppSettings["width"]);
                var height = Int32.Parse(ConfigurationManager.AppSettings["height"]);
                return width * height;
            }
        }

        public static int ACount
        {
            get
            {
                var k = float.Parse(ConfigurationManager.AppSettings["ak"]);
                return (int)Math.Round(Config.XCount / k);
            }
        }

        public static int Width
        {
            get { return Int32.Parse(ConfigurationManager.AppSettings["width"]); }
        }

        public static int Height 
        {
            get { return Int32.Parse(ConfigurationManager.AppSettings["height"]); }
        }
    }
}
