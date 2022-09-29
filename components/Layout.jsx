import {Header} from "../components";
import FeaturedPosts from "../sections/FeaturedPosts";
function Layout({children}) {
  return (
    <>
      <Header />
      <FeaturedPosts />
      {children}
    </>
  );
}

export default Layout;
