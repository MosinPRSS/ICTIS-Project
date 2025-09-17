"use client";
import React, { useState } from "react";

const UserProfile: React.FC = () => {
	const [profile, setProfile] = useState({
		username: "Qua11ra",
		email: "m@example.com",
		description: "",
	});

	const [activeFilter, setActiveFilter] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = 69;

	const [userBots] = useState([
		{ id: 1, name: "Ассистент по коду", isPublic: true, likes: 42 },
		{ id: 2, name: "Чат-бот поддержки", isPublic: false, likes: 15 },
		{ id: 3, name: "Аналитик данных", isPublic: true, likes: 87 },
		{ id: 4, name: "Креативный писатель", isPublic: true, likes: 23 },
		{ id: 5, name: "Технический советник", isPublic: false, likes: 56 },
		{ id: 6, name: "Личный помощник", isPublic: true, likes: 31 },
	]);

	const [isEditing, setIsEditing] = useState(false);
	const [editForm, setEditForm] = useState(profile);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	const currentDate = new Date().toLocaleDateString("ru-RU", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const handleSave = () => {
		setProfile(editForm);
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditForm(profile);
		setIsEditing(false);
	};

	const handleDescriptionChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setEditForm((prev) => ({
			...prev,
			description: e.target.value,
		}));
	};

	const filters = [
		{ id: "all", label: "Все" },
		{ id: "public", label: "Публичные" },
		{ id: "private", label: "Приватные" },
		{ id: "favorites", label: "Избранные" },
	];

	const getFilteredBots = () => {
		let filtered = userBots;

		switch (activeFilter) {
			case "public":
				filtered = userBots.filter((bot) => bot.isPublic);
				break;
			case "private":
				filtered = userBots.filter((bot) => !bot.isPublic);
				break;
			case "favorites":
				filtered = userBots.filter((bot) => bot.likes > 30);
				break;
			default:
				filtered = userBots;
		}

		const startIndex = (currentPage - 1) * 8;
		return filtered.slice(startIndex, startIndex + 8);
	};

	const filteredBots = getFilteredBots();
	const totalFilteredBots = userBots.filter((bot) => {
		switch (activeFilter) {
			case "public":
				return bot.isPublic;
			case "private":
				return !bot.isPublic;
			case "favorites":
				return bot.likes > 30;
			default:
				return true;
		}
	}).length;

	const totalPagesForFilter = Math.ceil(totalFilteredBots / 8);

	// Генерация номеров страниц для пагинации
	const getPageNumbers = () => {
		const pages = [];

		if (totalPagesForFilter <= 5) {
			for (let i = 1; i <= totalPagesForFilter; i++) {
				pages.push(i);
			}
		} else {
			pages.push(1);

			if (currentPage > 3) {
				pages.push("...");
			}

			const start = Math.max(2, currentPage - 1);
			const end = Math.min(totalPagesForFilter - 1, currentPage + 1);

			for (let i = start; i <= end; i++) {
				if (i !== 1 && i !== totalPagesForFilter) {
					pages.push(i);
				}
			}

			if (currentPage < totalPagesForFilter - 2) {
				pages.push("...");
			}

			pages.push(totalPagesForFilter);
		}

		return pages;
	};

	return (
		<div className="w-full p-4 pt-2">
			<div className="max-w-6xl mx-auto mb-4">
				<h1 className="text-3xl font-bold text-white text-center">
					Профиль пользователя
				</h1>
			</div>

			<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-120px)]">
				<div className="lg:col-span-1 h-full">
					<div
						className={`backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col`}
					>
						<div className="flex flex-col items-center gap-4 mb-6">
							<div
								className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center"
								style={{
									background:
										"linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
								}}
							>
								<span className="text-white text-2xl font-bold">
									{profile.username.charAt(0).toUpperCase()}
								</span>
							</div>
							<div className="text-center">
								<h1 className="text-2xl font-bold text-white">
									{profile.username}
								</h1>
								<p className="text-purple-300 text-sm">
									{profile.email}
								</p>
								<p className="text-purple-400 text-xs mt-1">
									{currentDate}
								</p>
							</div>
						</div>

						<div className="mb-6 flex-1">
							<h3 className="text-purple-300 text-sm font-medium mb-2">
								Описание
							</h3>
							{isEditing ? (
								<textarea
									value={editForm.description}
									onChange={handleDescriptionChange}
									placeholder="Описание отсутствует"
									className={`w-full rounded-lg p-4 text-white min-h-[120px] resize-y border-2 border-purple-400/50 backdrop-blur-sm shadow-lg shadow-purple-500/20 focus:border-purple-400 focus:shadow-purple-500/40 transition-all duration-200`}
									style={{
										minHeight: "120px",
										maxHeight: "300px",
									}}
								/>
							) : (
								<div
									className={`rounded-lg p-4 text-white min-h-[120px] max-h-[300px] overflow-y-auto backdrop-blur-sm`}
								>
									{profile.description ||
										"Описание отсутствует"}
								</div>
							)}
						</div>

						<div className="space-y-3">
							{isEditing ? (
								<>
									<button
										onClick={handleSave}
										className="w-full flex cursor-pointer items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
									>
										Сохранить
									</button>
									<button
										onClick={handleCancel}
										className="w-full flex cursor-pointer items-center justify-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
									>
										Отмена
									</button>
								</>
							) : (
								<>
									<button
										onClick={() => setIsEditing(true)}
										className="w-full flex cursor-pointer items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
									>
										Редактировать профиль
									</button>
									<button
										onClick={() =>
											setShowDeleteConfirm(true)
										}
										className="w-full flex cursor-pointer items-center justify-center gap-2 bg-red-600/80 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
									>
										Удалить профиль
									</button>
								</>
							)}
						</div>
					</div>
				</div>

				<div className="lg:col-span-2 h-full">
					<div
						className={`backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col`}
					>
						<div className="flex flex-wrap gap-2 justify-center mb-6">
							{filters.map((filter) => (
								<button
									key={filter.id}
									onClick={() => {
										setActiveFilter(filter.id);
										setCurrentPage(1);
									}}
									className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
										activeFilter === filter.id
											? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
											: "bg-purple-900/50 text-purple-300 hover:text-white hover:bg-purple-800/50"
									}`}
								>
									{filter.label}
								</button>
							))}
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-4 flex-1 overflow-y-auto">
							{filteredBots.map((bot) => (
								<div
									key={bot.id}
									className="bg-gray-800/80 backdrop-blur-md rounded-xl p-4 border border-pink-300/30 shadow-md shadow-pink-400/20 hover:bg-gray-700/80 transition-all duration-200 hover:scale-105 h-48 w-full"
								>
									<div className="flex items-center justify-center mb-3">
										<div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center"></div>
									</div>

									<h3 className="text-white font-semibold text-center mb-3 text-sm truncate">
										{bot.name}
									</h3>

									<div className="flex items-center justify-between text-xs gap-2 mt-4">
										<span
											className={`px-2 py-1 rounded-full ${
												bot.isPublic
													? "bg-green-500/20 text-green-300"
													: "bg-purple-500/20 text-purple-300"
											}`}
										>
											{bot.isPublic
												? "Публичный"
												: "Приватный"}
										</span>
										<div className="flex items-center gap-1 text-pink-300">
											<span className="text-xs">
												{bot.likes}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>

						{filteredBots.length === 0 && (
							<div className="text-center py-12 flex-1 flex flex-col items-center justify-center">
								<p className="text-purple-300 text-lg mb-2">
									У вас пока нет ботов
								</p>
							</div>
						)}

						{/* Пагинация - выровнена по центру под ботами */}
						{totalFilteredBots > 6 && (
							<div className="flex justify-center items-center gap-2 mt-auto pt-4">
								<button
									onClick={() =>
										setCurrentPage((prev) =>
											Math.max(prev - 1, 1)
										)
									}
									disabled={currentPage === 1}
									className="p-2 rounded-lg bg-purple-900/50 text-purple-300 hover:text-white hover:bg-purple-800/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
								></button>

								<div className="flex items-center gap-1">
									{getPageNumbers().map((page, index) => (
										<React.Fragment key={index}>
											{page === "..." ? (
												<span className="px-2 py-1 text-purple-400">
													...
												</span>
											) : (
												<button
													onClick={() =>
														setCurrentPage(
															page as number
														)
													}
													className={`px-3 py-1 rounded text-sm transition-colors ${
														currentPage === page
															? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
															: "text-purple-300 hover:text-white"
													}`}
												>
													{page}
												</button>
											)}
										</React.Fragment>
									))}
								</div>

								<button
									onClick={() =>
										setCurrentPage((prev) =>
											Math.min(
												prev + 1,
												totalPagesForFilter
											)
										)
									}
									disabled={
										currentPage === totalPagesForFilter
									}
									className="p-2 rounded-lg bg-purple-900/50 text-purple-300 hover:text-white hover:bg-purple-800/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
								></button>
							</div>
						)}
					</div>
				</div>
			</div>

			{showDeleteConfirm && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
					<div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4 border border-red-500/20">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center"></div>
							<div>
								<h3 className="text-lg font-semibold text-white">
									Удалить аккаунт?
								</h3>
								<p className="text-sm text-gray-400">
									Это действие нельзя отменить
								</p>
							</div>
						</div>

						<div className="flex gap-3">
							<button
								onClick={() => setShowDeleteConfirm(false)}
								className="flex-1 cursor-pointer px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
							>
								Отмена
							</button>
							<button className="flex-1 cursor-pointer px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors font-medium">
								Удалить
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserProfile;
