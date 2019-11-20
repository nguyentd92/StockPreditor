namespace StockPredictor.Library
{
    public static class FileHandler
    {
        public static string GetFileName(string path)
        {
            //path: <dir>/<filename>.<extension>
            int lastIndexOfSlash = path.LastIndexOf('/');
            int dotIndex = path.LastIndexOf('.');

            string result = path.Substring(lastIndexOfSlash + 1, dotIndex - lastIndexOfSlash - 1);
            return result;
        }
    }
}