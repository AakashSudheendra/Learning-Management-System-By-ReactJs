import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourceMutation } from "@/feautures/api/courceApi";
import { Loader2 } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCource = () => {
  const [courceTitle, setCourceTitle] = useState("");
  const [category, setCategory] = useState("");
  const [createCource ,{data,isLoading,error,isSuccess}]=useCreateCourceMutation();
  const navigate = useNavigate();
  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourceHandler = async () => {
    await createCource({courceTitle,category});
  };

  //toast display

  useEffect(()=>{
    if(isSuccess){
      toast.success(data?.message || "Cource Created Successfully");
      navigate('/admin/cource')
    }
  },[isSuccess])

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl ">
          Let's add cource, add some basic details for your new Cource
        </h1>
        <p className="text-sm">
          Here you can add a new course by providing its title, category, and essential details. A good course description helps learners understand what they'll gain, while adding duration, level, and requirements ensures clarity
        </p>
      </div>
      <div className="space-y-4 mt-10">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            type="text"
            value={courceTitle}
            onChange={(e) => setCourceTitle(e.target.value)}
            placeholder="Your Cource Name"
          />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Frontend Development">
                  Frontend Development
                </SelectItem>
                <SelectItem value="Fullstack Development">
                  Fullstack Development
                </SelectItem>
                <SelectItem value="MERN Stack Development">
                  MERN Stack Development
                </SelectItem>
                <SelectItem value="Javascript">Javascript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
                <SelectItem value="MongoDB">MongoDB</SelectItem>
                <SelectItem value="HTML">HTML</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/cource")}>
            Back
          </Button>
          <Button disabled={isLoading} onClick={createCourceHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCource;
