import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ICreateBlogProps } from "../../utils/TypeScript";

const Home = () => {
  const { blogs } = useSelector((state: RootState) => state.blog);

  return (
    <Layout>
      <div className="home_blogs">
        {blogs?.map((blog: ICreateBlogProps) => (
          <div key={blog.}></div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
