import { useNavigate } from "react-router-dom";
import apiClient from "./api_client"

export default function useTagsService({amount}) {
    const navigate = useNavigate();

    const getPopularTags = async () => {
        try {
            const res = await apiClient.get(`b/tags/${amount}`, {
                skipAuth: true,
            });
            if (res.status === 200) {
                return res.data
            } else {
                navigate(`error/${res.status}`);
                return []
            }
        } catch (error) {
            navigate("error/500");
            return []
        }
    }

    return { getPopularTags };
}