
import { useState, useEffect } from 'react';

export function useFetch(url){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
        const fetchData = async () => {

            setLoading(true); //Ativa o Loading quando começa a busca
            setError(null); // Reseta erros anteriores

            try{
                const response = await fetch(url);
                if (!response.ok){
                    throw new Error("Erro ao buscar a API");
                }

                const json = await response.json();
                setData(json); //Guarda os dados.
            }catch (err){
                setError(err.message); //Guarda o erro, caso aconteça.
                setData(null);
            }finally{
                setLoading(false);
            }
        };

        if(!url){
            return;
        }else{
            fetchData(); //Se tiver URL ele chama a função
        }
    }, [url]); //UseEffect roda toda vez que a variável muda.

    return { data, loading, error };
}