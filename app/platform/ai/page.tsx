import Image from "next/image";

const CommingSoon = () => {
  return (
    <div className="min-h-screen lg:ml-96 flex items-center justify-center">
      <div className="container mx-auto ">
        <h1>Coming Soon</h1>
        <p>This page is coming soon. Just keep refreshing, 😉</p>
        <Image
          src="/comingSoon.webp"
          width={600}
          height={400}
          alt="Coming Soon"
        />
      </div>
    </div>
  );
};

export default CommingSoon;
