import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";

// Öğrenci Modeli
interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth?: string;
  grade?: string;
  contact_info?: string;
}

// Öğretmen Modeli
interface Teacher {
  id: string;
  first_name: string;
  last_name: string;
  department: string;
}

// Kullanıcı Modeli
interface User {
  id: string;
  username: string;
  email: string;
  hashed_password?: string;
}

// Program Modeli
interface Schedule {
  id: string;
  name: string;
  description?: string;
  date?: string;
  // Diğer alanlar...
}

export const useBackendStore = defineStore("backendStore", () => {
  const backend = axios.create({
    baseURL: "/api", // Vite proxy ayarınızla uyumlu
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Öğrenci CRUD Metodları
  const getStudents = (): Promise<AxiosResponse<Student[]>> => backend.get("/students/");
  const createStudent = (studentData: Partial<Student>): Promise<AxiosResponse<Student>> => backend.post("/students/", studentData);

  const getStudentById = async (studentId: string): Promise<AxiosResponse<Student>> => {
    try {
      return await backend.get(`/students/${studentId}/`);
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  };

  const updateStudent = async (uuid: string, data: Partial<Student>): Promise<AxiosResponse<Student>> => {
    return await backend.put(`/students/${uuid}`, data); // PUT kullanımı
  };

  const deleteStudent = async (studentUuid: string): Promise<AxiosResponse<void>> => {
    try {
      const response = await backend.delete(`/students/${studentUuid}`);
      return response;
    } catch (error: any) {
      console.error("Error deleting student:", error);
      throw error;
    }
  };

 // Öğretmen CRUD Metodları
const getTeachers = async (): Promise<Teacher[]> => {
  try {
    const response: AxiosResponse<Teacher[]> = await backend.get("/teachers/");
    return response.data as unknown as Teacher[]; // Gelen veriyi doğru tipe dönüştür
  } catch (error) {
    console.error("GET /teachers hata:", error);
    throw new Error("Öğretmenleri alırken bir hata oluştu.");
  }
};

const createTeacher = async (teacherData: Partial<Teacher>): Promise<Teacher> => {
  try {
    const response: AxiosResponse<Teacher> = await backend.post("/teachers/", teacherData);
    return response.data as unknown as Teacher; // Gelen veriyi doğru tipe dönüştür
  } catch (error) {
    console.error("POST /teachers hata:", error);
    throw new Error("Öğretmen oluşturulurken bir hata oluştu.");
  }
};

const getTeacherById = async (teacherId: string): Promise<Teacher> => {
  try {
    const response: AxiosResponse<Teacher> = await backend.get(`/teachers/${teacherId}/`);
    return response.data as unknown as Teacher; // Gelen veriyi doğru tipe dönüştür
  } catch (error) {
    console.error("GET /teachers/{id} hata:", error);
    throw new Error("Öğretmen detayını alırken bir hata oluştu.");
  }
};

const updateTeacher = async (uuid: string, data: Partial<Teacher>): Promise<AxiosResponse<Teacher>> => {
  return await backend.put(`/teachers/${uuid}`, data); // PUT kullanımı
};

const deleteTeacher = async (teacherUuid: string): Promise<AxiosResponse<void>> => {
  try {
    const response = await backend.delete(`/teachers/${teacherUuid}`);
    return response;
  } catch (error: any) {
    console.error("Error deleting teacher:", error);
    throw error;
  }
};

  // Kullanıcı CRUD Metodları
  const getUsers = (): Promise<AxiosResponse<User[]>> => backend.get("/users/");
  const createUser = (userData: Partial<User>): Promise<AxiosResponse<User>> => backend.post("/users/", userData);

  const getUserById = async (userId: string): Promise<AxiosResponse<User>> => {
    try {
      return await backend.get(`/users/${userId}/`);
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  const updateUser = async (uuid: string, data: Partial<User>): Promise<AxiosResponse<User>> => {
    return await backend.put(`/users/${uuid}`, data);
  };

  const deleteUser = async (userUuid: string): Promise<AxiosResponse<void>> => {
    try {
      const response = await backend.delete(`/users/${userUuid}`);
      return response;
    } catch (error: any) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  // Program CRUD Metodları
  const getSchedules = async (): Promise<AxiosResponse<Schedule[]>> => {
    try {
      return await backend.get("/schedules/");
    } catch (error) {
      console.error("Error fetching schedules:", error);
      throw error;
    }
  };

  const createSchedule = async (scheduleData: Partial<Schedule>): Promise<AxiosResponse<Schedule>> => {
    try {
      return await backend.post("/schedules/", scheduleData);
    } catch (error) {
      console.error("Error creating schedule:", error);
      throw error;
    }
  };

  const getScheduleById = async (scheduleId: string): Promise<AxiosResponse<Schedule>> => {
    try {
      return await backend.get(`/schedules/${scheduleId}/`);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      throw error;
    }
  };

  const updateSchedule = async (scheduleId: string, scheduleData: Partial<Schedule>): Promise<AxiosResponse<Schedule>> => {
    try {
      return await backend.put(`/schedules/${scheduleId}/`, scheduleData);
    } catch (error) {
      console.error("Error updating schedule:", error);
      throw error;
    }
  };

  const deleteSchedule = async (scheduleId: string): Promise<AxiosResponse<void>> => {
    try {
      return await backend.delete(`/schedules/${scheduleId}/`);
    } catch (error) {
      console.error("Error deleting schedule:", error);
      throw error;
    }
  };

  return {
    // Öğrenci Metodları
    getStudents,
    createStudent,
    getStudentById,
    updateStudent,
    deleteStudent,

    // Öğretmen Metodları
    getTeachers,
    createTeacher,
    getTeacherById,
    updateTeacher,
    deleteTeacher,

    // Kullanıcı Metodları
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,

    // Program Metodları
    getSchedules,
    createSchedule,
    getScheduleById,
    updateSchedule,
    deleteSchedule,
  };
});