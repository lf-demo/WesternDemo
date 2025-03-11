<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style scoped="scoped">
	html,
	body {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 0px;
		margin: 0px;
	}
	#app{
		width: 100vw;
		height: 100vh;
		background-color: #f5f5f5;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%; 
		height: 100%;
		/* overflow-y: auto; */

	}
</style>
