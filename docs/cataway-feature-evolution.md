# CatAway Feature Evolution

이 문서는 CatAway에서 신규 기능을 만든 뒤 라이브 운영 중 어떤 방향으로 발전시켰는지 정리한 포트폴리오 보조 자료다.
공개 웹페이지에는 요약만 싣고, 면접에서는 이 문서를 보고 구체적으로 설명한다.

## 1. Leaderboard

### Timeline

- `b6ed01b8a` / 2025-12-23 / account-side leaderboard data start
- `c58150385` / 2025-12-24 / `LeaderboardData`를 `UI/Contents/Leaderboard`로 이동
- `c25b844e3` / 2025-12-24 / 리더보드 구조 수정
- `79bd9c735` / 2025-12-29 / 리더보드 리소스 추가
- `afaf2e526` / 2025-12-31 / 리더보드 시뮬레이터 완성
- `8f4e1f8af` / 2025-12-31 / 리더보드 최적화
- `5dfc84b98` / 2026-01-07 / 리더보드 수정 완료
- `b626c50a5` / 2026-03-17 / Endless League 메달/랭킹 연결
- `a2d807ac9` / 2026-05-15 / 리더보드 중복 닉네임 수정

### How It Evolved

처음에는 Prefs, Manager, UI item/podium을 갖춘 기본 리더보드 구조로 시작했다.
이후 주간 더미 시뮬레이션, 월드/국가 랭킹, 닉네임 리소스, 캐시, 스크롤 UI 최적화, Endless League 메달 랭킹이 붙으면서 라이브 콘텐츠에 가까운 구조로 발전했다.

현재 구조의 핵심은 `LeaderboardManager`다.

- 20,000명 규모의 가상 유저 풀과 상위 1,000명 표시 리스트를 구성한다.
- 닉네임 파일의 중복을 `Distinct()`로 제거하고, 국가별 이름 분포를 적용한다.
- 주간 더미 9명은 성장률을 다르게 두고, 오프라인 경과 시간에 따라 점수가 증가한다.
- World/Country 랭킹은 스테이지를 우선하고, 최대 스테이지 유저는 Endless League 메달 수로 다시 정렬한다.
- `UI_Leaderboard`는 12개 아이템 풀만 유지하면서 긴 리스트를 스크롤 위치에 맞춰 재사용한다.
- 플레이어 행이 뷰포트 밖에 있으면 상단/하단에 고정 표시해 현재 위치를 잃지 않게 한다.

### Strengths

- 서버 리더보드 없이도 빠르게 라이브 경쟁감을 만들 수 있다.
- 오프라인 경과, 주간 리셋, 보상 수령, 가상 유저 성장을 클라이언트에서 완결한다.
- 긴 리스트를 풀링해 UI 생성 비용을 줄였다.
- 닉네임, 국가, 아바타, 프레임, 메달을 조합해 단순 더미 리스트보다 실제 유저처럼 보이게 했다.
- Endless League와 결합하면서 기존 리더보드가 다른 콘텐츠의 프로필/랭킹 기반으로 재사용됐다.

### Tradeoffs

- Prefs 기반 클라이언트형 랭킹이므로 진짜 글로벌 경쟁 검증이나 치트 방어에는 한계가 있다.
- 20,000명 풀을 클라이언트에서 다루기 때문에 저사양 기기에서는 초기화/정렬 비용을 계속 의식해야 한다.
- 봇 성장률, 국가 분포, 메달 증가량이 하드코딩에 가까워 기획 밸런스 변경 시 코드 수정 가능성이 남는다.
- 포트폴리오에서는 "서버 랭킹"이 아니라 "서버 없는 환경에서 라이브 경쟁감을 만든 클라이언트 시스템"으로 설명하는 것이 정확하다.

## 2. Lucky Pass / Season Pass

### Timeline

- `da7e88595` / 2025-08-13 / Lucky Pass 초기 제작
- `2b538a412` / 2025-10-24 / Season Pass
- `1219e55e4` / 2026-01-23 / resource loading and UI refactor
- `274660adc` / 2026-01-26 / info page and resource handling
- `700f983e8` / 2026-04-22 / season pass renewal cleanup
- `dcb612edd` / 2026-05-02 / season pass complete

### Evolution

초기 Lucky Pass 제작 이후, 반복되는 시즌 운영에 맞춰 보상 테이블과 리소스 교체 비용을 낮추는 방향으로 발전했다.
`LuckyPassDataTableSO`는 날짜 기반 table override를 가지며, `LuckyPassResourceSO`는 Lobby, Panel, Purchase, Info, Spine 리소스를 그룹화한다.

### Strengths

- 시즌 보상/리소스 교체를 코드 수정이 아니라 데이터와 Addressables 리소스 교체 중심으로 처리할 수 있다.
- 정보 페이지, 구매 페이지, 로비 아이콘, Spine 연출을 한 리소스 SO에서 묶어 관리한다.
- 시즌별 운영이 반복될수록 실수 가능성을 낮춘다.

### Tradeoffs

- 리소스 그룹이 커지면 누락된 AssetReference를 런타임 전 검증하는 에디터 체크가 필요하다.
- 날짜 문자열 기반 override는 간단하지만, 타임존/형식 오류에 취약할 수 있다.

## 3. Competition Content

### Timeline

- `926beb207` / 2026-03-04 / `Dev-CompetitionRemake` merge
- `3b312d6ef` / 2026-03-06 / competition separation complete
- `86613105f` / 2026-03-06 / SkyCatsle, UFORace concept applied
- `f1e441bb1` / 2026-05-08 / WorldCup Race
- `156d82ae1` / 2026-05-11 / competition content complete
- `b6bc4a700` / 2026-05-20 / Puzzle complete

### Evolution

단일 경쟁 콘텐츠에서 출발해 Streak Race, UFO/Air Balloon, WorldCup, Smelt Festival처럼 변형 가능한 라이브 콘텐츠 묶음으로 확장됐다.
공통적으로 상태, 스케줄, 타이머, 실패/재도전, 보상, UI 연출, 이벤트 발사가 맞물린다.

### Strengths

- 콘텐츠마다 다른 룰을 가지면서도 운영 흐름은 비슷하게 유지한다.
- 이벤트가 start, step reached, reward/lose처럼 진행 상태에 연결되어 분석하기 좋다.
- 스케줄/상태 기반 노출로 로비 진입 시 보여줄 콘텐츠를 제어한다.

### Tradeoffs

- 콘텐츠가 늘어날수록 Manager와 UI 패널 사이의 상태 동기화 비용이 커진다.
- 비슷한 흐름의 콘텐츠가 많아지면 공통 베이스/인터페이스를 더 강하게 분리할 여지가 있다.

## 4. Store / Package

### Timeline

- 2025-10 - 2026-06 동안 Store, Package, IAP, schedule 관련 커밋 다수
- `5c8eda545` / 2026-04-07 / schedule data cleanup
- `08e7ba177` / 2026-04-01 / IAP product sync
- `618a22a61` / 2026-04-01 / package cleanup complete
- `93f7f2b64` / 2026-06-02 / IAPPurchaseListener and IAP/UI assets
- `6e11c7b61` / 2026-06-08 / IAP SKUs, spend tracking and UI prefabs

### Evolution

상품 수가 늘어나면서 단순 팝업/버튼 추가에서 PackageManager 중심의 기간, 노출 조건, 구매 상태, 진행도, 보상 수령 처리로 발전했다.

### Strengths

- `LimitedTime`, `Interval` 같은 표시 타입에 따라 판매 여부와 남은 시간을 계산한다.
- 구매 전/후 상태와 패키지 만료를 같은 Manager에서 관리한다.
- IAP 조건 등록을 통해 상품 버튼 표시와 구매 가능 상태를 연결한다.

### Tradeoffs

- 다양한 패키지 UI가 개별 클래스로 늘어나 유지보수 표면이 커질 수 있다.
- 기간/인터벌 로직은 UTC, 앱 포그라운드, 저장값 초기화 상태에 대한 QA가 필요하다.

## 5. Resource Optimizer

### Timeline

- `b563d197c` / 2026-05-26 / duplicate resources cleanup
- `5cf28cf53` / 2026-05-27 / atlas optimize
- `599c21b9a` / 2026-05-27 / spine optimize
- `af70b5515` / 2026-05-27 / unused tab update

### Evolution

반복적인 리소스 점검을 수작업에서 Unity Editor 도구로 옮겼다.
`ResourceOptimizerWindow`는 Overview, Textures, Atlases, Bulk Edit, Alpha Check, Unused, Duplicate, NameMismatch, Addressables Check, Spine, Build Report, PA Report 탭을 제공한다.

### Strengths

- 리소스 정리 작업을 개인 경험이 아니라 도구 기반 반복 작업으로 만든다.
- 빌드 전 위험 리소스를 빠르게 확인하고 CSV export 등으로 공유할 수 있다.
- Addressables, Spine, Atlas처럼 라이브 빌드 크기와 로딩에 영향을 주는 항목을 한 창에서 점검한다.

### Tradeoffs

- Editor 도구는 런타임 안전성과 별개라, 실제 빌드 프로파일링과 함께 봐야 한다.
- 프로젝트 규칙이 바뀌면 스캐너와 탭별 체크 조건도 같이 유지보수해야 한다.
