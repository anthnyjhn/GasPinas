using System;

namespace server.Model;

public class station_fuel
{
    public int station_id { get; set; }
    public int fuel_type_id { get; set; }
    public decimal fuel_price { get; set; }
}
