<template>
  <header class="header">
	<div class="wrap header-wrap">
		<div class="logo fl" @click="goStart"></div>
		<div class="nav-box fl">
			<router-link class="list hover" tag="div" to="/"><span class="m-txt">首页</span></router-link>
			<router-link class="list hover" tag="div" to="/tv"><span class="m-txt">电视</span></router-link>
			<!-- <router-link class="list hover" tag="div" to="/point"><span class="m-txt">点播</span></router-link> -->
			<router-link class="list catlist hover" tag="div" :to="{name: 'pointsplay', params: { id: item.id }}" v-for="(item, index) in navData" v-if="index<3" :key="item.id"><span class="m-txt">{{item.columnName}}</span></router-link>
			<div class="list hover more-sub" @mouseenter="showMore" @mouseleave="hideMore">
				<span class="el-dropdown-link hover">
					更多<i class="el-icon-arrow-down"></i></i>
				</span>
				<div class="more-list more-hover" :class="isShow?'dis-block':''">
					<div class="content">
						<span class="arrow-up"></span>
						<router-link class="sub-menu catlist" tag="div" :to="{name: 'pointsplay', params: { id: item.id }}" v-for="(item, index) in navData" v-if="index>=3" :key="item.id"><span class="m-txt">{{item.columnName}}</span></router-link>
					</div>
				</div>
			</div>
		</div>
		<div class="search-box fl" @click="searchButtonClick">
			<div type="text" class="search-input"><i class="el-icon-search"></i>特洛伊</div>
		</div>
		<div class="header-ri fr">
			<div class="list" @mouseenter="showMoreCenter" @mouseleave="hideMoreCenter">
				<span v-show="!flag">
					<span class="hover">
						<router-link tag="a" to="/login">登录</router-link>
					</span>
					<span>|</span>
					<span class="hover">
						<router-link tag="a" to="/register">注册</router-link>
					</span>
				</span>
				<router-link tag="span" class="el-dropdown-link record-more hover" to="/user" v-show="flag">
					<span class="u-name">{{puser}}</span>
					<i class="el-icon-arrow-down"></i>
				</router-link>
				<div class="more-list more-list-1 more-hover" :class="showed?'dis-block1':''" v-show="flag">
					<span class="arrow-up"></span>
					<div class="content">
						<div class="sub-u-bd">
							<router-link tag="div" class="sub-u-le sub-u-list" to="/user">
								<!-- <img v-lazy="picUrl" alt=""> -->
								<img :src="picUrl | imgFilter">
								<div class="user-name sub-u-list">{{puser}}</div>
							</router-link>
							<div class="checkout sub-u-list" @click="logout()">退出</div>
						</div>
						<div class="sub-btm clearfix">
							<router-link tag="div" to="/user/viewrecord" class="sub-btm-list sub-u-list">
								<i class="el-icon-time"></i>观看记录
							</router-link>
							<router-link tag="div" to="/user/collection" class="sub-btm-list sub-u-list">
								<i class="el-icon-star-off"></i>我的收藏
							</router-link>
							<router-link tag="div" to="/user/myorder" class="sub-btm-list sub-u-list">
								<i class="iconfont icon-alarm"></i>我的预订
							</router-link>
						</div>
					</div>
				</div>
			</div>
			<a target="_blank" href="http://172.16.149.150/download/index.html" class="list hover">app下载</a>
		</div>
	</div>
  </header>
</template>

<script>
// import { mapState } from 'vuex'
import {getCookie, GetDateDiff, getNowFormatDate} from '@/util'
import { logoutDataFetch } from '@/axios/api'
export default {
	name: 'header',
	components: {
	},
	props: {
		navData: {
			type: Array
		},
        userList:{
            type: Object,
        }
	},
    computed: {
        // 取头像
        picUrl: function() {
            let data = this.userList.photoImg
            for(var v in data){
                return data[v]
            }
        }
    },
    beforeCreate(){
    	this.puser = sessionStorage.getItem('user')
    },
	data () {
		return {
			transitionName: 'slide-left',
			id: this.$route.query.id,
		    isShow: false,
		    showed:false,
		    navTrue: false,
		    // puser: store.getters.user,
			ptoken:sessionStorage.getItem('flag'),
		    flag: sessionStorage.getItem('flag')
		}
	},
	// computed: mapState({ user: state => state.user }),
	watch: {
		'$route' (to, from) {  
	      if(to.path == '/'){  
	        this.transitionName = 'slide-right';  
	      }else{  
	        this.transitionName = 'slide-left';  
	      }
	    }
	},
	methods: {
		showMore () {
			this.isShow= true
		},
		hideMore () {
			this.isShow=false
		},
		showMoreCenter () {
			this.showed= true
		},
		hideMoreCenter () {
			this.showed=false
		},
		goStart(){
			this.$router.replace({ path: '/' })
		},
		searchButtonClick () {
			this.$router.push({
				name: 'search'
			})
			setTimeout(function(){
				location.reload()
			}, 300)
		},
		logout () {
			logoutDataFetch().then( res => {
				let self = this
				if(res.data.status == '0'){
					self.$confirm('您确定要退出吗?', '退出登录', {
						confirmButtonText: '确定',
						cancelButtonText: '取消'
					}).then(() => {
						sessionStorage.removeItem('user')
						sessionStorage.removeItem('flag')
						// alert(getNowFormatDate())
						sessionStorage.setItem('dateTime', getNowFormatDate())
						self.$router.push({ path: '/login' })
						setTimeout(() => {
							location.reload()
						}, 100)
					}).catch(() => {

					})
				}else {
				  alert('退出失败')
				}
			})
		},
		recordEnter () {
			let user = sessionStorage.getItem('user')
			if (!user) { // 未登录跳到登录页
				this.$router.push({path: '/login'})
			}else {
				this.$router.push({path: '/user/viewrecord'})
			}
		}
	}
}
</script>

<style scoped>
header { position: fixed; top: 0; left: 0; background: rgba(0,0,0,.7); width: 100%; height: 55px; color: #fff; z-index: 102; }
.header-wrap { display: flex; align-items: center; }
.logo { margin: 0; width: 165px; height: 29px; background: url(/static/common/images/logo1.png) no-repeat; cursor: pointer; }
.nav-box { position: relative; float: left; padding: 0 0 0 10px; line-height: 55px; font-size: 0; }
.nav-box .list { position: relative; display: inline-block; vertical-align: middle; font-size: 14px; margin: 0 10px; }
.header-ri { position: absolute; right: 0; top: 0; line-height: 55px; font-size: 0; width: 340px; }
.header-ri .list { position: relative; font-size: 14px; display: inline-block; vertical-align: middle; margin-right: 30px; }
.icon-arrow { display: inline-block; vertical-align: middle; }
.nav-box .hover, .header-ri .hover { cursor: pointer; }
.nav-box .hover:hover, .header-ri .hover:hover { color: #ff9c01; }
.header a:active, .header a:visited, .header a:link { color: #fff; }
.header a:hover { color: #ff9c01; }
.header .mode-active:active, .header .mode-active:visited, .header .mode-active:link, .header .mode-active .m-txt { color: #ff9c01; }
.more-list { position: absolute; top: 65px; right: -18px; }
.more-hover .content { padding: 8px 0; width: 90px; background: rgba(0,0,0,.7); color: #fff; font-size: 14px; border-radius: 5px; text-align: center; }
.more-list-1 { width: 272px; left: -95px; right: auto; }
.more-list-1 .content { text-align: left; padding: 8px 0; width: 272px; background: rgba(0,0,0,.7); color: #fff; font-size: 14px; border-radius: 5px; text-align: center; }
.more-list-1 .content .sub-u-list:hover { color: #ff9c01; }
.more-list .arrow-up { position: absolute; top: 7px; left: 42px; width: 0; height: 0; border-left: 7px solid transparent; border-right: 7px solid transparent; border-bottom: 8px solid rgba(0,0,0,.7); }
.more-list-1 .arrow-up { left: 132px; }
.sub-menu { line-height: 28px; }
.sub-menu a:hover, .sub-menu:hover { color: #ff9c01; }
header .el-dropdown { color: #fff; }
header .el-dropdown-menu { }
/*.show-sub .more-list { display: block; }*/
.show-sub .more-sub, .show-sub .record-more { color: #ff9c01; }
.search-box { position: relative; width: 250px; height: 30px; margin: 0 0 0 20px; border: #898989 1px solid; border-radius: 3px; }
.search-input { width: 100%; height: 30px; line-height: 30px; background: rgba(255,255,255,.15); color: #fff; text-align: center; font-size: 14px; cursor: pointer; }
.search-button { position: absolute; right: 0; top: 0; width: 50px; height: 30px; background: #ff9c01; border-radius: 0 2px 2px 0; }
.search-input .el-icon-search { display: inline-block; vertical-align: middle; color: #fff; margin-right: 5px; font-size: 20px; }
.el-icon-arrow-down { font-size: 12px; font-weight: 400; font-family: Simsun; margin-left: 5px; }
.drop-con { padding-top: 60px; }
.u-name { display: inline-block; vertical-align: middle; width: 60px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.more-list-1 { text-align: left; }
.sub-u-bd { clear: both; position: relative; margin: 0 15px; border-bottom: #676767 1px solid; cursor: pointer; overflow: hidden; }
.sub-u-le { float: left; padding-bottom: 10px; }
.sub-u-bd img { width: 45px; height: 45px; border-radius: 50%; }
.sub-u-bd img, .user-name { display: inline-block; vertical-align: middle; line-height: 30px; }
.checkout { position: absolute; top: 0; right: 5px; }
.sub-btm { text-align: left; line-height: 30px; padding-top: 10px; }
.sub-btm-list { width: 110px; display: inline-block; vertical-align: middle; height: 30px; line-height: 30px; text-align: center; margin-right: 45px; cursor: pointer; overflow: hidden;}
.sub-btm-list:nth-child(2n+2) { margin-right: 0; }
.sub-btm-list i { font-size: 16px; margin-right: 5px; }
.record-list.mode-active { color: #fff; }
.header .record-list.mode-active:active, .header .record-list.mode-active:visited, .header .record-list.mode-active:link { color: #fff; }
.transition-view { position: relative; height: 100%; transition: all .3s cubic-bezier(.55,0,.1,1); }  
.slide-left-enter, .slide-right-leave-active { opacity: 1; -webkit-transform: translate(100%, 0); transform: translate(100%, 0); }  
.slide-left-leave-active, .slide-right-enter { opacity: 0; -webkit-transform: translate(-100%, 0); transform: translate(-100%, 0); }
.more-hover { top: 49px; padding-top: 15px; display: none; }
.dis-block, .dis-block1 { display: block; }
</style>