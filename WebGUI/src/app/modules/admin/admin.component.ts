import { Component, OnInit } from '@angular/core';
import {AdminMenu, ApproverMenu, GeneralMenu, SpecialistAdmin} from '../../config/admin-menu';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as common from 'src/app/utils/commonFunctions';
import { DocumentService } from 'src/app/services/admin/document.service';
import { DocumentModel } from 'src/app/models/document.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private documentService: DocumentService){}
  showMobileMenu = false;
  menuItems = GeneralMenu;  
  showDetails = false;
  userRoles = common.GetRoleInfo();
  userId = common.GetCurrentUserId();

  counter = {
    all: 0,
    draft: 0,
    pending: 0,
    approved: 0,
    approvedBonus: 0,
    declined: 0,
    overdued: 0
  }

  ngOnInit(): void {
    // this.checkLogin();     
    this.loadDocumentData();       
  }

  // checkLogin(){
  //   const userInfo = this.userService.GetLocalStorageUserInfo();
  //   if(userInfo == null) this.router.navigate(['/auth']);
  //   else{
  //     var info = JSON.parse(userInfo);
  //     if(this.userRoles.approver) {
  //       this.menuItems = ApproverMenu;
  //     }  
  //     if(this.userRoles.specialist) {
  //       this.menuItems = SpecialistAdmin;
  //     }  
  //     if(this.userRoles.generalApprover || this.userRoles.generalSpecialist){
  //       this.menuItems = GeneralMenu;
  //     }
  //     if(this.userRoles.admin){
  //       this.menuItems = AdminMenu
  //     }
  //   }
  // }

  toggleMobileMenu(){
    this.showMobileMenu = !this.showMobileMenu;
  }

  logOut(){
    if(confirm('Xác nhận đăng xuất')){
      this.userService.LogOut();
      this.router.navigate(['/auth'])
    }
  }

  toggle(){
    this.showDetails = !this.showDetails
  }

  loadDocumentData(){
    const ableToViewAll = this.userRoles.admin || this.userRoles.generalApprover || this.userRoles.generalSpecialist || this.userRoles.approver;
    this.documentService.getAll().subscribe(res => {
      if(res.isSuccess){
        var data = res.result as DocumentModel[];
        data = ableToViewAll ? data : data.filter(e => e.createdBy == this.userId); 
        this.counter = {
          all: data.length,
          draft: data.filter(x => x.statusCode == 2).length,
          pending: data.filter(x => x.statusCode == 3).length,
          approved: data.filter(x => x.statusCode == 4).length,
          approvedBonus: data.filter(x => x.statusCode == 5).length,
          declined: data.filter(x => x.statusCode == 6).length,
          overdued: data.filter(x => x.statusCode == 7).length
        }
        console.log(this.counter);
        
      }
    })
  }
}
