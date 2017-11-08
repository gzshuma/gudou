<template>
	<section class="livedetail-wrap clearfix">
		<div class="episodes-box">
			<div class="wrap clearfix">
				<div class="episodes-bd">
					<input type="hidden" id="player-input" :value="playerUrl">
					<div class="episodes-crumb" v-if="detailData.columnName">
						<span class="txt-bold">正在播放：</span>
						<router-link tag="span" to="/" class="cursor-style">首页 <i class="el-icon-arrow-right"></i></router-link>
						<router-link tag="span" to="/point" class="cursor-style">点播 <i class="el-icon-arrow-right"></i></router-link>
						<span>{{detailData.columnName}}<i class="el-icon-arrow-right"></i></span>
						<span>{{detailData.programName}}<i class="el-icon-arrow-right"></i></span>
					</div>
				</div>
			</div>
		</div>
		<div class="player-bd clearfix">
			<div class="wrap clearfix">
				<div class="fl palyer-le">
	        		<iframe name="iframeDom" :src="'/static/player_m3u8/index.html?src='+playerUrl" id="iframeBox" width="100%" height="420" scrolling="no" frameborder="0"></iframe>
	        	</div>
	        	<div class="fr palyer-ri">
					<div class="episodes-reset" :class="episodesData.length>1 ? '':'dis-hide'">
						<el-tabs class="juji-box">
							<el-tab-pane label="1-24">
								<span class="juji-list" :class="{cur:nowIndex==index}" v-for="(v,index) in episodesData" v-if="index<24" :key="v.programID" @click="getUrl(v,index,$event)">
									<el-tooltip class="item" effect="dark" :content="v.titleName" placement="top">
										<el-button>{{index+1}}</el-button>
									</el-tooltip>
								</span>
							</el-tab-pane>
							<el-tab-pane label="25-48" v-if="episodesData.length>=24&&episodesData.length<48">
								<span class="juji-list" :class="{cur:nowIndex==index}" v-for="(v,index) in episodesData" v-if="index>=20&&index<40" :key="v.programID" @click="getNum(v,$event,index)">
									<el-tooltip class="item" effect="dark" :content="v.titleName" placement="top">
										<el-button>{{index+1}}</el-button>
									</el-tooltip>
								</span>
							</el-tab-pane>
							<el-tab-pane label="49-72" v-if="episodesData.length>=48&&episodesData.length<72">
								<span class="juji-list" :class="{cur:nowIndex==index}" v-for="(v,index) in episodesData" v-if="index>=40&&index<60" :key="v.programID" @click="getNum(v,$event,index)">
									<el-tooltip class="item" effect="dark" :content="v.titleName" placement="top">
										<el-button>{{index+1}}</el-button>
									</el-tooltip>
								</span>
							</el-tab-pane>
						</el-tabs>
					</div>
					<infodiscrib :detailData="detailData"></infodiscrib>
	        	</div>
			</div>
		</div>
	</section>
</template>

<script>
import $ from 'jquery'
import player from 'components/common/player'
import infodiscrib from 'components/common/infodiscrib'
export default {
	components: {
		player,
		infodiscrib
	},
	data () {
		return {
			detailData: {},
			episodesData: [],
			playerUrl: '',
			puser:sessionStorage.getItem('user'),
     		ptoken:sessionStorage.getItem('flag'),
			nowIndex: 0
		}
	},
    mounted () {
		this._getDetailData()
		this._getEpisodes (0)

		// 进入点击播放列表第一集
		setTimeout(function() {
			$('.juji-list').eq(0).click()
		}, 800)
    },
	computed: {

	},
	methods: {

		// 获取详情信息
		_getDetailData () {
			this.$http({
				method: 'post',
				url: '/api/PortalServer-App/new/ptl_ipvp_vod_vod013',
				params: {
					ptype: this.GLOBAL.config.ptype,
					plocation: this.GLOBAL.config.plocation,
					puser: this.puser,
					pserverAddress: this.GLOBAL.config.pserverAddress,
					// pserialNumber: '866769027850901',
					programID: this.$route.params.id
				}
			})
			.then((res) => {
				// alert(1)
        		if(res.data.status == 0) {
					const detailData = res.data.data.programinfo
					this.detailData = detailData
					//alert(this.detailData)
				}
			})
			.catch((res) => {
				alert(res.data.errorMessage)
			})
		},

		// 获取集数
		_getEpisodes () {
			this.$http({
				method: 'post',
				url: '/api/PortalServer-App/new/ptl_ipvp_vod_vod012',
				params: {
					ptype: this.GLOBAL.config.ptype,
					plocation: this.GLOBAL.config.plocation,
					puser: '',
					pserverAddress: this.GLOBAL.config.pserverAddress,
					// pserialNumber: '866769027850901',
					programID: this.$route.params.id
				}
			})
			.then((res) => {
				// alert(1)
        		if(res.data.status == 0) {
					const episodesData = res.data.data.programItems
					this.episodesData = episodesData
				}
			})
			.catch((res) => {
				alert(res.data.errorMessage)
			})
		},

		// 点击集数播放
		getUrl (val, index, el)  {
			this.nowIndex = index
			var data = {}
			var data = val.movieUrl[0] // 点播地址
			for(var v in data){
			    data = data[v]
			}
			let a = data.split('8070')
			let b = 'http://172.16.149.223:8060' + a[1]
			// console.log(b)

			// 获取媒资
			let Len = b.lastIndexOf("\/");
			let meizi  = b.substring(Len + 1, b.length);
			meizi = meizi.split('.')[0]
			// console.log(meizi)

			let pid = this.$route.params.id.split('_')
			pid = pid[1]
			console.log(pid)

			// 鉴权获取
			let self = this;
			this.$http({
				method: 'get',
				url: '/api/PortalServer-App/new/aaa_aut_aut002',
				params: {
					ptype: self.GLOBAL.config.ptype,
					plocation: self.GLOBAL.config.plocation,
					puser: self.puser,
					ptoken: self.ptoken,
					pversion: '030101',
					// pserverAddress: 'portal.gcable.cn',
					pserverAddress: this.GLOBAL.config.pserverAddress,
					pserialNumber: '862915030592170', // 必填
					pkv: '1',
					ptn: self.ptoken,
					DRMtoken: '',
					epgID: '',
					authType: '0',
					secondAuthid: '',
					t: self.ptoken,
					pid: pid,
					cid: '',
					u: self.puser,
					p: self.GLOBAL.config.ptype,
					l: '001',
					d: '862915030592170', // 必填 跟pserialNumber一样
					n: meizi, //dongfang_800
					v: '2',
					ot: '0',
					hmac: '',
					timestamp: new Date().getTime(),
					nonce: Math.random().toString().slice(2)
				}
			})
			.then((res) => {
				if(res.data.status == 0) {
					let str = res.data.data.authResult.split('?')[1]
					// console.log(str)
					this.playerUrl = b+'?'+str
					// console.log(this.playerUrl)
				}else {
					alert(1)
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
.infodiscrib-rest-bd .infodiscrib-bd, .infodiscrib-rest-bd .episodes-bd, .infodiscrib-rest-bd .infodiscrib-con { display: block; float: none; width: 100%; height: auto; padding-top: 0; }
.cursor-style { cursor: pointer; }
.episodes-box { background: #212121; min-width: 1200px; }
.episodes-bd { width: 100%; padding: 70px 0 0; border-bottom: #434343 1px solid; overflow: hidden; }
.episodes-top { position: relative; }
.episodes-top-ri { position: absolute; top: 0; right: 50px; font-size: 20px; color: #888; }
.episodes-top-ri i { display: block; font-size: 14px; margin-top: 5px; }
.episodes-crumb { color: #f2f2f2; margin: 25px 0 20px; }
.txt-bold { color: #888; }
.episodes-crumb span:last-child .el-icon-arrow-right { display: none; }
.episodes-crumb .el-icon-arrow-right { font-size: 12px; color: #888; }
.infodiscrib-rest-bd .infodiscrib-bd, .infodiscrib-rest-bd .episodes-bd, .infodiscrib-rest-bd .infodiscrib-con { display: block; float: none; width: 100%; height: auto; padding-top: 0; }
.palyer-le { width: 812px; height: 100%; }
.palyer-box { color: #f00; }
.yuding{ color: #ff9c01; }
.player-bd { padding: 10px 0 25px; background: #212121; min-width: 1200px; overflow: hidden;}
.player-bd .wrap { padding-top: 20px; }
.player-box, .player-box img { width: 812px; height: 455px; }
.player-tabs-list { position: relative; line-height: 36px; height: 36px; padding: 0 15px 0 80px; overflow: hidden; }
.player-tabs-list.cur { color: #ff9c01; }
.player-tabs-re { line-height: 25px; }
.player-tabs-con { height: 400px; overflow-y: auto; }
.player-bd ::-webkit-scrollbar { border-radius: 2.5px; width: 5px; height: 5px; background-color: #363636; }
.palyer-ri { width: 370px; height: 445px; color: #f0f0f0; overflow: hidden; }
 
/*定义滚动条轨道 内阴影+圆角*/
.player-bd ::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); border-radius: 2.5px; background-color: #363636; }
.player-bd ::-webkit-scrollbar-thumb { border-radius: 2.5px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #aaa; }
.episodes-reset { padding: 0; margin-bottom: 20px; }
.el-tabs__item { font-size: 16px; color: #f2f2f2; }
.el-tabs__item:hover { font-size: 16px; color: #f2f2f2; }
.el-tabs__header { border-bottom-color: #48576a; }
.episodes-top { position: relative; }
.episodes-top-ri { position: absolute; top: 0; right: 50px; font-size: 20px; color: #888; }
.episodes-top-ri i { display: block; font-size: 14px; margin-top: 5px; }
.el-tab-pane { width: 366px; }
.juji-list { float: left; width: 60px; height: 36px; border-radius: 5px; line-height: 36px; background: #f0f0f0; text-align: center; border-radius: 0; background: none; border: 1px solid #363636; border-width: 0 1px 1px 0; cursor: pointer; }
.dis-hide { display: none; }
</style>
<style>
.palyer-ri .el-tabs__item { color: #fff; font-size: 16px; }
.palyer-tabs-top .el-tabs__item { font-size: 18px; padding: 0; width: 185px; text-align: center; }
.palyer-tabs-top .is-active{ color: #ff9c01; }
.palyer-tabs-top .el-tabs__active-bar { background: #ff9c01; height: 2px; }
.el-button, .el-textarea__inner { color: #f2f2f2; font-size: 16px; }
.juji-list.cur { background: #333; }
.juji-list.cur .el-button { color: #ff9c01; }
.juji-list:nth-child(10n+10) { margin-right: 0; }
.juji-list .el-button { background: none; border: 0; }
.juji-list .el-button:hover { color: #ff9c01; }
.episodes-crumb { color: #888; margin: 25px 0 35px; }
.episodes-crumb span:last-child .el-icon-arrow-right { display: none; }
.episodes-crumb .el-icon-arrow-right { font-size: 12px; color: #d1cfcf; }
.juji-box .is-active{ color: #ff9c01; }
.juji-box .el-tabs__active-bar { background: #ff9c01; height: 2px; }
.el-tabs__content { width: 365px; border: #363636 2px solid; border-bottom-width: 1px; overflow: hidden; }
.el-tabs__header { border-bottom-color: #48576a; }
</style>