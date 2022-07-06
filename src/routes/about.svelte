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
  import profileImageSrc from "$lib/images/tanmay.jpg";
  let profileImageAlt: string = "tanmay";
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About Tanmay Sharma" />

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

<div class="profile">
  <img class="profile-image" src={profileImageSrc} alt={profileImageAlt} />
  <h2 class="hello-text display-4">Hello.</h2>
  <p class="intro">
    My name is Tanmay and I am a Computer Science Student at Innopolis
    University. I am in ❤ with Web Development.
  </p>
</div>

<style>
  .hello-text {
    font-family: "Montserrat", sans-serif;
    color: #11999e;
    margin: 25px;
  }

  .intro {
    width: 30%;
    margin: auto;
    font-family: "Merriweather", serif;
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .profile-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
    margin: 50px;
  }

  .profile {
    text-align: center;
  }
</style>
