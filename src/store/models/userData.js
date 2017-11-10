

export const USERDATA = 'USERDATA';
export default {
    state:{
        userList: {}, 
    },
    actions:{
        addUser({ commit } , userInfo){
            commit(USERDATA , userInfo);
        },
    },
    mutations: {
        [USERDATA] (state , userInfo) {
            state.userList = userInfo;
        },
    
    },
    getters: {
        getUser( state ){
            return state.userList;
        }
    }

}


