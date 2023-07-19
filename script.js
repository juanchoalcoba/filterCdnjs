const resultadoElement = document.getElementById('resultado');
const filtroInput = document.getElementById('filtro');

fetch('https://api.cdnjs.com/libraries')
  .then(response => response.json())
  .then(data => {
    const resultados = data.results;
    mostrarResultados(resultados);

    filtroInput.addEventListener('input', () => {
      const filtro = filtroInput.value.toLowerCase();

      const resultadosFiltrados = resultados.filter(result => {
        return result.name.toLowerCase().includes(filtro);
      });

      mostrarResultados(resultadosFiltrados);
    });
  })
  .catch(error => {
    console.error('Error:', error);
    resultadoElement.innerHTML = 'Se produjo un error al obtener los datos.';
  });

function mostrarResultados(resultados) {
  const resultadosHTML = resultados.map(result => {
    return `<li>
              <strong>${result.name}</strong>
              <div class="link-container">
                <a href="${result.latest}" target="_blank">${result.latest}</a>
              </div>
            </li>`;
  });

  resultadoElement.innerHTML = `<ul>${resultadosHTML.join('')}</ul>`;
}