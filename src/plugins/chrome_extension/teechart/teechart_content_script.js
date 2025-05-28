// Copyright (c) 2012 by Steema Software SL. All Rights Reserved.
// Use of this source code is governed by a license that can be
// found in the LICENSE file.

if (window == top) {
  chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
    sendResponse(findCharts());
  });
}

var findCharts = function() {
  var c1=new Object;

  c1.title="Twitter Most Followed";
  c1.values=[56,78,23,12];

  return c1;
}

