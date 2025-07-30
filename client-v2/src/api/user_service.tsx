import { useNavigate } from "react-router";
import apiClient from "./api_client"


export default function useUserActions() {
    const navigate = useNavigate();

    const readAuthUser = async () => {

        try {
            const res = await apiClient.get('u/read')
            if (res.status === 200) {
                return res.data
            }
        } catch (error: any) {

        }
    }
}