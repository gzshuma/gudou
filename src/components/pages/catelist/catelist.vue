<template>
	<section class="live-wrap clearfix">
		<banner class="clearfix" :bannerData="bannerList"></banner>
		<div class="wrap live-box" id="live-box">
			<piclistpoint class="pointlist-wrap" :ContentInfo="pointList"></piclistpoint>
		</div>
	</section>
</template>

<script>
// import $ from 'jquery'
// banner
import banner from 'components/common/banner'
// 面包title
import crumb from 'components/common/crumb'
import piclistpoint from 'components/common/piclistpoint'
import { pointContentFetch, pointClassListFetch } from '@/axios/api'

export default {
	components: {
	    banner,
	    crumb,
	    piclistpoint
	},
	data () {
		return {
			pointList: [],
			categoryID: 46,
			bannerList: []
		}
	},
    mounted () {
		this._getBnnerData()
		this._getPointList()
	},
    watch: {
    },
	methods: {
	    _getBnnerData () {
	      var self = this
	      pointContentFetch().then(res => {
	        if(res.data.status == 0) {
	            const dataCard = res.data.data.cards
	            dataCard.forEach(function (value, key) {
	              if(value.type === 'carousel') {
	                self.bannerList =  value.contents

	                console.log(value.contents)
	              }
	            })
	        }
	      }).catch((res) => {
	        console.log(res.data.errorMessage)
	      })
	    },
		_getPointList () {
			var self = this
			pointClassListFetch(self).then(res => {
				if(res.data.status == 0) {
					self.pointList = res.data.data.cards
				}
			}).catch((res) => {
				console.log(res.data.errorMessage)
			})
		},
		showCategoryID (val) {
			this.categoryID = val
			this._getPointList()
		}
	}
}
</script>

<style scoped>
.live-wrap { min-width: 1200px; }
.pointlist-wrap { padding: 20px 0; min-width: 1200px; }
.reset-arrow .crumb-bd .icon-enter-arror { display: none; }
.tabs-box { height: auto; }
.tabs-box .el-tabs__item { float: left; line-height: 33px; height: 33px; font-size: 16px; padding: 0 15px; margin: 0; cursor: pointer; }
.vue-tablist, .vue-tabpanel { overflow: hidden; margin-bottom: 20px; }
.tabs-box .is-active{ color: #ff9c01; }
.tabs-box .el-tabs__active-bar { background: #ff9c01; height: 2px; }
.tabs-box .rank-bd li { margin-bottom: 20px; }
.live-box .live-crumb { margin-top: 10px; }
</style>
