# 충남대학교 의과대학 의학교육실

Chungnam National University College of Medicine — Medical Education Office.

정적 HTML/CSS/JavaScript 기반 홈페이지입니다.

## 페이지 구성

| 페이지 | 파일 | 내용 |
| --- | --- | --- |
| 메인 | `index.html` | 인사말, 비전·미션, 활동 사진, 학생 행동강령, 최근 공지 |
| 교육과정 | `curriculum.html` | 6년제 교육과정 (의예과/본과/임상실습), 수업 방법 (PBL·TBL·Flipped) |
| 구성원 | `members.html` | 단체 사진, 보직 교원, 의학교육학 교실, 의학교육실 직원 |
| 우수 교원 | `faculty.html` | 우수 교육자상 수상 교원 소개 |
| 공지·자료실 | `board.html` | 공지/교육/행사/자료실 게시판 |

## 폴더 구조

```
cnu-medical-education/
├── index.html
├── curriculum.html
├── members.html
├── faculty.html
├── board.html
├── css/
│   └── style.css      # 충남대 톤 (네이비/골드/화이트)
├── js/
│   └── main.js        # 모바일 메뉴, 탭, 게시판 필터
└── images/            # 활동 사진, 단체 사진, 보직 교원 인물 사진
```

## 보직 교원 인물 사진 추가 방법

`images/` 폴더에 다음 파일을 추가하면 자동으로 표시됩니다.

| 교수님 | 파일명 |
| --- | --- |
| 이명원 의학교육실장 | `prof-lee-myungwon.jpg` |
| 정재욱 교육부학장 | `prof-jung-jaewook.jpg` |
| 홍부휘 의학과장 | `prof-hong-buhwi.jpg` |

권장: 정방형 240×240px 이상 (자동으로 원형 크롭됨). 파일이 없으면 골드 원형 + 이니셜 폴백이 표시됩니다.

## 로컬 실행

별도 빌드 없이 `index.html`을 브라우저로 직접 열거나, 정적 서버로 실행할 수 있습니다.

```bash
python -m http.server 8766
# http://localhost:8766
```
