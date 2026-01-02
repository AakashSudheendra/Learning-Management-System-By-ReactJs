import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCourceMutation,
  useGetCourceByIdQuery,
  useRemoveCourceMutation,
  useTogglePublishMutation,
} from "@/feautures/api/courceApi";
import { toast } from "sonner";

/* ---------- helper ---------- */
const normalizeCourceLevel = (level) => {
  if (!level) return "";
  return level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
};

const CourceTab = () => {
  const navigate = useNavigate();
  const { courceId } = useParams();

  /* ---------- state ---------- */
  const [input, setInput] = useState({
    courceTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courceLevel: "",
    courcePrice: "",
    courceThumbanil: "",
  });

  const [previewThumbanil, setPreviewThumbanil] = useState("");

  /* ---------- api ---------- */
const {
  data: getCourceIdData,
  isLoading: getCourceIdLoading,
  refetch,
} = useGetCourceByIdQuery(courceId, {
  refetchOnMountOrArgChange: true, // ✅ FIX
});


  const [editCource, { isLoading: editLoading, isSuccess, error, data }] =
    useEditCourceMutation();

  const [
    removeCource,
    { isLoading: removeLoading, isSuccess: removeSuccess, data: removeData },
  ] = useRemoveCourceMutation();

  const [togglePublish] = useTogglePublishMutation();

  /* ---------- effects ---------- */

  // populate form
  useEffect(() => {
    if (getCourceIdData?.cource) {
      const cource = getCourceIdData.cource;

      setInput({
        courceTitle: cource.courceTitle || "",
        subTitle: cource.subTitle || "",
        description: cource.description || "",
        category: cource.category || "",
        courceLevel: normalizeCourceLevel(cource.courceLevel), // ✅ FIX
        courcePrice: cource.courcePrice?.toString() || "", // stability
        courceThumbanil: "",
      });

      setPreviewThumbanil(cource.courceThumbanil);
    }
  }, [getCourceIdData]);

  // edit success/error
  useEffect(() => {
    if (isSuccess) toast.success(data?.message || "Course Updated");
    if (error) toast.error(error?.data?.message || "Update Failed");
  }, [isSuccess, error, data]);

  // delete success
  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData?.message || "Course Deleted");
      navigate("/admin/cource");
    }
  }, [removeSuccess, removeData, navigate]);

  /* ---------- handlers ---------- */

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const selectThumbanil = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setInput((prev) => ({ ...prev, courceThumbanil: file }));
    const reader = new FileReader();
    reader.onloadend = () => setPreviewThumbanil(reader.result);
    reader.readAsDataURL(file);
  };

  const updateCourceHandler = async () => {
    const formData = new FormData();
    formData.append("courceTitle", input.courceTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courceLevel", input.courceLevel);
    formData.append("courcePrice", input.courcePrice);

    if (input.courceThumbanil) {
      formData.append("courceThumbanil", input.courceThumbanil);
    }

    await editCource({ formData, courceId });
  };

  const removeCourceHandler = async () => {
    try {
      await removeCource({ courceId }).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  const publishStatusHandler = async (action) => {
    try {
      const res = await togglePublish({ courceId, query: action });
      if (res.data) {
        refetch();
        toast.success(res.data.message);
      }
    } catch {
      toast.error("Publish action failed");
    }
  };

  if (getCourceIdLoading)
    return <Loader2 className="h-5 w-5 animate-spin" />;

  /* ---------- ui ---------- */

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>Edit your course details</CardDescription>
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            disabled={!getCourceIdData?.cource?.lectures?.length}
            onClick={() =>
              publishStatusHandler(
                getCourceIdData?.cource?.isPublished ? "false" : "true"
              )
            }
          >
            {getCourceIdData?.cource?.isPublished ? "UnPublish" : "Publish"}
          </Button>

          <Button
            variant="destructive"
            disabled={removeLoading}
            onClick={removeCourceHandler}
          >
            {removeLoading ? "Deleting..." : "Remove Course"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            name="courceTitle"
            value={input.courceTitle}
            onChange={changeEventHandler}
          />
        </div>

        <div>
          <Label>Subtitle</Label>
          <Input
            name="subTitle"
            value={input.subTitle}
            onChange={changeEventHandler}
          />
        </div>

        <div>
          <Label>Description</Label>
          <RichTextEditor input={input} setInput={setInput} />
        </div>

        <div className="flex gap-5">
          <div>
            <Label>Category</Label>
            <Select
              value={input.category}
              onValueChange={(v) =>
                setInput((p) => ({ ...p, category: v }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[
                    "Next JS",
                    "Data Science",
                    "Frontend Development",
                    "Fullstack Development",
                    "MERN Stack Development",
                    "Javascript",
                    "Python",
                    "Docker",
                    "MongoDB",
                    "HTML",
                  ].map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Course Level</Label>
            <Select
              value={input.courceLevel}
              onValueChange={(v) =>
                setInput((p) => ({ ...p, courceLevel: v }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Advance">Advance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Price (INR)</Label>
            <Input
              type="number"
              name="courcePrice"
              value={input.courcePrice}
              onChange={changeEventHandler}
              className="w-[120px]"
            />
          </div>
        </div>

        <div>
          <Label>Thumbnail</Label>
          <Input type="file" accept="image/*" onChange={selectThumbanil} />
          {previewThumbanil && (
            <img src={previewThumbanil} className="h-56 mt-2" />
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/cource")}>
            Cancel
          </Button>
          <Button onClick={updateCourceHandler} disabled={editLoading}>
            {editLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourceTab;
