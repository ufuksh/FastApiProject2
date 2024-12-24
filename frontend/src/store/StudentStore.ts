import {defineStore} from "pinia";
import {ref} from "vue";
import {useBackendStore} from "@/store/backendStore";


export const useStudentStore = defineStore("studentStore", ()=>{
    const backendStore = useBackendStore();
    const stateStudent=ref([]);

    async function getStudent (){
        const backend = await backendStore.backend();
        const response = await backend.read_students_students__get();
        stateStudent.value=response.data;
    }
    async function createStudent (newStudent){
        const backend = await backendStore.backend();
        const response = await backend.create_student_students__post({body:newStudent});
        stateStudent.value.push(response.data);
    }
    async function deleteStudent(studentId) {
        const backend = await backendStore.backend();
        await backend.delete_student_students__student_id__delete({
            student_id: studentId,
        });
        stateStudent.value = stateStudent.value.filter(
            (student) => student.id !== studentId
        );
    }
    //Update

    return{getStudent,createStudent,deleteStudent}
})