

export const SHOUCHANG = 'SHOUCHANG';
export const SHOUCHANG_STATE = 'SHOUCHANG_STATE';
export default {
    state:{
        clickPlayer: {
            programID: '',
            columnID: '',
            columnName: ''
        }, 
    },
    actions:{
        addJieMu({ commit } , jiemuInfo){
            commit(SHOUCHANG , jiemuInfo);
        },
      
    },
    mutations: {
        [SHOUCHANG] (state , jiemuInfo) {
            state.clickPlayer = jiemuInfo;
        },
    
    },
    getters: {
        getJieMu( state ){
            return state.clickPlayer;
        }
    }

}

