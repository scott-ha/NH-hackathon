const nh_url = "https://developers.nonghyup.com";
// /CheckOpenFinAccountDirect.nh

module.exports.get_FINAccount = function(req_Header) {
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
          "IsTuno": req_Header.date + req_Header.hour + "78459", // user_id 20자리
          "AccessToken": "55bacf8f744b2e6ff6f01bb2acc0b25a50cf91475dea7c7950e11e02c8a169d4"
        },
        "Rgno": "20201212000001052",
        "BrdtBrno": "19920927"
      },
      json: true
  }
  return req_set
}

module.exports.get_Account_balance = function(req_Header) {
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
        "FinAcno" : "00820100005530000000000005173"
      },
      json: true
  }
  return req_set
}
