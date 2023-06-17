
const Alerta = ({alerta}) => {
    return (
      <div className={`${alerta.error ? 'bg-red-500' : 'from-indigo-400 to-indigo-600 '} bg-gradient-to-r p-3 text-center rounded-md text-white font-bold uppercase text-sm mb-10`}>
          {alerta.msg}
      </div>
    )
  }
  
  export default Alerta