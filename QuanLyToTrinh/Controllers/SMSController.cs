using Core.Domains;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyToTrinh.SMSService;
using Services;

namespace QuanLyToTrinh.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SMSController : ControllerBase
    {
        private readonly ISMSService _smsService;
        public SMSController(ISMSService smsService)
        {
            _smsService = smsService;
        }

        [HttpGet("SendSMS/{docId}/{type}")]
        public async Task<IActionResult> SendSMS(int docId, int type)
        {
            try
            {
                var result = await _smsService.SendSMS(docId, type);
                return Ok(new BaseResponseModel(result));
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponseModel(null, false, StatusCodes.Status500InternalServerError, ex.Message));
            }
        }
        [HttpGet("TestSendSMS")]
        public async Task<IActionResult> TestSendSMS()
        {
            try
            {
                var result = await _smsService.TestSMSSending();
                return Ok(new BaseResponseModel(result));
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponseModel(null, false, StatusCodes.Status500InternalServerError, ex.Message));
            }
        }
    }
}
