# CatAway Media Needed

현재 웹페이지는 사진 없이도 제출 가능한 텍스트 케이스스터디 형태로 정리되어 있다.
이미지를 추가한다면 아래 자료만 있으면 충분하다.

## Current Public Selection

현재 공개 페이지에는 6장만 선별해서 사용한다.

- Lucky Pass: `/assets/screenshots/cataway/luckypass.png`
- Lava Race main: `/assets/screenshots/cataway/lava-race-panel.png`
- Lava Chase matchmaking: `/assets/screenshots/cataway/lava-chase-matchmaking.png`
- Sky Cat Castle: `/assets/screenshots/cataway/skycatsle.png`
- Mystery Gem: `/assets/screenshots/cataway/mystery-gem.png`
- FreeCash SDK popup: `/assets/screenshots/cataway/freecash-sdk-popup.png`

패키지 팝업 이미지는 가격/테스트 빌드처럼 보이는 요소가 있어 공개 웹페이지에는 아직 넣지 않고,
노션 상세 로그나 면접용 보조 자료로 보관한다.

## 1. Lucky Pass / Season Pass

- 시즌패스 메인 패널 1장
- 보상 수령 또는 프리미엄/무료 보상 라인이 보이는 화면 1장
- 시즌별 테마가 바뀐 것을 보여주는 비교 이미지 1장

## 2. Gameplay Gimmicks

- Rocat 기믹이 발동되는 8-12초 영상 1개
- Carrier 또는 Permanent Hole 기믹이 스테이지에서 작동하는 8-12초 영상 1개
- Rocket 아이템이 박스/고양이/특수 기믹에 반응하는 8-12초 영상 1개
- StageEditor에서 기믹 검증 경고가 보이는 스크린샷 1장

## 3. Competition Content

- Streak Race 또는 UFO/Air Balloon Race 메인 화면 1장
- WorldCup Race 브래킷/승패 결과 화면 1장
- 보상 수령 연출 8-12초 영상 1개

## 4. Leaderboard / Endless League Ranking

- Weekly, World, Country 탭이 보이는 리더보드 화면 1장
- 내 순위 행이 상단/하단에 고정되는 스크롤 영상 8-12초 1개
- Endless League 메달이 랭킹 점수와 함께 표시되는 화면 1장
- 공개 페이지에서는 실제 유저처럼 보이는 닉네임/국가 정보가 문제될 수 있으면 일부 블러 처리

## 5. Analytics Architecture

- 실제 Firebase/GameAnalytics 대시보드 캡처는 권장하지 않음
- 대신 직접 만든 이벤트 흐름 다이어그램 이미지 1장 권장
- 예: `start -> step_reached -> round_lose/reward_claim`

## 6. Crash Stability / Live QA

- Crashlytics 원본 화면은 공개 웹페이지에 그대로 올리지 않는 것을 권장
- 면접용 비공개 자료로는 `2026.04.01 - 2026.05.21` crash-free users 추이 캡처 사용 가능
- 공개용으로 쓰려면 프로젝트명, 콘솔 URL, 앱 ID, 내부 계정 정보가 보이지 않게 자른 뒤 사용
- 페이지 본문에는 `대부분 95% 이상 유지`, `하락 구간 발생 후 후속 빌드로 회복`, `Crashlytics 기반 원인 추적`처럼 운영 방식 중심으로 표현

## 7. IAP / Ads / SDK

- 실제 결제/매출/transaction ID 화면은 사용하지 않음
- SDK 구조 또는 구매 흐름 다이어그램 1장 권장

## 8. Resource Optimizer

- Unity Editor의 Resource Optimizer 창 스크린샷 1장
- 가능하면 Overview 또는 Atlases/Unused 탭
- 프로젝트명, 내부 경로, 민감한 리소스명이 보이면 블러 처리

## Avoid

- 매출 원본 숫자
- Firebase App ID/API Key
- 유저 ID, device ID, transaction ID
- 내부 서버 URL
- 비공개 대시보드 URL
- 미출시 콘텐츠
- 테스트 가격, 테스트 빌드 UI, 내부 QA용 문구가 그대로 보이는 상품 캡처
