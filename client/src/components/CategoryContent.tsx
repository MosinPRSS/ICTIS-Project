import React, { useState, useEffect, useRef } from 'react';
import CategoryFilter from './CategoryFilter';

type ContentItem = {
  id: number;
  title: string;
  categories: string[];
};

const allCategories = ['Категория 1', 'Категория 2', 'Категория 3', 'Категория 4'];

const CategoryContent: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const mockData: ContentItem[] = Array.from({ length: 10 }, (_, i) => ({
        id: (page - 1) * 10 + i + 1,
        title: `Контент ${ (page - 1) * 10 + i + 1 }`,
        categories: [allCategories[Math.floor(Math.random() * allCategories.length)]]
      }));
      setContent((prev) => [...prev, ...mockData]);
    };
    fetchData();
  }, [page]);

  const filteredContent = selectedCategories.length === 0
    ? content
    : content.filter((item) =>
        selectedCategories.every((cat) => item.categories.includes(cat))
      );

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => [...prev, category]);
  };

  const handleCategoryRemove = (category: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  return (
    <div className="p-4">
      <CategoryFilter
        categories={allCategories}
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
        onCategoryRemove={handleCategoryRemove}
      />
      <div className="grid gap-4">
        {filteredContent.map((item) => (
          <div key={item.id} className="p-4 border rounded shadow">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">Категории: {item.categories.join(', ')}</p>
          </div>
        ))}
      </div>
      <div ref={loaderRef} className="h-10"></div>
    </div>
  );
};

export default CategoryContent;