// ...existing code...
document.addEventListener('DOMContentLoaded', async () => {
  const placeholder = document.getElementById('hero-placeholder');
  if (!placeholder) return;

  try {
    const res = await fetch('hero.html'); // relativo a src/index.html
    if (!res.ok) throw new Error('Error cargando hero.html: ' + res.status);
    const html = await res.text();
    placeholder.innerHTML = html;

    // cargar CSS específico del hero
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../styles/hero.css'; // ruta desde src/index.html hacia styles
    document.head.appendChild(link);
  } catch (err) {
    console.error(err);
  }
});

// Pequeña animación al hacer clic en un día
const cards = document.querySelectorAll('.day-card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('completed');
    });
});

// Efecto visual al marcar completado
document.head.insertAdjacentHTML('beforeend', `
<style>
.completed {
    border-left: 4px solid var(--highlight);
    opacity: 0.9;
    transform: scale(1.02);
}
</style>
`);
