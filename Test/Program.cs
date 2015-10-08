using System;
using System.Collections.Generic;
using Domain.Lab_1;

namespace Test
{
    class Program
    {
        static void Main(string[] args)
        {
            var xElements = new XElement(1) {Value = 1};
            var xElements1 = new XElement(-1) {Value = 0};
            var x1 = new  List<XElement>{xElements, xElements1};

            var a1 = new List<AElement>();
            a1.Add(new AElement(1));
            a1[0].XElements.Add(x1[1]);

            x1[1].Value = 1;

            Console.ReadKey();
        }
    }
}
