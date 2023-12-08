using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public class KeyPairSS
    {
        public KeyPairSS()
        { }
        public KeyPairSS(string key, string value)
        {
            Key = key;
            Value = value;
        }
        public string Key { get; set; }
        public string Value { get; set; }
    }
    public static class Constants
    {
        public static List<KeyPairSS> Viettel_ErrorList = new List<KeyPairSS>() {
          new KeyPairSS("Authenticate: Cp_code: NULL_OR_BLANK","Thiếu thông tin cp_code"),
          new KeyPairSS("Authenticate: UserName: NULL_OR_BLANK","Thiếu thông tin user_name"),
          new KeyPairSS("Authenticate: IP_INVALID (YOUR IP: XXXX)","IP XXXX của hệ thống bạn đang gửi tin chưa được đăng ký whitelist."),
          new KeyPairSS("Check RequestID: NULL_OR_BLANK","Thiếu thông tin RequestID"),
          new KeyPairSS("Authenticate: CP_CODE_NOT_FOUND","Thông tin cp_code không chính xác"),
          new KeyPairSS("Authenticate: WRONG_INFORMATION_AUTHENTICATE","Thông tin user/pass không chính xác"),
          new KeyPairSS("Check RequestID: REQUEST_ID_NOT_NUMBER","RequestID không đúng"),
          new KeyPairSS("Check UserID: NULL_OR_BLANK","Thiếu thông tin UserID"),
          new KeyPairSS("Check ReceiverID: NULL_OR_BLANK","Thiếu thông tin ReceiverID"),
          new KeyPairSS("Check ReceiverID: FORMAT_ERROR","ReceiverID không đúng"),
          new KeyPairSS("UserID_NOT_EQUAL_ReceiverID","UserID và ReceiverID phải giống nhau"),
          new KeyPairSS("Unable to check telco from input receiver","Không xác định được nhà mạng của thuê bao (do ReceiverID sai)"),
          new KeyPairSS("Length of ReceiverID is invalid.","ReceiveID không đúng (sai độ dài)"),
          new KeyPairSS("Check ServiceID: DUPLICATE MESSAGE","Tin nhắn bị lặp"),
          new KeyPairSS("Check ServiceID: ALIAS_INVALID:TELCO=XX","Sai thương hiệu hoặc thương hiệu chưa được khai báo cho nhà mạng tương ứng với thuê bao"),
          new KeyPairSS("Check CommandCode: NULL_OR_BLANK","Thiếu thông tin command_code"),
          new KeyPairSS("Check CommandCode: COMMAND_CODE_ERROR","Sai command_code"),
          new KeyPairSS("Check Content: NULL_OR_BLANK","Không có nội dung tin nhắn"),
          new KeyPairSS("Check Content: MAXLENGTH_LIMIT_XXXX_BYTE ","Độ dài tin vượt quá giới hạn (XXXX: số byte tối đa, YY là số byte nội dung tin mà bạn nhập)"),
          new KeyPairSS("Check Content: MSG_ERROR_CONTAIN_BLACKLIST","Nội dung chứa từ ngữ bị chặn"),
          new KeyPairSS("Check information error","Lỗi chung hệ thống"),
          new KeyPairSS("Check template: CONTENT_NOT_MATCH_TEMPLATE","Lỗi sai định dạng mẫu tin nhắn"),
        };
    }
}
