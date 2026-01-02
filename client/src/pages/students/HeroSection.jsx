import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const HeroSection = () => {
  return (
    <div className="realtive bg-gradient-to-r from-orange-500 to bg-orange-600 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center ">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          FInd the Best Cources for You
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Discover, Learn , and UpSkill with our Wide Range of cources
        </p>

        {/* //form writing for search option */}
        <form
          action=""
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
        >
          <Input
            type="text"
            placeholder="Search for Cources"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          ></Input>
          <Button className="bg-orange-600 dark:bg-gray-700 text-white px-6 py-3 rounded-r-full hover:bg-orange-700 font-bold">
            Search
          </Button>
        </form>
        <Button className="bg-white dark:bg-gray-800 text-orange-600 rounded-full hover:bg-gray-200">
          Explore Cources
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
