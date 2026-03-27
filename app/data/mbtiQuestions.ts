import type { MbtiQuestion } from "../types/mbti";

export const mbtiQuestions: MbtiQuestion[] = [
  {
    id: "q1",
    dimension: "外向型 vs 内向型",
    title: "在社交场合中，你通常是：",
    options: [
      { id: "q1-a", label: "A", text: "充满活力并主动交谈" },
      { id: "q1-b", label: "B", text: "保持安静并倾向于倾听" },
    ],
  },
  {
    id: "q2",
    dimension: "直觉型 vs 实感型",
    title: "面对新任务时，你更倾向于：",
    options: [
      { id: "q2-a", label: "A", text: "先把握整体方向，再补充细节" },
      { id: "q2-b", label: "B", text: "先确认细节信息，再开始行动" },
    ],
  },
  {
    id: "q3",
    dimension: "思考型 vs 情感型",
    title: "在做重要决定时，你通常会：",
    options: [
      { id: "q3-a", label: "A", text: "优先考虑逻辑和客观标准" },
      { id: "q3-b", label: "B", text: "优先考虑感受与人际影响" },
    ],
  },
  //   {
  //     id: "q4",
  //     dimension: "判断型 vs 知觉型",
  //     title: "你的日程安排通常是：",
  //     options: [
  //       { id: "q4-a", label: "A", text: "提前规划清楚并按计划执行" },
  //       { id: "q4-b", label: "B", text: "保留弹性，边走边调整" },
  //     ],
  //   },
  //   {
  //     id: "q5",
  //     dimension: "外向型 vs 内向型",
  //     title: "一场聚会结束后，你更可能：",
  //     options: [
  //       { id: "q5-a", label: "A", text: "感到兴奋，还想继续社交" },
  //       { id: "q5-b", label: "B", text: "感到需要独处来恢复精力" },
  //     ],
  //   },
  //   {
  //     id: "q6",
  //     dimension: "直觉型 vs 实感型",
  //     title: "阅读说明文档时，你更关注：",
  //     options: [
  //       { id: "q6-a", label: "A", text: "核心概念和总体框架" },
  //       { id: "q6-b", label: "B", text: "步骤细节和可执行信息" },
  //     ],
  //   },
  //   {
  //     id: "q7",
  //     dimension: "思考型 vs 情感型",
  //     title: "同事发生分歧时，你常扮演：",
  //     options: [
  //       { id: "q7-a", label: "A", text: "分析问题并提出理性方案" },
  //       { id: "q7-b", label: "B", text: "协调关系并照顾双方感受" },
  //     ],
  //   },
  //   {
  //     id: "q8",
  //     dimension: "判断型 vs 知觉型",
  //     title: "面对截止日期，你通常会：",
  //     options: [
  //       { id: "q8-a", label: "A", text: "提前完成，避免临时赶工" },
  //       { id: "q8-b", label: "B", text: "临近截止时进入高效状态" },
  //     ],
  //   },
  //   {
  //     id: "q9",
  //     dimension: "外向型 vs 内向型",
  //     title: "在团队讨论中，你更倾向于：",
  //     options: [
  //       { id: "q9-a", label: "A", text: "边想边说，快速表达观点" },
  //       { id: "q9-b", label: "B", text: "先思考成熟后再发言" },
  //     ],
  //   },
  //   {
  //     id: "q10",
  //     dimension: "直觉型 vs 实感型",
  //     title: "学习新技能时，你更喜欢：",
  //     options: [
  //       { id: "q10-a", label: "A", text: "先理解原理和可能性" },
  //       { id: "q10-b", label: "B", text: "先练习具体案例和方法" },
  //     ],
  //   },
  //   {
  //     id: "q11",
  //     dimension: "思考型 vs 情感型",
  //     title: "评价一项方案是否可行时，你首先看：",
  //     options: [
  //       { id: "q11-a", label: "A", text: "数据、效率和风险" },
  //       { id: "q11-b", label: "B", text: "价值、体验和影响" },
  //     ],
  //   },
  //   {
  //     id: "q12",
  //     dimension: "判断型 vs 知觉型",
  //     title: "旅行前你通常会：",
  //     options: [
  //       { id: "q12-a", label: "A", text: "提前订好行程和路线" },
  //       { id: "q12-b", label: "B", text: "只定大方向，现场探索" },
  //     ],
  //   },
  //   {
  //     id: "q13",
  //     dimension: "外向型 vs 内向型",
  //     title: "遇到新朋友时，你通常：",
  //     options: [
  //       { id: "q13-a", label: "A", text: "主动开启话题并带动气氛" },
  //       { id: "q13-b", label: "B", text: "观察一段时间再逐步交流" },
  //     ],
  //   },
  //   {
  //     id: "q14",
  //     dimension: "直觉型 vs 实感型",
  //     title: "当别人讲述经历时，你更容易记住：",
  //     options: [
  //       { id: "q14-a", label: "A", text: "背后的意义和抽象观点" },
  //       { id: "q14-b", label: "B", text: "具体事实和细节场景" },
  //     ],
  //   },
  //   {
  //     id: "q15",
  //     dimension: "思考型 vs 情感型",
  //     title: "给朋友建议时，你更偏向：",
  //     options: [
  //       { id: "q15-a", label: "A", text: "指出问题核心并给出解法" },
  //       { id: "q15-b", label: "B", text: "先共情，再温和引导" },
  //     ],
  //   },
  //   {
  //     id: "q16",
  //     dimension: "判断型 vs 知觉型",
  //     title: "家里或工位通常是：",
  //     options: [
  //       { id: "q16-a", label: "A", text: "整洁有序，物品各归其位" },
  //       { id: "q16-b", label: "B", text: "灵活随性，但自己找得到" },
  //     ],
  //   },
  //   {
  //     id: "q17",
  //     dimension: "外向型 vs 内向型",
  //     title: "周末安排更接近：",
  //     options: [
  //       { id: "q17-a", label: "A", text: "参加活动、见朋友、外出" },
  //       { id: "q17-b", label: "B", text: "宅家充电、阅读或独处" },
  //     ],
  //   },
  //   {
  //     id: "q18",
  //     dimension: "直觉型 vs 实感型",
  //     title: "解决问题时，你常从哪里切入：",
  //     options: [
  //       { id: "q18-a", label: "A", text: "寻找模式与长期趋势" },
  //       { id: "q18-b", label: "B", text: "处理当前事实与具体步骤" },
  //     ],
  //   },
  //   {
  //     id: "q19",
  //     dimension: "思考型 vs 情感型",
  //     title: "在反馈他人表现时，你更重视：",
  //     options: [
  //       { id: "q19-a", label: "A", text: "直接、明确、可执行" },
  //       { id: "q19-b", label: "B", text: "委婉、体贴、易接受" },
  //     ],
  //   },
  //   {
  //     id: "q20",
  //     dimension: "判断型 vs 知觉型",
  //     title: "面对突发变化时，你通常会：",
  //     options: [
  //       { id: "q20-a", label: "A", text: "尽快重建计划并稳定节奏" },
  //       { id: "q20-b", label: "B", text: "顺势调整，保持开放选择" },
  //     ],
  //   },
];
