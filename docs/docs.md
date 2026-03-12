# Gas Pinas

Compare gas station prices, check nearby stations on a map, and see the latest fuel prices.

## Functional requirements

**v1.0 mvp**

- [Control Panel] User can click locate button
- [Control Panel] User can adjust radius
- [Control Panel] User can select fuel type
- [Control Panel] User can select list mode
- [Map view] User can see near gas stations within -km radius limit and their price.
- [Map > Popup] User can see Brand, fuel type, price, timestamp, Navigate button, Submit prices button, Address (Nominatim?:"https://nominatim.openstreetmap.org/reverse?lat=-33.8688&lon=151.2093&format=json")

## Data

tables and diagram

## API Design

```bash
GET /stations?lat=&lng=&radius=&fuelType= # get stations within the range (res: long,lat,price,fuelType)
GET /station/:id # get station's details (res: brand, fuelType, price, timestamp, address)

POST /submitPrice # send latest price (req: email, fuel type, price)
```
