/*
 * Copyright 2013 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var History = {};

chrome.browserAction.setBadgeText({ 'text': '?'});
chrome.browserAction.setBadgeBackgroundColor({ 'color': "#666" });

function HandleChange(tabId, changeInfo, tab) {
  if ("url" in changeInfo) {
    var now = new Date();
    if (!(tabId in History)) {
      History[tabId] = [];
    }
    History[tabId].unshift([now, changeInfo.url]);

    var history_limit = parseInt(localStorage["history_size"]);
    if (! history_limit) {
      history_limit = 23;
    }
    while (History[tabId].length > history_limit) {
      History[tabId].pop();
    }

    chrome.browserAction.setBadgeText({ 'tabId': tabId, 'text': '0m'});
    chrome.browserAction.setPopup({ 'tabId': tabId, 'popup': "popup.html#tabId=" + tabId});
  }
}

function UpdateBadges() {
  var now = new Date();
  for (tabId in History) {
    var description = FormatDuration(now - History[tabId][0][0]);
    chrome.browserAction.setBadgeText({ 'tabId': parseInt(tabId), 'text': description});
  }
}

setInterval(UpdateBadges, 3000);

chrome.tabs.onUpdated.addListener(HandleChange);
