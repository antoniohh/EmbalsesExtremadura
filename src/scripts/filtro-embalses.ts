export function initFiltroEmbalses() {
  const inputSearch = document.getElementById('buscar-embalse') as HTMLInputElement | null;
  const btnBorrarSearch = document.getElementById('btn-borrar-busqueda') as HTMLButtonElement | null;
  const btnLimpiar = document.getElementById('btn-limpiar-filtros') as HTMLButtonElement | null;
  const btnLimpiarVacio = document.getElementById('btn-limpiar-vacio') as HTMLButtonElement | null;
  const selectOrden = document.getElementById('orden-embalses') as HTMLSelectElement | null;
  const grid = document.getElementById('embalses-grid');
  const emptyState = document.getElementById('embalses-empty-state');
  const emptyDesc = document.getElementById('empty-state-desc');
  const numFiltrados = document.getElementById('num-filtrados');
  const textoConteo = document.getElementById('texto-conteo-embalses');
  const btnProvincias = document.querySelectorAll<HTMLButtonElement>('.filter-btn-provincia');
  const btnCuencas = document.querySelectorAll<HTMLButtonElement>('.filter-btn-cuenca');
  const btnSugerencias = document.querySelectorAll<HTMLButtonElement>('[data-sugerencia-btn]');

  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-embalse-card]'));
  const totalCount = cards.length;

  let query = '';
  let provincia = 'Todas';
  let cuenca = 'Todas';
  let orden = 'capacidad';

  // Leer estado inicial de URL
  try {
    const params = new URLSearchParams(window.location.search);
    const qParam = params.get('q');
    const pParam = params.get('provincia');
    const cParam = params.get('cuenca');
    const oParam = params.get('orden');

    if (qParam) query = qParam.trim();
    if (pParam && ['Badajoz', 'Cáceres'].includes(pParam)) provincia = pParam;
    if (cParam && ['Guadiana', 'Tajo'].includes(cParam)) cuenca = cParam;
    if (oParam && ['capacidad', 'llenado', 'subida', 'nombre'].includes(oParam)) orden = oParam;
  } catch {}

  // Sincronizar UI con estado inicial
  if (inputSearch && query) {
    inputSearch.value = query;
  }
  if (selectOrden && orden) {
    selectOrden.value = orden;
  }

  function updateUiButtons() {
    btnProvincias.forEach((btn) => {
      const active = btn.dataset.filterProvincia === provincia;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.className = `filter-btn-provincia flex-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-[13px] font-medium transition-all duration-200 sm:flex-none cursor-pointer ${
        active
          ? 'bg-white text-slate-950 shadow-xs ring-1 ring-slate-200'
          : 'text-slate-600 hover:text-slate-900'
      }`;
    });

    btnCuencas.forEach((btn) => {
      const active = btn.dataset.filterCuenca === cuenca;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.className = `filter-btn-cuenca flex-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-[13px] font-medium transition-all duration-200 sm:flex-none cursor-pointer ${
        active
          ? 'bg-white text-slate-950 shadow-xs ring-1 ring-slate-200'
          : 'text-slate-600 hover:text-slate-900'
      }`;
    });

    if (btnBorrarSearch) {
      if (query.length > 0) {
        btnBorrarSearch.classList.remove('hidden');
        btnBorrarSearch.classList.add('flex');
      } else {
        btnBorrarSearch.classList.add('hidden');
        btnBorrarSearch.classList.remove('flex');
      }
    }

    const hasActiveFilters = query !== '' || provincia !== 'Todas' || cuenca !== 'Todas' || orden !== 'capacidad';
    if (btnLimpiar) {
      if (hasActiveFilters) {
        btnLimpiar.classList.remove('hidden');
      } else {
        btnLimpiar.classList.add('hidden');
      }
    }
  }

  function applyFilters() {
    const qLower = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const matchingCards: HTMLElement[] = [];

    cards.forEach((card) => {
      const cNombre = (card.dataset.nombre || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const cMunicipio = (card.dataset.municipio || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const cRio = (card.dataset.rio || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const cProvincia = card.dataset.provincia || '';
      const cCuenca = card.dataset.cuenca || '';

      const matchProvincia = provincia === 'Todas' || cProvincia === provincia;
      const matchCuenca = cuenca === 'Todas' || cCuenca === cuenca;
      const matchQuery =
        !qLower ||
        cNombre.includes(qLower) ||
        cMunicipio.includes(qLower) ||
        cRio.includes(qLower) ||
        cProvincia.toLowerCase().includes(qLower) ||
        cCuenca.toLowerCase().includes(qLower);

      if (matchProvincia && matchCuenca && matchQuery) {
        card.style.display = '';
        matchingCards.push(card);
      } else {
        card.style.display = 'none';
      }
    });

    // Ordenar tarjetas visibles
    matchingCards.sort((a, b) => {
      if (orden === 'capacidad') {
        const capA = parseFloat(a.dataset.capacidad || '0');
        const capB = parseFloat(b.dataset.capacidad || '0');
        return capB - capA;
      }
      if (orden === 'llenado') {
        const lleA = parseFloat(a.dataset.llenado || '0');
        const lleB = parseFloat(b.dataset.llenado || '0');
        return lleB - lleA;
      }
      if (orden === 'subida') {
        const subA = parseFloat(a.dataset.subida || '0');
        const subB = parseFloat(b.dataset.subida || '0');
        return subB - subA;
      }
      if (orden === 'nombre') {
        const nomA = a.dataset.nombre || '';
        const nomB = b.dataset.nombre || '';
        return nomA.localeCompare(nomB, 'es');
      }
      return 0;
    });

    // Reordenar en el DOM
    if (grid) {
      matchingCards.forEach((c) => grid.appendChild(c));
    }

    // Conteo y Empty State
    const visibleCount = matchingCards.length;
    if (numFiltrados) numFiltrados.textContent = String(visibleCount);

    if (textoConteo) {
      if (visibleCount === totalCount) {
        textoConteo.innerHTML = `<span class="font-semibold text-slate-900 tnum">${totalCount}</span> embalses disponibles`;
      } else {
        textoConteo.innerHTML = `Mostrando <span class="font-semibold text-slate-900 tnum">${visibleCount}</span> de <span class="tnum">${totalCount}</span> embalses`;
      }
    }

    if (visibleCount === 0) {
      if (emptyState) emptyState.classList.remove('hidden');
      if (emptyDesc) {
        if (query) {
          emptyDesc.innerHTML = `No hay resultados para <strong class="text-slate-800">«${query}»</strong> con los filtros actuales. Prueba con otro término o elimina alguna restricción.`;
        } else {
          emptyDesc.textContent = 'No hay embalses que cumplan los filtros seleccionados. Prueba a cambiar la provincia o la cuenca.';
        }
      }
    } else {
      if (emptyState) emptyState.classList.add('hidden');
    }

    updateUiButtons();

    // Actualizar URL
    try {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (provincia !== 'Todas') params.set('provincia', provincia);
      if (cuenca !== 'Todas') params.set('cuenca', cuenca);
      if (orden !== 'capacidad') params.set('orden', orden);

      const qs = params.toString();
      const nextUrl = `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`;
      window.history.replaceState(null, '', nextUrl);
    } catch {}
  }

  function clearAll() {
    query = '';
    provincia = 'Todas';
    cuenca = 'Todas';
    orden = 'capacidad';
    if (inputSearch) inputSearch.value = '';
    if (selectOrden) selectOrden.value = 'capacidad';
    applyFilters();
  }

  // Event Listeners
  if (inputSearch) {
    inputSearch.addEventListener('input', (e) => {
      query = (e.target as HTMLInputElement).value.trim();
      applyFilters();
    });
  }

  if (btnBorrarSearch) {
    btnBorrarSearch.addEventListener('click', () => {
      query = '';
      if (inputSearch) inputSearch.value = '';
      applyFilters();
      inputSearch?.focus();
    });
  }

  btnProvincias.forEach((btn) => {
    btn.addEventListener('click', () => {
      provincia = btn.dataset.filterProvincia || 'Todas';
      applyFilters();
    });
  });

  btnCuencas.forEach((btn) => {
    btn.addEventListener('click', () => {
      cuenca = btn.dataset.filterCuenca || 'Todas';
      applyFilters();
    });
  });

  if (selectOrden) {
    selectOrden.addEventListener('change', (e) => {
      orden = (e.target as HTMLSelectElement).value;
      applyFilters();
    });
  }

  btnLimpiar?.addEventListener('click', clearAll);
  btnLimpiarVacio?.addEventListener('click', clearAll);

  btnSugerencias.forEach((btn) => {
    btn.addEventListener('click', () => {
      const sug = btn.dataset.sugerenciaBtn || '';
      query = sug;
      provincia = 'Todas';
      cuenca = 'Todas';
      orden = 'capacidad';
      if (inputSearch) inputSearch.value = sug;
      if (selectOrden) selectOrden.value = 'capacidad';
      applyFilters();
    });
  });

  // Ejecución inicial
  applyFilters();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFiltroEmbalses);
} else {
  initFiltroEmbalses();
}
