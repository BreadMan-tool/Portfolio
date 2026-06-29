# GitHub Pages 배포 가이드

이 포트폴리오는 정적 HTML/CSS 사이트라 별도 서버가 필요 없습니다. GitHub Pages에 올리면 항상 열리는 웹 포트폴리오로 사용할 수 있습니다.

## 1. 새 GitHub 저장소 만들기

GitHub에서 새 repository를 만듭니다.

추천 이름:

```text
portfolio
```

Public으로 만들면 GitHub Pages 설정이 간단합니다.

## 2. Portfolio 폴더를 Git 저장소로 만들기

현재 `/Users/bmore/Documents/Portfolio` 폴더 안에서 실행합니다.

```bash
cd /Users/bmore/Documents/Portfolio
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/<github-id>/portfolio.git
git push -u origin main
```

`<github-id>`는 본인 GitHub 아이디로 바꿉니다.

## 3. GitHub Pages 켜기

GitHub repository 페이지에서:

```text
Settings -> Pages -> Build and deployment
```

설정:

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

저장하면 몇 분 뒤 아래 주소로 열립니다.

```text
https://<github-id>.github.io/portfolio/
```

## 4. PDF 사용

웹에서 `PDF` 버튼을 누르면 `portfolio-print.html`로 이동합니다.
그 페이지에서 `Print / Save PDF`를 누르고 브라우저 인쇄 창에서 `Save as PDF`를 선택합니다.

## 5. 이후 수정 배포

파일을 수정한 뒤:

```bash
git add .
git commit -m "Update portfolio"
git push
```

GitHub Pages가 자동으로 갱신됩니다.
