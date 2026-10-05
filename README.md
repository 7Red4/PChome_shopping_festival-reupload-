PC HOME 雙11 活動

彈珠台遊戲 ＋ 節奏遊戲

線上展示：https://7red4.github.io/PChome_shopping_festival-reupload-/

需使用手機螢幕大小遊玩：桌機瀏覽時會自動以手機框顯示。

# 展示版說明

原活動後端已下線，此版本改為純靜態頁面：

- 所有 API（登入、計分、兌獎、上傳硬幣圖片）改由 `src/api/index.js` 以 localStorage 模擬
- 略過登入，自動使用 demo 帳號，初始 20000 積分，每日登入另有獎勵
- 遊戲結束後分數直接累加為積分，可立即重玩
- 兌換金幣不需填寫姓名電話
- 清除瀏覽器 localStorage 即可重置進度

# 啟動

```bash
bun install
bun run dev
```

# 部署

push 到 `main` 後由 GitHub Actions 自動 build 並部署到 GitHub Pages（repo Settings → Pages → Source 需設為「GitHub Actions」）。
