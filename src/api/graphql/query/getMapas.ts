export const GET_MAPS_QUERY = `
    {
        mapas {
            localizacao
            iframe
            descricao
            imagens {
                id
                url
            }
        }
    }   
`;
