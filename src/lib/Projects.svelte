<script>
  const projects = [
    {
      id: 1,
      name: "PyRedis",
      link: "https://github.com/tanmaysharma2001/pyredis",
      description: "Redis Clone in Python",
      languages: "Python",
    },
    {
      id: 2,
      name: "SQLite Clone in Golang",
      link: "https://github.com/tanmaysharma2001/sqllite-clone-golang",
      description: "SQLite Clone in Golang with Persistance",
      languages: 'Golang'
    },
  ];
</script>

<main>
  <div class="posts-container text-lg">
    <ul class="blog-list">
      {#each projects as { id, name, link, description }, i}
        <li>
          <span class="bullet">&#8226;</span>
          <a target="_blank" href={link} class="date">{name}</a> —‎ ‎
          <span class="post-link">{description}</span>
        </li>
      {/each}
    </ul>
  </div>
  <div class="text-lg mt-5">
    <p><em>last updated: 2024-05-02</em></p>
    <p>. -. -..</p>
  </div>
</main>
