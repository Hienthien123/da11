import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FieldModel } from 'src/app/models/field.model';
import { FieldServiceService } from 'src/app/services/admin/field-service.service';
import * as common from 'src/app/utils/commonFunctions';

@Component({
  selector: 'app-trang-thai',
  templateUrl: './trang-thai.component.html',
  styleUrls: ['./trang-thai.component.css']
})
export class TrangThaiComponent {
  userId = common.GetCurrentUserId();
  userInfo = common.GetCurrentUserInfo();
  itemId: string | undefined | null;
  isModalOpen: boolean = false;  
  waitForResponse = false;

  files: File[] = [];
  statusCode?: number;
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  fieldData: FieldModel[] = [];
  dataField: FieldModel = {
    id: 0,
    title: '',
    active: true,
    modified: new Date(),
    deleted: false,
    created: new Date(),
    createdBy: this.userId,
    modifiedBy: this.userId
  };
  constructor(private route: ActivatedRoute, private router: Router, private fieldService: FieldServiceService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) {
    this.loadtenfield();
  }
  loadtenfield() {
    const getAllPromise = this.fieldService.getAll().subscribe((res) => {
      if (res.isSuccess) {
        this.fieldData = res.result as FieldModel[];
      } else {
        this.toastr.error(res.message);
      }
    });
  }
  deletefield(item: number) {
    if ({ item }) {
      const deletePromise = this.fieldService.delete(item).subscribe(res => {
        if (res.isSuccess) {
          this.toastr.success('Xóa tờ trình thành công')
          this.loadtenfield();
        } else {
          this.toastr.error(res.message);
        }
      })
    }
  }  
  actionOnItem = 0;
  toggleActions(id: number) {
    if (this.actionOnItem != id) {
      this.actionOnItem = id;
    } else {
      this.actionOnItem = 0;
    }
  }
  itemsPerPage: number = 10;
  currentPage: number = 1;

}
