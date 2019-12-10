using System;
using System.Diagnostics;

namespace StockPredictor.Library
{
    public static class ExecuteTerminal
    {
        public static bool Bash(this string cmd)
        {
            try
            {
                const string TERMINAL_PATH = @"C:\Program Files\Git\git-bash.exe";
                var escapedArgs = cmd.Replace("\"", "\\\"");

                Process.Start(TERMINAL_PATH, $"-c \"{escapedArgs}\"");

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }
    }
}