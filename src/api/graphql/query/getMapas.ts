export const GET_MAPS_QUERY = `
    {
        mapas {
            localizacao
            iframe
            descricao
            linkMapa
            imagens {
                id
                url
            }
        }
    }   
`;
