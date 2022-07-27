import type { NextPage } from "next";
import BaseLayout from "../components/layout/BaseLayout";

const Home: NextPage = () => {
  return (
    <BaseLayout>
      <div>
        <h1 className="text-5xl font-bold underline">Hello Marketplace</h1>
      </div>
    </BaseLayout>
  );
};

export default Home;
