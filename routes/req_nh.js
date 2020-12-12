const nh_url = "https://developers.nonghyup.com";
// /CheckOpenFinAccountDirect.nh

module.exports.get_FINAccount = function () {
  req_set = {
    url: nh_url + '/CheckOpenFinAccountDirect.nh',
    headers: {
      "Content-Type": "application/json",
      "Accept": "*/*"
    },
    form: {
      "Header": {
        "ApiNm": "CheckOpenFinAccountDirect",
        "Tsymd": "20201212", //전송일자(YYYYMMDD)
        "Trtm": "185500", //전송시각(hhmmss)
        "Iscd": "000553", //기관코드
        "FintechApsno": "001",
        "ApiSvcCd": "DrawingTransferA",
        "IsTuno": "2020120800053213215", //기관거래고유번호(날짜+기관코드+랜덤일련번호)
        "AccessToken": "55bacf8f744b2e6ff6f01bb2acc0b25a50cf91475dea7c7950e11e02c8a169d4" //인증키
      },
      "Rgno": "20201212000001052", //등록번호
      "BrdtBrno": "19920927" //생년월일(YYYYMMDD)
    }
  }
  return req_set
}
