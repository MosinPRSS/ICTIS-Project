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
		let params = {};
		if (query !== undefined) params.query = query;
		if (page !== undefined) params.page = page;
		if (pageSize !== undefined) params.page_size = pageSize;
		if (sortBy !== undefined) params.sort_by = sortBy;
		if (method !== undefined) params.method = method;

		if (tags !== undefined) {
			let tagsList = [];
			for (let i = 0; i < tags.length; i++) {
				tagsList.push(tags[i].name);
			}

			params.tags = tagsList.toString();
		}

		try {
			const res = await apiClient.get(url, {
				params: params,
				headers: {
					Authorization: "",
				},
			});
			console.log(params)
			return res.data;
		} catch (error: any) {
			throw new Error("SEARCH_ERROR");
		}
	};

	return { searchBots };
}
