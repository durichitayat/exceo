import Image from "next/image";
import { getBaseUrl } from "@/lib/getBase";

const CommingSoon = () => {
  const baseUrl = getBaseUrl();
  const imageUrl = `http://${baseUrl}/comingSoon.webp`;

  return (
    <div className="min-h-screen lg:ml-96">
      <div className="container mx-auto ">
        <h1 className="text-xl font-semibold">Coming Soon</h1>
        <p>This page is coming soon. Just keep refreshing, 😉</p>
        <Image
          src={imageUrl}
          width={600}
          height={600}
          className="py-4"
          alt="Coming Soon"
        />
      </div>
    </div>
  );
};

export default CommingSoon;
