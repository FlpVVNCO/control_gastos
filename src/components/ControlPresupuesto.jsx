import { useState, useEffect } from "react"
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)



    // PARA CALCULAR EL TOTAL GASTADO
    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)

        const totalDisponible = presupuesto - totalGastado;

        //Calcular el porcentaje gastado
        const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

        setDisponible(totalDisponible)
        setGastado(totalGastado)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 1000);

    }, [gastos])

    // transformar a dolar
    const formatearCantidad = (cantidad) =>{
            return cantidad.toLocaleString('es-CL', { 
                style: 'currency', 
                currency: 'CLP'
            })
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gasto?');

        if (resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">    
            <div>
                    <CircularProgressbar 
                    value={porcentaje}
                    text={`${porcentaje} % Gastado`}
                        styles={buildStyles({
                            pathColor: porcentaje > 100 ? '#A06898': '#f37e7e',
                            trailColor: '#f5f5f5',
                            textColor: porcentaje > 100 ? '#A06898': '#f37e7e'
                        })}
                    />
            </div>
            <div className="contenido-presupuesto">
                <button 
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo': ''}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto
