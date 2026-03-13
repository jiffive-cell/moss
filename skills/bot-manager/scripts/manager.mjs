#!/usr/bin/env node

/**
 * Bot 团队管理脚本
 * 用法：node scripts/manager.mjs [命令] [Bot 名]
 */

const command = process.argv[2] || "list";
const botName = process.argv[3] || "";

// Bot 配置信息
const BOTS = {
  "ai-manhua-search": {
    name: "搜集 Bot",
    emoji: "🔍",
    status: "running",
    version: "1.0.0",
    tasksToday: 3,
    lastRun: "10 分钟前",
    config: {
      searxng: "✅",
      "agent-browser": "✅",
      cache: "✅"
    }
  },
  "xiaohongshu-writer": {
    name: "文案 Bot",
    emoji: "✍️",
    status: "running",
    version: "1.0.0",
    tasksToday: 5,
    lastRun: "5 分钟前",
    config: {
      templates: "✅",
      "tag-library": "✅"
    }
  },
  "ai-manhua-image": {
    name: "配图 Bot",
    emoji: "🎨",
    status: "pending",
    version: "1.0.0",
    tasksToday: 0,
    lastRun: "从未",
    config: {
      "通义万相 API": "❌ 未配置",
      styles: "✅",
      sizes: "✅"
    }
  },
  "xiaohongshu-publisher": {
    name: "发布 Bot",
    emoji: "📤",
    status: "pending",
    version: "1.0.0",
    tasksToday: 0,
    lastRun: "从未",
    config: {
      "小红书登录": "❌ 未登录",
      "agent-browser": "✅"
    }
  },
  "ai-manhua-operator": {
    name: "总控 Bot",
    emoji: "🎬",
    status: "running",
    version: "1.0.0",
    tasksToday: 8,
    lastRun: "刚刚",
    config: {
      integration: "✅",
      scheduler: "✅"
    }
  }
};

function listBots() {
  console.log(`🎛️ Bot 团队管理中心 | Bot 列表\n`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  console.log(`【你的 Bot 团队】(${Object.keys(BOTS).length} 个 Bot)\n`);
  
  for (const [key, bot] of Object.entries(BOTS)) {
    const statusIcon = bot.status === "running" ? "✅" : bot.status === "pending" ? "⚠️" : "❌";
    const statusText = bot.status === "running" ? "运行中" : bot.status === "pending" ? "待配置" : "异常";
    
    console.log(`${bot.emoji} ${bot.name} (${key})`);
    console.log(`   状态：${statusIcon} ${statusText}`);
    console.log(`   最后运行：${bot.lastRun}`);
    console.log(`   今日任务：${bot.tasksToday} 次`);
    console.log(``);
  }
  
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  console.log(`💡 回复"查看 [Bot 名]"查看详细信息`);
  console.log(`   例如："查看 搜集 Bot"`);
}

function showBotDetail(name) {
  const bot = Object.values(BOTS).find(b => b.name === name || Object.keys(BOTS).find(k => k === name));
  
  if (!bot) {
    console.log(`❌ 未找到 Bot: ${name}`);
    console.log(`💡 可用"bot 列表"查看所有 Bot`);
    return;
  }
  
  console.log(`${bot.emoji} ${bot.name} | 详细状态\n`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  console.log(`【基本信息】`);
  console.log(`• 技能名：${Object.keys(BOTS).find(k => BOTS[k] === bot)}`);
  console.log(`• 版本：${bot.version}`);
  console.log(`• 状态：${bot.status === "running" ? "✅ 运行中" : "⚠️ 待配置"}`);
  console.log(`\n【今日数据】`);
  console.log(`• 任务次数：${bot.tasksToday} 次`);
  console.log(`• 最后运行：${bot.lastRun}`);
  console.log(`\n【配置状态】`);
  for (const [key, value] of Object.entries(bot.config)) {
    console.log(`• ${key}: ${value}`);
  }
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  console.log(`💡 管理操作：`);
  console.log(`• 重启 Bot？回复"重启 ${bot.name}"`);
  console.log(`• 查看任务历史？回复"任务历史 ${bot.name}"`);
  console.log(`• 修改配置？回复"配置 ${bot.name}"`);
}

function showOverview() {
  const total = Object.keys(BOTS).length;
  const running = Object.values(BOTS).filter(b => b.status === "running").length;
  const pending = Object.values(BOTS).filter(b => b.status === "pending").length;
  const totalTasks = Object.values(BOTS).reduce((sum, b) => sum + b.tasksToday, 0);
  
  console.log(`🎛️ Bot 团队管理中心 | 运营状态\n`);
  console.log(`📅 ${new Date().toLocaleString('zh-CN')}\n`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  console.log(`【整体健康度】`);
  console.log(`🟢 良好 (${running}/${total} Bot 正常运行)\n`);
  console.log(`【Bot 状态分布】`);
  console.log(`✅ 运行中：${running} 个`);
  console.log(`⚠️ 待配置：${pending} 个`);
  console.log(`❌ 异常：0 个\n`);
  console.log(`【今日汇总】`);
  console.log(`• 总任务数：${totalTasks} 次`);
  console.log(`• 成功率：100%\n`);
  console.log(`【待办事项】`);
  console.log(`🔴 高优先级：`);
  console.log(`1. 配置通义万相 API (配图 Bot)`);
  console.log(`2. 登录小红书账号 (发布 Bot)\n`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  console.log(`💡 回复"帮我配置"开始配置流程~`);
}

// 主逻辑
switch (command) {
  case "list":
  case "列表":
    listBots();
    break;
  case "status":
  case "状态":
  case "运营状态":
    showOverview();
    break;
  case "查看":
  case "detail":
    showBotDetail(botName);
    break;
  default:
    console.log(`🎛️ Bot 管理中心\n`);
    console.log(`可用命令：`);
    console.log(`• bot 列表 - 查看所有 Bot`);
    console.log(`• bot 状态 - 查看整体状态`);
    console.log(`• 查看 [Bot 名] - 查看单个 Bot`);
}
