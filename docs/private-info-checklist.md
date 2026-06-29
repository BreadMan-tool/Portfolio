# Private Info Checklist

Do not publish the original company project folder.

## Remove or Hide

- Keystores, signing keys, certificates, provisioning profiles
- `.env`, API keys, SDK app IDs, client secrets
- Firebase plist/json files and service account files
- Internal server URLs, staging endpoints, admin URLs
- Real user IDs, device IDs, ad IDs, transaction IDs
- Revenue dashboards with raw confidential numbers
- Unreleased content, hidden roadmap features, internal tool screens
- Company-only plugins or paid assets if license terms prohibit redistribution
- `Library/`, `Temp/`, `Logs/`, `obj/`, build output folders
- Git history if it contains sensitive messages, names, branches, or secrets

## Safe Alternatives

- Use cropped screenshots.
- Blur or replace numbers with ranges or relative changes.
- Show diagrams instead of internal dashboards.
- Use short code excerpts, not full private source dumps.
- Describe impact as percentage or qualitative result when exact numbers are confidential.
- Keep Notion archive private when it contains detailed logs.

## Current Files Already Spotted

- `/Users/bmore/Projects/ActionFit/AF_ToyCommando/toycommando.keystore`
- `GoogleService-Info.plist` files
- Unity `Library/`, `Temp/`, `Logs/`, `obj/` folders
