import "./JobCard.css";
import { updateStatus } from "../services/jobService";
import {
  MapPin,
  IndianRupee,
  Calendar,
  ExternalLink,
  Trash2
} from "lucide-react";

function JobCard({
    job,
    onDelete
}) {

  const colors = {
    Saved: "#3b82f6",
    Applied: "#f59e0b",
    Interview: "#10b981",
    Offer: "#8b5cf6",
    Rejected: "#ef4444"
  };

  const color = colors[job.status] || "#3b82f6";

  return (
    <div className="job-card">

      <div className="card-top">

        <div
          className="company-logo"
          style={{ background: color }}
        >
          {job.company.charAt(0).toUpperCase()}
        </div>

        <div className="title-area">

         <h3 className="company-name">
    {job.company}
</h3>

<p className="job-title">
    {job.title}
</p>

        </div>

      </div>

      <div className="details">

        <div>

          <MapPin size={15} />

          {job.location}

        </div>

        <div>

          <IndianRupee size={15} />

          {job.stipend || "Not Mentioned"}

        </div>

        <div>

          <Calendar size={15} />

          {new Date(job.createdAt).toLocaleDateString()}

        </div>

      </div>

      <div className="card-bottom">

        <select

    className="status-select"

    value={job.status}

    onClick={(e)=>e.stopPropagation()}

    onChange={async(e)=>{

        await updateStatus(

            job.id,

            e.target.value

        );

        reloadJobs();

    }}

>

    <option>Saved</option>

    <option>Applied</option>

    <option>Interview</option>

    <option>Offer</option>

    <option>Rejected</option>

</select>

        <div className="actions">

          <a
            href={job.url}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={17} />
          </a>

         

          <button
    className="delete"
    onClick={() => onDelete(job.id)}
>

    <Trash2 size={17} />

</button>

        </div>

      </div>

    </div>
  );

}

export default JobCard;