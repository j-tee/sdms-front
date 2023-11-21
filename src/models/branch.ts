export interface Branch {
    branch_name: string;
    level: string;
    postal_address: string;
    website: string;
    email_address: string;
    residential_address: string;
    phone1: string;
    phone2: string;
    school_id: number; // Adjust the type based on your actual type for school_id
    circuit_id: number; // Adjust the type based on your actual type for circuit_id
  }

  export interface BranchViewModel{
    id:number;
    branch_name: string;
    level: string;
    postal_address: string;
    website: string;
    email_address: string;
    residential_address: string;
    phone1: string;
    phone2: string;
    school_id: number; // Adjust the type based on your actual type for school_id
    circuit_id: number; // Adjust the type based on your actual type for circuit_id
    school_name:string;
    crest_url:string;
    bg_image_url:string;
    region_id: number;
    region_name:string;
    district_name:string;
    circuit_name:string;
  }
  
  // If you have additional types, such as Circuit, you may need to define them as well.
  