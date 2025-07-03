import Image from "next/image";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import Sermons from "./components/Sermons";
import About from "./components/About";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Sermons />
      <About />
    </div>
  );
}