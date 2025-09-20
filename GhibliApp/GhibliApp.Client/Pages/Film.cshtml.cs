using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using GhibliApp.Client.Models;
using System.Text.Json;

namespace GhibliApp.Client.Pages
{
    public class FilmModel : PageModel
    {
        private readonly HttpClient httpClient;

        public FilmModel(IHttpClientFactory httpClientFactory)
        {
            httpClient = httpClientFactory.CreateClient();
        }

        [BindProperty(SupportsGet = true)]
        public string Id { get; set; } = null!;
        public GhibliFilm? Film { get; set; }

        public async Task<IActionResult> OnGetAsync()
        {
            if (string.IsNullOrEmpty(Id))
                return NotFound();

            var response = await httpClient.GetAsync($"http://localhost:5288/api/ghibli/{Id}");

            if (!response.IsSuccessStatusCode)
                return NotFound();

            var json = await response.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            Film = JsonSerializer.Deserialize<GhibliFilm>(json, options);

            return Page();
        }
    }
}