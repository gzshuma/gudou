<template>
	<div class="user-home">
		<div class="bg-info clearfix">
			<ul>
				<li>
					<span class="info-list-txt">
						<span class="icon-info iconfont icon-user2"></span>
						<span>头像</span>
					</span>
					<span class="info-ri info-pic" @click="fileClick()">
            <!-- <img class="userPhoto" v-lazy="userList.photoImg.high"> -->
            <img class="userPhoto"  :src="userList.photoImg.high | imgFilter">
            <input type="file" class="fileInput" style="display:none" @change="fileChange( $event )">
          </span>
				</li>
				<li>
					<span class="info-list-txt">
						<span class="icon-info iconfont icon-user"></span>
						<span>账户名</span>
					</span>
					<span class="info-ri noWrite" v-text="userList.user"></span>
				</li>
        <li>
					<span class="info-list-txt">
						<span class="icon-info iconfont icon-nickname"></span>
						<span>昵称</span>
					</span>
					<input type="text" class="info-ri alias" maxlength="20" :placeholder="userList.nickname" :value="userList.nickname"></input>
				</li>
        
				<!-- <li>
					<span class="info-list-txt">
						<span class="icon-info icon-envelope"></span>
						<span>邮箱</span>
					</span>
					<span class="info-ri" v-text="userList.email"></span>
				</li> -->
			</ul>
		</div>
		<div class="bg-info clearfix">
			<ul>
				<li>
					<span class="info-list-txt">
						<span class="icon-info el-icon-time"></span>
						<span>注册时间</span>
					</span>
					<span class="info-ri noWrite" v-text="userList.createTime"></span>
				</li>
				<li>
					<span class="info-list-txt">
						<span class="icon-info iconfont icon-logintime"></span>
						<span>上次登录时间</span>
					</span>
					<span class="info-ri noWrite">{{userList.lastLogin}}</span>
				</li>
			</ul>
		</div>
		<!-- <div class="bg-info clearfix">
			<ul>
				<li>
					<span class="info-list-txt">余额</span>
				</li>
			</ul>
		</div> -->
		<button class="info-reset" @click.stop="btnMask">修改资料</button>
    <!-- <bmask v-show="eye" :alterListData="alterList"></bmask> -->
	</div>
</template>

<script>
import usercenterleft from 'components/common/usercenterleft'
import bmask from 'components/common/bmask'
import $ from 'jquery'
import {gen_base64} from "@/util";
import { paramFunction, setUserUrl, setUserImgUrl } from '@/axios/api'

export default {
  props:{
    userList:{
      type: Object,
    }
  },
	components: {
		usercenterleft,
    bmask
	},
	data () {
		return {
      statePhoto: 0,//是否修改头像
      stateInfo: 0,//是否修改资料
      base64Img: '',
      puser:sessionStorage.getItem('user'),
      ptoken:sessionStorage.getItem('flag'),
      nickname: '',
      alterList:{
        nickname:'',
        sex:'',
        birthday:'',
        personalitySignature:'',
        email:'',
        customerNum:''
      }

    }
  },
  computed:{
    
  },
  created(){
   
  },
  mounted(){
  },
	methods:{
    fileClick(){
      $('.fileInput').click();
    },
    fileChange( el ){
      var self = this;
      let file = el.target.files[0];
      if(!/image/.test(file.type)){
          this.$message( '你选择的不图片' );
          return false;
      }
      let r = new FileReader();  //本地预览
      r.readAsDataURL(file);    //Base64
      r.onload = function(){
          let str = r.result.split('base64,')[1];
          self.base64Img = str;
          self.statePhoto = 1;
          $( '.userPhoto' ).attr( 'src', r.result )

      }
    },
    
    
    btnMask(){//点击修改提交
    
      this.statePhoto == 1 ? this._setUserImg() : '';

      let val = $( '.alias' )[0].value;
      if( val == this.userList.nickname ){
          return;
      }
      this.stateInfo = 1;
      this.nickname = val;
      if( this.statePhoto == 1 && this.stateInfo == 1 ){
          this._setUserData();
          this._setUserImg();
      }
      this.stateInfo == 1 ? this._setUserData() : '';
      
      
    },
     //修改资料
		_setUserData( ){
      var self = this;
      self.$http({
        method: 'post',
        // url: '/api/PortalServer-App/new/aaa_usr_usr009',
        url: setUserUrl(),
        params: paramFunction(''),
        data:{
          nickname: this.nickname,
          sex: '',
          birthday: '',
          personalitySignature: '',
          email: '',
          customerNum: '',
        },
      })
      .then((res) => {
      if(res.data.status == 0) {
          this.$message.success('修改资料成功')
          setTimeout( function(){
               window.location.reload();
          },200 )
         
        }
      })
      .catch((res) => {
        alert(res.data.errorMessage)
      })
    },
     //上传头像
		_setUserImg( ){
      var self = this;
      this.$http({
        method: 'post',
        url: setUserImgUrl(),
        params: paramFunction(''),
        data:{
          photo: this.base64Img,
        },
      })
      .then((res) => {
      if(res.data.status == 0) {
           this.$message.success('修改资料成功')
            setTimeout( function(){
                window.location.reload();
            },200 )
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
.user-home { background: #f6f6f6; padding: 80px 100px 150px; }
.info-reset { display: block; width: 100%; background: #32b16c; height: 44px; border-radius: 5px; color: #fff; font-size: 16px; margin-top: 30px; }
.bg-info { background: #fff; margin-bottom: 20px; padding: 0 20px; }
.bg-info li { position: relative; border-bottom: #e1e1e1 1px solid; line-height: 55px; padding-left: 10px; overflow: hidden; }
.bg-info li:last-child { border-bottom: 0; }
.info-list-txt { float: left; }
.info-list-txt span { display: inline-block; vertical-align: middle; }
.info-ri { position: absolute; right: 10px; top: 0; }
.info-list-txt .icon-info { color: #ff9c01; font-size: 22px; margin-right: 8px; }
.info-list-txt .icon-user { font-size: 20px; font-weight: 400; }
.info-list-txt .icon-floppy-disk { font-size: 20px; }
.info-list-txt .icon-user2, .info-list-txt .el-icon-time, .info-list-txt .icon-envelope { font-size: 24px; }
.info-list-txt .el-icon-time { font-size: 20px; }
.info-list-txt .icon-logintime { font-size: 20px; }
.info-pic { top: 10px; cursor: pointer}
.info-pic img { width: 34px; height: 34px; border-radius: 50%; }
.noWrite{ color: #aaa; }
.alias{ height: 99%; text-align: right; }
</style>
