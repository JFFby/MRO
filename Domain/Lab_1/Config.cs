using System;
using System.Configuration;

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
    }
}
