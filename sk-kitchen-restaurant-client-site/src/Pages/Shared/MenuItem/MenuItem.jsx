const MenuItem = ({ menu_item }) => {
  const { name, recipe, image, price } = menu_item;
  return (
   <div className="flex justify-between items-center gap-5">
  <div className="flex gap-5 items-center">
    <img
      style={{ borderRadius: "0 200px 200px 200px" }}
      className="w-[125px] h-[125px]"
      src={image}
      alt=""
    />
    <div>
      <h1 className="font-semibold text-xl">{name}---------------</h1>
      <p>{recipe}</p>
    </div>
  </div>
  <p className="text-xl font-semibold text-yellow-600">{price}</p>
</div>

  );
};

export default MenuItem;
