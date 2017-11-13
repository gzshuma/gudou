<template>
	<section class="livedetail-wrap clearfix">
		<div class="episodes-box">
			<div class="wrap clearfix">
				<div class="episodes-bd">
					<div class="episodes-crumb" v-if="subData.channelName">
						<span class="txt-bold">正在播放：</span>
						<router-link tag="span" to="/" class="cursor-style">首页 <i class="el-icon-arrow-right"></i></router-link>
						<span>{{subData.channelName}} <i class="el-icon-arrow-right"></i></span>
						<span>{{subData.epgName}} <i class="el-icon-arrow-right"></i></span>
					</div>
				</div>
			</div>
		</div>
		<div class="player-bd live-player clearfix">
			<div class="wrap clearfix">
				<div class="fl palyer-le">
					<div v-if="!CA" class="tips-style">{{caText}}</div>
	        		<iframe v-if="CA" name="iframeDom" :src="'/static/player_m3u8/index.html?src='+playerUrl" id="iframeBox" width="100%" height="420" scrolling="no" frameborder="0"></iframe>
				</div>
				<div class="fr palyer-ri">
					<div class="player-tabs-box">
						<div class="player-tabs-header clearfix">
							<span class="tabs-hd-list"  v-for="index in 7" :class="{ cur:index == nowIndex }" @click="changeTab(index,monday(index))">
								<i v-if="getDay==index">今天</i>
								<i v-else>
									<span v-if="index==1">周一</span>
									<span v-if="index==2">周二</span>
									<span v-if="index==3">周三</span>
									<span v-if="index==4">周四</span>
									<span v-if="index==5">周五</span>
									<span v-if="index==6">周六</span>
									<span v-if="index==7">周日</span>
								</i>
								<i>
									{{monday(index).substr(4,2)}}.{{monday(index).substr(6,2)}}
								</i>
							</span>
						</div>
						<div class="player-tabs-con">
							<div class="player-tabchange" :class="{'block':item === nowIndex}" v-for="item in 7">
								<div class="player-tabs-list" @click="changeMovies(v,index,$event)"  v-for="(v,index) in detailData"  :class=" v.epgID == endTimeArr.epgID && isok ? 'player-cur aaa':'' ">
									<span class="p-tabs-time">
										{{v.startTime.substr(8,2)}}.{{v.startTime.substr(10,2)}}
									</span>
									<span class="p-tabs-con">{{v.channelName}}：{{v.epgName}}</span>
									<span class="icon-p-tabs icon-info iconfont icon-back"  :class=" v.epgID == endTimeArr.epgID ? 'playa':'' " v-if="dateCompa(v.startTime)<0"></span>

									<span class="icon-p-tabs icon-info iconfont icon-alarm"  :appoint="v.epgID"  v-if="dateCompa(v.startTime)>0"></span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<share class="position-bottom clearfix" :collectData="collectData" v-if="CA"></share>
			</div>
		</div>
	</section>
</template>

<script>
import $ from 'jquery'
import { Message } from 'element-ui'
import share from 'components/common/share'
import {getDay, Monday,dateComparate, GetQueryString, getParamValue} from '@/util'

export default {
	components: {
		share
	},
	data () {
		return {
			CA: false,
			caText: '',
			collectData:{
				isZhibo: true,//是否直播
				id: this.$route.params.channelid.split('_')[0],
				columnID: '',
          		columnName: '',
				collectArr:[],//查看收藏的信息
			},
			urlOption: '',
			appointData: [],//查看预定的接口
			detailData: [],
			episodesData: [],
			getDay:getDay(),
			startTime: Monday(getDay())+'000000',
			endTime: Monday(getDay())+'235959',
			authority : '', //截取后的鉴权返回值
			isok: true,//是否默认选中
			weekIndex: "",
			nowIndex: getDay(),
			clickIndex: getDay(),
			playIndex: "",
			monday: Monday,
			playerUrl: '',
			jianquan: '',
			num: 0,
			subData: {
				channelName: '',
				epgName: ''
			}
		}
	},
	created () {
	},
    mounted () {
		this.queryCollect();
		this.queryAppoint();
		this._getDetailData();
		setTimeout(function() {
			this.startAppoint.forEach(function(item,index){
				$( '[appoint='+item.programID+']' ).addClass( 'yuding' )
			})
		}.bind( this ), 120);

		setTimeout(function() {
			$('.player-tabchange.block .player-cur').click()
		},800)
    },
    computed:{
		//计算属性
		endTimeArr: function() {
			if (this.getDay == this.nowIndex) {
				let arr = [];
				this.detailData.forEach(
					function(val, index) {
						let gg = this.dateCompa(val.startTime);
						if (gg < 0) {
							arr.push(val);
						}
					}.bind(this)
				);
				return arr.pop() || {};
			} else {
				return false;
			}
		},
		//默认预定的  比当前大的
		startAppoint: function(){
			// if (this.getDay == this.nowIndex) {
			let arr = [];
			this.appointData.forEach(function( item,index ){
			if (this.dateCompa(item.remindTime) > 0) {  //如果时间比当前时间大
				arr.push(item);
			}
		}.bind(this))
			return arr;
		}
    },
	methods: {
		_getDetailData () {
			let self = this
			self.$http({
				method: 'post',
				url: '/api/PortalServer-App/new/ptl_ipvp_live_live008',
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
		            timestamp: self.GLOBAL.config.timestamp,
					channelID: this.$route.params.channelid.split('_')[0],
					startTime: this.startTime,
					endTime: this.endTime

				}
			})
			.then((res) => {
        		if(res.data.status == 0) {
					const detailData = res.data.data.epgs
					this.detailData = detailData
				}
			})
			.catch((res) => {
				alert(res.data.errorMessage)
			})
		},
		dateData (date,startAppoint) {
			startAppoint = startAppoint || [];
			this.startTime = date+'000000'
			this.endTime = date+'235959'
			this._getDetailData()
			this.queryAppoint()

			//初始化加渲染
			$( '.yuding' ).removeClass( 'yuding' )
			setTimeout(function() {
				startAppoint.forEach(function(item,index){
					$( '[appoint='+item.programID+']' ).addClass( 'yuding' )
				})
			}.bind( this ), 200);

		},

		dateCompa: function (date) {
			let year = date.substr(0,4)
			let month = date.substr(4,2)
			let day = date.substr(6,2)
			let hour = date.substr(8,2)
			let minute = date.substr(10,2)
			let second = date.substr(12,2)
			let d = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second
            return dateComparate(d)
		},
		
		//查询预定提醒
		queryAppoint( ){
			var self = this;
			self.$http({
				method: 'get',
				url: '/api/PortalServer-App/new/ptl_ipvp_live_live023',
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
		            timestamp: self.GLOBAL.config.timestamp,
					start: '',
					end: ''
					
				}
			})
			.then((res) => {
				if(res.data.status == 0) {
					this.appointData = res.data.data.reminds
				}
			})
			.catch((res) => {
				alert(res.data.errorMessage)
			})
		},
		changeTab(index, date) {
			this.nowIndex = index;
			this.dateData (date,this.startAppoint)
		},
		playerClick(index) {
			this.playIndex = index;
		},
    
		//添加预定提醒
		addAppoint( val ){
			var self = this;
			this.$http({
				method: 'post',
				url: '/api/PortalServer-App/new/ptl_ipvp_live_live024',
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
		            timestamp: self.GLOBAL.config.timestamp,
					locationName: '',
					countyName: '',
				},
				//post用data
				data:{
					channelID: self.$route.params.channelid.split('_')[0],
					remindTime: val.startTime
				}
			})
			.then((res) => {
				if(res.data.status == 0) {
					this.$message( '你已成功订阅' );
				}
			})
			.catch((res) => {
				alert(res.data.errorMessage)
			})
		},

		//删除预定提醒
		delAppoint( val ){
			var self = this;
			this.$http({
				method: 'post',
				url: '/api/PortalServer-App/new/ptl_ipvp_live_live025',
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
		            timestamp: self.GLOBAL.config.timestamp,
					locationName: '',
					countyName: '',   
				},
				//post用data
				data:{
					channelID: self.$route.params.channelid.split('_')[0],
					remindTime: val.startTime
				}
			})
			.then((res) => {
				if(res.data.status == 0) {
					this.$message( '取消订阅' )
				}
			})
			.catch((res) => {
				alert(res.data.errorMessage)
			})
		},

		// 点击列表动作
		changeMovies(val, index, el) {
			if (this.dateCompa(val.startTime) > 0) {  //如果时间比当前时间大
				let user = sessionStorage.getItem('user')
				if (!user) { // 未登录跳到登录页
					this.$message.warning( '您还没有登录请先登录！' )
					return false
				}
				//订阅
				let target = $( el.target ).closest('.player-tabs-list').find('.icon-alarm')
				target.toggleClass('yuding')
				if(target.hasClass('yuding')) {
					this.addAppoint( val )
				}else{
					this.delAppoint( val )
				}
			} else {
				this.isok = false;

				// 点播地址	
				var data = {}
				var data = val.historyUrl[0]
				for(var v in data){
				    data = data[v]
				}

				// 获取媒资
				let meizi = data.split('?')
				var index = meizi[0].lastIndexOf("\/");  
				meizi  = meizi[0].substring(index + 1, meizi[0].length);
				meizi = meizi.split('.')[0]

				// 当前直播和回播的视频源
				let url = data.split('?')
				let movieUrl = url[0].split('8070')
				let playStr = '', playStr_1 = ''
				playStr = 'http://172.16.149.223:8060' + movieUrl[1] + '?'
				playStr_1 = 'http://172.16.149.223:8060' + movieUrl[1] + '?' + url[1] + '&'

				// 鉴权获取
				let self = this;
				this.$http({
					method: 'get',
					url: '/api/PortalServer-App/new/aaa_aut_aut002',
					params: {
						ptype: self.GLOBAL.config.ptype,
						plocation: self.GLOBAL.config.plocation,
						puser: self.GLOBAL.config.puser,
						ptoken: self.GLOBAL.config.ptoken,
						pversion: self.GLOBAL.config.pversion,
						pserverAddress: self.GLOBAL.config.pserverAddress,
						pserialNumber: self.GLOBAL.config.pserialNumber, // 必填
						pkv: self.GLOBAL.config.pkv,
						ptn: self.GLOBAL.config.ptoken,
						DRMtoken: '',
						epgID: '',
						authType: self.GLOBAL.config.authType,
						secondAuthid: '',
						t: self.GLOBAL.config.ptoken,
						pid: '',
						cid: self.$route.params.channelid.split('_')[0],
						u: self.GLOBAL.config.puser,
						d: self.GLOBAL.config.pserialNumber, // 必填 跟pserialNumber一样
						p: self.GLOBAL.config.ptype,
						l: self.GLOBAL.config.plocation,
						n: meizi, // dongfang_800
						v: self.GLOBAL.config.v,
						ot: self.GLOBAL.config.ot,
						hmac: '',
						timestamp: self.GLOBAL.config.timestamp,
						nonce: self.GLOBAL.config.nonce
					}
				})
				.then((res) => {
					if(res.data.status == 0) {
						let str = res.data.data.authResult.split('?')[1];
						// console.log(str)

						// 点击当前播放的和回播的动作操作
						this.num +=1
						if(val.epgID==this.endTimeArr.epgID) {
							playStr = playStr + str
							$(el.target).addClass('player-cur')
						}else if(this.num == 1) {
							playStr = playStr + str
						}else {
							playStr = playStr_1 + str
						}

						// 初始化添加直播样式
						$('.player-tabs-list').removeClass('player-cur aaa')
						$(el.target)
							.closest('.player-tabs-list')
							.addClass('player-cur aaa')
							.siblings('.player-tabs-list').removeClass('player-cur aaa')

						// 判断鉴权中是否有ACL
						if(GetQueryString(str, 'a=')) {
							this.CA = true
							// iframe赋值
							let html = playStr
							this.playerUrl = html
						}else {
							var num = getParamValue(str, 'errorcode')[1]
							this.CA = false
							var txt = '无法播放错误代码 ' + num
							this.caText = txt
							Message.warning(txt)
						}
					}
				})
				.catch((res) => {
					alert(res.data.errorMessage)
				})
				
				// 获取面包削标题
				this.subData.channelName = val.channelName
				this.subData.epgName = val.epgName
			}
		},

		//查询直播收藏
		queryCollect( ){
			var self = this;
			this.$http({
				method: 'get',
				url: '/api/PortalServer-App/new/ptl_ipvp_live_live026',
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
		            timestamp: self.GLOBAL.config.timestamp,
					start: '',
					end: ''
					
				},
			})
			.then((res) => {
			if(res.data.status == 0) {
				this.collectData.collectArr =  res.data.data.live 
			 }
			})
			.catch((res) => {
				alert(res.data.errorMessage)
			})
		}
	}
}
</script>

<style scoped>
.cursor-style { cursor: pointer; }
.episodes-box { background: #212121; min-width: 1200px; }
.episodes-bd { width: 100%; padding: 70px 0 20px; margin-bottom: 15px; float: left; border-bottom: #434343 1px solid; overflow: hidden; }
.episodes-top { position: relative; }
.episodes-top-ri { position: absolute; top: 0; right: 50px; font-size: 20px; color: #888; }
.episodes-top-ri i { display: block; font-size: 14px; margin-top: 5px; }
.episodes-crumb { color: #f2f2f2; margin: 25px 0 20px; }
.txt-bold { color: #888; }
.episodes-crumb span:last-child .el-icon-arrow-right { display: none; }
.episodes-crumb .el-icon-arrow-right { font-size: 12px; color: #888; }
.infodiscrib-rest-bd .infodiscrib-bd, .infodiscrib-rest-bd .episodes-bd, .infodiscrib-rest-bd .infodiscrib-con { display: block; float: none; width: 100%; height: auto; padding-top: 0; }
.palyer-le { width: 812px; height: 100%; margin-bottom: 15px; }
.palyer-box { color: #f00; }
.yuding{ color: #ff9c01; }
.player-bd { padding: 0; background: #212121; min-width: 1200px; overflow: hidden; }
.player-bd .wrap { padding-top: 20px; }
.player-box, .player-box img { width: 812px; height: 455px; }
.palyer-ri .el-tabs__item { color: #aaa; }
.palyer-tabs-top .el-tabs__item { font-size: 18px; padding: 0; width: 185px; text-align: center; }
.palyer-tabs-top .is-active{ color: #ff9c01; }
.palyer-tabs-top .el-tabs__active-bar { background: #ff9c01; height: 2px; }
.player-tabs-list { position: relative; line-height: 36px; height: 36px; padding: 0 15px 0 80px; overflow: hidden; }
.player-tabs-list.cur { color: #ff9c01; }
.player-tabs-re { line-height: 25px; }
.player-tabs-con { height: 400px; overflow-y: auto; }
.player-bd ::-webkit-scrollbar { border-radius: 2.5px; width: 5px; height: 5px; background-color: #363636; }
 
/*定义滚动条轨道 内阴影+圆角*/
.player-bd ::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); border-radius: 2.5px; background-color: #363636; }
.player-bd ::-webkit-scrollbar-thumb { border-radius: 2.5px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #aaa; }
.url-box { color: #fff; }
.palyer-ri { width: 370px; height: 495px; color: #f0f0f0; overflow: hidden; }
.tabs-hd-list { float: left; width: 14.285714%; text-align: center; cursor: pointer; }
.tabs-hd-list.cur { color: #ff9c01; }
.tabs-hd-list i.cur { color: #ff9c01; }
.tabs-hd-list i { display: block; margin-bottom: 5px; }
.player-tabs-list { font-size: 0; position: relative; width: 260px; line-height: 36px; height: 36px; padding: 0 15px 0 80px; overflow: hidden; cursor: pointer; }
.player-tabs-list.cur { color: #ff9c01; }
.icon-p-tabs { display: inline-block; vertical-align: middle; position: absolute;
  right: 15px; top: 5px; font-size: 20px; }
.p-tabs-time { display: inline-block; vertical-align: middle; font-size: 14px;
  position: absolute; left: 0; top: 0; width: 80px; text-align: center; }
.player-tabs-re { line-height: 25px; }
.player-tabs-con { height: 400px; overflow-y: auto; }
.player-bd ::-webkit-scrollbar { border-radius: 2.5px; width: 5px; height: 5px; background-color: #363636; }
.p-tabs-con { display: inline-block; vertical-align: middle; width: 230px; white-space: nowrap;
  text-overflow: ellipsis; overflow: hidden; font-size: 14px; }
.player-cur.aaa { color: #ff9c01; }
.yuding{ color: #ff9c01; }
.playa.icon-back:before { content: "\e608"; font-size: 28px; }
.playa.icon-back { right: 10px; }
.player-tabchange { display: none; }
.block { display: block; }
.tips-style { width: 90%; height: 415px; padding: 0 10%; line-height: 415px; font-size: 20px; color: #fff; text-align: center; }
</style>