import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {TestComponent} from "./page/test/test.component";
import {DashboardComponent} from "./page/dashboard/dashboard.component";
import { ToTrinhComponent } from './page/to-trinh/to-trinh.component';
import { XuLyComponent } from './page/to-trinh/xu-ly/xu-ly.component';
import { ApprovalSummaryComponent } from './page/to-trinh/approval-summary/approval-summary.component';
import { ChangePasswordComponent } from './page/change-password/change-password.component';
import {UserComponent} from "./page/user/user.component";
import { QuanLyDanhMucComponent } from './page/dashboard/quan-ly-danh-muc/quan-ly-danh-muc.component';
import { UpdateComponent } from './page/dashboard/quan-ly-danh-muc/update/update.component';
import { DocumentDetailComponent } from './page/to-trinh/document-detail/document-detail.component';
import { UserFormComponent } from './page/user/user-form/user-form.component';
import { FieldComponent } from './page/field/field.component';
import { FieldFormComponent } from './page/field/field-form/field-form.component';
import { DocumentFormComponent } from './page/to-trinh/document-form/document-form.component';
import { PhongBanComponent } from './page/phong-ban/phong-ban.component';
import { PhongBanFormComponent } from './page/phong-ban/phong-ban-form/phong-ban-form.component';
import { TrangThaiComponent } from './page/trang-thai/trang-thai.component';
import { TrangThaiFormComponent } from './page/trang-thai/trang-thai-form/trang-thai-form.component';
import { DanhMucComponent } from './page/danh-muc/danh-muc.component';
import { DonViComponent } from './page/danh-muc/don-vi/don-vi.component';
import { FormDonviComponent } from './page/danh-muc/don-vi/form-donvi/form-donvi.component';
import { ChucVuComponent } from './page/danh-muc/chuc-vu/chuc-vu.component';
import { FormChucvuComponent } from './page/danh-muc/chuc-vu/form-chucvu/form-chucvu.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'TestComponent',
        component: TestComponent
      },
      {
        path:'',
        component:DashboardComponent
      },
      {
        path:'Dashboard',
        component:DashboardComponent
      },
      {
        path: 'to-trinh/:statusCode',
        component: ToTrinhComponent
      },
      {
        path: 'to-trinh/:statusCode/add',
        component: DocumentFormComponent
      },
      {
        path: 'to-trinh/:statusCode/xu-ly/:id',
        component: XuLyComponent
      },
      {
        path: 'to-trinh/:statusCode/approval-summary/:id',
        component: ApprovalSummaryComponent
      },
      {
        path: 'to-trinh/:statusCode/document-detail/:id',
        component: DocumentDetailComponent
      },
      {
        path:'don-vi',
        component:DonViComponent
      },
      {
        path:'don-vi/add',
        component:FormDonviComponent
      },
      {
        path:'don-vi/edit/:id',
        component:FormDonviComponent
      },
      {
        path:'chuc-vu',
        component:ChucVuComponent
      },
      {
        path:'chuc-vu/add',
        component:FormChucvuComponent
      },
      {
        path: 'changePassword',
        component: ChangePasswordComponent
      },
      {
        path:'User',
        component:UserComponent
      },
      {
        path:'User/add',
        component:UserFormComponent
      },
      {
        path:'User/edit/:id',
        component:UserFormComponent
      },
      {
        path: 'field',
        component: FieldComponent
      },
      {
        path: 'field/add',
        component: FieldFormComponent
      }, 
      {
        path: 'field/edit/:id',
        component: FieldFormComponent
      },  
      // phong ban
      {
        path: 'phong-ban',
        component: PhongBanComponent
      },
      {
        path: 'phong-ban/add',
        component: PhongBanFormComponent
      }, 
      {
        path: 'phong-ban/edit/:id',
        component: PhongBanFormComponent
      },  
      // trang thai
      {
        path: 'trang-thai',
        component: TrangThaiComponent
      },
      {
        path: 'trang-thai/add',
        component: TrangThaiFormComponent
      }, 
      {
        path: 'trang-thai/edit/:id',
        component: TrangThaiFormComponent
      }, 
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
