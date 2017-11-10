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
			userList: {}
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
	            puser: self.GLOBAL.config.puser,
	            ptoken: self.GLOBAL.config.ptoken,
	            pserverAddress: self.GLOBAL.config.pserverAddress,
	            pserialNumber: self.GLOBAL.config.pserialNumber,
	            pversion:  self.GLOBAL.config.pversion,
	            ptn: self.GLOBAL.config.ptoken,
	            pkv: self.GLOBAL.config.pkv, 
	            hmac: '',
	            nonce: self.GLOBAL.config.nonce,
	            timestamp: self.GLOBAL.config.timestamp
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
