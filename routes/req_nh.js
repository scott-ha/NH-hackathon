const nh_url = "https://developers.nonghyup.com";
// /CheckOpenFinAccountDirect.nh

module.exports.CheckOpenFinAccountDirect = function(req_Header) {
  req_set = {
    uri: nh_url + '/CheckOpenFinAccountDirect.nh',
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json",
    },
    body: {
      "Header": {
        "ApiNm": "CheckOpenFinAccountDirect",
        "Tsymd": req_Header.date,
        "Trtm": req_Header.hour,
        "Iscd": "000553",
        "FintechApsno": "001",
        "ApiSvcCd": "DrawingTransferA",
        "IsTuno": req_Header.date + req_Header.hour + "15975", // user_id 20자리
        "AccessToken": "55bacf8f744b2e6ff6f01bb2acc0b25a50cf91475dea7c7950e11e02c8a169d4"
      },
      "Rgno": "20201212000001052",
      "BrdtBrno": "19920927"
    },
    json: true
  }
  return req_set
}

module.exports.InquireBalance = function(req_Header, req_users) {
  req_set = {
    uri: nh_url + '/InquireBalance.nh',
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json",
    },
    body: {
      "Header": {
        "ApiNm": "InquireBalance",
        "Tsymd": req_Header.date,
        "Trtm": req_Header.hour,
        "Iscd": "000553",
        "FintechApsno": "001",
        "ApiSvcCd": "DrawingTransferA",
        "IsTuno": req_Header.date + req_Header.hour + "78459", // user_id 20자리
        "AccessToken": "55bacf8f744b2e6ff6f01bb2acc0b25a50cf91475dea7c7950e11e02c8a169d4"
      },
      "FinAcno": "00820100005530000000000005173"
    },
    json: true
  }
  return req_set
}

module.exports.requestOpenFinCardDirect = function(req_Header) {
  req_set = {
    uri: nh_url + '/OpenFinCardDirect.nh',
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json",
    },
    body: {
      "Header": {
        "ApiNm": "CheckOpenFinCardDirect",
        "Tsymd": req_Header.date,
        "Trtm": req_Header.hour,
        "Iscd": "000524",
        "FintechApsno": "001",
        "ApiSvcCd": "DrawingTransferA",
        "IsTuno": req_Header.date + req_Header.hour + "33333", // user_id 20자리
        "AccessToken": "55bacf8f744b2e6ff6f01bb2acc0b25a50cf91475dea7c7950e11e02c8a169d4"
      },
      "Cano": "9411123456782718", //윤재 카드 번호, 하늘형 카드번호로 수정해야하?
      "BrdtBrno": "19920927"
    },
    json: true
  }
  return req_set
}



module.exports.CheckOpenFinCardDirect = function(req_Header) {
  req_set = {
    uri: nh_url + '/CheckOpenFinCardDirect.nh',
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json",
    },
    body: {
      "Header": {
        "ApiNm": "CheckOpenFinCardDirect",
        "Tsymd": req_Header.date,
        "Trtm": req_Header.hour,
        "Iscd": "000524",
        "FintechApsno": "001",
        "ApiSvcCd": "DrawingTransferA",
        "IsTuno": req_Header.date + req_Header.hour + "33334", // user_id 20자리
        "AccessToken": "55bacf8f744b2e6ff6f01bb2acc0b25a50cf91475dea7c7950e11e02c8a169d4"
      },
      "Rgno": "20201212000001052", //수정해야 하늘형꺼 등록번호로?
      "BrdtBrno": "19920927"
    },
    json: true
  }
  return req_set
}

module.exports.InquireCreditCardAuthorizationHistory = function(req_Header) {
  req_set = {
    uri: nh_url + '/InquireCreditCardAuthorizationHistory.nh',
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json",
    },
    body: {
      "Header": {
        "ApiNm": "InquireCreditCardAuthorizationHistory",
        "Tsymd": req_Header.date,
        "Trtm": req_Header.hour,
        "Iscd": "000553",
        "FintechApsno": "001",
        "ApiSvcCd": "CardInfo",
        "IsTuno": req_Header.date + req_Header.hour + "35555", // user_id 20자리
        "AccessToken": "55bacf8f744b2e6ff6f01bb2acc0b25a50cf91475dea7c7950e11e02c8a169d4"
      },
      "FinCard": "00829101234560000112345678919",
      "IousDsnc": "1",
      "Insymd": "20191105",
      "Ineymd": "20191109",
      "PageNo": "1",
      "Dmcnt": "15"
    },
    json: true
  }
  return req_set
}

// 000524
// e33d042424e78f837d716eeda26933d030f2e9a0b965d543ceaca7597ed2cbba
// 00829101234560000112345678919
