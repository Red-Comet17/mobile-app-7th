<script>
	export default {
		onLaunch: function() {

			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		mounted() {}
	};
</script>

<style lang="scss">
	/*每个页面公共css */
	@import 'uview-plus/index.scss';

	* {
		margin: 0;
		padding: 0;
	}

	page {
		width: 100%;
		height: 100%;
		background-image: url('@/static/bg.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
</style>