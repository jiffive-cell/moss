#!/usr/bin/env node

/**
 * Weather Forecast - Fetch 3-day forecast from wttr.in
 * Usage: node forecast.mjs [location]
 */

const location = process.argv[2] || "Xi'an, China";

async function getForecast(location) {
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
    const forecast = data.weather;
    
    if (!forecast || forecast.length === 0) {
      console.log("❌ 无法获取天气预报数据");
      return;
    }
    
    const cityName = data.nearest_area?.[0]?.areaName?.[0]?.value || location;
    const country = data.nearest_area?.[0]?.country?.[0]?.value || "China";
    
    console.log(`📍 ${cityName}, ${country}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
    
    // 当前天气
    if (current) {
      console.log(`📊 当前天气`);
      console.log(`   ${current.weatherDesc?.[0]?.value} | ${current.temp_C}°C | 体感 ${current.FeelsLikeC}°C`);
      console.log(`   湿度 ${current.humidity}% | 风 ${current.winddir16Point} ${current.windspeedKmph}km/h\n`);
    }
    
    // 3 天预报
    console.log(`📅 未来 3 天预报\n`);
    
    forecast.slice(0, 3).forEach((day, index) => {
      const date = new Date(day.date);
      const weekday = date.toLocaleDateString('zh-CN', { weekday: 'long', month: 'short', day: 'numeric' });
      
      const maxTemp = day.maxtempC;
      const minTemp = day.mintempC;
      const condition = day.hourly?.[6]?.weatherDesc?.[0]?.value || day.hourly?.[12]?.weatherDesc?.[0]?.value || "Unknown";
      const rainChance = day.hourly?.[12]?.chanceofrain || "0";
      const humidity = day.avgHumidity || day.hourly?.[12]?.humidity || "0";
      
      console.log(`${index === 0 ? '明天' : index === 1 ? '后天' : '大后天'} (${weekday})`);
      console.log(`   🌡️  ${minTemp}°C ~ ${maxTemp}°C`);
      console.log(`   📊 ${condition}`);
      console.log(`   💧 降水概率 ${rainChance}% | 湿度 ${humidity}%`);
      console.log(``);
    });
    
  } catch (error) {
    console.error(`❌ 获取天气预报失败：${error.message}`);
    process.exit(1);
  }
}

getForecast(location);
