// ==UserScript==
// @name        ICBC Club Fix
// @description Elimina los botones de facebook y twitter del catálogo de ICBC Club para mejorar la performance del sitio
// @version     1
// @match       https://www.icbcclub.com.ar/webIcbcClub/*
// @grant       none
// ==/UserScript==

function clearButtons(node) {
	node.querySelector('.redes > .facebook').remove();
	node.querySelector('.redes > .twitter').remove();
}

function clearAllButtons(parentNode) {
	var nodes = parentNode.querySelectorAll('.caja_producto');
	for (var i = 0; i < nodes.length; i++) {
		clearButtons(nodes[i]);
	}
}

// destacados
var destacados = document.querySelector('.destacados');
if (destacados) {
	// limpiar destacados ya mostrados
	clearAllButtons(destacados);
}

// productos
var listadoProductos = document.querySelector('.listado_productos');
if (listadoProductos) {
	// limpiar productos ya mostrados
	clearAllButtons(listadoProductos);

	// limpiar productos a medida que se cargan
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			for (var i = 0; i < mutation.addedNodes.length; i++) {
				var addedNode = mutation.addedNodes[i];
				if (addedNode.classList.contains('caja_producto')) {
					// encontramos una caja_producto, limpiar
					clearButtons(addedNode);
				}
			}
		});
	});

	observer.observe(listadoProductos, {
		attributes: false,
		childList: true,
		characterData: false
	});
}
