import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetAllRoleModel } from 'src/app/models/role.model';
import { GetAllInfoUserModel, SimplerRoleTempModel, UserSignUpModel } from 'src/app/models/user.model';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  id: string | undefined;
  RoleAll : GetAllRoleModel[] = [];
  UpdateAccount: GetAllInfoUserModel | undefined;
  CreateAccount1 : UserSignUpModel ={
    username : "",
    password : "",
    fullName : "",
    email : "",
    roleIds: [],
    phoneNumber : ""
  }
  constructor(private UserService: UserService ,private  RoleService: RoleService ,private toastr: ToastrService, private router: Router, private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.getAllRole();
    this.route.params.subscribe(params => {      
      const id = params['id'];      
      this.id = id;
      this.getDataById();
    });  
  }

  getDataById(){
    if(this.id){
      this.UserService.GetUserById(this.id).subscribe(res => {
        console.log(res);
        
        if(res.isSuccess){
          var z = res.result as GetAllInfoUserModel;
          this.UpdateAccount = z;
          this.CreateAccount1.fullName = z.userFullName;
          this.CreateAccount1.email = z.email;
          this.CreateAccount1.phoneNumber = z.phoneNumber;
          this.CreateAccount1.roleIds = z.roles?.map(x => x.roleId) ?? [];
        }
      })
    }
  }

  onRoleChange(event: any, roleId: string) {
    if (event.target.checked) {
      // Nếu checkbox được chọn, thêm roleId vào mảng roleIds
      // this.CreateAccount1.roleIds.push(roleId);
      this.CreateAccount1.roleIds = [roleId];
    } else {
      // Nếu checkbox bị hủy chọn, xóa roleId khỏi mảng roleIds
      const index = this.CreateAccount1.roleIds.indexOf(roleId);
      if (index !== -1) {
          this.CreateAccount1.roleIds.splice(index, 1);
      }
    }
  }

  isRoleSelected(roleId: string): boolean {
    return this.CreateAccount1.roleIds.includes(roleId);
  }
  CreateAccount(){    
    if(this.id){
      if(this.UpdateAccount){
        this.UpdateAccount.email = this.CreateAccount1.email;
        this.UpdateAccount.userFullName = this.CreateAccount1.fullName;
        this.UpdateAccount.phoneNumber = this.CreateAccount1.phoneNumber;
        this.UpdateAccount.roles = this.CreateAccount1.roleIds.map(x => {
          return {roleId: x, description: ''} as SimplerRoleTempModel
        })
        const updateRes = this.UserService.UpdateUser(this.UpdateAccount).subscribe(res => {
          if(res.isSuccess){              
            this.toastr.success('Cập nhật thông tin tài khoản thành công');
            this.router.navigate(['/admin/User']);
          }
          else {                            
            this.toastr.error(res.message);
          }
        })
      }
    }
    else{
      const addDate = this.UserService.SignUp(this.CreateAccount1).subscribe(res =>{        
        if (res.isSuccess){          
          this.toastr.success('Tạo tài khoản thành công');
          this.router.navigate(['/admin/User']);
        }
        else {          
          this.toastr.error(res.message);
        }
      });
    }
  }
  getAllRole(){
    const dataPromise = this.RoleService.GetAllRoleInfo().subscribe(res => {
      if(res.isSuccess){
        this.RoleAll = res.result as GetAllRoleModel[];
      }
    })
  }
}
