namespace StockPredictor.Library
{
    public static class FileHandler
    {
        public static string GetFileName(string path)
        {
            //path: <dir>/<filename>.<extension>

            // On Mac
            const bool IsMac = false;
            const string Char = IsMac ? @"/" : @"\";
            int lastIndexOfSlash = path.LastIndexOf(Char);
            int dotIndex = path.LastIndexOf('.');

            string result = path.Substring(lastIndexOfSlash + 1, dotIndex - lastIndexOfSlash - 1);
            return result;
        }
    }
}