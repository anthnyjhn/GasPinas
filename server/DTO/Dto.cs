namespace server.DTO;

public enum FuelType
{
    Unleaded91,
    Unleaded95,
    Diesel
}

public record class StationDto(
    int Id,
    decimal Lat,
    decimal Lng,
    double Price,
    FuelType FuelType
);
