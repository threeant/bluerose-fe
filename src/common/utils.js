// utils.js
import React from 'react';
import { useNavigate } from 'react-router-dom'

export const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem('accessToken'); // 세션 스토리지에서 토큰을 가져옴
  
    // 토큰이 있고 만료되지 않았다면 인증된 상태로 간주
    if (accessToken) {
      // 여기에서 토큰의 만료 여부를 확인하는 로직을 추가하세요
      // 예: 토큰의 만료 시간과 현재 시간을 비교
      return true; // 현재는 단순히 토큰이 있는지만 확인
    }
  
    return false;
  };


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

export function throwError(error,navigate) {
    const statusCode = error.response.status;
    console.log('>>>error');
    console.log(error)
    

    // 오류 코드에 따른 분기 처리
    switch (statusCode) {
    case 401:
        navigate('/login');
        break;
      case 404:
        navigate('/404');
        break;
      case 500:
        navigate('/500');
        break;
      default:
        navigate('/error');
    }

}

/******************************************************************************
* Function Name: getCurrentTime
* Description  : 현재 시간 반환
* Return       : yyyyMMddHHmmSS
******************************************************************************/
export function getCurrentTime() {
    var current = new Date();

    var year = current.getFullYear();
    var month = current.getMonth() + 1;
    var day = current.getDate();
    var hour = current.getHours();
    var min = current.getMinutes();
    var sec = current.getSeconds();

    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }

    return "" + year + month + day + hour + min + sec;
}

/******************************************************************************
* Function Name: getCurrentDate
* Description  : 현재 시간 반환
* Return       : yyyy-MM-dd
******************************************************************************/
export function getCurrentDate() {
    var current = new Date();

    console.log(current);

    var year = current.getFullYear();
    var month = current.getMonth() + 1;
    var day = current.getDate();

    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return "" + year + '-' + month + '-' + day
}

/* ----------------------------------------------------------------------------
 * 특정 날짜에 대해 지정한 값만큼 가감(+-)한 날짜를 반환
 *
 * 입력 파라미터 -----
 * pInterval : "yyyy" 는 연도 가감, "m" 은 월 가감, "d" 는 일 가감
 * pAddVal  : 가감 하고자 하는 값 (정수형)
 * pYyyymmdd : 가감의 기준이 되는 날짜
 * pDelimiter : pYyyymmdd 값에 사용된 구분자를 설정 (없으면 "" 입력)
 *
 * 반환값 ----
 * yyyymmdd 또는 함수 입력시 지정된 구분자를 가지는 yyyy?mm?dd 값
 *
 * 사용예 ---
 * 2008-01-01 에 3 일 더하기 ==> getAddDate("d", 3, "2008-08-01", "-");
 * 20080301 에 8 개월 더하기 ==> getAddDate("m", 8, "20080301", "");
 --------------------------------------------------------------------------- */
export function getAddDate(pInterval, pAddVal, pYyyymmdd, pDelimiter) {
    var yyyy;
    var mm;
    var dd;
    var cDate;
    var cYear, cMonth, cDay;

    console.log(pInterval + "" + pAddVal + "" + pYyyymmdd + "" + pDelimiter);

    if (pDelimiter != "") {
        pYyyymmdd = pYyyymmdd.replace(eval("/\\" + pDelimiter + "/g"), "");
    }

    if (pYyyymmdd == "") {
        return;
    }

    yyyy = pYyyymmdd.substr(0, 4);
    mm = pYyyymmdd.substr(4, 2);
    dd = pYyyymmdd.substr(6, 2);

    if (pInterval == "yyyy") {
        yyyy = (yyyy * 1) + (pAddVal * 1);
    } else if (pInterval == "m") {
        mm = (mm * 1) + (pAddVal * 1);
    } else if (pInterval == "d") {
        dd = (dd * 1) + (pAddVal * 1);
    }

    cDate = new Date(yyyy, mm - 1, dd); // 12월, 31일을 초과하는 입력값에 대해 자동으로 계산된 날짜가 만들어짐.
    cYear = cDate.getFullYear();
    cMonth = cDate.getMonth() + 1;
    cDay = cDate.getDate();

    cMonth = cMonth < 10 ? "0" + cMonth : cMonth;
    cDay = cDay < 10 ? "0" + cDay : cDay;

    if (pDelimiter != "") {
        console.log(cYear + pDelimiter + cMonth + pDelimiter + cDay);
        return cYear + pDelimiter + cMonth + pDelimiter + cDay;
    } else {
        console.log("" + cYear + cMonth + cDay);
        return "" + cYear + cMonth + cDay;
    }
}

