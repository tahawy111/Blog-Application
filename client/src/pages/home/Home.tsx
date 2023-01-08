import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { IBlogs } from "../../utils/TypeScript";

const Home = () => {
  const { blogs } = useSelector((state: RootState) => state.blog);

  return (
    <Layout>
      <div className="home_blogs">
        {blogs?.map((blog: IBlogs) => (
          <div key={blog._id}></div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
