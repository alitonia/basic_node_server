var visitKey = 'visited'
var persistTime = 1000 * 60 * 60 * 12
var lastTime = localStorage.getItem(visitKey);
var isRecentlyVisited = lastTime + persistTime >= Date.now()
localStorage.setItem(visitKey, Date.now().toString());