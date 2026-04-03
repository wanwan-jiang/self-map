import {
  MBTI_TYPE_KEY,
  MBTI_SUBMIT_EVENT,
  BIG_FIVE_TYPE_KEY,
  BIG_FIVE_SUBMIT_EVENT,
  RIASEC_TYPE_KEY,
  RIASEC_STATS_KEY,
  RIASEC_SUBMIT_EVENT,
} from "~/variables/variable";
import { saveUserBigFiveResult, saveUserMbtiResult, saveUserRiasecResult } from "~/api/user/personResults";
import { getAuthToken } from "~/utils/authToken";
import type { BigFiveDomainBucket, BigFiveStatItem } from "~/types/userBigFiveResultType";
import { BIG_FIVE_STATS_KEY } from "~/variables/variable";
import type { SelectedAnswerPayload } from "~/types/questionType";
import type { RiasecDimensionScore, UserRiasecStats } from "~/types/userRiasecResultType";

export const usePersonSubmit = async (type: string, answers: Ref<Record<string, SelectedAnswerPayload>>) => {
  if (typeof window === "undefined") {
    return;
  }
  //TODO
  if (type === MBTI_TYPE_KEY) {
    if (typeof window === "undefined") {
      return;
    }

    type AxisPair = "EI" | "SN" | "TF" | "JP";
    type AxisLetter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
    type AxisKey = AxisPair | AxisLetter;
    const stats: Record<AxisKey, number> = {
      EI: 0,
      E: 0,
      I: 0,
      SN: 0,
      S: 0,
      N: 0,
      TF: 0,
      T: 0,
      F: 0,
      JP: 0,
      J: 0,
      P: 0,
    };

    const axisPairByDimension = new Map<string, AxisPair>([
      ["EI", "EI"],
      ["SN", "SN"],
      ["TF", "TF"],
      ["JP", "JP"],
    ]);

    const mbtiScoreToLetter = (pair: AxisPair, value: number): AxisLetter | undefined => {
      if (value === 0) return undefined;

      if (pair === "EI") return value > 0 ? "E" : "I";
      if (pair === "SN") return value > 0 ? "S" : "N";
      if (pair === "TF") return value > 0 ? "T" : "F";
      // pair === 'JP'
      return value > 0 ? "J" : "P";
    };

    for (const answer of Object.values(answers.value)) {
      const dim = (answer.dimension_en ?? "").toUpperCase();
      const pair = axisPairByDimension.get(dim);
      if (pair === undefined) continue;

      stats[pair] = stats[pair] + 1;
      console.log("stats[pair]", stats[pair]);

      const picked = mbtiScoreToLetter(pair, answer.value);
      if (picked === undefined) continue;
      stats[picked] = stats[picked] + 1;
    }

    const getFinalLetter = (pair: AxisPair, positive: AxisLetter, negative: AxisLetter): AxisLetter => {
      // 按你的规则：正数 > 负数 => positive，否则 => negative（包含相等时）
      return stats[positive] > stats[negative] ? positive : negative;
    };

    const ei = getFinalLetter("EI", "E", "I");
    const sn = getFinalLetter("SN", "S", "N");
    const tf = getFinalLetter("TF", "T", "F");
    const jp = getFinalLetter("JP", "J", "P");

    const mbtiType = `${ei}${sn}${tf}${jp}`;

    if (getAuthToken()) {
      try {
        await saveUserMbtiResult(mbtiType, stats);
      } catch (error) {
        console.error("保存 MBTI 结果失败", error);
      }
    }
    window.localStorage.setItem("mbti_stats", JSON.stringify(stats));
    window.localStorage.setItem(MBTI_TYPE_KEY, mbtiType);

    if (window.localStorage.getItem(MBTI_TYPE_KEY)) {
      window.dispatchEvent(new Event(MBTI_SUBMIT_EVENT));
    }
  } else if (type === BIG_FIVE_TYPE_KEY) {
    // const rawAnswers = Object.values(answers.value) as SelectedAnswerPayload[];
    // const answeredAnswers = rawAnswers.filter((item) => item.domain && item.facet);
    // if (answeredAnswers.length === 0) {
    //   window.alert("提交失败，请重新完成测评后再试。");
    //   return;
    // }
    const buckets: Record<string, BigFiveDomainBucket> = {};
    for (const answer of Object.values(answers.value)) {
      const domain = answer.domain ?? "";
      const facet = Number(answer.facet ?? 0);
      const base = Number(answer.value);
      const score = (answer.keyed ?? "").toLowerCase() === "minus" ? 6 - base : base;
      if (!domain || !facet || Number.isNaN(score)) {
        continue;
      }
      if (!buckets[domain]) {
        buckets[domain] = { score: 0, count: 0, facets: {} };
      }
      buckets[domain].score += score;
      buckets[domain].count += 1;
      if (!buckets[domain].facets[facet]) {
        buckets[domain].facets[facet] = { score: 0, count: 0 };
      }
      buckets[domain].facets[facet].score += score;
      buckets[domain].facets[facet].count += 1;
    }
    const domainOrder = ["O", "C", "E", "A", "N"] as const;
    const domainNameMap: Record<(typeof domainOrder)[number], string> = {
      O: "经验开放性",
      C: "尽责性",
      E: "外向性",
      A: "亲和性",
      N: "神经质",
    };
    const getLevel = (avg: number): "h" | "n" | "l" => {
      if (avg > 3.5) return "h";
      if (avg < 2.5) return "l";
      return "n";
    };
    const bigFiveStats: BigFiveStatItem[] = domainOrder
      .filter((domain) => Boolean(buckets[domain]?.count))
      .map((domain) => {
        const bucket = buckets[domain];
        const average = (bucket?.score ?? 0) / (bucket?.count ?? 0);
        return {
          domain,
          // domainName: domainNameMap[domain],
          // score: bucket?.score ?? 0,
          // count: bucket?.count ?? 0,
          average,
          level: getLevel(average),
        };
      });
    const bigFiveType = bigFiveStats.map((item) => `${item.level}`).join("");

    if (getAuthToken()) {
      try {
        await saveUserBigFiveResult(bigFiveType, bigFiveStats);
      } catch (error) {
        console.error("保存 Big Five 结果失败", error);
      }
    }
    window.localStorage.setItem(BIG_FIVE_STATS_KEY, JSON.stringify(bigFiveStats));
    window.localStorage.setItem(BIG_FIVE_TYPE_KEY, bigFiveType);

    if (window.localStorage.getItem(BIG_FIVE_TYPE_KEY)) {
      window.dispatchEvent(new Event(BIG_FIVE_SUBMIT_EVENT));
    }
  } else if (type === RIASEC_TYPE_KEY) {
    /** 霍兰德六维编码，与题库 `t` 字段一致 */
    const RIASEC_KEYS = ["R", "I", "A", "S", "E", "C"] as const;
    type RiasecLetter = (typeof RIASEC_KEYS)[number];

    /** 单题 1–5 分，每题满分 */
    const RIASEC_PER_QUESTION_MAX = 5;

    function createEmptyRiasecDimensionStats(): Record<RiasecLetter, RiasecDimensionScore> {
      return {
        R: { score: 0, max: 0 },
        I: { score: 0, max: 0 },
        A: { score: 0, max: 0 },
        S: { score: 0, max: 0 },
        E: { score: 0, max: 0 },
        C: { score: 0, max: 0 },
      };
    }

    /**
     * 各题分值累加到对应类型 `score`；该类型 `max` 累加本题满分（当前量表每题最高为 5）。
     * Holland 三字码：按 `score` 降序取前三维（同分按字母序）。
     */
    function computeRiasecScores(payloads: SelectedAnswerPayload[]): {
      stats: Record<RiasecLetter, RiasecDimensionScore>;
      type: string;
    } {
      const stats = createEmptyRiasecDimensionStats();
      for (const answer of payloads) {
        const raw = (answer.t ?? "").trim().toUpperCase();
        if (raw.length !== 1) continue;
        const letter = raw as RiasecLetter;
        if (!RIASEC_KEYS.includes(letter)) continue;
        const v = Number(answer.value);
        if (!Number.isFinite(v)) continue;
        stats[letter].score += v;
        stats[letter].max += RIASEC_PER_QUESTION_MAX;
      }
      const rank = Object.entries(stats).sort((a, b) => {
        const diff = b[1].score - a[1].score;
        if (diff !== 0) return diff;
        return a[0].localeCompare(b[0]);
      });
      const top3 = rank.slice(0, 3).map(([k]) => k);
      return { stats, type: top3.join("") };
    }
    const payloads = Object.values(answers.value);
    if (payloads.length === 0) {
      window.alert("提交失败，请重新完成测评后再试。");
      return;
    }
    const { stats, type } = computeRiasecScores(payloads);

    if (getAuthToken()) {
      try {
        await saveUserRiasecResult(type, stats);
      } catch (error) {
        console.error("保存 RIASEC 结果失败", error);
      }
    }
    window.localStorage.setItem(RIASEC_STATS_KEY, JSON.stringify(stats));
    window.localStorage.setItem(RIASEC_TYPE_KEY, type);
    window.dispatchEvent(new Event(RIASEC_SUBMIT_EVENT));
  }
};
