# Unity Client Portfolio

This workspace is structured as a source-of-truth for a public web portfolio,
PDF export, and Notion archive.

## Files

- `index.html`: public portfolio page
- `resume.html`: resume page for browser PDF export
- `styles.css`: screen styles
- `print.css`: PDF/print styles
- `docs/capture-list.md`: screenshots and video clips to record
- `docs/private-info-checklist.md`: things to remove or anonymize
- `docs/project-inventory.md`: project notes and case-study source material
- `docs/resume-draft.md`: resume-ready Korean career summary and bullets
- `docs/cover-letter-draft.md`: Korean cover letter draft for job applications

## Workflow

1. Add safe screenshots to `assets/screenshots/`.
2. Add short gameplay/UI clips to `assets/video/`.
3. Update project metrics in `docs/project-inventory.md`.
4. Open `index.html` in a browser.
5. Export PDF with browser print:
   - Destination: Save as PDF
   - Layout: Portrait
   - Background graphics: enabled

No backend server is required. This can be hosted as static files on GitHub
Pages, Vercel, Netlify, Cloudflare Pages, or any simple web host.
