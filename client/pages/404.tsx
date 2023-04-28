import { NextPage } from "next";

interface Props {}

const Custom404: NextPage<Props> = ({}) => {
  return (
    <div className="flex items-center w-full justify-center">
      <h1>404 - Page Not Found</h1>
    </div>
  );
};

export default Custom404;
