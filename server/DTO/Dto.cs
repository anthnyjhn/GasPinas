namespace server.DTO;

public record class StationDto(
    int Id,
    decimal Lat,
    decimal Lng,
    double Price,
    string FuelType
);
