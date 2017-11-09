<template>
	<section class="user-center wrap clearfix">
    	<usercenterleft :userList="userList"></usercenterleft>
		<div class="user-center-ri">
			<router-view :userList="userList"></router-view>
		</div>
	</section>
</template>

<script>
import usercenterleft from 'components/common/usercenterleft'
export default {
	components: {
		usercenterleft
	},
	data () {
		return {
			userList: {},
			puser:sessionStorage.getItem('user'),
      		ptoken:sessionStorage.getItem('flag'),
		}
	},
	created(){
		this._getUserInfo();
	},
	methods:{
		 //获取用户信息
		_getUserInfo( ){
		var self = this;
		this.$http({
			method: 'get',
			url: '/api/PortalServer-App/new/aaa_usr_usr008',
			params: {
				ptype: self.GLOBAL.config.ptype,
				plocation: self.GLOBAL.config.plocation,
				puser: self.puser,
				ptoken: self.ptoken,
				pversion: '03010',
				pserverAddress: self.GLOBAL.config.pserverAddress,
				pserialNumber: self.ptoken,
				
			},
				})
				.then((res) => {
				if(res.data.status == 0) {

					// this.$store.dispatch('addUser' , res.data.data);
					this.userList = res.data.data;

					}
				})
				.catch((res) => {
					alert(res.data.errorMessage)
				})
		},
	},
}
</script>

<style scoped>
.user-center { margin: 90px auto 30px; overflow: hidden; }
.user-center-ri { float: right; width: 975px; }
</style>
