import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        /**
         * HTTPValidationError
         */
        export interface HTTPValidationError {
            /**
             * Detail
             */
            detail?: /* ValidationError */ ValidationError[];
        }
        /**
         * LoginRequest
         */
        export interface LoginRequest {
            /**
             * Username
             */
            username: string;
            /**
             * Password
             */
            password: string;
        }
        /**
         * ScheduleCreate
         */
        export interface ScheduleCreate {
            /**
             * Title
             */
            title: string;
            /**
             * Description
             */
            description?: /* Description */ string | null;
            /**
             * Start Time
             */
            start_time: string; // date-time
            /**
             * End Time
             */
            end_time: string; // date-time
            /**
             * Student Id
             */
            student_id: string; // uuid
            /**
             * Teacher Id
             */
            teacher_id: string; // uuid
        }
        /**
         * ScheduleResponse
         */
        export interface ScheduleResponse {
            /**
             * Title
             */
            title: string;
            /**
             * Description
             */
            description?: /* Description */ string | null;
            /**
             * Start Time
             */
            start_time: string; // date-time
            /**
             * End Time
             */
            end_time: string; // date-time
            /**
             * Student Id
             */
            student_id: string; // uuid
            /**
             * Teacher Id
             */
            teacher_id: string; // uuid
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Created At
             */
            created_at: string; // date-time
            /**
             * Updated At
             */
            updated_at: string; // date-time
            student: /* StudentResponse */ StudentResponse;
            teacher: /* TeacherResponse */ TeacherResponse;
        }
        /**
         * ScheduleUpdate
         */
        export interface ScheduleUpdate {
            /**
             * Title
             */
            title?: /* Title */ string | null;
            /**
             * Description
             */
            description?: /* Description */ string | null;
            /**
             * Start Time
             */
            start_time?: /* Start Time */ string /* date-time */ | null;
            /**
             * End Time
             */
            end_time?: /* End Time */ string /* date-time */ | null;
            /**
             * Student Id
             */
            student_id?: /* Student Id */ string /* uuid */ | null;
            /**
             * Teacher Id
             */
            teacher_id?: /* Teacher Id */ string /* uuid */ | null;
        }
        /**
         * StudentCreate
         */
        export interface StudentCreate {
            /**
             * First Name
             */
            first_name: string;
            /**
             * Last Name
             */
            last_name: string;
            /**
             * Email
             */
            email: string; // email
            /**
             * Date Of Birth
             */
            date_of_birth?: /* Date Of Birth */ string /* date-time */ | null;
            /**
             * Grade
             */
            grade?: /* Grade */ string | null;
            /**
             * Contact Info
             */
            contact_info?: /* Contact Info */ string | null;
        }
        /**
         * StudentResponse
         */
        export interface StudentResponse {
            /**
             * First Name
             */
            first_name: string;
            /**
             * Last Name
             */
            last_name: string;
            /**
             * Email
             */
            email: string; // email
            /**
             * Date Of Birth
             */
            date_of_birth?: /* Date Of Birth */ string /* date-time */ | null;
            /**
             * Grade
             */
            grade?: /* Grade */ string | null;
            /**
             * Contact Info
             */
            contact_info?: /* Contact Info */ string | null;
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Created At
             */
            created_at: string; // date-time
            /**
             * Updated At
             */
            updated_at: string; // date-time
            /**
             * Schedules
             */
            schedules?: /* ScheduleResponse */ ScheduleResponse[];
        }
        /**
         * StudentUpdate
         */
        export interface StudentUpdate {
            /**
             * First Name
             */
            first_name?: /* First Name */ string | null;
            /**
             * Last Name
             */
            last_name?: /* Last Name */ string | null;
            /**
             * Email
             */
            email?: /* Email */ string /* email */ | null;
            /**
             * Date Of Birth
             */
            date_of_birth?: /* Date Of Birth */ string /* date-time */ | null;
            /**
             * Grade
             */
            grade?: /* Grade */ string | null;
            /**
             * Contact Info
             */
            contact_info?: /* Contact Info */ string | null;
        }
        /**
         * TeacherCreate
         */
        export interface TeacherCreate {
            /**
             * First Name
             */
            first_name: string;
            /**
             * Last Name
             */
            last_name: string;
            /**
             * Email
             */
            email: string; // email
            /**
             * Subject Specialization
             */
            subject_specialization?: /* Subject Specialization */ string | null;
            /**
             * Contact Info
             */
            contact_info?: /* Contact Info */ string | null;
        }
        /**
         * TeacherResponse
         */
        export interface TeacherResponse {
            /**
             * First Name
             */
            first_name: string;
            /**
             * Last Name
             */
            last_name: string;
            /**
             * Email
             */
            email: string; // email
            /**
             * Subject Specialization
             */
            subject_specialization?: /* Subject Specialization */ string | null;
            /**
             * Contact Info
             */
            contact_info?: /* Contact Info */ string | null;
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Created At
             */
            created_at: string; // date-time
            /**
             * Updated At
             */
            updated_at: string; // date-time
            /**
             * Schedules
             */
            schedules?: /* ScheduleResponse */ ScheduleResponse[];
        }
        /**
         * TeacherUpdate
         */
        export interface TeacherUpdate {
            /**
             * First Name
             */
            first_name?: /* First Name */ string | null;
            /**
             * Last Name
             */
            last_name?: /* Last Name */ string | null;
            /**
             * Email
             */
            email?: /* Email */ string /* email */ | null;
            /**
             * Subject Specialization
             */
            subject_specialization?: /* Subject Specialization */ string | null;
            /**
             * Contact Info
             */
            contact_info?: /* Contact Info */ string | null;
        }
        /**
         * UserCreate
         */
        export interface UserCreate {
            /**
             * Username
             */
            username: string;
            /**
             * Password
             */
            password: string;
            /**
             * Email
             */
            email: string;
        }
        /**
         * UserUpdate
         */
        export interface UserUpdate {
            /**
             * Password
             */
            password: string;
        }
        /**
         * ValidationError
         */
        export interface ValidationError {
            /**
             * Location
             */
            loc: (string | number)[];
            /**
             * Message
             */
            msg: string;
            /**
             * Error Type
             */
            type: string;
        }
    }
}
declare namespace Paths {
    namespace CatchAllFullPathGet {
        namespace Parameters {
            /**
             * Full Path
             */
            export type FullPath = string;
        }
        export interface PathParameters {
            full_path: /* Full Path */ Parameters.FullPath;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace CreateScheduleSchedulesPost {
        export type RequestBody = /* ScheduleCreate */ Components.Schemas.ScheduleCreate;
        namespace Responses {
            export type $201 = /* ScheduleResponse */ Components.Schemas.ScheduleResponse;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace CreateStudentStudentsPost {
        export type RequestBody = /* StudentCreate */ Components.Schemas.StudentCreate;
        namespace Responses {
            export type $201 = /* StudentResponse */ Components.Schemas.StudentResponse;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace CreateTeacherTeachersPost {
        export type RequestBody = /* TeacherCreate */ Components.Schemas.TeacherCreate;
        namespace Responses {
            export type $201 = /* TeacherResponse */ Components.Schemas.TeacherResponse;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace CreateUserUsersPost {
        export type RequestBody = /* UserCreate */ Components.Schemas.UserCreate;
        namespace Responses {
            export type $201 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace DeleteScheduleSchedulesScheduleIdDelete {
        namespace Parameters {
            /**
             * Schedule Id
             */
            export type ScheduleId = string; // uuid
        }
        export interface PathParameters {
            schedule_id: /* Schedule Id */ Parameters.ScheduleId /* uuid */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace DeleteStudentStudentsStudentIdDelete {
        namespace Parameters {
            /**
             * Student Id
             */
            export type StudentId = string; // uuid
        }
        export interface PathParameters {
            student_id: /* Student Id */ Parameters.StudentId /* uuid */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace DeleteTeacherTeachersTeacherIdDelete {
        namespace Parameters {
            /**
             * Teacher Id
             */
            export type TeacherId = string; // uuid
        }
        export interface PathParameters {
            teacher_id: /* Teacher Id */ Parameters.TeacherId /* uuid */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace DeleteUserUsersUserIdDelete {
        namespace Parameters {
            /**
             * User Id
             */
            export type UserId = string; // uuid
        }
        export interface PathParameters {
            user_id: /* User Id */ Parameters.UserId /* uuid */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace LoginUsersLoginPost {
        export type RequestBody = /* LoginRequest */ Components.Schemas.LoginRequest;
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadScheduleSchedulesScheduleIdGet {
        namespace Parameters {
            /**
             * Schedule Id
             */
            export type ScheduleId = string; // uuid
        }
        export interface PathParameters {
            schedule_id: /* Schedule Id */ Parameters.ScheduleId /* uuid */;
        }
        namespace Responses {
            export type $200 = /* ScheduleResponse */ Components.Schemas.ScheduleResponse;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadSchedulesSchedulesGet {
        namespace Parameters {
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Skip
             */
            export type Skip = number;
        }
        export interface QueryParameters {
            skip?: /* Skip */ Parameters.Skip;
            limit?: /* Limit */ Parameters.Limit;
        }
        namespace Responses {
            /**
             * Response Read Schedules Schedules  Get
             */
            export type $200 = /* ScheduleResponse */ Components.Schemas.ScheduleResponse[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadStudentStudentsStudentIdGet {
        namespace Parameters {
            /**
             * Student Id
             */
            export type StudentId = string; // uuid
        }
        export interface PathParameters {
            student_id: /* Student Id */ Parameters.StudentId /* uuid */;
        }
        namespace Responses {
            export type $200 = /* StudentResponse */ Components.Schemas.StudentResponse;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadStudentsStudentsGet {
        namespace Parameters {
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Skip
             */
            export type Skip = number;
        }
        export interface QueryParameters {
            skip?: /* Skip */ Parameters.Skip;
            limit?: /* Limit */ Parameters.Limit;
        }
        namespace Responses {
            /**
             * Response Read Students Students  Get
             */
            export type $200 = /* StudentResponse */ Components.Schemas.StudentResponse[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeacherTeachersTeacherIdGet {
        namespace Parameters {
            /**
             * Teacher Id
             */
            export type TeacherId = string; // uuid
        }
        export interface PathParameters {
            teacher_id: /* Teacher Id */ Parameters.TeacherId /* uuid */;
        }
        namespace Responses {
            export type $200 = /* TeacherResponse */ Components.Schemas.TeacherResponse;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeachersTeachersGet {
        namespace Parameters {
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Skip
             */
            export type Skip = number;
        }
        export interface QueryParameters {
            skip?: /* Skip */ Parameters.Skip;
            limit?: /* Limit */ Parameters.Limit;
        }
        namespace Responses {
            /**
             * Response Read Teachers Teachers  Get
             */
            export type $200 = /* TeacherResponse */ Components.Schemas.TeacherResponse[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UpdateScheduleSchedulesScheduleIdPut {
        namespace Parameters {
            /**
             * Schedule Id
             */
            export type ScheduleId = string; // uuid
        }
        export interface PathParameters {
            schedule_id: /* Schedule Id */ Parameters.ScheduleId /* uuid */;
        }
        export type RequestBody = /* ScheduleUpdate */ Components.Schemas.ScheduleUpdate;
        namespace Responses {
            export type $200 = /* ScheduleResponse */ Components.Schemas.ScheduleResponse;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UpdateStudentStudentsStudentIdPut {
        namespace Parameters {
            /**
             * Student Id
             */
            export type StudentId = string; // uuid
        }
        export interface PathParameters {
            student_id: /* Student Id */ Parameters.StudentId /* uuid */;
        }
        export type RequestBody = /* StudentUpdate */ Components.Schemas.StudentUpdate;
        namespace Responses {
            export type $200 = /* StudentResponse */ Components.Schemas.StudentResponse;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UpdateTeacherTeachersTeacherIdPut {
        namespace Parameters {
            /**
             * Teacher Id
             */
            export type TeacherId = string; // uuid
        }
        export interface PathParameters {
            teacher_id: /* Teacher Id */ Parameters.TeacherId /* uuid */;
        }
        export type RequestBody = /* TeacherUpdate */ Components.Schemas.TeacherUpdate;
        namespace Responses {
            export type $200 = /* TeacherResponse */ Components.Schemas.TeacherResponse;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UpdateUserUsersUserIdPut {
        namespace Parameters {
            /**
             * User Id
             */
            export type UserId = string; // uuid
        }
        export interface PathParameters {
            user_id: /* User Id */ Parameters.UserId /* uuid */;
        }
        export type RequestBody = /* UserUpdate */ Components.Schemas.UserUpdate;
        namespace Responses {
            /**
             * Response Update User Users  User Id  Put
             */
            export interface $200 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
}

export interface OperationMethods {
  /**
   * read_students_students__get - Read Students
   * 
   * T├╝m ├Â─şrenci kay─▒tlar─▒n─▒ getirir.
   */
  'read_students_students__get'(
    parameters?: Parameters<Paths.ReadStudentsStudentsGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadStudentsStudentsGet.Responses.$200>
  /**
   * create_student_students__post - Create Student
   * 
   * Yeni bir ├Â─şrenci kayd─▒ olu┼şturur.
   */
  'create_student_students__post'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateStudentStudentsPost.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateStudentStudentsPost.Responses.$201>
  /**
   * read_student_students__student_id__get - Read Student
   * 
   * Belirli bir ├Â─şrenci kayd─▒n─▒ ID'ye g├Âre getirir.
   */
  'read_student_students__student_id__get'(
    parameters?: Parameters<Paths.ReadStudentStudentsStudentIdGet.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadStudentStudentsStudentIdGet.Responses.$200>
  /**
   * update_student_students__student_id__put - Update Student
   * 
   * Belirli bir ├Â─şrenci kayd─▒n─▒ g├╝nceller.
   */
  'update_student_students__student_id__put'(
    parameters?: Parameters<Paths.UpdateStudentStudentsStudentIdPut.PathParameters> | null,
    data?: Paths.UpdateStudentStudentsStudentIdPut.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateStudentStudentsStudentIdPut.Responses.$200>
  /**
   * delete_student_students__student_id__delete - Delete Student
   * 
   * Belirli bir ├Â─şrenci kayd─▒n─▒ siler.
   */
  'delete_student_students__student_id__delete'(
    parameters?: Parameters<Paths.DeleteStudentStudentsStudentIdDelete.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteStudentStudentsStudentIdDelete.Responses.$204>
  /**
   * read_teachers_teachers__get - Read Teachers
   * 
   * T├╝m ├Â─şretmen kay─▒tlar─▒n─▒ getirir.
   */
  'read_teachers_teachers__get'(
    parameters?: Parameters<Paths.ReadTeachersTeachersGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeachersTeachersGet.Responses.$200>
  /**
   * create_teacher_teachers__post - Create Teacher
   * 
   * Yeni bir ├Â─şretmen kayd─▒ olu┼şturur.
   */
  'create_teacher_teachers__post'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateTeacherTeachersPost.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateTeacherTeachersPost.Responses.$201>
  /**
   * read_teacher_teachers__teacher_id__get - Read Teacher
   * 
   * Belirli bir ├Â─şretmeni ID'ye g├Âre getirir.
   */
  'read_teacher_teachers__teacher_id__get'(
    parameters?: Parameters<Paths.ReadTeacherTeachersTeacherIdGet.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeacherTeachersTeacherIdGet.Responses.$200>
  /**
   * update_teacher_teachers__teacher_id__put - Update Teacher
   * 
   * Belirli bir ├Â─şretmen kayd─▒n─▒ g├╝nceller.
   */
  'update_teacher_teachers__teacher_id__put'(
    parameters?: Parameters<Paths.UpdateTeacherTeachersTeacherIdPut.PathParameters> | null,
    data?: Paths.UpdateTeacherTeachersTeacherIdPut.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateTeacherTeachersTeacherIdPut.Responses.$200>
  /**
   * delete_teacher_teachers__teacher_id__delete - Delete Teacher
   * 
   * Belirli bir ├Â─şretmen kayd─▒n─▒ siler.
   */
  'delete_teacher_teachers__teacher_id__delete'(
    parameters?: Parameters<Paths.DeleteTeacherTeachersTeacherIdDelete.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteTeacherTeachersTeacherIdDelete.Responses.$204>
  /**
   * read_schedules_schedules__get - Read Schedules
   * 
   * T├╝m programlar─▒ getirir.
   */
  'read_schedules_schedules__get'(
    parameters?: Parameters<Paths.ReadSchedulesSchedulesGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadSchedulesSchedulesGet.Responses.$200>
  /**
   * create_schedule_schedules__post - Create Schedule
   * 
   * Yeni bir program kayd─▒ olu┼şturur.
   */
  'create_schedule_schedules__post'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateScheduleSchedulesPost.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateScheduleSchedulesPost.Responses.$201>
  /**
   * read_schedule_schedules__schedule_id__get - Read Schedule
   * 
   * Belirli bir program─▒ ID'ye g├Âre getirir.
   */
  'read_schedule_schedules__schedule_id__get'(
    parameters?: Parameters<Paths.ReadScheduleSchedulesScheduleIdGet.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadScheduleSchedulesScheduleIdGet.Responses.$200>
  /**
   * update_schedule_schedules__schedule_id__put - Update Schedule
   * 
   * Belirli bir program─▒ g├╝nceller.
   */
  'update_schedule_schedules__schedule_id__put'(
    parameters?: Parameters<Paths.UpdateScheduleSchedulesScheduleIdPut.PathParameters> | null,
    data?: Paths.UpdateScheduleSchedulesScheduleIdPut.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateScheduleSchedulesScheduleIdPut.Responses.$200>
  /**
   * delete_schedule_schedules__schedule_id__delete - Delete Schedule
   * 
   * Belirli bir program kayd─▒n─▒ siler.
   */
  'delete_schedule_schedules__schedule_id__delete'(
    parameters?: Parameters<Paths.DeleteScheduleSchedulesScheduleIdDelete.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteScheduleSchedulesScheduleIdDelete.Responses.$204>
  /**
   * create_user_users__post - Create User
   * 
   * Yeni bir kullan─▒c─▒ olu┼şturur.
   */
  'create_user_users__post'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateUserUsersPost.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateUserUsersPost.Responses.$201>
  /**
   * login_users_login_post - Login
   * 
   * Kullan─▒c─▒ giri┼şini kontrol eder.
   */
  'login_users_login_post'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.LoginUsersLoginPost.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LoginUsersLoginPost.Responses.$200>
  /**
   * update_user_users__user_id__put - Update User
   * 
   * Mevcut bir kullan─▒c─▒y─▒ g├╝nceller.
   */
  'update_user_users__user_id__put'(
    parameters?: Parameters<Paths.UpdateUserUsersUserIdPut.PathParameters> | null,
    data?: Paths.UpdateUserUsersUserIdPut.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateUserUsersUserIdPut.Responses.$200>
  /**
   * delete_user_users__user_id__delete - Delete User
   * 
   * Mevcut bir kullan─▒c─▒y─▒ siler.
   */
  'delete_user_users__user_id__delete'(
    parameters?: Parameters<Paths.DeleteUserUsersUserIdDelete.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteUserUsersUserIdDelete.Responses.$204>
  /**
   * catch_all__full_path__get - Catch All
   */
  'catch_all__full_path__get'(
    parameters?: Parameters<Paths.CatchAllFullPathGet.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CatchAllFullPathGet.Responses.$200>
}

export interface PathsDictionary {
  ['/students/']: {
    /**
     * create_student_students__post - Create Student
     * 
     * Yeni bir ├Â─şrenci kayd─▒ olu┼şturur.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateStudentStudentsPost.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateStudentStudentsPost.Responses.$201>
    /**
     * read_students_students__get - Read Students
     * 
     * T├╝m ├Â─şrenci kay─▒tlar─▒n─▒ getirir.
     */
    'get'(
      parameters?: Parameters<Paths.ReadStudentsStudentsGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadStudentsStudentsGet.Responses.$200>
  }
  ['/students/{student_id}']: {
    /**
     * read_student_students__student_id__get - Read Student
     * 
     * Belirli bir ├Â─şrenci kayd─▒n─▒ ID'ye g├Âre getirir.
     */
    'get'(
      parameters?: Parameters<Paths.ReadStudentStudentsStudentIdGet.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadStudentStudentsStudentIdGet.Responses.$200>
    /**
     * update_student_students__student_id__put - Update Student
     * 
     * Belirli bir ├Â─şrenci kayd─▒n─▒ g├╝nceller.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateStudentStudentsStudentIdPut.PathParameters> | null,
      data?: Paths.UpdateStudentStudentsStudentIdPut.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateStudentStudentsStudentIdPut.Responses.$200>
    /**
     * delete_student_students__student_id__delete - Delete Student
     * 
     * Belirli bir ├Â─şrenci kayd─▒n─▒ siler.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteStudentStudentsStudentIdDelete.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteStudentStudentsStudentIdDelete.Responses.$204>
  }
  ['/teachers/']: {
    /**
     * create_teacher_teachers__post - Create Teacher
     * 
     * Yeni bir ├Â─şretmen kayd─▒ olu┼şturur.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateTeacherTeachersPost.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateTeacherTeachersPost.Responses.$201>
    /**
     * read_teachers_teachers__get - Read Teachers
     * 
     * T├╝m ├Â─şretmen kay─▒tlar─▒n─▒ getirir.
     */
    'get'(
      parameters?: Parameters<Paths.ReadTeachersTeachersGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeachersTeachersGet.Responses.$200>
  }
  ['/teachers/{teacher_id}']: {
    /**
     * read_teacher_teachers__teacher_id__get - Read Teacher
     * 
     * Belirli bir ├Â─şretmeni ID'ye g├Âre getirir.
     */
    'get'(
      parameters?: Parameters<Paths.ReadTeacherTeachersTeacherIdGet.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeacherTeachersTeacherIdGet.Responses.$200>
    /**
     * update_teacher_teachers__teacher_id__put - Update Teacher
     * 
     * Belirli bir ├Â─şretmen kayd─▒n─▒ g├╝nceller.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateTeacherTeachersTeacherIdPut.PathParameters> | null,
      data?: Paths.UpdateTeacherTeachersTeacherIdPut.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateTeacherTeachersTeacherIdPut.Responses.$200>
    /**
     * delete_teacher_teachers__teacher_id__delete - Delete Teacher
     * 
     * Belirli bir ├Â─şretmen kayd─▒n─▒ siler.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteTeacherTeachersTeacherIdDelete.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteTeacherTeachersTeacherIdDelete.Responses.$204>
  }
  ['/schedules/']: {
    /**
     * create_schedule_schedules__post - Create Schedule
     * 
     * Yeni bir program kayd─▒ olu┼şturur.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateScheduleSchedulesPost.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateScheduleSchedulesPost.Responses.$201>
    /**
     * read_schedules_schedules__get - Read Schedules
     * 
     * T├╝m programlar─▒ getirir.
     */
    'get'(
      parameters?: Parameters<Paths.ReadSchedulesSchedulesGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadSchedulesSchedulesGet.Responses.$200>
  }
  ['/schedules/{schedule_id}']: {
    /**
     * read_schedule_schedules__schedule_id__get - Read Schedule
     * 
     * Belirli bir program─▒ ID'ye g├Âre getirir.
     */
    'get'(
      parameters?: Parameters<Paths.ReadScheduleSchedulesScheduleIdGet.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadScheduleSchedulesScheduleIdGet.Responses.$200>
    /**
     * update_schedule_schedules__schedule_id__put - Update Schedule
     * 
     * Belirli bir program─▒ g├╝nceller.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateScheduleSchedulesScheduleIdPut.PathParameters> | null,
      data?: Paths.UpdateScheduleSchedulesScheduleIdPut.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateScheduleSchedulesScheduleIdPut.Responses.$200>
    /**
     * delete_schedule_schedules__schedule_id__delete - Delete Schedule
     * 
     * Belirli bir program kayd─▒n─▒ siler.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteScheduleSchedulesScheduleIdDelete.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteScheduleSchedulesScheduleIdDelete.Responses.$204>
  }
  ['/users/']: {
    /**
     * create_user_users__post - Create User
     * 
     * Yeni bir kullan─▒c─▒ olu┼şturur.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateUserUsersPost.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateUserUsersPost.Responses.$201>
  }
  ['/users/login']: {
    /**
     * login_users_login_post - Login
     * 
     * Kullan─▒c─▒ giri┼şini kontrol eder.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.LoginUsersLoginPost.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LoginUsersLoginPost.Responses.$200>
  }
  ['/users/{user_id}']: {
    /**
     * update_user_users__user_id__put - Update User
     * 
     * Mevcut bir kullan─▒c─▒y─▒ g├╝nceller.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateUserUsersUserIdPut.PathParameters> | null,
      data?: Paths.UpdateUserUsersUserIdPut.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateUserUsersUserIdPut.Responses.$200>
    /**
     * delete_user_users__user_id__delete - Delete User
     * 
     * Mevcut bir kullan─▒c─▒y─▒ siler.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteUserUsersUserIdDelete.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteUserUsersUserIdDelete.Responses.$204>
  }
  ['/{full_path}']: {
    /**
     * catch_all__full_path__get - Catch All
     */
    'get'(
      parameters?: Parameters<Paths.CatchAllFullPathGet.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CatchAllFullPathGet.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type HTTPValidationError = Components.Schemas.HTTPValidationError;
export type LoginRequest = Components.Schemas.LoginRequest;
export type ScheduleCreate = Components.Schemas.ScheduleCreate;
export type ScheduleResponse = Components.Schemas.ScheduleResponse;
export type ScheduleUpdate = Components.Schemas.ScheduleUpdate;
export type StudentCreate = Components.Schemas.StudentCreate;
export type StudentResponse = Components.Schemas.StudentResponse;
export type StudentUpdate = Components.Schemas.StudentUpdate;
export type TeacherCreate = Components.Schemas.TeacherCreate;
export type TeacherResponse = Components.Schemas.TeacherResponse;
export type TeacherUpdate = Components.Schemas.TeacherUpdate;
export type UserCreate = Components.Schemas.UserCreate;
export type UserUpdate = Components.Schemas.UserUpdate;
export type ValidationError = Components.Schemas.ValidationError;
