<script lang="ts">
    interface linkEle {
        href: string;
        label: string;
    }

    let linksEles: linkEle[] = [
        {
            href: "https://www.linkedin.com/in/tanmaysharma2001/",
            label: "LinkedIn"
        },
        {
            href: "https://twitter.com/me_tanmay01",
            label: "Twitter"
        },
        {
            href: "https://www.instagram.com/me_tanmay01",
            label: "Instagram"
        }

    ];
</script>

<div class="bottom-container">
    <div class="links">
        {#each linksEles as link}
        <a
            class="footer-link"
            href={link.href}>{link.label}</a
        >
        {/each}
    </div>
    <p class="copyright">Made with ❤ - © Tanmay Sharma 2022</p>
</div>
