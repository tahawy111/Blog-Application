import Layout from "../../components/Layout";
import "./home.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link } from "react-router-dom";
import CardVert from "../../components/CardVert";
import { IBlogs } from "../../utils/TypeScript";
const Home = () => {
  const { blogs } = useSelector((state: RootState) => state.blog);

  return (
    <Layout>
      <div className="home_page">
        {blogs?.map((homeBlog) => (
          <div key={homeBlog._id}>
            {homeBlog.count > 0 && (
              <>
                <h3>
                  <Link to={`/blogs/${homeBlog.name.toLowerCase()}`}>
                    {homeBlog.name} <small>({homeBlog.count})</small>
                  </Link>
                </h3>
                <hr className="mt-1" />

                <div className="home_blogs">
                  {homeBlog.blogs.map((blog: IBlogs) => (
                    <CardVert key={blog?._id} blog={blog} />
                  ))}
                </div>
              </>
            )}

            {homeBlog.count > 4 && (
              <Link
                className="text-end d-block mt-2 mb-3"
                to={`/blogs/${homeBlog.name}`}
              >
                Read more &gt;&gt;
              </Link>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
