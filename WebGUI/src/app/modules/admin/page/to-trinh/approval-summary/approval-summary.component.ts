import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentApprovalSummaryModel } from 'src/app/models/documentApproval.model';
import { FieldModel } from 'src/app/models/field.model';
import { DocumentApprovalService } from 'src/app/services/admin/document-approval.service';
import { FieldServiceService } from 'src/app/services/admin/field-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-approval-summary',
  templateUrl: './approval-summary.component.html',
  styleUrls: ['./approval-summary.component.css']
})
export class ApprovalSummaryComponent implements OnInit {

  filterByDate = false;
  docId: number = 0;
  filter = {
    title: '',
    author: '',
    field: '',
    status: '',
    fromDate: new Date().toISOString().split('T')[0],//moment(new Date()).format('dd/MM/yyyy'),
    toDate: new Date().toISOString().split('T')[0]//moment(new Date()).format('dd/MM/yyyy')
  }
  selections = [
    {
      key: '',
      label: 'Tất cả danh mục'
    }
  ]  
  statusSelections = [
    {
      key: '',
      label: 'Tất cả trạng thái'
    },
    {
      key: 'Chờ duyệt',
      label: 'Chờ duyệt'
    },
    {
      key: 'Đã duyệt',
      label: 'Đã duyệt'
    },
    {
      key: 'Không duyệt',
      label: 'Không duyệt'
    },
    {
      key: 'Quá hạn duyệt',
      label: 'Quá hạn duyệt'
    },
  ]
  summaryData: DocumentApprovalSummaryModel[] = [];
  constructor(private approvalService: DocumentApprovalService, private route: ActivatedRoute, private fieldService: FieldServiceService){}

  ngOnInit(): void {
      this.getParamValue('id');
      this.loadField();
      this.loadData(false);
  }

  loadField(){
    this.fieldService.getAll().subscribe(res => {
      if(res.isSuccess){
        const fieldsData = res.result as FieldModel[];
        fieldsData.forEach(e => {
          this.selections.push({key: e.title!, label: e.title!})
        })
      }
    })
  }

  getParamValue(key: string){
    if(this.route.snapshot.paramMap.get(key) != null) {
      this.docId = parseInt(this.route.snapshot.paramMap.get('id')!);      
    }
  }

  loadData(hasFilter: boolean){
    this.approvalService.GetApprovalSummary(this.docId).subscribe(res => {            
      if(res.isSuccess){
        this.summaryData = res.result as DocumentApprovalSummaryModel[];        
        this.summaryData.forEach(e => {
          var t = Math.max(1, e.approvals.length, e.declines.length, e.noResponses.length);
          e.maxRows = t;          
        })
        if(hasFilter){
          const curentDate = new Date().toISOString().split('T')[0];
          this.summaryData = this.summaryData.filter(e => 
            (this.filter.title.trim() == '' || e.title.toLowerCase().includes(this.filter.title.toLowerCase().trim()))
            && (this.filter.author.trim() == '' || e.submitter.toLowerCase().includes(this.filter.author.toLowerCase().trim()))
            && (this.filter.field.trim() == '' || e.field.toLowerCase().trim() == this.filter.field.toLowerCase().trim())
            && (this.filter.status.trim() == '' || e.status.toLowerCase().trim() == this.filter.status.toLowerCase().trim())
            && (!this.filterByDate || !moment(e.submittedAt).isBefore(moment(this.filter.fromDate)))
            && (!this.filterByDate || !moment(e.submittedAt).isAfter(moment(this.filter.toDate).add(1, 'day')))
          )
        }
      }
    })
  }

  onFilter(){
    console.log(this.filter);
    this.loadData(true);    
  }
}
