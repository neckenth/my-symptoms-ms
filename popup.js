// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is govered by a BSD-style license that can be
// found in the LICENSE file.

function click(e) {
  chrome.tabs.executeScript(null, {
    code: "document.body.style.backgroundColor = 'green';"
  });
  window.close();
}

document.addEventListener("DOMContentLoaded", function() {
  const div = document.querySelectorAll("div");
  div[0].addEventListener("click", click);
});
