<template>
	<div class="infodiscrib-bd clearfix">
		<div><h3 class="txt-bold">简介</h3></div>
		<div class="infodiscrib-con">
			<p v-if="detailData.location">地区：{{detailData.location}}</p>
			<!-- <p>语言：</p> -->
			<p>
				类型：
				<span v-if="detailData.categoryName">{{detailData.categoryName}}</span>
				<span v-else>无</span>
			</p>
			<p>
				主演：
				<span v-if="detailData.actors">{{detailData.actors}}</span>
				<span v-else>无</span>
			</p>
			<p>
				导演：
				<span v-if="detailData.director">{{detailData.director}}</span>
				<span v-else>无</span>
			</p>
			<p>剧情介绍：</p>
			<p>
				<span v-if="detailData.programDes">{{detailData.programDes}}</span>
				<span v-else>无</span>
			</p>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
	props: {
		detailData: {
			type: Object
		}
	},
	data () {
		return {

		}
	}
}
</script>

<style scoped>
.infodiscrib-bd { float: right; padding: 0; width: 100%; height: 330px; color: #ccc; line-height: 20px; }
.txt-bold { font-size: 16px; color: #fff; padding-bottom: 5px; margin-bottom: 10px; border-bottom: #48576a 1px solid; }
.infodiscrib-con { height: 300px; overflow-y: auto; }
 
/*定义滚动条轨道 内阴影+圆角*/
.infodiscrib-bd ::-webkit-scrollbar { border-radius: 3px; width: 6px; height: 6px; background-color: #f0f0f0; }
.infodiscrib-bd ::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); border-radius: 2.5px; background-color: #f0f0f0; }
</style>
