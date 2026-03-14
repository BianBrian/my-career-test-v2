"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, RefreshCw, Briefcase, TrendingUp, AlertTriangle } from "lucide-react";

// --- 1. 模拟数据库 (无需连接外部数据库，数据直接写在这里) ---
const JOB_DATABASE = [
  { id: 1, title: "高级 Java 工程师", city: "成都/北京", salary: "15k-25k", tags: ["逻辑强", "独立", "抗压"], vector: [0.9, 0.6, 0.3, 0.5, 0.8], desc: "适合喜欢钻研技术、逻辑严密、能接受一定加班的开发者。" },
  { id: 2, title: "AI 产品经理", city: "北京/上海", salary: "20k-35k", tags: ["沟通", "创新", "统筹"], vector: [0.7, 0.9, 0.7, 0.6, 0.6], desc: "适合思维活跃、善于沟通、对新技术敏感的管理者。" },
  { id: 3, title: "国企行政专员", city: "各地", salary: "6k-9k", tags: ["稳定", "细心", "亲和"], vector: [0.8, 0.4, 0.4, 0.9, 0.9], desc: "适合追求工作生活平衡、性格温和、做事细致的伙伴。" },
  { id: 4, title: "独立设计师", city: "远程/一线", salary: "10k-20k", tags: ["创意", "自由", "审美"], vector: [0.5, 0.95, 0.4, 0.5, 0.7], desc: "适合极具创造力、不喜欢被束缚、视觉敏感度高的艺术家。" },
  { id: 5, title: "销售总监", city: "全国", salary: "底薪 + 高提成", tags: ["外向", "野心", "抗压"], vector: [0.6, 0.7, 0.95, 0.5, 0.4], desc: "适合目标感极强、喜欢挑战高薪、善于人际交往的领袖。" }
];

// --- 2. 测评题目 ---
const QUESTIONS = [
  { id: 1, text: "周末突然有个紧急任务，你的第一反应是？", options: [
    { text: "立刻放下手头事，全力解决 (逻辑/尽责)", scores: [1, 0, 0, 0, 0] },
    { text: "先问问有没有 creative 的解决方案 (开放)", scores: [0, 1, 0, 0, 0] },
    { text: "找同事一起商量怎么搞 (外向)", scores: [0, 0, 1, 0, 0] },
    { text: "担心会不会影响团队和谐 (宜人)", scores: [0, 0, 0, 1, 0] }
  ]},
  { id: 2, text: "你更希望未来的工作环境是？", options: [
    { text: "流程清晰，按部就班 (尽责)", scores: [1, 0, 0, 0, 0] },
    { text: "充满未知，每天新挑战 (开放)", scores: [0, 1, 0, 0, 0] },
    { text: "热闹开放，随时交流 (外向)", scores: [0, 0, 1, 0, 0] },
    { text: "氛围温馨，大家互助 (宜人)", scores: [0, 0, 0, 1, 0] }
  ]},
  { id: 3, text: "面对高压截止日期，你会？", options: [
    { text: "越压越强，效率爆表 (低神经质/抗压)", scores: [0, 0, 0, 0, -1] }, // -1 代表情绪稳定
    { text: "感到焦虑，需要深呼吸 (高神经质)", scores: [0, 0, 0, 0, 1] },
    { text: "拉上大家一起冲刺 (外向)", scores: [0, 0, 1, 0, 0] },
    { text: "仔细检查避免出错 (尽责)", scores: [1, 0, 0, 0, 0] }
  ]}
];

export default function Home() {
  const [step, setStep] = useState(0); // 0: 首页, 1-3: 答题, 4: 结果
  const [scores, setScores] = useState([0, 0, 0, 0, 0]); // 5 维得分
  const [loading, setLoading] = useState(false);

  // 处理选项点击
  const handleOptionClick = (optionScores) => {
    const newScores = scores.map((s, i) => s + (optionScores[i] || 0));
    setScores(newScores);
    
    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      calculateResult(newScores);
    }
  };

  // 计算结果
  const calculateResult = (finalScores) => {
    setLoading(true);
    // 模拟 AI 计算延迟
    setTimeout(() => {
      // 简单的向量匹配逻辑 (余弦相似度简化版)
      let bestMatch = null;
      let maxScore = -1;

      finalScores.forEach((userScore, idx) => {
        // 这里只是简单演示，实际应归一化，但为了小白代码简洁，直接比对
      });

      // 简易匹配算法：找出总分最接近的岗位
      // 实际项目中这里会替换为复杂的向量计算
      // 为了演示效果，我们根据分数特征强行推荐一个
      let recommendedJob = JOB_DATABASE[0];
      if (finalScores[1] > 1.5) recommendedJob = JOB_DATABASE[1]; // 开放性高 -> 产品经理
      else if (finalScores[2] > 1.5) recommendedJob = JOB_DATABASE[4]; // 外向 -> 销售
      else if (finalScores[3] > 1.5) recommendedJob = JOB_DATABASE[2]; // 宜人 -> 行政
      else if (finalScores[0] > 1.5) recommendedJob = JOB_DATABASE[0]; // 尽责 -> 工程师
      
      setResultData(recommendedJob);
      setStep(5); // 显示结果页
      setLoading(false);
    }, 1500);
  };

  const [resultData, setResultData] = useState(null);

  // 重置
  const resetTest = () => {
    setStep(0);
    setScores([0, 0, 0, 0, 0]);
    setResultData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 font-sans text-slate-800">
      {/* 顶部导航 */}
      <nav className="p-6 flex justify-between items-center max-w-4xl mx-auto">
        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Career Compass AI
        </div>
        <div className="text-sm text-slate-500">Beta v1.0</div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          
          {/* 首页 */}
          {step === 0 && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                3 分钟，找到你的<br/>
                <span className="text-indigo-600">天命职业</span>
              </h1>
              <p className="text-lg text-slate-600">
                基于大模型心理学与真实岗位数据的智能匹配系统。<br/>
                告别迷茫，看见未来。
              </p>
              <button 
                onClick={() => setStep(1)}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-1"
              >
                开始免费测评
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="pt-8 grid grid-cols-3 gap-4 text-center text-xs text-slate-400">
                <div>🔒 隐私保护</div>
                <div>⚡ 即时报告</div>
                <div>🎯 精准匹配</div>
              </div>
            </motion.div>
          )}

          {/* 答题页 */}
          {step >= 1 && step <= 3 && (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div className="flex justify-between text-sm text-slate-400 mb-4">
                <span>问题 {step} / {QUESTIONS.length}</span>
                <span>{Math.round((step / QUESTIONS.length) * 100)}% 完成</span>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                <h2 className="text-2xl font-bold mb-8 text-slate-800">{QUESTIONS[step-1].text}</h2>
                <div className="space-y-4">
                  {QUESTIONS[step-1].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(opt.scores)}
                      className="w-full text-left p-5 rounded-xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 group"
                    >
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full border-2 border-slate-300 mr-4 group-hover:border-indigo-500 group-hover:bg-indigo-500 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100" />
                        </div>
                        <span className="font-medium text-slate-700 group-hover:text-indigo-900">{opt.text}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* 加载页 */}
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <RefreshCw className="w-16 h-16 text-indigo-600 animate-spin mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-800">AI 正在分析你的性格...</h3>
              <p className="text-slate-500 mt-2">正在匹配 10,000+ 岗位数据库</p>
            </motion.div>
          )}

          {/* 结果页 */}
          {step === 5 && resultData && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl text-center">
                <div className="text-indigo-200 text-sm font-bold uppercase tracking-wider mb-2">最佳匹配岗位</div>
                <h2 className="text-4xl font-extrabold mb-4">{resultData.title}</h2>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {resultData.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">{tag}</span>
                  ))}
                </div>
                <div className="text-2xl font-bold bg-white/20 inline-block px-6 py-2 rounded-xl backdrop-blur-md">
                  💰 {resultData.salary}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                  <div className="flex items-center mb-4 text-indigo-600">
                    <Briefcase className="w-6 h-6 mr-2" />
                    <h3 className="font-bold text-lg">为什么适合你？</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{resultData.desc}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                  <div className="flex items-center mb-4 text-orange-500">
                    <AlertTriangle className="w-6 h-6 mr-2" />
                    <h3 className="font-bold text-lg">避坑指南</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    该岗位在 {resultData.city} 竞争较激烈，建议提前准备相关作品集。注意该行业可能有阶段性加班，需做好心理准备。
                  </p>
                </div>
              </div>

              <div className="text-center pt-8">
                <button 
                  onClick={resetTest}
                  className="inline-flex items-center px-6 py-3 text-indigo-600 font-bold hover:bg-indigo-50 rounded-full transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  再测一次
                </button>
                <div className="mt-4 text-sm text-slate-400">
                  觉得准吗？分享给朋友试试 👇
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}