
import { Parallax } from 'react-parallax';

const Cover = ({ coverImg, title, description }) => {
  return (
    <Parallax
      blur={{ min: -50, max: 50 }}
      bgImageStyle={{height: '50px', maxWidth: '75px', opacity: '.5'}}
      bgImage={coverImg}
      bgImageAlt="the menu"
      strength={-200}
    >
      <div
        className="hero h-[600px] mb-16"
        style={{
          backgroundImage: `url("${coverImg}")`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center bg-black/30 md:py-32 md:px-52">
          <div className="max-w-sm ">
            <h1 className="mb-5 text-6xl font-bold uppercase">{title}</h1>
            <p className="mb-5">{description}</p>
            {/* <button className="btn btn-primary">Get Started</button> */}
          </div>
        </div>
      </div>
      {/* <div style={{ height: "200px" }} /> */}
    </Parallax>
  );
};

export default Cover;
