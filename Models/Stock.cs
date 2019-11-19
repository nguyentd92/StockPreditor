namespace StockPredictor.Models
{
    public class Stock
    {
        public string Id { get; set; }
        public string Date { get; set; }
        public float Open { get; set; }
        public float High { get; set; }
        public float Low { get; set; }
        public float Close { get; set; }
        public float Value { get; set; }
    }
}