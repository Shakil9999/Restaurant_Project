
import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg1 from "../../../assets/menu/banner3.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import drinksImg from "../../../assets/menu/drinks-bg.jpg";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [menu] = useMenu()
     const dessert = menu.filter(item=>item.category === "dessert")
     const salad = menu.filter(item=>item.category === "salad")
     const pizza = menu.filter(item=>item.category === "pizza")
     const soup = menu.filter(item=>item.category === "soup")
     const offered = menu.filter(item=>item.category === "offered")
     const drinks = menu.filter(item=>item.category === "drinks")
  return (
    <div className="">
      <Helmet>
        <title>The SK Kitchen | Menu</title>
      </Helmet>
      
      <Cover coverImg={menuImg1} title="OUR MENU" description="Would you like to try a dish?"></Cover>
      <SectionTitle subHeading="Don't miss" heading="TODAY'S OFFER"></SectionTitle>
      
      <MenuCategory items={offered} title="offered"></MenuCategory>
      
      <Cover coverImg={dessertImg} title="DESSERTS" description="Desserts at SK Kitchen should aim to provide a satisfying and memorable end to the meal, balancing traditional Bangladeshi preferences with contemporary culinary trends. We should focus on freshness, appealing presentation, and a variety of textures and flavors."></Cover>
        <MenuCategory items={dessert} title="dessert"></MenuCategory>
        
        <Cover coverImg={saladImg} title="salads" description="SK Kitchen's salads should be vibrant, fresh, and offer a mix of light, refreshing options and more substantial meal-worthy choices. We'll focus on crisp, quality produce and appealing dressings."></Cover>
        <MenuCategory items={salad} title="salad"></MenuCategory>
        
        <Cover coverImg={pizzaImg} title="pizzas" description="Our pizzas at SK Kitchen should range from beloved classics to innovative creations, focusing on high-quality ingredients, a delicious crust, and appealing toppings that cater to both traditional and adventurous palates."></Cover>
        <MenuCategory items={pizza} title="pizza"></MenuCategory>
        
        <Cover coverImg={soupImg} title="soups" description="SK Kitchen's soups should offer comforting, flavorful, and varied choices, suitable as appetizers or lighter meals. We'll prioritize fresh ingredients and well-balanced broths."></Cover>
        <MenuCategory items={soup} title="soup"></MenuCategory>
        
        <Cover coverImg={drinksImg} title="drinks" description="SK Kitchen's drink menu should be diverse, offering refreshing, thirst-quenching options that complement our food, from classic sodas and juices to vibrant mocktails and traditional local beverages."></Cover>
        <MenuCategory items={drinks} title="drinks"></MenuCategory>
        
    </div>
  );
};

export default Menu;
