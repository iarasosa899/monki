import React, { useState, useEffect } from 'react';
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
  }
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
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(calcularTotal());
  }, [hamburguesas]);

  const handleHamburguesaChange = (index, field, value) => {
    const nuevasHamburguesas = [...hamburguesas];
    nuevasHamburguesas[index][field] = value;
    setHamburguesas(nuevasHamburguesas);
  };

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

  const eliminarHamburguesa = (index) => {
    const nuevasHamburguesas = hamburguesas.filter((_, i) => i !== index);
    setHamburguesas(nuevasHamburguesas);
  };

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

  const calcularTotal = () => {
    let total = 0;

    hamburguesas.forEach(hamburguesa => {
      if (hamburguesa.tipoHamburguesa) {
        total += precios.hamburguesas[hamburguesa.tipoHamburguesa] || 0;
      }

      if (hamburguesa.bebida) {
        total += precios.bebidas[hamburguesa.bebida] || 0;
      }

      if (hamburguesa.papas) {
        total += precios.papas[hamburguesa.papas] || 0;
      }

      hamburguesa.extras.forEach(extra => {
        total += precios.extras[extra] || 0;
      });
    });

    return total;
  };

  const enviarPedido = () => {
    const mensaje = hamburguesas
      .map((hamburguesa, index) => {
        return `Hamburguesa ${index + 1}: ${hamburguesa.tipoHamburguesa}\nPapas: ${hamburguesa.papas}\nBebida: ${hamburguesa.bebida}\nExtras: ${hamburguesa.extras.join(', ')}`;
      })
      .join('\n\n');

    const total = calcularTotal();
    const mensajeConTotal = `${mensaje}\n\nTotal: $${total}`;

    window.open(`https://wa.me/5491128950624?text=${encodeURIComponent(mensajeConTotal)}`);
  };

  return (
    <div className="p-4 bg-[#08b988] text-white">
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
        <div className="flex flex-wrap -mx-4">
          {hamburguesas.map((hamburguesa, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-6">
              <div className="p-4 bg-gray-200 text-black rounded-lg relative">
                <h3 className="text-lg font-semibold">Hamburguesa {index + 1}</h3>

                {hamburguesas.length > 1 && (
                  <button
                    onClick={() => eliminarHamburguesa(index)}
                    className="absolute top-2 right-2 bg-[#a52a2a] text-[#f5a623] px-2 py-1 rounded-lg"
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
                    className="w-full mt-2 p-2 border border-[#a52a2a] bg-white text-black"
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
                  <label>Caja de Papas</label>
                  <select
                    value={hamburguesa.papas}
                    onChange={(e) =>
                      handleHamburguesaChange(index, 'papas', e.target.value)
                    }
                    className="w-full mt-2 p-2 border border-[#a52a2a] bg-white text-black"
                  >
                    <option value="">Selecciona tu caja de papas (opcional)</option>
                    {Object.keys(precios.papas).map(papas => (
                      <option key={papas} value={papas}>
                        {papas} - ${precios.papas[papas]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label>Bebidas</label>
                  <select
                    value={hamburguesa.bebida}
                    onChange={(e) =>
                      handleHamburguesaChange(index, 'bebida', e.target.value)
                    }
                    className="w-full mt-2 p-2 border border-[#a52a2a] bg-white text-black"
                  >
                    <option value="">Selecciona una bebida (opcional)</option>
                    {Object.keys(precios.bebidas).map(bebida => (
                      <option key={bebida} value={bebida}>
                        {bebida} - ${precios.bebidas[bebida]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label>Extras</label>
                  {Object.keys(precios.extras).map(extra => (
                    <div key={extra} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={hamburguesa.extras.includes(extra)}
                        onChange={() => handleExtrasChange(index, extra)}
                        className="mr-2"
                      />
                      <label>{extra} - ${precios.extras[extra]}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={agregarHamburguesa}
            className="bg-[#4A3830] text-[#FF9633] px-4 py-2 rounded-full"
          >
            Agregar Hamburguesa!
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-2xl font-semibold">Total: ${total}</h2>
        <button
          onClick={enviarPedido}
          className="bg-[#4A3830] text-[#FF9633] px-4 py-2 rounded-full mt-4"
        >
          Enviar Pedido a wsp 
        </button>
      </div>
      <footer className="bg-[#001f18] p-4 mt-10 text-center text-white">
        <p>2024 Monki Burgers ® Todos los derechos reservados.</p>
        <p>Desarrollado por el equipo Monki Burgers</p>
      </footer>
    </div>
  );
}

export default PedidoForm;