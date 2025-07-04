import Image from "next/image";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import Sermons from "./components/Sermons";
import About from "./components/About";
import Pastor from "./components/Pastor";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Sermons />
      <About />
      <Pastor />
    </div>
  );
}