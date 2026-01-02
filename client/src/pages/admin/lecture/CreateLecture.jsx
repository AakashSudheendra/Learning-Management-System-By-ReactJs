import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourceLectureQuery,
} from "@/feautures/api/courceApi.js";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture.jsx";
const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const courceId = params.courceId;
  const [createLecture, { data, isSuccess, isLoading, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLaoding,
    isError: lectureError,
    refetch,
  } = useGetCourceLectureQuery({ courceId });
  console.log(lectureError);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courceId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl ">
          Let's add Lecture, add some basic details for your new Lecture
        </h1>
        <p className="text-sm">
          Here you can add a new Lecture by providing its title
        </p>
      </div>
      <div className="space-y-4 mt-10">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Title Name"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/cource/${courceId}`)}
          >
            Back to Cource
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "CreateLecture"
            )}
          </Button>
        </div>
      </div>
      <div className="mt-10">
        {lectureLaoding ? (
          <p>Loading Lecture...</p>
        ) : lectureError ? (
          <p>Failed to Load Lecture</p>
        ) : lectureData?.lectures?.length === 0 ? (
          <p>No Lecture Found</p>
        ) : (
          lectureData.lectures.map((lecture, index) => (
            <Lecture
              key={lecture._id}
              courceId={courceId}
              lecture={lecture}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CreateLecture;
