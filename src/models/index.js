import { ProyeccionModel } from './ProyeccionModel';
// import { OtroModel } from './OtroModel'; 

export const modelFactory = (tipoHilo, data) => {
  const hilos = {
    proyeccion_estudiantes: ProyeccionModel,
    // financiero: OtroModel, 
  };

  const transformador = hilos[tipoHilo];
  return transformador ? transformador(data) : data;
};