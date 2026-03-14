using server.Routes;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddValidation();

var app = builder.Build();

const int PORT = 3000;

app.StationRoute();

app.Run($"http://localhost:{PORT}");
