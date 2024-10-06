import { Axios } from "axios";

declare module 'vue' {
    declare interface ComponentCustomProperties {
        $client: Axios
        $django_client: Axios
    }
}
