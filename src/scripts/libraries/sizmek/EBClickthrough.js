(function() {

    function initEB() {
        if (!EB.isInitialized()) {
            EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);
        } else {
            startAd();
        }
    }
    function startAd(){
        addEventListeners();
    }
    function addEventListeners() {
        document.getElementById("banner__link").addEventListener("click", clickthrough);
    }
    function clickthrough() {
        EB.clickthrough();
    }
    window.addEventListener("load", initEB);

})();
