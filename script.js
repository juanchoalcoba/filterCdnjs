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
    return `<li><strong>${result.name}</strong>: <a href="${result.latest}">${result.latest}</a></li>`;
  });

  const resultadosContainer = document.createElement('div');
  resultadosContainer.innerHTML = `<ul>${resultadosHTML.join('')}</ul>`;

  resultadoElement.innerHTML = '';
  resultadoElement.appendChild(resultadosContainer);
}