<template>
  <v-row justify="center">
    <div style="margin:auto; margin-top:50px; text-align:center;">
        <v-btn 
            outlined large fab color="indigo" 
            style="width:200px; height:200px; font-size:20px;" 
            @click="lotto()"
            :disabled="$common.getRemainRound() < 1"
        >
            {{$common.getRemainRound() > 0? 'Lotto' : '매주 월요일 리셋'}}
        </v-btn>
        <div style="margin-top:20px;">
            <p class="font-weight-bold text-uppercase">남은 횟수: {{$common.getRemainRound()}}번</p>
        </div>
        <v-btn 
            v-if="$common.getRemainRound() === 0 && !$common.isBonusQuiz()"
            outlined large color="indigo" 
            @click="bonusQuiz()"
        >
            bonus quiz
        </v-btn>
    </div>

    <v-dialog
      v-model="lottoDialog"
      max-width="320"
    >
      <v-card>
        <v-card-title class="">Lotto Number</v-card-title>
        <div style="text-align:center; padding-top: 10px;">
            <v-avatar class="ma-1" :color="colorSetting(item)" size="42" v-for="(item, index) in lotNum" :key="index">
                <span class="white--text headline">{{item}}</span>
            </v-avatar>
        </div>
        <v-card-actions style="padding-top: 20px;">
          <v-spacer></v-spacer>
          <v-btn
            color="primary darken-1"
            text
            @click="copyNum()"
          >
            copy
          </v-btn>
          <v-btn
            color="black darken-1"
            text
            @click="lottoDialog = false"
          >
            close
          </v-btn>
          <input type="hidden" value="" id="copyText" />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="quizDialog"
      max-width="320"
    >
        <v-card>
            <v-card-title class="">Bonus Quiz</v-card-title>
            <v-img
                :src="require('@/assets/수박남.jpeg')"
            >
            </v-img>
            <div style="text-align:center; padding-top: 10px;">
                <p class="font-weight-bold text-uppercase">위 사진을 보고 맞는것을 골라주세요.</p>
                <p class="font-weight-bold text-uppercase">강신범은 ___이다.</p>
                <v-btn class="indigo--text" text @click="quizAnswer('1')">1.졸귀</v-btn>
                <v-btn class="indigo--text" text @click="quizAnswer('2')">2.찐따</v-btn>
                <v-btn class="indigo--text" text @click="quizAnswer('3')">3.극혐</v-btn>
                <v-btn class="indigo--text" text @click="quizAnswer('4')">4.존잘</v-btn>
            </div>
            <v-card-actions style="padding-top: 20px;">
            <v-spacer></v-spacer>
            <v-btn
                color="black darken-1"
                text
                @click="quizDialog = false"
            >
                close
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            lottoDialog: false,
            quizDialog: false,
            lotNum: [],
            thingToCopy: 'test',
            isClick: false,
        }
    },
    computed: {
    },
    methods: {
        async lotto(){
            if(!this.isClick){
                this.isClick = true
                //크롤링을 위해 서버단 호출
                await axios.get('/api/lotto').then(res => {
                    let arr = res.data;
                    let totalArr = [];
    
                    let round = arr.reduce((sum,item) => {return sum+item})/7;
                    arr.forEach((item,index)=>{
                        totalArr = totalArr.concat(Array.from({length:round-item},()=>{return index+1}));
                    })
    
                    let lotto = new Set();
                    while(lotto.size < 6){
                        let num = Math.floor(Math.random() * (totalArr.length))
                        lotto.add(totalArr[num]);
                    }
    
                    this.lotNum = Array.from(lotto)
                    this.lotNum.sort((a,b)=>{
                        return a - b;
                    });
                    this.lottoDialog = true
                    this.isClick = false
                    this.$common.plusMinusRemainRound(-1);
                }).catch(err => {
                    console.error(err);
                    this.isClick = false
                })
            }
        },
        colorSetting(num){
            let color = 'light-green';
            if(num <= 10){
                color = 'amber'
            }else if(num <= 20){
                color = 'light-blue'
            }else if(num <= 30){
                color = 'deep-orange'
            }else if(num <= 40){
                color = 'grey'
            }
            return color
        },
        copyNum(){
            var input = document.getElementById('copyText');
            input.type = 'text';
            input.value = this.lotNum.join(', ');

            input.select();
            input.setSelectionRange(0, 9999);

            document.execCommand('copy');
            input.type = 'hidden'

            alert('복사되었습니다.')
        },
        bonusQuiz(){
            this.quizDialog = true
        },
        quizAnswer(answer){
            if(answer === '4'){
                alert('정답입니다. 보너스 1회 드립니다.')
                this.$common.plusMinusRemainRound(1);
                this.quizDialog = false;
                this.$common.setBonusQuiz();
            }else{
                alert('틀렸습니다. 멍청하군요. 사진을 똑바로 보세요!')
            }
        }
    },
}
</script>