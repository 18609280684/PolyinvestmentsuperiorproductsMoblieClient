const RequestUrl = {
	MAINPAGEVIEW_URL: 'http://47.94.157.124:8080/indexAdvertisement/appIndex',
	MAINPAGEDETAIL_URL: 'http://47.94.157.124:8080/indexAdvertisement/indexDetailed',
	LOGIN_URL: 'http://47.94.157.124:8080/customer/login',
	REGISTER_URL:'http://47.94.157.124:8080/customer/saveCustomer',
	INTEGRAL_URL:'http://47.94.157.124:8080/indexAdvertisement/turnOut',
	PERSONALINFORMATION_URL:'http://47.94.157.124:8080/customer/updateData',
};

const Banner_Imgs = {
	MAINPAGEVIEW_BANNER: require('../Images/banner/banner1.png'),
	MAINPAGEVIEW_TOPICON: require('../Images/ICON/personIcon.png'),
	MAINPAGEVIEW_HOMEICON: require('../Images/ICON/HomeIcon.png'),
	MAINPAGEVIEW_WAIHUIICON: require('../Images/ICON/WaihuiIcon.png'),
	MAINPAGEVIEW_ZENGZHIICON: require('../Images/ICON/ZenzhiIcon.png'),
	MAINPAGEVIEW_TIEBAICON: require('../Images/ICON/TiebaIcon.png'),
	MAINPAGEVIEW_OTHERSICON: require('../Images/ICON/OthersIcon.png'),
	MAINPAGETIEBABACK: require('../Images/banner/tiebabeijing.png'),
	WAIHUIPAGE_WAIHUI001: require('../Images/banner/Waihui001.png'),
	WAIHUIPAGE_WAIHUI002: require('../Images/banner/Waihui002.png'),
	WAIHUIPAGE_WAIHUI003: require('../Images/banner/Waihui003.png'),
	WAIHUIPAGE_WAIHUI004: require('../Images/banner/Waihui004.png'),
	TIEBAPAGE_CELLSEP:require('../Images/banner/cellSep.png'),
	TIEBAPAGE_ADDTIEZI:require('../Images/banner/AddTiezi.png'),
	TIEBAPAGE_TOUXIANG:require('../Images/banner/TiebaTouxiang.png'),
	NIURENBANGPAGE_JIJINNIUREN:require('../Images/banner/Jijinniuren.png'),
	NIURENBANGPAGE_WENJIANNNIUREN:require('../Images/banner/Wenjianniuren.png'),
	TIEBAPAGE_DIANZAN:require('../Images/banner/Dianzan.png'),
	TIEBAPAGE_PINGLUN:require('../Images/banner/Pinglun.png'),
	LOGINPAGE_BG:require('../Images/Login/LoginBg.png'),
	LOGINPAGE_LOGO:require('../Images/Login/LoginLogo.png'),
	LOGINPAGE_ZHANGHAO:require('../Images/Login/LoginZhanghao.png'),
	LOGINPAGE_MIMA:require('../Images/Login/LoginMimaForm.png'),
	LOGINPAGE_BUTTON:require('../Images/Login/LoginButton.png'),
	LOGINPAGE_WIXIN:require('../Images/Login/LoginWixin.png'),
	LOGINPAGE_WIXINFENGE:require('../Images/Login/WeixinFenge.png'),
	ZHUCEPAGE_BUTTON:require('../Images/Login/ZhuceButton.png'),
	GUANGGAOPAGE_BANNER:require('../Images/banner/GuanggaoBanner.png'),
	GUANGGAOPAGE_FENGEFU:require('../Images/banner/GuanggaoFenge.png'),
	CEBIANPAGE_MYICON:require('../Images/ICON/MyIcon.png'),
	CEBIANPAGE_INFOMATION:require('../Images/ICON/Gerenziliao.png'),
	CEBIANPAGE_SHARE:require('../Images/ICON/ShareIcon.png'),
	CEBIANPAGE_ABOUTUS:require('../Images/ICON/AboutUsIcon.png'),
	CEBIANPAGE_BACKFORM:require('../Images/ICON/CeForm.png'),
	INFORMATION_NICKNAMEICON:require('../Images/Information/NicknameIcon.png'),
	INFORMATION_BIRTHDAYICON:require('../Images/Information/BirthdayIcon.png'),
	INFORMATION_GENDERICON:require('../Images/Information/GenderIcon.png'),
	INFORMATION_TELEPHONEICON:require('../Images/Information/TelephoneIcon.png'),
	INFORMATION_MAILBOXICON:require('../Images/Information/MailboxIcon.png'),
	INFORMATION_SUBMITBUTTON:require('../Images/Information/SubmitButton.png'),
	INFORMATION_BGFORM:require('../Images/Information/BGForm.png'),
	POPPAGE_CONFIRMINTEGRALTURNBUTTON: require('../Images/Information/ConfirmIntegralTurnButton.png'),
	XINSHOUPAGE_BUTTON:require('../Images/Information/XinshouTouzi.png'),
	DINGQIPAGE_BUTTON:require('../Images/Information/Dingqi.png'),
	GUANGGAOPAGE_BG01:require('../Images/Information/Guanggao01.png'),
	GUANGGAOPAGE_BG02:require('../Images/Information/Guanggao02.png'),
	GUANGGAOPAGE_BG03:require('../Images/Information/Guanggao03.png'),
	ABOUTUS_BG:require('../Images/Information/Guanggao04.png'),
	

	linshi_niurenbang:require('../Images/banner/Llinshi.png'),
};

const Constants = {
	TOAST_SHORT:1,
	TOAST_LONG:2,
}

global.constants = {
   nickName:'',
   signature:'',
};



export {
	RequestUrl,
	Banner_Imgs,
	Constants
};