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
    created_at: Date;
    updated_at: Date;
  }
  
  // If you have additional types, such as Circuit, you may need to define them as well.
  