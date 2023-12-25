# 멋쟁이 사자처럼 프론트엔드 스쿨 1기 Final Project 5조
## 목차
1. [팀원 소개](#🚀-Five-Rookies-팀원-소개)
2. [프로젝트 소개 및 개요](#프로젝트-소개-및-개요)
3. [기술 및 개발 환경](#🛠️-기술-및-개발-환경)
4. [폴더 구조](#🗂️-폴더-구조)
5. [주요 기능](#🔍-주요-기능)
</br>

##🚀 Five Rookies 팀원 소개

|**유재영**|**송수빈**|**윤선영**|**이준엽** |
| :------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src='public/assets/mimoticon/mimoticon-yoo.png' width="180px;"> | <img src="public/assets/mimoticon/mimoticon-song.png" width="180px;"> | <img src="public/assets/mimoticon/mimoticon-yoon.png" width="180px;"/> | <img src="public/assets/mimoticon/mimoticon-lee.png" width="180px;" > |
| [zxxng](https://github.com/zxxng)  | [ssb1565b](https://github.com/ssb1565b) | [seonyeongyoon](https://github.com/seonyeongyoon) | [dv-yeop920](https://github.com/dv-yeop920) |
|![FrontEnd](https://img.shields.io/badge/FrontEnd-DA3017)</br> ![Team%20Leader](https://img.shields.io/badge/-Team%20leader-0C412F) | ![FrontEnd](https://img.shields.io/badge/FrontEnd-DA3017)</br> | ![FrontEnd](https://img.shields.io/badge/FrontEnd-DA3017)</br> | ![FrontEnd](https://img.shields.io/badge/FrontEnd-DA3017)</br> |

<br>

##프로젝트 소개 및 개요
>**Dear, Xmas**는 크리스마스의 감성과 특별한 순간을 **함께 쌓아가는** 웹 서비스입니다.
>
>크리스마스와 관련된 컨텐츠를 즐길 수 있습니다.

</br>

🔗 1차 배포 URL : https://dear-xmas-first-build.vercel.app/

</br>
<!-- ## 🧑🏻‍💻 역할 분담 -->

<br>


##🛠️ 기술 및 개발 환경

✨ Front-end : <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" />  <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white" />  <img src="https://img.shields.io/badge/Sass-CC6699?style=flat&logo=sass&logoColor=white"/> <img src="https://img.shields.io/badge/Zustand-A9225C?style=flat&logo=&logoColor=white"/> 

✨ Back-end : <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=flat&logo=supabase&logoColor=white"/> 

✨ Design : <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=Figma&logoColor=white"/> 

✨ 협업 : <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/> <img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/> <img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white"/> <img src="https://img.shields.io/badge/Discord-5865F2?style=flat&logo=Discord&logoColor=white"/>

✨ 배포 : <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white"/> 

<br>

### [개발 환경]
코드 충돌을 줄이고 브랜치 관리가 용이한 **Git Flow** 방식을 사용하여 기능 브랜치를 만들고<br>
각자 작업 브랜치를 따로 생성하여 작업하고, 기능 브랜치로 PR을 올립니다.<br>
PR은 코드 리뷰 담당자를 지정하여 검토 후 Merge를 진행합니다.


### [커밋 컨벤션]
|커밋 유형|설명|
|---------|----|
|Feat|새로운 기능 구현, 특징 추가|
|Fix|버그해결, 수정|
|Refactor|리팩토링|
|Design|UI/스타일 파일 추가/수정|
|Move|파일, 코드의 이동|
|Rename|파일명, 디렉토리명 변경|
|Remove|어떤 요소 혹은 파일을 삭제했을 때|
|Docs|문서 관련 작업|
|Chore|자잘한 수정에 대한 커밋|
|Add|npm 등 설치 실행 관련|

<br>

##🗂️ 폴더 구조
```
src
├── app
│   ├── detail
│   │   └── [id]
│   │       ├── DetailHeader.tsx
│   │       ├── RelatedVedio.tsx
│   │       ├── detail.module.scss
│   │       └── page.tsx
│   ├── developers
│   │   ├── Member.tsx
│   │   ├── developers.module.scss
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.scss
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── page.module.scss
│   ├── page.tsx
│   ├── search
│   │   ├── NoResult.tsx
│   │   ├── page.tsx
│   │   └── search.module.scss
│   ├── signIn
│   │   ├── findPassword
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── signUp
│   │   ├── page.tsx
│   │   └── sign.module.scss
│   └── thems.scss
├── components
│   ├── ScrollBtn.module.scss
│   ├── ScrollBtn.tsx
│   ├── detail
│   │   ├── Comment.tsx
│   │   ├── CommentList.tsx
│   │   └── CreateComment.tsx
│   ├── home
│   │   ├── ChristmasCounter.tsx
│   │   └── VideoList.tsx
│   └── layout
│       ├── Header.tsx
│       ├── HeaderInput.tsx
│       └── header.module.scss
├── hooks
│   └── useYoutubeApiRequest.ts
├── status
│   └── store.ts
├── type
│   ├── Component.ts
│   ├── SupabaseResponse.ts
│   └── YoutubeApiResponse.ts
└── utils
    ├── apiRequest
    │   └── commentsApiRequest.ts
    └── relativeDate.ts
```

- `app/page` : 메인 페이지
- `detail` : 비디오 상세 페이지
- `developers` : 개발자 소개 페이지
- `search` : 검색 페이지
- `signIn` : 로그인 페이지
- `signUp` : 회원가입 페이지
- `app/loading` : 로딩 페이지
- `app/not-found` : 에러 페이지

<br>

##🔍 주요 기능
### ⭐️ 공통
* 다크모드
* 이미지 레이지 로딩
* 무한 스크롤
* API 통신 불가시 대체 데이터 활용
* 운영/개발서버 각각의 데이터 테이블 활용
### 📃 메인 페이지
* 크리스마스 D-Day 확인
* 인기 게시물 조회
* 비디오 상세 페이지 이동
### 🖼 상세 페이지
* 클릭한 비디오 상세 조회
* 해당 채널 관련 영상 리스트 조회
* 댓글 생성, 수정, 삭제, 좋아요(준비중)
### 🔍 검색 페이지
* 키워드 포함 게시물 조회
* 비디오 상세 페이지 이동
### 👩‍👩‍👧‍👦 개발자 소개 페이지
* 기술 스택 소개
* 멤버 소개
### 🔒 로그인 / 회원가입 (준비중)
* 로그인
* 회원가입
* 유효성 검사
* 토큰 검증

