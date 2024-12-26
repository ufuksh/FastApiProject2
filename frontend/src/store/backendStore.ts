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

  const getStudentById = async (studentId: string): Promise<AxiosResponse<Student>> => {
    try {
      return await backend.get(`/students/${studentId}/`);
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  };

  const updateStudent = async (studentUuid: string, studentData: Partial<Student>): Promise<AxiosResponse<Student>> => {
    try {
      return await backend.patch(`/students/${studentUuid}/`, studentData);
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  };

  const deleteStudent = async (studentUuid: string): Promise<AxiosResponse<void>> => {
    try {
      const response = await backend.delete(`/students/${studentUuid}/`);
      return response;
    } catch (error: any) {
      if (error.response?.status === 405) {
        console.error('DELETE method not allowed. Please check backend configuration.');
        throw new Error('Delete operation not supported by the server');
      }
      console.error('Error deleting student:', error);
      throw error;
    }
  };

  // Program CRUD Metodları
  const getSchedules = async (): Promise<AxiosResponse<Schedule[]>> => {
    try {
      return await backend.get("/schedules/");
    } catch (error) {
      console.error('Error fetching schedules:', error);
      throw error;
    }
  };

  const createSchedule = async (scheduleData: Partial<Schedule>): Promise<AxiosResponse<Schedule>> => {
    try {
      return await backend.post("/schedules/", scheduleData);
    } catch (error) {
      console.error('Error creating schedule:', error);
      throw error;
    }
  };

  const getScheduleById = async (scheduleId: string): Promise<AxiosResponse<Schedule>> => {
    try {
      return await backend.get(`/schedules/${scheduleId}/`);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      throw error;
    }
  };

  const updateSchedule = async (scheduleId: string, scheduleData: Partial<Schedule>): Promise<AxiosResponse<Schedule>> => {
    try {
      return await backend.patch(`/schedules/${scheduleId}/`, scheduleData);
    } catch (error) {
      console.error('Error updating schedule:', error);
      throw error;
    }
  };

  const deleteSchedule = async (scheduleId: string): Promise<AxiosResponse<void>> => {
    try {
      return await backend.delete(`/schedules/${scheduleId}/`);
    } catch (error) {
      console.error('Error deleting schedule:', error);
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

    // Program Metodları
    getSchedules,
    createSchedule,
    getScheduleById,
    updateSchedule,
    deleteSchedule,
  };
});
