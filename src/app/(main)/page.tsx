import Categories from "@/components/home/Categories";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Hero from "@/components/home/Hero";
import Instructors from "@/components/home/Instructors";
import Statistics from "@/components/home/Statistics";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedCourses />
      <WhyChooseUs />
      <Statistics />
      <Instructors />
    </>
  );
}