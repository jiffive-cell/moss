#!/usr/bin/env node

/**
 * AI 漫剧配图生成脚本
 * 用法：node scripts/generate.mjs "[描述]" [风格] [尺寸]
 * 
 * 注意：需要配置通义万相 API 后才能使用
 */

const description = process.argv[2] || "AI 漫剧封面";
const style = process.argv[3] || "动漫风";
const size = process.argv[4] || "3:4";

// 风格提示词库
const STYLE_PROMPTS = {
  动漫风: "日式动漫风格，精致线条，明亮色彩，动画质感",
  赛博朋克: "赛博朋克风格，霓虹灯，未来城市，蓝紫色调，科技感",
  国潮风: "中国风，传统元素，现代设计，红色金色，国潮插画",
  简约风: "极简主义，留白，高级感，现代设计，干净简洁",
  插画风: "手绘插画，温暖色调，艺术感，绘本风格",
  "3D 渲染": "3D 渲染，立体感，精致细节，高质量，8k"
};

// 尺寸映射
const SIZE_MAP = {
  "3:4": { width: 1242, height: 1660, name: "小红书封面" },
  "1:1": { width: 1080, height: 1080, name: "正方形" },
  "9:16": { width: 1080, height: 1920, name: "抖音封面" },
  "16:9": { width: 1920, height: 1080, name: "横幅" }
};

async function generateWithWanxiang(prompt, size) {
  // TODO: 配置通义万相 API 后实现
  console.log("⚠️  通义万相 API 尚未配置");
  console.log("");
  console.log("📋 配置步骤：");
  console.log("1. 访问 https://wanxiang.aliyun.com 注册账号");
  console.log("2. 获取 API Key");
  console.log("3. 在 TOOLS.md 中添加配置:");
  console.log("");
  console.log("```markdown");
  console.log("### AI 生图");
  console.log("- 通义万相 API Key: your_api_key_here");
  console.log("```");
  console.log("");
  console.log("配置完成后回复"测试生图"即可使用！");
  
  return null;
}

function buildPrompt(description, style) {
  const stylePrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS.动漫风;
  const sizeInfo = SIZE_MAP[size] || SIZE_MAP["3:4"];
  
  return `${description}, ${stylePrompt}, 高质量，精细细节，${sizeInfo.name}尺寸`;
}

console.log(`🎨 AI 漫剧配图生成器\n`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
console.log(`【生成参数】`);
console.log(`• 描述：${description}`);
console.log(`• 风格：${style}`);
console.log(`• 尺寸：${size}`);
console.log(``);

const optimizedPrompt = buildPrompt(description, style);
console.log(`【优化提示词】`);
console.log(`${optimizedPrompt}\n`);

console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

// 检查 API 配置
const apiKey = process.env.WANXIANG_API_KEY;
if (!apiKey) {
  generateWithWanxiang(optimizedPrompt, size);
} else {
  console.log(`⏳ 正在生成...`);
  console.log(`(调用通义万相 API)`);
  // TODO: 实际调用 API
}
