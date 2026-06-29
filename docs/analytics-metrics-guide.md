# Analytics Metrics Guide

Use this guide to collect safe, portfolio-ready evidence from Firebase and
GameAnalytics. Do not publish raw confidential revenue, user identifiers, SDK
keys, or internal dashboards.

## Firebase / Google Analytics

### Where to Look

1. Firebase Console
   - Project > Analytics Dashboard
   - Good for quick overview: active users, engagement, retention, monetization cards.

2. Google Analytics 4
   - Reports > Engagement > Events
   - Reports > Monetization
   - Explore > Free form or Funnel exploration
   - Good for deeper event, funnel, and cohort analysis.

3. DebugView
   - Good for proving that SDK events were implemented correctly.
   - Use only for internal validation, not public screenshots with device IDs visible.

### CatAway Metrics

Season Pass / Lucky Pass:
- Pass screen view count and unique users
- Purchase button click count
- Purchase success count
- Purchase conversion rate
- Reward claim count
- Premium reward claim count
- Refund or purchase failure count if tracked

Competition Content:
- Competition lobby entry users
- Match/challenge start count
- Completion count
- Reward claim count
- Repeat participation rate

SDK / Stability:
- Crash-free users
- ANR rate
- Event count before/after SDK release
- Ad impression revenue if ad_impression is implemented
- Purchase revenue if purchase events are implemented

### CatAway Existing Events from Provided List

These are especially useful for the portfolio because they already map to
live-service work.

Season Pass:
- `cih_seasonpass_tier_reached`
  - Parameters: `tier`, `pass_type`
  - Use for: tier reach distribution, free/vip/premium engagement, season-pass progression funnel.
- `cih_seasonpass_bonusbank_received`
  - Parameters: `pass_type`
  - Use for: bonus-bank reward claim users by month.
  - Note: verify whether this event exists in Firebase because the list marks it as newly needed.

Competition / Event Content:
- `cih_streakrace_start`
- `cih_streakrace_step_reached`
- `cih_streakrace_reward_claim`
- `cih_uforace_start`
- `cih_uforace_step_reached`
- `cih_uforace_round_lose`
- `cih_mysterygem_stage_complete`
- `cih_mysterygem_quest_complete`
- `cih_smeltfestival_step_reached`
- `cih_smeltfestival_streak_break`
- `cih_smeltfestival_continue_purchase`
- `cih_worldcup_start`
- `cih_worldcup_step_reached`
- `cih_worldcup_round_lose`
- `cih_worldcup_champion`

Purchases / Revenue:
- `__iap__`
- `cih_purchase_1`
- `cih_purchase_5`
- `cih_1000coin_purchase`
- `cih_5000coin_purchase`
- `cih_treasure_mine_purchase`

Ads:
- `__ADMON_USER_LEVEL_REVENUE__`
- `cih_is_watch_{count}`

Progression / Core:
- `cih_attempt_All`
- `cih_levelclear_All`
- `cih_levelclear_{level}`
- `cih_stage_continue`
- `cih_meta_country_complete`

Items / Economy:
- `cih_item_purchase_{itemid}`
- `cih_item_purchase_gold_{itemid}`
- `cih_item_use_{itemid}`
- `cih_bubble_use`

Card Content:
- `cih_card_collected`
- `cih_card_set_complete`
- `cih_card_collection_complete`
- `cih_card_bouns_reward100`
- `cih_card_bouns_reward250`
- `cih_card_bouns_reward500`

For Firebase screenshots, prioritize:
- `cih_seasonpass_tier_reached`
- `cih_streakrace_start` -> `cih_streakrace_step_reached` -> `cih_streakrace_reward_claim`
- `cih_uforace_start` -> `cih_uforace_step_reached` -> `cih_uforace_round_lose`
- `cih_smeltfestival_step_reached` -> `cih_smeltfestival_streak_break` -> `cih_smeltfestival_continue_purchase`
- `__iap__` or purchase events
- ad revenue/watch events

Portfolio-safe phrasing:
- "Maintained and extended live-service features for the company's top revenue title."
- "Implemented pass, competition, reward, and SDK event flows used in live operation."
- "Validated analytics events across Firebase/GameAnalytics and coordinated SDK integration with external partners."

## GameAnalytics

### Where to Look

1. Dashboards
   - Use predefined dashboards for core game health.
   - Create custom dashboards for pass, competition, tutorial, red dot, and shop flows.

2. Explore Tool
   - Build charts using Design, Business, Resource, Progression, Error, Health, or Impression events.
   - Use filters for version, country, platform, build, and date range.

3. Funnels
   - Use for tutorial, shop, season pass, competition, and reward flows.

### Event Types to Use

- Design events: custom game interactions such as tutorial steps, feature entry, red dot clicks, UI usage.
- Business events: IAP purchase flow and revenue if configured.
- Resource events: virtual currency source/sink flow.
- Progression events: stage, level, challenge, or competition progress.
- Error events: client errors or handled exceptions.
- Health events: FPS/performance if configured.
- Impression events: ad impressions and ad monetization if configured.

### Toy Commando Metrics

Lobby Product Refactor:
- Product button impression count
- Product click-through rate
- Purchase attempt/success count by product type
- Number of product variants supported by the shared structure
- Reduced duplicate code or reduced setup steps, if measurable

Tutorial:
- Tutorial step 1 entry
- Each step completion
- Tutorial full completion rate
- Drop-off step

Red Dot:
- Red dot shown count
- Red dot click count
- Claim/action completion count

Mythic Box:
- Box view count
- Open attempt count
- Open success count
- Reward reveal count

## What to Screenshot for Portfolio

Use cropped or sanitized screenshots:
- Funnel chart with event names visible and sensitive numbers blurred
- Retention or engagement chart with exact revenue hidden
- Event list showing implemented events
- Debug/validation capture with device IDs hidden
- Custom dashboard showing the flow you designed

Use relative numbers when confidential:
- "purchase conversion improved after pass renewal"
- "reduced duplicated product-button implementations"
- "tracked tutorial drop-off by step"
- "validated SDK event collection before release"
