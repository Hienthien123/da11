﻿using Core.Domains;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyToTrinh.SMSService;
using Services;
using Services.DTO;

namespace QuanLyToTrinh.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : ControllerBase
    {
        private readonly IDocumentService documentService;
        private readonly INotificationService notificationService;
        private readonly ISMSService smsService;

        public DocumentController(IDocumentService documentService, INotificationService notificationService, ISMSService smsService)
        {
            this.documentService = documentService;
            this.notificationService = notificationService; 
            this.smsService = smsService;
        }
        [HttpGet("GetDocumentsPie")]
        public async Task<IActionResult> GetDocumentsPie()
        {
            try
            {

                var result = await documentService.pieData();

                return Ok(new BaseResponseModel(result));
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponseModel(null, false, StatusCodes.Status500InternalServerError, ex.Message));
            }
        }
        [HttpGet("GetDocumentsChartMonth")]
        public async Task<IActionResult> GetDocumentsChartMonth()
        {
            try
            {

                var result = await documentService.GetDocumentsByCharMonth();

                return Ok(new BaseResponseModel(result));
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponseModel(null, false, StatusCodes.Status500InternalServerError, ex.Message));
            }
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllDocument()
        {
            try
            {
                try
                {
                    var mesRes = await documentService.UpdateApprovalStatus_V2();
                    foreach(var item in mesRes)
                    {
                        await smsService.SendSMS(item, 3);
                    }
                }catch (Exception ex)
                {
                    
                }
                var result = await documentService.GetAll();
                return Ok(new BaseResponseModel(result));
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponseModel(null, false, StatusCodes.Status500InternalServerError, ex.Message));

            }
        }

        [HttpGet("GetAllDocument/{statusCode}")]
        public async Task<IActionResult> GetAllDocumentByStatusCode(int? statusCode)
        {
            try
            {
                var result = await documentService.GetAllDocumentByStatusCode(statusCode);
                return Ok(new BaseResponseModel(result));
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponseModel(null, false, StatusCodes.Status500InternalServerError, ex.Message));

            }
        }

        [HttpGet("GetDocumentById/{id}")]
        public async Task<IActionResult> GetDocumentById(int id)
        {
            try
            {
                var result = await documentService.GetDocumentById(id);
                return Ok(new BaseResponseModel(result));
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponseModel(null, false, StatusCodes.Status500InternalServerError, ex.Message));

            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromForm] DocumentDTO payload, IFormFile[] files)
        {
            try
            {                
                var result = await documentService.Create(payload, files);                
                return Ok(new BaseResponseModel(result));
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponseModel(null, false, StatusCodes.Status500InternalServerError, ex.Message));
            }
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromForm] DocumentDTO payload, IFormFile[] files)
        {
            try
            {
                var result = await documentService.UpdateDocument(payload, files);

                return Ok(new BaseResponseModel(result));
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponseModel(null, false, StatusCodes.Status500InternalServerError, ex.Message));
            }
        }

        [HttpPut("UpdateStatus/{docId}/{status}")]
        public async Task<IActionResult> UpdateStatus(int docId, int status)
        {
            try
            {
                var result = await documentService.UpdateDocumentStatus(docId, status);

                return Ok(new BaseResponseModel(result));
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponseModel(null, false, StatusCodes.Status500InternalServerError, ex.Message));
            }
        }

        [HttpDelete("Delete/{docId}")]
        public async Task<IActionResult> Delete(int docId)
        {
            try
            {
                var result = await documentService.DeleteDocument(docId);

                return Ok(new BaseResponseModel(result));
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponseModel(null, false, StatusCodes.Status500InternalServerError, ex.Message));
            }
        }
    }
}
