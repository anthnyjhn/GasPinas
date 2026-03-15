using System;
using System.Data;
using System.Runtime.CompilerServices;
using server.DTO;

namespace server.Routes;

public static class StationsRoute
{
    private static List<StationDto> nearbyStations = [];

    public static void StationsRoutes(this WebApplication app)
    {
        // route to control multiple stations
        var group = app.MapGroup("stations");

        //return nearest stations
        group.MapGet("/", (decimal lat, decimal lng, int radius, string fuelType) =>
        {
            // query db, sort by nearest, get price
            return Results.Ok(nearbyStations);
        });
    }
}
