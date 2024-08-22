/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewPosts, getAllPosts, getAllTag, updatePosts } from "../../services/posts";

interface Post {
  title: string;
  description: string;
  tags: string[];
}

interface FormErrors {
  title?: string;
  description?: string;
  tags?: string;
}

const FormPost: React.FC<{ id?: string }> = ({ id }) => {
  const [formData, setFormData] = useState<Post>({
    title: "",
    description: "",
    tags: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postData, tagsData] = await Promise.all([
          id ? getAllPosts() : Promise.resolve(null),
          getAllTag()
        ]);

        if (postData && id) {
          const post = postData.data?.posts?.find((post: any) => post.id === id);
          if (post) {
            setFormData({
              title: post.title || "",
              description: post.description || "",
              tags: Array.isArray(post.tags) ? post.tags : [],
            });
          }
        }

        setAvailableTags(tagsData.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) newErrors.title = "Vui lòng nhập tiêu đề";
    if (!formData.description.trim()) newErrors.description = "Vui lòng nhập mô tả";
    if (formData.tags.length === 0) newErrors.tags = "Vui lòng chọn tags";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleTagChange = (tagName: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagName)
        ? prev.tags.filter(t => t !== tagName)
        : [...prev.tags, tagName],
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (id) {
          await updatePosts(id, formData);
        } else {
          await addNewPosts(formData);
        }
        alert(`${id ? "Cập nhật" : "Thêm"} bài post thành công`);
        navigate("/profile");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div className="mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {id ? "Cập nhật" : "Thêm mới"} bài post
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
          {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleTagChange(tag)}
                className={`px-3 py-1 rounded-full text-sm font-semibold 
                  ${formData.tags.includes(tag)
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {errors.tags && <span className="text-red-500 text-sm">{errors.tags}</span>}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          {id ? "Cập nhật bài post" : "Thêm bài post"}
        </button>
      </form>
    </div>
  );
};

export default FormPost;