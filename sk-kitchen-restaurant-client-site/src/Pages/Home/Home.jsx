
import Banner from "./Banner";
import Category from "./Category";
import SKhanSection from "./SKhanSection";
import PopularMenu from "./PopularMenu";
import ChefRecommended from "./ChefRecommended";
import Featured from "./Featured/Featured";
import Testimonials from "./Testimonials/Testimonials";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>SK Kitchen | Home</title>
      </Helmet>
      <Banner></Banner>
      <Category></Category>
      <SKhanSection></SKhanSection>
      <PopularMenu></PopularMenu>
      <ChefRecommended></ChefRecommended>
      <Featured></Featured>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
