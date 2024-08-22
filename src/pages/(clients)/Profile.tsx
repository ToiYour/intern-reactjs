import { AxiosError } from "axios";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDebounceCallback } from "../../common/hook";
import { deletePostById, getAllPosts, getAllTag } from "../../services/posts";
import Pagination from "../../components/(clients)/Pagination";

interface IPost {
  description: string;
  id: string;
  tags: string[];
  title: string;
}

const ProfilePage = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [SearchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resTag, resPosts] = await Promise.all([
          getAllTag(),
          getAllPosts(location.search),
        ]);
        setCurrentPage(resPosts.data.current_page);
        setTotalPages(resPosts.data.total_page);
        setTags(resTag?.data || []);
        setPosts(resPosts?.data?.posts || []);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error.response?.data);
        }
      }
    };

    fetchData();
  }, [SearchParams]);

  const handleSearch = useDebounceCallback(
    async (colum: string, keyword: string) => {
      const filter: Record<string, string> = {};

      for (const [key, value] of SearchParams.entries()) {
        filter[key] = value;
      }

      if (keyword) {
        filter[colum] = keyword;
      } else {
        delete filter[colum];
      }

      setSearchParams(filter);
      const { data } = await getAllPosts(location.search);
      setPosts(data.posts);
      setCurrentPage(data.current_page);
      setTotalPages(data.total_page);
    },
    700
  );

  const handleDeletePost = async (id: string) => {
    if (confirm("Bạn chắc chắn xoá chứ!")) {
      try {
        await deletePostById(id);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error.response?.data);
        }
      }
    }
  };

  const memoizedTags = useMemo(() => tags, [tags]);

  return (
    <>
    <h2 className="text-3xl mb-3 mt-14">Danh sách bài posts</h2>
      <div className="w-full mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link
          to="/profile/add"
          className="bg-purple-500 text-white px-5 md:px-10 py-2 rounded-full w-full md:w-auto text-center"
        >
          Add new
        </Link>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <input
            onChange={(e) => handleSearch("title", e.target.value)}
            type="text"
            placeholder="Title"
            className="border p-2 rounded w-full md:w-auto"
          />
          <select
            className="border p-2 rounded w-full md:w-auto"
            onChange={(e) => handleSearch("tags", e.target.value)}
          >
            <option value="">All Tags</option>
            {memoizedTags.map((tag) => (
              <option key={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Tags
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-0.5 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900 ">{post.id}</div></td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{post.title}</div>
                  <div className="text-sm text-gray-500 md:hidden">{post.description}</div>
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <div className="text-sm text-gray-900 max-w-xs overflow-hidden overflow-ellipsis">{post.description}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                  <div className="text-sm text-gray-900">
                    {Array.isArray(post.tags) ? post.tags.join(", ") : ""}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/profile/${post.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: number) => {
            setCurrentPage(page);
            handleSearch("page", String(page));
          }}
        />
      </div>
    </>
  );
};

export default ProfilePage;