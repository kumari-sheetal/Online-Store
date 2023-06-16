import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  const categoryImages = [
    {
      image1:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSAhF45IrOCyXGAa49jHORnVj-6RhZM5HTcmrRPnybn-Gr2V4tYvCu8XUe0FAYTioZf1oPoj3Z8-BRnuN7tdIKVfA9iw_toO6UGNdHKm-4&usqp=CAE",
      image2:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRId1bMx70cksSNtD5FXD_0VpPEE0REzWOFchFbYkDdJYvUNgptlaRpIpxJkdAP-VqUzxE&usqp=CAU",
    },
    {
      image1:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQIK1frnwFqCTbgimi-2tip_SOI0wWdn8blww&usqp=CAU",
      image2:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQOrhlCPyGTYv_05avcHdlJ9x4nO7GP1cU-UOeEZkzONlTi_YWrn9oEHnY4XFm7bvFyx0&usqp=CAU",
    },
    {
      image1:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5H69U4s2eq51Ye-CZ9pwhh3kTlHYIzJEHnQ&usqp=CAU",
      image2:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhQL11BUl5M28PvUYBpUcsXtOSAhR_wRHAiEmfcdFky6T8Sz4WAebrbdl74JOry65oVoI&usqp=CAU",
    },
    {
      image1:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6hAA2aW3CZDB89_pGbKEwnglqjgFrEXPXC1pRneXA_grB3SztYbBmluCm9h1r0T2Rg2U&usqp=CAU",
      image2:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9JWDu3YmtrfRJKCysuckdNkS_CTNp6MP2J7ED-HMdWTX9PDG89ZhrS_jj1A63LGkbwPM&usqp=CAU",
    },
    {
      image1:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV2CK-lL98uGRPELzoAxDHA_uA9KP5_7quyA&usqp=CAU",

      image2:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5TjelKglVKd0jytLjpza3M9CSlScbUdvk9otyS6Krn1x4jym49Ws96D-2ZHP_rr4zuCc&usqp=CAU",
    },
    {
      image1:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl6s1ys-BwDSibEZZhTryEQ8reJGwDVFcQ8Q&usqp=CAU",
      image2:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz9hkubK32RQZlRwd9QtUDig0yw2W_PyeYGQ&usqp=CAU",
    },
    {
      image1:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx-bLV2x7M_dRdJweyZx-PA0g73gsh9BDKA1FL7Dy8qFnUq29rnvxy-O2rX7sW_Up3F_w&usqp=CAU",
      image2:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-5IWlB9ljecudLsLktngic05CfmwJ-k0O7NM-KnY5TvqXkgWqpg4MyswMn_Mxi_DU8fY&usqp=CAU",
    },
    {
      image1:
        "https://i.pinimg.com/736x/d1/e5/14/d1e51469ac90e84667f8dee571c41556.jpg",
      image2:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQahuTra2oXtIosXCMcA9FjIM-az_MDQQ1iNoyWGPIjAIswLXQGLscQYdQrQlI3XFU5Yqc&usqp=CAU",
    },
    {
      image1:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgkn5aw9tsSRGZS8ePlSKmipZBULXpoLS-JGiV26wsMtWuGOmnvS3kFnLbRCm_-BEas48&usqp=CAU",
      image2:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEtiJADT03IZHeLbysYpGibSG5LU1WgI9ZZ5Vf1-OcjM85ZqPo75biJunIrL6EkCD5oAQ&usqp=CAU",
    },
    {
      image1:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHuN0nSQ76E5SmsxTHnV82i6kPVBKCHaI-WuH_jH1M7GYoc7axI6GiuYbsEE49a-vFxm8&usqp=CAU",
      image2:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCfS1Cw6WYFLUbaTUKhuISYZYoRswUXagn1b1L8CeijyV2oR8LLit3gv7tnHwHXRB51PM&usqp=CAU",
    },
    {
      image1:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSNHEtv01kyhBrikeGI2jwWObNqlt-_ckLpQIYHwk6ZgkmsW7cbV6EyE7uP_KoutHmQsegMO2uhpbEZ2S2uAf8ACaNL_c63Y6AaZWO9GbWfttBpM5nME2m7mA&usqp=CAE",
      image2:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRzJ5NH4PrSCkueVfCCz9lDZAWSohHl-r6qlsBxkCeVEaveV77wvxEJDhKptrYG3HyaUdWDN_gpkNL8yzDhjmi8dO3-MBJWDazZItxW8_1oWbVlcf1f3gDDOw&usqp=CAE",
    },
    {
      image1:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRf60jAJdBsOprx-JjVRuP_Y5g4Vk3kiIE9KI23WbSzL2QBMiw7SbDwYbXklmuDEdwWnPYKX_BdyXHbXQqCMf7VDAJ0otMZ5UKiVD7DEiQ&usqp=CAE",
      image2:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTu_kfTVRhqFDXPXWUJvr_KGJBMr4jqfQhjnWkj1Gb1qrIo82u78oBL0wYt3GdBZWxz_q-4XEUYTSeMLNh0FabGVJAFkC3J_y7obSIXixx1SC_BmYTDvyIrWw&usqp=CAE",
    },
    // {
    //   image1:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHuN0nSQ76E5SmsxTHnV82i6kPVBKCHaI-WuH_jH1M7GYoc7axI6GiuYbsEE49a-vFxm8&usqp=CAU",
    //   image2:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCfS1Cw6WYFLUbaTUKhuISYZYoRswUXagn1b1L8CeijyV2oR8LLit3gv7tnHwHXRB51PM&usqp=CAU",
    // },
    // Add other image pairs for each category
    // { image1: "url1", image2: "url2" },
  ];
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  const renderCategoryCards = () => {
    if (categories.length !== categoryImages.length) {
      console.error("Number of categories and images don't match");
      return null; // Handle the error
    }
  };

  return (
    <Layout title={"All Categories"}>
      <div className="container-fluid m-3 p-3 mt-5">
        <div className="row">
          {categories.map((c, index) => (
            <div className="col-md-3 mt-5 mb-3" key={c._id}>
              <Link to={`/category/${c.slug}`} className="category-link">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="category-card"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={
                        hoveredIndex === index
                          ? categoryImages[index].image2
                          : categoryImages[index].image1
                      }
                      alt={c.name}
                      className="category-image"
                    />
                  </div>
                  <span className="category-name">{c.name}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
