export const GeneralMenu = [
  {
    path: '/admin/Dashboard',
    text: 'Dashboard',
    icon: 'fas fa-tachometer-alt',
    children: [],
  },
  // {
  //   path: '/admin/to-trinh/0',
  //   text: 'Nghiệp vụ',
  //   icon: 'fas fa-folder-open',
  //   children: []
  // },  
  // {
  //   path: '/admin/to-trinh/0',
  //   text: 'Thống kê',
  //   icon: 'fas fa-hourglass-half',
  //   children: []
  // },
  {
    path: '/admin/to-trinh/0',
    text: 'Nghiệp vụ',
    icon: 'fas fa-folder-open',
    children: [],
  }
  , { 
    text: 'Thống kê',
    icon: 'fas fa-history',
    children: [
      {
        path: '/admin/to-trinh/2',
        text: 'Đang hoạt động',
        icon: 'fas fa-check-double',
        children: []
      },
      {
        path: '/admin/to-trinh/3',
        text: 'Dừng hoạt động',
        icon: 'fas fa-hourglass-half',
        children: [],
      },
      {
        path: '/admin/to-trinh/4',
        text: 'Thu hồi',
        icon: 'fas fa-history',
        children: []
      }
    ],
  }
  , { 
    text: 'Báo cáo',
    icon: 'fas fa-check-double',
    children: [
      
    ],
  },
  {
    path: '/admin/to-trinh/5',
    text: 'Hệ thống',
    icon: 'fas fa-spell-check',
    children: [
      {
        path: '/admin/User',
        text: 'Quản lí người dùng',
        icon: 'fa-solid fa-user',
        children: [],
      },
      {
        path: '/admin/User1',
        text: 'Nhóm quyền',
        icon: 'fa-solid fa-user',
        children: [],
      },
    ],
  },
  {
    path: '/admin/to-trinh/5',
    text: 'Danh mục',
    icon: 'fas fa-user-times',
    children: [
      {
        path: '/admin/don-vi',
        text: 'Đơn vị ',
        icon: 'fas fa-user-times',
        children: [],
      },
      {
        path: '/admin/phong-ban',
        text: 'Phòng ban',
        icon: 'fas fa-user-times',
        children: [],
      },
        {
          path: '/admin/chuc-vu',
          text: 'Chức vụ',
          icon: 'fas fa-user-times',
          children: [],
        },
       
        {
          path: '/admin/trang-thai',
          text: 'Trạng thái',
          icon: 'fas fa-user-times',
          children: [],
        },
    ],
  },
 


  // {
  //   path: '/admin/to-trinh/4',
  //   text: 'Báo cáo',
  //   icon: 'fas fa-check-double',
  //   children: []
  // },
  // {
  //   path: '/admin/to-trinh/5',
  //   text: 'Hệ thống',
  //   icon: 'fas fa-spell-check',
  //   children: []
  // },
  // {
  //   path: '/admin/to-trinh/6',
  //   text: 'Danh mục',
  //   icon: 'fas fa-user-times',
  //   children: []
  // },
  // {
  //   path: '/admin/to-trinh/7',
  //   text: 'Quá hạn duyệt',
  //   icon: 'fas fa-history',
  //   children: []

  // },
  // {
  //   path: '/admin/to-trinh/0/approval-summary/0',
  //   text: 'Báo cáo thống kê',
  //   icon: 'fas fa-history',
  //   children: []

  // },
  // {
  //   path: '/admin/field',
  //   text: 'Quản lí danh mục',
  //   icon: 'fas fa-layer-group',
  //   children: []
  // },
  // {

  //   path: '/admin/changePassword',
  //   text: 'Thay đổi mật khẩu',
  //   icon: 'fas fa-user-times',
  //   children: []
  // }
];

export const ApproverMenu = [
  {
    path: '/admin/Dashboard',
    text: 'Dashboard',
    icon: 'fas fa-tachometer-alt',
    children: [],
  },
  {
    path: '/admin/to-trinh/3',
    text: 'Chờ phê duyệt',
    icon: 'fas fa-hourglass-half',
    children: [],
  },
  {
    path: '/admin/to-trinh/4',
    text: 'Đã phê duyệt',
    icon: 'fas fa-check-double',
    children: [],
  },
  {
    path: '/admin/to-trinh/5',
    text: 'Đã duyệt và ý kiến',
    icon: 'fas fa-spell-check',
    children: [],
  },
  {
    path: '/admin/to-trinh/6',
    text: 'Không duyệt',
    icon: 'fas fa-user-times',
    children: [],
  },
  {
    path: '/admin/to-trinh/7',
    text: 'Quá hạn duyệt',
    icon: 'fas fa-history',
    children: [],
  },
  {
    path: '/admin/phong-ban',
    text: 'Phòng ban',
    icon: 'fa-sharp fa-regular fa-building-user',
    children: []
  },    
  {
    path: '/admin/trang-thai',
    text: 'Trạng thái',
    icon: 'class="fa-regular fa-battery-empty',
    children: []
  }, 
  {
    path: '/admin/changePassword',
    text: 'Thay đổi mật khẩu',
    icon: 'fas fa-user-times',
    children: [],
  },
];

export const SpecialistAdmin = [
  {
    path: '/admin/Dashboard',
    text: 'Dashboard',
    icon: 'fas fa-tachometer-alt',
    children: [],
  },
  {
    path: '/admin/to-trinh/0',
    text: 'Tất cả tờ trình',
    icon: 'fas fa-folder-open',
    children: [],
  },
  {
    path: '/admin/to-trinh/2',
    text: 'Danh sách tạm lưu',
    icon: 'fas fa-pen-square',
    children: [],
  },
  {
    path: '/admin/to-trinh/3',
    text: 'Chờ phê duyệt',
    icon: 'fas fa-hourglass-half',
    children: [],
  },
  {
    path: '/admin/to-trinh/4',
    text: 'Đã phê duyệt',
    icon: 'fas fa-check-double',
    children: [],
  },
  {
    path: '/admin/to-trinh/5',
    text: 'Đã duyệt và ý kiến',
    icon: 'fas fa-spell-check',
    children: [],
  },
  {
    path: '/admin/to-trinh/6',
    text: 'Không duyệt',
    icon: 'fas fa-user-times',
    children: [],
  },
  { 
    path: '/admin/to-trinh/7',
    text: 'Quá hạn duyệt',
    icon: 'fas fa-history',
    children: []

  },    
  {

    path: '/admin/changePassword',
    text: 'Thay đổi mật khẩu',
    icon: 'fas fa-user-times',
    children: [],
  },
];

export const AdminMenu = [
  {
    path: '/admin/Dashboard',
    text: 'Dashboard',
    icon: 'fas fa-tachometer-alt',
    children: [],
  },
  {
    path: '/admin/field',
    text: 'Quản lí danh mục',
    icon: 'fas fa-layer-group',
    children: [],
  },
  {
    path: '/admin/User',
    text: 'Quản lí người dùng',
    icon: 'fa-solid fa-user',
    children: [],
  },
  // {
  //   path: '/admin/phong-ban',
  //   text: 'Phòng ban',
  //   icon: 'fa-sharp fa-regular fa-building-user',
  //   children: []
  // },    
  // {
  //   path: '/admin/trang-thai',
  //   text: 'Trạng thái',
  //   icon: 'class="fa-regular fa-battery-empty',
  //   children: []
  // }, 
  {
    path: '/admin/changePassword',
    text: 'Thay đổi mật khẩu',
    icon: 'fas fa-user-times',
    children: [],
  },
];
