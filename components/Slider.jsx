import { useRef, useState } from "react";
import Slider from "react-slick";

const PrevArrow = (props) => {
  const { onClick } = props;

  return <div className={"slick-arrow prev"} onClick={onClick} />;
};

const NextArrow = (props) => {
  const { onClick } = props;

  return <div className={"slick-arrow next"} onClick={onClick} />;
};

const SliderComponent = ({ product }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (_, newIndex) => {
      setCurrent(newIndex);
    },
  };

  const sliderRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const handleOnclick = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  return (
    <div className="product-slider slider">
      <Slider {...settings} ref={sliderRef}>
        {product.images.map((item, index) => (
          <div className="slider-item" key={index}>
            <img
              src={item}
              alt={`${product.title}（${product.subCategory.title}）`}
            />
          </div>
        ))}
      </Slider>
      <div className="slider-dots">
        <ul>
          {product.images.map((item, index) => (
            <li
              key={index}
              onClick={() => handleOnclick(index)}
              className={current === index ? "is-current" : ""}
            >
              <img
                src={item}
                alt={`${product.title}（${product.subCategory.title}）`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SliderComponent;
