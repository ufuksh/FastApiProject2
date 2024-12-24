import {defineStore} from "pinia";
import {OpenAPIClientAxios} from "openapi-client-axios";
import {Client} from "@/backend_t/backend";


export const useBackendStore= defineStore("backend",()=>{
    const api = new OpenAPIClientAxios({
        definition: 'http://35.158.119.153:8000/openapi.json',
        withServer:{
            url:'http://35.158.119.153:8000',
            description:"Localhost"
        }
    });

    async function backend(){
        await api.init<Client>()
        return await api.getClient<Client>()
    }

    return {backend}

})

//BACKEND BAĞLANTISI TAMAMLANDI...
//eğerki backend kısmında değişiklik yaparsan < npx openapicmd typegen http://35.158.119.153:8000/openapi.json > src/backend_t/backend.d.ts> çalıştır
