using System;

namespace server.Routes;

public static class Station
{
    public static void StationRoutes(this WebApplication app)
    {
        // route to control a single station
        var group = app.MapGroup("station");

        group.MapGet("/{stationId}", (int stationId) =>
       {
           return Results.Ok(null);
       });
    }
}
