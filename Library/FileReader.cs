using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;

namespace StockPredictor.Library
{
    public static class FileReader
    {
        public static List<string> GetFilesList(string path)
        {
            try
            {
                Regex predictRegex = new Regex("^(?!.*^).*$");
                // Only get files that begin with the letter "c".

                List<string> dirs = Directory.GetFiles(@path, "*").ToList();

                List<string> listPredicts = dirs.Aggregate(new List<string>(0), (list, item) =>
                {
                    var crrList = new List<string>(list);

                    if (predictRegex.IsMatch(item))
                    {
                        crrList.Add(item);
                        return crrList;
                    }

                    return new List<string>();
                });

                List<string> listHistories = dirs.Aggregate(new List<string>(0), (list, item) =>
                {
                    var crrList = new List<string>(list);

                    if (!predictRegex.IsMatch(item))
                    {
                        crrList.Add(item);
                        return crrList;
                    }

                    return new List<string>();
                });

                return listHistories;
            }
            catch (Exception e)
            {
                Console.WriteLine("The process failed: {0}", e.ToString());
                return null;
            }
        }
        public static string ReadTxtFile(string path)
        {
            try
            {
                WebClient client = new WebClient();
                Stream stream = client.OpenRead(path);

                // Open the text file using a stream reader.

                using (StreamReader sr = new StreamReader(stream))
                {
                    // Read the stream to a string, and write the string to the console.
                    string line = sr.ReadToEnd();
                    return line;
                }
            }
            catch (IOException e)
            {
                Console.WriteLine("The file could not be read:");
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public static string ReadTxtFileByFileName(string fileName, string path)
        {
            List<string> fileList = GetFilesList(path);

            string fileUrl = fileList.Find(url => url.Contains(fileName));

            return ReadTxtFile(fileUrl);
        }
    }
}