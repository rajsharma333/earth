const mongoose = require(mongoose);

const JobpostSchema = new mongoose.Schema({
  primary: {
    title: {
      type: string,
      required: true
    },
    department:{
      type: string
    },
    grade: {
      type: string
    },
    reporting_manager: {
      type: string
    },
    hiring_manager: {
      type: string
    },
    location: {
      type: string
    },
    priority: {
      type: string
    },
    pos_type: {
      type: string
    },
    contract_duration: {
      type: string
    }
  },
  Skills: {
    keywords: {
      type: string,
      required: true
    },
    primarySkills:{
      type: string,
      required: true
    },
    secondarySkills:{
      type: string
    },
    min_exp:{
      type: string,
      required: true
    },
    max_exp:{
      type: string
    },
    education:{
      type: string
    },
    joiningTime:{
      type: string
    },
    min_salary:{
      type: string
    },
    max_salary:{
      type: string
    },
  },
  job_descriptio: {
    summary: {
      type: string,
    },
    about_job: {
      type: string,
    },
    requirement: {
      type: string,
    }
  },
  interview_process: [
    {
      step_name:{
        type:string,
        required:true
      },
      step_type:{
        type:string,
        required:true
      },
      mode: {
        type: string,
        required: true
      },
      panel:{
        type:string,
        required:true
      }
    }
  ],
  profiles: [
    {
      profile_id:{
        type:string,
        required:true
      },
      status:{
        type:string,
        required:true
      }
    }
  ],
  actions:{
    posted_by:{
      type:string,
      required:true
    },
    posted_on:{
      type:string,
      required:true
    },
    approved_by:{
      type:string,
      required:true
    },
    approved_on:{
      type:string,
      required:true
    }
  },
  status:{
    type: string,
    required: true
  },
  history: [
    {
      action_date: {
        type: Date
      },
      action_type: {
        type: Date
      },
      action_by: {
        type: Date
      }
    }
  ]
});

module.exports = Jobpost = mongoose.model('jobpost', JobpostSchema)
