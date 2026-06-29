# CatAway Deep Dive

## Summary

- Period: 2025.08 - 2026.06
- Role: Unity client developer after core-game handoff
- Repository evidence: 1,547 commits by `younghoon-jo` between 2025-08-01 and 2026-06-30
- Strong portfolio angle: live-service feature ownership, gameplay gimmicks, UI-heavy Unity development, analytics-ready content, SDK integration, resource optimization

Commit volume by month:

| Month | Commits |
|---|---:|
| 2025-08 | 77 |
| 2025-09 | 118 |
| 2025-10 | 150 |
| 2025-11 | 121 |
| 2025-12 | 170 |
| 2026-01 | 163 |
| 2026-02 | 142 |
| 2026-03 | 166 |
| 2026-04 | 221 |
| 2026-05 | 204 |
| 2026-06 | 15 |

Use this carefully:

> The counts come from local Git history and are useful as work-history evidence, not as a measure of quality by themselves.

## Recommended Portfolio Order

1. Lucky Pass / Season Pass creation and renewal
2. Gameplay gimmicks
3. Competition content refactoring and expansion
4. Analytics-ready event architecture
5. IAP, ads, package, and external SDK integration
6. Resource optimization and build hygiene
7. Live QA, localization, and polish

## 1. Lucky Pass / Season Pass Creation and Renewal

### Why It Matters

Season pass is a monetization and retention feature, but for a Unity client
portfolio the important point is not "how much it sold." The important point is
that the client handles reward tables, time-based season assets, localized UI,
purchase state, progression, profile rewards, and analytics hooks without
breaking live users.

### Git Evidence

- `da7e88595` / 2025-08-13 / `luckypass`
  - First major CatAway work after receiving the core game.
  - Added LuckyPass UI prefab, components, item rows, premium/free reward UI, info UI, and Golden Ticket resources.
- `2b538a412` / 2025-10-24 / `Season Pass`
  - Seasonal pass resource and localization update.
  - Large UI prefab/resource update for Halloween-style pass.
- `1219e55e4` / 2026-01-23 / `Refactor LuckyPass resource loading and UI updates`
  - Refactored LuckyPass resource loading and related UI update flow.
  - Touched `LuckyPassManager`, store UI, card UI, purchase popup, Addressables, and SO resources.
- `274660adc` / 2026-01-26 / `Add LuckyPass info page and update resource handling`
  - Added info page and improved pass resource handling.
- `700f983e8` / 2026-04-22 / `시즌패스 리뉴얼 정리`
  - Added V2-style LuckyPass panel, Spine utilities, MotherPass data, and Addressable entries.
- `dcb612edd` / 2026-05-02 / `시즌패스 완성`
  - Consolidated LuckyPass panel/prefabs, profile rewards, Spine controller, purchase popup, profile data, and asset groups.
- `574b5df7a` / 2026-06-03 / `시즌패스, 패키지 추가`
  - Added TropicalPass resources, localization, lobby entry updates, and package/pass assets.

### Code Evidence

- `LuckyPassDataTableSO`
  - Supports dated reward-table overrides through `TableOverrides`.
  - This is portfolio-worthy because it shows live-season data can change without rewriting core logic.
- `LuckyPassResourceSO`
  - Groups lobby, panel, purchase popup, info page, and Spine resources.
  - This is useful because seasonal assets are isolated in data containers.
- `LuckyPassManager.ProcessLevelUp`
  - Processes level-up from progress and emits tier analytics every 5 levels.

### What Was Improved

- Seasonal pass resources became data-driven instead of being scattered through UI code.
- Pass UI could support multiple seasonal themes and resource groups.
- Renewal work added separate info/purchase/panel resources and Spine-based visual presentation.
- Analytics hooks made progression measurable without showing confidential dashboard data.

### Public Portfolio Text

> 코어 게임만 있던 CatAway를 넘겨받아 처음 큰 작업으로 Lucky Pass를 제작했고,
> 이후 시즌별 리소스, 보상 테이블, 구매 상태, UI 연출,
> 프로필 보상, 분석 이벤트를 유지보수 가능한 구조로 정리했습니다. 리소스와
> 보상 데이터를 ScriptableObject/Addressables 기반으로 분리해 시즌 교체와
> 리뉴얼 대응 비용을 낮췄고, 티어 도달 이벤트를 연결해 라이브 진행 지표를
> 추적할 수 있도록 구현했습니다.

## 2. Gameplay Gimmicks

### Why It Matters

Gameplay gimmicks are stronger evidence of Unity client engineering than
business metrics. They touch runtime model logic, object generation, physics,
item interactions, stage serialization, stage editor support, tutorials, and QA.

### Git Evidence

- `494f93f8e` / 2025-10-30 / `다이너마이트 기믹`
- `0147ced0c` / 2025-12-29 / `Rocat 및 CarrierHole 기믹 추가 및 로컬라이제이션 적용`
- `509ac0d5e` / 2026-02-09 / `mouse 기믹 추가`
- `e87f21a2e` / 2026-02-09 / `로켓 완성`
- `d2e0c1d1c` / 2026-04-06 / `Gate Gimmick Fix`

### Code Evidence

- `StageData`
  - Includes `BoxGimmickType` such as Dynamite, PermanentHole, Carrier, Mice, CountAxisLock.
  - Includes `CatGimmickType` such as Rocat and Mice.
  - Stores board-level `RocatData`.
- `BoxCarrier`
  - Stores carrier target cell/direction data.
  - Caches and releases carried cat objects.
- `BoxPermanentHole`
  - Converts a cleared box into a fixed obstacle, detaches input, freezes Rigidbody2D, and snaps parts back to cells.
- `CatRocat` / `Rocat`
  - Pairs cat-side gimmick with board-side Rocat data and removal/fly effects.
- `RocketObject`
  - Handles target-cell and target-cat modes, DOTween path flight, special gimmick impact, connected-cell split logic, and item input recovery.
- `EUI_Panel_Confirm`
  - Validates stage-editor constraints for paired gimmicks such as Key/Lock, Mice, Rocat, Scissors/Rope, and count-based gimmicks.

### Public Portfolio Text

> CatAway의 코어 게임플레이에 Rocat, Carrier, Permanent Hole, Dynamite,
> Mice, Count/Layer/Gate 계열 기믹과 Rocket 아이템 상호작용을 추가했습니다.
> 기믹은 런타임 동작뿐 아니라 StageData 직렬화, StageEditor 입력/검증,
> 튜토리얼과 QA까지 함께 맞춰야 했기 때문에, 단순 UI보다 게임 클라이언트
> 엔지니어링 역량을 잘 보여주는 작업입니다.

## 3. Competition Content Refactoring and Expansion

### Why It Matters

Competition content is a good portfolio subject because it has state machines,
timers, failure/retry logic, reward claim rules, UI animation, fake opponents,
content schedules, and analytics funnels. It shows more engineering depth than
a static UI screen.

### Git Evidence

- `926beb207` / 2026-03-04 / `Merge branch 'Dev-CompetitionRemake' into Dev-1.11.04`
  - Large competition remake.
  - Reworked `CompetitionPrefs`, `CompetitionManager`, competition UI, profile views, roster, popup flow, state handling, and prefabs.
  - The diff removed many older split classes and consolidated the content into current manager/UI structures.
- `3b312d6ef` / 2026-03-06 / `경쟁 분리 완료`
  - Completed separation around competition prefs/manager/panel.
- `86613105f` / 2026-03-06 / `SkyCatsle, UFORace Concept 적용`
  - Applied concept scheduling to SkyCastle and UFORace.
- `f1e441bb1` / 2026-05-08 / `WorldCup Race`
  - Added WorldCup Race resources and base content.
- `156d82ae1` / 2026-05-11 / `경쟁 컨텐츠 작업 완료`
  - Completed WorldCup Race manager/UI/bracket/win/lose flow.
- `b6bc4a700` / 2026-05-20 / `Puzzle 기능 완성`
  - Completed Puzzle Break feature and cleaned temporary resources.
- `c1033557a` / 2026-05-22 / `전체 이벤트 수정`
  - Updated broad event integration across competition, card, item, package, puzzle, smelt festival, UFO race, WorldCup, and IAP.

### Code Evidence

Streak Race:

- `CompetitionManager.StartCompetition`
  - Resets progress, stores reward multiplier, content concept, state, and emits `cih_streakrace_start`.
- `CompetitionManager.OnStageClear`
  - Advances step, schedules pending animation, emits `cih_streakrace_step_reached`.
- `CompetitionManager.ClaimReward`
  - Grants one-cycle reward and emits `cih_streakrace_reward_claim`.

UFO Race / Air Balloon Race:

- `UFORaceManager.SendStartEvent`
  - Emits `content_id`, `race_num`, `entry_point`.
- `UFORaceManager.GameClear`
  - Increments win count, simulates competitors, emits step reached.
- `UFORaceManager.HandleRaceLose`
  - Emits race number and current wins for drop-off analysis.

WorldCup Race:

- `WorldCupRaceManager.SendStartEvent`
  - Emits round/race entry.
- `WorldCupRaceManager.OnLevelClear`
  - Tracks per-round score progress.
- `WorldCupRaceManager.HandleRoundLose`
  - Tracks elimination point.
- `WorldCupRaceManager.HandleRoundWin`
  - Emits champion completion by cycle.

Smelt Festival:

- `SmeltFestivalManager.OnStageClear`
  - Emits step reached.
- `SmeltFestivalManager.OnStageFail`
  - Emits streak break.
- `SmeltFestivalManager.OnContinuePurchase`
  - Emits continue purchase.

### What Was Improved

- Competition state, timer, reward, UI, and analytics were tied to concrete content lifecycle events.
- Multi-stage competitions were made measurable by race/round rather than only total win count.
- Failure points and continue purchases became analyzable.
- UI feedback and result panels were separated for win/lose/reward states.

### Public Portfolio Text

> 경쟁 콘텐츠는 단순 UI가 아니라 상태, 타이머, 실패/재도전, 보상, 연출,
> 분석 이벤트가 얽힌 라이브 콘텐츠였습니다. 기존 경쟁 구조를 정리하고
> Streak Race, UFO/Air Balloon Race, WorldCup Race, Smelt Festival 같은
> 콘텐츠의 start, step, fail, reward 지점을 클라이언트 상태 변화에 맞춰
> 구현했습니다. 이를 통해 라운드별 이탈과 보상 수령 흐름을 운영 지표로
> 확인할 수 있는 구조를 만들었습니다.

## 4. Analytics-Ready Event Architecture

### Why It Matters

This is stronger than showing revenue screenshots. It demonstrates that the
client feature code can produce reliable operational data.

### Git Evidence

- `603fb862c` / 2026-03-20 / `파이어베이스 이벤트 심기`
- `71377fb0a` / 2026-03-16 / `띵킹데이터 이벤트 수정`
- `edb8be2d5` / 2026-04-07 / `이벤트 파라미터 수정`
- `e4bd374fe` / 2026-04-02 / `Thinking Data Fix`
- `c1033557a` / 2026-05-22 / `전체 이벤트 수정`
- `c0d24b452` / 2026-05-26 / `이벤트 추가`

### Code Evidence

- `EventDef`
  - Event names are centralized constants.
- `EventManager.TrackNetwork`
  - Uses flags: Singular, GameAnalytics, Firebase, ThinkingData, FirebaseTD, All.
- `EventManager.Track`
  - Routes one feature event to selected SDKs.
- `TrackFirebase`
  - Normalizes event parameters to strings for custom-dimension compatibility.
- `TrackGameAnalytics`
  - Adapts to the existing wrapper's single-param limitation.

### What Was Improved

- Event naming was no longer scattered through every UI component.
- Feature code could call one route with explicit SDK targets.
- Firebase/ThinkingData shared events could be emitted through `FirebaseTD`.
- Event parameters were aligned with actual content state, such as `tier`, `step`, `race_num`, `current_wins`, `content_id`, `reward_amount`.

### Public Portfolio Text

> Firebase, ThinkingData, Singular, GameAnalytics 이벤트를 공통 라우터로
> 관리했습니다. 기능 코드에서는 콘텐츠 시작, 단계 도달, 실패, 보상 수령,
> 구매 같은 상태 변화만 명확히 호출하고, SDK별 발사 대상은 `TrackNetwork`
> 플래그로 분리했습니다. 대시보드 수치 공개 없이도 라이브 콘텐츠가 funnel
> 분석 가능한 상태가 되도록 클라이언트 이벤트 구조를 정리했습니다.

## 5. IAP, Ads, Package, and External SDK Integration

### Why It Matters

This area proves that you worked on high-risk live-game flows: purchases,
ads, package exposure, product IDs, localized prices, and SDK/platform
dependencies.

### Git Evidence

- `01b55c688` / 2026-01-16 / `iap, ads manager / firebase 제거`
- `d80ef303f` / 2026-01-26 / `보상광고 대기시간 추가`
- `7ed0e8123` / 2026-01-29 / `ads attribution 수정`
- `08e7ba177` / 2026-04-01 / `IAP 상품 동기화`
- `739e22502` / 2026-04-27 / `IAP 검증 수정`
- `789610da5` / 2026-05-26 / `SDK 설치`
- `6b28fb5ee` / 2026-05-26 / `3rd-party sdk remove`
- `296a68b23` / 2026-05-26 / `ESI 빌드 세팅`
- `93f7f2b64` / 2026-06-02 / `Add IAPPurchaseListener & update IAP/UI assets`
- `6e11c7b61` / 2026-06-08 / `Update IAP SKUs, spend tracking & UI prefabs`

### Code Evidence

- `IAPManager.OnPurchaseCompletedWithArgs`
  - Validates purchase event args.
  - Stores product ID and transaction ID in prefs.
  - Converts localized price to USD through exchange-rate data.
  - Emits purchase milestone events.
  - Sends ThinkingData `te_payment` with order, product, revenue, first-pay, currency, and product name.
- `UI_IAPButton.FirebaseEvent`
  - Sends SKU + stage context to Firebase.
- `IAPManager.TrackShowInAppProducts`
  - Airflux product impression tracking under compile flag.

### What Was Improved

- Purchase completion became a stateful flow, not just a button callback.
- Purchase events included product, transaction, first-pay, currency, and stage context.
- Package/product exposure could be tracked by SDK when enabled.
- External SDK integration included install, build setting, event wiring, and cleanup of older third-party SDKs.

### Public Portfolio Text

> IAP/광고/패키지 흐름에서 구매 완료, 상품 노출, 보상형 광고, 외부 SDK 연동을
> 담당했습니다. 구매 완료 시 product/transaction/currency/first-pay 정보를
> 안전하게 저장하고 분석 이벤트로 전달했으며, SKU와 스테이지 맥락을 함께
> 남겨 라이브 운영 중 구매 흐름을 추적할 수 있도록 했습니다.

## 6. Resource Optimization and Build Hygiene

### Why It Matters

This is a useful differentiator for Unity client portfolios. It shows you
worked beyond feature screens: build size, resource duplication, atlas hygiene,
Addressables, Spine assets, and editor tooling.

### Git Evidence

- `b563d197c` / 2026-05-26 / `Duplicate 리소스 정리`
- `b55b3be41` / 2026-05-26 / `Addressable 체크`
- `5cf28cf53` / 2026-05-27 / `Atlas Optimize`
- `599c21b9a` / 2026-05-27 / `Spine Optimize`
- `98ff370ae` / 2026-05-27 / `빌드 캐시 클리너`
- `af70b5515` / 2026-05-27 / `Update ResourceOptimizerUnusedTab.cs`

### Code Evidence

- `ResourceOptimizerWindow`
  - Unity Editor window under `Tools/Resource Optimizer`.
  - Supports scan target selection, rescan, CSV export, and selected texture tracking.
  - Tab structure includes Overview, Textures, Atlases, Bulk Edit, Alpha Check, Unused, Duplicate, NameMismatch, Addressables Check, Spine, Build Report, PA Report.
- Resource cleanup commits show removal of duplicate textures, sprite/meta cleanup, atlas checks, ASTC/ETC work, Spine optimization, and Addressables checking.

### What Was Improved

- Resource review became repeatable through editor tooling.
- Texture/atlas/spine/addressable issues could be scanned instead of manually hunted.
- Cleanup work reduced duplicate and unused assets around a growing live project.

### Public Portfolio Text

> 라이브 프로젝트의 리소스가 커지면서 텍스처, 아틀라스, Addressables, Spine
> 리소스를 반복적으로 점검할 수 있는 Unity Editor 도구를 만들었습니다.
> Resource Optimizer는 스캔, CSV export, 중복/미사용/네이밍/알파/아틀라스/
> Addressables/Spine 탭을 제공해 리소스 정리를 수동 작업이 아닌 반복 가능한
> 프로세스로 바꿨습니다.

## 7. Live QA, Localization, and Polish

### Git Evidence

- Many commits are `Jira Fix`, `Bug Fix`, `로컬라이징`, `UI 수정`, `연출 수정`, and build commits.
- Notable examples:
  - `f2f1d553e` / 2026-05-15 / `아이템 ui 사이즈 커지는 문제 수정`
  - `d9cd73303` / 2026-05-26 / `로컬라이징`
  - `a9b50a986` / 2026-05-26 / `zh-hans 추가`
  - `9df84f013` / 2026-06-02 / `영어 -> 중국어`
  - `c9e68f999` / 2026-06-08 / `Update JC font asset and related files`

### Public Portfolio Text

> 라이브 빌드 과정에서 QA/Jira 이슈를 빠르게 반영하고, 로컬라이징/폰트/리소스/
> UI 연출을 함께 조정했습니다. 기능 구현 이후에도 빌드 버전별 안정화와
> 운영 대응까지 이어서 맡았습니다.

## Final CatAway Case Study Draft

### Title

CatAway - Live Game Feature Ownership

### One-Liner

코어 게임만 있던 프로젝트를 넘겨받아 Lucky Pass 제작, 게임플레이 기믹,
경쟁 콘텐츠, SDK/분석 이벤트, IAP/광고/패키지, 리소스 최적화까지 라이브 운영에 필요한 Unity 클라이언트
작업을 담당했습니다.

### Bullets

- 2025.08부터 2026.06까지 CatAway 클라이언트 개발을 담당하며 Lucky Pass 제작과 라이브 콘텐츠 운영을 수행.
- 시즌패스 리소스/보상 테이블/구매 UI/프로필 보상을 ScriptableObject와 Addressables 중심으로 정리.
- Rocat, Carrier, Permanent Hole, Dynamite, Mice, Rocket 등 게임플레이 기믹과 StageEditor 검증 흐름 구현.
- 경쟁 콘텐츠의 상태, 타이머, 실패/재도전, 보상 수령, UI 연출을 구현하고 분석 이벤트와 연결.
- Firebase/ThinkingData/Singular/GameAnalytics 이벤트를 공통 라우터로 관리해 콘텐츠 상태 변화를 funnel 분석 가능한 이벤트로 구성.
- IAP, 광고, 패키지, 외부 SDK 연동을 담당하고 구매 완료/상품 노출/보상 흐름의 이벤트 검증을 수행.
- Resource Optimizer Editor 도구와 리소스 정리 작업으로 텍스처, 아틀라스, Addressables, Spine 리소스 관리 효율을 개선.
- Jira/QA, 로컬라이징, 폰트, UI 연출, 빌드 안정화까지 라이브 서비스 개발 흐름에 맞춰 대응.
