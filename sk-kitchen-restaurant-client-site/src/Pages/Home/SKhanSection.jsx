import SKimg from "../../assets/home/chef-service.jpg";

const SKhanSection = () => {
  return (
    <div className="py-16">
      <div
        className="hero py-16 md:w-6xl w-full mx-auto shadow-lg"
        style={{
          backgroundImage: `url(${SKimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay md:w-4xl mx-auto "></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-xl py-8">
            <h1 className="mb-5 text-5xl font-bold">SK Kitchen Restaurant</h1>
            <p className="mb-5">
              SK Kitchen Restaurant is a modern fusion restaurant offering a
              unique blend of global flavors and local ingredients. We create
              unforgettable dining experiences with exceptional service and
              chef-crafted dishes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SKhanSection;
