  import { useState, useEffect } from 'react';

  export function useFetch(url){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect( () => {
      if (!url) {
        setLoading(false);
        return;
      }

      let ignore = false; // flag: ignora resultado se o effect já foi limpo

      //Função que busca a API
      const fetchData = async () => {
        setLoading(true); //Ativa o Loading quando começa a busca
        setError(null); // Reseta erros anteriores

        try{
          const response = await fetch(url);
          const json = await response.json();

          if (!ignore) setData(json);
        }catch (err){
          if (!ignore) {
            setError(err.message);
            setData(null);
          }
        }finally{
          if (!ignore) setLoading(false);
        }
      };
      
      fetchData();

      // Cleanup: roda quando a url muda ou o componente desmonta.
      return () => {
        ignore = true;
      };
    }, [url]); //UseEffect roda toda vez que a variável url muda.

    //Retorna os estados em forma de objetos, dessa maneira é possível pegar o qual variável quiser.
    return { data, loading, error }; 
  }