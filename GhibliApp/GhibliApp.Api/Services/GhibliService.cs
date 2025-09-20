using System.Text.Json;
using GhibliApp.Api.Models;

namespace GhibliApp.Api.Services
{
    public class GhibliService
    {
        private const string apiUrl = "https://ghibliapi.vercel.app/films";
        private readonly HttpClient httpClient;

        public GhibliService(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }

        public async Task<List<GhibliFilm>> GetFilmsAsync()
        {
            var response = await httpClient.GetAsync(apiUrl);

            if (!response.IsSuccessStatusCode)
            {
                var errorBody = await response.Content.ReadAsStringAsync();
                throw new Exception($"Ghibli API returned {response.StatusCode}: {errorBody}");
            }

            var stream = await response.Content.ReadAsStreamAsync();
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var films = await JsonSerializer.DeserializeAsync<List<GhibliFilm>>(stream, options);

            return films ?? new();
        } 
    }
}