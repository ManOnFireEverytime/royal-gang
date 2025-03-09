import Card from "../_components/Card";
import PageWrapper from "../_components/PageWrapper";

import embraceTshirt from "@/public/embrace.webp";
import signatureTank from "@/public/signatureTank.webp";

//TODO: IF NOT USING SERVER ACTIONS, CHANGE TO CLIENT SIDE RENDERING
export default function ExploreAll() {
  return (
    <PageWrapper>
      <h1 className="py-4 text-center font-bold">ALL PRODUCTS</h1>

      {/*TODO: fetch all the producta to be displayed and replace fake array with the array of products */}
      <div className="grid grid-cols-2 place-items-center items-center justify-between lg:grid-cols-4">
        {Array.from({ length: 20 }).map((c, i) => (
          <Card
            productInfo={{
              id: "22",
              product_name: "VICTORY’S EMBRACE T SHIRT",
              price: "54640",
              image1: i % 2 ? signatureTank.src : embraceTshirt.src,
              description: "",
              colors: "",
              sizes: "",
              image2: "",
              image3: "",
              image4: "",
              image5: "",
              created_at: "",
              category: "",
            }}
            key={i}
          />
        ))}
      </div>
    </PageWrapper>
  );
}
