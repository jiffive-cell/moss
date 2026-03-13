#!/usr/bin/env node

/**
 * AI 漫剧资讯搜集脚本
 * 用法：node scripts/search.mjs [关键词] [平台]
 */

const searchQuery = process.argv[2] || "AI 漫剧";
const platform = process.argv[3] || "all";

// 关键词库
const KEYWORDS = {
  manhua: ["AI 漫剧", "AI 动画", "AIGC 短剧", "AI 生成动画"],
  industry: ["漫剧平台", "短剧市场", "动画行业", "内容平台"],
  tech: ["文生视频", "图生视频", "AI 视频模型", "Sora", "可灵", "即梦"],
  competitor: ["腾讯动漫", "哔哩哔哩", "快手星芒", "抖音短剧"],
  audience: ["观众喜好", "用户画像", "观看习惯", "付费意愿"]
};

async function searchSearxng(query, limit = 10) {
  try {
    // 使用 searxng 搜索（假设本地有 searxng 实例）
    const url = `http://localhost:8080/search?q=${encodeURIComponent(query)}&format=json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data.results?.slice(0, limit) || [];
  } catch (error) {
    console.error(`searxng 搜索失败：${error.message}`);
    return [];
  }
}

async function searchWeb(query, limit = 10) {
  // 备用：直接用 web search API
  const results = [];
  
  // 这里会调用 OpenClaw 的 web_search 工具
  // 由于是脚本，我们输出搜索请求，让 AI 处理
  console.log(`🔍 搜索关键词：${query}`);
  console.log(`📊 平台：${platform === "all" ? "全平台" : platform}`);
  console.log(`⏳ 请稍候...`);
  
  return results;
}

function formatResults(results, category) {
  if (!results || results.length === 0) {
    return `❌ 未找到"${category}"相关内容`;
  }
  
  let output = `\n📊 【${category}】\n\n`;
  
  results.slice(0, 5).forEach((item, i) => {
    output += `${i + 1}. **${item.title || "无标题"}**\n`;
    output += `   ${item.content || item.snippet || "无摘要"}\n`;
    if (item.url) output += `   🔗 ${item.url}\n\n`;
  });
  
  return output;
}

async function main() {
  console.log(`🔍 开始搜索 AI 漫剧资讯...`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  
  // 根据关键词类型搜索
  let results = [];
  
  if (searchQuery === "爆款数据" || searchQuery === "数据") {
    console.log("📈 正在抓取爆款数据...");
    // 这里会用 agent-browser 抓取小红书/抖音
    console.log("💡 提示：需要配置 agent-browser 抓取小红书/抖音数据");
  } else if (searchQuery === "行业动态") {
    console.log("📰 正在搜集行业动态...");
    results = await searchSearxng("AI 漫剧 行业动态 2026");
  } else if (searchQuery === "大模型动态") {
    console.log("🤖 正在搜集大模型进展...");
    results = await searchSearxng("AI 视频模型 文生视频 2026");
  } else if (searchQuery === "观众喜好") {
    console.log("👥 正在分析观众喜好...");
    results = await searchSearxng("AI 漫剧 观众喜好 用户画像");
  } else {
    console.log(`🔍 搜索"${searchQuery}"...`);
    results = await searchSearxng(searchQuery);
  }
  
  // 输出结果
  if (results.length > 0) {
    console.log(`\n✅ 找到 ${results.length} 条结果:\n`);
    results.forEach((item, i) => {
      console.log(`${i + 1}. ${item.title}`);
      console.log(`   ${item.content?.substring(0, 100) || ""}...`);
      console.log(`   🔗 ${item.url}\n`);
    });
  } else {
    console.log("\n❌ 未找到相关内容，尝试更换关键词~");
  }
  
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`💡 提示：回复"写文案"可基于搜索结果生成小红书文案`);
}

main().catch(console.error);
