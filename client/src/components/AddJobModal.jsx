import { useEffect, useState } from "react";
import api from "../services/api";

function AddJobModal({ job, onClose, onJobAdded }) {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    status: "Applied",
  });

  useEffect(() => {
    if (job) {
      setFormData({
        company: job.company,
        title: job.title,
        location: job.location,
        status: job.status,
      });
    }
  }, [job]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (job) {
        await api.put(`/jobs/${job.id}`, formData);
      } else {
        await api.post("/jobs", formData);
      }

      onJobAdded();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  
    return (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

    <div className="bg-slate-900 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-slate-700">

      <h2 className="text-2xl font-bold text-white mb-6">
        {job ? "Edit Job" : "Add New Job"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-slate-300 mb-2">
            Company
          </label>

          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 mb-2">
            Job Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 mb-2">
            Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 mb-2">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-blue-500"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            {job ? "Update Job" : "Save Job"}
          </button>

        </div>

      </form>

    </div>

  </div>
);
}

export default AddJobModal;