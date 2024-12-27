import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";

// -------------------------
// Modeller
// -------------------------

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth?: string;
  grade?: string;
  contact_info?: string;
}

interface Teacher {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  subject_specialization?: string;
  contact_info?: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  hashed_password?: string;
}

interface Schedule {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  student_id: string;
  teacher_id: string;
}

// UUID regex doğrulaması
const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export const useBackendStore = defineStore("backendStore", () => {
  const backend = axios.create({
    baseURL: "/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // -------------------------
  // Genel Fonksiyonlar
  // -------------------------

  const isValidUUID = (uuid: string): boolean => {
    return uuidRegex.test(uuid);
  };

  // -------------------------
  // Öğrenci CRUD
  // -------------------------

  const getStudents = async (): Promise<AxiosResponse<Student[]>> => {
    return backend.get("/students/");
  };

  const createStudent = async (studentData: Partial<Student>): Promise<AxiosResponse<Student>> => {
    return backend.post("/students/", studentData);
  };

  const getStudentById = async (studentId: string): Promise<AxiosResponse<Student>> => {
    if (!isValidUUID(studentId)) {
      throw new Error("Geçersiz UUID formatı");
    }
    return backend.get(`/students/${studentId}/`);
  };

  const updateStudent = async (uuid: string, data: Partial<Student>): Promise<AxiosResponse<Student>> => {
    if (!isValidUUID(uuid)) {
      throw new Error("Geçersiz UUID formatı");
    }
    return backend.put(`/students/${uuid}`, data);
  };

  const deleteStudent = async (studentUuid: string): Promise<AxiosResponse<void>> => {
    if (!isValidUUID(studentUuid)) {
      throw new Error("Geçersiz UUID formatı");
    }
    return backend.delete(`/students/${studentUuid}`);
  };

  // -------------------------
  // Öğretmen CRUD
  // -------------------------

  const getTeachers = async (): Promise<Teacher[]> => {
    const response = await backend.get<Teacher[]>("/teachers/");
    return response.data;
  };

  const createTeacher = async (teacherData: Partial<Teacher>): Promise<Teacher> => {
    const response = await backend.post<Teacher>("/teachers/", teacherData);
    return response.data;
  };

  const getTeacherById = async (teacherId: string): Promise<Teacher> => {
    if (!isValidUUID(teacherId)) {
      throw new Error("Geçersiz UUID formatı");
    }
    const response = await backend.get<Teacher>(`/teachers/${teacherId}/`);
    return response.data;
  };

  const updateTeacher = async (uuid: string, data: Partial<Teacher>): Promise<Teacher> => {
    if (!isValidUUID(uuid)) {
      throw new Error("Geçersiz UUID formatı");
    }
    const response = await backend.put<Teacher>(`/teachers/${uuid}`, data);
    return response.data;
  };

  const deleteTeacher = async (teacherUuid: string): Promise<void> => {
    if (!isValidUUID(teacherUuid)) {
      throw new Error("Geçersiz UUID formatı");
    }
    await backend.delete(`/teachers/${teacherUuid}`);
  };

  // -------------------------
  // Kullanıcı CRUD
  // -------------------------

  const getUsers = async (): Promise<AxiosResponse<User[]>> => {
    return backend.get("/users/");
  };

  const createUser = async (userData: Partial<User>): Promise<AxiosResponse<User>> => {
    return backend.post("/users/", userData);
  };

  const getUserById = async (userId: string): Promise<AxiosResponse<User>> => {
    if (!isValidUUID(userId)) {
      throw new Error("Geçersiz UUID formatı");
    }
    return backend.get(`/users/${userId}/`);
  };

  const updateUser = async (uuid: string, data: Partial<User>): Promise<AxiosResponse<User>> => {
    if (!isValidUUID(uuid)) {
      throw new Error("Geçersiz UUID formatı");
    }
    return backend.put(`/users/${uuid}`, data);
  };

  const deleteUser = async (userUuid: string): Promise<AxiosResponse<void>> => {
    if (!isValidUUID(userUuid)) {
      throw new Error("Geçersiz UUID formatı");
    }
    return backend.delete(`/users/${userUuid}`);
  };

  // -------------------------
  // Program CRUD
  // -------------------------

  const getSchedules = async (): Promise<AxiosResponse<Schedule[]>> => {
    return backend.get("/schedules/");
  };

  const createSchedule = async (scheduleData: Partial<Schedule>): Promise<AxiosResponse<Schedule>> => {
    return backend.post("/schedules/", scheduleData);
  };

  const getScheduleById = async (scheduleId: string): Promise<AxiosResponse<Schedule>> => {
    if (!isValidUUID(scheduleId)) {
      throw new Error("Geçersiz UUID formatı");
    }
    return backend.get(`/schedules/${scheduleId}/`);
  };

  const updateSchedule = async (scheduleId: string, scheduleData: Partial<Schedule>): Promise<AxiosResponse<Schedule>> => {
    if (!isValidUUID(scheduleId)) {
      throw new Error("Geçersiz UUID formatı");
    }
    return backend.put(`/schedules/${scheduleId}/`, scheduleData);
  };

  const deleteSchedule = async (scheduleId: string): Promise<AxiosResponse<void>> => {
    if (!isValidUUID(scheduleId)) {
      throw new Error("Geçersiz UUID formatı");
    }
    return backend.delete(`/schedules/${scheduleId}/`);
  };

  // -------------------------
  // Return Fonksiyonları
  // -------------------------

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