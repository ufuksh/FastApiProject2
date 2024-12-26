import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://35.158.119.153:8000/api", // Backend URL'i buraya sabit olarak ayarlıyoruz
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  // Öğrenci işlemleri
  getStudents() {
    return apiClient.get("/students");
  },
  createStudent(data) {
    return apiClient.post("/students", data);
  },
  updateStudent(id, data) {
    return apiClient.put(`/students/${id}`, data);
  },
  deleteStudent(id) {
    return apiClient.delete(`/students/${id}`);
  },

  // Kullanıcı işlemleri
  getUsers() {
    return apiClient.get("/users");
  },
  createUser(data) {
    return apiClient.post("/users", data);
  },
  updateUser(id, data) {
    return apiClient.put(`/users/${id}`, data);
  },
  deleteUser(id) {
    return apiClient.delete(`/users/${id}`);
  },

  // Öğretmen işlemleri
  getTeachers() {
    return apiClient.get("/teachers");
  },
  createTeacher(data) {
    return apiClient.post("/teachers", data);
  },
  updateTeacher(id, data) {
    return apiClient.put(`/teachers/${id}`, data);
  },
  deleteTeacher(id) {
    return apiClient.delete(`/teachers/${id}`);
  },

  // Program işlemleri
  getSchedules() {
    return apiClient.get("/schedules");
  },
  createSchedule(data) {
    return apiClient.post("/schedules", data);
  },
  updateSchedule(id, data) {
    return apiClient.put(`/schedules/${id}`, data);
  },
  deleteSchedule(id) {
    return apiClient.delete(`/schedules/${id}`);
  },
};
