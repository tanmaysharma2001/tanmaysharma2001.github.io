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
  //   import Profile from "$lib/Profile.svelte";
  //   import SkillContainer from "$lib/SkillContainer.svelte";
</script>

<svelte:head>
  <title>Contact</title>
  <meta name="description" content="Contact Tanmay Sharma" />

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
  <div class="contact-me">
    <h2 class="headings display-4">Get In Touch</h2>
    <h3 class="headings display-4">Wanna hire me?</h3>
    <p class="contact-message">
      Feel free to reach out to me any time. I prefer to talk over any of these
      mediums.
    </p>
    <a class="btn" href="mailto:sharmatanmay617@gmail.com">CONTACT ME</a>
  </div>
</section>

<style>
  .contact-me {
    text-align: center;
  }

  .headings {
    margin: 40px;
  }

  .contact-message {
    width: 40%;
    margin: 80px auto 100px;
    font-family: "Merriweather", serif;
  }
  .btn {
    background: #11cdd4;
    background-image: -webkit-linear-gradient(top, #11cdd4, #11999e);
    background-image: -moz-linear-gradient(top, #11cdd4, #11999e);
    background-image: -ms-linear-gradient(top, #11cdd4, #11999e);
    background-image: -o-linear-gradient(top, #11cdd4, #11999e);
    background-image: linear-gradient(to bottom, #11cdd4, #11999e);
    -webkit-border-radius: 8;
    -moz-border-radius: 8;
    border-radius: 8px;
    font-family: "Montserrat", sans-serif;
    color: #ffffff;
    font-size: 20px;
    padding: 10px 20px 10px 20px;
    text-decoration: none;
    margin: 23px;
  }

  .btn:hover {
    background: #30e3cb;
    background-image: -webkit-linear-gradient(top, #30e3cb, #2bc4ad);
    background-image: -moz-linear-gradient(top, #30e3cb, #2bc4ad);
    background-image: -ms-linear-gradient(top, #30e3cb, #2bc4ad);
    background-image: -o-linear-gradient(top, #30e3cb, #2bc4ad);
    background-image: linear-gradient(to bottom, #30e3cb, #2bc4ad);
    text-decoration: none;
  }
</style>
