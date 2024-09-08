import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import titiImage from './assets/images/TITI.png';
import gorilaImage from './assets/images/GORILA.png';
import orangutanImage from './assets/images/orangutan.png';
import lemurImage from './assets/images/lemur.png';
import chimpanceImage from './assets/images/CHIMPANCE.png';
import mandrilImage from './assets/images/mandril.png';

// Precios de los elementos
const precios = {
  bebidas: {
   
  'Coca-Cola 2.35lts': 2800,
    'Coca-Cola Zero 1.75lts': 2200,
    'Brahma 473ml': 1200,
    'Heineken 710ml': 2800,
  },
  extras: {
    'Cheddar': 700,
    'Panceta ahumada': 600,
    'Pepinos': 300,
    'Medallón de carne y cheddar x2 (doble)': 1800,
  },
  papas: {
    'Solas': 5000,
    'Con cheddar': 5500,
    'Con cheddar y panceta': 6000,
  },
  hamburguesas: {
    'Tití (simple)': 5900,
    'Tití (doble)': 7700,
    'Gorila (simple)': 6100,
    'Gorila (doble)': 7900,
    'Orangutan (simple)': 6300,
    'Orangutan (doble)': 8100,
    'Lemúr (simple)': 6300,
    'Lemúr (doble)': 8100,
    'Chimpancé (simple)': 6300,
    'Chimpancé (doble)': 8100,
    'Mandril (simple)': 6600,
    'Mandril (doble)': 8400,
  },
  envio: 500, // Costo fijo de envío
};

// Datos de las hamburguesas con imágenes
const hamburguesasData = [
  { nombre: "Tití", imagen: titiImage },
  { nombre: "Gorila", imagen: gorilaImage },
  { nombre: "Orangutan", imagen: orangutanImage },
  { nombre: "Lemúr", imagen: lemurImage },
  { nombre: "Chimpancé", imagen: chimpanceImage },
  { nombre: "Mandril", imagen: mandrilImage }
];

function PedidoForm() {
  const [hamburguesas, setHamburguesas] = useState([
    {
      tipoHamburguesa: '',
      papas: '',
      bebida: '',
      extras: []
    }
  ]);
  const [aplicarEnvio, setAplicarEnvio] = useState(false); // Nuevo estado para el costo de envío

  // Función para actualizar los campos de una hamburguesa específica
  const handleHamburguesaChange = (index, field, value) => {
    const nuevasHamburguesas = [...hamburguesas];
    nuevasHamburguesas[index][field] = value;
    setHamburguesas(nuevasHamburguesas);
  };

  // Función para agregar una hamburguesa más al pedido
  const agregarHamburguesa = () => {
    setHamburguesas([
      ...hamburguesas,
      {
        tipoHamburguesa: '',
        papas: '',
        bebida: '',
        extras: []
      }
    ]);
  };

  // Función para eliminar una hamburguesa del pedido
  const eliminarHamburguesa = (index) => {
    const nuevasHamburguesas = hamburguesas.filter((_, i) => i !== index);
    setHamburguesas(nuevasHamburguesas);
  };

  // Función para gestionar los extras
  const handleExtrasChange = (index, extra) => {
    const nuevasHamburguesas = [...hamburguesas];
    if (nuevasHamburguesas[index].extras.includes(extra)) {
      nuevasHamburguesas[index].extras = nuevasHamburguesas[index].extras.filter(
        (item) => item !== extra
      );
    } else {
      nuevasHamburguesas[index].extras.push(extra);
    }
    setHamburguesas(nuevasHamburguesas);
  };

  // Función para calcular el total del pedido
  const calcularTotal = () => {
    let total = 0;

    hamburguesas.forEach(hamburguesa => {
      // Sumar el precio de la hamburguesa
      if (hamburguesa.tipoHamburguesa) {
        total += precios.hamburguesas[hamburguesa.tipoHamburguesa] || 0;
      }

      // Sumar el precio de la bebida
      if (hamburguesa.bebida) {
        total += precios.bebidas[hamburguesa.bebida] || 0;
      }

      // Sumar el precio de las papas
      if (hamburguesa.papas) {
        total += precios.papas[hamburguesa.papas] || 0;
      }

      // Sumar el precio de los extras
      hamburguesa.extras.forEach(extra => {
        total += precios.extras[extra] || 0;
      });
    });

    // Sumar el costo de envío solo si se selecciona la opción y hay al menos una hamburguesa
    if (aplicarEnvio && hamburguesas.length > 0) {
      total += precios.envio;
    }

    return total;
  };

  // Función para enviar el pedido a WhatsApp
  const enviarPedido = () => {
    const mensaje = hamburguesas
      .map((hamburguesa, index) => {
        return `Hamburguesa ${index + 1}: ${hamburguesa.tipoHamburguesa}\nPapas: ${hamburguesa.papas}\nBebida: ${hamburguesa.bebida}\nExtras: ${hamburguesa.extras.join(', ')}`;
      })
      .join('\n\n');

    const total = calcularTotal();
    const mensajeConTotal = `${mensaje}\n\nTotal: $${total}\nCosto de envío: ${aplicarEnvio ? `$${precios.envio}` : 'No aplicado'}`;

    window.open(`https://wa.me/5491128950624?text=${encodeURIComponent(mensajeConTotal)}`);
  };

  return (
    <div className="p-4 bg-[#08b988] text-white">
      {/* Header personalizado */}
      <header className="bg-[#001f18] p-4">
        <img src="/monkilogo.png" alt="Logo Monki Burgers" className="logo" />
        <h1 className="text-3xl text-center"></h1>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="https://instagram.com/monki_burgers"
            className="ig"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </div>
      </header>

      <div className="mt-10">
        {hamburguesas.map((hamburguesa, index) => (
          <div key={index} className="mb-6 p-4 bg-gray-200 text-black rounded-lg relative">
            <h3 className="text-lg font-semibold">Hamburguesa {index + 1}</h3>

            {hamburguesas.length > 1 && (
              <button
                onClick={() => eliminarHamburguesa(index)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg"
              >
                Eliminar
              </button>
            )}

            <div className="mb-4">
              <label>Elegi tu monki-hamburguesa! (todas incluyen papas)</label>
              <select
                value={hamburguesa.tipoHamburguesa}
                onChange={(e) =>
                  handleHamburguesaChange(index, 'tipoHamburguesa', e.target.value)
                }
                className="w-full mt-2 p-2 border"
              >
                <option value="">Selecciona una hamburguesa</option>
                {Object.keys(precios.hamburguesas).map(hamburguesa => (
                  <option key={hamburguesa} value={hamburguesa}>
                    {hamburguesa} - ${precios.hamburguesas[hamburguesa]}
                  </option>
                ))}
              </select>
            </div>

            {hamburguesa.tipoHamburguesa && (
              <div className="mb-4">
                <img
                  src={hamburguesasData.find((item) =>
                    hamburguesa.tipoHamburguesa.includes(item.nombre)
                  )?.imagen}
                  alt={hamburguesa.tipoHamburguesa}
                  className="w-full max-w-xs mx-auto"
                />
              </div>
            )}

            <div className="mb-4">
              <label>Caja de papas</label>
              <select
                value={hamburguesa.papas}
                onChange={(e) => handleHamburguesaChange(index, 'papas', e.target.value)}
                className="w-full mt-2 p-2 border"
              >
                <option value="">Selecciona tu caja de papas (opcional)</option>
                {Object.keys(precios.papas).map(papa => (
                  <option key={papa} value={papa}>
                    {papa} - ${precios.papas[papa]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label>Bebida</label>
              <select
                value={hamburguesa.bebida}
                onChange={(e) => handleHamburguesaChange(index, 'bebida', e.target.value)}
                className="w-full mt-2 p-2 border"
              >
                <option value="">Selecciona una bebida (opcional) </option>
                {Object.keys(precios.bebidas).map(bebida => (
                  <option key={bebida} value={bebida}>
                    {bebida} - ${precios.bebidas[bebida]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label>Extras para la monki-hamburguesa:</label>
              <div className="space-y-2 mt-2">
                {Object.keys(precios.extras).map(extra => (
                  <label key={extra} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={hamburguesa.extras.includes(extra)}
                      onChange={() => handleExtrasChange(index, extra)}
                      className="mr-2"
                    />
                    {extra} - ${precios.extras[extra]}
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button
  onClick={agregarHamburguesa}
  className="btn-agregar"
>
  Agregar otra hamburguesa
</button>

        <div className="mb-4">
          <label>
            <input
              type="checkbox"
              checked={aplicarEnvio}
              onChange={() => setAplicarEnvio(!aplicarEnvio)}
              className="mr-2"
            />
            Vivir a más de 4 km (se cobra envío de ${precios.envio})
          </label>
        </div>

        <div className="text-lg font-semibold mb-4">
          <p>Total del pedido: ${calcularTotal()}</p>
        </div>

        <button on Click={enviarPedido} className="btn-enviar">
  Enviar Pedido
</button>

      </div>
    </div>
  );
}

export default PedidoForm;
