#!/usr/bin/env node

/**
 * Weather Skill - Fetch weather data from wttr.in
 * Usage: node weather.mjs [location]
 */

const location = process.argv[2] || "Xi'an, China";

async function getWeather(location) {
  const url = `https://wttr.in/${encodeURIComponent(location)}?format=j1`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'OpenClaw Weather Skill'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    const current = data.current_condition?.[0];
    
    if (!current) {
      console.log("❌ 无法获取天气数据");
      return;
    }
    
    const weather = {
      location: data.nearest_area?.[0]?.areaName?.[0]?.value || location,
      country: data.nearest_area?.[0]?.country?.[0]?.value || "",
      temp_c: current.temp_C,
      temp_f: current.temp_F,
      feelsLike_c: current.FeelsLikeC,
      condition: current.weatherDesc?.[0]?.value,
      humidity: current.humidity,
      wind_kph: current.windspeedKmph,
      wind_dir: current.winddir16Point,
      pressure: current.pressure,
      visibility: current.visibility,
      uvIndex: current.uvIndex
    };
    
    console.log(`🌤️  ${weather.location}${weather.country ? `, ${weather.country}` : ""}`);
    console.log(`📊 天气：${weather.condition}`);
    console.log(`🌡️  温度：${weather.temp_c}°C (体感 ${weather.feelsLike_c}°C)`);
    console.log(`💧 湿度：${weather.humidity}%`);
    console.log(`💨 风向：${weather.wind_dir} (${weather.wind_kph} km/h)`);
    console.log(`🔽 气压：${weather.pressure} mb`);
    console.log(`👁️  能见度：${weather.visibility} km`);
    console.log(`☀️  UV 指数：${weather.uvIndex}`);
    
  } catch (error) {
    console.error(`❌ 获取天气失败：${error.message}`);
    process.exit(1);
  }
}

getWeather(location);
