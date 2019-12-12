namespace StockPredictor.Library
{
    public static class FileHandler
    {
        public static string GetFileName(string path)
        {
            //path: <dir>/<filename>.<extension>

            // On Mac
            path.Replace("\\", "/");

            int lastIndexOfSlash = path.LastIndexOf("/");
            int dotIndex = path.LastIndexOf('.');
            string result;

            if (dotIndex < 0)
            {
                result = path.Substring(lastIndexOfSlash + 1, path.Length - lastIndexOfSlash - 1);
            }
            else
            {
                result = path.Substring(lastIndexOfSlash + 1, dotIndex - lastIndexOfSlash - 1);
            }

            return result;
        }
    }
}