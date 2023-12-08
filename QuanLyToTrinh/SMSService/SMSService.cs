using Core;
using Core.Domains;
using Database.Models;
using Microsoft.Extensions.Options;
using Repositories;
using Services;
using ViettelSMSServiceReference;

namespace QuanLyToTrinh.SMSService
{
    public interface ISMSService
    {
        Task<List<bool>> SendSMS(int docId, int type);
        Task<bool> TestSMSSending();
    }
    public class SMSService:ISMSService
    {
        private HttpClient _client;
        private HttpRequestMessage _request;
        private ILogger<SMSService> _logger;
        private readonly SMSSettingModel _smsSettings;
        private readonly IRoleRepository _roleRepository;
        private readonly IUserInRoleRepository _userInRoleRepository;
        private readonly IUserRepository _userRepository;
        private readonly IDocumentRepository _documentRepository;
        private readonly ISMSLogRepository _smsLogRepository;
        public SMSService(ILogger<SMSService> logger, IOptions<SMSSettingModel> smsSettings, IRoleRepository roleRepo, IUserInRoleRepository userInRoleRepo, IUserRepository userRepo,
            IDocumentRepository docRepo, ISMSLogRepository smsLogRepository)
        {
            _logger = logger;
            _smsSettings = smsSettings.Value;
            _roleRepository = roleRepo;
            _userRepository = userRepo;
            _userInRoleRepository = userInRoleRepo;
            _documentRepository = docRepo;
            _smsLogRepository = smsLogRepository;
        }
        public async Task<List<bool>> SendSMS(int docId, int type)
        {
            var result = new List<bool>();
            var targetUsers = new List<AppUser>();
            var message = "";
            var hostUrl = "https://totrinh.yenbai.net.vn/#/admin/to-trinh/3/document-detail/" + docId;
            var roleNames = new List<string>() { "Approver", "General Approver", "Admin", "General Specialist", "Specialist"};
            var document = await _documentRepository.FirstOrDefaultAsync(x => x.Id == docId);
            if (document == null) throw new System.Exception("Không tìm thấy tờ trình");
            var endTime = document.DateEndApproval!.Value.Day + "/" + document.DateEndApproval!.Value.Month + "/" + document.DateEndApproval!.Value.Year;
            if (type == 1) //Specialist send document to approve => Send sms to Approver, General Approver, General Specialist
            {
                roleNames = new List<string>() { "Approver", "General Approver", "General Specialist", "Admin" };
                var targetRoleIds = (await _roleRepository.GetMulti(x => roleNames.Contains(x.RoleName))).Select(x => x.RoleId);
                var targetUserIdList = (await _userInRoleRepository.GetMulti(x => targetRoleIds.Contains(x.RoleId))).Select(x => x.UserId);
                targetUsers = await _userRepository.GetMulti(x => targetUserIdList.Contains(x.UserId));
                message = $"Tờ trình {document.Title} đã được gửi, hạn phê duyệt đến hết ngày {endTime}, vui lòng truy cập {hostUrl} để xem thông tin chi tiết và xử lý";                
            }
            else if(type == 2) //General specialist reminds Approvers to review document
            {
                roleNames = new List<string>() { "Approver", "General Approver", "Admin" };
                var targetRoleIds = (await _roleRepository.GetMulti(x => roleNames.Contains(x.RoleName))).Select(x => x.RoleId);
                var targetUserIdList = (await _userInRoleRepository.GetMulti(x => targetRoleIds.Contains(x.RoleId))).Select(x => x.UserId);
                targetUsers = await _userRepository.GetMulti(x => targetUserIdList.Contains(x.UserId));
                message = $"Nhắc nhở - Tờ trình {document.Title} có hạn duyệt đến hết ngày {endTime}, vui lòng truy cập {hostUrl} để xem thông tin chi tiết và xử lý trước hạn duyệt";                
            }
            else if(type == 3) //Document's status updated to Approved
            {
                roleNames = new List<string>() { "Admin", "General Specialist" };
                var targetRoleIds = (await _roleRepository.GetMulti(x => roleNames.Contains(x.RoleName))).Select(x => x.RoleId);
                var targetUserIdList = (await _userInRoleRepository.GetMulti(x => targetRoleIds.Contains(x.RoleId))).Select(x => x.UserId);
                targetUsers = await _userRepository.GetMulti(x => targetUserIdList.Contains(x.UserId) || x.UserId == document.CreatedBy);
                message = $"Kết quả - Duyệt - Tờ trình {document.Title} đã được duyệt, truy cập {hostUrl} để xem thông tin chi tiết";                
            }
            else if (type == 4) //Document's status updated to Declined
            {
                roleNames = new List<string>() { "Admin", "General Specialist" };
                var targetRoleIds = (await _roleRepository.GetMulti(x => roleNames.Contains(x.RoleName))).Select(x => x.RoleId);
                var targetUserIdList = (await _userInRoleRepository.GetMulti(x => targetRoleIds.Contains(x.RoleId))).Select(x => x.UserId);
                targetUsers = await _userRepository.GetMulti(x => targetUserIdList.Contains(x.UserId) || x.UserId == document.CreatedBy);
                message = $"Kết quả - Trả lại - Tờ trình {document.Title} đã bị trả lại, truy cập {hostUrl} để xem thông tin chi tiết";
            }
            else if (type == 5) //Document's status updated to Overdued
            {
                roleNames = new List<string>() { "Admin", "General Specialist" };
                var targetRoleIds = (await _roleRepository.GetMulti(x => roleNames.Contains(x.RoleName))).Select(x => x.RoleId);
                var targetUserIdList = (await _userInRoleRepository.GetMulti(x => targetRoleIds.Contains(x.RoleId))).Select(x => x.UserId);
                targetUsers = await _userRepository.GetMulti(x => targetUserIdList.Contains(x.UserId) || x.UserId == document.CreatedBy);
                message = $"Kết quả - Quá hạn - Tờ trình {document.Title} đã quá hạn duyệt, truy cập {hostUrl} để xem thông tin chi tiết";
            }
            message = ChuyenCoDauThanhKhongDau(message);
            foreach (var item in targetUsers)
            {                
                var res = await SendSMS_ViettelAsync(message, item.PhoneNumber);                
                if (res)
                {
                    _logger.LogInformation($"Sending sms message to number: {item.PhoneNumber} - Succeeded");
                }
                else
                {
                    _logger.LogError($"Sending sms message to number: {item.PhoneNumber} - Failed");
                }
                result.Add(res);
            }
            return result;
        }
        public async Task<bool> TestSMSSending()
        {
            var res = await SendSMS_ViettelAsync("TEST OK", "0988249077");
            return res;
        }
        private async Task<bool> SendSMS_ViettelAsync(string message, string toPhonenumber)
        {
            bool rs = true;
            string requestId = "1";
            string cmdCode = "bulksms";
            string errMessage = "";
            try
            {

                var test = new CcApiClient();
                var outcome =await test.wsCpMtAsync("smsbrand_sottttyenbai", "123456a@", "SOTTTTYB", requestId, toPhonenumber, toPhonenumber, "SOTTTT_YB", cmdCode, message, "0");
                //var outcome = await test.wsCpMtAsync(_smsSettings.Username, _smsSettings.Password, _smsSettings.CPCode, requestId, toPhonenumber, toPhonenumber, _smsSettings.BrandName, cmdCode, message, _smsSettings.ContentType);
                //_logger.LogError($"Username {_smsSettings.Username},Password {_smsSettings.Password} ,CPCode {_smsSettings.CPCode} ,BrandName {_smsSettings.BrandName}, {_smsSettings.ToString()}");
                _logger.LogInformation($"Username smsbrand_sottttyenbai,Password 123456a@ ,CPCode SOTTTTYB ,BrandName SOTTTT_YB");
                if (outcome.@return.message.Contains("Insert MT_QUEUE: OK") == false)
                {
                    var messageTV = Constants.Viettel_ErrorList.Where(x => x.Key.Contains(outcome.@return.message) == true).FirstOrDefault();
                    if (messageTV != null)
                    {
                        _logger.LogError($"{messageTV.Value}");
                        errMessage = messageTV.Value;
                    }
                    else
                    {
                        _logger.LogError($"wsCpMtAsync outcome Viettel {outcome.@return.message}");
                        errMessage = outcome.@return.message;
                    }
                    rs = false;
                }
                _logger.LogInformation($"Info wsCpMtAsync outcome Viettel {outcome.@return.message}");
                errMessage = outcome.@return.message;
            }
            catch (System.Exception ex)
            {
                _logger.LogError($"Send sms to {toPhonenumber} get error: {ex}");
                errMessage = ex.Message;
                rs = false;
            }
            var data = new TblSMSLog()
            {
                Id = 0,
                ErrorMessage = errMessage,
                IsSucceeded = rs,
                PhoneNumber = toPhonenumber,
                Created = DateTime.Now
            };
            await _smsLogRepository.AddAsync( data );
            await _smsLogRepository.SaveChanges();
            return rs;
        }

        private static readonly string[] VietNamChar = new string[]
       {
            "aAeEoOuUiIdDyY",
            "áàạảãâấầậẩẫăắằặẳẵ",
            "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",
            "éèẹẻẽêếềệểễ",
            "ÉÈẸẺẼÊẾỀỆỂỄ",
            "óòọỏõôốồộổỗơớờợởỡ",
            "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",
            "úùụủũưứừựửữ",
            "ÚÙỤỦŨƯỨỪỰỬỮ",
            "íìịỉĩ",
            "ÍÌỊỈĨ",
            "đ",
            "Đ",
            "ýỳỵỷỹ",
            "ÝỲỴỶỸ"
       };

        public static string FilterChar(string str)
        {
            str = str.Trim();
            for (int i = 1; i < VietNamChar.Length; i++)
            {
                for (int j = 0; j < VietNamChar[i].Length; j++)
                {
                    str = str.Replace(VietNamChar[i][j], VietNamChar[0][i - 1]);
                }
            }
            str = str.Replace("(", "");
            str = str.Replace(")", "");
            str = str.Replace("“", "");
            str = str.Replace("”", "");
            str = str.Replace(" ", "-");
            str = str.Replace("--", "-");
            str = str.Replace("?", "");
            str = str.Replace("&", "");
            str = str.Replace(",", "");
            str = str.Replace(":", "");
            str = str.Replace("!", "");
            str = str.Replace("'", "");
            str = str.Replace("\"", "");
            str = str.Replace("%", "");
            str = str.Replace("#", "");
            str = str.Replace("$", "");
            str = str.Replace("*", "");
            str = str.Replace("`", "");
            str = str.Replace("~", "");
            str = str.Replace("@", "");
            str = str.Replace("^", "");
            str = str.Replace("/", "");
            str = str.Replace(">", "");
            str = str.Replace("<", "");
            str = str.Replace("[", "");
            str = str.Replace("]", "");
            str = str.Replace(";", "");
            str = str.Replace("+", "");
            return str;//.ToLower();
        }

        public static string ChuyenCoDauThanhKhongDau(string str)
        {
            str = str.Trim();
            for (int i = 1; i < VietNamChar.Length; i++)
            {
                for (int j = 0; j < VietNamChar[i].Length; j++)
                {
                    str = str.Replace(VietNamChar[i][j], VietNamChar[0][i - 1]);
                }
            }
            //str = str.Replace(" ", "-");
            str = str.Replace("--", "-");
            //str = str.Replace("?", "");
            str = str.Replace("&", "");
            //str = str.Replace(",", "");
            //str = str.Replace(":", "");
            //str = str.Replace("!", "");
            str = str.Replace("'", "");
            str = str.Replace("\"", "");
            str = str.Replace("%", "");
            //str = str.Replace("#", "");
            str = str.Replace("$", "");
            str = str.Replace("*", "");
            str = str.Replace("`", "");
            str = str.Replace("~", "");
            str = str.Replace("@", "");
            str = str.Replace("^", "");
            //str = str.Replace(".", "");
            //str = str.Replace("/", "");
            str = str.Replace(">", "");
            str = str.Replace("<", "");
            str = str.Replace("[", "");
            str = str.Replace("]", "");
            str = str.Replace(";", "");
            str = str.Replace("+", "");
            return str;//.ToLower();
        }
    }
}
