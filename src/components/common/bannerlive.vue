<template>
	<el-carousel class="swiper-container" trigger="click" :interval="5000" type="card" arrow="hover">
      <el-carousel-item v-for="v in bannerData" :key="v.value">
        <a class="carousel-box" @click="urlDirect(v.id, v.contentID.split('_')[0])">
        	<img v-lazy="v.imageUrl">
        	<span class="carousel-mask">{{v.contentName}}</span>
        	<span class="mask-pop"></span>
        </a>
      </el-carousel-item>
    </el-carousel>
</template>
<script type="text/ecmascript-6">
export default {
	data () {
		return {
			id: this.$route.params.id,
		}
	},
	props: {
		bannerData: {
			type: Array
		}
	},
	methods: {
		urlDirect($id,$channelId) {
			// localStorage.setItem('channelIdData',$channelId)
			this.$router.push({
				name: 'livedetail',
				params: {
					id: this.$md5($id),
					channelid: $channelId + '_channel'
				}
			})
		}
	}
}
</script>

<style>
.swiper-container a { cursor: pointer; }
.swiper-container { position: relative; height: 400px; z-index: 1; }
.swiper-container .el-carousel__container { height: 100%; position: relative}
.swiper-container .el-carousel__container:before {  content: ''; display: block; position: absolute;
	left: 0; right: 0; top: 0; bottom: 0; margin: auto; width: 100%; opacity: 0.5; z-index: 5; }
.swiper-container .el-carousel__button { width: 10px; height: 10px; border-radius: 50%; background: #fff; }
.swiper-container .is-active .el-carousel__button { background: #f00; }
.swiper-container .is-active .el-carousel__button:hover { background: #f00; }
.swiper-container .el-carousel__arrow { top: 165px; width: 65px; height: 65px; background-color: rgba(31,45,61,.7); }
.swiper-container .el-carousel__arrow .el-icon-arrow-left, .swiper-container .el-carousel__arrow .el-icon-arrow-right { font-size: 20px; }
.carousel-box { position: relative; display: block; }
.swiper-container .el-carousel__indicators { left: auto; right: 0; display: none;}
.carousel-mask { position: absolute; height: 50px; line-height: 50px; font-size: 18px; width: 100%; position: absolute; left: 0; bottom: 0; background: rgba(0,0,0,.5); color: #fff; text-align: center; z-index: 2; }
.swiper-container .is-active{ z-index: 9; }
.swiper-container .el-carousel__item {  width: 50%; }
.swiper-container .el-carousel__item img { height: auto; width: 100%; max-height: 400px; }
.swiper-container .is-active a {  position: relative; position: relative; z-index: 3; }
.swiper-container .is-active .mask-pop {  position: relative; position: relative; z-index: 4; }
.mask-pop { position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,.5); z-index: 3; }
</style>
