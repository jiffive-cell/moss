#!/usr/bin/env node

/**
 * 小红书文案生成脚本
 * 用法：node scripts/writer.mjs [主题] [风格]
 * 风格：教程、分享、测评、种草、干货
 */

const topic = process.argv[2] || "AI 漫剧";
const style = process.argv[3] || "教程";

// 标题公式库
const TITLE_TEMPLATES = {
  悬念式: [
    "X 天，我从 0 到 XX",
    "XX 背后的秘密，90% 的人不知道",
    "做了 XX 后，我发现了这些真相"
  ],
  对比式: [
    "以为 XX，结果 XX",
    "传统 XX vs AI XX，差距太大了",
    "XX 前 vs XX 后，变化惊人"
  ],
  数字式: [
    "X 个 XX，让你 XX",
    "XX 的 X 个技巧，建议收藏",
    "从 0 到 XX，我只用了 X 步"
  ],
  情绪式: [
    "太 XX 了！XX 必看",
    "后悔没早点知道 XX",
    "XX 真的香，谁用谁知道"
  ],
  教程式: [
    "手把手教你 XX (小白必看)",
    "XX 从 0 到 1 全流程",
    "XX 完整教程，建议收藏"
  ]
};

// 标签库
const TAGS = {
  core: ["#AI 漫剧", "#AIGC", "#动画制作"],
  traffic: ["#AI 教程", "#短视频创作", "#自媒体", "#副业", "#AI 工具"],
  precise: ["#文生视频", "#AI 动画", "#短剧", "#内容创作"],
  trending: ["#Sora", "#可灵 AI", "#即梦 AI", "#通义万相"]
};

function generateTitles(topic, count = 10) {
  const titles = [];
  const types = Object.keys(TITLE_TEMPLATES);
  
  for (let i = 0; i < count; i++) {
    const type = types[i % types.length];
    const template = TITLE_TEMPLATES[type][i % TITLE_TEMPLATES[type].length];
    let title = template.replace(/XX/g, topic);
    titles.push(title);
  }
  
  return titles;
}

function generateTags(topic, count = 8) {
  let selected = [...TAGS.core];
  selected = selected.concat(TAGS.traffic.slice(0, 3));
  selected = selected.concat(TAGS.precise.slice(0, 2));
  return selected.slice(0, count);
}

function generateContent(topic, style) {
  const templates = {
    教程: `
🎬 ${topic}完整教程

之前总觉得做这个好难
试了很多方法都不行
直到我发现了这个！

📝 具体步骤：
1️⃣ 第一步...
2️⃣ 第二步...
3️⃣ 第三步...

💡 注意事项：
• 注意 1
• 注意 2

🎁 更多细节放评论区~
`,
    分享: `
🌟 关于${topic}的一些分享

做这个已经一段时间了
从最初的小白到现在的 XX
分享一些我的经验

💪 我的收获：
• 收获 1
• 收获 2

🚀 给新手的建议：
• 建议 1
• 建议 2

有问题评论区见~
`,
    测评: `
📊 ${topic}深度测评

最近深度体验了 X 款
说说真实感受

✅ 优点：
• 优点 1
• 优点 2

❌ 缺点：
• 缺点 1
• 缺点 2

🏆 我的推荐：
• 新手选 XX
• 进阶选 XX
`
  };
  
  return templates[style] || templates.教程;
}

console.log(`✍️ 正在生成"${topic}"文案 (${style}风格)...\n`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

// 生成标题
console.log(`【标题备选】(选一个最喜欢的~)\n`);
const titles = generateTitles(topic, 5);
titles.forEach((t, i) => console.log(`${i + 1}. ${t}`));

// 生成正文
console.log(`\n\n【推荐正文】\n`);
const content = generateContent(topic, style);
console.log(content);

// 生成标签
console.log(`\n【标签】\n`);
const tags = generateTags(topic);
console.log(tags.join(" "));

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
console.log(`💡 需要我：`);
console.log(`• 换个风格？回复"换风格"+风格名`);
console.log(`• 优化某段？回复"优化"+内容`);
console.log(`• 生成配图？回复"生成配图"`);
