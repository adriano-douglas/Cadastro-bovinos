import axios from 'axios';

const API_URL = 'http://localhost:8080/bovino';

const saveBovino = async (data) => {
    try {
        const response = await axios.post(`${API_URL}`, data);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

const fetchBovinosPorBrincoOuNome = async (consulta) => {
    try {
      const response = await axios.get(`${API_URL}/buscar/${consulta}`);
      const bovinos = response.data;
      return bovinos;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const fetchBovinos = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      const bovinos = response.data;
      return bovinos;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const fetchBrincosMacho = async () => {
    try {
      const response = await axios.get(`${API_URL}/machos/brincos`);
      const machos = response.data;
      return machos;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  const fetchBrincosFemea = async () => {
    try {
      const response = await axios.get(`${API_URL}/femeas/brincos`);
      const femeas = response.data;
      return femeas;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  export const bovinoService = { fetchBrincosMacho, 
                                 fetchBrincosFemea, 
                                 fetchBovinos,
                                 fetchBovinosPorBrincoOuNome,
                                 saveBovino
                                };