<template>
  <va-button
    v-if="!hasEmail"
    class="back_to_home z-index-5"
    @click="$router.go(-1)"
    icon="arrow_back"
    color="#fff"
  ></va-button>

  <div class="d-flex flex-column align--center">
    <SizeBox height="8" />
    <div class="w96p d-flex justify--center align--center">
      <img src="../assets/main/light_bars.png" class="w100p pos-a" />
      <img src="../assets/main/game_description.png" class="w50p pos-r" />
    </div>
    <div class="w90p d-flex flex-column">
      <SizeBox height="24" />
      <img src="../assets/main/ui/game_time.png" class="block_title" />
      <p>
        遊戲分為三波段：
        <br />第一波：2021年11月1日11:00起至2021年11月8日10:59止
        <br />第二波：2021年11月8日11:00起至2021年11月15日10:59止
        <br />第三波：2021年11月15日11:00起至2021年11月22日10:59止
        <br />
      </p>
      <SizeBox height="24" />
      <img src="../assets/main/ui/game_how.png" class="block_title" />
      <p>遊戲使用email登入，同一email不得重複參加活動(此email將做為後續聯繫中獎使用)</p>
      <p>上傳圖片創建個人客製化金幣</p>
      <p>進入遊戲體驗：幣勝彈珠王或幣爭節奏王</p>
      <p class="ml-6 pl-1 with-dot">幣勝彈珠王：</p>
      <p class="ml-3">‣ 彈珠金幣撞擊商品即可獲得積分；撞擊CHANGE區域，商品及積分位置移動</p>
      <p class="ml-3">‣ 彈珠金幣掉落洞口，則損失一條生命值</p>
      <p class="ml-3">‣ 五條生命值結束後，即獲得該局金幣積分</p>
      <p class="ml-3">‣ 遊玩過程，中途離開遊戲畫面，則該局金幣積分不列入計算</p>
      <p class="ml-6 pl-1 with-dot">幣爭節奏王</p>
      <p class="ml-3">‣ 點擊節奏音符即可獲得積分</p>
      <p class="ml-3">‣ 錯失一顆節奏音符，則損失一條生命值</p>
      <p class="ml-3">‣ 五條生命值結束後，即獲得該局金幣積分</p>
      <p class="ml-3">‣ 遊玩過程，中途離開遊戲畫面，則該局金幣積分不列入計算</p>
      <p class="ml-6 pl-1 with-dot">每日登入V1111P幣勝遊戲場活動網站即享有登入禮，其登入禮為金幣積分，機制如下：</p>
      <p class="ml-3">‣ 每週一、三、五、六發送1,000金幣積分</p>
      <p class="ml-3">‣ 每週二發送2,000金幣積分</p>
      <p class="ml-3">‣ 每週四發送2,000金幣積分</p>
      <p class="ml-3">‣ 每週日發送2,000金幣積分</p>
      <p class="pl-1">備註：</p>
      <p>遊戲可能因個人網速及個人裝置等系統無法控制之因素，導致部分遊戲功能未即時顯示，請稍後重新進入遊戲頁面。</p>
      <SizeBox height="24" />
      <img src="../assets/main/ui/game_chance.png" class="block_title" />
      <p>免費機會：每用戶於每1小時（整點）進入遊戲，即可於幣勝彈珠王及幣爭節奏王，獲得各5條生命值。未使用的遊戲機會無法保留或累積至下一場或次日。</p>
      <SizeBox height="24" />
      <img src="../assets/main/ui/game_redeem_how.png" class="block_title" />
      <p
        class="ml-6 pl-1 with-dot"
      >累積遊戲積分，於達到兌換門檻時進行兌換。(提醒：遊戲積分皆於每波段最後一日10:59清空重新計算，未使用的遊戲積分無法保留或累積至下一波段。)</p>
      <p class="ml-6 pl-1 with-dot">所有獎項數量有限，兌完為止。</p>
      <p class="ml-6 pl-1 with-dot">積分兌換後不可取消或要求更換獎品種類，用戶兌換前需請仔細確認是否兌換正確之獎品。</p>
      <p
        class="ml-6 pl-1 with-dot"
      >所有獎項不得要求兌換為等值的商品或現金，亦不得有包含且不限於轉讓、轉移、轉售得獎權利與資格等情事。</p>
      <p
        class="ml-6 pl-1 with-dot"
      >用戶兌換後未歸戶、放棄領獎資格、取消訂單、逾兌換期限或其他可歸責於用戶之事由等，怒不補發或退回積分．其餘兌換事項依「PChome 24h購物」公布為準。</p>
      <SizeBox height="24" />
      <img src="../assets/main/ui/game_prize.png" class="block_title" />
      <p
        class="ml-6 pl-1 with-dot"
      >天天玩遊戲-加碼最大獎（11/01 11:00至11/22 10:59皆有登入遊戲之用戶，即符合抽獎資格）</p>
      <p class="ml-3">‣ Switch OLED</p>
      <p class="ml-6 pl-1 with-dot">FB社群抽獎-加碼獎（於指定貼文下方留言並tag好友，即符合抽獎資格）</p>
      <p class="ml-3">‣ 三星 65吋4K HDR智慧連網液晶（市價：$45,900）</p>
      <p class="ml-3">‣ 11111P幣</p>
      <p class="ml-3">‣ ECOVACS DEEBOT T8 AIVI+掃地機器人（市價：17,999）</p>
      <p class="ml-6 pl-1 with-dot">P幣</p>
      <p class="ml-3">‣ 1111P幣</p>
      <p class="ml-3">‣ 111P幣</p>
      <p class="ml-3">‣ 51P幣</p>
      <p class="ml-3">‣ 11P幣</p>
      <p class="ml-3">‣ 5P幣</p>
      <p class="ml-3">‣ 1P幣</p>
      <p class="ml-6 pl-1 with-dot">LINE TAXI 乘車券</p>
      <p class="ml-3">‣ 乘車券40元</p>
      <p class="ml-3">‣ 乘車券20元</p>
      <p class="ml-3">
        <a
          href="https://linetaxi.com.tw/2020/07/15/%E5%84%AA%E6%83%A0%E6%80%8E%E9%BA%BC%E9%A0%98%EF%BC%9F%E9%A0%98%E5%8F%96%E6%96%B9%E5%BC%8F%E5%A4%A7%E6%8F%AD%E5%AF%86%F0%9F%94%8D/"
          target="_blank"
          rel="noopener noreferrer"
        >乘車券使用說明</a>
      </p>
      <p class="ml-6 pl-1 with-dot">隱藏賣場-優惠價商品</p>
      <p class="ml-6 pl-1 with-dot">品牌折價序號</p>
      <p class="ml-6 pl-1 with-dot">品牌折價券</p>
      <p>備註：</p>
      <ol class="ml-3">
        <li>每週將更換兌換獎勵，請注意「兌換獎勵」之頁面。</li>
        <li>
          獲得P幣序號：請至
          <a
            href="https://ecvip.pchome.com.tw/m/PPoint/save"
            target="_blank"
          >此網址</a> 歸戶 （每組序號只限歸戶一次），請於11/22 10:59活動結束前完成P幣歸戶，使用有效期限為P幣序號歸戶日起至30天。
        </li>
        <li>
          獲得折價券序號：請至
          <a
            href="https://ecvip.pchome.com.tw/m/pages/couponsave.htm"
            target="_blank"
          >此網址</a> 歸戶 （每組序號只限歸戶一次），請於兌換獎勵頁指定期限前完成折價券歸戶。
        </li>
        <li>於本活動所獲得之獎項可能因系統更新而未即時顯示於「我的獎勵」中，請稍後重新進入遊戲頁面。</li>
        <li>本活動遊戲所獲得之獎項，使用方式及規則皆以「PChome 24h購物」公布為準。</li>
      </ol>
      <SizeBox height="24" />
      <img
        src="../assets/main/ui/game_event_description.png"
        class="block_title"
      />
      <ol class="ml-3">
        <li>本活動之得獎資格不得遞補或以任何方式轉讓予第三人，獎項得獎者不得要求兌換為等值的商品或現金。如遇不可抗力之事由導致獎品內容變更，「PChome 24h購物」得自行決定改由其他等值商品取代，得獎者不得要求將獎品折換現金或指定更換其他商品，獎品價值應以本活動注意事項中公告之市價為準。</li>
        <li>使用者參加此活動時，即同意「PChome 24h購物」之服務相關條款政策及本活動注意事項之規範，中獎與否以本公司系統資料為準，如有違反前述規範、以其他不正當方式(如：創設多個用戶帳號、程式灌水、機器人等)試圖為自己或他人獲取利益、惡意使用程式或不正當、詐欺、舞弊等其他方式干擾活動公平性，或有其他違反中華民國法規之行為，經主辦單位發現或經第三人檢舉，主辦單位有權不待通知逕行取消使用者之抽獎或得獎資格，並對於任何破壞本活動之行為當事人追究相關法律責任及請求賠償本公司因此所受一切損失。</li>
        <li>得獎者應於「PChome 24h購物」得獎通知函中通知之回函期限內將「領獎確認書」郵寄至「PChome 24h購物」指定收件地址。若得獎者提供資料有誤或未能於指定期限內寄回領獎確認書（以郵戳為憑），「PChome 24h購物」將視同自動放棄中獎資格。若得獎者提供資料有誤，或無法提供、冒用、盜用第三人資料者，得獎者應自行負擔法律責任，「PChome 24h購物」並有權取消其得獎資格。</li>
        <li>如參加活動者未滿二十歲，應於其法定代理人閱讀、理解並同意本活動辦法及注意事項之所有內容後，始得參與本活動，當消費者參與本活動未成年之中獎者，則必須由中獎者父母或法定代理人代為領取獎品時，即推定其法定代理人已閱讀、瞭解並同意本活動辦法及注意事項。</li>
        <li>參加者同意若中獎人有疑似未符合規定之疑慮，如：程式灌水、機器人、惡意帳號，主辦單位將有權不經通知直接取消中獎資格 。</li>
        <li>若因活動參加者之不當或違法行為導致權利人之合法權益遭受侵害或「PChome 24h購物」因此致生訴訟而遭權利人求償時，活動參加者同意對於權利人及「PChome 24h購物」因此所受之損害及因此所支出之相關費用負責賠償，並應由活動參加者自行負擔相關法律責任。「PChome 24h購物」並有權取消其參加及得獎資格。</li>
        <li>「PChome 24h購物」保留隨時修改、終止或變更本活動內容之權利。修改後之活動內容將於活動網頁中更新，恕不另行通知。</li>
        <li>
          個人資料應告知事項
          <br />網路家庭國際資訊股份有限公司（以下簡稱本公司）向您蒐集之個人資料(包含個人姓名、地址、電話、身份證正反面影本及電子郵件地址等得以直接或間接識別個人的相關資訊)，將於本公司存續期間內使用於本公司合於營業登記項目或章程所載及業務需要、消費者與客戶管理服務、提供活動贈品、依法扣繳所得稅金及開立扣繳憑單、徵信、 行銷及營業範圍內相關服務使用。但依法您得主張之權利如下：請求查詢、請求閱覽、請求製給複製本、請求補充、請求更正、請求停止蒐集，處理、利用及刪除。若您不願提供相關之個人資料予本公司，將無法取得贈品及收到本公司提供之相關活動訊息。
        </li>
        <li>得獎者須同意「PChome 24h購物」對所有因領取或使用獎品之後果概無須負責，包含且不限於獎品本身之後續保固責任。</li>
        <li>同一會員帳號僅有一次得獎機會。</li>
        <li>主辦單位得以隨時修正、補充之，並保有隨時修改及終止本活動之權利。</li>
      </ol>

      <SizeBox height="96" />
    </div>
  </div>
</template>

<script setup>import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

const store = useStore();
const hasEmail = computed(() => store.getters.getHasEmail);

</script>

<style lang="scss" scoped>
.block_title {
  height: 42px;
  width: auto;
  align-self: start;
}

a {
  color: #27a2f8;
}

p,
ol {
  position: relative;
  color: #fff;
  line-height: 1.6;
  font-size: 16px;
  font-weight: 500;

  margin-top: 4px;
  padding-left: 16px;
  width: 94%;
  text-align: justify;
}

ol {
  list-style-type: decimal;
}

.with-dot {
  &::before {
    display: block;
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #fff;
    right: 100%;
    top: 0.55em;
    transform: translate(-50%, -50%);
  }
}

.back_to_home {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 13;
}
</style>