import apiClient from "./api_client";

export default function useTagsService({ amount }: { amount: number }) {
	const getPopularTags = async () => {
		try {
			const res = await apiClient.get(`b/tags/${amount}`, {
				skipAuth: true,
			});
			if (res.status === 200) {
				return res.data;
			} else {
				return [];
			}
		} catch (error) {
			return [];
		}
	};

	return { getPopularTags };
}
