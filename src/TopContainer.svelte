<script lang="ts">
    import Weather from "./Weather.svelte";

    let src: string = "./images/cloud.png";
    let alt: string = "cloud-image";
    let mountainImageSource: string = "images/mountain.png";
    let mountainImageAlt: string = "mountain image";
</script>

<div class="top-container">
    <Weather />

    <img class="top-cloud" src="images/cloud.png" {alt} />
    <br />
    <br />
    <br />
    <br />
    <h1>I'm Tanmay</h1>
    <h2>a <u>pro</u>grammer.</h2>
    <img class="bottom-cloud" {src} {alt} />
    <img src={mountainImageSource} alt={mountainImageAlt} />
</div>
