export default {
    isMobile : function(){
        var tempUser = navigator.userAgent;
     
        // userAgent 값에 iPhone, iPad, ipot, Android 라는 문자열이 하나라도 존재한다면 모바일로 간주됨.
        if (tempUser.indexOf("iPhone") > 0 || tempUser.indexOf("iPad") > 0
                || tempUser.indexOf("iPot") > 0 || tempUser.indexOf("Android") > 0) {
            return true
        }
        return false;
    },
    initRemainRound : function(){
        localStorage.setItem('remainRound', 4);
        localStorage.setItem('setDate', new Date())
    },
    getRemainRound : function(){
        let remainRound = localStorage.getItem('remainRound');
        if(remainRound === null || remainRound === undefined) {
            this.initRemainRound();
        }
        return Number(localStorage.getItem('remainRound'));
    },
    plusMinusRemainRound : function(val){
        let remainRound = localStorage.getItem('remainRound')
        localStorage.setItem('remainRound', Number(remainRound)+val);
        return Number(remainRound)+val
    },
    setBonusQuiz : function(){
        localStorage.setItem('bonusQuizYn','Y');
    },
    isBonusQuiz : function(){
        let bonusQuizYn = localStorage.getItem('bonusQuizYn')
        return bonusQuizYn? true : false
    },
    removeStorage : function(){
        localStorage.removeItem('remainRound');
        localStorage.removeItem('bonusQuizYn');
        localStorage.removeItem('setDate');
    }
}
