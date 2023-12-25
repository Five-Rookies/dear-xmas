# 멋쟁이 사자처럼 프론트엔드 스쿨 1기 Final Project 5조
<div align="center">
  <br />
  <img src="https://github.com/Five-Rookies/final-project/assets/84695884/d305a21a-7edb-4b0b-b036-bea2887d1786.png" width=100%>
  <br />
</div>


## 프로젝트 소개 및 개요

```
Dear, Xmas는 크리스마스의 감성과 특별한 순간을 함께 쌓아가는 웹 서비스입니다.
크리스마스와 관련된 컨텐츠를 즐길 수 있습니다.
```

🔗 배포링크 : https://dear-xmas.vercel.app/

⏰ 작업기간 : 23.12.01 ~ 23.12.25

</br>

## 목차
1. [팀원 소개](#Five-Rookies-팀원-소개)
2. [프로젝트 소개 및 개요](#프로젝트-소개-및-개요)
3. [기술 및 개발 환경](#기술-및-개발-환경)
4. [폴더 구조](#폴더-구조)
5. [주요 기능](#주요-기능)
</br>

## Five Rookies 팀원 소개

|**유재영**|**송수빈**|**윤선영**|**이준엽** |
| :------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src='public/assets/mimoticon/mimoticon-yoo.png' width="180px;"> | <img src="public/assets/mimoticon/mimoticon-song.png" width="180px;"> | <img src="public/assets/mimoticon/mimoticon-yoon.png" width="180px;"/> | <img src="public/assets/mimoticon/mimoticon-lee.png" width="180px;" > |
| [zxxng](https://github.com/zxxng)  | [ssb1565b](https://github.com/ssb1565b) | [seonyeongyoon](https://github.com/seonyeongyoon) | [dv-yeop920](https://github.com/dv-yeop920) |
|![FrontEnd](https://img.shields.io/badge/FrontEnd-DA3017)</br> ![Team%20Leader](https://img.shields.io/badge/-Team%20leader-0C412F) | ![FrontEnd](https://img.shields.io/badge/FrontEnd-DA3017)</br> ![UI/UX%20](https://img.shields.io/badge/-UI/UX-3FCF8E)  </br> | ![FrontEnd](https://img.shields.io/badge/FrontEnd-DA3017)</br> | ![FrontEnd](https://img.shields.io/badge/FrontEnd-DA3017)</br> |
| 로그인, 회원가입, 비밀번호 찾기<br>미들웨어 / 라우트 핸들러<br>프로필 수정 기능<br>댓글 수정 / 삭제 기능  | 실시간 채팅&영상 기능<br>GitHub 잔디 연동<br>카운트 다운 기능<br>검색 기능<br>댓글 좋아요 / 생성 기능<br>카카오톡 공유 기능  |드롭다운 헤더<br>랜덤 슬롯 머신<br>설문조사 애니메이션, 데이터 통계<br>무한스크롤 기능 | 댓글 좋아요 / crud<br>전체 디바운싱 처리<br>인터셉트 모달<br> 모임생성 기능<br>탭 기능<br>채팅 렌더링, 무한스크롤 에러해결  | 
<br>



<!-- ## 🧑🏻‍💻 역할 분담 -->

<br>


## 기술 및 개발 환경

##### Front-end
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" />  <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white" />  <img src="https://img.shields.io/badge/Sass-CC6699?style=flat&logo=sass&logoColor=white"/> <img src="https://img.shields.io/badge/Zustand-A9225C?style=flat&logo=&logoColor=white"/> 
##### Back-end
<img src="https://img.shields.io/badge/Supabase-3FCF8E?style=flat&logo=supabase&logoColor=white"/> 

##### Design
<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=Figma&logoColor=white"/> 

##### 협업
<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/> <img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/> <img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white"/> <img src="https://img.shields.io/badge/Discord-5865F2?style=flat&logo=Discord&logoColor=white"/>

##### 배포
<img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white"/> 

<br>

### 🛠 개발 환경
코드 충돌을 줄이고 브랜치 관리가 용이한 **Git Flow** 방식을 사용하여 기능 브랜치를 만들고<br>
각자 작업 브랜치를 따로 생성하여 작업하고, 기능 브랜치로 PR을 올립니다.<br>
PR은 코드 리뷰 담당자를 지정하여 검토 후 Merge를 진행합니다.


### 📚 Branch
`main` : 배포 브랜치 <br/>
`develop` : 메인 브랜치 배포전 테스트 브랜치 <br/>
`feat/개발명` : 기능 개발 브랜치 ex) feat/Askquestion  


### 🙏🏼 커밋 컨벤션
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

## 폴더 구조
<details>
<summary>📁</summary>
<div>


```
src
├── app
│   ├── (common)
│   │   ├── _components
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MainMenu.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── ScrollBtn.module.scss
│   │   │   ├── ScrollBtn.tsx
│   │   │   ├── SearchInput.tsx
│   │   │   ├── footer.module.scss
│   │   │   └── header.module.scss
│   │   ├── developers
│   │   │   ├── Member.tsx
│   │   │   ├── developers.module.scss
│   │   │   └── page.tsx
│   │   ├── layout
│   │   └── search
│   │       ├── _components
│   │       │   ├── NoResult.tsx
│   │       │   └── SearchList.tsx
│   │       ├── page.tsx
│   │       └── search.module.scss
│   ├── (meetUp)
│   │   ├── @createMeetupModal
│   │   │   ├── (.)detail
│   │   │   │   └── [id]
│   │   │   │       └── meetupModal
│   │   │   │           └── page.tsx
│   │   │   └── default.tsx
│   │   ├── _components
│   │   │   └── _meetupModal
│   │   │       ├── _datePicker
│   │   │       │   └── DatePicker.tsx
│   │   │       └── _meetupModal
│   │   │           ├── MeetupModal.tsx
│   │   │           └── meetupModal.module.scss
│   │   ├── detail
│   │   │   └── [id]
│   │   │       ├── _components
│   │   │       │   ├── Comment.tsx
│   │   │       │   ├── CommentList.tsx
│   │   │       │   ├── CreateComment.tsx
│   │   │       │   ├── CreateMeetUpButton.tsx
│   │   │       │   ├── DetailHeader.tsx
│   │   │       │   └── RelatedVedio.tsx
│   │   │       ├── detail.module.scss
│   │   │       ├── error.tsx
│   │   │       ├── layout.tsx
│   │   │       ├── meetupModal
│   │   │       │   └── page.tsx
│   │   │       └── page.tsx
│   │   ├── layout.tsx
│   │   ├── live
│   │   │   ├── _components
│   │   │   │   ├── LiveButton.tsx
│   │   │   │   ├── LiveChat.tsx
│   │   │   │   └── LiveStream.tsx
│   │   │   ├── error.tsx
│   │   │   ├── live.module.scss
│   │   │   └── page.tsx
│   │   └── meetup
│   │       ├── _components
│   │       │   ├── MeetupBox.tsx
│   │       │   ├── MeetupList.tsx
│   │       │   ├── MyMeetupList.tsx
│   │       │   ├── VideoList.tsx
│   │       │   └── _tab
│   │       │       ├── MeetupTabButtons.tsx
│   │       │       ├── MeetupTabPage.tsx
│   │       │       └── TabLoading.tsx
│   │       ├── layout.tsx
│   │       ├── meetup.module.scss
│   │       ├── meetupList
│   │       │   └── page.tsx
│   │       ├── myMeetupList
│   │       │   └── page.tsx
│   │       └── page.tsx
│   ├── (sign)
│   │   ├── _components
│   │   │   ├── SignInput.tsx
│   │   │   └── sign.module.scss
│   │   ├── resetpassword
│   │   │   └── page.tsx
│   │   ├── signIn
│   │   │   ├── findPassword
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── signUp
│   │       └── page.tsx
│   ├── _components
│   │   ├── @createSurveyModal
│   │   │   ├── (..)surveyModal
│   │   │   │   ├── page.tsx
│   │   │   │   └── surveyModal
│   │   │   │       └── _components
│   │   │   │           ├── SurveyModal.tsx
│   │   │   │           └── surveyModal.module.scss
│   │   │   └── detault.tsx
│   │   ├── ChristmasCounter.tsx
│   │   ├── Main.tsx
│   │   ├── MainMeetupList.tsx
│   │   ├── MeetupList.tsx
│   │   ├── Modal.module.scss
│   │   ├── Slot.tsx
│   │   ├── SlotContent.tsx
│   │   ├── SlotModal.tsx
│   │   ├── Survey.tsx
│   │   ├── SurveyGraph.tsx
│   │   └── SurveyModal.tsx
│   ├── auth
│   │   ├── callback
│   │   │   └── route.ts
│   │   ├── login
│   │   │   └── route.ts
│   │   ├── logout
│   │   │   └── route.ts
│   │   └── sign-up
│   │       └── route.ts
│   ├── datepicker.scss
│   ├── favicon.ico
│   ├── globalButton.module.scss
│   ├── globals.scss
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── page.module.scss
│   ├── page.tsx
│   └── thems.scss
├── components
├── hooks
│   ├── useInfiniteScroll.ts
│   ├── useLoadMore.ts
│   └── useScrollBottom.ts
├── middleware.ts
├── status
│   └── store.ts
├── type
│   ├── Component.ts
│   ├── SupabaseResponse.ts
│   ├── YoutubeApiResponse.ts
│   └── supabase.ts
└── utils
    ├── apiRequest
    │   ├── commentsApiRequest.ts
    │   ├── defaultApiSetting.ts
    │   ├── defaultServerApiSetting.ts
    │   ├── likeApiRequest.ts
    │   ├── liveApiRequest.ts
    │   ├── meetupApiRequestClient.ts
    │   ├── meetupApiRequestServer.ts
    │   ├── profileApiRequest.ts
    │   ├── signUserSupabase.ts
    │   └── surveyApiRequest.ts
    ├── calculateTimeUntilDay.ts
    ├── cookieClient.ts
    ├── cookieServer.ts
    ├── relativeDate.ts
    └── youtubRequest
        ├── youtubeApiRequest.ts
        ├── youtubeJsonRequest.ts
        └── youtubeRequest.ts
```
</div>
</details>


- `app/page` : 메인 페이지
- `detail` : 모임 생성 & 비디오 상세 페이지 
- `developers` : 개발자 소개 페이지
- `search` : 검색 페이지
- `signIn` : 로그인 페이지
- `signUp` : 회원가입 페이지
- `meetup` : 모임 리스트 페이지
- `live` : 실시간 영상 시청 & 채팅 페이지
- `app/loading` : 로딩 페이지
- `app/not-found` : 에러 페이지

<br>

## 주요 기능
### ⭐️ 공통
* 다크모드
* 이미지 레이지 로딩
* 무한 스크롤
* API 통신 불가시 대체 데이터 활용
* 운영/개발서버 각각의 데이터 테이블 활용
### 📃 메인 페이지
* 크리스마스 D-Day 확인
* 오늘 라이브 예정인 영상목록 조회
* 비디오 상세 페이지 이동
* 랜덤 슬롯
* 랜덤 슬롯 결과 카카오톡 공유
* 크리스마스 설문 통계
### 🖼 상세 페이지
* 클릭한 비디오 상세 조회 및 재생
* 해당 채널 관련 영상 리스트 조회 및 클릭시 링크 이동
* 댓글 CRUD 및 좋아요
* 모임 생성 가능 모달(인터셉트,페러렐 라우트)
* 모달에 사항을 입력 하고 모임 생성
### 🔍 검색 페이지
* 키워드 포함 게시물 조회
* 비디오 상세 페이지 이동
### 👩‍👩‍👧‍👦 개발자 소개 페이지
* 기술 스택 소개
* 멤버 소개
### 🔒 로그인 / 회원가입
* 로그인
* 회원가입
* 비밀번호 찾기 및 수정
* 유효성 검사
* 토큰 검증
### 🕰️ 실시간 모임 참여 페이지
* 방장이 설정한 시간에 영상 자동 재생
* 종료했을때 함께 보고있던 사람들도 촛불모임 페이지로 이동
* 소켓을 활용한 실시간 유저 채팅 기능
* 채팅 대화창에 동영상 시간을 입력 => 클릭시 동영상 시간대 이동
### ✉️ 촛불 모임 조회 페이지
* 촛불모임 페이지 탭 구현
* 비디오 영상 리스트 조회
* 현재 모집중인 모임 리스트 조회
* 내 모임 리스트 조회 => 내가 생성하거나 참여한 모임 조회
* 모임 참가 신청
* 모임 게시글에 좋아요 기능
  
<br>

## 구현 화면
<table>
<tr>
    <td align="center"> <a href="https://dear-xmas.vercel.app/signUp">회원가입</a> </td>
     <td align="center"><a href="https://dear-xmas.vercel.app/signIn">로그인</a>  </td>
   </tr>
   <tr>
      <td align="center"><img src="public/assets/readme/SignUp.gif" width="350"> </td>
       <td align="center"><img src="public/assets/readme/SignIn.gif" width="350"> </td>
   </tr>   
   <tr>
     <td align="center"><a href="https://dear-xmas.vercel.app/signIn/findPassword">비밀번호 찾기</a>  </td>
    <td align="center"> <a href="https://dear-xmas.vercel.app/detail/PmoZQTp_9dI/meetupModal">인터셉트 라우팅을 이용한 모달창</a> </td>
   </tr>
   <tr>
      <td align="center"><img src="public/assets/readme/ResetPassword.gif" width="350"> </td>
       <td align="center"><img src="public/assets/readme/Modal.gif" width="350"> </td>
   </tr>
   <tr>
    <td align="center"> <a href="https://dear-xmas.vercel.app/live?meetup_id=86">실시간 채팅</a> </td>
     <td align="center"><a href="https://dear-xmas.vercel.app/live?meetup_id=86">라이브 종료하기</a>  </td>
   </tr>
   <tr>
      <td align="center"><img src="public/assets/readme/Chatting.gif" width="350"> </td>
       <td align="center"><img src="public/assets/readme/LiveEnd.gif" width="350"> </td>
   </tr>
   <tr>
    <td align="center"> <a href="https://dear-xmas.vercel.app/live?meetup_id=86">현재 재생시간 공유</a> </td>
     <td align="center"><a href="https://dear-xmas.vercel.app/developers">Github 잔디 연동</a>  </td>
   </tr>
   <tr>
      <td align="center"><img src="public/assets/readme/LiveVideo.gif" width="350"> </td>
       <td align="center"><img src="public/assets/readme/Develop.gif" width="350"> </td>
   </tr>
   <tr>
    <td align="center"> <a href="https://dear-xmas.vercel.app/">설문조사 통계</a> </td>
     <td align="center"><a href="https://dear-xmas.vercel.app/">랜덤 슬롯</a>  </td>
   </tr>
   <tr>
      <td align="center"><img src="public/assets/readme/Servey.gif" width="350"> </td>
       <td align="center"><img src="public/assets/readme/Slot.gif" width="350"> </td>
   </tr>
</table>







