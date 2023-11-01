// utils.js

//공통코드 호출
export function getCodeList(codeNm) {
    var rtnCodeList = [];

    // 세션에서 JSON 데이터 가져오기
    const jsonCodeData = sessionStorage.getItem('codeData');

    // JSON 문자열을 파싱하여 JavaScript 객체로 변환
    const codeList = JSON.parse(jsonCodeData);

    // userData 객체 사용
    for (const c of codeList) {
        //console.log(c);
        if (c.code == codeNm) {
            rtnCodeList = c.codes;
        }
    }

    if (rtnCodeList.length == 0) {
        console.log('잘못된 경로입니다.');
    }

    return rtnCodeList;
}

export function otherCommonFunction(arg1, arg2) {
    // 다른 공통 함수 내용
}
