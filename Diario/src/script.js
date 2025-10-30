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