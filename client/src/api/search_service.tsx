import apiClient from "./api_client";
export default function useSearchService() {
	/*
        Возвращает такой же лист с пагинацией, как при listBots
        Те же методы сортировки, а также возможен поиск по тегам
    */
	const searchBots = async (
		url: string,
		query?: string,
		page?: number,
		pageSize?: number,
		sortBy?: number,
		method?: number,
		tags?: string[]
	) => {
		const params = new Map();
		if (query !== undefined) params.set("query", query);
		if (page !== undefined) params.set("page", page);
		if (pageSize !== undefined) params.set("page_size", pageSize);
		if (sortBy !== undefined) params.set("sort_by", sortBy);
		if (method !== undefined) params.set("method", method);

		if (tags !== undefined) {
			let tagsList = [];
			for (let i = 0; i < tags.length; i++) {
				tagsList.push(tags[i].name);
			}

			params.set("tags", tagsList.toString());
		}

		try {
			const res = await apiClient.get(url, {
				params: params,
				headers: {
					Authorization: "",
				},
			});
			return res.data;
		} catch (error: any) {
			throw new Error("SEARCH_ERROR");
		}
	};

	return { searchBots };
}
