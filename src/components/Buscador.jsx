import { useState } from "react"; 
import Convertir from "../helpers/Convertir";
import clima from "../assets/clima.svg"
import Alerta from "./Alerta";
import Spinner from "./Spinner";

const Buscador = () => {
    const [ciudad, setCiudad] = useState(""); 
    const [pais, setPais]= useState("");
    const [name, setName] = useState("");
    const [temp, setTemp]= useState("");
    const [temp_max, setTemp_max]= useState("");
    const [temp_min, setTemp_min] = useState("");
    const [mostrar, setMostrar] = useState(false); 
    const [alerta, setAlerta] = useState({}); 
    const [cargando, setCargando]= useState(false);    
    
  
    const handleSubmit = async e => {
        e.preventDefault();         

        if([ciudad, pais].includes("")){
            setAlerta({
                msg: "No debe haber campos vacios", 
                error: true
            }) 
            return;

        }

        setCargando(true)       
        
        const appID = '531bd3a1caefdac03b18dd7a4e465b8c';
        const url1= `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&appid=${appID}`

        try {
            const respuesta = await fetch(url1); 
            const jsonData = await respuesta.json();            

            const lat = jsonData.map(obj => obj.lat);       
            const lon = jsonData.map(obj => obj.lon);          

            const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appID}`;

            const respuesta2 = await fetch(url2);            
            const jsonDataAPI = await respuesta2.json();
            
            setTimeout(() => {
                setCargando(false);
            }, 800);

            const {name, main:{temp, temp_max, temp_min}} = jsonDataAPI;             

            setName(name); 
            setTemp_min(Convertir(temp_min)); 
            setTemp_max(Convertir(temp_max)); 
            setTemp(Convertir(temp));         
            setMostrar(true);             
            
            setCiudad("");
            setPais("")

        } catch (error) {
            console.log(error)
        }        
        
    }    
    
    const {msg} = alerta; 

    return (
    <>  
    <div className=' p-5 mt-5 mb-1 mx-5 bg-white rounded-md shadow-sm md:p-5'>
        <h1 className="text-center mb-10 font-bold font text-5xl">Clima App</h1>
        <h3 className="mb-4 text-center text-2xl">Introduce los datos de tu ciudad para conocer su clima</h3>
        <form
            onSubmit={handleSubmit}
        >
            { msg && <Alerta
                alerta={alerta}
            />
            }

            <div className="flex flex-col">
                <label
                    htmlFor="ciudad"
                    className="mb-3"
                >Introduce tu ciudad</label>
                <input
                    id="ciudad"
                    type="text"
                    className="w-full border border-slate-300 rounded-sm p-2 mb-3 bg-gray-100 focus:border-gray-600  focus:outline-none"
                    placeholder="Ciudad"
                    value={ciudad}
                    onChange={e=>setCiudad(e.target.value)}
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="pais"
                    className="mb-3"
                >Selecciona tu País</label>
                <select
                    id="pais"
                    type="select"
                    className="w-full border border-slate-300 rounded-sm p-2"
                    value={pais}
                    onChange={e => setPais(e.target.value)}
                >
                    <option disabled defaultValue value="">-- Seleccione --</option>
                        <option value="AR">Argentina</option>
                        <option value="CO">Colombia</option>
                        <option value="CR">Costa Rica</option>
                        <option value="ES">España</option>
                        <option value="US">Estados Unidos</option>
                        <option value="MX">México</option>
                        <option value="PE">Perú</option>
                </select>
                
            </div>
            <input 
                type="submit"
                className="mt-5 w-full border-2 border-sky-500 p-2 uppercase font-bold cursor-pointer rounded hover:bg-sky-500 hover:text-zinc-50"
                value="Obtener Clima"
            />
        </form>
    </div> 
    <div className='p-5 mt-1 md:mt-5 mb-1 mx-5 bg-white rounded-md shadow-sm md:p-5'>
        
        {!mostrar && (
            <>
                <div className="flex flex-col items-center justify-center h-full">
                    <div>
                        <img
                            className=" w-1/2 mx-auto"
                            src={clima}
                        />
                    </div>                   
                    <div>
                        <p className="font-bold">El resultado aparecerá aquí</p>
                    </div>
                </div>
                
            </>
        ) }           

        {mostrar && (
            <>
                
                <div className="flex flex-col items-center justify-center h-full ">

                {cargando ? <Spinner/> : (
                    <> <p className="font-bold text-center text-gray-800 text-2xl my-2">Clima en {name}</p>
                    <p className="font-bold  text-gray-800 text-5xl my-2">Actual: {temp} °C</p>  
                    <p className="font-bold  text-gray-800 text-2xl my-2">Máximo: {temp_max} °C</p>                      
                    <p className="font-bold  text-gray-800 text-2xl my-2">Mínimo: {temp_min} °C</p> 
                    </>
                    
                )} 
                                        
                    
                </div>
            </>
        )}


        
    </div>
        

    </>
  )
}

export default Buscador