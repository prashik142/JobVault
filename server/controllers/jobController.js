const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


// =====================
// GET ALL JOBS
// =====================

const getJobs = async (req, res) => {

    try {

        const jobs = await prisma.job.findMany({

            where:{

                userId:req.user.id

            },

            orderBy:{
                createdAt:"desc"
            }

        });

        res.json(jobs);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message:"Server Error"
        });

    }

};


// =====================
// CREATE JOB
// =====================

const createJob = async (req, res) => {

    try {

        const {
            company,
            title,
            location,
            stipend,
            status,
            notes,
            url
        } = req.body;

      const existing = await prisma.job.findFirst({

    where:{

        url,

        userId:req.user.id

    }

});

        if (existing) {

            return res.status(409).json({

                message: "Job already exists"

            });

        }

        const job = await prisma.job.create({

            data:{

    company,
    title,
    location,
    stipend,
    status,
    notes,
    url,

    userId:req.user.id

}

        });

        res.status(201).json(job);

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};


// =====================
// UPDATE JOB
// =====================

const updateJob = async (req, res) => {

    try {

        const id = Number(req.params.id);

        const {

            company,
            title,
            location,
            stipend,
            status,
            notes,
            url

        } = req.body;

        const job = await prisma.job.updateMany({

    where:{

        id,

        userId:req.user.id

    },

    data:{

        company,
        title,
        location,
        stipend,
        status,
        notes,
        url

    }

});

        res.json(job);

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};


// =====================
// DELETE JOB
// =====================

const deleteJob = async (req, res) => {

    try {

        await prisma.job.deleteMany({

    where:{

        id:Number(req.params.id),

        userId:req.user.id

    }

});

        res.json({

            message: "Deleted"

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};


// =====================
// CHECK JOB
// =====================

const checkJob = async (req, res) => {

    try {

        const { url } = req.query;

      const job = await prisma.job.findFirst({

    where:{

        url,

        userId:req.user.id

    }

});

        res.json({

            exists: !!job,

            job

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            exists: false

        });

    }

};
const updateStatus = async (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    try {

     const job = await prisma.job.updateMany({

    where:{

        id:Number(id),

        userId:req.user.id

    },

    data:{

        status

    }

});

        res.json(job);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    getJobs,
    createJob,
    updateJob,
    deleteJob,
    checkJob,
    updateStatus
};