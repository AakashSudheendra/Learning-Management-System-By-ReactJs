import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourceQuery } from "@/feautures/api/courceApi.js";
import { Edit } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CourceTable = () => {
  const navigate = useNavigate();
  const { data, isLoading} = useGetCreatorCourceQuery({refetchOnMountOrArgChange: true});
  if (isLoading) return <h1>Loading.....</h1>;
  console.log("data--->",data)
  console.log(data)

  
  return (
    <div>
      <Button onClick={() => navigate("/admin/cource/create")}>
        Create Cource
      </Button>
      <Table>
        <TableCaption>A list of your recent Cources.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.cources.map((cource) => (
            <TableRow key={cource._id}>
              <TableCell className="font-medium">{cource?.courcePrice || "NA"}</TableCell>
              <TableCell><Badge>{cource.isPublished?"Published" : "Draft"}</Badge></TableCell>
              <TableCell>{cource.courceTitle}</TableCell>
              <TableCell className="text-right">
                <Button size='sm' variant="ghost" onClick={()=>navigate(`/admin/cource/${cource._id}`)}><Edit /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourceTable;
