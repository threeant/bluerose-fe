// utils.js

//공통코드 호출
export function getCodeList(codeNm) {
    var rtnCodeList = [];

    // 세션에서 JSON 데이터 가져오기
    const jsonCodeData = sessionStorage.getItem('codeData');

    // JSON 문자열을 파싱하여 JavaScript 객체로 변환
    const codeList = JSON.parse(jsonCodeData);

    if (!codeList) {
        throw new Error('권한이 없습니다.(로그인을 해주세요)');
    }

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
