<template>
	<section class="live-wrap clearfix">
		<banner class="clearfix" :bannerData="bannerList"></banner>
		<div class="wrap live-box" id="live-box">
			<div class="reset-arrow">
				<crumb :crumbTxt="crumbTxt.txtList1">
					<div class="sub-menu-bd">
						<router-link tag="span" to="/">返回首页 <i>&gt;&gt;</i></router-link>
					</div>
				</crumb>
			</div>
			<pointcon :pointConData="pointConData" :pointConData1="pointConData1"></pointcon>
		</div>
	</section>
</template>

<script>
import $ from 'jquery'
// banner
import banner from 'components/common/banner'
// 面包title
import crumb from 'components/common/crumb'
// import tab from 'components/common/tab'
// 图文组件
import piclist from 'components/common/piclist'
// 关联菜单
import submenu from 'components/common/submenu'
// 排行
import pointcon from 'components/common/pointcon'
import tabitems from 'components/common/tabitems'
import { pointContentFetch, pointListData, pListMoreData } from '@/axios/api'

export default {
	components: {
	    banner,
	    crumb,
	    piclist,
	    submenu,
	    pointcon
	},
	data () {
		return {
			page: 0,
			pointConData: [],
			pointConData1: [],
			categoryID: 46,
			bannerList: [],
			crumbTxt: {
				'txtList1': '点播'
			}
		}
	},
    mounted () {
		this._getpointConData()
		this._loadMore()
		this._getBnnerData()
		let self = this
	},
    watch: {
        '$route': '_getliveConData'
    },
	methods: {
		// banner
		_getBnnerData () {
	        pointContentFetch().then( res => {
	          var self = this
	          if(res.data.status == 0) {
	            const dataCard = res.data.data.cards
	            dataCard.forEach(function (value, key) {
	              if(value.type === 'carousel') {
	                self.bannerList =  value.contents
	              }
	            })
	          }
	        }).catch( res => {
	          console.log(res.data.errorMessage)
	        })
		},

		// 点播列表
		_getpointConData () {
			var self = this
			pointListData(self).then( res => {
	          if(res.data.status == 0) {
	            self.pointConData = res.data.data.contents
	          }
	        }).catch( res => {
	          console.log(res.data.errorMessage)
	        })
		},

		// 更多
	    _loadMore() {
	      this.page = 1;
	      var self = this;

			pListMoreData(self).then( res => {
				if(res.data.status == 0) {
					self.pointConData1 = res.data.data.contents
				}
			}).catch( res => {
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
.tabs-box { height: auto; }
.tabs-box .el-tabs__item { float: left; line-height: 33px; height: 33px; font-size: 16px; padding: 0 15px; margin: 0; cursor: pointer; }
.vue-tablist, .vue-tabpanel { overflow: hidden; margin-bottom: 20px; }
.tabs-box .is-active{ color: #ff9c01; }
.tabs-box .el-tabs__active-bar { background: #ff9c01; height: 2px; }
.tabs-box .rank-bd li { margin-bottom: 20px; }
.live-box .live-crumb { margin-top: 10px; }
.sub-menu-bd { position: absolute; top:0; right: 0; font-size: 0; }
.sub-menu-bd span { display: inline-block; vertical-align: middle; padding: 0 15px; border-right: #ddd 1px solid; font-size: 14px; height: 16px; line-height: 16px; cursor: pointer; }
.sub-menu-bd span:last-child { border-right: 0; padding-right: 0; }
.sub-menu-bd .el-icon-arrow-right { font-size: 12px; margin-right: -5px; color: #999; }
.sub-menu-bd span i { font-family: Simsun; }
</style>
