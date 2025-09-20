
# Ghibli Explorer — ASP.NET Core (Razor Pages + Web API) 🚀

An elegant, dark-themed app for exploring Studio Ghibli films.
Frontend: Razor Pages (Bootstrap 5, custom dark theme).
Backend: ASP.NET Core Web API (a proxy to the public Studio Ghibli API).



## ✨ Features

- Landing page with a hero section (dark, “cinematic” vibe).
- Film list with cards (poster, year, director, short description, RT Score, runtime).
- Film details at /Film/{id} with a large banner (hero), poster, description, “quick facts,” and a progress bar for RT Score.
- Poster gallery with hover effect and navigation to details.
- Responsive layout, sticky footer, active links in the navbar.
- Backend endpoints:
    - GET /api/ghibli — all films
    - GET /api/ghibli/{id} — single film


## 🧱 Architecture

```bash
GhibliApp.sln
├─ GhibliApp.Api          // ASP.NET Core Web API (proxy to ghibliapi)
└─ GhibliApp.Client       // ASP.NET Core Razor Pages (frontend)
```

### Backend (GhibliApp.Api)

- Services/GhibliService.cs — fetches from https://ghibliapi.vercel.app/films
- Controllers/GhibliController.cs — exposes /api/ghibli and /api/ghibli/{id}
- CORS enabled for the frontend.

### Frontend (GhibliApp.Client)

- Pages: Index.cshtml, Films.cshtml, Film.cshtml, Gallery.cshtml
- Theme: wwwroot/css/site.css (dark, purple + black)
- Navbar with links: Films, Gallery, with active highlighting.
- Tag Helpers enabled in _ViewImports.cshtml.

## 📦 Technologies

- .NET 8 
- ASP.NET Core Razor Pages, Web API
- Bootstrap 5 (CDN)
- System.Text.Json
- HttpClientFactory

## 🔌 Source API

```bash
https://ghibliapi.vercel.app/films
```
The custom backend acts as a simple proxy that standardizes responses and makes future enhancements easier (caching, business logic, rate limiting).
## 📬 Contact

Created by Patryk Meus

Website: https://patrykmojs.github.io/Portfolio/

GitHub: https://github.com/PatrykMojs

Email: patrykmeus@gmail.com
