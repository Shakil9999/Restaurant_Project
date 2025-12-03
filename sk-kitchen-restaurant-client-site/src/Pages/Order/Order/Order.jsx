import Cover from "../../Shared/Cover/Cover";
import orderBanner from "../../../assets/shop/banner2.jpg";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import useMenu from "../../../Hooks/useMenu";

import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Order = () => {
  const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
  const {category}= useParams()
  const initialIndex = categories.indexOf(category)
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();

  const dessert = menu.filter((item) => item.category === "dessert");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const soup = menu.filter((item) => item.category === "soup");
  // const offered = menu.filter((item) => item.category === "offered");
  const drinks = menu.filter((item) => item.category === "drinks");
  return (
    <div>
            <Helmet>
              <title>SK Kitchen | Order Now</title>
            </Helmet>
      <Cover
        coverImg={orderBanner}
        title="order now"
        description="Sometimes, the server might repeat your order back to you to ensure accuracy. Listen carefully and confirm if everything is correct."
      ></Cover>

      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessert</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel >
           <OrderTab orderedItem={salad}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab orderedItem={pizza}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab orderedItem={soup}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab orderedItem={dessert}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab orderedItem={drinks}></OrderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
