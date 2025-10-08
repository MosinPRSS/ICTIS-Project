import apiClient from "./api_client";

export default function useTagsService() {
	/*
	возвращает следующее:
	[
		{
			"name": "hello",
			"num_times": 1
		},
		{
			"name": "world",
			"num_times": 1
		}
	]
	
	*/
	const getPopularTags = async (amount: number) => {
		try {
			const res = await apiClient.get(`b/tags/${amount}`, {
				headers: {
					Authorization: "" // спасение
				}
			});
			if (res.status === 200) {
				return res.data;
			} else {
				return [];
			}
		} catch (error) {
			throw new Error("T_ERROR_LIST");
		}
	};

	return { getPopularTags };
}
