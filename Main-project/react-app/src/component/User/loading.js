import { RotatingLines } from "react-loader-spinner";
export const Loading = () => {
 const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1,
 };
 return (
  <div style={style}>
   <RotatingLines strokeColor={"black"} />
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
