<template>
<div class="piclistpoint-bd clearfix">
  <div class="pic-list">
    <div class="pic-ribar pic-point-bd">
      <ul>
        <router-link tag="li" :to="{name: 'pointsplay', params: { id: item.areaID }}" v-for="(item,index) in zhuanquData" :key="item.areaID" v-if="index < 1">
          <div class="pic-ri-top">
            <img :src="item.areaPosterUrl" alt="">
            <span class="pic-mask">
              <span class="pic-title">{{item.areaName}}</span>
            </span>
          </div>
        </router-link>
        <router-link tag="li" :to="{name: 'zhuanqu', params: { id: item.areaID }}" v-for="(item,index) in zhuanquData" :key="item.areaID" v-if="index > 0">
          <div class="pic-ri-top">
            <img :src="item.areaPosterUrl" alt="">
            <span class="pic-mask">
              <span class="pic-title">{{item.areaName}}</span>
            </span>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'piclistpoint',
	props: {
		zhuanquData: {
			type: Array
		}
	},
	data () {
		return {
      id: this.$route.params.id,
    }
	},
  methods: {
  }
}
</script>

<style scoped>
.pic-lebar { width: 460px; height: 330px; background: #f0f0f0; }
.pic-le-top { position: relative; width: 100%; height: 260px; }
.pic-le-top img { width: 100%; height: 100%; }
.pic-mask { position: absolute; left: 0; bottom: 0; height: 48px; width: 100%; background: rgba(0,0,0,.7); font-size: 18px; color: #fff; line-height: 50px; }
.pic-title { display: block; width: 300px; padding-left: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: center; }
.mask-time { position: absolute; right: 15px; top: 5px; font-size: 20px; color: #fff; }
.pic-btm { height: 72px; line-height: 72px; color: #445560; font-size: 24px; padding: 0 20px; }
.progress-bar { position: absolute; width: 100%; height: 4px; bottom: 0; left: 0; background: #ff9c01; }
.pic-ribar { width: 714px; height: 330px; overflow: hidden; }
.pic-ribar li { position: relative; float: left; width: 226px; height: 157px; background: #f0f0f0; margin: 0 18px 16px 0; overflow: hidden; }
.pic-ribar li:nth-child(3n+3) { margin: 0 0 16px 0; }
.pic-ri-top { position: relative; width: 100%; height: 124px; }
.pic-ribar li img { width: 100%; height: 124px; }
.pic-ribar .pic-mask { height: 30px; line-height: 30px; font-size: 12px; }
.pic-ribar .pic-title { padding: 0 4%; width: 92%; }
.pic-ribar .progress-bar { height: 2px; }
.pic-ribar .mask-time { font-size: 12px; right: 5px; top: 2px; }
.pic-ribar .pic-btm { height: 30px; line-height: 30px; font-size: 14px; padding-left: 8px; }
.pic-point-bd { width: 100%; }
.pic-point-bd li { width: 276px; height: 152px; margin-right: 31px; cursor: pointer; }
.pic-point-bd li:nth-child(3n+3) { margin-right: 31px; }
.pic-point-bd li:nth-child(4n+4) { margin-right: 0; }
.pic-point-bd { height: auto; }
.pic-point-bd .pic-ri-top { height: 148px; }
.pic-point-bd li img { width: 100%; height: 100%; }
.picpoint-txt { font-size: 20px; line-height: 45px; height: 45px; overflow: hidden; }
.picpoint-top { position: relative; }
.picpoint-top .more { position: absolute; top: 15px; right: 15px; font-size: 16px; cursor: pointer; }
.picpoint-top .more:hover{ color: #ff9c01 }
.picpoint-top .more i { font-family: Simsun; }
</style>