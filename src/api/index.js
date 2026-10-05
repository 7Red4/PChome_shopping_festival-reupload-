// 靜態展示版：原本的後端已下線，改由 localStorage 模擬所有 API 回應。
import dayjs from 'dayjs';

import Pcoin from '../assets/main/prizes/fourBig/Pcoin.png';
import ECOVACS from '../assets/main/prizes/fourBig/ECOVACS.png';
import moroccanoil from '../assets/main/prizes/fourBig/moroccanoil.png';
import logitech from '../assets/main/prizes/fourBig/logitech.png';
import linetaxi from '../assets/main/prizes/fourBig/linetaxi.png';
import tvreward from '../assets/main/prizes/fourBig/tvreward.png';

export const DEMO_EMAIL = 'demo@v1111p.demo';
export const COIN_REWARD_ID = 'F3176B8A-27A2-40EF-8869-EDC2DA1ADA87';

const DB_KEY = 'pchome-v1111p-demo-db';
const INITIAL_POINTS = 20000;
const LOGIN_REWARD_POINTS = [2000, 1000, 2000, 1000, 2000, 1000, 1000];

const REWARDS = [
  {
    id: COIN_REWARD_ID,
    name: '客製雷雕 V1111P 金幣',
    popupName: '客製雷雕 V1111P 金幣',
    image: Pcoin,
    redeemScore: 30000,
    redeemType: 'coin',
    stock: 250
  },
  {
    id: 'demo-linetaxi',
    name: 'LINE TAXI 乘車優惠',
    popupName: 'LINE TAXI 乘車優惠序號',
    image: linetaxi,
    redeemScore: 5000,
    redeemType: 'serial',
    redeemSerialLink: 'https://linetaxi.com.tw/',
    stock: 1000
  },
  {
    id: 'demo-tvreward',
    name: 'PChome 購物金',
    popupName: 'PChome 購物金序號',
    image: tvreward,
    redeemScore: 10000,
    redeemType: 'serial',
    redeemSerialLink: 'https://ecvip.pchome.com.tw/m/pages/couponsave.htm',
    stock: 500
  },
  {
    id: 'demo-logitech',
    name: 'Logitech 品牌優惠',
    popupName: 'Logitech 品牌館優惠',
    image: logitech,
    redeemScore: 8000,
    redeemType: 'link',
    redeemLink: 'https://logitech.pchomeec.tw/sites/logitech',
    stock: 500
  },
  {
    id: 'demo-moroccanoil',
    name: 'Moroccanoil 優惠',
    popupName: 'Moroccanoil 品牌優惠',
    image: moroccanoil,
    redeemScore: 15000,
    redeemType: 'link',
    redeemLink: 'https://24h.pchome.com.tw/',
    stock: 100
  },
  {
    id: 'demo-ecovacs',
    name: 'ECOVACS 掃地機器人抽獎',
    popupName: 'ECOVACS 掃地機器人抽獎資格',
    image: ECOVACS,
    redeemScore: 50000,
    redeemType: 'link',
    redeemLink: 'https://24h.pchome.com.tw/',
    stock: 0
  }
];

const createUser = (email) => ({
  hasLoginReward: false,
  profile: { email, image: '' },
  score: {
    pinball: { lastScore: 0, updatedAt: null },
    rythem: { lastScore: null, updatedAt: null },
    login: {
      week: { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null },
      lastScore: 0,
      updatedAt: 0
    },
    total: INITIAL_POINTS,
    updatedAt: Date.now()
  },
  redeemed: []
});

const loadDB = () => {
  try {
    return JSON.parse(localStorage.getItem(DB_KEY)) || { users: {} };
  } catch (error) {
    return { users: {} };
  }
};

const saveDB = (db) => {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (error) {
    console.error(error);
  }
};

const fail = (status, text) => ({ error: { status, text, message: text } });

const randomSerial = () =>
  Array.from({ length: 12 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join('');

// 回傳給前端的 user 不含 redeemed 紀錄，與原本 API 的格式一致
const publicUser = ({ redeemed, ...user }) => JSON.parse(JSON.stringify(user));

const withUser = (email, handler) => {
  if (!email) return fail(401, 'Unauthorized');
  const db = loadDB();
  if (!db.users[email]) db.users[email] = createUser(email);
  const result = handler(db.users[email], db);
  saveDB(db);
  return result;
};

const routes = {
  '/login': ({ email }) =>
    withUser(email, (user) => {
      const today = dayjs().format('d');
      const lastReward = user.score.login.week[today];
      const isRewardedToday = lastReward && dayjs(lastReward).isSame(dayjs(), 'day');
      user.hasLoginReward = !isRewardedToday;
      if (!isRewardedToday) {
        const point = LOGIN_REWARD_POINTS[today];
        user.score.login.week[today] = Date.now();
        user.score.login.lastScore = point;
        user.score.login.updatedAt = Date.now();
        user.score.total += point;
      }
      return { res: publicUser(user) };
    }),

  '/score': ({ email, type, score }) =>
    withUser(email, (user) => {
      // 展示版不設遊玩冷卻時間，updatedAt 保持 null 讓遊戲可以立即重玩
      user.score[type] = { lastScore: score, updatedAt: null };
      user.score.total += Math.max(0, Math.floor(score || 0));
      user.score.updatedAt = Date.now();
      return { res: publicUser(user) };
    }),

  '/rewards': ({ email }) =>
    withUser(email, (user) => ({
      res: {
        rewards: REWARDS.map((reward) => {
          const record = user.redeemed.find((el) => el.id === reward.id);
          return {
            ...reward,
            redeemable: !record && reward.stock > 0,
            lastRedeemedAt: record ? record.redeemedAt : null
          };
        })
      }
    })),

  '/redeemedRewards': ({ email }) =>
    withUser(email, (user) => ({
      res: {
        redeemedRewards: user.redeemed.map((record) => ({
          ...REWARDS.find((reward) => reward.id === record.id),
          ...record
        }))
      }
    })),

  '/redeem/coin': ({ email }) => withUser(email, () => ({ res: { ok: true } }))
};

const redeem = (id, { email }) =>
  withUser(email, (user) => {
    const reward = REWARDS.find((el) => el.id === id);
    if (!reward) return fail(404, 'Not Found');
    if (reward.stock <= 0 || user.redeemed.some((el) => el.id === id)) return fail(429, 'Too Many Requests');
    if (user.score.total < reward.redeemScore) return fail(412, 'Precondition Failed');

    user.score.total -= reward.redeemScore;
    const record = { id, redeemedAt: Date.now() };
    if (reward.redeemType === 'serial') record.redeemedSerial = randomSerial();
    user.redeemed.push(record);

    return {
      res: {
        serial: record.redeemedSerial,
        redeemSerialLink: reward.redeemSerialLink,
        url: reward.redeemLink
      }
    };
  });

export default async function api(url, data = {}) {
  await new Promise((resolve) => setTimeout(resolve, 200));
  try {
    if (routes[url]) return routes[url](data);
    const matched = url.match(/^\/redeem\/(.+)$/);
    if (matched) return redeem(matched[1], data);
    return fail(404, 'Not Found');
  } catch (error) {
    console.error(error);
    return { error };
  }
}

const blobUrlToDataUrl = async (src) => {
  const blob = await (await fetch(src)).blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// 取代原本的 /api/uploadImage：圖片轉成 data URL 存在本機
export async function uploadImage(src, email) {
  const image = src.startsWith('data:') ? src : await blobUrlToDataUrl(src);
  withUser(email, (user) => {
    user.profile.image = image;
  });
  return { url: image };
}
