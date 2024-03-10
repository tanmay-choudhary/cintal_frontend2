import Image from "next/image";
import { Inter } from "next/font/google";
import Login from "@/components/Login";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/appointment");
  };
  const todos = useSelector((state) => state.user);
  //console.log("user", todos);
  return (
    <main className={``}>
      <Login onLogin={handleLogin} />
    </main>
  );
}
