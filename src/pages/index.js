import { checkAuth } from "../services/checkAuth";

export const getServerSideProps = checkAuth;

export default function Home(){
  return <div>در حال ریدایرکت . . .</div>
}
