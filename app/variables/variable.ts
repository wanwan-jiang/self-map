const MBTI_TYPE_KEY = "mbti_type";
const MBTI_STATS_KEY = "mbti_stats";
const MBTI_SUBMIT_EVENT = "mbti-submit-success-changed";
const BIG_FIVE_TYPE_KEY = "big_five_type";
const BIG_FIVE_STATS_KEY = "big_five_stats";
const BIG_FIVE_SUBMIT_EVENT = "big-five-submit-success-changed";
const RIASEC_TYPE_KEY = "riasec_type";
const RIASEC_STATS_KEY = "riasec_stats";
const RIASEC_SUBMIT_EVENT = "riasec-submit-success-changed";
const ENNEAGRAM_TYPE_KEY = "enneagram_type";
const ENNEAGRAM_STATS_KEY = "enneagram_stats";
const ENNEAGRAM_SUBMIT_EVENT = "enneagram-submit-success-changed";
const AUTH_TOKEN_STORAGE_KEY = "selfmap_auth_token";

/** 与 token 配套的展示用用户名（与接口字段 username 一致） */
const AUTH_USERNAME_STORAGE_KEY = "selfmap_user_name";

/** 当前登录用户在数据库中的主键（MongoDB ObjectId 字符串） */
const AUTH_USER_ID_STORAGE_KEY = "selfmap_user_id";

export {
  MBTI_TYPE_KEY,
  MBTI_STATS_KEY,
  MBTI_SUBMIT_EVENT,
  BIG_FIVE_TYPE_KEY,
  BIG_FIVE_STATS_KEY,
  BIG_FIVE_SUBMIT_EVENT,
  RIASEC_TYPE_KEY,
  RIASEC_STATS_KEY,
  RIASEC_SUBMIT_EVENT,
  ENNEAGRAM_TYPE_KEY,
  ENNEAGRAM_STATS_KEY,
  ENNEAGRAM_SUBMIT_EVENT,
  AUTH_TOKEN_STORAGE_KEY,
  AUTH_USERNAME_STORAGE_KEY,
  AUTH_USER_ID_STORAGE_KEY,
};
