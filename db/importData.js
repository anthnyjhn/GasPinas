const { Pool } = require('pg');

const pool = new Pool({
    user: "admin",
    host: "localhost",
    database: "local",
    password: "admin123",
    port: 5432,
});

const OVERPASS_QUERY = `
            [out:json][timeout:25];
area["name"="Philippines"]->.searchArea;
(
  node["amenity"="fuel"](area.searchArea);
);
out body;
>;
out skel qt;
            `;

const OVERPASS_URL = `https://maps.mail.ru/osm/tools/overpass/api/interpreter?data=${encodeURIComponent(OVERPASS_QUERY)}`;

async function importStations() {
    try {
        console.log("Fetching stations from Overpass API...");

        const response = await fetch(OVERPASS_URL);

        if (!response.ok) {
            throw new Error(`Overpass API responded with ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        const elements = result.elements || [];

        console.log(`Stations fetched: ${elements.length}`);

        let hasBrand = 0;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].tags?.brand) {
                hasBrand++;
            }
        }

        console.log('Branded Stations: ' + hasBrand)

        const uniqueBrands = [...new Set(elements
            .filter(s => s.tags?.brand)
            .map(s => s.tags.brand)
        )];
        console.log("Brand list");
        console.log(uniqueBrands);

        const stations = elements
            .map((s) => ({
                id: s.id,
                brand: s.tags?.brand || s.tags?.operator || "Unknown",
                lat: s.lat ?? s.center?.lat,
                lng: s.lon ?? s.center?.lon,
            }))
            .filter((s) => s.lat != null && s.lng != null);

        console.log(`Valid ${stations.length} locations`);

        let inserted = 0;

        for (let i = 0; i < stations.length; i++) {
            let s = stations[i];
            await pool.query(
                `INSERT INTO osm_stations (id, brand, lat, lng)
                     VALUES ($1, $2, $3, $4)
                     ON CONFLICT (id) DO NOTHING`,
                [s.id, s.brand, s.lat, s.lng]
            );
            inserted++;
        }

        console.log("Stations processed:", inserted);

        await pool.end();
    } catch (err) {
        console.error("Import failed:", err.message);
    } finally {
        console.log("Database connection closed.");
    }
}

importStations();