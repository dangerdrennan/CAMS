export class Professor {
  constructor(
    public prof_email: string,
    public f_name: string,
    public l_name: string,
    public department: string,
    public is_admin: boolean,
    public is_grader: boolean
  ){}
}
