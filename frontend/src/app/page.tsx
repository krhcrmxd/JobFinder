import { redirect } from "next/navigation";

const Home = () => {
    redirect("/auth/login");
};

export default Home;
