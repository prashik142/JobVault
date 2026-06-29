import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import JobCard from "../components/JobCard";
import { deleteJob } from "../services/jobService";
import {
  Bookmark,
  Send,
  Users,
  Trophy,
} from "lucide-react";

import { getJobs } from "../services/jobService";

import "./Dashboard.css";

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");
const [deleteJobId, setDeleteJobId] = useState(null);

const [showDeleteModal, setShowDeleteModal] = useState(false);
  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      console.error(err);
    }
  }

  const saved = jobs.filter((job) => job.status === "Saved").length;

  const applied = jobs.filter((job) => job.status === "Applied").length;

  const interview = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const offer = jobs.filter((job) => job.status === "Offer").length;

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || job.status === filter;

    return matchesSearch && matchesFilter;
  });
function handleDelete(id){

    setDeleteJobId(id);

    setShowDeleteModal(true);

}
async function confirmDelete(){

    await deleteJob(deleteJobId);

    setShowDeleteModal(false);

    setDeleteJobId(null);

    loadJobs();

}
  return (
    <>
      <Navbar />

      <div className="dashboard">
       
      

        <div className="toolbar">
          <input
            type="text"
           placeholder="Search internships..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="filter-buttons">

    {[
        "All",
        "Saved",
        "Applied",
        "Interview",
        "Offer",
        "Rejected",
    ].map((status) => (

        <button

            key={status}

            className={
                filter === status
                    ? "filter active-filter"
                    : "filter"
            }

            onClick={() => setFilter(status)}

        >

            {status}

        </button>

    ))}

</div>
        </div>

        

       <div className="job-grid">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
    job={job}
    onDelete={handleDelete}
    reloadJobs={loadJobs}
/>
            ))
          ) : (
            <div className="empty-state">
              <h3>No internships found</h3>
              <p>Try changing the search or filter.</p>
            </div>
          )}
        </div>
      </div>
      {
showDeleteModal && (

<div className="modal-overlay">

<div className="delete-modal">

<h2>Delete Internship</h2>

<p>

This internship will be permanently removed.

</p>

<div className="modal-buttons">

<button

className="cancel"

onClick={()=>setShowDeleteModal(false)}

>

Cancel

</button>

<button

className="delete"

onClick={confirmDelete}

>

Delete

</button>

</div>

</div>

</div>

)
}
    </>
  );
}

export default Dashboard;