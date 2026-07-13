import Categories from "@/components/home/Categories";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Hero from "@/components/home/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedCourses />
    </>
  );
}