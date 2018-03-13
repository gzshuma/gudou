<template>
	<section class="live-wrap clearfix" id="live-wrap">
		<banner class="clearfix" :bannerData="bannerList"></banner>
		<div class="wrap live-box" id="live-box">
			<crumb :crumbTxt="crumbTxt.txtList1">
				<submenu :subList="liveSubList" @showCategoryID="showCategoryID"></submenu>
			</crumb>
			<loading v-if="!show"></loading>
			<tvcon :liveConData="liveContent"></tvcon>
		</div>
	</section>
</template>

<script>
import $ from 'jquery'
// banner
import banner from 'components/common/bannerlive'
// 面包title
import crumb from 'components/common/crumb'
// 关联菜单
import submenu from 'components/common/submenu'
// 排行
import tvcon from 'components/common/tvcon'
import loading from 'components/common/loading'
import { bannerFetch, liveSubMenuFetch, liveContentFetch } from '@/axios/api'

export default {
	components: {
	    banner,
	    crumb,
	    submenu,
	    tvcon,
	    loading
	},
	data () {
		return {
			active: false,
			activeName: 'second',
			liveTabData: [],
			liveConData: [],
			liveContent: [],
			liveSubList: [],
			categoryID: 0,
			bannerList: [],
			crumbTxt: {
				'txtList1': '电视'
			},
			show: false
		}
	},
    mounted () {
		// this._getliveTabData()
		this._getliveConData()
		this._getBnnerData()
		this._getLiveContentInfo()
		setTimeout(function() {
			$('.sub-menu-bd').find('span').eq(0).click()
		}, 500)
	},
    watch: {
        // '$route': '_getliveConData'
    },
	methods: {
	    _getBnnerData () {
	    	var self = this
	    	bannerFetch().then( res => {
		        if(res.data.status == 0) {
		            const dataCard = res.data.data.cards
		            dataCard.forEach(function (value, key) {
		              if(value.type === 'carousel') {
		                self.bannerList =  value.contents
		              }
		          	})
		        }
	    	}).catch((res) => {
				console.log(res.data.errorMessage)
			})
	    },
		_getLiveContentInfo () {
			var self = this
			liveSubMenuFetch().then( res => {
				if(res.data.status == 0) {
					self.show= true
					self.liveSubList = res.data.data.liveCategoryList
				}
			}).catch((res) => {
				console.log(res.data.errorMessage)
			})
		},
		_getliveConData () {
			var self = this
			liveContentFetch(self).then( res => {
				if(res.data.status == 0) {
					self.liveContent = res.data.data.channelInfos
				}
			}).catch((res) => {
				console.log(res.data.errorMessage)
			})
		},
		showCategoryID (val) {
			this.categoryID = val
			this._getliveConData()
		}
	}
}
</script>

<style scoped>
.live-wrap { padding-bottom: 30px; min-width: 1200px; }
.reset-arrow .crumb-bd .icon-enter-arror { display: none; }
.tabs-box { height: auto; }
.tabs-box .el-tabs__item { float: left; line-height: 33px; height: 33px; font-size: 16px; padding: 0 15px; margin: 0; cursor: pointer; }
.vue-tablist, .vue-tabpanel { overflow: hidden; margin-bottom: 20px; }
.tabs-box .is-active{ color: #ff9c01; }
.tabs-box .el-tabs__active-bar { background: #ff9c01; height: 2px; }
.tabs-box .rank-bd li { margin-bottom: 20px; }
.live-box .live-crumb { margin-top: 10px; }
</style>
