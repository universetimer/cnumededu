# 충남대학교 의과대학 의학교육실

Chungnam National University College of Medicine — Medical Education Office.

정적 HTML/CSS/JavaScript 기반 홈페이지입니다. https://cnumededu.com

## 페이지 구성

| 페이지 | 파일 | 내용 |
| --- | --- | --- |
| 메인 | `index.html` | 인사말, 비전·미션, 협약 뉴스, 활동 사진, 학생 행동강령, 최근 공지 |
| 교육과정 | `curriculum.html` | 6년제 교육과정 (의예과/본과/임상실습), 수업 방법 (PBL·TBL·Flipped) |
| 구성원 | `members.html` | 단체 사진, 보직 교원, 역대 보직자, 의학교육학 교실, 직원, 담당업무·연락처 |
| 우수 교원 | `faculty.html` | 우수 교육자상 수상 교원 소개 |
| 공지·자료실 | `board.html` | 공지/교육/행사/자료실 게시판 (PDF 다운로드 지원) |
| 방명록 | `guestbook.html` | Giscus 기반 댓글 (GitHub 로그인) |
| 워크숍 — 신임교수 | `workshop-faculty-2026.html` | 2026 상반기 신임교수 워크숍 상세 |
| 워크숍 — AI MEQ | `workshop-meq-2026.html` | AI 활용 MEQ 채점 워크숍 상세 |

## 폴더 구조

```
cnu-medical-education/
├── index.html              # 메인
├── curriculum.html         # 교육과정
├── members.html            # 구성원
├── faculty.html            # 우수 교원
├── board.html              # 공지·자료실 (다운로드 링크)
├── guestbook.html          # 방명록 (Giscus)
├── workshop-faculty-2026.html
├── workshop-meq-2026.html
├── css/style.css           # 충남대 톤 (네이비/골드/화이트)
├── js/main.js              # 모바일 메뉴, 탭, 게시판 필터
├── images/                 # 사진 (활동·단체·보직 교원)
└── files/                  # 게시판에서 다운로드되는 PDF
```

## 자료실(공지·자료실)에 파일 올리는 방법

`files/` 폴더에 PDF/이미지/문서를 추가하고, `board.html`의 게시판 표에 새 행을 추가합니다.

```html
<tr data-cat="data">
  <td class="col-no">32</td>
  <td class="col-cat"><span class="tag tag-data">자료</span></td>
  <td class="col-title">
    <a href="files/내가-올린-파일.pdf" download>제목</a>
    <a href="files/내가-올린-파일.pdf" class="dl-btn" download>📥 PDF</a>
  </td>
  <td class="col-date">2026.05.27</td>
  <td class="col-views">0</td>
</tr>
```

`data-cat` 값: `notice` / `edu` / `event` / `data`

## 방명록 활성화 (Cloudflare KV 연결 1회)

방명록은 Cloudflare Pages Functions(`functions/api/guestbook.js`) + KV로 동작합니다. 사이트 코드는 이미 모두 작성되어 있으므로 **Cloudflare 대시보드에서 KV 네임스페이스만 한 번 연결**하면 즉시 작동합니다.

1. **KV 네임스페이스 생성**
   Cloudflare 대시보드 → Workers & Pages → 좌측 `KV` → `Create a namespace` → 이름 `cnumededu-guestbook`
2. **Pages 프로젝트에 바인딩**
   Workers & Pages → `cnumededu` 프로젝트 → Settings → Functions → KV namespace bindings → Add binding
   - Variable name: `GUESTBOOK`
   - KV namespace: `cnumededu-guestbook`
3. **재배포**
   Deployments → 최신 배포 옆 `Retry deployment` (30초 후 작동)

(선택) 관리자 삭제 기능: `Settings → Environment variables` → Production → `ADMIN_TOKEN` 추가. `DELETE /api/guestbook?id=...` 호출 시 `X-Admin-Token` 헤더로 인증.

### API 엔드포인트

| Method | Path | 설명 |
| --- | --- | --- |
| GET | `/api/guestbook` | 메시지 목록 (최신순) |
| POST | `/api/guestbook` | 메시지 등록 (`{name, message}`) — IP당 분당 3회 제한 |
| DELETE | `/api/guestbook?id=...` | 관리자 삭제 (ADMIN_TOKEN 필요) |

## 보직 교원 인물 사진

`images/` 폴더의 파일명을 따릅니다.

| 교수님 | 파일명 |
| --- | --- |
| 이명원 의학교육실장 | `prof-lee-myungwon.jpg` |
| 정재욱 교육부학장 | `prof-jung-jaewook.jpg` |
| 홍부휘 의학과장 | `prof-hong-buhwi.jpg` |
| 정성수 前 의학교육실장 | `prof-jung-seongsoo.jpg` |
| 이주희 前 의학교육실장 | `prof-lee-juhee.jpg` |
| 이영 前 교육부학장 | `prof-lee-young.jpg` |

권장: 정방형 240×240px 이상 (자동으로 원형 크롭). 파일이 없으면 골드 원형 + 이니셜 폴백이 표시됩니다.

## OG 이미지(링크 미리보기)

`images/og-image.png` (1200×630) — 사람 얼굴 없는 텍스트 기반 브랜드 이미지.
재생성: `python generate_og.py`

## 로컬 실행

빌드 단계 없음. 정적 파일이라 그대로 서빙합니다.

```bash
python -m http.server 8766
# http://localhost:8766
```

## 배포

`main` 브랜치에 푸시하면 [Cloudflare Pages](https://dash.cloudflare.com/)가 자동으로 https://cnumededu.com 으로 배포합니다.
