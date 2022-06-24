<script lang="ts">

	import TopContainer from "./TopContainer.svelte";
	import MiddleContainer from "./MiddleContainer.svelte";
	import BottomContainer from "./BottomContainer.svelte";
	
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Merriweather&family=Montserrat&family=Sacramento&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main>
	<TopContainer />
	<MiddleContainer />
	<BottomContainer />	
</main>

<style>
</style>
