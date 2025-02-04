export interface UserRequestDTO {
    username: string;
    age: number;
    hobbies: string[];
  }
  
  export interface UserResponseDTO {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
    active: boolean;
    createdAt: string;
  }
  