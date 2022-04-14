import { RotatingLines } from "react-loader-spinner";

export const Loading = () => {
 const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
 };
 return (
  <div style={style}>
   <RotatingLines strokeColor={"#123abc"} />
  </div>
 );
};

const data = {
 data1: "1",
 data2: "2",
 data3: "3",
};

const final = {
 data1: "1",
 datas: [
  {
   data2: "2",
  },
  {
   data3: "3",
  },
 ],
};
