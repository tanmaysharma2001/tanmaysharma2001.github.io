<script lang="ts">
  interface linkEle {
    href: string;
    label: string;
  }
  let linksEles: linkEle[] = [
    {
      href: "https://www.linkedin.com/in/tanmaysharma2001/",
      label: "LinkedIn",
    },
    {
      href: "https://twitter.com/me_tanmay01",
      label: "Twitter",
    },
    {
      href: "https://www.instagram.com/me_tanmay01",
      label: "Instagram",
    },
  ];
</script>

<div class="bottom-container">
  <div class="links">
    {#each linksEles as link}
      <a class="footer-link" href={link.href}>{link.label}</a>
    {/each}
  </div>
  <p class="copyright">Made with ❤ - © Tanmay Sharma 2022</p>
</div>

<style>
  .links {
    margin: 5px auto 5px auto;
  }

  .bottom-container {
    margin: 0px auto 0 auto;
    width: 100%;
    text-align: center;
    background-color: #66bfbf;
    color: white;
    line-height: 1;
    padding: 50px 0 20px;
  }

  .copyright {
    color: #eaf6f6;
    font-size: 0.75rem;
    padding: 20px 0;
  }

  .footer-link {
    color: white;
    font-family: 'Courier New', Courier, monospace;
    margin: 10px;
  }
</style>
