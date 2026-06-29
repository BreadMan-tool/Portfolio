# Capture List

Use short clips where possible. 8-15 seconds is enough for most UI/system demos.
Avoid exposing real revenue numbers, SDK keys, internal dashboards, user IDs, or unreleased confidential content.

## CatAway

1. Season Pass / Lucky Pass
   - Pass main screen
   - Reward claim flow
   - Purchase state or premium/unlocked visual state
   - Renewal or V2 migration behavior if it can be shown safely

2. Competition Content
   - Entry point
   - Main competition UI
   - Ranking/progress/reward flow
   - UI feedback animation

3. External SDK / Analytics Proof
   - Safe event-debug screen only if no keys or internal IDs are visible
   - A sanitized Firebase/GameAnalytics chart screenshot
   - Integration diagram can replace a real dashboard screenshot

4. UI Polish
   - Popup animation
   - Reward animation
   - Event banner/lobby entry UI

## Toy Commando

1. Lobby Product Button Refactor
   - Several product buttons shown using the same reusable structure
   - SO-driven data changes if visible in Unity Inspector with sensitive data hidden
   - Before/after code structure screenshot if safe

2. Tutorial
   - Highlight/guide overlay
   - Step transition
   - Completion flow

3. Red Dot System
   - Red dot appearing/disappearing based on claimable state
   - Multiple lobby buttons controlled by one system

4. Mythic Box
   - Box entry point
   - Reward reveal flow
   - UI animation

## MineCat

1. Overall Gameplay Loop
   - Mining/combat/collection loop
   - HUD and progression

2. Systems
   - Weapon panel
   - Pet panel
   - Collection panel
   - Rebirth panel
   - Shop and ad reward
   - Offline reward popup

3. Architecture Proof
   - Folder structure of `Assets/@Scripts`
   - Breadmorecore package structure
   - One clean code example using Breadmorecore

4. UI Foundation
   - Panel/popup navigation
   - Object pooling behavior if visible
   - Tutorial and Red Dot flow
