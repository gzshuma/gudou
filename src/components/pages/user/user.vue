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
import { userInfoFetch } from '@/axios/api'

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
			userInfoFetch().then(res => {
				if(res.data.status == 0) {
					self.userList = res.data.data;
				}
			}).catch((res) => {
				console.log(res.data.errorMessage)
			})
		},
	},
}
</script>

<style scoped>
.user-center { margin: 90px auto 30px; overflow: hidden; }
.user-center-ri { float: right; width: 975px; }
</style>
