import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://35.158.119.153:8000/api", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// UUID doğrulama fonksiyonu
function isValidUUID(uuid) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export default {
  // Öğrenci işlemleri
  getStudents() {
    return apiClient.get("/students");
  },
  createStudent(data) {
    return apiClient.post("/students", data);
  },
  getStudentByUuid(uuid) {
    if (!isValidUUID(uuid)) {
      return Promise.reject(new Error("Geçersiz UUID formatı."));
    }
    return apiClient.get(`/students/${uuid}`);
  },
  updateStudent(uuid, data) {
    if (!isValidUUID(uuid)) {
      return Promise.reject(new Error("Geçersiz UUID formatı."));
    }
    return apiClient.put(`/students/${uuid}`, data);
  },
  deleteStudent(uuid) {
    if (!isValidUUID(uuid)) {
      return Promise.reject(new Error("Geçersiz UUID formatı."));
    }
    return apiClient.delete(`/students/${uuid}`);
  },

  // Kullanıcı işlemleri
  getUsers() {
    return apiClient.get("/users");
  },
  createUser(data) {
    return apiClient.post("/users", data);
  },
  updateUser(uuid, data) {
    if (!isValidUUID(uuid)) {
      return Promise.reject(new Error("Geçersiz UUID formatı."));
    }
    return apiClient.put(`/users/${uuid}`, data);
  },
  deleteUser(uuid) {
    if (!isValidUUID(uuid)) {
      return Promise.reject(new Error("Geçersiz UUID formatı."));
    }
    return apiClient.delete(`/users/${uuid}`);
  },

  // Öğretmen işlemleri
  getTeachers() {
    return apiClient.get("/teachers");
  },
  createTeacher(data) {
    return apiClient.post("/teachers", data);
  },
  getTeacherByUuid(uuid) {
    if (!isValidUUID(uuid)) {
      return Promise.reject(new Error("Geçersiz UUID formatı."));
    }
    return apiClient.get(`/teachers/${uuid}`);
  },
  updateTeacher(uuid, data) {
    if (!isValidUUID(uuid)) {
      return Promise.reject(new Error("Geçersiz UUID formatı."));
    }
    return apiClient.put(`/teachers/${uuid}`, data);
  },
  deleteTeacher(uuid) {
    if (!isValidUUID(uuid)) {
      return Promise.reject(new Error("Geçersiz UUID formatı."));
    }
    return apiClient.delete(`/teachers/${uuid}`);
},

// Program işlemleri
  getSchedules() {
    return apiClient.get("/schedules");
  },
  createSchedule(data) {
    return apiClient.post("/schedules", data);
  },
  getScheduleByUuid(uuid) {
    if (!isValidUUID(uuid)) {
      return Promise.reject(new Error("Geçersiz UUID formatı."));
    }
    return apiClient.get(`/schedules/${uuid}`);
  },
  updateSchedule(uuid, data) {
    if (!isValidUUID(uuid)) {
      return Promise.reject(new Error("Geçersiz UUID formatı."));
    }
    return apiClient.put(`/schedules/${uuid}`, data);
  },
  deleteSchedule(uuid) {
    if (!isValidUUID(uuid)) {
      return Promise.reject(new Error("Geçersiz UUID formatı."));
    }
    return apiClient.delete(`/schedules/${uuid}`);  // Correct URL path
  },
};