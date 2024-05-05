<script lang="ts">
  import Home from "./lib/Home.svelte";
  import Projects from "./lib/Projects.svelte";

  let activeTab: string = "home";

  function changeActiveTab(newTab: string) {
    activeTab = newTab;
  }
</script>

<main>
  <div class="desktop-1">
    <div class="breadcrumbs"></div>
    <div class="melano absolute top-2 left-4">tanmay's site</div>
   
    <header>
      <a class="cursor-pointer" on:click={() => changeActiveTab("home")}>home</a>
      <a class="cursor-pointer" on:click={() => changeActiveTab("projects")}>projects</a>
    </header>
    <div class="line-1"></div>

    {#if activeTab === "home"}
      <Home />
    {:else if activeTab === "projects"}
      <Projects />
    {:else}
      <Home />
    {/if}
  </div>
</main>

<style>
  
</style>
