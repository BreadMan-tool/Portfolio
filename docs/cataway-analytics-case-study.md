# CatAway Analytics / SDK Integration Case Study

## Portfolio Angle

CatAway에서는 실제 매출 수치나 Firebase/GameAnalytics 대시보드 캡처보다,
라이브 콘텐츠가 분석 가능한 상태로 운영되도록 클라이언트 이벤트 구조를
정리하고 구현한 경험을 강조한다.

Recommended public phrasing:

> Firebase, ThinkingData, Singular, GameAnalytics 등 외부 SDK 이벤트를 공통
> 라우터로 관리하고, 시즌패스/경쟁 콘텐츠/IAP/광고 보상 흐름의 핵심 행동을
> 추적 가능한 이벤트로 연결했습니다. 이벤트 발사 타이밍과 파라미터를 기능
> 진행 상태에 맞춰 구현해, 기획/운영/외부 파트너가 라이브 지표를 확인할 수
> 있는 기반을 만들었습니다.

## Implementation Structure

The project uses a centralized event structure:

- `EventDef`: event names are declared as constants.
- `EventManager.Track`: routes one event to Firebase, ThinkingData, Singular, and/or GameAnalytics.
- Feature managers call `Main.Event.Track(...)` at state changes such as start, step reached, fail, reward claim, purchase, and continue.

Important code references:

- `/Users/bmore/Projects/ActionFit/AF_CatAway/Assets/@Scripts/Def.cs`
  - `EventDef` constants for level, pass, competition, card, puzzle, package, arena, and item events.
- `/Users/bmore/Projects/ActionFit/AF_CatAway/Assets/@Scripts/Managers/EventManager.cs`
  - `TrackNetwork` flags define Firebase, ThinkingData, Singular, GameAnalytics, and combined targets.
  - Firebase parameters are normalized to strings for custom dimension compatibility.
  - GameAnalytics routing uses the existing wrapper's supported single-param form.

## Feature Event Flows

### Season Pass

Purpose:
- Track season-pass progression without exposing sales numbers.

Implementation:
- `LuckyPassManager.ProcessLevelUp`
- Every 5 levels, emits `cih_seasonpass_tier_reached`.
- Parameter:
  - `tier`
- Target:
  - Firebase + ThinkingData

Portfolio phrasing:

> 시즌패스 레벨업 흐름에 분석 이벤트를 연결해, 특정 티어 도달 유저를 추적할 수
> 있도록 구현했습니다. 직접 매출 수치가 아니라, pass progression을 확인 가능한
> 클라이언트 이벤트로 남긴 점을 강조합니다.

### Streak Race

Purpose:
- Track competition entry, step progress, and reward claim.

Implementation:
- `CompetitionManager.StartCompetition`
  - `cih_streakrace_start`
  - parameters: `content_id`, `multiplier`
- `CompetitionManager.OnStageClear`
  - `cih_streakrace_step_reached`
  - parameters: `content_id`, `step`
- `CompetitionManager.ClaimReward`
  - `cih_streakrace_reward_claim`
  - parameters: `content_id`, `reward_amount`

Portfolio phrasing:

> 경쟁 콘텐츠의 진입, 단계 도달, 보상 수령을 각각 분리해 funnel 분석이 가능한
> 이벤트 흐름으로 구현했습니다.

### UFO Race / Air Balloon Race

Purpose:
- Track multi-race competition progress where each race has its own win counter.

Implementation:
- `UFORaceManager.SendStartEvent`
  - `cih_uforace_start`
  - parameters: `content_id`, `race_num`, `entry_point`
- `UFORaceManager.GameClear`
  - `cih_uforace_step_reached`
  - parameters: `content_id`, `race_num`, `step`
- `UFORaceManager.HandleRaceLose`
  - `cih_uforace_round_lose`
  - parameters: `content_id`, `race_num`, `current_wins`

Portfolio phrasing:

> Race 단계별로 카운터가 리셋되는 구조를 이벤트 파라미터에 반영해, 단순 누적
> 승수 대신 race 단위 funnel과 이탈 지점을 분석할 수 있도록 정리했습니다.

### Smelt Festival

Purpose:
- Track step progression, streak breaks, and paid/continued recovery.

Implementation:
- `SmeltFestivalManager.OnStageClear`
  - `cih_smeltfestival_step_reached`
  - parameter: `step`
- `SmeltFestivalManager.OnStageFail`
  - `cih_smeltfestival_streak_break`
  - parameter: `step`
- `SmeltFestivalManager.OnContinuePurchase`
  - `cih_smeltfestival_continue_purchase`
  - parameter: `step`

Portfolio phrasing:

> 연승형 콘텐츠에서 성공, 이탈, 이어하기 구매 지점을 분리해 난이도와 회복
> 행동을 함께 추적할 수 있도록 구현했습니다.

### World Cup Race

Purpose:
- Track bracket-style competition entry, round progress, elimination, and champion completion.

Implementation:
- `WorldCupRaceManager.SendStartEvent`
  - `cih_worldcup_start`
  - parameters: `race_num`, `entry_point`
- `WorldCupRaceManager.OnLevelClear`
  - `cih_worldcup_step_reached`
  - parameters: `race_num`, `step`
- `WorldCupRaceManager.HandleRoundLose`
  - `cih_worldcup_round_lose`
  - parameters: `race_num`, `current_wins`
- `WorldCupRaceManager.HandleRoundWin`
  - `cih_worldcup_champion`
  - parameter: `cycle_id`

Portfolio phrasing:

> 토너먼트형 경쟁 콘텐츠에서 라운드 진입, 승수 누적, 탈락, 우승 완료를
> 구분해 라운드별 이탈과 완료를 추적할 수 있도록 구현했습니다.

### IAP / Purchase Context

Purpose:
- Track where item purchase attempts happen in gameplay.

Implementation:
- `UI_IAPButton.FirebaseEvent`
  - `cih_purchase_item_stage`
  - parameters: `level`, `sku_id`

Portfolio phrasing:

> IAP 버튼 클릭/구매 흐름에 스테이지와 SKU 정보를 연결해 구매 시점의 플레이
> 맥락을 추적할 수 있도록 했습니다.

## Git History Evidence

Useful commits/branches found in the local repository:

- `789610da5` - `SDK 설치`
  - External SDK integration work, including ESI/GameAnalytics-related files.
- `c0d24b452` - `이벤트 추가`
  - Event tracking additions around EventManager, IAP, scenes, and stage completed UI.
- `c1033557a` - `전체 이벤트 수정`
  - Broad event correction work for live content.
- `574b5df7a` - `시즌패스, 패키지 추가`
  - Season pass/package feature work.
- `93f7f2b64` - `Add IAPPurchaseListener & update IAP/UI assets`
  - IAP purchase listener and UI integration.
- `6e11c7b61` - `Update IAP SKUs, spend tracking & UI prefabs`
  - SKU/spend tracking and purchase UI updates.

## What Not to Show

Do not publish:

- Raw revenue numbers
- Firebase project identifiers, App IDs, or API keys
- User IDs, device IDs, transaction IDs
- Internal partner dashboard screenshots
- Full private source files
- Git remote URLs or private branch screenshots if repository identity is sensitive

Safe alternatives:

- Use this case-study text.
- Use a simplified flow diagram.
- Use cropped code snippets with project identifiers removed.
- Use event-name tables without counts.
- Describe outcomes as "made measurable", "validated", "enabled funnel analysis", or "reduced event ambiguity".

## Suggested Portfolio Block

Title:

`Analytics-Ready Live Content`

Body:

> CatAway의 시즌패스, 경쟁 콘텐츠, IAP, 광고 보상 흐름에 Firebase/ThinkingData/
> Singular/GameAnalytics 이벤트를 연결했습니다. 이벤트명을 상수화하고 공통
> 라우터에서 SDK별 발사 대상을 선택하도록 구성해, 기능 코드에서는 start,
> step reached, fail, reward claim, purchase 같은 상태 변화만 명확히 호출하게
> 만들었습니다. 이를 통해 대시보드 수치 공개 없이도 라이브 운영자가 funnel,
> 이탈 지점, 보상 수령, 구매 맥락을 확인할 수 있는 클라이언트 기반을 제공했습니다.
