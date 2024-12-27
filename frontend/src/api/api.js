import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://35.158.119.153:8000/api", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  // Öğrenci işlemleri
  getStudents() {
    return apiClient.get("/students"); // Trailing slash kaldırıldı
  },
  createStudent(data) {
    return apiClient.post("/students", data); // Trailing slash kaldırıldı
  },
  getStudentByUuid(uuid) {
    return apiClient.get(`/students/${uuid}`); // Trailing slash kaldırıldı
  },
  updateStudent(uuid, data) {
    return apiClient.put(`/students/${uuid}`, data); // PUT kullanımı
  }
  ,
  deleteStudent(uuid) {
    return apiClient.delete(`/students/${uuid}`); // Trailing slash kaldırıldı
  },

  // Kullanıcı işlemleri
  getUsers() {
    return apiClient.get("/users");
  },
  createUser(data) {
    return apiClient.post("/users", data);
  },
  updateUser(uuid, data) {
    return apiClient.put(`/users/${uuid}`, data);
  },
  deleteUser(uuid) {
    return apiClient.delete(`/users/${uuid}`);
  },

  // Öğretmen işlemleri
  getTeachers() {
    return apiClient.get("/teachers");
  },
  createTeacher(data) {
    return apiClient.post("/teachers", data);
  },
  updateTeacher(uuid, data) {
    return apiClient.put(`/teachers/${uuid}`, data);
  },
  deleteTeacher(uuid) {
    return apiClient.delete(`/teachers/${uuid}`);
  },

  // Program işlemleri
  getSchedules() {
    return apiClient.get("/schedules");
  },
  createSchedule(data) {
    return apiClient.post("/schedules", data);
  },
  updateSchedule(uuid, data) {
    return apiClient.put(`/schedules/${uuid}`, data);
  },
  deleteSchedule(uuid) {
    return apiClient.delete(`/schedules/${uuid}`);
  },
};
