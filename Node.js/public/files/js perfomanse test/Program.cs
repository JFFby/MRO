using System;
using System.Diagnostics;

namespace perfomanceTest
{
    class Program
    {
        static void Main(string[] args)
        {
            var watch = new Stopwatch();
            watch.Start();
            var random = new Random();
            var array = new int[100000];
            for (int i = 0; i < array.Length; i++)
            {
                array[i] = random.Next(1000);
            }
            Array.Sort(array);
            watch.Stop();
            Console.WriteLine(watch.ElapsedMilliseconds);
            Console.ReadKey();
        }
    }
}

//result 8 ms
