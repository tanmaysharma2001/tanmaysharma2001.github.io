<script context="module">
  import { browser, dev } from "$app/env";

  // we don't need any JS on this page, though we'll load
  // it in dev so that we get hot module replacement...
  export const hydrate = dev;

  // ...but if the client-side router is already loaded
  // (i.e. we came here from elsewhere in the app), use it
  export const router = browser;

  // since there's no dynamic data here, we can prerender
  // it so that it gets served as a static asset in prod
  export const prerender = true;
</script>

<script lang="ts">
  import image1 from "$lib/images/web-link.png";
  import image2 from "$lib/images/computer.png";

  interface skillItem {
    src: string;
    classTitle: string;
    title: string;
    detail: string;
  }
  let skillItems: skillItem[] = [
    {
      src: image1,
      classTitle: "wd-image",
      title: "Web Development",
      detail:
        "<strong>Skills: HTML/CSS/JavaScript</strong><br />I have a good understanding of the web fundamentals work and I have been putting them into my use since a long time.",
    },
    {
      src: image2,
      classTitle: "sd-image",
      title: "Software Development",
      detail:
        "<strong>Skills: Java, C/C++, Python, Git Version Control.</strong><br />I started learning to code when I was 12 years old becuase I wanted to make my own video games. Over time, I have gained a wealth of experience designing and developing mobile and web applications.",
    },
  ];
</script>

<svelte:head>
  <title>Skills</title>
  <meta name="description" content="Skills of Tanmay Sharma" />

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

<section>
  <h2 class="skill-heading display-5">My Skills.</h2>

  <!-- Flex Container for Skills Section. -->

  <div class="flex-container">
    {#each skillItems as skillEle}
      <div class="skill-row">
        <img class={skillEle.classTitle} src={skillEle.src} alt="" />
        <h3 class="skill-name">{skillEle.title}</h3>
        <p class="skill-text">
          {@html skillEle.detail}
        </p>
      </div>
    {/each}
  </div>
</section>

<style>
  section {
    text-align: center;
  }

  .skill-heading {
    font-family: "Montserrat", sans-serif;
    color: #11999e;
    margin: auto;
    margin-top: 18px;
    margin-bottom: 18px;
  }

  .skill-name {
    font-family: "Montserrat", sans-serif;
    color: #11999e;
    margin: 25px;
  }

  .skill-text {
    /* width: 80%; */
    margin: auto;
    font-family: "Merriweather", serif;
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .flex-container {
    display: flex;
    flex-direction: row;
    text-align: center;
  }

  .skill-row {
    width: 50%;
    /* margin: 100px auto 100px auto; */
    text-align: center;
    line-height: 2;
    padding: 0 60px 0 60px;
  }

  .wd-image {
    width: 25%;
    /* height: %; */
    /* object-fit:cover; */
    border-radius: 50%;
    /* float: left; */
    margin-right: 30px;
  }

  .sd-image {
    width: 25%;
    /* height: 25%; */
    object-fit: cover;
    border-radius: 50%;
    /* float: right; */
    margin-left: 30px;
  }
</style>
