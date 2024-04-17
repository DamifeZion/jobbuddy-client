'use client';
import { useParams } from "next/navigation";

const ProjectView = () => {
   const { id } = useParams();

   return (
      <div>
         <h1>Welcome to the <b>Public View of Project --&gt; {id} </b></h1>
      </div>
   )
};

export default ProjectView;