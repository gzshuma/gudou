

export const SELECTDATA = 'SELECTDATA'
export default {
    state:{
        selectData: {
            firstData: '',
            secondData: ''
        }, 
    },
    actions:{
        addSelect({ commit } , selectValue){
            commit(SELECTDATA , selectValue);
        },
    },
    mutations: {
        [SELECTDATA] (state , selectValue) {
            state.selectData = selectData;
        },
    
    },
    getters: {
        getSelect( state ){
            return state.selectData;
        }
    }
}

