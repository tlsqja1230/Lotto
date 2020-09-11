<template>
    <v-container grid-list-xl fluid>
        <v-layout row wrap class="layout_dashboard">
            <lottoDialog></lottoDialog>
        </v-layout>
    </v-container>
</template>

<script>
import lottoDialog from '@/components/dialog/lottoDialog.vue'
export default {
    name: 'Dashboard',
    components: {
        lottoDialog
    },
    props: {
    },
    watch: {
    },
    computed: {
    },
    data() {
        return {
        }
    },
    beforeRouteEnter (to, from, next) {
        next()
    },
    created() {
        // 기존 date를 비교하여 월요일 지났을 경우 초기화를 위한 스토리지 제거.
        let date = new Date(localStorage.getItem('setDate'));
        if(date){
            let today = new Date();
            var diff = Math.abs(today.getTime() - date.getTime()); 
            diff = Math.ceil(diff / (1000 * 3600 * 24));
            if(diff !== 0){
                if(diff >= 7 || today.getDay() === 1 || (date.getDay() > today.getDay())){
                    // 스토리지 리셋
                    this.$common.removeStorage();
                }
            }
        }
    },
    mounted() {
    },
    updated() {
    },
    methods: {
    },
}
</script>
<style scoped>
.layout_dashboard {
    padding: 20px;
}
</style>