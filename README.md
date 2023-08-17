# 프로젝트 소개

> JavaScript만으로 노션 구현하기
> 

이번 프로젝트에서는 Vanilla JavaScript만으로 SPA형태의 노션을 구현합니다. 간단한 기능들로 Simple Notion을 구현함으로써, 자바스크립트의 활용 능력을 높이고, SPA 개념에 대해서 학습합니다.

## 세부 구현 사항

1. 화면 좌측 사이드바에서 생성한 문서 목록을 확인할 수 있습니다.
2. 특정 문서를 클릭하면 오른쪽 편집기 영역에서 글을 편집할 수 있습니다.
3. 새로운 문서를 만들거나, 이미 생성한 문서의 새로운 하위 문서를 만들 수 있습니다.
4. localStorage를 이용해서 편집 내용을 자동 저장합니다.
5. History API를 이용해서 SPA형태로 구현합니다.

### App

- `DocumentPage`, `EditPage`를 자식 컴포넌트로 가지며, 전체 화면을 렌더링합니다.
- history API를 이용해서 url에 따른 각각의 화면을 렌더링합니다.
    - `/` : 루트 url일 경우, 기본 페이지를 보여줍니다
    - `/documents/:id` : 특정 문서의 제목과 내용을 보여줍니다.

### DocumentPage

사이드바 컴포넌트로, 전체 생성한 문서 목록을 볼 수 있습니다.

- `DocumentHeader`
    
    헤더 컴포넌트로, 워크 스페이스 문구를 보여줍니다.
    
- `Documents`
    
    전체 문서 목록을 보여줍니다.
    
    - 재귀함수를 통해 하위 문서까지 포함하여 목록을 생성합니다.
    - `document-section` 영역은 부모 문서에 해당하는 `document-block`과 하위 문서를 감싸는 `document-list-block`을 포함하고 있습니다.
        
        ```
        <div class="document-section">
        	<div class="document-block"></div>
        	<div class="document-list-block"></div>
        </div>
        ```
        
    - `document-block`은 세 가지 기능의 버튼을 가지고 있습니다.
        - `display-btn` : 하위 목록 펼침. 펼침 여부는 localStorage에 저장합니다.
        - `remove-btn` : 문서 삭제
        - `new-btn` : 새 문서 생성
    - 새로운 문서를 생성할 때는 낙관적 업데이트를 통해 먼저 태그 요소를 보여주고, API요청을 보냅니다. (documentUtil.js)
- `DocumentFooter`
    
    Footer컴포넌트로, 새 문서 생성하는 버튼이 있습니다.

### EditorPage

편집 기능을 갖춘 화면을 렌더링합니다. `Header`, `Editor`에서 `onEditing()`함수를 호출할 때마다 `autoSave()`를 통해 서버에 자동저장합니다.

- `Topbar`
    
    `delete` 버튼을 포함하고 있습니다.
    
- `Header`
    
    문서의 title을 작성하는 공간입니다. `input` 태그를 이용하여 입력이 들어오는 이벤트가 발생할 때마다 `onEditing()`을 호출합니다.
    
    - `setHeaderChange()` : 사이드바에서 현재 선택된 문서의 title을 동시에 같이 수정합니다.
- Editor
    
    문서의 content를 작성하는 공간입니다. `textarea` 태그를 이용하여 입력이 들어오는 이벤트가 발생할 대마다 `onEditing()`을 호출합니다.
    

### router.js

각 태그에서 발생하는 이벤트에 대해서 이벤트 핸들러를 작성한 모듈입니다.

- `EVENT_ROUTE_PUSH` : 특정 문서를 선택
- `EVENT_ROUTE_REMOVE` : 특정 문서를 삭제
- `EVENT_ROUTE_CREATE` : 새 문서 생성
- `EVENT_ROUTE_PUT` : 문서 수정
- `EVENT_HEADER_CHANGE` : 문서 title 수정 시, 사이드바 문서 제목 동기화

## 프로젝트 상세

- 수행 기간: 2022.11 ~ 2022.11 (2주)
- 팀원: 개인
- 기술 스택: Vanilla Javascript

### 프로젝트 시연 영상
![Simple Notion](https://github.com/Kal-MH/Notion_Develop/assets/59648372/a03227c1-b7b4-4ff6-8f79-782616e277de)
