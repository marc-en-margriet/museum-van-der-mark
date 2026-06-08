<template>
  <div class="not-found">
    <p class="not-found-code">404</p>
    <h1>Object niet gevonden</h1>
    <p>Dit museumstuk bestaat niet (meer) in onze collectie.</p>
    <RouterLink to="/">Terug naar de collectie</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  max-width: 640px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
}

.not-found-code {
  font-size: 5rem;
  color: #ddd;
  line-height: 1;
  margin-bottom: 1rem;
}

h1 {
  font-size: 1.5rem;
  font-weight: normal;
  margin-bottom: 0.75rem;
}

p {
  color: #666;
  margin-bottom: 2rem;
}

a {
  color: #1a1a1a;
  text-decoration: underline;
}
</style>
