# MineCat Capture List

MineCat은 “직접 만든 프로젝트”라는 점이 핵심이라, 완성된 화면과 시스템 구조가 같이 보이는 자료가 좋습니다.

## 꼭 찍으면 좋은 화면

1. Main gameplay
   - 광물/캐릭터/펫/투사체가 동시에 보이는 플레이 화면
   - HUD의 골드, 스테이지, 업그레이드 버튼이 함께 보이면 좋음

2. Weapon screen
   - 무기 리스트, 장착/강화/해금 상태가 보이는 화면
   - 가능하면 weapon VFX가 보이는 짧은 영상도 함께 준비

3. Pet screen
   - 펫 수집/강화/장착 구조가 보이는 화면

4. Shop / IAP screen
   - 실제 상품 ID, 내부 테스트 SKU, 결제 키가 보이지 않는 상태로 캡처
   - 가격이 테스트값이면 포트폴리오에는 흐리게 처리하거나 제외

5. Reward / Offline popup
   - 보상 테이블과 팝업 UI가 연결되어 있다는 걸 보여주기 좋은 화면

6. Data or tool screen
   - Unity Editor에서 CSV, RewardDatabase, generated UI prefab, prefab setup tool 중 하나
   - 내부 경로/비밀 값이 없도록 확인한 뒤 사용

## 영상으로 좋음

- 무기 공격이 발사되고 ProjectileSystem/VFX가 보이는 5-8초 클립
- 광물 파괴, 보상 획득, HUD 갱신이 이어지는 8-12초 클립
- 상점 구매 버튼 클릭 후 reward popup까지 이어지는 테스트 플로우

## 공개 전 제외할 것

- Firebase, GameAnalytics, Singular, AppLovin, IAP key
- 내부 GitHub URL, private package token, keystore, bundle signing 정보
- 실제 매출/유저/대시보드 수치
- 미출시 콘텐츠의 상세 밸런스표 전체
- 테스트 결제 계정, 테스트 SKU, sandbox receipt
