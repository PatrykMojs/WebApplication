using GhibliApp.Api.Services;
using GhibliApp.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace GhibliApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GhibliController : ControllerBase
    {
        public readonly GhibliService service;

        public GhibliController(GhibliService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<GhibliFilm>>> Get()
        {
            var films = await service.GetFilmsAsync();
            return Ok(films);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GhibliFilm>> GetById(string id)
        {
            var films = await service.GetFilmsAsync();
            var film = films.FirstOrDefault(f => f.Id == id);

            if (film == null)
                return NotFound();

            return Ok(film);
        }
    }
}
