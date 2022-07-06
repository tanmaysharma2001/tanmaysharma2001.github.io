<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import Weather from "$lib/Weather.svelte";
  import src from "$lib/images/cloud.png";
  import mountainImageSource from "$lib/images/mountain.png";
  //   let src: string = "$lib/images/cloud.png";
  let alt: string = "cloud-image";
  //   let mountainImageSource: string = "$lib/images/mountain.png";
  let mountainImageAlt: string = "mountain image";
</script>

<svelte:head>
  <title>Home</title>
  <meta
    name="description"
    content="Personal Portofio Website for Tanmay Sharma"
  />

  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"
  />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Merriweather&family=Montserrat&family=Sacramento&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="top-container">
  <Weather />

  <img class="top-cloud" {src} {alt} />
  <br />
  <br />
  <br />
  <br />
  <h1 class="name-heading display-4">I'm Tanmay</h1>
  <h2 class="programmer-text display-4">a <u>pro</u>grammer.</h2>
  <img class="bottom-cloud" {src} {alt} />
  <img src={mountainImageSource} alt={mountainImageAlt} />
</div>

<style>
  .top-container {
    padding-top: 100px;
    background-color: #e4f9f5;
    position: relative;
    text-align: center;
  }

  .top-cloud {
    position: absolute;
    right: 200px;
    top: 40px;
  }

  .bottom-cloud {
    position: absolute;
    left: 200px;
    bottom: 300px;
  }

  .name-heading {
    font-size: 562.5%;
    /* 16px 90px/16px = 562.5 */
    margin: 1px auto 0 auto;
    font-family: "Sacramento", cursive;
    color: #66bfbf;
  }

  .programmer-text {
    font-family: "Montserrat", sans-serif;
    font-size: 2.5rem;
    color: #66bfbf;
    font-weight: normal;
    padding-bottom: 10px;
  }
</style>
