using System;
using System.Data;
using Microsoft.EntityFrameworkCore;
using server.Model;

namespace basics.Data;

public class NotesContext : DbContext
{
    // Properties that represent the mapping between object and database tables
    // Any queries sent to these props are going to be translated into queries to the database. 

    public DbSet<osm_stations> OSM_tations => Set<osm_stations>();
    public DbSet<station_fuel> Station_fuel => Set<station_fuel>();
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=mydb;Username=admin;Password=admin123");
    }
}
