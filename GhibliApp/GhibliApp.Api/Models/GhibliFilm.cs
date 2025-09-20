using System.Text.Json.Serialization;

namespace GhibliApp.Api.Models
{
    public class GhibliFilm
    {
        public string Id { get; set; } = null!;
        public string Title { get; set; } = null!;

        [JsonPropertyName("original_title")]
        public string OriginalTitle { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Director { get; set; } = null!;
        public string Producer { get; set; } = null!;

        [JsonPropertyName("release_date")]
        public string ReleaseDate { get; set; } = null!;

        [JsonPropertyName("running_time")]
        public string RunningTime { get; set; } = null!;

        [JsonPropertyName("rt_score")]
        public string RtScore { get; set; } = null!;

        [JsonPropertyName("image")]
        public string? Image { get; set; }
        [JsonPropertyName("original_title_romanised")]
        public string OriginalTitleRomanised { get; set; } = null!;

        [JsonPropertyName("movie_banner")]
        public string MovieBanner { get; set; } = null!;
 
        [JsonPropertyName("url")]
        public string Url { get; set; } = null!;
    }
}