using System;
using System.Configuration;
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
            get { return (LearningAlgoritm)Enum.Parse(typeof(LearningAlgoritm), ConfigurationManager.AppSettings["learningAlgoritm"]); }
        }

        public static int LoopNumber { get { return Int32.Parse(ConfigurationManager.AppSettings["learningLoop"]); } }

        public static int LoopNumberMinValue { get { return Int32.Parse(ConfigurationManager.AppSettings["learningLoopMinValue"]); } }
    }
}
