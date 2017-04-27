function getJSON(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            var data = JSON.parse(request.responseText);
            callback(data);
        }
    };
    request.onerror = function() {};
    request.send();
}

function updateTicker(){
    getJSON(
        "https://min-api.cryptocompare.com/data/price?fsym=ETC&tsyms=EUR",
        function (data) {
            if(parseFloat(data['EUR']) > localStorage.lastPrice){
                setBadgeColor("#2B8F28");
                setTimeout(function(){
                    setBadgeColor("#2E7BC4");
                }, 4000);
            } else if(parseFloat(data['EUR']) < localStorage.lastPrice){
                setBadgeColor("#FF4143");
                setTimeout(function(){
                    setBadgeColor("#2E7BC4");
                }, 4000);
            }
            chrome.browserAction.setBadgeText({text: data['EUR'].toString()});
            localStorage.lastPrice = data['EUR'];
    });
}

function setBadgeColor(color){
    chrome.browserAction.setBadgeBackgroundColor({color: color});
}

localStorage.lastPrice = 0;
updateTicker();
setInterval(updateTicker, 10000);
