<template>
  <main>
    <header>
      <nav>
        <span class="logo">Museum Van der Mark</span>
        <ul>
          <li><a href="#">Collectie</a></li>
          <li><a href="#">Tentoonstellingen</a></li>
          <li><a href="#">Bezoek</a></li>
        </ul>
      </nav>
    </header>

    <section class="hero">
      <h1>Museum Van der Mark</h1>
      <p>Een collectie om bij stil te staan</p>
      <a href="#" class="btn">Ontdek de collectie</a>
    </section>

    <section class="intro">
      <p>
        Museum Van der Mark is een plek waar kunst en stilte samenkomen.
        Wij bewaren en tonen werken die vragen oproepen, ruimte geven aan
        contemplatie en de verbeelding voeden.
      </p>
    </section>

    <footer>
      <p>&copy; 2026 Museum Van der Mark</p>
    </footer>
  </main>
</template>

<style scoped>
header {
  padding: 1.5rem 3rem;
  border-bottom: 1px solid #e0ddd8;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 2rem;
}

nav a {
  text-decoration: none;
  color: inherit;
  font-size: 0.875rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.6;
  transition: opacity 0.2s;
}

nav a:hover {
  opacity: 1;
}

.hero {
  padding: 8rem 3rem;
  text-align: center;
}

.hero h1 {
  font-size: clamp(2rem, 6vw, 5rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.125rem;
  opacity: 0.6;
  margin-bottom: 2.5rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border: 1px solid #1a1a1a;
  text-decoration: none;
  color: inherit;
  font-size: 0.875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: background-color 0.2s, color 0.2s;
}

.btn:hover {
  background-color: #1a1a1a;
  color: #faf9f7;
}

.intro {
  max-width: 640px;
  margin: 0 auto;
  padding: 4rem 3rem;
  text-align: center;
  font-size: 1.125rem;
  opacity: 0.75;
  border-top: 1px solid #e0ddd8;
}

footer {
  padding: 2rem 3rem;
  border-top: 1px solid #e0ddd8;
  font-size: 0.8rem;
  opacity: 0.4;
  text-align: center;
}
</style>
