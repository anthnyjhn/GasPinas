using server.Routes;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddValidation();

var app = builder.Build();

const int PORT = 3000;

app.StationsRoutes(); // route for multiple stations

app.StationRoutes(); // route for single stations

app.Run($"http://localhost:{PORT}");
