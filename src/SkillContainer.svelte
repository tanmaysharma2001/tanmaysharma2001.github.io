<script lang="ts">

    interface skillItem {
        src: string;
        classTitle: string;
        title: string;
        detail: string;
    }

    let skillItems: skillItem[] = [
        {
            src: "images/web-link.png",
            classTitle: "wd-image",
            title: "Web Development",
            detail: "<strong>Skills: HTML/CSS/JavaScript</strong><br />I have a good understanding of the web fundamentals work and I have been putting them into my use since a long time."
        },
        {
            src: "images/computer.png",
            classTitle: "sd-image",
            title: "Software Development",
            detail: "<strong>Skills: Java, C/C++, Python, Git Version Control.</strong><br />I started learning to code when I was 12 years old becuase I wanted to make my own video games. Over time, I have gained a wealth of experience designing and developing mobile and web applications."
        }
    ];
</script>

<hr />
<h2>My Skills.</h2>

<!-- Flex Container for Skills Section. -->

<div class="flex-container">
    {#each skillItems as skillEle}
    <div class="skill-row">
        <img class={skillEle.classTitle} src={skillEle.src} alt="" />
        <h3>{skillEle.title}</h3>
        <p>
            {@html skillEle.detail}
        </p>
    </div>
    {/each}
</div>

<hr />
<div class="contact-me">
    <h2>Get In Touch</h2>
    <h3>Wanna hire me?</h3>
    <p class="contact-message">
        Feel free to reach out to me any time. I prefer to talk over any of
        these mediums.
    </p>
    <a class="btn" href="mailto:sharmatanmay617@gmail.com">CONTACT ME</a>
</div>
