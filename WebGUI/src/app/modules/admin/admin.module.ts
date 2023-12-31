import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { TestComponent } from './page/test/test.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DpDatePickerModule} from "ng2-date-picker";
import {NgxPaginationModule} from "ngx-pagination";
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ToTrinhComponent } from './page/to-trinh/to-trinh.component';
import { XuLyComponent } from './page/to-trinh/xu-ly/xu-ly.component';
import { AdminHeaderComponent } from 'src/app/components/admin-header/admin-header.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ApprovalSummaryComponent } from './page/to-trinh/approval-summary/approval-summary.component';
import { MatTooltipModule} from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChangePasswordComponent } from './page/change-password/change-password.component';
import { UserComponent } from './page/user/user.component';
import { QuanLyDanhMucComponent } from './page/dashboard/quan-ly-danh-muc/quan-ly-danh-muc.component';
import { UpdateComponent } from './page/dashboard/quan-ly-danh-muc/update/update.component';
import { DocumentDetailComponent } from './page/to-trinh/document-detail/document-detail.component';
import {MatTabsModule} from '@angular/material/tabs'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogService } from 'src/app/services/dialog.service';
import { UserFormComponent } from './page/user/user-form/user-form.component';
import { FieldComponent } from './page/field/field.component';
import { FieldFormComponent } from './page/field/field-form/field-form.component';
import { DocumentFormComponent } from './page/to-trinh/document-form/document-form.component';
import { NgChartsModule } from 'ng2-charts';
import { LineChartComponent } from 'src/app/components/line-chart/line-chart.component';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';
import { TrangThaiComponent } from './page/trang-thai/trang-thai.component';
import { TrangThaiFormComponent } from './page/trang-thai/trang-thai-form/trang-thai-form.component';
import { DanhMucComponent } from './page/danh-muc/danh-muc.component';
import { DonViComponent } from './page/danh-muc/don-vi/don-vi.component';
import { FormDonviComponent } from './page/danh-muc/don-vi/form-donvi/form-donvi.component';
import { ChucVuComponent } from './page/danh-muc/chuc-vu/chuc-vu.component';
import { FormChucvuComponent } from './page/danh-muc/chuc-vu/form-chucvu/form-chucvu.component';
import { PhongBanComponent } from './page/phong-ban/phong-ban.component';
import { PhongBanFormComponent } from './page/phong-ban/phong-ban-form/phong-ban-form.component';


@NgModule({
  declarations: [
    AdminComponent,
    TestComponent,
    DashboardComponent,
    ToTrinhComponent,
    XuLyComponent,
    AdminHeaderComponent,
    ApprovalSummaryComponent,
    ChangePasswordComponent,
    UserComponent,
    QuanLyDanhMucComponent,
    UpdateComponent,    
    DocumentDetailComponent, UserFormComponent, FieldComponent, FieldFormComponent, DocumentFormComponent,
    LineChartComponent,
        PieChartComponent,
        
        DonViComponent,
        FormDonviComponent,
        ChucVuComponent,
        FormChucvuComponent,
        TrangThaiComponent,
        TrangThaiFormComponent,
        PhongBanComponent,
        PhongBanFormComponent,
       
       
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    FormsModule,
    DpDatePickerModule,
    NgxPaginationModule,
    NgxDocViewerModule,    
    MatProgressBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,    
    NgChartsModule
  ],
  providers: [
    DialogService
  ]
})
export class AdminModule { }
