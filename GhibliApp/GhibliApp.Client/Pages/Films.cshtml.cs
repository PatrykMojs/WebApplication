using Microsoft.AspNetCore.Mvc.RazorPages;
using GhibliApp.Client.Models;
using System.Text.Json;

namespace GhibliApp.Client.Pages
{
    public class FilmsModel : PageModel
    {
        private readonly HttpClient httpClient;
        private readonly ILogger<FilmsModel> logger;
        public List<GhibliFilm> Films { get; set; } = new();

        public FilmsModel(IHttpClientFactory httpClientFactory, ILogger<FilmsModel> logger)
        {
            this.httpClient = httpClientFactory.CreateClient();
            this.logger = logger;
        }

        public async Task OnGetAsync()
        {
            try
            {
                var response = await httpClient.GetAsync("http://localhost:5288/api/ghibli");

                if (response.IsSuccessStatusCode)
                {
                    var stream = await response.Content.ReadAsStreamAsync();
                    var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                    var films = await JsonSerializer.DeserializeAsync<List<GhibliFilm>>(stream, options);
                    Films = films ?? new();
                }
                else
                {
                    logger.LogError($"The API returned an error: {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error while retrieving data from API");
            }
        }
    }
}