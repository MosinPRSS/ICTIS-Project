import React from "react";

const DeleteConfirm = ({ entity, setShowDeleteConfirm, del }) => {
	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4 border border-red-500/20">
				<div className="flex items-center gap-3 mb-4">
					<div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center"></div>
					<div>
						<h3 className="text-lg font-semibold text-white">
							Удалить {entity}?
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
					<button
						onClick={del}
						className="flex-1 cursor-pointer px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors font-medium"
					>
						Удалить
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteConfirm;
