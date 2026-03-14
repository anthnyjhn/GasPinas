using System;
using System.Data;
using System.Runtime.CompilerServices;
using server.DTO;

namespace server.Routes;

public static class StationsRoute
{
    private static List<StationDto> nearbyStations = [];

    public static void StationRoute(this WebApplication app)
    {
        var group = app.MapGroup("stations");

        //return nearest
        group.MapGet("/", (decimal lat, decimal lng, int radius, FuelType fuelType) =>
        {
            return Results.Ok(nearbyStations);
        });

        // return station details
        group.MapGet("/{stationId}", (int stationId) =>
       {

       });
    }
}
