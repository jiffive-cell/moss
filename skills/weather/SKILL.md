---
name: weather
description: Get current weather and forecasts via wttr.in or Open-Meteo. Use when: user asks about weather, temperature, or forecasts for any location. NOT for: historical weather data, severe weather alerts, or detailed meteorological analysis. No API key needed.
---

# Weather Skill

Get current weather and forecasts using free APIs (no key needed).

## Usage

```bash
./scripts/weather.sh "Shanghai"
./scripts/weather.sh "Beijing, China"
```

## APIs Used

- **wttr.in** - Current weather + forecast (default)
- **Open-Meteo** - Alternative for more detailed data

## Examples

```bash
# Current weather
curl "wttr.in/Shanghai?format=3"

# Forecast (3 days)
curl "wttr.in/Shanghai?format=3"

# JSON data
curl "wttr.in/Shanghai?format=j1"
```

## Notes

- No API key required
- Supports city names worldwide
- Returns temperature, conditions, humidity, wind, etc.
