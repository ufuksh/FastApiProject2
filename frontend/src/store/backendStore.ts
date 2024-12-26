// frontend/src/store/backendStore.ts
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
  // Fixed methods with proper formatting and error handling
const getStudentById = async (studentId: string): Promise<AxiosResponse<Student>> => {
  try {
    return await backend.get(`/students/${studentId}/`);
  } catch (error) {
    console.error('Error fetching student:', error);
    throw error;
  }
};

const updateStudent = async (studentId: string, studentData: Partial<Student>): Promise<AxiosResponse<Student>> => {
  try {
    return await backend.patch(`/students/${studentId}/`, studentData);
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

const deleteStudent = async (studentId: string): Promise<AxiosResponse<void>> => {
  try {
    return await backend.delete(`/students/${studentId}/`);
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};
  // Program CRUD Metodları
  const getSchedules = (): Promise<AxiosResponse<Schedule[]>> => backend.get("/schedules/");
  const createSchedule = (scheduleData: Partial<Schedule>): Promise<AxiosResponse<Schedule>> => backend.post("/schedules/", scheduleData);
  const getScheduleById = (scheduleId: string): Promise<AxiosResponse<Schedule>> => backend.get(`/schedules/${scheduleId}`);
  const updateSchedule = (scheduleId: string, scheduleData: Partial<Schedule>): Promise<AxiosResponse<Schedule>> => backend.put(`/schedules/${scheduleId}/`, scheduleData);
  const deleteSchedule = (scheduleId: string): Promise<AxiosResponse<any>> => backend.delete(`/schedules/${scheduleId}/`);

  return {
    // Öğrenci Metodları
    getStudents,
    createStudent,
    getStudentById,
    updateStudent,
    deleteStudent,

    // Program Metodları
    getSchedules,
    createSchedule,
    getScheduleById,
    updateSchedule,
    deleteSchedule,
  };
});
